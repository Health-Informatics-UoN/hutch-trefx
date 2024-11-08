using System.Diagnostics;
using System.IO.Compression;
using System.Text.Json;
using System.Text.Json.Nodes;
using System.Text.RegularExpressions;
using HutchAgent.Config;
using HutchAgent.Constants;
using HutchAgent.Models;
using HutchAgent.Models.Wfexs;
using HutchAgent.Results;
using HutchAgent.Utilities;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using ROCrates;
using ROCrates.Models;
using YamlDotNet.Serialization;
using YamlDotNet.Serialization.NamingConventions;
using File = System.IO.File;

namespace HutchAgent.Services;

// TODO this is all pretty wfexs specific;
// maybe in future could be abstracted into a wfexs implementation of a more general interface?
public partial class WorkflowTriggerService
{
  private readonly WorkflowTriggerOptions _workflowOptions;
  private readonly ILogger<WorkflowTriggerService> _logger;
  private readonly string _activateVenv;
  private const string _bashCmd = "bash";
  private readonly FiveSafesCrateService _crateService;
  private readonly IDeserializer _unyaml;
  private readonly StatusReportingService _status;
  private readonly WorkflowJobService _jobs;
  private readonly PathOptions _paths;
  private readonly FileSystemUtility _fsu;

  public WorkflowTriggerService(
    IOptions<WorkflowTriggerOptions> workflowOptions,
    ILogger<WorkflowTriggerService> logger,
    FiveSafesCrateService crateService,
    StatusReportingService status,
    WorkflowJobService jobs,
    IOptions<PathOptions> paths,
    FileSystemUtility fsu)
  {
    _logger = logger;
    _crateService = crateService;
    _status = status;
    _jobs = jobs;
    _fsu = fsu;
    _paths = paths.Value;
    _workflowOptions = workflowOptions.Value;
    _activateVenv = "source " + _workflowOptions.VirtualEnvironmentPath;
    _unyaml = new DeserializerBuilder()
      .WithNamingConvention(CamelCaseNamingConvention.Instance)
      .IgnoreUnmatchedProperties()
      .Build();
  }

  public string GetExecutorWorkingDirectory()
  {
    // Find the WfExS cache directory path
    var rawLocalConfig = File.ReadAllText(_workflowOptions.LocalConfigPath
                                          ?? throw new InvalidOperationException(
                                            "Workflow Executor Config Path is missing!"));

    var localConfig = _unyaml.Deserialize<WfexsLocalConfig>(rawLocalConfig);

    var relativeWorkDir = localConfig.WorkDir;

    return Path.GetFullPath(
      relativeWorkDir,
      Path.GetDirectoryName(_workflowOptions.LocalConfigPath)
      ?? throw new InvalidOperationException());
  }

  public async Task<WorkflowCompletionResult> HasCompleted(string executorRunId)
  {
    var result = new WorkflowCompletionResult();

    // find execution-state.yml for job
    var pathToState = Path.Combine(
      GetExecutorWorkingDirectory(),
      executorRunId,
      "meta", "execution-state.yaml");

    if (!File.Exists(pathToState))
    {
      _logger.LogDebug("Could not find execution status file at '{StatePath}'", pathToState);
      // TODO check for wfexs errors? in case execution failed rather than is incomplete
      return result;
    }

    result.IsComplete = true;

    // TODO do we need to support multiple executions in this state file?
    var state = _unyaml.Deserialize<List<WfexsExecutionState>>(await File.ReadAllTextAsync(pathToState))[0];

    result.ExitCode = state.ExitCode;
    result.StartTime = state.StartTime;
    result.EndTime = state.EndTime;

    return result;
  }

  [GeneratedRegex(@".*meta\.json$")]
  private static partial Regex MatchContainerMetadataFiles();

  public void UnpackOutputsFromPath(string sourcePath, string targetPath)
  {
    if (!Directory.Exists(targetPath))
      Directory.CreateDirectory(targetPath);

    // Relative paths should be relative to Hutch working directory
    if (!Path.IsPathFullyQualified(sourcePath))
      sourcePath = Path.Combine(_paths.WorkingDirectoryBase, sourcePath);

    ZipFile.ExtractToDirectory(sourcePath, targetPath);

    if (!_workflowOptions.IncludeContainersInOutput)
    {
      // Path to workflow containers
      var containersPath = Path.Combine(targetPath, "containers");
      _fsu.SelectivelyDelete(containersPath, MatchContainerMetadataFiles());
    }
  }

  public void UnpackOutputs(string executorRunId, string targetPath)
  {
    // Path the to the job outputs
    var executionCratePath = Path.Combine(
      GetExecutorWorkingDirectory(),
      executorRunId,
      "outputs",
      "execution.crate.zip");

    UnpackOutputsFromPath(executionCratePath, targetPath);
  }

  /// <summary>
  /// Execute workflow given a job Id and input crate
  /// </summary>
  /// <param name="job"></param>
  /// <param name="roCrate"></param>
  /// <exception cref="Exception"></exception>
  public async Task
    TriggerWfexs(WorkflowJob job,
      ROCrate roCrate) // TODO split this up into staging (producing the stage file) and executing (actually running wfexs)
  {
    await _status.ReportStatus(job.Id, JobStatus.StagingWorkflow);

    //Get execute action and set status to active
    var executeAction = _crateService.GetExecuteEntity(roCrate);
    executeAction.SetProperty("startTime", DateTime.Now);
    _crateService.UpdateCrateActionStatus(ActionStatus.ActiveActionStatus, executeAction);

    // Create stage file and save file path
    var stageFilePath = await WriteStageFile(job, roCrate);

    await _status.ReportStatus(job.Id, JobStatus.ExecutingWorkflow);
    // Commands to install WfExS and execute a workflow
    // given a path to the local config file and a path to the stage file of a workflow
    var command =
      $"./WfExS-backend.py  -L {_workflowOptions.LocalConfigPath} execute -W {stageFilePath}";

    if (!_workflowOptions.SkipFullProvenanceCrate)
      command += " --full";

    var p = new Process();

    p.StartInfo = new ProcessStartInfo
    {
      RedirectStandardOutput = true,
      RedirectStandardInput = true,
      RedirectStandardError = true,
      UseShellExecute = false,
      CreateNoWindow = true,
      FileName = _bashCmd,
      WorkingDirectory = _workflowOptions.ExecutorPath
    };
    if (_workflowOptions.RemainAttached)
    {
      p.EnableRaisingEvents = true;
      const string message = "Job [{JobId}] ({ExecutorRunId}) {Stream}: {Data}";

      // TODO tidy this the hell up
      p.OutputDataReceived += async (sender, args) =>
      {
        if (string.IsNullOrEmpty(job.ExecutorRunId) && args.Data is not null)
        {
          job.ExecutorRunId = FindRunName(args.Data) ?? "";
          if (!string.IsNullOrEmpty(job.ExecutorRunId))
          {
            _logger.LogDebug(
              "Job [{JobId}] found ExecutorRunId: {RunId}", job.Id, job.ExecutorRunId);
            await _jobs.Set(job);
          }
        }

        _logger.LogDebug(message, job.Id, job.ExecutorRunId, "StdOut",
          args.Data ?? "event received but data was null");
      };

      p.ErrorDataReceived += (sender, args) =>
      {
        _logger.LogDebug(message, job.Id, job.ExecutorRunId, "StdErr",
          args.Data ?? "event received but data was null");
      };
    }

    // start process
    if (!p.Start())
      throw new Exception("Could not start process");
    _logger.LogInformation("Process started for job: {JobId}", job.Id);

    // venv
    _logger.LogDebug("Virtual Environment command: {Command}", _activateVenv);
    await p.StandardInput.WriteLineAsync(_activateVenv);
    await p.StandardInput.FlushAsync();
    _logger.LogInformation("Virtual Environment activated");

    // wfexs
    _logger.LogDebug("Executor command: {Command}", command);
    await p.StandardInput.WriteLineAsync(command);
    await p.StandardInput.FlushAsync();
    _logger.LogInformation("Executor command executed");

    p.StandardInput.Close();

    // Read the stdout of the WfExS run to get the run ID
    if (!_workflowOptions.RemainAttached)
    {
      var reader = p.StandardOutput;
      while (!p.HasExited && string.IsNullOrEmpty(job.ExecutorRunId))
      {
        var stdOutLine = await reader.ReadLineAsync();
        if (stdOutLine is null) continue;
        job.ExecutorRunId = FindRunName(stdOutLine) ?? "";
        if (string.IsNullOrEmpty(job.ExecutorRunId)) continue;
        await _jobs.Set(job);
      }
    }
    else
    {
      p.BeginOutputReadLine();
      p.BeginErrorReadLine();
      await p.WaitForExitAsync();
      p.CancelErrorRead();
      p.CancelOutputRead();
    }

    // close our connection to the process
    p.Close();
  }

  private async Task<string> WriteStageFile(WorkflowJob workflowJob, ROCrate roCrate)
  {
    //Get execution details
    var mentions = roCrate.RootDataset.GetProperty<JsonArray>("mentions") ??
                   throw new NullReferenceException("No mentions found in RO-Crate RootDataset Properties");
    var downloadAction = mentions.Where(mention =>
                             mention != null &&
                             roCrate.Entities[mention["@id"]!.ToString()].Properties["@type"]?.ToString() ==
                             "DownloadAction")
                           .Select(mention =>
                             roCrate.Entities[mention!["@id"]!.ToString()].GetProperty<JsonNode>("result")).ToList() ??
                         throw new NullReferenceException("No download action found in the RO-Crate");
    string cratePath;
    if (!downloadAction.IsNullOrEmpty())
    {
      cratePath = Path.Combine(workflowJob.WorkingDirectory.JobCrateRoot(),
        downloadAction.First()!["@id"]!.ToString());
    }
    else
    {
      // no download action, assumes relative path workflow is used
      var mainEntity = roCrate.RootDataset.GetProperty<Part>("mainEntity") ??
                       throw new NullReferenceException("Cannot find main entity in input crate");
      cratePath = Path.Combine(workflowJob.WorkingDirectory.JobCrateRoot(), mainEntity.Id);
    }

    await InitialiseRepo(cratePath);

    var workflowCrate = _crateService.InitialiseCrate(cratePath);
    var workflow = workflowCrate.RootDataset.GetProperty<Part>("mainEntity") ??
                   throw new NullReferenceException("Cannot find main entity in RootDataset");

    var gitUrl = CreateGitUrl(cratePath, workflow!.Id);

    // Create stage file object
    var stageFile = new WorkflowStageFile()
    {
      WorkflowId = gitUrl,
      Nickname = "HutchAgent" + workflowJob.Id,
      WorkflowConfig = new()
      {
        Container = _workflowOptions.ContainerEngine.ToString().ToLower()
      },
      Params = new object()
    };
    // Get inputs from execute entity
    var executeEntity = _crateService.GetExecuteEntity(roCrate);
    var queryObjects = executeEntity.GetProperty<JsonArray>("object")!.ToList();

    var parameters = new Dictionary<string, object>();

    foreach (var queryObject in queryObjects)
    {
      var id = queryObject?["@id"] ?? throw new InvalidOperationException($"No key @id found in {queryObject}");
      var objectEntity = roCrate.Entities[id.ToString()] ??
                         throw new NullReferenceException($"No Entity with id {id} found in RO-Crate");
      var exampleOfWork = objectEntity.GetProperty<Part>("exampleOfWork") ??
                          throw new NullReferenceException($"No exampleOfWork property found in {objectEntity.Id}");
      var parameter = roCrate.Entities[exampleOfWork.Id];
      var name = parameter.Properties["name"] ??
                 throw new NullReferenceException($"No name property found for {parameter.Id}");
      var type = objectEntity.Properties["@type"] ??
                 throw new NullReferenceException($"No type property found for {objectEntity.Id}");

      if (type.ToString() is "File")
      {
        // get absolute path to input
        var absolutePath = Path.Combine(
          Path.GetFullPath(workflowJob.WorkingDirectory.JobCrateRoot()),
          objectEntity.Id);
        var filePath = "file://" + absolutePath;

        var values = new Dictionary<string, string>()
        {
          ["c-l-a-s-s"] = type.ToString(),
          ["url"] = filePath
        };
        parameters[name.ToString()] = values;
      }
      else
      {
        var value = objectEntity.Properties["value"]?.ToString() ??
                    throw new NullReferenceException("Could not get value for given input parameter.");
        parameters[name.ToString()] = value;
      }
    }

    // Set input params
    stageFile.Params = parameters;

    //Set environment variables
    var envVars = new Dictionary<string, string>();
    try
    {
      // Try and get the data access details
      var dataAccess = JsonSerializer.Deserialize<DatabaseConnectionDetails>(workflowJob.DataAccess ?? "");

_logger.LogDebug($"DataAccess payload: {JsonSerializer.Serialize(dataAccess)}");

      // set environment params to match dataAccess details
      if (dataAccess is not null)
      {
        envVars.Add("DATASOURCE_DB_HOST", dataAccess.GetContainerHost(_workflowOptions.ContainerEngine));
        envVars.Add("DATASOURCE_DB_PORT", dataAccess.Port.ToString());
        envVars.Add("DATASOURCE_DB_DATABASE", dataAccess.Database);
        envVars.Add("DATASOURCE_DB_USERNAME", dataAccess.Username);
        envVars.Add("DATASOURCE_DB_PASSWORD", dataAccess.Password);
      }
    }
    catch (JsonException)
    {
      // we've failed to deserialize data access.
      // not much we can do, but shouldn't stop the job trying to run.
      // 
      // it may fail if it intends to try and access the data source,
      // but that'll get handled and reported in the usual way.
_logger.LogDebug($"Data Access deserialization failure: {workflowJob?.DataAccess ?? "null"}");
    }

    stageFile.EnvironmentVars = envVars;

    // Get outputs from workflow crate
    var workflowMainEntity = workflowCrate.Entities[workflow.Id];
    var outputs = workflowMainEntity.Properties["output"] ??
                  throw new InvalidOperationException("No property 'output' found in Workflow RO-Crate");

    var outputId = outputs["@id"] ?? throw new NullReferenceException("Id not found for output object");
    var outputEntity = workflowCrate.Entities[outputId.ToString()];
    var outputName = outputEntity.Properties["name"] ??
                     throw new InvalidOperationException($"No property 'name' found for output {outputId}");
    var outputParam = new Dictionary<string, object>()
    {
      [outputName.ToString()] = new Dictionary<string, string>()
      {
        ["c-l-a-s-s"] = "File"
      }
    };
    // set outputs in stage file
    stageFile.Outputs = outputParam;
    var serializer = new SerializerBuilder()
      .Build();
    var yaml = serializer.Serialize(stageFile);
    var stageFilePath = Path.Combine(workflowJob.WorkingDirectory.JobCrateRoot(),
      "hutch_cwl.wfex.stage"); // TODO rename later maybe if we support more than cwl ;)

    // TODO should we write metadata for the stage file? (yes)

    await using var outputStageFile = new StreamWriter(stageFilePath);
    await outputStageFile.WriteLineAsync(yaml);

    var absoluteStageFilePath = Path.Combine(
      Path.GetFullPath(stageFilePath));

    return absoluteStageFilePath;
  }

  private async Task InitialiseRepo(string repoPath)
  {
    var gitCommands = new List<string>()
    {
      "git -c init.defaultBranch=main init",
      "git add .",
      "git -c user.name='Hutch' -c user.email='hutch@example.com' commit -m 'Initialise repo' ",
    };
    ProcessStartInfo gitProcessStartInfo = new ProcessStartInfo()
    {
      RedirectStandardOutput = true,
      RedirectStandardInput = true,
      RedirectStandardError = true,
      UseShellExecute = false,
      CreateNoWindow = true,
      FileName = _bashCmd,
      WorkingDirectory = repoPath
    };

    var gitProcess = Process.Start(gitProcessStartInfo);
    if (gitProcess == null)
      throw new Exception("Could not start process");

    await using var streamWriter = gitProcess.StandardInput;
    if (streamWriter.BaseStream.CanWrite)
    {
      foreach (var command in gitCommands)
      {
        await streamWriter.WriteLineAsync(command);
      }

      await streamWriter.FlushAsync();
      streamWriter.Close();
    }

    var reader = gitProcess.StandardOutput;
    while (!gitProcess.HasExited)
    {
      var stdOutLine = await reader.ReadLineAsync();
      if (stdOutLine is null) continue;
    }

    gitProcess.Close();
  }

  private string CreateGitUrl(string pathToGitRepo, string pathToWorkflow)
  {
    var absolutePath = "file://" + Path.GetFullPath(pathToGitRepo) + "#subdirectory=" +
                       pathToWorkflow;

    return absolutePath;
  }

  [GeneratedRegex(
    @".*-\sInstance\s([0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}).*")]
  private static partial Regex WfexsRunIdLogLine();

  private string? FindRunName(string text)
  {
    var match = WfexsRunIdLogLine().Match(text);
    if (!match.Success)
    {
      _logger.LogError("Didn't match the pattern!");
      return null;
    }

    // Get the matched UUID pattern
    var uuid = match.Groups[1].Value;
    return Guid.TryParse(uuid, out var validUuid) ? validUuid.ToString() : null;
  }
}

using Flurl;
using Flurl.Http;
using Flurl.Http.Configuration;
using HutchAgent.Config;
using HutchAgent.Constants;
using HutchAgent.Models;
using HutchAgent.Models.ControllerApi;
using Microsoft.Extensions.Options;
using Microsoft.FeatureManagement;

namespace HutchAgent.Services;

/// <summary>
/// Contains all Interactions with the TRE Controller API
/// </summary>
public class ControllerApiService
{
  private readonly ILogger<ControllerApiService> _logger;
  private readonly IFeatureManager _features;
  private readonly OpenIdOptions _identityOptions;
  private readonly IFlurlClient _http;
  private readonly ControllerApiOptions _apiOptions;
  private readonly OpenIdIdentityService _identity;
  private const string _standaloneModeError = "TRE Controller API should not be used in Standalone Mode.";
  private string _accessToken;
  private string _refreshToken;

  public ControllerApiService(
    IFeatureManager features,
    IFlurlClientFactory httpFactory,
    IOptions<ControllerApiOptions> apiOptions,
    IOptions<OpenIdOptions> identityOptions,
    ILogger<ControllerApiService> logger,
    OpenIdIdentityService identity)
  {
    _features = features;
    _logger = logger;
    _identity = identity;
    _identityOptions = identityOptions.Value;
    _apiOptions = apiOptions.Value;
    _http = httpFactory.Get(_apiOptions.BaseUrl);

    // initialise tokens
    if (_features.IsEnabledAsync(FeatureFlags.UseOidc).Result)
    {
      var tokens = _identity.RequestUserTokens(_identityOptions).Result;
      _accessToken = tokens.access;
      _refreshToken = tokens.refresh;
    }
    else
    {
      _accessToken = string.Empty;
      _refreshToken = string.Empty;
    }
  }

  private async Task UpdateToken()
  {
    // TODO one day support Client Credentials?
    var tokens = await _identity.RefreshAccessToken(_identityOptions, _refreshToken);
    _accessToken = tokens.access;
    _refreshToken = tokens.refresh;
  }

  /// <summary>
  /// Request the details for a Bucket to upload outputs for Egress checking
  /// </summary>
  /// <param name="jobId"></param>
  /// <returns></returns>
  public async Task<FileStorageDetails> RequestEgressBucket(string jobId)
  {
    if (await _features.IsEnabledAsync(FeatureFlags.StandaloneMode))
      throw new InvalidOperationException(_standaloneModeError);

    var url = "Submission/GetOutputBucketInfo"
      .SetQueryParam("subId", jobId);

    var request = _http.Request(url);

    // Add bearer token if configured to use OIDC
    if (await _features.IsEnabledAsync(FeatureFlags.UseOidc))
    {
      if (!_identity.IsTokenValid(_accessToken)) await UpdateToken();
      request = request.WithOAuthBearerToken(_accessToken);
    }

    return await request
             .GetAsync()
             .ReceiveJson<GetOutputBucketInfoReponse>()
           ?? throw new InvalidOperationException(
             "No Response Body was received for an Egress Bucket request.");
    // TODO attempt refreshing if token rejected?
  }

  /// <summary>
  /// Confirm with the TRE Controller API that Egress Outputs have been transferred to the Intermediary Store.
  /// </summary>
  /// <param name="jobId">The Job Id this is for.</param>
  /// <param name="files">A list of output file object IDs in the store.</param>
  /// <exception cref="InvalidOperationException">TRE Controller API was attempted to be used in Standalone Mode.</exception>
  public async Task ConfirmOutputsTransferred(string jobId, List<string> files)
  {
    if (await _features.IsEnabledAsync(FeatureFlags.StandaloneMode))
      throw new InvalidOperationException(_standaloneModeError);

    var url = "Submission/FilesReadyForReview";

    var request = _http.Request(url);

    // Add bearer token if configured to use OIDC
    if (await _features.IsEnabledAsync(FeatureFlags.UseOidc))
    {
      if (!_identity.IsTokenValid(_accessToken)) await UpdateToken();
      request = request.WithOAuthBearerToken(_accessToken);
    }

    _logger.LogInformation(
      "Job [{JobId}]: Confirming with TRE Controller API that Egress Outputs have been transferred", jobId);

    await request
      .PostJsonAsync(
        new FilesReadyForReviewRequest()
        {
          SubId = jobId,
          Files = files,
          TesId = jobId
        });
    // TODO attempt refreshing if token rejected?
  }

  /// <summary>
  /// Request the submission layer to update the status of a submission with the given ID.
  /// </summary>
  /// <param name="jobId">The ID of the submission to be updated.</param>
  /// <param name="status">The new status of the submission.</param>
  /// <param name="description"></param>
  /// <exception cref="InvalidOperationException"></exception>
  public async Task UpdateStatusForTre(string jobId, JobStatus status, string? description)
  {
    if (await _features.IsEnabledAsync(FeatureFlags.StandaloneMode))
      throw new InvalidOperationException(_standaloneModeError);

    var url = "Submission/UpdateStatusForTre"
      .SetQueryParams(new
      {
        subId = jobId,
        statusType = (int)status,
        description
      });

    var request = _http.Request(url);

    // Add bearer token if configured to use OIDC
    if (await _features.IsEnabledAsync(FeatureFlags.UseOidc))
    {
      if (!_identity.IsTokenValid(_accessToken)) await UpdateToken();
      request = request.WithOAuthBearerToken(_accessToken);
    }

    await request.PostAsync();
    // TODO attempt refreshing if token rejected?
  }

  /// <summary>
  /// Notify the TRE Controller API that the job's final outcome has been uploaded
  /// to the specified object id in the store as provided by the Controller API previously
  /// (in <see cref="RequestEgressBucket"/>).
  /// </summary>
  /// <param name="jobId">ID of the Job this is for.</param>
  /// <param name="resultsObjectId">Store ObjectId for the results package.</param>
  public async Task FinalOutcome(string jobId, string resultsObjectId)
  {
    if (await _features.IsEnabledAsync(FeatureFlags.StandaloneMode))
      throw new InvalidOperationException(_standaloneModeError);

    var url = "Submission/FinalOutcome";

    var request = _http.Request(url);

    // Add bearer token if configured to use OIDC
    if (await _features.IsEnabledAsync(FeatureFlags.UseOidc))
    {
      if (!_identity.IsTokenValid(_accessToken)) await UpdateToken();
      request = request.WithOAuthBearerToken(_accessToken);
    }

    await request
      .PostJsonAsync(new FinalOutcomeRequest
      {
        SubId = jobId,
        File = resultsObjectId
      });
  }
}

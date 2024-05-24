using System.CommandLine;

namespace Hutch.Controller.Startup.Cli;

public class CliEntrypoint : RootCommand
{
  public CliEntrypoint() : base("Tripod Cli")
  {
    AddGlobalOption(new Option<string>(["--environment", "-e"]));

    // Add Commands here

    // AddCommand(new Command("name", "description")
    // {
    //   new Command("verb")
    // });
  }
}

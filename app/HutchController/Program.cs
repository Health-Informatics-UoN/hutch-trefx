using System.CommandLine.Builder;
using System.CommandLine.Parsing;
using Hutch.Controller.Commands.Helpers;
using Hutch.Controller.Startup.Cli;
using Hutch.Controller.Startup.Web;

// Any global initialisation stuff here

// Initialise the command line parser and run the appropriate entrypoint
await new CommandLineBuilder(new CliEntrypoint())
  .UseDefaults()
  .UseRootCommandBypass(args, WebEntrypoint.Run)
  .UseCliHostDefaults(args)
  .Build()
  .InvokeAsync(args);

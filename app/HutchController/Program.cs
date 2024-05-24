using System.CommandLine.Builder;
using System.CommandLine.Parsing;
using System.IdentityModel.Tokens.Jwt;
using DummyControllerApi.Config;
using DummyControllerApi.Services;
using DummyControllerApi.Utilities;
using Flurl.Http;
using Hutch.Controller.Commands.Helpers;
using Hutch.Controller.Startup.Cli;
using Hutch.Controller.Startup.Web;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Serilog;

// Any global initialisation stuff here

// Initialise the command line parser and run the appropriate entrypoint
await new CommandLineBuilder(new CliEntrypoint())
  .UseDefaults()
  .UseRootCommandBypass(args, WebEntrypoint.Run)
  .UseCliHostDefaults(args)
  .Build()
  .InvokeAsync(args);

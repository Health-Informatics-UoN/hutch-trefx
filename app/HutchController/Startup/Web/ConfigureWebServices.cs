using System.IdentityModel.Tokens.Jwt;
using DummyControllerApi.Config;
using DummyControllerApi.Services;
using DummyControllerApi.Utilities;
using Flurl.Http;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Serilog;

namespace Hutch.Controller.Startup.Web;

public static class ConfigureWebServices
{
  public static WebApplicationBuilder ConfigureServices(this WebApplicationBuilder b)
  {
    b.Host.UseSerilog((context, configuration) =>
      configuration.ReadFrom.Configuration(context.Configuration));

    // Flurl configuration
    var webhookOptions = b.Configuration.GetSection("WebHooks").Get<WebHookOptions>() ?? new();
    if (!webhookOptions.CallbackUrl.IsNullOrEmpty() && !webhookOptions.VerifySsl)
      FlurlHttp.ConfigureClient(webhookOptions.CallbackUrl, cli =>
        cli.Settings.HttpClientFactory = new UntrustedCertClientFactory());

    // Configure Options Models
    b.Services
      .Configure<EgressBucketDetailsOptions>(b.Configuration.GetSection("EgressBucketDetails"))
      .Configure<WebHookOptions>(b.Configuration.GetSection("WebHooks"))
      .Configure<AuthConfig>(b.Configuration.GetSection("AuthConfig"));

    // Auth
    var authConfig = b.Configuration.GetSection("AuthConfig").Get<AuthConfig>() ?? new();
    if (!authConfig.DisableAuth)
    {
      b.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        .AddJwtBearer(
          opts =>
          {
            opts.TokenValidationParameters = new TokenValidationParameters
            {
              // We basically validate nothing about the token to avoid needing extra config about oidc.
              // We just want to confirm Hutch is sending an access token for a user.
              // Everything else will be environment setup dependent anyway
              ValidateActor = false,
              ValidateIssuer = false,
              ValidateIssuerSigningKey = false,
              ValidateLifetime = false,
              ValidateAudience = false,
              ValidateTokenReplay = false,
              RequireSignedTokens = false,
              SignatureValidator = (token, _) => new JwtSecurityToken(token),

              RequireExpirationTime = true,
              RequireAudience = true,
            };
          });
      b.Services.AddAuthorization();
    }

    // MVC and stuff
    b.Services.AddControllers();

    b.Services.AddEndpointsApiExplorer();
    b.Services.AddSwaggerGen();


    // Application Services
    b.Services.AddTransient<WebHookService>();

    // Use this combo for delaying approvals while running
    b.Services
      .AddSingleton<InMemoryApprovalQueue>()
      .AddHostedService<EgressApprovalHostedService>();

    return b;
  }
}

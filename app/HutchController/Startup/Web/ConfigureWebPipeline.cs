using System.Text.Json;
using ClacksMiddleware.Extensions;
using Hutch.Controller.Config;
using Hutch.Controller.Startup.Web.Extensions;
using Hutch.Controller.Startup.Web.Middleware;
using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.AspNetCore.Hosting.Server.Features;
using Serilog;

namespace Hutch.Controller.Startup.Web;

public static class ConfigureWebPipeline
{
  /// <summary>
  /// Configure the HTTP Request Pipeline for an ASP.NET Core app
  /// </summary>
  /// <param name="app"></param>
  /// <returns></returns>
  public static WebApplication UseWebPipeline(this WebApplication app)
  {
    var authConfig = app.Configuration.GetSection("AuthConfig").Get<AuthConfig>() ?? new();

    // Middleware pipeline (order may be important)
    app.GnuTerryPratchett();

    app.UseSerilogRequestLogging();

    app.UseSecureHttpsHandling();

    app.UseSwaggerUI();


    if (!authConfig.DisableAuth)
    {
      app.UseAuthentication();
      app.UseAuthorization();
    }

    // Endpoint mapping

    app.MapSwagger();
    app.MapUonVersionInformation();

    var controllerEndpoints = app.MapControllers().BlockHttpRequests();
    if (!authConfig.DisableAuth) controllerEndpoints.RequireAuthorization();

    app.MapFallback(context =>
    {
      context.Response.Redirect("/swagger");
      return Task.CompletedTask;
    });

    return app;
  }
}

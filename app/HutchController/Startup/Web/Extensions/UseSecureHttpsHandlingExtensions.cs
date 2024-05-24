using Hutch.Controller.Startup.Web.Middleware;
using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.AspNetCore.Hosting.Server.Features;

namespace Hutch.Controller.Startup.Web.Extensions;

public static class UseSecureHttpsHandlingExtensions
{
  /// <summary>
  /// When (and only when) the server is bound on both HTTP and HTTPS, ensure that bare HTTP requests are either redirected or blocked as appropriate.
  ///
  /// If the server is bound ONLY on HTTP, or HTTPS, then all requests will be allowed over the bound protocol.
  ///
  /// Note that solely HTTPS is preferred in Production (but not always possible), and solely HTTP should only be used in development.
  /// </summary>
  /// <param name="app"></param>
  /// <returns></returns>
  public static IApplicationBuilder UseSecureHttpsHandling(this IApplicationBuilder app)
  {
    // If both HTTP and HTTPS are available, HTTP should be BLOCKED, not redirected, for API routes
    // https://learn.microsoft.com/en-us/aspnet/core/security/enforcing-ssl
    app.UseHttpRequestBlocking();

    // If both HTTP and HTTPS are available, then non-blocked HTTP routes should redirect to HTTPS
    // redirects should occur after the above blocking otherwise the blocker would just get the redirected https version
    app.UseWhen(context => IsServerBothHttpHttpsBound(context.RequestServices),
      a =>
      {
        var env = a.ApplicationServices.GetRequiredService<IWebHostEnvironment>();

        if (!env.IsDevelopment()) a.UseHsts();
        a.UseHttpsRedirection();
      });

    return app;
  }

  /// <summary>
  /// Confirm the server is bound to listen on both HTTP and HTTPS
  /// </summary>
  /// <param name="s"></param>
  /// <returns></returns>
  private static bool IsServerBothHttpHttpsBound(IServiceProvider s)
  {
    var boundUrls = s.GetRequiredService<IServer>()
                      .Features.Get<IServerAddressesFeature>()?.Addresses.ToList()
                    ?? [];
    return boundUrls.Any(x => x.StartsWith("https:")) && boundUrls.Any(x => x.StartsWith("http:"));
  }
}

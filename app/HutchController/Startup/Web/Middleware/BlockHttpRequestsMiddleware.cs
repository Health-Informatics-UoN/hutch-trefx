using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.AspNetCore.Hosting.Server.Features;

namespace Hutch.Controller.Startup.Web.Middleware;

/// <summary>
/// Enforce bare HTTP request blocking when required, as long as HTTPS is available.
/// </summary>
/// <param name="next"></param>
public class BlockHttpRequestsMiddleware(RequestDelegate next)
{
  public Task Invoke(HttpContext httpContext, ILogger<BlockHttpRequestsMiddleware> logger)
  {
    // Check server configuration to see if HTTPS requests are even possible
    var boundUrls = httpContext.RequestServices.GetRequiredService<IServer>()
      .Features.Get<IServerAddressesFeature>()
      ?.Addresses ?? [];
    var isHttpsAvailable = boundUrls.Any(x => x.StartsWith("https:"));

    // If the request is HTTPS, or it's not possible to receive HTTPS requests, then skip ahead
    if (!isHttpsAvailable || httpContext.Request.Scheme == "https")
      return next(httpContext);

    // check if this endpoint should be blocked
    var endpointShouldBlockHttpRequests = httpContext
      .GetEndpoint()?.Metadata
      .GetMetadata<BlockHttpRequestsAttribute>();

    // no block? carry on
    if (endpointShouldBlockHttpRequests == null) return next(httpContext);

    // if we should block, then terminate the request pipeline here
    logger.LogDebug("Http request blocked!");

    // per docs, 400 Bad Request is appropriate, if listening on HTTP
    // https://learn.microsoft.com/en-us/aspnet/core/security/enforcing-ssl
    httpContext.Response.StatusCode = StatusCodes.Status400BadRequest;
    return Task.CompletedTask;
  }
}

/// <summary>
/// Bare HTTP requests should be actively blocked if HTTPS is available.
/// </summary>
[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
public class BlockHttpRequestsAttribute() : Attribute;

public static class BlockHttpRequestsMiddlewareExtensions
{
  /// <summary>
  /// Block bare HTTP requests to these endpoints if HTTPS is available.
  /// </summary>
  /// <param name="endpointConventionBuilder"></param>
  /// <typeparam name="TBuilder"></typeparam>
  /// <returns></returns>
  public static TBuilder BlockHttpRequests<TBuilder>(
    this TBuilder endpointConventionBuilder)
    where TBuilder : IEndpointConventionBuilder
  {
    return endpointConventionBuilder.WithMetadata(new BlockHttpRequestsAttribute());
  }

  /// <summary>
  /// Enforce bare HTTP request blocking when required, as long as HTTPS is available.
  /// </summary>
  /// <param name="app"></param>
  /// <returns></returns>
  public static IApplicationBuilder UseHttpRequestBlocking(this IApplicationBuilder app)
    => app.UseMiddleware<BlockHttpRequestsMiddleware>();
}

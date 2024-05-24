namespace Hutch.Controller.Startup.Web;

public static class WebInitialisation
{
  public static Task Initialise(this WebApplication app)
  {
    // using var scope = app.Services.CreateScope(); // Access to DI services
    
    // Add any web-only initialisation logic here

    return Task.CompletedTask; // remove if converting to async
  }
}

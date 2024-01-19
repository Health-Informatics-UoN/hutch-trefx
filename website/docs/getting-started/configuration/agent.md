---
sidebar_position: 2
---

# Hutch Agent

## Production deployment

Below is the service file for running Hutch as a service. The required settings are on lines that do not start with `#`. Optional settings are on lines that start with `#`. To configure a setting, add the value you wish to use immediately after the `=` without a space. For optional settings, remove the `#` from the start of the line as well.

### Configuring Hutch

1. Set `WorkingDirectory` to the directory where HutchAgent is installed, `/home/alice/HutchAgent`.
2. Set `User` to the username that will be running HutchAgent, e.g. `alice`.

Now you need to set the environment variables needed to run HutchAgent. These are on the lines starting with `Environment=`.

1. Set `Queue__Hostname` to the URL of your queue host, e.g. `https://my-rabbitmq.example.com`.
2. Set `Queue__Port` to the port number to connect to the message queue host.
3. Set `Queue__UserName` to your username on the message queue host.
4. Set `Queue__Password` to the password for your user.
5. Set `StoreDefaults__Host` to the host of your intermediary store, e.g. `https://my-minio.com:9000`.
6. Set `StoreDefaults__AccessKey` to the access key for your intermediary store.
7. Set `StoreDefaults__SecretKey` to the secret key for your intermediary store.
8. Set `StoreDefaults__Secure` to `true` if your intermediary store is accessed over HTTPS, else set it to `false`.
9. Set `StoreDefaults__Bucket` to the name of the bucket where your results will be stored. This must already exist in your intermediary store.
10. Set `IdentityProvider__OpenIdBaseUrl` to the base URL of your OIDC provider.
11. Set `IdentityProvider__ClientId` to the ID of your client on the provider.
12. Set `IdentityProvider__ClientSecret` to the secret for your client.
13. Set `IdentityProvider__Username` to your username on the OIDC provider.
14. Set `IdentityProvider__Password` to the password for your user.
15. Set `ControllerApi__BaseUrl` to the base URL of the TRE controller.

```
[Unit]
Description=HutchAgent ASP.NET app

[Service]
WorkingDirectory=
ExecStart=dotnet HutchAgent.dll
Restart=always
# Restart service after 10 seconds if the dotnet service crashes:
RestartSec=10
KillSignal=SIGINT
SyslogIdentifier=hutch-agent
User=
Environment=ASPNETCORE_ENVIRONMENT=Release
# opt out of telemetry; see https://learn.microsoft.com/en-us/dotnet/core/tools/telemetry#how-to-opt-out
Environment=DOTNET_PRINT_TELEMETRY_MESSAGE=true

# Hutch specific configuration

# Local working paths used by Hutch itself
# Environment=Paths__WorkingDirectoryBase=$HOME/hutch-workdir
# Environment=Paths__Jobs=jobs

# Configuration for Hutch's internal Action Queue (RabbitMQ)
# For actual defaults, see RabbitMQ documentation
Environment=Queue__Hostname=
Environment=Queue__Port=
Environment=Queue__UserName=
Environment=Queue__Password=

# Configure the internal queue name, how it checks for jobs, and how many can run concurrently
# Environment=JobActionsQueueOptions__QueueName=WorkflowJobActions
# Environment=JobActionsQueueOptions__PollingIntervalSeconds=5
# Environment=JobActionsQueueOptions__MaxParallelism=10

# MinIO Intermediary Store Defaults
# These are are used for Egress in Standalone Mode
# And as a fallback for Submissions/Egress when only partial bucket details are provided.
Environment=StoreDefaults__Host=
Environment=StoreDefaults__AccessKey=
Environment=StoreDefaults__SecretKey=
Environment=StoreDefaults__Secure=
Environment=StoreDefaults__Bucket=

# Credentials for OAuth2.0 identity provider e.g. Keycloak
Environment=IdentityProvider__OpenIdBaseUrl=
Environment=IdentityProvider__ClientId=
Environment=IdentityProvider__ClientSecret=
Environment=IdentityProvider__Username=
Environment=IdentityProvider__Password=

# Configuration for tracking Workflow Execution
# Currently WfExS specific
# Environment=WorkflowExecutor__ExecutorPath=$HOME/WfExS-backend
# Environment=WorkflowExecutor__VirtualEnvironmentPath=$HOME/WfExS-backend/.pyWEenv/bin/activate
# Environment=WorkflowExecutor__LocalConfigPath=$HOME/WfExS-backend/local_config.yaml
# Environment=WorkflowExecutor__ContainerEngine=docker

# Connection strings for different services
# Environment=ConnectionStrings__AgentDb=Data Source=HutchAgent.db

# This section tells Hutch where the controller API is hosted
Environment=ControllerApi__BaseUrl=

# Configurable details to add to published Results Crates.
# Environment=CratePublishing__Publisher__Id=
# Environment=CratePublishing__License__Uri=
# Environment=CratePublishing__License__Properties__Identifier=
# Environment=CratePublishing__License__Properties__Name=

[Install]
WantedBy=multi-user.target
```

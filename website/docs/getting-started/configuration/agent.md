---
sidebar_position: 2
---

# Hutch Agent

Hutch can be configured using the following source in [the usual .NET way](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/configuration), in order of precedence:
-  `appsettings.json` adjacent to the binary (`HutchAgent.dll`)
- Environment Variables (with double underscore `__` as a hierarchical separator)
- Command line arguments
- (.NET User Secrets in development)

Below are the available configurable settings for `HutchAgent`. The variables shown are the defaults, unless specified otherwise.

## Available values

| Varibale name | Description | Type | Default |
|---------------|-------------|------|---------|
|`Paths__WorkingDirectoryBase`|Hutch's working directory|`string`|`$HOME/hutch-workdir`|
|`Paths__Jobs`|Sub-directory for per-job working directories|`string`|`jobs`|
|`Queue__Hostname`|The URL to the RabbitMQ instance hosting the queue|`string`||
|`Queue__Port`|The port for the RabbitMQ instance|`int`||
|`Queue__UserName`|The username for the RabbitMQ instance|`string`||
|`Queue__Password`|The password the RabbitMQ instance|`string`||
|`JobActionsQueueOptions__QueueName`|The name of the job queue|`string`|`WorkflowJobActions`|
|`JobActionsQueueOptions__PollingIntervalSeconds`|How often Hutch checks the queue for new Actions|`int`|`5`|
|`JobActionsQueueOptions__MaxParallelism`|How many actions from the queue will Hutch run concurrently|`int`|`10`|
|`StoreDefaults__Host`|The URL to your S3 storage (e.g. MinIO)|`string`|`localhost:9000`|
|`StoreDefaults__AccessKey`|The access key to your S3 storage|`string`||
|`StoreDefaults__SecretKey`|The secret key to your S3 storage|`string`||
|`StoreDefaults__Secure`|Access your S3 using HTTPS?|`bool`|`true`|
|`StoreDefaults__Bucket`|The name of your S3 storage bucket|`string`||
|`IdentityProvider__OpenIdBaseUrl`|The base URL of your OAuth2.0 provider|`string`||
|`IdentityProvider__ClientId`|The ID of your client on your OAuth2.0 provider|`string`||
|`IdentityProvider__ClientSecret`|The secret of your client on your OAuth2.0 provider|`string`||
|`IdentityProvider__Username`|Your username on your client on your OAuth2.0 provider|`string`||
|`IdentityProvider__Password`|Your password on your client on your OAuth2.0 provider|`string`||
|`WorkflowExecutor__ExecutorPath`|The path to where the executor is installed|`string`|`$HOME/WfExS-backend`|
|`WorkflowExecutor__VirtualEnvironmentPath`|The path to activate the executor's virtual environment|`string`|`$HOME/WfExS-backend/.pyWEenv/bin/activate`|
|`WorkflowExecutor__LocalConfigPath`|The path to the local configuration file of the executor|`string`|`"$HOME/WfExS-backend/local_config.yaml"`|
|`WorkflowExecutor__ContainerEngine`|The name of the container engine to run workflows (can be `docker`, `singularity` or `podman`)|`string`|`docker`|
|`ConnectionStrings__AgentDb`|The connection string for Hutch's internal database|`string`|`Data Source=HutchAgent.db`|
|`ControllerApi__BaseUrl`|The base URL for the TRE controller|`string`||
|`CratePublishing__Publisher__Id`|The identifier (typically a URL) for the Publisher in Results Crates|`string`||
|`CratePublishing__License__Uri`|The URI to the license e.g. https://spdx.org/licenses/CC-BY-4.0|`string`||
|`CratePublishing__License__Properties__Identifier`|The short-form of the license e.g. CC-BY-4.0|`string`||
|`CratePublishing__License__Properties__Name`|The long-form name of the license e.g. Creative Commons Attribution 4.0 International|`string`||

The following table shows configuration values used for **development purposes only**

| Varibale name | Description | Type | Default |
|---------------|-------------|------|---------|
|`WorkflowExecutor__SkipExecutionUsingOutputFile`|The file to use to spoof a workflow execution|`string`||
|`WorkflowExecutor__SkipFullProvenanceCrate`|Skip producing the full provenence crate?|`bool`|`false`|
|`WorkflowExecutor__RemainAttached`|Remain attached to the executor rather than run in the background?|`bool`|`false`|
|`Flags__StandaloneMode`|Hutch will skip TRE Controller interactions|`bool`|`false`|
|`Flags__RetainFailures`|Hutch will not clean up working directories or database records for jobs that fail|`bool`|`false`|

```json
{
  // Kestrel options e.g. port bindings
  // By default Hutch binds on all interfaces on specific non-privileged ports
  // You can change the binding configuration
  // but Hutch should not be bound on privileged ports (< 1024) if you don't want to run it evelated
  // and Hutch should not be bound on 80/443 in airgapped environments where nginx is used to proxy workflow fetching (as nginx will use those ports)
  "Kestrel": {
    "Endpoints": {
      "Http": {
        "Url": "http://0.0.0.0:5209"
      },
      "Https": {
        "Url": "https://0.0.0.0:7239"
      }
    }
  },

  // Local working paths used by Hutch itself
  "Paths": {
    "WorkingDirectoryBase": "$HOME/hutch-workdir", // Hutch's working directory
    "Jobs": "jobs" // Sub-directory for per-job working directories
  },

  // Configuration for Hutch's internal Action Queue (RabbitMQ)
  // For actual defaults, see RabbitMQ documentation
  "Queue": {
    "Hostname": "", // RabbitMQ Host
    "Port": 0, // RabbitMQ Port
    "UserName": "", // RabbitMQ User
    "Password": "" // RabbitMQ Password
  },

  // Configure the internal queue name, how it checks for jobs, and how many can run concurrently
  "JobActionsQueueOptions": {
    "QueueName": "WorkflowJobActions",
    "PollingIntervalSeconds": 5, // How often Hutch checks the queue for new Actions
    "MaxParallelism": 10 // How many actions from the queue will Hutch run concurrently
  },

  // MinIO Intermediary Store Defaults
  // These are are used for Egress in Standalone Mode
  // And as a fallback for Submissions/Egress when only partial bucket details are provided.
  "StoreDefaults": {
    "Host": "localhost:9000",
    "AccessKey": "",
    "SecretKey": "",
    "Secure": true,
    "Bucket": ""
  },

  "IdentityProvider": {
    "OpenIdBaseUrl": "", // e.g. https://keycloak.tre.com/realms/tre-fx
    
    // If you want Hutch to use OIDC for Minio credentials,
    // this must match the Minio OIDC Client ID!
    // Otherwise it can be a Hutch specific client
    "ClientId": "",

    // May be optional depending on the IdP client config
    // If required and using OIDC for Minio credentials,
    // this must match the Minio OIDC Client Secret!
    "ClientSecret": "",
    
    // User credentials Hutch will act on behalf of
    "Username": "",
    "Password": ""
  },

  // Configuration for tracking Workflow Execution
  // Currently WfExS specific
  "WorkflowExecutor": {
    "ExecutorPath": "$HOME/WfExS-backend",
    "VirtualEnvironmentPath": "$HOME/WfExS-backend/.pyWEenv/bin/activate",
    "LocalConfigPath": "$HOME/WfExS-backend/local_config.yaml",
    "ContainerEngine": "docker", // other valid options are "singularity" and "podman"

    // The below are more for development / debugging

    // If a path is provided, Hutch will skip Workflow Execution altogether
    // and instead use the zip file from this path as if it were the execution output
    "SkipExecutionUsingOutputFile": "", // e.g. `"path/to/execution.crate.zip"`

    // Really we always want a full crate, but some wfexs configs
    // particularly with certain container engines
    // are unreliable with `--full`` on or off, so it can be configured for testing.
    "SkipFullProvenanceCrate": false,
    
    // by default Hutch detaches from the wfexs process once it starts it,
    // to free up threads.
    // This forces Hutch to keep the executing thread attached to the wfexs process
    // which means you can see stdout/stderr from wfexs in realtime,
    // and better understand the circumstances under which wfexs exited.
    // Intended for dev/test use while executing one job at a time.
    "RemainAttached": false,
  },

  // Connection strings for different services
  "ConnectionStrings": {
    // The database tracking the jobs in the agent
    "AgentDb": "Data Source=HutchAgent.db"
  },

  // Configurable details to add to published Results Crates.
  "CratePublishing": {
    // this section defaults to `null`
    "Publisher": {
      "Id": "" // Desired Identifier (typically URL) for the Publisher in Results Crates.
    },
    // this section defaults to `null`
    "License": {
      "Uri": "", // A URI to the license e.g. https://spdx.org/licenses/CC-BY-4.0
      "Properties": {
        "Identifier": null, // short-form of the license e.g. CC-BY-4.0
        "Name": null // long-form name of the license e.g. Creative Commons Attribution 4.0 International
      }
    }
  },

  // This section tells Hutch where the controller API is hosted
  "ControllerApi": {
    // The URL of the controller API
    "BaseUrl": ""
  },

  // Development Flags
  // These are really intended for development or debugging use
  // and their continued presence cannot be relied upon from one build to the next!
  "Flags": {
    "StandaloneMode": false, // Hutch will skip TRE Controller interactions
    "RetainFailures": false // Hutch will not clean up working directories or database records for jobs that fail.
  }
}
```

```
[Unit]
Description=HutchAgent ASP.NET app

[Service]
WorkingDirectory=/home/ansible/HutchAgent
ExecStart=/home/ansible/HutchAgent/HutchAgent
Restart=always
# Restart service after 10 seconds if the dotnet service crashes:
RestartSec=10
KillSignal=SIGINT
SyslogIdentifier=hutch-agent
User=ansible
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
# Environment=StoreDefaults__Host=localhost:9000
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

## Guidance
### Intermediary Store
- Primarily for Standalone mode or as a fallback; you may configure MinIO connection details to a default store here.

### Workflow Executor
- The `ExecutorPath` must be the directory where WfExS is installed.

- The `VirtualEnvironmentPath` must be the path to the `activate` script in the WfExS install directory, e.g. `/path/to/WfExS-backend/.pyWEenv/bin/activate`.

- The `LocalConfigPath` is the path of a YAML file describing your WfExS installation.

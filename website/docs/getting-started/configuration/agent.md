---
sidebar_position: 2
---

# Hutch Agent

This section shows the options that can used in a production environment as well as a development environment. It also gives a brief description along with the variable's type. The variables will default to the value in the "Default" column if one is specified. Variables with no default value must be provided yourself. Variables marked with **(Required)** must be given or Hutch will not work.

Hutch can be configured using the following source in [the usual .NET way](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/configuration), in order of precedence:
-  `appsettings.json` adjacent to the binary (`HutchAgent.dll`)
- Environment Variables (with double underscore `__` as a hierarchical separator)
- Command line arguments
- (.NET User Secrets in development)

## Available options

### Paths

| Variable name | Description | Type | Default |
|---------------|-------------|------|---------|
|`WorkingDirectoryBase`|Hutch's working directory|`string`|`$HOME/hutch-workdir`|
|`Jobs`|Sub-directory for per-job working directories|`string`|`jobs`|

### Queue
| Variable name | Description | Type | Default |
|---------------|-------------|------|---------|
|`Hostname`|**(Required)** The URL to the RabbitMQ instance hosting the queue|`string`||
|`Port`|**(Required)** The port for the RabbitMQ instance|`int`||
|`UserName`|**(Required)** The username for the RabbitMQ instance|`string`||
|`Password`|**(Required)** The password the RabbitMQ instance|`string`||

### JobActionsQueueOptions
| Variable name | Description | Type | Default |
|---------------|-------------|------|---------|
|`QueueName`|The name of the job queue|`string`|`WorkflowJobActions`|
|`PollingIntervalSeconds`|How often Hutch checks the queue for new Actions|`int`|`5`|
|`MaxParallelism`|How many actions from the queue will Hutch run concurrently|`int`|`10`|

### StoreDefaults
| Variable name | Description | Type | Default |
|---------------|-------------|------|---------|
|`Host`|The URL to your S3 storage (e.g. MinIO)|`string`|`localhost:9000`|
|`AccessKey`|**(Required)** The access key to your S3 storage|`string`||
|`SecretKey`|**(Required)** The secret key to your S3 storage|`string`||
|`Secure`|Access your S3 using HTTPS?|`bool`|`true`|
|`Bucket`|**(Required)** The name of your S3 storage bucket|`string`||

### IdentityProvider
| Variable name | Description | Type | Default |
|---------------|-------------|------|---------|
|`ClientId`|**(Required)** The ID of your client on your OAuth2.0 provider|`string`||
|`ClientSecret`|**(Required)** The secret of your client on your OAuth2.0 provider|`string`||
|`Username`|**(Required)** Your username on your client on your OAuth2.0 provider|`string`||
|`Password`|**(Required)** Your password on your client on your OAuth2.0 provider|`string`||

### Serilog
Use these settings to configure `HutchAgent`'s logging behaviour.

| Variable name | Description | Type | Default |
|---------------|-------------|------|---------|
|`Using`|The sinks to send your logging output|`string[]`|`["Serilog.Sinks.Console"]`|
|`Enrich`||`string[]`|`["FromLogContext", "WithThreadId"]`|
|`MinimumLevel`|Arguments for the minimum logging level|`object`|[see here](#minimumlevel-default)|
|`WriteTo`|Options for output sinks|`object[]`|[see here](#writeto-default)|

#### `MinimumLevel` default
```json
{
  "Default": "Information",
  "Override": {
    "Microsoft.Hosting.Lifetime": "Information",
    "Hutch": "Information",
    "Microsoft": "Warning",
    "System": "Warning"
  }
}
```

#### `WriteTo` default
```json
[
  {
    "Name": "Console",
    "Args": {
      "outputTemplate": "[{Timestamp:HH:mm:ss} {Level:u4}] {Message:lj} <s:{SourceContext}>{NewLine}{Exception}",
      "theme": "Serilog.Sinks.SystemConsole.Themes.AnsiConsoleTheme::Code, Serilog.Sinks.Console"
    }
  }
]
```

### WorkflowExecutor
| Variable name | Description | Type | Default |
|---------------|-------------|------|---------|
|`ExecutorPath`|The path to where the executor is installed|`string`|`$HOME/WfExS-backend`|
|`VirtualEnvironmentPath`|The path to activate the executor's virtual environment|`string`|`$HOME/WfExS-backend/.pyWEenv/bin/activate`|
|`LocalConfigPath`|The path to the local configuration file of the executor|`string`|`"$HOME/WfExS-backend/local_config.yaml"`|
|`ContainerEngine`|The name of the container engine to run workflows (can be `docker`, `singularity` or `podman`)|`string`|`docker`|

#### Development-only
| Variable name | Description | Type | Default |
|---------------|-------------|------|---------|
|`SkipExecutionUsingOutputFile`|The file to use to spoof a workflow execution|`string`||
|`SkipFullProvenanceCrate`|Skip producing the full provenence crate? Calls WfExS without `--full` if `true`|`bool`|`false`|
|`RemainAttached`|Remain attached to the executor rather than run in the background?|`bool`|`false`|

### ConnectionStrings
| Variable name | Description | Type | Default |
|---------------|-------------|------|---------|
|`ConnectionStrings__AgentDb`|The connection string for Hutch's internal database|`string`|`Data Source=HutchAgent.db`|

### ControllerApi
| Variable name | Description | Type | Default |
|---------------|-------------|------|---------|
|`ControllerApi__BaseUrl`|**(Required)** The base URL for the TRE controller|`string`||

### CratePublishing - Publisher
| Variable name | Description | Type | Default |
|---------------|-------------|------|---------|
|`Id`|The identifier (typically a URL) for the Publisher in Results Crates|`string`||

### CratePublishing - License
| Variable name | Description | Type | Default |
|---------------|-------------|------|---------|
|`Uri`|The URI to the license e.g. https://spdx.org/licenses/CC-BY-4.0|`string`||

### CratePublishing - License - Properties
| Variable name | Description | Type | Default |
|---------------|-------------|------|---------|
|`Identifier`|The short-form of the license e.g. CC-BY-4.0|`string`||
|`Name`|The long-form name of the license e.g. Creative Commons Attribution 4.0 International|`string`||

## Feature flags (Development-only)
### Flags
| Variable name | Description | Type | Default |
|---------------|-------------|------|---------|
|`StandaloneMode`|Hutch will skip TRE Controller interactions|`bool`|`false`|
|`RetainFailures`|Hutch will not clean up working directories or database records for jobs that fail|`bool`|`false`|


## Examples
### `appsettings.json`
```json
"IdentityProvider": {
  "ClientId": "my-client-id",
  "ClientSecret": "my-client-secret",
  "Username": "Alice",
  "Password": "AlicesPassword"
}
```

### Environment variables
```
IdentityProvider__ClientId=my-client-id
IdentityProvider__ClientSecret=my-client-secret
IdentityProvider__Username=Alice
IdentityProvider__Password=AlicesPassword
```

### .NET User Secrets
```json
"IdentityProvider:ClientId": "my-client-id"
"IdentityProvider:ClientSecret": "my-client-secret"
"IdentityProvider:Username": "Alice"
"IdentityProvider:Password": "AlicesPassword"
```

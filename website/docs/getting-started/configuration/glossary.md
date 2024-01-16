---
sidebar_position: 5
---

# Glossary - Environment Variables

## Using environment variables

Hutch can be configured using the following source in [the usual .NET way](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/configuration), in order of precedence:
-  `appsettings.json` adjacent to the binary (`HutchAgent.dll`)
- Environment Variables (with double underscore `__` as a hierarchical separator)
- Command line arguments
- (.NET User Secrets in development)

## Available values

The following table shows the environment variables that can used in a production environment as well as a development environment. It also gives a brief description along with the variable's type. The variables will default to the value in the "Default" column if one is specified. Variables with no default value must be provided yourself.

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

## Development-only variables
The following table shows configuration values used for **development purposes only**

| Varibale name | Description | Type | Default |
|---------------|-------------|------|---------|
|`WorkflowExecutor__SkipExecutionUsingOutputFile`|The file to use to spoof a workflow execution|`string`||
|`WorkflowExecutor__SkipFullProvenanceCrate`|Skip producing the full provenence crate?|`bool`|`false`|
|`WorkflowExecutor__RemainAttached`|Remain attached to the executor rather than run in the background?|`bool`|`false`|
|`Flags__StandaloneMode`|Hutch will skip TRE Controller interactions|`bool`|`false`|
|`Flags__RetainFailures`|Hutch will not clean up working directories or database records for jobs that fail|`bool`|`false`|

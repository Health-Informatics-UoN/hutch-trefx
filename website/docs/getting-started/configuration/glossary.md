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

The following table shows the environment variables that can used in a production environment as well as a development environment. It also gives a brief description along with the variable's type. The variables will default to the value in the "Default" column if one is specified. Variables with no default value must be provided yourself. Variables marked with **(Required)** must be given or Hutch will not work.

NB: `StoreDefaults__Host`, unlike the other `StoreDefaults__*` variables is not required if you have a S3 store running on your local machine at port 9000. If you are using a remote S3 instance or a different port, you must set this variable.

| Varibale name | Description | Type | Default |
|---------------|-------------|------|---------|
|`Paths__WorkingDirectoryBase`|Hutch's working directory|`string`|`$HOME/hutch-workdir`|
|`Paths__Jobs`|Sub-directory for per-job working directories|`string`|`jobs`|
|`Queue__Hostname`|**(Required)** The URL to the RabbitMQ instance hosting the queue|`string`||
|`Queue__Port`|**(Required)** The port for the RabbitMQ instance|`int`||
|`Queue__UserName`|**(Required)** The username for the RabbitMQ instance|`string`||
|`Queue__Password`|**(Required)** The password the RabbitMQ instance|`string`||
|`JobActionsQueueOptions__QueueName`|The name of the job queue|`string`|`WorkflowJobActions`|
|`JobActionsQueueOptions__PollingIntervalSeconds`|How often Hutch checks the queue for new Actions|`int`|`5`|
|`JobActionsQueueOptions__MaxParallelism`|How many actions from the queue will Hutch run concurrently|`int`|`10`|
|`StoreDefaults__Host`|The URL to your S3 storage (e.g. MinIO)|`string`|`localhost:9000`|
|`StoreDefaults__AccessKey`|**(Required)** The access key to your S3 storage|`string`||
|`StoreDefaults__SecretKey`|**(Required)** The secret key to your S3 storage|`string`||
|`StoreDefaults__Secure`|**(Required)** Access your S3 using HTTPS?|`bool`|`true`|
|`StoreDefaults__Bucket`|**(Required)** The name of your S3 storage bucket|`string`||
|`IdentityProvider__OpenIdBaseUrl`|**(Required)** The base URL of your OAuth2.0 provider|`string`||
|`IdentityProvider__ClientId`|**(Required)** The ID of your client on your OAuth2.0 provider|`string`||
|`IdentityProvider__ClientSecret`|**(Required)** The secret of your client on your OAuth2.0 provider|`string`||
|`IdentityProvider__Username`|**(Required)** Your username on your client on your OAuth2.0 provider|`string`||
|`IdentityProvider__Password`|**(Required)** Your password on your client on your OAuth2.0 provider|`string`||
|`WorkflowExecutor__ExecutorPath`|The path to where the executor is installed|`string`|`$HOME/WfExS-backend`|
|`WorkflowExecutor__VirtualEnvironmentPath`|The path to activate the executor's virtual environment|`string`|`$HOME/WfExS-backend/.pyWEenv/bin/activate`|
|`WorkflowExecutor__LocalConfigPath`|The path to the local configuration file of the executor|`string`|`"$HOME/WfExS-backend/local_config.yaml"`|
|`WorkflowExecutor__ContainerEngine`|The name of the container engine to run workflows (can be `docker`, `singularity` or `podman`)|`string`|`docker`|
|`ConnectionStrings__AgentDb`|The connection string for Hutch's internal database|`string`|`Data Source=HutchAgent.db`|
|`ControllerApi__BaseUrl`|**(Required)** The base URL for the TRE controller|`string`||
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

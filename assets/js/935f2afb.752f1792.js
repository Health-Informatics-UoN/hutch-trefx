"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[53],{1109:e=>{e.exports=JSON.parse('{"pluginId":"default","version":"current","label":"Next","banner":null,"badge":false,"noIndex":false,"className":"docs-version-current","isLast":true,"docsSidebars":{"docs":[{"type":"category","label":"Getting Started","collapsible":true,"collapsed":true,"items":[{"type":"link","label":"Introduction","href":"/hutch/docs/getting-started/","docId":"getting-started/index"},{"type":"category","label":"Configuration","collapsible":true,"collapsed":true,"items":[{"type":"link","label":"Hutch Agent","href":"/hutch/docs/getting-started/configuration/agent","docId":"getting-started/configuration/agent"},{"type":"link","label":"Logging","href":"/hutch/docs/getting-started/configuration/logging","docId":"getting-started/configuration/logging"},{"type":"link","label":"WorkflowHub in a TRE","href":"/hutch/docs/getting-started/configuration/workflowhub-spoof","docId":"getting-started/configuration/workflowhub-spoof"},{"type":"link","label":"Docker Images in a TRE","href":"/hutch/docs/getting-started/configuration/docker-hub-spoof","docId":"getting-started/configuration/docker-hub-spoof"}],"href":"/hutch/docs/category/configuration"},{"type":"category","label":"Installation","collapsible":true,"collapsed":true,"items":[{"type":"link","label":"Hutch Agent","href":"/hutch/docs/getting-started/installation/agent","docId":"getting-started/installation/agent"}],"href":"/hutch/docs/getting-started/installation/"}],"href":"/hutch/docs/category/getting-started"},{"type":"category","label":"External Systems","collapsible":true,"collapsed":true,"items":[{"type":"link","label":"Keycloak","href":"/hutch/docs/external-systems/keycloak/","docId":"external-systems/keycloak/index"},{"type":"category","label":"MinIO","collapsible":true,"collapsed":true,"items":[{"type":"link","label":"Using MinIO","href":"/hutch/docs/external-systems/minio/using_minio","docId":"external-systems/minio/using_minio"},{"type":"link","label":"MinIO and Keycloak","href":"/hutch/docs/external-systems/minio/minio-keycloak","docId":"external-systems/minio/minio-keycloak"}],"href":"/hutch/docs/external-systems/minio/"},{"type":"category","label":"Nexus","collapsible":true,"collapsed":true,"items":[{"type":"link","label":"Using Nexus","href":"/hutch/docs/external-systems/nexus/using_nexus","docId":"external-systems/nexus/using_nexus"},{"type":"link","label":"File Store on Nexus","href":"/hutch/docs/external-systems/nexus/file-store","docId":"external-systems/nexus/file-store"}],"href":"/hutch/docs/external-systems/nexus/"},{"type":"category","label":"WfExS","collapsible":true,"collapsed":true,"items":[{"type":"link","label":"Installing WfExS","href":"/hutch/docs/external-systems/wfexs/installing-wfexs","docId":"external-systems/wfexs/installing-wfexs"},{"type":"link","label":"Configuration","href":"/hutch/docs/external-systems/wfexs/config","docId":"external-systems/wfexs/config"},{"type":"link","label":"Running WfExS","href":"/hutch/docs/external-systems/wfexs/running-wfexs","docId":"external-systems/wfexs/running-wfexs"},{"type":"link","label":"Set up a Ubuntu Linux Environment to Run WfExS","href":"/hutch/docs/external-systems/wfexs/wfexs-dev-env","docId":"external-systems/wfexs/wfexs-dev-env"},{"type":"link","label":"Exported Crates","href":"/hutch/docs/external-systems/wfexs/exported-crates","docId":"external-systems/wfexs/exported-crates"}],"href":"/hutch/docs/external-systems/wfexs/"}],"href":"/hutch/docs/category/external-systems"},{"type":"category","label":"Development","collapsible":true,"collapsed":true,"items":[{"type":"link","label":"Getting Started","href":"/hutch/docs/development/","docId":"development/index"},{"type":"link","label":"Partial Running","href":"/hutch/docs/development/partial-running","docId":"development/partial-running"}],"href":"/hutch/docs/category/development"},{"type":"category","label":"TRE-FX","collapsible":true,"collapsed":true,"items":[{"type":"link","label":"TRE-FX Deployment Notes","href":"/hutch/docs/tre-fx/deployment-notes","docId":"tre-fx/deployment-notes"}],"href":"/hutch/docs/category/tre-fx"}]},"docs":{"development/index":{"id":"development/index","title":"Getting Started","description":"Here\'s how to run a local development stack, and guidance on developing different specific parts of the stack","sidebar":"docs"},"development/partial-running":{"id":"development/partial-running","title":"Partial Running","description":"It\'s possible to run Hutch with only partial engagement with the external services it interacts with.","sidebar":"docs"},"external-systems/keycloak/index":{"id":"external-systems/keycloak/index","title":"Keycloak","description":"Keycloak is a popular Open ID Connect (OIDC) Identity Provider.","sidebar":"docs"},"external-systems/minio/index":{"id":"external-systems/minio/index","title":"MinIO","description":"MinIO is a system for S3 compatible object storage. There are SDKs for MinIO in various languages like .NET, Javascript, Python, etc.","sidebar":"docs"},"external-systems/minio/minio-keycloak":{"id":"external-systems/minio/minio-keycloak","title":"MinIO and Keycloak","description":"You can connect Minio to Keycloak as an additional authentication source.","sidebar":"docs"},"external-systems/minio/using_minio":{"id":"external-systems/minio/using_minio","title":"Using MinIO","description":"Installation","sidebar":"docs"},"external-systems/nexus/file-store":{"id":"external-systems/nexus/file-store","title":"File Store on Nexus","description":"Making a hosted File Store","sidebar":"docs"},"external-systems/nexus/index":{"id":"external-systems/nexus/index","title":"Nexus","description":"Nexus is a system for building various types of repositories locally, like Git, Docker, Nuget, PyPI and more.","sidebar":"docs"},"external-systems/nexus/using_nexus":{"id":"external-systems/nexus/using_nexus","title":"Using Nexus","description":"Installation","sidebar":"docs"},"external-systems/wfexs/config":{"id":"external-systems/wfexs/config","title":"Configuration","description":"Local WfExS Configuration","sidebar":"docs"},"external-systems/wfexs/exported-crates":{"id":"external-systems/wfexs/exported-crates","title":"Exported Crates","description":"Wfexs will let you export ro-crates of different types (with different contents) at a few points along the way.","sidebar":"docs"},"external-systems/wfexs/index":{"id":"external-systems/wfexs/index","title":"WfExS","description":"Hutch uses the Workflow Execution Service (WfExS) backend for running workflows on user provided inputs and data. WfExS can be found at https://github.com/inab/WfExS-backend.","sidebar":"docs"},"external-systems/wfexs/installing-wfexs":{"id":"external-systems/wfexs/installing-wfexs","title":"Installing WfExS","description":"System requirements","sidebar":"docs"},"external-systems/wfexs/running-wfexs":{"id":"external-systems/wfexs/running-wfexs","title":"Running WfExS","description":"For a full description of all functions offered by WfExS, refer to the README at https://github.com/inab/WfExS-backend.","sidebar":"docs"},"external-systems/wfexs/wfexs-dev-env":{"id":"external-systems/wfexs/wfexs-dev-env","title":"Set up a Ubuntu Linux Environment to Run WfExS","description":"In the hutch monorepo there is an Ansible playbook which you can use to quickly build an Ubuntu Linux environment for running WfExS.","sidebar":"docs"},"getting-started/configuration/agent":{"id":"getting-started/configuration/agent","title":"Hutch Agent","description":"This section shows the options that can used in a production environment as well as a development environment. It also gives a brief description along with the variable\'s type. The variables will default to the value in the \\"Default\\" column if one is specified. Variables with no default value must be provided yourself. Variables marked with (Required) must be given or Hutch will not work.","sidebar":"docs"},"getting-started/configuration/docker-hub-spoof":{"id":"getting-started/configuration/docker-hub-spoof","title":"Docker Images in a TRE","description":"This page assumes you are using Ubuntu Linux as your OS and that you will have root or sudo privileges.","sidebar":"docs"},"getting-started/configuration/logging":{"id":"getting-started/configuration/logging","title":"Logging","description":"By default, HutchAgent logs to the console. This is sufficient in development situations. However, in production, it is more practical to capture the logs with centralised services like Seq.","sidebar":"docs"},"getting-started/configuration/workflowhub-spoof":{"id":"getting-started/configuration/workflowhub-spoof","title":"WorkflowHub in a TRE","description":"This page assumes you are using Ubuntu Linux as your OS and that you will have root or sudo privileges.","sidebar":"docs"},"getting-started/index":{"id":"getting-started/index","title":"Introduction","description":"Hutch is an open-source tool that enables federated activities on your data. Third parties can run analyses, train machine learning models and much more against your data without it ever leaving your custody.","sidebar":"docs"},"getting-started/installation/agent":{"id":"getting-started/installation/agent","title":"Hutch Agent","description":"The Hutch Agent is a .NET application written in C#. It is responsible for receiving 5-Safes RO-Crates with an approved workflow and triggering the execution of that workflow. It then awaits the results of the execution and packages them to be sent back to the TRE Controller.","sidebar":"docs"},"getting-started/installation/index":{"id":"getting-started/installation/index","title":"Installation","description":"To run the Hutch application stack, there are four components that need installing.","sidebar":"docs"},"tre-fx/deployment-notes":{"id":"tre-fx/deployment-notes","title":"TRE-FX Deployment Notes","description":"This section contains notes specific to the deployment of testing/showcase environments for the TRE-FX project.","sidebar":"docs"}}}')}}]);
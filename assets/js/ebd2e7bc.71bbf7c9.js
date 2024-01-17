"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[903],{38570:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>h});var o=n(70079);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},i=Object.keys(e);for(o=0;o<i.length;o++)n=i[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(o=0;o<i.length;o++)n=i[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var u=o.createContext({}),s=function(e){var t=o.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},p=function(e){var t=s(e.components);return o.createElement(u.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},d=o.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,u=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),d=s(n),h=r,m=d["".concat(u,".").concat(h)]||d[h]||c[h]||i;return n?o.createElement(m,a(a({ref:t},p),{},{components:n})):o.createElement(m,a({ref:t},p))}));function h(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,a=new Array(i);a[0]=d;var l={};for(var u in t)hasOwnProperty.call(t,u)&&(l[u]=t[u]);l.originalType=e,l.mdxType="string"==typeof e?e:r,a[1]=l;for(var s=2;s<i;s++)a[s]=n[s];return o.createElement.apply(null,a)}return o.createElement.apply(null,n)}d.displayName="MDXCreateElement"},64406:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>u,contentTitle:()=>a,default:()=>c,frontMatter:()=>i,metadata:()=>l,toc:()=>s});var o=n(52203),r=(n(70079),n(38570));const i={},a="Partial Running",l={unversionedId:"development/partial-running",id:"development/partial-running",title:"Partial Running",description:"It's possible to run Hutch with only partial engagement with the external services it interacts with.",source:"@site/docs/development/partial-running.md",sourceDirName:"development",slug:"/development/partial-running",permalink:"/hutch/docs/development/partial-running",draft:!1,editUrl:"https://github.com/health-informatics-uon/hutch/tree/main/website/docs/development/partial-running.md",tags:[],version:"current",frontMatter:{},sidebar:"docs",previous:{title:"Getting Started",permalink:"/hutch/docs/development/"},next:{title:"TRE-FX",permalink:"/hutch/docs/category/tre-fx"}},u={},s=[{value:"Dummy Controller API",id:"dummy-controller-api",level:2},{value:"Standalone Mode",id:"standalone-mode",level:2},{value:"Intermediary Store without OIDC",id:"intermediary-store-without-oidc",level:2},{value:"Skip Workflow Execution",id:"skip-workflow-execution",level:2}],p={toc:s};function c(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,o.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"partial-running"},"Partial Running"),(0,r.kt)("p",null,"It's possible to run Hutch with only partial engagement with the external services it interacts with."),(0,r.kt)("p",null,"This document provides notes around how to configure Hutch to skip certain external interactions, which can simplify development setup and actually developing and testing certain areas of the application."),(0,r.kt)("p",null,"Obviously features should be fully tested with all external services before being considered complete and working, but omitting some interactions can significantly quicken the internal developer loop."),(0,r.kt)("h2",{id:"dummy-controller-api"},"Dummy Controller API"),(0,r.kt)("p",null,"Hutch provides a dummy implementation of the TRE Controller API which is interface compliant with only the parts of the TRE Controller that Hutch interacts with."),(0,r.kt)("p",null,"You can run this in development as a substitute for a real Controller API implementation, but it still requires OIDC config."),(0,r.kt)("p",null,"Since the Dummy Controller API is not a complete implementation, interaction with Hutch differs as follows:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"You must manually submit jobs to the Hutch Agent ",(0,r.kt)("inlineCode",{parentName:"li"},"/jobs")," endpoint")),(0,r.kt)("h2",{id:"standalone-mode"},"Standalone Mode"),(0,r.kt)("p",null,"Standalone mode forces Hutch to run without ever interacting with a TRE Controller API (not even the dummy one)."),(0,r.kt)("p",null,"This means you don't need a TRE Controller API."),(0,r.kt)("p",null,"It also means (depending on your Intermediary Store config) that you may not need OIDC config (and therefore not need an Identity Provider like Keycloak). See ",(0,r.kt)("a",{parentName:"p",href:"#intermediary-store-without-oidc"},"below")," "),(0,r.kt)("p",null,"In Standalone mode, Hutch does the following things:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Status Updates only log to local logging targets - no HTTP requests are made"),(0,r.kt)("li",{parentName:"ul"},'InitiateEgress will not make an HTTP request for Egress Bucket Details; instead it will substitute the locally configured details in "StoreDefaults"'),(0,r.kt)("li",{parentName:"ul"},"InitiateEgress will not make an HTTP request for ",(0,r.kt)("inlineCode",{parentName:"li"},"FilesReadyForReview")," when it has uploaded outputs to the Egress Bucket.",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"it will log when output uploading is complete, and advise you to make an approval request manually"))),(0,r.kt)("li",{parentName:"ul"},"It will not make a ",(0,r.kt)("inlineCode",{parentName:"li"},"FinalOutcome")," HTTP Request once packaging and upload of the final results crate is complete")),(0,r.kt)("p",null,"Changes to interacting with Hutch are therefore as follows:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"You must manually submit jobs to the ",(0,r.kt)("inlineCode",{parentName:"li"},"/jobs")," endpoint"),(0,r.kt)("li",{parentName:"ul"},"You must manually approve egress at the ",(0,r.kt)("inlineCode",{parentName:"li"},"/jobs/{id}/approval")," endpoint")),(0,r.kt)("h2",{id:"intermediary-store-without-oidc"},"Intermediary Store without OIDC"),(0,r.kt)("p",null,"In the full TRE-FX stack, the expectation is that Hutch will interact with an OIDC Identity Provider to get tokens, and those tokens will be used in two places:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"all TRE Controller API requests"),(0,r.kt)("li",{parentName:"ul"},"to get temporary credentials for Intermediary Store API requests")),(0,r.kt)("p",null,"It is however possible to use the Intermediary Store without OIDC."),(0,r.kt)("p",null,'If Hutch\'s "StoreDefaults" contain an ',(0,r.kt)("inlineCode",{parentName:"p"},"accessKey")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"secretKey")," these can be used instead of using an OIDC token to get temporary ones."),(0,r.kt)("p",null,"Also for job submissions, the ",(0,r.kt)("inlineCode",{parentName:"p"},"crateSource")," can include an ",(0,r.kt)("inlineCode",{parentName:"p"},"accessKey")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"secretKey")," to be used directly."),(0,r.kt)("p",null,"If Hutch is also in Standalone Mode, then OIDC is not required at all, and Hutch's OIDC configuration can be omitted, and the OIDC service (e.g. Keycloak in the development ",(0,r.kt)("inlineCode",{parentName:"p"},"docker-compose"),") need not be run or configured."),(0,r.kt)("h2",{id:"skip-workflow-execution"},"Skip Workflow Execution"),(0,r.kt)("p",null,"Normally, when Hutch receives a job, it fetches a referenced workflow for the job and executes it, then handles returning the outputs to the job's source via the Intermediary Store."),(0,r.kt)("p",null,"However this requires environment setup of the actual Workflow Executor (e.g. Wfexs), and workflow staging and execution can be quite slow."),(0,r.kt)("p",null,"It is possible to skip execution altogether (but retain the integrity of the rest of the job lifecycle - before and after execution), which can be useful when developing or testing post-execution behaviours."),(0,r.kt)("p",null,"To do this, you'll need a suitable zip file to act as the outputs from the execution that never happened. Hutch will then substitute this output file at the correct point in the lifecycle, and carry on as if everything was normal."),(0,r.kt)("p",null,"It's recommended to use a real execution output if possible - even better if it's for the input job's workflow, to at least appear to be authentic."),(0,r.kt)("p",null,"Set the setting ",(0,r.kt)("inlineCode",{parentName:"p"},"WorkflowExecutor:SkipExecutionUsingOutputFile")," to a non-empty value, which should be the path to your dummy output zip. Absolute paths are fine; relative paths are relative to the working directory root for Hutch as defined in the setting ",(0,r.kt)("inlineCode",{parentName:"p"},"Paths:WorkingDirectoryBase"),". It's intended for this file to be used statically across multiple job runs, so it's not a per-job path."))}c.isMDXComponent=!0}}]);
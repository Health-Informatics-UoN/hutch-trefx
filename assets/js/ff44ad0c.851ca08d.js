"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[103],{38570:(e,n,t)=>{t.d(n,{Zo:()=>p,kt:()=>m});var r=t(70079);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function a(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?a(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,r,o=function(e,n){if(null==e)return{};var t,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var s=r.createContext({}),c=function(e){var n=r.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},p=function(e){var n=c(e.components);return r.createElement(s.Provider,{value:n},e.children)},f={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},u=r.forwardRef((function(e,n){var t=e.components,o=e.mdxType,a=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),u=c(t),m=o,d=u["".concat(s,".").concat(m)]||u[m]||f[m]||a;return t?r.createElement(d,i(i({ref:n},p),{},{components:t})):r.createElement(d,i({ref:n},p))}));function m(e,n){var t=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var a=t.length,i=new Array(a);i[0]=u;var l={};for(var s in n)hasOwnProperty.call(n,s)&&(l[s]=n[s]);l.originalType=e,l.mdxType="string"==typeof e?e:o,i[1]=l;for(var c=2;c<a;c++)i[c]=t[c];return r.createElement.apply(null,i)}return r.createElement.apply(null,t)}u.displayName="MDXCreateElement"},56397:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>s,contentTitle:()=>i,default:()=>f,frontMatter:()=>a,metadata:()=>l,toc:()=>c});var r=t(52203),o=(t(70079),t(38570));const a={sidebar_position:2},i="Configuration",l={unversionedId:"external-systems/wfexs/config",id:"external-systems/wfexs/config",title:"Configuration",description:"Local WfExS Configuration",source:"@site/docs/external-systems/wfexs/config.md",sourceDirName:"external-systems/wfexs",slug:"/external-systems/wfexs/config",permalink:"/hutch-trefx/docs/external-systems/wfexs/config",draft:!1,editUrl:"https://github.com/health-informatics-uon/hutch-trefx/tree/main/website/docs/external-systems/wfexs/config.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"docs",previous:{title:"Installing WfExS",permalink:"/hutch-trefx/docs/external-systems/wfexs/installing-wfexs"},next:{title:"Running WfExS",permalink:"/hutch-trefx/docs/external-systems/wfexs/running-wfexs"}},s={},c=[{value:"Local WfExS Configuration",id:"local-wfexs-configuration",level:2},{value:"Workflow Configuration",id:"workflow-configuration",level:2}],p={toc:c};function f(e){let{components:n,...t}=e;return(0,o.kt)("wrapper",(0,r.Z)({},p,t,{components:n,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"configuration"},"Configuration"),(0,o.kt)("h2",{id:"local-wfexs-configuration"},"Local WfExS Configuration"),(0,o.kt)("p",null,"The local configuration for WfExS is provided in a YAML (",(0,o.kt)("inlineCode",{parentName:"p"},".yaml"),"/",(0,o.kt)("inlineCode",{parentName:"p"},".yml"),") file. An initial local configuration can be made by running the following command in an empty directory:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-shell"},"./WfExS_backend.py init\n")),(0,o.kt)("p",null,"An example local config may look like:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-yaml"},"workDir: ./wfexs-backend-test_WorkDir\ncacheDir: ./wfexs-backend-test\ncrypt4gh:\n  key: local_config.yaml.key\n  passphrase: strive backyard dividing gumball\n  pub: local_config.yaml.pub\ntools:\n  dockerCommand: docker\n  containerType: singularity\n  encrypted_fs:\n    type: encfs\n    command: encfs\n  engineMode: local\n  gitCommand: git\n  javaCommand: java\n  singularityCommand: singularity\n  staticBashCommand: bash-linux-x86_64\n")),(0,o.kt)("p",null,"Under ",(0,o.kt)("inlineCode",{parentName:"p"},"tools"),", specify the commands to run programs like ",(0,o.kt)("inlineCode",{parentName:"p"},"singularity"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"java"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"docker"),", etc. If only the names are specified, as above, these programs must be in ",(0,o.kt)("inlineCode",{parentName:"p"},"$PATH"),". If any are not in ",(0,o.kt)("inlineCode",{parentName:"p"},"$PATH"),", either add them to ",(0,o.kt)("inlineCode",{parentName:"p"},"$PATH")," or give the full path to the progam here."),(0,o.kt)("h2",{id:"workflow-configuration"},"Workflow Configuration"),(0,o.kt)("p",null,"The workflow configuration is also given in a YAML file. Template:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-yaml"},"workflow_id: # URL to workflow\nworkflow_config:\n  secure: false\ncacheDir: /path/to/chacheDir\ncrypt4gh:\n  key: /path/to/private-key\n  passphrase: four random words here\n  pub: /path/to/public-key\nparams:\n  ...\noutputs:\n  ...\n")),(0,o.kt)("p",null,"The ",(0,o.kt)("inlineCode",{parentName:"p"},"params")," are the inputs to your workflow. The ",(0,o.kt)("inlineCode",{parentName:"p"},"outputs")," map to the expected files/directories that come out at the end of the workflow."),(0,o.kt)("p",null,"More information can be found at ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/inab/WfExS-backend#configuration-files"},"https://github.com/inab/WfExS-backend#configuration-files"),"."))}f.isMDXComponent=!0}}]);
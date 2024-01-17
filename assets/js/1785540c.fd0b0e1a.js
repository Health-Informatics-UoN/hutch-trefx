"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[856],{38570:(e,n,t)=>{t.d(n,{Zo:()=>m,kt:()=>d});var i=t(70079);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function r(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);n&&(i=i.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,i)}return t}function o(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?r(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):r(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function s(e,n){if(null==e)return{};var t,i,a=function(e,n){if(null==e)return{};var t,i,a={},r=Object.keys(e);for(i=0;i<r.length;i++)t=r[i],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(i=0;i<r.length;i++)t=r[i],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var l=i.createContext({}),c=function(e){var n=i.useContext(l),t=n;return e&&(t="function"==typeof e?e(n):o(o({},n),e)),t},m=function(e){var n=c(e.components);return i.createElement(l.Provider,{value:n},e.children)},p={inlineCode:"code",wrapper:function(e){var n=e.children;return i.createElement(i.Fragment,{},n)}},u=i.forwardRef((function(e,n){var t=e.components,a=e.mdxType,r=e.originalType,l=e.parentName,m=s(e,["components","mdxType","originalType","parentName"]),u=c(t),d=a,h=u["".concat(l,".").concat(d)]||u[d]||p[d]||r;return t?i.createElement(h,o(o({ref:n},m),{},{components:t})):i.createElement(h,o({ref:n},m))}));function d(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var r=t.length,o=new Array(r);o[0]=u;var s={};for(var l in n)hasOwnProperty.call(n,l)&&(s[l]=n[l]);s.originalType=e,s.mdxType="string"==typeof e?e:a,o[1]=s;for(var c=2;c<r;c++)o[c]=t[c];return i.createElement.apply(null,o)}return i.createElement.apply(null,t)}u.displayName="MDXCreateElement"},45097:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>o,default:()=>p,frontMatter:()=>r,metadata:()=>s,toc:()=>c});var i=t(52203),a=(t(70079),t(38570));const r={sidebar_position:1},o="Using MinIO",s={unversionedId:"external-systems/minio/using_minio",id:"external-systems/minio/using_minio",title:"Using MinIO",description:"Installation",source:"@site/docs/external-systems/minio/using_minio.md",sourceDirName:"external-systems/minio",slug:"/external-systems/minio/using_minio",permalink:"/hutch/docs/external-systems/minio/using_minio",draft:!1,editUrl:"https://github.com/health-informatics-uon/hutch/tree/main/website/docs/external-systems/minio/using_minio.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"docs",previous:{title:"MinIO",permalink:"/hutch/docs/external-systems/minio/"},next:{title:"MinIO and Keycloak",permalink:"/hutch/docs/external-systems/minio/minio-keycloak"}},l={},c=[{value:"Installation",id:"installation",level:2},{value:"Running MinIO",id:"running-minio",level:2},{value:"Creating a store",id:"creating-a-store",level:2},{value:"Creating an Access Key",id:"creating-an-access-key",level:2}],m={toc:c};function p(e){let{components:n,...r}=e;return(0,a.kt)("wrapper",(0,i.Z)({},m,r,{components:n,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"using-minio"},"Using MinIO"),(0,a.kt)("h2",{id:"installation"},"Installation"),(0,a.kt)("p",null,"The easiest way to install MinIO is by using Docker."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"docker pull minio/minio\n")),(0,a.kt)("p",null,"Information about the image as well as other versions are available ",(0,a.kt)("a",{parentName:"p",href:"https://hub.docker.com/r/minio/minio/"},"here"),"."),(0,a.kt)("h2",{id:"running-minio"},"Running MinIO"),(0,a.kt)("p",null,"When running MinIO in Docker, you expose 2 ports and map them to ports ",(0,a.kt)("inlineCode",{parentName:"p"},"9000")," and ",(0,a.kt)("inlineCode",{parentName:"p"},"9001")," inside the container. The following command will let you view the web console at ",(0,a.kt)("inlineCode",{parentName:"p"},"localhost:9001")," in the browser. The object store will be available at ",(0,a.kt)("inlineCode",{parentName:"p"},"localhost:9000"),"."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},'docker run -p 9000:9000 -p 9001:9001 \\\n  quay.io/minio/minio server /data --console-address ":9001"\n')),(0,a.kt)("p",null,"If you use ",(0,a.kt)("inlineCode",{parentName:"p"},"docker-compose"),", a MinIO service might look like this:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-yaml"},'minio:\n    image: minio/minio\n    restart: always\n    ports:\n      - "9000:9000" # S3 API\n      - "9001:9001" # web console\n    volumes:\n      - $HOME/minio-data:/data # (Optional) a persistent volume on your host machine\n    command: minio server /data --console-address ":9001"\n')),(0,a.kt)("h2",{id:"creating-a-store"},"Creating a store"),(0,a.kt)("p",null,"First, log into MinIO at ",(0,a.kt)("inlineCode",{parentName:"p"},"localhost:9001")," (or the port you mapped the web console to on the host machine) with the username ",(0,a.kt)("inlineCode",{parentName:"p"},"minioadmin")," and the password, also ",(0,a.kt)("inlineCode",{parentName:"p"},"minioadmin"),". Change these for increased security."),(0,a.kt)("p",null,'Navigate to "Buckets" and click "Create Bucket". Give the bucket a name and click "Create Bucket" at the bottom of the form.'),(0,a.kt)("hr",null),(0,a.kt)("p",null,(0,a.kt)("img",{src:t(72522).Z,width:"2080",height:"1282"})),(0,a.kt)("h2",{id:"creating-an-access-key"},"Creating an Access Key"),(0,a.kt)("p",null,'Navigate to "Access Keys" in the console and click "Create access key". Then click "Create" at the bottom of the form. You will be offered a download of the credentials, which can be used with your MinIO SDK of choice.'),(0,a.kt)("hr",null),(0,a.kt)("p",null,(0,a.kt)("img",{src:t(27489).Z,width:"2068",height:"994"})))}p.isMDXComponent=!0},27489:(e,n,t)=>{t.d(n,{Z:()=>i});const i=t.p+"assets/images/minio-access-key-b5168228375afb8b869fbeb34b5794a1.png"},72522:(e,n,t)=>{t.d(n,{Z:()=>i});const i=t.p+"assets/images/minio-create-bucket-588d67a918ae1149197664d2f132e2d9.png"}}]);
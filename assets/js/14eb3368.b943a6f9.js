"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[817],{32508:(e,t,n)=>{n.d(t,{Z:()=>E});var a=n(52203),r=n(70079),i=n(19841),l=n(15974),s=n(39085),c=n(35411),o=n(46748),m=n(82659),d=n(26839);function u(e){return r.createElement("svg",(0,a.Z)({viewBox:"0 0 24 24"},e),r.createElement("path",{d:"M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z",fill:"currentColor"}))}const b={breadcrumbsContainer:"breadcrumbsContainer_pueJ",breadcrumbHomeIcon:"breadcrumbHomeIcon_logW"};function h(e){let{children:t,href:n,isLast:a}=e;const i="breadcrumbs__link";return a?r.createElement("span",{className:i,itemProp:"name"},t):n?r.createElement(o.Z,{className:i,href:n,itemProp:"item"},r.createElement("span",{itemProp:"name"},t)):r.createElement("span",{className:i},t)}function v(e){let{children:t,active:n,index:l,addMicrodata:s}=e;return r.createElement("li",(0,a.Z)({},s&&{itemScope:!0,itemProp:"itemListElement",itemType:"https://schema.org/ListItem"},{className:(0,i.Z)("breadcrumbs__item",{"breadcrumbs__item--active":n})}),t,r.createElement("meta",{itemProp:"position",content:String(l+1)}))}function p(){const e=(0,m.Z)("/");return r.createElement("li",{className:"breadcrumbs__item"},r.createElement(o.Z,{"aria-label":(0,d.I)({id:"theme.docs.breadcrumbs.home",message:"Home page",description:"The ARIA label for the home page in the breadcrumbs"}),className:(0,i.Z)("breadcrumbs__link",b.breadcrumbsItemLink),href:e},r.createElement(u,{className:b.breadcrumbHomeIcon})))}function E(){const e=(0,s.s1)(),t=(0,c.Ns)();return e?r.createElement("nav",{className:(0,i.Z)(l.k.docs.docBreadcrumbs,b.breadcrumbsContainer),"aria-label":(0,d.I)({id:"theme.docs.breadcrumbs.navAriaLabel",message:"Breadcrumbs",description:"The ARIA label for the breadcrumbs"})},r.createElement("ul",{className:"breadcrumbs",itemScope:!0,itemType:"https://schema.org/BreadcrumbList"},t&&r.createElement(p,null),e.map(((t,n)=>{const a=n===e.length-1;return r.createElement(v,{key:n,active:a,index:n,addMicrodata:!!t.href},r.createElement(h,{href:t.href,isLast:a},t.label))})))):null}},30060:(e,t,n)=>{n.d(t,{Z:()=>g});var a=n(70079),r=n(19841),i=n(39085),l=n(46748),s=n(23022),c=n(26839);const o="cardContainer_Ewt8",m="cardTitle_KfEp",d="cardDescription_Fttl";function u(e){let{href:t,children:n}=e;return a.createElement(l.Z,{href:t,className:(0,r.Z)("card padding--lg",o)},n)}function b(e){let{href:t,icon:n,title:i,description:l}=e;return a.createElement(u,{href:t},a.createElement("h2",{className:(0,r.Z)("text--truncate",m),title:i},n," ",i),l&&a.createElement("p",{className:(0,r.Z)("text--truncate",d),title:l},l))}function h(e){let{item:t}=e;const n=(0,i.Wl)(t);return n?a.createElement(b,{href:n,icon:"\ud83d\uddc3\ufe0f",title:t.label,description:(0,c.I)({message:"{count} items",id:"theme.docs.DocCard.categoryDescription",description:"The default description for a category card in the generated index about how many items this category includes"},{count:t.items.length})}):null}function v(e){let{item:t}=e;const n=(0,s.Z)(t.href)?"\ud83d\udcc4\ufe0f":"\ud83d\udd17",r=(0,i.xz)(t.docId??void 0);return a.createElement(b,{href:t.href,icon:n,title:t.label,description:null==r?void 0:r.description})}function p(e){let{item:t}=e;switch(t.type){case"link":return a.createElement(v,{item:t});case"category":return a.createElement(h,{item:t});default:throw new Error(`unknown item type ${JSON.stringify(t)}`)}}function E(e){let{className:t}=e;const n=(0,i.jA)();return a.createElement(g,{items:n.items,className:t})}function g(e){const{items:t,className:n}=e;if(!t)return a.createElement(E,e);const l=(0,i.MN)(t);return a.createElement("section",{className:(0,r.Z)("row",n)},l.map(((e,t)=>a.createElement("article",{key:t,className:"col col--6 margin-bottom--lg"},a.createElement(p,{item:e})))))}},42403:(e,t,n)=>{n.r(t),n.d(t,{default:()=>g});var a=n(70079),r=n(33859),i=n(39085),l=n(82659),s=n(30060),c=n(8580),o=n(6875),m=n(8151),d=n(32508),u=n(85352);const b="generatedIndexPage_Sgpy",h="list_kTs0",v="title_kZpE";function p(e){let{categoryGeneratedIndex:t}=e;return a.createElement(r.d,{title:t.title,description:t.description,keywords:t.keywords,image:(0,l.Z)(t.image)})}function E(e){let{categoryGeneratedIndex:t}=e;const n=(0,i.jA)();return a.createElement("div",{className:b},a.createElement(o.Z,null),a.createElement(d.Z,null),a.createElement(m.Z,null),a.createElement("header",null,a.createElement(u.Z,{as:"h1",className:v},t.title),t.description&&a.createElement("p",null,t.description)),a.createElement("article",{className:"margin-top--lg"},a.createElement(s.Z,{items:n.items,className:h})),a.createElement("footer",{className:"margin-top--lg"},a.createElement(c.Z,{previous:t.navigation.previous,next:t.navigation.next})))}function g(e){return a.createElement(a.Fragment,null,a.createElement(p,e),a.createElement(E,e))}},8580:(e,t,n)=>{n.d(t,{Z:()=>o});var a=n(52203),r=n(70079),i=n(26839),l=n(19841),s=n(46748);function c(e){const{permalink:t,title:n,subLabel:a,isNext:i}=e;return r.createElement(s.Z,{className:(0,l.Z)("pagination-nav__link",i?"pagination-nav__link--next":"pagination-nav__link--prev"),to:t},a&&r.createElement("div",{className:"pagination-nav__sublabel"},a),r.createElement("div",{className:"pagination-nav__label"},n))}function o(e){const{previous:t,next:n}=e;return r.createElement("nav",{className:"pagination-nav docusaurus-mt-lg","aria-label":(0,i.I)({id:"theme.docs.paginator.navAriaLabel",message:"Docs pages navigation",description:"The ARIA label for the docs pagination"})},t&&r.createElement(c,(0,a.Z)({},t,{subLabel:r.createElement(i.Z,{id:"theme.docs.paginator.previous",description:"The label used to navigate to the previous doc"},"Previous")})),n&&r.createElement(c,(0,a.Z)({},n,{subLabel:r.createElement(i.Z,{id:"theme.docs.paginator.next",description:"The label used to navigate to the next doc"},"Next"),isNext:!0})))}},8151:(e,t,n)=>{n.d(t,{Z:()=>c});var a=n(70079),r=n(19841),i=n(26839),l=n(15974),s=n(14474);function c(e){let{className:t}=e;const n=(0,s.E)();return n.badge?a.createElement("span",{className:(0,r.Z)(t,l.k.docs.docVersionBadge,"badge badge--secondary")},a.createElement(i.Z,{id:"theme.docs.versionBadge.label",values:{versionLabel:n.label}},"Version: {versionLabel}")):null}},6875:(e,t,n)=>{n.d(t,{Z:()=>p});var a=n(70079),r=n(19841),i=n(33844),l=n(46748),s=n(26839),c=n(7347),o=n(15974),m=n(26416),d=n(14474);const u={unreleased:function(e){let{siteTitle:t,versionMetadata:n}=e;return a.createElement(s.Z,{id:"theme.docs.versions.unreleasedVersionLabel",description:"The label used to tell the user that he's browsing an unreleased doc version",values:{siteTitle:t,versionLabel:a.createElement("b",null,n.label)}},"This is unreleased documentation for {siteTitle} {versionLabel} version.")},unmaintained:function(e){let{siteTitle:t,versionMetadata:n}=e;return a.createElement(s.Z,{id:"theme.docs.versions.unmaintainedVersionLabel",description:"The label used to tell the user that he's browsing an unmaintained doc version",values:{siteTitle:t,versionLabel:a.createElement("b",null,n.label)}},"This is documentation for {siteTitle} {versionLabel}, which is no longer actively maintained.")}};function b(e){const t=u[e.versionMetadata.banner];return a.createElement(t,e)}function h(e){let{versionLabel:t,to:n,onClick:r}=e;return a.createElement(s.Z,{id:"theme.docs.versions.latestVersionSuggestionLabel",description:"The label used to tell the user to check the latest version",values:{versionLabel:t,latestVersionLink:a.createElement("b",null,a.createElement(l.Z,{to:n,onClick:r},a.createElement(s.Z,{id:"theme.docs.versions.latestVersionLinkLabel",description:"The label used for the latest version suggestion link label"},"latest version")))}},"For up-to-date documentation, see the {latestVersionLink} ({versionLabel}).")}function v(e){let{className:t,versionMetadata:n}=e;const{siteConfig:{title:l}}=(0,i.Z)(),{pluginId:s}=(0,c.gA)({failfast:!0}),{savePreferredVersionName:d}=(0,m.J)(s),{latestDocSuggestion:u,latestVersionSuggestion:v}=(0,c.Jo)(s),p=u??(E=v).docs.find((e=>e.id===E.mainDocId));var E;return a.createElement("div",{className:(0,r.Z)(t,o.k.docs.docVersionBanner,"alert alert--warning margin-bottom--md"),role:"alert"},a.createElement("div",null,a.createElement(b,{siteTitle:l,versionMetadata:n})),a.createElement("div",{className:"margin-top--md"},a.createElement(h,{versionLabel:v.label,to:p.path,onClick:()=>d(v.name)})))}function p(e){let{className:t}=e;const n=(0,d.E)();return n.banner?a.createElement(v,{className:t,versionMetadata:n}):null}},85352:(e,t,n)=>{n.d(t,{Z:()=>m});var a=n(52203),r=n(70079),i=n(19841),l=n(26839),s=n(36429);const c="anchorWithStickyNavbar_S4R0",o="anchorWithHideOnScrollNavbar_hqvW";function m(e){let{as:t,id:n,...m}=e;const{navbar:{hideOnScroll:d}}=(0,s.L)();return"h1"!==t&&n?r.createElement(t,(0,a.Z)({},m,{className:(0,i.Z)("anchor",d?o:c),id:n}),m.children,r.createElement("a",{className:"hash-link",href:`#${n}`,title:(0,l.I)({id:"theme.common.headingLinkTitle",message:"Direct link to heading",description:"Title for link to heading"})},"\u200b")):r.createElement(t,(0,a.Z)({},m,{id:void 0}))}}}]);
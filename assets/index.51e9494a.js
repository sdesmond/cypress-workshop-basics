import{$ as i,M as f,R as m}from"./vendor.2612b38b.js";const h=function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}};h();const g=(r,o)=>o.replace(/]\(\.\//g,"]("+r);console.log("env variables",{BASE_URL:"/cypress-workshop-basics/",MODE:"production",DEV:!1,PROD:!0});const{BASE_URL:l,PROD:w}={BASE_URL:"/cypress-workshop-basics/",MODE:"production",DEV:!1,PROD:!0};if(typeof l!="string")throw new Error('Missing BASE_URL in {"BASE_URL":"/cypress-workshop-basics/","MODE":"production","DEV":false,"PROD":true}');const y=r=>{if(!r.startsWith("./"))throw new Error(`Is not relative url "${r}"`);const o=r.split("/").filter(s=>s!==".");return o.pop(),o.join("/")},E=new URL(document.URL),R=E.searchParams.get("p")||"intro",c=R+"/PITCHME.md",d="./"+(w?c:"slides/"+c),u=y(d);console.log("markdown file base",u);const p=l+u+"/";console.log("baseUrl",p);fetch(d).then(r=>r.text()).then(r=>{const o=g(p,r);document.querySelector(".slides").innerHTML=`<section data-markdown data-separator="\\-\\-\\-" data-separator-vertical="\\+\\+\\+">
<textarea data-template>
`+o+`
</textarea>
</section>
`,new i({plugins:[f,m]}).initialize({width:1280,height:720,minScale:.2,maxScale:1.1,slideNumber:!0,hash:!0,hashOneBasedIndex:!0}).then(()=>{window.Cypress&&(window.Reveal=i)})});

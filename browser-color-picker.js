// ==UserScript==
// @name         browser-color-picker
// @namespace    http://tampermonkey.net/
// @version      0.2.0
// @description  pick color in browser
// @author       heyq <heyq020814@qq.com>
// @match        *://*/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function t(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(e){if(e.ep)return;e.ep=!0;const o=t(e);fetch(e.href,o)}})();const l=(r,n)=>{for(const t in n)n[t]&&(r.style[t]=n[t])},a=(r,n)=>{const t=document.createElement("div"),i={width:"200px",height:"100px",backgroundColor:r},e=s=>{t.contains(s.target)||(t.remove(),document.removeEventListener("click",e))},o=s=>{t.contains(s.target)||(t.remove(),document.removeEventListener("contextmenu",o))};document.addEventListener("click",e),document.addEventListener("contextmenu",o),l(t,i);const c=document.createElement("p");c.innerText=r,t.appendChild(c),c.addEventListener("click",s=>{window.navigator.clipboard.writeText(r).then(()=>{console.log("成功复制到剪贴板")})});const d=document.createElement("button");d.innerText="退出",d.addEventListener("click",()=>{t.remove(),n()}),t.appendChild(d),document.body.appendChild(t)};(()=>{const r=async i=>{i.preventDefault();const e=new window.EyeDropper;try{const c=(await e.open()).sRGBHex;a(c,()=>{t()})}catch{console.log("取消本次拾取。")}},n=()=>window.hasOwnProperty("EyeDropper")?(document.addEventListener("contextmenu",r,!1),console.log("被激活了！"),""):(console.warn("对不起，当前浏览器版本过低，请升级最新版本。"),""),t=()=>(document.removeEventListener("contextmenu",r,!1),console.log("被注销了!"),"");window.activateColorPicker=n,window.deactivateColorPicker=t})();

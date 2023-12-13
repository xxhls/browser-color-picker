// ==UserScript==
// @name         browser-color-picker
// @namespace    http://tampermonkey.net/
// @version      0.1.0
// @description  pick color in browser
// @author       heyq <heyq020814@qq.com>
// @match        *://*/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const r of t.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const a=(c,n)=>{for(const o in n)n[o]&&(c.style[o]=n[o])},u=(c,n)=>{const o=document.createElement("div"),i={width:"200px",height:"100px",backgroundColor:c},e=s=>{o.contains(s.target)||(o.remove(),document.removeEventListener("click",e))},t=s=>{o.contains(s.target)||(o.remove(),document.removeEventListener("contextmenu",t))};document.addEventListener("click",e),document.addEventListener("contextmenu",t),a(o,i);const r=document.createElement("p");r.innerText=c,o.appendChild(r),r.addEventListener("click",s=>{window.navigator.clipboard.writeText(c).then(()=>{console.log("成功复制到剪贴板")})});const d=document.createElement("button");d.innerText="退出",d.addEventListener("click",()=>{n(o)}),o.appendChild(d),document.body.appendChild(o)};(()=>{const c=(t,r)=>{u(t,r)},n=t=>{t.remove()},o=async t=>{t.preventDefault();const r=new window.EyeDropper;try{const s=(await r.open()).sRGBHex;c(s,l=>{n(l),e()})}catch{console.log("取消本次拾取。")}},i=()=>window.hasOwnProperty("EyeDropper")?(document.addEventListener("contextmenu",o,!1),console.log("被激活了！"),""):(console.warn("对不起，当前浏览器版本过低，请升级最新版本。"),""),e=()=>(document.removeEventListener("contextmenu",o,!1),console.log("被注销了!"),"");window.activateColorPicker=i,window.deactivateColorPicker=e})();

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

(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const c of t.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function n(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=n(e);fetch(e.href,t)}})();const a=(r,o)=>{for(const n in o)o[n]&&(r.style[n]=o[n])},u=()=>{const r=document.createElement("div");a(r,{width:"200px",height:"100px",backgroundColor:"red"}),document.body.appendChild(r)};(()=>{const r=()=>{u()},o=async c=>{c.preventDefault();const s=new window.EyeDropper;try{const d=(await s.open()).sRGBHex;console.log(d),r()}catch{console.log("取消本次拾取。")}},n=()=>{document.addEventListener("contextmenu",o,!1)},i=()=>{document.removeEventListener("contextmenu",o,!1)},e=()=>window.hasOwnProperty("EyeDropper")?(n(),"被激活了！"):"对不起，当前浏览器版本过低，请升级最新版本。",t=()=>(i(),"被注销了！");window.activateColorPicker=e,window.deactivateColorPicker=t})();

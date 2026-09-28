(function(){"use strict";/*! js-cookie v3.0.5 | MIT */function T(e){for(var o=1;o<arguments.length;o++){var t=arguments[o];for(var r in t)e[r]=t[r]}return e}var xe={read:function(e){return e[0]==='"'&&(e=e.slice(1,-1)),e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent)},write:function(e){return encodeURIComponent(e).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,decodeURIComponent)}};function O(e,o){function t(i,w,u){if(!(typeof document>"u")){u=T({},o,u),typeof u.expires=="number"&&(u.expires=new Date(Date.now()+u.expires*864e5)),u.expires&&(u.expires=u.expires.toUTCString()),i=encodeURIComponent(i).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape);var n="";for(var h in u)u[h]&&(n+="; "+h,u[h]!==!0&&(n+="="+u[h].split(";")[0]));return document.cookie=i+"="+e.write(w,i)+n}}function r(i){if(!(typeof document>"u"||arguments.length&&!i)){for(var w=document.cookie?document.cookie.split("; "):[],u={},n=0;n<w.length;n++){var h=w[n].split("="),a=h.slice(1).join("=");try{var s=decodeURIComponent(h[0]);if(u[s]=e.read(a,s),i===s)break}catch{}}return i?u[i]:u}}return Object.create({set:t,get:r,remove:function(i,w){t(i,"",T({},w,{expires:-1}))},withAttributes:function(i){return O(this.converter,T({},this.attributes,i))},withConverter:function(i){return O(T({},this.converter,i),this.attributes)}},{attributes:{value:Object.freeze(o)},converter:{value:Object.freeze(e)}})}var y=O(xe,{path:"/"});const Ce=`
:root {
  --b-100: #F2F3F7;
  --s-700: #37546D;
}

.woot-widget-holder {
  box-shadow: 0 5px 40px rgba(0, 0, 0, .16);
  opacity: 1;
  will-change: transform, opacity;
  transform: translateY(0);
  overflow: hidden !important;
  position: fixed !important;
  transition: opacity 0.2s linear, transform 0.25s linear;
  z-index: 2147483000 !important;
}

.woot-widget-holder.woot-widget-holder--flat {
  box-shadow: none;
  border-radius: 0;
  border: 1px solid var(--b-100);
}

.woot-widget-holder iframe {
  border: 0;
  color-scheme: normal;
  height: 100% !important;
  width: 100% !important;
  max-height: 100vh !important;
}

.woot-widget-holder.has-unread-view {
  border-radius: 0 !important;
  min-height: 80px !important;
  height: auto;
  bottom: 94px;
  box-shadow: none !important;
  border: 0;
}

.woot-widget-bubble {
  background: #1f93ff;
  border-radius: 100px;
  border-width: 0px;
  bottom: 20px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, .16) !important;
  cursor: pointer;
  height: 64px;
  padding: 0px;
  position: fixed;
  user-select: none;
  width: 64px;
  z-index: 2147483000 !important;
}

.woot-widget-bubble:focus-visible {
  outline: 2px solid AccentColor !important;
  outline: 2px solid -webkit-focus-ring-color !important;
  outline-offset: 2px !important;
}

.woot-widget-bubble.woot-widget-bubble--flat {
  border-radius: 0;
}

.woot-widget-holder.woot-widget-holder--flat {
  bottom: 90px;
}

.woot-widget-bubble.woot-widget-bubble--flat {
  height: 56px;
  width: 56px;
}

.woot-widget-bubble.woot-widget-bubble--flat svg {
  margin: 16px !important;
}

.woot-widget-bubble.woot-widget-bubble--flat.woot--close::before,
.woot-widget-bubble.woot-widget-bubble--flat.woot--close::after {
  left: 28px;
  top: 16px;
}

.woot-widget-bubble.unread-notification::after {
  content: '';
  position: absolute;
  width: 12px;
  height: 12px;
  background: #ff4040;
  border-radius: 100%;
  top: 0px;
  right: 0px;
  border: 2px solid #ffffff;
  transition: background 0.2s ease;
}

.woot-widget-bubble.woot-widget--expanded {
  bottom: 24px;
  display: flex;
  height: 48px !important;
  width: auto !important;
  align-items: center;
}

.woot-widget-bubble.woot-widget--expanded div {
  align-items: center;
  color: #fff;
  display: flex;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen-Sans, Ubuntu, Cantarell, Helvetica Neue, Arial, sans-serif;
  font-size: 16px;
  font-weight: 500;
  justify-content: center;
  padding-right: 20px;
  width: auto !important;
}

.woot-widget-bubble.woot-widget--expanded.woot-widget-bubble-color--lighter div{
  color: var(--s-700);
}

.woot-widget-bubble.woot-widget--expanded svg {
  height: 20px !important;
  margin: 14px 8px 14px 16px !important;
  width: 20px !important;
}

.woot-widget-bubble.woot-elements--left {
  left: 20px;
}

.woot-widget-bubble.woot-elements--right {
  right: 20px;
}

.woot-widget-bubble:hover {
  background: #1f93ff;
  box-shadow: 0 8px 32px rgba(0, 0, 0, .4) !important;
}

.woot-widget-bubble svg {
  all: revert;
  height: 24px !important;
  margin: 20px !important;
  padding: 0 !important;
  width: 24px !important;
}

.woot-widget-bubble.woot-widget-bubble-color--lighter path{
  fill: var(--s-700);
}

@media only screen and (min-width: 667px) {
  .woot-widget-holder.woot-elements--left {
    left: 20px;
 }
  .woot-widget-holder.woot-elements--right {
    right: 20px;
 }
}

.woot--close:hover {
  opacity: 1;
}

.woot--close::before, .woot--close::after {
  background-color: #fff;
  content: ' ';
  display: inline;
  height: 24px;
  left: 32px;
  position: absolute;
  top: 20px;
  width: 2px;
}

.woot-widget-bubble-color--lighter.woot--close::before, .woot-widget-bubble-color--lighter.woot--close::after {
  background-color: var(--s-700);
}

.woot--close::before {
  transform: rotate(45deg);
}

.woot--close::after {
  transform: rotate(-45deg);
}

.woot--hide {
  bottom: -100vh !important;
  top: unset !important;
  opacity: 0;
  visibility: hidden !important;
  z-index: -1 !important;
}

.woot-widget--without-bubble {
  bottom: 20px !important;
}
.woot-widget-holder.woot--hide{
  transform: translateY(40px);
}
.woot-widget-bubble.woot--close {
  transform: translateX(0px) scale(1) rotate(0deg);
  transition: transform 300ms ease, opacity 100ms ease, visibility 0ms linear 0ms, bottom 0ms linear 0ms;
}
.woot-widget-bubble.woot--close.woot--hide {
  transform: translateX(8px) scale(.75) rotate(45deg);
  transition: transform 300ms ease, opacity 200ms ease, visibility 0ms linear 500ms, bottom 0ms ease 200ms;
}

.woot-widget-bubble {
  transform-origin: center;
  will-change: transform, opacity;
  transform: translateX(0) scale(1) rotate(0deg);
  transition: transform 300ms ease, opacity 100ms ease, visibility 0ms linear 0ms, bottom 0ms linear 0ms;
}
.woot-widget-bubble.woot--hide {
  transform: translateX(8px) scale(.75) rotate(-30deg);
  transition: transform 300ms ease, opacity 200ms ease, visibility 0ms linear 500ms, bottom 0ms ease 200ms;
}

.woot-widget-bubble.woot-widget--expanded {
  transform: translateX(0px);
  transition: transform 300ms ease, opacity 100ms ease, visibility 0ms linear 0ms, bottom 0ms linear 0ms;
}
.woot-widget-bubble.woot-widget--expanded.woot--hide {
  transform: translateX(8px);
  transition: transform 300ms ease, opacity 200ms ease, visibility 0ms linear 500ms, bottom 0ms ease 200ms;
}
.woot-widget-bubble.woot-widget-bubble--flat.woot--close {
  transform: translateX(0px);
  transition: transform 300ms ease, opacity 10ms ease, visibility 0ms linear 0ms, bottom 0ms linear 0ms;
}
.woot-widget-bubble.woot-widget-bubble--flat.woot--close.woot--hide {
  transform: translateX(8px);
  transition: transform 300ms ease, opacity 200ms ease, visibility 0ms linear 500ms, bottom 0ms ease 200ms;
}
.woot-widget-bubble.woot-widget--expanded.woot-widget-bubble--flat {
  transform: translateX(0px);
  transition: transform 300ms ease, opacity 200ms ease, visibility 0ms linear 0ms, bottom 0ms linear 0ms;
}
.woot-widget-bubble.woot-widget--expanded.woot-widget-bubble--flat.woot--hide {
  transform: translateX(8px);
  transition: transform 300ms ease, opacity 200ms ease, visibility 0ms linear 500ms, bottom 0ms ease 200ms;
}

@media only screen and (max-width: 667px) {
  .woot-widget-holder {
    height: 100%;
    right: 0;
    top: 0;
    width: 100%;
 }

 .woot-widget-holder iframe {
    min-height: 100% !important;
  }


 .woot-widget-holder.has-unread-view {
    height: auto;
    right: 0;
    width: auto;
    bottom: 0;
    top: auto;
    max-height: 100vh;
    padding: 0 8px;
  }

  .woot-widget-holder.has-unread-view iframe {
    min-height: unset !important;
  }

 .woot-widget-holder.has-unread-view.woot-elements--left {
    left: 0;
  }

  .woot-widget-bubble.woot--close {
    bottom: 60px;
    opacity: 0;
    visibility: hidden !important;
    z-index: -1 !important;
  }
}

@media only screen and (min-width: 667px) {
  .woot-widget-holder {
    border-radius: 16px;
    bottom: 104px;
    height: calc(90% - 64px - 20px);
    max-height: 640px !important;
    min-height: 250px !important;
    width: 400px !important;
 }
}

.woot-hidden {
  display: none !important;
}

/*
 * The continuity shell. It is drawn on the customer's page, inside their
 * cascade, so every property that a reset, a CSS framework or an over-eager
 * "* { }" rule could reach is stated here and marked important. It fills the
 * widget holder, so position, size and radius are inherited from the panel
 * itself and cannot drift out of alignment with the iframe it stands in for.
 */
.woot-widget-shell {
  all: initial !important;
  position: absolute !important;
  inset: 0 !important;
  z-index: 1 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  background: #F9F9FB !important;
  opacity: 1 !important;
  transition: opacity 0.2s linear !important;
}

.woot-widget-shell.woot-widget-shell--dark {
  background: #17171A !important;
}

.woot-widget-shell.woot-widget-shell--done {
  opacity: 0 !important;
}

.woot-widget-shell .woot-widget-shell__status {
  all: initial !important;
  display: flex !important;
  align-items: center !important;
  gap: 10px !important;
  max-width: 80% !important;
  padding: 0 16px !important;
  color: #60646C !important;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen-Sans, Ubuntu, Cantarell, Helvetica Neue, Arial, sans-serif !important;
  font-size: 14px !important;
  font-weight: 400 !important;
  line-height: 1.4 !important;
  letter-spacing: normal !important;
  text-align: left !important;
  text-transform: none !important;
}

.woot-widget-shell--dark .woot-widget-shell__status {
  color: #B0B4BA !important;
}

.woot-widget-shell .woot-widget-shell__dots {
  all: initial !important;
  display: flex !important;
  flex: none !important;
  gap: 4px !important;
}

.woot-widget-shell .woot-widget-shell__dots i {
  all: initial !important;
  display: block !important;
  width: 6px !important;
  height: 6px !important;
  border-radius: 50% !important;
  background: currentColor !important;
  color: #60646C !important;
  opacity: 0.4 !important;
}

.woot-widget-shell--dark .woot-widget-shell__dots i {
  color: #B0B4BA !important;
}

.woot-widget-shell .woot-widget-shell__text {
  all: initial !important;
  display: block !important;
  color: inherit !important;
  font: inherit !important;
}

@media (prefers-reduced-motion: no-preference) {
  .woot-widget-shell .woot-widget-shell__dots i {
    animation: woot-widget-shell-pulse 1.2s ease-in-out infinite !important;
  }

  .woot-widget-shell .woot-widget-shell__dots i:nth-child(2) {
    animation-delay: 0.15s !important;
  }

  .woot-widget-shell .woot-widget-shell__dots i:nth-child(3) {
    animation-delay: 0.3s !important;
  }
}

@keyframes woot-widget-shell-pulse {
  0%, 100% { opacity: 0.25; }
  50% { opacity: 0.9; }
}
`,Ee=()=>{const e=document.createElement("style");e.innerHTML=`${Ce}`,e.id="cw-widget-styles",e.dataset.turboPermanent=!0,document.body.appendChild(e)},L=(e,o)=>{const t=document.getElementById(e),r=o.querySelector(`#${e}`);t&&!r&&o.appendChild(t)},F=e=>{L("cw-bubble-holder",e),L("cw-widget-holder",e),L("cw-widget-styles",e)},x=(e,o)=>{e.classList.add(...o.split(" "))},U=(e,o)=>{e.classList.toggle(o)},B=(e,o)=>{e.classList.remove(...o.split(" "))},K=({referrerURL:e,referrerHost:o})=>{g.events.onLocationChange({referrerURL:e,referrerHost:o})},_e=()=>{let e=document.location.href;const o=document.location.host,t={childList:!0,subtree:!0};K({referrerURL:e,referrerHost:o});const r=document.querySelector("body");new MutationObserver(w=>{w.forEach(()=>{e!==document.location.href&&(e=document.location.href,K({referrerURL:e,referrerHost:o}))})}).observe(r,t)},R=["standard","expanded_bubble"],V=["standard","flat"],X=["light","auto","dark"],Y=e=>R.includes(e)?e:R[0],J=e=>Y(e)===R[1],Se=e=>V.includes(e)?e:V[0],Q=e=>e==="flat",Z=e=>X.includes(e)?e:X[0],Te="chatwoot:error",Be="chatwoot:postback",$e="chatwoot:ready",Ae="chatwoot:opened",ke="chatwoot:closed",Me=({eventName:e,data:o=null})=>{let t;return typeof window.CustomEvent=="function"?t=new CustomEvent(e,{detail:o}):(t=document.createEvent("CustomEvent"),t.initCustomEvent(e,!1,!1,o)),t},E=({eventName:e,data:o})=>{const t=Me({eventName:e,data:o});window.dispatchEvent(t)};function ee(e){if(e===null||e===!0||e===!1)return NaN;var o=Number(e);return isNaN(o)?o:o<0?Math.ceil(o):Math.floor(o)}function D(e,o){if(o.length<e)throw new TypeError(e+" argument"+(e>1?"s":"")+" required, but only "+o.length+" present")}function Oe(e){D(1,arguments);var o=Object.prototype.toString.call(e);return e instanceof Date||typeof e=="object"&&o==="[object Date]"?new Date(e.getTime()):typeof e=="number"||o==="[object Number]"?new Date(e):((typeof e=="string"||o==="[object String]")&&typeof console<"u"&&(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"),console.warn(new Error().stack)),new Date(NaN))}function Le(e,o){D(2,arguments);var t=Oe(e).getTime(),r=ee(o);return new Date(t+r)}var Fe=36e5;function te(e,o){D(2,arguments);var t=ee(o);return Le(e,t*Fe)}function Ue(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var N={exports:{}},I={exports:{}},oe;function Re(){return oe||(oe=1,(function(){var e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",o={rotl:function(t,r){return t<<r|t>>>32-r},rotr:function(t,r){return t<<32-r|t>>>r},endian:function(t){if(t.constructor==Number)return o.rotl(t,8)&16711935|o.rotl(t,24)&4278255360;for(var r=0;r<t.length;r++)t[r]=o.endian(t[r]);return t},randomBytes:function(t){for(var r=[];t>0;t--)r.push(Math.floor(Math.random()*256));return r},bytesToWords:function(t){for(var r=[],i=0,w=0;i<t.length;i++,w+=8)r[w>>>5]|=t[i]<<24-w%32;return r},wordsToBytes:function(t){for(var r=[],i=0;i<t.length*32;i+=8)r.push(t[i>>>5]>>>24-i%32&255);return r},bytesToHex:function(t){for(var r=[],i=0;i<t.length;i++)r.push((t[i]>>>4).toString(16)),r.push((t[i]&15).toString(16));return r.join("")},hexToBytes:function(t){for(var r=[],i=0;i<t.length;i+=2)r.push(parseInt(t.substr(i,2),16));return r},bytesToBase64:function(t){for(var r=[],i=0;i<t.length;i+=3)for(var w=t[i]<<16|t[i+1]<<8|t[i+2],u=0;u<4;u++)i*8+u*6<=t.length*8?r.push(e.charAt(w>>>6*(3-u)&63)):r.push("=");return r.join("")},base64ToBytes:function(t){t=t.replace(/[^A-Z0-9+\/]/ig,"");for(var r=[],i=0,w=0;i<t.length;w=++i%4)w!=0&&r.push((e.indexOf(t.charAt(i-1))&Math.pow(2,-2*w+8)-1)<<w*2|e.indexOf(t.charAt(i))>>>6-w*2);return r}};I.exports=o})()),I.exports}var P,ne;function ie(){if(ne)return P;ne=1;var e={utf8:{stringToBytes:function(o){return e.bin.stringToBytes(unescape(encodeURIComponent(o)))},bytesToString:function(o){return decodeURIComponent(escape(e.bin.bytesToString(o)))}},bin:{stringToBytes:function(o){for(var t=[],r=0;r<o.length;r++)t.push(o.charCodeAt(r)&255);return t},bytesToString:function(o){for(var t=[],r=0;r<o.length;r++)t.push(String.fromCharCode(o[r]));return t.join("")}}};return P=e,P}/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */var H,re;function De(){if(re)return H;re=1,H=function(t){return t!=null&&(e(t)||o(t)||!!t._isBuffer)};function e(t){return!!t.constructor&&typeof t.constructor.isBuffer=="function"&&t.constructor.isBuffer(t)}function o(t){return typeof t.readFloatLE=="function"&&typeof t.slice=="function"&&e(t.slice(0,0))}return H}var ae;function Ne(){return ae||(ae=1,(function(){var e=Re(),o=ie().utf8,t=De(),r=ie().bin,i=function(w,u){w.constructor==String?u&&u.encoding==="binary"?w=r.stringToBytes(w):w=o.stringToBytes(w):t(w)?w=Array.prototype.slice.call(w,0):!Array.isArray(w)&&w.constructor!==Uint8Array&&(w=w.toString());for(var n=e.bytesToWords(w),h=w.length*8,a=1732584193,s=-271733879,l=-1732584194,d=271733878,c=0;c<n.length;c++)n[c]=(n[c]<<8|n[c]>>>24)&16711935|(n[c]<<24|n[c]>>>8)&4278255360;n[h>>>5]|=128<<h%32,n[(h+64>>>9<<4)+14]=h;for(var p=i._ff,m=i._gg,b=i._hh,f=i._ii,c=0;c<n.length;c+=16){var Et=a,_t=s,St=l,Tt=d;a=p(a,s,l,d,n[c+0],7,-680876936),d=p(d,a,s,l,n[c+1],12,-389564586),l=p(l,d,a,s,n[c+2],17,606105819),s=p(s,l,d,a,n[c+3],22,-1044525330),a=p(a,s,l,d,n[c+4],7,-176418897),d=p(d,a,s,l,n[c+5],12,1200080426),l=p(l,d,a,s,n[c+6],17,-1473231341),s=p(s,l,d,a,n[c+7],22,-45705983),a=p(a,s,l,d,n[c+8],7,1770035416),d=p(d,a,s,l,n[c+9],12,-1958414417),l=p(l,d,a,s,n[c+10],17,-42063),s=p(s,l,d,a,n[c+11],22,-1990404162),a=p(a,s,l,d,n[c+12],7,1804603682),d=p(d,a,s,l,n[c+13],12,-40341101),l=p(l,d,a,s,n[c+14],17,-1502002290),s=p(s,l,d,a,n[c+15],22,1236535329),a=m(a,s,l,d,n[c+1],5,-165796510),d=m(d,a,s,l,n[c+6],9,-1069501632),l=m(l,d,a,s,n[c+11],14,643717713),s=m(s,l,d,a,n[c+0],20,-373897302),a=m(a,s,l,d,n[c+5],5,-701558691),d=m(d,a,s,l,n[c+10],9,38016083),l=m(l,d,a,s,n[c+15],14,-660478335),s=m(s,l,d,a,n[c+4],20,-405537848),a=m(a,s,l,d,n[c+9],5,568446438),d=m(d,a,s,l,n[c+14],9,-1019803690),l=m(l,d,a,s,n[c+3],14,-187363961),s=m(s,l,d,a,n[c+8],20,1163531501),a=m(a,s,l,d,n[c+13],5,-1444681467),d=m(d,a,s,l,n[c+2],9,-51403784),l=m(l,d,a,s,n[c+7],14,1735328473),s=m(s,l,d,a,n[c+12],20,-1926607734),a=b(a,s,l,d,n[c+5],4,-378558),d=b(d,a,s,l,n[c+8],11,-2022574463),l=b(l,d,a,s,n[c+11],16,1839030562),s=b(s,l,d,a,n[c+14],23,-35309556),a=b(a,s,l,d,n[c+1],4,-1530992060),d=b(d,a,s,l,n[c+4],11,1272893353),l=b(l,d,a,s,n[c+7],16,-155497632),s=b(s,l,d,a,n[c+10],23,-1094730640),a=b(a,s,l,d,n[c+13],4,681279174),d=b(d,a,s,l,n[c+0],11,-358537222),l=b(l,d,a,s,n[c+3],16,-722521979),s=b(s,l,d,a,n[c+6],23,76029189),a=b(a,s,l,d,n[c+9],4,-640364487),d=b(d,a,s,l,n[c+12],11,-421815835),l=b(l,d,a,s,n[c+15],16,530742520),s=b(s,l,d,a,n[c+2],23,-995338651),a=f(a,s,l,d,n[c+0],6,-198630844),d=f(d,a,s,l,n[c+7],10,1126891415),l=f(l,d,a,s,n[c+14],15,-1416354905),s=f(s,l,d,a,n[c+5],21,-57434055),a=f(a,s,l,d,n[c+12],6,1700485571),d=f(d,a,s,l,n[c+3],10,-1894986606),l=f(l,d,a,s,n[c+10],15,-1051523),s=f(s,l,d,a,n[c+1],21,-2054922799),a=f(a,s,l,d,n[c+8],6,1873313359),d=f(d,a,s,l,n[c+15],10,-30611744),l=f(l,d,a,s,n[c+6],15,-1560198380),s=f(s,l,d,a,n[c+13],21,1309151649),a=f(a,s,l,d,n[c+4],6,-145523070),d=f(d,a,s,l,n[c+11],10,-1120210379),l=f(l,d,a,s,n[c+2],15,718787259),s=f(s,l,d,a,n[c+9],21,-343485551),a=a+Et>>>0,s=s+_t>>>0,l=l+St>>>0,d=d+Tt>>>0}return e.endian([a,s,l,d])};i._ff=function(w,u,n,h,a,s,l){var d=w+(u&n|~u&h)+(a>>>0)+l;return(d<<s|d>>>32-s)+u},i._gg=function(w,u,n,h,a,s,l){var d=w+(u&h|n&~h)+(a>>>0)+l;return(d<<s|d>>>32-s)+u},i._hh=function(w,u,n,h,a,s,l){var d=w+(u^n^h)+(a>>>0)+l;return(d<<s|d>>>32-s)+u},i._ii=function(w,u,n,h,a,s,l){var d=w+(n^(u|~h))+(a>>>0)+l;return(d<<s|d>>>32-s)+u},i._blocksize=16,i._digestsize=16,N.exports=function(w,u){if(w==null)throw new Error("Illegal argument "+w);var n=e.wordsToBytes(i(w,u));return u&&u.asBytes?n:u&&u.asString?r.bytesToString(n):e.bytesToHex(n)}})()),N.exports}var Ie=Ne();const Pe=Ue(Ie),se=["avatar_url","email","name"],He=[...se,"identifier_hash"],W=()=>{const e="cw_user_",{websiteToken:o}=window.$chatwoot;return`${e}${o}`},We=({identifier:e="",user:o})=>`${He.reduce((r,i)=>`${r}${i}${o[i]||""}`,"")}identifier${e}`,qe=(...e)=>Pe(We(...e)),ze=e=>se.reduce((o,t)=>o||!!e[t],!1),$=(e,o,{expires:t=365,baseDomain:r=void 0}={})=>{const i={expires:t,sameSite:"Lax",domain:r};typeof o=="object"&&(o=JSON.stringify(o)),y.set(e,o,i)},le="cw_widget_state",de="cw-widget-shell",je=1,Ge=3e4,Ke=200;let A=null;const k=()=>{const e=y.get(le);if(!e)return{};try{return JSON.parse(e)}catch{return{}}},ce=e=>$(le,e,{expires:te(new Date,je),baseDomain:window.$chatwoot.baseDomain}),we=e=>ce({open:e,label:k().label||""}),Ve=e=>ce({open:k().open===!0,label:e}),Xe=()=>k().open===!0,Ye=()=>{const{darkMode:e}=window.$chatwoot;return e==="dark"?!0:e!=="auto"?!1:window.matchMedia("(prefers-color-scheme: dark)").matches},Je=e=>{const o=document.createElement("div");o.id=de,o.className=Ye()?"woot-widget-shell woot-widget-shell--dark":"woot-widget-shell",o.setAttribute("role","status"),o.setAttribute("aria-live","polite");const t=document.createElement("div");t.className="woot-widget-shell__status";const r=document.createElement("span");if(r.className="woot-widget-shell__dots",r.setAttribute("aria-hidden","true"),[0,1,2].forEach(()=>r.appendChild(document.createElement("i"))),t.appendChild(r),e){const i=document.createElement("span");i.className="woot-widget-shell__text",i.textContent=e,t.appendChild(i)}return o.appendChild(t),o},ue=()=>{clearTimeout(A),A=null;const e=document.getElementById(de);e&&(e.classList.add("woot-widget-shell--done"),setTimeout(()=>e.remove(),Ke))},Qe=(e,o)=>{const t=Je(k().label);e.appendChild(t),A=setTimeout(()=>{A=null,ue(),we(!1),o()},Ge)},Ze="M240.808 240.808H122.123C56.6994 240.808 3.45695 187.562 3.45695 122.122C3.45695 56.7031 56.6994 3.45697 122.124 3.45697C187.566 3.45697 240.808 56.7031 240.808 122.122V240.808Z",ge=document.getElementsByTagName("body")[0],v=document.createElement("div"),C=document.createElement("div"),q=document.createElement("button"),M=document.createElement("button");document.createElement("span");const et=e=>{if(J(window.$chatwoot.type)){const o=document.getElementById("woot-widget--expanded__text");o.innerText=e}},tt=({className:e,path:o,target:t})=>{let r=`${e} woot-elements--${window.$chatwoot.position}`;const i=document.createElementNS("http://www.w3.org/2000/svg","svg");i.setAttributeNS(null,"id","woot-widget-bubble-icon"),i.setAttributeNS(null,"width","24"),i.setAttributeNS(null,"height","24"),i.setAttributeNS(null,"viewBox","0 0 240 240"),i.setAttributeNS(null,"fill","none"),i.setAttribute("xmlns","http://www.w3.org/2000/svg");const w=document.createElementNS("http://www.w3.org/2000/svg","path");if(w.setAttributeNS(null,"d",o),w.setAttributeNS(null,"fill","#FFFFFF"),i.appendChild(w),t.appendChild(i),J(window.$chatwoot.type)){const u=document.createElement("div");u.id="woot-widget--expanded__text",u.innerText="",t.appendChild(u),r+=" woot-widget--expanded"}return t.className=r,t.title="Open chat window",t},ot=e=>{e&&x(C,"woot-hidden"),x(C,"woot--bubble-holder"),C.id="cw-bubble-holder",C.dataset.turboPermanent=!0,C.setAttribute("data-chatwoot-no-agent",""),ge.appendChild(C)},nt=e=>{g.events.onBubbleToggle(e),e?E({eventName:Ae}):(E({eventName:ke}),q.focus())},_=(e={})=>{const{toggleValue:o}=e,{isOpen:t}=window.$chatwoot;if(t===o)return;const r=o===void 0?!t:o;window.$chatwoot.isOpen=r,we(r),U(q,"woot--hide"),U(M,"woot--hide"),U(v,"woot--hide"),nt(r)},it=()=>{C.addEventListener("click",_)},rt=()=>{const e=document.querySelector(".woot-widget-holder");x(e,"has-unread-view")},he=()=>{const e=document.querySelector(".woot-widget-holder");B(e,"has-unread-view")},at=e=>{const o=e.replace("#",""),t=parseInt(o.substr(0,2),16),r=parseInt(o.substr(2,2),16),i=parseInt(o.substr(4,2),16);return(t*299+r*587+i*114)/1e3>225},st="SET_USER_ERROR",pe=["click","touchstart","keypress","keydown"],lt=()=>{let e;try{e=new(window.AudioContext||window.webkitAudioContext)}catch{}return e},dt=async(e="",o)=>{const t=lt(),r=i=>{window.playAudioAlert=()=>{if(t){const w=t.createBufferSource();w.buffer=i,w.connect(t.destination),w.loop=!1,w.start()}}};if(t){const{type:i="dashboard",alertTone:w="ding"}=o||{},u=`${e}/audio/${i}/${w}.mp3`,n=new Request(u);fetch(n).then(h=>h.arrayBuffer()).then(h=>(t.decodeAudioData(h).then(r),new Promise(a=>a()))).catch(()=>{})}},ct=({origin:e,conversationCookie:o,websiteToken:t,locale:r})=>{const i=new URL("/widget",e);return i.searchParams.append("cw_conversation",o),i.searchParams.append("website_token",t),i.searchParams.append("locale",r),i.toString()},wt=(e,o,t,r)=>{try{const i=ct({origin:e,websiteToken:o,locale:t,conversationCookie:r});window.open(i,`webwidget_session_${o}`,"resizable=off,width=400,height=600").focus()}catch(i){console.log(i)}},ut="sdk-set-bubble-visibility",me="page-control-request",be="page-control-consent-request",fe="page-control-result",gt="page-control-consent",ht="page-control-handshake",pt="page-control-status",mt="page-control-answer",bt=[me,be],ve=()=>document.getElementById("chatwoot_live_chat_widget"),z=(e,o)=>{const t=ve();if(!t)return;let r="*";try{r=new URL(window.$chatwoot.baseUrl).origin}catch{return}t.contentWindow.postMessage(`chatwoot-widget:${JSON.stringify({event:e,...o})}`,r)},ft="/packs/js/page-control.js";let S=null,j=null;const vt=()=>new Promise((e,o)=>{const t=document.createElement("script");t.src=`${window.$chatwoot.baseUrl}${ft}`,t.async=!0,t.onload=()=>e(window.chatwootPageControl),t.onerror=()=>o(new Error("Page control failed to load.")),document.head.appendChild(t)}),G=async()=>(j||(j=vt().then(e=>{var o;return e.configure({onStatus:t=>z(pt,t),onConsent:t=>z(gt,{granted:t,origin:window.location.origin}),accent:(o=window.$chatwoot)==null?void 0:o.widgetColor}),e})),S=await j,S),yt=()=>S==null?void 0:S.revoke(),ye=(e,o="")=>$("cw_conversation",e,{baseDomain:o}),xt=e=>{const o=te(new Date,1);$("cw_snooze_campaigns_till",Number(o),{expires:o,baseDomain:e})},g={getUrl({baseUrl:e,websiteToken:o}){return`${e}/widget?website_token=${o}`},createFrame:({baseUrl:e,websiteToken:o})=>{if(g.getAppFrame())return;Ee();const t=document.createElement("iframe"),r=y.get("cw_conversation");let i=g.getUrl({baseUrl:e,websiteToken:o});r&&(i=`${i}&cw_conversation=${r}`),t.src=i,t.allow="camera;microphone;fullscreen;display-capture;picture-in-picture;clipboard-write;",t.id="chatwoot_live_chat_widget",t.style.visibility="hidden",t.setAttribute("data-chatwoot-no-agent","");const w=Xe();window.$chatwoot.isOpen=w;let u=`woot-widget-holder woot-elements--${window.$chatwoot.position}`;w||(u+=" woot--hide"),window.$chatwoot.hideMessageBubble&&(u+=" woot-widget--without-bubble"),Q(window.$chatwoot.widgetStyle)&&(u+=" woot-widget-holder--flat"),x(v,u),v.id="cw-widget-holder",v.dataset.turboPermanent=!0,v.setAttribute("data-chatwoot-no-agent",""),w&&Qe(v,g.collapseRestoredPanel),v.appendChild(t),ge.appendChild(v),g.initPostMessageCommunication(),g.initWindowSizeListener(),g.preventDefaultScroll()},getAppFrame:ve,collapseRestoredPanel:()=>{window.$chatwoot.isOpen=!1,x(v,"woot--hide")},getBubbleHolder:()=>document.getElementsByClassName("woot--bubble-holder"),sendMessage:(e,o)=>{g.getAppFrame().contentWindow.postMessage(`chatwoot-widget:${JSON.stringify({event:e,...o})}`,"*")},sendMessageToWidget:z,isFromWidgetFrame:e=>{const o=g.getAppFrame();if(!o||e.source!==o.contentWindow)return!1;try{return e.origin===new URL(window.$chatwoot.baseUrl).origin}catch{return!1}},initPostMessageCommunication:()=>{window.onmessage=e=>{if(typeof e.data!="string"||e.data.indexOf("chatwoot-widget:")!==0)return;const o=JSON.parse(e.data.replace("chatwoot-widget:",""));typeof g.events[o.event]=="function"&&(bt.includes(o.event)&&!g.isFromWidgetFrame(e)||g.events[o.event](o))}},initWindowSizeListener:()=>{window.addEventListener("resize",()=>g.toggleCloseButton())},preventDefaultScroll:()=>{v.addEventListener("wheel",e=>{const o=e.deltaY,t=v.scrollHeight,r=v.offsetHeight,i=v.scrollTop;(i===0&&o<0||r+i===t&&o>0)&&e.preventDefault()})},setFrameHeightToFitContent:(e,o)=>{const t=g.getAppFrame(),r=o?`${e}px`:"100%";t&&t.setAttribute("style",`height: ${r} !important`)},setupAudioListeners:()=>{const{baseUrl:e=""}=window.$chatwoot;dt(e,{type:"widget",alertTone:"ding"}).then(()=>pe.forEach(o=>{document.removeEventListener(o,g.setupAudioListeners,!1)}))},events:{[me]:async e=>{const o=i=>g.sendMessageToWidget(fe,{request_id:e.requestId,ok:!1,code:"no_executor",message:i,origin:window.location.origin});let t;try{t=await G()}catch{o("Page control is not available on this site.");return}t.isConsentGranted()||t.promptForConsent();const r=await t.handleRequest(e);g.sendMessageToWidget(fe,r)},[mt]:async e=>{const o=await G().catch(()=>null);o==null||o.answer(e)},[be]:async()=>{const e=await G().catch(()=>null);e==null||e.promptForConsent()},loaded:e=>{ye(e.config.authToken,window.$chatwoot.baseDomain),window.$chatwoot.hasLoaded=!0;const o=y.get("cw_snooze_campaigns_till");g.sendMessage("config-set",{locale:window.$chatwoot.locale,position:window.$chatwoot.position,hideMessageBubble:window.$chatwoot.hideMessageBubble,showPopoutButton:window.$chatwoot.showPopoutButton,widgetStyle:window.$chatwoot.widgetStyle,darkMode:window.$chatwoot.darkMode,showUnreadMessagesDialog:window.$chatwoot.showUnreadMessagesDialog,campaignsSnoozedTill:o,welcomeTitle:window.$chatwoot.welcomeTitle,welcomeDescription:window.$chatwoot.welcomeDescription,availableMessage:window.$chatwoot.availableMessage,unavailableMessage:window.$chatwoot.unavailableMessage,enableFileUpload:window.$chatwoot.enableFileUpload,enableEmojiPicker:window.$chatwoot.enableEmojiPicker,enableEndConversation:window.$chatwoot.enableEndConversation}),Ve(e.config.continuityLabel),window.$chatwoot.isOpen&&g.sendMessage("toggle-open",{isOpen:!0}),g.sendMessageToWidget(ht,{enabled:!0,origin:window.location.origin}),window.$chatwoot.widgetColor=e.config.channelConfig.widgetColor,g.onLoad({widgetColor:e.config.channelConfig.widgetColor}),g.toggleCloseButton(),window.$chatwoot.user&&g.sendMessage("set-user",window.$chatwoot.user),window.playAudioAlert=()=>{},pe.forEach(t=>{document.addEventListener(t,g.setupAudioListeners,!1)}),window.$chatwoot.resetTriggered||E({eventName:$e})},continuityReady:()=>ue(),error:({errorType:e,data:o})=>{E({eventName:Te,data:o}),e===st&&y.remove(W())},onEvent({eventIdentifier:e,data:o}){E({eventName:e,data:o})},setBubbleLabel(e){et(window.$chatwoot.launcherTitle||e.label)},setAuthCookie({data:{widgetAuthToken:e}}){ye(e,window.$chatwoot.baseDomain)},setCampaignReadOn(){xt(window.$chatwoot.baseDomain)},postback(e){E({eventName:Be,data:e})},toggleBubble:e=>{let o={};e==="open"?o.toggleValue=!0:e==="close"&&(o.toggleValue=!1),_(o)},popoutChatWindow:({baseUrl:e,websiteToken:o,locale:t})=>{const r=y.get("cw_conversation");window.$chatwoot.toggle("close"),wt(e,o,t,r)},closeWindow:()=>{_({toggleValue:!1}),he()},onBubbleToggle:e=>{g.sendMessage("toggle-open",{isOpen:e}),e&&g.pushEvent("webwidget.triggered")},onLocationChange:({referrerURL:e,referrerHost:o})=>{g.sendMessage("change-url",{referrerURL:e,referrerHost:o})},updateIframeHeight:e=>{const{extraHeight:o=0,isFixedHeight:t}=e;g.setFrameHeightToFitContent(o,t)},setUnreadMode:()=>{rt(),_({toggleValue:!0})},resetUnreadMode:()=>he(),handleNotificationDot:e=>{if(window.$chatwoot.hideMessageBubble)return;const o=document.querySelector(".woot-widget-bubble");e.unreadMessageCount>0&&!o.classList.contains("unread-notification")?x(o,"unread-notification"):e.unreadMessageCount===0&&B(o,"unread-notification")},closeChat:()=>{_({toggleValue:!1})},playAudio:()=>{window.playAudioAlert()}},pushEvent:e=>{g.sendMessage("push-event",{eventName:e})},onLoad:({widgetColor:e})=>{const o=g.getAppFrame();if(o.style.visibility="",o.setAttribute("id","chatwoot_live_chat_widget"),g.getBubbleHolder().length)return;ot(window.$chatwoot.hideMessageBubble),_e();let t="woot-widget-bubble",r=`woot-elements--${window.$chatwoot.position} woot-widget-bubble woot--close`;window.$chatwoot.isOpen?t+=" woot--hide":r+=" woot--hide",Q(window.$chatwoot.widgetStyle)&&(t+=" woot-widget-bubble--flat",r+=" woot-widget-bubble--flat"),at(e)&&(t+=" woot-widget-bubble-color--lighter",r+=" woot-widget-bubble-color--lighter");const i=tt({className:t,path:Ze,target:q});x(M,r),i.style.background=e,M.style.background=e,C.appendChild(i),C.appendChild(M),it()},toggleCloseButton:()=>{let e=!1;window.matchMedia("(max-width: 668px)").matches&&(e=!0),g.sendMessage("toggle-close-button",{isMobile:e})}},Ct=({baseUrl:e,websiteToken:o})=>{var w,u;if(window.$chatwoot)return;document.addEventListener("turbo:before-render",n=>{n.detail.renderMethod!=="morph"&&F(n.detail.newBody)}),window.Turbolinks&&document.addEventListener("turbolinks:before-render",n=>{F(n.data.newBody)}),document.addEventListener("astro:before-swap",n=>F(n.newDocument.body));const t=window.chatwootSettings||{};let r=t.locale,i=t.baseDomain;t.useBrowserLanguage&&(r=window.navigator.language.replace("-","_")),window.$chatwoot={baseUrl:e,baseDomain:i,hasLoaded:!1,hideMessageBubble:t.hideMessageBubble||!1,isOpen:!1,position:t.position==="left"?"left":"right",websiteToken:o,locale:r,useBrowserLanguage:t.useBrowserLanguage||!1,type:Y(t.type),launcherTitle:t.launcherTitle||"",showPopoutButton:t.showPopoutButton||!1,showUnreadMessagesDialog:t.showUnreadMessagesDialog??!0,widgetStyle:Se(t.widgetStyle)||"standard",resetTriggered:!1,darkMode:Z(t.darkMode),welcomeTitle:t.welcomeTitle||"",welcomeDescription:t.welcomeDescription||"",availableMessage:t.availableMessage||"",unavailableMessage:t.unavailableMessage||"",enableFileUpload:t.enableFileUpload,enableEmojiPicker:t.enableEmojiPicker??!0,enableEndConversation:t.enableEndConversation??!0,pageControl:{enabled:((w=t.pageControl)==null?void 0:w.enabled)===!0,labels:(u=t.pageControl)==null?void 0:u.labels},toggle(n){g.events.toggleBubble(n)},revokePageControl(){yt()},toggleBubbleVisibility(n){let h=document.querySelector(".woot--bubble-holder"),a=document.querySelector(".woot-widget-holder");n==="hide"?(x(a,"woot-widget--without-bubble"),x(h,"woot-hidden"),window.$chatwoot.hideMessageBubble=!0):n==="show"&&(B(h,"woot-hidden"),B(a,"woot-widget--without-bubble"),window.$chatwoot.hideMessageBubble=!1),g.sendMessage(ut,{hideMessageBubble:window.$chatwoot.hideMessageBubble})},popoutChatWindow(){g.events.popoutChatWindow({baseUrl:window.$chatwoot.baseUrl,websiteToken:window.$chatwoot.websiteToken,locale:r})},setUser(n,h){if(typeof n!="string"&&typeof n!="number")throw new Error("Identifier should be a string or a number");if(!ze(h))throw new Error("User object should have one of the keys [avatar_url, email, name]");const a=W(),s=y.get(a),l=qe({identifier:n,user:h});l!==s&&(window.$chatwoot.identifier=n,window.$chatwoot.user=h,g.sendMessage("set-user",{identifier:n,user:h}),$(a,l,{baseDomain:i}))},setCustomAttributes(n={}){if(!n||!Object.keys(n).length)throw new Error("Custom attributes should have atleast one key");g.sendMessage("set-custom-attributes",{customAttributes:n})},deleteCustomAttribute(n=""){if(n)g.sendMessage("delete-custom-attribute",{customAttribute:n});else throw new Error("Custom attribute is required")},setConversationCustomAttributes(n={}){if(!n||!Object.keys(n).length)throw new Error("Custom attributes should have atleast one key");g.sendMessage("set-conversation-custom-attributes",{customAttributes:n})},deleteConversationCustomAttribute(n=""){if(n)g.sendMessage("delete-conversation-custom-attribute",{customAttribute:n});else throw new Error("Custom attribute is required")},setLabel(n=""){g.sendMessage("set-label",{label:n})},removeLabel(n=""){g.sendMessage("remove-label",{label:n})},setLocale(n="en"){g.sendMessage("set-locale",{locale:n})},setColorScheme(n="light"){g.sendMessage("set-color-scheme",{darkMode:Z(n)})},reset(){window.$chatwoot.isOpen&&g.events.toggleBubble(),y.remove("cw_conversation"),y.remove(W());const n=g.getAppFrame();n.src=g.getUrl({baseUrl:window.$chatwoot.baseUrl,websiteToken:window.$chatwoot.websiteToken}),window.$chatwoot.resetTriggered=!0}},g.createFrame({baseUrl:e,websiteToken:o})};window.chatwootSDK={run:Ct}})();

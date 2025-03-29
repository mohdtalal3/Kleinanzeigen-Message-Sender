"use strict";(()=>{var We=Object.create;var pe=Object.defineProperty;var Ke=Object.getOwnPropertyDescriptor;var Ve=Object.getOwnPropertyNames;var Ge=Object.getPrototypeOf,Qe=Object.prototype.hasOwnProperty;var de=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var ze=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of Ve(t))!Qe.call(e,o)&&o!==n&&pe(e,o,{get:()=>t[o],enumerable:!(r=Ke(t,o))||r.enumerable});return e};var me=(e,t,n)=>(n=e!=null?We(Ge(e)):{},ze(t||!e||!e.__esModule?pe(n,"default",{value:e,enumerable:!0}):n,e));var Le=de((It,Q)=>{"use strict";var T=typeof Reflect=="object"?Reflect:null,he=T&&typeof T.apply=="function"?T.apply:function(t,n,r){return Function.prototype.apply.call(t,n,r)},D;T&&typeof T.ownKeys=="function"?D=T.ownKeys:Object.getOwnPropertySymbols?D=function(t){return Object.getOwnPropertyNames(t).concat(Object.getOwnPropertySymbols(t))}:D=function(t){return Object.getOwnPropertyNames(t)};function Xe(e){console&&console.warn&&console.warn(e)}var ye=Number.isNaN||function(t){return t!==t};function f(){f.init.call(this)}Q.exports=f;Q.exports.once=Ze;f.EventEmitter=f;f.prototype._events=void 0;f.prototype._eventsCount=0;f.prototype._maxListeners=void 0;var ge=10;function F(e){if(typeof e!="function")throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof e)}Object.defineProperty(f,"defaultMaxListeners",{enumerable:!0,get:function(){return ge},set:function(e){if(typeof e!="number"||e<0||ye(e))throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received '+e+".");ge=e}});f.init=function(){(this._events===void 0||this._events===Object.getPrototypeOf(this)._events)&&(this._events=Object.create(null),this._eventsCount=0),this._maxListeners=this._maxListeners||void 0};f.prototype.setMaxListeners=function(t){if(typeof t!="number"||t<0||ye(t))throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received '+t+".");return this._maxListeners=t,this};function ve(e){return e._maxListeners===void 0?f.defaultMaxListeners:e._maxListeners}f.prototype.getMaxListeners=function(){return ve(this)};f.prototype.emit=function(t){for(var n=[],r=1;r<arguments.length;r++)n.push(arguments[r]);var o=t==="error",a=this._events;if(a!==void 0)o=o&&a.error===void 0;else if(!o)return!1;if(o){var s;if(n.length>0&&(s=n[0]),s instanceof Error)throw s;var i=new Error("Unhandled error."+(s?" ("+s.message+")":""));throw i.context=s,i}var c=a[t];if(c===void 0)return!1;if(typeof c=="function")he(c,this,n);else for(var l=c.length,p=Te(c,l),r=0;r<l;++r)he(p[r],this,n);return!0};function be(e,t,n,r){var o,a,s;if(F(n),a=e._events,a===void 0?(a=e._events=Object.create(null),e._eventsCount=0):(a.newListener!==void 0&&(e.emit("newListener",t,n.listener?n.listener:n),a=e._events),s=a[t]),s===void 0)s=a[t]=n,++e._eventsCount;else if(typeof s=="function"?s=a[t]=r?[n,s]:[s,n]:r?s.unshift(n):s.push(n),o=ve(e),o>0&&s.length>o&&!s.warned){s.warned=!0;var i=new Error("Possible EventEmitter memory leak detected. "+s.length+" "+String(t)+" listeners added. Use emitter.setMaxListeners() to increase limit");i.name="MaxListenersExceededWarning",i.emitter=e,i.type=t,i.count=s.length,Xe(i)}return e}f.prototype.addListener=function(t,n){return be(this,t,n,!1)};f.prototype.on=f.prototype.addListener;f.prototype.prependListener=function(t,n){return be(this,t,n,!0)};function Ye(){if(!this.fired)return this.target.removeListener(this.type,this.wrapFn),this.fired=!0,arguments.length===0?this.listener.call(this.target):this.listener.apply(this.target,arguments)}function Ce(e,t,n){var r={fired:!1,wrapFn:void 0,target:e,type:t,listener:n},o=Ye.bind(r);return o.listener=n,r.wrapFn=o,o}f.prototype.once=function(t,n){return F(n),this.on(t,Ce(this,t,n)),this};f.prototype.prependOnceListener=function(t,n){return F(n),this.prependListener(t,Ce(this,t,n)),this};f.prototype.removeListener=function(t,n){var r,o,a,s,i;if(F(n),o=this._events,o===void 0)return this;if(r=o[t],r===void 0)return this;if(r===n||r.listener===n)--this._eventsCount===0?this._events=Object.create(null):(delete o[t],o.removeListener&&this.emit("removeListener",t,r.listener||n));else if(typeof r!="function"){for(a=-1,s=r.length-1;s>=0;s--)if(r[s]===n||r[s].listener===n){i=r[s].listener,a=s;break}if(a<0)return this;a===0?r.shift():$e(r,a),r.length===1&&(o[t]=r[0]),o.removeListener!==void 0&&this.emit("removeListener",t,i||n)}return this};f.prototype.off=f.prototype.removeListener;f.prototype.removeAllListeners=function(t){var n,r,o;if(r=this._events,r===void 0)return this;if(r.removeListener===void 0)return arguments.length===0?(this._events=Object.create(null),this._eventsCount=0):r[t]!==void 0&&(--this._eventsCount===0?this._events=Object.create(null):delete r[t]),this;if(arguments.length===0){var a=Object.keys(r),s;for(o=0;o<a.length;++o)s=a[o],s!=="removeListener"&&this.removeAllListeners(s);return this.removeAllListeners("removeListener"),this._events=Object.create(null),this._eventsCount=0,this}if(n=r[t],typeof n=="function")this.removeListener(t,n);else if(n!==void 0)for(o=n.length-1;o>=0;o--)this.removeListener(t,n[o]);return this};function xe(e,t,n){var r=e._events;if(r===void 0)return[];var o=r[t];return o===void 0?[]:typeof o=="function"?n?[o.listener||o]:[o]:n?Je(o):Te(o,o.length)}f.prototype.listeners=function(t){return xe(this,t,!0)};f.prototype.rawListeners=function(t){return xe(this,t,!1)};f.listenerCount=function(e,t){return typeof e.listenerCount=="function"?e.listenerCount(t):we.call(e,t)};f.prototype.listenerCount=we;function we(e){var t=this._events;if(t!==void 0){var n=t[e];if(typeof n=="function")return 1;if(n!==void 0)return n.length}return 0}f.prototype.eventNames=function(){return this._eventsCount>0?D(this._events):[]};function Te(e,t){for(var n=new Array(t),r=0;r<t;++r)n[r]=e[r];return n}function $e(e,t){for(;t+1<e.length;t++)e[t]=e[t+1];e.pop()}function Je(e){for(var t=new Array(e.length),n=0;n<t.length;++n)t[n]=e[n].listener||e[n];return t}function Ze(e,t){return new Promise(function(n,r){function o(s){e.removeListener(t,a),r(s)}function a(){typeof e.removeListener=="function"&&e.removeListener("error",o),n([].slice.call(arguments))}Me(e,t,a,{once:!0}),t!=="error"&&et(e,o,{once:!0})})}function et(e,t,n){typeof e.on=="function"&&Me(e,"error",t,n)}function Me(e,t,n,r){if(typeof e.on=="function")r.once?e.once(t,n):e.on(t,n);else if(typeof e.addEventListener=="function")e.addEventListener(t,function o(a){r.once&&e.removeEventListener(t,o),n(a)});else throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type '+typeof e)}});var _e=de((qt,m)=>{m.exports.boot=function(e){return e};m.exports.ssrMiddleware=function(e){return e};m.exports.configure=function(e){return e};m.exports.preFetch=function(e){return e};m.exports.route=function(e){return e};m.exports.store=function(e){return e};m.exports.bexBackground=function(e){return e};m.exports.bexContent=function(e){return e};m.exports.bexDom=function(e){return e};m.exports.ssrProductionExport=function(e){return e};m.exports.ssrCreate=function(e){return e};m.exports.ssrListen=function(e){return e};m.exports.ssrClose=function(e){return e};m.exports.ssrServeStaticContent=function(e){return e};m.exports.ssrRenderPreloadTag=function(e){return e}});var Se=me(Le());var z,j=0,d=new Array(256);for(let e=0;e<256;e++)d[e]=(e+256).toString(16).substring(1);var tt=(()=>{let e=typeof crypto!="undefined"?crypto:typeof window!="undefined"?window.crypto||window.msCrypto:void 0;if(e!==void 0){if(e.randomBytes!==void 0)return e.randomBytes;if(e.getRandomValues!==void 0)return t=>{let n=new Uint8Array(t);return e.getRandomValues(n),n}}return t=>{let n=[];for(let r=t;r>0;r--)n.push(Math.floor(Math.random()*256));return n}})(),Ee=4096;function ke(){(z===void 0||j+16>Ee)&&(j=0,z=tt(Ee));let e=Array.prototype.slice.call(z,j,j+=16);return e[6]=e[6]&15|64,e[8]=e[8]&63|128,d[e[0]]+d[e[1]]+d[e[2]]+d[e[3]]+"-"+d[e[4]]+d[e[5]]+"-"+d[e[6]]+d[e[7]]+"-"+d[e[8]]+d[e[9]]+"-"+d[e[10]]+d[e[11]]+d[e[12]]+d[e[13]]+d[e[14]]+d[e[15]]}var nt={undefined:()=>0,boolean:()=>4,number:()=>8,string:e=>2*e.length,object:e=>e?Object.keys(e).reduce((t,n)=>X(n)+X(e[n])+t,0):0},X=e=>nt[typeof e](e),E=class extends Se.EventEmitter{constructor(t){super(),this.setMaxListeners(1/0),this.wall=t,t.listen(n=>{Array.isArray(n)?n.forEach(r=>this._emit(r)):this._emit(n)}),this._sendingQueue=[],this._sending=!1,this._maxMessageSize=32*1024*1024}send(t,n){return this._send([{event:t,payload:n}])}getEvents(){return this._events}on(t,n){return super.on(t,r=>{n({...r,respond:o=>this.send(r.eventResponseKey,o)})})}_emit(t){typeof t=="string"?this.emit(t):this.emit(t.event,t.payload)}_send(t){return this._sendingQueue.push(t),this._nextSend()}_nextSend(){if(!this._sendingQueue.length||this._sending)return Promise.resolve();this._sending=!0;let t=this._sendingQueue.shift(),n=t[0],r=`${n.event}.${ke()}`,o=r+".result";return new Promise((a,s)=>{let i=[],c=l=>{if(l!==void 0&&l._chunkSplit){let p=l._chunkSplit;i=[...i,...l.data],p.lastChunk&&(this.off(o,c),a(i))}else this.off(o,c),a(l)};this.on(o,c);try{let l=t.map(p=>({...p,payload:{data:p.payload,eventResponseKey:o}}));this.wall.send(l)}catch(l){let p="Message length exceeded maximum allowed length.";if(l.message===p&&Array.isArray(n.payload)){let u=X(n);if(u>this._maxMessageSize){let g=Math.ceil(u/this._maxMessageSize),y=Math.ceil(n.payload.length/g),b=n.payload;for(let C=0;C<g;C++){let P=Math.min(b.length,y);this.wall.send([{event:n.event,payload:{_chunkSplit:{count:g,lastChunk:C===g-1},data:b.splice(0,P)}}])}}}}this._sending=!1,setTimeout(()=>this._nextSend(),16)})}};var Re=(e,t)=>{window.addEventListener("message",n=>{if(n.source===window&&n.data.from!==void 0&&n.data.from===t){let r=n.data[0],o=e.getEvents();for(let a in o)a===r.event&&o[a](r.payload)}},!1)};var Fe=me(_e());var rt=chrome.runtime.getURL("assets/config.js"),Oe,S=(Oe=globalThis.browser)!=null?Oe:globalThis.chrome;async function ot(){var H,ue;let e=await S.storage.local.get("defaultConfig");if((H=e.defaultConfig)!=null&&H.apiKey)return e.defaultConfig;let t={},n=["DelayTime","RepeatTimes","port"],r=["enabledFor","useCapsolver","manualSolving","useProxy"],o=/\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm,i=(await(await fetch(rt)).text()).replace(o,""),c=i.slice(i.indexOf("{")+1,i.lastIndexOf("}")),l=JSON.stringify(c).replaceAll('\\"',"'").replaceAll("\\n","").replaceAll('"',"").replaceAll(" ",""),p=l.indexOf("blackUrlList"),u=l.slice(p),g=u.indexOf("],"),y=u.slice(0,g+1);l.replace(y,"").split(",").forEach(Ue=>{let[q,fe]=Ue.split(":");if(q&&fe){let L=fe.replaceAll("'","").replaceAll('"',"");for(let x=0;x<n.length;x++)q.endsWith(n[x])&&(L=Number(L));for(let x=0;x<r.length;x++)q.startsWith(r[x])&&(L=L==="true");t[q]=L}}),y=y.replaceAll("'","").replaceAll('"',"");let P=y.indexOf(":["),A=y.slice(P+2,y.length-1);t.blackUrlList=A.split(",");let w=await S.storage.local.get("config");return(ue=w==null?void 0:w.config)!=null&&ue.apiKey&&(t.apiKey=w.config.apiKey),S.storage.local.set({defaultConfig:t}),t}var k={manualSolving:!1,apiKey:"",appId:"",enabledForImageToText:!0,enabledForRecaptchaV3:!0,enabledForHCaptcha:!1,enabledForGeetestV4:!1,recaptchaV3MinScore:.5,enabledForRecaptcha:!0,enabledForDataDome:!1,enabledForAwsCaptcha:!0,useProxy:!1,proxyType:"http",hostOrIp:"",port:"",proxyLogin:"",proxyPassword:"",enabledForBlacklistControl:!1,blackUrlList:[],isInBlackList:!1,reCaptchaMode:"click",reCaptchaDelayTime:0,reCaptchaCollapse:!1,reCaptchaRepeatTimes:10,reCaptcha3Mode:"token",reCaptcha3DelayTime:0,reCaptcha3Collapse:!1,reCaptcha3RepeatTimes:10,reCaptcha3TaskType:"ReCaptchaV3TaskProxyLess",hCaptchaMode:"click",hCaptchaDelayTime:0,hCaptchaCollapse:!1,hCaptchaRepeatTimes:10,funCaptchaMode:"click",funCaptchaDelayTime:0,funCaptchaCollapse:!1,funCaptchaRepeatTimes:10,geetestMode:"click",geetestCollapse:!1,geetestDelayTime:0,geetestRepeatTimes:10,textCaptchaMode:"click",textCaptchaCollapse:!1,textCaptchaDelayTime:0,textCaptchaRepeatTimes:10,enabledForCloudflare:!1,cloudflareMode:"click",cloudflareCollapse:!1,cloudflareDelayTime:0,cloudflareRepeatTimes:10,datadomeMode:"click",datadomeCollapse:!1,datadomeDelayTime:0,datadomeRepeatTimes:10,awsCaptchaMode:"click",awsCollapse:!1,awsDelayTime:0,awsRepeatTimes:10,useCapsolver:!0,isInit:!1,solvedCallback:"captchaSolvedCallback",textCaptchaSourceAttribute:"capsolver-image-to-text-source",textCaptchaResultAttribute:"capsolver-image-to-text-result",textCaptchaModule:"common"},Ie={proxyType:["socks5","http","https","socks4"],mode:["click","token"]};async function Pe(){let e=await ot(),t=Object.keys(e);for(let n of t)if(!(n==="proxyType"&&!Ie[n].includes(e[n]))){{if(n.endsWith("Mode")&&!Ie.mode.includes(e[n]))continue;if(n==="port"){if(typeof e.port!="number")continue;k.port=e.port}}Reflect.has(k,n)&&typeof k[n]==typeof e[n]&&(k[n]=e[n])}return k}var st=Pe(),R={default:st,async get(e){return(await this.getAll())[e]},async getAll(){let e=await Pe(),t=await S.storage.local.get("config");return R.joinConfig(e,t.config)},async set(e){let t=await R.getAll(),n=R.joinConfig(t,e);return S.storage.local.set({config:n})},joinConfig(e,t){let n={};if(e)for(let r in e)n[r]=e[r];if(t)for(let r in t)n[r]=t[r];return n}};function Y(e){return new Promise((t,n)=>{let r=new Image;r.src=e,r.setAttribute("crossOrigin","anonymous"),r.onload=()=>{let o=document.createElement("canvas");o.width=r.width,o.height=r.height,o.getContext("2d").drawImage(r,0,0,r.width,r.height);let s=o.toDataURL();t(s)},r.onerror=o=>{n(o)}})}function v(e){return new Promise(t=>setTimeout(t,e))}function h(e,t){let n=t-e+1;return Math.floor(Math.random()*n+e)}function $(e){let t=e==null?void 0:e.getBoundingClientRect();return t?{x:t.top+window.scrollY-document.documentElement.clientTop+h(-5,5),y:t.left+window.scrollX-document.documentElement.clientLeft+h(-5,5)}:{x:0,y:0}}var Ae=["Error: ERROR_UNSUPPORTED_QUESTION"];function at(e,t,n,r,o){let[a,s]=t,[i,c]=o,[l,p]=n,[u,g]=r,y=a*(1-e)*(1-e)*(1-e)+3*l*e*(1-e)*(1-e)+3*u*e*e*(1-e)+i*e*e*e,b=s*(1-e)*(1-e)*(1-e)+3*p*e*(1-e)*(1-e)+3*g*e*e*(1-e)+c*e*e*e;return[y,b]}function it(e,t,n=30){let r=[],o=0,a=1;for(let u=0;u<n;++u)r.push(o),u<n*1/10?a+=h(60,100):u>=n*9/10&&(a-=h(60,100),a=Math.max(20,a)),o+=a;let s=[],i=[e.x,e.y],c=[(e.x+t.x)/2+h(30,100)*1,(e.y+t.y)/2+h(30,100)*1],l=[(e.x+t.x)/2+h(30,100)*1,(e.y+t.y)/2+h(30,100)*1],p=[t.x,t.y];for(let u of r){let[g,y]=at(u/o,i,c,l,p);s.push({x:g,y})}return s}function ct(e,t){let n=it(e,t,h(15,30));for(let r=0;r<n.length;r++)document.body.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:n[r].x,clientY:n[r].y}))}function lt({x:e,y:t}){document.body.dispatchEvent(new MouseEvent("mousedown",{bubbles:!0,clientX:e,clientY:t}))}function ut({x:e,y:t}){document.body.dispatchEvent(new MouseEvent("mouseup",{bubbles:!0,clientX:e,clientY:t}))}async function ft(e,t){ct(e,t),await v(h(30,80)),lt(t),await v(h(30,80)),ut(t)}function He(e,t){function n(r,o,a){let s=["mouseover","mousedown","mouseup","click"],i={clientX:o,clientY:a,bubbles:!0};for(let c=0;c<s.length;c++){let l=new MouseEvent(s[c],i);r.dispatchEvent(l)}}e.forEach(r=>{n(t,r.x,r.y)})}async function pt(e){for(let t=0;t<e.length-1;t++)await ft(e[t],e[t+1])}function dt(e,t,n){let o=[n?$(n):{x:t?h(420,530):h(10,100),y:t?h(200,300):h(5,200)}];for(let a=0;a<e.length;a++){let s=$(e[a]);o.push(s)}return o}async function B(e,t=null){let n=dt(e,!1,t);await pt(n)}var N="",J="",M="",U=0,W=null,_=!1,Z=!1;function K(){return document.querySelectorAll(".task-grid > .task-image > .image-wrapper > .image").length===9||document.querySelectorAll(".task-grid .task-image .wrapper .image").length===9}function O(){return document.querySelector(".task-answers")!==null}function ee(){return document.querySelector("canvas")!==null}function mt(){var t;let e=((t=document.querySelector("div.check"))==null?void 0:t.style.display)==="block";return e&&(U=0,!Z&&chrome.runtime.sendMessage({action:"solved"}),Z=!0),e}function ht(){let e=document.querySelector(".display-error");return String(e==null?void 0:e.style.opacity)==="1"}function gt(){var e;(e=document.querySelector("#checkbox"))==null||e.click()}function I(e){let t=e==null?void 0:e.style.background;return t==null?void 0:t.slice(t.indexOf("http"),t.indexOf('")'))}function yt(){let e=null;return e&&(window.clearInterval(e),e=null),new Promise(t=>{let n=[],r=[];K()?r=Array.from(document.querySelectorAll(".task-image")):O()&&(r=Array.from(document.querySelectorAll(".task-answers .challenge-answer"))),e=window.setInterval(()=>{for(let a of r){let s=a==null?void 0:a.querySelector("div.image"),i=I(s);n.push(i)}n.every(a=>!!a)?(window.clearInterval(e),t(n)):n=[]},500)})}async function vt(){let e=[];if(K()){let t=await yt(),n=t.length;for(let r=0;r<n;r++)try{let o=await Y(t[r]);e.push(o.slice(o.indexOf(";base64,")+8))}catch(o){console.log(o)}}else if(O()){let t=document.querySelector(".challenge-task > .task-image > .image-wrapper > .image"),n=I(t),r=await Y(n);e.unshift(r.slice(r.indexOf(";base64,")+8))}else if(ee()){let t=await qe();e.push(t)}return e}function bt(){var t;if(O())return M;if(J)return J;let e=document.querySelector(".prompt-text");return(t=e==null?void 0:e.innerText)!=null?t:e.innerHTML}async function Ct(){let e=await vt(),t=bt();return{queries:e,question:t}}function te(){let e=document.querySelector(".button-submit");e==null||e.click(),B([e],W),W=null,_=!1}async function xt(e){var a;let t=e.objects,n=Array.from(document.querySelectorAll(".task-image")),r=t.length,o=[];for(let s=0;s<r;s++)t[s]&&(await v(100),(a=n[s])==null||a.click(),o.push(n[s]));await B(o),W=o[o.length-1],await v(500),te()}async function wt(e){let t=e==null?void 0:e.tags,n=t[0],r=Array.from(document.querySelectorAll(".answer-text")),o=[];function a(s){["mouseover","mousedown","mouseup","click"].forEach(i=>{let c=new MouseEvent(i,{bubbles:!0,cancelable:!1});s.dispatchEvent(c)})}for(let s=1;s<t.length;s++)t[s]===n&&(await v(100),a(r[s-1]),o.push(r[s-1]));await B(o),W=o[o.length-1],await v(500),te()}async function Tt(e){var p;let t=(p=e==null?void 0:e.box)!=null?p:[],n=[],r=document.querySelector("canvas"),a=document.querySelector(".challenge-prompt").getBoundingClientRect(),i=document.querySelector(".bounding-box-example").getBoundingClientRect(),c=0,l=0;for(let u=0;u<t.length;u++)u%2!==0?c+=t[u]:l+=t[u];l=l/2,c=c/2+(a.height+i.height),n.push({x:l,y:c}),He(n,r),await v(500),te()}async function qe(){let e=document.querySelector("canvas");if(!e)return null;let[t,n]=[e.width,e.height],o=e.getContext("2d",{willReadFrequently:!0}).getImageData(0,0,t,n);if(Array.from(o.data).every((w,H)=>H%4===3||w===0))return console.log("The original canvas has no valid content"),null;let s=parseInt(e.style.width,10),i=parseInt(e.style.height,10);if(s<=0||i<=0)return console.log("Desired width and height should be positive numbers"),null;let c=Math.min(s/t,i/n),[l,p]=[t*c,n*c],u=document.querySelector(".bounding-box-example"),g=u==null?void 0:u.style.top.replace("px",""),y=u==null?void 0:u.style.height.replace("px",""),b=Number(g)+Number(y),C=document.createElement("canvas");Object.assign(C,{width:l,height:p}),C.getContext("2d").drawImage(e,0,b,t,n-b,0,0,l,p-b);let A=C.toDataURL("image/jpeg",.4);return A.slice(A.indexOf(";base64,")+8)}function ne(){return document.querySelector("#checkbox")!==null}function re(){mt()||(gt(),Z=!1)}function oe(){return document.querySelector(".challenge")!==null}function se(e=1e4){return new Promise(t=>{let n=Date.now(),r=Array.from(document.querySelectorAll(".task-image")),o=Array.from(document.querySelectorAll(".task-answers > .answer-example > .image-wrapper"));document.querySelector("canvas")!==null&&t(!0);let s=r.length!==0?r:o,i=[];s.length===0&&t(!1);let c=null;c&&window.clearInterval(c),c=window.setInterval(()=>{Date.now()-n>e&&t(!1);for(let p of s){let u=p==null?void 0:p.querySelector("div.image"),g=I(u);i.push(g)}i.every(p=>!!p)?(window.clearInterval(c),t(!0)):(i=[],window.clearInterval(c),t(!1))},100)})}function Mt(){let e=document.querySelector(".refresh");e==null||e.click()}async function ae(e){if(e<U)return!1;let t=document.querySelector("h2.prompt-text");if(!(t==null?void 0:t.innerText))return console.log("task text error--"),!1;let r=[];if(K()){let a=Array.from(document.querySelectorAll(".task-image"));if(a.length!==9)return console.log("grid cells error--"),!1;for(let s of a){let i=s==null?void 0:s.querySelector("div.image"),c=I(i);r.push(c)}}else if(O()){let a=I(document.querySelector(".task-image .image"));if(!a)return console.log("multi bg error--"),!1;r.push(a)}else if(ee()){let a=await qe();if(!a||_){console.log("canvas error--");let s=JSON.stringify(r);return N!==s&&(_=!1),!1}else r.push(a),_=!0}else return!1;let o=JSON.stringify(r);return N===o?!1:(N=o,!0)}async function ie(){ht()&&U++;let e=await Ct(),t={action:"solver",captchaType:"hCaptcha",params:e};chrome.runtime.sendMessage(t).then(n=>{var r,o,a;if(!(n!=null&&n.response)||((r=n==null?void 0:n.response)==null?void 0:r.error)){Ae.includes((o=n==null?void 0:n.response)==null?void 0:o.error)&&Mt(),N="",U++,_=!1;return}Lt((a=n.response.response)==null?void 0:a.solution)})}function Lt(e){K()?xt(e):O()?wt(e):ee()&&Tt(e)}function De(e){var t;try{let n=JSON.parse(e);J=(t=n==null?void 0:n.requester_question)==null?void 0:t.en,typeof(n==null?void 0:n.requester_restricted_answer_set)=="object"&&(M="",Object.keys(n.requester_restricted_answer_set).forEach(o=>{M+=n.requester_restricted_answer_set[o].en+"$"}),M=M.slice(0,M.length-1))}catch{console.log("Get question failed")}}var ce=document.createElement("script");ce.src=chrome.runtime.getURL("assets/inject/inject-hcaptcha.js");ce.dataset.from="hcaptcha";var Et=document.head||document.documentElement;Et.appendChild(ce);window.addEventListener("message",function(e){var t,n;(((t=e==null?void 0:e.data)==null?void 0:t.type)==="xhr"||((n=e==null?void 0:e.data)==null?void 0:n.type)==="fetch")&&De(e.data.data)});var V=!1;async function kt(e){!e.useCapsolver||!e.enabledForHCaptcha||!e.apiKey||e.enabledForBlacklistControl&&e.isInBlackList||e.hCaptchaMode!=="click"||(await v(e.hCaptchaDelayTime),setInterval(async()=>{if(V||(ne()&&re(),!oe())||!await se())return;if(V=!0,!await ae(e.hCaptchaRepeatTimes)){V=!1;return}await ie(),await v(2e3),V=!1},2500))}async function St(e){setInterval(async()=>{ne()&&re(),!(!oe()||!await se()||!await ae(e.hCaptchaRepeatTimes))&&await ie()},2500)}var G=null;G&&window.clearInterval(G);G=window.setInterval(async()=>{let e=await R.getAll();!e.isInit||(e.manualSolving?chrome.runtime.onMessage.addListener(t=>{t.command==="execute"&&St(e)}):kt(e),window.clearInterval(G))},100);var je=(0,Fe.bexContent)(e=>{});var le=chrome.runtime.connect({name:"contentScript"}),Be=!1;le.onDisconnect.addListener(()=>{Be=!0});var Ne=new E({listen(e){le.onMessage.addListener(e)},send(e){Be||(le.postMessage(e),window.postMessage({...e,from:"bex-content-script"},"*"))}});function Rt(e){let t=document.createElement("script");t.src=e,t.onload=function(){this.remove()},(document.head||document.documentElement).appendChild(t)}document instanceof HTMLDocument&&Rt(chrome.runtime.getURL("dom.js"));Re(Ne,"bex-dom");je(Ne);})();

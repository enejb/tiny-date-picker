(function(v,g){typeof exports=="object"&&typeof module<"u"?g(exports):typeof define=="function"&&define.amd?define(["exports"],g):(v=typeof globalThis<"u"?globalThis:v||self,g(v.TinyDatePicker={}))})(this,function(v){"use strict";function g(){var e=new Date;return e.setHours(0,0,0,0),e}function w(e,t){return(e&&e.toDateString())===(t&&t.toDateString())}function I(e,t){return e=new Date(e),e.setDate(e.getDate()+t),e}function b(e,t,n=!1){e=new Date(e);var o=e.getDate(),a=e.getMonth()+t;return e.setDate(1),e.setMonth(n?(12+a)%12:a),e.setDate(o),e.getDate()<o&&e.setDate(0),e}function k(e,t){return e=new Date(e),e.setFullYear(e.getFullYear()+t),e}function j(e,t){return e=new Date(e),e.setFullYear(t),e}function $(e,t){return b(e,t-e.getMonth())}function q(e){return function(t){return A(typeof t=="string"?e(t):t)}}function O(e,t,n){return e<t?t:e>n?n:e}function A(e){return e=new Date(e),e.setHours(0,0,0,0),e}function x(e,t){let n;return function(){clearTimeout(n),n=setTimeout(t,e)}}function M(){}function C(...e){const t=e[0];for(let n=1;n<e.length;++n){const o=e[n]||{};for(const a in o)t[a]=o[a]}return t}var R={days:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],today:"Today",clear:"Clear",close:"Close"};function B(e={}){const t=C(V(),e);var n=q(t.parse);return t.lang=C(R,t.lang),t.parse=n,t.inRange=K(t),t.min=n(t.min||k(g(),-100)),t.max=n(t.max||k(g(),100)),t.highlightedDate=t.parse(t.highlightedDate),t.alignment=t.alignment||"left",t}function V(){return{lang:R,mode:"dp-modal",highlightedDate:g(),format:function(e){return e.getMonth()+1+"/"+e.getDate()+"/"+e.getFullYear()},parse:function(e){var t=new Date(e);return isNaN(t.valueOf())?g():t},dateClass:function(e){return""},inRange:function(){return!0},appendTo:document.body,alignment:"left"}}function K(e){var t=e.inRange;return function(n,o){const a=e.min?e.min<=n:!0,s=e.max?e.max>=n:!0;return t(n,o)&&a&&s}}var d={left:37,up:38,right:39,down:40,enter:13,esc:27};function y(e,t,n){return t.addEventListener(e,n,!0),function(){t.removeEventListener(e,n,!0)}}const W={onKeyDown:X,onClick:{"dp-day":te,"dp-next":Z,"dp-prev":ee,"dp-today":_,"dp-clear":U,"dp-close":z,"dp-cal-month":G,"dp-cal-year":Q},render:J};function J(e){const t=e.opts,n=t.lang,o=e.state,a=n.days,s=t.dayOffset||0,i=o.selectedDate,u=o.highlightedDate,r=u.getMonth(),c=g().getTime();return'<div role="dialog" tabindex="0" class="dp-cal"><header class="dp-cal-header"><button tabindex="-1" type="button" class="dp-cal-month">'+n.months[r]+'</button><button tabindex="-1" type="button" class="dp-cal-year">'+u.getFullYear()+'</button><button tabindex="-1" type="button" class="dp-prev">Prev</button><button tabindex="-1" type="button" class="dp-next">Next</button></header><div class="dp-days">'+a.map(function(l,m){return'<span class="dp-col-header">'+a[(m+s)%a.length]+"</span>"}).join("")+ne(u,s,function(l){const m=l.getMonth()!==r,T=!t.inRange(l),S=l.getTime()===c;let D="dp-day";return D+=m?" dp-edge-day":"",D+=w(l,u)?" dp-current":"",D+=w(l,i)?" dp-selected":"",D+=T?" dp-day-disabled":"",D+=S?" dp-day-today":"",D+=" "+t.dateClass(l),'<button tabindex="-1" type="button" class="'+D+'" data-date="'+l.getTime()+'">'+l.getDate()+"</button>"})+'</div><footer class="dp-cal-footer"><button tabindex="-1" type="button" class="dp-today">'+n.today+'</button><button tabindex="-1" type="button" class="dp-clear">'+n.clear+'</button><button tabindex="-1" type="button" class="dp-close">'+n.close+"</button></footer></div>"}function X(e,t){const n=e.code||e.keyCode,o=n===d.left?-1:n===d.right?1:n===d.up?-7:n===d.down?7:0;n===d.esc?t.close():o&&(e.preventDefault(),t.setState({highlightedDate:I(t.state.highlightedDate,o)}))}function _(e,t){t.setState({selectedDate:g()})}function U(e,t){t.setState({selectedDate:null})}function z(e,t){t.close()}function G(e,t){t.setState({view:"month"})}function Q(e,t){t.setState({view:"year"})}function Z(e,t){const n=t.state.highlightedDate;t.setState({highlightedDate:b(n,1)})}function ee(e,t){const n=t.state.highlightedDate;t.setState({highlightedDate:b(n,-1)})}function te(e,t){if(!e.target)return;const n=e.target;t.setState({selectedDate:new Date(parseInt(n.getAttribute("data-date")))})}function ne(e,t,n){let o="";const a=new Date(e);a.setDate(1),a.setDate(1-a.getDay()+t),t&&a.getDate()===t+1&&a.setDate(t-6);for(let s=0;s<6*7;++s)o+=n(a),a.setDate(a.getDate()+1);return o}const oe={onKeyDown:ie,onClick:{"dp-month":ae},render:se};function ae(e,t){t.setState({highlightedDate:$(t.state.highlightedDate,parseInt(e.target.getAttribute("data-month"))),view:"day"})}function se(e){const o=e.opts.lang.months,s=e.state.highlightedDate.getMonth();return'<div class="dp-months">'+o.map(function(i,u){let r="dp-month";return r+=s===u?" dp-current":"",'<button tabindex="-1" type="button" class="'+r+'" data-month="'+u+'">'+i+"</button>"}).join("")+"</div>"}function ie(e,t){const n=e.code||e.keyCode,o=n===d.left?-1:n===d.right?1:n===d.up?-3:n===d.down?3:0;n===d.esc?t.setState({view:"day"}):o&&(e.preventDefault(),t.setState({highlightedDate:b(t.state.highlightedDate,o,!0)}))}const re={render:ce,onKeyDown:le,onClick:{"dp-year":ue}};function ce(e){const t=e.state,n=t.highlightedDate.getFullYear(),o=t.selectedDate.getFullYear();return'<div class="dp-years">'+de(e,function(a){let s="dp-year";return s+=a===n?" dp-current":"",s+=a===o?" dp-selected":"",'<button tabindex="-1" type="button" class="'+s+'" data-year="'+a+'">'+a+"</button>"})+"</div>"}function ue(e,t){t.setState({highlightedDate:j(t.state.highlightedDate,parseInt(e.target.getAttribute("data-year"))),view:"day"})}function le(e,t){const n=e.code||e.keyCode,o=t.opts,a=n===d.left||n===d.up?1:n===d.right||n===d.down?-1:0;if(n===d.esc)t.setState({view:"day"});else if(a){e.preventDefault();const s=k(t.state.highlightedDate,a);t.setState({highlightedDate:O(s,o.min,o.max)})}}function de(e,t){let n="";const o=e.opts.max.getFullYear();for(let a=o;a>=e.opts.min.getFullYear();--a)n+=t(a);return n}const fe={day:W,year:re,month:oe};(function(){if(typeof window.CustomEvent=="function")return!1;function e(t,n){n=n||{bubbles:!1,cancelable:!1,detail:null};var o=document.createEvent("CustomEvent");return o.initCustomEvent(t,n.bubbles,n.cancelable,n.detail),o}window.CustomEvent=e})();function P(e,t,n){let o,a=!1,s;const i={el:void 0,opts:n,shouldFocusOnBlur:!0,shouldFocusOnRender:!0,state:u(),adjustPosition:M,containerHTML:'<div class="dp"></div>',attachToDom:function(){n.appendTo.appendChild(i.el)},updateInput:function(r){const c=new CustomEvent("change",{bubbles:!0});e.value=r?n.format(r):"",e.dispatchEvent(c)},computeSelectedDate:function(){return n.parse(e.value)},currentView:function(){return fe[i.state.view]},open:function(){a||(i.el||(i.el=he(n,i.containerHTML),De(i)),s=O(i.computeSelectedDate(),n.min,n.max),i.state.highlightedDate=s||n.highlightedDate,i.state.view="day",i.attachToDom(),i.render(),t("open"))},isVisible:function(){return!!i.el&&!!i.el.parentNode},hasFocus:function(){const r=document.activeElement;return i.el&&i.el.contains(r)&&r.className.indexOf("dp-focuser")<0},shouldHide:function(){return i.isVisible()},close:function(r){const c=i.el;if(i.isVisible()){if(c){const l=c.parentNode;l&&l.removeChild(c)}a=!0,r&&i.shouldFocusOnBlur&&me(e),setTimeout(function(){a=!1},100),t("close")}},destroy:function(){i.close(),o()},render:function(){if(!i.el)return;const r=i.hasFocus(),c=i.currentView().render(i);c&&(i.el.firstChild.innerHTML=c),i.adjustPosition(),(r||i.shouldFocusOnRender)&&Y(i)},setState:function(r){for(const c in r)i.state[c]=r[c];t("statechange"),i.render()}};o=ge(e,i);function u(){return{get selectedDate(){return s},set selectedDate(r){r&&!n.inRange(r)||(r?(s=new Date(r),i.state.highlightedDate=s):s=r,i.updateInput(s),t("select"),i.close())},view:"day"}}return i}function he(e,t){const n=document.createElement("div");return n.className=e.mode,n.innerHTML=t,n}function ge(e,t){const n=x(5,function(){t.shouldHide()?t.close():t.open()}),o=[y("blur",e,x(150,function(){t.hasFocus()||t.close(!0)})),y("mousedown",e,function(){e===document.activeElement&&n()}),y("focus",e,n),y("input",e,function(a){if(!a||!a.target)return;const s=a.target,i=t.opts.parse(s.value);isNaN(i.valueOf())||t.setState({highlightedDate:i})})];return function(){o.forEach(function(a){a()})}}function Y(e){const t=e.el.querySelector(".dp-current");return t&&t.focus()}function De(e){const t=e.el,n=t.querySelector(".dp");t.ontouchstart=M;function o(a){a&&a.target.className.split(" ").forEach(function(s){const i=e.currentView().onClick[s];i&&i(a,e)})}y("blur",n,x(150,function(){e.hasFocus()||e.close(!0)})),y("keydown",t,function(a){const s=a;(s.code||s.keyCode)===d.enter?o(s):e.currentView().onKeyDown(s,e)}),y("mousedown",n,function(a){document.activeElement!==a.target&&(a.preventDefault(),Y(e))}),y("click",t,o)}function me(e){e.focus(),/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream&&e.blur()}function ye(e,t,n){const o=P(e,t,n);return e.readOnly=!0,o.containerHTML+='<a href="#" class="dp-focuser">.</a>',o}function pe(e,t,n){const o=P(e,t,n);return o.shouldFocusOnBlur=!1,Object.defineProperty(o,"shouldFocusOnRender",{get:function(){return e!==document.activeElement}}),o.adjustPosition=function(){ve(e,o,n.alignment)},o}function ve(e,t,n){const o=e.getBoundingClientRect(),a=window;we(t,o,a),be(t,o,a,n),t.el.style.visibility=""}function be(e,t,n,o){const a=e.el,s=n.pageXOffset,i=t.left+s,u=n.innerWidth+s,r=a.offsetWidth,c=i+r,l=u-r,m=c>u&&l>0?l:i;o==="right"?a.style.left=m+(t.width-r)+"px":a.style.left=m+"px"}function we(e,t,n){const o=e.el,a=n.pageYOffset,s=a+t.top,i=o.offsetHeight,u=s+t.height+8,r=s-i-8,c=r>0&&u+i>a+n.innerHeight,l=c?r:u;o.classList&&(o.classList.toggle("dp-is-above",c),o.classList.toggle("dp-is-below",!c)),o.style.top=l+"px"}function Se(e,t,n){const o=P(e,t,n);return o.close=M,o.updateInput=M,o.shouldFocusOnRender=n.shouldFocusOnRender||!1,o.computeSelectedDate=function(){return n.highlightedDate||new Date},o.attachToDom=function(){o.el&&e.appendChild(o.el)},o.open(),o}function Me(e,t,n){const o=e instanceof HTMLElement?e:document.querySelector(e);if(!o)throw new Error(`The provided input '${e}' could not be found.`);switch(n.mode){case"dp-modal":return ye(o,t,n);case"dp-below":return pe(o,t,n);case"dp-permanent":return Se(o,t,n);default:throw new Error(`Unknown mode: '${n.mode}`)}}function L(){var e={};function t(o,a){(e[o]=e[o]||[]).push(a)}function n(o){for(const a in o)t(a,o[a])}return{on:function(o,a){return a?t(o,a):n(o),this},emit:function(o,a){(e[o]||[]).forEach(function(s){s(o,a)})},off:function(o,a){return o?a?e[o]=(e[o]||[]).filter(function(s){return s!==a}):e[o]=[]:e={},this}}}function F(e,t){const n=L(),o=B(t),a=Me(e,i,o);var s={get state(){return a.state},on:n.on,off:n.off,setState:a.setState,open:a.open,close:a.close,destroy:a.destroy};function i(u){n.emit(u,s)}return s}function Ce(e,t){t=t||{};const n=L(),o=Te(e);let a,s={start:void 0,end:void 0};const i=o.querySelector(".dr-cal-start"),u=o.querySelector(".dr-cal-end");if(!i)throw new Error(`Could not find DateRangePicker startElement: '${i}`);if(!u)throw new Error(`Could not find DateRangePicker endElement: '${u}`);const r=F(i,C({},t.startOpts,{mode:"dp-permanent",dateClass:H})),c=F(u,C({},t.endOpts,{mode:"dp-permanent",highlightedDate:b(r.state.highlightedDate,1),dateClass:H})),l={state:s,setState:S,on:n.on,off:n.off};r.on("statechange",m),r.on("select",T),c.on("statechange",m),c.on("select",T);function m(p,h){const f=r.state.highlightedDate,E=c.state.highlightedDate;Ee(f,E)!==1&&(h===r?c.setState({highlightedDate:b(h.state.highlightedDate,1)}):r.setState({highlightedDate:b(h.state.highlightedDate,-1)}))}function T(p,h){const f=h.state.selectedDate;!s.start||s.end?S({start:f,end:void 0}):S({start:f>s.start?s.start:f,end:f>s.start?f:s.start})}function S(p){s={...p},n.emit("statechange",l),D()}function D(){r.setState({}),c.setState({})}/iPhone|iPad|iPod/i.test(navigator.userAgent)||o.addEventListener("mouseover",function(h){if(!h||!h.target)return;const f=h.target;if(f.classList.contains("dp-day")){const E=new Date(parseInt(f.dataset.date));!w(E,a)&&(a=E,D())}});function H(p){const h=(s.end||a)&&s.start&&ke(p,s.end||a,s.start),f=w(p,s.start)||w(p,s.end);return(h?"dr-in-range ":"")+(f?"dr-selected ":"")}return l}function Te(e){if(typeof e=="string"){const t=document.querySelector(e);if(!t)throw new Error(`Could not find container: '${e}'`);e=t}return e.innerHTML='<div class="dr-cals"><div class="dr-cal-start"></div><div class="dr-cal-end"></div></div>',e.querySelector(".dr-cals")}function N(e){return e.getFullYear()*12+e.getMonth()}function Ee(e,t){return N(t)-N(e)}function ke(e,t,n){return e<n&&e>=t||e<=t&&e>n}v.DatePicker=F,v.DateRangePicker=Ce,Object.defineProperty(v,Symbol.toStringTag,{value:"Module"})});

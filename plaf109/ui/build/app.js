var Te=Object.defineProperty;var $e=Object.getOwnPropertyDescriptor;var M=(i,t,e,s)=>{for(var n=s>1?void 0:s?$e(t,e):t,r=i.length-1,a;r>=0;r--)(a=i[r])&&(n=(s?a(t,e,n):a(n))||n);return s&&n&&Te(t,e,n),n};var Y=globalThis,J=Y.ShadowRoot&&(Y.ShadyCSS===void 0||Y.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,At=Symbol(),Mt=new WeakMap,G=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==At)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(J&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=Mt.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&Mt.set(e,t))}return t}toString(){return this.cssText}},Ct=i=>new G(typeof i=="string"?i:i+"",void 0,At);var St=(i,t)=>{if(J)i.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let s=document.createElement("style"),n=Y.litNonce;n!==void 0&&s.setAttribute("nonce",n),s.textContent=e.cssText,i.appendChild(s)}},ut=J?i=>i:i=>i instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return Ct(e)})(i):i;var{is:we,defineProperty:_e,getOwnPropertyDescriptor:Ee,getOwnPropertyNames:Me,getOwnPropertySymbols:Ae,getPrototypeOf:Ce}=Object,_=globalThis,qt=_.trustedTypes,Se=qt?qt.emptyScript:"",qe=_.reactiveElementPolyfillSupport,I=(i,t)=>i,H={toAttribute(i,t){switch(t){case Boolean:i=i?Se:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,t){let e=i;switch(t){case Boolean:e=i!==null;break;case Number:e=i===null?null:Number(i);break;case Object:case Array:try{e=JSON.parse(i)}catch{e=null}}return e}},X=(i,t)=>!we(i,t),Nt={attribute:!0,type:String,converter:H,reflect:!1,useDefault:!1,hasChanged:X};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),_.litPropertyMetadata??(_.litPropertyMetadata=new WeakMap);var y=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=Nt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),n=this.getPropertyDescriptor(t,s,e);n!==void 0&&_e(this.prototype,t,n)}}static getPropertyDescriptor(t,e,s){let{get:n,set:r}=Ee(this.prototype,t)??{get(){return this[e]},set(a){this[e]=a}};return{get:n,set(a){let l=n?.call(this);r?.call(this,a),this.requestUpdate(t,l,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Nt}static _$Ei(){if(this.hasOwnProperty(I("elementProperties")))return;let t=Ce(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(I("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(I("properties"))){let e=this.properties,s=[...Me(e),...Ae(e)];for(let n of s)this.createProperty(n,e[n])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,n]of e)this.elementProperties.set(s,n)}this._$Eh=new Map;for(let[e,s]of this.elementProperties){let n=this._$Eu(e,s);n!==void 0&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let n of s)e.unshift(ut(n))}else t!==void 0&&e.push(ut(t));return e}static _$Eu(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return St(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){let s=this.constructor.elementProperties.get(t),n=this.constructor._$Eu(t,s);if(n!==void 0&&s.reflect===!0){let r=(s.converter?.toAttribute!==void 0?s.converter:H).toAttribute(e,s.type);this._$Em=t,r==null?this.removeAttribute(n):this.setAttribute(n,r),this._$Em=null}}_$AK(t,e){let s=this.constructor,n=s._$Eh.get(t);if(n!==void 0&&this._$Em!==n){let r=s.getPropertyOptions(n),a=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:H;this._$Em=n;let l=a.fromAttribute(e,r.type);this[n]=l??this._$Ej?.get(n)??l,this._$Em=null}}requestUpdate(t,e,s,n=!1,r){if(t!==void 0){let a=this.constructor;if(n===!1&&(r=this[t]),s??(s=a.getPropertyOptions(t)),!((s.hasChanged??X)(r,e)||s.useDefault&&s.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(a._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:n,wrapped:r},a){s&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,a??e??this[t]),r!==!0||a!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),n===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(let[n,r]of this._$Ep)this[n]=r;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[n,r]of s){let{wrapped:a}=r,l=this[n];a!==!0||this._$AL.has(n)||l===void 0||this.C(n,void 0,r,l)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}};y.elementStyles=[],y.shadowRootOptions={mode:"open"},y[I("elementProperties")]=new Map,y[I("finalized")]=new Map,qe?.({ReactiveElement:y}),(_.reactiveElementVersions??(_.reactiveElementVersions=[])).push("2.1.2");var U=globalThis,Ot=i=>i,tt=U.trustedTypes,Pt=tt?tt.createPolicy("lit-html",{createHTML:i=>i}):void 0,pt="$lit$",T=`lit$${Math.random().toFixed(9).slice(2)}$`,ft="?"+T,Ne=`<${ft}>`,S=document,Z=()=>S.createComment(""),B=i=>i===null||typeof i!="object"&&typeof i!="function",vt=Array.isArray,kt=i=>vt(i)||typeof i?.[Symbol.iterator]=="function",mt=`[ 	
\f\r]`,k=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Rt=/-->/g,Dt=/>/g,A=RegExp(`>|${mt}(?:([^\\s"'>=/]+)(${mt}*=${mt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Lt=/'/g,It=/"/g,Ut=/^(?:script|style|textarea|title)$/i,gt=i=>(t,...e)=>({_$litType$:i,strings:t,values:e}),p=gt(1),_i=gt(2),Ei=gt(3),g=Symbol.for("lit-noChange"),m=Symbol.for("lit-nothing"),Ht=new WeakMap,C=S.createTreeWalker(S,129);function Zt(i,t){if(!vt(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return Pt!==void 0?Pt.createHTML(t):t}var Bt=(i,t)=>{let e=i.length-1,s=[],n,r=t===2?"<svg>":t===3?"<math>":"",a=k;for(let l=0;l<e;l++){let o=i[l],c,u,h=-1,f=0;for(;f<o.length&&(a.lastIndex=f,u=a.exec(o),u!==null);)f=a.lastIndex,a===k?u[1]==="!--"?a=Rt:u[1]!==void 0?a=Dt:u[2]!==void 0?(Ut.test(u[2])&&(n=RegExp("</"+u[2],"g")),a=A):u[3]!==void 0&&(a=A):a===A?u[0]===">"?(a=n??k,h=-1):u[1]===void 0?h=-2:(h=a.lastIndex-u[2].length,c=u[1],a=u[3]===void 0?A:u[3]==='"'?It:Lt):a===It||a===Lt?a=A:a===Rt||a===Dt?a=k:(a=A,n=void 0);let v=a===A&&i[l+1].startsWith("/>")?" ":"";r+=a===k?o+Ne:h>=0?(s.push(c),o.slice(0,h)+pt+o.slice(h)+T+v):o+T+(h===-2?l:v)}return[Zt(i,r+(i[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]},F=class i{constructor({strings:t,_$litType$:e},s){let n;this.parts=[];let r=0,a=0,l=t.length-1,o=this.parts,[c,u]=Bt(t,e);if(this.el=i.createElement(c,s),C.currentNode=this.el.content,e===2||e===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(n=C.nextNode())!==null&&o.length<l;){if(n.nodeType===1){if(n.hasAttributes())for(let h of n.getAttributeNames())if(h.endsWith(pt)){let f=u[a++],v=n.getAttribute(h).split(T),x=/([.?@])?(.*)/.exec(f);o.push({type:1,index:r,name:x[2],strings:v,ctor:x[1]==="."?it:x[1]==="?"?st:x[1]==="@"?nt:N}),n.removeAttribute(h)}else h.startsWith(T)&&(o.push({type:6,index:r}),n.removeAttribute(h));if(Ut.test(n.tagName)){let h=n.textContent.split(T),f=h.length-1;if(f>0){n.textContent=tt?tt.emptyScript:"";for(let v=0;v<f;v++)n.append(h[v],Z()),C.nextNode(),o.push({type:2,index:++r});n.append(h[f],Z())}}}else if(n.nodeType===8)if(n.data===ft)o.push({type:2,index:r});else{let h=-1;for(;(h=n.data.indexOf(T,h+1))!==-1;)o.push({type:7,index:r}),h+=T.length-1}r++}}static createElement(t,e){let s=S.createElement("template");return s.innerHTML=t,s}};function q(i,t,e=i,s){if(t===g)return t;let n=s!==void 0?e._$Co?.[s]:e._$Cl,r=B(t)?void 0:t._$litDirective$;return n?.constructor!==r&&(n?._$AO?.(!1),r===void 0?n=void 0:(n=new r(i),n._$AT(i,e,s)),s!==void 0?(e._$Co??(e._$Co=[]))[s]=n:e._$Cl=n),n!==void 0&&(t=q(i,n._$AS(i,t.values),n,s)),t}var et=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:s}=this._$AD,n=(t?.creationScope??S).importNode(e,!0);C.currentNode=n;let r=C.nextNode(),a=0,l=0,o=s[0];for(;o!==void 0;){if(a===o.index){let c;o.type===2?c=new P(r,r.nextSibling,this,t):o.type===1?c=new o.ctor(r,o.name,o.strings,this,t):o.type===6&&(c=new rt(r,this,t)),this._$AV.push(c),o=s[++l]}a!==o?.index&&(r=C.nextNode(),a++)}return C.currentNode=S,n}p(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},P=class i{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,n){this.type=2,this._$AH=m,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=q(this,t,e),B(t)?t===m||t==null||t===""?(this._$AH!==m&&this._$AR(),this._$AH=m):t!==this._$AH&&t!==g&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):kt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==m&&B(this._$AH)?this._$AA.nextSibling.data=t:this.T(S.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:s}=t,n=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=F.createElement(Zt(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===n)this._$AH.p(e);else{let r=new et(n,this),a=r.u(this.options);r.p(e),this.T(a),this._$AH=r}}_$AC(t){let e=Ht.get(t.strings);return e===void 0&&Ht.set(t.strings,e=new F(t)),e}k(t){vt(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,n=0;for(let r of t)n===e.length?e.push(s=new i(this.O(Z()),this.O(Z()),this,this.options)):s=e[n],s._$AI(r),n++;n<e.length&&(this._$AR(s&&s._$AB.nextSibling,n),e.length=n)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let s=Ot(t).nextSibling;Ot(t).remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},N=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,n,r){this.type=1,this._$AH=m,this._$AN=void 0,this.element=t,this.name=e,this._$AM=n,this.options=r,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=m}_$AI(t,e=this,s,n){let r=this.strings,a=!1;if(r===void 0)t=q(this,t,e,0),a=!B(t)||t!==this._$AH&&t!==g,a&&(this._$AH=t);else{let l=t,o,c;for(t=r[0],o=0;o<r.length-1;o++)c=q(this,l[s+o],e,o),c===g&&(c=this._$AH[o]),a||(a=!B(c)||c!==this._$AH[o]),c===m?t=m:t!==m&&(t+=(c??"")+r[o+1]),this._$AH[o]=c}a&&!n&&this.j(t)}j(t){t===m?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},it=class extends N{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===m?void 0:t}},st=class extends N{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==m)}},nt=class extends N{constructor(t,e,s,n,r){super(t,e,s,n,r),this.type=5}_$AI(t,e=this){if((t=q(this,t,e,0)??m)===g)return;let s=this._$AH,n=t===m&&s!==m||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==m&&(s===m||n);n&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},rt=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){q(this,t)}},Ft={M:pt,P:T,A:ft,C:1,L:Bt,R:et,D:kt,V:q,I:P,H:N,N:st,U:nt,B:it,F:rt},Oe=U.litHtmlPolyfillSupport;Oe?.(F,P),(U.litHtmlVersions??(U.litHtmlVersions=[])).push("3.3.3");var Vt=(i,t,e)=>{let s=e?.renderBefore??t,n=s._$litPart$;if(n===void 0){let r=e?.renderBefore??null;s._$litPart$=n=new P(t.insertBefore(Z(),r),r,void 0,e??{})}return n._$AI(i),n};var V=globalThis,E=class extends y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;let t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Vt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return g}};E._$litElement$=!0,E.finalized=!0,V.litElementHydrateSupport?.({LitElement:E});var Pe=V.litElementPolyfillSupport;Pe?.({LitElement:E});(V.litElementVersions??(V.litElementVersions=[])).push("4.2.2");var Re={attribute:!0,type:String,converter:H,reflect:!1,hasChanged:X},De=(i=Re,t,e)=>{let{kind:s,metadata:n}=e,r=globalThis.litPropertyMetadata.get(n);if(r===void 0&&globalThis.litPropertyMetadata.set(n,r=new Map),s==="setter"&&((i=Object.create(i)).wrapped=!0),r.set(e.name,i),s==="accessor"){let{name:a}=e;return{set(l){let o=t.get.call(this);t.set.call(this,l),this.requestUpdate(a,o,i,!0,l)},init(l){return l!==void 0&&this.C(a,void 0,i,l),l}}}if(s==="setter"){let{name:a}=e;return function(l){let o=this[a];t.call(this,l),this.requestUpdate(a,o,i,!0,l)}}throw Error("Unsupported decorator location: "+s)};function Qt(i){return(t,e)=>typeof e=="object"?De(i,t,e):((s,n,r)=>{let a=n.hasOwnProperty(r);return n.constructor.createProperty(r,s),a?Object.getOwnPropertyDescriptor(n,r):void 0})(i,t,e)}function O(i){return Qt({...i,state:!0,attribute:!1})}function R(i){return i.domain+"/"+i.name}var d={schedule:{domain:"switch",name:"Feeding Schedule"},cooling:{domain:"switch",name:"Cooling Enabled"},presence:{domain:"binary_sensor",name:"Pet Present"},missedMealReason:{domain:"text_sensor",name:"Missed Meal Reason"},acPower:{domain:"binary_sensor",name:"AC Power Present"},battery:{domain:"sensor",name:"Battery Percentage"},batteryInstalled:{domain:"binary_sensor",name:"Battery Installed"},chamberTemp:{domain:"sensor",name:"Chamber Temperature"},coolingTarget:{domain:"number",name:"Food Cooling Target"},arrivalTimeout:{domain:"number",name:"Arrival Timeout"},minimumFeedingTime:{domain:"number",name:"Eating Time"},chimeInterval:{domain:"number",name:"Chime Interval"},chimeTimeout:{domain:"number",name:"Chime Timeout"},feedTimes:[{domain:"time",name:"Meal One"},{domain:"time",name:"Meal Two"},{domain:"time",name:"Meal Three"}],mealDates:[{domain:"date",name:"Meal One Date"},{domain:"date",name:"Meal Two Date"},{domain:"date",name:"Meal Three Date"}],feedNow:{domain:"button",name:"Feed Now"},rotatePlate:{domain:"button",name:"Rotate Plate"},doorToggle:{domain:"button",name:"Toggle Lid"},chime:{domain:"button",name:"Play Chime"},clearMissedMeal:{domain:"button",name:"Clear Missed Meal"},visitCount:{domain:"sensor",name:"Pet Visit Count"},lastVisitTime:{domain:"text_sensor",name:"Last Visit"},lastVisitDuration:{domain:"sensor",name:"Last Visit Duration"},totalVisitTime:{domain:"sensor",name:"Total Time At Feeder"},statusLed:{domain:"switch",name:"Status LED"},firmwareVersion:{domain:"text_sensor",name:"Firmware Version"}};function ot(i){return Math.floor(Date.UTC(i.getFullYear(),i.getMonth(),i.getDate())/864e5)}function jt(i){let t=i===void 0?null:/^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(i);if(!t)return null;let e=Number(t[1]),s=Number(t[2]),n=Number(t[3]);return e<1970||s<1||s>12||n<1||n>31?null:Math.floor(Date.UTC(e,s-1,n)/864e5)}function zt(i){if(typeof i!="string")return null;let[t,e,s="0"]=i.split(":"),n=Number(t),r=Number(e),a=Number(s);return!Number.isFinite(n)||!Number.isFinite(r)||!Number.isFinite(a)?null:n*3600+r*60+a}function D(i,t){let e=new Date(i*864e5);return new Date(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate(),Math.floor(t/3600),Math.floor(t/60)%60,t%60)}function Wt(i,t,e){if(i.length===0)return{period:1,meals:[]};let s=ot(t),n=t.getHours()*3600+t.getMinutes()*60+t.getSeconds(),r=i.map(h=>h.date??s),a=Math.min(...r),l=Math.max(...r),o=l-a+1,c=s>l?Math.floor((s-a)/o)*o:0,u=[];return i.forEach((h,f)=>{if(h.time===null)return;let v=(r[f]??s)+c;(v<s||v===s&&h.time<=n)&&(v+=o);for(let x=0;x<e;x++)u.push({index:f,day:v+x*o,time:h.time})}),u.sort((h,f)=>h.day-f.day||h.time-f.time||h.index-f.index),{period:o,meals:u.slice(0,e)}}function Kt(i){let t=[];for(let e of i){let s=t[t.length-1];if(s?.day===e.day){s.meals.push(e);continue}s&&e.day>s.lastDay+1&&t.push({day:s.lastDay+1,lastDay:e.day-1,meals:[]}),t.push({day:e.day,lastDay:e.day,meals:[e]})}return t}var Yt='<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M450-80v-195L301-126l-43-42 192-192v-90h-90L172-262l-44-41 147-147H80v-60h195L125-660l43-43 192 193h90v-91L262-789l42-44 146 147v-194h60v194l150-150 42 43-192 192v91h91l189-189 43 42-147 147h194v60H686l148 149-41 43-192-192h-91v90l192 193-41 43-151-151v195h-60Z"/></svg>';var Gt='<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M465-160q-54 0-85.5-28T348-273h68q0 26 11.5 39.5T465-220q27 0 38.5-12t11.5-41q0-29-11.5-42.5T465-329H80v-60h385q54 0 82 28t28 88q0 57-28 85t-82 28ZM80-568v-60h548q37 0 54-17.5t17-58.5q0-41-17-58.5T628-780q-38 0-55 20.5T556-708h-60q0-58 35-95t97-37q61 0 96 35.5T759-704q0 65-35 100.5T628-568H80Zm672 330v-60q35 0 51.5-19.5T820-374q0-38-18.5-55T748-446H80v-60h668q62 0 97 35t35 97q0 64-33 100t-95 36Z"/></svg>';var Jt='<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M40-370v-60h150v60H40Zm221-207L146-692l42-42 115 115-42 42Zm19 337v-100h400v100H280Zm170-440v-200h60v200h-60Zm248 104-42-43 115-115 42 43-115 115Zm72 206v-60h150v60H770Z"/></svg>';var Xt='<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M660-87v-113h-80l120-192v112h80L660-87Zm-320-53Zm-30 60q-12.75 0-21.37-8.63Q280-97.25 280-110v-676q0-12.75 8.63-21.38Q297.25-816 310-816h90v-64h160v64h90q12.75 0 21.38 8.62Q680-798.75 680-786v333q-16 0-31 2t-29 7v-312H340v616h152q9 17 21 32t26 28H310Z"/></svg>';var te='<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M310-80q-12.75 0-21.37-8.63Q280-97.25 280-110v-676q0-12.75 8.63-21.38Q297.25-816 310-816h90v-64h160v64h90q12.75 0 21.38 8.62Q680-798.75 680-786v676q0 12.75-8.62 21.37Q662.75-80 650-80H310Z"/></svg>';var ee='<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M480.27-80q-82.74 0-155.5-31.5Q252-143 197.5-197.5t-86-127.5Q80-398 80-480q0-83 31.5-155.5T197-763q54-55 126-86.5T475.56-881q19.44 0 38.44 1.5 19 1.5 38 5.5-6 40 6.5 78.5t39 68q26.5 29.5 66.5 45t89 9.5q-7 63 22 109t104 53q1 9 1 18v17q0 81.38-31.5 153.34Q817-250.71 763-196.62t-127 85.36Q563-80 480.27-80Zm-60.15-478Q446-558 464-576.12q18-18.12 18-44T463.88-664q-18.12-18-44-18T376-663.88q-18 18.12-18 44T376.12-576q18.12 18 44 18Zm-80 200Q366-358 384-376.12q18-18.12 18-44T383.88-464q-18.12-18-44-18T296-463.88q-18 18.12-18 44T296.12-376q18.12 18 44 18ZM600-320q17 0 28.5-11.5T640-360q0-17-11.5-28.5T600-400q-17 0-28.5 11.5T560-360q0 17 11.5 28.5T600-320ZM480-140q142 0 236-93.5T821-464q-54-20-87.5-59.5T692-614q-81-11-136.5-70T492-821q-74-3-138.5 24t-112 74Q194-676 167-612.5T140-480q0 142 99 241t241 99Zm1-345Z"/></svg>';var ie='<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M274-120q-63.52 0-108.76-45.24T120-274v-413q0-64 45.24-108.5T274-840h413q63.11 0 108.06 44.94Q840-750.11 840-687v413q0 63.52-44.5 108.76T687-120H274Zm-94-372v218q0 38.77 27.61 66.39Q235.23-180 274-180h413q39 0 66-27.61 27-27.62 27-66.39v-218H675v105q0 24.75-17.62 42.37Q639.75-327 615-327H345q-24.75 0-42.37-17.63Q285-362.25 285-387v-105H180Zm165 0v105h270v-105H345Zm-165-60h600v-135q0-38.36-27.32-65.68Q725.36-780 687-780H274q-38.77 0-66.39 27Q180-726 180-687v135Z"/></svg>';var xt='<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M503.5-289.48q9.5-9.48 9.5-23.5t-9.48-23.52q-9.48-9.5-23.5-9.5t-23.52 9.48q-9.5 9.48-9.5 23.5t9.48 23.52q9.48 9.5 23.5 9.5t23.52-9.48ZM453-433h60v-253h-60v253Zm27.27 353q-82.74 0-155.5-31.5Q252-143 197.5-197.5t-86-127.34Q80-397.68 80-480.5t31.5-155.66Q143-709 197.5-763t127.34-85.5Q397.68-880 480.5-880t155.66 31.5Q709-817 763-763t85.5 127Q880-563 880-480.27q0 82.74-31.5 155.5Q817-252 763-197.68q-54 54.31-127 86Q563-80 480.27-80Zm.23-60Q622-140 721-239.5t99-241Q820-622 721.19-721T480-820q-141 0-240.5 98.81T140-480q0 141 99.5 240.5t241 99.5Zm-.5-340Z"/></svg>';var bt='<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="m381-218-43-43 100-99-100-99 43-43 99 100 99-100 43 43-100 99 100 99-43 43-99-100-99 100ZM180-80q-24 0-42-18t-18-42v-620q0-24 18-42t42-18h65v-60h65v60h340v-60h65v60h65q24 0 42 18t18 42v620q0 24-18 42t-42 18H180Zm0-60h600v-430H180v430Zm0-490h600v-130H180v130Zm0 0v-130 130Z"/></svg>';var se='<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M511-258q11-11 11-27t-11-27q-11-11-27-11t-27 11q-11 11-11 27t11 27q11 11 27 11t27-11Zm-62-135h59q0-26 6.5-47.5T555-490q31-26 44-51t13-55q0-53-34.5-85T486-713q-49 0-86.5 24.5T345-621l53 20q11-28 33-43.5t52-15.5q34 0 55 18.5t21 47.5q0 22-13 41.5T508-512q-30 26-44.5 51.5T449-393Zm31 313q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-156t86-127Q252-817 325-848.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 82-31.5 155T763-197.5q-54 54.5-127 86T480-80Zm0-60q142 0 241-99.5T820-480q0-142-99-241t-241-99q-141 0-240.5 99T140-480q0 141 99.5 240.5T480-140Zm0-340Z"/></svg>';var ne='<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M602-572q50-50 50-122v-126H308v126q0 72 50 122t122 50q72 0 122-50ZM160-80v-60h88v-127q0-71 40-129t106-84q-66-27-106-85t-40-129v-126h-88v-60h640v60h-88v126q0 71-40 129t-106 85q66 26 106 84t40 129v127h88v60H160Z"/></svg>';var re='<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M453-280h60v-240h-60v240Zm50.5-323.2q9.5-9.2 9.5-22.8 0-14.45-9.48-24.22-9.48-9.78-23.5-9.78t-23.52 9.78Q447-640.45 447-626q0 13.6 9.48 22.8 9.48 9.2 23.5 9.2t23.52-9.2ZM480.27-80q-82.74 0-155.5-31.5Q252-143 197.5-197.5t-86-127.34Q80-397.68 80-480.5t31.5-155.66Q143-709 197.5-763t127.34-85.5Q397.68-880 480.5-880t155.66 31.5Q709-817 763-763t85.5 127Q880-563 880-480.27q0 82.74-31.5 155.5Q817-252 763-197.68q-54 54.31-127 86Q563-80 480.27-80Zm.23-60Q622-140 721-239.5t99-241Q820-622 721.19-721T480-820q-141 0-240.5 98.81T140-480q0 141 99.5 240.5t241 99.5Zm-.5-340Z"/></svg>';var ae='<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M456-240h50v-97l76 76 35-36-111-111v-47h46l111 112 36-35-76-77h97v-50h-97l76-76-36-35-111 111h-46v-46l111-111-35-36-76 76v-97h-50v97l-77-76-35 36 112 111v46h-47L298-616l-36 35 76 76h-97v50h97l-76 77 36 35 111-112h47v47L344-297l35 36 77-76v97Zm24 160q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-156t86-127Q252-817 325-848.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 82-31.5 155T763-197.5q-54 54.5-127 86T480-80Zm0-60q142 0 241-99.5T820-480q0-142-99-241t-241-99q-141 0-240.5 99T140-480q0 141 99.5 240.5T480-140Zm0-340Z"/></svg>';var oe='<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M480-499Zm0 419q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM160-200v-60h80v-304q0-94 60.5-165T459-803q-8 15-13.5 31t-9.5 33q-59 15-97.5 63.5T300-564v304h360v-165q15 2 30 2t30-2v165h80v60H160Zm500-286-5-48q-21-6-40-17t-35-26l-42 20-35-54 38-30q-6-20-6-41.5t6-41.5l-38-30 35-55 42 20q17-14 35.5-25t39.5-17l5-49h60l6 49q21 6 39.5 17t35.5 25l42-20 35 55-38 30q6 20 6 41.5t-6 41.5l38 30-35 54-42-20q-16 15-35 26t-40 17l-6 48h-60Zm102-125q30-30 30-72t-30-72q-30-30-72-30t-72 30q-30 30-30 72t30 72q30 30 72 30t72-30Z"/></svg>';var yt='<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M160-200v-60h80v-304q0-84 49.5-150.5T420-798v-22q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v22q81 17 130.5 83.5T720-564v304h80v60H160Zm320-302Zm0 422q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM300-260h360v-304q0-75-52.5-127.5T480-744q-75 0-127.5 52.5T300-564v304Z"/></svg>';var le='<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M378-340h205v-56H459l124-159v-56H378v56h123L378-396v56ZM160-200v-60h80v-304q0-84 49.5-150.5T420-798v-22q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v22q81 17 130.5 83.5T720-564v304h80v60H160Zm320-302Zm0 422q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM300-260h360v-304q0-75-52.5-127.5T480-744q-75 0-127.5 52.5T300-564v304Z"/></svg>';var de='<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M382-120v-118L240-394v-215q0-25 17-42.5t41-17.5l60 60h-58v191l142 155.7v82.3h76v-82l49-54L67-816l42-42 750 750-42 42-207-207-32 35v118H382Zm310-240-32-32v-217H443L342-710v-130h60v171h156v-171h60v201l-30-30h72q24.75 0 42.38 17.62Q720-633.75 720-609v217l-28 32ZM553-499Zm-114 55Z"/></svg>';var ce='<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M480-200q117 0 198.5-81.5T760-480q0-117-81.5-198.5T480-760v280L289-280q37 39 87 59.5T480-200Zm0 120q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-156t86-127Q252-817 325-848.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 82-31.5 155T763-197.5q-54 54.5-127 86T480-80Zm0-60q142 0 241-99.5T820-480q0-142-99-241t-241-99q-141 0-240.5 99T140-480q0 141 99.5 240.5T480-140Zm0-340Z"/></svg>';var $={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},lt=i=>(...t)=>({_$litDirective$:i,values:t}),L=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,s){this._$Ct=t,this._$AM=e,this._$Ci=s}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};var{I:Ps}=Ft;var he=i=>i.strings===void 0;var ti={},ue=(i,t=ti)=>i._$AH=t;var Tt=lt(class extends L{constructor(i){if(super(i),i.type!==$.PROPERTY&&i.type!==$.ATTRIBUTE&&i.type!==$.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!he(i))throw Error("`live` bindings can only contain a single expression")}render(i){return i}update(i,[t]){if(t===g||t===m)return t;let e=i.element,s=i.name;if(i.type===$.PROPERTY){if(t===e[s])return g}else if(i.type===$.BOOLEAN_ATTRIBUTE){if(!!t===e.hasAttribute(s))return g}else if(i.type===$.ATTRIBUTE&&e.getAttribute(s)===t+"")return g;return ue(i),t}});var Q=class extends L{constructor(t){if(super(t),this.it=m,t.type!==$.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===m||t==null)return this._t=void 0,this.it=t;if(t===g)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let e=[t];return e.raw=e,this._t={_$litType$:this.constructor.resultType,strings:e,values:[]}}};Q.directiveName="unsafeHTML",Q.resultType=1;var $t=lt(Q);var me=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144 144">
  <path fill="#E5E5E4" d="M72 143.3C55 143.3 38.7 136.8 26.4 125C14.1 113.2 6.8 97.1 6.1 80.1V80.2L6.1 80.1V79.7C6 78.9 6 78 6 77.1C6 76.2 6 75.3 6.1 74.4V31.3C6 23.2 9.1 15.5 14.6 9.6C17.3 6.8 20.5 4.5 24 3C27.6 1.5 31.4 0.7 35.3 0.7L108.7 0.7C112.6 0.7 116.4 1.5 120 3C123.5 4.5 126.7 6.8 129.4 9.6C134.9 15.5 138 23.2 137.9 31.3V74.2C138 75.2 138 76.1 138 77.1C138 78 138 79 137.9 79.9V80.1C137.2 97.1 129.9 113.2 117.6 125C105.3 136.8 89 143.4 72 143.3Z"/>
  <!-- meal one (bottom) -->
  <path fill="#fff" d="M59.4 130.5C46.1 127.6 38 120.7 38 112.4C38 100 59 90.7 80 93.8C90.4 95.3 97 98.2 102 103.6C105.4 107.3 106 108.6 106 112.5C106 126.1 82 135.4 59.4 130.5Z"/>
  <path fill="var(--plate-fill-1, #fff)" d="M62.2 127.9C44.8 125 36.2 114.5 44 105.7C55 93.1 89.7 93.3 100.4 106C111.1 118.8 87.8 132.1 62.2 127.9Z"/>
  <!-- meal two (top left) -->
  <path fill="#fff" d="M23.6 88.4C9.8 74.5 29.6 33.7 52.2 29.5C57.5 28.5 62.4 31.1 65 36.4C71.6 50.1 61.3 76 44.8 86.9C39.4 90.6 38.2 91 32.5 91C27.1 91 25.9 90.6 23.6 88.4Z"/>
  <path fill="var(--plate-fill-2, #fff)" d="M28.3 88C18.8 84.2 21.2 62.8 32.8 47C38 40 43.5 35.6 49.8 33.5C55 31.7 58.9 32.8 61.8 37C69.5 48.5 56.3 78.2 39.8 86.4C34.4 89.1 31.9 89.5 28.3 88Z"/>
  <!-- meal three (top right) -->
  <path fill="#fff" d="M101.7 88.9C89.2 82.3 77 61.2 77 46.3C77 35.9 81.9 29.4 89.8 29.6C96.5 29.7 101.6 32.4 109 39.9C124 55.1 129.6 79.1 120.4 88.4C118.1 90.6 116.9 91 111.6 91C107.5 90.9 104.3 90.3 101.7 88.9Z"/>
  <path fill="var(--plate-fill-3, #fff)" d="M104.5 86.7C86.1 77.7 73 43.6 84.4 34.1C86.7 32.2 92.9 32.4 97.6 34.6C110.4 40.7 123.6 64.8 121.6 78.4C120.2 87.8 113.5 91 104.5 86.7Z"/>
  <!-- digits: Creato Display Black outlines (the app's font), placed to match the old plate PNGs -->
  <path fill="var(--plate-digit-1, #CBC9C6)" d="M75.2 121.2V103.8H71.7C71.1 106.2 69.7 107.4 66.8 107.5V110.8H67.8C68.3 110.8 70.2 110.8 70.7 110.7V121.2Z"/>
  <path fill="var(--plate-digit-2, #CBC9C6)" d="M31.9 62.6 35.1 64.3 39.3 56.1C40.1 56.6 40.3 57.5 40.1 58.8L39.8 61.5C39.4 64.7 40.3 66.9 42.6 68.1C45.5 69.6 48.7 68.5 50.7 64.7C52.7 60.8 51.6 57.7 48.1 55.9L46.2 59.7C47.7 60.7 48.1 61.8 47.4 63.1C46.9 64.2 45.8 64.7 44.8 64.1C43.7 63.6 43.2 62.6 43.4 60.9L43.7 58.6C44.1 55 43.1 52.9 39.8 51.3L38.1 50.4Z"/>
  <path fill="var(--plate-digit-3, #CBC9C6)" d="M109.1 55.8C106.8 52 103.6 50.8 101.1 52.2C99 53.5 98.6 55.2 99.2 57.1C97.9 55.8 96.4 55.4 94.5 56.5C92.1 57.9 91.5 61.3 93.7 65C96.1 68.9 99.3 69.7 102.3 68L100.1 64.3C98.7 64.9 97.6 64.4 96.9 63.2C96.2 62.1 96.2 60.7 97.2 60.1C98.3 59.5 99.2 60.3 99.9 61.5L100.7 62.8L103.6 61L102.7 59.5C101.9 58.2 101.9 57 102.8 56.5C103.9 55.8 105.1 56.2 106 57.6C106.8 59 106.7 60.4 105.2 61.5L107.4 65.1C111.2 62.9 111.4 59.6 109.1 55.8Z"/>
</svg>
`;var dt=["bg-meal-1","bg-meal-2","bg-meal-3"],ii=["var(--color-meal-1)","var(--color-meal-2)","var(--color-meal-3)"],si="#D6B798";function pe(i){let t=d.feedTimes.map((e,s)=>{let n=i(s);return n?`--plate-fill-${s+1}:${n};--plate-digit-${s+1}:#fff;`:""}).join("");return p`<div class="w-23 h-24.5 shrink-0 [&>svg]:h-full [&>svg]:w-full" style=${t} aria-hidden="true">
    ${$t(me)}
  </div>`}function b(i,t="w-4.5 h-4.5 text-text-muted"){return p`<span class="inline-block shrink-0 [&>svg]:h-full [&>svg]:w-full [&>svg]:fill-current ${t}"
    >${$t(i)}</span
  >`}var ni={danger:{box:"bg-danger-soft",badge:"bg-danger/15 text-danger",title:"text-danger"},warn:{box:"bg-accent-soft",badge:"bg-accent/20 text-accent-dark",title:"text-accent-dark"}};function j(i,t,e,s,n,r){let a=ni[t];return p`<div class="flex items-center gap-3 rounded-lg max-narrow:rounded-none px-3.5 max-narrow:px-4.5 py-2 mb-3.5 ${a.box}" ?hidden=${i}>
    <span class="w-9 h-9 shrink-0 rounded-full flex items-center justify-center ${a.badge}">${b(e,"w-5 h-5")}</span>
    <div class="flex flex-col gap-0.5 min-w-0 flex-1">
      <div class="text-[14px] font-bold ${a.title}">${s}</div>
      <div class="text-xs text-banner-detail">${n}</div>
    </div>
    ${r?p`<button
          class="flex-none h-8 px-3 rounded-full border-0 ${a.badge} text-[13px] font-bold cursor-pointer active:scale-90"
          aria-label="${r.label}: ${s}"
          @click=${r.onClick}
        >
          ${r.label}
        </button>`:null}
  </div>`}function z(i,t,e,s,n){return p`<div class="row flex-col items-stretch">
    <div class="flex items-center justify-between gap-2">
      <div class="row-label min-w-0"><span class="badge">${b(t)}</span>${e}</div>
      ${n}
    </div>
    <p class="m-0 mt-2 text-xs leading-snug text-text-muted" ?hidden=${!i.showSettingsHelp}>${s}</p>
  </div>`}function wt(i,t,e){return p`
    <label class="relative w-11 h-6.5 shrink-0 inline-block">
      <input
        type="checkbox"
        role="switch"
        aria-label=${i}
        class="peer absolute inset-0 opacity-0 w-full h-full m-0 z-10 cursor-pointer"
        .checked=${t}
        @change=${e}
      />
      <span
        class="absolute inset-0 bg-switch-track-off rounded-full transition-colors duration-150 peer-checked:bg-accent"
      ></span>
      <span
        class="absolute top-0.75 left-0.75 w-5 h-5 bg-white rounded-full shadow-[0_1px_3px_rgba(0,0,0,0.25)] transition-transform duration-150 peer-checked:translate-x-4.5"
      ></span>
    </label>
  `}function W(i,t,e,{zeroText:s,editable:n=!1,label:r}={}){let a="w-7.5 h-7.5 rounded-full border-0 bg-tray text-accent-dark text-base font-extrabold cursor-pointer active:scale-90",l=i.numText(t,e,s),o=i.isEditing(t)?g:Tt(l),c=n?p`<input
        type="text"
        inputmode="decimal"
        enterkeyhint="done"
        autocomplete="off"
        aria-label=${r??t.name}
        class="w-24 rounded-sm border-0 bg-black/20 px-1 py-1 text-center text-[15px] font-extrabold text-inherit font-[inherit] cursor-text outline-none focus:bg-tray focus:ring-2 focus:ring-accent"
        .value=${o}
        @focus=${u=>i.onNumberFocus(u,t)}
        @keydown=${u=>i.onEditKeydown(u)}
        @change=${u=>i.onNumberChange(u,t,e,s)}
        @blur=${()=>i.onEditBlur()}
      />`:p`<span class="min-w-11 text-center font-extrabold text-[15px]">${l}</span>`;return p`
    <div class="flex items-center gap-2.5">
      <button class="${a}" aria-label="Decrease ${r??t.name}" @click=${()=>i.stepNumberEntity(t,-1)}>−</button>
      ${c}
      <button class="${a}" aria-label="Increase ${r??t.name}" @click=${()=>i.stepNumberEntity(t,1)}>+</button>
    </div>
  `}function ri(i){let t=i.isOn(d.acPower)?Xt:te,e=i.batteryLow?"text-danger":"text-text-muted";return p`
    <div class="flex items-center gap-0.5 bg-card rounded-full px-2 py-1.5 shadow text-xs font-semibold text-text" ?hidden=${!i.batteryInstalled}>
      ${b(t,`w-3.5 h-3.5 ${e}`)}
      <span class="leading-none">${i.batteryPctText}</span>
    </div>
  `}function ai(i){return p`<div class="flex items-center gap-2">
    <span class="flex items-center gap-2 shrink-0 rounded-full pl-1 pr-3 py-1 text-bg ${dt[i.index]??dt[0]}">
      <span
        class="h-6 min-w-6 @min-[260px]:w-22 px-1.5 shrink-0 rounded-full bg-black/15 flex items-center justify-center text-xs font-extrabold whitespace-nowrap"
        ><span class="hidden @min-[260px]:inline">${i.name}</span><span class="@min-[260px]:hidden">${i.index+1}</span></span
      >
      <span class="min-w-17 text-sm font-bold tabular-nums whitespace-nowrap">${i.timeText}</span>
    </span>
    <span class="ml-auto text-xs text-text-muted whitespace-nowrap" ?hidden=${!i.countdownText}>${i.countdownText}</span>
  </div>`}function oi(i){let t=i.meals.length===0;return p`<li class="flex gap-3.5 py-2.5 border-t border-tray first:border-t-0 first:pt-0 last:pb-0 ${t?"opacity-60":""}">
    <div
      class="w-12 shrink-0 self-start rounded-sm flex flex-col items-center py-1.5 ${i.isToday?"bg-accent-soft text-accent-dark":"bg-tray text-text"}"
    >
      <span class="text-[10px] font-bold uppercase tracking-[0.5px] leading-none">${i.monthText}</span>
      <span class="text-xl font-extrabold leading-none mt-1">${i.dayOfMonthText}</span>
    </div>
    <div class="@container flex-1 min-w-0">
      <div class="text-sm font-bold ${i.isToday?"text-accent-dark":""}">${i.title}</div>
      ${t?p`<div class="text-xs text-text-muted mt-0.5">No meals</div>`:p`<div class="flex flex-col gap-1.5 mt-1.5">${i.meals.map(ai)}</div>`}
    </div>
  </li>`}function li(i){let t;return i.off?t=p`<p class="m-0 text-sm text-text-muted">The feeding schedule is off, so no meals will be served automatically.</p>`:i.days.length===0?t=p`<p class="m-0 text-sm text-text-muted">No upcoming meals.</p>`:t=p`<ol class="list-none m-0 p-0">${i.days.map(oi)}</ol>`,p`<div class="card">
    <div class="card-title">
      <h2>Upcoming Meals</h2>
      <span class="rounded-full bg-tray px-2.5 py-1 text-xs font-semibold text-text-muted">${i.periodText}</span>
    </div>
    ${t}
  </div>`}function fe(i){let t=i.nextMeal;return p`
    <header class="flex items-center justify-between pt-[calc(16px+env(safe-area-inset-top))] px-1 max-narrow:px-4.5 pb-3">
      <div>
        <h1 class="text-[19px] max-[385px]:text-base font-bold m-0 tracking-[0.2px]">${i.deviceTitle}</h1>
        <div class="text-xs text-text-muted mt-0.5 flex items-center gap-1">
          <span class="w-2 h-2 rounded-full shrink-0 ${i.connected?"bg-ok":"bg-danger"}"></span>
          <span>${i.connLabel}</span>
        </div>
      </div>
      ${ri(i)}
    </header>

    <main>
    ${j(i.missedMealReason===null,"danger",xt,"Pet missed a meal",i.missedMealReason??"Today's meals may be offset unless fed manually.",{label:"Clear",onClick:()=>i.pressButton(d.clearMissedMeal)})}
    ${j(!i.onBattery,"warn",de,"Running on battery","Cooling is paused until AC power returns.")}
    ${j(i.mealOverlapError===null,"danger",bt,"Scheduled meals overlap",i.mealOverlapError??"")}
    ${j(i.mealOverlapWarning===null,"warn",bt,"Meals may overlap",i.mealOverlapWarning??"")}
    ${j(!i.longArrivalTimeout,"warn",ne,"Long arrival timeout","Food may sit out for hours if your pet doesn't come.")}

    <div class="sr-only" role="status">${i.toast?.info?i.toast.text:""}</div>
    <div class="sr-only" role="alert">${i.toast&&!i.toast.info?i.toast.text:""}</div>
    <div
      class="fixed inset-x-4 bottom-[calc(16px+env(safe-area-inset-bottom))] z-50 mx-auto max-w-md flex items-center gap-3 ${i.toast?.info?"bg-accent-soft text-accent-dark":"bg-danger-soft text-danger"} rounded-md px-3.5 py-2.5 text-[13px] font-semibold shadow transition-[opacity,translate] duration-200 starting:opacity-0 starting:translate-y-2"
      aria-hidden="true"
      ?hidden=${!i.toast}
    >
      ${b(i.toast?.info?re:xt,"w-5 h-5")}
      <span>${i.toast?.text}</span>
    </div>

    <div class="card">
      <div class="card-title">
        <h2>Next Feeding</h2>
        <div class="flex gap-2">
          <button
            class="flex-none h-8 px-3 gap-1.5 rounded-full border-0 bg-accent-soft text-accent-dark text-[13px] font-bold flex items-center justify-center cursor-pointer active:scale-90"
            title="Toggle lid"
            @click=${()=>i.pressButton(d.doorToggle)}
          >
            ${b(ie,"w-4.5 h-4.5")}
            Lid
          </button>
          <button
            class="flex-none w-8 h-8 rounded-full border-0 bg-accent-soft text-accent-dark flex items-center justify-center cursor-pointer active:scale-90"
            aria-label="Play chime"
            title="Play chime"
            @click=${()=>i.pressButton(d.chime)}
          >
            ${b(yt,"w-4.5 h-4.5")}
          </button>
        </div>
      </div>
      <div class="flex items-center gap-4.5">
        ${pe(e=>e===t.index?si:null)}
        <div class="flex-1 min-w-0">
          <div class="stat-label">Next slot</div>
          <div class="text-[28px] font-extrabold leading-tight">${t.timeText}</div>
          <div class="text-xs text-text-muted" ?hidden=${!t.label}>${t.label}</div>
        </div>
      </div>
      <div class="flex gap-2.5 mt-4">
        <button class="btn bg-accent text-accent-ink" @click=${()=>i.pressButton(d.feedNow)}>
          ${b(yt,"w-4.5 h-4.5")}
          Feed Now
        </button>
        <button class="btn" @click=${()=>i.pressButton(d.rotatePlate)}>Rotate Plate</button>
      </div>
    </div>

    <div class="card">
      <div class="card-title">
        <h2>Feeding Schedule</h2>
        ${wt("Feeding Schedule",i.isOn(d.schedule),e=>i.setSwitch(e,d.schedule))}
      </div>
      <div class="flex items-center gap-4.5">
        ${pe(e=>ii[e]??null)}
        <div class="@container flex flex-col gap-2 flex-1 min-w-0">
          ${d.feedTimes.map((e,s)=>p`
              <label class="flex items-center gap-2 rounded-full pl-1 pr-3 py-1 text-bg ${dt[s]??dt[0]}">
                <span
                  class="h-6 min-w-6 @min-[200px]:w-19 px-1.5 shrink-0 rounded-full bg-black/15 flex items-center justify-center text-xs font-extrabold"
                  ><span class="hidden @min-[200px]:inline">${e.name}</span><span class="@min-[200px]:hidden">${s+1}</span></span
                >
                <input
                  type="time"
                  aria-label=${e.name}
                  class="time-input flex-1 min-w-0 border-0 bg-transparent p-0 text-sm font-bold text-inherit font-[inherit] disabled:opacity-40"
                  .value=${i.isEditing(e)?g:Tt(i.mealTimeValue(e))}
                  @focus=${()=>i.onEditFocus(e)}
                  @keydown=${n=>i.onEditKeydown(n)}
                  @change=${n=>i.onMealTimeChange(n,e,s)}
                  @blur=${()=>i.onMealTimeBlur()}
                />
              </label>
            `)}
        </div>
      </div>
    </div>

    ${li(i.upcomingMeals)}

    <div class="card">
      <div class="card-title">
        <h2>Pet Presence</h2>
        <span class="text-xs font-semibold ${i.isOn(d.presence)?"text-ok":"text-text-muted"}">${i.presenceText}</span>
      </div>
      <div class="@container">
        <div class="flex flex-col @min-[380px]:flex-row @min-[380px]:items-center">
          <div class="flex items-center gap-4.5 flex-1 min-w-0">
            <div
              class="pet-body w-23 h-19 shrink-0 bg-current transition-colors duration-150 ${i.isOn(d.presence)?"text-accent-dark":"text-text-muted"}"
            ></div>
            <div class="flex-1 min-w-0">
              <div class="stat-label">Last visit</div>
              <div class="text-[28px] font-extrabold leading-tight">${i.lastVisitDurationText}</div>
              <div class="text-xs text-text-muted" ?hidden=${!i.lastVisitAtText}>at ${i.lastVisitAtText}</div>
            </div>
          </div>
          <div
            class="flex items-stretch text-center mt-4 pt-3.5 border-t border-tray @min-[380px]:mt-0 @min-[380px]:pt-0 @min-[380px]:border-t-0 @min-[380px]:self-stretch @min-[380px]:py-2"
          >
            <div class="flex-1 flex flex-col justify-center @min-[380px]:flex-none @min-[380px]:px-3.5">
              <div class="stat-label">Visits</div>
              <div class="text-lg font-extrabold leading-tight mt-0.5">${i.stateText(d.visitCount)}</div>
            </div>
            <div class="w-px bg-tray"></div>
            <div class="flex-1 flex flex-col justify-center @min-[380px]:flex-none @min-[380px]:pl-3.5">
              <div class="stat-label">Total time</div>
              <div class="text-lg font-extrabold leading-tight mt-0.5">${i.totalVisitText}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-title"><h2>Chamber</h2></div>
      <div class="row">
        <div class="row-label">
          <span class="badge">${b(Yt)}</span>
          Temperature
        </div>
        <span class="text-text text-lg font-extrabold">${i.stateText(d.chamberTemp,"-- \xB0F")}</span>
      </div>
      <div class="row">
        <div class="row-label"><span class="badge">${b(Gt)}</span>Cooling</div>
        ${wt("Cooling",i.isOn(d.cooling),e=>i.setSwitch(e,d.cooling))}
      </div>
      <div class="row">
        <div class="row-label"><span class="badge">${b(ae)}</span>Target</div>
        ${W(i,d.coolingTarget,"\xB0",{editable:!0,label:"Cooling Target"})}
      </div>
    </div>

    <div class="card">
      <div class="card-title">
        <h2>Configuration</h2>
        <button
          class="w-8 h-8 shrink-0 rounded-full border-0 flex items-center justify-center cursor-pointer active:scale-90 ${i.showSettingsHelp?"bg-accent-soft text-accent-dark":"bg-transparent text-text-muted"}"
          aria-label="Help"
          aria-expanded=${String(i.showSettingsHelp)}
          @click=${()=>i.toggleSettingsHelp()}
        >
          ${b(se,"w-5 h-5")}
        </button>
      </div>
      ${z(i,ce,"Arrival Timeout","How long to wait for your pet once a meal is served. If they don't show up, the lid will close, and the plate won't rotate. Turn off to keep the lid open until your pet arrives.",W(i,d.arrivalTimeout,"minute",{zeroText:"Off",editable:!0,label:"Arrival Timeout"}))}
      ${z(i,ee,"Feeding Time","Once your pet arrives, how long to keep the lid open.",W(i,d.minimumFeedingTime,"minute",{editable:!0,label:"Feeding Time"}))}
      ${z(i,oe,"Chime Interval","While waiting for your pet, chime again every this many seconds until they arrive. Turn off to chime only once per meal.",W(i,d.chimeInterval,"second",{zeroText:"Off",editable:!0,label:"Chime Interval"}))}
      ${z(i,le,"Chime Timeout","Stop repeating the chime after this many minutes. The lid stays open, and the meal keeps waiting for your pet. Turn off to chime until they arrive.",W(i,d.chimeTimeout,"minute",{zeroText:"Off",editable:!0,label:"Chime Timeout"}))}
      ${z(i,Jt,"Status LED","Enable to show a steady white light while everything is fine. Warnings show regardless: red pulse for a missed meal and pulsing white when Wi-Fi is down.",wt("Status LED",i.isOn(d.statusLed),e=>i.setSwitch(e,d.statusLed)))}
    </div>
    </main>

    <footer class="text-center">
      <a
        class="text-xs text-text-muted underline underline-offset-2"
        href="https://github.com/esphome/esphome/releases"
        target="_blank"
        rel="noopener"
        >${i.firmwareVersionText}</a
      >
    </footer>
  `}if(!document.querySelector('meta[name="viewport"]')){let i=document.createElement("meta");i.name="viewport",i.content="width=device-width, initial-scale=1",document.head.appendChild(i)}document.documentElement.lang||(document.documentElement.lang="en");function di(i){let t=Math.floor(i/3600),e=Math.floor(i%3600/60),s=Math.floor(i%60);return t>0?`Uptime ${t}h ${e}m`:e>0?`Uptime ${e}m ${s}s`:`Uptime ${s}s`}var Et=new Intl.DateTimeFormat([],{hour:"numeric",minute:"2-digit"});function ci(i){let t=i?new Date(i):null;if(!t||Number.isNaN(t.getTime()))return null;let e=Et.format(t);return t.toDateString()===new Date().toDateString()?e:t.toLocaleDateString([],{month:"short",day:"numeric"})+", "+e}var be=new Intl.DurationFormat([],{style:"narrow"});function ve(i){let t=Math.round(i),e={hours:Math.floor(t/3600),minutes:Math.floor(t%3600/60),seconds:t%60};return be.format(e)||"0s"}var hi=new Intl.DateTimeFormat([],{month:"short"}),ui=new Intl.DateTimeFormat([],{weekday:"long"}),ge=new Intl.DateTimeFormat([],{month:"short",day:"numeric"});function xe(i,t){return i===t?"Today":i===t+1?"Tomorrow":ui.format(D(i,0))}function mi(i){let t=Math.max(1,Math.ceil(i/6e4));return t>1440?null:"in "+be.format({hours:Math.floor(t/60),minutes:t%60})}var pi=/^([^\s(]+)(?:\s*\(config hash 0x[0-9a-f]+)?(?:,\s*(built[^)]*))?\)?$/i;function fi(i){let t=pi.exec(i);return t?t[2]?`${t[1]}, ${t[2]}`:t[1]??i:i}function _t(i){if(typeof i!="string")return null;let t=i.split(":"),e=Number(t[0]),s=Number(t[1]);return!Number.isFinite(e)||!Number.isFinite(s)?null:e*60+s}function ct(i){let t=String(i),e=t.indexOf(".");return e===-1?0:t.length-e-1}var ye={second:"minute",minute:"hour"};function ht(i){return new Intl.NumberFormat([],{style:"unit",unit:i,unitDisplay:"short"})}function K(i,t,e,s){if(i===0&&s!==void 0)return s;if(!Number.isFinite(i))return"--";let n=ye[e];if(!n)return i.toFixed(ct(t))+e;let r=Math.floor(i/60),a=i%60;if(!r)return ht(e).format(a);let l=ht(n).format(r);return a?`${l} ${ht(e).format(a)}`:l}function vi(i){return ye[i]?ht(i).formatToParts(1).find(t=>t.type==="unit")?.value??i:i}var gi=6,w=class extends E{constructor(){super(...arguments);this.confirmed={};this.store={};this.deviceTitle="PLAF109";this.connected=!1;this.connLabel="Connecting\u2026";this.toast=null;this.showSettingsHelp=!1;this.onVisibilityChange=()=>{document.visibilityState==="hidden"&&this.saveMealTime(!1)}}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.connectSSE(),this.nextMealTimer=setInterval(()=>this.requestUpdate(),3e4),this.uptimeTimer=setInterval(()=>this.renderUptime(),1e3),document.addEventListener("visibilitychange",this.onVisibilityChange)}disconnectedCallback(){super.disconnectedCallback(),this.nextMealTimer&&clearInterval(this.nextMealTimer),this.uptimeTimer&&clearInterval(this.uptimeTimer),this.toastTimer&&clearTimeout(this.toastTimer),this.eventSource&&this.eventSource.close(),this.toast=null,this.setConnected(!1),this.editing=void 0,document.removeEventListener("visibilitychange",this.onVisibilityChange)}render(){return fe(this)}entityState(e){return this.store[R(e)]}num(e){let s=this.entityState(e)?.value;return typeof s=="number"||typeof s=="string"&&s!==""?Number(s):Number.NaN}str(e){let s=this.entityState(e)?.value;return typeof s=="string"?s:void 0}isOn(e){let s=this.entityState(e);return s?.value===!0||s?.state==="ON"}stateText(e,s="--"){let n=this.entityState(e)?.state;return n&&n!=="NA"?n:s}numText(e,s,n){return K(this.num(e),this.stepOf(e),s,n)}get missedMealReason(){return this.str(d.missedMealReason)||null}get onBattery(){return!!this.entityState(d.acPower)&&!this.isOn(d.acPower)}get batteryInstalled(){return!this.entityState(d.batteryInstalled)||this.isOn(d.batteryInstalled)}get batteryLow(){let e=this.num(d.battery);return this.onBattery&&Number.isFinite(e)&&e<=15}get batteryPctText(){let e=this.num(d.battery);return Number.isFinite(e)?Math.round(e)+"%":"--%"}get presenceText(){return this.entityState(d.presence)?this.isOn(d.presence)?"Here":"Away":"--"}get lastVisitDurationText(){let e=this.num(d.lastVisitDuration);return Number.isFinite(e)?ve(e):"--"}get lastVisitAtText(){return ci(this.entityState(d.lastVisitTime)?.state)}get totalVisitText(){let e=this.num(d.totalVisitTime);return Number.isFinite(e)?ve(e):"--"}get firmwareVersionText(){let e=this.entityState(d.firmwareVersion);return e?e.state?fi(e.state):"--":"\u2014"}get scheduleOff(){return!!this.entityState(d.schedule)&&!this.isOn(d.schedule)}projectSchedule(e,s){let n=d.feedTimes.map((r,a)=>{let l=d.mealDates[a];return{date:jt(l?this.str(l):void 0),time:zt(this.str(r))}});return Wt(n,e,s)}get nextMeal(){if(this.scheduleOff)return{index:null,label:"Schedule disabled",timeText:"Off"};let e=new Date,s=this.projectSchedule(e,1).meals[0];if(!s)return{index:null,label:"",timeText:"--:--"};let n=d.feedTimes[s.index]?.name??"",r=ot(e);return{index:s.index,label:s.day===r?n:n+" \xB7 "+xe(s.day,r),timeText:Et.format(D(s.day,s.time))}}get upcomingMeals(){if(this.scheduleOff)return{off:!0,periodText:"Off",days:[]};let e=new Date,s=ot(e),{period:n,meals:r}=this.projectSchedule(e,gi),a=Kt(r).map(l=>{let o=D(l.day,0);return{monthText:hi.format(o),dayOfMonthText:String(o.getDate()),title:l.lastDay>l.day?ge.format(o)+" \u2013 "+ge.format(D(l.lastDay,0)):xe(l.day,s),isToday:l.day===s,meals:l.meals.map(c=>{let u=D(c.day,c.time);return{index:c.index,name:d.feedTimes[c.index]?.name??"",timeText:Et.format(u),countdownText:mi(u.getTime()-e.getTime())}})}});return{off:!1,periodText:n===1?"Daily":`Every ${n} days`,days:a}}stepOf(e){let s=Number(this.entityState(e)?.step);return s>0?s:1}rangeOf(e){let s=this.entityState(e);return{min:s?.min_value!==void 0?Number(s.min_value):-1/0,max:s?.max_value!==void 0?Number(s.max_value):1/0,step:this.stepOf(e)}}parseNumberInput(e,s,n,r){let a=s.trim().toLowerCase(),l=vi(n).toLowerCase(),o=Number.NaN;if(a===r?.toLowerCase())o=0;else{let x=a.endsWith(l)?a.slice(0,-l.length).trim():a;x!==""&&(o=Number(x))}if(!Number.isFinite(o))return{error:"Enter a number"};let{min:c,max:u,step:h}=this.rangeOf(e);if(o<c||o>u)return{error:`Must be between ${K(c,h,n)} and ${K(u,h,n)}`};let f=Number.isFinite(c)?c:0,v=(o-f)/h;return Math.abs(v-Math.round(v))<=1e-9?{value:o,rounded:!1}:{value:Math.min(u,f+Math.round(v)*h),rounded:!0}}async post(e,s,n){let r="/"+e.domain+"/"+encodeURIComponent(e.name)+"/"+s;n&&(r+="?"+n);try{let a=await fetch(r,{method:"POST",credentials:"same-origin",keepalive:!0});if(a.ok)return!0;this.showToast(`Failed to save, server returned ${a.status}`)}catch(a){console.error("PLAF109 remote: request failed",r,a),this.showToast("Failed to save, request failed")}return!1}showToast(e,s=!1){this.toast={text:e,info:s},this.toastTimer&&clearTimeout(this.toastTimer),this.toastTimer=setTimeout(()=>this.toast=null,5e3)}connectSSE(){let e=new EventSource("/events");e.addEventListener("state",s=>{let n=s,r;try{r=JSON.parse(n.data)}catch{return}if(!r?.id)return;let a={...this.confirmed[r.id],...r};this.confirmed[r.id]=a,this.store={...this.store,[r.id]:a}}),e.addEventListener("ping",s=>{let n=s;try{let{title:r,uptime:a}=JSON.parse(n.data);typeof r=="string"&&(this.deviceTitle=document.title=r),typeof a=="number"&&(this.uptimeBaseSeconds=a,this.uptimeBaseAt=Date.now(),this.renderUptime())}catch{return}}),e.addEventListener("open",()=>this.setConnected(!0)),e.onerror=()=>this.setConnected(!1),this.eventSource=e}setConnected(e){this.connected=e,e?this.renderUptime():this.connLabel="Reconnecting\u2026"}renderUptime(){if(!this.connected||this.uptimeBaseSeconds===void 0||this.uptimeBaseAt===void 0)return;let e=this.uptimeBaseSeconds+Math.floor((Date.now()-this.uptimeBaseAt)/1e3);this.connLabel=di(e)}mealTimeValue(e){return this.str(e)?.slice(0,5)??""}mealOrderError(e,s){let n=d.feedTimes.map(c=>{let u=this.confirmed[R(c)]?.value;return{name:c.name,minutes:_t(typeof u=="string"?u:void 0)}}),r=n[e]?.name,a=c=>c.minutes!==null&&c.minutes!==n[e]?.minutes,l=n.slice(0,e).reverse().find(a),o=n.slice(e+1).find(a);return l&&s<=(l.minutes??-1)?`${r} must be after ${l.name}`:o&&s>=(o.minutes??1440)?`${r} must be before ${o.name}`:null}mealsOverlap(e){if(!this.isOn(d.schedule))return!1;let s=d.feedTimes.map(n=>_t(this.str(n)));return s.some((n,r)=>{let a=s[(r+1)%s.length];return n!==null&&a!=null&&(a-n+1440)%1440<e})}get feedingMinutes(){return this.num(d.minimumFeedingTime)||0}get mealOverlapError(){return this.mealsOverlap(this.feedingMinutes)?"Meal(s) are less than the feeding time apart, so this schedule will cause a meal will be skipped.":null}get mealOverlapWarning(){return this.mealOverlapError||!this.mealsOverlap((this.num(d.arrivalTimeout)||0)+this.feedingMinutes)?null:"Meals are less than the arrival timeout plus feeding time apart, so a meal might be skipped."}get longArrivalTimeout(){return this.num(d.arrivalTimeout)>240}toggleSettingsHelp(){this.showSettingsHelp=!this.showSettingsHelp}pressButton(e){this.post(e,"press")}async setSwitch(e,s){let n=e.target;await this.post(s,n.checked?"turn_on":"turn_off")||(n.checked=this.isOn(s))}stepNumberEntity(e,s){let n=this.num(e);if(!Number.isFinite(n))return;let{min:r,max:a,step:l}=this.rangeOf(e),o=Math.min(a,Math.max(r,n+s*l));this.setValue(e,o.toFixed(ct(l)))}async setValue(e,s){let n=R(e),r={...this.store[n],id:n,value:s,state:s};if(this.store={...this.store,[n]:r},await this.post(e,"set","value="+encodeURIComponent(s))||this.store[n]!==r)return;let l={...this.store},o=this.confirmed[n];o?l[n]=o:delete l[n],this.store=l}isEditing(e){return this.editing===R(e)}onEditFocus(e){this.editing=R(e)}onEditKeydown(e){let s=e.target;e.key==="Escape"&&(this.editing=void 0,this.pendingMealTime&&clearTimeout(this.pendingMealTime.timer),this.pendingMealTime=void 0),(e.key==="Enter"||e.key==="Escape")&&s.blur()}onEditBlur(){this.editing=void 0,this.requestUpdate()}onNumberFocus(e,s){let n=e.target;this.onEditFocus(s);let r=this.num(s);n.value=Number.isFinite(r)?r.toFixed(ct(this.stepOf(s))):"",n.select()}onNumberChange(e,s,n,r){let a=e.target;if(!this.isEditing(s)||a.value.trim()==="")return;let l=this.parseNumberInput(s,a.value,n,r);if("error"in l){this.showToast(l.error);return}let o=this.stepOf(s);if(l.rounded){let c=K(o,o,n);this.showToast(`Rounded to ${K(l.value,o,n,r)}, entity accepts steps of ${c}`,!0)}l.value!==this.num(s)&&this.setValue(s,l.value.toFixed(ct(o)))}onMealTimeChange(e,s,n){this.pendingMealTime?.meal!==s&&this.saveMealTime(!0),this.pendingMealTime&&clearTimeout(this.pendingMealTime.timer);let r=setTimeout(()=>this.saveMealTime(!1),2e3);this.pendingMealTime={value:e.target.value,meal:s,index:n,timer:r},this.isEditing(s)||this.saveMealTime(!0)}onMealTimeBlur(){this.saveMealTime(!0),this.onEditBlur()}saveMealTime(e){let s=this.pendingMealTime;if(!s)return;clearTimeout(s.timer);let{value:n,meal:r,index:a}=s,l=_t(n),o=l===null?null:this.mealOrderError(a,l);if(!(o&&!e)&&(this.pendingMealTime=void 0,!(l===null||n===this.mealTimeValue(r)))){if(!o){this.setValue(r,n+":00");return}this.showToast(o),this.requestUpdate()}}};M([O()],w.prototype,"store",2),M([O()],w.prototype,"deviceTitle",2),M([O()],w.prototype,"connected",2),M([O()],w.prototype,"connLabel",2),M([O()],w.prototype,"toast",2),M([O()],w.prototype,"showSettingsHelp",2);customElements.define("esp-app",w);export{w as PlaRemote};
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
lit-html/lit-html.js:
lit-element/lit-element.js:
@lit/reactive-element/decorators/custom-element.js:
@lit/reactive-element/decorators/property.js:
@lit/reactive-element/decorators/state.js:
@lit/reactive-element/decorators/event-options.js:
@lit/reactive-element/decorators/base.js:
@lit/reactive-element/decorators/query.js:
@lit/reactive-element/decorators/query-all.js:
@lit/reactive-element/decorators/query-async.js:
@lit/reactive-element/decorators/query-assigned-nodes.js:
lit-html/directive.js:
lit-html/directives/unsafe-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-elements.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directive-helpers.js:
lit-html/directives/live.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/

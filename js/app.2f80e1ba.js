(function(e){function t(t){for(var n,r,c=t[0],s=t[1],u=t[2],l=0,d=[];l<c.length;l++)r=c[l],Object.prototype.hasOwnProperty.call(i,r)&&i[r]&&d.push(i[r][0]),i[r]=0;for(n in s)Object.prototype.hasOwnProperty.call(s,n)&&(e[n]=s[n]);f&&f(t);while(d.length)d.shift()();return a.push.apply(a,u||[]),o()}function o(){for(var e,t=0;t<a.length;t++){for(var o=a[t],n=!0,r=1;r<o.length;r++){var c=o[r];0!==i[c]&&(n=!1)}n&&(a.splice(t--,1),e=s(s.s=o[0]))}return e}var n={},r={1:0},i={1:0},a=[];function c(e){return s.p+"js/"+({}[e]||e)+"."+{2:"e614b5bd",3:"8b918905",4:"38a02ef3",5:"81deac69",6:"90c62a6d",7:"8bddef2c"}[e]+".js"}function s(t){if(n[t])return n[t].exports;var o=n[t]={i:t,l:!1,exports:{}};return e[t].call(o.exports,o,o.exports,s),o.l=!0,o.exports}s.e=function(e){var t=[],o={2:1};r[e]?t.push(r[e]):0!==r[e]&&o[e]&&t.push(r[e]=new Promise((function(t,o){for(var n="css/"+({}[e]||e)+"."+{2:"141e71a7",3:"31d6cfe0",4:"31d6cfe0",5:"31d6cfe0",6:"31d6cfe0",7:"31d6cfe0"}[e]+".css",i=s.p+n,a=document.getElementsByTagName("link"),c=0;c<a.length;c++){var u=a[c],l=u.getAttribute("data-href")||u.getAttribute("href");if("stylesheet"===u.rel&&(l===n||l===i))return t()}var d=document.getElementsByTagName("style");for(c=0;c<d.length;c++){u=d[c],l=u.getAttribute("data-href");if(l===n||l===i)return t()}var f=document.createElement("link");f.rel="stylesheet",f.type="text/css",f.onload=t,f.onerror=function(t){var n=t&&t.target&&t.target.src||i,a=new Error("Loading CSS chunk "+e+" failed.\n("+n+")");a.code="CSS_CHUNK_LOAD_FAILED",a.request=n,delete r[e],f.parentNode.removeChild(f),o(a)},f.href=i;var h=document.getElementsByTagName("head")[0];h.appendChild(f)})).then((function(){r[e]=0})));var n=i[e];if(0!==n)if(n)t.push(n[2]);else{var a=new Promise((function(t,o){n=i[e]=[t,o]}));t.push(n[2]=a);var u,l=document.createElement("script");l.charset="utf-8",l.timeout=120,s.nc&&l.setAttribute("nonce",s.nc),l.src=c(e);var d=new Error;u=function(t){l.onerror=l.onload=null,clearTimeout(f);var o=i[e];if(0!==o){if(o){var n=t&&("load"===t.type?"missing":t.type),r=t&&t.target&&t.target.src;d.message="Loading chunk "+e+" failed.\n("+n+": "+r+")",d.name="ChunkLoadError",d.type=n,d.request=r,o[1](d)}i[e]=void 0}};var f=setTimeout((function(){u({type:"timeout",target:l})}),12e4);l.onerror=l.onload=u,document.head.appendChild(l)}return Promise.all(t)},s.m=e,s.c=n,s.d=function(e,t,o){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(s.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)s.d(o,n,function(t){return e[t]}.bind(null,n));return o},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="",s.oe=function(e){throw console.error(e),e};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],l=u.push.bind(u);u.push=t,u=u.slice();for(var d=0;d<u.length;d++)t(u[d]);var f=l;a.push([0,0]),o()})({0:function(e,t,o){e.exports=o("2f39")},"0613":function(e,t,o){"use strict";o.d(t,"b",(function(){return y}));var n=o("2f62"),r=o("7924"),i=o("6fd4"),a=o("06f9"),c=o("6fc5"),s=function(e,t,o,n){var r,i=arguments.length,a=i<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,o):n;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)a=Reflect.decorate(e,t,o,n);else for(var c=e.length-1;c>=0;c--)(r=e[c])&&(a=(i<3?r(a):i>3?r(t,o,a):r(t,o))||a);return i>3&&a&&Object.defineProperty(t,o,a),a},u=function(e,t,o,n){function r(e){return e instanceof o?e:new o((function(t){t(e)}))}return new(o||(o=Promise))((function(o,i){function a(e){try{s(n.next(e))}catch(t){i(t)}}function c(e){try{s(n["throw"](e))}catch(t){i(t)}}function s(e){e.done?o(e.value):r(e.value).then(a,c)}s((n=n.apply(e,t||[])).next())}))};const l="Usuário não logado",d=new r["a"]("MappaStore"),f={auth:"",created:new Date(0),id:"",ttl:0,userId:0,validUntil:new Date(0)},h={ativo:"",codigo:0,codigoAssociado:0,codigoFoto:0,codigoGrupo:0,codigoRegiao:"",nomeCompleto:"Guionardo",username:"guionardo"},g={codigo:0,codigoRegiao:"ZZ",nome:"",codigoModalidade:0},p={codigo:1,codigoRegiao:"ZZ",codigoGrupo:0,codigoTipoSecao:1,nome:""};let m=class extends c["d"]{constructor(){super(...arguments),this.auth=Object(a["b"])(),this.escotista=h,this.grupo=g,this.secao=p,this.secoes=[],this.equipes=[]}getAuthFromLocalStorage(){return u(this,void 0,void 0,(function*(){const e=Object(a["b"])();if(!e)return d.logInfo("No local authorization found"),this.SET_AUTH(f),this.SET_ESCOTISTA(h),this.SET_GRUPO(g),void this.SET_SECAO(p);this.SET_AUTH(e),Object(i["h"])(e.id),Object(a["j"])(e),yield this.reloadUser(e.userId),d.logInfo("User loaded from localStorage")}))}login(e){const t=e.username,o=e.password;return Object(i["g"])(t,o).then((e=>u(this,void 0,void 0,(function*(){return Object(i["h"])(e.auth),Object(a["j"])(e),this.SET_AUTH(e),yield this.reloadUser(e.userId),!0})))).catch((e=>{this.CLEAR_ALL(),d.logError("Login",e)})),!1}logout(){this.CLEAR_ALL(),Object(a["a"])()}reloadUser(e){return u(this,void 0,void 0,(function*(){try{const t=yield Object(i["c"])(e),o=yield Object(i["d"])(t.codigoGrupo,t.codigoRegiao),n=yield Object(i["f"])(e);for(let r=0;r<n.length;r++){const t=yield Object(i["b"])(e,n[r].codigo);n[r].SubSecoes=t}this.SET_ESCOTISTA(t),this.SET_GRUPO(o),this.SET_SECOES(n)}catch(t){this.CLEAR_ALL(),d.logError(`ReloadUser userId:${e}`,t)}}))}setSecaoAtiva(e){this.SET_SECAO(e)}CLEAR_ALL(){this.auth=f,this.escotista=h,this.grupo=g,this.secao=p}SET_AUTH(e){this.auth=e}SET_ESCOTISTA(e){this.escotista=e}SET_GRUPO(e){this.grupo=e}SET_SECAO(e){this.secao=e}SET_SECOES(e){this.secoes=e}SET_EQUIPES(e){this.equipes=e}get isAuthorized(){var e,t;return!!(null===(e=this.auth)||void 0===e?void 0:e.auth)&&(null===(t=this.auth)||void 0===t?void 0:t.validUntil)>new Date}get userName(){return this.isAuthorized?this.escotista.nomeCompleto||this.escotista.username:l}get grupoNome(){const e=this.grupo.codigo,t=this.grupo.codigoRegiao,o=this.grupo.nome;return this.isAuthorized?`${e}/${t} ${o}`:l}get secaoNome(){return this.isAuthorized?`${this.secao.nome}`:l}get getSecoes(){return this.secoes}get getSecaoAtiva(){return this.secao}};s([c["a"]],m.prototype,"getAuthFromLocalStorage",null),s([c["a"]],m.prototype,"login",null),s([c["a"]],m.prototype,"logout",null),s([c["a"]],m.prototype,"reloadUser",null),s([c["a"]],m.prototype,"setSecaoAtiva",null),s([c["c"]],m.prototype,"CLEAR_ALL",null),s([c["c"]],m.prototype,"SET_AUTH",null),s([c["c"]],m.prototype,"SET_ESCOTISTA",null),s([c["c"]],m.prototype,"SET_GRUPO",null),s([c["c"]],m.prototype,"SET_SECAO",null),s([c["c"]],m.prototype,"SET_SECOES",null),s([c["c"]],m.prototype,"SET_EQUIPES",null),m=s([Object(c["b"])({name:"MappaStoreModule"})],m);var b=m,v=o("2b0e");v["a"].use(n["a"]);const S=new n["a"].Store({state:{},modules:{mappa:b},strict:!1});t["a"]=S;const y=Object(c["e"])(b,S)},"06f9":function(e,t,o){"use strict";o.d(t,"b",(function(){return m})),o.d(t,"j",(function(){return b})),o.d(t,"c",(function(){return v})),o.d(t,"d",(function(){return S})),o.d(t,"h",(function(){return y})),o.d(t,"i",(function(){return O})),o.d(t,"n",(function(){return w})),o.d(t,"o",(function(){return A})),o.d(t,"a",(function(){return E})),o.d(t,"e",(function(){return _})),o.d(t,"k",(function(){return P})),o.d(t,"f",(function(){return T})),o.d(t,"l",(function(){return $})),o.d(t,"g",(function(){return j})),o.d(t,"m",(function(){return I}));var n=o("18d6"),r=o("c51d"),i=o("7924");o("2a19");function a(e){return((new Date).getTime()-new Date(e).getTime())/1e3}const c="MAPPA_ESCOTISTA",s="MAPPA_LOGIN",u="MAPPA_GRUPO",l="MAPPA_SECOES",d="MAPPA_SUBSECOES",f="MAPPA_FOTO",h="MAPPA_MARCACOES",g="MAPPA_PROGRESSOES",p=new i["a"]("StorageService");function m(){let e=n["a"].getItem(s);return p.logDebug("getAuth",e),e&&(e=new r["a"](e),e&&e.validUntil>new Date)?e:null}function b(e){p.logDebug("setAuth",e),n["a"].set(s,e)}function v(e){const t=n["a"].getItem(c);return t&&t.codigo===e?t:null}function S(e,t){const o=n["a"].getItem(u);return o&&o.codigo==e&&o.codigoRegiao==t?o:null}function y(e){const t=n["a"].getItem(`${l}_${e}`);return t&&t.length>0?t:[]}function O(e,t){const o=n["a"].getItem(`${d}_${e}_${t}`);return o&&o.length>0?o:[]}function w(e,t){n["a"].set(`${l}_${e}`,t)}function A(e,t,o){n["a"].set(`${d}_${e}_${t}`,o)}function E(){const e=[];n["a"].getAllKeys().map((t=>{t.startsWith("MAPPA_")&&(n["a"].remove(t),e.push(t))})),p.logDebug("clearAllStorage",e)}function _(e){return n["a"].getItem(`${f}_${e}`)}function P(e,t){n["a"].set(`${f}_${e}`,t)}function T(e){const t=n["a"].getItem(`${h}_${e}`);return t&&a(t.dataHora)<300?t:null}function $(e,t){n["a"].set(`${h}_${e}`,t)}function j(e){const t=n["a"].getItem(`${g}_${e}`);return t}function I(e,t){n["a"].set(`${g}_${e}`,t)}},"2f39":function(e,t,o){"use strict";o.r(t);o("5319"),o("7d6e"),o("e54f"),o("985d"),o("31cd");var n=o("2b0e"),r=o("1f91"),i=o("42d2"),a=o("b05d"),c=o("2a19"),s=o("18d6"),u=o("a639"),l=o("436b");n["a"].use(a["a"],{config:{},lang:r["a"],iconSet:i["a"],plugins:{Notify:c["a"],LocalStorage:s["a"],SessionStorage:u["a"],Dialog:l["a"]}});var d=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{attrs:{id:"q-app"}},[o("router-view")],1)},f=[],h=o("60a3"),g=o("0613"),p=function(e,t,o,n){var r,i=arguments.length,a=i<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,o):n;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)a=Reflect.decorate(e,t,o,n);else for(var c=e.length-1;c>=0;c--)(r=e[c])&&(a=(i<3?r(a):i>3?r(t,o,a):r(t,o))||a);return i>3&&a&&Object.defineProperty(t,o,a),a},m=function(e,t,o,n){function r(e){return e instanceof o?e:new o((function(t){t(e)}))}return new(o||(o=Promise))((function(o,i){function a(e){try{s(n.next(e))}catch(t){i(t)}}function c(e){try{s(n["throw"](e))}catch(t){i(t)}}function s(e){e.done?o(e.value):r(e.value).then(a,c)}s((n=n.apply(e,t||[])).next())}))};let b=class extends h["c"]{mounted(){return m(this,void 0,void 0,(function*(){yield g["b"].getAuthFromLocalStorage(),g["b"].isAuthorized?"login"==this.$router.currentRoute.name&&(yield this.$router.push({name:"home"})):"login"!=this.$router.currentRoute.name&&(yield this.$router.push({name:"login"}))}))}};b=p([h["a"]],b);var v=b,S=v,y=o("2877"),O=Object(y["a"])(S,d,f,!1,null,null,null),w=O.exports,A=o("4bde"),E=o("8c4f");const _=[{path:"/",component:()=>Promise.all([o.e(0),o.e(3)]).then(o.bind(null,"713b")),children:[{path:"",name:"home",component:()=>Promise.all([o.e(0),o.e(5)]).then(o.bind(null,"8b24"))},{path:"login",name:"login",component:()=>Promise.all([o.e(0),o.e(2)]).then(o.bind(null,"013f"))},{path:"usage_terms",name:"usage_terms",component:()=>Promise.all([o.e(0),o.e(7)]).then(o.bind(null,"98a9"))},{path:"secoes",name:"secoes",component:()=>Promise.all([o.e(0),o.e(6)]).then(o.bind(null,"93b3"))}]},{path:"*",component:()=>Promise.all([o.e(0),o.e(4)]).then(o.bind(null,"e51e"))}];var P=_,T=Object(A["route"])((function({Vue:e}){e.use(E["a"]);const t=new E["a"]({scrollBehavior:()=>({x:0,y:0}),routes:P,mode:"hash",base:""});return t})),$=async function(){const e="function"===typeof g["a"]?await Object(g["a"])({Vue:n["a"]}):g["a"],t="function"===typeof T?await T({Vue:n["a"],store:e}):T;e.$router=t;const o={router:t,store:e,render:e=>e(w),el:"#q-app"};return{app:o,store:e,router:t}},j={failed:"Action failed",success:"Action was successful"},I={"en-us":j},R=o("a925");n["a"].use(R["a"]);const L=new R["a"]({locale:"en-us",fallbackLocale:"en-us",messages:I});var U=Object(A["boot"])((({app:e})=>{e.i18n=L})),C=o("a748"),N=o("0284"),D=o.n(N);n["a"].use(D.a,{id:"G-YDT71W9WTM",router:T});const M="";async function x(){const{app:e,store:t,router:o}=await $();let r=!1;const i=e=>{r=!0;const t=Object(e)===e?o.resolve(e).route.fullPath:e;window.location.href=t},a=window.location.href.replace(window.location.origin,""),c=[U,C["a"],void 0];for(let u=0;!1===r&&u<c.length;u++)if("function"===typeof c[u])try{await c[u]({app:e,router:o,store:t,Vue:n["a"],ssrContext:null,redirect:i,urlPath:a,publicPath:M})}catch(s){return s&&s.url?void(window.location.href=s.url):void console.error("[Quasar] boot error:",s)}!0!==r&&new n["a"](e)}x()},"31cd":function(e,t,o){},"6fd4":function(e,t,o){"use strict";o.d(t,"a",(function(){return h})),o.d(t,"h",(function(){return g})),o.d(t,"g",(function(){return m})),o.d(t,"c",(function(){return b})),o.d(t,"d",(function(){return v})),o.d(t,"f",(function(){return S})),o.d(t,"b",(function(){return y})),o.d(t,"e",(function(){return O}));var n=o("bc3a"),r=o.n(n),i=o("a748"),a=o("c51d");class c{constructor(e,t){this.type="LOGIN_REQUEST",this.username="",this.password="",this.username=e,this.password=t}toJson(){return{type:this.type,username:this.username,password:this.password}}}var s=o("7924"),u=o("06f9");const l=new s["a"]("MAPPA_API"),d="okhttp/3.4.1";let f="";function h(){return l.logDebug("Checking proxy health"),new Promise(((e,t)=>{r.a.get("hc",{baseURL:i["b"]}).then((()=>{e(!0)})).catch((e=>{l.logError("Proxy não está disponível",e),t(!1)}))}))}function g(e){f=e,r.a.defaults.headers={"User-Agent":d,Authorization:e}}function p(){if(!f)throw l.logWarn("MISSING AUTHORIZATION"),new Error("MISSING AUTHORIZATION")}function m(e,t){const o=new c(e,t).toJson();return l.logDebug("Login request",o),new Promise(((n,i)=>{e&&t?r.a.post("login",o).then((e=>{const t=null===e||void 0===e?void 0:e.data;l.logInfo("LOGIN OK",t),n(new a["a"](t))})).catch((e=>{l.logError("LOGIN FAILED",e),i(e)})):i(new Error(`Credenciais inválidas ${JSON.stringify({username:e,password:t})}`))}))}function b(e){return new Promise(((t,o)=>{p();const n=Object(u["c"])(e);n?t(n):r.a.get(`/api/escotistas/${e}`).then((e=>{const o=e.data;t(o)})).catch((e=>{o(e)}))}))}function v(e,t){return new Promise(((o,n)=>{p();const i=Object(u["d"])(e,t);if(i)o(i);else{const i={where:{codigo:e,codigoRegiao:t}},a="/api/grupos?filter="+JSON.stringify(i);console.log("getGrupo URL",a),r.a.get("/api/grupos?filter="+JSON.stringify(i)).then((n=>{const r=n.data;if(0==r.length)throw new Error(`No group received codigo=${e} / codigoRegiao=${t}`);o(r[0])})).catch((e=>{n(e)}))}}))}function S(e){return new Promise(((t,o)=>{p();let n=Object(u["h"])(e);if(n.length>0)return void t(n);const i=`/api/escotistas/${e}/secoes`;r.a.get(i).then((o=>{if(n=o.data,0==n.length)throw new Error(`No sections received from userId=${e}`);Object(u["n"])(e,n),t(n)})).catch((e=>{o(e)}))}))}function y(e,t){return new Promise(((o,n)=>{p();let i=Object(u["i"])(e,t);if(i.length>0)return void o(i);const a={include:"associados"},c=`/api/escotistas/${e}/secoes/${t}/equipes?filter=${JSON.stringify(a)}`;console.log("getSubSecoes URL",c),r.a.get(c).then((n=>{if(i=n.data,0==i.length)throw new Error(`No subsections received from userId=${e}, codSecao=${t}`);Object(u["o"])(e,t,i),o(i)})).catch((e=>{n(e)}))}))}function O(e){return new Promise(((t,o)=>{p();let n=Object(u["e"])(e);if(n)return void t(n);const i=`/api/imagens/${e}`;console.log("getImagem",i),r.a.get(i).then((o=>{n=o.data,console.log(`getImagem ${i}`,n),Object(u["k"])(e,n),t(o.data)})).catch((e=>{o(e)}))}))}},7924:function(e,t,o){"use strict";o.d(t,"a",(function(){return r}));var n=o("2b0e");class r{constructor(e=""){this.debugEnabled=!0,this.loggerName="",this.debugEnabled=!1,"string"==typeof e?this.loggerName=e||this.constructor.name:e instanceof n["a"]?this.loggerName=e.constructor.name:this.loggerName=this.constructor.name}logWrap(e,t,o){t=`[${this.loggerName}] ${t}`,o?e(t,o):e(t)}logInfo(e,t){this.logWrap(console.info,e,t)}logWarn(e,t){this.logWrap(console.warn,e,t)}logError(e,t){this.logWrap(console.error,e,t)}logDebug(e,t){this.debugEnabled&&this.logWrap(console.debug,e,t)}}},a748:function(e,t,o){"use strict";(function(e){o.d(t,"b",(function(){return a}));var n=o("bc3a"),r=o.n(n),i=o("4bde");const a=e.env.PROXY_URL||"http://guiosoft.info:8001";r.a.defaults.baseURL=`${a}/mappa/`,r.a.defaults.headers={"User-Agent":"okhttp/3.4.1"},t["a"]=Object(i["boot"])((({Vue:e})=>{e.prototype.$axios=r.a}))}).call(this,o("4362"))},c51d:function(e,t,o){"use strict";o.d(t,"a",(function(){return i}));var n=o("7924");const r=new n["a"]("Authorization");class i{constructor(e){this.id=e.id,this.ttl=e.ttl,this.created=e.created,this.userId=e.userId,this.auth=e.id,this.validUntil=new Date(new Date(e.created).getTime()+1e3*e.ttl)}static FakeAuth(){const e={created:new Date,id:"1",ttl:86400,userId:1},t=new i(e);return r.logDebug("FakeAuth",t),t}}}});
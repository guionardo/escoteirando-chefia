(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[4],{"8b24":function(t,e,n){"use strict";n.r(e);var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("q-page",{staticClass:"row items-center justify-evenly"},[n("example-component",{attrs:{title:"Example component",active:"",todos:t.todos,meta:t.meta}})],1)},c=[],s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("p",[t._v(t._s(t.title))]),n("ul",t._l(t.todos,(function(e){return n("li",{key:e.id,on:{click:t.increment}},[t._v("\n      "+t._s(e.id)+" - "+t._s(e.content)+"\n    ")])})),0),n("p",[t._v("Count: "+t._s(t.todoCount)+" / "+t._s(t.meta.totalCount))]),n("p",[t._v("Active: "+t._s(t.active?"yes":"no"))]),n("p",[t._v("Clicks on todos: "+t._s(t.clickCount))])])},i=[],a=n("a6f4");function u(){const t=Object(a["d"])(0);function e(){return t.value+=1,t.value}return{clickCount:t,increment:e}}function l(t){const e=Object(a["a"])((()=>t.value.length));return{todoCount:e}}var r=Object(a["c"])({name:"CompositionComponent",props:{title:{type:String,required:!0},todos:{type:Array,default:()=>[]},meta:{type:Object,required:!0},active:{type:Boolean}},setup(t){return Object.assign(Object.assign({},u()),l(Object(a["e"])(t,"todos")))}}),p=r,d=n("2877"),m=Object(d["a"])(p,s,i,!1,null,null,null),v=m.exports,_=Object(a["c"])({name:"PageIndex",components:{ExampleComponent:v},setup(){const t=Object(a["d"])([{id:1,content:"ct1"},{id:2,content:"ct2"},{id:3,content:"ct3"},{id:4,content:"ct4"},{id:5,content:"ct5"}]),e=Object(a["d"])({totalCount:1200});return{todos:t,meta:e}}}),b=_,f=n("9989"),j=n("eebe"),C=n.n(j),O=Object(d["a"])(b,o,c,!1,null,null,null);e["default"]=O.exports;C()(O,"components",{QPage:f["a"]})}}]);
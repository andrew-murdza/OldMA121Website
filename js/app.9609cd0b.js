(function(){"use strict";var e={530:function(e,l,n){var s=n(9242),t=n(3396);const o={class:"inner-text lesson-intro"},i=["innerHTML"];function a(e,l,n,s,a,r){const c=(0,t.up)("CollapsiblePane"),d=(0,t.up)("LessonSection"),u=(0,t.up)("MainPage");return(0,t.wg)(),(0,t.j4)(u,{"lesson-num":e.lessonNum,"lesson-name":e.lessonName},{default:(0,t.w5)((()=>[(0,t.Wm)(c,{name:"Introduction","extra-class":"section","start-collapsed":e.startCollapsed},{default:(0,t.w5)((()=>[(0,t._)("div",o,[(0,t._)("p",{innerHTML:e.intro},null,8,i)])])),_:1},8,["start-collapsed"]),((0,t.wg)(!0),(0,t.iD)(t.HY,null,(0,t.Ko)(e.sections,((l,n)=>((0,t.wg)(),(0,t.j4)(d,{key:n,"right-col-width":l.rightColWidth,"start-collapsed":e.startCollapsed,lessonNum:e.lessonNum,sectionNum:n+1,sectionName:l.name,web:l.web,book:l.book,exam:l.exam,intro:l.intro,steps:l.steps,examples:l.examples},null,8,["right-col-width","start-collapsed","lessonNum","sectionNum","sectionName","web","book","exam","intro","steps","examples"])))),128))])),_:1},8,["lesson-num","lesson-name"])}var r=n(7139);const c={id:"buttons"},d={class:"background"};function u(e,l,n,s,o,i){return(0,t.wg)(),(0,t.iD)(t.HY,null,[(0,t._)("header",null,[(0,t._)("h1",null,"Lecture "+(0,r.zw)(n.lessonNum)+": "+(0,r.zw)(n.lessonName),1),(0,t._)("div",c,[(0,t._)("button",{id:"color-toggle",onClick:l[0]||(l[0]=(...e)=>i.toggleColors&&i.toggleColors(...e))}),(0,t._)("button",{id:"collapse-all",onClick:l[1]||(l[1]=(...e)=>i.collapseAll&&i.collapseAll(...e))},"Collapse"),(0,t._)("button",{id:"expand-all",onClick:l[2]||(l[2]=(...e)=>i.expandAll&&i.expandAll(...e))},"Expand"),(0,t._)("button",{id:"hide-all",onClick:l[3]||(l[3]=(...e)=>i.hideAll&&i.hideAll(...e))},"Hide")])]),(0,t._)("section",d,[(0,t.WI)(e.$slots,"default")])],64)}var p={name:"MainPage",props:{lessonNum:Number,lessonName:String},mounted(){document.querySelector("#color-toggle").innerText="#nocolor"===window.location.hash?"Enable color":"Disable color"},methods:{toggleColors(){document.querySelector("#color-toggle").disabled=!0,"#nocolor"===window.location.hash?(window.location.hash="",window.location.reload()):(window.location.hash="#nocolor",window.location.reload())},collapseAll(){document.querySelectorAll(".collapsible").forEach((e=>e.dataset.collapsed="true"))},expandAll(){document.querySelectorAll(".collapsible").forEach((e=>e.dataset.collapsed="false"))},hideAll(){document.querySelectorAll(".invisible").forEach((e=>e.style.visibility="hidden"))}}},h=n(89);const m=(0,h.Z)(p,[["render",u]]);var f=m;const b={class:"inner-text info"},_=(0,t.Uk)("WebAssign questions: "),g=["innerHTML"],v=(0,t.Uk)("Textbook pages: "),w=["innerHTML"],x=(0,t.Uk)("Exam notes: "),C=["innerHTML"],y={class:"inner-text"},k=["innerHTML"],T={class:"row"},H=(0,t._)("div",{class:"col"},[(0,t._)("h2",{class:"background"},"In General")],-1),L=(0,t._)("h2",{class:"background"},"Specific Example",-1),M=[L],N={class:"row"},S={class:"col"},j={class:"inner-text"},A=["innerHTML"],E={class:"inner-text"},O=["innerHTML"],W={class:"row"},q={class:"col"},P={class:"inner-text"},D=["innerHTML"],I={class:"inner-text"},Y=["innerHTML"],R={class:"row"},K=(0,t._)("div",{class:"col"},[(0,t._)("h2",{class:"background"},"In General")],-1),Z=(0,t._)("h2",{class:"background"},"Specific Example",-1),$=[Z],U={class:"row"},z={class:"col"},B={class:"inner-text"},G=["innerHTML"],F={class:"inner-text"},X=["innerHTML"],J={class:"row"},Q={class:"col"},V={class:"inner-text"},ee=["innerHTML"],le={class:"inner-text"},ne=["innerHTML"];function se(e,l,n,s,o,i){const a=(0,t.up)("CollapsiblePane");return(0,t.wg)(),(0,t.j4)(a,{name:"Section "+n.lessonNum+"."+n.sectionNum+": "+n.sectionName,"extra-class":"section","start-collapsed":n.startCollapsed},{default:(0,t.w5)((()=>[(0,t.Wm)(a,{name:"WebAssign and Textbook","extra-class":"subheading","start-collapsed":n.startCollapsed},{default:(0,t.w5)((()=>[(0,t._)("div",b,[(0,t._)("p",null,[_,(0,t._)("span",{innerHTML:n.web},null,8,g)]),(0,t._)("p",null,[v,(0,t._)("span",{innerHTML:n.book},null,8,w)]),(0,t._)("p",null,[x,(0,t._)("span",{innerHTML:n.exam},null,8,C)])])])),_:1},8,["start-collapsed"]),(0,t.Wm)(a,{name:"Introduction","extra-class":"subheading","start-collapsed":n.startCollapsed},{default:(0,t.w5)((()=>[(0,t._)("div",y,[(0,t._)("p",{innerHTML:n.intro},null,8,k)])])),_:1},8,["start-collapsed"]),(0,t.Wm)(a,{name:"Steps","extra-class":"subheading","start-collapsed":n.startCollapsed},{default:(0,t.w5)((()=>[(0,t._)("div",T,[H,(0,t._)("div",{class:"col",style:(0,r.j5)({"max-width":n.rightColWidth+"%"})},M,4)]),(0,t._)("div",N,[(0,t._)("div",S,[(0,t._)("div",j,[(0,t._)("p",{innerHTML:n.steps.general.question},null,8,A)])]),(0,t._)("div",{class:"col",style:(0,r.j5)({"max-width":n.rightColWidth+"%"})},[(0,t._)("div",E,[(0,t._)("p",{innerHTML:n.steps.specific.question},null,8,O)])],4)]),((0,t.wg)(!0),(0,t.iD)(t.HY,null,(0,t.Ko)(n.steps.general.steps,((e,l)=>((0,t.wg)(),(0,t.j4)(a,{name:"Step "+(l+1),key:l,"extra-class":"step","start-collapsed":n.startCollapsed},{default:(0,t.w5)((()=>[(0,t._)("div",W,[(0,t._)("div",q,[(0,t._)("div",P,[(0,t._)("p",{innerHTML:e},null,8,D)])]),(0,t._)("div",{class:"col",style:(0,r.j5)({"max-width":n.rightColWidth+"%"})},[(0,t._)("div",I,[(0,t._)("p",{innerHTML:n.steps.specific.steps[l]},null,8,Y)])],4)])])),_:2},1032,["name","start-collapsed"])))),128))])),_:1},8,["start-collapsed"]),((0,t.wg)(!0),(0,t.iD)(t.HY,null,(0,t.Ko)(n.examples,((e,l)=>((0,t.wg)(),(0,t.j4)(a,{name:"Example "+n.lessonNum+"."+n.sectionNum+"."+(l+1),key:l,"extra-class":"subheading","start-collapsed":n.startCollapsed},{default:(0,t.w5)((()=>[(0,t._)("div",R,[K,(0,t._)("div",{class:"col",style:(0,r.j5)({"max-width":n.rightColWidth+"%"})},$,4)]),(0,t._)("div",U,[(0,t._)("div",z,[(0,t._)("div",B,[(0,t._)("p",{innerHTML:n.steps.general.question},null,8,G)])]),(0,t._)("div",{class:"col",style:(0,r.j5)({"max-width":n.rightColWidth+"%"})},[(0,t._)("div",F,[(0,t._)("p",{innerHTML:e.question},null,8,X)])],4)]),((0,t.wg)(!0),(0,t.iD)(t.HY,null,(0,t.Ko)(n.steps.general.steps,((l,s)=>((0,t.wg)(),(0,t.j4)(a,{name:"Step "+(s+1),key:s,"extra-class":"step","start-collapsed":n.startCollapsed},{default:(0,t.w5)((()=>[(0,t._)("div",J,[(0,t._)("div",Q,[(0,t._)("div",V,[(0,t._)("p",{innerHTML:l},null,8,ee)])]),(0,t._)("div",{class:"col",style:(0,r.j5)({"max-width":n.rightColWidth+"%"})},[(0,t._)("div",le,[(0,t._)("p",{innerHTML:e.steps[s]},null,8,ne)])],4)])])),_:2},1032,["name","start-collapsed"])))),128))])),_:2},1032,["name","start-collapsed"])))),128))])),_:1},8,["name","start-collapsed"])}const te=["data-collapsed"],oe={style:{"flex-grow":"1"}},ie=["innerHTML"],ae={class:"collapsible-buttons",style:{padding:"1rem"}},re={class:"contents"};function ce(e,l,n,s,o,i){return(0,t.wg)(),(0,t.iD)("section",{ref:"section",class:(0,r.C_)("collapsible"),"data-collapsed":e.collapsed,style:(0,r.j5)({"background-color":n.backgroundColor})},[(0,t._)("div",{class:(0,r.C_)("section-div "+n.extraClass),style:{display:"flex"}},[(0,t._)("div",oe,[(0,t._)("h2",{class:(0,r.C_)("section-name"),onClick:l[0]||(l[0]=(...e)=>i.onClick&&i.onClick(...e)),innerHTML:"<span class='arrow'></span> "+n.name},null,8,ie)]),(0,t._)("div",ae,[(0,t._)("button",{onClick:l[1]||(l[1]=(...e)=>i.hideChildren&&i.hideChildren(...e))},"Hide"),(0,t._)("button",{onClick:l[2]||(l[2]=(...e)=>i.showChildren&&i.showChildren(...e))},"Show")])],2),(0,t._)("section",re,[(0,t.WI)(e.$slots,"default")])],12,te)}var de={name:"CollapsiblePane",props:{name:String,extraClass:{type:String,default:""},backgroundColor:{type:String,default:"cornflowerblue"},startCollapsed:{type:Boolean,default:!0,required:!1}},data:()=>({collapsed:!0}),created(){this.collapsed=this.startCollapsed},methods:{onClick(){this.collapsed=!this.collapsed},hideChildren(){const{section:e}=this.$refs;e.querySelectorAll(".invisible").forEach((e=>e.style.visibility="hidden"))},showChildren(){const{section:e}=this.$refs;e.querySelectorAll(".invisible").forEach((e=>e.style.visibility="visible"))}}};const ue=(0,h.Z)(de,[["render",ce]]);var pe=ue,he={name:"LessonSection",components:{CollapsiblePane:pe},props:{rightColWidth:Number,startCollapsed:Boolean,lessonNum:Number,sectionNum:Number,sectionName:String,web:String,book:String,exam:String,intro:String,steps:Object,examples:Object,backgroundColor:Array}};const me=(0,h.Z)(he,[["render",se]]);var fe=me,be={name:"App",components:{CollapsiblePane:pe,LessonSection:fe,MainPage:f},mounted(){window.setTimeout((()=>{const e=document.evaluate("//*[text()[contains(.,'\\p')]]",document,null,XPathResult.ORDERED_NODE_ITERATOR_TYPE,null),l=[];let n;while(n=e.iterateNext())l.push(n);for(const s of l){const e=s.innerHTML.split("\\p");let l=e[0];for(let n=1;n<e.length;n++)l+='<span class="invisible">'+e[n]+"</span>";s.innerHTML=l}}),5e3);const e=[];window.addEventListener("keyup",(l=>{if("v"===l.key)for(const n of document.querySelectorAll(".invisible"))if("hidden"===n.style.visibility){n.style.visibility="visible",e.push(n),e.length>100&&e.shift();break}"h"===l.key&&0!==e.length&&(e.pop().style.visibility="hidden")}))},data(){function e(l,n){for(const s in l)if("object"===typeof l[s])l[s]=e(l[s],n);else if("string"===typeof l[s])for(const e in n)l[s]=l[s].replaceAll(e,n[e]);return l}return e(window.j,{"<pli>":'<li class="invisible">',"</pli>":"</li>"})}};const _e=(0,h.Z)(be,[["render",a]]);var ge=_e;(0,s.ri)(ge).mount("#app")}},l={};function n(s){var t=l[s];if(void 0!==t)return t.exports;var o=l[s]={exports:{}};return e[s](o,o.exports,n),o.exports}n.m=e,function(){var e=[];n.O=function(l,s,t,o){if(!s){var i=1/0;for(d=0;d<e.length;d++){s=e[d][0],t=e[d][1],o=e[d][2];for(var a=!0,r=0;r<s.length;r++)(!1&o||i>=o)&&Object.keys(n.O).every((function(e){return n.O[e](s[r])}))?s.splice(r--,1):(a=!1,o<i&&(i=o));if(a){e.splice(d--,1);var c=t();void 0!==c&&(l=c)}}return l}o=o||0;for(var d=e.length;d>0&&e[d-1][2]>o;d--)e[d]=e[d-1];e[d]=[s,t,o]}}(),function(){n.n=function(e){var l=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(l,{a:l}),l}}(),function(){n.d=function(e,l){for(var s in l)n.o(l,s)&&!n.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:l[s]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,l){return Object.prototype.hasOwnProperty.call(e,l)}}(),function(){var e={143:0};n.O.j=function(l){return 0===e[l]};var l=function(l,s){var t,o,i=s[0],a=s[1],r=s[2],c=0;if(i.some((function(l){return 0!==e[l]}))){for(t in a)n.o(a,t)&&(n.m[t]=a[t]);if(r)var d=r(n)}for(l&&l(s);c<i.length;c++)o=i[c],n.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return n.O(d)},s=self["webpackChunksite"]=self["webpackChunksite"]||[];s.forEach(l.bind(null,0)),s.push=l.bind(null,s.push.bind(s))}();var s=n.O(void 0,[998],(function(){return n(530)}));s=n.O(s)})();
//# sourceMappingURL=app.9609cd0b.js.map
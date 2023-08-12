(function(){"use strict";var e={1720:function(e,n,o){var t=o(9242),l=o(3396);const i={class:"inner-text lesson-intro"},s=["innerHTML"],a={key:1,id:"toc"},r=(0,l._)("div",{id:"toc-title"},"Table of Contents",-1),c={id:"toc-nav"},d=["onClick","innerHTML"];function u(e,n,o,t,u,p){const w=(0,l.up)("CollapsiblePane"),h=(0,l.up)("LessonSection"),m=(0,l.up)("MainPage");return(0,l.wg)(),(0,l.j4)(m,{"lesson-num":e.lessonNum,"lesson-name":e.lessonName,"section-name":e.extraName,"previous-section":e.previousSection,"next-section":e.nextSection},{default:(0,l.w5)((()=>[e.intro?((0,l.wg)(),(0,l.j4)(w,{key:0,name:"Introduction","extra-class":"section","start-collapsed":e.startCollapsed},{default:(0,l.w5)((()=>[(0,l._)("div",i,[(0,l._)("p",{innerHTML:e.intro},null,8,s)])])),_:1},8,["start-collapsed"])):(0,l.kq)("",!0),e.showToc?((0,l.wg)(),(0,l.iD)("section",a,[r,(0,l._)("ol",c,[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(e.toc,((e,n)=>((0,l.wg)(),(0,l.iD)("li",{key:n},[(0,l._)("a",{href:"javascript:void(0)",onClick:e=>p.tocLink(n+1),innerHTML:e},null,8,d)])))),128))])])):(0,l.kq)("",!0),((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(e.sections,((n,o)=>((0,l.wg)(),(0,l.j4)(h,{key:o,"right-col-width":n.rightColWidth,"start-collapsed":e.startCollapsed,lessonNum:e.lessonNum,sectionNum:n.number,sectionName:n.name,web:n.web,book:n.book,exam:n.exam,intro:n.intro,steps:n.steps,examples:n.examples},null,8,["right-col-width","start-collapsed","lessonNum","sectionNum","sectionName","web","book","exam","intro","steps","examples"])))),128))])),_:1},8,["lesson-num","lesson-name","section-name","previous-section","next-section"])}var p=o(7139);const w={id:"top-nav",style:{display:"flex"}},h={style:{width:"16%"}},m={style:{margin:"auto"}},f=(0,l.Uk)("Calc I / "),v={key:0},b={style:{width:"16%"}},g={id:"buttons"},_={class:"background"};function x(e,n,o,t,i,s){return(0,l.wg)(),(0,l.iD)(l.HY,null,[(0,l._)("nav",w,[(0,l._)("span",h,[null!==o.previousSection?((0,l.wg)(),(0,l.iD)("a",{key:0,href:"javascript:void(0)",onClick:n[0]||(n[0]=(...e)=>s.previous&&s.previous(...e))},"Previous Section")):(0,l.kq)("",!0)]),(0,l._)("span",m,[(0,l._)("span",null,[f,(0,l._)("a",{href:"javascript:void{0}",onClick:n[1]||(n[1]=(...e)=>s.intro&&s.intro(...e))},(0,p.zw)(o.lessonName),1)]),o.sectionName?((0,l.wg)(),(0,l.iD)("span",v," / "+(0,p.zw)(o.sectionName),1)):(0,l.kq)("",!0)]),(0,l._)("span",b,[null!==o.nextSection?((0,l.wg)(),(0,l.iD)("a",{key:0,href:"javascript:void(0)",onClick:n[2]||(n[2]=(...e)=>s.next&&s.next(...e))},"Next Section")):(0,l.kq)("",!0)])]),(0,l._)("header",null,[(0,l._)("h1",null,"Lecture "+(0,p.zw)(o.lessonNum)+": "+(0,p.zw)(o.lessonName),1),(0,l._)("div",g,[(0,l._)("button",{id:"color-toggle",onClick:n[3]||(n[3]=(...e)=>s.toggleColors&&s.toggleColors(...e))}),(0,l._)("button",{id:"collapse-all",onClick:n[4]||(n[4]=(...e)=>s.collapseAll&&s.collapseAll(...e))},"Collapse"),(0,l._)("button",{id:"expand-all",onClick:n[5]||(n[5]=(...e)=>s.expandAll&&s.expandAll(...e))},"Expand"),(0,l._)("button",{id:"hide-all",onClick:n[6]||(n[6]=(...e)=>s.hideAll&&s.hideAll(...e))},"Hide")])]),(0,l._)("section",_,[(0,l.WI)(e.$slots,"default")])],64)}var y={name:"MainPage",props:{lessonNum:Number,lessonName:String,sectionName:{type:String,required:!1},previousSection:{type:Number,required:!1},nextSection:{type:Number,required:!1}},mounted(){document.querySelector("#color-toggle").innerText=window.location.hash.includes("nocolor")?"Enable color":"Disable color"},methods:{toggleColors(){document.querySelector("#color-toggle").disabled=!0;const e=window.location.hash.replace(/^#/,"").split("&");let n=!1;for(const o in e){const t=e[o];"nocolor"===t&&(delete e[o],n=!0)}n||e.push("nocolor"),window.location.hash="#"+e.filter(Boolean).join("&"),window.location.reload()},intro(){const e=window.location.hash.replace(/^#/,"").split("&");for(const n in e)if(e[n].match(/^\w*section\w*=\w*\d+\w*$/i)){e[n]="section=0";break}window.location.hash="#"+e.filter(Boolean).join("&"),window.location.reload()},next(){const e=window.location.hash.replace(/^#/,"").split("&");for(const n in e)if(e[n].match(/^\w*section\w*=\w*\d+\w*$/i)){let o;[,o]=e[n].split("="),e[n]="section="+(Number(o)+1);break}window.location.hash="#"+e.filter(Boolean).join("&"),window.location.reload()},previous(){const e=window.location.hash.replace(/^#/,"").split("&");for(const n in e)if(e[n].match(/^\w*section\w*=\w*\d+\w*$/i)){let o;[,o]=e[n].split("="),e[n]="section="+(Number(o)-1);break}window.location.hash="#"+e.filter(Boolean).join("&"),window.location.reload()},collapseAll(){document.querySelectorAll(".collapsible").forEach((e=>e.dataset.collapsed="true"))},expandAll(){document.querySelectorAll(".collapsible").forEach((e=>e.dataset.collapsed="false"))},hideAll(){document.querySelectorAll(".invisible").forEach((e=>e.style.visibility="hidden"))}}},k=o(89);const C=(0,k.Z)(y,[["render",x]]);var j=C;const T={class:"inner-text info"},N=(0,l.Uk)("WebAssign questions: "),H=["innerHTML"],S=(0,l.Uk)("Textbook pages: "),L=["innerHTML"],M=(0,l.Uk)("Exam notes: "),q=["innerHTML"],A={class:"inner-text"},E=["innerHTML"],D={class:"row"},O=(0,l._)("div",{class:"col"},[(0,l._)("h2",{class:"background"},"In General")],-1),W=(0,l._)("h2",{class:"background"},"Specific Example",-1),P=[W],I={class:"row"},$={class:"col"},Y={class:"inner-text"},B=["innerHTML"],K={class:"inner-text"},R=["innerHTML"],z={class:"row"},U={class:"col"},Z={class:"inner-text"},G=["innerHTML"],F={class:"inner-text"},X=["innerHTML"],J={class:"row"},Q=(0,l._)("div",{class:"col"},[(0,l._)("h2",{class:"background"},"In General")],-1),V=(0,l._)("h2",{class:"background"},"Specific Example",-1),ee=[V],ne={class:"row"},oe={class:"col"},te={class:"inner-text"},le=["innerHTML"],ie={class:"inner-text"},se=["innerHTML"],ae={class:"row"},re={class:"col"},ce={class:"inner-text"},de=["innerHTML"],ue={class:"inner-text"},pe=["innerHTML"];function we(e,n,o,t,i,s){const a=(0,l.up)("CollapsiblePane");return(0,l.wg)(),(0,l.j4)(a,{name:"Section "+o.lessonNum+"."+o.sectionNum+": "+o.sectionName,"extra-class":"section","start-collapsed":o.startCollapsed},{default:(0,l.w5)((()=>[(0,l.Wm)(a,{name:"WebAssign and Textbook","extra-class":"subheading","start-collapsed":o.startCollapsed},{default:(0,l.w5)((()=>[(0,l._)("div",T,[(0,l._)("p",null,[N,(0,l._)("span",{innerHTML:o.web},null,8,H)]),(0,l._)("p",null,[S,(0,l._)("span",{innerHTML:o.book},null,8,L)]),(0,l._)("p",null,[M,(0,l._)("span",{innerHTML:o.exam},null,8,q)])])])),_:1},8,["start-collapsed"]),(0,l.Wm)(a,{name:"Introduction","extra-class":"subheading","start-collapsed":o.startCollapsed},{default:(0,l.w5)((()=>[(0,l._)("div",A,[(0,l._)("p",{innerHTML:o.intro},null,8,E)])])),_:1},8,["start-collapsed"]),(0,l.Wm)(a,{name:"Steps","extra-class":"subheading","start-collapsed":o.startCollapsed},{default:(0,l.w5)((()=>[(0,l._)("div",D,[O,(0,l._)("div",{class:"col",style:(0,p.j5)({"max-width":o.rightColWidth+"%"})},P,4)]),(0,l._)("div",I,[(0,l._)("div",$,[(0,l._)("div",Y,[(0,l._)("p",{innerHTML:o.steps.general.question},null,8,B)])]),(0,l._)("div",{class:"col",style:(0,p.j5)({"max-width":o.rightColWidth+"%"})},[(0,l._)("div",K,[(0,l._)("p",{innerHTML:o.steps.specific.question},null,8,R)])],4)]),((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(o.steps.general.steps,((e,n)=>((0,l.wg)(),(0,l.j4)(a,{name:"Step "+(n+1),key:n,"extra-class":"step","start-collapsed":o.startCollapsed},{default:(0,l.w5)((()=>[(0,l._)("div",z,[(0,l._)("div",U,[(0,l._)("div",Z,[(0,l._)("p",{innerHTML:e},null,8,G)])]),(0,l._)("div",{class:"col",style:(0,p.j5)({"max-width":o.rightColWidth+"%"})},[(0,l._)("div",F,[(0,l._)("p",{innerHTML:o.steps.specific.steps[n]},null,8,X)])],4)])])),_:2},1032,["name","start-collapsed"])))),128))])),_:1},8,["start-collapsed"]),((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(o.examples,((e,n)=>((0,l.wg)(),(0,l.j4)(a,{name:"Example "+o.lessonNum+"."+o.sectionNum+"."+(n+1),key:n,"extra-class":"subheading","start-collapsed":o.startCollapsed},{default:(0,l.w5)((()=>[(0,l._)("div",J,[Q,(0,l._)("div",{class:"col",style:(0,p.j5)({"max-width":o.rightColWidth+"%"})},ee,4)]),(0,l._)("div",ne,[(0,l._)("div",oe,[(0,l._)("div",te,[(0,l._)("p",{innerHTML:o.steps.general.question},null,8,le)])]),(0,l._)("div",{class:"col",style:(0,p.j5)({"max-width":o.rightColWidth+"%"})},[(0,l._)("div",ie,[(0,l._)("p",{innerHTML:e.question},null,8,se)])],4)]),((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(o.steps.general.steps,((n,t)=>((0,l.wg)(),(0,l.j4)(a,{name:"Step "+(t+1),key:t,"extra-class":"step","start-collapsed":o.startCollapsed},{default:(0,l.w5)((()=>[(0,l._)("div",ae,[(0,l._)("div",re,[(0,l._)("div",ce,[(0,l._)("p",{innerHTML:n},null,8,de)])]),(0,l._)("div",{class:"col",style:(0,p.j5)({"max-width":o.rightColWidth+"%"})},[(0,l._)("div",ue,[(0,l._)("p",{innerHTML:e.steps[t]},null,8,pe)])],4)])])),_:2},1032,["name","start-collapsed"])))),128))])),_:2},1032,["name","start-collapsed"])))),128))])),_:1},8,["name","start-collapsed"])}const he=["data-collapsed"],me={style:{"flex-grow":"1"}},fe=["innerHTML"],ve={class:"collapsible-buttons",style:{padding:"1rem"}},be={class:"contents"};function ge(e,n,o,t,i,s){return(0,l.wg)(),(0,l.iD)("section",{ref:"section",class:(0,p.C_)("collapsible"),"data-collapsed":e.collapsed,style:(0,p.j5)({"background-color":o.backgroundColor})},[(0,l._)("div",{class:(0,p.C_)("section-div "+o.extraClass),style:{display:"flex"}},[(0,l._)("div",me,[(0,l._)("h2",{class:(0,p.C_)("section-name"),onClick:n[0]||(n[0]=(...e)=>s.onClick&&s.onClick(...e)),innerHTML:"<span class='arrow'></span> "+o.name},null,8,fe)]),(0,l._)("div",ve,[(0,l._)("button",{onClick:n[1]||(n[1]=(...e)=>s.hideChildren&&s.hideChildren(...e))},"Hide"),(0,l._)("button",{onClick:n[2]||(n[2]=(...e)=>s.showChildren&&s.showChildren(...e))},"Show")])],2),(0,l._)("section",be,[(0,l.WI)(e.$slots,"default")])],12,he)}var _e={name:"CollapsiblePane",props:{name:String,extraClass:{type:String,default:""},backgroundColor:{type:String,default:"cornflowerblue"},startCollapsed:{type:Boolean,default:!0,required:!1}},data:()=>({collapsed:!0}),created(){this.collapsed=this.startCollapsed},methods:{onClick(){this.collapsed=!this.collapsed},hideChildren(){const{section:e}=this.$refs;e.querySelectorAll(".invisible").forEach((e=>e.style.visibility="hidden"))},showChildren(){const{section:e}=this.$refs;e.querySelectorAll(".invisible").forEach((e=>e.style.visibility="visible"))}}};const xe=(0,k.Z)(_e,[["render",ge]]);var ye=xe,ke={name:"LessonSection",components:{CollapsiblePane:ye},props:{rightColWidth:Number,startCollapsed:Boolean,lessonNum:Number,sectionNum:Number,sectionName:String,web:String,book:String,exam:String,intro:String,steps:Object,examples:Object,backgroundColor:Array}};const Ce=(0,k.Z)(ke,[["render",we]]);var je=Ce,Te={name:"App",components:{CollapsiblePane:ye,LessonSection:je,MainPage:j},methods:{tocLink(e){const n=window.location.hash.replace(/^#/,"").split("&"),o=n.findIndex((e=>e.match(/^\w*section\w*=\w*\d+\w*$/i)));-1!==o?n[o]="section="+e:n.push("section="+e),window.scrollTo(0,0),window.location.hash="#"+n.join("&"),window.location.reload()}},mounted(){window.setTimeout((()=>{const e=document.evaluate("//*[text()[contains(.,'\\p')]]",document,null,XPathResult.ORDERED_NODE_ITERATOR_TYPE,null),n=[];let o;while(o=e.iterateNext())n.push(o);for(const t of n){const e=t.innerHTML.split("\\p");let n=e[0];for(let o=1;o<e.length;o++)n+='<span class="invisible">'+e[o]+"</span>";t.innerHTML=n}}),5e3);const e=[];window.addEventListener("keyup",(n=>{if("v"===n.key)for(const o of document.querySelectorAll(".invisible"))if("hidden"===o.style.visibility){o.style.visibility="visible",e.push(o),e.length>100&&e.shift();break}"h"===n.key&&0!==e.length&&(e.pop().style.visibility="hidden")}))},data(){function e(n,o){for(const t in n)if("object"===typeof n[t])n[t]=e(n[t],o);else if("string"===typeof n[t])for(const e in o)n[t]=n[t].replaceAll(e,o[e]);return n}window.j.toc=[];for(let t=0;t<window.j.sections.length;t++)window.j.sections[t].number=t+1,window.j.toc[t]=window.j.sections[t].name;window.j.showToc=!1,window.j.extraName=null,window.j.previousSection=null,window.j.nextSection=null;const n=window.location.hash.replace(/^#/,"").split("&"),o=n.find((e=>e.match(/^\w*section\w*=\w*\d+\w*$/i)));if(o){const e=Number(o.split("=")[1]);e<window.j.sections.length&&(window.j.nextSection=e+1),0===e?(window.j.sections=[],window.j.showToc=!0,window.j.extraName="Introduction"):(window.j.intro=null,window.j.sections=[window.j.sections[e-1]],window.j.extraName=window.j.sections[0].name,window.j.previousSection=e-1,console.log(e-1))}return e(window.j,{"<pli>":'<li class="invisible">',"</pli>":"</li>"})}};const Ne=(0,k.Z)(Te,[["render",u]]);var He=Ne;(0,t.ri)(He).mount("#app")}},n={};function o(t){var l=n[t];if(void 0!==l)return l.exports;var i=n[t]={exports:{}};return e[t](i,i.exports,o),i.exports}o.m=e,function(){var e=[];o.O=function(n,t,l,i){if(!t){var s=1/0;for(d=0;d<e.length;d++){t=e[d][0],l=e[d][1],i=e[d][2];for(var a=!0,r=0;r<t.length;r++)(!1&i||s>=i)&&Object.keys(o.O).every((function(e){return o.O[e](t[r])}))?t.splice(r--,1):(a=!1,i<s&&(s=i));if(a){e.splice(d--,1);var c=l();void 0!==c&&(n=c)}}return n}i=i||0;for(var d=e.length;d>0&&e[d-1][2]>i;d--)e[d]=e[d-1];e[d]=[t,l,i]}}(),function(){o.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(n,{a:n}),n}}(),function(){o.d=function(e,n){for(var t in n)o.o(n,t)&&!o.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:n[t]})}}(),function(){o.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){o.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)}}(),function(){var e={143:0};o.O.j=function(n){return 0===e[n]};var n=function(n,t){var l,i,s=t[0],a=t[1],r=t[2],c=0;if(s.some((function(n){return 0!==e[n]}))){for(l in a)o.o(a,l)&&(o.m[l]=a[l]);if(r)var d=r(o)}for(n&&n(t);c<s.length;c++)i=s[c],o.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return o.O(d)},t=self["webpackChunksite"]=self["webpackChunksite"]||[];t.forEach(n.bind(null,0)),t.push=n.bind(null,t.push.bind(t))}();var t=o.O(void 0,[998],(function(){return o(1720)}));t=o.O(t)})();
//# sourceMappingURL=app.2f8278d1.js.map
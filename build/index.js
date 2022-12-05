!function(){"use strict";var e={n:function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,{a:n}),n},d:function(t,n){for(var r in n)e.o(n,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:n[r]})},o:function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}},t=window.wp.element,n=window.React,r=window.ReactDOM,l=e.n(r),s=e=>{let{title:n,question:r}=e;return(0,t.createElement)("div",null,(0,t.createElement)("h1",{className:"text-xl"},n),(0,t.createElement)("h2",{className:"text-lg"},"Q.",r.index+1," ",r.name))},a=e=>{let{currAnswer:n,length:r,chooseOnClick:l}=e;return(0,t.createElement)("div",{className:"my-4"},Array.from(Array(r).keys()).map((e=>(0,t.createElement)("button",{className:"w-12 h-12 border-solid border-2 mx-2 "+(n===e+1?"bg-gray-400":""),onClick:()=>{l(e+1)}},e+1))))},c=e=>{let{currAnswer:n,label:r,handleChooseAnswer:l}=e;return(0,t.createElement)("div",null,(0,t.createElement)("h1",{className:"my-2"},r.charAt(0).toUpperCase()+r.slice(1),":"),(0,t.createElement)(a,{length:5,chooseOnClick:e=>l(e,r),currAnswer:n}))},o=e=>{let{currAnswers:n,setCurrAnswers:r}=e;const l=(e,t)=>{r((n=>({...n,[t]:e})))};return(0,t.createElement)("div",{className:"my-4"},(0,t.createElement)(c,{handleChooseAnswer:l,label:"current",currAnswer:n.current}),(0,t.createElement)(c,{handleChooseAnswer:l,label:"desired",currAnswer:n.desired}),(0,t.createElement)(c,{handleChooseAnswer:l,label:"value",currAnswer:n.value}))},u=e=>{let{btnText:n,handleBtn:r}=e;return(0,t.createElement)("div",null,(0,t.createElement)("button",{className:"w-24 h-12 border-solid border-2 mx-2 mr-5",onClick:r},n))},i=e=>{let{allAnswers:n}=e;return(0,t.createElement)("div",null,JSON.stringify(n,null,4))};document.querySelector("#render-react-example-here"),document.querySelector("#render-react-assessment-component")&&window.location.pathname.includes("/assessment/")&&l().render((0,t.createElement)((function(){const[e,r]=(0,n.useState)([]),[l,a]=(0,n.useState)(0),[c,m]=(0,n.useState)([]),[d,w]=(0,n.useState)({current:null,desired:null,value:null}),[h,E]=(0,n.useState)(!1);return(0,n.useEffect)((()=>{r((async()=>{try{const e=await fetch("http://15.222.168.158/sat-tool/get-sat-questions",{method:"GET",headers:{Accept:"application/json",Authorization:"Token 7b4c76eaa68c192da374d197b2497151c4b08bc9",KMQJWT:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZXN0X2lkIjoxfQ.F4l8cpGQvyVy1Gc_1R-vGvJpIS_SiVsF71Fv2sncEvM"}});if(!e.ok)throw new Error(`Error! status: ${e.status}`);const t=await e.json();return console.log("result is: ",JSON.stringify(t,null,4)),t}catch(e){return e.message}})())}),[]),(0,n.useEffect)((()=>{w({current:null,desired:null,value:null})}),[c]),console.log("allAnswers",c),(0,t.createElement)("div",null,h?(0,t.createElement)("div",null,(0,t.createElement)(i,{allAnswers:c})):(0,t.createElement)("div",null,(0,t.createElement)(s,{title:"Question Title",question:{name:"question name",index:l}}),(0,t.createElement)(o,{setCurrAnswers:w,currAnswers:d}),(0,t.createElement)(u,{btnText:4===l?"Save":"Next",handleBtn:()=>{d.current&&d.desired&&d.value?(m([...c,d]),4===l?E(!0):a(l+1)):alert("Answer every question!")}})))}),null),document.querySelector("#render-react-assessment-component"))}();
!function(){"use strict";var e={n:function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,{a:n}),n},d:function(t,n){for(var r in n)e.o(n,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:n[r]})},o:function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}},t=window.wp.element,n=window.React,r=window.ReactDOM,o=e.n(r);document.querySelector("#render-react-example-here")&&o().render((0,t.createElement)((function(){const[e,r]=(0,n.useState)(0);return(0,t.createElement)("div",{className:"bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 rounded-md",onClick:()=>r((e=>e+1))},(0,t.createElement)("h1",{className:"text-xl"},"Hello from React!"),(0,t.createElement)("p",{className:"text-sm"},"You have clicked on this component ",(0,t.createElement)("span",{className:"text-yellow-200 font-bold"},e)," times."))}),null),document.querySelector("#render-react-example-here"))}();
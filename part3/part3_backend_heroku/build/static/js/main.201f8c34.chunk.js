(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{14:function(e,n,t){e.exports=t(37)},19:function(e,n,t){},37:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),c=t(13),o=t.n(c),u=(t(19),t(2)),l=function(e){var n=e.persons,t=e.del,a=n.map((function(e,n){return r.a.createElement("li",{key:"".concat(n,"-").concat(e.name)},e.name," ",e.number," ",r.a.createElement("button",{key:"btn-".concat(n),onClick:function(){return t(e.id)}},"delet"))}));return r.a.createElement("ul",null,a)},i=function(e){var n=e.submitHandle,t=e.changeNameHandle,a=e.changeNumberHandle,c=e.newName,o=e.newNumber;return r.a.createElement("form",{onSubmit:n},r.a.createElement("div",null,"name: ",r.a.createElement("input",{onChange:t,value:c})),r.a.createElement("div",null,"number: ",r.a.createElement("input",{onChange:a,value:o,type:"number"})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))},m=function(e){var n=e.searchHandle;return r.a.createElement("div",null," Filter shown with ",r.a.createElement("input",{onChange:n}))},s=t(3),d=t.n(s),f="/api/persons",h=function(){return d.a.get(f).then((function(e){return e.data}))},b=function(e){return d.a.post(f,e).then((function(e){return console.log("module res",e.body),e.data})).catch((function(e,n,t){return console.log("module error",e),{error:e.message}}))},p=function(e,n){return d.a.put("".concat(f,"/").concat(e),n).then((function(e){return e.data}))},g=function(e){var n="".concat(f,"/").concat(e);return d.a.delete(n).then((function(e){return e.status}))},v=function(e){var n=e.message,t=e.color,a={padding:"0px",border:"3px solid ".concat(t),color:"".concat(t)};return null===n?null:r.a.createElement("div",{className:"error",style:a},r.a.createElement("h2",null,n))},E=function(){var e=Object(a.useState)([]),n=Object(u.a)(e,2),t=n[0],c=n[1],o=Object(a.useState)(""),s=Object(u.a)(o,2),d=s[0],f=s[1],E=Object(a.useState)(""),j=Object(u.a)(E,2),w=j[0],O=j[1],k=Object(a.useState)([]),y=Object(u.a)(k,2),N=y[0],C=y[1],H=Object(a.useState)(null),S=Object(u.a)(H,2),x=S[0],J=S[1],U=Object(a.useState)(null),A=Object(u.a)(U,2),B=A[0],D=A[1];Object(a.useEffect)((function(){h().then((function(e){c(e),C(e)}))}),[]);var F=function(e,n){J(e),D(n),setTimeout((function(){J(null)}),5e3)},I=function(e){c(e),C(e)},M=function(){f(""),O("")};return r.a.createElement("div",{style:{margin:"20px"}},r.a.createElement("div",{style:{height:"120px"}},r.a.createElement("h3",null,"Phonebook "),r.a.createElement(v,{message:x,color:B})),r.a.createElement(m,{searchHandle:function(e){var n=t.filter((function(n){return n.name.toUpperCase().includes(e.target.value.toUpperCase())}));C(n)}}),r.a.createElement("h3",null,"Add a new"),r.a.createElement(i,{submitHandle:function(e){e.preventDefault();var n={name:d,number:w};if(0!==t.filter((function(e){return e.name===n.name})).length){if(!window.confirm("update ".concat(d,"'s number?")))return;var a=t.filter((function(e){return e.name===n.name}))[0].id;p(a,n).then((function(e){if(console.log("here1"),e.error)F("".concat(e.error),"red");else{console.log("here2");var a=t.map((function(n){return n.id===e.id?e:n}));I(a),F("".concat(n.name," updated to the phonebook"),"green"),M()}}))}else console.log("here3"),b(n).then((function(e){console.log("here4"),console.log("res",e),e.error?F("".concat(e.error),"red"):(console.log("here5"),I(t.concat(e)),F("".concat(n.name," added to the phonebook"),"green"),M())}))},changeNameHandle:function(e){f(e.target.value)},changeNumberHandle:function(e){return O(e.target.value)},newName:d,newNumber:w}),r.a.createElement("h2",null,"Numbers"),r.a.createElement(l,{persons:N,del:function(e){var n=t.filter((function(n){return n.id===e}))[0].name;g(e).then((function(a){if(window.confirm("delete contact ".concat(n,"?"))){var r=t.filter((function(n){return n.id!==e}));I(r),F("Contact ".concat(n," has been removed"),"green")}})).catch((function(e){F("Contact ".concat(n," has already been removed from server"),"red")}))}}))};o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(E,null)),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.201f8c34.chunk.js.map
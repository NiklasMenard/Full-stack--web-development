(this.webpackJsonppart1=this.webpackJsonppart1||[]).push([[0],{15:function(e,n,t){e.exports=t(38)},20:function(e,n,t){},38:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),o=t(14),u=t.n(o),c=t(4),l=t(2),m=(t(20),function(e){var n=e.showName,t=e.handleShowName;return r.a.createElement("form",null,r.a.createElement("div",null," Filter by name: ",r.a.createElement("input",{value:n,onChange:t})," "))}),i=function(e){return r.a.createElement("form",{onSubmit:e.AddName},r.a.createElement("div",null," name: ",r.a.createElement("input",{value:e.newName,onChange:e.handleNameChange})," "),r.a.createElement("div",null," number: ",r.a.createElement("input",{value:e.newNumber,onChange:e.handleNumberChange})," "),r.a.createElement("div",null," ",r.a.createElement("button",{type:"submit"},"add")," "))},s=function(e){var n=e.persons,t=e.showName,a=e.RemoveContact,o=t?n.filter((function(e){return e.name.toLowerCase().includes(t.toLowerCase())})):n;return r.a.createElement("div",null,o.map((function(e){return r.a.createElement("li",{key:e.id}," ",e.name," ",e.number,"\xa0",r.a.createElement("button",{onClick:function(){return a(e.name,e.id)}},"Delete"))})))},d=t(3),f=t.n(d),h="/api/persons",b=function(){return f.a.get(h)},E=function(e){return f.a.post(h,e)},p=function(e,n){return f.a.put("".concat(h,"/").concat(e),n)},v=function(e){return f.a.delete("".concat(h,"/").concat(e))},w=function(e){var n=e.person;return null===n?null:r.a.createElement("div",{className:"notification"},"Added ",n)},N=function(e){var n=e.message;return null===n?null:"addError"===n?r.a.createElement("div",{className:"errorMessage"},"Name or number too short"):r.a.createElement("div",{className:"errorMessage"},n," was already removed from the phonebook")},g=function(){var e=Object(a.useState)([]),n=Object(l.a)(e,2),t=n[0],o=n[1],u=Object(a.useState)(""),d=Object(l.a)(u,2),f=d[0],h=d[1],g=Object(a.useState)(""),C=Object(l.a)(g,2),j=C[0],O=C[1],S=Object(a.useState)(""),k=Object(l.a)(S,2),y=k[0],L=k[1],A=Object(a.useState)(null),D=Object(l.a)(A,2),T=D[0],J=D[1],M=Object(a.useState)(null),P=Object(l.a)(M,2),R=P[0],x=P[1];Object(a.useEffect)((function(){b().then((function(e){o(e.data)}))}),[]);return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(m,{showName:y,handleShowName:function(e){L(e.target.value)}}),r.a.createElement(w,{person:T}),r.a.createElement(N,{message:R}),r.a.createElement("div",null,r.a.createElement("h2",null,"Add a new contact"),r.a.createElement(i,{AddName:function(e){if(e.preventDefault(),t.some((function(e){return e.name.toLowerCase()===f.toLowerCase()&&e.number!==j}))){if(window.confirm("".concat(f," is already in the phonebook, want to change the number?"))){var n=t.find((function(e){return e.name.toLowerCase()===f.toLowerCase()})),a=Object(c.a)(Object(c.a)({},n),{},{number:j});p(n.id,a).then((function(e){o(t.map((function(t){return t.id!==n.id?t:e.data})))})).catch((function(e){x(f),setTimeout((function(){x(null)}),2e3)}))}}else E({name:f,number:j}).then((function(e){o(t.concat(e.data)),J(f),setTimeout((function(){J(null)}),2e3)})).catch((function(e){console.log(e.response.data),x("addError"),setTimeout((function(){x(null)}),2e3)}));h(""),O("")},persons:t,setPersons:o,setNewName:h,setNewNumber:O,newName:f,handleNameChange:function(e){h(e.target.value)},newNumber:j,handleNumberChange:function(e){O(e.target.value)}})),r.a.createElement("h3",null,"Numbers"),r.a.createElement(s,{persons:t,showName:y,RemoveContact:function(e,n){var a="Do you want to delete '".concat(e,"'?");window.confirm(a)&&v(n).then((function(e){o(t.filter((function(e){return e.id!==n})))}))}}))};u.a.render(r.a.createElement(g,{puhelinluettelo:!0}),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.9dcfb7ea.chunk.js.map
"use strict";(self.webpackChunkmy_app=self.webpackChunkmy_app||[]).push([[399],{2399:(e,t,r)=>{r.r(t),r.d(t,{default:()=>k});var n=r(2791),l=r(9230),i=r(7689),s=r(1087),a=r(3848),o=r(7393),u=r(1994);const c="Register_container__JjBJk",d="Register_keyPic__fi3x5",v="Register_loginBox__A3nFQ",m="Register_logo__a+bdH",p="Register_title__xjz3q",h="Register_errorMessage__dqvBk",f="Register_routeLogin__BYULf",x="Register_rtl__asSUu";var y=r(5294),_=r(6484),b=r(9589),g=r(184);const j=function(){const e=(0,n.useContext)(a.Z),t=(0,n.useRef)(null),j=(0,n.useRef)(null),k=(0,n.useRef)(null),R=(0,n.useRef)(null),N=(0,i.s0)(),{t:A}=(0,l.$G)();return(0,g.jsxs)("div",{className:"".concat(c," ").concat("hi"===e.lang?x:""),children:[(0,g.jsxs)("div",{className:v,children:[(0,g.jsx)("div",{className:m,children:(0,g.jsxs)(_.M,{children:[" ",(0,g.jsx)(b.X,{color:"red",textDecoration:"underline",mt:10,mb:14,size:"md",children:"Aron Web Solutions"})]})}),(0,g.jsx)("h2",{className:p,children:A("registerPage")}),(0,g.jsxs)("form",{onSubmit:async function(e){var r,n,l,i;e.preventDefault();const s=null===(r=t.current)||void 0===r?void 0:r.value.trim(),a=null===(n=k.current)||void 0===n?void 0:n.value.trim(),o=null===(l=j.current)||void 0===l?void 0:l.value.trim();var u,c,d,v,m,p,h,f,x;if(s&&s.length<3)return null===(u=R.current)||void 0===u||u.setAttribute("style","display: inline-block; opacity: 1"),R.current.innerText="Name length should be equal to 3 or more than that",void(null===(c=t.current)||void 0===c||c.focus());if(null===(d=t.current)||void 0===d||d.blur(),!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(a||""))return null===(v=R.current)||void 0===v||v.setAttribute("style","display: inline-block; opacity: 1"),R.current.innerText="Invalid email format",void(null===(m=k.current)||void 0===m||m.focus());if(null===(p=k.current)||void 0===p||p.blur(),!/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/.test(o||""))return null===(h=R.current)||void 0===h||h.setAttribute("style","display: inline-block; opacity: 1"),R.current.innerText="Password must be at least 6 characters, contain at least one uppercase letter, one number, and one special character",void(null===(f=j.current)||void 0===f||f.focus());null===(x=j.current)||void 0===x||x.blur(),null===(i=R.current)||void 0===i||i.setAttribute("style","display: inline-block; opacity: 1"),R.current.innerText="Loading...";try{var _,b,g;await y.Z.post("http://localhost:4800/api/users/signup",{name:null===(_=t.current)||void 0===_?void 0:_.value,email:null===(b=k.current)||void 0===b?void 0:b.value,password:null===(g=j.current)||void 0===g?void 0:g.value}).then((e=>{alert("Your account is registered"),N("/")})).catch((e=>{var t,r,n,l,i;null===(t=R.current)||void 0===t||t.setAttribute("style","display: inline-block; opacity: 1"),R.current.innerText=(null===e||void 0===e||null===(r=e.response)||void 0===r||null===(n=r.data)||void 0===n?void 0:n.message)||(null===e||void 0===e||null===(l=e.response)||void 0===l||null===(i=l.data)||void 0===i?void 0:i.errors[0])||"Something went wrong!"}))}catch(A){console.log(A)}},children:[(0,g.jsx)(u.Z,{ref:t,type:"text",id:"Name",placeholder:"shivam"}),(0,g.jsx)(u.Z,{ref:k,type:"email",id:"Email",placeholder:"email"}),(0,g.jsx)(u.Z,{ref:j,type:"password",id:"pass",value:"admin"}),(0,g.jsx)("span",{ref:R,className:h}),(0,g.jsx)(o.Z,{type:"submit",children:"Register"}),(0,g.jsx)(s.rU,{className:f,to:"/",children:"Already have an account?"})]})]}),(0,g.jsx)("div",{className:d,children:(0,g.jsx)("img",{src:r(5304).default,alt:"illustrator key"})})]})};const k=function(){return(0,g.jsx)("section",{children:(0,g.jsx)(j,{})})}},6484:(e,t,r)=>{r.d(t,{M:()=>s});var n=r(5113),l=r(5597),i=r(184),s=(0,n.m)("div",{baseStyle:{display:"flex",alignItems:"center",justifyContent:"center"}});s.displayName="Center";var a={horizontal:{insetStart:"50%",transform:"translateX(-50%)"},vertical:{top:"50%",transform:"translateY(-50%)"},both:{insetStart:"50%",top:"50%",transform:"translate(-50%, -50%)"}};(0,l.G)((function(e,t){const{axis:r="both",...l}=e;return(0,i.jsx)(n.m.div,{ref:t,__css:a[r],...l,position:"absolute"})}))}}]);
//# sourceMappingURL=399.2dc392b3.chunk.js.map
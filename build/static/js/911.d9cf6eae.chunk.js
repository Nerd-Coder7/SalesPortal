"use strict";(self.webpackChunkmy_app=self.webpackChunkmy_app||[]).push([[911],{9911:(e,t,n)=>{n.r(t),n.d(t,{default:()=>N});var s=n(2791),r=n(6920),i=n(3848),l=n(1994),a=n(7393),o=n(9230);const c="Login_container__PTiVb",u="Login_keyPic__bd1Bq",d="Login_loginBox__C9goZ",v="Login_logo__7DuIQ",p="Login_title__WCyJh",m="Login_errorMessage__8Zfyg",g="Login_forgat_pass__5iDya",f="Login_rtl__Xl1qI";var h=n(7689),x=n(1087),y=n(5294),_=n(6484),b=n(9589),j=n(184);const L=function(){const e=(0,s.useContext)(r.Z),[t,L]=(0,s.useState)(!1),N=(0,s.useContext)(i.Z),k=(0,s.useRef)(null),w=(0,s.useRef)(null),C=(0,s.useRef)(null),S=(0,h.s0)(),{t:Z}=(0,o.$G)();return(0,j.jsxs)("div",{className:"".concat(c," ").concat("hi"===N.lang?f:""),children:[(0,j.jsxs)("div",{className:d,children:[(0,j.jsx)("div",{className:v,children:(0,j.jsxs)(_.M,{children:[" ",(0,j.jsx)(b.X,{color:"red",textDecoration:"underline",mt:10,mb:14,size:"md",children:"Aron Web Solutions"})]})}),(0,j.jsx)("h2",{className:p,children:Z("loginPage")}),(0,j.jsxs)("form",{onSubmit:async function(t){var n,s;t.preventDefault();const r=null===(n=k.current)||void 0===n?void 0:n.value.trim(),i=null===(s=w.current)||void 0===s?void 0:s.value.trim();var l,a,o,c,u,d;if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(r||""))return null===(l=C.current)||void 0===l||l.setAttribute("style","display: inline-block; opacity: 1"),C.current.innerText="Invalid email format",void(null===(a=k.current)||void 0===a||a.focus());if(null===(o=k.current)||void 0===o||o.blur(),!/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/.test(i||""))return null===(c=C.current)||void 0===c||c.setAttribute("style","display: inline-block; opacity: 1"),C.current.innerText="Password must be at least 6 characters, contain at least one uppercase letter, one number, and one special character",void(null===(u=w.current)||void 0===u||u.focus());null===(d=w.current)||void 0===d||d.blur();try{var v,p;L(!0),await y.Z.post("http://localhost:4800/api/users/signin",{email:null===(v=k.current)||void 0===v?void 0:v.value,password:null===(p=w.current)||void 0===p?void 0:p.value}).then((t=>{var n;localStorage.setItem("isUser",JSON.stringify(null===t||void 0===t||null===(n=t.data)||void 0===n?void 0:n.user)),e.toggleLogin(),S("/")})).catch((e=>{var t,n,s,r,i;null===(t=C.current)||void 0===t||t.setAttribute("style","display: inline-block; opacity: 1"),C.current.innerText=(null===e||void 0===e||null===(n=e.response)||void 0===n||null===(s=n.data)||void 0===s?void 0:s.message)||(null===e||void 0===e||null===(r=e.response)||void 0===r||null===(i=r.data)||void 0===i?void 0:i.errors[0])||"Something went wrong!"})),L(!1)}catch(m){console.log(m)}},children:[(0,j.jsx)(l.Z,{ref:k,type:"email",id:"Email",placeholder:"email"}),(0,j.jsx)(l.Z,{ref:w,type:"password",id:"pass"}),(0,j.jsx)("span",{ref:C,className:m}),(0,j.jsx)(a.Z,{type:"submit",children:t?"Loading...":Z("login")}),(0,j.jsxs)("div",{style:{display:"flex",gap:"25px",justifyContent:"space-between"},children:[" ",(0,j.jsx)(x.rU,{className:g,to:"/",children:Z("forgetPass")}),(0,j.jsx)(x.rU,{className:g,to:"/register",children:"Don't have account?"})]})]})]}),(0,j.jsx)("div",{className:u,children:(0,j.jsx)("img",{src:n(5304).default,alt:"illustrator key"})})]})};const N=function(){return(0,j.jsx)("section",{children:(0,j.jsx)(L,{})})}},6484:(e,t,n)=>{n.d(t,{M:()=>l});var s=n(5113),r=n(5597),i=n(184),l=(0,s.m)("div",{baseStyle:{display:"flex",alignItems:"center",justifyContent:"center"}});l.displayName="Center";var a={horizontal:{insetStart:"50%",transform:"translateX(-50%)"},vertical:{top:"50%",transform:"translateY(-50%)"},both:{insetStart:"50%",top:"50%",transform:"translate(-50%, -50%)"}};(0,r.G)((function(e,t){const{axis:n="both",...r}=e;return(0,i.jsx)(s.m.div,{ref:t,__css:a[n],...r,position:"absolute"})}))}}]);
//# sourceMappingURL=911.d9cf6eae.chunk.js.map
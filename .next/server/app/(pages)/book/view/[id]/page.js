(()=>{var e={};e.id=157,e.ids=[157],e.modules={47849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},55403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},94749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},46767:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>i.a,__next_app__:()=>u,originalPathname:()=>p,pages:()=>c,routeModule:()=>x,tree:()=>d}),r(38934),r(28353),r(35866),r(32029);var o=r(23191),s=r(88716),n=r(37922),i=r.n(n),a=r(95231),l={};for(let e in a)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>a[e]);r.d(t,l);let d=["",{children:["(pages)",{children:["book",{children:["view",{children:["[id]",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,38934)),"C:\\Users\\Limenzy\\Desktop\\New folder\\BookList-Next-frontend\\src\\app\\(pages)\\book\\view\\[id]\\page.tsx"]}]},{}]},{}]},{}]},{layout:[()=>Promise.resolve().then(r.bind(r,28353)),"C:\\Users\\Limenzy\\Desktop\\New folder\\BookList-Next-frontend\\src\\app\\(pages)\\layout.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,35866,23)),"next/dist/client/components/not-found-error"]}]},{layout:[()=>Promise.resolve().then(r.bind(r,32029)),"C:\\Users\\Limenzy\\Desktop\\New folder\\BookList-Next-frontend\\src\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,35866,23)),"next/dist/client/components/not-found-error"]}],c=["C:\\Users\\Limenzy\\Desktop\\New folder\\BookList-Next-frontend\\src\\app\\(pages)\\book\\view\\[id]\\page.tsx"],p="/(pages)/book/view/[id]/page",u={require:r,loadChunk:()=>Promise.resolve()},x=new o.AppPageRouteModule({definition:{kind:s.x.APP_PAGE,page:"/(pages)/book/view/[id]/page",pathname:"/book/view/[id]",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},35370:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,12994,23)),Promise.resolve().then(r.t.bind(r,96114,23)),Promise.resolve().then(r.t.bind(r,9727,23)),Promise.resolve().then(r.t.bind(r,79671,23)),Promise.resolve().then(r.t.bind(r,41868,23)),Promise.resolve().then(r.t.bind(r,84759,23))},1223:()=>{},55440:(e,t,r)=>{Promise.resolve().then(r.bind(r,88832))},60014:(e,t,r)=>{Promise.resolve().then(r.bind(r,74235))},88832:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>i});var o=r(10326),s=r(35047),n=r(17577);let i=({params:e})=>{let t=(0,s.useRouter)();return(0,n.useEffect)(()=>{t.push(`/book/view/${e.id}/details`)},[t,e.id]),o.jsx(o.Fragment,{})}},74235:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>g});var o=r(10326);r(23824),r(17577);var s=r(76600),n=r(69883),i=r(43055),a=r(5420),l=r(25609),d=r(35047),c=r(90434);let p=()=>{let e=(0,d.useRouter)(),t=()=>{window.localStorage.removeItem("access_token"),window.localStorage.removeItem("user_Id"),window.localStorage.removeItem("role"),e.push("/login")};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)(s.Z,{sx:{borderBottom:1,borderColor:"divider",bgcolor:"white"},children:[o.jsx(n.Z,{size:"small",children:"Subscribe"}),o.jsx(l.Z,{component:"h2",variant:"h5",color:"inherit",align:"center",noWrap:!0,sx:{flex:1},children:o.jsx(c.default,{href:"/home",style:{textDecoration:"none",color:"black"},children:"BookShelf.com"})}),o.jsx(i.Z,{children:o.jsx(a.Z,{})}),o.jsx(n.Z,{variant:"outlined",size:"small",onClick:()=>{t()},children:"LogOut"})]}),(0,o.jsxs)(s.Z,{component:"nav",variant:"dense",sx:{justifyContent:"center",overflowX:"auto",columnGap:"20px",bgcolor:"white"},children:[o.jsx(c.default,{href:"/home",style:{color:"black "},children:"Home"}),o.jsx(c.default,{href:"/book/list",style:{color:"black "},children:"Books"}),o.jsx(c.default,{href:"/about",style:{color:"black "},children:"About"}),o.jsx(c.default,{href:"/home",style:{color:"black "},children:"Contact"})]})]})};var u=r(6420),x=r(75616),m=r(23179);function h(){return(0,o.jsxs)(l.Z,{variant:"body2",color:"text.secondary",align:"center",children:["Copyright \xa9 ",o.jsx(m.Z,{color:"inherit",href:"https://mui.com/",children:"BookShelf.com"})," ",new Date().getFullYear(),"."]})}let f=()=>o.jsx(o.Fragment,{children:o.jsx(u.Z,{component:"footer",sx:{bgcolor:"#F0EBE3",py:6},children:(0,o.jsxs)(x.Z,{maxWidth:"lg",children:[o.jsx(l.Z,{variant:"h6",align:"center",gutterBottom:!0,children:"BookShelf.com"}),o.jsx(l.Z,{variant:"subtitle1",align:"center",color:"text.secondary",component:"p",children:"Created By Nasim"}),o.jsx(h,{})]})})});function g({children:e}){return(0,o.jsxs)(o.Fragment,{children:[o.jsx(p,{}),o.jsx("main",{children:e}),o.jsx(f,{})]})}},38934:(e,t,r)=>{"use strict";r.r(t),r.d(t,{$$typeof:()=>i,__esModule:()=>n,default:()=>a});var o=r(68570);let s=(0,o.createProxy)(String.raw`C:\Users\Limenzy\Desktop\New folder\BookList-Next-frontend\src\app\(pages)\book\view\[id]\page.tsx`),{__esModule:n,$$typeof:i}=s;s.default;let a=(0,o.createProxy)(String.raw`C:\Users\Limenzy\Desktop\New folder\BookList-Next-frontend\src\app\(pages)\book\view\[id]\page.tsx#default`)},28353:(e,t,r)=>{"use strict";r.r(t),r.d(t,{$$typeof:()=>i,__esModule:()=>n,default:()=>a});var o=r(68570);let s=(0,o.createProxy)(String.raw`C:\Users\Limenzy\Desktop\New folder\BookList-Next-frontend\src\app\(pages)\layout.tsx`),{__esModule:n,$$typeof:i}=s;s.default;let a=(0,o.createProxy)(String.raw`C:\Users\Limenzy\Desktop\New folder\BookList-Next-frontend\src\app\(pages)\layout.tsx#default`)},32029:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>a,metadata:()=>i});var o=r(19510),s=r(25384),n=r.n(s);r(5023);let i={title:"BookShelf.com",description:"Created by Nasim"};function a({children:e}){return o.jsx("html",{lang:"en",children:(0,o.jsxs)("body",{className:n().className,children:[o.jsx("link",{rel:"icon",href:"/favicon.jpg",sizes:"any"}),e]})})}},5023:()=>{},23824:()=>{}};var t=require("../../../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),o=t.X(0,[935,54,560],()=>r(46767));module.exports=o})();
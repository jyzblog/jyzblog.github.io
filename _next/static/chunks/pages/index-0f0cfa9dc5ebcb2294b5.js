_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[7],{F9tg:function(e,t,n){e.exports={toc:"content_toc__2UcZA",content:"content_content__2DDsZ",title:"content_title__2hoOr",hashtags:"content_hashtags__V2r4v"}},MbLX:function(e,t,n){"use strict";var c=n("nKUr"),r=(n("q1tI"),n("YFqc")),i=n.n(r),s=n("ZGtG"),o=n.n(s);t.a=function(){return Object(c.jsxs)("nav",{className:o.a.nav,children:[Object(c.jsx)(i.a,{href:"/",as:"/",children:Object(c.jsx)("a",{children:"Home"})})," ","|"," ",Object(c.jsx)(i.a,{href:"/books",as:"/books",children:Object(c.jsx)("a",{children:"Books"})})," ","|"," ",Object(c.jsx)(i.a,{href:"https://medium.com/@jyz",children:Object(c.jsx)("a",{children:"Writings"})})]})}},RNiq:function(e,t,n){"use strict";n.r(t);var c=n("nKUr"),r=n("q1tI"),i=n("MbLX"),s=n("F9tg"),o=n.n(s);t.default=function(){return Object(c.jsxs)(r.Fragment,{children:[Object(c.jsx)(i.a,{}),Object(c.jsxs)("div",{className:o.a.content,children:[Object(c.jsx)("h3",{children:"My interests:"}),Object(c.jsxs)("ul",{children:[Object(c.jsx)("li",{children:"Economics"}),Object(c.jsx)("li",{children:"Psychology"}),Object(c.jsx)("li",{children:"Cryptography"}),Object(c.jsx)("li",{children:"Cybersecurity"}),Object(c.jsx)("li",{children:"Hard sciences"})]}),Object(c.jsx)("h3",{children:"What I've done:"}),Object(c.jsxs)("ul",{children:[Object(c.jsx)("li",{children:"Advised various federal government agencies on modernization & security."}),Object(c.jsx)("li",{children:"Built matching engines, derivatives products, OTC platforms, credit card gateway, aml/kyc pipelines"}),Object(c.jsx)("li",{children:"Dealt with clearing houses, custodians, private banks, shadow banks, dark pools"}),Object(c.jsx)("li",{children:"Bluetooth, wifi protocols, nfc for IoT"}),Object(c.jsx)("li",{children:"Bitcoin: btcd, p2sh, payment channels"}),Object(c.jsx)("li",{children:"Ethereum: core dev in 2014, wrote first node implementation: geth, go-ethereum, cpp-ethereum/aleth"})]}),Object(c.jsx)("h3",{children:"What I do:"}),Object(c.jsxs)("ul",{children:[Object(c.jsx)("li",{children:"Golang, Rust, Node.js, Swift, React / React Native"}),Object(c.jsx)("li",{children:"Exotic/unusual asset classes/commodities"}),Object(c.jsx)("li",{children:"Federal Contracting: Interesting in prime/sub/joint ventures in the areas of modernization, cloud, security"}),Object(c.jsx)("li",{children:"Angel investing: interested in niche businesses with persistent founders. Standard SAFE(yc)/KISS(500) possible"})]}),Object(c.jsx)("h3",{children:"Social:"}),Object(c.jsxs)("ul",{children:[Object(c.jsx)("li",{children:Object(c.jsx)("a",{href:"https://linkedin.com/in/josephyzhou",children:"LinkedIn"})}),Object(c.jsx)("li",{children:Object(c.jsx)("a",{href:"https://twitter.com/josephzhou",children:"Twitter"})})]}),Object(c.jsx)("p",{children:"Thanks for stopping by! - J.Z."})]})]})}},YFqc:function(e,t,n){e.exports=n("cTJO")},ZGtG:function(e,t,n){e.exports={nav:"nav_nav__36Q7g"}},cTJO:function(e,t,n){"use strict";var c=n("J4zp"),r=n("284h");t.__esModule=!0,t.default=void 0;var i,s=r(n("q1tI")),o=n("elyg"),a=n("nOHt"),l=new Map,u=window.IntersectionObserver,d={};var h=function(e,t){var n=i||(u?i=new u((function(e){e.forEach((function(e){if(l.has(e.target)){var t=l.get(e.target);(e.isIntersecting||e.intersectionRatio>0)&&(i.unobserve(e.target),l.delete(e.target),t())}}))}),{rootMargin:"200px"}):void 0);return n?(n.observe(e),l.set(e,t),function(){try{n.unobserve(e)}catch(t){console.error(t)}l.delete(e)}):function(){}};function f(e,t,n,c){(0,o.isLocalURL)(t)&&(e.prefetch(t,n,c).catch((function(e){0})),d[t+"%"+n]=!0)}var j=function(e){var t=!1!==e.prefetch,n=(0,a.useRouter)(),r=n&&n.pathname||"/",i=s.default.useMemo((function(){var t=(0,o.resolveHref)(r,e.href,!0),n=c(t,2),i=n[0],s=n[1];return{href:i,as:e.as?(0,o.resolveHref)(r,e.as):s||i}}),[r,e.href,e.as]),l=i.href,j=i.as,p=e.children,b=e.replace,v=e.shallow,O=e.scroll,x=e.locale;"string"===typeof p&&(p=s.default.createElement("a",null,p));var g=s.Children.only(p),y=g&&"object"===typeof g&&g.ref,m=s.default.useRef(),_={ref:s.default.useCallback((function(e){(m.current&&(m.current(),m.current=void 0),t&&u&&e&&e.tagName&&(0,o.isLocalURL)(l))&&(d[l+"%"+j]||(m.current=h(e,(function(){f(n,l,j,{locale:"undefined"!==typeof x?x:n&&n.locale})}))));y&&("function"===typeof y?y(e):"object"===typeof y&&(y.current=e))}),[t,y,l,j,n,x]),onClick:function(e){g.props&&"function"===typeof g.props.onClick&&g.props.onClick(e),e.defaultPrevented||function(e,t,n,c,r,i,s,a){("A"!==e.currentTarget.nodeName||!function(e){var t=e.currentTarget.target;return t&&"_self"!==t||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)&&(0,o.isLocalURL)(n))&&(e.preventDefault(),null==s&&(s=c.indexOf("#")<0),t[r?"replace":"push"](n,c,{shallow:i,locale:a}).then((function(e){e&&s&&(window.scrollTo(0,0),document.body.focus())})))}(e,n,l,j,b,v,O,x)}};return t&&(_.onMouseEnter=function(e){(0,o.isLocalURL)(l)&&(g.props&&"function"===typeof g.props.onMouseEnter&&g.props.onMouseEnter(e),f(n,l,j,{priority:!0}))}),(e.passHref||"a"===g.type&&!("href"in g.props))&&(_.href=(0,o.addBasePath)((0,o.addLocale)(j,"undefined"!==typeof x?x:n&&n.locale,n&&n.defaultLocale))),s.default.cloneElement(g,_)};t.default=j},vlRD:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n("RNiq")}])}},[["vlRD",0,2,1]]]);
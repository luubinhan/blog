webpackJsonp([5],{"./src/components/Bio/Bio.jsx":function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}function s(e){var t=e.img,a=void 0===t?"":t,l=e.href,s=void 0===l?"":l,n=e.name,r=void 0===n?"":n,c=e.desc,d=void 0===c?"":c;return o.default.createElement("div",{className:"bio"},o.default.createElement("a",{href:s,className:"bio-wrapper"},o.default.createElement("div",{className:"bio-img"},o.default.createElement("img",{src:a,alt:r})),o.default.createElement("div",{className:"bio-content"},o.default.createElement("div",{className:"bio-name"},r),o.default.createElement("div",{className:"bio-desc"},d))))}Object.defineProperty(t,"__esModule",{value:!0}),t.default=s;var n=a("./node_modules/react/react.js"),o=l(n);a("./src/components/Bio/Bio.scss"),e.exports=t.default},"./src/components/Bio/Bio.scss":function(e,t){},"./src/components/Bio/index.js":function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var s=a("./src/components/Bio/Bio.jsx"),n=l(s);t.default=n.default,e.exports=t.default},"./src/components/Link.js":function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}function s(e){var t=e.children,a=e.className,l=e.to;return o.default.createElement(c.default,{className:["link"].concat(a||[]).join(" "),to:l},t)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=s;var n=a("./node_modules/react/react.js"),o=l(n),r=a("./node_modules/gatsby-link/index.js"),c=l(r);e.exports=t.default},"./src/components/PostTags/PostTags.js":function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}function s(e){var t=e.list,a=void 0===t?[]:t;return o.default.createElement("ul",{className:"tag-list"},a.map(function(e){return o.default.createElement("li",{key:e},o.default.createElement(c.default,{to:"/tags/"+e},e))}))}Object.defineProperty(t,"__esModule",{value:!0}),t.default=s;var n=a("./node_modules/react/react.js"),o=l(n),r=a("./node_modules/gatsby-link/index.js"),c=l(r);a("./src/components/PostTags/PostTags.scss"),e.exports=t.default},"./src/components/PostTags/PostTags.scss":function(e,t){},"./src/components/PostTags/index.js":function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var s=a("./src/components/PostTags/PostTags.js"),n=l(s);t.default=n.default,e.exports=t.default},"./src/components/SocialShare/SocialShare.jsx":function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}function s(e){var t=e.href,a=void 0===t?"":t,l=e.title,s=void 0===l?"":l,n=e.excerpt,r=void 0===n?"":n,c=e.img,d=void 0===c?"":c;return o.default.createElement("div",{className:"share-social-component"},o.default.createElement("div",{className:"ssc-label"},"Share"),o.default.createElement("div",{className:"ssc-buttons"},o.default.createElement("div",{className:"social-link-container"},o.default.createElement("a",{target:"_blank",href:"http://www.facebook.com/sharer.php?u="+a+"&ptitle="+s,className:"s-link s-facebook"},o.default.createElement("i",{className:"ion-social-facebook"}),o.default.createElement("span",{className:"s-name"},"Facebook")),o.default.createElement("a",{target:"_blank",href:"http://twitter.com/share?text="+encodeURI(s)+"&url="+a,className:"s-link s-twitter"},o.default.createElement("i",{className:"ion-social-twitter"})," ",o.default.createElement("span",{className:"s-name"},"Twitter")),o.default.createElement("a",{target:"_blank",href:"mailto:?subject="+s+"&amp;body="+a,className:"s-link s-email"},o.default.createElement("i",{className:"ion-android-mail"}),o.default.createElement("span",{className:"s-name"},"Email")))),o.default.createElement("meta",{itemProp:"name",content:s}),o.default.createElement("meta",{itemProp:"description",content:r}),o.default.createElement("meta",{itemProp:"image",content:d}),o.default.createElement("meta",{name:"twitter:title",content:s}),o.default.createElement("meta",{name:"twitter:description",content:r}),o.default.createElement("meta",{name:"twitter:image:src",content:d}),o.default.createElement("meta",{property:"og:title",content:s}),o.default.createElement("meta",{property:"og:type",content:"article"}),o.default.createElement("meta",{property:"og:url",content:a}),o.default.createElement("meta",{property:"og:image",content:d}),o.default.createElement("meta",{property:"og:description",content:r}))}Object.defineProperty(t,"__esModule",{value:!0}),t.default=s;var n=a("./node_modules/react/react.js"),o=l(n),r=a("./node_modules/gatsby-link/index.js");l(r);a("./src/components/SocialShare/SocialShare.scss"),e.exports=t.default},"./src/components/SocialShare/SocialShare.scss":function(e,t){},"./src/components/SocialShare/index.js":function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var s=a("./src/components/SocialShare/SocialShare.jsx"),n=l(s);t.default=n.default,e.exports=t.default},"./src/pages/images/profile.jpg":function(e,t,a){e.exports=a.p+"static/profile.6d410aa2.jpg"},'./node_modules/babel-loader/lib/index.js?{"plugins":["C:/xampp/htdocs/luckyluu/node_modules/gatsby/dist/utils/babel-plugin-extract-graphql.js","C:/xampp/htdocs/luckyluu/node_modules/babel-plugin-add-module-exports/lib/index.js","C:/xampp/htdocs/luckyluu/node_modules/babel-plugin-add-module-exports/lib/index.js","C:/xampp/htdocs/luckyluu/node_modules/babel-plugin-transform-object-assign/lib/index.js"],"presets":["C:/xampp/htdocs/luckyluu/node_modules/babel-preset-env/lib/index.js","C:/xampp/htdocs/luckyluu/node_modules/babel-preset-stage-0/lib/index.js","C:/xampp/htdocs/luckyluu/node_modules/babel-preset-react/lib/index.js"],"cacheDirectory":true}!./src/templates/blog-post.js':function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}function s(e){var t=e.data,a=e.pathContext,l=t.markdownRemark,s=a.next,n=a.prev;return o.default.createElement("div",null,o.default.createElement("div",{className:"single-post-container"},o.default.createElement(c.default,{title:"FrontEnd Developer - "+l.frontmatter.title}),o.default.createElement("h1",{className:"single-post-title"},l.frontmatter.title),o.default.createElement("div",{className:"social-media-bar"},o.default.createElement(p.default,{href:l.frontmatter.path,title:l.frontmatter.title,excerpt:l.frontmatter.desc})),o.default.createElement("div",{className:"blog-post"},o.default.createElement("div",{className:"post-content",dangerouslySetInnerHTML:{__html:l.html}})),o.default.createElement(m.default,{list:l.frontmatter.tags||[]}),o.default.createElement(E.default,{name:"LuckyLuu",desc:"Front-End Developer live in Ho Chi Minh City, a photography geek, and a music lover",href:"anluu.com",img:v.default})),o.default.createElement("div",{className:"section section-below-post"},o.default.createElement("div",{className:"inner"},o.default.createElement("div",{className:"container"},o.default.createElement("div",{className:"read-next"},s&&o.default.createElement(u.default,{className:"read-next-story",to:s.frontmatter.path},o.default.createElement("section",{className:"post"},o.default.createElement("span",{className:"read-this-next"},"Read this next"),o.default.createElement("h2",null,s.frontmatter.title))),n&&o.default.createElement(u.default,{className:"read-next-story prev",to:n.frontmatter.path},o.default.createElement("section",{className:"post"},o.default.createElement("span",{className:"you-might-enjoy"},"You might enjoy"),o.default.createElement("h2",null,n.frontmatter.title))))))))}Object.defineProperty(t,"__esModule",{value:!0}),t.pageQuery=void 0,t.default=s;var n=a("./node_modules/react/react.js"),o=l(n),r=a("./node_modules/react-helmet/lib/Helmet.js"),c=l(r),d=a("./src/components/Link.js"),u=l(d),i=a("./src/components/PostTags/index.js"),m=l(i),f=a("./src/components/SocialShare/index.js"),p=l(f),g=a("./src/components/Bio/index.js"),E=l(g),b=(a("./src/data/data.js"),a("./src/pages/images/profile.jpg")),v=l(b);t.pageQuery="** extracted graphql fragment **"}});
//# sourceMappingURL=page-component---src-templates-blog-post-js-cb79def9a546402489b3.js.map
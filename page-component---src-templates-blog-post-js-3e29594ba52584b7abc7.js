webpackJsonp([4],{"./src/components/Bio/Bio.jsx":function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function o(e){var t=e.img,a=void 0===t?"":t,n=e.href,o=void 0===n?"":n,s=e.name,r=void 0===s?"":s,c=e.desc,i=void 0===c?"":c;return l.default.createElement("div",{className:"bio"},l.default.createElement("a",{href:o,className:"bio-wrapper"},l.default.createElement("div",{className:"bio-img"},l.default.createElement("img",{src:a,alt:r})),l.default.createElement("div",{className:"bio-content"},l.default.createElement("div",{className:"bio-name"},r),l.default.createElement("div",{className:"bio-desc"},i))))}Object.defineProperty(t,"__esModule",{value:!0}),t.default=o;var s=a("./node_modules/react/react.js"),l=n(s);a("./src/components/Bio/Bio.scss"),e.exports=t.default},"./src/components/Bio/Bio.scss":function(e,t){},"./src/components/Bio/index.js":function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=a("./src/components/Bio/Bio.jsx"),s=n(o);t.default=s.default,e.exports=t.default},"./src/components/Link.js":function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function o(e){var t=e.children,a=e.className,n=e.to;return l.default.createElement(c.default,{className:["link"].concat(a||[]).join(" "),to:n},t)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=o;var s=a("./node_modules/react/react.js"),l=n(s),r=a("./node_modules/gatsby-link/index.js"),c=n(r);e.exports=t.default},"./src/components/PostTags/PostTags.js":function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function o(e){var t=e.list,a=void 0===t?[]:t;return l.default.createElement("ul",{className:"tag-list"},a.map(function(e){return l.default.createElement("li",{key:e},l.default.createElement(c.default,{to:"/tags/"+e},e))}))}Object.defineProperty(t,"__esModule",{value:!0}),t.default=o;var s=a("./node_modules/react/react.js"),l=n(s),r=a("./node_modules/gatsby-link/index.js"),c=n(r);a("./src/components/PostTags/PostTags.scss"),e.exports=t.default},"./src/components/PostTags/PostTags.scss":function(e,t){},"./src/components/PostTags/index.js":function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=a("./src/components/PostTags/PostTags.js"),s=n(o);t.default=s.default,e.exports=t.default},"./src/components/SocialShare/SocialShare.jsx":function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function o(e){var t=e.href,a=void 0===t?"":t,n=e.title,o=void 0===n?"":n,s=e.excerpt,r=void 0===s?"":s,c=e.img,i=void 0===c?"":c;return l.default.createElement("div",{className:"share-social-component"},l.default.createElement("div",{className:"ssc-label"},"Share"),l.default.createElement("div",{className:"ssc-buttons"},l.default.createElement("div",{className:"social-link-container"},l.default.createElement("a",{target:"_blank",href:"http://www.facebook.com/sharer.php?u="+a+"&ptitle="+o,className:"s-link s-facebook"},l.default.createElement("i",{className:"ion-social-facebook"}),l.default.createElement("span",{className:"s-name"},"Facebook")),l.default.createElement("a",{target:"_blank",href:"http://twitter.com/share?text="+encodeURI(o)+"&url="+a,className:"s-link s-twitter"},l.default.createElement("i",{className:"ion-social-twitter"})," ",l.default.createElement("span",{className:"s-name"},"Twitter")),l.default.createElement("a",{target:"_blank",href:"mailto:?subject="+o+"&amp;body="+a,className:"s-link s-email"},l.default.createElement("i",{className:"ion-android-mail"}),l.default.createElement("span",{className:"s-name"},"Email")))),l.default.createElement("meta",{itemProp:"name",content:o}),l.default.createElement("meta",{itemProp:"description",content:r}),l.default.createElement("meta",{itemProp:"image",content:i}),l.default.createElement("meta",{name:"twitter:title",content:o}),l.default.createElement("meta",{name:"twitter:description",content:r}),l.default.createElement("meta",{name:"twitter:image:src",content:i}),l.default.createElement("meta",{property:"og:title",content:o}),l.default.createElement("meta",{property:"og:type",content:"article"}),l.default.createElement("meta",{property:"og:url",content:a}),l.default.createElement("meta",{property:"og:image",content:i}),l.default.createElement("meta",{property:"og:description",content:r}))}Object.defineProperty(t,"__esModule",{value:!0}),t.default=o;var s=a("./node_modules/react/react.js"),l=n(s),r=a("./node_modules/gatsby-link/index.js");n(r);a("./src/components/SocialShare/SocialShare.scss"),e.exports=t.default},"./src/components/SocialShare/SocialShare.scss":function(e,t){},"./src/components/SocialShare/index.js":function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=a("./src/components/SocialShare/SocialShare.jsx"),s=n(o);t.default=s.default,e.exports=t.default},"./src/pages/images/profile.jpg":function(e,t,a){e.exports=a.p+"static/profile.77e132d4.jpg"},"./src/styles/prism.css":function(e,t,a){t=e.exports=a("./node_modules/css-loader/lib/css-base.js")(),t.push([e.id,"code[class*=language-],pre[class*=language-]{color:#f8f8f2;background:none;text-shadow:0 1px rgba(0,0,0,.3);font-family:Roboto Mono,Consolas,Monaco,Andale Mono,Ubuntu Mono,monospace;text-align:left;white-space:pre;word-spacing:normal;word-break:normal;word-wrap:normal;line-height:1.5;-moz-tab-size:4;-o-tab-size:4;tab-size:4;-webkit-hyphens:none;-moz-hyphens:none;-ms-hyphens:none;hyphens:none}pre[class*=language-]{padding:1em;margin:.5em 0;overflow:auto;border-radius:.3em}:not(pre)>code[class*=language-],pre[class*=language-]{background:#272822}:not(pre)>code[class*=language-]{padding:.1em;border-radius:.3em;white-space:normal}.token.cdata,.token.comment,.token.doctype,.token.prolog{color:#708090}.token.punctuation{color:#f8f8f2}.namespace{opacity:.7}.token.constant,.token.deleted,.token.property,.token.symbol,.token.tag{color:#f92672}.token.boolean,.token.number{color:#ae81ff}.token.attr-name,.token.builtin,.token.char,.token.inserted,.token.selector,.token.string{color:#a6e22e}.language-css .token.string,.style .token.string,.token.entity,.token.operator,.token.url,.token.variable{color:#f8f8f2}.token.atrule,.token.attr-value,.token.function{color:#e6db74}.token.keyword{color:#66d9ef}.token.important,.token.regex{color:#fd971f}.token.bold,.token.important{font-weight:700}.token.italic{font-style:italic}.token.entity{cursor:help}",""])},'./node_modules/babel-loader/lib/index.js?{"plugins":["C:/xampp/htdocs/luckyluu/node_modules/gatsby/dist/utils/babel-plugin-extract-graphql.js","C:/xampp/htdocs/luckyluu/node_modules/babel-plugin-add-module-exports/lib/index.js","C:/xampp/htdocs/luckyluu/node_modules/babel-plugin-add-module-exports/lib/index.js","C:/xampp/htdocs/luckyluu/node_modules/babel-plugin-transform-object-assign/lib/index.js"],"presets":["C:/xampp/htdocs/luckyluu/node_modules/babel-preset-env/lib/index.js","C:/xampp/htdocs/luckyluu/node_modules/babel-preset-stage-0/lib/index.js","C:/xampp/htdocs/luckyluu/node_modules/babel-preset-react/lib/index.js"],"cacheDirectory":true}!./src/templates/blog-post.js':function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function o(e){var t=e.data,a=e.pathContext,n=t.markdownRemark,o=a.next,s=a.prev;return l.default.createElement("div",{className:"single-post"},l.default.createElement(c.default,{title:"Blog - "+n.frontmatter.title}),l.default.createElement("div",{className:"single-post-container"},l.default.createElement("h1",{className:"single-post-title"},n.frontmatter.title),l.default.createElement("div",{className:"social-media-bar"},l.default.createElement(p.default,{href:n.frontmatter.path,title:n.frontmatter.title,excerpt:n.frontmatter.desc})),l.default.createElement("div",{className:"blog-post"},l.default.createElement("div",{className:"post-content",dangerouslySetInnerHTML:{__html:n.html}})),l.default.createElement(m.default,{list:n.frontmatter.tags||[]}),l.default.createElement(b.default,{name:"luckyluu",desc:"Front-End Developer live in Ho Chi Minh City, a photography geek, and a music lover",href:"anluu.com",img:k.default})),l.default.createElement("div",{className:"section section-below-post"},l.default.createElement("div",{className:"inner"},l.default.createElement("div",{className:"read-next"},o&&l.default.createElement(d.default,{className:"read-next-story",to:o.frontmatter.path},l.default.createElement("section",{className:"post"},l.default.createElement("span",{className:"read-this-next"},"Đọc Tiếp"),l.default.createElement("h2",null,o.frontmatter.title))),s&&l.default.createElement(d.default,{className:"read-next-story prev",to:s.frontmatter.path},l.default.createElement("section",{className:"post"},l.default.createElement("span",{className:"you-might-enjoy"},"Đọc Tiếp"),l.default.createElement("h2",null,s.frontmatter.title)))))))}Object.defineProperty(t,"__esModule",{value:!0}),t.pageQuery=void 0,t.default=o;var s=a("./node_modules/react/react.js"),l=n(s),r=a("./node_modules/react-helmet/lib/Helmet.js"),c=n(r),i=a("./src/components/Link.js"),d=n(i),u=a("./src/components/PostTags/index.js"),m=n(u),f=a("./src/components/SocialShare/index.js"),p=n(f),g=a("./src/components/Bio/index.js"),b=n(g),h=(a("./src/data/data.js"),a("./src/pages/images/profile.jpg")),k=n(h),v=a("./src/components/Header/index.js"),E=(n(v),a("./src/components/Navigation/index.js")),x=(n(E),a("./src/pages/images/logo.png"));n(x);a("./src/styles/prism.css");t.pageQuery="** extracted graphql fragment **"}});
//# sourceMappingURL=page-component---src-templates-blog-post-js-3e29594ba52584b7abc7.js.map
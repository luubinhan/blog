webpackJsonp([2],{"./node_modules/lodash/_Hash.js":function(e,t,o){function s(e){var t=-1,o=null==e?0:e.length;for(this.clear();++t<o;){var s=e[t];this.set(s[0],s[1])}}var n=o("./node_modules/lodash/_hashClear.js"),a=o("./node_modules/lodash/_hashDelete.js"),r=o("./node_modules/lodash/_hashGet.js"),l=o("./node_modules/lodash/_hashHas.js"),u=o("./node_modules/lodash/_hashSet.js");s.prototype.clear=n,s.prototype.delete=a,s.prototype.get=r,s.prototype.has=l,s.prototype.set=u,e.exports=s},"./node_modules/lodash/_ListCache.js":function(e,t,o){function s(e){var t=-1,o=null==e?0:e.length;for(this.clear();++t<o;){var s=e[t];this.set(s[0],s[1])}}var n=o("./node_modules/lodash/_listCacheClear.js"),a=o("./node_modules/lodash/_listCacheDelete.js"),r=o("./node_modules/lodash/_listCacheGet.js"),l=o("./node_modules/lodash/_listCacheHas.js"),u=o("./node_modules/lodash/_listCacheSet.js");s.prototype.clear=n,s.prototype.delete=a,s.prototype.get=r,s.prototype.has=l,s.prototype.set=u,e.exports=s},"./node_modules/lodash/_Map.js":function(e,t,o){var s=o("./node_modules/lodash/_getNative.js"),n=o("./node_modules/lodash/_root.js"),a=s(n,"Map");e.exports=a},"./node_modules/lodash/_MapCache.js":function(e,t,o){function s(e){var t=-1,o=null==e?0:e.length;for(this.clear();++t<o;){var s=e[t];this.set(s[0],s[1])}}var n=o("./node_modules/lodash/_mapCacheClear.js"),a=o("./node_modules/lodash/_mapCacheDelete.js"),r=o("./node_modules/lodash/_mapCacheGet.js"),l=o("./node_modules/lodash/_mapCacheHas.js"),u=o("./node_modules/lodash/_mapCacheSet.js");s.prototype.clear=n,s.prototype.delete=a,s.prototype.get=r,s.prototype.has=l,s.prototype.set=u,e.exports=s},"./node_modules/lodash/_assocIndexOf.js":function(e,t,o){function s(e,t){for(var o=e.length;o--;)if(n(e[o][0],t))return o;return-1}var n=o("./node_modules/lodash/eq.js");e.exports=s},"./node_modules/lodash/_baseGet.js":function(e,t,o){function s(e,t){t=n(t,e);for(var o=0,s=t.length;null!=e&&o<s;)e=e[a(t[o++])];return o&&o==s?e:void 0}var n=o("./node_modules/lodash/_castPath.js"),a=o("./node_modules/lodash/_toKey.js");e.exports=s},"./node_modules/lodash/_baseIsNative.js":function(e,t,o){function s(e){if(!r(e)||a(e))return!1;var t=n(e)?_:d;return t.test(l(e))}var n=o("./node_modules/lodash/isFunction.js"),a=o("./node_modules/lodash/_isMasked.js"),r=o("./node_modules/lodash/isObject.js"),l=o("./node_modules/lodash/_toSource.js"),u=/[\\^$.*+?()[\]{}|]/g,d=/^\[object .+?Constructor\]$/,i=Function.prototype,c=Object.prototype,f=i.toString,p=c.hasOwnProperty,_=RegExp("^"+f.call(p).replace(u,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");e.exports=s},"./node_modules/lodash/_castPath.js":function(e,t,o){function s(e,t){return n(e)?e:a(e,t)?[e]:r(l(e))}var n=o("./node_modules/lodash/isArray.js"),a=o("./node_modules/lodash/_isKey.js"),r=o("./node_modules/lodash/_stringToPath.js"),l=o("./node_modules/lodash/toString.js");e.exports=s},"./node_modules/lodash/_coreJsData.js":function(e,t,o){var s=o("./node_modules/lodash/_root.js"),n=s["__core-js_shared__"];e.exports=n},"./node_modules/lodash/_getMapData.js":function(e,t,o){function s(e,t){var o=e.__data__;return n(t)?o["string"==typeof t?"string":"hash"]:o.map}var n=o("./node_modules/lodash/_isKeyable.js");e.exports=s},"./node_modules/lodash/_getNative.js":function(e,t,o){function s(e,t){var o=a(e,t);return n(o)?o:void 0}var n=o("./node_modules/lodash/_baseIsNative.js"),a=o("./node_modules/lodash/_getValue.js");e.exports=s},"./node_modules/lodash/_getValue.js":function(e,t){function o(e,t){return null==e?void 0:e[t]}e.exports=o},"./node_modules/lodash/_hashClear.js":function(e,t,o){function s(){this.__data__=n?n(null):{},this.size=0}var n=o("./node_modules/lodash/_nativeCreate.js");e.exports=s},"./node_modules/lodash/_hashDelete.js":function(e,t){function o(e){var t=this.has(e)&&delete this.__data__[e];return this.size-=t?1:0,t}e.exports=o},"./node_modules/lodash/_hashGet.js":function(e,t,o){function s(e){var t=this.__data__;if(n){var o=t[e];return o===a?void 0:o}return l.call(t,e)?t[e]:void 0}var n=o("./node_modules/lodash/_nativeCreate.js"),a="__lodash_hash_undefined__",r=Object.prototype,l=r.hasOwnProperty;e.exports=s},"./node_modules/lodash/_hashHas.js":function(e,t,o){function s(e){var t=this.__data__;return n?void 0!==t[e]:r.call(t,e)}var n=o("./node_modules/lodash/_nativeCreate.js"),a=Object.prototype,r=a.hasOwnProperty;e.exports=s},"./node_modules/lodash/_hashSet.js":function(e,t,o){function s(e,t){var o=this.__data__;return this.size+=this.has(e)?0:1,o[e]=n&&void 0===t?a:t,this}var n=o("./node_modules/lodash/_nativeCreate.js"),a="__lodash_hash_undefined__";e.exports=s},"./node_modules/lodash/_isKey.js":function(e,t,o){function s(e,t){if(n(e))return!1;var o=typeof e;return!("number"!=o&&"symbol"!=o&&"boolean"!=o&&null!=e&&!a(e))||(l.test(e)||!r.test(e)||null!=t&&e in Object(t))}var n=o("./node_modules/lodash/isArray.js"),a=o("./node_modules/lodash/isSymbol.js"),r=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,l=/^\w*$/;e.exports=s},"./node_modules/lodash/_isKeyable.js":function(e,t){function o(e){var t=typeof e;return"string"==t||"number"==t||"symbol"==t||"boolean"==t?"__proto__"!==e:null===e}e.exports=o},"./node_modules/lodash/_isMasked.js":function(e,t,o){function s(e){return!!a&&a in e}var n=o("./node_modules/lodash/_coreJsData.js"),a=function(){var e=/[^.]+$/.exec(n&&n.keys&&n.keys.IE_PROTO||"");return e?"Symbol(src)_1."+e:""}();e.exports=s},"./node_modules/lodash/_listCacheClear.js":function(e,t){function o(){this.__data__=[],this.size=0}e.exports=o},"./node_modules/lodash/_listCacheDelete.js":function(e,t,o){function s(e){var t=this.__data__,o=n(t,e);if(o<0)return!1;var s=t.length-1;return o==s?t.pop():r.call(t,o,1),--this.size,!0}var n=o("./node_modules/lodash/_assocIndexOf.js"),a=Array.prototype,r=a.splice;e.exports=s},"./node_modules/lodash/_listCacheGet.js":function(e,t,o){function s(e){var t=this.__data__,o=n(t,e);return o<0?void 0:t[o][1]}var n=o("./node_modules/lodash/_assocIndexOf.js");e.exports=s},"./node_modules/lodash/_listCacheHas.js":function(e,t,o){function s(e){return n(this.__data__,e)>-1}var n=o("./node_modules/lodash/_assocIndexOf.js");e.exports=s},"./node_modules/lodash/_listCacheSet.js":function(e,t,o){function s(e,t){var o=this.__data__,s=n(o,e);return s<0?(++this.size,o.push([e,t])):o[s][1]=t,this}var n=o("./node_modules/lodash/_assocIndexOf.js");e.exports=s},"./node_modules/lodash/_mapCacheClear.js":function(e,t,o){function s(){this.size=0,this.__data__={hash:new n,map:new(r||a),string:new n}}var n=o("./node_modules/lodash/_Hash.js"),a=o("./node_modules/lodash/_ListCache.js"),r=o("./node_modules/lodash/_Map.js");e.exports=s},"./node_modules/lodash/_mapCacheDelete.js":function(e,t,o){function s(e){var t=n(this,e).delete(e);return this.size-=t?1:0,t}var n=o("./node_modules/lodash/_getMapData.js");e.exports=s},"./node_modules/lodash/_mapCacheGet.js":function(e,t,o){function s(e){return n(this,e).get(e)}var n=o("./node_modules/lodash/_getMapData.js");e.exports=s},"./node_modules/lodash/_mapCacheHas.js":function(e,t,o){function s(e){return n(this,e).has(e)}var n=o("./node_modules/lodash/_getMapData.js");e.exports=s},"./node_modules/lodash/_mapCacheSet.js":function(e,t,o){function s(e,t){var o=n(this,e),s=o.size;return o.set(e,t),this.size+=o.size==s?0:1,this}var n=o("./node_modules/lodash/_getMapData.js");e.exports=s},"./node_modules/lodash/_memoizeCapped.js":function(e,t,o){function s(e){var t=n(e,function(e){return o.size===a&&o.clear(),e}),o=t.cache;return t}var n=o("./node_modules/lodash/memoize.js"),a=500;e.exports=s},"./node_modules/lodash/_nativeCreate.js":function(e,t,o){var s=o("./node_modules/lodash/_getNative.js"),n=s(Object,"create");e.exports=n},"./node_modules/lodash/_stringToPath.js":function(e,t,o){var s=o("./node_modules/lodash/_memoizeCapped.js"),n=/^\./,a=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,r=/\\(\\)?/g,l=s(function(e){var t=[];return n.test(e)&&t.push(""),e.replace(a,function(e,o,s,n){t.push(s?n.replace(r,"$1"):o||e)}),t});e.exports=l},"./node_modules/lodash/_toKey.js":function(e,t,o){function s(e){if("string"==typeof e||n(e))return e;var t=e+"";return"0"==t&&1/e==-a?"-0":t}var n=o("./node_modules/lodash/isSymbol.js"),a=1/0;e.exports=s},"./node_modules/lodash/_toSource.js":function(e,t){function o(e){if(null!=e){try{return n.call(e)}catch(e){}try{return e+""}catch(e){}}return""}var s=Function.prototype,n=s.toString;e.exports=o},"./node_modules/lodash/eq.js":function(e,t){function o(e,t){return e===t||e!==e&&t!==t}e.exports=o},"./node_modules/lodash/get.js":function(e,t,o){function s(e,t,o){var s=null==e?void 0:n(e,t);return void 0===s?o:s}var n=o("./node_modules/lodash/_baseGet.js");e.exports=s},"./node_modules/lodash/isFunction.js":function(e,t,o){function s(e){if(!a(e))return!1;var t=n(e);return t==l||t==u||t==r||t==d}var n=o("./node_modules/lodash/_baseGetTag.js"),a=o("./node_modules/lodash/isObject.js"),r="[object AsyncFunction]",l="[object Function]",u="[object GeneratorFunction]",d="[object Proxy]";e.exports=s},"./node_modules/lodash/isObject.js":function(e,t){function o(e){var t=typeof e;return null!=e&&("object"==t||"function"==t)}e.exports=o},"./node_modules/lodash/memoize.js":function(e,t,o){function s(e,t){if("function"!=typeof e||null!=t&&"function"!=typeof t)throw new TypeError(a);var o=function(){var s=arguments,n=t?t.apply(this,s):s[0],a=o.cache;if(a.has(n))return a.get(n);var r=e.apply(this,s);return o.cache=a.set(n,r)||a,r};return o.cache=new(s.Cache||n),o}var n=o("./node_modules/lodash/_MapCache.js"),a="Expected a function";s.Cache=n,e.exports=s},"./src/components/ContentPost/ContentPost.jsx":function(e,t,o){"use strict";function s(e){return e&&e.__esModule?e:{default:e}}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function r(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=function(){function e(e,t){for(var o=0;o<t.length;o++){var s=t[o];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}return function(t,o,s){return o&&e(t.prototype,o),s&&e(t,s),t}}(),u=o("./node_modules/react/react.js"),d=s(u),i=o("./node_modules/prop-types/index.js"),c=s(i),f=o("./node_modules/gatsby-link/index.js"),p=s(f),_=o("./src/components/PostMeta/index.js"),m=s(_);o("./src/components/ContentPost/ContentPost.scss");var h=function(e){function t(e){return n(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))}return r(t,e),l(t,[{key:"render",value:function(){var e=this.props,t=(e.id,e.title),o=e.desc,s=e.href,n=e.img,a=e.date,r=e.tags;return d.default.createElement("div",{className:"mystyle-item-post"},d.default.createElement("article",{className:"item-post clearfix ",itemType:"http://schema.org/NewsArticle"},n&&d.default.createElement("figure",{className:"the-post-thumbnail","aria-label":"media",role:"group",itemProp:"associatedMedia",itemID:n,itemType:"http://schema.org/ImageObject"},d.default.createElement(p.default,{to:s},d.default.createElement("img",{src:n,alt:t,itemProp:"thumbnailUrl"}))),d.default.createElement("section",{className:"the-post-content"},d.default.createElement("header",{className:"heading-post",itemProp:"headline"},d.default.createElement(p.default,{to:s},t)),""!==o&&d.default.createElement("footer",{className:"post-excert",itemProp:"description"},o),d.default.createElement(m.default,{datetime:a,tags:r}))))}}]),t}(u.Component);h.propTypes={title:c.default.string.isRequired,desc:c.default.string,href:c.default.string.isRequired,img:c.default.string,date:c.default.string,tags:c.default.array},h.defaultProps={desc:"",date:"",img:""},t.default=h,e.exports=t.default},"./src/components/ContentPost/ContentPost.scss":function(e,t){},"./src/components/ContentPost/index.js":function(e,t,o){"use strict";function s(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n=o("./src/components/ContentPost/ContentPost.jsx"),a=s(n);t.default=a.default,e.exports=t.default},"./src/components/HomeHero/HomeHero.jsx":function(e,t,o){"use strict";function s(e){return e&&e.__esModule?e:{default:e}}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function r(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=function(){function e(e,t){for(var o=0;o<t.length;o++){var s=t[o];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}return function(t,o,s){return o&&e(t.prototype,o),s&&e(t,s),t}}(),u=o("./node_modules/react/react.js"),d=s(u),i=o("./node_modules/prop-types/index.js"),c=s(i),f=o("./node_modules/gatsby-link/index.js");s(f);o("./src/components/HomeHero/HomeHero.scss");var p=function(e){function t(e){return n(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))}return r(t,e),l(t,[{key:"render",value:function(){var e=this.props,t=e.title,o=e.desc,s=e.linkTo,n=e.linkTitle,a=e.actionTo,r=e.actionTitle,l=e.img;return d.default.createElement("div",{className:"section home-hero hero-"+t.toLowerCase().trim().replace(" ","-")},d.default.createElement("div",{className:"inner"},d.default.createElement("div",{className:"js-height-full",style:{backgroundImage:"url("+l+")"}},d.default.createElement("div",{className:"home-text"},d.default.createElement("div",{className:"home-wrap"},d.default.createElement("h1",{className:"hero-title"},t),""!==o&&d.default.createElement("div",{className:"hero-desc"},o),d.default.createElement("div",{className:"local-scroll"},""!==s&&d.default.createElement("a",{href:s,className:"btn btn-primary"},n),""!==a&&d.default.createElement("a",{href:a,className:"btn btn-default",target:"_blank"},r)))))))}}]),t}(u.Component);p.propTypes={title:c.default.string.isRequired,desc:c.default.string,linkTo:c.default.string,linkTitle:c.default.string,actionTo:c.default.string,actionTitle:c.default.string,img:c.default.string},p.defaultProps={desc:"",linkTo:"",linkTitle:"",actionTo:"",actionTitle:"",img:null},t.default=p,e.exports=t.default},"./src/components/HomeHero/HomeHero.scss":function(e,t){},"./src/components/HomeHero/index.js":function(e,t,o){"use strict";function s(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n=o("./src/components/HomeHero/HomeHero.jsx"),a=s(n);t.default=a.default,e.exports=t.default},"./src/components/PostTags/PostTags.js":function(e,t,o){"use strict";function s(e){return e&&e.__esModule?e:{default:e}}function n(e){var t=e.list,o=void 0===t?[]:t;return r.default.createElement("ul",{className:"tag-list"},o.map(function(e){return r.default.createElement("li",{key:e},r.default.createElement(u.default,{to:"/tags/"+e},e))}))}Object.defineProperty(t,"__esModule",{value:!0}),t.default=n;var a=o("./node_modules/react/react.js"),r=s(a),l=o("./node_modules/gatsby-link/index.js"),u=s(l);o("./src/components/PostTags/PostTags.scss"),e.exports=t.default},"./src/components/PostTags/PostTags.scss":function(e,t){},"./src/components/PostTags/index.js":function(e,t,o){"use strict";function s(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n=o("./src/components/PostTags/PostTags.js"),a=s(n);t.default=a.default,e.exports=t.default},"./src/components/Widget/Widget.jsx":function(e,t,o){"use strict";function s(e){return e&&e.__esModule?e:{default:e}}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function r(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=function(){function e(e,t){for(var o=0;o<t.length;o++){var s=t[o];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}return function(t,o,s){return o&&e(t.prototype,o),s&&e(t,s),t}}(),u=o("./node_modules/react/react.js"),d=s(u),i=o("./node_modules/prop-types/index.js"),c=s(i),f=o("./node_modules/gatsby-link/index.js"),p=s(f);o("./src/components/Widget/Widget.scss");var _=function(e){function t(e){n(this,t);var o=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return o.state={isCollapsed:!1},o._changeCollapse=o._changeCollapse.bind(o),o}return r(t,e),l(t,[{key:"_changeCollapse",value:function(){this.setState({isCollapsed:!this.state.isCollapsed})}},{key:"componentWillMount",value:function(){this.setState({activeState:this.props.active})}},{key:"render",value:function(){var e=this.props,t=e.title,o=e.showToggle,s=e.href,n=this.state.isCollapsed;return d.default.createElement("div",{className:"widget-container widget-"+t.trim().toLowerCase().replace(" ","-")},d.default.createElement("div",{className:"inner"},t&&d.default.createElement("h3",{className:"widget-title"},""!==s?d.default.createElement(p.default,{to:s},t):d.default.createElement("span",null,t),o&&d.default.createElement("span",{className:"wiget-toggle-control "+(n?"collapsed":""),onClick:this._changeCollapse},d.default.createElement("i",{className:"ms-Icon ms-Icon--ChevronUp"}))),!n&&d.default.createElement("div",{className:"widget-body"},this.props.children)))}}]),t}(u.Component);_.propTypes={showToggle:c.default.bool,title:c.default.string,href:c.default.string},_.defaultProps={showToggle:!1,href:""},t.default=_,e.exports=t.default},"./src/components/Widget/Widget.scss":function(e,t){},"./src/components/Widget/index.js":function(e,t,o){"use strict";function s(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n=o("./src/components/Widget/Widget.jsx"),a=s(n);t.default=a.default,e.exports=t.default},"./src/pages/images/cover3.jpg":function(e,t,o){e.exports=o.p+"static/cover3.1c81e455.jpg"},'./node_modules/babel-loader/lib/index.js?{"presets":["E:/anluu/luckyluu/node_modules/babel-preset-es2015/lib/index.js","E:/anluu/luckyluu/node_modules/babel-preset-react/lib/index.js","E:/anluu/luckyluu/node_modules/babel-preset-stage-2/lib/index.js","E:/anluu/luckyluu/node_modules/babel-preset-env/lib/index.js","E:/anluu/luckyluu/node_modules/babel-preset-stage-0/lib/index.js","E:/anluu/luckyluu/node_modules/babel-preset-react/lib/index.js"],"plugins":["E:/anluu/luckyluu/node_modules/gatsby/dist/utils/babel-plugin-extract-graphql.js","E:/anluu/luckyluu/node_modules/babel-plugin-add-module-exports/lib/index.js","E:/anluu/luckyluu/node_modules/babel-plugin-add-module-exports/lib/index.js","E:/anluu/luckyluu/node_modules/babel-plugin-transform-object-assign/lib/index.js"],"cacheDirectory":true}!./src/pages/index.js':function(e,t,o){"use strict";function s(e){return e&&e.__esModule?e:{default:e}}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function r(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.pageQuery=void 0;var l=function(){function e(e,t){for(var o=0;o<t.length;o++){var s=t[o];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}return function(t,o,s){return o&&e(t.prototype,o),s&&e(t,s),t}}(),u=o("./node_modules/react/react.js"),d=s(u),i=o("./node_modules/gatsby-link/index.js"),c=(s(i),o("./node_modules/lodash/get.js")),f=s(c),p=o("./node_modules/react-helmet/lib/Helmet.js"),_=s(p),m=o("./src/components/HomeHero/index.js"),h=(s(m),o("./src/components/Widget/index.js")),j=(s(h),o("./src/components/ContentPost/index.js")),g=s(j),y=o("./src/components/PostTags/index.js"),v=(s(y),o("./src/pages/images/cover3.jpg")),b=(s(v),o("./src/data/index.js")),x=o("./src/pages/images/logo.png"),C=(s(x),o("./src/components/Navigation/index.js")),E=(s(C),o("./src/components/Header/index.js")),O=(s(E),function(e){function t(e){n(this,t);var o=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return o.state={sideBg:""},o}return r(t,e),l(t,[{key:"getRandomArbitrary",value:function(e){return Math.floor(Math.random()*e+1)}},{key:"componentWillMount",value:function(){var e=this.getRandomArbitrary(b.BG_SIDEBAR.length-1),t=b.BG_SIDEBAR[e];this.setState({sideBg:t})}},{key:"render",value:function(){var e=((0,f.default)(this,"props.data.site.siteMetadata.title"),(0,f.default)(this,"props.data.allMarkdownRemark.edges"));return d.default.createElement("div",{className:"master"},d.default.createElement("div",{className:"inner"},d.default.createElement("div",{className:"page page-home"},d.default.createElement(_.default,{title:"Home "+b.SITE_CONFIG.companyName+" | "+b.SITE_CONFIG.tagLine,meta:[{name:"description",content:b.SITE_CONFIG.companyName+" "+b.SITE_CONFIG.tagLine},{name:"keywords",content:"frontend,developer,wordpress,react,hochiminh,web-developer"}]}),e.length&&d.default.createElement("div",{className:"posts-list"},e.map(function(e,t){if("/404/"!==e.node.path){var o=(0,f.default)(e,"node.frontmatter.title")||e.node.path;return d.default.createElement(g.default,{key:t,title:o,desc:e.node.frontmatter.desc,date:e.node.frontmatter.date,href:e.node.frontmatter.path,tags:e.node.frontmatter.tags})}})))),d.default.createElement("div",{className:"aside",style:{backgroundImage:"url("+this.state.sideBg+")"}}))}}]),t}(d.default.Component));O.propTypes={route:d.default.PropTypes.object},t.default=O;t.pageQuery="** extracted graphql fragment **"}});
//# sourceMappingURL=page-component---src-pages-index-js-dd6b9cdc40b9dc6158a0.js.map
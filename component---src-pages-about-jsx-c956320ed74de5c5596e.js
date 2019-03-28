webpackJsonp([0x83323ebd9d39],{234:function(e,t){"use strict";t.__esModule=!0;t.bgSidebar=["https://luubinhan.github.io/blog/images/bg6.jpg","https://luubinhan.github.io/blog/images/bg7.jpg","https://luubinhan.github.io/blog/images/bg8.jpg","https://luubinhan.github.io/blog/images/bg9.jpg","https://luubinhan.github.io/blog/images/bg10.jpg","https://luubinhan.github.io/blog/images/bg12.jpg","https://luubinhan.github.io/blog/images/bg13.jpg","https://luubinhan.github.io/blog/images/bg14.jpg","https://luubinhan.github.io/blog/images/bg15.jpg","https://luubinhan.github.io/blog/images/bg16.jpg","https://luubinhan.github.io/blog/images/bg17.jpg","https://luubinhan.github.io/blog/images/bg18.jpg","https://luubinhan.github.io/blog/images/bg19.jpg","https://luubinhan.github.io/blog/images/bg20.jpg","https://luubinhan.github.io/blog/images/bg21.jpg","https://luubinhan.github.io/blog/images/bg22.jpg"],t.PrimaryNav=[{name:"Javascript",href:"/tags/javascript",isActive:!1,icon:"javascript"},{name:"React",href:"/tags/react",isActive:!1,icon:"nodejs"},{name:"React native",href:"/tags/react-native",isActive:!1,icon:"react-native"},{name:"Vue",href:"/tags/vuejs",isActive:!1,icon:"vue"},{name:"HTML/CSS",href:"/tags/css",isActive:!1,icon:"html5"},{name:"UX/UI",href:"/tags/ux-ui",isActive:!1,icon:"compass"},{name:"Liên hệ",href:"/about",isActive:!1,icon:"send"}]},558:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}function l(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function c(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}t.__esModule=!0;var u=n(1),r=a(u),s=n(196),o=a(s),h=n(350),g=n(123),m=a(g),d=n(234),b=function(e){function t(n){l(this,t);var a=i(this,e.call(this,n));return a.renderIcon=function(e){switch(e){case"github":return r.default.createElement(h.IoSocialGithub,null);case"linkedin":return r.default.createElement(h.IoSocialLinkedin,null);case"twitter":return r.default.createElement(h.IoSocialTwitter,null);default:return null}},a.state={selectedTab:1},a.handleSelect=a.handleSelect.bind(a),a}return c(t,e),t.prototype.handleSelect=function(e){this.setState({selectedTab:e})},t.prototype.render=function(){var e=this;return r.default.createElement("div",{className:"master"},r.default.createElement(o.default,{title:m.default.siteTitle,meta:[{name:"description",content:m.default.siteTitle+" "+m.default.siteTitleAlt},{name:"keywords",content:"frontend,developer,wordpress,react,hochiminh,web-developer"}]}),r.default.createElement("main",{className:"inner"},r.default.createElement("div",{className:"page-about"},r.default.createElement("div",{className:"about-header"},r.default.createElement("div",{className:"hero-profile"},r.default.createElement("div",{className:"profile-block"},r.default.createElement("div",{className:"profile-desc"},r.default.createElement("table",{className:"reset"},r.default.createElement("tbody",null,r.default.createElement("tr",null,m.default.userLinks.map(function(t){return r.default.createElement("td",{key:t.label},r.default.createElement("div",{className:"pr-30"},r.default.createElement("a",{"aria-label":t.label,title:t.label,className:"link-flex",target:"_blank",rel:"noopener noreferrer",href:t.url},e.renderIcon(t.iconClassName),r.default.createElement("span",{className:"pl-10 "},t.label))))}))))))),r.default.createElement("ul",{className:"nav nav-pills"},r.default.createElement("li",null,r.default.createElement("a",{role:"button","aria-pressed":"false",tabIndex:"0","aria-label":"Vietnamese",title:"Vietnamese",onClick:function(){return e.handleSelect(1)}},"Vietnamese")),r.default.createElement("li",null,r.default.createElement("a",{role:"button","aria-pressed":"false",tabIndex:"0","aria-label":"English",title:"English",onClick:function(){return e.handleSelect(2)}},"English")))),r.default.createElement("div",{className:"about-body"},r.default.createElement("div",{className:"single-post-container"},1===this.state.selectedTab&&r.default.createElement("div",{className:"post-content"},r.default.createElement("article",null,r.default.createElement("div",{className:"blockquote"},r.default.createElement("p",null,"Feel like he  spread the positive energy to people around"),r.default.createElement("small",null,"Trần Thảo Khánh, Designer")),r.default.createElement("div",{className:"blockquote"},r.default.createElement("p",null,"You're one of the best coworkers we have ever worked with"),r.default.createElement("small",null,"Ngô Tú Quỳnh, HR")),r.default.createElement("h2",null,"Phỏng vấn toàn thất bại"),r.default.createElement("p",null,"Sau khi tốt nghiệp đại học Hoa Sen năm 2011, bước chân vào những lần phỏng vấn thất bại liên tiếp. Xin vào ví trí ",r.default.createElement("i",null,"thiết kế web"),' cho một công ty bán nữ trang, với vốn liếng HTML/CSS góp nhặt từ izwebz.com và một vài dự án nhỏ làm trong trường, "mai mắn" được nhận trong ngày phỏng vấn và bị từ chối ngay hôm sau vì "anh cần người biết vẽ tay".'),r.default.createElement("p",null,'Luôn bị mắc lỗi phát âm tiếng anh, mình đâm đơn vào các công ty nước ngoài nơi có phỏng vấn tiếng anh để thử sức. Công ty đầu tiên làm game ở ETown, chị HR mới hỏi mấy câu đơn giản tên tuổi, quê quán, mình lóng nga lóng ngóng không biết trả lời sau, thấy bí quá chị nói "thôi để chị hỏi tiếng Việt"'),r.default.createElement("p",null,'Cùng với cơn sốt React trong ngành, mình cũng "đua đòi" đi xin vào vị trí React mà trong đầu chẳng có tí ti gì là component, state, props, đến nói lúc được Single Page App là gì mình cũng không thể nào định nghĩa nổi.'),r.default.createElement("h2",null,"Và..."),r.default.createElement("p",null,"Mình định viết đến đây để các bạn đọc tức chơi, một phần giới thiệu bị bỏ lửng, không có kết thúc. Vì thực sự mình vẫn đang tiếp tục vá lại những kiến thức mình còn lủng, mình sẽ còn tiếp tục phỏng vấn rớt dài dài vì không đủ đáp ứng yêu cầu cho công việc."))),2===this.state.selectedTab&&r.default.createElement("div",{className:"post-content"},r.default.createElement("article",null,r.default.createElement("div",{className:"blockquote"},r.default.createElement("p",null,"Feel like he  spread the positive energy to people around"),r.default.createElement("small",null,"Trần Thảo Khánh, Designer")),r.default.createElement("div",{className:"blockquote"},r.default.createElement("p",null,"You're one of the best coworkers we have ever worked with"),r.default.createElement("small",null,"Ngô Tú Quỳnh, HR")),r.default.createElement("p",null,"I moved to the largest city in vietnam, formerly named saigon in 2007 and became a web tailor since 2011, working on tons of projects, I believe that what makes a great website is fascinating message, together with an immediate understanding, original content and easily traceable information."),r.default.createElement("p",null,"I created this blog to update my knowledge, also I aim to help other developers who interest in Frontend, javascript, stylesheet but found themselves difficult with reading english."))))))),r.default.createElement("div",{className:"aside",style:{backgroundImage:"url("+d.bgSidebar[7]+")"}},r.default.createElement("div",{className:"company-info"},r.default.createElement("div",{className:"company-name"},m.default.siteTitle),r.default.createElement("div",{className:"company-tagline"},m.default.siteTitleAlt))))},t}(r.default.Component);t.default=b,e.exports=t.default}});
//# sourceMappingURL=component---src-pages-about-jsx-c956320ed74de5c5596e.js.map
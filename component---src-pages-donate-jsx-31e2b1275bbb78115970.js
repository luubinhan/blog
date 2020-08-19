webpackJsonp([39067687067054],{

/***/ 45:
/***/ (function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	var bgSidebar = exports.bgSidebar = ['https://luubinhan.github.io/blog/images/bg6.jpg', 'https://luubinhan.github.io/blog/images/bg7.jpg', 'https://luubinhan.github.io/blog/images/bg8.jpg', 'https://luubinhan.github.io/blog/images/bg9.jpg', 'https://luubinhan.github.io/blog/images/bg10.jpg', 'https://luubinhan.github.io/blog/images/bg12.jpg', 'https://luubinhan.github.io/blog/images/bg13.jpg', 'https://luubinhan.github.io/blog/images/bg14.jpg', 'https://luubinhan.github.io/blog/images/bg15.jpg', 'https://luubinhan.github.io/blog/images/bg16.jpg', 'https://luubinhan.github.io/blog/images/bg17.jpg', 'https://luubinhan.github.io/blog/images/bg18.jpg', 'https://luubinhan.github.io/blog/images/bg19.jpg', 'https://luubinhan.github.io/blog/images/bg20.jpg', 'https://luubinhan.github.io/blog/images/bg21.jpg', 'https://luubinhan.github.io/blog/images/bg22.jpg'];
	
	var PrimaryNav = exports.PrimaryNav = [{
	  name: "Javascript",
	  href: '/tags/javascript',
	  isActive: false,
	  icon: "javascript"
	}, {
	  name: 'React',
	  href: '/tags/react',
	  isActive: false,
	  icon: "nodejs"
	}, {
	  name: 'React native',
	  href: '/tags/react-native',
	  isActive: false,
	  icon: "react-native"
	}, {
	  name: 'Vue',
	  href: '/tags/vuejs',
	  isActive: false,
	  icon: "vue"
	}, {
	  name: 'HTML/CSS',
	  href: '/tags/css',
	  isActive: false,
	  icon: "html5"
	}, {
	  name: "UX/UI",
	  href: '/tags/ux-ui',
	  isActive: false,
	  icon: "compass"
	}];

/***/ }),

/***/ 1832:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "static/qr.a1462f9d.png";

/***/ }),

/***/ 938:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactHelmet = __webpack_require__(37);
	
	var _reactHelmet2 = _interopRequireDefault(_reactHelmet);
	
	var _SiteConfig = __webpack_require__(23);
	
	var _SiteConfig2 = _interopRequireDefault(_SiteConfig);
	
	var _data = __webpack_require__(45);
	
	var _qr = __webpack_require__(1832);
	
	var _qr2 = _interopRequireDefault(_qr);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var AboutPage = function (_React$Component) {
	  _inherits(AboutPage, _React$Component);
	
	  function AboutPage() {
	    _classCallCheck(this, AboutPage);
	
	    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
	  }
	
	  AboutPage.prototype.render = function render() {
	    return _react2.default.createElement(
	      "div",
	      { className: "master" },
	      _react2.default.createElement(_reactHelmet2.default, {
	        title: _SiteConfig2.default.siteTitle,
	        meta: [{
	          name: "description",
	          content: _SiteConfig2.default.siteTitle + " " + _SiteConfig2.default.siteTitleAlt
	        }, {
	          name: "keywords",
	          content: "frontend,developer,wordpress,react,hochiminh,web-developer"
	        }]
	      }),
	      _react2.default.createElement(
	        "main",
	        { className: "inner" },
	        _react2.default.createElement(
	          "div",
	          { className: "page-about" },
	          _react2.default.createElement(
	            "div",
	            { className: "about-body" },
	            _react2.default.createElement(
	              "div",
	              { className: "single-post-container" },
	              _react2.default.createElement(
	                "div",
	                { className: "post-content" },
	                _react2.default.createElement(
	                  "article",
	                  null,
	                  _react2.default.createElement(
	                    "header",
	                    null,
	                    _react2.default.createElement(
	                      "h1",
	                      { className: "single-post-title" },
	                      "H\u1ED7 tr\u1EE3 b\u1EB1ng Zalo Pay"
	                    )
	                  ),
	                  _react2.default.createElement(
	                    "div",
	                    { style: { textAlign: 'center' } },
	                    _react2.default.createElement("img", { src: _qr2.default, alt: "\u1EE6ng h\u1ED9 m\xECnh b\u1EB1ng QR" })
	                  ),
	                  _react2.default.createElement(
	                    "p",
	                    null,
	                    "N\u1EBFu b\u1EA1n mu\u1ED7n h\u1ED7 tr\u1EE3 m\xECnh, c\xF3 th\u1EC3 th\xF4ng qua \u1EE9ng d\u1EE5ng ",
	                    _react2.default.createElement(
	                      "a",
	                      { target: "_blank", rel: "noopener noreferrer", href: "https://zalopay.vn/huong-dan-su-dung/index.html" },
	                      "Zalo Pay."
	                    )
	                  ),
	                  _react2.default.createElement(
	                    "p",
	                    null,
	                    "Ch\xE2n th\xE0nh c\u1EA3m \u01A1n m\u1ECDi s\u1EF1 h\u1ED7 tr\u1EE3!"
	                  )
	                )
	              )
	            )
	          )
	        )
	      ),
	      _react2.default.createElement(
	        "div",
	        {
	          className: "aside",
	          style: { backgroundImage: "url(" + _data.bgSidebar[7] + ")" }
	        },
	        _react2.default.createElement(
	          "div",
	          { className: "company-info" },
	          _react2.default.createElement(
	            "div",
	            { className: "company-name" },
	            _SiteConfig2.default.siteTitle
	          ),
	          _react2.default.createElement(
	            "div",
	            { className: "company-tagline" },
	            _SiteConfig2.default.siteTitleAlt
	          )
	        )
	      )
	    );
	  };
	
	  return AboutPage;
	}(_react2.default.Component);
	
	exports.default = AboutPage;
	module.exports = exports["default"];

/***/ })

});
//# sourceMappingURL=component---src-pages-donate-jsx-31e2b1275bbb78115970.js.map
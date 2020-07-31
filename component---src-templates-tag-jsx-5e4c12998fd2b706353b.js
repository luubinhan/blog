webpackJsonp([183400410456155],{

/***/ 59:
/***/ (function(module, exports, __webpack_require__) {

	var overArg = __webpack_require__(62);
	
	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeKeys = overArg(Object.keys, Object);
	
	module.exports = nativeKeys;


/***/ }),

/***/ 58:
/***/ (function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto.toString;
	
	/**
	 * Converts `value` to a string using `Object.prototype.toString`.
	 *
	 * @private
	 * @param {*} value The value to convert.
	 * @returns {string} Returns the converted string.
	 */
	function objectToString(value) {
	  return nativeObjectToString.call(value);
	}
	
	module.exports = objectToString;


/***/ }),

/***/ 60:
/***/ (function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto.toString;
	
	/**
	 * Converts `value` to a string using `Object.prototype.toString`.
	 *
	 * @private
	 * @param {*} value The value to convert.
	 * @returns {string} Returns the converted string.
	 */
	function objectToString(value) {
	  return nativeObjectToString.call(value);
	}
	
	module.exports = objectToString;


/***/ }),

/***/ 62:
/***/ (function(module, exports) {

	/**
	 * Creates a unary function that invokes `func` with its argument transformed.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {Function} transform The argument transform.
	 * @returns {Function} Returns the new function.
	 */
	function overArg(func, transform) {
	  return function(arg) {
	    return func(transform(arg));
	  };
	}
	
	module.exports = overArg;


/***/ }),

/***/ 64:
/***/ (function(module, exports) {

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;
	
	module.exports = isArray;


/***/ }),

/***/ 65:
/***/ (function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(67),
	    isLength = __webpack_require__(68);
	
	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null && isLength(value.length) && !isFunction(value);
	}
	
	module.exports = isArrayLike;


/***/ }),

/***/ 41:
/***/ (function(module, exports, __webpack_require__) {

	var baseKeys = __webpack_require__(59),
	    getTag = __webpack_require__(60),
	    isArguments = __webpack_require__(63),
	    isArray = __webpack_require__(64),
	    isArrayLike = __webpack_require__(65),
	    isBuffer = __webpack_require__(66),
	    isPrototype = __webpack_require__(61),
	    isTypedArray = __webpack_require__(70);
	
	/** `Object#toString` result references. */
	var mapTag = '[object Map]',
	    setTag = '[object Set]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Checks if `value` is an empty object, collection, map, or set.
	 *
	 * Objects are considered empty if they have no own enumerable string keyed
	 * properties.
	 *
	 * Array-like values such as `arguments` objects, arrays, buffers, strings, or
	 * jQuery-like collections are considered empty if they have a `length` of `0`.
	 * Similarly, maps and sets are considered empty if they have a `size` of `0`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is empty, else `false`.
	 * @example
	 *
	 * _.isEmpty(null);
	 * // => true
	 *
	 * _.isEmpty(true);
	 * // => true
	 *
	 * _.isEmpty(1);
	 * // => true
	 *
	 * _.isEmpty([1, 2, 3]);
	 * // => false
	 *
	 * _.isEmpty({ 'a': 1 });
	 * // => false
	 */
	function isEmpty(value) {
	  if (value == null) {
	    return true;
	  }
	  if (isArrayLike(value) &&
	      (isArray(value) || typeof value == 'string' || typeof value.splice == 'function' ||
	        isBuffer(value) || isTypedArray(value) || isArguments(value))) {
	    return !value.length;
	  }
	  var tag = getTag(value);
	  if (tag == mapTag || tag == setTag) {
	    return !value.size;
	  }
	  if (isPrototype(value)) {
	    return !baseKeys(value).length;
	  }
	  for (var key in value) {
	    if (hasOwnProperty.call(value, key)) {
	      return false;
	    }
	  }
	  return true;
	}
	
	module.exports = isEmpty;


/***/ }),

/***/ 67:
/***/ (function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(58),
	    isObject = __webpack_require__(69);
	
	/** `Object#toString` result references. */
	var asyncTag = '[object AsyncFunction]',
	    funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]',
	    proxyTag = '[object Proxy]';
	
	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  if (!isObject(value)) {
	    return false;
	  }
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 9 which returns 'object' for typed arrays and other constructors.
	  var tag = baseGetTag(value);
	  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
	}
	
	module.exports = isFunction;


/***/ }),

/***/ 68:
/***/ (function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;
	
	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This method is loosely based on
	 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' &&
	    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}
	
	module.exports = isLength;


/***/ }),

/***/ 69:
/***/ (function(module, exports) {

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return value != null && (type == 'object' || type == 'function');
	}
	
	module.exports = isObject;


/***/ }),

/***/ 61:
/***/ (function(module, exports) {

	/**
	 * This method returns `false`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {boolean} Returns `false`.
	 * @example
	 *
	 * _.times(2, _.stubFalse);
	 * // => [false, false]
	 */
	function stubFalse() {
	  return false;
	}
	
	module.exports = stubFalse;


/***/ }),

/***/ 66:
/***/ (function(module, exports) {

	/**
	 * This method returns `false`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {boolean} Returns `false`.
	 * @example
	 *
	 * _.times(2, _.stubFalse);
	 * // => [false, false]
	 */
	function stubFalse() {
	  return false;
	}
	
	module.exports = stubFalse;


/***/ }),

/***/ 70:
/***/ (function(module, exports) {

	/**
	 * This method returns `false`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {boolean} Returns `false`.
	 * @example
	 *
	 * _.times(2, _.stubFalse);
	 * // => [false, false]
	 */
	function stubFalse() {
	  return false;
	}
	
	module.exports = stubFalse;


/***/ }),

/***/ 63:
/***/ (function(module, exports) {

	/**
	 * This method returns `false`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {boolean} Returns `false`.
	 * @example
	 *
	 * _.times(2, _.stubFalse);
	 * // => [false, false]
	 */
	function stubFalse() {
	  return false;
	}
	
	module.exports = stubFalse;


/***/ }),

/***/ 89:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(1);
	
	var React = _interopRequireWildcard(_react);
	
	var _propTypes = __webpack_require__(4);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	var _gatsbyLink = __webpack_require__(10);
	
	var _gatsbyLink2 = _interopRequireDefault(_gatsbyLink);
	
	var _PostMeta = __webpack_require__(93);
	
	var _PostMeta2 = _interopRequireDefault(_PostMeta);
	
	__webpack_require__(123);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var ContentPost = function (_React$Component) {
	  _inherits(ContentPost, _React$Component);
	
	  function ContentPost() {
	    _classCallCheck(this, ContentPost);
	
	    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
	  }
	
	  ContentPost.prototype.render = function render() {
	    var _props = this.props,
	        id = _props.id,
	        title = _props.title,
	        desc = _props.desc,
	        href = _props.href,
	        img = _props.img,
	        date = _props.date,
	        tags = _props.tags;
	
	    return React.createElement(
	      "div",
	      { className: "mystyle-item-post" },
	      React.createElement(
	        "article",
	        {
	          className: "item-post clearfix ",
	          itemType: "http://schema.org/NewsArticle"
	        },
	        img && React.createElement(
	          "figure",
	          {
	            className: "the-post-thumbnail",
	            "aria-label": "media",
	            role: "group",
	            itemProp: "associatedMedia",
	            itemID: img,
	            itemType: "http://schema.org/ImageObject"
	          },
	          React.createElement(
	            _gatsbyLink2.default,
	            { to: href },
	            React.createElement("img", { src: img, alt: title, itemProp: "thumbnailUrl" })
	          )
	        ),
	        React.createElement(
	          "section",
	          { className: "the-post-content" },
	          React.createElement(
	            "header",
	            { className: "heading-post", itemProp: "headline" },
	            React.createElement(
	              _gatsbyLink2.default,
	              { to: href },
	              title
	            )
	          ),
	          desc !== '' && React.createElement(
	            "footer",
	            { className: "post-excert", itemProp: "description" },
	            desc
	          ),
	          React.createElement(_PostMeta2.default, { datetime: date, tags: tags })
	        )
	      )
	    );
	  };
	
	  return ContentPost;
	}(React.Component);
	
	ContentPost.defaultProps = {
	  desc: '',
	  date: '',
	  img: '',
	  tags: []
	};
	exports.default = ContentPost;
	module.exports = exports["default"];

/***/ }),

/***/ 123:
/***/ (function(module, exports) {

	// empty (null-loader)

/***/ }),

/***/ 90:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _ContentPost = __webpack_require__(89);
	
	var _ContentPost2 = _interopRequireDefault(_ContentPost);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = _ContentPost2.default;
	module.exports = exports["default"];

/***/ }),

/***/ 91:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _ContentPost = __webpack_require__(90);
	
	var _ContentPost2 = _interopRequireDefault(_ContentPost);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var PostListing = function (_React$Component) {
	  _inherits(PostListing, _React$Component);
	
	  function PostListing() {
	    _classCallCheck(this, PostListing);
	
	    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
	  }
	
	  PostListing.prototype.getPostList = function getPostList() {
	    var postList = [];
	    this.props.postEdges.forEach(function (postEdge) {
	      postList.push({
	        path: postEdge.node.fields.slug,
	        tags: postEdge.node.frontmatter.tags,
	        cover: postEdge.node.frontmatter.cover,
	        title: postEdge.node.frontmatter.title,
	        date: postEdge.node.frontmatter.date,
	        desc: postEdge.node.frontmatter.desc,
	        excerpt: postEdge.node.excerpt,
	        timeToRead: postEdge.node.timeToRead
	      });
	    });
	    return postList;
	  };
	
	  PostListing.prototype.render = function render() {
	    var postList = this.getPostList();
	    return _react2.default.createElement(
	      "div",
	      { className: "posts-list" },
	      postList.map(function (post, index) {
	        return _react2.default.createElement(
	          "div",
	          { key: index },
	          _react2.default.createElement(_ContentPost2.default, {
	            title: post.title,
	            desc: post.desc,
	            date: post.date,
	            href: post.path,
	            tags: post.tags,
	            img: post.cover
	          })
	        );
	      })
	    );
	  };
	
	  return PostListing;
	}(_react2.default.Component);
	
	exports.default = PostListing;
	module.exports = exports["default"];

/***/ }),

/***/ 92:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _isEmpty3 = __webpack_require__(41);
	
	var _isEmpty4 = _interopRequireDefault(_isEmpty3);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _propTypes = __webpack_require__(4);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	var _gatsbyLink = __webpack_require__(10);
	
	var _gatsbyLink2 = _interopRequireDefault(_gatsbyLink);
	
	__webpack_require__(124);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var PostMeta = function (_Component) {
	  _inherits(PostMeta, _Component);
	
	  function PostMeta() {
	    _classCallCheck(this, PostMeta);
	
	    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	  }
	
	  PostMeta.prototype.render = function render() {
	    var _props = this.props,
	        datetime = _props.datetime,
	        tags = _props.tags;
	
	    return _react2.default.createElement(
	      "div",
	      { className: "post-meta" },
	      datetime !== "" && _react2.default.createElement(
	        "div",
	        { className: "post-date" },
	        _react2.default.createElement(
	          "time",
	          {
	            className: "dateline",
	            dateTime: datetime,
	            itemProp: "dateModified",
	            content: datetime
	          },
	          datetime
	        )
	      ),
	      !(0, _isEmpty4.default)(tags) && _react2.default.createElement(
	        "div",
	        { className: "post-category" },
	        tags.map(function (tag) {
	          return _react2.default.createElement(
	            _gatsbyLink2.default,
	            { activeClassName: "active", key: tag, to: "/tags/" + tag },
	            tag
	          );
	        })
	      )
	    );
	  };
	
	  return PostMeta;
	}(_react.Component);
	
	PostMeta.propTypes = {
	  datetime: _propTypes2.default.string,
	  tags: _propTypes2.default.any
	};
	PostMeta.defaultProps = {
	  datetime: "",
	  tags: []
	};
	exports.default = PostMeta;
	module.exports = exports["default"];

/***/ }),

/***/ 124:
/***/ (function(module, exports) {

	// empty (null-loader)

/***/ }),

/***/ 93:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _PostMeta = __webpack_require__(92);
	
	var _PostMeta2 = _interopRequireDefault(_PostMeta);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = _PostMeta2.default;
	module.exports = exports["default"];

/***/ }),

/***/ 46:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	exports.default = PostTags;
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _gatsbyLink = __webpack_require__(10);
	
	var _gatsbyLink2 = _interopRequireDefault(_gatsbyLink);
	
	__webpack_require__(71);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function PostTags(_ref) {
	  var _ref$list = _ref.list,
	      list = _ref$list === undefined ? [] : _ref$list;
	
	  return _react2.default.createElement(
	    "ul",
	    { className: "tag-list-2" },
	    _react2.default.Children.toArray(list.map(function (tag) {
	      return _react2.default.createElement(
	        "li",
	        null,
	        _react2.default.createElement(
	          _gatsbyLink2.default,
	          { to: "/tags/" + tag.key },
	          tag.name
	        )
	      );
	    }))
	  );
	}
	module.exports = exports["default"];

/***/ }),

/***/ 71:
/***/ (function(module, exports) {

	// empty (null-loader)

/***/ }),

/***/ 47:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _gatsbyLink = __webpack_require__(10);
	
	var _gatsbyLink2 = _interopRequireDefault(_gatsbyLink);
	
	var _PostTagsV = __webpack_require__(46);
	
	var _PostTagsV2 = _interopRequireDefault(_PostTagsV);
	
	__webpack_require__(72);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var LIST_TAGS = [{
	  key: 'javascript',
	  name: 'Javascript'
	}, {
	  key: 'dam-dao',
	  name: 'Đàm đạo chém gió chuyện nghề'
	}, {
	  key: 'css',
	  name: 'CSS từ căn bản tới nâng cao'
	}, {
	  key: 'thu-thuat',
	  name: 'Thủ thuật'
	}, {
	  key: 'hoc-thuat',
	  name: 'Kiến thức nền tảng'
	}, {
	  key: 'react',
	  name: 'React'
	}, {
	  key: 'vuejs',
	  name: 'Vue JS'
	}, {
	  key: 'chrome',
	  name: 'Chrome DevTools'
	}, {
	  key: 'javascript',
	  name: 'Javascript'
	}];
	
	// Search component
	
	var Search = function (_Component) {
	  _inherits(Search, _Component);
	
	  function Search() {
	    var _temp, _this, _ret;
	
	    _classCallCheck(this, Search);
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
	      query: "",
	      results: []
	    }, _this.search = function (event) {
	      var query = event.target.value;
	      if (_this.state.query.length > 2) {
	        var results = _this.getSearchResults(query);
	        _this.setState({ results: results, query: query });
	      } else {
	        _this.setState({ results: [], query: query });
	      }
	    }, _this.handleClear = function () {
	      _this.setState({ results: [], query: "" });
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }
	
	  Search.prototype.getSearchResults = function getSearchResults(query) {
	    var index = window.__FLEXSEARCH__.vi.index;
	    var store = window.__FLEXSEARCH__.vi.store;
	    if (!query || !index) {
	      return [];
	    } else {
	      var results = [];
	      Object.keys(index).forEach(function (idx) {
	        var _results;
	
	        (_results = results).push.apply(_results, index[idx].values.search(query));
	      });
	
	      results = Array.from(new Set(results));
	
	      var nodes = store.filter(function (node) {
	        return results.includes(node.id) ? node : null;
	      }).map(function (node) {
	        return node.node;
	      });
	
	      return nodes;
	    }
	  };
	
	  Search.prototype.render = function render() {
	    var _this2 = this;
	
	    var ResultList = function ResultList() {
	      if (_this2.state.results.length > 0) {
	        return _this2.state.results.map(function (page, i) {
	          return _react2.default.createElement(
	            "div",
	            { className: "item-search", key: i },
	            _react2.default.createElement(
	              "h4",
	              null,
	              _react2.default.createElement(
	                _gatsbyLink2.default,
	                { to: page.url, className: "link" },
	                page.title,
	                " "
	              )
	            )
	          );
	        });
	      } else if (_this2.state.query.length > 2) {
	        return _react2.default.createElement(
	          "div",
	          { className: "item-search" },
	          "Kh\xF4ng c\xF3 k\u1EBFt qu\u1EA3 n\xE0o cho ",
	          _this2.state.query
	        );
	      } else if (_this2.state.results.length === 0 && _this2.state.query.length > 0) {
	        return _react2.default.createElement(
	          "div",
	          { className: "item-search" },
	          "B\u1EA1n nh\u1EADp \xEDt nh\u1EA5t 3 k\xFD t\u1EF1 nh\xE9"
	        );
	      } else {
	        return "";
	      }
	    };
	
	    return _react2.default.createElement(
	      "div",
	      { className: "search-wrapper" },
	      _react2.default.createElement(_PostTagsV2.default, { list: LIST_TAGS }),
	      _react2.default.createElement(
	        "div",
	        { className: "search__container " + this.props.classNames },
	        _react2.default.createElement("input", {
	          className: "search__input",
	          type: "text",
	          onChange: this.search,
	          placeholder: "Tìm bài viết"
	        }),
	        this.state.query !== "" && _react2.default.createElement(
	          "button",
	          { className: "search_clear", onClick: this.handleClear },
	          "X"
	        ),
	        _react2.default.createElement(
	          "div",
	          { className: "search__list" },
	          _react2.default.createElement(ResultList, null)
	        )
	      )
	    );
	  };
	
	  return Search;
	}(_react.Component);
	
	exports.default = Search;
	module.exports = exports["default"];

/***/ }),

/***/ 72:
/***/ (function(module, exports) {

	// empty (null-loader)

/***/ }),

/***/ 941:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	exports.pageQuery = undefined;
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactHelmet = __webpack_require__(37);
	
	var _reactHelmet2 = _interopRequireDefault(_reactHelmet);
	
	var _PostListing = __webpack_require__(91);
	
	var _PostListing2 = _interopRequireDefault(_PostListing);
	
	var _Search = __webpack_require__(47);
	
	var _Search2 = _interopRequireDefault(_Search);
	
	var _SiteConfig = __webpack_require__(23);
	
	var _SiteConfig2 = _interopRequireDefault(_SiteConfig);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var TagTemplate = function (_React$Component) {
	  _inherits(TagTemplate, _React$Component);
	
	  function TagTemplate() {
	    _classCallCheck(this, TagTemplate);
	
	    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
	  }
	
	  TagTemplate.prototype.render = function render() {
	    var tag = this.props.pathContext.tag;
	
	    var postEdges = this.props.data.allMarkdownRemark.edges;
	    return _react2.default.createElement(
	      "div",
	      { className: "master" },
	      _react2.default.createElement(
	        _reactHelmet2.default,
	        null,
	        _react2.default.createElement(
	          "title",
	          null,
	          "Ki\u1EBFn th\u1EE9c " + tag + " | " + _SiteConfig2.default.siteTitle + " | " + _SiteConfig2.default.siteDescription
	        ),
	        _react2.default.createElement("meta", { name: "description", content: "N\u01A1i m\xECnh chia s\u1EBD ki\u1EBFn th\u1EE9c frontend, css, html, javascript, c\xE1c framework nh\u01B0 React, Vuejs, React Native" })
	      ),
	      _react2.default.createElement(
	        "div",
	        { className: "inner" },
	        _react2.default.createElement(_PostListing2.default, { postEdges: postEdges })
	      ),
	      _react2.default.createElement(
	        "div",
	        { className: "aside" },
	        _react2.default.createElement(_Search2.default, null),
	        _react2.default.createElement(
	          "div",
	          { className: "company-info tag" },
	          _react2.default.createElement(
	            "div",
	            { className: "company-name" },
	            "TAGS"
	          )
	        )
	      )
	    );
	  };
	
	  return TagTemplate;
	}(_react2.default.Component);
	
	/* eslint no-undef: "off" */
	
	
	exports.default = TagTemplate;
	var pageQuery = exports.pageQuery = "** extracted graphql fragment **";

/***/ })

});
//# sourceMappingURL=component---src-templates-tag-jsx-5e4c12998fd2b706353b.js.map
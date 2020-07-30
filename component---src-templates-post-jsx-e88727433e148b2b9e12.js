webpackJsonp([213130420965792],{

/***/ 12:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	// compare and isBuffer taken from https://github.com/feross/buffer/blob/680e9e5e488f22aac27599a57dc844a6315928dd/index.js
	// original notice:
	
	/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
	function compare(a, b) {
	  if (a === b) {
	    return 0;
	  }
	
	  var x = a.length;
	  var y = b.length;
	
	  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
	    if (a[i] !== b[i]) {
	      x = a[i];
	      y = b[i];
	      break;
	    }
	  }
	
	  if (x < y) {
	    return -1;
	  }
	  if (y < x) {
	    return 1;
	  }
	  return 0;
	}
	function isBuffer(b) {
	  if (global.Buffer && typeof global.Buffer.isBuffer === 'function') {
	    return global.Buffer.isBuffer(b);
	  }
	  return !!(b != null && b._isBuffer);
	}
	
	// based on node assert, original notice:
	
	// http://wiki.commonjs.org/wiki/Unit_Testing/1.0
	//
	// THIS IS NOT TESTED NOR LIKELY TO WORK OUTSIDE V8!
	//
	// Originally from narwhal.js (http://narwhaljs.org)
	// Copyright (c) 2009 Thomas Robinson <280north.com>
	//
	// Permission is hereby granted, free of charge, to any person obtaining a copy
	// of this software and associated documentation files (the 'Software'), to
	// deal in the Software without restriction, including without limitation the
	// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
	// sell copies of the Software, and to permit persons to whom the Software is
	// furnished to do so, subject to the following conditions:
	//
	// The above copyright notice and this permission notice shall be included in
	// all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
	// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
	// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	var util = __webpack_require__(920);
	var hasOwn = Object.prototype.hasOwnProperty;
	var pSlice = Array.prototype.slice;
	var functionsHaveNames = (function () {
	  return function foo() {}.name === 'foo';
	}());
	function pToString (obj) {
	  return Object.prototype.toString.call(obj);
	}
	function isView(arrbuf) {
	  if (isBuffer(arrbuf)) {
	    return false;
	  }
	  if (typeof global.ArrayBuffer !== 'function') {
	    return false;
	  }
	  if (typeof ArrayBuffer.isView === 'function') {
	    return ArrayBuffer.isView(arrbuf);
	  }
	  if (!arrbuf) {
	    return false;
	  }
	  if (arrbuf instanceof DataView) {
	    return true;
	  }
	  if (arrbuf.buffer && arrbuf.buffer instanceof ArrayBuffer) {
	    return true;
	  }
	  return false;
	}
	// 1. The assert module provides functions that throw
	// AssertionError's when particular conditions are not met. The
	// assert module must conform to the following interface.
	
	var assert = module.exports = ok;
	
	// 2. The AssertionError is defined in assert.
	// new assert.AssertionError({ message: message,
	//                             actual: actual,
	//                             expected: expected })
	
	var regex = /\s*function\s+([^\(\s]*)\s*/;
	// based on https://github.com/ljharb/function.prototype.name/blob/adeeeec8bfcc6068b187d7d9fb3d5bb1d3a30899/implementation.js
	function getName(func) {
	  if (!util.isFunction(func)) {
	    return;
	  }
	  if (functionsHaveNames) {
	    return func.name;
	  }
	  var str = func.toString();
	  var match = str.match(regex);
	  return match && match[1];
	}
	assert.AssertionError = function AssertionError(options) {
	  this.name = 'AssertionError';
	  this.actual = options.actual;
	  this.expected = options.expected;
	  this.operator = options.operator;
	  if (options.message) {
	    this.message = options.message;
	    this.generatedMessage = false;
	  } else {
	    this.message = getMessage(this);
	    this.generatedMessage = true;
	  }
	  var stackStartFunction = options.stackStartFunction || fail;
	  if (Error.captureStackTrace) {
	    Error.captureStackTrace(this, stackStartFunction);
	  } else {
	    // non v8 browsers so we can have a stacktrace
	    var err = new Error();
	    if (err.stack) {
	      var out = err.stack;
	
	      // try to strip useless frames
	      var fn_name = getName(stackStartFunction);
	      var idx = out.indexOf('\n' + fn_name);
	      if (idx >= 0) {
	        // once we have located the function frame
	        // we need to strip out everything before it (and its line)
	        var next_line = out.indexOf('\n', idx + 1);
	        out = out.substring(next_line + 1);
	      }
	
	      this.stack = out;
	    }
	  }
	};
	
	// assert.AssertionError instanceof Error
	util.inherits(assert.AssertionError, Error);
	
	function truncate(s, n) {
	  if (typeof s === 'string') {
	    return s.length < n ? s : s.slice(0, n);
	  } else {
	    return s;
	  }
	}
	function inspect(something) {
	  if (functionsHaveNames || !util.isFunction(something)) {
	    return util.inspect(something);
	  }
	  var rawname = getName(something);
	  var name = rawname ? ': ' + rawname : '';
	  return '[Function' +  name + ']';
	}
	function getMessage(self) {
	  return truncate(inspect(self.actual), 128) + ' ' +
	         self.operator + ' ' +
	         truncate(inspect(self.expected), 128);
	}
	
	// At present only the three keys mentioned above are used and
	// understood by the spec. Implementations or sub modules can pass
	// other keys to the AssertionError's constructor - they will be
	// ignored.
	
	// 3. All of the following functions must throw an AssertionError
	// when a corresponding condition is not met, with a message that
	// may be undefined if not provided.  All assertion methods provide
	// both the actual and expected values to the assertion error for
	// display purposes.
	
	function fail(actual, expected, message, operator, stackStartFunction) {
	  throw new assert.AssertionError({
	    message: message,
	    actual: actual,
	    expected: expected,
	    operator: operator,
	    stackStartFunction: stackStartFunction
	  });
	}
	
	// EXTENSION! allows for well behaved errors defined elsewhere.
	assert.fail = fail;
	
	// 4. Pure assertion tests whether a value is truthy, as determined
	// by !!guard.
	// assert.ok(guard, message_opt);
	// This statement is equivalent to assert.equal(true, !!guard,
	// message_opt);. To test strictly for the value true, use
	// assert.strictEqual(true, guard, message_opt);.
	
	function ok(value, message) {
	  if (!value) fail(value, true, message, '==', assert.ok);
	}
	assert.ok = ok;
	
	// 5. The equality assertion tests shallow, coercive equality with
	// ==.
	// assert.equal(actual, expected, message_opt);
	
	assert.equal = function equal(actual, expected, message) {
	  if (actual != expected) fail(actual, expected, message, '==', assert.equal);
	};
	
	// 6. The non-equality assertion tests for whether two objects are not equal
	// with != assert.notEqual(actual, expected, message_opt);
	
	assert.notEqual = function notEqual(actual, expected, message) {
	  if (actual == expected) {
	    fail(actual, expected, message, '!=', assert.notEqual);
	  }
	};
	
	// 7. The equivalence assertion tests a deep equality relation.
	// assert.deepEqual(actual, expected, message_opt);
	
	assert.deepEqual = function deepEqual(actual, expected, message) {
	  if (!_deepEqual(actual, expected, false)) {
	    fail(actual, expected, message, 'deepEqual', assert.deepEqual);
	  }
	};
	
	assert.deepStrictEqual = function deepStrictEqual(actual, expected, message) {
	  if (!_deepEqual(actual, expected, true)) {
	    fail(actual, expected, message, 'deepStrictEqual', assert.deepStrictEqual);
	  }
	};
	
	function _deepEqual(actual, expected, strict, memos) {
	  // 7.1. All identical values are equivalent, as determined by ===.
	  if (actual === expected) {
	    return true;
	  } else if (isBuffer(actual) && isBuffer(expected)) {
	    return compare(actual, expected) === 0;
	
	  // 7.2. If the expected value is a Date object, the actual value is
	  // equivalent if it is also a Date object that refers to the same time.
	  } else if (util.isDate(actual) && util.isDate(expected)) {
	    return actual.getTime() === expected.getTime();
	
	  // 7.3 If the expected value is a RegExp object, the actual value is
	  // equivalent if it is also a RegExp object with the same source and
	  // properties (`global`, `multiline`, `lastIndex`, `ignoreCase`).
	  } else if (util.isRegExp(actual) && util.isRegExp(expected)) {
	    return actual.source === expected.source &&
	           actual.global === expected.global &&
	           actual.multiline === expected.multiline &&
	           actual.lastIndex === expected.lastIndex &&
	           actual.ignoreCase === expected.ignoreCase;
	
	  // 7.4. Other pairs that do not both pass typeof value == 'object',
	  // equivalence is determined by ==.
	  } else if ((actual === null || typeof actual !== 'object') &&
	             (expected === null || typeof expected !== 'object')) {
	    return strict ? actual === expected : actual == expected;
	
	  // If both values are instances of typed arrays, wrap their underlying
	  // ArrayBuffers in a Buffer each to increase performance
	  // This optimization requires the arrays to have the same type as checked by
	  // Object.prototype.toString (aka pToString). Never perform binary
	  // comparisons for Float*Arrays, though, since e.g. +0 === -0 but their
	  // bit patterns are not identical.
	  } else if (isView(actual) && isView(expected) &&
	             pToString(actual) === pToString(expected) &&
	             !(actual instanceof Float32Array ||
	               actual instanceof Float64Array)) {
	    return compare(new Uint8Array(actual.buffer),
	                   new Uint8Array(expected.buffer)) === 0;
	
	  // 7.5 For all other Object pairs, including Array objects, equivalence is
	  // determined by having the same number of owned properties (as verified
	  // with Object.prototype.hasOwnProperty.call), the same set of keys
	  // (although not necessarily the same order), equivalent values for every
	  // corresponding key, and an identical 'prototype' property. Note: this
	  // accounts for both named and indexed properties on Arrays.
	  } else if (isBuffer(actual) !== isBuffer(expected)) {
	    return false;
	  } else {
	    memos = memos || {actual: [], expected: []};
	
	    var actualIndex = memos.actual.indexOf(actual);
	    if (actualIndex !== -1) {
	      if (actualIndex === memos.expected.indexOf(expected)) {
	        return true;
	      }
	    }
	
	    memos.actual.push(actual);
	    memos.expected.push(expected);
	
	    return objEquiv(actual, expected, strict, memos);
	  }
	}
	
	function isArguments(object) {
	  return Object.prototype.toString.call(object) == '[object Arguments]';
	}
	
	function objEquiv(a, b, strict, actualVisitedObjects) {
	  if (a === null || a === undefined || b === null || b === undefined)
	    return false;
	  // if one is a primitive, the other must be same
	  if (util.isPrimitive(a) || util.isPrimitive(b))
	    return a === b;
	  if (strict && Object.getPrototypeOf(a) !== Object.getPrototypeOf(b))
	    return false;
	  var aIsArgs = isArguments(a);
	  var bIsArgs = isArguments(b);
	  if ((aIsArgs && !bIsArgs) || (!aIsArgs && bIsArgs))
	    return false;
	  if (aIsArgs) {
	    a = pSlice.call(a);
	    b = pSlice.call(b);
	    return _deepEqual(a, b, strict);
	  }
	  var ka = objectKeys(a);
	  var kb = objectKeys(b);
	  var key, i;
	  // having the same number of owned properties (keys incorporates
	  // hasOwnProperty)
	  if (ka.length !== kb.length)
	    return false;
	  //the same set of keys (although not necessarily the same order),
	  ka.sort();
	  kb.sort();
	  //~~~cheap key test
	  for (i = ka.length - 1; i >= 0; i--) {
	    if (ka[i] !== kb[i])
	      return false;
	  }
	  //equivalent values for every corresponding key, and
	  //~~~possibly expensive deep test
	  for (i = ka.length - 1; i >= 0; i--) {
	    key = ka[i];
	    if (!_deepEqual(a[key], b[key], strict, actualVisitedObjects))
	      return false;
	  }
	  return true;
	}
	
	// 8. The non-equivalence assertion tests for any deep inequality.
	// assert.notDeepEqual(actual, expected, message_opt);
	
	assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
	  if (_deepEqual(actual, expected, false)) {
	    fail(actual, expected, message, 'notDeepEqual', assert.notDeepEqual);
	  }
	};
	
	assert.notDeepStrictEqual = notDeepStrictEqual;
	function notDeepStrictEqual(actual, expected, message) {
	  if (_deepEqual(actual, expected, true)) {
	    fail(actual, expected, message, 'notDeepStrictEqual', notDeepStrictEqual);
	  }
	}
	
	
	// 9. The strict equality assertion tests strict equality, as determined by ===.
	// assert.strictEqual(actual, expected, message_opt);
	
	assert.strictEqual = function strictEqual(actual, expected, message) {
	  if (actual !== expected) {
	    fail(actual, expected, message, '===', assert.strictEqual);
	  }
	};
	
	// 10. The strict non-equality assertion tests for strict inequality, as
	// determined by !==.  assert.notStrictEqual(actual, expected, message_opt);
	
	assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
	  if (actual === expected) {
	    fail(actual, expected, message, '!==', assert.notStrictEqual);
	  }
	};
	
	function expectedException(actual, expected) {
	  if (!actual || !expected) {
	    return false;
	  }
	
	  if (Object.prototype.toString.call(expected) == '[object RegExp]') {
	    return expected.test(actual);
	  }
	
	  try {
	    if (actual instanceof expected) {
	      return true;
	    }
	  } catch (e) {
	    // Ignore.  The instanceof check doesn't work for arrow functions.
	  }
	
	  if (Error.isPrototypeOf(expected)) {
	    return false;
	  }
	
	  return expected.call({}, actual) === true;
	}
	
	function _tryBlock(block) {
	  var error;
	  try {
	    block();
	  } catch (e) {
	    error = e;
	  }
	  return error;
	}
	
	function _throws(shouldThrow, block, expected, message) {
	  var actual;
	
	  if (typeof block !== 'function') {
	    throw new TypeError('"block" argument must be a function');
	  }
	
	  if (typeof expected === 'string') {
	    message = expected;
	    expected = null;
	  }
	
	  actual = _tryBlock(block);
	
	  message = (expected && expected.name ? ' (' + expected.name + ').' : '.') +
	            (message ? ' ' + message : '.');
	
	  if (shouldThrow && !actual) {
	    fail(actual, expected, 'Missing expected exception' + message);
	  }
	
	  var userProvidedMessage = typeof message === 'string';
	  var isUnwantedException = !shouldThrow && util.isError(actual);
	  var isUnexpectedException = !shouldThrow && actual && !expected;
	
	  if ((isUnwantedException &&
	      userProvidedMessage &&
	      expectedException(actual, expected)) ||
	      isUnexpectedException) {
	    fail(actual, expected, 'Got unwanted exception' + message);
	  }
	
	  if ((shouldThrow && actual && expected &&
	      !expectedException(actual, expected)) || (!shouldThrow && actual)) {
	    throw actual;
	  }
	}
	
	// 11. Expected to throw an error:
	// assert.throws(block, Error_opt, message_opt);
	
	assert.throws = function(block, /*optional*/error, /*optional*/message) {
	  _throws(true, block, error, message);
	};
	
	// EXTENSION! This is annoying to write outside this module.
	assert.doesNotThrow = function(block, /*optional*/error, /*optional*/message) {
	  _throws(false, block, error, message);
	};
	
	assert.ifError = function(err) { if (err) throw err; };
	
	var objectKeys = Object.keys || function (obj) {
	  var keys = [];
	  for (var key in obj) {
	    if (hasOwn.call(obj, key)) keys.push(key);
	  }
	  return keys;
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),

/***/ 919:
/***/ (function(module, exports) {

	module.exports = function isBuffer(arg) {
	  return arg && typeof arg === 'object'
	    && typeof arg.copy === 'function'
	    && typeof arg.fill === 'function'
	    && typeof arg.readUInt8 === 'function';
	}

/***/ }),

/***/ 920:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	var formatRegExp = /%[sdj%]/g;
	exports.format = function(f) {
	  if (!isString(f)) {
	    var objects = [];
	    for (var i = 0; i < arguments.length; i++) {
	      objects.push(inspect(arguments[i]));
	    }
	    return objects.join(' ');
	  }
	
	  var i = 1;
	  var args = arguments;
	  var len = args.length;
	  var str = String(f).replace(formatRegExp, function(x) {
	    if (x === '%%') return '%';
	    if (i >= len) return x;
	    switch (x) {
	      case '%s': return String(args[i++]);
	      case '%d': return Number(args[i++]);
	      case '%j':
	        try {
	          return JSON.stringify(args[i++]);
	        } catch (_) {
	          return '[Circular]';
	        }
	      default:
	        return x;
	    }
	  });
	  for (var x = args[i]; i < len; x = args[++i]) {
	    if (isNull(x) || !isObject(x)) {
	      str += ' ' + x;
	    } else {
	      str += ' ' + inspect(x);
	    }
	  }
	  return str;
	};
	
	
	// Mark that a method should not be used.
	// Returns a modified function which warns once by default.
	// If --no-deprecation is set, then it is a no-op.
	exports.deprecate = function(fn, msg) {
	  // Allow for deprecating things in the process of starting up.
	  if (isUndefined(global.process)) {
	    return function() {
	      return exports.deprecate(fn, msg).apply(this, arguments);
	    };
	  }
	
	  if (process.noDeprecation === true) {
	    return fn;
	  }
	
	  var warned = false;
	  function deprecated() {
	    if (!warned) {
	      if (process.throwDeprecation) {
	        throw new Error(msg);
	      } else if (process.traceDeprecation) {
	        console.trace(msg);
	      } else {
	        console.error(msg);
	      }
	      warned = true;
	    }
	    return fn.apply(this, arguments);
	  }
	
	  return deprecated;
	};
	
	
	var debugs = {};
	var debugEnviron;
	exports.debuglog = function(set) {
	  if (isUndefined(debugEnviron))
	    debugEnviron = ({"NODE_ENV":"production","PUBLIC_DIR":"C:\\xampp\\htdocs\\luckyluu/public","GATSBY_ALGOLIA_APP_ID":"68PEVEWLR7","GATSBY_ALGOLIA_SEARCH_KEY":"c3e0db897950a5f687e9d690d5fc9342"}).NODE_DEBUG || '';
	  set = set.toUpperCase();
	  if (!debugs[set]) {
	    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
	      var pid = process.pid;
	      debugs[set] = function() {
	        var msg = exports.format.apply(exports, arguments);
	        console.error('%s %d: %s', set, pid, msg);
	      };
	    } else {
	      debugs[set] = function() {};
	    }
	  }
	  return debugs[set];
	};
	
	
	/**
	 * Echos the value of a value. Trys to print the value out
	 * in the best way possible given the different types.
	 *
	 * @param {Object} obj The object to print out.
	 * @param {Object} opts Optional options object that alters the output.
	 */
	/* legacy: obj, showHidden, depth, colors*/
	function inspect(obj, opts) {
	  // default options
	  var ctx = {
	    seen: [],
	    stylize: stylizeNoColor
	  };
	  // legacy...
	  if (arguments.length >= 3) ctx.depth = arguments[2];
	  if (arguments.length >= 4) ctx.colors = arguments[3];
	  if (isBoolean(opts)) {
	    // legacy...
	    ctx.showHidden = opts;
	  } else if (opts) {
	    // got an "options" object
	    exports._extend(ctx, opts);
	  }
	  // set default options
	  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
	  if (isUndefined(ctx.depth)) ctx.depth = 2;
	  if (isUndefined(ctx.colors)) ctx.colors = false;
	  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
	  if (ctx.colors) ctx.stylize = stylizeWithColor;
	  return formatValue(ctx, obj, ctx.depth);
	}
	exports.inspect = inspect;
	
	
	// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
	inspect.colors = {
	  'bold' : [1, 22],
	  'italic' : [3, 23],
	  'underline' : [4, 24],
	  'inverse' : [7, 27],
	  'white' : [37, 39],
	  'grey' : [90, 39],
	  'black' : [30, 39],
	  'blue' : [34, 39],
	  'cyan' : [36, 39],
	  'green' : [32, 39],
	  'magenta' : [35, 39],
	  'red' : [31, 39],
	  'yellow' : [33, 39]
	};
	
	// Don't use 'blue' not visible on cmd.exe
	inspect.styles = {
	  'special': 'cyan',
	  'number': 'yellow',
	  'boolean': 'yellow',
	  'undefined': 'grey',
	  'null': 'bold',
	  'string': 'green',
	  'date': 'magenta',
	  // "name": intentionally not styling
	  'regexp': 'red'
	};
	
	
	function stylizeWithColor(str, styleType) {
	  var style = inspect.styles[styleType];
	
	  if (style) {
	    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
	           '\u001b[' + inspect.colors[style][1] + 'm';
	  } else {
	    return str;
	  }
	}
	
	
	function stylizeNoColor(str, styleType) {
	  return str;
	}
	
	
	function arrayToHash(array) {
	  var hash = {};
	
	  array.forEach(function(val, idx) {
	    hash[val] = true;
	  });
	
	  return hash;
	}
	
	
	function formatValue(ctx, value, recurseTimes) {
	  // Provide a hook for user-specified inspect functions.
	  // Check that value is an object with an inspect function on it
	  if (ctx.customInspect &&
	      value &&
	      isFunction(value.inspect) &&
	      // Filter out the util module, it's inspect function is special
	      value.inspect !== exports.inspect &&
	      // Also filter out any prototype objects using the circular check.
	      !(value.constructor && value.constructor.prototype === value)) {
	    var ret = value.inspect(recurseTimes, ctx);
	    if (!isString(ret)) {
	      ret = formatValue(ctx, ret, recurseTimes);
	    }
	    return ret;
	  }
	
	  // Primitive types cannot have properties
	  var primitive = formatPrimitive(ctx, value);
	  if (primitive) {
	    return primitive;
	  }
	
	  // Look up the keys of the object.
	  var keys = Object.keys(value);
	  var visibleKeys = arrayToHash(keys);
	
	  if (ctx.showHidden) {
	    keys = Object.getOwnPropertyNames(value);
	  }
	
	  // IE doesn't make error fields non-enumerable
	  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
	  if (isError(value)
	      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
	    return formatError(value);
	  }
	
	  // Some type of object without properties can be shortcutted.
	  if (keys.length === 0) {
	    if (isFunction(value)) {
	      var name = value.name ? ': ' + value.name : '';
	      return ctx.stylize('[Function' + name + ']', 'special');
	    }
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    }
	    if (isDate(value)) {
	      return ctx.stylize(Date.prototype.toString.call(value), 'date');
	    }
	    if (isError(value)) {
	      return formatError(value);
	    }
	  }
	
	  var base = '', array = false, braces = ['{', '}'];
	
	  // Make Array say that they are Array
	  if (isArray(value)) {
	    array = true;
	    braces = ['[', ']'];
	  }
	
	  // Make functions say that they are functions
	  if (isFunction(value)) {
	    var n = value.name ? ': ' + value.name : '';
	    base = ' [Function' + n + ']';
	  }
	
	  // Make RegExps say that they are RegExps
	  if (isRegExp(value)) {
	    base = ' ' + RegExp.prototype.toString.call(value);
	  }
	
	  // Make dates with properties first say the date
	  if (isDate(value)) {
	    base = ' ' + Date.prototype.toUTCString.call(value);
	  }
	
	  // Make error with message first say the error
	  if (isError(value)) {
	    base = ' ' + formatError(value);
	  }
	
	  if (keys.length === 0 && (!array || value.length == 0)) {
	    return braces[0] + base + braces[1];
	  }
	
	  if (recurseTimes < 0) {
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    } else {
	      return ctx.stylize('[Object]', 'special');
	    }
	  }
	
	  ctx.seen.push(value);
	
	  var output;
	  if (array) {
	    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
	  } else {
	    output = keys.map(function(key) {
	      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
	    });
	  }
	
	  ctx.seen.pop();
	
	  return reduceToSingleString(output, base, braces);
	}
	
	
	function formatPrimitive(ctx, value) {
	  if (isUndefined(value))
	    return ctx.stylize('undefined', 'undefined');
	  if (isString(value)) {
	    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
	                                             .replace(/'/g, "\\'")
	                                             .replace(/\\"/g, '"') + '\'';
	    return ctx.stylize(simple, 'string');
	  }
	  if (isNumber(value))
	    return ctx.stylize('' + value, 'number');
	  if (isBoolean(value))
	    return ctx.stylize('' + value, 'boolean');
	  // For some reason typeof null is "object", so special case here.
	  if (isNull(value))
	    return ctx.stylize('null', 'null');
	}
	
	
	function formatError(value) {
	  return '[' + Error.prototype.toString.call(value) + ']';
	}
	
	
	function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
	  var output = [];
	  for (var i = 0, l = value.length; i < l; ++i) {
	    if (hasOwnProperty(value, String(i))) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          String(i), true));
	    } else {
	      output.push('');
	    }
	  }
	  keys.forEach(function(key) {
	    if (!key.match(/^\d+$/)) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          key, true));
	    }
	  });
	  return output;
	}
	
	
	function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
	  var name, str, desc;
	  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
	  if (desc.get) {
	    if (desc.set) {
	      str = ctx.stylize('[Getter/Setter]', 'special');
	    } else {
	      str = ctx.stylize('[Getter]', 'special');
	    }
	  } else {
	    if (desc.set) {
	      str = ctx.stylize('[Setter]', 'special');
	    }
	  }
	  if (!hasOwnProperty(visibleKeys, key)) {
	    name = '[' + key + ']';
	  }
	  if (!str) {
	    if (ctx.seen.indexOf(desc.value) < 0) {
	      if (isNull(recurseTimes)) {
	        str = formatValue(ctx, desc.value, null);
	      } else {
	        str = formatValue(ctx, desc.value, recurseTimes - 1);
	      }
	      if (str.indexOf('\n') > -1) {
	        if (array) {
	          str = str.split('\n').map(function(line) {
	            return '  ' + line;
	          }).join('\n').substr(2);
	        } else {
	          str = '\n' + str.split('\n').map(function(line) {
	            return '   ' + line;
	          }).join('\n');
	        }
	      }
	    } else {
	      str = ctx.stylize('[Circular]', 'special');
	    }
	  }
	  if (isUndefined(name)) {
	    if (array && key.match(/^\d+$/)) {
	      return str;
	    }
	    name = JSON.stringify('' + key);
	    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
	      name = name.substr(1, name.length - 2);
	      name = ctx.stylize(name, 'name');
	    } else {
	      name = name.replace(/'/g, "\\'")
	                 .replace(/\\"/g, '"')
	                 .replace(/(^"|"$)/g, "'");
	      name = ctx.stylize(name, 'string');
	    }
	  }
	
	  return name + ': ' + str;
	}
	
	
	function reduceToSingleString(output, base, braces) {
	  var numLinesEst = 0;
	  var length = output.reduce(function(prev, cur) {
	    numLinesEst++;
	    if (cur.indexOf('\n') >= 0) numLinesEst++;
	    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
	  }, 0);
	
	  if (length > 60) {
	    return braces[0] +
	           (base === '' ? '' : base + '\n ') +
	           ' ' +
	           output.join(',\n  ') +
	           ' ' +
	           braces[1];
	  }
	
	  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
	}
	
	
	// NOTE: These type checking functions intentionally don't use `instanceof`
	// because it is fragile and can be easily faked with `Object.create()`.
	function isArray(ar) {
	  return Array.isArray(ar);
	}
	exports.isArray = isArray;
	
	function isBoolean(arg) {
	  return typeof arg === 'boolean';
	}
	exports.isBoolean = isBoolean;
	
	function isNull(arg) {
	  return arg === null;
	}
	exports.isNull = isNull;
	
	function isNullOrUndefined(arg) {
	  return arg == null;
	}
	exports.isNullOrUndefined = isNullOrUndefined;
	
	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	exports.isNumber = isNumber;
	
	function isString(arg) {
	  return typeof arg === 'string';
	}
	exports.isString = isString;
	
	function isSymbol(arg) {
	  return typeof arg === 'symbol';
	}
	exports.isSymbol = isSymbol;
	
	function isUndefined(arg) {
	  return arg === void 0;
	}
	exports.isUndefined = isUndefined;
	
	function isRegExp(re) {
	  return isObject(re) && objectToString(re) === '[object RegExp]';
	}
	exports.isRegExp = isRegExp;
	
	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	exports.isObject = isObject;
	
	function isDate(d) {
	  return isObject(d) && objectToString(d) === '[object Date]';
	}
	exports.isDate = isDate;
	
	function isError(e) {
	  return isObject(e) &&
	      (objectToString(e) === '[object Error]' || e instanceof Error);
	}
	exports.isError = isError;
	
	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	exports.isFunction = isFunction;
	
	function isPrimitive(arg) {
	  return arg === null ||
	         typeof arg === 'boolean' ||
	         typeof arg === 'number' ||
	         typeof arg === 'string' ||
	         typeof arg === 'symbol' ||  // ES6 symbol
	         typeof arg === 'undefined';
	}
	exports.isPrimitive = isPrimitive;
	
	exports.isBuffer = __webpack_require__(919);
	
	function objectToString(o) {
	  return Object.prototype.toString.call(o);
	}
	
	
	function pad(n) {
	  return n < 10 ? '0' + n.toString(10) : n.toString(10);
	}
	
	
	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
	              'Oct', 'Nov', 'Dec'];
	
	// 26 Feb 16:19:34
	function timestamp() {
	  var d = new Date();
	  var time = [pad(d.getHours()),
	              pad(d.getMinutes()),
	              pad(d.getSeconds())].join(':');
	  return [d.getDate(), months[d.getMonth()], time].join(' ');
	}
	
	
	// log is just a thin wrapper to console.log that prepends a timestamp
	exports.log = function() {
	  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
	};
	
	
	/**
	 * Inherit the prototype methods from one constructor into another.
	 *
	 * The Function.prototype.inherits from lang.js rewritten as a standalone
	 * function (not on Function.prototype). NOTE: If this file is to be loaded
	 * during bootstrapping this function needs to be rewritten using some native
	 * functions as prototype setup using normal JavaScript does not work as
	 * expected during bootstrapping (see mirror.js in r114903).
	 *
	 * @param {function} ctor Constructor function which needs to inherit the
	 *     prototype.
	 * @param {function} superCtor Constructor function to inherit prototype from.
	 */
	exports.inherits = __webpack_require__(1376);
	
	exports._extend = function(origin, add) {
	  // Don't do anything if add isn't an object
	  if (!add || !isObject(add)) return origin;
	
	  var keys = Object.keys(add);
	  var i = keys.length;
	  while (i--) {
	    origin[keys[i]] = add[keys[i]];
	  }
	  return origin;
	};
	
	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(85)))

/***/ }),

/***/ 872:
/***/ (function(module, exports) {

	var canUseDOM = !!(
	  typeof window !== 'undefined' &&
	  window.document &&
	  window.document.createElement
	);
	
	module.exports = canUseDOM;

/***/ }),

/***/ 873:
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2017 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
	/* global define */
	
	(function () {
		'use strict';
	
		var hasOwn = {}.hasOwnProperty;
	
		function classNames () {
			var classes = [];
	
			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;
	
				var argType = typeof arg;
	
				if (argType === 'string' || argType === 'number') {
					classes.push(arg);
				} else if (Array.isArray(arg) && arg.length) {
					var inner = classNames.apply(null, arg);
					if (inner) {
						classes.push(inner);
					}
				} else if (argType === 'object') {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				}
			}
	
			return classes.join(' ');
		}
	
		if (typeof module !== 'undefined' && module.exports) {
			classNames.default = classNames;
			module.exports = classNames;
		} else if (true) {
			// register as 'classnames', consistent with npm package name
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			window.classNames = classNames;
		}
	}());


/***/ }),

/***/ 1030:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.CommentCount = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _utils = __webpack_require__(904);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var queueResetCount = (0, _utils.debounce)(function () {
	    if (window.DISQUSWIDGETS) window.DISQUSWIDGETS.getCount({ reset: true });
	}, 300, false); // eslint-disable-line no-magic-numbers
	
	var CommentCount = exports.CommentCount = function (_React$Component) {
	    _inherits(CommentCount, _React$Component);
	
	    function CommentCount() {
	        _classCallCheck(this, CommentCount);
	
	        return _possibleConstructorReturn(this, (CommentCount.__proto__ || Object.getPrototypeOf(CommentCount)).apply(this, arguments));
	    }
	
	    _createClass(CommentCount, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            this.loadInstance();
	        }
	    }, {
	        key: 'shouldComponentUpdate',
	        value: function shouldComponentUpdate(nextProps) {
	            if (this.props.shortname !== nextProps.shortname) return true;
	
	            var nextConfig = nextProps.config;
	            var config = this.props.config;
	            if (nextConfig.url === config.url && nextConfig.identifier === config.identifier) return false;
	            return true;
	        }
	    }, {
	        key: 'componentWillUpdate',
	        value: function componentWillUpdate(nextProps) {
	            if (this.props.shortname !== nextProps.shortname) this.cleanInstance();
	        }
	    }, {
	        key: 'componentDidUpdate',
	        value: function componentDidUpdate() {
	            this.loadInstance();
	        }
	    }, {
	        key: 'loadInstance',
	        value: function loadInstance() {
	            var doc = window.document;
	            if (doc.getElementById('dsq-count-scr')) queueResetCount();else (0, _utils.insertScript)('https://' + this.props.shortname + '.disqus.com/count.js', 'dsq-count-scr', doc.body);
	        }
	    }, {
	        key: 'cleanInstance',
	        value: function cleanInstance() {
	            var body = window.document.body;
	            (0, _utils.removeScript)('dsq-count-scr', body);
	
	            // count.js only reassigns this window object if it's undefined.
	            window.DISQUSWIDGETS = undefined;
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                'span',
	                {
	                    className: 'disqus-comment-count',
	                    'data-disqus-identifier': this.props.config.identifier,
	                    'data-disqus-url': this.props.config.url
	                },
	                this.props.children
	            );
	        }
	    }]);
	
	    return CommentCount;
	}(_react2.default.Component);

/***/ }),

/***/ 1031:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.CommentEmbed = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var RADIX_BASE = 36;
	
	var CommentEmbed = exports.CommentEmbed = function (_React$Component) {
	    _inherits(CommentEmbed, _React$Component);
	
	    function CommentEmbed() {
	        _classCallCheck(this, CommentEmbed);
	
	        return _possibleConstructorReturn(this, (CommentEmbed.__proto__ || Object.getPrototypeOf(CommentEmbed)).apply(this, arguments));
	    }
	
	    _createClass(CommentEmbed, [{
	        key: 'getSrc',
	        value: function getSrc() {
	            var post = Number(this.props.commentId).toString(RADIX_BASE);
	            var parentParam = this.props.showParentComment ? '1' : '0';
	            var mediaParam = this.props.showMedia ? '1' : '0';
	
	            return 'https://embed.disqus.com/p/' + post + '?p=' + parentParam + '&m=' + mediaParam;
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement('iframe', {
	                src: this.getSrc(),
	                width: this.props.width,
	                height: this.props.height,
	                seamless: 'seamless',
	                scrolling: 'no',
	                frameBorder: '0'
	            });
	        }
	    }]);
	
	    return CommentEmbed;
	}(_react2.default.Component);
	
	CommentEmbed.defaultProps = {
	    showMedia: true,
	    showParentComment: true,
	    width: 420,
	    height: 320
	};

/***/ }),

/***/ 1032:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.DiscussionEmbed = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _utils = __webpack_require__(904);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var DiscussionEmbed = exports.DiscussionEmbed = function (_React$Component) {
	    _inherits(DiscussionEmbed, _React$Component);
	
	    function DiscussionEmbed() {
	        _classCallCheck(this, DiscussionEmbed);
	
	        return _possibleConstructorReturn(this, (DiscussionEmbed.__proto__ || Object.getPrototypeOf(DiscussionEmbed)).apply(this, arguments));
	    }
	
	    _createClass(DiscussionEmbed, [{
	        key: 'componentWillMount',
	        value: function componentWillMount() {
	            if (typeof window !== 'undefined' && window.disqus_shortname && window.disqus_shortname !== this.props.shortname) this.cleanInstance();
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            this.loadInstance();
	        }
	    }, {
	        key: 'shouldComponentUpdate',
	        value: function shouldComponentUpdate(nextProps) {
	            if (this.props.shortname !== nextProps.shortname) return true;
	
	            var nextConfig = nextProps.config;
	            var config = this.props.config;
	            if (nextConfig.url === config.url && nextConfig.identifier === config.identifier) return false;
	            return true;
	        }
	    }, {
	        key: 'componentWillUpdate',
	        value: function componentWillUpdate(nextProps) {
	            if (this.props.shortname !== nextProps.shortname) this.cleanInstance();
	        }
	    }, {
	        key: 'componentDidUpdate',
	        value: function componentDidUpdate() {
	            this.loadInstance();
	        }
	    }, {
	        key: 'loadInstance',
	        value: function loadInstance() {
	            var doc = window.document;
	            if (window && window.DISQUS && doc.getElementById('dsq-embed-scr')) {
	                window.DISQUS.reset({
	                    reload: true,
	                    config: this.getDisqusConfig(this.props.config)
	                });
	            } else {
	                window.disqus_config = this.getDisqusConfig(this.props.config);
	                window.disqus_shortname = this.props.shortname;
	                (0, _utils.insertScript)('https://' + this.props.shortname + '.disqus.com/embed.js', 'dsq-embed-scr', doc.body);
	            }
	        }
	    }, {
	        key: 'cleanInstance',
	        value: function cleanInstance() {
	            var doc = window.document;
	            (0, _utils.removeScript)('dsq-embed-scr', doc.body);
	            if (window && window.DISQUS) window.DISQUS.reset({});
	
	            try {
	                delete window.DISQUS;
	            } catch (error) {
	                window.DISQUS = undefined;
	            }
	            var disqusThread = doc.getElementById('disqus_thread');
	            if (disqusThread) {
	                while (disqusThread.hasChildNodes()) {
	                    disqusThread.removeChild(disqusThread.firstChild);
	                }
	            }
	        }
	    }, {
	        key: 'getDisqusConfig',
	        value: function getDisqusConfig(config) {
	            return function () {
	                this.page.identifier = config.identifier;
	                this.page.url = config.url;
	                this.page.title = config.title;
	                this.callbacks.onNewComment = [config.onNewComment];
	            };
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement('div', { id: 'disqus_thread' });
	        }
	    }]);
	
	    return DiscussionEmbed;
	}(_react2.default.Component);

/***/ }),

/***/ 1033:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.DiscussionEmbed = exports.CommentEmbed = exports.CommentCount = undefined;
	
	var _CommentCount = __webpack_require__(1030);
	
	var _CommentEmbed = __webpack_require__(1031);
	
	var _DiscussionEmbed = __webpack_require__(1032);
	
	exports.CommentCount = _CommentCount.CommentCount;
	exports.CommentEmbed = _CommentEmbed.CommentEmbed;
	exports.DiscussionEmbed = _DiscussionEmbed.DiscussionEmbed;
	
	
	var Disqus = {
	    CommentCount: _CommentCount.CommentCount,
	    CommentEmbed: _CommentEmbed.CommentEmbed,
	    DiscussionEmbed: _DiscussionEmbed.DiscussionEmbed
	};
	
	exports.default = Disqus;

/***/ }),

/***/ 904:
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.insertScript = insertScript;
	exports.removeScript = removeScript;
	exports.debounce = debounce;
	function insertScript(src, id, parentElement) {
	    var script = window.document.createElement('script');
	    script.async = true;
	    script.src = src;
	    script.id = id;
	    parentElement.appendChild(script);
	
	    return script;
	}
	
	function removeScript(id, parentElement) {
	    var script = window.document.getElementById(id);
	    if (script) parentElement.removeChild(script);
	}
	
	function debounce(func, wait, runOnFirstCall) {
	    var timeout = void 0;
	    return function () {
	        var context = this; // eslint-disable-line consistent-this
	        var args = arguments;
	
	        var deferredExecution = function deferredExecution() {
	            timeout = null;
	            if (!runOnFirstCall) func.apply(context, args);
	        };
	
	        var callNow = runOnFirstCall && !timeout;
	
	        window.clearTimeout(timeout);
	        timeout = setTimeout(deferredExecution, wait);
	
	        if (callNow) func.apply(context, args);
	    };
	}

/***/ }),

/***/ 1376:
/***/ (function(module, exports) {

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    var TempCtor = function () {}
	    TempCtor.prototype = superCtor.prototype
	    ctor.prototype = new TempCtor()
	    ctor.prototype.constructor = ctor
	  }
	}


/***/ }),

/***/ 36:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies
	 */
	
	var debug = __webpack_require__(1686)('jsonp');
	
	/**
	 * Module exports.
	 */
	
	module.exports = jsonp;
	
	/**
	 * Callback index.
	 */
	
	var count = 0;
	
	/**
	 * Noop function.
	 */
	
	function noop(){}
	
	/**
	 * JSONP handler
	 *
	 * Options:
	 *  - param {String} qs parameter (`callback`)
	 *  - prefix {String} qs parameter (`__jp`)
	 *  - name {String} qs parameter (`prefix` + incr)
	 *  - timeout {Number} how long after a timeout error is emitted (`60000`)
	 *
	 * @param {String} url
	 * @param {Object|Function} optional options / callback
	 * @param {Function} optional callback
	 */
	
	function jsonp(url, opts, fn){
	  if ('function' == typeof opts) {
	    fn = opts;
	    opts = {};
	  }
	  if (!opts) opts = {};
	
	  var prefix = opts.prefix || '__jp';
	
	  // use the callback name that was passed if one was provided.
	  // otherwise generate a unique name by incrementing our counter.
	  var id = opts.name || (prefix + (count++));
	
	  var param = opts.param || 'callback';
	  var timeout = null != opts.timeout ? opts.timeout : 60000;
	  var enc = encodeURIComponent;
	  var target = document.getElementsByTagName('script')[0] || document.head;
	  var script;
	  var timer;
	
	
	  if (timeout) {
	    timer = setTimeout(function(){
	      cleanup();
	      if (fn) fn(new Error('Timeout'));
	    }, timeout);
	  }
	
	  function cleanup(){
	    if (script.parentNode) script.parentNode.removeChild(script);
	    window[id] = noop;
	    if (timer) clearTimeout(timer);
	  }
	
	  function cancel(){
	    if (window[id]) {
	      cleanup();
	    }
	  }
	
	  window[id] = function(data){
	    debug('jsonp got', data);
	    cleanup();
	    if (fn) fn(null, data);
	  };
	
	  // add qs component
	  url += (~url.indexOf('?') ? '&' : '?') + param + '=' + enc(id);
	  url = url.replace('?&', '?');
	
	  debug('jsonp req "%s"', url);
	
	  // create script
	  script = document.createElement('script');
	  script.src = url;
	  target.parentNode.insertBefore(script, target);
	
	  return cancel;
	}


/***/ }),

/***/ 1686:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * This is the web browser implementation of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */
	
	exports = module.exports = __webpack_require__(1687);
	exports.log = log;
	exports.formatArgs = formatArgs;
	exports.save = save;
	exports.load = load;
	exports.useColors = useColors;
	exports.storage = 'undefined' != typeof chrome
	               && 'undefined' != typeof chrome.storage
	                  ? chrome.storage.local
	                  : localstorage();
	
	/**
	 * Colors.
	 */
	
	exports.colors = [
	  'lightseagreen',
	  'forestgreen',
	  'goldenrod',
	  'dodgerblue',
	  'darkorchid',
	  'crimson'
	];
	
	/**
	 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
	 * and the Firebug extension (any Firefox version) are known
	 * to support "%c" CSS customizations.
	 *
	 * TODO: add a `localStorage` variable to explicitly enable/disable colors
	 */
	
	function useColors() {
	  // NB: In an Electron preload script, document will be defined but not fully
	  // initialized. Since we know we're in Chrome, we'll just detect this case
	  // explicitly
	  if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
	    return true;
	  }
	
	  // is webkit? http://stackoverflow.com/a/16459606/376773
	  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
	  return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
	    // is firebug? http://stackoverflow.com/a/398120/376773
	    (typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
	    // is firefox >= v31?
	    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
	    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
	    // double check webkit in userAgent just in case we are in a worker
	    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
	}
	
	/**
	 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
	 */
	
	exports.formatters.j = function(v) {
	  try {
	    return JSON.stringify(v);
	  } catch (err) {
	    return '[UnexpectedJSONParseError]: ' + err.message;
	  }
	};
	
	
	/**
	 * Colorize log arguments if enabled.
	 *
	 * @api public
	 */
	
	function formatArgs(args) {
	  var useColors = this.useColors;
	
	  args[0] = (useColors ? '%c' : '')
	    + this.namespace
	    + (useColors ? ' %c' : ' ')
	    + args[0]
	    + (useColors ? '%c ' : ' ')
	    + '+' + exports.humanize(this.diff);
	
	  if (!useColors) return;
	
	  var c = 'color: ' + this.color;
	  args.splice(1, 0, c, 'color: inherit')
	
	  // the final "%c" is somewhat tricky, because there could be other
	  // arguments passed either before or after the %c, so we need to
	  // figure out the correct index to insert the CSS into
	  var index = 0;
	  var lastC = 0;
	  args[0].replace(/%[a-zA-Z%]/g, function(match) {
	    if ('%%' === match) return;
	    index++;
	    if ('%c' === match) {
	      // we only are interested in the *last* %c
	      // (the user may have provided their own)
	      lastC = index;
	    }
	  });
	
	  args.splice(lastC, 0, c);
	}
	
	/**
	 * Invokes `console.log()` when available.
	 * No-op when `console.log` is not a "function".
	 *
	 * @api public
	 */
	
	function log() {
	  // this hackery is required for IE8/9, where
	  // the `console.log` function doesn't have 'apply'
	  return 'object' === typeof console
	    && console.log
	    && Function.prototype.apply.call(console.log, console, arguments);
	}
	
	/**
	 * Save `namespaces`.
	 *
	 * @param {String} namespaces
	 * @api private
	 */
	
	function save(namespaces) {
	  try {
	    if (null == namespaces) {
	      exports.storage.removeItem('debug');
	    } else {
	      exports.storage.debug = namespaces;
	    }
	  } catch(e) {}
	}
	
	/**
	 * Load `namespaces`.
	 *
	 * @return {String} returns the previously persisted debug modes
	 * @api private
	 */
	
	function load() {
	  var r;
	  try {
	    r = exports.storage.debug;
	  } catch(e) {}
	
	  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
	  if (!r && typeof process !== 'undefined' && 'env' in process) {
	    r = ({"NODE_ENV":"production","PUBLIC_DIR":"C:\\xampp\\htdocs\\luckyluu/public","GATSBY_ALGOLIA_APP_ID":"68PEVEWLR7","GATSBY_ALGOLIA_SEARCH_KEY":"c3e0db897950a5f687e9d690d5fc9342"}).DEBUG;
	  }
	
	  return r;
	}
	
	/**
	 * Enable namespaces listed in `localStorage.debug` initially.
	 */
	
	exports.enable(load());
	
	/**
	 * Localstorage attempts to return the localstorage.
	 *
	 * This is necessary because safari throws
	 * when a user disables cookies/localstorage
	 * and you attempt to access it.
	 *
	 * @return {LocalStorage}
	 * @api private
	 */
	
	function localstorage() {
	  try {
	    return window.localStorage;
	  } catch (e) {}
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(85)))

/***/ }),

/***/ 1687:
/***/ (function(module, exports, __webpack_require__) {

	
	/**
	 * This is the common logic for both the Node.js and web browser
	 * implementations of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */
	
	exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
	exports.coerce = coerce;
	exports.disable = disable;
	exports.enable = enable;
	exports.enabled = enabled;
	exports.humanize = __webpack_require__(1705);
	
	/**
	 * The currently active debug mode names, and names to skip.
	 */
	
	exports.names = [];
	exports.skips = [];
	
	/**
	 * Map of special "%n" handling functions, for the debug "format" argument.
	 *
	 * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
	 */
	
	exports.formatters = {};
	
	/**
	 * Previous log timestamp.
	 */
	
	var prevTime;
	
	/**
	 * Select a color.
	 * @param {String} namespace
	 * @return {Number}
	 * @api private
	 */
	
	function selectColor(namespace) {
	  var hash = 0, i;
	
	  for (i in namespace) {
	    hash  = ((hash << 5) - hash) + namespace.charCodeAt(i);
	    hash |= 0; // Convert to 32bit integer
	  }
	
	  return exports.colors[Math.abs(hash) % exports.colors.length];
	}
	
	/**
	 * Create a debugger with the given `namespace`.
	 *
	 * @param {String} namespace
	 * @return {Function}
	 * @api public
	 */
	
	function createDebug(namespace) {
	
	  function debug() {
	    // disabled?
	    if (!debug.enabled) return;
	
	    var self = debug;
	
	    // set `diff` timestamp
	    var curr = +new Date();
	    var ms = curr - (prevTime || curr);
	    self.diff = ms;
	    self.prev = prevTime;
	    self.curr = curr;
	    prevTime = curr;
	
	    // turn the `arguments` into a proper Array
	    var args = new Array(arguments.length);
	    for (var i = 0; i < args.length; i++) {
	      args[i] = arguments[i];
	    }
	
	    args[0] = exports.coerce(args[0]);
	
	    if ('string' !== typeof args[0]) {
	      // anything else let's inspect with %O
	      args.unshift('%O');
	    }
	
	    // apply any `formatters` transformations
	    var index = 0;
	    args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
	      // if we encounter an escaped % then don't increase the array index
	      if (match === '%%') return match;
	      index++;
	      var formatter = exports.formatters[format];
	      if ('function' === typeof formatter) {
	        var val = args[index];
	        match = formatter.call(self, val);
	
	        // now we need to remove `args[index]` since it's inlined in the `format`
	        args.splice(index, 1);
	        index--;
	      }
	      return match;
	    });
	
	    // apply env-specific formatting (colors, etc.)
	    exports.formatArgs.call(self, args);
	
	    var logFn = debug.log || exports.log || console.log.bind(console);
	    logFn.apply(self, args);
	  }
	
	  debug.namespace = namespace;
	  debug.enabled = exports.enabled(namespace);
	  debug.useColors = exports.useColors();
	  debug.color = selectColor(namespace);
	
	  // env-specific initialization logic for debug instances
	  if ('function' === typeof exports.init) {
	    exports.init(debug);
	  }
	
	  return debug;
	}
	
	/**
	 * Enables a debug mode by namespaces. This can include modes
	 * separated by a colon and wildcards.
	 *
	 * @param {String} namespaces
	 * @api public
	 */
	
	function enable(namespaces) {
	  exports.save(namespaces);
	
	  exports.names = [];
	  exports.skips = [];
	
	  var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
	  var len = split.length;
	
	  for (var i = 0; i < len; i++) {
	    if (!split[i]) continue; // ignore empty strings
	    namespaces = split[i].replace(/\*/g, '.*?');
	    if (namespaces[0] === '-') {
	      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
	    } else {
	      exports.names.push(new RegExp('^' + namespaces + '$'));
	    }
	  }
	}
	
	/**
	 * Disable debug output.
	 *
	 * @api public
	 */
	
	function disable() {
	  exports.enable('');
	}
	
	/**
	 * Returns true if the given mode name is enabled, false otherwise.
	 *
	 * @param {String} name
	 * @return {Boolean}
	 * @api public
	 */
	
	function enabled(name) {
	  var i, len;
	  for (i = 0, len = exports.skips.length; i < len; i++) {
	    if (exports.skips[i].test(name)) {
	      return false;
	    }
	  }
	  for (i = 0, len = exports.names.length; i < len; i++) {
	    if (exports.names[i].test(name)) {
	      return true;
	    }
	  }
	  return false;
	}
	
	/**
	 * Coerce `val`.
	 *
	 * @param {Mixed} val
	 * @return {Mixed}
	 * @api private
	 */
	
	function coerce(val) {
	  if (val instanceof Error) return val.stack || val.message;
	  return val;
	}


/***/ }),

/***/ 1705:
/***/ (function(module, exports) {

	/**
	 * Helpers.
	 */
	
	var s = 1000;
	var m = s * 60;
	var h = m * 60;
	var d = h * 24;
	var w = d * 7;
	var y = d * 365.25;
	
	/**
	 * Parse or format the given `val`.
	 *
	 * Options:
	 *
	 *  - `long` verbose formatting [false]
	 *
	 * @param {String|Number} val
	 * @param {Object} [options]
	 * @throws {Error} throw an error if val is not a non-empty string or a number
	 * @return {String|Number}
	 * @api public
	 */
	
	module.exports = function(val, options) {
	  options = options || {};
	  var type = typeof val;
	  if (type === 'string' && val.length > 0) {
	    return parse(val);
	  } else if (type === 'number' && isNaN(val) === false) {
	    return options.long ? fmtLong(val) : fmtShort(val);
	  }
	  throw new Error(
	    'val is not a non-empty string or a valid number. val=' +
	      JSON.stringify(val)
	  );
	};
	
	/**
	 * Parse the given `str` and return milliseconds.
	 *
	 * @param {String} str
	 * @return {Number}
	 * @api private
	 */
	
	function parse(str) {
	  str = String(str);
	  if (str.length > 100) {
	    return;
	  }
	  var match = /^((?:\d+)?\-?\d?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
	    str
	  );
	  if (!match) {
	    return;
	  }
	  var n = parseFloat(match[1]);
	  var type = (match[2] || 'ms').toLowerCase();
	  switch (type) {
	    case 'years':
	    case 'year':
	    case 'yrs':
	    case 'yr':
	    case 'y':
	      return n * y;
	    case 'weeks':
	    case 'week':
	    case 'w':
	      return n * w;
	    case 'days':
	    case 'day':
	    case 'd':
	      return n * d;
	    case 'hours':
	    case 'hour':
	    case 'hrs':
	    case 'hr':
	    case 'h':
	      return n * h;
	    case 'minutes':
	    case 'minute':
	    case 'mins':
	    case 'min':
	    case 'm':
	      return n * m;
	    case 'seconds':
	    case 'second':
	    case 'secs':
	    case 'sec':
	    case 's':
	      return n * s;
	    case 'milliseconds':
	    case 'millisecond':
	    case 'msecs':
	    case 'msec':
	    case 'ms':
	      return n;
	    default:
	      return undefined;
	  }
	}
	
	/**
	 * Short format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */
	
	function fmtShort(ms) {
	  var msAbs = Math.abs(ms);
	  if (msAbs >= d) {
	    return Math.round(ms / d) + 'd';
	  }
	  if (msAbs >= h) {
	    return Math.round(ms / h) + 'h';
	  }
	  if (msAbs >= m) {
	    return Math.round(ms / m) + 'm';
	  }
	  if (msAbs >= s) {
	    return Math.round(ms / s) + 's';
	  }
	  return ms + 'ms';
	}
	
	/**
	 * Long format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */
	
	function fmtLong(ms) {
	  var msAbs = Math.abs(ms);
	  if (msAbs >= d) {
	    return plural(ms, msAbs, d, 'day');
	  }
	  if (msAbs >= h) {
	    return plural(ms, msAbs, h, 'hour');
	  }
	  if (msAbs >= m) {
	    return plural(ms, msAbs, m, 'minute');
	  }
	  if (msAbs >= s) {
	    return plural(ms, msAbs, s, 'second');
	  }
	  return ms + ' ms';
	}
	
	/**
	 * Pluralization helper.
	 */
	
	function plural(ms, msAbs, n, name) {
	  var isPlural = msAbs >= n * 1.5;
	  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
	}


/***/ }),

/***/ 85:
/***/ (function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	
	
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	
	
	
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	process.prependListener = noop;
	process.prependOnceListener = noop;
	
	process.listeners = function (name) { return [] }
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ }),

/***/ 1716:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends2 = __webpack_require__(8);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _classCallCheck2 = __webpack_require__(5);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(7);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(6);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _class, _temp;
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Parser = __webpack_require__(19);
	
	var _Parser2 = _interopRequireDefault(_Parser);
	
	var _getCurrentHref = __webpack_require__(30);
	
	var _getCurrentHref2 = _interopRequireDefault(_getCurrentHref);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Comments = (_temp = _class = function (_PureComponent) {
	  (0, _inherits3.default)(Comments, _PureComponent);
	
	  function Comments() {
	    (0, _classCallCheck3.default)(this, Comments);
	    return (0, _possibleConstructorReturn3.default)(this, _PureComponent.apply(this, arguments));
	  }
	
	  Comments.prototype.componentDidUpdate = function componentDidUpdate() {
	    var handleParse = this.props.handleParse;
	
	    handleParse();
	  };
	
	  Comments.prototype.render = function render() {
	    var _props = this.props,
	        colorScheme = _props.colorScheme,
	        _props$href = _props.href,
	        href = _props$href === undefined ? (0, _getCurrentHref2.default)() : _props$href,
	        numPosts = _props.numPosts,
	        orderBy = _props.orderBy,
	        width = _props.width,
	        children = _props.children,
	        mobile = _props.mobile;
	
	
	    return _react2.default.createElement(
	      'div',
	      {
	        className: 'fb-comments',
	        'data-colorscheme': colorScheme,
	        'data-numposts': numPosts,
	        'data-href': href,
	        'data-order-by': orderBy,
	        'data-width': width,
	        'data-skin': colorScheme,
	        'data-mobile': mobile
	      },
	      children
	    );
	  };
	
	  return Comments;
	}(_react.PureComponent), _class.defaultProps = {
	  href: undefined,
	  numPosts: undefined,
	  orderBy: undefined,
	  width: undefined,
	  colorScheme: undefined,
	  children: undefined,
	  mobile: undefined
	}, _temp);
	exports.default = (0, _react.forwardRef)(function (props, ref) {
	  return _react2.default.createElement(
	    _Parser2.default,
	    null,
	    function (_ref) {
	      var handleParse = _ref.handleParse;
	      return _react2.default.createElement(Comments, (0, _extends3.default)({}, props, {
	        handleParse: handleParse,
	        ref: ref
	      }));
	    }
	  );
	});
	//# sourceMappingURL=Comments.js.map

/***/ }),

/***/ 1717:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends2 = __webpack_require__(8);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _classCallCheck2 = __webpack_require__(5);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(7);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(6);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _class, _temp;
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Parser = __webpack_require__(19);
	
	var _Parser2 = _interopRequireDefault(_Parser);
	
	var _getCurrentHref = __webpack_require__(30);
	
	var _getCurrentHref2 = _interopRequireDefault(_getCurrentHref);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var CommentsCount = (_temp = _class = function (_PureComponent) {
	  (0, _inherits3.default)(CommentsCount, _PureComponent);
	
	  function CommentsCount() {
	    (0, _classCallCheck3.default)(this, CommentsCount);
	    return (0, _possibleConstructorReturn3.default)(this, _PureComponent.apply(this, arguments));
	  }
	
	  CommentsCount.prototype.componentDidUpdate = function componentDidUpdate() {
	    var handleParse = this.props.handleParse;
	
	    handleParse();
	  };
	
	  CommentsCount.prototype.render = function render() {
	    var _props = this.props,
	        _props$href = _props.href,
	        href = _props$href === undefined ? (0, _getCurrentHref2.default)() : _props$href,
	        children = _props.children;
	
	
	    return _react2.default.createElement(
	      'span',
	      {
	        className: 'fb-comments-count',
	        'data-href': href
	      },
	      children
	    );
	  };
	
	  return CommentsCount;
	}(_react.PureComponent), _class.defaultProps = {
	  href: undefined,
	  children: undefined
	}, _temp);
	exports.default = (0, _react.forwardRef)(function (props, ref) {
	  return _react2.default.createElement(
	    _Parser2.default,
	    null,
	    function (_ref) {
	      var handleParse = _ref.handleParse;
	      return _react2.default.createElement(CommentsCount, (0, _extends3.default)({}, props, {
	        handleParse: handleParse,
	        ref: ref
	      }));
	    }
	  );
	});
	//# sourceMappingURL=CommentsCount.js.map

/***/ }),

/***/ 1718:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends2 = __webpack_require__(8);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _classCallCheck2 = __webpack_require__(5);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(7);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(6);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _class, _temp;
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Parser = __webpack_require__(19);
	
	var _Parser2 = _interopRequireDefault(_Parser);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var CustomChat = (_temp = _class = function (_PureComponent) {
	  (0, _inherits3.default)(CustomChat, _PureComponent);
	
	  function CustomChat() {
	    (0, _classCallCheck3.default)(this, CustomChat);
	    return (0, _possibleConstructorReturn3.default)(this, _PureComponent.apply(this, arguments));
	  }
	
	  CustomChat.prototype.componentDidUpdate = function componentDidUpdate() {
	    var handleParse = this.props.handleParse;
	
	    handleParse();
	  };
	
	  CustomChat.prototype.render = function render() {
	    var _props = this.props,
	        minimized = _props.minimized,
	        children = _props.children,
	        pageId = _props.pageId,
	        themeColor = _props.themeColor,
	        loggedInGreeting = _props.loggedInGreeting,
	        loggedOutGreeting = _props.loggedOutGreeting,
	        dataRef = _props.dataRef;
	
	
	    return _react2.default.createElement(
	      'div',
	      {
	        className: 'fb-customerchat',
	        page_id: pageId,
	        minimized: minimized,
	        theme_color: themeColor,
	        logged_in_greeting: loggedInGreeting,
	        logged_out_greeting: loggedOutGreeting,
	        'data-ref': dataRef
	      },
	      children
	    );
	  };
	
	  return CustomChat;
	}(_react.PureComponent), _class.defaultProps = {
	  minimized: undefined,
	  children: undefined,
	  themeColor: undefined,
	  loggedInGreeting: undefined,
	  loggedOutGreeting: undefined,
	  dataRef: undefined
	}, _temp);
	exports.default = (0, _react.forwardRef)(function (props, ref) {
	  return _react2.default.createElement(
	    _Parser2.default,
	    null,
	    function (_ref) {
	      var handleParse = _ref.handleParse;
	      return _react2.default.createElement(CustomChat, (0, _extends3.default)({}, props, {
	        handleParse: handleParse,
	        ref: ref
	      }));
	    }
	  );
	});
	//# sourceMappingURL=CustomChat.js.map

/***/ }),

/***/ 1719:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends2 = __webpack_require__(8);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _classCallCheck2 = __webpack_require__(5);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(7);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(6);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _class, _temp;
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Parser = __webpack_require__(19);
	
	var _Parser2 = _interopRequireDefault(_Parser);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var EmbeddedPost = (_temp = _class = function (_PureComponent) {
	  (0, _inherits3.default)(EmbeddedPost, _PureComponent);
	
	  function EmbeddedPost() {
	    (0, _classCallCheck3.default)(this, EmbeddedPost);
	    return (0, _possibleConstructorReturn3.default)(this, _PureComponent.apply(this, arguments));
	  }
	
	  EmbeddedPost.prototype.componentDidUpdate = function componentDidUpdate() {
	    var handleParse = this.props.handleParse;
	
	    handleParse();
	  };
	
	  EmbeddedPost.prototype.render = function render() {
	    var _props = this.props,
	        href = _props.href,
	        width = _props.width,
	        showText = _props.showText,
	        children = _props.children;
	
	
	    return _react2.default.createElement(
	      'div',
	      {
	        className: 'fb-post',
	        'data-href': href,
	        'data-width': width,
	        'data-show-text': showText
	      },
	      children
	    );
	  };
	
	  return EmbeddedPost;
	}(_react.PureComponent), _class.defaultProps = {
	  width: undefined,
	  showText: undefined,
	  children: undefined
	}, _temp);
	exports.default = (0, _react.forwardRef)(function (props, ref) {
	  return _react2.default.createElement(
	    _Parser2.default,
	    null,
	    function (_ref) {
	      var handleParse = _ref.handleParse;
	      return _react2.default.createElement(EmbeddedPost, (0, _extends3.default)({}, props, {
	        handleParse: handleParse,
	        ref: ref
	      }));
	    }
	  );
	});
	//# sourceMappingURL=EmbeddedPost.js.map

/***/ }),

/***/ 1720:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends2 = __webpack_require__(8);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _classCallCheck2 = __webpack_require__(5);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(7);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(6);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _class, _temp;
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Parser = __webpack_require__(19);
	
	var _Parser2 = _interopRequireDefault(_Parser);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var EmbeddedVideo = (_temp = _class = function (_PureComponent) {
	  (0, _inherits3.default)(EmbeddedVideo, _PureComponent);
	
	  function EmbeddedVideo() {
	    (0, _classCallCheck3.default)(this, EmbeddedVideo);
	    return (0, _possibleConstructorReturn3.default)(this, _PureComponent.apply(this, arguments));
	  }
	
	  EmbeddedVideo.prototype.componentDidUpdate = function componentDidUpdate() {
	    var handleParse = this.props.handleParse;
	
	    handleParse();
	  };
	
	  EmbeddedVideo.prototype.render = function render() {
	    var _props = this.props,
	        href = _props.href,
	        width = _props.width,
	        showText = _props.showText,
	        allowFullScreen = _props.allowFullScreen,
	        autoPlay = _props.autoPlay,
	        showCaptions = _props.showCaptions,
	        children = _props.children;
	
	
	    return _react2.default.createElement(
	      'div',
	      {
	        className: 'fb-video',
	        'data-href': href,
	        'data-width': width,
	        'data-show-text': showText,
	        'data-show-captions': showCaptions,
	        'data-autoplay': autoPlay,
	        'data-allowfullscreen': allowFullScreen
	      },
	      children
	    );
	  };
	
	  return EmbeddedVideo;
	}(_react.PureComponent), _class.defaultProps = {
	  width: undefined,
	  showText: undefined,
	  allowFullScreen: undefined,
	  autoPlay: undefined,
	  showCaptions: undefined,
	  children: undefined
	}, _temp);
	exports.default = (0, _react.forwardRef)(function (props, ref) {
	  return _react2.default.createElement(
	    _Parser2.default,
	    null,
	    function (_ref) {
	      var handleParse = _ref.handleParse;
	      return _react2.default.createElement(EmbeddedVideo, (0, _extends3.default)({}, props, {
	        handleParse: handleParse,
	        ref: ref
	      }));
	    }
	  );
	});
	//# sourceMappingURL=EmbeddedVideo.js.map

/***/ }),

/***/ 1721:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.default = exports.Method = undefined;
	
	var _regenerator = __webpack_require__(21);
	
	var _regenerator2 = _interopRequireDefault(_regenerator);
	
	var _asyncToGenerator2 = __webpack_require__(20);
	
	var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
	
	var _extends2 = __webpack_require__(8);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _classCallCheck2 = __webpack_require__(5);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _LoginStatus = __webpack_require__(128);
	
	var _LoginStatus2 = _interopRequireDefault(_LoginStatus);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Method = exports.Method = {
	  GET: 'get',
	  POST: 'post',
	  DELETE: 'delete'
	};
	
	var Facebook = function () {
	  function Facebook() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    (0, _classCallCheck3.default)(this, Facebook);
	
	    this.options = (0, _extends3.default)({
	      domain: 'connect.facebook.net',
	      version: 'v3.1',
	      cookie: false,
	      status: false,
	      xfbml: false,
	      language: 'en_US',
	      frictionlessRequests: false
	    }, options);
	
	    if (!this.options.appId) {
	      throw new Error('You need to set appId');
	    }
	
	    if (!this.options.wait) {
	      this.init();
	    }
	  }
	
	  Facebook.prototype.getAppId = function getAppId() {
	    return this.options.appId;
	  };
	
	  Facebook.prototype.init = function () {
	    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
	      var _this = this;
	
	      return _regenerator2.default.wrap(function _callee$(_context) {
	        while (1) {
	          switch (_context.prev = _context.next) {
	            case 0:
	              if (!this.loadingPromise) {
	                _context.next = 2;
	                break;
	              }
	
	              return _context.abrupt('return', this.loadingPromise);
	
	            case 2:
	
	              this.loadingPromise = new Promise(function (resolve) {
	                var options = _this.options;
	
	
	                window.fbAsyncInit = function () {
	                  window.FB.init({
	                    appId: options.appId,
	                    version: options.version,
	                    cookie: options.cookie,
	                    status: options.status,
	                    xfbml: options.xfbml,
	                    frictionlessRequests: _this.frictionlessRequests
	                  });
	
	                  resolve(window.FB);
	                };
	
	                var fjs = window.document.getElementsByTagName('script')[0];
	                if (!fjs) {
	                  return;
	                }
	
	                if (window.document.getElementById('facebook-jssdk')) {
	                  return;
	                }
	
	                var js = window.document.createElement('script');
	                js.id = 'facebook-jssdk';
	                js.async = true;
	                js.src = 'https://' + options.domain + '/' + options.language + '/sdk.js';
	
	                fjs.parentNode.insertBefore(js, fjs);
	              });
	
	              return _context.abrupt('return', this.loadingPromise);
	
	            case 4:
	            case 'end':
	              return _context.stop();
	          }
	        }
	      }, _callee, this);
	    }));
	
	    function init() {
	      return _ref.apply(this, arguments);
	    }
	
	    return init;
	  }();
	
	  Facebook.prototype.process = function () {
	    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(method) {
	      var before = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
	      var after = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
	      var fb;
	      return _regenerator2.default.wrap(function _callee2$(_context2) {
	        while (1) {
	          switch (_context2.prev = _context2.next) {
	            case 0:
	              _context2.next = 2;
	              return this.init();
	
	            case 2:
	              fb = _context2.sent;
	              return _context2.abrupt('return', new Promise(function (resolve, reject) {
	                fb[method].apply(fb, before.concat([function (response) {
	                  if (!response) {
	                    reject(new Error('Response is undefined'));
	                  } else if (response.error) {
	                    var _response$error = response.error,
	                        code = _response$error.code,
	                        type = _response$error.type,
	                        message = _response$error.message;
	
	
	                    var error = new Error(message);
	                    error.code = code;
	                    error.type = type;
	
	                    reject(error);
	                  } else {
	                    resolve(response);
	                  }
	                }], after));
	              }));
	
	            case 4:
	            case 'end':
	              return _context2.stop();
	          }
	        }
	      }, _callee2, this);
	    }));
	
	    function process(_x2) {
	      return _ref2.apply(this, arguments);
	    }
	
	    return process;
	  }();
	
	  Facebook.prototype.ui = function () {
	    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(options) {
	      return _regenerator2.default.wrap(function _callee3$(_context3) {
	        while (1) {
	          switch (_context3.prev = _context3.next) {
	            case 0:
	              return _context3.abrupt('return', this.process('ui', [options]));
	
	            case 1:
	            case 'end':
	              return _context3.stop();
	          }
	        }
	      }, _callee3, this);
	    }));
	
	    function ui(_x5) {
	      return _ref3.apply(this, arguments);
	    }
	
	    return ui;
	  }();
	
	  Facebook.prototype.api = function () {
	    var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(path) {
	      var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Method.GET;
	      var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	      return _regenerator2.default.wrap(function _callee4$(_context4) {
	        while (1) {
	          switch (_context4.prev = _context4.next) {
	            case 0:
	              return _context4.abrupt('return', this.process('api', [path, method, params]));
	
	            case 1:
	            case 'end':
	              return _context4.stop();
	          }
	        }
	      }, _callee4, this);
	    }));
	
	    function api(_x6) {
	      return _ref4.apply(this, arguments);
	    }
	
	    return api;
	  }();
	
	  Facebook.prototype.login = function () {
	    var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
	      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
	      return _regenerator2.default.wrap(function _callee5$(_context5) {
	        while (1) {
	          switch (_context5.prev = _context5.next) {
	            case 0:
	              return _context5.abrupt('return', this.process('login', [], [opts]));
	
	            case 1:
	            case 'end':
	              return _context5.stop();
	          }
	        }
	      }, _callee5, this);
	    }));
	
	    function login() {
	      return _ref5.apply(this, arguments);
	    }
	
	    return login;
	  }();
	
	  Facebook.prototype.logout = function () {
	    var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6() {
	      return _regenerator2.default.wrap(function _callee6$(_context6) {
	        while (1) {
	          switch (_context6.prev = _context6.next) {
	            case 0:
	              return _context6.abrupt('return', this.process('logout'));
	
	            case 1:
	            case 'end':
	              return _context6.stop();
	          }
	        }
	      }, _callee6, this);
	    }));
	
	    function logout() {
	      return _ref6.apply(this, arguments);
	    }
	
	    return logout;
	  }();
	
	  Facebook.prototype.getLoginStatus = function () {
	    var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7() {
	      return _regenerator2.default.wrap(function _callee7$(_context7) {
	        while (1) {
	          switch (_context7.prev = _context7.next) {
	            case 0:
	              return _context7.abrupt('return', this.process('getLoginStatus'));
	
	            case 1:
	            case 'end':
	              return _context7.stop();
	          }
	        }
	      }, _callee7, this);
	    }));
	
	    function getLoginStatus() {
	      return _ref7.apply(this, arguments);
	    }
	
	    return getLoginStatus;
	  }();
	
	  Facebook.prototype.getAuthResponse = function () {
	    var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8() {
	      return _regenerator2.default.wrap(function _callee8$(_context8) {
	        while (1) {
	          switch (_context8.prev = _context8.next) {
	            case 0:
	              return _context8.abrupt('return', this.process('getAuthResponse'));
	
	            case 1:
	            case 'end':
	              return _context8.stop();
	          }
	        }
	      }, _callee8, this);
	    }));
	
	    function getAuthResponse() {
	      return _ref8.apply(this, arguments);
	    }
	
	    return getAuthResponse;
	  }();
	
	  Facebook.prototype.getTokenDetail = function () {
	    var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9() {
	      var response;
	      return _regenerator2.default.wrap(function _callee9$(_context9) {
	        while (1) {
	          switch (_context9.prev = _context9.next) {
	            case 0:
	              _context9.next = 2;
	              return this.getLoginStatus();
	
	            case 2:
	              response = _context9.sent;
	
	              if (!(response.status === _LoginStatus2.default.CONNECTED && response.authResponse)) {
	                _context9.next = 5;
	                break;
	              }
	
	              return _context9.abrupt('return', response.authResponse);
	
	            case 5:
	              throw new Error('Token is undefined');
	
	            case 6:
	            case 'end':
	              return _context9.stop();
	          }
	        }
	      }, _callee9, this);
	    }));
	
	    function getTokenDetail() {
	      return _ref9.apply(this, arguments);
	    }
	
	    return getTokenDetail;
	  }();
	
	  Facebook.prototype.getProfile = function () {
	    var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10(params) {
	      return _regenerator2.default.wrap(function _callee10$(_context10) {
	        while (1) {
	          switch (_context10.prev = _context10.next) {
	            case 0:
	              return _context10.abrupt('return', this.api('/me', Method.GET, params));
	
	            case 1:
	            case 'end':
	              return _context10.stop();
	          }
	        }
	      }, _callee10, this);
	    }));
	
	    function getProfile(_x10) {
	      return _ref10.apply(this, arguments);
	    }
	
	    return getProfile;
	  }();
	
	  Facebook.prototype.getTokenDetailWithProfile = function () {
	    var _ref11 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee11(params) {
	      var tokenDetail, profile;
	      return _regenerator2.default.wrap(function _callee11$(_context11) {
	        while (1) {
	          switch (_context11.prev = _context11.next) {
	            case 0:
	              _context11.next = 2;
	              return this.getTokenDetail();
	
	            case 2:
	              tokenDetail = _context11.sent;
	              _context11.next = 5;
	              return this.getProfile(params);
	
	            case 5:
	              profile = _context11.sent;
	              return _context11.abrupt('return', {
	                profile: profile,
	                tokenDetail: tokenDetail
	              });
	
	            case 7:
	            case 'end':
	              return _context11.stop();
	          }
	        }
	      }, _callee11, this);
	    }));
	
	    function getTokenDetailWithProfile(_x11) {
	      return _ref11.apply(this, arguments);
	    }
	
	    return getTokenDetailWithProfile;
	  }();
	
	  Facebook.prototype.getToken = function () {
	    var _ref12 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee12() {
	      var authResponse;
	      return _regenerator2.default.wrap(function _callee12$(_context12) {
	        while (1) {
	          switch (_context12.prev = _context12.next) {
	            case 0:
	              _context12.next = 2;
	              return this.getTokenDetail();
	
	            case 2:
	              authResponse = _context12.sent;
	              return _context12.abrupt('return', authResponse.accessToken);
	
	            case 4:
	            case 'end':
	              return _context12.stop();
	          }
	        }
	      }, _callee12, this);
	    }));
	
	    function getToken() {
	      return _ref12.apply(this, arguments);
	    }
	
	    return getToken;
	  }();
	
	  Facebook.prototype.getUserId = function () {
	    var _ref13 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee13() {
	      var authResponse;
	      return _regenerator2.default.wrap(function _callee13$(_context13) {
	        while (1) {
	          switch (_context13.prev = _context13.next) {
	            case 0:
	              _context13.next = 2;
	              return this.getTokenDetail();
	
	            case 2:
	              authResponse = _context13.sent;
	              return _context13.abrupt('return', authResponse.userID);
	
	            case 4:
	            case 'end':
	              return _context13.stop();
	          }
	        }
	      }, _callee13, this);
	    }));
	
	    function getUserId() {
	      return _ref13.apply(this, arguments);
	    }
	
	    return getUserId;
	  }();
	
	  Facebook.prototype.sendInvite = function () {
	    var _ref14 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee14(to, options) {
	      return _regenerator2.default.wrap(function _callee14$(_context14) {
	        while (1) {
	          switch (_context14.prev = _context14.next) {
	            case 0:
	              return _context14.abrupt('return', this.ui((0, _extends3.default)({
	                to: to,
	                method: 'apprequests'
	              }, options)));
	
	            case 1:
	            case 'end':
	              return _context14.stop();
	          }
	        }
	      }, _callee14, this);
	    }));
	
	    function sendInvite(_x12, _x13) {
	      return _ref14.apply(this, arguments);
	    }
	
	    return sendInvite;
	  }();
	
	  Facebook.prototype.postAction = function () {
	    var _ref15 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee15(ogNamespace, ogAction, ogObject, ogObjectUrl, noFeedStory) {
	      var url;
	      return _regenerator2.default.wrap(function _callee15$(_context15) {
	        while (1) {
	          switch (_context15.prev = _context15.next) {
	            case 0:
	              url = '/me/' + ogNamespace + ':' + ogAction + '?' + ogObject + '=' + encodeURIComponent(ogObjectUrl);
	
	
	              if (noFeedStory === true) {
	                url += '&no_feed_story=true';
	              }
	
	              return _context15.abrupt('return', this.api(url, Method.POST));
	
	            case 3:
	            case 'end':
	              return _context15.stop();
	          }
	        }
	      }, _callee15, this);
	    }));
	
	    function postAction(_x14, _x15, _x16, _x17, _x18) {
	      return _ref15.apply(this, arguments);
	    }
	
	    return postAction;
	  }();
	
	  Facebook.prototype.getPermissions = function () {
	    var _ref16 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee16() {
	      var response;
	      return _regenerator2.default.wrap(function _callee16$(_context16) {
	        while (1) {
	          switch (_context16.prev = _context16.next) {
	            case 0:
	              _context16.next = 2;
	              return this.api('/me/permissions');
	
	            case 2:
	              response = _context16.sent;
	              return _context16.abrupt('return', response.data);
	
	            case 4:
	            case 'end':
	              return _context16.stop();
	          }
	        }
	      }, _callee16, this);
	    }));
	
	    function getPermissions() {
	      return _ref16.apply(this, arguments);
	    }
	
	    return getPermissions;
	  }();
	
	  Facebook.prototype.hasPermissions = function () {
	    var _ref17 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee17(permissions) {
	      var usersPermissions, findedPermissions;
	      return _regenerator2.default.wrap(function _callee17$(_context17) {
	        while (1) {
	          switch (_context17.prev = _context17.next) {
	            case 0:
	              _context17.next = 2;
	              return this.getPermissions();
	
	            case 2:
	              usersPermissions = _context17.sent;
	              findedPermissions = permissions.filter(function (p) {
	                var currentPermission = usersPermissions.find(function (row) {
	                  var permission = row.permission,
	                      status = row.status;
	
	                  return status === 'granted' && permission === p;
	                });
	
	                return !!currentPermission;
	              });
	              return _context17.abrupt('return', findedPermissions.length === permissions.length);
	
	            case 5:
	            case 'end':
	              return _context17.stop();
	          }
	        }
	      }, _callee17, this);
	    }));
	
	    function hasPermissions(_x19) {
	      return _ref17.apply(this, arguments);
	    }
	
	    return hasPermissions;
	  }();
	
	  Facebook.prototype.subscribe = function () {
	    var _ref18 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee18(eventName, callback) {
	      var fb;
	      return _regenerator2.default.wrap(function _callee18$(_context18) {
	        while (1) {
	          switch (_context18.prev = _context18.next) {
	            case 0:
	              _context18.next = 2;
	              return this.init();
	
	            case 2:
	              fb = _context18.sent;
	
	              fb.Event.subscribe(eventName, callback);
	
	            case 4:
	            case 'end':
	              return _context18.stop();
	          }
	        }
	      }, _callee18, this);
	    }));
	
	    function subscribe(_x20, _x21) {
	      return _ref18.apply(this, arguments);
	    }
	
	    return subscribe;
	  }();
	
	  Facebook.prototype.unsubscribe = function () {
	    var _ref19 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee19(eventName, callback) {
	      var fb;
	      return _regenerator2.default.wrap(function _callee19$(_context19) {
	        while (1) {
	          switch (_context19.prev = _context19.next) {
	            case 0:
	              _context19.next = 2;
	              return this.init();
	
	            case 2:
	              fb = _context19.sent;
	
	              fb.Event.unsubscribe(eventName, callback);
	
	            case 4:
	            case 'end':
	              return _context19.stop();
	          }
	        }
	      }, _callee19, this);
	    }));
	
	    function unsubscribe(_x22, _x23) {
	      return _ref19.apply(this, arguments);
	    }
	
	    return unsubscribe;
	  }();
	
	  Facebook.prototype.parse = function () {
	    var _ref20 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee20(parentNode) {
	      var fb;
	      return _regenerator2.default.wrap(function _callee20$(_context20) {
	        while (1) {
	          switch (_context20.prev = _context20.next) {
	            case 0:
	              _context20.next = 2;
	              return this.init();
	
	            case 2:
	              fb = _context20.sent;
	
	
	              if (typeof parentNode === 'undefined') {
	                fb.XFBML.parse();
	              } else {
	                fb.XFBML.parse(parentNode);
	              }
	
	            case 4:
	            case 'end':
	              return _context20.stop();
	          }
	        }
	      }, _callee20, this);
	    }));
	
	    function parse(_x24) {
	      return _ref20.apply(this, arguments);
	    }
	
	    return parse;
	  }();
	
	  Facebook.prototype.getRequests = function () {
	    var _ref21 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee21() {
	      return _regenerator2.default.wrap(function _callee21$(_context21) {
	        while (1) {
	          switch (_context21.prev = _context21.next) {
	            case 0:
	              return _context21.abrupt('return', this.api('/me/apprequests'));
	
	            case 1:
	            case 'end':
	              return _context21.stop();
	          }
	        }
	      }, _callee21, this);
	    }));
	
	    function getRequests() {
	      return _ref21.apply(this, arguments);
	    }
	
	    return getRequests;
	  }();
	
	  Facebook.prototype.removeRequest = function () {
	    var _ref22 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee22(requestID) {
	      return _regenerator2.default.wrap(function _callee22$(_context22) {
	        while (1) {
	          switch (_context22.prev = _context22.next) {
	            case 0:
	              return _context22.abrupt('return', this.api(requestID, Method.DELETE));
	
	            case 1:
	            case 'end':
	              return _context22.stop();
	          }
	        }
	      }, _callee22, this);
	    }));
	
	    function removeRequest(_x25) {
	      return _ref22.apply(this, arguments);
	    }
	
	    return removeRequest;
	  }();
	
	  Facebook.prototype.setAutoGrow = function () {
	    var _ref23 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee23() {
	      var fb;
	      return _regenerator2.default.wrap(function _callee23$(_context23) {
	        while (1) {
	          switch (_context23.prev = _context23.next) {
	            case 0:
	              _context23.next = 2;
	              return this.init();
	
	            case 2:
	              fb = _context23.sent;
	
	              fb.Canvas.setAutoGrow();
	
	            case 4:
	            case 'end':
	              return _context23.stop();
	          }
	        }
	      }, _callee23, this);
	    }));
	
	    function setAutoGrow() {
	      return _ref23.apply(this, arguments);
	    }
	
	    return setAutoGrow;
	  }();
	
	  Facebook.prototype.paySimple = function () {
	    var _ref24 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee24(product) {
	      var quantity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
	      return _regenerator2.default.wrap(function _callee24$(_context24) {
	        while (1) {
	          switch (_context24.prev = _context24.next) {
	            case 0:
	              return _context24.abrupt('return', this.ui({
	                method: 'pay',
	                action: 'purchaseitem',
	                product: product,
	                quantity: quantity
	              }));
	
	            case 1:
	            case 'end':
	              return _context24.stop();
	          }
	        }
	      }, _callee24, this);
	    }));
	
	    function paySimple(_x26) {
	      return _ref24.apply(this, arguments);
	    }
	
	    return paySimple;
	  }();
	
	  Facebook.prototype.pay = function () {
	    var _ref25 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee25(product, options) {
	      return _regenerator2.default.wrap(function _callee25$(_context25) {
	        while (1) {
	          switch (_context25.prev = _context25.next) {
	            case 0:
	              return _context25.abrupt('return', this.ui((0, _extends3.default)({
	                method: 'pay',
	                action: 'purchaseitem',
	                product: product
	              }, options)));
	
	            case 1:
	            case 'end':
	              return _context25.stop();
	          }
	        }
	      }, _callee25, this);
	    }));
	
	    function pay(_x28, _x29) {
	      return _ref25.apply(this, arguments);
	    }
	
	    return pay;
	  }();
	
	  return Facebook;
	}();
	
	/*
	  sendToFriends: function(options, callback) {
	    if(!options) {
	      options = {};
	    }
	
	    options.method = 'send';
	
	    this.afterLoad(function(err, fbApi) {
	      if(err) {
	        return callback(err);
	      }
	
	      FB.ui(options, function(response) {
	        fbApi._callCallbackByResponse(callback, response);
	      });
	    });
	  },
	
	  sendMessage: function(message, name, caption, description, url, imgUrl, callback) {
	    this.afterLoad(function(err, fbApi) {
	      if(err) {
	        return callback(err);
	      }
	
	      FB.ui({
	        method: 'stream.publish',
	        message: message,
	        attachment: {
	          name: name,
	          caption: caption,
	          description: description,
	          href: url,
	          media:[{
	            type: 'image',
	            src:  imgUrl,
	            href: url
	          }]
	        },
	        action_links: [{
	          text: 'Code',
	          href: url
	        }],
	        user_prompt_message: message
	      },
	      function(response) {
	        fbApi._callCallbackByResponse(callback, response);
	      });
	    });
	  },
	
	  sendInviteForm: function(options, callback) {
	    if(typeof options === 'function') {
	      callback = options;
	      options = {};
	    }
	
	    this.afterLoad(function(err, fbApi) {
	      if(err) {
	        return callback(err);
	      }
	
	      options.method = options.method || 'apprequests';
	
	
	      FB.ui(options, function(response) {
	        fbApi._callCallbackByResponse(callback, response);
	      });
	    });
	  },
	
	  checkPageLike: function(pageID, callback) {
	    this.afterLoad(function(err, fbApi) {
	      if(err) {
	        return callback(err);
	      }
	
	      fbApi.getUserID(function(err, userID) {
	        if(err) {
	          return callback(err);
	        }
	
	        var fqlQuery = `SELECT uid FROM page_fan WHERE page_id = ${pageID} and uid = ${userID}`;
	        var query = FB.Data.query(fqlQuery);
	
	        query.wait(function(rows) {
	          if (rows.length === 1 && rows[0].uid === userID) {
	            callback(null, true, query);
	          }
	          else {
	            callback(null, false, query);
	          }
	        });
	      });
	    });
	  },
	
	  sendMessageToFriend: function (friendID, link, callback) {
	    this.afterLoad(function(err, fbApi) {
	      if(err) {
	        return callback(err);
	      }
	
	      FB.ui({
	        to: friendID,
	        method: 'send',
	        link: link
	      }, function(response) {
	        fbApi._callCallbackByResponse(callback, response);
	      });
	    });
	  },
	
	  _prepareUsers: function(data) {
	    var users=[];
	
	    for(var index in data) {
	      var userData=data[index];
	
	      var user = {
	        provider_uid: 'facebook'+'_'+userData.uid,
	        provider: 'facebook',
	        id: userData.uid,
	        name: userData.name,
	        first_name: userData.first_name,
	        last_name: userData.last_name,
	        status: (userData.status!==null) ? userData.status : null,
	        image: '//graph.facebook.com/'+userData.uid+'/picture?'
	      };
	
	      users.push(user);
	    }
	
	    return users;
	  },
	
	  getUserList: function(callback) {
	    this.afterLoad(function(err, fbApi) {
	      if(err) {
	        return callback(err);
	      }
	
	      FB.api('fql', {
	        q: `
	          SELECT uid, name, first_name, last_name, online_presence, status
	          FROM user
	          WHERE uid IN
	            ( SELECT uid2 FROM friend WHERE uid1 = me()) ORDER BY name
	        `,
	      }, function (response)
	      {
	        var users = fbApi._prepareUsers(response.data);
	        callback(null, users, response);
	      });
	    });
	  },
	
	  postFeed: function(options, callback) {
	    this.afterLoad(function(err, fbApi) {
	      if(err) {
	        return callback(err);
	      }
	
	      options.method='feed';
	
	      FB.ui(options, function(response) {
	        fbApi._callCallbackByResponse(callback, response);
	      });
	    });
	  },
	
	  //need publish_stream
	  createAlbum: function(name, description, callback) {
	    this.afterLoad(function(err, fbApi) {
	      if(err) {
	        return callback(err);
	      }
	
	      FB.api('/me/albums', 'post', {
	        name: name,
	        description: description
	      },function(response) {
	        fbApi._callCallbackByResponse(callback, response);
	      });
	    });
	  },
	
	  //need publish_stream
	  addImageToAlbum: function(albumID, imageURL, message, callback) {
	    this.afterLoad(function(err, fbApi) {
	      if(err) {
	        return callback(err);
	      }
	
	      FB.api('/'+albumID+'/photos', 'post', {
	        message: message,
	        url: imageURL
	      }, function(response) {
	        fbApi._callCallbackByResponse(callback, response);
	      });
	    });
	  },
	
	  //'user_photos'
	  getAlbums: function(callback) {
	    this.afterLoad(function(err, fbApi) {
	      if(err) {
	        return callback(err);
	      }
	
	      FB.api('/me/albums', function(response) {
	        fbApi._callCallbackByResponse(callback, response);
	      });
	    });
	  },
	
	  //'user_photos'
	  getAlbumPhotos: function(albumID, callback) {
	    this.afterLoad(function(err, fbApi) {
	      if(err) {
	        return callback(err);
	      }
	
	      FB.api('/'+albumID+'/photos', function(response) {
	        fbApi._callCallbackByResponse(callback, response);
	      });
	    });
	  },
	
	  //'user_photos'
	  getAlbumCoverPicture: function(albumID, callback) {
	    this.afterLoad(function(err, fbApi) {
	      if(err) {
	        return callback(err);
	      }
	
	      FB.api('/'+albumID+'/picture', function(response) {
	        fbApi._callCallbackByResponse(callback, response);
	      });
	    });
	  },
	
	  //'publish_stream'
	  postPhoto: function(photoUrl, message, callback) {
	    this.afterLoad(function(err, fbApi) {
	      if(err) {
	        return callback(err);
	      }
	
	      FB.api('/me/photos', 'post', {
	        message: message,
	        url: photoUrl
	      },function(response) {
	        fbApi._callCallbackByResponse(callback, response);
	      });
	    });
	  },
	
	  getPageInfo: function(callback) {
	    this.afterLoad(function(err, fbApi) {
	      if(err) {
	        return callback(err);
	      }
	
	      FB.Canvas.getPageInfo(function(response) {
	        fbApi._callCallbackByResponse(callback, response);
	      });
	    });
	  }
	*/
	
	
	exports.default = Facebook;
	//# sourceMappingURL=Facebook.js.map

/***/ }),

/***/ 908:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.default = exports.FacebookContext = undefined;
	
	var _regenerator = __webpack_require__(21);
	
	var _regenerator2 = _interopRequireDefault(_regenerator);
	
	var _asyncToGenerator2 = __webpack_require__(20);
	
	var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
	
	var _classCallCheck2 = __webpack_require__(5);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(7);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(6);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _class, _temp2;
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _canUseDom = __webpack_require__(872);
	
	var _canUseDom2 = _interopRequireDefault(_canUseDom);
	
	var _Facebook = __webpack_require__(1721);
	
	var _Facebook2 = _interopRequireDefault(_Facebook);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var FacebookContext = exports.FacebookContext = (0, _react.createContext)();
	var api = null;
	
	var Facebook = (_temp2 = _class = function (_Component) {
	  (0, _inherits3.default)(Facebook, _Component);
	
	  function Facebook() {
	    var _this2 = this;
	
	    var _temp, _this, _ret;
	
	    (0, _classCallCheck3.default)(this, Facebook);
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
	      isReady: false
	    }, _this.handleInit = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
	      var isReady, _this$props, _domain, _version, _appId, _cookie, _status, _xfbml, _language, _frictionlessRequests, _wait;
	
	      return _regenerator2.default.wrap(function _callee$(_context) {
	        while (1) {
	          switch (_context.prev = _context.next) {
	            case 0:
	              if (_canUseDom2.default) {
	                _context.next = 2;
	                break;
	              }
	
	              throw new Error('You can not use Facebook without DOM');
	
	            case 2:
	              isReady = _this.state.isReady;
	
	              if (!isReady) {
	                _context.next = 5;
	                break;
	              }
	
	              return _context.abrupt('return', api);
	
	            case 5:
	
	              if (!api) {
	                _this$props = _this.props, _domain = _this$props.domain, _version = _this$props.version, _appId = _this$props.appId, _cookie = _this$props.cookie, _status = _this$props.status, _xfbml = _this$props.xfbml, _language = _this$props.language, _frictionlessRequests = _this$props.frictionlessRequests, _wait = _this$props.wait;
	
	
	                api = new _Facebook2.default({
	                  domain: _domain,
	                  appId: _appId,
	                  version: _version,
	                  cookie: _cookie,
	                  status: _status,
	                  xfbml: _xfbml,
	                  language: _language,
	                  frictionlessRequests: _frictionlessRequests,
	                  wait: _wait
	                });
	              }
	
	              _context.next = 8;
	              return api.init();
	
	            case 8:
	
	              if (!_this.state.isReady) {
	                _this.setState({
	                  isReady: true
	                });
	              }
	
	              return _context.abrupt('return', api);
	
	            case 10:
	            case 'end':
	              return _context.stop();
	          }
	        }
	      }, _callee, _this2);
	    })), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
	  }
	
	  Facebook.prototype.componentDidMount = function componentDidMount() {
	    var wait = this.props.wait;
	
	    if (!wait) {
	      this.handleInit();
	    }
	  };
	
	  Facebook.prototype.render = function render() {
	    var children = this.props.children;
	    var _state = this.state,
	        isReady = _state.isReady,
	        error = _state.error;
	    var handleInit = this.handleInit;
	
	
	    var value = {
	      isReady: isReady,
	      error: error,
	      handleInit: handleInit,
	      api: api
	    };
	
	    return _react2.default.createElement(
	      FacebookContext.Provider,
	      { value: value },
	      children
	    );
	  };
	
	  return Facebook;
	}(_react.Component), _class.defaultProps = {
	  version: 'v3.1',
	  cookie: false,
	  status: false,
	  xfbml: false,
	  language: 'en_US',
	  frictionlessRequests: false,
	  domain: 'connect.facebook.net',
	  children: undefined,
	  wait: false
	}, _temp2);
	exports.default = Facebook;
	//# sourceMappingURL=FacebookProvider.js.map

/***/ }),

/***/ 1722:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends2 = __webpack_require__(8);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _regenerator = __webpack_require__(21);
	
	var _regenerator2 = _interopRequireDefault(_regenerator);
	
	var _asyncToGenerator2 = __webpack_require__(20);
	
	var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
	
	var _classCallCheck2 = __webpack_require__(5);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(7);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(6);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _class, _temp2;
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _getCurrentHref = __webpack_require__(30);
	
	var _getCurrentHref2 = _interopRequireDefault(_getCurrentHref);
	
	var _clearUndefinedProperties = __webpack_require__(129);
	
	var _clearUndefinedProperties2 = _interopRequireDefault(_clearUndefinedProperties);
	
	var _Process = __webpack_require__(86);
	
	var _Process2 = _interopRequireDefault(_Process);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Feed = (_temp2 = _class = function (_Component) {
	  (0, _inherits3.default)(Feed, _Component);
	
	  function Feed() {
	    var _this2 = this;
	
	    var _temp, _this, _ret;
	
	    (0, _classCallCheck3.default)(this, Feed);
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.handleClick = function () {
	      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(evn) {
	        var handleProcess;
	        return _regenerator2.default.wrap(function _callee2$(_context2) {
	          while (1) {
	            switch (_context2.prev = _context2.next) {
	              case 0:
	                evn.preventDefault();
	
	                handleProcess = _this.props.handleProcess;
	                return _context2.abrupt('return', handleProcess(function () {
	                  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(api) {
	                    var _this$props, _this$props$link, link, display, _this$props$appId, appId, redirectURI, from, to, picture, source, name, caption, description, dataRef;
	
	                    return _regenerator2.default.wrap(function _callee$(_context) {
	                      while (1) {
	                        switch (_context.prev = _context.next) {
	                          case 0:
	                            _this$props = _this.props, _this$props$link = _this$props.link, link = _this$props$link === undefined ? (0, _getCurrentHref2.default)() : _this$props$link, display = _this$props.display, _this$props$appId = _this$props.appId, appId = _this$props$appId === undefined ? api.getAppId() : _this$props$appId, redirectURI = _this$props.redirectURI, from = _this$props.from, to = _this$props.to, picture = _this$props.picture, source = _this$props.source, name = _this$props.name, caption = _this$props.caption, description = _this$props.description, dataRef = _this$props.dataRef;
	                            return _context.abrupt('return', api.ui((0, _clearUndefinedProperties2.default)({
	                              method: 'feed',
	                              link: link,
	                              display: display,
	                              app_id: appId,
	                              redirect_uri: redirectURI,
	                              from: from,
	                              to: to,
	                              picture: picture,
	                              source: source,
	                              name: name,
	                              caption: caption,
	                              description: description,
	                              ref: dataRef
	                            })));
	
	                          case 2:
	                          case 'end':
	                            return _context.stop();
	                        }
	                      }
	                    }, _callee, _this2);
	                  }));
	
	                  return function (_x2) {
	                    return _ref2.apply(this, arguments);
	                  };
	                }()));
	
	              case 3:
	              case 'end':
	                return _context2.stop();
	            }
	          }
	        }, _callee2, _this2);
	      }));
	
	      return function (_x) {
	        return _ref.apply(this, arguments);
	      };
	    }(), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
	  }
	
	  Feed.prototype.render = function render() {
	    var _props = this.props,
	        children = _props.children,
	        loading = _props.loading,
	        error = _props.error,
	        data = _props.data;
	
	
	    return children({
	      loading: loading,
	      handleClick: this.handleClick,
	      error: error,
	      data: data
	    });
	  };
	
	  return Feed;
	}(_react.Component), _class.defaultProps = {
	  link: undefined,
	  display: undefined,
	  appId: undefined,
	  redirectURI: undefined,
	  from: undefined,
	  to: undefined,
	  source: undefined,
	  picture: undefined,
	  name: undefined,
	  caption: undefined,
	  description: undefined,
	  dataRef: undefined
	}, _temp2);
	exports.default = (0, _react.forwardRef)(function (props, ref) {
	  return _react2.default.createElement(
	    _Process2.default,
	    null,
	    function (_ref3) {
	      var loading = _ref3.loading,
	          handleProcess = _ref3.handleProcess,
	          error = _ref3.error,
	          data = _ref3.data;
	      return _react2.default.createElement(Feed, (0, _extends3.default)({}, props, {
	        loading: loading,
	        handleProcess: handleProcess,
	        data: data,
	        error: error,
	        ref: ref
	      }));
	    }
	  );
	});
	//# sourceMappingURL=Feed.js.map

/***/ }),

/***/ 1723:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends2 = __webpack_require__(8);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _classCallCheck2 = __webpack_require__(5);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(7);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(6);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _class, _temp;
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Parser = __webpack_require__(19);
	
	var _Parser2 = _interopRequireDefault(_Parser);
	
	var _getCurrentHref = __webpack_require__(30);
	
	var _getCurrentHref2 = _interopRequireDefault(_getCurrentHref);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Group = (_temp = _class = function (_PureComponent) {
	  (0, _inherits3.default)(Group, _PureComponent);
	
	  function Group() {
	    (0, _classCallCheck3.default)(this, Group);
	    return (0, _possibleConstructorReturn3.default)(this, _PureComponent.apply(this, arguments));
	  }
	
	  Group.prototype.componentDidUpdate = function componentDidUpdate() {
	    var handleParse = this.props.handleParse;
	
	    handleParse();
	  };
	
	  Group.prototype.render = function render() {
	    var _props = this.props,
	        style = _props.style,
	        _props$href = _props.href,
	        href = _props$href === undefined ? (0, _getCurrentHref2.default)() : _props$href,
	        width = _props.width,
	        showSocialContext = _props.showSocialContext,
	        showMetaData = _props.showMetaData,
	        children = _props.children,
	        skin = _props.skin;
	
	
	    return _react2.default.createElement(
	      'div',
	      {
	        className: 'fb-group',
	        style: style,
	        'data-href': href,
	        'data-width': width,
	        'data-show-social-context': showSocialContext,
	        'data-show-metadata': showMetaData,
	        'data-skin': skin
	      },
	      children
	    );
	  };
	
	  return Group;
	}(_react.PureComponent), _class.defaultProps = {
	  showSocialContext: undefined,
	  showMetaData: undefined,
	  width: undefined,
	  children: undefined,
	  style: undefined,
	  href: undefined,
	  skin: undefined
	}, _temp);
	exports.default = (0, _react.forwardRef)(function (props, ref) {
	  return _react2.default.createElement(
	    _Parser2.default,
	    null,
	    function (_ref) {
	      var handleParse = _ref.handleParse;
	      return _react2.default.createElement(Group, (0, _extends3.default)({}, props, {
	        handleParse: handleParse,
	        ref: ref
	      }));
	    }
	  );
	});
	//# sourceMappingURL=Group.js.map

/***/ }),

/***/ 42:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends2 = __webpack_require__(8);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _regenerator = __webpack_require__(21);
	
	var _regenerator2 = _interopRequireDefault(_regenerator);
	
	var _asyncToGenerator2 = __webpack_require__(20);
	
	var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
	
	var _classCallCheck2 = __webpack_require__(5);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(7);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(6);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _class, _temp;
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _FacebookProvider = __webpack_require__(908);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Initialize = (_temp = _class = function (_Component) {
	  (0, _inherits3.default)(Initialize, _Component);
	
	  function Initialize() {
	    (0, _classCallCheck3.default)(this, Initialize);
	    return (0, _possibleConstructorReturn3.default)(this, _Component.apply(this, arguments));
	  }
	
	  Initialize.prototype.componentDidMount = function componentDidMount() {
	    this.prepare();
	  };
	
	  Initialize.prototype.prepare = function () {
	    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
	      var _props, onReady, handleInit, api;
	
	      return _regenerator2.default.wrap(function _callee$(_context) {
	        while (1) {
	          switch (_context.prev = _context.next) {
	            case 0:
	              _props = this.props, onReady = _props.onReady, handleInit = _props.handleInit;
	              _context.next = 3;
	              return handleInit();
	
	            case 3:
	              api = _context.sent;
	
	              if (onReady) {
	                onReady(api);
	              }
	
	            case 5:
	            case 'end':
	              return _context.stop();
	          }
	        }
	      }, _callee, this);
	    }));
	
	    function prepare() {
	      return _ref.apply(this, arguments);
	    }
	
	    return prepare;
	  }();
	
	  Initialize.prototype.render = function render() {
	    var _props2 = this.props,
	        children = _props2.children,
	        isReady = _props2.isReady,
	        api = _props2.api;
	
	
	    var childrenProps = {
	      isReady: isReady,
	      api: api
	    };
	
	    if (typeof children === 'function') {
	      return children(childrenProps);
	    }
	
	    return children;
	  };
	
	  return Initialize;
	}(_react.Component), _class.defaultProps = {
	  onReady: undefined,
	  api: undefined
	}, _temp);
	exports.default = (0, _react.forwardRef)(function (props, ref) {
	  return _react2.default.createElement(
	    _FacebookProvider.FacebookContext.Consumer,
	    null,
	    function (_ref2) {
	      var handleInit = _ref2.handleInit,
	          isReady = _ref2.isReady,
	          api = _ref2.api;
	      return _react2.default.createElement(Initialize, (0, _extends3.default)({}, props, {
	        handleInit: handleInit,
	        isReady: isReady,
	        api: api,
	        ref: ref
	      }));
	    }
	  );
	});
	//# sourceMappingURL=Initialize.js.map

/***/ }),

/***/ 1724:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends2 = __webpack_require__(8);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _classCallCheck2 = __webpack_require__(5);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(7);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(6);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _class, _temp;
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Parser = __webpack_require__(19);
	
	var _Parser2 = _interopRequireDefault(_Parser);
	
	var _getCurrentHref = __webpack_require__(30);
	
	var _getCurrentHref2 = _interopRequireDefault(_getCurrentHref);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Like = (_temp = _class = function (_PureComponent) {
	  (0, _inherits3.default)(Like, _PureComponent);
	
	  function Like() {
	    (0, _classCallCheck3.default)(this, Like);
	    return (0, _possibleConstructorReturn3.default)(this, _PureComponent.apply(this, arguments));
	  }
	
	  Like.prototype.componentDidUpdate = function componentDidUpdate() {
	    var handleParse = this.props.handleParse;
	
	    handleParse();
	  };
	
	  Like.prototype.render = function render() {
	    var _props = this.props,
	        _props$href = _props.href,
	        href = _props$href === undefined ? (0, _getCurrentHref2.default)() : _props$href,
	        layout = _props.layout,
	        colorScheme = _props.colorScheme,
	        action = _props.action,
	        showFaces = _props.showFaces,
	        share = _props.share,
	        children = _props.children,
	        width = _props.width,
	        size = _props.size,
	        kidDirectedSite = _props.kidDirectedSite,
	        referral = _props.referral;
	
	
	    return _react2.default.createElement(
	      'div',
	      {
	        className: 'fb-like',
	        'data-ref': referral,
	        'data-href': href,
	        'data-layout': layout,
	        'data-colorscheme': colorScheme,
	        'data-action': action,
	        'data-show-faces': showFaces,
	        'data-share': share,
	        'data-width': width,
	        'data-size': size,
	        'data-kid-directed-site': kidDirectedSite
	      },
	      children
	    );
	  };
	
	  return Like;
	}(_react.PureComponent), _class.defaultProps = {
	  layout: undefined,
	  showFaces: undefined,
	  colorScheme: undefined,
	  action: undefined,
	  share: undefined,
	  size: undefined,
	  kidDirectedSite: undefined,
	  children: undefined,
	  href: undefined,
	  referral: undefined,
	  width: undefined
	}, _temp);
	exports.default = (0, _react.forwardRef)(function (props, ref) {
	  return _react2.default.createElement(
	    _Parser2.default,
	    null,
	    function (_ref) {
	      var handleParse = _ref.handleParse;
	      return _react2.default.createElement(Like, (0, _extends3.default)({}, props, {
	        handleParse: handleParse,
	        ref: ref
	      }));
	    }
	  );
	});
	//# sourceMappingURL=Like.js.map

/***/ }),

/***/ 909:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _regenerator = __webpack_require__(21);
	
	var _regenerator2 = _interopRequireDefault(_regenerator);
	
	var _extends2 = __webpack_require__(8);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _asyncToGenerator2 = __webpack_require__(20);
	
	var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
	
	var _classCallCheck2 = __webpack_require__(5);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(7);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(6);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _class, _temp2;
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Process = __webpack_require__(86);
	
	var _Process2 = _interopRequireDefault(_Process);
	
	var _Fields = __webpack_require__(127);
	
	var _Fields2 = _interopRequireDefault(_Fields);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Login = (_temp2 = _class = function (_Component) {
	  (0, _inherits3.default)(Login, _Component);
	
	  function Login() {
	    var _this2 = this;
	
	    var _temp, _this, _ret;
	
	    (0, _classCallCheck3.default)(this, Login);
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.handleClick = function () {
	      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(evn) {
	        var _this$props, handleProcess, onCompleted, onError;
	
	        return _regenerator2.default.wrap(function _callee2$(_context2) {
	          while (1) {
	            switch (_context2.prev = _context2.next) {
	              case 0:
	                evn.preventDefault();
	
	                _this$props = _this.props, handleProcess = _this$props.handleProcess, onCompleted = _this$props.onCompleted, onError = _this$props.onError;
	                _context2.prev = 2;
	                _context2.next = 5;
	                return handleProcess(function () {
	                  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(api) {
	                    var _this$props2, scope, fields, returnScopes, rerequest, reauthorize, eventKey, loginQpts, authType, response, data;
	
	                    return _regenerator2.default.wrap(function _callee$(_context) {
	                      while (1) {
	                        switch (_context.prev = _context.next) {
	                          case 0:
	                            _this$props2 = _this.props, scope = _this$props2.scope, fields = _this$props2.fields, returnScopes = _this$props2.returnScopes, rerequest = _this$props2.rerequest, reauthorize = _this$props2.reauthorize, eventKey = _this$props2.eventKey;
	                            loginQpts = { scope: scope };
	                            authType = [];
	
	
	                            if (returnScopes) {
	                              loginQpts.return_scopes = true;
	                            }
	
	                            if (rerequest) {
	                              authType.push('rerequest');
	                            }
	
	                            if (reauthorize) {
	                              authType.push('reauthenticate');
	                            }
	
	                            if (authType.length) {
	                              loginQpts.auth_type = authType.join(',');
	                            }
	
	                            _context.next = 9;
	                            return api.login(loginQpts);
	
	                          case 9:
	                            response = _context.sent;
	
	                            if (!(response.status !== 'connected')) {
	                              _context.next = 12;
	                              break;
	                            }
	
	                            throw new Error('Unauthorized user');
	
	                          case 12:
	                            _context.next = 14;
	                            return api.getTokenDetailWithProfile({ fields: fields });
	
	                          case 14:
	                            data = _context.sent;
	
	                            if (!onCompleted) {
	                              _context.next = 18;
	                              break;
	                            }
	
	                            _context.next = 18;
	                            return onCompleted((0, _extends3.default)({}, data, {
	                              eventKey: eventKey
	                            }));
	
	                          case 18:
	                            return _context.abrupt('return', data);
	
	                          case 19:
	                          case 'end':
	                            return _context.stop();
	                        }
	                      }
	                    }, _callee, _this2);
	                  }));
	
	                  return function (_x2) {
	                    return _ref2.apply(this, arguments);
	                  };
	                }());
	
	              case 5:
	                _context2.next = 10;
	                break;
	
	              case 7:
	                _context2.prev = 7;
	                _context2.t0 = _context2['catch'](2);
	
	                if (onError) {
	                  onError(_context2.t0);
	                }
	
	              case 10:
	              case 'end':
	                return _context2.stop();
	            }
	          }
	        }, _callee2, _this2, [[2, 7]]);
	      }));
	
	      return function (_x) {
	        return _ref.apply(this, arguments);
	      };
	    }(), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
	  }
	
	  Login.prototype.render = function render() {
	    var _props = this.props,
	        children = _props.children,
	        loading = _props.loading,
	        error = _props.error,
	        data = _props.data;
	
	
	    return children({
	      loading: loading,
	      handleClick: this.handleClick,
	      error: error,
	      data: data
	    });
	  };
	
	  return Login;
	}(_react.Component), _class.defaultProps = {
	  scope: '',
	  fields: _Fields2.default,
	  returnScopes: false,
	  rerequest: false,
	  reauthorize: false,
	  onCompleted: undefined,
	  onError: undefined,
	  eventKey: undefined
	}, _temp2);
	exports.default = (0, _react.forwardRef)(function (props, ref) {
	  return _react2.default.createElement(
	    _Process2.default,
	    null,
	    function (_ref3) {
	      var loading = _ref3.loading,
	          handleProcess = _ref3.handleProcess,
	          data = _ref3.data,
	          error = _ref3.error;
	      return _react2.default.createElement(Login, (0, _extends3.default)({}, props, {
	        loading: loading,
	        handleProcess: handleProcess,
	        data: data,
	        error: error,
	        ref: ref
	      }));
	    }
	  );
	});
	//# sourceMappingURL=Login.js.map

/***/ }),

/***/ 1725:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends2 = __webpack_require__(8);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(95);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	exports.default = LoginButton;
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactSpinnerChildren = __webpack_require__(1806);
	
	var _reactSpinnerChildren2 = _interopRequireDefault(_reactSpinnerChildren);
	
	var _Login = __webpack_require__(909);
	
	var _Login2 = _interopRequireDefault(_Login);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function LoginButton(props) {
	  var children = props.children,
	      className = props.className,
	      spinner = props.spinner,
	      spinnerConfig = props.spinnerConfig,
	      rest = (0, _objectWithoutProperties3.default)(props, ['children', 'className', 'spinner', 'spinnerConfig']);
	
	
	  return _react2.default.createElement(
	    _Login2.default,
	    rest,
	    function (_ref) {
	      var loading = _ref.loading,
	          handleClick = _ref.handleClick;
	      return _react2.default.createElement(
	        'button',
	        {
	          type: 'button',
	          className: className,
	          onClick: handleClick,
	          disabled: loading
	        },
	        children,
	        spinner && loading && _react2.default.createElement(_reactSpinnerChildren2.default, {
	          config: spinnerConfig
	        })
	      );
	    }
	  );
	}
	
	LoginButton.defaultProps = (0, _extends3.default)({}, _Login2.default.defaultProps, {
	  className: undefined,
	  spinnerConfig: {},
	  spinner: true
	});
	//# sourceMappingURL=LoginButton.js.map

/***/ }),

/***/ 1726:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends2 = __webpack_require__(8);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _classCallCheck2 = __webpack_require__(5);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(7);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(6);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _class, _temp;
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Parser = __webpack_require__(19);
	
	var _Parser2 = _interopRequireDefault(_Parser);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var MessageUs = (_temp = _class = function (_PureComponent) {
	  (0, _inherits3.default)(MessageUs, _PureComponent);
	
	  function MessageUs() {
	    (0, _classCallCheck3.default)(this, MessageUs);
	    return (0, _possibleConstructorReturn3.default)(this, _PureComponent.apply(this, arguments));
	  }
	
	  MessageUs.prototype.componentDidUpdate = function componentDidUpdate() {
	    var handleParse = this.props.handleParse;
	
	    handleParse();
	  };
	
	  MessageUs.prototype.render = function render() {
	    var _props = this.props,
	        color = _props.color,
	        messengerAppId = _props.messengerAppId,
	        pageId = _props.pageId,
	        children = _props.children,
	        size = _props.size;
	
	
	    return _react2.default.createElement(
	      'div',
	      {
	        className: 'fb-messengermessageus',
	        messenger_app_id: messengerAppId,
	        page_id: pageId,
	        color: color,
	        size: size
	      },
	      children
	    );
	  };
	
	  return MessageUs;
	}(_react.PureComponent), _class.defaultProps = {
	  color: undefined,
	  size: undefined,
	  children: undefined
	}, _temp);
	exports.default = (0, _react.forwardRef)(function (props, ref) {
	  return _react2.default.createElement(
	    _Parser2.default,
	    null,
	    function (_ref) {
	      var handleParse = _ref.handleParse;
	      return _react2.default.createElement(MessageUs, (0, _extends3.default)({}, props, {
	        handleParse: handleParse,
	        ref: ref
	      }));
	    }
	  );
	});
	//# sourceMappingURL=MessageUs.js.map

/***/ }),

/***/ 1727:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends2 = __webpack_require__(8);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _classCallCheck2 = __webpack_require__(5);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(7);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(6);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _class, _temp;
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Parser = __webpack_require__(19);
	
	var _Parser2 = _interopRequireDefault(_Parser);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var MessengerCheckbox = (_temp = _class = function (_PureComponent) {
	  (0, _inherits3.default)(MessengerCheckbox, _PureComponent);
	
	  function MessengerCheckbox() {
	    (0, _classCallCheck3.default)(this, MessengerCheckbox);
	    return (0, _possibleConstructorReturn3.default)(this, _PureComponent.apply(this, arguments));
	  }
	
	  MessengerCheckbox.prototype.componentDidUpdate = function componentDidUpdate() {
	    var handleParse = this.props.handleParse;
	
	    handleParse();
	  };
	
	  MessengerCheckbox.prototype.render = function render() {
	    var _props = this.props,
	        origin = _props.origin,
	        prechecked = _props.prechecked,
	        allowLogin = _props.allowLogin,
	        userRef = _props.userRef,
	        messengerAppId = _props.messengerAppId,
	        pageId = _props.pageId,
	        children = _props.children,
	        size = _props.size,
	        centerAlign = _props.centerAlign,
	        skin = _props.skin;
	
	
	    return _react2.default.createElement(
	      'div',
	      {
	        className: 'fb-messenger-checkbox',
	        messenger_app_id: messengerAppId,
	        page_id: pageId,
	        size: size,
	        origin: origin,
	        user_ref: userRef,
	        prechecked: prechecked,
	        allow_login: allowLogin,
	        skin: skin,
	        center_align: centerAlign
	      },
	      children
	    );
	  };
	
	  return MessengerCheckbox;
	}(_react.PureComponent), _class.defaultProps = {
	  size: undefined,
	  allowLogin: undefined,
	  prechecked: undefined,
	  userRef: undefined,
	  children: undefined,
	  origin: undefined,
	  skin: undefined,
	  centerAlign: undefined
	}, _temp);
	exports.default = (0, _react.forwardRef)(function (props, ref) {
	  return _react2.default.createElement(
	    _Parser2.default,
	    null,
	    function (_ref) {
	      var handleParse = _ref.handleParse;
	      return _react2.default.createElement(MessengerCheckbox, (0, _extends3.default)({}, props, {
	        handleParse: handleParse,
	        ref: ref
	      }));
	    }
	  );
	});
	//# sourceMappingURL=MessengerCheckbox.js.map

/***/ }),

/***/ 1728:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends2 = __webpack_require__(8);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _classCallCheck2 = __webpack_require__(5);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(7);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(6);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _class, _temp;
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Parser = __webpack_require__(19);
	
	var _Parser2 = _interopRequireDefault(_Parser);
	
	var _getCurrentHref = __webpack_require__(30);
	
	var _getCurrentHref2 = _interopRequireDefault(_getCurrentHref);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Page = (_temp = _class = function (_PureComponent) {
	  (0, _inherits3.default)(Page, _PureComponent);
	
	  function Page() {
	    (0, _classCallCheck3.default)(this, Page);
	    return (0, _possibleConstructorReturn3.default)(this, _PureComponent.apply(this, arguments));
	  }
	
	  Page.prototype.componentDidUpdate = function componentDidUpdate() {
	    var handleParse = this.props.handleParse;
	
	    handleParse();
	  };
	
	  Page.prototype.render = function render() {
	    var _props = this.props,
	        style = _props.style,
	        _props$href = _props.href,
	        href = _props$href === undefined ? (0, _getCurrentHref2.default)() : _props$href,
	        tabs = _props.tabs,
	        hideCover = _props.hideCover,
	        width = _props.width,
	        height = _props.height,
	        showFacepile = _props.showFacepile,
	        hideCTA = _props.hideCTA,
	        smallHeader = _props.smallHeader,
	        adaptContainerWidth = _props.adaptContainerWidth,
	        children = _props.children;
	
	
	    return _react2.default.createElement(
	      'div',
	      {
	        className: 'fb-page',
	        style: style,
	        'data-tabs': tabs,
	        'data-hide-cover': hideCover,
	        'data-show-facepile': showFacepile,
	        'data-hide-cta': hideCTA,
	        'data-href': href,
	        'data-small-header': smallHeader,
	        'data-adapt-container-width': adaptContainerWidth,
	        'data-height': height,
	        'data-width': width
	      },
	      children
	    );
	  };
	
	  return Page;
	}(_react.PureComponent), _class.defaultProps = {
	  width: undefined,
	  height: undefined,
	  tabs: undefined,
	  hideCover: undefined,
	  showFacepile: undefined,
	  hideCTA: undefined,
	  smallHeader: undefined,
	  adaptContainerWidth: undefined,
	  children: undefined,
	  style: undefined,
	  href: undefined
	}, _temp);
	exports.default = (0, _react.forwardRef)(function (props, ref) {
	  return _react2.default.createElement(
	    _Parser2.default,
	    null,
	    function (_ref) {
	      var handleParse = _ref.handleParse;
	      return _react2.default.createElement(Page, (0, _extends3.default)({}, props, {
	        handleParse: handleParse,
	        ref: ref
	      }));
	    }
	  );
	});
	//# sourceMappingURL=Page.js.map

/***/ }),

/***/ 19:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.default = undefined;
	
	var _classCallCheck2 = __webpack_require__(5);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(7);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(6);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _class, _temp2;
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Initialize = __webpack_require__(42);
	
	var _Initialize2 = _interopRequireDefault(_Initialize);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Parser = (_temp2 = _class = function (_Component) {
	  (0, _inherits3.default)(Parser, _Component);
	
	  function Parser() {
	    var _temp, _this, _ret;
	
	    (0, _classCallCheck3.default)(this, Parser);
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {}, _this.handleReady = function (api) {
	      _this.setState({
	        api: api
	      }, _this.handleParse);
	    }, _this.handleContainer = function (container) {
	      _this.setState({
	        container: container
	      }, _this.handleParse);
	    }, _this.handleParse = function () {
	      var _this$state = _this.state,
	          api = _this$state.api,
	          container = _this$state.container;
	
	      if (!api || !container) {
	        return;
	      }
	
	      api.parse(container);
	    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
	  }
	
	  Parser.prototype.render = function render() {
	    var _props = this.props,
	        className = _props.className,
	        children = _props.children;
	
	
	    return _react2.default.createElement(
	      'div',
	      { className: className, ref: this.handleContainer },
	      _react2.default.createElement(
	        _Initialize2.default,
	        { onReady: this.handleReady },
	        children({
	          handleParse: this.handleParse
	        })
	      )
	    );
	  };
	
	  return Parser;
	}(_react.Component), _class.defaultProps = {
	  className: undefined
	}, _temp2);
	exports.default = Parser;
	//# sourceMappingURL=Parser.js.map

/***/ }),

/***/ 86:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.default = undefined;
	
	var _regenerator = __webpack_require__(21);
	
	var _regenerator2 = _interopRequireDefault(_regenerator);
	
	var _asyncToGenerator2 = __webpack_require__(20);
	
	var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
	
	var _classCallCheck2 = __webpack_require__(5);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(7);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(6);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Initialize = __webpack_require__(42);
	
	var _Initialize2 = _interopRequireDefault(_Initialize);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Process = function (_Component) {
	  (0, _inherits3.default)(Process, _Component);
	
	  function Process() {
	    var _this2 = this;
	
	    var _temp, _this, _ret;
	
	    (0, _classCallCheck3.default)(this, Process);
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
	      api: undefined
	    }, _this.handleProcess = function () {
	      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(fn) {
	        var _api, _data;
	
	        return _regenerator2.default.wrap(function _callee$(_context) {
	          while (1) {
	            switch (_context.prev = _context.next) {
	              case 0:
	                _this.setState({
	                  data: undefined,
	                  error: undefined,
	                  loading: true
	                });
	
	                _context.prev = 1;
	                _api = _this.state.api;
	
	                if (_api) {
	                  _context.next = 5;
	                  break;
	                }
	
	                throw new Error('Facebook is not initialized. Wait for isReady');
	
	              case 5:
	                _context.next = 7;
	                return fn(_api);
	
	              case 7:
	                _data = _context.sent;
	
	
	                _this.setState({
	                  data: _data,
	                  loading: false
	                });
	
	                return _context.abrupt('return', _data);
	
	              case 12:
	                _context.prev = 12;
	                _context.t0 = _context['catch'](1);
	
	                _this.setState({
	                  error: _context.t0,
	                  loading: false
	                });
	
	                throw _context.t0;
	
	              case 16:
	              case 'end':
	                return _context.stop();
	            }
	          }
	        }, _callee, _this2, [[1, 12]]);
	      }));
	
	      return function (_x) {
	        return _ref.apply(this, arguments);
	      };
	    }(), _this.handleReady = function (api) {
	      _this.setState({
	        api: api
	      });
	    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
	  }
	
	  Process.prototype.render = function render() {
	    var children = this.props.children;
	    var _state = this.state,
	        api = _state.api,
	        loading = _state.loading,
	        data = _state.data,
	        error = _state.error;
	
	
	    return _react2.default.createElement(
	      _Initialize2.default,
	      { onReady: this.handleReady },
	      children({
	        loading: !api || loading,
	        handleProcess: this.handleProcess,
	        data: data,
	        error: error
	      })
	    );
	  };
	
	  return Process;
	}(_react.Component);
	
	exports.default = Process;
	//# sourceMappingURL=Process.js.map

/***/ }),

/***/ 1729:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.default = undefined;
	
	var _regenerator = __webpack_require__(21);
	
	var _regenerator2 = _interopRequireDefault(_regenerator);
	
	var _asyncToGenerator2 = __webpack_require__(20);
	
	var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
	
	var _classCallCheck2 = __webpack_require__(5);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(7);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(6);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _class, _temp2;
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Initialize = __webpack_require__(42);
	
	var _Initialize2 = _interopRequireDefault(_Initialize);
	
	var _Subscribe = __webpack_require__(126);
	
	var _Subscribe2 = _interopRequireDefault(_Subscribe);
	
	var _Fields = __webpack_require__(127);
	
	var _Fields2 = _interopRequireDefault(_Fields);
	
	var _LoginStatus = __webpack_require__(128);
	
	var _LoginStatus2 = _interopRequireDefault(_LoginStatus);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Profile = (_temp2 = _class = function (_Component) {
	  (0, _inherits3.default)(Profile, _Component);
	
	  function Profile() {
	    var _this2 = this;
	
	    var _temp, _this, _ret;
	
	    (0, _classCallCheck3.default)(this, Profile);
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
	      loading: true
	    }, _this.handleReady = function () {
	      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(api) {
	        return _regenerator2.default.wrap(function _callee$(_context) {
	          while (1) {
	            switch (_context.prev = _context.next) {
	              case 0:
	                _this.api = api;
	
	                _this.updateProfile();
	
	              case 2:
	              case 'end':
	                return _context.stop();
	            }
	          }
	        }, _callee, _this2);
	      }));
	
	      return function (_x) {
	        return _ref.apply(this, arguments);
	      };
	    }(), _this.handleStatusChange = function () {
	      _this.updateProfile();
	    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
	  }
	
	  Profile.prototype.updateProfile = function () {
	    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
	      var api, fields, response, _profile;
	
	      return _regenerator2.default.wrap(function _callee2$(_context2) {
	        while (1) {
	          switch (_context2.prev = _context2.next) {
	            case 0:
	              api = this.api, fields = this.props.fields;
	
	              if (api) {
	                _context2.next = 3;
	                break;
	              }
	
	              return _context2.abrupt('return');
	
	            case 3:
	              _context2.prev = 3;
	              _context2.next = 6;
	              return api.getLoginStatus();
	
	            case 6:
	              response = _context2.sent;
	
	              if (!(response.status !== _LoginStatus2.default.CONNECTED)) {
	                _context2.next = 10;
	                break;
	              }
	
	              this.setState({
	                profile: undefined,
	                loading: false,
	                error: undefined
	              });
	
	              return _context2.abrupt('return');
	
	            case 10:
	              _context2.next = 12;
	              return api.getProfile({
	                fields: fields
	              });
	
	            case 12:
	              _profile = _context2.sent;
	
	
	              this.setState({
	                profile: _profile,
	                loading: false,
	                error: undefined
	              });
	              _context2.next = 19;
	              break;
	
	            case 16:
	              _context2.prev = 16;
	              _context2.t0 = _context2['catch'](3);
	
	              this.setState({
	                profile: undefined,
	                loading: false,
	                error: _context2.t0
	              });
	
	            case 19:
	            case 'end':
	              return _context2.stop();
	          }
	        }
	      }, _callee2, this, [[3, 16]]);
	    }));
	
	    function updateProfile() {
	      return _ref2.apply(this, arguments);
	    }
	
	    return updateProfile;
	  }();
	
	  Profile.prototype.render = function render() {
	    var children = this.props.children;
	    var _state = this.state,
	        profile = _state.profile,
	        loading = _state.loading,
	        error = _state.error;
	
	
	    return _react2.default.createElement(
	      _Initialize2.default,
	      { onReady: this.handleReady },
	      _react2.default.createElement(
	        _Subscribe2.default,
	        { event: 'auth.statusChange', onChange: this.handleStatusChange },
	        children({
	          profile: profile,
	          loading: loading,
	          error: error
	        })
	      )
	    );
	  };
	
	  return Profile;
	}(_react.Component), _class.defaultProps = {
	  fields: _Fields2.default
	}, _temp2);
	exports.default = Profile;
	//# sourceMappingURL=Profile.js.map

/***/ }),

/***/ 1730:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends2 = __webpack_require__(8);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _regenerator = __webpack_require__(21);
	
	var _regenerator2 = _interopRequireDefault(_regenerator);
	
	var _asyncToGenerator2 = __webpack_require__(20);
	
	var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
	
	var _classCallCheck2 = __webpack_require__(5);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(7);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(6);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _class, _temp2;
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _getCurrentHref = __webpack_require__(30);
	
	var _getCurrentHref2 = _interopRequireDefault(_getCurrentHref);
	
	var _clearUndefinedProperties = __webpack_require__(129);
	
	var _clearUndefinedProperties2 = _interopRequireDefault(_clearUndefinedProperties);
	
	var _Process = __webpack_require__(86);
	
	var _Process2 = _interopRequireDefault(_Process);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Send = (_temp2 = _class = function (_Component) {
	  (0, _inherits3.default)(Send, _Component);
	
	  function Send() {
	    var _this2 = this;
	
	    var _temp, _this, _ret;
	
	    (0, _classCallCheck3.default)(this, Send);
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.handleClick = function () {
	      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(evn) {
	        var handleProcess;
	        return _regenerator2.default.wrap(function _callee2$(_context2) {
	          while (1) {
	            switch (_context2.prev = _context2.next) {
	              case 0:
	                evn.preventDefault();
	
	                handleProcess = _this.props.handleProcess;
	                return _context2.abrupt('return', handleProcess(function () {
	                  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(api) {
	                    var _this$props, _this$props$link, link, display, _this$props$appId, appId, to, redirectURI;
	
	                    return _regenerator2.default.wrap(function _callee$(_context) {
	                      while (1) {
	                        switch (_context.prev = _context.next) {
	                          case 0:
	                            _this$props = _this.props, _this$props$link = _this$props.link, link = _this$props$link === undefined ? (0, _getCurrentHref2.default)() : _this$props$link, display = _this$props.display, _this$props$appId = _this$props.appId, appId = _this$props$appId === undefined ? api.getAppId() : _this$props$appId, to = _this$props.to, redirectURI = _this$props.redirectURI;
	                            return _context.abrupt('return', api.ui((0, _clearUndefinedProperties2.default)({
	                              method: 'send',
	                              link: link,
	                              display: display,
	                              app_id: appId,
	                              to: to,
	                              redirect_uri: redirectURI
	                            })));
	
	                          case 2:
	                          case 'end':
	                            return _context.stop();
	                        }
	                      }
	                    }, _callee, _this2);
	                  }));
	
	                  return function (_x2) {
	                    return _ref2.apply(this, arguments);
	                  };
	                }()));
	
	              case 3:
	              case 'end':
	                return _context2.stop();
	            }
	          }
	        }, _callee2, _this2);
	      }));
	
	      return function (_x) {
	        return _ref.apply(this, arguments);
	      };
	    }(), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
	  }
	
	  Send.prototype.render = function render() {
	    var _props = this.props,
	        children = _props.children,
	        loading = _props.loading;
	
	
	    return children({
	      loading: loading,
	      handleClick: this.handleClick
	    });
	  };
	
	  return Send;
	}(_react.Component), _class.defaultProps = {
	  to: undefined,
	  display: undefined,
	  appId: undefined,
	  redirectURI: undefined
	}, _temp2);
	exports.default = (0, _react.forwardRef)(function (props, ref) {
	  return _react2.default.createElement(
	    _Process2.default,
	    null,
	    function (_ref3) {
	      var loading = _ref3.loading,
	          handleProcess = _ref3.handleProcess;
	      return _react2.default.createElement(Send, (0, _extends3.default)({}, props, {
	        loading: loading,
	        handleProcess: handleProcess,
	        ref: ref
	      }));
	    }
	  );
	});
	//# sourceMappingURL=Send.js.map

/***/ }),

/***/ 1731:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends2 = __webpack_require__(8);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _classCallCheck2 = __webpack_require__(5);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(7);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(6);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _class, _temp;
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Parser = __webpack_require__(19);
	
	var _Parser2 = _interopRequireDefault(_Parser);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// import MessengerSize from './constants/MessengerSize';
	// import MessengerColor from './constants/MessengerColor';
	
	var SendToMessenger = (_temp = _class = function (_PureComponent) {
	  (0, _inherits3.default)(SendToMessenger, _PureComponent);
	
	  function SendToMessenger() {
	    (0, _classCallCheck3.default)(this, SendToMessenger);
	    return (0, _possibleConstructorReturn3.default)(this, _PureComponent.apply(this, arguments));
	  }
	
	  SendToMessenger.prototype.componentDidUpdate = function componentDidUpdate() {
	    var handleParse = this.props.handleParse;
	
	    handleParse();
	  };
	
	  SendToMessenger.prototype.render = function render() {
	    var _props = this.props,
	        color = _props.color,
	        messengerAppId = _props.messengerAppId,
	        pageId = _props.pageId,
	        children = _props.children,
	        dataRef = _props.dataRef,
	        size = _props.size;
	
	
	    return _react2.default.createElement(
	      'div',
	      {
	        className: 'fb-send-to-messenger',
	        messenger_app_id: messengerAppId,
	        page_id: pageId,
	        'data-color': color,
	        'data-size': size,
	        'data-ref': dataRef
	      },
	      children
	    );
	  };
	
	  return SendToMessenger;
	}(_react.PureComponent), _class.defaultProps = {
	  color: undefined,
	  size: undefined,
	  dataRef: undefined,
	  children: undefined
	}, _temp);
	exports.default = (0, _react.forwardRef)(function (props, ref) {
	  return _react2.default.createElement(
	    _Parser2.default,
	    null,
	    function (_ref) {
	      var handleParse = _ref.handleParse;
	      return _react2.default.createElement(SendToMessenger, (0, _extends3.default)({}, props, {
	        handleParse: handleParse,
	        ref: ref
	      }));
	    }
	  );
	});
	//# sourceMappingURL=SendToMessenger.js.map

/***/ }),

/***/ 910:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends2 = __webpack_require__(8);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _regenerator = __webpack_require__(21);
	
	var _regenerator2 = _interopRequireDefault(_regenerator);
	
	var _asyncToGenerator2 = __webpack_require__(20);
	
	var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
	
	var _classCallCheck2 = __webpack_require__(5);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(7);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(6);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _class, _temp2;
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _getCurrentHref = __webpack_require__(30);
	
	var _getCurrentHref2 = _interopRequireDefault(_getCurrentHref);
	
	var _clearUndefinedProperties = __webpack_require__(129);
	
	var _clearUndefinedProperties2 = _interopRequireDefault(_clearUndefinedProperties);
	
	var _Process = __webpack_require__(86);
	
	var _Process2 = _interopRequireDefault(_Process);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Share = (_temp2 = _class = function (_Component) {
	  (0, _inherits3.default)(Share, _Component);
	
	  function Share() {
	    var _this2 = this;
	
	    var _temp, _this, _ret;
	
	    (0, _classCallCheck3.default)(this, Share);
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.handleClick = function () {
	      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(evn) {
	        var handleProcess;
	        return _regenerator2.default.wrap(function _callee2$(_context2) {
	          while (1) {
	            switch (_context2.prev = _context2.next) {
	              case 0:
	                evn.preventDefault();
	
	                handleProcess = _this.props.handleProcess;
	                return _context2.abrupt('return', handleProcess(function () {
	                  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(api) {
	                    var _this$props, _this$props$href, href, display, _this$props$appId, appId, hashtag, redirectURI, quote, mobileIframe;
	
	                    return _regenerator2.default.wrap(function _callee$(_context) {
	                      while (1) {
	                        switch (_context.prev = _context.next) {
	                          case 0:
	                            _this$props = _this.props, _this$props$href = _this$props.href, href = _this$props$href === undefined ? (0, _getCurrentHref2.default)() : _this$props$href, display = _this$props.display, _this$props$appId = _this$props.appId, appId = _this$props$appId === undefined ? api.getAppId() : _this$props$appId, hashtag = _this$props.hashtag, redirectURI = _this$props.redirectURI, quote = _this$props.quote, mobileIframe = _this$props.mobileIframe;
	                            return _context.abrupt('return', api.ui((0, _clearUndefinedProperties2.default)({
	                              method: 'share',
	                              href: href,
	                              display: display,
	                              app_id: appId,
	                              hashtag: hashtag,
	                              redirect_uri: redirectURI,
	                              quote: quote,
	                              mobile_iframe: mobileIframe
	                            })));
	
	                          case 2:
	                          case 'end':
	                            return _context.stop();
	                        }
	                      }
	                    }, _callee, _this2);
	                  }));
	
	                  return function (_x2) {
	                    return _ref2.apply(this, arguments);
	                  };
	                }()));
	
	              case 3:
	              case 'end':
	                return _context2.stop();
	            }
	          }
	        }, _callee2, _this2);
	      }));
	
	      return function (_x) {
	        return _ref.apply(this, arguments);
	      };
	    }(), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
	  }
	
	  Share.prototype.render = function render() {
	    var _props = this.props,
	        children = _props.children,
	        loading = _props.loading,
	        error = _props.error,
	        data = _props.data;
	
	
	    return children({
	      loading: loading,
	      handleClick: this.handleClick,
	      error: error,
	      data: data
	    });
	  };
	
	  return Share;
	}(_react.Component), _class.defaultProps = {
	  href: undefined,
	  hashtag: undefined,
	  quote: undefined,
	  mobileIframe: undefined,
	  display: undefined,
	  appId: undefined,
	  redirectURI: undefined
	}, _temp2);
	exports.default = (0, _react.forwardRef)(function (props, ref) {
	  return _react2.default.createElement(
	    _Process2.default,
	    null,
	    function (_ref3) {
	      var loading = _ref3.loading,
	          handleProcess = _ref3.handleProcess,
	          data = _ref3.data,
	          error = _ref3.error;
	      return _react2.default.createElement(Share, (0, _extends3.default)({}, props, {
	        loading: loading,
	        handleProcess: handleProcess,
	        data: data,
	        error: error,
	        ref: ref
	      }));
	    }
	  );
	});
	//# sourceMappingURL=Share.js.map

/***/ }),

/***/ 1732:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends2 = __webpack_require__(8);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(95);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	exports.default = ShareButton;
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Share = __webpack_require__(910);
	
	var _Share2 = _interopRequireDefault(_Share);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function ShareButton(props) {
	  var className = props.className,
	      children = props.children,
	      rest = (0, _objectWithoutProperties3.default)(props, ['className', 'children']);
	
	
	  return _react2.default.createElement(
	    _Share2.default,
	    rest,
	    function (_ref) {
	      var loading = _ref.loading,
	          handleClick = _ref.handleClick;
	      return _react2.default.createElement(
	        'button',
	        {
	          type: 'button',
	          disabled: loading,
	          className: className,
	          onClick: handleClick
	        },
	        children
	      );
	    }
	  );
	}
	
	ShareButton.defaultProps = (0, _extends3.default)({}, _Share2.default.defaultProps, {
	  className: undefined
	});
	//# sourceMappingURL=ShareButton.js.map

/***/ }),

/***/ 1733:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.default = undefined;
	
	var _classCallCheck2 = __webpack_require__(5);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(7);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(6);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _regenerator = __webpack_require__(21);
	
	var _regenerator2 = _interopRequireDefault(_regenerator);
	
	var _asyncToGenerator2 = __webpack_require__(20);
	
	var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
	
	var getLoginStatus = function () {
	  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(api) {
	    var response;
	    return _regenerator2.default.wrap(function _callee$(_context) {
	      while (1) {
	        switch (_context.prev = _context.next) {
	          case 0:
	            _context.next = 2;
	            return api.getLoginStatus();
	
	          case 2:
	            response = _context.sent;
	            return _context.abrupt('return', response.status);
	
	          case 4:
	          case 'end':
	            return _context.stop();
	        }
	      }
	    }, _callee, this);
	  }));
	
	  return function getLoginStatus(_x) {
	    return _ref.apply(this, arguments);
	  };
	}();
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Initialize = __webpack_require__(42);
	
	var _Initialize2 = _interopRequireDefault(_Initialize);
	
	var _Subscribe = __webpack_require__(126);
	
	var _Subscribe2 = _interopRequireDefault(_Subscribe);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Status = function (_Component) {
	  (0, _inherits3.default)(Status, _Component);
	
	  function Status() {
	    var _this2 = this;
	
	    var _temp, _this, _ret;
	
	    (0, _classCallCheck3.default)(this, Status);
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
	      loading: true
	    }, _this.handleReady = function () {
	      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(api) {
	        return _regenerator2.default.wrap(function _callee2$(_context2) {
	          while (1) {
	            switch (_context2.prev = _context2.next) {
	              case 0:
	                _context2.t0 = _this;
	                _context2.next = 3;
	                return getLoginStatus(api);
	
	              case 3:
	                _context2.t1 = _context2.sent;
	                _context2.t2 = {
	                  status: _context2.t1,
	                  loading: false
	                };
	
	                _context2.t0.setState.call(_context2.t0, _context2.t2);
	
	              case 6:
	              case 'end':
	                return _context2.stop();
	            }
	          }
	        }, _callee2, _this2);
	      }));
	
	      return function (_x2) {
	        return _ref2.apply(this, arguments);
	      };
	    }(), _this.handleStatusChange = function (response) {
	      _this.setState({
	        status: response.status,
	        loading: false
	      });
	    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
	  }
	
	  Status.prototype.render = function render() {
	    var children = this.props.children;
	    var _state = this.state,
	        status = _state.status,
	        loading = _state.loading;
	
	
	    return _react2.default.createElement(
	      _Initialize2.default,
	      { onReady: this.handleReady },
	      _react2.default.createElement(
	        _Subscribe2.default,
	        { event: 'auth.statusChange', onChange: this.handleStatusChange },
	        children({
	          status: status,
	          loading: loading
	        })
	      )
	    );
	  };
	
	  return Status;
	}(_react.Component);
	
	exports.default = Status;
	//# sourceMappingURL=Status.js.map

/***/ }),

/***/ 126:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.default = undefined;
	
	var _regenerator = __webpack_require__(21);
	
	var _regenerator2 = _interopRequireDefault(_regenerator);
	
	var _asyncToGenerator2 = __webpack_require__(20);
	
	var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
	
	var _classCallCheck2 = __webpack_require__(5);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(7);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(6);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _class, _temp2, _initialiseProps;
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Initialize = __webpack_require__(42);
	
	var _Initialize2 = _interopRequireDefault(_Initialize);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var LoginStatus = (_temp2 = _class = function (_Component) {
	  (0, _inherits3.default)(LoginStatus, _Component);
	
	  function LoginStatus() {
	    var _temp, _this, _ret;
	
	    (0, _classCallCheck3.default)(this, LoginStatus);
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, _Component.call.apply(_Component, [this].concat(args))), _this), _initialiseProps.call(_this), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
	  }
	
	  LoginStatus.prototype.componentWillUnmount = function componentWillUnmount() {
	    var api = this.state.api,
	        event = this.props.event;
	
	    if (api) {
	      api.unsubscribe(event, this.handleChange);
	    }
	  };
	
	  LoginStatus.prototype.render = function render() {
	    var children = this.props.children;
	
	
	    return _react2.default.createElement(
	      _Initialize2.default,
	      { onReady: this.handleReady },
	      children
	    );
	  };
	
	  return LoginStatus;
	}(_react.Component), _class.defaultProps = {
	  onChange: undefined
	}, _initialiseProps = function _initialiseProps() {
	  var _this2 = this;
	
	  this.state = {};
	
	  this.handleReady = function () {
	    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(api) {
	      var event;
	      return _regenerator2.default.wrap(function _callee$(_context) {
	        while (1) {
	          switch (_context.prev = _context.next) {
	            case 0:
	              event = _this2.props.event;
	
	
	              _this2.setState({
	                api: api
	              });
	
	              _context.next = 4;
	              return api.subscribe(event, _this2.handleChange);
	
	            case 4:
	            case 'end':
	              return _context.stop();
	          }
	        }
	      }, _callee, _this2);
	    }));
	
	    return function (_x) {
	      return _ref.apply(this, arguments);
	    };
	  }();
	
	  this.handleChange = function () {
	    var onChange = _this2.props.onChange;
	
	
	    if (onChange) {
	      onChange.apply(undefined, arguments);
	    }
	  };
	}, _temp2);
	exports.default = LoginStatus;
	//# sourceMappingURL=Subscribe.js.map

/***/ }),

/***/ 1734:
/***/ (function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	exports.default = {
	  LIGHT: 'light',
	  DARK: 'dark'
	};
	//# sourceMappingURL=ColorScheme.js.map

/***/ }),

/***/ 1735:
/***/ (function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	exports.default = {
	  SOCIAL: 'social',
	  REVERSE_TIME: 'reverse_time',
	  TIME: 'time'
	};
	//# sourceMappingURL=CommentsOrderBy.js.map

/***/ }),

/***/ 127:
/***/ (function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	
	// 3.0 fields without app review https://developers.facebook.com/docs/facebook-login/permissions/?locale=en_US#reference-default
	exports.default = ['id', 'first_name', 'last_name', 'middle_name', 'name', 'name_format', 'picture', 'short_name', 'email'];
	//# sourceMappingURL=Fields.js.map

/***/ }),

/***/ 1736:
/***/ (function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	exports.default = {
	  LIKE: 'like',
	  RECOMMEND: 'recommend'
	};
	//# sourceMappingURL=LikeAction.js.map

/***/ }),

/***/ 1737:
/***/ (function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	exports.default = {
	  STANDARD: 'standard',
	  BUTTON_COUNT: 'button_count',
	  BUTTON: 'button',
	  BOX_COUNT: 'box_count'
	};
	//# sourceMappingURL=LikeLayout.js.map

/***/ }),

/***/ 1738:
/***/ (function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	exports.default = {
	  SMALL: 'small',
	  LARGE: 'large'
	};
	//# sourceMappingURL=LikeSize.js.map

/***/ }),

/***/ 128:
/***/ (function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	exports.default = {
	  CONNECTED: 'connected',
	  AUTHORIZATION_EXPIRED: 'authorization_expired',
	  NOT_AUTHORIZED: 'not_authorized',
	  UNKNOWN: 'unknown'
	};
	//# sourceMappingURL=LoginStatus.js.map

/***/ }),

/***/ 1739:
/***/ (function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	exports.default = {
	  BLUE: 'blue',
	  WHITE: 'white'
	};
	//# sourceMappingURL=MessengerColor.js.map

/***/ }),

/***/ 1740:
/***/ (function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	exports.default = {
	  SMALL: 'small',
	  MEDIUM: 'medium',
	  STANDARD: 'standard',
	  LARGE: 'large',
	  XLARGE: 'xlarge'
	};
	//# sourceMappingURL=MessengerSize.js.map

/***/ }),

/***/ 1741:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.Fields = exports.LoginStatus = exports.MessengerColor = exports.MessengerSize = exports.CommentsOrderBy = exports.LikeAction = exports.ColorScheme = exports.LikeLayout = exports.LikeSize = exports.SendToMessenger = exports.MessengerCheckbox = exports.MessageUs = exports.CustomChat = exports.Profile = exports.Status = exports.Subscribe = exports.Group = exports.Feed = exports.CommentsCount = exports.Comments = exports.EmbeddedVideo = exports.EmbeddedPost = exports.LoginButton = exports.Login = exports.Page = exports.ShareButton = exports.Share = exports.Send = exports.Like = exports.Initialize = exports.Parser = exports.FacebookProvider = undefined;
	
	var _FacebookProvider2 = __webpack_require__(908);
	
	var _FacebookProvider3 = _interopRequireDefault(_FacebookProvider2);
	
	var _Parser2 = __webpack_require__(19);
	
	var _Parser3 = _interopRequireDefault(_Parser2);
	
	var _Initialize2 = __webpack_require__(42);
	
	var _Initialize3 = _interopRequireDefault(_Initialize2);
	
	var _Like2 = __webpack_require__(1724);
	
	var _Like3 = _interopRequireDefault(_Like2);
	
	var _Send2 = __webpack_require__(1730);
	
	var _Send3 = _interopRequireDefault(_Send2);
	
	var _Share2 = __webpack_require__(910);
	
	var _Share3 = _interopRequireDefault(_Share2);
	
	var _ShareButton2 = __webpack_require__(1732);
	
	var _ShareButton3 = _interopRequireDefault(_ShareButton2);
	
	var _Page2 = __webpack_require__(1728);
	
	var _Page3 = _interopRequireDefault(_Page2);
	
	var _Login2 = __webpack_require__(909);
	
	var _Login3 = _interopRequireDefault(_Login2);
	
	var _LoginButton2 = __webpack_require__(1725);
	
	var _LoginButton3 = _interopRequireDefault(_LoginButton2);
	
	var _EmbeddedPost2 = __webpack_require__(1719);
	
	var _EmbeddedPost3 = _interopRequireDefault(_EmbeddedPost2);
	
	var _EmbeddedVideo2 = __webpack_require__(1720);
	
	var _EmbeddedVideo3 = _interopRequireDefault(_EmbeddedVideo2);
	
	var _Comments2 = __webpack_require__(1716);
	
	var _Comments3 = _interopRequireDefault(_Comments2);
	
	var _CommentsCount2 = __webpack_require__(1717);
	
	var _CommentsCount3 = _interopRequireDefault(_CommentsCount2);
	
	var _Feed2 = __webpack_require__(1722);
	
	var _Feed3 = _interopRequireDefault(_Feed2);
	
	var _Group2 = __webpack_require__(1723);
	
	var _Group3 = _interopRequireDefault(_Group2);
	
	var _Subscribe2 = __webpack_require__(126);
	
	var _Subscribe3 = _interopRequireDefault(_Subscribe2);
	
	var _Status2 = __webpack_require__(1733);
	
	var _Status3 = _interopRequireDefault(_Status2);
	
	var _Profile2 = __webpack_require__(1729);
	
	var _Profile3 = _interopRequireDefault(_Profile2);
	
	var _CustomChat2 = __webpack_require__(1718);
	
	var _CustomChat3 = _interopRequireDefault(_CustomChat2);
	
	var _MessageUs2 = __webpack_require__(1726);
	
	var _MessageUs3 = _interopRequireDefault(_MessageUs2);
	
	var _MessengerCheckbox2 = __webpack_require__(1727);
	
	var _MessengerCheckbox3 = _interopRequireDefault(_MessengerCheckbox2);
	
	var _SendToMessenger2 = __webpack_require__(1731);
	
	var _SendToMessenger3 = _interopRequireDefault(_SendToMessenger2);
	
	var _LikeSize2 = __webpack_require__(1738);
	
	var _LikeSize3 = _interopRequireDefault(_LikeSize2);
	
	var _LikeLayout2 = __webpack_require__(1737);
	
	var _LikeLayout3 = _interopRequireDefault(_LikeLayout2);
	
	var _ColorScheme2 = __webpack_require__(1734);
	
	var _ColorScheme3 = _interopRequireDefault(_ColorScheme2);
	
	var _LikeAction2 = __webpack_require__(1736);
	
	var _LikeAction3 = _interopRequireDefault(_LikeAction2);
	
	var _CommentsOrderBy2 = __webpack_require__(1735);
	
	var _CommentsOrderBy3 = _interopRequireDefault(_CommentsOrderBy2);
	
	var _MessengerSize2 = __webpack_require__(1740);
	
	var _MessengerSize3 = _interopRequireDefault(_MessengerSize2);
	
	var _MessengerColor2 = __webpack_require__(1739);
	
	var _MessengerColor3 = _interopRequireDefault(_MessengerColor2);
	
	var _LoginStatus2 = __webpack_require__(128);
	
	var _LoginStatus3 = _interopRequireDefault(_LoginStatus2);
	
	var _Fields2 = __webpack_require__(127);
	
	var _Fields3 = _interopRequireDefault(_Fields2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.FacebookProvider = _FacebookProvider3.default;
	exports.Parser = _Parser3.default;
	exports.Initialize = _Initialize3.default;
	exports.Like = _Like3.default;
	exports.Send = _Send3.default;
	exports.Share = _Share3.default;
	exports.ShareButton = _ShareButton3.default;
	exports.Page = _Page3.default;
	exports.Login = _Login3.default;
	exports.LoginButton = _LoginButton3.default;
	exports.EmbeddedPost = _EmbeddedPost3.default;
	exports.EmbeddedVideo = _EmbeddedVideo3.default;
	exports.Comments = _Comments3.default;
	exports.CommentsCount = _CommentsCount3.default;
	exports.Feed = _Feed3.default;
	exports.Group = _Group3.default;
	exports.Subscribe = _Subscribe3.default;
	exports.Status = _Status3.default;
	exports.Profile = _Profile3.default;
	exports.CustomChat = _CustomChat3.default;
	exports.MessageUs = _MessageUs3.default;
	exports.MessengerCheckbox = _MessengerCheckbox3.default;
	exports.SendToMessenger = _SendToMessenger3.default;
	exports.LikeSize = _LikeSize3.default;
	exports.LikeLayout = _LikeLayout3.default;
	exports.ColorScheme = _ColorScheme3.default;
	exports.LikeAction = _LikeAction3.default;
	exports.CommentsOrderBy = _CommentsOrderBy3.default;
	exports.MessengerSize = _MessengerSize3.default;
	exports.MessengerColor = _MessengerColor3.default;
	exports.LoginStatus = _LoginStatus3.default;
	exports.Fields = _Fields3.default;
	//# sourceMappingURL=index.js.map

/***/ }),

/***/ 129:
/***/ (function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	exports.default = clearUndefinedProperties;
	function clearUndefinedProperties(obj) {
	  if (!obj) {
	    return obj;
	  }
	
	  var newObj = {};
	
	  Object.keys(obj).forEach(function (propertyName) {
	    var value = obj[propertyName];
	    if (value !== undefined) {
	      newObj[propertyName] = value;
	    }
	  });
	
	  return newObj;
	}
	//# sourceMappingURL=clearUndefinedProperties.js.map

/***/ }),

/***/ 30:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.default = getCurrentHref;
	
	var _canUseDom = __webpack_require__(872);
	
	var _canUseDom2 = _interopRequireDefault(_canUseDom);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function getCurrentHref() {
	  if (!_canUseDom2.default) {
	    return 'https://www.facebook.com';
	  }
	
	  return window.location.href;
	}
	//# sourceMappingURL=getCurrentHref.js.map

/***/ }),

/***/ 1761:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _iconFactory = __webpack_require__(14);
	
	var _iconFactory2 = _interopRequireDefault(_iconFactory);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var EmailIcon = (0, _iconFactory2.default)('email', {
	  icon: 'M17,22v20h30V22H17z M41.1,25L32,32.1L22.9,25H41.1z M20,39V26.6l12,9.3l12-9.3V39H20z',
	  mask: 'M41.1,25H22.9l9.1,7.1L41.1,25z M44,26.6l-12,9.3l-12-9.3V39h24V26.6z M0,0v64h64V0H0z M47,42H17V22h30V42z',
	  color: '#7f7f7f'
	});
	
	exports.default = EmailIcon;

/***/ }),

/***/ 1762:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _propTypes = __webpack_require__(4);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	var _objectToGetParams = __webpack_require__(9);
	
	var _objectToGetParams2 = _interopRequireDefault(_objectToGetParams);
	
	var _createShareButton = __webpack_require__(11);
	
	var _createShareButton2 = _interopRequireDefault(_createShareButton);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function emailLink(url, _ref) {
	  var subject = _ref.subject,
	      body = _ref.body;
	
	  return 'mailto:' + (0, _objectToGetParams2.default)({ subject: subject, body: body || url });
	}
	
	var EmailShareButton = (0, _createShareButton2.default)('email', emailLink, function (props) {
	  return {
	    subject: props.subject,
	    body: props.body
	  };
	}, {
	  subject: _propTypes2.default.string,
	  body: _propTypes2.default.string
	}, {
	  openWindow: false,
	  onClick: function onClick(link) {
	    window.location.href = link;
	  }
	});
	
	exports.default = EmailShareButton;

/***/ }),

/***/ 1763:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _iconFactory = __webpack_require__(14);
	
	var _iconFactory2 = _interopRequireDefault(_iconFactory);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var FacebookIcon = (0, _iconFactory2.default)('facebook', {
	  icon: 'M34.1,47V33.3h4.6l0.7-5.3h-5.3v-3.4c0-1.5,0.4-2.6,2.6-2.6l2.8,0v-4.8c-0.5-0.1-2.2-0.2-4.1-0.2 c-4.1,0-6.9,2.5-6.9,7V28H24v5.3h4.6V47H34.1z',
	  mask: 'M0,0v64h64V0H0z M39.6,22l-2.8,0c-2.2,0-2.6,1.1-2.6,2.6V28h5.3l-0.7,5.3h-4.6V47h-5.5V33.3H24V28h4.6V24 c0-4.6,2.8-7,6.9-7c2,0,3.6,0.1,4.1,0.2V22z',
	  color: '#3b5998'
	});
	
	exports.default = FacebookIcon;

/***/ }),

/***/ 1764:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _propTypes = __webpack_require__(4);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	var _assert = __webpack_require__(12);
	
	var _assert2 = _interopRequireDefault(_assert);
	
	var _objectToGetParams = __webpack_require__(9);
	
	var _objectToGetParams2 = _interopRequireDefault(_objectToGetParams);
	
	var _createShareButton = __webpack_require__(11);
	
	var _createShareButton2 = _interopRequireDefault(_createShareButton);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function facebookLink(url, _ref) {
	  var quote = _ref.quote,
	      hashtag = _ref.hashtag;
	
	  (0, _assert2.default)(url, 'facebook.url');
	
	  return 'https://www.facebook.com/sharer/sharer.php' + (0, _objectToGetParams2.default)({
	    u: url,
	    quote: quote,
	    hashtag: hashtag
	  });
	}
	
	var FacebookShareButton = (0, _createShareButton2.default)('facebook', facebookLink, function (props) {
	  /* eslint-disable no-console */
	  if (props.picture) {
	    console.warn('FacebookShareButton warning: picture is a deprecated prop.');
	  }
	
	  if (props.title) {
	    console.warn('FacebookShareButton warning: title is a deprecated prop. Use "quote" instead.');
	  }
	
	  if (props.description) {
	    console.warn('FacebookShareButton warning: description is a deprecated prop.\n      Use "quote" instead.');
	  }
	  /* eslint-enable no-console */
	
	  return {
	    quote: props.quote,
	    hashtag: props.hashtag
	  };
	}, {
	  quote: _propTypes2.default.string,
	  hashtag: _propTypes2.default.string
	}, {
	  windowWidth: 550,
	  windowHeight: 400
	});
	
	exports.default = FacebookShareButton;

/***/ }),

/***/ 1765:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _jsonp = __webpack_require__(36);
	
	var _jsonp2 = _interopRequireDefault(_jsonp);
	
	var _shareCountFactory = __webpack_require__(31);
	
	var _shareCountFactory2 = _interopRequireDefault(_shareCountFactory);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function getFacebookShareCount(shareUrl, callback) {
	  var endpoint = 'https://graph.facebook.com/?id=' + shareUrl;
	
	  (0, _jsonp2.default)(endpoint, function (err, data) {
	    callback(!err && data && data.share && data.share.share_count ? data.share.share_count : undefined);
	  });
	}
	
	exports.default = (0, _shareCountFactory2.default)(getFacebookShareCount);

/***/ }),

/***/ 1766:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _iconFactory = __webpack_require__(14);
	
	var _iconFactory2 = _interopRequireDefault(_iconFactory);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var GooglePlusIcon = (0, _iconFactory2.default)('google', {
	  icon: 'M25.3,30.1v3.8h6.3c-0.3,1.6-1.9,4.8-6.3,4.8c-3.8,0-6.9-3.1-6.9-7s3.1-7,6.9-7c2.2,0,3.6,0.9,4.4,1.7l3-2.9c-1.9-1.8-4.4-2.9-7.4-2.9c-6.1,0-11.1,5-11.1,11.1s5,11.1,11.1,11.1c6.4,0,10.7-4.5,10.7-10.9c0-0.7-0.1-1.3-0.2-1.8H25.3L25.3,30.1z M49.8,28.9h-3.2v-3.2h-3.2v3.2h-3.2v3.2h3.2v3.2h3.2v-3.2h3.2',
	  mask: 'M0,0v64h64V0H0z M31.3,19.1c0.3,0.3,0.6,0.7,0.9,1.2c0.3,0.4,0.5,0.9,0.7,1.5c0.2,0.6,0.3,1.3,0.3,2.1 c0,1.4-0.3,2.6-0.9,3.4c-0.3,0.4-0.6,0.8-0.9,1.2c-0.4,0.4-0.8,0.7-1.2,1.1c-0.2,0.2-0.5,0.5-0.7,0.8c-0.2,0.3-0.4,0.7-0.4,1.1 c0,0.4,0.1,0.8,0.4,1c0.2,0.3,0.4,0.5,0.6,0.7l1.4,1.1c0.8,0.7,1.6,1.5,2.2,2.3c0.6,0.8,0.9,2,0.9,3.3c0,1.9-0.9,3.7-2.6,5.2 c-1.8,1.6-4.3,2.4-7.7,2.4c-2.8,0-4.9-0.6-6.3-1.8c-1.4-1.1-2.1-2.4-2.1-3.9c0-0.7,0.2-1.6,0.7-2.5c0.4-0.9,1.2-1.7,2.4-2.4 c1.3-0.7,2.7-1.2,4.1-1.5c1.4-0.2,2.6-0.3,3.5-0.4c-0.3-0.4-0.5-0.8-0.8-1.2c-0.3-0.4-0.4-0.9-0.4-1.5c0-0.4,0-0.6,0.2-0.9 c0.1-0.2,0.2-0.5,0.2-0.7c-0.5,0.1-0.9,0.1-1.3,0.1c-2.1,0-3.8-0.7-4.9-2c-1.2-1.2-1.8-2.7-1.8-4.3c0-2,0.8-3.8,2.5-5.4 c1.1-0.9,2.3-1.6,3.5-1.8c1.2-0.2,2.3-0.4,3.4-0.4h8L33,18.4h-2.5C30.7,18.6,31,18.8,31.3,19.1z M48,32h-4.3v4.2h-2.5V32H37v-2.5 h4.2v-4.3h2.5v4.3H48V32z M27.1,19.1c-0.6-0.5-1.4-0.7-2.2-0.7c-1.1,0-2,0.5-2.7,1.3c-0.6,0.9-0.9,1.9-0.9,3c0,1.5,0.4,3,1.3,4.5 c0.4,0.7,0.9,1.4,1.6,1.9c0.6,0.5,1.4,0.8,2.2,0.8c1.1,0,1.9-0.4,2.6-1.1c0.3-0.5,0.6-1,0.7-1.6c0.1-0.5,0.1-1,0.1-1.4 c0-1.6-0.4-3.2-1.2-4.8C28.2,20.2,27.7,19.5,27.1,19.1z M26.9,36.2c-0.2,0-0.7,0-1.6,0.1c-0.8,0.1-1.7,0.3-2.5,0.6 c-0.2,0.1-0.5,0.2-0.9,0.4c-0.4,0.2-0.7,0.4-1.1,0.7c-0.4,0.3-0.7,0.7-0.9,1.2c-0.3,0.5-0.4,1.1-0.4,1.8c0,1.4,0.6,2.6,1.9,3.5 c1.2,0.9,2.9,1.4,5,1.4c1.9,0,3.3-0.4,4.3-1.3c1-0.8,1.5-1.8,1.5-3.1c0-1-0.3-1.9-1-2.7c-0.7-0.7-1.8-1.6-3.3-2.6 C27.5,36.2,27.2,36.2,26.9,36.2z',
	  color: '#dd4b39'
	});
	
	exports.default = GooglePlusIcon;

/***/ }),

/***/ 1767:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _assert = __webpack_require__(12);
	
	var _assert2 = _interopRequireDefault(_assert);
	
	var _objectToGetParams = __webpack_require__(9);
	
	var _objectToGetParams2 = _interopRequireDefault(_objectToGetParams);
	
	var _createShareButton = __webpack_require__(11);
	
	var _createShareButton2 = _interopRequireDefault(_createShareButton);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function googlePlusLink(url) {
	  (0, _assert2.default)(url, 'googlePlus.url');
	
	  return 'https://plus.google.com/share' + (0, _objectToGetParams2.default)({ url: url });
	}
	
	var GooglePlusShareButton = (0, _createShareButton2.default)('googlePlus', googlePlusLink, undefined, undefined, {
	  windowWidth: 550,
	  windowHeight: 400
	});
	
	exports.default = GooglePlusShareButton;

/***/ }),

/***/ 1768:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _stringify = __webpack_require__(869);
	
	var _stringify2 = _interopRequireDefault(_stringify);
	
	var _ieDetection = __webpack_require__(918);
	
	var _ieDetection2 = _interopRequireDefault(_ieDetection);
	
	var _shareCountFactory = __webpack_require__(31);
	
	var _shareCountFactory2 = _interopRequireDefault(_shareCountFactory);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function getGooglePlusShareCount(shareUrl, callback) {
	  if ((0, _ieDetection2.default)(11)) {
	    /* eslint-disable no-console */
	    console.error('Google plus share count is not supported in <=IE10!');
	    /* eslint-enable no-console */
	    return;
	  }
	
	  var xhr = new XMLHttpRequest();
	
	  xhr.open('POST', 'https://clients6.google.com/rpc');
	  xhr.setRequestHeader('Accept', 'application/json');
	  xhr.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
	
	  xhr.send((0, _stringify2.default)({
	    method: 'pos.plusones.get',
	    id: 'p',
	    params: {
	      nolog: true,
	      id: shareUrl,
	      source: 'widget',
	      userId: '@viewer',
	      groupId: '@self'
	    },
	    jsonrpc: '2.0',
	    key: 'p',
	    apiVersion: 'v1'
	  }));
	
	  xhr.onload = function onSuccessdata() {
	    var data = JSON.parse(this.responseText);
	    callback(data ? data.result.metadata.globalCounts.count : undefined);
	  };
	
	  xhr.onerror = function onErrordata() {};
	}
	
	exports.default = (0, _shareCountFactory2.default)(getGooglePlusShareCount);

/***/ }),

/***/ 1769:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _iconFactory = __webpack_require__(14);
	
	var _iconFactory2 = _interopRequireDefault(_iconFactory);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var LineIcon = (0, _iconFactory2.default)('line', {
	  icon: 'M52.62 30.138c0 3.693-1.432 7.019-4.42 10.296h.001c-4.326 4.979-14 11.044-16.201 11.972-2.2.927-1.876-.591-1.786-1.112l.294-1.765c.069-.527.142-1.343-.066-1.865-.232-.574-1.146-.872-1.817-1.016-9.909-1.31-17.245-8.238-17.245-16.51 0-9.226 9.251-16.733 20.62-16.733 11.37 0 20.62 7.507 20.62 16.733zM27.81 25.68h-1.446a.402.402 0 0 0-.402.401v8.985c0 .221.18.4.402.4h1.446a.401.401 0 0 0 .402-.4v-8.985a.402.402 0 0 0-.402-.401zm9.956 0H36.32a.402.402 0 0 0-.402.401v5.338L31.8 25.858a.39.39 0 0 0-.031-.04l-.002-.003-.024-.025-.008-.007a.313.313 0 0 0-.032-.026.255.255 0 0 1-.021-.014l-.012-.007-.021-.012-.013-.006-.023-.01-.013-.005-.024-.008-.014-.003-.023-.005-.017-.002-.021-.003-.021-.002h-1.46a.402.402 0 0 0-.402.401v8.985c0 .221.18.4.402.4h1.446a.401.401 0 0 0 .402-.4v-5.337l4.123 5.568c.028.04.063.072.101.099l.004.003a.236.236 0 0 0 .025.015l.012.006.019.01a.154.154 0 0 1 .019.008l.012.004.028.01.005.001a.442.442 0 0 0 .104.013h1.446a.4.4 0 0 0 .401-.4v-8.985a.402.402 0 0 0-.401-.401zm-13.442 7.537h-3.93v-7.136a.401.401 0 0 0-.401-.401h-1.447a.4.4 0 0 0-.401.401v8.984a.392.392 0 0 0 .123.29c.072.068.17.111.278.111h5.778a.4.4 0 0 0 .401-.401v-1.447a.401.401 0 0 0-.401-.401zm21.429-5.287c.222 0 .401-.18.401-.402v-1.446a.401.401 0 0 0-.401-.402h-5.778a.398.398 0 0 0-.279.113l-.005.004-.006.008a.397.397 0 0 0-.111.276v8.984c0 .108.043.206.112.278l.005.006a.401.401 0 0 0 .284.117h5.778a.4.4 0 0 0 .401-.401v-1.447a.401.401 0 0 0-.401-.401h-3.93v-1.519h3.93c.222 0 .401-.18.401-.402V29.85a.401.401 0 0 0-.401-.402h-3.93V27.93h3.93z',
	  mask: '',
	  color: '#00b800'
	});
	
	exports.default = LineIcon;

/***/ }),

/***/ 1770:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _propTypes = __webpack_require__(4);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	var _assert = __webpack_require__(12);
	
	var _assert2 = _interopRequireDefault(_assert);
	
	var _createShareButton = __webpack_require__(11);
	
	var _createShareButton2 = _interopRequireDefault(_createShareButton);
	
	var _objectToGetParams = __webpack_require__(9);
	
	var _objectToGetParams2 = _interopRequireDefault(_objectToGetParams);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function lineLink(url, _ref) {
	  var title = _ref.title;
	
	  (0, _assert2.default)(url, 'line.url');
	
	  return 'https://social-plugins.line.me/lineit/share' + (0, _objectToGetParams2.default)({
	    url: url,
	    text: title
	  });
	}
	
	var LineShareButton = (0, _createShareButton2.default)('line', lineLink, function (props) {
	  return {
	    title: props.title
	  };
	}, {
	  title: _propTypes2.default.string
	}, {
	  windowWidth: 500,
	  windowHeight: 500
	});
	
	exports.default = LineShareButton;

/***/ }),

/***/ 1771:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _iconFactory = __webpack_require__(14);
	
	var _iconFactory2 = _interopRequireDefault(_iconFactory);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var LinkedinIcon = (0, _iconFactory2.default)('linkedin', {
	  icon: 'M20.4,44h5.4V26.6h-5.4V44z M23.1,18c-1.7,0-3.1,1.4-3.1,3.1c0,1.7,1.4,3.1,3.1,3.1 c1.7,0,3.1-1.4,3.1-3.1C26.2,19.4,24.8,18,23.1,18z M39.5,26.2c-2.6,0-4.4,1.4-5.1,2.8h-0.1v-2.4h-5.2V44h5.4v-8.6 c0-2.3,0.4-4.5,3.2-4.5c2.8,0,2.8,2.6,2.8,4.6V44H46v-9.5C46,29.8,45,26.2,39.5,26.2z',
	  mask: 'M0,0v64h64V0H0z M25.8,44h-5.4V26.6h5.4V44z M23.1,24.3c-1.7,0-3.1-1.4-3.1-3.1c0-1.7,1.4-3.1,3.1-3.1 c1.7,0,3.1,1.4,3.1,3.1C26.2,22.9,24.8,24.3,23.1,24.3z M46,44h-5.4v-8.4c0-2,0-4.6-2.8-4.6c-2.8,0-3.2,2.2-3.2,4.5V44h-5.4V26.6 h5.2V29h0.1c0.7-1.4,2.5-2.8,5.1-2.8c5.5,0,6.5,3.6,6.5,8.3V44z',
	  color: '#007fb1'
	});
	
	exports.default = LinkedinIcon;

/***/ }),

/***/ 1772:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _propTypes = __webpack_require__(4);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	var _assert = __webpack_require__(12);
	
	var _assert2 = _interopRequireDefault(_assert);
	
	var _objectToGetParams = __webpack_require__(9);
	
	var _objectToGetParams2 = _interopRequireDefault(_objectToGetParams);
	
	var _createShareButton = __webpack_require__(11);
	
	var _createShareButton2 = _interopRequireDefault(_createShareButton);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function linkedinLink(url, _ref) {
	  var title = _ref.title,
	      description = _ref.description;
	
	  (0, _assert2.default)(url, 'linkedin.url');
	
	  return 'https://linkedin.com/shareArticle' + (0, _objectToGetParams2.default)({
	    url: url,
	    title: title,
	    summary: description
	  });
	}
	
	var LinkedinShareButton = (0, _createShareButton2.default)('linkedin', linkedinLink, function (props) {
	  return {
	    title: props.title,
	    description: props.description
	  };
	}, {
	  title: _propTypes2.default.string,
	  description: _propTypes2.default.string
	}, {
	  windowWidth: 750,
	  windowHeight: 600
	});
	
	exports.default = LinkedinShareButton;

/***/ }),

/***/ 1773:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _jsonp = __webpack_require__(36);
	
	var _jsonp2 = _interopRequireDefault(_jsonp);
	
	var _objectToGetParams = __webpack_require__(9);
	
	var _objectToGetParams2 = _interopRequireDefault(_objectToGetParams);
	
	var _shareCountFactory = __webpack_require__(31);
	
	var _shareCountFactory2 = _interopRequireDefault(_shareCountFactory);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function getLinkedinShareCount(shareUrl, callback) {
	  var url = 'https://www.linkedin.com/countserv/count/share';
	
	  return (0, _jsonp2.default)(url + (0, _objectToGetParams2.default)({
	    url: shareUrl,
	    format: 'jsonp'
	  }), function (err, data) {
	    callback(data ? data.count : undefined);
	  });
	}
	
	exports.default = (0, _shareCountFactory2.default)(getLinkedinShareCount);

/***/ }),

/***/ 1774:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _iconFactory = __webpack_require__(14);
	
	var _iconFactory2 = _interopRequireDefault(_iconFactory);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var LivejournalIcon = (0, _iconFactory2.default)('livejournal', {
	  icon: 'M18.3407821,28.1764706 L21.9441341,31.789916 L33.0055865,42.882353 C33.0055865,42.882353 33.0893855,42.9663866 33.0893855,42.9663866 L46.6648046,47 C46.6648046,47 46.6648046,47 46.7486034,47 C46.8324022,47 46.8324022,47 46.9162012,46.9159664 C47,46.8319327 47,46.8319327 47,46.7478991 L42.9776536,33.1344537 C42.9776536,33.1344537 42.9776536,33.1344537 42.8938548,33.0504202 L31.1620111,21.3697479 L31.1620111,21.3697479 L28.1452514,18.2605042 C27.3072626,17.4201681 26.5530726,17 25.7150838,17 C24.2905028,17 23.0335195,18.3445378 21.5251397,19.8571429 C21.273743,20.1092437 20.9385475,20.4453781 20.6871508,20.697479 C20.3519553,21.0336134 20.1005586,21.2857143 19.849162,21.5378151 C18.3407821,22.9663866 17.0837989,24.2268908 17,25.7394958 C17.0837989,26.4957983 17.5027933,27.3361345 18.3407821,28.1764706 Z M39.9012319,39.6134454 C39.7336341,39.4453781 39.4822374,37.6806724 40.2364275,36.8403362 C40.9906174,36.0840337 41.6610084,36 42.1638017,36 C42.3313995,36 42.4989973,36 42.5827961,36 L44.8453659,43.5630253 L43.5883828,44.8235295 L36.0464833,42.5546218 C35.9626843,42.2184874 35.8788855,41.2100841 36.8844722,40.2016807 C37.2196676,39.8655463 37.8900587,39.6134454 38.5604498,39.6134454 C39.147042,39.6134454 39.5660364,39.7815126 39.5660364,39.7815126 C39.6498353,39.8655463 39.8174331,39.8655463 39.8174331,39.7815126 C39.9850307,39.7815126 39.9850307,39.697479 39.9012319,39.6134454 Z',
	  mask: 'M0,0v64h64V0H0z M35.4,47c-6.5,0.1-9-4.7-9-8v-9.8h-3v-3.9c4.6-1.6,5.6-5.7,5.9-8.1c0-0.2,0.1-0.2,0.2-0.2 c0.1,0,4.4,0,4.4,0v7.6h6v4.5h-6v9.3c0,1.3,0.5,3,2.9,3c0.8,0,1.9-0.3,2.4-0.5l1.4,4.3C40.1,46,37.6,47,35.4,47z',
	  color: '#21A5D8'
	});
	
	exports.default = LivejournalIcon;

/***/ }),

/***/ 1775:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _propTypes = __webpack_require__(4);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	var _assert = __webpack_require__(12);
	
	var _assert2 = _interopRequireDefault(_assert);
	
	var _objectToGetParams = __webpack_require__(9);
	
	var _objectToGetParams2 = _interopRequireDefault(_objectToGetParams);
	
	var _createShareButton = __webpack_require__(11);
	
	var _createShareButton2 = _interopRequireDefault(_createShareButton);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function livejournalLink(url, _ref) {
	  var title = _ref.title,
	      description = _ref.description;
	
	  (0, _assert2.default)(url, 'livejournal.url');
	
	  return 'https://www.livejournal.com/update.bml' + (0, _objectToGetParams2.default)({
	    subject: title,
	    event: description
	  });
	}
	
	var LivejournalShareButton = (0, _createShareButton2.default)('livejournal', livejournalLink, function (props) {
	  return {
	    title: props.title,
	    description: props.description
	  };
	}, {
	  title: _propTypes2.default.string,
	  description: _propTypes2.default.string
	}, {
	  windowWidth: 660,
	  windowHeight: 460
	});
	
	exports.default = LivejournalShareButton;

/***/ }),

/***/ 1776:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _iconFactory = __webpack_require__(14);
	
	var _iconFactory2 = _interopRequireDefault(_iconFactory);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var MailruIcon = (0, _iconFactory2.default)('mailru', {
	  icon: 'M39.7107745,17 C41.6619755,17 43.3204965,18.732852 43.3204965,21.0072202 C43.3204965,23.2815885 41.7595357,25.0144404 39.7107745,25.0144404 C37.7595732,25.0144404 36.1010522,23.2815885 36.1010522,21.0072202 C36.1010522,18.732852 37.7595732,17 39.7107745,17 Z M24.3938451,17 C26.3450463,17 28.0035672,18.732852 28.0035672,21.0072202 C28.0035672,23.2815885 26.4426063,25.0144404 24.3938451,25.0144404 C22.4426439,25.0144404 20.7841229,23.2815885 20.7841229,21.0072202 C20.7841229,18.732852 22.4426439,17 24.3938451,17 Z M51.9057817,43.4259928 C51.7106617,44.0758123 51.4179815,44.6173285 50.9301812,44.9422383 C50.637501,45.1588448 50.2472607,45.267148 49.8570205,45.267148 C49.07654,45.267148 48.3936197,44.833935 48.0033795,44.0758123 L46.2472985,40.7184115 L45.759498,41.2599278 C42.5400162,44.9422383 37.466893,47 32.0035297,47 C26.5401664,47 21.5646034,44.9422383 18.2475614,41.2599278 L17.7597611,40.7184115 L16.00368,44.0758123 C15.6134398,44.833935 14.9305194,45.267148 14.1500389,45.267148 C13.7597986,45.267148 13.3695584,45.1588448 13.0768782,44.9422383 C12.0037176,44.2924187 11.7110374,42.7761733 12.2963978,41.5848375 L16.7841605,33.0288807 C17.1744007,32.270758 17.8573211,31.8375453 18.6378016,31.8375453 C19.0280418,31.8375453 19.4182821,31.9458485 19.7109623,32.1624548 C20.7841229,32.8122743 21.0768031,34.3285197 20.4914427,35.5198555 L20.1012025,36.2779783 L20.2963226,36.602888 C22.4426439,39.9602888 27.0279667,42.234657 31.9059697,42.234657 C36.7839727,42.234657 41.3692955,40.068592 43.5156167,36.602888 L43.7107367,36.2779783 L43.3204965,35.6281587 C43.0278165,35.0866425 42.9302562,34.436823 43.1253765,33.7870035 C43.3204965,33.137184 43.6131767,32.5956678 44.100977,32.270758 C44.3936572,32.0541515 44.7838975,31.9458485 45.1741377,31.9458485 C45.9546182,31.9458485 46.6375385,32.3790613 47.0277787,33.137184 L51.5155415,41.6931408 C52.003342,42.234657 52.100902,42.8844765 51.9057817,43.4259928 Z',
	  mask: 'M0,0v64h64V0H0z M35.4,47c-6.5,0.1-9-4.7-9-8v-9.8h-3v-3.9c4.6-1.6,5.6-5.7,5.9-8.1c0-0.2,0.1-0.2,0.2-0.2 c0.1,0,4.4,0,4.4,0v7.6h6v4.5h-6v9.3c0,1.3,0.5,3,2.9,3c0.8,0,1.9-0.3,2.4-0.5l1.4,4.3C40.1,46,37.6,47,35.4,47z',
	  color: '#168DE2'
	});
	
	exports.default = MailruIcon;

/***/ }),

/***/ 1777:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _propTypes = __webpack_require__(4);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	var _assert = __webpack_require__(12);
	
	var _assert2 = _interopRequireDefault(_assert);
	
	var _objectToGetParams = __webpack_require__(9);
	
	var _objectToGetParams2 = _interopRequireDefault(_objectToGetParams);
	
	var _createShareButton = __webpack_require__(11);
	
	var _createShareButton2 = _interopRequireDefault(_createShareButton);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function mailruLink(url, _ref) {
	  var title = _ref.title,
	      description = _ref.description,
	      image = _ref.image;
	
	  (0, _assert2.default)(url, 'mailru.url');
	
	  return 'https://connect.mail.ru/share' + (0, _objectToGetParams2.default)({
	    url: url,
	    title: title,
	    description: description,
	    imageurl: image
	  });
	}
	
	var MailruShareButton = (0, _createShareButton2.default)('mailru', mailruLink, function (props) {
	  return {
	    title: props.title,
	    description: props.description,
	    image: props.image
	  };
	}, {
	  title: _propTypes2.default.string,
	  description: _propTypes2.default.string,
	  image: _propTypes2.default.string
	}, {
	  windowWidth: 660,
	  windowHeight: 460
	});
	
	exports.default = MailruShareButton;

/***/ }),

/***/ 1778:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _iconFactory = __webpack_require__(14);
	
	var _iconFactory2 = _interopRequireDefault(_iconFactory);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var OKIcon = (0, _iconFactory2.default)('ok', {
	  icon: 'M39,30c-1,0-3,2-7,2s-6-2-7-2c-1.1,0-2,0.9-2,2c0,1,0.6,1.5,1,1.7c1.2,0.7,5,2.3,5,2.3l-4.3,5.4   c0,0-0.8,0.9-0.8,1.6c0,1.1,0.9,2,2,2c1,0,1.5-0.7,1.5-0.7S32,39,32,39c0,0,4.5,5.3,4.5,5.3S37,45,38,45c1.1,0,2-0.9,2-2   c0-0.6-0.8-1.6-0.8-1.6L35,36c0,0,3.8-1.6,5-2.3c0.4-0.3,1-0.7,1-1.7C41,30.9,40.1,30,39,30z M32,15c-3.9,0-7,3.1-7,7s3.1,7,7,7c3.9,0,7-3.1,7-7S35.9,15,32,15z M32,25.5   c-1.9,0-3.5-1.6-3.5-3.5c0-1.9,1.6-3.5,3.5-3.5c1.9,0,3.5,1.6,3.5,3.5C35.5,23.9,33.9,22.5,35,22.5z ',
	  mask: 'M45,1H5C2.8,1,1,2.8,1,5v40c0,2.2,1.8,4,4,4h40c2.2,0,4-1.8,4-4V5C49,2.8,47.2,1,45,1z',
	  color: '#f2720c'
	});
	
	exports.default = OKIcon;

/***/ }),

/***/ 1779:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _propTypes = __webpack_require__(4);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	var _assert = __webpack_require__(12);
	
	var _assert2 = _interopRequireDefault(_assert);
	
	var _objectToGetParams = __webpack_require__(9);
	
	var _objectToGetParams2 = _interopRequireDefault(_objectToGetParams);
	
	var _createShareButton = __webpack_require__(11);
	
	var _createShareButton2 = _interopRequireDefault(_createShareButton);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function okLink(url, _ref) {
	  var title = _ref.title,
	      description = _ref.description,
	      image = _ref.image;
	
	  (0, _assert2.default)(url, 'ok.url');
	
	  return 'https://connect.ok.ru/offer' + (0, _objectToGetParams2.default)({
	    url: url,
	    title: title,
	    description: description,
	    imageUrl: image
	  });
	}
	
	var OKShareButton = (0, _createShareButton2.default)('ok', okLink, function (props) {
	  return {
	    title: props.title,
	    description: props.description,
	    image: props.image
	  };
	}, {
	  title: _propTypes2.default.string,
	  description: _propTypes2.default.string,
	  image: _propTypes2.default.string
	}, {
	  windowWidth: 660,
	  windowHeight: 460
	});
	
	exports.default = OKShareButton;

/***/ }),

/***/ 1780:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _jsonp = __webpack_require__(36);
	
	var _jsonp2 = _interopRequireDefault(_jsonp);
	
	var _objectToGetParams = __webpack_require__(9);
	
	var _objectToGetParams2 = _interopRequireDefault(_objectToGetParams);
	
	var _shareCountFactory = __webpack_require__(31);
	
	var _shareCountFactory2 = _interopRequireDefault(_shareCountFactory);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function getOKShareCount(shareUrl, callback) {
	  if (!window.OK) {
	    window.OK = {
	      Share: {
	        count: function count(index, _count) {
	          return window.OK.callbacks[index](_count);
	        }
	      },
	      callbacks: []
	    };
	  }
	
	  var url = 'https://connect.ok.ru/dk';
	  var index = window.OK.callbacks.length;
	
	  window.ODKL = {
	    updateCount: function updateCount(a, b) {
	      window.OK.callbacks[index](b);
	    }
	  };
	  window.OK.callbacks.push(callback);
	
	  return (0, _jsonp2.default)(url + (0, _objectToGetParams2.default)({
	    'st.cmd': 'extLike',
	    uid: 'odklcnt0',
	    ref: shareUrl
	  }));
	}
	
	exports.default = (0, _shareCountFactory2.default)(getOKShareCount);

/***/ }),

/***/ 1781:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _iconFactory = __webpack_require__(14);
	
	var _iconFactory2 = _interopRequireDefault(_iconFactory);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var PinterestIcon = (0, _iconFactory2.default)('pinterest', {
	  icon: 'M32,16c-8.8,0-16,7.2-16,16c0,6.6,3.9,12.2,9.6,14.7c0-1.1,0-2.5,0.3-3.7 c0.3-1.3,2.1-8.7,2.1-8.7s-0.5-1-0.5-2.5c0-2.4,1.4-4.1,3.1-4.1c1.5,0,2.2,1.1,2.2,2.4c0,1.5-0.9,3.7-1.4,5.7 c-0.4,1.7,0.9,3.1,2.5,3.1c3,0,5.1-3.9,5.1-8.5c0-3.5-2.4-6.1-6.7-6.1c-4.9,0-7.9,3.6-7.9,7.7c0,1.4,0.4,2.4,1.1,3.1 c0.3,0.3,0.3,0.5,0.2,0.9c-0.1,0.3-0.3,1-0.3,1.3c-0.1,0.4-0.4,0.6-0.8,0.4c-2.2-0.9-3.3-3.4-3.3-6.1c0-4.5,3.8-10,11.4-10 c6.1,0,10.1,4.4,10.1,9.2c0,6.3-3.5,11-8.6,11c-1.7,0-3.4-0.9-3.9-2c0,0-0.9,3.7-1.1,4.4c-0.3,1.2-1,2.5-1.6,3.4 c1.4,0.4,3,0.7,4.5,0.7c8.8,0,16-7.2,16-16C48,23.2,40.8,16,32,16z',
	  mask: 'M0,0v64h64V0H0z M32,48c-1.6,0-3.1-0.2-4.5-0.7c0.6-1,1.3-2.2,1.6-3.4c0.2-0.7,1.1-4.4,1.1-4.4 c0.6,1.1,2.2,2,3.9,2c5.1,0,8.6-4.7,8.6-11c0-4.7-4-9.2-10.1-9.2c-7.6,0-11.4,5.5-11.4,10c0,2.8,1,5.2,3.3,6.1 c0.4,0.1,0.7,0,0.8-0.4c0.1-0.3,0.2-1,0.3-1.3c0.1-0.4,0.1-0.5-0.2-0.9c-0.6-0.8-1.1-1.7-1.1-3.1c0-4,3-7.7,7.9-7.7 c4.3,0,6.7,2.6,6.7,6.1c0,4.6-2,8.5-5.1,8.5c-1.7,0-2.9-1.4-2.5-3.1c0.5-2,1.4-4.2,1.4-5.7c0-1.3-0.7-2.4-2.2-2.4 c-1.7,0-3.1,1.8-3.1,4.1c0,1.5,0.5,2.5,0.5,2.5s-1.8,7.4-2.1,8.7c-0.3,1.2-0.3,2.6-0.3,3.7C19.9,44.2,16,38.6,16,32 c0-8.8,7.2-16,16-16c8.8,0,16,7.2,16,16C48,40.8,40.8,48,32,48z',
	  color: '#cb2128'
	});
	
	exports.default = PinterestIcon;

/***/ }),

/***/ 1782:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _propTypes = __webpack_require__(4);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	var _assert = __webpack_require__(12);
	
	var _assert2 = _interopRequireDefault(_assert);
	
	var _objectToGetParams = __webpack_require__(9);
	
	var _objectToGetParams2 = _interopRequireDefault(_objectToGetParams);
	
	var _createShareButton = __webpack_require__(11);
	
	var _createShareButton2 = _interopRequireDefault(_createShareButton);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function pinterestLink(url, _ref) {
	  var media = _ref.media,
	      description = _ref.description;
	
	  (0, _assert2.default)(url, 'pinterest.url');
	  (0, _assert2.default)(media, 'pinterest.media');
	
	  return 'https://pinterest.com/pin/create/button/' + (0, _objectToGetParams2.default)({
	    url: url,
	    media: media,
	    description: description
	  });
	}
	
	var PinterestShareButton = (0, _createShareButton2.default)('pinterest', pinterestLink, function (props) {
	  return {
	    media: props.media,
	    description: props.description
	  };
	}, {
	  media: _propTypes2.default.string.isRequired,
	  description: _propTypes2.default.string
	}, {
	  windowWidth: 1000,
	  windowHeight: 730
	});
	
	exports.default = PinterestShareButton;

/***/ }),

/***/ 1783:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _jsonp = __webpack_require__(36);
	
	var _jsonp2 = _interopRequireDefault(_jsonp);
	
	var _objectToGetParams = __webpack_require__(9);
	
	var _objectToGetParams2 = _interopRequireDefault(_objectToGetParams);
	
	var _shareCountFactory = __webpack_require__(31);
	
	var _shareCountFactory2 = _interopRequireDefault(_shareCountFactory);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function getPinterestShareCount(shareUrl, callback) {
	  var url = 'https://api.pinterest.com/v1/urls/count.json';
	
	  return (0, _jsonp2.default)(url + (0, _objectToGetParams2.default)({
	    url: shareUrl
	  }), function (err, data) {
	    callback(data ? data.count : undefined);
	  });
	}
	
	exports.default = (0, _shareCountFactory2.default)(getPinterestShareCount);

/***/ }),

/***/ 1784:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _iconFactory = __webpack_require__(14);
	
	var _iconFactory2 = _interopRequireDefault(_iconFactory);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var RedditIcon = (0, _iconFactory2.default)('reddit', {
	  icon: 'm 52.8165,31.942362 c 0,-2.4803 -2.0264,-4.4965 -4.5169,-4.4965 -1.2155,0 -2.3171,0.4862 -3.128,1.2682 -3.077,-2.0247 -7.2403,-3.3133 -11.8507,-3.4782 l 2.5211,-7.9373 6.8272,1.5997 -0.0102,0.0986 c 0,2.0281 1.6575,3.6771 3.6958,3.6771 2.0366,0 3.6924,-1.649 3.6924,-3.6771 0,-2.0281 -1.6575,-3.6788 -3.6924,-3.6788 -1.564,0 -2.8968,0.9758 -3.4357,2.3443 l -7.3593,-1.7255 c -0.3213,-0.0782 -0.6477,0.1071 -0.748,0.4233 L 32,25.212062 c -4.8246,0.0578 -9.1953,1.3566 -12.41,3.4425 -0.8058,-0.7446 -1.8751,-1.2104 -3.0583,-1.2104 -2.4905,0 -4.5152,2.0179 -4.5152,4.4982 0,1.649 0.9061,3.0787 2.2389,3.8607 -0.0884,0.4794 -0.1462,0.9639 -0.1462,1.4569 0,6.6487 8.1736,12.0581 18.2223,12.0581 10.0487,0 18.224,-5.4094 18.224,-12.0581 0,-0.4658 -0.0493,-0.9248 -0.1275,-1.377 1.4144,-0.7599 2.3885,-2.2304 2.3885,-3.9406 z m -29.2808,3.0872 c 0,-1.4756 1.207,-2.6775 2.6894,-2.6775 1.4824,0 2.6877,1.2019 2.6877,2.6775 0,1.4756 -1.2053,2.6758 -2.6877,2.6758 -1.4824,0 -2.6894,-1.2002 -2.6894,-2.6758 z m 15.4037,7.9373 c -1.3549,1.3481 -3.4816,2.0043 -6.5008,2.0043 l -0.0221,-0.0051 -0.0221,0.0051 c -3.0209,0 -5.1476,-0.6562 -6.5008,-2.0043 -0.2465,-0.2448 -0.2465,-0.6443 0,-0.8891 0.2465,-0.2465 0.6477,-0.2465 0.8942,0 1.105,1.0999 2.9393,1.6337 5.6066,1.6337 l 0.0221,0.0051 0.0221,-0.0051 c 2.6673,0 4.5016,-0.5355 5.6066,-1.6354 0.2465,-0.2465 0.6477,-0.2448 0.8942,0 0.2465,0.2465 0.2465,0.6443 0,0.8908 z m -0.3213,-5.2615 c -1.4824,0 -2.6877,-1.2002 -2.6877,-2.6758 0,-1.4756 1.2053,-2.6775 2.6877,-2.6775 1.4824,0 2.6877,1.2019 2.6877,2.6775 0,1.4756 -1.2053,2.6758 -2.6877,2.6758 z',
	  color: '#5f99cf'
	});
	
	exports.default = RedditIcon;

/***/ }),

/***/ 1785:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _propTypes = __webpack_require__(4);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	var _assert = __webpack_require__(12);
	
	var _assert2 = _interopRequireDefault(_assert);
	
	var _objectToGetParams = __webpack_require__(9);
	
	var _objectToGetParams2 = _interopRequireDefault(_objectToGetParams);
	
	var _createShareButton = __webpack_require__(11);
	
	var _createShareButton2 = _interopRequireDefault(_createShareButton);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function redditLink(url, _ref) {
	  var title = _ref.title;
	
	  (0, _assert2.default)(url, 'reddit.url');
	
	  return 'https://www.reddit.com/submit' + (0, _objectToGetParams2.default)({
	    url: url,
	    title: title
	  });
	}
	
	var RedditShareButton = (0, _createShareButton2.default)('reddit', redditLink, function (props) {
	  return {
	    title: props.title
	  };
	}, {
	  title: _propTypes2.default.string
	}, {
	  windowWidth: 660,
	  windowHeight: 460
	});
	
	exports.default = RedditShareButton;

/***/ }),

/***/ 1786:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _jsonp = __webpack_require__(36);
	
	var _jsonp2 = _interopRequireDefault(_jsonp);
	
	var _shareCountFactory = __webpack_require__(31);
	
	var _shareCountFactory2 = _interopRequireDefault(_shareCountFactory);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function getRedditShareCount(shareUrl, callback) {
	  var endpoint = 'https://www.reddit.com/api/info.json?limit=1&url=' + shareUrl;
	
	  (0, _jsonp2.default)(endpoint, { param: 'jsonp' }, function (err, response) {
	    callback(!err && response && response.data && response.data.children.length > 0 && response.data.children[0].data.score ? response.data.children[0].data.score : undefined);
	  });
	}
	
	exports.default = (0, _shareCountFactory2.default)(getRedditShareCount);

/***/ }),

/***/ 1787:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _iconFactory = __webpack_require__(14);
	
	var _iconFactory2 = _interopRequireDefault(_iconFactory);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var TelegramIcon = (0, _iconFactory2.default)('telegram', {
	  icon: 'm45.90873,15.44335c-0.6901,-0.0281 -1.37668,0.14048 -1.96142,0.41265c-0.84989,0.32661 -8.63939,3.33986 -16.5237,6.39174c-3.9685,1.53296 -7.93349,3.06593 -10.98537,4.24067c-3.05012,1.1765 -5.34694,2.05098 -5.4681,2.09312c-0.80775,0.28096 -1.89996,0.63566 -2.82712,1.72788c-0.23354,0.27218 -0.46884,0.62161 -0.58825,1.10275c-0.11941,0.48114 -0.06673,1.09222 0.16682,1.5716c0.46533,0.96052 1.25376,1.35737 2.18443,1.71383c3.09051,0.99037 6.28638,1.93508 8.93263,2.8236c0.97632,3.44171 1.91401,6.89571 2.84116,10.34268c0.30554,0.69185 0.97105,0.94823 1.65764,0.95525l-0.00351,0.03512c0,0 0.53908,0.05268 1.06412,-0.07375c0.52679,-0.12292 1.18879,-0.42846 1.79109,-0.99212c0.662,-0.62161 2.45836,-2.38812 3.47683,-3.38552l7.6736,5.66477l0.06146,0.03512c0,0 0.84989,0.59703 2.09312,0.68132c0.62161,0.04214 1.4399,-0.07726 2.14229,-0.59176c0.70766,-0.51626 1.1765,-1.34683 1.396,-2.29506c0.65673,-2.86224 5.00979,-23.57745 5.75257,-27.00686l-0.02107,0.08077c0.51977,-1.93157 0.32837,-3.70159 -0.87096,-4.74991c-0.60054,-0.52152 -1.2924,-0.7498 -1.98425,-0.77965l0,0.00176zm-0.2072,3.29069c0.04741,0.0439 0.0439,0.0439 0.00351,0.04741c-0.01229,-0.00351 0.14048,0.2072 -0.15804,1.32576l-0.01229,0.04214l-0.00878,0.03863c-0.75858,3.50668 -5.15554,24.40802 -5.74203,26.96472c-0.08077,0.34417 -0.11414,0.31959 -0.09482,0.29852c-0.1756,-0.02634 -0.50045,-0.16506 -0.52679,-0.1756l-13.13468,-9.70175c4.4988,-4.33199 9.09945,-8.25307 13.744,-12.43229c0.8218,-0.41265 0.68483,-1.68573 -0.29852,-1.70681c-1.04305,0.24584 -1.92279,0.99564 -2.8798,1.47502c-5.49971,3.2626 -11.11882,6.13186 -16.55882,9.49279c-2.792,-0.97105 -5.57873,-1.77704 -8.15298,-2.57601c2.2336,-0.89555 4.00889,-1.55579 5.75608,-2.23009c3.05188,-1.1765 7.01687,-2.7042 10.98537,-4.24067c7.94051,-3.06944 15.92667,-6.16346 16.62028,-6.43037l0.05619,-0.02283l0.05268,-0.02283c0.19316,-0.0878 0.30378,-0.09658 0.35471,-0.10009c0,0 -0.01756,-0.05795 -0.00351,-0.04566l-0.00176,0zm-20.91715,22.0638l2.16687,1.60145c-0.93418,0.91311 -1.81743,1.77353 -2.45485,2.38812l0.28798,-3.98957',
	  mask: 'M0,0v64h64V0H0z M32,48c-1.6,0-3.1-0.2-4.5-0.7c0.6-1,1.3-2.2,1.6-3.4c0.2-0.7,1.1-4.4,1.1-4.4 c0.6,1.1,2.2,2,3.9,2c5.1,0,8.6-4.7,8.6-11c0-4.7-4-9.2-10.1-9.2c-7.6,0-11.4,5.5-11.4,10c0,2.8,1,5.2,3.3,6.1 c0.4,0.1,0.7,0,0.8-0.4c0.1-0.3,0.2-1,0.3-1.3c0.1-0.4,0.1-0.5-0.2-0.9c-0.6-0.8-1.1-1.7-1.1-3.1c0-4,3-7.7,7.9-7.7 c4.3,0,6.7,2.6,6.7,6.1c0,4.6-2,8.5-5.1,8.5c-1.7,0-2.9-1.4-2.5-3.1c0.5-2,1.4-4.2,1.4-5.7c0-1.3-0.7-2.4-2.2-2.4 c-1.7,0-3.1,1.8-3.1,4.1c0,1.5,0.5,2.5,0.5,2.5s-1.8,7.4-2.1,8.7c-0.3,1.2-0.3,2.6-0.3,3.7C19.9,44.2,16,38.6,16,32 c0-8.8,7.2-16,16-16c8.8,0,16,7.2,16,16C48,40.8,40.8,48,32,48z',
	  color: '#37aee2'
	});
	
	exports.default = TelegramIcon;

/***/ }),

/***/ 1788:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _propTypes = __webpack_require__(4);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	var _assert = __webpack_require__(12);
	
	var _assert2 = _interopRequireDefault(_assert);
	
	var _objectToGetParams = __webpack_require__(9);
	
	var _objectToGetParams2 = _interopRequireDefault(_objectToGetParams);
	
	var _createShareButton = __webpack_require__(11);
	
	var _createShareButton2 = _interopRequireDefault(_createShareButton);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function telegramLink(url, _ref) {
	  var title = _ref.title;
	
	  (0, _assert2.default)(url, 'telegram.url');
	
	  return 'https://telegram.me/share/' + (0, _objectToGetParams2.default)({
	    url: url,
	    text: title
	  });
	}
	
	var TelegramShareButton = (0, _createShareButton2.default)('telegram', telegramLink, function (props) {
	  return {
	    title: props.title,
	    via: props.via
	  };
	}, {
	  title: _propTypes2.default.string,
	  via: _propTypes2.default.string
	}, {
	  windowWidth: 550,
	  windowHeight: 400
	});
	
	exports.default = TelegramShareButton;

/***/ }),

/***/ 1789:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _iconFactory = __webpack_require__(14);
	
	var _iconFactory2 = _interopRequireDefault(_iconFactory);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var TumblrIcon = (0, _iconFactory2.default)('tumblr', {
	  icon: 'M39.2,41c-0.6,0.3-1.6,0.5-2.4,0.5c-2.4,0.1-2.9-1.7-2.9-3v-9.3h6v-4.5h-6V17c0,0-4.3,0-4.4,0 c-0.1,0-0.2,0.1-0.2,0.2c-0.3,2.3-1.4,6.4-5.9,8.1v3.9h3V39c0,3.4,2.5,8.1,9,8c2.2,0,4.7-1,5.2-1.8L39.2,41z',
	  mask: 'M0,0v64h64V0H0z M35.4,47c-6.5,0.1-9-4.7-9-8v-9.8h-3v-3.9c4.6-1.6,5.6-5.7,5.9-8.1c0-0.2,0.1-0.2,0.2-0.2 c0.1,0,4.4,0,4.4,0v7.6h6v4.5h-6v9.3c0,1.3,0.5,3,2.9,3c0.8,0,1.9-0.3,2.4-0.5l1.4,4.3C40.1,46,37.6,47,35.4,47z',
	  color: '#2c4762'
	});
	
	exports.default = TumblrIcon;

/***/ }),

/***/ 1790:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _propTypes = __webpack_require__(4);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	var _assert = __webpack_require__(12);
	
	var _assert2 = _interopRequireDefault(_assert);
	
	var _objectToGetParams = __webpack_require__(9);
	
	var _objectToGetParams2 = _interopRequireDefault(_objectToGetParams);
	
	var _createShareButton = __webpack_require__(11);
	
	var _createShareButton2 = _interopRequireDefault(_createShareButton);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function tumblrLink(url, _ref) {
	  var title = _ref.title,
	      caption = _ref.caption,
	      tags = _ref.tags,
	      posttype = _ref.posttype;
	
	  (0, _assert2.default)(url, 'tumblr.url');
	
	  return 'https://www.tumblr.com/widgets/share/tool' + (0, _objectToGetParams2.default)({
	    canonicalUrl: url,
	    title: title,
	    caption: caption,
	    tags: tags,
	    posttype: posttype
	  });
	}
	
	var TumblrShareButton = (0, _createShareButton2.default)('tumblr', tumblrLink, function (props) {
	  return {
	    title: props.title,
	    tags: props.tags.join(','),
	    caption: props.caption,
	    posttype: props.posttype
	  };
	}, {
	  title: _propTypes2.default.string,
	  caption: _propTypes2.default.string,
	  posttype: _propTypes2.default.string,
	  tags: _propTypes2.default.arrayOf(_propTypes2.default.string)
	}, {
	  tags: [],
	  posttype: 'link',
	  windowWidth: 660,
	  windowHeight: 460
	});
	
	exports.default = TumblrShareButton;

/***/ }),

/***/ 1791:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _jsonp = __webpack_require__(36);
	
	var _jsonp2 = _interopRequireDefault(_jsonp);
	
	var _objectToGetParams = __webpack_require__(9);
	
	var _objectToGetParams2 = _interopRequireDefault(_objectToGetParams);
	
	var _shareCountFactory = __webpack_require__(31);
	
	var _shareCountFactory2 = _interopRequireDefault(_shareCountFactory);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function getTumblrShareCount(shareUrl, callback) {
	  var endpoint = 'https://api.tumblr.com/v2/share/stats';
	
	  return (0, _jsonp2.default)(endpoint + (0, _objectToGetParams2.default)({
	    url: shareUrl
	  }), function (err, data) {
	    callback(data ? data.note_count : undefined);
	  });
	}
	
	exports.default = (0, _shareCountFactory2.default)(getTumblrShareCount);

/***/ }),

/***/ 1792:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _iconFactory = __webpack_require__(14);
	
	var _iconFactory2 = _interopRequireDefault(_iconFactory);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var TwitterIcon = (0, _iconFactory2.default)('twitter', {
	  icon: 'M48,22.1c-1.2,0.5-2.4,0.9-3.8,1c1.4-0.8,2.4-2.1,2.9-3.6c-1.3,0.8-2.7,1.3-4.2,1.6 C41.7,19.8,40,19,38.2,19c-3.6,0-6.6,2.9-6.6,6.6c0,0.5,0.1,1,0.2,1.5c-5.5-0.3-10.3-2.9-13.5-6.9c-0.6,1-0.9,2.1-0.9,3.3 c0,2.3,1.2,4.3,2.9,5.5c-1.1,0-2.1-0.3-3-0.8c0,0,0,0.1,0,0.1c0,3.2,2.3,5.8,5.3,6.4c-0.6,0.1-1.1,0.2-1.7,0.2c-0.4,0-0.8,0-1.2-0.1 c0.8,2.6,3.3,4.5,6.1,4.6c-2.2,1.8-5.1,2.8-8.2,2.8c-0.5,0-1.1,0-1.6-0.1c2.9,1.9,6.4,2.9,10.1,2.9c12.1,0,18.7-10,18.7-18.7 c0-0.3,0-0.6,0-0.8C46,24.5,47.1,23.4,48,22.1z',
	  mask: 'M0,0v64h64V0H0z M44.7,25.5c0,0.3,0,0.6,0,0.8C44.7,35,38.1,45,26.1,45c-3.7,0-7.2-1.1-10.1-2.9 c0.5,0.1,1,0.1,1.6,0.1c3.1,0,5.9-1,8.2-2.8c-2.9-0.1-5.3-2-6.1-4.6c0.4,0.1,0.8,0.1,1.2,0.1c0.6,0,1.2-0.1,1.7-0.2 c-3-0.6-5.3-3.3-5.3-6.4c0,0,0-0.1,0-0.1c0.9,0.5,1.9,0.8,3,0.8c-1.8-1.2-2.9-3.2-2.9-5.5c0-1.2,0.3-2.3,0.9-3.3 c3.2,4,8.1,6.6,13.5,6.9c-0.1-0.5-0.2-1-0.2-1.5c0-3.6,2.9-6.6,6.6-6.6c1.9,0,3.6,0.8,4.8,2.1c1.5-0.3,2.9-0.8,4.2-1.6 c-0.5,1.5-1.5,2.8-2.9,3.6c1.3-0.2,2.6-0.5,3.8-1C47.1,23.4,46,24.5,44.7,25.5z',
	  color: '#00aced'
	});
	
	exports.default = TwitterIcon;

/***/ }),

/***/ 1793:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _propTypes = __webpack_require__(4);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	var _assert = __webpack_require__(12);
	
	var _assert2 = _interopRequireDefault(_assert);
	
	var _objectToGetParams = __webpack_require__(9);
	
	var _objectToGetParams2 = _interopRequireDefault(_objectToGetParams);
	
	var _createShareButton = __webpack_require__(11);
	
	var _createShareButton2 = _interopRequireDefault(_createShareButton);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function twitterLink(url, _ref) {
	  var title = _ref.title,
	      via = _ref.via,
	      _ref$hashtags = _ref.hashtags,
	      hashtags = _ref$hashtags === undefined ? [] : _ref$hashtags;
	
	  (0, _assert2.default)(url, 'twitter.url');
	  (0, _assert2.default)(Array.isArray(hashtags), 'twitter.hashtags is not an array');
	
	  return 'https://twitter.com/share' + (0, _objectToGetParams2.default)({
	    url: url,
	    text: title,
	    via: via,
	    hashtags: hashtags.join(',')
	  });
	}
	
	var TwitterShareButton = (0, _createShareButton2.default)('twitter', twitterLink, function (props) {
	  return {
	    hashtags: props.hashtags,
	    title: props.title,
	    via: props.via
	  };
	}, {
	  hashtags: _propTypes2.default.arrayOf(_propTypes2.default.string),
	  title: _propTypes2.default.string,
	  via: _propTypes2.default.string
	}, {
	  windowWidth: 550,
	  windowHeight: 400
	});
	
	exports.default = TwitterShareButton;

/***/ }),

/***/ 1794:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _iconFactory = __webpack_require__(14);
	
	var _iconFactory2 = _interopRequireDefault(_iconFactory);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var VKIcon = (0, _iconFactory2.default)('vk', {
	  icon: 'M44.94,44.84h-0.2c-2.17-.36-3.66-1.92-4.92-3.37C39.1,40.66,38,38.81,36.7,39c-1.85.3-.93,3.52-1.71,4.9-0.62,1.11-3.29.91-5.12,0.71-5.79-.62-8.75-3.77-11.35-7.14A64.13,64.13,0,0,1,11.6,26a10.59,10.59,0,0,1-1.51-4.49C11,20.7,12.56,21,14.11,21c1.31,0,3.36-.29,4.32.2C19,21.46,19.57,23,20,24a37.18,37.18,0,0,0,3.31,5.82c0.56,0.81,1.41,2.35,2.41,2.14s1.06-2.63,1.1-4.18c0-1.77,0-4-.5-4.9S25,22,24.15,21.47c0.73-1.49,2.72-1.63,5.12-1.63,2,0,4.84-.23,5.62,1.12s0.25,3.85.2,5.71c-0.06,2.09-.41,4.25,1,5.21,1.09-.12,1.68-1.2,2.31-2A28,28,0,0,0,41.72,24c0.44-1,.91-2.65,1.71-3,1.21-.47,3.15-0.1,4.92-0.1,1.46,0,4.05-.41,4.52.61,0.39,0.85-.75,3-1.1,3.57a61.88,61.88,0,0,1-4.12,5.61c-0.58.78-1.78,2-1.71,3.27,0.05,0.94,1,1.67,1.71,2.35a33.12,33.12,0,0,1,3.92,4.18c0.47,0.62,1.5,2,1.4,2.76C52.66,45.81,46.88,44.24,44.94,44.84Z',
	  mask: 'M0,0v64h64V0H0z M44.94,44.84h-0.2c-2.17-.36-3.66-1.92-4.92-3.37C39.1,40.66,38,38.81,36.7,39c-1.85.3-.93,3.52-1.71,4.9-0.62,1.11-3.29.91-5.12,0.71-5.79-.62-8.75-3.77-11.35-7.14A64.13,64.13,0,0,1,11.6,26a10.59,10.59,0,0,1-1.51-4.49C11,20.7,12.56,21,14.11,21c1.31,0,3.36-.29,4.32.2C19,21.46,19.57,23,20,24a37.18,37.18,0,0,0,3.31,5.82c0.56,0.81,1.41,2.35,2.41,2.14s1.06-2.63,1.1-4.18c0-1.77,0-4-.5-4.9S25,22,24.15,21.47c0.73-1.49,2.72-1.63,5.12-1.63,2,0,4.84-.23,5.62,1.12s0.25,3.85.2,5.71c-0.06,2.09-.41,4.25,1,5.21,1.09-.12,1.68-1.2,2.31-2A28,28,0,0,0,41.72,24c0.44-1,.91-2.65,1.71-3,1.21-.47,3.15-0.1,4.92-0.1,1.46,0,4.05-.41,4.52.61,0.39,0.85-.75,3-1.1,3.57a61.88,61.88,0,0,1-4.12,5.61c-0.58.78-1.78,2-1.71,3.27,0.05,0.94,1,1.67,1.71,2.35a33.12,33.12,0,0,1,3.92,4.18c0.47,0.62,1.5,2,1.4,2.76C52.66,45.81,46.88,44.24,44.94,44.84Z',
	  color: '#45668e'
	});
	
	exports.default = VKIcon;

/***/ }),

/***/ 1795:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _propTypes = __webpack_require__(4);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	var _assert = __webpack_require__(12);
	
	var _assert2 = _interopRequireDefault(_assert);
	
	var _objectToGetParams = __webpack_require__(9);
	
	var _objectToGetParams2 = _interopRequireDefault(_objectToGetParams);
	
	var _createShareButton = __webpack_require__(11);
	
	var _createShareButton2 = _interopRequireDefault(_createShareButton);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function vkLink(url, _ref) {
	  var title = _ref.title,
	      description = _ref.description,
	      image = _ref.image;
	
	  (0, _assert2.default)(url, 'vk.url');
	
	  return 'https://vk.com/share.php' + (0, _objectToGetParams2.default)({
	    url: url,
	    title: title,
	    description: description,
	    image: image
	  });
	}
	
	var VKShareButton = (0, _createShareButton2.default)('vk', vkLink, function (props) {
	  return {
	    title: props.title,
	    description: props.description,
	    image: props.image
	  };
	}, {
	  title: _propTypes2.default.string,
	  description: _propTypes2.default.string,
	  image: _propTypes2.default.string
	}, {
	  windowWidth: 660,
	  windowHeight: 460
	});
	
	exports.default = VKShareButton;

/***/ }),

/***/ 1796:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _jsonp = __webpack_require__(36);
	
	var _jsonp2 = _interopRequireDefault(_jsonp);
	
	var _objectToGetParams = __webpack_require__(9);
	
	var _objectToGetParams2 = _interopRequireDefault(_objectToGetParams);
	
	var _shareCountFactory = __webpack_require__(31);
	
	var _shareCountFactory2 = _interopRequireDefault(_shareCountFactory);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function getVKShareCount(shareUrl, callback) {
	  if (!window.VK) {
	    window.VK = {
	      Share: {
	        count: function count(index, _count) {
	          return window.VK.callbacks[index](_count);
	        }
	      },
	      callbacks: []
	    };
	  }
	
	  var url = 'https://vk.com/share.php';
	  var index = window.VK.callbacks.length;
	
	  window.VK.callbacks.push(callback);
	
	  return (0, _jsonp2.default)(url + (0, _objectToGetParams2.default)({
	    act: 'count',
	    index: index,
	    url: shareUrl
	  }));
	}
	
	exports.default = (0, _shareCountFactory2.default)(getVKShareCount);

/***/ }),

/***/ 1797:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _iconFactory = __webpack_require__(14);
	
	var _iconFactory2 = _interopRequireDefault(_iconFactory);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var ViberIcon = (0, _iconFactory2.default)('viber', {
	  icon: 'm31.0,12.3c9.0,0.2 16.4,6.2 18.0,15.2c0.2,1.5 0.3,3.0 0.4,4.6a1.0,1.0 0 0 1 -0.8,1.2l-0.1,0a1.1,1.1 0 0 1 -1.0,-1.2l0,0c-0.0,-1.2 -0.1,-2.5 -0.3,-3.8a16.1,16.1 0 0 0 -13.0,-13.5c-1.0,-0.1 -2.0,-0.2 -3.0,-0.3c-0.6,-0.0 -1.4,-0.1 -1.6,-0.8a1.1,1.1 0 0 1 0.9,-1.2l0.6,0l0.0,-0.0zm10.6,39.2a19.9,19.9 0 0 1 -2.1,-0.6c-6.9,-2.9 -13.2,-6.6 -18.3,-12.2a47.5,47.5 0 0 1 -7.0,-10.7c-0.8,-1.8 -1.6,-3.7 -2.4,-5.6c-0.6,-1.7 0.3,-3.4 1.4,-4.7a11.3,11.3 0 0 1 3.7,-2.8a2.4,2.4 0 0 1 3.0,0.7a39.0,39.0 0 0 1 4.7,6.5a3.1,3.1 0 0 1 -0.8,4.2c-0.3,0.2 -0.6,0.5 -1.0,0.8a3.3,3.3 0 0 0 -0.7,0.7a2.1,2.1 0 0 0 -0.1,1.9c1.7,4.9 4.7,8.7 9.7,10.8a5.0,5.0 0 0 0 2.5,0.6c1.5,-0.1 2.0,-1.8 3.1,-2.7a2.9,2.9 0 0 1 3.5,-0.1c1.1,0.7 2.2,1.4 3.3,2.2a37.8,37.8 0 0 1 3.1,2.4a2.4,2.4 0 0 1 0.7,3.0a10.4,10.4 0 0 1 -4.4,4.8a10.8,10.8 0 0 1 -1.9,0.6c-0.7,-0.2 0.6,-0.2 0,0l0.0,0l0,-0.0zm3.1,-21.4a4.2,4.2 0 0 1 -0.0,0.6a1.0,1.0 0 0 1 -1.9,0.1a2.7,2.7 0 0 1 -0.1,-0.8a10.9,10.9 0 0 0 -1.4,-5.5a10.2,10.2 0 0 0 -4.2,-4.0a12.3,12.3 0 0 0 -3.4,-1.0c-0.5,-0.0 -1.0,-0.1 -1.5,-0.2a0.9,0.9 0 0 1 -0.9,-1.0l0,-0.1a0.9,0.9 0 0 1 0.9,-0.9l0.1,0a14.1,14.1 0 0 1 5.9,1.5a11.9,11.9 0 0 1 6.5,9.3c0,0.1 0.0,0.3 0.0,0.5c0,0.4 0.0,0.9 0.0,1.5l0,0l0.0,0.0zm-5.6,-0.2a1.1,1.1 0 0 1 -1.2,-0.9l0,-0.1a11.3,11.3 0 0 0 -0.2,-1.4a4.0,4.0 0 0 0 -1.5,-2.3a3.9,3.9 0 0 0 -1.2,-0.5c-0.5,-0.1 -1.1,-0.1 -1.6,-0.2a1.0,1.0 0 0 1 -0.8,-1.1l0,0l0,0a1.0,1.0 0 0 1 1.1,-0.8c3.4,0.2 6.0,2.0 6.3,6.2a2.8,2.8 0 0 1 0,0.8a0.8,0.8 0 0 1 -0.8,0.7l0,0l0.0,-0.0z',
	  mask: '',
	  color: '#7C529E'
	});
	
	exports.default = ViberIcon;

/***/ }),

/***/ 1798:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _propTypes = __webpack_require__(4);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	var _assert = __webpack_require__(12);
	
	var _assert2 = _interopRequireDefault(_assert);
	
	var _objectToGetParams = __webpack_require__(9);
	
	var _objectToGetParams2 = _interopRequireDefault(_objectToGetParams);
	
	var _createShareButton = __webpack_require__(11);
	
	var _createShareButton2 = _interopRequireDefault(_createShareButton);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function viberLink(url, _ref) {
	  var title = _ref.title;
	
	  (0, _assert2.default)(url, 'viber.url');
	  return 'viber://forward' + (0, _objectToGetParams2.default)({
	    text: (title || '') + ' ' + url
	  });
	}
	
	var ViberShareButton = (0, _createShareButton2.default)('viber', viberLink, function (props) {
	  return {
	    title: props.title
	  };
	}, {
	  title: _propTypes2.default.string
	}, {
	  windowWidth: 660,
	  windowHeight: 460
	});
	
	exports.default = ViberShareButton;

/***/ }),

/***/ 1799:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _propTypes = __webpack_require__(4);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	var _assert = __webpack_require__(12);
	
	var _assert2 = _interopRequireDefault(_assert);
	
	var _objectToGetParams = __webpack_require__(9);
	
	var _objectToGetParams2 = _interopRequireDefault(_objectToGetParams);
	
	var _createShareButton = __webpack_require__(11);
	
	var _createShareButton2 = _interopRequireDefault(_createShareButton);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function weiboLink(url, _ref) {
	  var title = _ref.title,
	      image = _ref.image;
	
	  (0, _assert2.default)(url, 'weibo.url');
	  (0, _assert2.default)(image, 'weibo.image');
	
	  return 'http://service.weibo.com/share/share.php?' + (0, _objectToGetParams2.default)({
	    url: url,
	    title: title,
	    pic: image
	  });
	}
	
	var WeiboShareButton = (0, _createShareButton2.default)('weibo', weiboLink, function (props) {
	  return {
	    title: props.title,
	    image: props.image
	  };
	}, {
	  title: _propTypes2.default.string,
	  image: _propTypes2.default.string
	}, {
	  windowWidth: 550,
	  windowHeight: 400
	});
	
	exports.default = WeiboShareButton;

/***/ }),

/***/ 1800:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _iconFactory = __webpack_require__(14);
	
	var _iconFactory2 = _interopRequireDefault(_iconFactory);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var WhatsappIcon = (0, _iconFactory2.default)('whatsapp', {
	  icon: 'm42.32286,33.93287c-0.5178,-0.2589 -3.04726,-1.49644 -3.52105,-1.66732c-0.4712,-0.17346 -0.81554,-0.2589 -1.15987,0.2589c-0.34175,0.51004 -1.33075,1.66474 -1.63108,2.00648c-0.30032,0.33658 -0.60064,0.36247 -1.11327,0.12945c-0.5178,-0.2589 -2.17994,-0.80259 -4.14759,-2.56312c-1.53269,-1.37217 -2.56312,-3.05503 -2.86603,-3.57283c-0.30033,-0.5178 -0.03366,-0.80259 0.22524,-1.06149c0.23301,-0.23301 0.5178,-0.59547 0.7767,-0.90616c0.25372,-0.31068 0.33657,-0.5178 0.51262,-0.85437c0.17088,-0.36246 0.08544,-0.64725 -0.04402,-0.90615c-0.12945,-0.2589 -1.15987,-2.79613 -1.58964,-3.80584c-0.41424,-1.00971 -0.84142,-0.88027 -1.15987,-0.88027c-0.29773,-0.02588 -0.64208,-0.02588 -0.98382,-0.02588c-0.34693,0 -0.90616,0.12945 -1.37736,0.62136c-0.4712,0.5178 -1.80194,1.76053 -1.80194,4.27186c0,2.51134 1.84596,4.945 2.10227,5.30747c0.2589,0.33657 3.63497,5.51458 8.80262,7.74113c1.23237,0.5178 2.1903,0.82848 2.94111,1.08738c1.23237,0.38836 2.35599,0.33657 3.24402,0.20712c0.99159,-0.15534 3.04985,-1.24272 3.47963,-2.45956c0.44013,-1.21683 0.44013,-2.22654 0.31068,-2.45955c-0.12945,-0.23301 -0.46601,-0.36247 -0.98382,-0.59548m-9.40068,12.84407l-0.02589,0c-3.05503,0 -6.08417,-0.82849 -8.72495,-2.38189l-0.62136,-0.37023l-6.47252,1.68286l1.73463,-6.29129l-0.41424,-0.64725c-1.70875,-2.71846 -2.6149,-5.85116 -2.6149,-9.07706c0,-9.39809 7.68934,-17.06155 17.15993,-17.06155c4.58253,0 8.88029,1.78642 12.11655,5.02268c3.23625,3.21036 5.02267,7.50812 5.02267,12.06476c-0.0078,9.3981 -7.69712,17.06155 -17.14699,17.06155m14.58906,-31.58846c-3.93529,-3.80584 -9.1133,-5.95471 -14.62789,-5.95471c-11.36055,0 -20.60848,9.2065 -20.61625,20.52564c0,3.61684 0.94757,7.14565 2.75211,10.26282l-2.92557,10.63564l10.93337,-2.85309c3.0136,1.63108 6.4052,2.4958 9.85634,2.49839l0.01037,0c11.36574,0 20.61884,-9.2091 20.62403,-20.53082c0,-5.48093 -2.14111,-10.64081 -6.03239,-14.51915',
	  mask: 'M0,0v64h64V0H0z M32,48c-1.6,0-3.1-0.2-4.5-0.7c0.6-1,1.3-2.2,1.6-3.4c0.2-0.7,1.1-4.4,1.1-4.4 c0.6,1.1,2.2,2,3.9,2c5.1,0,8.6-4.7,8.6-11c0-4.7-4-9.2-10.1-9.2c-7.6,0-11.4,5.5-11.4,10c0,2.8,1,5.2,3.3,6.1 c0.4,0.1,0.7,0,0.8-0.4c0.1-0.3,0.2-1,0.3-1.3c0.1-0.4,0.1-0.5-0.2-0.9c-0.6-0.8-1.1-1.7-1.1-3.1c0-4,3-7.7,7.9-7.7 c4.3,0,6.7,2.6,6.7,6.1c0,4.6-2,8.5-5.1,8.5c-1.7,0-2.9-1.4-2.5-3.1c0.5-2,1.4-4.2,1.4-5.7c0-1.3-0.7-2.4-2.2-2.4 c-1.7,0-3.1,1.8-3.1,4.1c0,1.5,0.5,2.5,0.5,2.5s-1.8,7.4-2.1,8.7c-0.3,1.2-0.3,2.6-0.3,3.7C19.9,44.2,16,38.6,16,32 c0-8.8,7.2-16,16-16c8.8,0,16,7.2,16,16C48,40.8,40.8,48,32,48z',
	  color: '#2cb742'
	});
	
	exports.default = WhatsappIcon;

/***/ }),

/***/ 1801:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _propTypes = __webpack_require__(4);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	var _assert = __webpack_require__(12);
	
	var _assert2 = _interopRequireDefault(_assert);
	
	var _objectToGetParams = __webpack_require__(9);
	
	var _objectToGetParams2 = _interopRequireDefault(_objectToGetParams);
	
	var _createShareButton = __webpack_require__(11);
	
	var _createShareButton2 = _interopRequireDefault(_createShareButton);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function whatsappLink(url, _ref) {
	  var title = _ref.title,
	      separator = _ref.separator;
	
	  (0, _assert2.default)(url, 'whatsapp.url');
	  return 'https://api.whatsapp.com/send' + (0, _objectToGetParams2.default)({
	    text: title ? title + separator + url : url
	  });
	}
	
	var WhatsappShareButton = (0, _createShareButton2.default)('whatsapp', whatsappLink, function (props) {
	  return {
	    title: props.title,
	    separator: props.separator
	  };
	}, {
	  title: _propTypes2.default.string,
	  separator: _propTypes2.default.string
	}, {
	  separator: ' ',
	  windowWidth: 550,
	  windowHeight: 400
	});
	
	exports.default = WhatsappShareButton;

/***/ }),

/***/ 1802:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _iconFactory = __webpack_require__(14);
	
	var _iconFactory2 = _interopRequireDefault(_iconFactory);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var WorkplaceIcon = (0, _iconFactory2.default)('workplace', {
	  icon: 'M34.019,10.292c0.21,0.017,0.423,0.034,0.636,0.049 c3.657,0.262,6.976,1.464,9.929,3.635c3.331,2.448,5.635,5.65,6.914,9.584c0.699,2.152,0.983,4.365,0.885,6.623 c-0.136,3.171-1.008,6.13-2.619,8.867c-0.442,0.75-0.908,1.492-1.495,2.141c-0.588,0.651-1.29,1.141-2.146,1.383 c-1.496,0.426-3.247-0.283-3.961-1.642c-0.26-0.494-0.442-1.028-0.654-1.548c-1.156-2.838-2.311-5.679-3.465-8.519 c-0.017-0.042-0.037-0.082-0.065-0.145c-0.101,0.245-0.192,0.472-0.284,0.698c-1.237,3.051-2.475,6.103-3.711,9.155 c-0.466,1.153-1.351,1.815-2.538,2.045c-1.391,0.267-2.577-0.154-3.496-1.247c-0.174-0.209-0.31-0.464-0.415-0.717 c-2.128-5.22-4.248-10.442-6.37-15.665c-0.012-0.029-0.021-0.059-0.036-0.104c0.054-0.003,0.103-0.006,0.15-0.006 c1.498-0.001,2.997,0,4.495-0.004c0.12-0.001,0.176,0.03,0.222,0.146c1.557,3.846,3.117,7.691,4.679,11.536 c0.018,0.046,0.039,0.091,0.067,0.159c0.273-0.673,0.536-1.32,0.797-1.968c1.064-2.627,2.137-5.25,3.19-7.883 c0.482-1.208,1.376-1.917,2.621-2.135c1.454-0.255,2.644,0.257,3.522,1.449c0.133,0.18,0.229,0.393,0.313,0.603 c1.425,3.495,2.848,6.991,4.269,10.488c0.02,0.047,0.04,0.093,0.073,0.172c0.196-0.327,0.385-0.625,0.559-0.935 c0.783-1.397,1.323-2.886,1.614-4.461c0.242-1.312,0.304-2.634,0.187-3.962c-0.242-2.721-1.16-5.192-2.792-7.38 c-2.193-2.939-5.086-4.824-8.673-5.625c-1.553-0.346-3.124-0.405-4.705-0.257c-3.162,0.298-6.036,1.366-8.585,3.258 c-3.414,2.534-5.638,5.871-6.623,10.016c-0.417,1.76-0.546,3.547-0.384,5.348c0.417,4.601,2.359,8.444,5.804,11.517 c2.325,2.073,5.037,3.393,8.094,3.989c1.617,0.317,3.247,0.395,4.889,0.242c1-0.094,1.982-0.268,2.952-0.529 c0.04-0.01,0.081-0.018,0.128-0.028c0,1.526,0,3.047,0,4.586c-0.402,0.074-0.805,0.154-1.21,0.221 c-0.861,0.14-1.728,0.231-2.601,0.258c-0.035,0.002-0.071,0.013-0.108,0.021c-0.493,0-0.983,0-1.476,0 c-0.049-0.007-0.1-0.018-0.149-0.022c-0.315-0.019-0.629-0.033-0.945-0.058c-1.362-0.105-2.702-0.346-4.017-0.716 c-3.254-0.914-6.145-2.495-8.66-4.752c-2.195-1.971-3.926-4.29-5.176-6.963c-1.152-2.466-1.822-5.057-1.993-7.774 c-0.014-0.226-0.033-0.451-0.05-0.676c0-0.502,0-1.003,0-1.504c0.008-0.049,0.02-0.099,0.022-0.148 c0.036-1.025,0.152-2.043,0.338-3.052c0.481-2.616,1.409-5.066,2.8-7.331c2.226-3.625,5.25-6.386,9.074-8.254 c2.536-1.24,5.217-1.947,8.037-2.126c0.23-0.015,0.461-0.034,0.691-0.051C33.052,10.292,33.535,10.292,34.019,10.292z',
	  color: '#3b3d4a'
	});
	
	exports.default = WorkplaceIcon;

/***/ }),

/***/ 1803:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _propTypes = __webpack_require__(4);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	var _assert = __webpack_require__(12);
	
	var _assert2 = _interopRequireDefault(_assert);
	
	var _objectToGetParams = __webpack_require__(9);
	
	var _objectToGetParams2 = _interopRequireDefault(_objectToGetParams);
	
	var _createShareButton = __webpack_require__(11);
	
	var _createShareButton2 = _interopRequireDefault(_createShareButton);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function workplaceLink(url, _ref) {
	  var quote = _ref.quote,
	      hashtag = _ref.hashtag;
	
	  (0, _assert2.default)(url, 'workplace.url');
	
	  return 'https://work.facebook.com/sharer.php' + (0, _objectToGetParams2.default)({
	    u: url,
	    quote: quote,
	    hashtag: hashtag
	  });
	}
	
	var WorkplaceShareButton = (0, _createShareButton2.default)('workplace', workplaceLink, function (props) {
	  return {
	    quote: props.quote,
	    hashtag: props.hashtag
	  };
	}, {
	  quote: _propTypes2.default.string,
	  hashtag: _propTypes2.default.string
	}, {
	  windowWidth: 550,
	  windowHeight: 400
	});
	
	exports.default = WorkplaceShareButton;

/***/ }),

/***/ 1804:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _FacebookShareCount = __webpack_require__(1765);
	
	Object.defineProperty(exports, 'FacebookShareCount', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_FacebookShareCount).default;
	  }
	});
	
	var _GooglePlusShareCount = __webpack_require__(1768);
	
	Object.defineProperty(exports, 'GooglePlusShareCount', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_GooglePlusShareCount).default;
	  }
	});
	
	var _LinkedinShareCount = __webpack_require__(1773);
	
	Object.defineProperty(exports, 'LinkedinShareCount', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_LinkedinShareCount).default;
	  }
	});
	
	var _PinterestShareCount = __webpack_require__(1783);
	
	Object.defineProperty(exports, 'PinterestShareCount', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_PinterestShareCount).default;
	  }
	});
	
	var _VKShareCount = __webpack_require__(1796);
	
	Object.defineProperty(exports, 'VKShareCount', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_VKShareCount).default;
	  }
	});
	
	var _OKShareCount = __webpack_require__(1780);
	
	Object.defineProperty(exports, 'OKShareCount', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_OKShareCount).default;
	  }
	});
	
	var _RedditShareCount = __webpack_require__(1786);
	
	Object.defineProperty(exports, 'RedditShareCount', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_RedditShareCount).default;
	  }
	});
	
	var _TumblrShareCount = __webpack_require__(1791);
	
	Object.defineProperty(exports, 'TumblrShareCount', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_TumblrShareCount).default;
	  }
	});
	
	var _FacebookShareButton = __webpack_require__(1764);
	
	Object.defineProperty(exports, 'FacebookShareButton', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_FacebookShareButton).default;
	  }
	});
	
	var _GooglePlusShareButton = __webpack_require__(1767);
	
	Object.defineProperty(exports, 'GooglePlusShareButton', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_GooglePlusShareButton).default;
	  }
	});
	
	var _LinkedinShareButton = __webpack_require__(1772);
	
	Object.defineProperty(exports, 'LinkedinShareButton', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_LinkedinShareButton).default;
	  }
	});
	
	var _TwitterShareButton = __webpack_require__(1793);
	
	Object.defineProperty(exports, 'TwitterShareButton', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_TwitterShareButton).default;
	  }
	});
	
	var _PinterestShareButton = __webpack_require__(1782);
	
	Object.defineProperty(exports, 'PinterestShareButton', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_PinterestShareButton).default;
	  }
	});
	
	var _VKShareButton = __webpack_require__(1795);
	
	Object.defineProperty(exports, 'VKShareButton', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_VKShareButton).default;
	  }
	});
	
	var _OKShareButton = __webpack_require__(1779);
	
	Object.defineProperty(exports, 'OKShareButton', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_OKShareButton).default;
	  }
	});
	
	var _TelegramShareButton = __webpack_require__(1788);
	
	Object.defineProperty(exports, 'TelegramShareButton', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_TelegramShareButton).default;
	  }
	});
	
	var _WhatsappShareButton = __webpack_require__(1801);
	
	Object.defineProperty(exports, 'WhatsappShareButton', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_WhatsappShareButton).default;
	  }
	});
	
	var _RedditShareButton = __webpack_require__(1785);
	
	Object.defineProperty(exports, 'RedditShareButton', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_RedditShareButton).default;
	  }
	});
	
	var _EmailShareButton = __webpack_require__(1762);
	
	Object.defineProperty(exports, 'EmailShareButton', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_EmailShareButton).default;
	  }
	});
	
	var _TumblrShareButton = __webpack_require__(1790);
	
	Object.defineProperty(exports, 'TumblrShareButton', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_TumblrShareButton).default;
	  }
	});
	
	var _LivejournalShareButton = __webpack_require__(1775);
	
	Object.defineProperty(exports, 'LivejournalShareButton', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_LivejournalShareButton).default;
	  }
	});
	
	var _MailruShareButton = __webpack_require__(1777);
	
	Object.defineProperty(exports, 'MailruShareButton', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_MailruShareButton).default;
	  }
	});
	
	var _ViberShareButton = __webpack_require__(1798);
	
	Object.defineProperty(exports, 'ViberShareButton', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_ViberShareButton).default;
	  }
	});
	
	var _WorkplaceShareButton = __webpack_require__(1803);
	
	Object.defineProperty(exports, 'WorkplaceShareButton', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_WorkplaceShareButton).default;
	  }
	});
	
	var _LineShareButton = __webpack_require__(1770);
	
	Object.defineProperty(exports, 'LineShareButton', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_LineShareButton).default;
	  }
	});
	
	var _WeiboShareButton = __webpack_require__(1799);
	
	Object.defineProperty(exports, 'WeiboShareButton', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_WeiboShareButton).default;
	  }
	});
	
	var _FacebookIcon = __webpack_require__(1763);
	
	Object.defineProperty(exports, 'FacebookIcon', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_FacebookIcon).default;
	  }
	});
	
	var _TwitterIcon = __webpack_require__(1792);
	
	Object.defineProperty(exports, 'TwitterIcon', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_TwitterIcon).default;
	  }
	});
	
	var _GooglePlusIcon = __webpack_require__(1766);
	
	Object.defineProperty(exports, 'GooglePlusIcon', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_GooglePlusIcon).default;
	  }
	});
	
	var _LinkedinIcon = __webpack_require__(1771);
	
	Object.defineProperty(exports, 'LinkedinIcon', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_LinkedinIcon).default;
	  }
	});
	
	var _PinterestIcon = __webpack_require__(1781);
	
	Object.defineProperty(exports, 'PinterestIcon', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_PinterestIcon).default;
	  }
	});
	
	var _VKIcon = __webpack_require__(1794);
	
	Object.defineProperty(exports, 'VKIcon', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_VKIcon).default;
	  }
	});
	
	var _OKIcon = __webpack_require__(1778);
	
	Object.defineProperty(exports, 'OKIcon', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_OKIcon).default;
	  }
	});
	
	var _TelegramIcon = __webpack_require__(1787);
	
	Object.defineProperty(exports, 'TelegramIcon', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_TelegramIcon).default;
	  }
	});
	
	var _WhatsappIcon = __webpack_require__(1800);
	
	Object.defineProperty(exports, 'WhatsappIcon', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_WhatsappIcon).default;
	  }
	});
	
	var _RedditIcon = __webpack_require__(1784);
	
	Object.defineProperty(exports, 'RedditIcon', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_RedditIcon).default;
	  }
	});
	
	var _TumblrIcon = __webpack_require__(1789);
	
	Object.defineProperty(exports, 'TumblrIcon', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_TumblrIcon).default;
	  }
	});
	
	var _MailruIcon = __webpack_require__(1776);
	
	Object.defineProperty(exports, 'MailruIcon', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_MailruIcon).default;
	  }
	});
	
	var _EmailIcon = __webpack_require__(1761);
	
	Object.defineProperty(exports, 'EmailIcon', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_EmailIcon).default;
	  }
	});
	
	var _LivejournalIcon = __webpack_require__(1774);
	
	Object.defineProperty(exports, 'LivejournalIcon', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_LivejournalIcon).default;
	  }
	});
	
	var _ViberIcon = __webpack_require__(1797);
	
	Object.defineProperty(exports, 'ViberIcon', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_ViberIcon).default;
	  }
	});
	
	var _WorkplaceIcon = __webpack_require__(1802);
	
	Object.defineProperty(exports, 'WorkplaceIcon', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_WorkplaceIcon).default;
	  }
	});
	
	var _LineIcon = __webpack_require__(1769);
	
	Object.defineProperty(exports, 'LineIcon', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_LineIcon).default;
	  }
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ 11:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends2 = __webpack_require__(8);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _getPrototypeOf = __webpack_require__(870);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(5);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(871);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(7);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(6);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _keys = __webpack_require__(94);
	
	var _keys2 = _interopRequireDefault(_keys);
	
	var _typeof2 = __webpack_require__(96);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _propTypes = __webpack_require__(4);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	var _classnames = __webpack_require__(873);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _ieDetection = __webpack_require__(918);
	
	var _ieDetection2 = _interopRequireDefault(_ieDetection);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var isPromise = function isPromise(obj) {
	  return !!obj && ((typeof obj === 'undefined' ? 'undefined' : (0, _typeof3.default)(obj)) === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
	};
	
	function windowOpen(url, _ref, onShareWindowClose) {
	  var name = _ref.name,
	      _ref$height = _ref.height,
	      height = _ref$height === undefined ? 400 : _ref$height,
	      _ref$width = _ref.width,
	      width = _ref$width === undefined ? 550 : _ref$width;
	
	  /* eslint-disable no-mixed-operators */
	  var left = window.outerWidth / 2 + (window.screenX || window.screenLeft || 0) - width / 2;
	  var top = window.outerHeight / 2 + (window.screenY || window.screenTop || 0) - height / 2;
	  /* eslint-enable no-mixed-operators */
	
	  var config = {
	    height: height,
	    width: width,
	    left: left,
	    top: top,
	    location: 'no',
	    toolbar: 'no',
	    status: 'no',
	    directories: 'no',
	    menubar: 'no',
	    scrollbars: 'yes',
	    resizable: 'no',
	    centerscreen: 'yes',
	    chrome: 'yes'
	  };
	
	  var shareDialog = window.open(url, (0, _ieDetection2.default)(10) ? '' : name, (0, _keys2.default)(config).map(function (key) {
	    return key + '=' + config[key];
	  }).join(', '));
	
	  if (onShareWindowClose) {
	    var interval = window.setInterval(function () {
	      try {
	        if (shareDialog === null || shareDialog.closed) {
	          window.clearInterval(interval);
	          onShareWindowClose(shareDialog);
	        }
	      } catch (e) {
	        /* eslint-disable no-console */
	        console.error(e);
	        /* eslint-enable no-console */
	      }
	    }, 1000);
	  }
	
	  return shareDialog;
	}
	
	var ShareButton = function (_PureComponent) {
	  (0, _inherits3.default)(ShareButton, _PureComponent);
	
	  function ShareButton() {
	    var _ref2;
	
	    var _temp, _this, _ret;
	
	    (0, _classCallCheck3.default)(this, ShareButton);
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref2 = ShareButton.__proto__ || (0, _getPrototypeOf2.default)(ShareButton)).call.apply(_ref2, [this].concat(args))), _this), _this.onClick = function (e) {
	      var _this$props = _this.props,
	          disabled = _this$props.disabled,
	          onClick = _this$props.onClick,
	          openWindow = _this$props.openWindow,
	          beforeOnClick = _this$props.beforeOnClick;
	
	
	      if (disabled) {
	        return;
	      }
	
	      e.preventDefault();
	
	      var link = _this.link();
	
	      var clickHandler = openWindow ? function () {
	        return _this.openWindow(link);
	      } : function () {
	        return onClick(link);
	      };
	
	      if (beforeOnClick) {
	        var returnVal = beforeOnClick();
	
	        if (isPromise(returnVal)) {
	          returnVal.then(clickHandler);
	        } else {
	          clickHandler();
	        }
	      } else {
	        clickHandler();
	      }
	    }, _this.onKeyPress = function (e) {
	      if (e.key === 'Enter' || e.key === 13 || e.key === ' ' || e.key === 32) {
	        _this.onClick(e);
	      }
	    }, _this.openWindow = function (link) {
	      var _this$props2 = _this.props,
	          onShareWindowClose = _this$props2.onShareWindowClose,
	          windowWidth = _this$props2.windowWidth,
	          windowHeight = _this$props2.windowHeight;
	
	
	      var windowOptions = {
	        height: windowHeight,
	        width: windowWidth
	      };
	
	      windowOpen(link, windowOptions, onShareWindowClose);
	    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
	  }
	
	  (0, _createClass3.default)(ShareButton, [{
	    key: 'link',
	    value: function link() {
	      var _props = this.props,
	          url = _props.url,
	          opts = _props.opts,
	          networkLink = _props.networkLink;
	
	      return networkLink(url, opts);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props2 = this.props,
	          additionalProps = _props2.additionalProps,
	          children = _props2.children,
	          className = _props2.className,
	          disabled = _props2.disabled,
	          disabledStyle = _props2.disabledStyle,
	          name = _props2.name,
	          network = _props2.network,
	          role = _props2.role,
	          style = _props2.style,
	          tabIndex = _props2.tabIndex;
	
	
	      var classes = (0, _classnames2.default)('SocialMediaShareButton', 'SocialMediaShareButton--' + network, {
	        'SocialMediaShareButton--disabled': !!disabled,
	        disabled: !!disabled
	      }, className);
	
	      return _react2.default.createElement(
	        'div',
	        (0, _extends3.default)({
	          name: name
	        }, additionalProps, {
	          role: role,
	          tabIndex: tabIndex,
	          onClick: this.onClick,
	          onKeyPress: this.onKeyPress,
	          className: classes,
	          style: (0, _extends3.default)({}, style, disabled ? disabledStyle : {}) }),
	        children
	      );
	    }
	  }]);
	  return ShareButton;
	}(_react.PureComponent);
	
	ShareButton.propTypes = {
	  additionalProps: _propTypes2.default.object,
	  children: _propTypes2.default.node,
	  className: _propTypes2.default.string,
	  disabled: _propTypes2.default.bool,
	  disabledStyle: _propTypes2.default.object,
	  name: _propTypes2.default.string,
	  network: _propTypes2.default.string.isRequired,
	  networkLink: _propTypes2.default.func.isRequired,
	  onClick: _propTypes2.default.func,
	  opts: _propTypes2.default.object,
	  openWindow: _propTypes2.default.bool,
	  url: _propTypes2.default.string.isRequired,
	  role: _propTypes2.default.string,
	  style: _propTypes2.default.object,
	  windowWidth: _propTypes2.default.number,
	  windowHeight: _propTypes2.default.number,
	  beforeOnClick: _propTypes2.default.func,
	  onShareWindowClose: _propTypes2.default.func,
	  tabIndex: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
	};
	ShareButton.defaultProps = {
	  disabledStyle: {
	    opacity: 0.6
	  },
	  openWindow: true,
	  role: 'button',
	  tabIndex: '0'
	};
	
	
	function createShareButton(network, link) {
	  var optsMap = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {
	    return {};
	  };
	  var propTypes = arguments[3];
	  var defaultProps = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
	
	  var CreatedButton = function CreatedButton(props) {
	    return _react2.default.createElement(ShareButton, (0, _extends3.default)({}, props, {
	      network: network,
	      networkLink: link,
	      opts: optsMap(props) }));
	  };
	
	  CreatedButton.propTypes = propTypes;
	  CreatedButton.defaultProps = defaultProps;
	
	  return CreatedButton;
	}
	
	exports.default = createShareButton;

/***/ }),

/***/ 14:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = iconFactory;
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _propTypes = __webpack_require__(4);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function iconFactory(network, iconConfig) {
	  var Icon = function Icon(props) {
	    var className = props.className,
	        iconBgStyle = props.iconBgStyle,
	        logoFillColor = props.logoFillColor,
	        round = props.round,
	        size = props.size;
	
	
	    var baseStyle = {
	      width: size,
	      height: size
	    };
	
	    var classes = 'social-icon social-icon--' + network + ' ' + className;
	
	    return _react2.default.createElement(
	      'div',
	      { style: baseStyle },
	      _react2.default.createElement(
	        'svg',
	        {
	          viewBox: '0 0 64 64',
	          width: size,
	          height: size,
	          className: classes },
	        _react2.default.createElement(
	          'g',
	          null,
	          !round ? _react2.default.createElement('rect', {
	            width: '64',
	            height: '64',
	            fill: iconConfig.color,
	            style: iconBgStyle }) : _react2.default.createElement('circle', {
	            cx: '32',
	            cy: '32',
	            r: '31',
	            fill: iconConfig.color,
	            style: iconBgStyle })
	        ),
	        _react2.default.createElement(
	          'g',
	          null,
	          _react2.default.createElement('path', { d: iconConfig.icon, fill: logoFillColor })
	        )
	      )
	    );
	  };
	
	  Icon.propTypes = {
	    className: _propTypes2.default.string,
	    iconBgStyle: _propTypes2.default.object,
	    logoFillColor: _propTypes2.default.string,
	    round: _propTypes2.default.bool,
	    size: _propTypes2.default.number
	  };
	
	  Icon.defaultProps = {
	    className: '',
	    iconBgStyle: {},
	    logoFillColor: 'white',
	    size: 64
	  };
	
	  return Icon;
	}

/***/ }),

/***/ 918:
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isInternetExplorerBefore;
	/*
	 * This detection method identifies Internet Explorers up until version 11.
	 *
	 * Reference: https://msdn.microsoft.com/en-us/library/ms537503(v=vs.85).aspx
	 */
	function isInternetExplorerBefore(version) {
	  var iematch = /MSIE ([0-9]+)/g.exec(window.navigator.userAgent);
	
	  return iematch ? +iematch[1] < version : false;
	}

/***/ }),

/***/ 9:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _keys = __webpack_require__(94);
	
	var _keys2 = _interopRequireDefault(_keys);
	
	exports.default = objectToGetParams;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/* eslint-disable prefer-template */
	function objectToGetParams(object) {
	  return '?' + (0, _keys2.default)(object).filter(function (key) {
	    return !!object[key];
	  }).map(function (key) {
	    return key + '=' + encodeURIComponent(object[key]);
	  }).join('&');
	}
	/* eslint-enable prefer-template */

/***/ }),

/***/ 31:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends2 = __webpack_require__(8);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _getPrototypeOf = __webpack_require__(870);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(5);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(871);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(7);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(6);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	exports.default = shareCountFactory;
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _propTypes = __webpack_require__(4);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	var _classnames = __webpack_require__(873);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var SocialMediaShareCount = function (_Component) {
	  (0, _inherits3.default)(SocialMediaShareCount, _Component);
	
	  function SocialMediaShareCount(props) {
	    (0, _classCallCheck3.default)(this, SocialMediaShareCount);
	
	    var _this = (0, _possibleConstructorReturn3.default)(this, (SocialMediaShareCount.__proto__ || (0, _getPrototypeOf2.default)(SocialMediaShareCount)).call(this, props));
	
	    _this._isMounted = false;
	    _this.state = { count: 0 };
	    return _this;
	  }
	
	  (0, _createClass3.default)(SocialMediaShareCount, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this._isMounted = true;
	      this.updateCount(this.props.url);
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      if (nextProps.url !== this.props.url) {
	        this.updateCount(nextProps.url);
	      }
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this._isMounted = false;
	    }
	  }, {
	    key: 'updateCount',
	    value: function updateCount(url) {
	      var _this2 = this;
	
	      if (this.props.getCount) {
	        this.setState({
	          isLoading: true
	        });
	
	        this.props.getCount(url, function (count) {
	          if (_this2._isMounted) {
	            _this2.setState({
	              count: count,
	              isLoading: false
	            });
	          }
	        });
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _state = this.state,
	          count = _state.count,
	          isLoading = _state.isLoading;
	      var _props = this.props,
	          children = _props.children,
	          className = _props.className;
	
	
	      return _react2.default.createElement(
	        'div',
	        { className: (0, _classnames2.default)('SocialMediaShareCount', className) },
	        !isLoading && children(count || 0)
	      );
	    }
	  }]);
	  return SocialMediaShareCount;
	}(_react.Component);
	
	SocialMediaShareCount.propTypes = {
	  children: _propTypes2.default.func,
	  className: _propTypes2.default.string,
	  getCount: _propTypes2.default.func,
	  url: _propTypes2.default.string.isRequired
	};
	
	SocialMediaShareCount.defaultProps = {
	  children: function children(shareCount) {
	    return shareCount;
	  }
	};
	
	function shareCountFactory(getCount) {
	  return function (props) {
	    return _react2.default.createElement(SocialMediaShareCount, (0, _extends3.default)({ getCount: getCount }, props));
	  };
	}

/***/ }),

/***/ 1806:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _propTypes = __webpack_require__(4);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	var _spin = __webpack_require__(1817);
	
	var _spin2 = _interopRequireDefault(_spin);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Spinner = function (_Component) {
	  _inherits(Spinner, _Component);
	
	  function Spinner() {
	    _classCallCheck(this, Spinner);
	
	    return _possibleConstructorReturn(this, (Spinner.__proto__ || Object.getPrototypeOf(Spinner)).apply(this, arguments));
	  }
	
	  _createClass(Spinner, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.updateSpinner();
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate() {
	      this.updateSpinner();
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      if (this.spinner) {
	        this.spinner.stop();
	        this.spinner = null;
	      }
	    }
	  }, {
	    key: 'updateSpinner',
	    value: function updateSpinner() {
	      var loaded = this.props.loaded;
	
	      if (!loaded && !this.spinner) {
	        this.spinner = new _spin2.default(this.props.config);
	        this.spinner.spin(this.refs.loader);
	      } else if (loaded && this.spinner) {
	        this.spinner.stop();
	        this.spinner = null;
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props,
	          loaded = _props.loaded,
	          className = _props.className;
	
	
	      if (loaded) {
	        return this.props.children ? _react.Children.only(this.props.children) : null;
	      }
	
	      return _react2.default.createElement('div', { className: className, ref: 'loader' });
	    }
	  }]);
	
	  return Spinner;
	}(_react.Component);
	
	Spinner.propTypes = {
	  className: _propTypes2.default.string,
	  config: _propTypes2.default.object.isRequired,
	  loaded: _propTypes2.default.bool.isRequired,
	  children: _propTypes2.default.node
	};
	Spinner.defaultProps = {
	  config: {},
	  loaded: false,
	  className: 'loader'
	};
	exports.default = Spinner;

/***/ }),

/***/ 1808:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2014-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */
	
	// This method of obtaining a reference to the global object needs to be
	// kept identical to the way it is obtained in runtime.js
	var g = (function() { return this })() || Function("return this")();
	
	// Use `getOwnPropertyNames` because not all browsers support calling
	// `hasOwnProperty` on the global `self` object in a worker. See #183.
	var hadRuntime = g.regeneratorRuntime &&
	  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;
	
	// Save the old regeneratorRuntime in case it needs to be restored later.
	var oldRuntime = hadRuntime && g.regeneratorRuntime;
	
	// Force reevalutation of runtime.js.
	g.regeneratorRuntime = undefined;
	
	module.exports = __webpack_require__(1809);
	
	if (hadRuntime) {
	  // Restore the original runtime.
	  g.regeneratorRuntime = oldRuntime;
	} else {
	  // Remove the global property added by runtime.js.
	  try {
	    delete g.regeneratorRuntime;
	  } catch(e) {
	    g.regeneratorRuntime = undefined;
	  }
	}


/***/ }),

/***/ 1809:
/***/ (function(module, exports) {

	/**
	 * Copyright (c) 2014-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */
	
	!(function(global) {
	  "use strict";
	
	  var Op = Object.prototype;
	  var hasOwn = Op.hasOwnProperty;
	  var undefined; // More compressible than void 0.
	  var $Symbol = typeof Symbol === "function" ? Symbol : {};
	  var iteratorSymbol = $Symbol.iterator || "@@iterator";
	  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
	  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
	
	  var inModule = typeof module === "object";
	  var runtime = global.regeneratorRuntime;
	  if (runtime) {
	    if (inModule) {
	      // If regeneratorRuntime is defined globally and we're in a module,
	      // make the exports object identical to regeneratorRuntime.
	      module.exports = runtime;
	    }
	    // Don't bother evaluating the rest of this file if the runtime was
	    // already defined globally.
	    return;
	  }
	
	  // Define the runtime globally (as expected by generated code) as either
	  // module.exports (if we're in a module) or a new, empty object.
	  runtime = global.regeneratorRuntime = inModule ? module.exports : {};
	
	  function wrap(innerFn, outerFn, self, tryLocsList) {
	    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
	    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
	    var generator = Object.create(protoGenerator.prototype);
	    var context = new Context(tryLocsList || []);
	
	    // The ._invoke method unifies the implementations of the .next,
	    // .throw, and .return methods.
	    generator._invoke = makeInvokeMethod(innerFn, self, context);
	
	    return generator;
	  }
	  runtime.wrap = wrap;
	
	  // Try/catch helper to minimize deoptimizations. Returns a completion
	  // record like context.tryEntries[i].completion. This interface could
	  // have been (and was previously) designed to take a closure to be
	  // invoked without arguments, but in all the cases we care about we
	  // already have an existing method we want to call, so there's no need
	  // to create a new function object. We can even get away with assuming
	  // the method takes exactly one argument, since that happens to be true
	  // in every case, so we don't have to touch the arguments object. The
	  // only additional allocation required is the completion record, which
	  // has a stable shape and so hopefully should be cheap to allocate.
	  function tryCatch(fn, obj, arg) {
	    try {
	      return { type: "normal", arg: fn.call(obj, arg) };
	    } catch (err) {
	      return { type: "throw", arg: err };
	    }
	  }
	
	  var GenStateSuspendedStart = "suspendedStart";
	  var GenStateSuspendedYield = "suspendedYield";
	  var GenStateExecuting = "executing";
	  var GenStateCompleted = "completed";
	
	  // Returning this object from the innerFn has the same effect as
	  // breaking out of the dispatch switch statement.
	  var ContinueSentinel = {};
	
	  // Dummy constructor functions that we use as the .constructor and
	  // .constructor.prototype properties for functions that return Generator
	  // objects. For full spec compliance, you may wish to configure your
	  // minifier not to mangle the names of these two functions.
	  function Generator() {}
	  function GeneratorFunction() {}
	  function GeneratorFunctionPrototype() {}
	
	  // This is a polyfill for %IteratorPrototype% for environments that
	  // don't natively support it.
	  var IteratorPrototype = {};
	  IteratorPrototype[iteratorSymbol] = function () {
	    return this;
	  };
	
	  var getProto = Object.getPrototypeOf;
	  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
	  if (NativeIteratorPrototype &&
	      NativeIteratorPrototype !== Op &&
	      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
	    // This environment has a native %IteratorPrototype%; use it instead
	    // of the polyfill.
	    IteratorPrototype = NativeIteratorPrototype;
	  }
	
	  var Gp = GeneratorFunctionPrototype.prototype =
	    Generator.prototype = Object.create(IteratorPrototype);
	  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
	  GeneratorFunctionPrototype.constructor = GeneratorFunction;
	  GeneratorFunctionPrototype[toStringTagSymbol] =
	    GeneratorFunction.displayName = "GeneratorFunction";
	
	  // Helper for defining the .next, .throw, and .return methods of the
	  // Iterator interface in terms of a single ._invoke method.
	  function defineIteratorMethods(prototype) {
	    ["next", "throw", "return"].forEach(function(method) {
	      prototype[method] = function(arg) {
	        return this._invoke(method, arg);
	      };
	    });
	  }
	
	  runtime.isGeneratorFunction = function(genFun) {
	    var ctor = typeof genFun === "function" && genFun.constructor;
	    return ctor
	      ? ctor === GeneratorFunction ||
	        // For the native GeneratorFunction constructor, the best we can
	        // do is to check its .name property.
	        (ctor.displayName || ctor.name) === "GeneratorFunction"
	      : false;
	  };
	
	  runtime.mark = function(genFun) {
	    if (Object.setPrototypeOf) {
	      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
	    } else {
	      genFun.__proto__ = GeneratorFunctionPrototype;
	      if (!(toStringTagSymbol in genFun)) {
	        genFun[toStringTagSymbol] = "GeneratorFunction";
	      }
	    }
	    genFun.prototype = Object.create(Gp);
	    return genFun;
	  };
	
	  // Within the body of any async function, `await x` is transformed to
	  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
	  // `hasOwn.call(value, "__await")` to determine if the yielded value is
	  // meant to be awaited.
	  runtime.awrap = function(arg) {
	    return { __await: arg };
	  };
	
	  function AsyncIterator(generator) {
	    function invoke(method, arg, resolve, reject) {
	      var record = tryCatch(generator[method], generator, arg);
	      if (record.type === "throw") {
	        reject(record.arg);
	      } else {
	        var result = record.arg;
	        var value = result.value;
	        if (value &&
	            typeof value === "object" &&
	            hasOwn.call(value, "__await")) {
	          return Promise.resolve(value.__await).then(function(value) {
	            invoke("next", value, resolve, reject);
	          }, function(err) {
	            invoke("throw", err, resolve, reject);
	          });
	        }
	
	        return Promise.resolve(value).then(function(unwrapped) {
	          // When a yielded Promise is resolved, its final value becomes
	          // the .value of the Promise<{value,done}> result for the
	          // current iteration. If the Promise is rejected, however, the
	          // result for this iteration will be rejected with the same
	          // reason. Note that rejections of yielded Promises are not
	          // thrown back into the generator function, as is the case
	          // when an awaited Promise is rejected. This difference in
	          // behavior between yield and await is important, because it
	          // allows the consumer to decide what to do with the yielded
	          // rejection (swallow it and continue, manually .throw it back
	          // into the generator, abandon iteration, whatever). With
	          // await, by contrast, there is no opportunity to examine the
	          // rejection reason outside the generator function, so the
	          // only option is to throw it from the await expression, and
	          // let the generator function handle the exception.
	          result.value = unwrapped;
	          resolve(result);
	        }, reject);
	      }
	    }
	
	    var previousPromise;
	
	    function enqueue(method, arg) {
	      function callInvokeWithMethodAndArg() {
	        return new Promise(function(resolve, reject) {
	          invoke(method, arg, resolve, reject);
	        });
	      }
	
	      return previousPromise =
	        // If enqueue has been called before, then we want to wait until
	        // all previous Promises have been resolved before calling invoke,
	        // so that results are always delivered in the correct order. If
	        // enqueue has not been called before, then it is important to
	        // call invoke immediately, without waiting on a callback to fire,
	        // so that the async generator function has the opportunity to do
	        // any necessary setup in a predictable way. This predictability
	        // is why the Promise constructor synchronously invokes its
	        // executor callback, and why async functions synchronously
	        // execute code before the first await. Since we implement simple
	        // async functions in terms of async generators, it is especially
	        // important to get this right, even though it requires care.
	        previousPromise ? previousPromise.then(
	          callInvokeWithMethodAndArg,
	          // Avoid propagating failures to Promises returned by later
	          // invocations of the iterator.
	          callInvokeWithMethodAndArg
	        ) : callInvokeWithMethodAndArg();
	    }
	
	    // Define the unified helper method that is used to implement .next,
	    // .throw, and .return (see defineIteratorMethods).
	    this._invoke = enqueue;
	  }
	
	  defineIteratorMethods(AsyncIterator.prototype);
	  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
	    return this;
	  };
	  runtime.AsyncIterator = AsyncIterator;
	
	  // Note that simple async functions are implemented on top of
	  // AsyncIterator objects; they just return a Promise for the value of
	  // the final result produced by the iterator.
	  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
	    var iter = new AsyncIterator(
	      wrap(innerFn, outerFn, self, tryLocsList)
	    );
	
	    return runtime.isGeneratorFunction(outerFn)
	      ? iter // If outerFn is a generator, return the full iterator.
	      : iter.next().then(function(result) {
	          return result.done ? result.value : iter.next();
	        });
	  };
	
	  function makeInvokeMethod(innerFn, self, context) {
	    var state = GenStateSuspendedStart;
	
	    return function invoke(method, arg) {
	      if (state === GenStateExecuting) {
	        throw new Error("Generator is already running");
	      }
	
	      if (state === GenStateCompleted) {
	        if (method === "throw") {
	          throw arg;
	        }
	
	        // Be forgiving, per 25.3.3.3.3 of the spec:
	        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
	        return doneResult();
	      }
	
	      context.method = method;
	      context.arg = arg;
	
	      while (true) {
	        var delegate = context.delegate;
	        if (delegate) {
	          var delegateResult = maybeInvokeDelegate(delegate, context);
	          if (delegateResult) {
	            if (delegateResult === ContinueSentinel) continue;
	            return delegateResult;
	          }
	        }
	
	        if (context.method === "next") {
	          // Setting context._sent for legacy support of Babel's
	          // function.sent implementation.
	          context.sent = context._sent = context.arg;
	
	        } else if (context.method === "throw") {
	          if (state === GenStateSuspendedStart) {
	            state = GenStateCompleted;
	            throw context.arg;
	          }
	
	          context.dispatchException(context.arg);
	
	        } else if (context.method === "return") {
	          context.abrupt("return", context.arg);
	        }
	
	        state = GenStateExecuting;
	
	        var record = tryCatch(innerFn, self, context);
	        if (record.type === "normal") {
	          // If an exception is thrown from innerFn, we leave state ===
	          // GenStateExecuting and loop back for another invocation.
	          state = context.done
	            ? GenStateCompleted
	            : GenStateSuspendedYield;
	
	          if (record.arg === ContinueSentinel) {
	            continue;
	          }
	
	          return {
	            value: record.arg,
	            done: context.done
	          };
	
	        } else if (record.type === "throw") {
	          state = GenStateCompleted;
	          // Dispatch the exception by looping back around to the
	          // context.dispatchException(context.arg) call above.
	          context.method = "throw";
	          context.arg = record.arg;
	        }
	      }
	    };
	  }
	
	  // Call delegate.iterator[context.method](context.arg) and handle the
	  // result, either by returning a { value, done } result from the
	  // delegate iterator, or by modifying context.method and context.arg,
	  // setting context.delegate to null, and returning the ContinueSentinel.
	  function maybeInvokeDelegate(delegate, context) {
	    var method = delegate.iterator[context.method];
	    if (method === undefined) {
	      // A .throw or .return when the delegate iterator has no .throw
	      // method always terminates the yield* loop.
	      context.delegate = null;
	
	      if (context.method === "throw") {
	        if (delegate.iterator.return) {
	          // If the delegate iterator has a return method, give it a
	          // chance to clean up.
	          context.method = "return";
	          context.arg = undefined;
	          maybeInvokeDelegate(delegate, context);
	
	          if (context.method === "throw") {
	            // If maybeInvokeDelegate(context) changed context.method from
	            // "return" to "throw", let that override the TypeError below.
	            return ContinueSentinel;
	          }
	        }
	
	        context.method = "throw";
	        context.arg = new TypeError(
	          "The iterator does not provide a 'throw' method");
	      }
	
	      return ContinueSentinel;
	    }
	
	    var record = tryCatch(method, delegate.iterator, context.arg);
	
	    if (record.type === "throw") {
	      context.method = "throw";
	      context.arg = record.arg;
	      context.delegate = null;
	      return ContinueSentinel;
	    }
	
	    var info = record.arg;
	
	    if (! info) {
	      context.method = "throw";
	      context.arg = new TypeError("iterator result is not an object");
	      context.delegate = null;
	      return ContinueSentinel;
	    }
	
	    if (info.done) {
	      // Assign the result of the finished delegate to the temporary
	      // variable specified by delegate.resultName (see delegateYield).
	      context[delegate.resultName] = info.value;
	
	      // Resume execution at the desired location (see delegateYield).
	      context.next = delegate.nextLoc;
	
	      // If context.method was "throw" but the delegate handled the
	      // exception, let the outer generator proceed normally. If
	      // context.method was "next", forget context.arg since it has been
	      // "consumed" by the delegate iterator. If context.method was
	      // "return", allow the original .return call to continue in the
	      // outer generator.
	      if (context.method !== "return") {
	        context.method = "next";
	        context.arg = undefined;
	      }
	
	    } else {
	      // Re-yield the result returned by the delegate method.
	      return info;
	    }
	
	    // The delegate iterator is finished, so forget it and continue with
	    // the outer generator.
	    context.delegate = null;
	    return ContinueSentinel;
	  }
	
	  // Define Generator.prototype.{next,throw,return} in terms of the
	  // unified ._invoke helper method.
	  defineIteratorMethods(Gp);
	
	  Gp[toStringTagSymbol] = "Generator";
	
	  // A Generator should always return itself as the iterator object when the
	  // @@iterator function is called on it. Some browsers' implementations of the
	  // iterator prototype chain incorrectly implement this, causing the Generator
	  // object to not be returned from this call. This ensures that doesn't happen.
	  // See https://github.com/facebook/regenerator/issues/274 for more details.
	  Gp[iteratorSymbol] = function() {
	    return this;
	  };
	
	  Gp.toString = function() {
	    return "[object Generator]";
	  };
	
	  function pushTryEntry(locs) {
	    var entry = { tryLoc: locs[0] };
	
	    if (1 in locs) {
	      entry.catchLoc = locs[1];
	    }
	
	    if (2 in locs) {
	      entry.finallyLoc = locs[2];
	      entry.afterLoc = locs[3];
	    }
	
	    this.tryEntries.push(entry);
	  }
	
	  function resetTryEntry(entry) {
	    var record = entry.completion || {};
	    record.type = "normal";
	    delete record.arg;
	    entry.completion = record;
	  }
	
	  function Context(tryLocsList) {
	    // The root entry object (effectively a try statement without a catch
	    // or a finally block) gives us a place to store values thrown from
	    // locations where there is no enclosing try statement.
	    this.tryEntries = [{ tryLoc: "root" }];
	    tryLocsList.forEach(pushTryEntry, this);
	    this.reset(true);
	  }
	
	  runtime.keys = function(object) {
	    var keys = [];
	    for (var key in object) {
	      keys.push(key);
	    }
	    keys.reverse();
	
	    // Rather than returning an object with a next method, we keep
	    // things simple and return the next function itself.
	    return function next() {
	      while (keys.length) {
	        var key = keys.pop();
	        if (key in object) {
	          next.value = key;
	          next.done = false;
	          return next;
	        }
	      }
	
	      // To avoid creating an additional object, we just hang the .value
	      // and .done properties off the next function object itself. This
	      // also ensures that the minifier will not anonymize the function.
	      next.done = true;
	      return next;
	    };
	  };
	
	  function values(iterable) {
	    if (iterable) {
	      var iteratorMethod = iterable[iteratorSymbol];
	      if (iteratorMethod) {
	        return iteratorMethod.call(iterable);
	      }
	
	      if (typeof iterable.next === "function") {
	        return iterable;
	      }
	
	      if (!isNaN(iterable.length)) {
	        var i = -1, next = function next() {
	          while (++i < iterable.length) {
	            if (hasOwn.call(iterable, i)) {
	              next.value = iterable[i];
	              next.done = false;
	              return next;
	            }
	          }
	
	          next.value = undefined;
	          next.done = true;
	
	          return next;
	        };
	
	        return next.next = next;
	      }
	    }
	
	    // Return an iterator with no values.
	    return { next: doneResult };
	  }
	  runtime.values = values;
	
	  function doneResult() {
	    return { value: undefined, done: true };
	  }
	
	  Context.prototype = {
	    constructor: Context,
	
	    reset: function(skipTempReset) {
	      this.prev = 0;
	      this.next = 0;
	      // Resetting context._sent for legacy support of Babel's
	      // function.sent implementation.
	      this.sent = this._sent = undefined;
	      this.done = false;
	      this.delegate = null;
	
	      this.method = "next";
	      this.arg = undefined;
	
	      this.tryEntries.forEach(resetTryEntry);
	
	      if (!skipTempReset) {
	        for (var name in this) {
	          // Not sure about the optimal order of these conditions:
	          if (name.charAt(0) === "t" &&
	              hasOwn.call(this, name) &&
	              !isNaN(+name.slice(1))) {
	            this[name] = undefined;
	          }
	        }
	      }
	    },
	
	    stop: function() {
	      this.done = true;
	
	      var rootEntry = this.tryEntries[0];
	      var rootRecord = rootEntry.completion;
	      if (rootRecord.type === "throw") {
	        throw rootRecord.arg;
	      }
	
	      return this.rval;
	    },
	
	    dispatchException: function(exception) {
	      if (this.done) {
	        throw exception;
	      }
	
	      var context = this;
	      function handle(loc, caught) {
	        record.type = "throw";
	        record.arg = exception;
	        context.next = loc;
	
	        if (caught) {
	          // If the dispatched exception was caught by a catch block,
	          // then let that catch block handle the exception normally.
	          context.method = "next";
	          context.arg = undefined;
	        }
	
	        return !! caught;
	      }
	
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        var record = entry.completion;
	
	        if (entry.tryLoc === "root") {
	          // Exception thrown outside of any try block that could handle
	          // it, so set the completion value of the entire function to
	          // throw the exception.
	          return handle("end");
	        }
	
	        if (entry.tryLoc <= this.prev) {
	          var hasCatch = hasOwn.call(entry, "catchLoc");
	          var hasFinally = hasOwn.call(entry, "finallyLoc");
	
	          if (hasCatch && hasFinally) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            } else if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }
	
	          } else if (hasCatch) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            }
	
	          } else if (hasFinally) {
	            if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }
	
	          } else {
	            throw new Error("try statement without catch or finally");
	          }
	        }
	      }
	    },
	
	    abrupt: function(type, arg) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc <= this.prev &&
	            hasOwn.call(entry, "finallyLoc") &&
	            this.prev < entry.finallyLoc) {
	          var finallyEntry = entry;
	          break;
	        }
	      }
	
	      if (finallyEntry &&
	          (type === "break" ||
	           type === "continue") &&
	          finallyEntry.tryLoc <= arg &&
	          arg <= finallyEntry.finallyLoc) {
	        // Ignore the finally entry if control is not jumping to a
	        // location outside the try/catch block.
	        finallyEntry = null;
	      }
	
	      var record = finallyEntry ? finallyEntry.completion : {};
	      record.type = type;
	      record.arg = arg;
	
	      if (finallyEntry) {
	        this.method = "next";
	        this.next = finallyEntry.finallyLoc;
	        return ContinueSentinel;
	      }
	
	      return this.complete(record);
	    },
	
	    complete: function(record, afterLoc) {
	      if (record.type === "throw") {
	        throw record.arg;
	      }
	
	      if (record.type === "break" ||
	          record.type === "continue") {
	        this.next = record.arg;
	      } else if (record.type === "return") {
	        this.rval = this.arg = record.arg;
	        this.method = "return";
	        this.next = "end";
	      } else if (record.type === "normal" && afterLoc) {
	        this.next = afterLoc;
	      }
	
	      return ContinueSentinel;
	    },
	
	    finish: function(finallyLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.finallyLoc === finallyLoc) {
	          this.complete(entry.completion, entry.afterLoc);
	          resetTryEntry(entry);
	          return ContinueSentinel;
	        }
	      }
	    },
	
	    "catch": function(tryLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc === tryLoc) {
	          var record = entry.completion;
	          if (record.type === "throw") {
	            var thrown = record.arg;
	            resetTryEntry(entry);
	          }
	          return thrown;
	        }
	      }
	
	      // The context.catch method must only be called with a location
	      // argument that corresponds to a known catch block.
	      throw new Error("illegal catch attempt");
	    },
	
	    delegateYield: function(iterable, resultName, nextLoc) {
	      this.delegate = {
	        iterator: values(iterable),
	        resultName: resultName,
	        nextLoc: nextLoc
	      };
	
	      if (this.method === "next") {
	        // Deliberately forget the last sent value so that we don't
	        // accidentally pass it on to the delegate.
	        this.arg = undefined;
	      }
	
	      return ContinueSentinel;
	    }
	  };
	})(
	  // In sloppy mode, unbound `this` refers to the global object, fallback to
	  // Function constructor if we're in global strict mode. That is sadly a form
	  // of indirect eval which violates Content Security Policy.
	  (function() { return this })() || Function("return this")()
	);


/***/ }),

/***/ 1817:
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Copyright (c) 2011-2014 Felix Gnass
	 * Licensed under the MIT license
	 * http://spin.js.org/
	 *
	 * Example:
	    var opts = {
	      lines: 12             // The number of lines to draw
	    , length: 7             // The length of each line
	    , width: 5              // The line thickness
	    , radius: 10            // The radius of the inner circle
	    , scale: 1.0            // Scales overall size of the spinner
	    , corners: 1            // Roundness (0..1)
	    , color: '#000'         // #rgb or #rrggbb
	    , opacity: 1/4          // Opacity of the lines
	    , rotate: 0             // Rotation offset
	    , direction: 1          // 1: clockwise, -1: counterclockwise
	    , speed: 1              // Rounds per second
	    , trail: 100            // Afterglow percentage
	    , fps: 20               // Frames per second when using setTimeout()
	    , zIndex: 2e9           // Use a high z-index by default
	    , className: 'spinner'  // CSS class to assign to the element
	    , top: '50%'            // center vertically
	    , left: '50%'           // center horizontally
	    , shadow: false         // Whether to render a shadow
	    , hwaccel: false        // Whether to use hardware acceleration (might be buggy)
	    , position: 'absolute'  // Element positioning
	    }
	    var target = document.getElementById('foo')
	    var spinner = new Spinner(opts).spin(target)
	 */
	;(function (root, factory) {
	
	  /* CommonJS */
	  if (typeof module == 'object' && module.exports) module.exports = factory()
	
	  /* AMD module */
	  else if (true) !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
	
	  /* Browser global */
	  else root.Spinner = factory()
	}(this, function () {
	  "use strict"
	
	  var prefixes = ['webkit', 'Moz', 'ms', 'O'] /* Vendor prefixes */
	    , animations = {} /* Animation rules keyed by their name */
	    , useCssAnimations /* Whether to use CSS animations or setTimeout */
	    , sheet /* A stylesheet to hold the @keyframe or VML rules. */
	
	  /**
	   * Utility function to create elements. If no tag name is given,
	   * a DIV is created. Optionally properties can be passed.
	   */
	  function createEl (tag, prop) {
	    var el = document.createElement(tag || 'div')
	      , n
	
	    for (n in prop) el[n] = prop[n]
	    return el
	  }
	
	  /**
	   * Appends children and returns the parent.
	   */
	  function ins (parent /* child1, child2, ...*/) {
	    for (var i = 1, n = arguments.length; i < n; i++) {
	      parent.appendChild(arguments[i])
	    }
	
	    return parent
	  }
	
	  /**
	   * Creates an opacity keyframe animation rule and returns its name.
	   * Since most mobile Webkits have timing issues with animation-delay,
	   * we create separate rules for each line/segment.
	   */
	  function addAnimation (alpha, trail, i, lines) {
	    var name = ['opacity', trail, ~~(alpha * 100), i, lines].join('-')
	      , start = 0.01 + i/lines * 100
	      , z = Math.max(1 - (1-alpha) / trail * (100-start), alpha)
	      , prefix = useCssAnimations.substring(0, useCssAnimations.indexOf('Animation')).toLowerCase()
	      , pre = prefix && '-' + prefix + '-' || ''
	
	    if (!animations[name]) {
	      sheet.insertRule(
	        '@' + pre + 'keyframes ' + name + '{' +
	        '0%{opacity:' + z + '}' +
	        start + '%{opacity:' + alpha + '}' +
	        (start+0.01) + '%{opacity:1}' +
	        (start+trail) % 100 + '%{opacity:' + alpha + '}' +
	        '100%{opacity:' + z + '}' +
	        '}', sheet.cssRules.length)
	
	      animations[name] = 1
	    }
	
	    return name
	  }
	
	  /**
	   * Tries various vendor prefixes and returns the first supported property.
	   */
	  function vendor (el, prop) {
	    var s = el.style
	      , pp
	      , i
	
	    prop = prop.charAt(0).toUpperCase() + prop.slice(1)
	    if (s[prop] !== undefined) return prop
	    for (i = 0; i < prefixes.length; i++) {
	      pp = prefixes[i]+prop
	      if (s[pp] !== undefined) return pp
	    }
	  }
	
	  /**
	   * Sets multiple style properties at once.
	   */
	  function css (el, prop) {
	    for (var n in prop) {
	      el.style[vendor(el, n) || n] = prop[n]
	    }
	
	    return el
	  }
	
	  /**
	   * Fills in default values.
	   */
	  function merge (obj) {
	    for (var i = 1; i < arguments.length; i++) {
	      var def = arguments[i]
	      for (var n in def) {
	        if (obj[n] === undefined) obj[n] = def[n]
	      }
	    }
	    return obj
	  }
	
	  /**
	   * Returns the line color from the given string or array.
	   */
	  function getColor (color, idx) {
	    return typeof color == 'string' ? color : color[idx % color.length]
	  }
	
	  // Built-in defaults
	
	  var defaults = {
	    lines: 12             // The number of lines to draw
	  , length: 7             // The length of each line
	  , width: 5              // The line thickness
	  , radius: 10            // The radius of the inner circle
	  , scale: 1.0            // Scales overall size of the spinner
	  , corners: 1            // Roundness (0..1)
	  , color: '#000'         // #rgb or #rrggbb
	  , opacity: 1/4          // Opacity of the lines
	  , rotate: 0             // Rotation offset
	  , direction: 1          // 1: clockwise, -1: counterclockwise
	  , speed: 1              // Rounds per second
	  , trail: 100            // Afterglow percentage
	  , fps: 20               // Frames per second when using setTimeout()
	  , zIndex: 2e9           // Use a high z-index by default
	  , className: 'spinner'  // CSS class to assign to the element
	  , top: '50%'            // center vertically
	  , left: '50%'           // center horizontally
	  , shadow: false         // Whether to render a shadow
	  , hwaccel: false        // Whether to use hardware acceleration (might be buggy)
	  , position: 'absolute'  // Element positioning
	  }
	
	  /** The constructor */
	  function Spinner (o) {
	    this.opts = merge(o || {}, Spinner.defaults, defaults)
	  }
	
	  // Global defaults that override the built-ins:
	  Spinner.defaults = {}
	
	  merge(Spinner.prototype, {
	    /**
	     * Adds the spinner to the given target element. If this instance is already
	     * spinning, it is automatically removed from its previous target b calling
	     * stop() internally.
	     */
	    spin: function (target) {
	      this.stop()
	
	      var self = this
	        , o = self.opts
	        , el = self.el = createEl(null, {className: o.className})
	
	      css(el, {
	        position: o.position
	      , width: 0
	      , zIndex: o.zIndex
	      , left: o.left
	      , top: o.top
	      })
	
	      if (target) {
	        target.insertBefore(el, target.firstChild || null)
	      }
	
	      el.setAttribute('role', 'progressbar')
	      self.lines(el, self.opts)
	
	      if (!useCssAnimations) {
	        // No CSS animation support, use setTimeout() instead
	        var i = 0
	          , start = (o.lines - 1) * (1 - o.direction) / 2
	          , alpha
	          , fps = o.fps
	          , f = fps / o.speed
	          , ostep = (1 - o.opacity) / (f * o.trail / 100)
	          , astep = f / o.lines
	
	        ;(function anim () {
	          i++
	          for (var j = 0; j < o.lines; j++) {
	            alpha = Math.max(1 - (i + (o.lines - j) * astep) % f * ostep, o.opacity)
	
	            self.opacity(el, j * o.direction + start, alpha, o)
	          }
	          self.timeout = self.el && setTimeout(anim, ~~(1000 / fps))
	        })()
	      }
	      return self
	    }
	
	    /**
	     * Stops and removes the Spinner.
	     */
	  , stop: function () {
	      var el = this.el
	      if (el) {
	        clearTimeout(this.timeout)
	        if (el.parentNode) el.parentNode.removeChild(el)
	        this.el = undefined
	      }
	      return this
	    }
	
	    /**
	     * Internal method that draws the individual lines. Will be overwritten
	     * in VML fallback mode below.
	     */
	  , lines: function (el, o) {
	      var i = 0
	        , start = (o.lines - 1) * (1 - o.direction) / 2
	        , seg
	
	      function fill (color, shadow) {
	        return css(createEl(), {
	          position: 'absolute'
	        , width: o.scale * (o.length + o.width) + 'px'
	        , height: o.scale * o.width + 'px'
	        , background: color
	        , boxShadow: shadow
	        , transformOrigin: 'left'
	        , transform: 'rotate(' + ~~(360/o.lines*i + o.rotate) + 'deg) translate(' + o.scale*o.radius + 'px' + ',0)'
	        , borderRadius: (o.corners * o.scale * o.width >> 1) + 'px'
	        })
	      }
	
	      for (; i < o.lines; i++) {
	        seg = css(createEl(), {
	          position: 'absolute'
	        , top: 1 + ~(o.scale * o.width / 2) + 'px'
	        , transform: o.hwaccel ? 'translate3d(0,0,0)' : ''
	        , opacity: o.opacity
	        , animation: useCssAnimations && addAnimation(o.opacity, o.trail, start + i * o.direction, o.lines) + ' ' + 1 / o.speed + 's linear infinite'
	        })
	
	        if (o.shadow) ins(seg, css(fill('#000', '0 0 4px #000'), {top: '2px'}))
	        ins(el, ins(seg, fill(getColor(o.color, i), '0 0 1px rgba(0,0,0,.1)')))
	      }
	      return el
	    }
	
	    /**
	     * Internal method that adjusts the opacity of a single line.
	     * Will be overwritten in VML fallback mode below.
	     */
	  , opacity: function (el, i, val) {
	      if (i < el.childNodes.length) el.childNodes[i].style.opacity = val
	    }
	
	  })
	
	
	  function initVML () {
	
	    /* Utility function to create a VML tag */
	    function vml (tag, attr) {
	      return createEl('<' + tag + ' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">', attr)
	    }
	
	    // No CSS transforms but VML support, add a CSS rule for VML elements:
	    sheet.addRule('.spin-vml', 'behavior:url(#default#VML)')
	
	    Spinner.prototype.lines = function (el, o) {
	      var r = o.scale * (o.length + o.width)
	        , s = o.scale * 2 * r
	
	      function grp () {
	        return css(
	          vml('group', {
	            coordsize: s + ' ' + s
	          , coordorigin: -r + ' ' + -r
	          })
	        , { width: s, height: s }
	        )
	      }
	
	      var margin = -(o.width + o.length) * o.scale * 2 + 'px'
	        , g = css(grp(), {position: 'absolute', top: margin, left: margin})
	        , i
	
	      function seg (i, dx, filter) {
	        ins(
	          g
	        , ins(
	            css(grp(), {rotation: 360 / o.lines * i + 'deg', left: ~~dx})
	          , ins(
	              css(
	                vml('roundrect', {arcsize: o.corners})
	              , { width: r
	                , height: o.scale * o.width
	                , left: o.scale * o.radius
	                , top: -o.scale * o.width >> 1
	                , filter: filter
	                }
	              )
	            , vml('fill', {color: getColor(o.color, i), opacity: o.opacity})
	            , vml('stroke', {opacity: 0}) // transparent stroke to fix color bleeding upon opacity change
	            )
	          )
	        )
	      }
	
	      if (o.shadow)
	        for (i = 1; i <= o.lines; i++) {
	          seg(i, -2, 'progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)')
	        }
	
	      for (i = 1; i <= o.lines; i++) seg(i)
	      return ins(el, g)
	    }
	
	    Spinner.prototype.opacity = function (el, i, val, o) {
	      var c = el.firstChild
	      o = o.shadow && o.lines || 0
	      if (c && i + o < c.childNodes.length) {
	        c = c.childNodes[i + o]; c = c && c.firstChild; c = c && c.firstChild
	        if (c) c.opacity = val
	      }
	    }
	  }
	
	  if (typeof document !== 'undefined') {
	    sheet = (function () {
	      var el = createEl('style', {type : 'text/css'})
	      ins(document.getElementsByTagName('head')[0], el)
	      return el.sheet || el.styleSheet
	    }())
	
	    var probe = css(createEl('group'), {behavior: 'url(#default#VML)'})
	
	    if (!vendor(probe, 'transform') && probe.adj) initVML()
	    else useCssAnimations = vendor(probe, 'animation')
	  }
	
	  return Spinner
	
	}));


/***/ }),

/***/ 928:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	exports.default = Bio;
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _gatsbyLink = __webpack_require__(10);
	
	var _gatsbyLink2 = _interopRequireDefault(_gatsbyLink);
	
	__webpack_require__(1707);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function Bio(_ref) {
	  var _ref$img = _ref.img,
	      img = _ref$img === undefined ? "" : _ref$img,
	      _ref$href = _ref.href,
	      href = _ref$href === undefined ? "" : _ref$href,
	      _ref$name = _ref.name,
	      name = _ref$name === undefined ? "" : _ref$name,
	      _ref$desc = _ref.desc,
	      desc = _ref$desc === undefined ? "" : _ref$desc;
	
	  return _react2.default.createElement(
	    "div",
	    { className: "bio" },
	    _react2.default.createElement(
	      _gatsbyLink2.default,
	      { to: href, className: "bio-wrapper" },
	      _react2.default.createElement(
	        "div",
	        { className: "bio-img" },
	        _react2.default.createElement("img", { src: "/images/my-image.jpg", alt: name })
	      ),
	      _react2.default.createElement(
	        "div",
	        { className: "bio-content" },
	        _react2.default.createElement(
	          "div",
	          { className: "bio-name" },
	          "luckyluu"
	        ),
	        _react2.default.createElement(
	          "div",
	          { className: "bio-desc" },
	          desc
	        )
	      )
	    ),
	    _react2.default.createElement(
	      "a",
	      { className: "btn btn-primary mt-10", style: { color: '#fff', fontWeight: 'bold' }, href: "/donate" },
	      "H\u1ED7 tr\u1EE3 b\u1EB1ng Zalo Pay"
	    )
	  );
	}
	module.exports = exports["default"];

/***/ }),

/***/ 1707:
/***/ (function(module, exports) {

	// empty (null-loader)

/***/ }),

/***/ 929:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _Bio = __webpack_require__(928);
	
	var _Bio2 = _interopRequireDefault(_Bio);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = _Bio2.default;
	module.exports = exports['default'];

/***/ }),

/***/ 930:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _disqusReact = __webpack_require__(1033);
	
	var _disqusReact2 = _interopRequireDefault(_disqusReact);
	
	var _SiteConfig = __webpack_require__(23);
	
	var _SiteConfig2 = _interopRequireDefault(_SiteConfig);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Disqus = function (_Component) {
	  _inherits(Disqus, _Component);
	
	  function Disqus(props) {
	    _classCallCheck(this, Disqus);
	
	    var _this = _possibleConstructorReturn(this, _Component.call(this, props));
	
	    _this.doNothing = function () {};
	
	    _this.state = {
	      toasts: []
	    };
	    _this.notifyAboutComment = _this.notifyAboutComment.bind(_this);
	    _this.onSnackbarDismiss = _this.onSnackbarDismiss.bind(_this);
	    return _this;
	  }
	
	  Disqus.prototype.onSnackbarDismiss = function onSnackbarDismiss() {
	    var _state$toasts = this.state.toasts,
	        toasts = _state$toasts.slice(1);
	
	    this.setState({ toasts: toasts });
	  };
	
	  Disqus.prototype.notifyAboutComment = function notifyAboutComment() {
	    var toasts = this.state.toasts.slice();
	    toasts.push({ text: "New comment available!" });
	    this.setState({ toasts: toasts });
	  };
	
	  Disqus.prototype.render = function render() {
	    var postNode = this.props.postNode;
	
	    var post = postNode.frontmatter;
	    var url = _SiteConfig2.default.siteUrl + _SiteConfig2.default.pathPrefix + postNode.fields.slug;
	    var disqusConfig = {
	      url: url,
	      identifier: post.id,
	      title: post.title
	    };
	    return _react2.default.createElement(_disqusReact2.default.DiscussionEmbed, { shortname: _SiteConfig2.default.disqusShortname, config: disqusConfig });
	  };
	
	  return Disqus;
	}(_react.Component);
	
	exports.default = Disqus;
	module.exports = exports["default"];

/***/ }),

/***/ 931:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	exports.default = Link;
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _gatsbyLink = __webpack_require__(10);
	
	var _gatsbyLink2 = _interopRequireDefault(_gatsbyLink);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function Link(_ref) {
	  var children = _ref.children,
	      className = _ref.className,
	      to = _ref.to;
	
	  return _react2.default.createElement(
	    _gatsbyLink2.default,
	    { className: ["link"].concat(className || []).join(" "), to: to },
	    children
	  );
	}
	module.exports = exports["default"];

/***/ }),

/***/ 932:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	exports.default = PostTags;
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _gatsbyLink = __webpack_require__(10);
	
	var _gatsbyLink2 = _interopRequireDefault(_gatsbyLink);
	
	__webpack_require__(1708);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function PostTags(_ref) {
	  var _ref$list = _ref.list,
	      list = _ref$list === undefined ? [] : _ref$list;
	
	  return _react2.default.createElement(
	    "ul",
	    { className: "tag-list" },
	    _react2.default.Children.toArray(list.map(function (tag) {
	      return _react2.default.createElement(
	        "li",
	        { key: tag },
	        _react2.default.createElement(
	          _gatsbyLink2.default,
	          { to: "/tags/" + tag },
	          tag.name ? tag.name : tag
	        )
	      );
	    }))
	  );
	}
	module.exports = exports["default"];

/***/ }),

/***/ 1708:
/***/ (function(module, exports) {

	// empty (null-loader)

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

/***/ 933:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactHelmet = __webpack_require__(37);
	
	var _reactHelmet2 = _interopRequireDefault(_reactHelmet);
	
	var _SiteConfig = __webpack_require__(23);
	
	var _SiteConfig2 = _interopRequireDefault(_SiteConfig);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var SEO = function (_Component) {
	  _inherits(SEO, _Component);
	
	  function SEO() {
	    _classCallCheck(this, SEO);
	
	    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	  }
	
	  SEO.prototype.render = function render() {
	    var _props = this.props,
	        postNode = _props.postNode,
	        postPath = _props.postPath,
	        postSEO = _props.postSEO;
	
	    var title = void 0;
	    var description = void 0;
	    var image = void 0;
	    var postURL = void 0;
	    if (postSEO) {
	      var postMeta = postNode.frontmatter;
	      title = postMeta.title;
	      description = postMeta.description ? postMeta.description : postNode.excerpt;
	      image = postMeta.cover;
	      postURL = _SiteConfig2.default.siteUrl + _SiteConfig2.default.pathPrefix + postPath;
	    } else {
	      title = _SiteConfig2.default.siteTitle;
	      description = _SiteConfig2.default.siteDescription;
	      image = _SiteConfig2.default.siteLogo;
	    }
	    var realPrefix = _SiteConfig2.default.pathPrefix === "/" ? "" : _SiteConfig2.default.pathPrefix;
	    image = _SiteConfig2.default.siteUrl + realPrefix + image;
	    var blogURL = _SiteConfig2.default.siteUrl + _SiteConfig2.default.pathPrefix;
	    var schemaOrgJSONLD = [{
	      "@context": "http://schema.org",
	      "@type": "WebSite",
	      url: blogURL,
	      name: title,
	      alternateName: _SiteConfig2.default.siteTitleAlt ? _SiteConfig2.default.siteTitleAlt : ""
	    }];
	    if (postSEO) {
	      schemaOrgJSONLD.push([{
	        "@context": "http://schema.org",
	        "@type": "BreadcrumbList",
	        itemListElement: [{
	          "@type": "ListItem",
	          position: 1,
	          item: {
	            "@id": postURL,
	            name: title,
	            image: image
	          }
	        }]
	      }, {
	        "@context": "http://schema.org",
	        "@type": "BlogPosting",
	        url: blogURL,
	        name: title,
	        alternateName: _SiteConfig2.default.siteTitleAlt ? _SiteConfig2.default.siteTitleAlt : "",
	        headline: title,
	        image: {
	          "@type": "ImageObject",
	          url: image
	        },
	        description: description
	      }]);
	    }
	    return _react2.default.createElement(
	      _reactHelmet2.default,
	      null,
	      _react2.default.createElement("meta", { name: "description", content: description }),
	      _react2.default.createElement("meta", { name: "image", content: image }),
	      _react2.default.createElement(
	        "script",
	        { type: "application/ld+json" },
	        JSON.stringify(schemaOrgJSONLD)
	      ),
	      _react2.default.createElement("meta", { property: "og:url", content: postSEO ? postURL : blogURL }),
	      postSEO ? _react2.default.createElement("meta", { property: "og:type", content: "article" }) : null,
	      _react2.default.createElement("meta", { property: "og:title", content: title }),
	      _react2.default.createElement("meta", { property: "og:description", content: description }),
	      _react2.default.createElement("meta", { property: "og:image", content: image }),
	      _react2.default.createElement("meta", {
	        property: "fb:app_id",
	        content: _SiteConfig2.default.siteFBAppID ? _SiteConfig2.default.siteFBAppID : ""
	      }),
	      _react2.default.createElement("meta", { name: "twitter:card", content: "summary_large_image" }),
	      _react2.default.createElement("meta", {
	        name: "twitter:creator",
	        content: _SiteConfig2.default.userTwitter ? _SiteConfig2.default.userTwitter : ""
	      }),
	      _react2.default.createElement("meta", { name: "twitter:title", content: title }),
	      _react2.default.createElement("meta", { name: "twitter:description", content: description }),
	      _react2.default.createElement("meta", { name: "twitter:image", content: image })
	    );
	  };
	
	  return SEO;
	}(_react.Component);
	
	exports.default = SEO;
	module.exports = exports["default"];

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
	  name: 'Đàm đạo chém gió nghề nghiệp'
	}, {
	  key: 'css',
	  name: 'CSS từ căn bản tới nâng cao'
	}, {
	  key: 'thu-thuat',
	  name: 'Thủ thuật'
	}, {
	  key: 'hoc-thuat',
	  name: 'Kiến thức phổ thông'
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

/***/ 1042:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 934:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactShare = __webpack_require__(1804);
	
	var _SiteConfig = __webpack_require__(23);
	
	var _SiteConfig2 = _interopRequireDefault(_SiteConfig);
	
	__webpack_require__(1042);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var SocialLinks = function (_Component) {
	  _inherits(SocialLinks, _Component);
	
	  function SocialLinks() {
	    _classCallCheck(this, SocialLinks);
	
	    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	  }
	
	  SocialLinks.prototype.render = function render() {
	    var _props = this.props,
	        postNode = _props.postNode,
	        postPath = _props.postPath,
	        mobile = _props.mobile;
	
	    var post = postNode.frontmatter;
	    var url = _SiteConfig2.default.siteUrl + _SiteConfig2.default.pathPrefix + postPath;
	
	    var iconSize = mobile ? 36 : 48;
	    var filter = function filter(count) {
	      return count > 0 ? count : "";
	    };
	    return _react2.default.createElement(
	      "div",
	      { className: "social-links" },
	      _react2.default.createElement(
	        _reactShare.TwitterShareButton,
	        { url: url, title: post.title },
	        _react2.default.createElement(_reactShare.TwitterIcon, { round: true, size: iconSize })
	      ),
	      _react2.default.createElement(
	        _reactShare.GooglePlusShareButton,
	        { url: url },
	        _react2.default.createElement(_reactShare.GooglePlusIcon, { round: true, size: iconSize }),
	        _react2.default.createElement(
	          _reactShare.GooglePlusShareCount,
	          { url: url },
	          function (count) {
	            return _react2.default.createElement(
	              "div",
	              { className: "share-count" },
	              filter(count)
	            );
	          }
	        )
	      ),
	      _react2.default.createElement(
	        _reactShare.FacebookShareButton,
	        { url: url, quote: post.title },
	        _react2.default.createElement(_reactShare.FacebookIcon, { round: true, size: iconSize }),
	        _react2.default.createElement(
	          _reactShare.FacebookShareCount,
	          { url: url },
	          function (count) {
	            return _react2.default.createElement(
	              "div",
	              { className: "share-count" },
	              filter(count)
	            );
	          }
	        )
	      )
	    );
	  };
	
	  return SocialLinks;
	}(_react.Component);
	
	exports.default = SocialLinks;
	module.exports = exports["default"];

/***/ }),

/***/ 940:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	exports.pageQuery = undefined;
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactHelmet = __webpack_require__(37);
	
	var _reactHelmet2 = _interopRequireDefault(_reactHelmet);
	
	var _Search = __webpack_require__(47);
	
	var _Search2 = _interopRequireDefault(_Search);
	
	var _reactFacebook = __webpack_require__(1741);
	
	var _Bio = __webpack_require__(929);
	
	var _Bio2 = _interopRequireDefault(_Bio);
	
	var _Link = __webpack_require__(931);
	
	var _Link2 = _interopRequireDefault(_Link);
	
	var _Disqus = __webpack_require__(930);
	
	var _Disqus2 = _interopRequireDefault(_Disqus);
	
	var _PostTags = __webpack_require__(932);
	
	var _PostTags2 = _interopRequireDefault(_PostTags);
	
	var _SocialLinks = __webpack_require__(934);
	
	var _SocialLinks2 = _interopRequireDefault(_SocialLinks);
	
	var _SEO = __webpack_require__(933);
	
	var _SEO2 = _interopRequireDefault(_SEO);
	
	var _SiteConfig = __webpack_require__(23);
	
	var _SiteConfig2 = _interopRequireDefault(_SiteConfig);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var PostTemplate = function (_React$Component) {
	  _inherits(PostTemplate, _React$Component);
	
	  function PostTemplate() {
	    _classCallCheck(this, PostTemplate);
	
	    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
	  }
	
	  PostTemplate.prototype.render = function render() {
	    var _props$pathContext = this.props.pathContext,
	        slug = _props$pathContext.slug,
	        next = _props$pathContext.next,
	        prev = _props$pathContext.prev;
	
	    var postNode = this.props.data.markdownRemark;
	    var post = postNode.frontmatter;
	    if (!post.id) {
	      post.id = slug;
	    }
	    if (!post.id) {
	      post.category_id = _SiteConfig2.default.postDefaultCategoryID;
	    }
	    return _react2.default.createElement(
	      "div",
	      { className: "master" },
	      _react2.default.createElement(
	        _reactHelmet2.default,
	        null,
	        _react2.default.createElement(
	          "title",
	          null,
	          post.title + " | " + _SiteConfig2.default.siteTitle + " | " + _SiteConfig2.default.siteDescription
	        ),
	        _react2.default.createElement("meta", {
	          name: "description",
	          content: post.desc + " || " + post.title + " || " + _SiteConfig2.default.siteDescription
	        }),
	        _react2.default.createElement("meta", {
	          name: "keywords",
	          content: "frontend,developer,javascript,wordpress,react,hochiminh,web-developer"
	        })
	      ),
	      _react2.default.createElement(
	        "div",
	        { className: "inner" },
	        _react2.default.createElement(_SEO2.default, { postPath: slug, postNode: postNode, postSEO: true }),
	        _react2.default.createElement(
	          "div",
	          { className: "single-post" },
	          _react2.default.createElement(
	            "div",
	            { className: "single-post-container" },
	            _react2.default.createElement(
	              "article",
	              null,
	              _react2.default.createElement(
	                "header",
	                null,
	                _react2.default.createElement(
	                  "h1",
	                  { className: "single-post-title" },
	                  post.title
	                )
	              ),
	              _react2.default.createElement(
	                "div",
	                { className: "post-excert" },
	                post.desc
	              ),
	              post.cover && _react2.default.createElement(
	                "figure",
	                {
	                  className: "the-post-thumbnail",
	                  "aria-label": "media",
	                  role: "group",
	                  itemProp: "associatedMedia",
	                  itemID: post.cover,
	                  itemType: "http://schema.org/ImageObject"
	                },
	                _react2.default.createElement("img", {
	                  src: post.cover,
	                  alt: post.title,
	                  itemProp: "thumbnailUrl"
	                })
	              ),
	              _react2.default.createElement(
	                "div",
	                { className: "blog-post" },
	                _react2.default.createElement("div", {
	                  className: "post-content",
	                  dangerouslySetInnerHTML: { __html: postNode.html }
	                })
	              )
	            ),
	            _react2.default.createElement(_PostTags2.default, { list: post.tags || [] }),
	            _react2.default.createElement(_Bio2.default, {
	              name: _SiteConfig2.default.siteTitle,
	              desc: _SiteConfig2.default.siteTitleAlt,
	              href: "about"
	            }),
	            _react2.default.createElement(
	              "div",
	              { className: "post-meta" },
	              _react2.default.createElement(_SocialLinks2.default, { postPath: slug, postNode: postNode })
	            )
	          ),
	          _react2.default.createElement(
	            "div",
	            { id: "post-comments", className: "fb-comments" },
	            _react2.default.createElement(
	              _reactFacebook.FacebookProvider,
	              { appId: _SiteConfig2.default.siteFBAppID },
	              _react2.default.createElement(_reactFacebook.Comments, { href: _SiteConfig2.default.siteUrl + "/" + slug, width: "100%" })
	            )
	          ),
	          _react2.default.createElement(_Disqus2.default, { postNode: postNode }),
	          _react2.default.createElement(
	            "div",
	            { className: "section section-below-post" },
	            _react2.default.createElement(
	              "div",
	              { className: "inner" },
	              _react2.default.createElement("div", { id: "disqus_thread" }),
	              _react2.default.createElement(
	                "div",
	                { className: "read-next" },
	                next && _react2.default.createElement(
	                  _Link2.default,
	                  { className: "read-next-story", to: next.fields.slug },
	                  _react2.default.createElement(
	                    "section",
	                    { className: "post" },
	                    _react2.default.createElement(
	                      "span",
	                      { className: "read-this-next" },
	                      "\u0110\u1ECDc Ti\u1EBFp"
	                    ),
	                    _react2.default.createElement(
	                      "h2",
	                      null,
	                      next.frontmatter.title
	                    )
	                  )
	                ),
	                prev && _react2.default.createElement(
	                  _Link2.default,
	                  {
	                    className: "read-next-story prev",
	                    to: prev.fields.slug
	                  },
	                  _react2.default.createElement(
	                    "section",
	                    { className: "post" },
	                    _react2.default.createElement(
	                      "span",
	                      { className: "you-might-enjoy" },
	                      "\u0110\u1ECDc Ti\u1EBFp"
	                    ),
	                    _react2.default.createElement(
	                      "h2",
	                      null,
	                      prev.frontmatter.title
	                    )
	                  )
	                )
	              )
	            )
	          )
	        )
	      ),
	      _react2.default.createElement(
	        "div",
	        { className: "aside" },
	        _react2.default.createElement(_Search2.default, null),
	        _react2.default.createElement(
	          "div",
	          { className: "beautiful-post-name", "data-text-shadow": post.title },
	          post.title
	        )
	      )
	    );
	  };
	
	  return PostTemplate;
	}(_react2.default.Component);
	
	/* eslint no-undef: "off" */
	
	
	exports.default = PostTemplate;
	var pageQuery = exports.pageQuery = "** extracted graphql fragment **";

/***/ })

});
//# sourceMappingURL=component---src-templates-post-jsx-e88727433e148b2b9e12.js.map
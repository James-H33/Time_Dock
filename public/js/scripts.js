/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(1);
	__webpack_require__(5);
	
	"use strict";
	
	document.addEventListener('DOMContentLoaded', function () {
	
	    var FindUsers = {
	        init: function init() {
	            this.cacheDOM();
	            this.bindEvents();
	        },
	        cacheDOM: function cacheDOM() {
	            this.$findUsersBtn = document.querySelector('#find-users-btn');
	            this.$usersFormDisplay = document.querySelector('.users-form-display');
	            this.$usersFormInput = document.querySelector('.users-form-wrapper input');
	            this.$renderUsers = document.querySelector('.render-users');
	        },
	        bindEvents: function bindEvents() {
	            this.$findUsersBtn.addEventListener('click', this.getRequests.bind(this));
	        },
	        render: function render(data) {
	            console.log('Render Method Called');
	            var template = '<h1 class="user">' + data.username + '</h1>\n                            <h1 class="user-email"> ' + data.email + '</h1> ';
	            this.$renderUsers.innerHTML = template;
	        },
	        getRequests: function getRequests(event) {
	            event.stopPropagation();
	            event.preventDefault();
	
	            var iVal = this.$usersFormInput.value;
	            if (iVal.trim().length === 0) {
	                return alert('Please enter a username');
	            }
	            getRequestData(iVal.trim());
	            iVal = '';
	        }
	    };
	
	    FindUsers.init();
	
	    var AddUsers = {
	        init: function init() {
	            this.cacheDOM();
	            this.bindEvents();
	        },
	        cacheDOM: function cacheDOM() {
	            this.$addUserDisplay = document.querySelector('.add-user-display');
	            this.$addUserInputs = document.querySelectorAll('.add-user-display input');
	            this.$addUserBtn = document.querySelector('#add-user-btn');
	            this.$renderUser = document.querySelector('.render-add-user');
	        },
	        bindEvents: function bindEvents() {
	            this.$addUserBtn.addEventListener('click', this.postRequest.bind(this));
	        },
	        render: function render(message) {
	            var template = '<h1>' + message + '</h1>';
	            this.$renderUser.innerHTML = template;
	        },
	        postRequest: function postRequest(event) {
	            event.stopPropagation();
	            event.preventDefault();
	
	            var newUser = new Object();
	            var iVal = this.$addUserInputs;
	            for (var i = 0; i < iVal.length; i++) {
	                if (iVal[i].name === 'username') {
	                    newUser.username = iVal[i].value.trim();
	                    iVal[i].value = '';
	                }
	                if (iVal[i].name === 'email') {
	                    newUser.email = iVal[i].value.trim();
	                    iVal[i].value = '';
	                }
	                if (iVal[i].name === 'password') {
	                    newUser.password = iVal[i].value.trim();
	                    iVal[i].value = '';
	                }
	            }
	
	            postRequestData(newUser);
	        }
	    };
	
	    AddUsers.init();
	
	    /***************************************************************************
	                                Helper Functions
	    ***************************************************************************/
	
	    function getRequestData(username) {
	        var http = new XMLHttpRequest();
	        var method = 'GET';
	        var url = '/userdata/search?username=' + username;
	
	        http.open(method, url);
	        http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	        http.send();
	        http.onreadystatechange = function () {
	            if (http.readyState === XMLHttpRequest.DONE && http.status === 200) {
	                var data = JSON.parse(http.responseText);
	                if (data.error) {
	                    console.log(data.error);
	                    return alert(data.error);
	                }
	                FindUsers.render(data);
	                return console.log('Success');
	            } else if (http.readyState === XMLHttpRequest.DONE) {
	                return alert('Something went wrong!');
	            }
	        };
	    }
	
	    function postRequestData(newUser) {
	        var http = new XMLHttpRequest();
	        var method = 'POST';
	        var url = '/userdata';
	
	        http.open(method, url);
	        http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	        http.send(JSON.stringify(newUser));
	        http.onreadystatechange = function () {
	            if (http.readyState === XMLHttpRequest.DONE && http.status === 200) {
	                var data = JSON.parse(http.responseText);
	                if (data.error) {
	                    console.log('Not successful');
	                    return AddUsers.render(data.error);
	                } else {
	                    console.log('Success');
	                    AddUsers.render('User Saved!');
	                }
	            } else if (http.readyState === XMLHttpRequest.DONE) {
	                return alert('Amigo, you have made mistake somewhere');
	            }
	        };
	    }
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/sass-loader/index.js!./main.sass", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/sass-loader/index.js!./main.sass");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports
	
	
	// module
	exports.push([module.id, "* {\n  margin: 0;\n  padding: 0; }\n\nbody {\n  font-family: 'PT Sans', sans-serif;\n  font-weight: normal; }\n\n.header-wrapper {\n  width: 100%;\n  height: 100%; }\n\n.header-display {\n  width: 100%;\n  height: 100%; }\n\n.header-brand {\n  width: auto;\n  height: 100%; }\n\n.header-links {\n  width: auto;\n  height: 100%; }\n  .header-links li {\n    display: inline-block; }\n  .header-links a {\n    text-decoration: none; }\n\n.users-form-wrapper {\n  width: 100%;\n  height: auto; }\n\n.users-form-display {\n  width: 100%;\n  height: auto;\n  padding: 60px 0; }\n\n.form-container {\n  width: 95%;\n  height: auto;\n  max-width: 400px;\n  margin: 0 auto;\n  text-align: center; }\n\n.form-control {\n  width: 95%;\n  height: auto;\n  margin: 5px auto;\n  text-align: center; }\n  .form-control input {\n    width: 95%;\n    height: 35px;\n    margin: 0 auto;\n    display: block;\n    border: 1px solid gray;\n    border-radius: 4px;\n    padding-left: 5px; }\n  .form-control button {\n    width: 97%;\n    height: 35px;\n    color: #fff;\n    background: #0288D1;\n    border-radius: 4px;\n    border: none;\n    outline: none; }\n\nh1 {\n  font-size: 30px; }\n", ""]);
	
	// exports


/***/ },
/* 3 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	/*! jQuery v3.1.0 | (c) jQuery Foundation | jquery.org/license */
	!function (a, b) {
	  "use strict";
	  "object" == ( false ? "undefined" : _typeof(module)) && "object" == _typeof(module.exports) ? module.exports = a.document ? b(a, !0) : function (a) {
	    if (!a.document) throw new Error("jQuery requires a window with a document");return b(a);
	  } : b(a);
	}("undefined" != typeof window ? window : undefined, function (a, b) {
	  "use strict";
	  var c = [],
	      d = a.document,
	      e = Object.getPrototypeOf,
	      f = c.slice,
	      g = c.concat,
	      h = c.push,
	      i = c.indexOf,
	      j = {},
	      k = j.toString,
	      l = j.hasOwnProperty,
	      m = l.toString,
	      n = m.call(Object),
	      o = {};function p(a, b) {
	    b = b || d;var c = b.createElement("script");c.text = a, b.head.appendChild(c).parentNode.removeChild(c);
	  }var q = "3.1.0",
	      r = function r(a, b) {
	    return new r.fn.init(a, b);
	  },
	      s = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
	      t = /^-ms-/,
	      u = /-([a-z])/g,
	      v = function v(a, b) {
	    return b.toUpperCase();
	  };r.fn = r.prototype = { jquery: q, constructor: r, length: 0, toArray: function toArray() {
	      return f.call(this);
	    }, get: function get(a) {
	      return null != a ? a < 0 ? this[a + this.length] : this[a] : f.call(this);
	    }, pushStack: function pushStack(a) {
	      var b = r.merge(this.constructor(), a);return b.prevObject = this, b;
	    }, each: function each(a) {
	      return r.each(this, a);
	    }, map: function map(a) {
	      return this.pushStack(r.map(this, function (b, c) {
	        return a.call(b, c, b);
	      }));
	    }, slice: function slice() {
	      return this.pushStack(f.apply(this, arguments));
	    }, first: function first() {
	      return this.eq(0);
	    }, last: function last() {
	      return this.eq(-1);
	    }, eq: function eq(a) {
	      var b = this.length,
	          c = +a + (a < 0 ? b : 0);return this.pushStack(c >= 0 && c < b ? [this[c]] : []);
	    }, end: function end() {
	      return this.prevObject || this.constructor();
	    }, push: h, sort: c.sort, splice: c.splice }, r.extend = r.fn.extend = function () {
	    var a,
	        b,
	        c,
	        d,
	        e,
	        f,
	        g = arguments[0] || {},
	        h = 1,
	        i = arguments.length,
	        j = !1;for ("boolean" == typeof g && (j = g, g = arguments[h] || {}, h++), "object" == (typeof g === "undefined" ? "undefined" : _typeof(g)) || r.isFunction(g) || (g = {}), h === i && (g = this, h--); h < i; h++) {
	      if (null != (a = arguments[h])) for (b in a) {
	        c = g[b], d = a[b], g !== d && (j && d && (r.isPlainObject(d) || (e = r.isArray(d))) ? (e ? (e = !1, f = c && r.isArray(c) ? c : []) : f = c && r.isPlainObject(c) ? c : {}, g[b] = r.extend(j, f, d)) : void 0 !== d && (g[b] = d));
	      }
	    }return g;
	  }, r.extend({ expando: "jQuery" + (q + Math.random()).replace(/\D/g, ""), isReady: !0, error: function error(a) {
	      throw new Error(a);
	    }, noop: function noop() {}, isFunction: function isFunction(a) {
	      return "function" === r.type(a);
	    }, isArray: Array.isArray, isWindow: function isWindow(a) {
	      return null != a && a === a.window;
	    }, isNumeric: function isNumeric(a) {
	      var b = r.type(a);return ("number" === b || "string" === b) && !isNaN(a - parseFloat(a));
	    }, isPlainObject: function isPlainObject(a) {
	      var b, c;return !(!a || "[object Object]" !== k.call(a)) && (!(b = e(a)) || (c = l.call(b, "constructor") && b.constructor, "function" == typeof c && m.call(c) === n));
	    }, isEmptyObject: function isEmptyObject(a) {
	      var b;for (b in a) {
	        return !1;
	      }return !0;
	    }, type: function type(a) {
	      return null == a ? a + "" : "object" == (typeof a === "undefined" ? "undefined" : _typeof(a)) || "function" == typeof a ? j[k.call(a)] || "object" : typeof a === "undefined" ? "undefined" : _typeof(a);
	    }, globalEval: function globalEval(a) {
	      p(a);
	    }, camelCase: function camelCase(a) {
	      return a.replace(t, "ms-").replace(u, v);
	    }, nodeName: function nodeName(a, b) {
	      return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase();
	    }, each: function each(a, b) {
	      var c,
	          d = 0;if (w(a)) {
	        for (c = a.length; d < c; d++) {
	          if (b.call(a[d], d, a[d]) === !1) break;
	        }
	      } else for (d in a) {
	        if (b.call(a[d], d, a[d]) === !1) break;
	      }return a;
	    }, trim: function trim(a) {
	      return null == a ? "" : (a + "").replace(s, "");
	    }, makeArray: function makeArray(a, b) {
	      var c = b || [];return null != a && (w(Object(a)) ? r.merge(c, "string" == typeof a ? [a] : a) : h.call(c, a)), c;
	    }, inArray: function inArray(a, b, c) {
	      return null == b ? -1 : i.call(b, a, c);
	    }, merge: function merge(a, b) {
	      for (var c = +b.length, d = 0, e = a.length; d < c; d++) {
	        a[e++] = b[d];
	      }return a.length = e, a;
	    }, grep: function grep(a, b, c) {
	      for (var d, e = [], f = 0, g = a.length, h = !c; f < g; f++) {
	        d = !b(a[f], f), d !== h && e.push(a[f]);
	      }return e;
	    }, map: function map(a, b, c) {
	      var d,
	          e,
	          f = 0,
	          h = [];if (w(a)) for (d = a.length; f < d; f++) {
	        e = b(a[f], f, c), null != e && h.push(e);
	      } else for (f in a) {
	        e = b(a[f], f, c), null != e && h.push(e);
	      }return g.apply([], h);
	    }, guid: 1, proxy: function proxy(a, b) {
	      var c, d, e;if ("string" == typeof b && (c = a[b], b = a, a = c), r.isFunction(a)) return d = f.call(arguments, 2), e = function e() {
	        return a.apply(b || this, d.concat(f.call(arguments)));
	      }, e.guid = a.guid = a.guid || r.guid++, e;
	    }, now: Date.now, support: o }), "function" == typeof Symbol && (r.fn[Symbol.iterator] = c[Symbol.iterator]), r.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (a, b) {
	    j["[object " + b + "]"] = b.toLowerCase();
	  });function w(a) {
	    var b = !!a && "length" in a && a.length,
	        c = r.type(a);return "function" !== c && !r.isWindow(a) && ("array" === c || 0 === b || "number" == typeof b && b > 0 && b - 1 in a);
	  }var x = function (a) {
	    var b,
	        c,
	        d,
	        e,
	        f,
	        g,
	        h,
	        i,
	        j,
	        k,
	        l,
	        m,
	        n,
	        o,
	        p,
	        q,
	        r,
	        s,
	        t,
	        u = "sizzle" + 1 * new Date(),
	        v = a.document,
	        w = 0,
	        x = 0,
	        y = ha(),
	        z = ha(),
	        A = ha(),
	        B = function B(a, b) {
	      return a === b && (l = !0), 0;
	    },
	        C = {}.hasOwnProperty,
	        D = [],
	        E = D.pop,
	        F = D.push,
	        G = D.push,
	        H = D.slice,
	        I = function I(a, b) {
	      for (var c = 0, d = a.length; c < d; c++) {
	        if (a[c] === b) return c;
	      }return -1;
	    },
	        J = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
	        K = "[\\x20\\t\\r\\n\\f]",
	        L = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
	        M = "\\[" + K + "*(" + L + ")(?:" + K + "*([*^$|!~]?=)" + K + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + L + "))|)" + K + "*\\]",
	        N = ":(" + L + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + M + ")*)|.*)\\)|)",
	        O = new RegExp(K + "+", "g"),
	        P = new RegExp("^" + K + "+|((?:^|[^\\\\])(?:\\\\.)*)" + K + "+$", "g"),
	        Q = new RegExp("^" + K + "*," + K + "*"),
	        R = new RegExp("^" + K + "*([>+~]|" + K + ")" + K + "*"),
	        S = new RegExp("=" + K + "*([^\\]'\"]*?)" + K + "*\\]", "g"),
	        T = new RegExp(N),
	        U = new RegExp("^" + L + "$"),
	        V = { ID: new RegExp("^#(" + L + ")"), CLASS: new RegExp("^\\.(" + L + ")"), TAG: new RegExp("^(" + L + "|[*])"), ATTR: new RegExp("^" + M), PSEUDO: new RegExp("^" + N), CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + K + "*(even|odd|(([+-]|)(\\d*)n|)" + K + "*(?:([+-]|)" + K + "*(\\d+)|))" + K + "*\\)|)", "i"), bool: new RegExp("^(?:" + J + ")$", "i"), needsContext: new RegExp("^" + K + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + K + "*((?:-\\d)?\\d*)" + K + "*\\)|)(?=[^-]|$)", "i") },
	        W = /^(?:input|select|textarea|button)$/i,
	        X = /^h\d$/i,
	        Y = /^[^{]+\{\s*\[native \w/,
	        Z = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
	        $ = /[+~]/,
	        _ = new RegExp("\\\\([\\da-f]{1,6}" + K + "?|(" + K + ")|.)", "ig"),
	        aa = function aa(a, b, c) {
	      var d = "0x" + b - 65536;return d !== d || c ? b : d < 0 ? String.fromCharCode(d + 65536) : String.fromCharCode(d >> 10 | 55296, 1023 & d | 56320);
	    },
	        ba = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g,
	        ca = function ca(a, b) {
	      return b ? "\0" === a ? "�" : a.slice(0, -1) + "\\" + a.charCodeAt(a.length - 1).toString(16) + " " : "\\" + a;
	    },
	        da = function da() {
	      m();
	    },
	        ea = ta(function (a) {
	      return a.disabled === !0;
	    }, { dir: "parentNode", next: "legend" });try {
	      G.apply(D = H.call(v.childNodes), v.childNodes), D[v.childNodes.length].nodeType;
	    } catch (fa) {
	      G = { apply: D.length ? function (a, b) {
	          F.apply(a, H.call(b));
	        } : function (a, b) {
	          var c = a.length,
	              d = 0;while (a[c++] = b[d++]) {}a.length = c - 1;
	        } };
	    }function ga(a, b, d, e) {
	      var f,
	          h,
	          j,
	          k,
	          l,
	          o,
	          r,
	          s = b && b.ownerDocument,
	          w = b ? b.nodeType : 9;if (d = d || [], "string" != typeof a || !a || 1 !== w && 9 !== w && 11 !== w) return d;if (!e && ((b ? b.ownerDocument || b : v) !== n && m(b), b = b || n, p)) {
	        if (11 !== w && (l = Z.exec(a))) if (f = l[1]) {
	          if (9 === w) {
	            if (!(j = b.getElementById(f))) return d;if (j.id === f) return d.push(j), d;
	          } else if (s && (j = s.getElementById(f)) && t(b, j) && j.id === f) return d.push(j), d;
	        } else {
	          if (l[2]) return G.apply(d, b.getElementsByTagName(a)), d;if ((f = l[3]) && c.getElementsByClassName && b.getElementsByClassName) return G.apply(d, b.getElementsByClassName(f)), d;
	        }if (c.qsa && !A[a + " "] && (!q || !q.test(a))) {
	          if (1 !== w) s = b, r = a;else if ("object" !== b.nodeName.toLowerCase()) {
	            (k = b.getAttribute("id")) ? k = k.replace(ba, ca) : b.setAttribute("id", k = u), o = g(a), h = o.length;while (h--) {
	              o[h] = "#" + k + " " + sa(o[h]);
	            }r = o.join(","), s = $.test(a) && qa(b.parentNode) || b;
	          }if (r) try {
	            return G.apply(d, s.querySelectorAll(r)), d;
	          } catch (x) {} finally {
	            k === u && b.removeAttribute("id");
	          }
	        }
	      }return i(a.replace(P, "$1"), b, d, e);
	    }function ha() {
	      var a = [];function b(c, e) {
	        return a.push(c + " ") > d.cacheLength && delete b[a.shift()], b[c + " "] = e;
	      }return b;
	    }function ia(a) {
	      return a[u] = !0, a;
	    }function ja(a) {
	      var b = n.createElement("fieldset");try {
	        return !!a(b);
	      } catch (c) {
	        return !1;
	      } finally {
	        b.parentNode && b.parentNode.removeChild(b), b = null;
	      }
	    }function ka(a, b) {
	      var c = a.split("|"),
	          e = c.length;while (e--) {
	        d.attrHandle[c[e]] = b;
	      }
	    }function la(a, b) {
	      var c = b && a,
	          d = c && 1 === a.nodeType && 1 === b.nodeType && a.sourceIndex - b.sourceIndex;if (d) return d;if (c) while (c = c.nextSibling) {
	        if (c === b) return -1;
	      }return a ? 1 : -1;
	    }function ma(a) {
	      return function (b) {
	        var c = b.nodeName.toLowerCase();return "input" === c && b.type === a;
	      };
	    }function na(a) {
	      return function (b) {
	        var c = b.nodeName.toLowerCase();return ("input" === c || "button" === c) && b.type === a;
	      };
	    }function oa(a) {
	      return function (b) {
	        return "label" in b && b.disabled === a || "form" in b && b.disabled === a || "form" in b && b.disabled === !1 && (b.isDisabled === a || b.isDisabled !== !a && ("label" in b || !ea(b)) !== a);
	      };
	    }function pa(a) {
	      return ia(function (b) {
	        return b = +b, ia(function (c, d) {
	          var e,
	              f = a([], c.length, b),
	              g = f.length;while (g--) {
	            c[e = f[g]] && (c[e] = !(d[e] = c[e]));
	          }
	        });
	      });
	    }function qa(a) {
	      return a && "undefined" != typeof a.getElementsByTagName && a;
	    }c = ga.support = {}, f = ga.isXML = function (a) {
	      var b = a && (a.ownerDocument || a).documentElement;return !!b && "HTML" !== b.nodeName;
	    }, m = ga.setDocument = function (a) {
	      var b,
	          e,
	          g = a ? a.ownerDocument || a : v;return g !== n && 9 === g.nodeType && g.documentElement ? (n = g, o = n.documentElement, p = !f(n), v !== n && (e = n.defaultView) && e.top !== e && (e.addEventListener ? e.addEventListener("unload", da, !1) : e.attachEvent && e.attachEvent("onunload", da)), c.attributes = ja(function (a) {
	        return a.className = "i", !a.getAttribute("className");
	      }), c.getElementsByTagName = ja(function (a) {
	        return a.appendChild(n.createComment("")), !a.getElementsByTagName("*").length;
	      }), c.getElementsByClassName = Y.test(n.getElementsByClassName), c.getById = ja(function (a) {
	        return o.appendChild(a).id = u, !n.getElementsByName || !n.getElementsByName(u).length;
	      }), c.getById ? (d.find.ID = function (a, b) {
	        if ("undefined" != typeof b.getElementById && p) {
	          var c = b.getElementById(a);return c ? [c] : [];
	        }
	      }, d.filter.ID = function (a) {
	        var b = a.replace(_, aa);return function (a) {
	          return a.getAttribute("id") === b;
	        };
	      }) : (delete d.find.ID, d.filter.ID = function (a) {
	        var b = a.replace(_, aa);return function (a) {
	          var c = "undefined" != typeof a.getAttributeNode && a.getAttributeNode("id");return c && c.value === b;
	        };
	      }), d.find.TAG = c.getElementsByTagName ? function (a, b) {
	        return "undefined" != typeof b.getElementsByTagName ? b.getElementsByTagName(a) : c.qsa ? b.querySelectorAll(a) : void 0;
	      } : function (a, b) {
	        var c,
	            d = [],
	            e = 0,
	            f = b.getElementsByTagName(a);if ("*" === a) {
	          while (c = f[e++]) {
	            1 === c.nodeType && d.push(c);
	          }return d;
	        }return f;
	      }, d.find.CLASS = c.getElementsByClassName && function (a, b) {
	        if ("undefined" != typeof b.getElementsByClassName && p) return b.getElementsByClassName(a);
	      }, r = [], q = [], (c.qsa = Y.test(n.querySelectorAll)) && (ja(function (a) {
	        o.appendChild(a).innerHTML = "<a id='" + u + "'></a><select id='" + u + "-\r\\' msallowcapture=''><option selected=''></option></select>", a.querySelectorAll("[msallowcapture^='']").length && q.push("[*^$]=" + K + "*(?:''|\"\")"), a.querySelectorAll("[selected]").length || q.push("\\[" + K + "*(?:value|" + J + ")"), a.querySelectorAll("[id~=" + u + "-]").length || q.push("~="), a.querySelectorAll(":checked").length || q.push(":checked"), a.querySelectorAll("a#" + u + "+*").length || q.push(".#.+[+~]");
	      }), ja(function (a) {
	        a.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";var b = n.createElement("input");b.setAttribute("type", "hidden"), a.appendChild(b).setAttribute("name", "D"), a.querySelectorAll("[name=d]").length && q.push("name" + K + "*[*^$|!~]?="), 2 !== a.querySelectorAll(":enabled").length && q.push(":enabled", ":disabled"), o.appendChild(a).disabled = !0, 2 !== a.querySelectorAll(":disabled").length && q.push(":enabled", ":disabled"), a.querySelectorAll("*,:x"), q.push(",.*:");
	      })), (c.matchesSelector = Y.test(s = o.matches || o.webkitMatchesSelector || o.mozMatchesSelector || o.oMatchesSelector || o.msMatchesSelector)) && ja(function (a) {
	        c.disconnectedMatch = s.call(a, "*"), s.call(a, "[s!='']:x"), r.push("!=", N);
	      }), q = q.length && new RegExp(q.join("|")), r = r.length && new RegExp(r.join("|")), b = Y.test(o.compareDocumentPosition), t = b || Y.test(o.contains) ? function (a, b) {
	        var c = 9 === a.nodeType ? a.documentElement : a,
	            d = b && b.parentNode;return a === d || !(!d || 1 !== d.nodeType || !(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)));
	      } : function (a, b) {
	        if (b) while (b = b.parentNode) {
	          if (b === a) return !0;
	        }return !1;
	      }, B = b ? function (a, b) {
	        if (a === b) return l = !0, 0;var d = !a.compareDocumentPosition - !b.compareDocumentPosition;return d ? d : (d = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1, 1 & d || !c.sortDetached && b.compareDocumentPosition(a) === d ? a === n || a.ownerDocument === v && t(v, a) ? -1 : b === n || b.ownerDocument === v && t(v, b) ? 1 : k ? I(k, a) - I(k, b) : 0 : 4 & d ? -1 : 1);
	      } : function (a, b) {
	        if (a === b) return l = !0, 0;var c,
	            d = 0,
	            e = a.parentNode,
	            f = b.parentNode,
	            g = [a],
	            h = [b];if (!e || !f) return a === n ? -1 : b === n ? 1 : e ? -1 : f ? 1 : k ? I(k, a) - I(k, b) : 0;if (e === f) return la(a, b);c = a;while (c = c.parentNode) {
	          g.unshift(c);
	        }c = b;while (c = c.parentNode) {
	          h.unshift(c);
	        }while (g[d] === h[d]) {
	          d++;
	        }return d ? la(g[d], h[d]) : g[d] === v ? -1 : h[d] === v ? 1 : 0;
	      }, n) : n;
	    }, ga.matches = function (a, b) {
	      return ga(a, null, null, b);
	    }, ga.matchesSelector = function (a, b) {
	      if ((a.ownerDocument || a) !== n && m(a), b = b.replace(S, "='$1']"), c.matchesSelector && p && !A[b + " "] && (!r || !r.test(b)) && (!q || !q.test(b))) try {
	        var d = s.call(a, b);if (d || c.disconnectedMatch || a.document && 11 !== a.document.nodeType) return d;
	      } catch (e) {}return ga(b, n, null, [a]).length > 0;
	    }, ga.contains = function (a, b) {
	      return (a.ownerDocument || a) !== n && m(a), t(a, b);
	    }, ga.attr = function (a, b) {
	      (a.ownerDocument || a) !== n && m(a);var e = d.attrHandle[b.toLowerCase()],
	          f = e && C.call(d.attrHandle, b.toLowerCase()) ? e(a, b, !p) : void 0;return void 0 !== f ? f : c.attributes || !p ? a.getAttribute(b) : (f = a.getAttributeNode(b)) && f.specified ? f.value : null;
	    }, ga.escape = function (a) {
	      return (a + "").replace(ba, ca);
	    }, ga.error = function (a) {
	      throw new Error("Syntax error, unrecognized expression: " + a);
	    }, ga.uniqueSort = function (a) {
	      var b,
	          d = [],
	          e = 0,
	          f = 0;if (l = !c.detectDuplicates, k = !c.sortStable && a.slice(0), a.sort(B), l) {
	        while (b = a[f++]) {
	          b === a[f] && (e = d.push(f));
	        }while (e--) {
	          a.splice(d[e], 1);
	        }
	      }return k = null, a;
	    }, e = ga.getText = function (a) {
	      var b,
	          c = "",
	          d = 0,
	          f = a.nodeType;if (f) {
	        if (1 === f || 9 === f || 11 === f) {
	          if ("string" == typeof a.textContent) return a.textContent;for (a = a.firstChild; a; a = a.nextSibling) {
	            c += e(a);
	          }
	        } else if (3 === f || 4 === f) return a.nodeValue;
	      } else while (b = a[d++]) {
	        c += e(b);
	      }return c;
	    }, d = ga.selectors = { cacheLength: 50, createPseudo: ia, match: V, attrHandle: {}, find: {}, relative: { ">": { dir: "parentNode", first: !0 }, " ": { dir: "parentNode" }, "+": { dir: "previousSibling", first: !0 }, "~": { dir: "previousSibling" } }, preFilter: { ATTR: function ATTR(a) {
	          return a[1] = a[1].replace(_, aa), a[3] = (a[3] || a[4] || a[5] || "").replace(_, aa), "~=" === a[2] && (a[3] = " " + a[3] + " "), a.slice(0, 4);
	        }, CHILD: function CHILD(a) {
	          return a[1] = a[1].toLowerCase(), "nth" === a[1].slice(0, 3) ? (a[3] || ga.error(a[0]), a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ("even" === a[3] || "odd" === a[3])), a[5] = +(a[7] + a[8] || "odd" === a[3])) : a[3] && ga.error(a[0]), a;
	        }, PSEUDO: function PSEUDO(a) {
	          var b,
	              c = !a[6] && a[2];return V.CHILD.test(a[0]) ? null : (a[3] ? a[2] = a[4] || a[5] || "" : c && T.test(c) && (b = g(c, !0)) && (b = c.indexOf(")", c.length - b) - c.length) && (a[0] = a[0].slice(0, b), a[2] = c.slice(0, b)), a.slice(0, 3));
	        } }, filter: { TAG: function TAG(a) {
	          var b = a.replace(_, aa).toLowerCase();return "*" === a ? function () {
	            return !0;
	          } : function (a) {
	            return a.nodeName && a.nodeName.toLowerCase() === b;
	          };
	        }, CLASS: function CLASS(a) {
	          var b = y[a + " "];return b || (b = new RegExp("(^|" + K + ")" + a + "(" + K + "|$)")) && y(a, function (a) {
	            return b.test("string" == typeof a.className && a.className || "undefined" != typeof a.getAttribute && a.getAttribute("class") || "");
	          });
	        }, ATTR: function ATTR(a, b, c) {
	          return function (d) {
	            var e = ga.attr(d, a);return null == e ? "!=" === b : !b || (e += "", "=" === b ? e === c : "!=" === b ? e !== c : "^=" === b ? c && 0 === e.indexOf(c) : "*=" === b ? c && e.indexOf(c) > -1 : "$=" === b ? c && e.slice(-c.length) === c : "~=" === b ? (" " + e.replace(O, " ") + " ").indexOf(c) > -1 : "|=" === b && (e === c || e.slice(0, c.length + 1) === c + "-"));
	          };
	        }, CHILD: function CHILD(a, b, c, d, e) {
	          var f = "nth" !== a.slice(0, 3),
	              g = "last" !== a.slice(-4),
	              h = "of-type" === b;return 1 === d && 0 === e ? function (a) {
	            return !!a.parentNode;
	          } : function (b, c, i) {
	            var j,
	                k,
	                l,
	                m,
	                n,
	                o,
	                p = f !== g ? "nextSibling" : "previousSibling",
	                q = b.parentNode,
	                r = h && b.nodeName.toLowerCase(),
	                s = !i && !h,
	                t = !1;if (q) {
	              if (f) {
	                while (p) {
	                  m = b;while (m = m[p]) {
	                    if (h ? m.nodeName.toLowerCase() === r : 1 === m.nodeType) return !1;
	                  }o = p = "only" === a && !o && "nextSibling";
	                }return !0;
	              }if (o = [g ? q.firstChild : q.lastChild], g && s) {
	                m = q, l = m[u] || (m[u] = {}), k = l[m.uniqueID] || (l[m.uniqueID] = {}), j = k[a] || [], n = j[0] === w && j[1], t = n && j[2], m = n && q.childNodes[n];while (m = ++n && m && m[p] || (t = n = 0) || o.pop()) {
	                  if (1 === m.nodeType && ++t && m === b) {
	                    k[a] = [w, n, t];break;
	                  }
	                }
	              } else if (s && (m = b, l = m[u] || (m[u] = {}), k = l[m.uniqueID] || (l[m.uniqueID] = {}), j = k[a] || [], n = j[0] === w && j[1], t = n), t === !1) while (m = ++n && m && m[p] || (t = n = 0) || o.pop()) {
	                if ((h ? m.nodeName.toLowerCase() === r : 1 === m.nodeType) && ++t && (s && (l = m[u] || (m[u] = {}), k = l[m.uniqueID] || (l[m.uniqueID] = {}), k[a] = [w, t]), m === b)) break;
	              }return t -= e, t === d || t % d === 0 && t / d >= 0;
	            }
	          };
	        }, PSEUDO: function PSEUDO(a, b) {
	          var c,
	              e = d.pseudos[a] || d.setFilters[a.toLowerCase()] || ga.error("unsupported pseudo: " + a);return e[u] ? e(b) : e.length > 1 ? (c = [a, a, "", b], d.setFilters.hasOwnProperty(a.toLowerCase()) ? ia(function (a, c) {
	            var d,
	                f = e(a, b),
	                g = f.length;while (g--) {
	              d = I(a, f[g]), a[d] = !(c[d] = f[g]);
	            }
	          }) : function (a) {
	            return e(a, 0, c);
	          }) : e;
	        } }, pseudos: { not: ia(function (a) {
	          var b = [],
	              c = [],
	              d = h(a.replace(P, "$1"));return d[u] ? ia(function (a, b, c, e) {
	            var f,
	                g = d(a, null, e, []),
	                h = a.length;while (h--) {
	              (f = g[h]) && (a[h] = !(b[h] = f));
	            }
	          }) : function (a, e, f) {
	            return b[0] = a, d(b, null, f, c), b[0] = null, !c.pop();
	          };
	        }), has: ia(function (a) {
	          return function (b) {
	            return ga(a, b).length > 0;
	          };
	        }), contains: ia(function (a) {
	          return a = a.replace(_, aa), function (b) {
	            return (b.textContent || b.innerText || e(b)).indexOf(a) > -1;
	          };
	        }), lang: ia(function (a) {
	          return U.test(a || "") || ga.error("unsupported lang: " + a), a = a.replace(_, aa).toLowerCase(), function (b) {
	            var c;do {
	              if (c = p ? b.lang : b.getAttribute("xml:lang") || b.getAttribute("lang")) return c = c.toLowerCase(), c === a || 0 === c.indexOf(a + "-");
	            } while ((b = b.parentNode) && 1 === b.nodeType);return !1;
	          };
	        }), target: function target(b) {
	          var c = a.location && a.location.hash;return c && c.slice(1) === b.id;
	        }, root: function root(a) {
	          return a === o;
	        }, focus: function focus(a) {
	          return a === n.activeElement && (!n.hasFocus || n.hasFocus()) && !!(a.type || a.href || ~a.tabIndex);
	        }, enabled: oa(!1), disabled: oa(!0), checked: function checked(a) {
	          var b = a.nodeName.toLowerCase();return "input" === b && !!a.checked || "option" === b && !!a.selected;
	        }, selected: function selected(a) {
	          return a.parentNode && a.parentNode.selectedIndex, a.selected === !0;
	        }, empty: function empty(a) {
	          for (a = a.firstChild; a; a = a.nextSibling) {
	            if (a.nodeType < 6) return !1;
	          }return !0;
	        }, parent: function parent(a) {
	          return !d.pseudos.empty(a);
	        }, header: function header(a) {
	          return X.test(a.nodeName);
	        }, input: function input(a) {
	          return W.test(a.nodeName);
	        }, button: function button(a) {
	          var b = a.nodeName.toLowerCase();return "input" === b && "button" === a.type || "button" === b;
	        }, text: function text(a) {
	          var b;return "input" === a.nodeName.toLowerCase() && "text" === a.type && (null == (b = a.getAttribute("type")) || "text" === b.toLowerCase());
	        }, first: pa(function () {
	          return [0];
	        }), last: pa(function (a, b) {
	          return [b - 1];
	        }), eq: pa(function (a, b, c) {
	          return [c < 0 ? c + b : c];
	        }), even: pa(function (a, b) {
	          for (var c = 0; c < b; c += 2) {
	            a.push(c);
	          }return a;
	        }), odd: pa(function (a, b) {
	          for (var c = 1; c < b; c += 2) {
	            a.push(c);
	          }return a;
	        }), lt: pa(function (a, b, c) {
	          for (var d = c < 0 ? c + b : c; --d >= 0;) {
	            a.push(d);
	          }return a;
	        }), gt: pa(function (a, b, c) {
	          for (var d = c < 0 ? c + b : c; ++d < b;) {
	            a.push(d);
	          }return a;
	        }) } }, d.pseudos.nth = d.pseudos.eq;for (b in { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }) {
	      d.pseudos[b] = ma(b);
	    }for (b in { submit: !0, reset: !0 }) {
	      d.pseudos[b] = na(b);
	    }function ra() {}ra.prototype = d.filters = d.pseudos, d.setFilters = new ra(), g = ga.tokenize = function (a, b) {
	      var c,
	          e,
	          f,
	          g,
	          h,
	          i,
	          j,
	          k = z[a + " "];if (k) return b ? 0 : k.slice(0);h = a, i = [], j = d.preFilter;while (h) {
	        c && !(e = Q.exec(h)) || (e && (h = h.slice(e[0].length) || h), i.push(f = [])), c = !1, (e = R.exec(h)) && (c = e.shift(), f.push({ value: c, type: e[0].replace(P, " ") }), h = h.slice(c.length));for (g in d.filter) {
	          !(e = V[g].exec(h)) || j[g] && !(e = j[g](e)) || (c = e.shift(), f.push({ value: c, type: g, matches: e }), h = h.slice(c.length));
	        }if (!c) break;
	      }return b ? h.length : h ? ga.error(a) : z(a, i).slice(0);
	    };function sa(a) {
	      for (var b = 0, c = a.length, d = ""; b < c; b++) {
	        d += a[b].value;
	      }return d;
	    }function ta(a, b, c) {
	      var d = b.dir,
	          e = b.next,
	          f = e || d,
	          g = c && "parentNode" === f,
	          h = x++;return b.first ? function (b, c, e) {
	        while (b = b[d]) {
	          if (1 === b.nodeType || g) return a(b, c, e);
	        }
	      } : function (b, c, i) {
	        var j,
	            k,
	            l,
	            m = [w, h];if (i) {
	          while (b = b[d]) {
	            if ((1 === b.nodeType || g) && a(b, c, i)) return !0;
	          }
	        } else while (b = b[d]) {
	          if (1 === b.nodeType || g) if (l = b[u] || (b[u] = {}), k = l[b.uniqueID] || (l[b.uniqueID] = {}), e && e === b.nodeName.toLowerCase()) b = b[d] || b;else {
	            if ((j = k[f]) && j[0] === w && j[1] === h) return m[2] = j[2];if (k[f] = m, m[2] = a(b, c, i)) return !0;
	          }
	        }
	      };
	    }function ua(a) {
	      return a.length > 1 ? function (b, c, d) {
	        var e = a.length;while (e--) {
	          if (!a[e](b, c, d)) return !1;
	        }return !0;
	      } : a[0];
	    }function va(a, b, c) {
	      for (var d = 0, e = b.length; d < e; d++) {
	        ga(a, b[d], c);
	      }return c;
	    }function wa(a, b, c, d, e) {
	      for (var f, g = [], h = 0, i = a.length, j = null != b; h < i; h++) {
	        (f = a[h]) && (c && !c(f, d, e) || (g.push(f), j && b.push(h)));
	      }return g;
	    }function xa(a, b, c, d, e, f) {
	      return d && !d[u] && (d = xa(d)), e && !e[u] && (e = xa(e, f)), ia(function (f, g, h, i) {
	        var j,
	            k,
	            l,
	            m = [],
	            n = [],
	            o = g.length,
	            p = f || va(b || "*", h.nodeType ? [h] : h, []),
	            q = !a || !f && b ? p : wa(p, m, a, h, i),
	            r = c ? e || (f ? a : o || d) ? [] : g : q;if (c && c(q, r, h, i), d) {
	          j = wa(r, n), d(j, [], h, i), k = j.length;while (k--) {
	            (l = j[k]) && (r[n[k]] = !(q[n[k]] = l));
	          }
	        }if (f) {
	          if (e || a) {
	            if (e) {
	              j = [], k = r.length;while (k--) {
	                (l = r[k]) && j.push(q[k] = l);
	              }e(null, r = [], j, i);
	            }k = r.length;while (k--) {
	              (l = r[k]) && (j = e ? I(f, l) : m[k]) > -1 && (f[j] = !(g[j] = l));
	            }
	          }
	        } else r = wa(r === g ? r.splice(o, r.length) : r), e ? e(null, g, r, i) : G.apply(g, r);
	      });
	    }function ya(a) {
	      for (var b, c, e, f = a.length, g = d.relative[a[0].type], h = g || d.relative[" "], i = g ? 1 : 0, k = ta(function (a) {
	        return a === b;
	      }, h, !0), l = ta(function (a) {
	        return I(b, a) > -1;
	      }, h, !0), m = [function (a, c, d) {
	        var e = !g && (d || c !== j) || ((b = c).nodeType ? k(a, c, d) : l(a, c, d));return b = null, e;
	      }]; i < f; i++) {
	        if (c = d.relative[a[i].type]) m = [ta(ua(m), c)];else {
	          if (c = d.filter[a[i].type].apply(null, a[i].matches), c[u]) {
	            for (e = ++i; e < f; e++) {
	              if (d.relative[a[e].type]) break;
	            }return xa(i > 1 && ua(m), i > 1 && sa(a.slice(0, i - 1).concat({ value: " " === a[i - 2].type ? "*" : "" })).replace(P, "$1"), c, i < e && ya(a.slice(i, e)), e < f && ya(a = a.slice(e)), e < f && sa(a));
	          }m.push(c);
	        }
	      }return ua(m);
	    }function za(a, b) {
	      var c = b.length > 0,
	          e = a.length > 0,
	          f = function f(_f, g, h, i, k) {
	        var l,
	            o,
	            q,
	            r = 0,
	            s = "0",
	            t = _f && [],
	            u = [],
	            v = j,
	            x = _f || e && d.find.TAG("*", k),
	            y = w += null == v ? 1 : Math.random() || .1,
	            z = x.length;for (k && (j = g === n || g || k); s !== z && null != (l = x[s]); s++) {
	          if (e && l) {
	            o = 0, g || l.ownerDocument === n || (m(l), h = !p);while (q = a[o++]) {
	              if (q(l, g || n, h)) {
	                i.push(l);break;
	              }
	            }k && (w = y);
	          }c && ((l = !q && l) && r--, _f && t.push(l));
	        }if (r += s, c && s !== r) {
	          o = 0;while (q = b[o++]) {
	            q(t, u, g, h);
	          }if (_f) {
	            if (r > 0) while (s--) {
	              t[s] || u[s] || (u[s] = E.call(i));
	            }u = wa(u);
	          }G.apply(i, u), k && !_f && u.length > 0 && r + b.length > 1 && ga.uniqueSort(i);
	        }return k && (w = y, j = v), t;
	      };return c ? ia(f) : f;
	    }return h = ga.compile = function (a, b) {
	      var c,
	          d = [],
	          e = [],
	          f = A[a + " "];if (!f) {
	        b || (b = g(a)), c = b.length;while (c--) {
	          f = ya(b[c]), f[u] ? d.push(f) : e.push(f);
	        }f = A(a, za(e, d)), f.selector = a;
	      }return f;
	    }, i = ga.select = function (a, b, e, f) {
	      var i,
	          j,
	          k,
	          l,
	          m,
	          n = "function" == typeof a && a,
	          o = !f && g(a = n.selector || a);if (e = e || [], 1 === o.length) {
	        if (j = o[0] = o[0].slice(0), j.length > 2 && "ID" === (k = j[0]).type && c.getById && 9 === b.nodeType && p && d.relative[j[1].type]) {
	          if (b = (d.find.ID(k.matches[0].replace(_, aa), b) || [])[0], !b) return e;n && (b = b.parentNode), a = a.slice(j.shift().value.length);
	        }i = V.needsContext.test(a) ? 0 : j.length;while (i--) {
	          if (k = j[i], d.relative[l = k.type]) break;if ((m = d.find[l]) && (f = m(k.matches[0].replace(_, aa), $.test(j[0].type) && qa(b.parentNode) || b))) {
	            if (j.splice(i, 1), a = f.length && sa(j), !a) return G.apply(e, f), e;break;
	          }
	        }
	      }return (n || h(a, o))(f, b, !p, e, !b || $.test(a) && qa(b.parentNode) || b), e;
	    }, c.sortStable = u.split("").sort(B).join("") === u, c.detectDuplicates = !!l, m(), c.sortDetached = ja(function (a) {
	      return 1 & a.compareDocumentPosition(n.createElement("fieldset"));
	    }), ja(function (a) {
	      return a.innerHTML = "<a href='#'></a>", "#" === a.firstChild.getAttribute("href");
	    }) || ka("type|href|height|width", function (a, b, c) {
	      if (!c) return a.getAttribute(b, "type" === b.toLowerCase() ? 1 : 2);
	    }), c.attributes && ja(function (a) {
	      return a.innerHTML = "<input/>", a.firstChild.setAttribute("value", ""), "" === a.firstChild.getAttribute("value");
	    }) || ka("value", function (a, b, c) {
	      if (!c && "input" === a.nodeName.toLowerCase()) return a.defaultValue;
	    }), ja(function (a) {
	      return null == a.getAttribute("disabled");
	    }) || ka(J, function (a, b, c) {
	      var d;if (!c) return a[b] === !0 ? b.toLowerCase() : (d = a.getAttributeNode(b)) && d.specified ? d.value : null;
	    }), ga;
	  }(a);r.find = x, r.expr = x.selectors, r.expr[":"] = r.expr.pseudos, r.uniqueSort = r.unique = x.uniqueSort, r.text = x.getText, r.isXMLDoc = x.isXML, r.contains = x.contains, r.escapeSelector = x.escape;var y = function y(a, b, c) {
	    var d = [],
	        e = void 0 !== c;while ((a = a[b]) && 9 !== a.nodeType) {
	      if (1 === a.nodeType) {
	        if (e && r(a).is(c)) break;d.push(a);
	      }
	    }return d;
	  },
	      z = function z(a, b) {
	    for (var c = []; a; a = a.nextSibling) {
	      1 === a.nodeType && a !== b && c.push(a);
	    }return c;
	  },
	      A = r.expr.match.needsContext,
	      B = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i,
	      C = /^.[^:#\[\.,]*$/;function D(a, b, c) {
	    if (r.isFunction(b)) return r.grep(a, function (a, d) {
	      return !!b.call(a, d, a) !== c;
	    });if (b.nodeType) return r.grep(a, function (a) {
	      return a === b !== c;
	    });if ("string" == typeof b) {
	      if (C.test(b)) return r.filter(b, a, c);b = r.filter(b, a);
	    }return r.grep(a, function (a) {
	      return i.call(b, a) > -1 !== c && 1 === a.nodeType;
	    });
	  }r.filter = function (a, b, c) {
	    var d = b[0];return c && (a = ":not(" + a + ")"), 1 === b.length && 1 === d.nodeType ? r.find.matchesSelector(d, a) ? [d] : [] : r.find.matches(a, r.grep(b, function (a) {
	      return 1 === a.nodeType;
	    }));
	  }, r.fn.extend({ find: function find(a) {
	      var b,
	          c,
	          d = this.length,
	          e = this;if ("string" != typeof a) return this.pushStack(r(a).filter(function () {
	        for (b = 0; b < d; b++) {
	          if (r.contains(e[b], this)) return !0;
	        }
	      }));for (c = this.pushStack([]), b = 0; b < d; b++) {
	        r.find(a, e[b], c);
	      }return d > 1 ? r.uniqueSort(c) : c;
	    }, filter: function filter(a) {
	      return this.pushStack(D(this, a || [], !1));
	    }, not: function not(a) {
	      return this.pushStack(D(this, a || [], !0));
	    }, is: function is(a) {
	      return !!D(this, "string" == typeof a && A.test(a) ? r(a) : a || [], !1).length;
	    } });var E,
	      F = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,
	      G = r.fn.init = function (a, b, c) {
	    var e, f;if (!a) return this;if (c = c || E, "string" == typeof a) {
	      if (e = "<" === a[0] && ">" === a[a.length - 1] && a.length >= 3 ? [null, a, null] : F.exec(a), !e || !e[1] && b) return !b || b.jquery ? (b || c).find(a) : this.constructor(b).find(a);if (e[1]) {
	        if (b = b instanceof r ? b[0] : b, r.merge(this, r.parseHTML(e[1], b && b.nodeType ? b.ownerDocument || b : d, !0)), B.test(e[1]) && r.isPlainObject(b)) for (e in b) {
	          r.isFunction(this[e]) ? this[e](b[e]) : this.attr(e, b[e]);
	        }return this;
	      }return f = d.getElementById(e[2]), f && (this[0] = f, this.length = 1), this;
	    }return a.nodeType ? (this[0] = a, this.length = 1, this) : r.isFunction(a) ? void 0 !== c.ready ? c.ready(a) : a(r) : r.makeArray(a, this);
	  };G.prototype = r.fn, E = r(d);var H = /^(?:parents|prev(?:Until|All))/,
	      I = { children: !0, contents: !0, next: !0, prev: !0 };r.fn.extend({ has: function has(a) {
	      var b = r(a, this),
	          c = b.length;return this.filter(function () {
	        for (var a = 0; a < c; a++) {
	          if (r.contains(this, b[a])) return !0;
	        }
	      });
	    }, closest: function closest(a, b) {
	      var c,
	          d = 0,
	          e = this.length,
	          f = [],
	          g = "string" != typeof a && r(a);if (!A.test(a)) for (; d < e; d++) {
	        for (c = this[d]; c && c !== b; c = c.parentNode) {
	          if (c.nodeType < 11 && (g ? g.index(c) > -1 : 1 === c.nodeType && r.find.matchesSelector(c, a))) {
	            f.push(c);break;
	          }
	        }
	      }return this.pushStack(f.length > 1 ? r.uniqueSort(f) : f);
	    }, index: function index(a) {
	      return a ? "string" == typeof a ? i.call(r(a), this[0]) : i.call(this, a.jquery ? a[0] : a) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
	    }, add: function add(a, b) {
	      return this.pushStack(r.uniqueSort(r.merge(this.get(), r(a, b))));
	    }, addBack: function addBack(a) {
	      return this.add(null == a ? this.prevObject : this.prevObject.filter(a));
	    } });function J(a, b) {
	    while ((a = a[b]) && 1 !== a.nodeType) {}return a;
	  }r.each({ parent: function parent(a) {
	      var b = a.parentNode;return b && 11 !== b.nodeType ? b : null;
	    }, parents: function parents(a) {
	      return y(a, "parentNode");
	    }, parentsUntil: function parentsUntil(a, b, c) {
	      return y(a, "parentNode", c);
	    }, next: function next(a) {
	      return J(a, "nextSibling");
	    }, prev: function prev(a) {
	      return J(a, "previousSibling");
	    }, nextAll: function nextAll(a) {
	      return y(a, "nextSibling");
	    }, prevAll: function prevAll(a) {
	      return y(a, "previousSibling");
	    }, nextUntil: function nextUntil(a, b, c) {
	      return y(a, "nextSibling", c);
	    }, prevUntil: function prevUntil(a, b, c) {
	      return y(a, "previousSibling", c);
	    }, siblings: function siblings(a) {
	      return z((a.parentNode || {}).firstChild, a);
	    }, children: function children(a) {
	      return z(a.firstChild);
	    }, contents: function contents(a) {
	      return a.contentDocument || r.merge([], a.childNodes);
	    } }, function (a, b) {
	    r.fn[a] = function (c, d) {
	      var e = r.map(this, b, c);return "Until" !== a.slice(-5) && (d = c), d && "string" == typeof d && (e = r.filter(d, e)), this.length > 1 && (I[a] || r.uniqueSort(e), H.test(a) && e.reverse()), this.pushStack(e);
	    };
	  });var K = /\S+/g;function L(a) {
	    var b = {};return r.each(a.match(K) || [], function (a, c) {
	      b[c] = !0;
	    }), b;
	  }r.Callbacks = function (a) {
	    a = "string" == typeof a ? L(a) : r.extend({}, a);var b,
	        c,
	        d,
	        e,
	        f = [],
	        g = [],
	        h = -1,
	        i = function i() {
	      for (e = a.once, d = b = !0; g.length; h = -1) {
	        c = g.shift();while (++h < f.length) {
	          f[h].apply(c[0], c[1]) === !1 && a.stopOnFalse && (h = f.length, c = !1);
	        }
	      }a.memory || (c = !1), b = !1, e && (f = c ? [] : "");
	    },
	        j = { add: function add() {
	        return f && (c && !b && (h = f.length - 1, g.push(c)), function d(b) {
	          r.each(b, function (b, c) {
	            r.isFunction(c) ? a.unique && j.has(c) || f.push(c) : c && c.length && "string" !== r.type(c) && d(c);
	          });
	        }(arguments), c && !b && i()), this;
	      }, remove: function remove() {
	        return r.each(arguments, function (a, b) {
	          var c;while ((c = r.inArray(b, f, c)) > -1) {
	            f.splice(c, 1), c <= h && h--;
	          }
	        }), this;
	      }, has: function has(a) {
	        return a ? r.inArray(a, f) > -1 : f.length > 0;
	      }, empty: function empty() {
	        return f && (f = []), this;
	      }, disable: function disable() {
	        return e = g = [], f = c = "", this;
	      }, disabled: function disabled() {
	        return !f;
	      }, lock: function lock() {
	        return e = g = [], c || b || (f = c = ""), this;
	      }, locked: function locked() {
	        return !!e;
	      }, fireWith: function fireWith(a, c) {
	        return e || (c = c || [], c = [a, c.slice ? c.slice() : c], g.push(c), b || i()), this;
	      }, fire: function fire() {
	        return j.fireWith(this, arguments), this;
	      }, fired: function fired() {
	        return !!d;
	      } };return j;
	  };function M(a) {
	    return a;
	  }function N(a) {
	    throw a;
	  }function O(a, b, c) {
	    var d;try {
	      a && r.isFunction(d = a.promise) ? d.call(a).done(b).fail(c) : a && r.isFunction(d = a.then) ? d.call(a, b, c) : b.call(void 0, a);
	    } catch (a) {
	      c.call(void 0, a);
	    }
	  }r.extend({ Deferred: function Deferred(b) {
	      var c = [["notify", "progress", r.Callbacks("memory"), r.Callbacks("memory"), 2], ["resolve", "done", r.Callbacks("once memory"), r.Callbacks("once memory"), 0, "resolved"], ["reject", "fail", r.Callbacks("once memory"), r.Callbacks("once memory"), 1, "rejected"]],
	          d = "pending",
	          e = { state: function state() {
	          return d;
	        }, always: function always() {
	          return f.done(arguments).fail(arguments), this;
	        }, "catch": function _catch(a) {
	          return e.then(null, a);
	        }, pipe: function pipe() {
	          var a = arguments;return r.Deferred(function (b) {
	            r.each(c, function (c, d) {
	              var e = r.isFunction(a[d[4]]) && a[d[4]];f[d[1]](function () {
	                var a = e && e.apply(this, arguments);a && r.isFunction(a.promise) ? a.promise().progress(b.notify).done(b.resolve).fail(b.reject) : b[d[0] + "With"](this, e ? [a] : arguments);
	              });
	            }), a = null;
	          }).promise();
	        }, then: function then(b, d, e) {
	          var f = 0;function g(b, c, d, e) {
	            return function () {
	              var h = this,
	                  i = arguments,
	                  j = function j() {
	                var a, j;if (!(b < f)) {
	                  if (a = d.apply(h, i), a === c.promise()) throw new TypeError("Thenable self-resolution");j = a && ("object" == (typeof a === "undefined" ? "undefined" : _typeof(a)) || "function" == typeof a) && a.then, r.isFunction(j) ? e ? j.call(a, g(f, c, M, e), g(f, c, N, e)) : (f++, j.call(a, g(f, c, M, e), g(f, c, N, e), g(f, c, M, c.notifyWith))) : (d !== M && (h = void 0, i = [a]), (e || c.resolveWith)(h, i));
	                }
	              },
	                  k = e ? j : function () {
	                try {
	                  j();
	                } catch (a) {
	                  r.Deferred.exceptionHook && r.Deferred.exceptionHook(a, k.stackTrace), b + 1 >= f && (d !== N && (h = void 0, i = [a]), c.rejectWith(h, i));
	                }
	              };b ? k() : (r.Deferred.getStackHook && (k.stackTrace = r.Deferred.getStackHook()), a.setTimeout(k));
	            };
	          }return r.Deferred(function (a) {
	            c[0][3].add(g(0, a, r.isFunction(e) ? e : M, a.notifyWith)), c[1][3].add(g(0, a, r.isFunction(b) ? b : M)), c[2][3].add(g(0, a, r.isFunction(d) ? d : N));
	          }).promise();
	        }, promise: function promise(a) {
	          return null != a ? r.extend(a, e) : e;
	        } },
	          f = {};return r.each(c, function (a, b) {
	        var g = b[2],
	            h = b[5];e[b[1]] = g.add, h && g.add(function () {
	          d = h;
	        }, c[3 - a][2].disable, c[0][2].lock), g.add(b[3].fire), f[b[0]] = function () {
	          return f[b[0] + "With"](this === f ? void 0 : this, arguments), this;
	        }, f[b[0] + "With"] = g.fireWith;
	      }), e.promise(f), b && b.call(f, f), f;
	    }, when: function when(a) {
	      var b = arguments.length,
	          c = b,
	          d = Array(c),
	          e = f.call(arguments),
	          g = r.Deferred(),
	          h = function h(a) {
	        return function (c) {
	          d[a] = this, e[a] = arguments.length > 1 ? f.call(arguments) : c, --b || g.resolveWith(d, e);
	        };
	      };if (b <= 1 && (O(a, g.done(h(c)).resolve, g.reject), "pending" === g.state() || r.isFunction(e[c] && e[c].then))) return g.then();while (c--) {
	        O(e[c], h(c), g.reject);
	      }return g.promise();
	    } });var P = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;r.Deferred.exceptionHook = function (b, c) {
	    a.console && a.console.warn && b && P.test(b.name) && a.console.warn("jQuery.Deferred exception: " + b.message, b.stack, c);
	  }, r.readyException = function (b) {
	    a.setTimeout(function () {
	      throw b;
	    });
	  };var Q = r.Deferred();r.fn.ready = function (a) {
	    return Q.then(a)["catch"](function (a) {
	      r.readyException(a);
	    }), this;
	  }, r.extend({ isReady: !1, readyWait: 1, holdReady: function holdReady(a) {
	      a ? r.readyWait++ : r.ready(!0);
	    }, ready: function ready(a) {
	      (a === !0 ? --r.readyWait : r.isReady) || (r.isReady = !0, a !== !0 && --r.readyWait > 0 || Q.resolveWith(d, [r]));
	    } }), r.ready.then = Q.then;function R() {
	    d.removeEventListener("DOMContentLoaded", R), a.removeEventListener("load", R), r.ready();
	  }"complete" === d.readyState || "loading" !== d.readyState && !d.documentElement.doScroll ? a.setTimeout(r.ready) : (d.addEventListener("DOMContentLoaded", R), a.addEventListener("load", R));var S = function S(a, b, c, d, e, f, g) {
	    var h = 0,
	        i = a.length,
	        j = null == c;if ("object" === r.type(c)) {
	      e = !0;for (h in c) {
	        S(a, b, h, c[h], !0, f, g);
	      }
	    } else if (void 0 !== d && (e = !0, r.isFunction(d) || (g = !0), j && (g ? (b.call(a, d), b = null) : (j = b, b = function b(a, _b, c) {
	      return j.call(r(a), c);
	    })), b)) for (; h < i; h++) {
	      b(a[h], c, g ? d : d.call(a[h], h, b(a[h], c)));
	    }return e ? a : j ? b.call(a) : i ? b(a[0], c) : f;
	  },
	      T = function T(a) {
	    return 1 === a.nodeType || 9 === a.nodeType || !+a.nodeType;
	  };function U() {
	    this.expando = r.expando + U.uid++;
	  }U.uid = 1, U.prototype = { cache: function cache(a) {
	      var b = a[this.expando];return b || (b = {}, T(a) && (a.nodeType ? a[this.expando] = b : Object.defineProperty(a, this.expando, { value: b, configurable: !0 }))), b;
	    }, set: function set(a, b, c) {
	      var d,
	          e = this.cache(a);if ("string" == typeof b) e[r.camelCase(b)] = c;else for (d in b) {
	        e[r.camelCase(d)] = b[d];
	      }return e;
	    }, get: function get(a, b) {
	      return void 0 === b ? this.cache(a) : a[this.expando] && a[this.expando][r.camelCase(b)];
	    }, access: function access(a, b, c) {
	      return void 0 === b || b && "string" == typeof b && void 0 === c ? this.get(a, b) : (this.set(a, b, c), void 0 !== c ? c : b);
	    }, remove: function remove(a, b) {
	      var c,
	          d = a[this.expando];if (void 0 !== d) {
	        if (void 0 !== b) {
	          r.isArray(b) ? b = b.map(r.camelCase) : (b = r.camelCase(b), b = b in d ? [b] : b.match(K) || []), c = b.length;while (c--) {
	            delete d[b[c]];
	          }
	        }(void 0 === b || r.isEmptyObject(d)) && (a.nodeType ? a[this.expando] = void 0 : delete a[this.expando]);
	      }
	    }, hasData: function hasData(a) {
	      var b = a[this.expando];return void 0 !== b && !r.isEmptyObject(b);
	    } };var V = new U(),
	      W = new U(),
	      X = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	      Y = /[A-Z]/g;function Z(a, b, c) {
	    var d;if (void 0 === c && 1 === a.nodeType) if (d = "data-" + b.replace(Y, "-$&").toLowerCase(), c = a.getAttribute(d), "string" == typeof c) {
	      try {
	        c = "true" === c || "false" !== c && ("null" === c ? null : +c + "" === c ? +c : X.test(c) ? JSON.parse(c) : c);
	      } catch (e) {}W.set(a, b, c);
	    } else c = void 0;return c;
	  }r.extend({ hasData: function hasData(a) {
	      return W.hasData(a) || V.hasData(a);
	    }, data: function data(a, b, c) {
	      return W.access(a, b, c);
	    }, removeData: function removeData(a, b) {
	      W.remove(a, b);
	    }, _data: function _data(a, b, c) {
	      return V.access(a, b, c);
	    }, _removeData: function _removeData(a, b) {
	      V.remove(a, b);
	    } }), r.fn.extend({ data: function data(a, b) {
	      var c,
	          d,
	          e,
	          f = this[0],
	          g = f && f.attributes;if (void 0 === a) {
	        if (this.length && (e = W.get(f), 1 === f.nodeType && !V.get(f, "hasDataAttrs"))) {
	          c = g.length;while (c--) {
	            g[c] && (d = g[c].name, 0 === d.indexOf("data-") && (d = r.camelCase(d.slice(5)), Z(f, d, e[d])));
	          }V.set(f, "hasDataAttrs", !0);
	        }return e;
	      }return "object" == (typeof a === "undefined" ? "undefined" : _typeof(a)) ? this.each(function () {
	        W.set(this, a);
	      }) : S(this, function (b) {
	        var c;if (f && void 0 === b) {
	          if (c = W.get(f, a), void 0 !== c) return c;if (c = Z(f, a), void 0 !== c) return c;
	        } else this.each(function () {
	          W.set(this, a, b);
	        });
	      }, null, b, arguments.length > 1, null, !0);
	    }, removeData: function removeData(a) {
	      return this.each(function () {
	        W.remove(this, a);
	      });
	    } }), r.extend({ queue: function queue(a, b, c) {
	      var d;if (a) return b = (b || "fx") + "queue", d = V.get(a, b), c && (!d || r.isArray(c) ? d = V.access(a, b, r.makeArray(c)) : d.push(c)), d || [];
	    }, dequeue: function dequeue(a, b) {
	      b = b || "fx";var c = r.queue(a, b),
	          d = c.length,
	          e = c.shift(),
	          f = r._queueHooks(a, b),
	          g = function g() {
	        r.dequeue(a, b);
	      };"inprogress" === e && (e = c.shift(), d--), e && ("fx" === b && c.unshift("inprogress"), delete f.stop, e.call(a, g, f)), !d && f && f.empty.fire();
	    }, _queueHooks: function _queueHooks(a, b) {
	      var c = b + "queueHooks";return V.get(a, c) || V.access(a, c, { empty: r.Callbacks("once memory").add(function () {
	          V.remove(a, [b + "queue", c]);
	        }) });
	    } }), r.fn.extend({ queue: function queue(a, b) {
	      var c = 2;return "string" != typeof a && (b = a, a = "fx", c--), arguments.length < c ? r.queue(this[0], a) : void 0 === b ? this : this.each(function () {
	        var c = r.queue(this, a, b);r._queueHooks(this, a), "fx" === a && "inprogress" !== c[0] && r.dequeue(this, a);
	      });
	    }, dequeue: function dequeue(a) {
	      return this.each(function () {
	        r.dequeue(this, a);
	      });
	    }, clearQueue: function clearQueue(a) {
	      return this.queue(a || "fx", []);
	    }, promise: function promise(a, b) {
	      var c,
	          d = 1,
	          e = r.Deferred(),
	          f = this,
	          g = this.length,
	          h = function h() {
	        --d || e.resolveWith(f, [f]);
	      };"string" != typeof a && (b = a, a = void 0), a = a || "fx";while (g--) {
	        c = V.get(f[g], a + "queueHooks"), c && c.empty && (d++, c.empty.add(h));
	      }return h(), e.promise(b);
	    } });var $ = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
	      _ = new RegExp("^(?:([+-])=|)(" + $ + ")([a-z%]*)$", "i"),
	      aa = ["Top", "Right", "Bottom", "Left"],
	      ba = function ba(a, b) {
	    return a = b || a, "none" === a.style.display || "" === a.style.display && r.contains(a.ownerDocument, a) && "none" === r.css(a, "display");
	  },
	      ca = function ca(a, b, c, d) {
	    var e,
	        f,
	        g = {};for (f in b) {
	      g[f] = a.style[f], a.style[f] = b[f];
	    }e = c.apply(a, d || []);for (f in b) {
	      a.style[f] = g[f];
	    }return e;
	  };function da(a, b, c, d) {
	    var e,
	        f = 1,
	        g = 20,
	        h = d ? function () {
	      return d.cur();
	    } : function () {
	      return r.css(a, b, "");
	    },
	        i = h(),
	        j = c && c[3] || (r.cssNumber[b] ? "" : "px"),
	        k = (r.cssNumber[b] || "px" !== j && +i) && _.exec(r.css(a, b));if (k && k[3] !== j) {
	      j = j || k[3], c = c || [], k = +i || 1;do {
	        f = f || ".5", k /= f, r.style(a, b, k + j);
	      } while (f !== (f = h() / i) && 1 !== f && --g);
	    }return c && (k = +k || +i || 0, e = c[1] ? k + (c[1] + 1) * c[2] : +c[2], d && (d.unit = j, d.start = k, d.end = e)), e;
	  }var ea = {};function fa(a) {
	    var b,
	        c = a.ownerDocument,
	        d = a.nodeName,
	        e = ea[d];return e ? e : (b = c.body.appendChild(c.createElement(d)), e = r.css(b, "display"), b.parentNode.removeChild(b), "none" === e && (e = "block"), ea[d] = e, e);
	  }function ga(a, b) {
	    for (var c, d, e = [], f = 0, g = a.length; f < g; f++) {
	      d = a[f], d.style && (c = d.style.display, b ? ("none" === c && (e[f] = V.get(d, "display") || null, e[f] || (d.style.display = "")), "" === d.style.display && ba(d) && (e[f] = fa(d))) : "none" !== c && (e[f] = "none", V.set(d, "display", c)));
	    }for (f = 0; f < g; f++) {
	      null != e[f] && (a[f].style.display = e[f]);
	    }return a;
	  }r.fn.extend({ show: function show() {
	      return ga(this, !0);
	    }, hide: function hide() {
	      return ga(this);
	    }, toggle: function toggle(a) {
	      return "boolean" == typeof a ? a ? this.show() : this.hide() : this.each(function () {
	        ba(this) ? r(this).show() : r(this).hide();
	      });
	    } });var ha = /^(?:checkbox|radio)$/i,
	      ia = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i,
	      ja = /^$|\/(?:java|ecma)script/i,
	      ka = { option: [1, "<select multiple='multiple'>", "</select>"], thead: [1, "<table>", "</table>"], col: [2, "<table><colgroup>", "</colgroup></table>"], tr: [2, "<table><tbody>", "</tbody></table>"], td: [3, "<table><tbody><tr>", "</tr></tbody></table>"], _default: [0, "", ""] };ka.optgroup = ka.option, ka.tbody = ka.tfoot = ka.colgroup = ka.caption = ka.thead, ka.th = ka.td;function la(a, b) {
	    var c = "undefined" != typeof a.getElementsByTagName ? a.getElementsByTagName(b || "*") : "undefined" != typeof a.querySelectorAll ? a.querySelectorAll(b || "*") : [];return void 0 === b || b && r.nodeName(a, b) ? r.merge([a], c) : c;
	  }function ma(a, b) {
	    for (var c = 0, d = a.length; c < d; c++) {
	      V.set(a[c], "globalEval", !b || V.get(b[c], "globalEval"));
	    }
	  }var na = /<|&#?\w+;/;function oa(a, b, c, d, e) {
	    for (var f, g, h, i, j, k, l = b.createDocumentFragment(), m = [], n = 0, o = a.length; n < o; n++) {
	      if (f = a[n], f || 0 === f) if ("object" === r.type(f)) r.merge(m, f.nodeType ? [f] : f);else if (na.test(f)) {
	        g = g || l.appendChild(b.createElement("div")), h = (ia.exec(f) || ["", ""])[1].toLowerCase(), i = ka[h] || ka._default, g.innerHTML = i[1] + r.htmlPrefilter(f) + i[2], k = i[0];while (k--) {
	          g = g.lastChild;
	        }r.merge(m, g.childNodes), g = l.firstChild, g.textContent = "";
	      } else m.push(b.createTextNode(f));
	    }l.textContent = "", n = 0;while (f = m[n++]) {
	      if (d && r.inArray(f, d) > -1) e && e.push(f);else if (j = r.contains(f.ownerDocument, f), g = la(l.appendChild(f), "script"), j && ma(g), c) {
	        k = 0;while (f = g[k++]) {
	          ja.test(f.type || "") && c.push(f);
	        }
	      }
	    }return l;
	  }!function () {
	    var a = d.createDocumentFragment(),
	        b = a.appendChild(d.createElement("div")),
	        c = d.createElement("input");c.setAttribute("type", "radio"), c.setAttribute("checked", "checked"), c.setAttribute("name", "t"), b.appendChild(c), o.checkClone = b.cloneNode(!0).cloneNode(!0).lastChild.checked, b.innerHTML = "<textarea>x</textarea>", o.noCloneChecked = !!b.cloneNode(!0).lastChild.defaultValue;
	  }();var pa = d.documentElement,
	      qa = /^key/,
	      ra = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	      sa = /^([^.]*)(?:\.(.+)|)/;function ta() {
	    return !0;
	  }function ua() {
	    return !1;
	  }function va() {
	    try {
	      return d.activeElement;
	    } catch (a) {}
	  }function wa(a, b, c, d, e, f) {
	    var g, h;if ("object" == (typeof b === "undefined" ? "undefined" : _typeof(b))) {
	      "string" != typeof c && (d = d || c, c = void 0);for (h in b) {
	        wa(a, h, c, d, b[h], f);
	      }return a;
	    }if (null == d && null == e ? (e = c, d = c = void 0) : null == e && ("string" == typeof c ? (e = d, d = void 0) : (e = d, d = c, c = void 0)), e === !1) e = ua;else if (!e) return a;return 1 === f && (g = e, e = function e(a) {
	      return r().off(a), g.apply(this, arguments);
	    }, e.guid = g.guid || (g.guid = r.guid++)), a.each(function () {
	      r.event.add(this, b, e, d, c);
	    });
	  }r.event = { global: {}, add: function add(a, b, c, d, e) {
	      var f,
	          g,
	          h,
	          i,
	          j,
	          k,
	          l,
	          m,
	          n,
	          o,
	          p,
	          q = V.get(a);if (q) {
	        c.handler && (f = c, c = f.handler, e = f.selector), e && r.find.matchesSelector(pa, e), c.guid || (c.guid = r.guid++), (i = q.events) || (i = q.events = {}), (g = q.handle) || (g = q.handle = function (b) {
	          return "undefined" != typeof r && r.event.triggered !== b.type ? r.event.dispatch.apply(a, arguments) : void 0;
	        }), b = (b || "").match(K) || [""], j = b.length;while (j--) {
	          h = sa.exec(b[j]) || [], n = p = h[1], o = (h[2] || "").split(".").sort(), n && (l = r.event.special[n] || {}, n = (e ? l.delegateType : l.bindType) || n, l = r.event.special[n] || {}, k = r.extend({ type: n, origType: p, data: d, handler: c, guid: c.guid, selector: e, needsContext: e && r.expr.match.needsContext.test(e), namespace: o.join(".") }, f), (m = i[n]) || (m = i[n] = [], m.delegateCount = 0, l.setup && l.setup.call(a, d, o, g) !== !1 || a.addEventListener && a.addEventListener(n, g)), l.add && (l.add.call(a, k), k.handler.guid || (k.handler.guid = c.guid)), e ? m.splice(m.delegateCount++, 0, k) : m.push(k), r.event.global[n] = !0);
	        }
	      }
	    }, remove: function remove(a, b, c, d, e) {
	      var f,
	          g,
	          h,
	          i,
	          j,
	          k,
	          l,
	          m,
	          n,
	          o,
	          p,
	          q = V.hasData(a) && V.get(a);if (q && (i = q.events)) {
	        b = (b || "").match(K) || [""], j = b.length;while (j--) {
	          if (h = sa.exec(b[j]) || [], n = p = h[1], o = (h[2] || "").split(".").sort(), n) {
	            l = r.event.special[n] || {}, n = (d ? l.delegateType : l.bindType) || n, m = i[n] || [], h = h[2] && new RegExp("(^|\\.)" + o.join("\\.(?:.*\\.|)") + "(\\.|$)"), g = f = m.length;while (f--) {
	              k = m[f], !e && p !== k.origType || c && c.guid !== k.guid || h && !h.test(k.namespace) || d && d !== k.selector && ("**" !== d || !k.selector) || (m.splice(f, 1), k.selector && m.delegateCount--, l.remove && l.remove.call(a, k));
	            }g && !m.length && (l.teardown && l.teardown.call(a, o, q.handle) !== !1 || r.removeEvent(a, n, q.handle), delete i[n]);
	          } else for (n in i) {
	            r.event.remove(a, n + b[j], c, d, !0);
	          }
	        }r.isEmptyObject(i) && V.remove(a, "handle events");
	      }
	    }, dispatch: function dispatch(a) {
	      var b = r.event.fix(a),
	          c,
	          d,
	          e,
	          f,
	          g,
	          h,
	          i = new Array(arguments.length),
	          j = (V.get(this, "events") || {})[b.type] || [],
	          k = r.event.special[b.type] || {};for (i[0] = b, c = 1; c < arguments.length; c++) {
	        i[c] = arguments[c];
	      }if (b.delegateTarget = this, !k.preDispatch || k.preDispatch.call(this, b) !== !1) {
	        h = r.event.handlers.call(this, b, j), c = 0;while ((f = h[c++]) && !b.isPropagationStopped()) {
	          b.currentTarget = f.elem, d = 0;while ((g = f.handlers[d++]) && !b.isImmediatePropagationStopped()) {
	            b.rnamespace && !b.rnamespace.test(g.namespace) || (b.handleObj = g, b.data = g.data, e = ((r.event.special[g.origType] || {}).handle || g.handler).apply(f.elem, i), void 0 !== e && (b.result = e) === !1 && (b.preventDefault(), b.stopPropagation()));
	          }
	        }return k.postDispatch && k.postDispatch.call(this, b), b.result;
	      }
	    }, handlers: function handlers(a, b) {
	      var c,
	          d,
	          e,
	          f,
	          g = [],
	          h = b.delegateCount,
	          i = a.target;if (h && i.nodeType && ("click" !== a.type || isNaN(a.button) || a.button < 1)) for (; i !== this; i = i.parentNode || this) {
	        if (1 === i.nodeType && (i.disabled !== !0 || "click" !== a.type)) {
	          for (d = [], c = 0; c < h; c++) {
	            f = b[c], e = f.selector + " ", void 0 === d[e] && (d[e] = f.needsContext ? r(e, this).index(i) > -1 : r.find(e, this, null, [i]).length), d[e] && d.push(f);
	          }d.length && g.push({ elem: i, handlers: d });
	        }
	      }return h < b.length && g.push({ elem: this, handlers: b.slice(h) }), g;
	    }, addProp: function addProp(a, b) {
	      Object.defineProperty(r.Event.prototype, a, { enumerable: !0, configurable: !0, get: r.isFunction(b) ? function () {
	          if (this.originalEvent) return b(this.originalEvent);
	        } : function () {
	          if (this.originalEvent) return this.originalEvent[a];
	        }, set: function set(b) {
	          Object.defineProperty(this, a, { enumerable: !0, configurable: !0, writable: !0, value: b });
	        } });
	    }, fix: function fix(a) {
	      return a[r.expando] ? a : new r.Event(a);
	    }, special: { load: { noBubble: !0 }, focus: { trigger: function trigger() {
	          if (this !== va() && this.focus) return this.focus(), !1;
	        }, delegateType: "focusin" }, blur: { trigger: function trigger() {
	          if (this === va() && this.blur) return this.blur(), !1;
	        }, delegateType: "focusout" }, click: { trigger: function trigger() {
	          if ("checkbox" === this.type && this.click && r.nodeName(this, "input")) return this.click(), !1;
	        }, _default: function _default(a) {
	          return r.nodeName(a.target, "a");
	        } }, beforeunload: { postDispatch: function postDispatch(a) {
	          void 0 !== a.result && a.originalEvent && (a.originalEvent.returnValue = a.result);
	        } } } }, r.removeEvent = function (a, b, c) {
	    a.removeEventListener && a.removeEventListener(b, c);
	  }, r.Event = function (a, b) {
	    return this instanceof r.Event ? (a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || void 0 === a.defaultPrevented && a.returnValue === !1 ? ta : ua, this.target = a.target && 3 === a.target.nodeType ? a.target.parentNode : a.target, this.currentTarget = a.currentTarget, this.relatedTarget = a.relatedTarget) : this.type = a, b && r.extend(this, b), this.timeStamp = a && a.timeStamp || r.now(), void (this[r.expando] = !0)) : new r.Event(a, b);
	  }, r.Event.prototype = { constructor: r.Event, isDefaultPrevented: ua, isPropagationStopped: ua, isImmediatePropagationStopped: ua, isSimulated: !1, preventDefault: function preventDefault() {
	      var a = this.originalEvent;this.isDefaultPrevented = ta, a && !this.isSimulated && a.preventDefault();
	    }, stopPropagation: function stopPropagation() {
	      var a = this.originalEvent;this.isPropagationStopped = ta, a && !this.isSimulated && a.stopPropagation();
	    }, stopImmediatePropagation: function stopImmediatePropagation() {
	      var a = this.originalEvent;this.isImmediatePropagationStopped = ta, a && !this.isSimulated && a.stopImmediatePropagation(), this.stopPropagation();
	    } }, r.each({ altKey: !0, bubbles: !0, cancelable: !0, changedTouches: !0, ctrlKey: !0, detail: !0, eventPhase: !0, metaKey: !0, pageX: !0, pageY: !0, shiftKey: !0, view: !0, "char": !0, charCode: !0, key: !0, keyCode: !0, button: !0, buttons: !0, clientX: !0, clientY: !0, offsetX: !0, offsetY: !0, pointerId: !0, pointerType: !0, screenX: !0, screenY: !0, targetTouches: !0, toElement: !0, touches: !0, which: function which(a) {
	      var b = a.button;return null == a.which && qa.test(a.type) ? null != a.charCode ? a.charCode : a.keyCode : !a.which && void 0 !== b && ra.test(a.type) ? 1 & b ? 1 : 2 & b ? 3 : 4 & b ? 2 : 0 : a.which;
	    } }, r.event.addProp), r.each({ mouseenter: "mouseover", mouseleave: "mouseout", pointerenter: "pointerover", pointerleave: "pointerout" }, function (a, b) {
	    r.event.special[a] = { delegateType: b, bindType: b, handle: function handle(a) {
	        var c,
	            d = this,
	            e = a.relatedTarget,
	            f = a.handleObj;return e && (e === d || r.contains(d, e)) || (a.type = f.origType, c = f.handler.apply(this, arguments), a.type = b), c;
	      } };
	  }), r.fn.extend({ on: function on(a, b, c, d) {
	      return wa(this, a, b, c, d);
	    }, one: function one(a, b, c, d) {
	      return wa(this, a, b, c, d, 1);
	    }, off: function off(a, b, c) {
	      var d, e;if (a && a.preventDefault && a.handleObj) return d = a.handleObj, r(a.delegateTarget).off(d.namespace ? d.origType + "." + d.namespace : d.origType, d.selector, d.handler), this;if ("object" == (typeof a === "undefined" ? "undefined" : _typeof(a))) {
	        for (e in a) {
	          this.off(e, b, a[e]);
	        }return this;
	      }return b !== !1 && "function" != typeof b || (c = b, b = void 0), c === !1 && (c = ua), this.each(function () {
	        r.event.remove(this, a, c, b);
	      });
	    } });var xa = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
	      ya = /<script|<style|<link/i,
	      za = /checked\s*(?:[^=]|=\s*.checked.)/i,
	      Aa = /^true\/(.*)/,
	      Ba = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;function Ca(a, b) {
	    return r.nodeName(a, "table") && r.nodeName(11 !== b.nodeType ? b : b.firstChild, "tr") ? a.getElementsByTagName("tbody")[0] || a : a;
	  }function Da(a) {
	    return a.type = (null !== a.getAttribute("type")) + "/" + a.type, a;
	  }function Ea(a) {
	    var b = Aa.exec(a.type);return b ? a.type = b[1] : a.removeAttribute("type"), a;
	  }function Fa(a, b) {
	    var c, d, e, f, g, h, i, j;if (1 === b.nodeType) {
	      if (V.hasData(a) && (f = V.access(a), g = V.set(b, f), j = f.events)) {
	        delete g.handle, g.events = {};for (e in j) {
	          for (c = 0, d = j[e].length; c < d; c++) {
	            r.event.add(b, e, j[e][c]);
	          }
	        }
	      }W.hasData(a) && (h = W.access(a), i = r.extend({}, h), W.set(b, i));
	    }
	  }function Ga(a, b) {
	    var c = b.nodeName.toLowerCase();"input" === c && ha.test(a.type) ? b.checked = a.checked : "input" !== c && "textarea" !== c || (b.defaultValue = a.defaultValue);
	  }function Ha(a, b, c, d) {
	    b = g.apply([], b);var e,
	        f,
	        h,
	        i,
	        j,
	        k,
	        l = 0,
	        m = a.length,
	        n = m - 1,
	        q = b[0],
	        s = r.isFunction(q);if (s || m > 1 && "string" == typeof q && !o.checkClone && za.test(q)) return a.each(function (e) {
	      var f = a.eq(e);s && (b[0] = q.call(this, e, f.html())), Ha(f, b, c, d);
	    });if (m && (e = oa(b, a[0].ownerDocument, !1, a, d), f = e.firstChild, 1 === e.childNodes.length && (e = f), f || d)) {
	      for (h = r.map(la(e, "script"), Da), i = h.length; l < m; l++) {
	        j = e, l !== n && (j = r.clone(j, !0, !0), i && r.merge(h, la(j, "script"))), c.call(a[l], j, l);
	      }if (i) for (k = h[h.length - 1].ownerDocument, r.map(h, Ea), l = 0; l < i; l++) {
	        j = h[l], ja.test(j.type || "") && !V.access(j, "globalEval") && r.contains(k, j) && (j.src ? r._evalUrl && r._evalUrl(j.src) : p(j.textContent.replace(Ba, ""), k));
	      }
	    }return a;
	  }function Ia(a, b, c) {
	    for (var d, e = b ? r.filter(b, a) : a, f = 0; null != (d = e[f]); f++) {
	      c || 1 !== d.nodeType || r.cleanData(la(d)), d.parentNode && (c && r.contains(d.ownerDocument, d) && ma(la(d, "script")), d.parentNode.removeChild(d));
	    }return a;
	  }r.extend({ htmlPrefilter: function htmlPrefilter(a) {
	      return a.replace(xa, "<$1></$2>");
	    }, clone: function clone(a, b, c) {
	      var d,
	          e,
	          f,
	          g,
	          h = a.cloneNode(!0),
	          i = r.contains(a.ownerDocument, a);if (!(o.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || r.isXMLDoc(a))) for (g = la(h), f = la(a), d = 0, e = f.length; d < e; d++) {
	        Ga(f[d], g[d]);
	      }if (b) if (c) for (f = f || la(a), g = g || la(h), d = 0, e = f.length; d < e; d++) {
	        Fa(f[d], g[d]);
	      } else Fa(a, h);return g = la(h, "script"), g.length > 0 && ma(g, !i && la(a, "script")), h;
	    }, cleanData: function cleanData(a) {
	      for (var b, c, d, e = r.event.special, f = 0; void 0 !== (c = a[f]); f++) {
	        if (T(c)) {
	          if (b = c[V.expando]) {
	            if (b.events) for (d in b.events) {
	              e[d] ? r.event.remove(c, d) : r.removeEvent(c, d, b.handle);
	            }c[V.expando] = void 0;
	          }c[W.expando] && (c[W.expando] = void 0);
	        }
	      }
	    } }), r.fn.extend({ detach: function detach(a) {
	      return Ia(this, a, !0);
	    }, remove: function remove(a) {
	      return Ia(this, a);
	    }, text: function text(a) {
	      return S(this, function (a) {
	        return void 0 === a ? r.text(this) : this.empty().each(function () {
	          1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = a);
	        });
	      }, null, a, arguments.length);
	    }, append: function append() {
	      return Ha(this, arguments, function (a) {
	        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
	          var b = Ca(this, a);b.appendChild(a);
	        }
	      });
	    }, prepend: function prepend() {
	      return Ha(this, arguments, function (a) {
	        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
	          var b = Ca(this, a);b.insertBefore(a, b.firstChild);
	        }
	      });
	    }, before: function before() {
	      return Ha(this, arguments, function (a) {
	        this.parentNode && this.parentNode.insertBefore(a, this);
	      });
	    }, after: function after() {
	      return Ha(this, arguments, function (a) {
	        this.parentNode && this.parentNode.insertBefore(a, this.nextSibling);
	      });
	    }, empty: function empty() {
	      for (var a, b = 0; null != (a = this[b]); b++) {
	        1 === a.nodeType && (r.cleanData(la(a, !1)), a.textContent = "");
	      }return this;
	    }, clone: function clone(a, b) {
	      return a = null != a && a, b = null == b ? a : b, this.map(function () {
	        return r.clone(this, a, b);
	      });
	    }, html: function html(a) {
	      return S(this, function (a) {
	        var b = this[0] || {},
	            c = 0,
	            d = this.length;if (void 0 === a && 1 === b.nodeType) return b.innerHTML;if ("string" == typeof a && !ya.test(a) && !ka[(ia.exec(a) || ["", ""])[1].toLowerCase()]) {
	          a = r.htmlPrefilter(a);try {
	            for (; c < d; c++) {
	              b = this[c] || {}, 1 === b.nodeType && (r.cleanData(la(b, !1)), b.innerHTML = a);
	            }b = 0;
	          } catch (e) {}
	        }b && this.empty().append(a);
	      }, null, a, arguments.length);
	    }, replaceWith: function replaceWith() {
	      var a = [];return Ha(this, arguments, function (b) {
	        var c = this.parentNode;r.inArray(this, a) < 0 && (r.cleanData(la(this)), c && c.replaceChild(b, this));
	      }, a);
	    } }), r.each({ appendTo: "append", prependTo: "prepend", insertBefore: "before", insertAfter: "after", replaceAll: "replaceWith" }, function (a, b) {
	    r.fn[a] = function (a) {
	      for (var c, d = [], e = r(a), f = e.length - 1, g = 0; g <= f; g++) {
	        c = g === f ? this : this.clone(!0), r(e[g])[b](c), h.apply(d, c.get());
	      }return this.pushStack(d);
	    };
	  });var Ja = /^margin/,
	      Ka = new RegExp("^(" + $ + ")(?!px)[a-z%]+$", "i"),
	      La = function La(b) {
	    var c = b.ownerDocument.defaultView;return c && c.opener || (c = a), c.getComputedStyle(b);
	  };!function () {
	    function b() {
	      if (i) {
	        i.style.cssText = "box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%", i.innerHTML = "", pa.appendChild(h);var b = a.getComputedStyle(i);c = "1%" !== b.top, g = "2px" === b.marginLeft, e = "4px" === b.width, i.style.marginRight = "50%", f = "4px" === b.marginRight, pa.removeChild(h), i = null;
	      }
	    }var c,
	        e,
	        f,
	        g,
	        h = d.createElement("div"),
	        i = d.createElement("div");i.style && (i.style.backgroundClip = "content-box", i.cloneNode(!0).style.backgroundClip = "", o.clearCloneStyle = "content-box" === i.style.backgroundClip, h.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute", h.appendChild(i), r.extend(o, { pixelPosition: function pixelPosition() {
	        return b(), c;
	      }, boxSizingReliable: function boxSizingReliable() {
	        return b(), e;
	      }, pixelMarginRight: function pixelMarginRight() {
	        return b(), f;
	      }, reliableMarginLeft: function reliableMarginLeft() {
	        return b(), g;
	      } }));
	  }();function Ma(a, b, c) {
	    var d,
	        e,
	        f,
	        g,
	        h = a.style;return c = c || La(a), c && (g = c.getPropertyValue(b) || c[b], "" !== g || r.contains(a.ownerDocument, a) || (g = r.style(a, b)), !o.pixelMarginRight() && Ka.test(g) && Ja.test(b) && (d = h.width, e = h.minWidth, f = h.maxWidth, h.minWidth = h.maxWidth = h.width = g, g = c.width, h.width = d, h.minWidth = e, h.maxWidth = f)), void 0 !== g ? g + "" : g;
	  }function Na(a, b) {
	    return { get: function get() {
	        return a() ? void delete this.get : (this.get = b).apply(this, arguments);
	      } };
	  }var Oa = /^(none|table(?!-c[ea]).+)/,
	      Pa = { position: "absolute", visibility: "hidden", display: "block" },
	      Qa = { letterSpacing: "0", fontWeight: "400" },
	      Ra = ["Webkit", "Moz", "ms"],
	      Sa = d.createElement("div").style;function Ta(a) {
	    if (a in Sa) return a;var b = a[0].toUpperCase() + a.slice(1),
	        c = Ra.length;while (c--) {
	      if (a = Ra[c] + b, a in Sa) return a;
	    }
	  }function Ua(a, b, c) {
	    var d = _.exec(b);return d ? Math.max(0, d[2] - (c || 0)) + (d[3] || "px") : b;
	  }function Va(a, b, c, d, e) {
	    for (var f = c === (d ? "border" : "content") ? 4 : "width" === b ? 1 : 0, g = 0; f < 4; f += 2) {
	      "margin" === c && (g += r.css(a, c + aa[f], !0, e)), d ? ("content" === c && (g -= r.css(a, "padding" + aa[f], !0, e)), "margin" !== c && (g -= r.css(a, "border" + aa[f] + "Width", !0, e))) : (g += r.css(a, "padding" + aa[f], !0, e), "padding" !== c && (g += r.css(a, "border" + aa[f] + "Width", !0, e)));
	    }return g;
	  }function Wa(a, b, c) {
	    var d,
	        e = !0,
	        f = La(a),
	        g = "border-box" === r.css(a, "boxSizing", !1, f);if (a.getClientRects().length && (d = a.getBoundingClientRect()[b]), d <= 0 || null == d) {
	      if (d = Ma(a, b, f), (d < 0 || null == d) && (d = a.style[b]), Ka.test(d)) return d;e = g && (o.boxSizingReliable() || d === a.style[b]), d = parseFloat(d) || 0;
	    }return d + Va(a, b, c || (g ? "border" : "content"), e, f) + "px";
	  }r.extend({ cssHooks: { opacity: { get: function get(a, b) {
	          if (b) {
	            var c = Ma(a, "opacity");return "" === c ? "1" : c;
	          }
	        } } }, cssNumber: { animationIterationCount: !0, columnCount: !0, fillOpacity: !0, flexGrow: !0, flexShrink: !0, fontWeight: !0, lineHeight: !0, opacity: !0, order: !0, orphans: !0, widows: !0, zIndex: !0, zoom: !0 }, cssProps: { "float": "cssFloat" }, style: function style(a, b, c, d) {
	      if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
	        var e,
	            f,
	            g,
	            h = r.camelCase(b),
	            i = a.style;return b = r.cssProps[h] || (r.cssProps[h] = Ta(h) || h), g = r.cssHooks[b] || r.cssHooks[h], void 0 === c ? g && "get" in g && void 0 !== (e = g.get(a, !1, d)) ? e : i[b] : (f = typeof c === "undefined" ? "undefined" : _typeof(c), "string" === f && (e = _.exec(c)) && e[1] && (c = da(a, b, e), f = "number"), null != c && c === c && ("number" === f && (c += e && e[3] || (r.cssNumber[h] ? "" : "px")), o.clearCloneStyle || "" !== c || 0 !== b.indexOf("background") || (i[b] = "inherit"), g && "set" in g && void 0 === (c = g.set(a, c, d)) || (i[b] = c)), void 0);
	      }
	    }, css: function css(a, b, c, d) {
	      var e,
	          f,
	          g,
	          h = r.camelCase(b);return b = r.cssProps[h] || (r.cssProps[h] = Ta(h) || h), g = r.cssHooks[b] || r.cssHooks[h], g && "get" in g && (e = g.get(a, !0, c)), void 0 === e && (e = Ma(a, b, d)), "normal" === e && b in Qa && (e = Qa[b]), "" === c || c ? (f = parseFloat(e), c === !0 || isFinite(f) ? f || 0 : e) : e;
	    } }), r.each(["height", "width"], function (a, b) {
	    r.cssHooks[b] = { get: function get(a, c, d) {
	        if (c) return !Oa.test(r.css(a, "display")) || a.getClientRects().length && a.getBoundingClientRect().width ? Wa(a, b, d) : ca(a, Pa, function () {
	          return Wa(a, b, d);
	        });
	      }, set: function set(a, c, d) {
	        var e,
	            f = d && La(a),
	            g = d && Va(a, b, d, "border-box" === r.css(a, "boxSizing", !1, f), f);return g && (e = _.exec(c)) && "px" !== (e[3] || "px") && (a.style[b] = c, c = r.css(a, b)), Ua(a, c, g);
	      } };
	  }), r.cssHooks.marginLeft = Na(o.reliableMarginLeft, function (a, b) {
	    if (b) return (parseFloat(Ma(a, "marginLeft")) || a.getBoundingClientRect().left - ca(a, { marginLeft: 0 }, function () {
	      return a.getBoundingClientRect().left;
	    })) + "px";
	  }), r.each({ margin: "", padding: "", border: "Width" }, function (a, b) {
	    r.cssHooks[a + b] = { expand: function expand(c) {
	        for (var d = 0, e = {}, f = "string" == typeof c ? c.split(" ") : [c]; d < 4; d++) {
	          e[a + aa[d] + b] = f[d] || f[d - 2] || f[0];
	        }return e;
	      } }, Ja.test(a) || (r.cssHooks[a + b].set = Ua);
	  }), r.fn.extend({ css: function css(a, b) {
	      return S(this, function (a, b, c) {
	        var d,
	            e,
	            f = {},
	            g = 0;if (r.isArray(b)) {
	          for (d = La(a), e = b.length; g < e; g++) {
	            f[b[g]] = r.css(a, b[g], !1, d);
	          }return f;
	        }return void 0 !== c ? r.style(a, b, c) : r.css(a, b);
	      }, a, b, arguments.length > 1);
	    } });function Xa(a, b, c, d, e) {
	    return new Xa.prototype.init(a, b, c, d, e);
	  }r.Tween = Xa, Xa.prototype = { constructor: Xa, init: function init(a, b, c, d, e, f) {
	      this.elem = a, this.prop = c, this.easing = e || r.easing._default, this.options = b, this.start = this.now = this.cur(), this.end = d, this.unit = f || (r.cssNumber[c] ? "" : "px");
	    }, cur: function cur() {
	      var a = Xa.propHooks[this.prop];return a && a.get ? a.get(this) : Xa.propHooks._default.get(this);
	    }, run: function run(a) {
	      var b,
	          c = Xa.propHooks[this.prop];return this.options.duration ? this.pos = b = r.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : this.pos = b = a, this.now = (this.end - this.start) * b + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), c && c.set ? c.set(this) : Xa.propHooks._default.set(this), this;
	    } }, Xa.prototype.init.prototype = Xa.prototype, Xa.propHooks = { _default: { get: function get(a) {
	        var b;return 1 !== a.elem.nodeType || null != a.elem[a.prop] && null == a.elem.style[a.prop] ? a.elem[a.prop] : (b = r.css(a.elem, a.prop, ""), b && "auto" !== b ? b : 0);
	      }, set: function set(a) {
	        r.fx.step[a.prop] ? r.fx.step[a.prop](a) : 1 !== a.elem.nodeType || null == a.elem.style[r.cssProps[a.prop]] && !r.cssHooks[a.prop] ? a.elem[a.prop] = a.now : r.style(a.elem, a.prop, a.now + a.unit);
	      } } }, Xa.propHooks.scrollTop = Xa.propHooks.scrollLeft = { set: function set(a) {
	      a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now);
	    } }, r.easing = { linear: function linear(a) {
	      return a;
	    }, swing: function swing(a) {
	      return .5 - Math.cos(a * Math.PI) / 2;
	    }, _default: "swing" }, r.fx = Xa.prototype.init, r.fx.step = {};var Ya,
	      Za,
	      $a = /^(?:toggle|show|hide)$/,
	      _a = /queueHooks$/;function ab() {
	    Za && (a.requestAnimationFrame(ab), r.fx.tick());
	  }function bb() {
	    return a.setTimeout(function () {
	      Ya = void 0;
	    }), Ya = r.now();
	  }function cb(a, b) {
	    var c,
	        d = 0,
	        e = { height: a };for (b = b ? 1 : 0; d < 4; d += 2 - b) {
	      c = aa[d], e["margin" + c] = e["padding" + c] = a;
	    }return b && (e.opacity = e.width = a), e;
	  }function db(a, b, c) {
	    for (var d, e = (gb.tweeners[b] || []).concat(gb.tweeners["*"]), f = 0, g = e.length; f < g; f++) {
	      if (d = e[f].call(c, b, a)) return d;
	    }
	  }function eb(a, b, c) {
	    var d,
	        e,
	        f,
	        g,
	        h,
	        i,
	        j,
	        k,
	        l = "width" in b || "height" in b,
	        m = this,
	        n = {},
	        o = a.style,
	        p = a.nodeType && ba(a),
	        q = V.get(a, "fxshow");c.queue || (g = r._queueHooks(a, "fx"), null == g.unqueued && (g.unqueued = 0, h = g.empty.fire, g.empty.fire = function () {
	      g.unqueued || h();
	    }), g.unqueued++, m.always(function () {
	      m.always(function () {
	        g.unqueued--, r.queue(a, "fx").length || g.empty.fire();
	      });
	    }));for (d in b) {
	      if (e = b[d], $a.test(e)) {
	        if (delete b[d], f = f || "toggle" === e, e === (p ? "hide" : "show")) {
	          if ("show" !== e || !q || void 0 === q[d]) continue;p = !0;
	        }n[d] = q && q[d] || r.style(a, d);
	      }
	    }if (i = !r.isEmptyObject(b), i || !r.isEmptyObject(n)) {
	      l && 1 === a.nodeType && (c.overflow = [o.overflow, o.overflowX, o.overflowY], j = q && q.display, null == j && (j = V.get(a, "display")), k = r.css(a, "display"), "none" === k && (j ? k = j : (ga([a], !0), j = a.style.display || j, k = r.css(a, "display"), ga([a]))), ("inline" === k || "inline-block" === k && null != j) && "none" === r.css(a, "float") && (i || (m.done(function () {
	        o.display = j;
	      }), null == j && (k = o.display, j = "none" === k ? "" : k)), o.display = "inline-block")), c.overflow && (o.overflow = "hidden", m.always(function () {
	        o.overflow = c.overflow[0], o.overflowX = c.overflow[1], o.overflowY = c.overflow[2];
	      })), i = !1;for (d in n) {
	        i || (q ? "hidden" in q && (p = q.hidden) : q = V.access(a, "fxshow", { display: j }), f && (q.hidden = !p), p && ga([a], !0), m.done(function () {
	          p || ga([a]), V.remove(a, "fxshow");for (d in n) {
	            r.style(a, d, n[d]);
	          }
	        })), i = db(p ? q[d] : 0, d, m), d in q || (q[d] = i.start, p && (i.end = i.start, i.start = 0));
	      }
	    }
	  }function fb(a, b) {
	    var c, d, e, f, g;for (c in a) {
	      if (d = r.camelCase(c), e = b[d], f = a[c], r.isArray(f) && (e = f[1], f = a[c] = f[0]), c !== d && (a[d] = f, delete a[c]), g = r.cssHooks[d], g && "expand" in g) {
	        f = g.expand(f), delete a[d];for (c in f) {
	          c in a || (a[c] = f[c], b[c] = e);
	        }
	      } else b[d] = e;
	    }
	  }function gb(a, b, c) {
	    var d,
	        e,
	        f = 0,
	        g = gb.prefilters.length,
	        h = r.Deferred().always(function () {
	      delete i.elem;
	    }),
	        i = function i() {
	      if (e) return !1;for (var b = Ya || bb(), c = Math.max(0, j.startTime + j.duration - b), d = c / j.duration || 0, f = 1 - d, g = 0, i = j.tweens.length; g < i; g++) {
	        j.tweens[g].run(f);
	      }return h.notifyWith(a, [j, f, c]), f < 1 && i ? c : (h.resolveWith(a, [j]), !1);
	    },
	        j = h.promise({ elem: a, props: r.extend({}, b), opts: r.extend(!0, { specialEasing: {}, easing: r.easing._default }, c), originalProperties: b, originalOptions: c, startTime: Ya || bb(), duration: c.duration, tweens: [], createTween: function createTween(b, c) {
	        var d = r.Tween(a, j.opts, b, c, j.opts.specialEasing[b] || j.opts.easing);return j.tweens.push(d), d;
	      }, stop: function stop(b) {
	        var c = 0,
	            d = b ? j.tweens.length : 0;if (e) return this;for (e = !0; c < d; c++) {
	          j.tweens[c].run(1);
	        }return b ? (h.notifyWith(a, [j, 1, 0]), h.resolveWith(a, [j, b])) : h.rejectWith(a, [j, b]), this;
	      } }),
	        k = j.props;for (fb(k, j.opts.specialEasing); f < g; f++) {
	      if (d = gb.prefilters[f].call(j, a, k, j.opts)) return r.isFunction(d.stop) && (r._queueHooks(j.elem, j.opts.queue).stop = r.proxy(d.stop, d)), d;
	    }return r.map(k, db, j), r.isFunction(j.opts.start) && j.opts.start.call(a, j), r.fx.timer(r.extend(i, { elem: a, anim: j, queue: j.opts.queue })), j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always);
	  }r.Animation = r.extend(gb, { tweeners: { "*": [function (a, b) {
	        var c = this.createTween(a, b);return da(c.elem, a, _.exec(b), c), c;
	      }] }, tweener: function tweener(a, b) {
	      r.isFunction(a) ? (b = a, a = ["*"]) : a = a.match(K);for (var c, d = 0, e = a.length; d < e; d++) {
	        c = a[d], gb.tweeners[c] = gb.tweeners[c] || [], gb.tweeners[c].unshift(b);
	      }
	    }, prefilters: [eb], prefilter: function prefilter(a, b) {
	      b ? gb.prefilters.unshift(a) : gb.prefilters.push(a);
	    } }), r.speed = function (a, b, c) {
	    var e = a && "object" == (typeof a === "undefined" ? "undefined" : _typeof(a)) ? r.extend({}, a) : { complete: c || !c && b || r.isFunction(a) && a, duration: a, easing: c && b || b && !r.isFunction(b) && b };return r.fx.off || d.hidden ? e.duration = 0 : e.duration = "number" == typeof e.duration ? e.duration : e.duration in r.fx.speeds ? r.fx.speeds[e.duration] : r.fx.speeds._default, null != e.queue && e.queue !== !0 || (e.queue = "fx"), e.old = e.complete, e.complete = function () {
	      r.isFunction(e.old) && e.old.call(this), e.queue && r.dequeue(this, e.queue);
	    }, e;
	  }, r.fn.extend({ fadeTo: function fadeTo(a, b, c, d) {
	      return this.filter(ba).css("opacity", 0).show().end().animate({ opacity: b }, a, c, d);
	    }, animate: function animate(a, b, c, d) {
	      var e = r.isEmptyObject(a),
	          f = r.speed(b, c, d),
	          g = function g() {
	        var b = gb(this, r.extend({}, a), f);(e || V.get(this, "finish")) && b.stop(!0);
	      };return g.finish = g, e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g);
	    }, stop: function stop(a, b, c) {
	      var d = function d(a) {
	        var b = a.stop;delete a.stop, b(c);
	      };return "string" != typeof a && (c = b, b = a, a = void 0), b && a !== !1 && this.queue(a || "fx", []), this.each(function () {
	        var b = !0,
	            e = null != a && a + "queueHooks",
	            f = r.timers,
	            g = V.get(this);if (e) g[e] && g[e].stop && d(g[e]);else for (e in g) {
	          g[e] && g[e].stop && _a.test(e) && d(g[e]);
	        }for (e = f.length; e--;) {
	          f[e].elem !== this || null != a && f[e].queue !== a || (f[e].anim.stop(c), b = !1, f.splice(e, 1));
	        }!b && c || r.dequeue(this, a);
	      });
	    }, finish: function finish(a) {
	      return a !== !1 && (a = a || "fx"), this.each(function () {
	        var b,
	            c = V.get(this),
	            d = c[a + "queue"],
	            e = c[a + "queueHooks"],
	            f = r.timers,
	            g = d ? d.length : 0;for (c.finish = !0, r.queue(this, a, []), e && e.stop && e.stop.call(this, !0), b = f.length; b--;) {
	          f[b].elem === this && f[b].queue === a && (f[b].anim.stop(!0), f.splice(b, 1));
	        }for (b = 0; b < g; b++) {
	          d[b] && d[b].finish && d[b].finish.call(this);
	        }delete c.finish;
	      });
	    } }), r.each(["toggle", "show", "hide"], function (a, b) {
	    var c = r.fn[b];r.fn[b] = function (a, d, e) {
	      return null == a || "boolean" == typeof a ? c.apply(this, arguments) : this.animate(cb(b, !0), a, d, e);
	    };
	  }), r.each({ slideDown: cb("show"), slideUp: cb("hide"), slideToggle: cb("toggle"), fadeIn: { opacity: "show" }, fadeOut: { opacity: "hide" }, fadeToggle: { opacity: "toggle" } }, function (a, b) {
	    r.fn[a] = function (a, c, d) {
	      return this.animate(b, a, c, d);
	    };
	  }), r.timers = [], r.fx.tick = function () {
	    var a,
	        b = 0,
	        c = r.timers;for (Ya = r.now(); b < c.length; b++) {
	      a = c[b], a() || c[b] !== a || c.splice(b--, 1);
	    }c.length || r.fx.stop(), Ya = void 0;
	  }, r.fx.timer = function (a) {
	    r.timers.push(a), a() ? r.fx.start() : r.timers.pop();
	  }, r.fx.interval = 13, r.fx.start = function () {
	    Za || (Za = a.requestAnimationFrame ? a.requestAnimationFrame(ab) : a.setInterval(r.fx.tick, r.fx.interval));
	  }, r.fx.stop = function () {
	    a.cancelAnimationFrame ? a.cancelAnimationFrame(Za) : a.clearInterval(Za), Za = null;
	  }, r.fx.speeds = { slow: 600, fast: 200, _default: 400 }, r.fn.delay = function (b, c) {
	    return b = r.fx ? r.fx.speeds[b] || b : b, c = c || "fx", this.queue(c, function (c, d) {
	      var e = a.setTimeout(c, b);d.stop = function () {
	        a.clearTimeout(e);
	      };
	    });
	  }, function () {
	    var a = d.createElement("input"),
	        b = d.createElement("select"),
	        c = b.appendChild(d.createElement("option"));a.type = "checkbox", o.checkOn = "" !== a.value, o.optSelected = c.selected, a = d.createElement("input"), a.value = "t", a.type = "radio", o.radioValue = "t" === a.value;
	  }();var hb,
	      ib = r.expr.attrHandle;r.fn.extend({ attr: function attr(a, b) {
	      return S(this, r.attr, a, b, arguments.length > 1);
	    }, removeAttr: function removeAttr(a) {
	      return this.each(function () {
	        r.removeAttr(this, a);
	      });
	    } }), r.extend({ attr: function attr(a, b, c) {
	      var d,
	          e,
	          f = a.nodeType;if (3 !== f && 8 !== f && 2 !== f) return "undefined" == typeof a.getAttribute ? r.prop(a, b, c) : (1 === f && r.isXMLDoc(a) || (e = r.attrHooks[b.toLowerCase()] || (r.expr.match.bool.test(b) ? hb : void 0)), void 0 !== c ? null === c ? void r.removeAttr(a, b) : e && "set" in e && void 0 !== (d = e.set(a, c, b)) ? d : (a.setAttribute(b, c + ""), c) : e && "get" in e && null !== (d = e.get(a, b)) ? d : (d = r.find.attr(a, b), null == d ? void 0 : d));
	    }, attrHooks: { type: { set: function set(a, b) {
	          if (!o.radioValue && "radio" === b && r.nodeName(a, "input")) {
	            var c = a.value;return a.setAttribute("type", b), c && (a.value = c), b;
	          }
	        } } }, removeAttr: function removeAttr(a, b) {
	      var c,
	          d = 0,
	          e = b && b.match(K);
	      if (e && 1 === a.nodeType) while (c = e[d++]) {
	        a.removeAttribute(c);
	      }
	    } }), hb = { set: function set(a, b, c) {
	      return b === !1 ? r.removeAttr(a, c) : a.setAttribute(c, c), c;
	    } }, r.each(r.expr.match.bool.source.match(/\w+/g), function (a, b) {
	    var c = ib[b] || r.find.attr;ib[b] = function (a, b, d) {
	      var e,
	          f,
	          g = b.toLowerCase();return d || (f = ib[g], ib[g] = e, e = null != c(a, b, d) ? g : null, ib[g] = f), e;
	    };
	  });var jb = /^(?:input|select|textarea|button)$/i,
	      kb = /^(?:a|area)$/i;r.fn.extend({ prop: function prop(a, b) {
	      return S(this, r.prop, a, b, arguments.length > 1);
	    }, removeProp: function removeProp(a) {
	      return this.each(function () {
	        delete this[r.propFix[a] || a];
	      });
	    } }), r.extend({ prop: function prop(a, b, c) {
	      var d,
	          e,
	          f = a.nodeType;if (3 !== f && 8 !== f && 2 !== f) return 1 === f && r.isXMLDoc(a) || (b = r.propFix[b] || b, e = r.propHooks[b]), void 0 !== c ? e && "set" in e && void 0 !== (d = e.set(a, c, b)) ? d : a[b] = c : e && "get" in e && null !== (d = e.get(a, b)) ? d : a[b];
	    }, propHooks: { tabIndex: { get: function get(a) {
	          var b = r.find.attr(a, "tabindex");return b ? parseInt(b, 10) : jb.test(a.nodeName) || kb.test(a.nodeName) && a.href ? 0 : -1;
	        } } }, propFix: { "for": "htmlFor", "class": "className" } }), o.optSelected || (r.propHooks.selected = { get: function get(a) {
	      var b = a.parentNode;return b && b.parentNode && b.parentNode.selectedIndex, null;
	    }, set: function set(a) {
	      var b = a.parentNode;b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex);
	    } }), r.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
	    r.propFix[this.toLowerCase()] = this;
	  });var lb = /[\t\r\n\f]/g;function mb(a) {
	    return a.getAttribute && a.getAttribute("class") || "";
	  }r.fn.extend({ addClass: function addClass(a) {
	      var b,
	          c,
	          d,
	          e,
	          f,
	          g,
	          h,
	          i = 0;if (r.isFunction(a)) return this.each(function (b) {
	        r(this).addClass(a.call(this, b, mb(this)));
	      });if ("string" == typeof a && a) {
	        b = a.match(K) || [];while (c = this[i++]) {
	          if (e = mb(c), d = 1 === c.nodeType && (" " + e + " ").replace(lb, " ")) {
	            g = 0;while (f = b[g++]) {
	              d.indexOf(" " + f + " ") < 0 && (d += f + " ");
	            }h = r.trim(d), e !== h && c.setAttribute("class", h);
	          }
	        }
	      }return this;
	    }, removeClass: function removeClass(a) {
	      var b,
	          c,
	          d,
	          e,
	          f,
	          g,
	          h,
	          i = 0;if (r.isFunction(a)) return this.each(function (b) {
	        r(this).removeClass(a.call(this, b, mb(this)));
	      });if (!arguments.length) return this.attr("class", "");if ("string" == typeof a && a) {
	        b = a.match(K) || [];while (c = this[i++]) {
	          if (e = mb(c), d = 1 === c.nodeType && (" " + e + " ").replace(lb, " ")) {
	            g = 0;while (f = b[g++]) {
	              while (d.indexOf(" " + f + " ") > -1) {
	                d = d.replace(" " + f + " ", " ");
	              }
	            }h = r.trim(d), e !== h && c.setAttribute("class", h);
	          }
	        }
	      }return this;
	    }, toggleClass: function toggleClass(a, b) {
	      var c = typeof a === "undefined" ? "undefined" : _typeof(a);return "boolean" == typeof b && "string" === c ? b ? this.addClass(a) : this.removeClass(a) : r.isFunction(a) ? this.each(function (c) {
	        r(this).toggleClass(a.call(this, c, mb(this), b), b);
	      }) : this.each(function () {
	        var b, d, e, f;if ("string" === c) {
	          d = 0, e = r(this), f = a.match(K) || [];while (b = f[d++]) {
	            e.hasClass(b) ? e.removeClass(b) : e.addClass(b);
	          }
	        } else void 0 !== a && "boolean" !== c || (b = mb(this), b && V.set(this, "__className__", b), this.setAttribute && this.setAttribute("class", b || a === !1 ? "" : V.get(this, "__className__") || ""));
	      });
	    }, hasClass: function hasClass(a) {
	      var b,
	          c,
	          d = 0;b = " " + a + " ";while (c = this[d++]) {
	        if (1 === c.nodeType && (" " + mb(c) + " ").replace(lb, " ").indexOf(b) > -1) return !0;
	      }return !1;
	    } });var nb = /\r/g,
	      ob = /[\x20\t\r\n\f]+/g;r.fn.extend({ val: function val(a) {
	      var b,
	          c,
	          d,
	          e = this[0];{
	        if (arguments.length) return d = r.isFunction(a), this.each(function (c) {
	          var e;1 === this.nodeType && (e = d ? a.call(this, c, r(this).val()) : a, null == e ? e = "" : "number" == typeof e ? e += "" : r.isArray(e) && (e = r.map(e, function (a) {
	            return null == a ? "" : a + "";
	          })), b = r.valHooks[this.type] || r.valHooks[this.nodeName.toLowerCase()], b && "set" in b && void 0 !== b.set(this, e, "value") || (this.value = e));
	        });if (e) return b = r.valHooks[e.type] || r.valHooks[e.nodeName.toLowerCase()], b && "get" in b && void 0 !== (c = b.get(e, "value")) ? c : (c = e.value, "string" == typeof c ? c.replace(nb, "") : null == c ? "" : c);
	      }
	    } }), r.extend({ valHooks: { option: { get: function get(a) {
	          var b = r.find.attr(a, "value");return null != b ? b : r.trim(r.text(a)).replace(ob, " ");
	        } }, select: { get: function get(a) {
	          for (var b, c, d = a.options, e = a.selectedIndex, f = "select-one" === a.type, g = f ? null : [], h = f ? e + 1 : d.length, i = e < 0 ? h : f ? e : 0; i < h; i++) {
	            if (c = d[i], (c.selected || i === e) && !c.disabled && (!c.parentNode.disabled || !r.nodeName(c.parentNode, "optgroup"))) {
	              if (b = r(c).val(), f) return b;g.push(b);
	            }
	          }return g;
	        }, set: function set(a, b) {
	          var c,
	              d,
	              e = a.options,
	              f = r.makeArray(b),
	              g = e.length;while (g--) {
	            d = e[g], (d.selected = r.inArray(r.valHooks.option.get(d), f) > -1) && (c = !0);
	          }return c || (a.selectedIndex = -1), f;
	        } } } }), r.each(["radio", "checkbox"], function () {
	    r.valHooks[this] = { set: function set(a, b) {
	        if (r.isArray(b)) return a.checked = r.inArray(r(a).val(), b) > -1;
	      } }, o.checkOn || (r.valHooks[this].get = function (a) {
	      return null === a.getAttribute("value") ? "on" : a.value;
	    });
	  });var pb = /^(?:focusinfocus|focusoutblur)$/;r.extend(r.event, { trigger: function trigger(b, c, e, f) {
	      var g,
	          h,
	          i,
	          j,
	          k,
	          m,
	          n,
	          o = [e || d],
	          p = l.call(b, "type") ? b.type : b,
	          q = l.call(b, "namespace") ? b.namespace.split(".") : [];if (h = i = e = e || d, 3 !== e.nodeType && 8 !== e.nodeType && !pb.test(p + r.event.triggered) && (p.indexOf(".") > -1 && (q = p.split("."), p = q.shift(), q.sort()), k = p.indexOf(":") < 0 && "on" + p, b = b[r.expando] ? b : new r.Event(p, "object" == (typeof b === "undefined" ? "undefined" : _typeof(b)) && b), b.isTrigger = f ? 2 : 3, b.namespace = q.join("."), b.rnamespace = b.namespace ? new RegExp("(^|\\.)" + q.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, b.result = void 0, b.target || (b.target = e), c = null == c ? [b] : r.makeArray(c, [b]), n = r.event.special[p] || {}, f || !n.trigger || n.trigger.apply(e, c) !== !1)) {
	        if (!f && !n.noBubble && !r.isWindow(e)) {
	          for (j = n.delegateType || p, pb.test(j + p) || (h = h.parentNode); h; h = h.parentNode) {
	            o.push(h), i = h;
	          }i === (e.ownerDocument || d) && o.push(i.defaultView || i.parentWindow || a);
	        }g = 0;while ((h = o[g++]) && !b.isPropagationStopped()) {
	          b.type = g > 1 ? j : n.bindType || p, m = (V.get(h, "events") || {})[b.type] && V.get(h, "handle"), m && m.apply(h, c), m = k && h[k], m && m.apply && T(h) && (b.result = m.apply(h, c), b.result === !1 && b.preventDefault());
	        }return b.type = p, f || b.isDefaultPrevented() || n._default && n._default.apply(o.pop(), c) !== !1 || !T(e) || k && r.isFunction(e[p]) && !r.isWindow(e) && (i = e[k], i && (e[k] = null), r.event.triggered = p, e[p](), r.event.triggered = void 0, i && (e[k] = i)), b.result;
	      }
	    }, simulate: function simulate(a, b, c) {
	      var d = r.extend(new r.Event(), c, { type: a, isSimulated: !0 });r.event.trigger(d, null, b);
	    } }), r.fn.extend({ trigger: function trigger(a, b) {
	      return this.each(function () {
	        r.event.trigger(a, b, this);
	      });
	    }, triggerHandler: function triggerHandler(a, b) {
	      var c = this[0];if (c) return r.event.trigger(a, b, c, !0);
	    } }), r.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function (a, b) {
	    r.fn[b] = function (a, c) {
	      return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b);
	    };
	  }), r.fn.extend({ hover: function hover(a, b) {
	      return this.mouseenter(a).mouseleave(b || a);
	    } }), o.focusin = "onfocusin" in a, o.focusin || r.each({ focus: "focusin", blur: "focusout" }, function (a, b) {
	    var c = function c(a) {
	      r.event.simulate(b, a.target, r.event.fix(a));
	    };r.event.special[b] = { setup: function setup() {
	        var d = this.ownerDocument || this,
	            e = V.access(d, b);e || d.addEventListener(a, c, !0), V.access(d, b, (e || 0) + 1);
	      }, teardown: function teardown() {
	        var d = this.ownerDocument || this,
	            e = V.access(d, b) - 1;e ? V.access(d, b, e) : (d.removeEventListener(a, c, !0), V.remove(d, b));
	      } };
	  });var qb = a.location,
	      rb = r.now(),
	      sb = /\?/;r.parseXML = function (b) {
	    var c;if (!b || "string" != typeof b) return null;try {
	      c = new a.DOMParser().parseFromString(b, "text/xml");
	    } catch (d) {
	      c = void 0;
	    }return c && !c.getElementsByTagName("parsererror").length || r.error("Invalid XML: " + b), c;
	  };var tb = /\[\]$/,
	      ub = /\r?\n/g,
	      vb = /^(?:submit|button|image|reset|file)$/i,
	      wb = /^(?:input|select|textarea|keygen)/i;function xb(a, b, c, d) {
	    var e;if (r.isArray(b)) r.each(b, function (b, e) {
	      c || tb.test(a) ? d(a, e) : xb(a + "[" + ("object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) && null != e ? b : "") + "]", e, c, d);
	    });else if (c || "object" !== r.type(b)) d(a, b);else for (e in b) {
	      xb(a + "[" + e + "]", b[e], c, d);
	    }
	  }r.param = function (a, b) {
	    var c,
	        d = [],
	        e = function e(a, b) {
	      var c = r.isFunction(b) ? b() : b;d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(null == c ? "" : c);
	    };if (r.isArray(a) || a.jquery && !r.isPlainObject(a)) r.each(a, function () {
	      e(this.name, this.value);
	    });else for (c in a) {
	      xb(c, a[c], b, e);
	    }return d.join("&");
	  }, r.fn.extend({ serialize: function serialize() {
	      return r.param(this.serializeArray());
	    }, serializeArray: function serializeArray() {
	      return this.map(function () {
	        var a = r.prop(this, "elements");return a ? r.makeArray(a) : this;
	      }).filter(function () {
	        var a = this.type;return this.name && !r(this).is(":disabled") && wb.test(this.nodeName) && !vb.test(a) && (this.checked || !ha.test(a));
	      }).map(function (a, b) {
	        var c = r(this).val();return null == c ? null : r.isArray(c) ? r.map(c, function (a) {
	          return { name: b.name, value: a.replace(ub, "\r\n") };
	        }) : { name: b.name, value: c.replace(ub, "\r\n") };
	      }).get();
	    } });var yb = /%20/g,
	      zb = /#.*$/,
	      Ab = /([?&])_=[^&]*/,
	      Bb = /^(.*?):[ \t]*([^\r\n]*)$/gm,
	      Cb = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	      Db = /^(?:GET|HEAD)$/,
	      Eb = /^\/\//,
	      Fb = {},
	      Gb = {},
	      Hb = "*/".concat("*"),
	      Ib = d.createElement("a");Ib.href = qb.href;function Jb(a) {
	    return function (b, c) {
	      "string" != typeof b && (c = b, b = "*");var d,
	          e = 0,
	          f = b.toLowerCase().match(K) || [];if (r.isFunction(c)) while (d = f[e++]) {
	        "+" === d[0] ? (d = d.slice(1) || "*", (a[d] = a[d] || []).unshift(c)) : (a[d] = a[d] || []).push(c);
	      }
	    };
	  }function Kb(a, b, c, d) {
	    var e = {},
	        f = a === Gb;function g(h) {
	      var i;return e[h] = !0, r.each(a[h] || [], function (a, h) {
	        var j = h(b, c, d);return "string" != typeof j || f || e[j] ? f ? !(i = j) : void 0 : (b.dataTypes.unshift(j), g(j), !1);
	      }), i;
	    }return g(b.dataTypes[0]) || !e["*"] && g("*");
	  }function Lb(a, b) {
	    var c,
	        d,
	        e = r.ajaxSettings.flatOptions || {};for (c in b) {
	      void 0 !== b[c] && ((e[c] ? a : d || (d = {}))[c] = b[c]);
	    }return d && r.extend(!0, a, d), a;
	  }function Mb(a, b, c) {
	    var d,
	        e,
	        f,
	        g,
	        h = a.contents,
	        i = a.dataTypes;while ("*" === i[0]) {
	      i.shift(), void 0 === d && (d = a.mimeType || b.getResponseHeader("Content-Type"));
	    }if (d) for (e in h) {
	      if (h[e] && h[e].test(d)) {
	        i.unshift(e);break;
	      }
	    }if (i[0] in c) f = i[0];else {
	      for (e in c) {
	        if (!i[0] || a.converters[e + " " + i[0]]) {
	          f = e;break;
	        }g || (g = e);
	      }f = f || g;
	    }if (f) return f !== i[0] && i.unshift(f), c[f];
	  }function Nb(a, b, c, d) {
	    var e,
	        f,
	        g,
	        h,
	        i,
	        j = {},
	        k = a.dataTypes.slice();if (k[1]) for (g in a.converters) {
	      j[g.toLowerCase()] = a.converters[g];
	    }f = k.shift();while (f) {
	      if (a.responseFields[f] && (c[a.responseFields[f]] = b), !i && d && a.dataFilter && (b = a.dataFilter(b, a.dataType)), i = f, f = k.shift()) if ("*" === f) f = i;else if ("*" !== i && i !== f) {
	        if (g = j[i + " " + f] || j["* " + f], !g) for (e in j) {
	          if (h = e.split(" "), h[1] === f && (g = j[i + " " + h[0]] || j["* " + h[0]])) {
	            g === !0 ? g = j[e] : j[e] !== !0 && (f = h[0], k.unshift(h[1]));break;
	          }
	        }if (g !== !0) if (g && a["throws"]) b = g(b);else try {
	          b = g(b);
	        } catch (l) {
	          return { state: "parsererror", error: g ? l : "No conversion from " + i + " to " + f };
	        }
	      }
	    }return { state: "success", data: b };
	  }r.extend({ active: 0, lastModified: {}, etag: {}, ajaxSettings: { url: qb.href, type: "GET", isLocal: Cb.test(qb.protocol), global: !0, processData: !0, async: !0, contentType: "application/x-www-form-urlencoded; charset=UTF-8", accepts: { "*": Hb, text: "text/plain", html: "text/html", xml: "application/xml, text/xml", json: "application/json, text/javascript" }, contents: { xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/ }, responseFields: { xml: "responseXML", text: "responseText", json: "responseJSON" }, converters: { "* text": String, "text html": !0, "text json": JSON.parse, "text xml": r.parseXML }, flatOptions: { url: !0, context: !0 } }, ajaxSetup: function ajaxSetup(a, b) {
	      return b ? Lb(Lb(a, r.ajaxSettings), b) : Lb(r.ajaxSettings, a);
	    }, ajaxPrefilter: Jb(Fb), ajaxTransport: Jb(Gb), ajax: function ajax(b, c) {
	      "object" == (typeof b === "undefined" ? "undefined" : _typeof(b)) && (c = b, b = void 0), c = c || {};var e,
	          f,
	          g,
	          h,
	          i,
	          j,
	          k,
	          l,
	          m,
	          n,
	          o = r.ajaxSetup({}, c),
	          p = o.context || o,
	          q = o.context && (p.nodeType || p.jquery) ? r(p) : r.event,
	          s = r.Deferred(),
	          t = r.Callbacks("once memory"),
	          u = o.statusCode || {},
	          v = {},
	          w = {},
	          x = "canceled",
	          y = { readyState: 0, getResponseHeader: function getResponseHeader(a) {
	          var b;if (k) {
	            if (!h) {
	              h = {};while (b = Bb.exec(g)) {
	                h[b[1].toLowerCase()] = b[2];
	              }
	            }b = h[a.toLowerCase()];
	          }return null == b ? null : b;
	        }, getAllResponseHeaders: function getAllResponseHeaders() {
	          return k ? g : null;
	        }, setRequestHeader: function setRequestHeader(a, b) {
	          return null == k && (a = w[a.toLowerCase()] = w[a.toLowerCase()] || a, v[a] = b), this;
	        }, overrideMimeType: function overrideMimeType(a) {
	          return null == k && (o.mimeType = a), this;
	        }, statusCode: function statusCode(a) {
	          var b;if (a) if (k) y.always(a[y.status]);else for (b in a) {
	            u[b] = [u[b], a[b]];
	          }return this;
	        }, abort: function abort(a) {
	          var b = a || x;return e && e.abort(b), A(0, b), this;
	        } };if (s.promise(y), o.url = ((b || o.url || qb.href) + "").replace(Eb, qb.protocol + "//"), o.type = c.method || c.type || o.method || o.type, o.dataTypes = (o.dataType || "*").toLowerCase().match(K) || [""], null == o.crossDomain) {
	        j = d.createElement("a");try {
	          j.href = o.url, j.href = j.href, o.crossDomain = Ib.protocol + "//" + Ib.host != j.protocol + "//" + j.host;
	        } catch (z) {
	          o.crossDomain = !0;
	        }
	      }if (o.data && o.processData && "string" != typeof o.data && (o.data = r.param(o.data, o.traditional)), Kb(Fb, o, c, y), k) return y;l = r.event && o.global, l && 0 === r.active++ && r.event.trigger("ajaxStart"), o.type = o.type.toUpperCase(), o.hasContent = !Db.test(o.type), f = o.url.replace(zb, ""), o.hasContent ? o.data && o.processData && 0 === (o.contentType || "").indexOf("application/x-www-form-urlencoded") && (o.data = o.data.replace(yb, "+")) : (n = o.url.slice(f.length), o.data && (f += (sb.test(f) ? "&" : "?") + o.data, delete o.data), o.cache === !1 && (f = f.replace(Ab, ""), n = (sb.test(f) ? "&" : "?") + "_=" + rb++ + n), o.url = f + n), o.ifModified && (r.lastModified[f] && y.setRequestHeader("If-Modified-Since", r.lastModified[f]), r.etag[f] && y.setRequestHeader("If-None-Match", r.etag[f])), (o.data && o.hasContent && o.contentType !== !1 || c.contentType) && y.setRequestHeader("Content-Type", o.contentType), y.setRequestHeader("Accept", o.dataTypes[0] && o.accepts[o.dataTypes[0]] ? o.accepts[o.dataTypes[0]] + ("*" !== o.dataTypes[0] ? ", " + Hb + "; q=0.01" : "") : o.accepts["*"]);for (m in o.headers) {
	        y.setRequestHeader(m, o.headers[m]);
	      }if (o.beforeSend && (o.beforeSend.call(p, y, o) === !1 || k)) return y.abort();if (x = "abort", t.add(o.complete), y.done(o.success), y.fail(o.error), e = Kb(Gb, o, c, y)) {
	        if (y.readyState = 1, l && q.trigger("ajaxSend", [y, o]), k) return y;o.async && o.timeout > 0 && (i = a.setTimeout(function () {
	          y.abort("timeout");
	        }, o.timeout));try {
	          k = !1, e.send(v, A);
	        } catch (z) {
	          if (k) throw z;A(-1, z);
	        }
	      } else A(-1, "No Transport");function A(b, c, d, h) {
	        var j,
	            m,
	            n,
	            v,
	            w,
	            x = c;k || (k = !0, i && a.clearTimeout(i), e = void 0, g = h || "", y.readyState = b > 0 ? 4 : 0, j = b >= 200 && b < 300 || 304 === b, d && (v = Mb(o, y, d)), v = Nb(o, v, y, j), j ? (o.ifModified && (w = y.getResponseHeader("Last-Modified"), w && (r.lastModified[f] = w), w = y.getResponseHeader("etag"), w && (r.etag[f] = w)), 204 === b || "HEAD" === o.type ? x = "nocontent" : 304 === b ? x = "notmodified" : (x = v.state, m = v.data, n = v.error, j = !n)) : (n = x, !b && x || (x = "error", b < 0 && (b = 0))), y.status = b, y.statusText = (c || x) + "", j ? s.resolveWith(p, [m, x, y]) : s.rejectWith(p, [y, x, n]), y.statusCode(u), u = void 0, l && q.trigger(j ? "ajaxSuccess" : "ajaxError", [y, o, j ? m : n]), t.fireWith(p, [y, x]), l && (q.trigger("ajaxComplete", [y, o]), --r.active || r.event.trigger("ajaxStop")));
	      }return y;
	    }, getJSON: function getJSON(a, b, c) {
	      return r.get(a, b, c, "json");
	    }, getScript: function getScript(a, b) {
	      return r.get(a, void 0, b, "script");
	    } }), r.each(["get", "post"], function (a, b) {
	    r[b] = function (a, c, d, e) {
	      return r.isFunction(c) && (e = e || d, d = c, c = void 0), r.ajax(r.extend({ url: a, type: b, dataType: e, data: c, success: d }, r.isPlainObject(a) && a));
	    };
	  }), r._evalUrl = function (a) {
	    return r.ajax({ url: a, type: "GET", dataType: "script", cache: !0, async: !1, global: !1, "throws": !0 });
	  }, r.fn.extend({ wrapAll: function wrapAll(a) {
	      var b;return this[0] && (r.isFunction(a) && (a = a.call(this[0])), b = r(a, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && b.insertBefore(this[0]), b.map(function () {
	        var a = this;while (a.firstElementChild) {
	          a = a.firstElementChild;
	        }return a;
	      }).append(this)), this;
	    }, wrapInner: function wrapInner(a) {
	      return r.isFunction(a) ? this.each(function (b) {
	        r(this).wrapInner(a.call(this, b));
	      }) : this.each(function () {
	        var b = r(this),
	            c = b.contents();c.length ? c.wrapAll(a) : b.append(a);
	      });
	    }, wrap: function wrap(a) {
	      var b = r.isFunction(a);return this.each(function (c) {
	        r(this).wrapAll(b ? a.call(this, c) : a);
	      });
	    }, unwrap: function unwrap(a) {
	      return this.parent(a).not("body").each(function () {
	        r(this).replaceWith(this.childNodes);
	      }), this;
	    } }), r.expr.pseudos.hidden = function (a) {
	    return !r.expr.pseudos.visible(a);
	  }, r.expr.pseudos.visible = function (a) {
	    return !!(a.offsetWidth || a.offsetHeight || a.getClientRects().length);
	  }, r.ajaxSettings.xhr = function () {
	    try {
	      return new a.XMLHttpRequest();
	    } catch (b) {}
	  };var Ob = { 0: 200, 1223: 204 },
	      Pb = r.ajaxSettings.xhr();o.cors = !!Pb && "withCredentials" in Pb, o.ajax = Pb = !!Pb, r.ajaxTransport(function (b) {
	    var _c, d;if (o.cors || Pb && !b.crossDomain) return { send: function send(e, f) {
	        var g,
	            h = b.xhr();if (h.open(b.type, b.url, b.async, b.username, b.password), b.xhrFields) for (g in b.xhrFields) {
	          h[g] = b.xhrFields[g];
	        }b.mimeType && h.overrideMimeType && h.overrideMimeType(b.mimeType), b.crossDomain || e["X-Requested-With"] || (e["X-Requested-With"] = "XMLHttpRequest");for (g in e) {
	          h.setRequestHeader(g, e[g]);
	        }_c = function c(a) {
	          return function () {
	            _c && (_c = d = h.onload = h.onerror = h.onabort = h.onreadystatechange = null, "abort" === a ? h.abort() : "error" === a ? "number" != typeof h.status ? f(0, "error") : f(h.status, h.statusText) : f(Ob[h.status] || h.status, h.statusText, "text" !== (h.responseType || "text") || "string" != typeof h.responseText ? { binary: h.response } : { text: h.responseText }, h.getAllResponseHeaders()));
	          };
	        }, h.onload = _c(), d = h.onerror = _c("error"), void 0 !== h.onabort ? h.onabort = d : h.onreadystatechange = function () {
	          4 === h.readyState && a.setTimeout(function () {
	            _c && d();
	          });
	        }, _c = _c("abort");try {
	          h.send(b.hasContent && b.data || null);
	        } catch (i) {
	          if (_c) throw i;
	        }
	      }, abort: function abort() {
	        _c && _c();
	      } };
	  }), r.ajaxPrefilter(function (a) {
	    a.crossDomain && (a.contents.script = !1);
	  }), r.ajaxSetup({ accepts: { script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript" }, contents: { script: /\b(?:java|ecma)script\b/ }, converters: { "text script": function textScript(a) {
	        return r.globalEval(a), a;
	      } } }), r.ajaxPrefilter("script", function (a) {
	    void 0 === a.cache && (a.cache = !1), a.crossDomain && (a.type = "GET");
	  }), r.ajaxTransport("script", function (a) {
	    if (a.crossDomain) {
	      var b, _c2;return { send: function send(e, f) {
	          b = r("<script>").prop({ charset: a.scriptCharset, src: a.url }).on("load error", _c2 = function c(a) {
	            b.remove(), _c2 = null, a && f("error" === a.type ? 404 : 200, a.type);
	          }), d.head.appendChild(b[0]);
	        }, abort: function abort() {
	          _c2 && _c2();
	        } };
	    }
	  });var Qb = [],
	      Rb = /(=)\?(?=&|$)|\?\?/;r.ajaxSetup({ jsonp: "callback", jsonpCallback: function jsonpCallback() {
	      var a = Qb.pop() || r.expando + "_" + rb++;return this[a] = !0, a;
	    } }), r.ajaxPrefilter("json jsonp", function (b, c, d) {
	    var e,
	        f,
	        g,
	        h = b.jsonp !== !1 && (Rb.test(b.url) ? "url" : "string" == typeof b.data && 0 === (b.contentType || "").indexOf("application/x-www-form-urlencoded") && Rb.test(b.data) && "data");if (h || "jsonp" === b.dataTypes[0]) return e = b.jsonpCallback = r.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback, h ? b[h] = b[h].replace(Rb, "$1" + e) : b.jsonp !== !1 && (b.url += (sb.test(b.url) ? "&" : "?") + b.jsonp + "=" + e), b.converters["script json"] = function () {
	      return g || r.error(e + " was not called"), g[0];
	    }, b.dataTypes[0] = "json", f = a[e], a[e] = function () {
	      g = arguments;
	    }, d.always(function () {
	      void 0 === f ? r(a).removeProp(e) : a[e] = f, b[e] && (b.jsonpCallback = c.jsonpCallback, Qb.push(e)), g && r.isFunction(f) && f(g[0]), g = f = void 0;
	    }), "script";
	  }), o.createHTMLDocument = function () {
	    var a = d.implementation.createHTMLDocument("").body;return a.innerHTML = "<form></form><form></form>", 2 === a.childNodes.length;
	  }(), r.parseHTML = function (a, b, c) {
	    if ("string" != typeof a) return [];"boolean" == typeof b && (c = b, b = !1);var e, f, g;return b || (o.createHTMLDocument ? (b = d.implementation.createHTMLDocument(""), e = b.createElement("base"), e.href = d.location.href, b.head.appendChild(e)) : b = d), f = B.exec(a), g = !c && [], f ? [b.createElement(f[1])] : (f = oa([a], b, g), g && g.length && r(g).remove(), r.merge([], f.childNodes));
	  }, r.fn.load = function (a, b, c) {
	    var d,
	        e,
	        f,
	        g = this,
	        h = a.indexOf(" ");return h > -1 && (d = r.trim(a.slice(h)), a = a.slice(0, h)), r.isFunction(b) ? (c = b, b = void 0) : b && "object" == (typeof b === "undefined" ? "undefined" : _typeof(b)) && (e = "POST"), g.length > 0 && r.ajax({ url: a, type: e || "GET", dataType: "html", data: b }).done(function (a) {
	      f = arguments, g.html(d ? r("<div>").append(r.parseHTML(a)).find(d) : a);
	    }).always(c && function (a, b) {
	      g.each(function () {
	        c.apply(this, f || [a.responseText, b, a]);
	      });
	    }), this;
	  }, r.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (a, b) {
	    r.fn[b] = function (a) {
	      return this.on(b, a);
	    };
	  }), r.expr.pseudos.animated = function (a) {
	    return r.grep(r.timers, function (b) {
	      return a === b.elem;
	    }).length;
	  };function Sb(a) {
	    return r.isWindow(a) ? a : 9 === a.nodeType && a.defaultView;
	  }r.offset = { setOffset: function setOffset(a, b, c) {
	      var d,
	          e,
	          f,
	          g,
	          h,
	          i,
	          j,
	          k = r.css(a, "position"),
	          l = r(a),
	          m = {};"static" === k && (a.style.position = "relative"), h = l.offset(), f = r.css(a, "top"), i = r.css(a, "left"), j = ("absolute" === k || "fixed" === k) && (f + i).indexOf("auto") > -1, j ? (d = l.position(), g = d.top, e = d.left) : (g = parseFloat(f) || 0, e = parseFloat(i) || 0), r.isFunction(b) && (b = b.call(a, c, r.extend({}, h))), null != b.top && (m.top = b.top - h.top + g), null != b.left && (m.left = b.left - h.left + e), "using" in b ? b.using.call(a, m) : l.css(m);
	    } }, r.fn.extend({ offset: function offset(a) {
	      if (arguments.length) return void 0 === a ? this : this.each(function (b) {
	        r.offset.setOffset(this, a, b);
	      });var b,
	          c,
	          d,
	          e,
	          f = this[0];if (f) return f.getClientRects().length ? (d = f.getBoundingClientRect(), d.width || d.height ? (e = f.ownerDocument, c = Sb(e), b = e.documentElement, { top: d.top + c.pageYOffset - b.clientTop, left: d.left + c.pageXOffset - b.clientLeft }) : d) : { top: 0, left: 0 };
	    }, position: function position() {
	      if (this[0]) {
	        var a,
	            b,
	            c = this[0],
	            d = { top: 0, left: 0 };return "fixed" === r.css(c, "position") ? b = c.getBoundingClientRect() : (a = this.offsetParent(), b = this.offset(), r.nodeName(a[0], "html") || (d = a.offset()), d = { top: d.top + r.css(a[0], "borderTopWidth", !0), left: d.left + r.css(a[0], "borderLeftWidth", !0) }), { top: b.top - d.top - r.css(c, "marginTop", !0), left: b.left - d.left - r.css(c, "marginLeft", !0) };
	      }
	    }, offsetParent: function offsetParent() {
	      return this.map(function () {
	        var a = this.offsetParent;while (a && "static" === r.css(a, "position")) {
	          a = a.offsetParent;
	        }return a || pa;
	      });
	    } }), r.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function (a, b) {
	    var c = "pageYOffset" === b;r.fn[a] = function (d) {
	      return S(this, function (a, d, e) {
	        var f = Sb(a);return void 0 === e ? f ? f[b] : a[d] : void (f ? f.scrollTo(c ? f.pageXOffset : e, c ? e : f.pageYOffset) : a[d] = e);
	      }, a, d, arguments.length);
	    };
	  }), r.each(["top", "left"], function (a, b) {
	    r.cssHooks[b] = Na(o.pixelPosition, function (a, c) {
	      if (c) return c = Ma(a, b), Ka.test(c) ? r(a).position()[b] + "px" : c;
	    });
	  }), r.each({ Height: "height", Width: "width" }, function (a, b) {
	    r.each({ padding: "inner" + a, content: b, "": "outer" + a }, function (c, d) {
	      r.fn[d] = function (e, f) {
	        var g = arguments.length && (c || "boolean" != typeof e),
	            h = c || (e === !0 || f === !0 ? "margin" : "border");return S(this, function (b, c, e) {
	          var f;return r.isWindow(b) ? 0 === d.indexOf("outer") ? b["inner" + a] : b.document.documentElement["client" + a] : 9 === b.nodeType ? (f = b.documentElement, Math.max(b.body["scroll" + a], f["scroll" + a], b.body["offset" + a], f["offset" + a], f["client" + a])) : void 0 === e ? r.css(b, c, h) : r.style(b, c, e, h);
	        }, b, g ? e : void 0, g);
	      };
	    });
	  }), r.fn.extend({ bind: function bind(a, b, c) {
	      return this.on(a, null, b, c);
	    }, unbind: function unbind(a, b) {
	      return this.off(a, null, b);
	    }, delegate: function delegate(a, b, c, d) {
	      return this.on(b, a, c, d);
	    }, undelegate: function undelegate(a, b, c) {
	      return 1 === arguments.length ? this.off(a, "**") : this.off(b, a || "**", c);
	    } }), r.parseJSON = JSON.parse, "function" == "function" && __webpack_require__(7) && !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
	    return r;
	  }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));var Tb = a.jQuery,
	      Ub = a.$;return r.noConflict = function (b) {
	    return a.$ === r && (a.$ = Ub), b && a.jQuery === r && (a.jQuery = Tb), r;
	  }, b || (a.jQuery = a.$ = r), r;
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)(module)))

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 7 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;
	
	/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNGZmNzA3MGMzNTg5NTQ5YmNlZmIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2Z1bmN0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2Fzcy9tYWluLnNhc3M/MWEzMyIsIndlYnBhY2s6Ly8vLi9zcmMvc2Fzcy9tYWluLnNhc3MiLCJ3ZWJwYWNrOi8vLy4vfi9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qcyIsIndlYnBhY2s6Ly8vLi9+L3N0eWxlLWxvYWRlci9hZGRTdHlsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2pxdWVyeS0zLjEuMC5taW4uanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL21vZHVsZS5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vYW1kLW9wdGlvbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7OztBQ3RDQSxxQkFBUSxDQUFSO0FBQ0EscUJBQVEsQ0FBUjs7QUFFQTs7QUFFQSxVQUFTLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxZQUFVOztBQUdwRCxTQUFNLFlBQVk7QUFDZCxlQUFNLGdCQUFXO0FBQ2Isa0JBQUssUUFBTDtBQUNBLGtCQUFLLFVBQUw7QUFDSCxVQUphO0FBS2QsbUJBQVUsb0JBQVc7QUFDakIsa0JBQUssYUFBTCxHQUFxQixTQUFTLGFBQVQsQ0FBdUIsaUJBQXZCLENBQXJCO0FBQ0Esa0JBQUssaUJBQUwsR0FBeUIsU0FBUyxhQUFULENBQXVCLHFCQUF2QixDQUF6QjtBQUNBLGtCQUFLLGVBQUwsR0FBdUIsU0FBUyxhQUFULENB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QXdHLENBQS9HO0FBQWlILEVBRm52ckIsQ0FBRCxDOzs7Ozs7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNUQSIsImZpbGUiOiJzY3JpcHRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA0ZmY3MDcwYzM1ODk1NDliY2VmYlxuICoqLyIsInJlcXVpcmUoJy4uL3Nhc3MvbWFpbi5zYXNzJyk7XHJcbnJlcXVpcmUoJy4vanF1ZXJ5LTMuMS4wLm1pbi5qcycpO1xyXG5cclxuXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKXtcclxuXHJcblxyXG4gICAgY29uc3QgRmluZFVzZXJzID0ge1xyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB0aGlzLmNhY2hlRE9NKCk7XHJcbiAgICAgICAgICAgIHRoaXMuYmluZEV2ZW50cygpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2FjaGVET006IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB0aGlzLiRmaW5kVXNlcnNCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZmluZC11c2Vycy1idG4nKTtcclxuICAgICAgICAgICAgdGhpcy4kdXNlcnNGb3JtRGlzcGxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy51c2Vycy1mb3JtLWRpc3BsYXknKTtcclxuICAgICAgICAgICAgdGhpcy4kdXNlcnNGb3JtSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudXNlcnMtZm9ybS13cmFwcGVyIGlucHV0Jyk7XHJcbiAgICAgICAgICAgIHRoaXMuJHJlbmRlclVzZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJlbmRlci11c2VycycpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYmluZEV2ZW50czogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHRoaXMuJGZpbmRVc2Vyc0J0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuZ2V0UmVxdWVzdHMuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICByZW5kZXI6IGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ1JlbmRlciBNZXRob2QgQ2FsbGVkJyk7XHJcbiAgICAgICAgICAgIHZhciB0ZW1wbGF0ZSA9IGA8aDEgY2xhc3M9XCJ1c2VyXCI+JHtkYXRhLnVzZXJuYW1lfTwvaDE+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDEgY2xhc3M9XCJ1c2VyLWVtYWlsXCI+ICR7ZGF0YS5lbWFpbH08L2gxPiBgO1xyXG4gICAgICAgICAgICB0aGlzLiRyZW5kZXJVc2Vycy5pbm5lckhUTUwgPSB0ZW1wbGF0ZTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdldFJlcXVlc3RzOiBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBpVmFsID0gdGhpcy4kdXNlcnNGb3JtSW5wdXQudmFsdWU7XHJcbiAgICAgICAgICAgIGlmIChpVmFsLnRyaW0oKS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBhbGVydCgnUGxlYXNlIGVudGVyIGEgdXNlcm5hbWUnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBnZXRSZXF1ZXN0RGF0YShpVmFsLnRyaW0oKSk7XHJcbiAgICAgICAgICAgIGlWYWwgPSAnJztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgRmluZFVzZXJzLmluaXQoKTtcclxuXHJcblxyXG5cclxuICAgIGNvbnN0IEFkZFVzZXJzID0ge1xyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHRoaXMuY2FjaGVET00oKTtcclxuICAgICAgICAgICAgdGhpcy5iaW5kRXZlbnRzKCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjYWNoZURPTTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHRoaXMuJGFkZFVzZXJEaXNwbGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZC11c2VyLWRpc3BsYXknKTtcclxuICAgICAgICAgICAgdGhpcy4kYWRkVXNlcklucHV0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5hZGQtdXNlci1kaXNwbGF5IGlucHV0Jyk7XHJcbiAgICAgICAgICAgIHRoaXMuJGFkZFVzZXJCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWRkLXVzZXItYnRuJyk7XHJcbiAgICAgICAgICAgIHRoaXMuJHJlbmRlclVzZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmVuZGVyLWFkZC11c2VyJyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBiaW5kRXZlbnRzOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdGhpcy4kYWRkVXNlckJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMucG9zdFJlcXVlc3QuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICByZW5kZXI6IGZ1bmN0aW9uKG1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgdmFyIHRlbXBsYXRlID0gYDxoMT4ke21lc3NhZ2V9PC9oMT5gO1xyXG4gICAgICAgICAgICB0aGlzLiRyZW5kZXJVc2VyLmlubmVySFRNTCA9IHRlbXBsYXRlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcG9zdFJlcXVlc3Q6IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgdmFyIG5ld1VzZXIgPSBuZXcgT2JqZWN0KCk7XHJcbiAgICAgICAgICAgIHZhciBpVmFsID0gdGhpcy4kYWRkVXNlcklucHV0cztcclxuICAgICAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGlWYWwubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmKGlWYWxbaV0ubmFtZSA9PT0gJ3VzZXJuYW1lJykge1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld1VzZXIudXNlcm5hbWUgPSBpVmFsW2ldLnZhbHVlLnRyaW0oKTtcclxuICAgICAgICAgICAgICAgICAgICBpVmFsW2ldLnZhbHVlID0gJyc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZihpVmFsW2ldLm5hbWUgPT09ICdlbWFpbCcpIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXdVc2VyLmVtYWlsID0gaVZhbFtpXS52YWx1ZS50cmltKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaVZhbFtpXS52YWx1ZSA9ICcnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYoaVZhbFtpXS5uYW1lID09PSAncGFzc3dvcmQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3VXNlci5wYXNzd29yZCA9IGlWYWxbaV0udmFsdWUudHJpbSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlWYWxbaV0udmFsdWUgPSAnJztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcG9zdFJlcXVlc3REYXRhKG5ld1VzZXIpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgQWRkVXNlcnMuaW5pdCgpO1xyXG5cclxuXHJcbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSGVscGVyIEZ1bmN0aW9uc1xyXG4gICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuICAgIGZ1bmN0aW9uIGdldFJlcXVlc3REYXRhKHVzZXJuYW1lKSB7XHJcbiAgICAgICAgdmFyIGh0dHAgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICB2YXIgbWV0aG9kID0gJ0dFVCc7XHJcbiAgICAgICAgdmFyIHVybCA9ICcvdXNlcmRhdGEvc2VhcmNoP3VzZXJuYW1lPScgKyB1c2VybmFtZTtcclxuXHJcbiAgICAgICAgaHR0cC5vcGVuKG1ldGhvZCwgdXJsKTtcclxuICAgICAgICBodHRwLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9VVRGLThcIik7XHJcbiAgICAgICAgaHR0cC5zZW5kKCk7XHJcbiAgICAgICAgaHR0cC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYoaHR0cC5yZWFkeVN0YXRlID09PSBYTUxIdHRwUmVxdWVzdC5ET05FICYmIGh0dHAuc3RhdHVzID09PSAyMDApIHtcclxuICAgICAgICAgICAgICAgIHZhciBkYXRhID0gSlNPTi5wYXJzZShodHRwLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgICAgICBpZihkYXRhLmVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YS5lcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFsZXJ0KGRhdGEuZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgRmluZFVzZXJzLnJlbmRlcihkYXRhKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjb25zb2xlLmxvZygnU3VjY2VzcycpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGh0dHAucmVhZHlTdGF0ZSA9PT0gWE1MSHR0cFJlcXVlc3QuRE9ORSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGFsZXJ0KCdTb21ldGhpbmcgd2VudCB3cm9uZyEnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBwb3N0UmVxdWVzdERhdGEobmV3VXNlcikge1xyXG4gICAgICAgIHZhciBodHRwID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgdmFyIG1ldGhvZCA9ICdQT1NUJztcclxuICAgICAgICB2YXIgdXJsID0gJy91c2VyZGF0YSc7XHJcblxyXG4gICAgICAgIGh0dHAub3BlbihtZXRob2QsIHVybCk7XHJcbiAgICAgICAgaHR0cC5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvbjtjaGFyc2V0PVVURi04XCIpO1xyXG4gICAgICAgIGh0dHAuc2VuZChKU09OLnN0cmluZ2lmeShuZXdVc2VyKSk7XHJcbiAgICAgICAgaHR0cC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYoaHR0cC5yZWFkeVN0YXRlID09PSBYTUxIdHRwUmVxdWVzdC5ET05FICYmIGh0dHAuc3RhdHVzID09PSAyMDApIHtcclxuICAgICAgICAgICAgICAgIHZhciBkYXRhID0gSlNPTi5wYXJzZShodHRwLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgICAgICBpZihkYXRhLmVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ05vdCBzdWNjZXNzZnVsJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEFkZFVzZXJzLnJlbmRlcihkYXRhLmVycm9yKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1N1Y2Nlc3MnKTtcclxuICAgICAgICAgICAgICAgICAgICBBZGRVc2Vycy5yZW5kZXIoJ1VzZXIgU2F2ZWQhJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9IGVsc2UgaWYoaHR0cC5yZWFkeVN0YXRlID09PSBYTUxIdHRwUmVxdWVzdC5ET05FKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYWxlcnQoJ0FtaWdvLCB5b3UgaGF2ZSBtYWRlIG1pc3Rha2Ugc29tZXdoZXJlJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59KTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvanMvZnVuY3Rpb25zLmpzXG4gKiovIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvaW5kZXguanMhLi9tYWluLnNhc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9hZGRTdHlsZXMuanNcIikoY29udGVudCwge30pO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdGlmKCFjb250ZW50LmxvY2Fscykge1xuXHRcdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2luZGV4LmpzIS4vbWFpbi5zYXNzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2luZGV4LmpzIS4vbWFpbi5zYXNzXCIpO1xuXHRcdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cdFx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdFx0fSk7XG5cdH1cblx0Ly8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3Nhc3MvbWFpbi5zYXNzXG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIqIHtcXG4gIG1hcmdpbjogMDtcXG4gIHBhZGRpbmc6IDA7IH1cXG5cXG5ib2R5IHtcXG4gIGZvbnQtZmFtaWx5OiAnUFQgU2FucycsIHNhbnMtc2VyaWY7XFxuICBmb250LXdlaWdodDogbm9ybWFsOyB9XFxuXFxuLmhlYWRlci13cmFwcGVyIHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDAlOyB9XFxuXFxuLmhlYWRlci1kaXNwbGF5IHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDAlOyB9XFxuXFxuLmhlYWRlci1icmFuZCB7XFxuICB3aWR0aDogYXV0bztcXG4gIGhlaWdodDogMTAwJTsgfVxcblxcbi5oZWFkZXItbGlua3Mge1xcbiAgd2lkdGg6IGF1dG87XFxuICBoZWlnaHQ6IDEwMCU7IH1cXG4gIC5oZWFkZXItbGlua3MgbGkge1xcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IH1cXG4gIC5oZWFkZXItbGlua3MgYSB7XFxuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTsgfVxcblxcbi51c2Vycy1mb3JtLXdyYXBwZXIge1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IGF1dG87IH1cXG5cXG4udXNlcnMtZm9ybS1kaXNwbGF5IHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiBhdXRvO1xcbiAgcGFkZGluZzogNjBweCAwOyB9XFxuXFxuLmZvcm0tY29udGFpbmVyIHtcXG4gIHdpZHRoOiA5NSU7XFxuICBoZWlnaHQ6IGF1dG87XFxuICBtYXgtd2lkdGg6IDQwMHB4O1xcbiAgbWFyZ2luOiAwIGF1dG87XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7IH1cXG5cXG4uZm9ybS1jb250cm9sIHtcXG4gIHdpZHRoOiA5NSU7XFxuICBoZWlnaHQ6IGF1dG87XFxuICBtYXJnaW46IDVweCBhdXRvO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyOyB9XFxuICAuZm9ybS1jb250cm9sIGlucHV0IHtcXG4gICAgd2lkdGg6IDk1JTtcXG4gICAgaGVpZ2h0OiAzNXB4O1xcbiAgICBtYXJnaW46IDAgYXV0bztcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkIGdyYXk7XFxuICAgIGJvcmRlci1yYWRpdXM6IDRweDtcXG4gICAgcGFkZGluZy1sZWZ0OiA1cHg7IH1cXG4gIC5mb3JtLWNvbnRyb2wgYnV0dG9uIHtcXG4gICAgd2lkdGg6IDk3JTtcXG4gICAgaGVpZ2h0OiAzNXB4O1xcbiAgICBjb2xvcjogI2ZmZjtcXG4gICAgYmFja2dyb3VuZDogIzAyODhEMTtcXG4gICAgYm9yZGVyLXJhZGl1czogNHB4O1xcbiAgICBib3JkZXI6IG5vbmU7XFxuICAgIG91dGxpbmU6IG5vbmU7IH1cXG5cXG5oMSB7XFxuICBmb250LXNpemU6IDMwcHg7IH1cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jc3MtbG9hZGVyIS4vfi9zYXNzLWxvYWRlciEuL3NyYy9zYXNzL21haW4uc2Fzc1xuICoqIG1vZHVsZSBpZCA9IDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qXHJcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcclxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXHJcbiovXHJcbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XHJcblx0dmFyIGxpc3QgPSBbXTtcclxuXHJcblx0Ly8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xyXG5cdGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcclxuXHRcdHZhciByZXN1bHQgPSBbXTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gdGhpc1tpXTtcclxuXHRcdFx0aWYoaXRlbVsyXSkge1xyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKFwiQG1lZGlhIFwiICsgaXRlbVsyXSArIFwie1wiICsgaXRlbVsxXSArIFwifVwiKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXN1bHQucHVzaChpdGVtWzFdKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHJlc3VsdC5qb2luKFwiXCIpO1xyXG5cdH07XHJcblxyXG5cdC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XHJcblx0bGlzdC5pID0gZnVuY3Rpb24obW9kdWxlcywgbWVkaWFRdWVyeSkge1xyXG5cdFx0aWYodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpXHJcblx0XHRcdG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIFwiXCJdXTtcclxuXHRcdHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaWQgPSB0aGlzW2ldWzBdO1xyXG5cdFx0XHRpZih0eXBlb2YgaWQgPT09IFwibnVtYmVyXCIpXHJcblx0XHRcdFx0YWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xyXG5cdFx0fVxyXG5cdFx0Zm9yKGkgPSAwOyBpIDwgbW9kdWxlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaXRlbSA9IG1vZHVsZXNbaV07XHJcblx0XHRcdC8vIHNraXAgYWxyZWFkeSBpbXBvcnRlZCBtb2R1bGVcclxuXHRcdFx0Ly8gdGhpcyBpbXBsZW1lbnRhdGlvbiBpcyBub3QgMTAwJSBwZXJmZWN0IGZvciB3ZWlyZCBtZWRpYSBxdWVyeSBjb21iaW5hdGlvbnNcclxuXHRcdFx0Ly8gIHdoZW4gYSBtb2R1bGUgaXMgaW1wb3J0ZWQgbXVsdGlwbGUgdGltZXMgd2l0aCBkaWZmZXJlbnQgbWVkaWEgcXVlcmllcy5cclxuXHRcdFx0Ly8gIEkgaG9wZSB0aGlzIHdpbGwgbmV2ZXIgb2NjdXIgKEhleSB0aGlzIHdheSB3ZSBoYXZlIHNtYWxsZXIgYnVuZGxlcylcclxuXHRcdFx0aWYodHlwZW9mIGl0ZW1bMF0gIT09IFwibnVtYmVyXCIgfHwgIWFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcclxuXHRcdFx0XHRpZihtZWRpYVF1ZXJ5ICYmICFpdGVtWzJdKSB7XHJcblx0XHRcdFx0XHRpdGVtWzJdID0gbWVkaWFRdWVyeTtcclxuXHRcdFx0XHR9IGVsc2UgaWYobWVkaWFRdWVyeSkge1xyXG5cdFx0XHRcdFx0aXRlbVsyXSA9IFwiKFwiICsgaXRlbVsyXSArIFwiKSBhbmQgKFwiICsgbWVkaWFRdWVyeSArIFwiKVwiO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRsaXN0LnB1c2goaXRlbSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9O1xyXG5cdHJldHVybiBsaXN0O1xyXG59O1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1xuICoqIG1vZHVsZSBpZCA9IDNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qXHJcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcclxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXHJcbiovXHJcbnZhciBzdHlsZXNJbkRvbSA9IHt9LFxyXG5cdG1lbW9pemUgPSBmdW5jdGlvbihmbikge1xyXG5cdFx0dmFyIG1lbW87XHJcblx0XHRyZXR1cm4gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRpZiAodHlwZW9mIG1lbW8gPT09IFwidW5kZWZpbmVkXCIpIG1lbW8gPSBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG5cdFx0XHRyZXR1cm4gbWVtbztcclxuXHRcdH07XHJcblx0fSxcclxuXHRpc09sZElFID0gbWVtb2l6ZShmdW5jdGlvbigpIHtcclxuXHRcdHJldHVybiAvbXNpZSBbNi05XVxcYi8udGVzdCh3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpKTtcclxuXHR9KSxcclxuXHRnZXRIZWFkRWxlbWVudCA9IG1lbW9pemUoZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuIGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdO1xyXG5cdH0pLFxyXG5cdHNpbmdsZXRvbkVsZW1lbnQgPSBudWxsLFxyXG5cdHNpbmdsZXRvbkNvdW50ZXIgPSAwLFxyXG5cdHN0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wID0gW107XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QsIG9wdGlvbnMpIHtcclxuXHRpZih0eXBlb2YgREVCVUcgIT09IFwidW5kZWZpbmVkXCIgJiYgREVCVUcpIHtcclxuXHRcdGlmKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJvYmplY3RcIikgdGhyb3cgbmV3IEVycm9yKFwiVGhlIHN0eWxlLWxvYWRlciBjYW5ub3QgYmUgdXNlZCBpbiBhIG5vbi1icm93c2VyIGVudmlyb25tZW50XCIpO1xyXG5cdH1cclxuXHJcblx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcblx0Ly8gRm9yY2Ugc2luZ2xlLXRhZyBzb2x1dGlvbiBvbiBJRTYtOSwgd2hpY2ggaGFzIGEgaGFyZCBsaW1pdCBvbiB0aGUgIyBvZiA8c3R5bGU+XHJcblx0Ly8gdGFncyBpdCB3aWxsIGFsbG93IG9uIGEgcGFnZVxyXG5cdGlmICh0eXBlb2Ygb3B0aW9ucy5zaW5nbGV0b24gPT09IFwidW5kZWZpbmVkXCIpIG9wdGlvbnMuc2luZ2xldG9uID0gaXNPbGRJRSgpO1xyXG5cclxuXHQvLyBCeSBkZWZhdWx0LCBhZGQgPHN0eWxlPiB0YWdzIHRvIHRoZSBib3R0b20gb2YgPGhlYWQ+LlxyXG5cdGlmICh0eXBlb2Ygb3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJ1bmRlZmluZWRcIikgb3B0aW9ucy5pbnNlcnRBdCA9IFwiYm90dG9tXCI7XHJcblxyXG5cdHZhciBzdHlsZXMgPSBsaXN0VG9TdHlsZXMobGlzdCk7XHJcblx0YWRkU3R5bGVzVG9Eb20oc3R5bGVzLCBvcHRpb25zKTtcclxuXHJcblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XHJcblx0XHR2YXIgbWF5UmVtb3ZlID0gW107XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xyXG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcclxuXHRcdFx0ZG9tU3R5bGUucmVmcy0tO1xyXG5cdFx0XHRtYXlSZW1vdmUucHVzaChkb21TdHlsZSk7XHJcblx0XHR9XHJcblx0XHRpZihuZXdMaXN0KSB7XHJcblx0XHRcdHZhciBuZXdTdHlsZXMgPSBsaXN0VG9TdHlsZXMobmV3TGlzdCk7XHJcblx0XHRcdGFkZFN0eWxlc1RvRG9tKG5ld1N0eWxlcywgb3B0aW9ucyk7XHJcblx0XHR9XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgbWF5UmVtb3ZlLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBkb21TdHlsZSA9IG1heVJlbW92ZVtpXTtcclxuXHRcdFx0aWYoZG9tU3R5bGUucmVmcyA9PT0gMCkge1xyXG5cdFx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKylcclxuXHRcdFx0XHRcdGRvbVN0eWxlLnBhcnRzW2pdKCk7XHJcblx0XHRcdFx0ZGVsZXRlIHN0eWxlc0luRG9tW2RvbVN0eWxlLmlkXTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZFN0eWxlc1RvRG9tKHN0eWxlcywgb3B0aW9ucykge1xyXG5cdGZvcih2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xyXG5cdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XHJcblx0XHRpZihkb21TdHlsZSkge1xyXG5cdFx0XHRkb21TdHlsZS5yZWZzKys7XHJcblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzW2pdKGl0ZW0ucGFydHNbal0pO1xyXG5cdFx0XHR9XHJcblx0XHRcdGZvcig7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XHJcblx0XHRcdFx0ZG9tU3R5bGUucGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHZhciBwYXJ0cyA9IFtdO1xyXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdHBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHN0eWxlc0luRG9tW2l0ZW0uaWRdID0ge2lkOiBpdGVtLmlkLCByZWZzOiAxLCBwYXJ0czogcGFydHN9O1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gbGlzdFRvU3R5bGVzKGxpc3QpIHtcclxuXHR2YXIgc3R5bGVzID0gW107XHJcblx0dmFyIG5ld1N0eWxlcyA9IHt9O1xyXG5cdGZvcih2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XHJcblx0XHR2YXIgaXRlbSA9IGxpc3RbaV07XHJcblx0XHR2YXIgaWQgPSBpdGVtWzBdO1xyXG5cdFx0dmFyIGNzcyA9IGl0ZW1bMV07XHJcblx0XHR2YXIgbWVkaWEgPSBpdGVtWzJdO1xyXG5cdFx0dmFyIHNvdXJjZU1hcCA9IGl0ZW1bM107XHJcblx0XHR2YXIgcGFydCA9IHtjc3M6IGNzcywgbWVkaWE6IG1lZGlhLCBzb3VyY2VNYXA6IHNvdXJjZU1hcH07XHJcblx0XHRpZighbmV3U3R5bGVzW2lkXSlcclxuXHRcdFx0c3R5bGVzLnB1c2gobmV3U3R5bGVzW2lkXSA9IHtpZDogaWQsIHBhcnRzOiBbcGFydF19KTtcclxuXHRcdGVsc2VcclxuXHRcdFx0bmV3U3R5bGVzW2lkXS5wYXJ0cy5wdXNoKHBhcnQpO1xyXG5cdH1cclxuXHRyZXR1cm4gc3R5bGVzO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgc3R5bGVFbGVtZW50KSB7XHJcblx0dmFyIGhlYWQgPSBnZXRIZWFkRWxlbWVudCgpO1xyXG5cdHZhciBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCA9IHN0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wW3N0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wLmxlbmd0aCAtIDFdO1xyXG5cdGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcInRvcFwiKSB7XHJcblx0XHRpZighbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3ApIHtcclxuXHRcdFx0aGVhZC5pbnNlcnRCZWZvcmUoc3R5bGVFbGVtZW50LCBoZWFkLmZpcnN0Q2hpbGQpO1xyXG5cdFx0fSBlbHNlIGlmKGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKSB7XHJcblx0XHRcdGhlYWQuaW5zZXJ0QmVmb3JlKHN0eWxlRWxlbWVudCwgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0aGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnQpO1xyXG5cdFx0fVxyXG5cdFx0c3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3AucHVzaChzdHlsZUVsZW1lbnQpO1xyXG5cdH0gZWxzZSBpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJib3R0b21cIikge1xyXG5cdFx0aGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnQpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHZhbHVlIGZvciBwYXJhbWV0ZXIgJ2luc2VydEF0Jy4gTXVzdCBiZSAndG9wJyBvciAnYm90dG9tJy5cIik7XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XHJcblx0c3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcclxuXHR2YXIgaWR4ID0gc3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3AuaW5kZXhPZihzdHlsZUVsZW1lbnQpO1xyXG5cdGlmKGlkeCA+PSAwKSB7XHJcblx0XHRzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcC5zcGxpY2UoaWR4LCAxKTtcclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKSB7XHJcblx0dmFyIHN0eWxlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcclxuXHRzdHlsZUVsZW1lbnQudHlwZSA9IFwidGV4dC9jc3NcIjtcclxuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgc3R5bGVFbGVtZW50KTtcclxuXHRyZXR1cm4gc3R5bGVFbGVtZW50O1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVMaW5rRWxlbWVudChvcHRpb25zKSB7XHJcblx0dmFyIGxpbmtFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIik7XHJcblx0bGlua0VsZW1lbnQucmVsID0gXCJzdHlsZXNoZWV0XCI7XHJcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIGxpbmtFbGVtZW50KTtcclxuXHRyZXR1cm4gbGlua0VsZW1lbnQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZFN0eWxlKG9iaiwgb3B0aW9ucykge1xyXG5cdHZhciBzdHlsZUVsZW1lbnQsIHVwZGF0ZSwgcmVtb3ZlO1xyXG5cclxuXHRpZiAob3B0aW9ucy5zaW5nbGV0b24pIHtcclxuXHRcdHZhciBzdHlsZUluZGV4ID0gc2luZ2xldG9uQ291bnRlcisrO1xyXG5cdFx0c3R5bGVFbGVtZW50ID0gc2luZ2xldG9uRWxlbWVudCB8fCAoc2luZ2xldG9uRWxlbWVudCA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKSk7XHJcblx0XHR1cGRhdGUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50LCBzdHlsZUluZGV4LCBmYWxzZSk7XHJcblx0XHRyZW1vdmUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50LCBzdHlsZUluZGV4LCB0cnVlKTtcclxuXHR9IGVsc2UgaWYob2JqLnNvdXJjZU1hcCAmJlxyXG5cdFx0dHlwZW9mIFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXHJcblx0XHR0eXBlb2YgVVJMLmNyZWF0ZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXHJcblx0XHR0eXBlb2YgVVJMLnJldm9rZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXHJcblx0XHR0eXBlb2YgQmxvYiA9PT0gXCJmdW5jdGlvblwiICYmXHJcblx0XHR0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XHJcblx0XHRzdHlsZUVsZW1lbnQgPSBjcmVhdGVMaW5rRWxlbWVudChvcHRpb25zKTtcclxuXHRcdHVwZGF0ZSA9IHVwZGF0ZUxpbmsuYmluZChudWxsLCBzdHlsZUVsZW1lbnQpO1xyXG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xyXG5cdFx0XHRpZihzdHlsZUVsZW1lbnQuaHJlZilcclxuXHRcdFx0XHRVUkwucmV2b2tlT2JqZWN0VVJMKHN0eWxlRWxlbWVudC5ocmVmKTtcclxuXHRcdH07XHJcblx0fSBlbHNlIHtcclxuXHRcdHN0eWxlRWxlbWVudCA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKTtcclxuXHRcdHVwZGF0ZSA9IGFwcGx5VG9UYWcuYmluZChudWxsLCBzdHlsZUVsZW1lbnQpO1xyXG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdHVwZGF0ZShvYmopO1xyXG5cclxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlU3R5bGUobmV3T2JqKSB7XHJcblx0XHRpZihuZXdPYmopIHtcclxuXHRcdFx0aWYobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwKVxyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0dXBkYXRlKG9iaiA9IG5ld09iaik7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZW1vdmUoKTtcclxuXHRcdH1cclxuXHR9O1xyXG59XHJcblxyXG52YXIgcmVwbGFjZVRleHQgPSAoZnVuY3Rpb24gKCkge1xyXG5cdHZhciB0ZXh0U3RvcmUgPSBbXTtcclxuXHJcblx0cmV0dXJuIGZ1bmN0aW9uIChpbmRleCwgcmVwbGFjZW1lbnQpIHtcclxuXHRcdHRleHRTdG9yZVtpbmRleF0gPSByZXBsYWNlbWVudDtcclxuXHRcdHJldHVybiB0ZXh0U3RvcmUuZmlsdGVyKEJvb2xlYW4pLmpvaW4oJ1xcbicpO1xyXG5cdH07XHJcbn0pKCk7XHJcblxyXG5mdW5jdGlvbiBhcHBseVRvU2luZ2xldG9uVGFnKHN0eWxlRWxlbWVudCwgaW5kZXgsIHJlbW92ZSwgb2JqKSB7XHJcblx0dmFyIGNzcyA9IHJlbW92ZSA/IFwiXCIgOiBvYmouY3NzO1xyXG5cclxuXHRpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcclxuXHRcdHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSByZXBsYWNlVGV4dChpbmRleCwgY3NzKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0dmFyIGNzc05vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpO1xyXG5cdFx0dmFyIGNoaWxkTm9kZXMgPSBzdHlsZUVsZW1lbnQuY2hpbGROb2RlcztcclxuXHRcdGlmIChjaGlsZE5vZGVzW2luZGV4XSkgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKGNoaWxkTm9kZXNbaW5kZXhdKTtcclxuXHRcdGlmIChjaGlsZE5vZGVzLmxlbmd0aCkge1xyXG5cdFx0XHRzdHlsZUVsZW1lbnQuaW5zZXJ0QmVmb3JlKGNzc05vZGUsIGNoaWxkTm9kZXNbaW5kZXhdKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChjc3NOb2RlKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFwcGx5VG9UYWcoc3R5bGVFbGVtZW50LCBvYmopIHtcclxuXHR2YXIgY3NzID0gb2JqLmNzcztcclxuXHR2YXIgbWVkaWEgPSBvYmoubWVkaWE7XHJcblxyXG5cdGlmKG1lZGlhKSB7XHJcblx0XHRzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibWVkaWFcIiwgbWVkaWEpXHJcblx0fVxyXG5cclxuXHRpZihzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xyXG5cdFx0c3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcclxuXHR9IGVsc2Uge1xyXG5cdFx0d2hpbGUoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcclxuXHRcdFx0c3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcclxuXHRcdH1cclxuXHRcdHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZUxpbmsobGlua0VsZW1lbnQsIG9iaikge1xyXG5cdHZhciBjc3MgPSBvYmouY3NzO1xyXG5cdHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xyXG5cclxuXHRpZihzb3VyY2VNYXApIHtcclxuXHRcdC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI2NjAzODc1XHJcblx0XHRjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiICsgYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSArIFwiICovXCI7XHJcblx0fVxyXG5cclxuXHR2YXIgYmxvYiA9IG5ldyBCbG9iKFtjc3NdLCB7IHR5cGU6IFwidGV4dC9jc3NcIiB9KTtcclxuXHJcblx0dmFyIG9sZFNyYyA9IGxpbmtFbGVtZW50LmhyZWY7XHJcblxyXG5cdGxpbmtFbGVtZW50LmhyZWYgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xyXG5cclxuXHRpZihvbGRTcmMpXHJcblx0XHRVUkwucmV2b2tlT2JqZWN0VVJMKG9sZFNyYyk7XHJcbn1cclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qc1xuICoqIG1vZHVsZSBpZCA9IDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qISBqUXVlcnkgdjMuMS4wIHwgKGMpIGpRdWVyeSBGb3VuZGF0aW9uIHwganF1ZXJ5Lm9yZy9saWNlbnNlICovXG4hZnVuY3Rpb24oYSxiKXtcInVzZSBzdHJpY3RcIjtcIm9iamVjdFwiPT10eXBlb2YgbW9kdWxlJiZcIm9iamVjdFwiPT10eXBlb2YgbW9kdWxlLmV4cG9ydHM/bW9kdWxlLmV4cG9ydHM9YS5kb2N1bWVudD9iKGEsITApOmZ1bmN0aW9uKGEpe2lmKCFhLmRvY3VtZW50KXRocm93IG5ldyBFcnJvcihcImpRdWVyeSByZXF1aXJlcyBhIHdpbmRvdyB3aXRoIGEgZG9jdW1lbnRcIik7cmV0dXJuIGIoYSl9OmIoYSl9KFwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3c/d2luZG93OnRoaXMsZnVuY3Rpb24oYSxiKXtcInVzZSBzdHJpY3RcIjt2YXIgYz1bXSxkPWEuZG9jdW1lbnQsZT1PYmplY3QuZ2V0UHJvdG90eXBlT2YsZj1jLnNsaWNlLGc9Yy5jb25jYXQsaD1jLnB1c2gsaT1jLmluZGV4T2Ysaj17fSxrPWoudG9TdHJpbmcsbD1qLmhhc093blByb3BlcnR5LG09bC50b1N0cmluZyxuPW0uY2FsbChPYmplY3QpLG89e307ZnVuY3Rpb24gcChhLGIpe2I9Ynx8ZDt2YXIgYz1iLmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7Yy50ZXh0PWEsYi5oZWFkLmFwcGVuZENoaWxkKGMpLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoYyl9dmFyIHE9XCIzLjEuMFwiLHI9ZnVuY3Rpb24oYSxiKXtyZXR1cm4gbmV3IHIuZm4uaW5pdChhLGIpfSxzPS9eW1xcc1xcdUZFRkZcXHhBMF0rfFtcXHNcXHVGRUZGXFx4QTBdKyQvZyx0PS9eLW1zLS8sdT0vLShbYS16XSkvZyx2PWZ1bmN0aW9uKGEsYil7cmV0dXJuIGIudG9VcHBlckNhc2UoKX07ci5mbj1yLnByb3RvdHlwZT17anF1ZXJ5OnEsY29uc3RydWN0b3I6cixsZW5ndGg6MCx0b0FycmF5OmZ1bmN0aW9uKCl7cmV0dXJuIGYuY2FsbCh0aGlzKX0sZ2V0OmZ1bmN0aW9uKGEpe3JldHVybiBudWxsIT1hP2E8MD90aGlzW2ErdGhpcy5sZW5ndGhdOnRoaXNbYV06Zi5jYWxsKHRoaXMpfSxwdXNoU3RhY2s6ZnVuY3Rpb24oYSl7dmFyIGI9ci5tZXJnZSh0aGlzLmNvbnN0cnVjdG9yKCksYSk7cmV0dXJuIGIucHJldk9iamVjdD10aGlzLGJ9LGVhY2g6ZnVuY3Rpb24oYSl7cmV0dXJuIHIuZWFjaCh0aGlzLGEpfSxtYXA6ZnVuY3Rpb24oYSl7cmV0dXJuIHRoaXMucHVzaFN0YWNrKHIubWFwKHRoaXMsZnVuY3Rpb24oYixjKXtyZXR1cm4gYS5jYWxsKGIsYyxiKX0pKX0sc2xpY2U6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5wdXNoU3RhY2soZi5hcHBseSh0aGlzLGFyZ3VtZW50cykpfSxmaXJzdDpmdW5jdGlvbigpe3JldHVybiB0aGlzLmVxKDApfSxsYXN0OmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuZXEoLTEpfSxlcTpmdW5jdGlvbihhKXt2YXIgYj10aGlzLmxlbmd0aCxjPSthKyhhPDA/YjowKTtyZXR1cm4gdGhpcy5wdXNoU3RhY2soYz49MCYmYzxiP1t0aGlzW2NdXTpbXSl9LGVuZDpmdW5jdGlvbigpe3JldHVybiB0aGlzLnByZXZPYmplY3R8fHRoaXMuY29uc3RydWN0b3IoKX0scHVzaDpoLHNvcnQ6Yy5zb3J0LHNwbGljZTpjLnNwbGljZX0sci5leHRlbmQ9ci5mbi5leHRlbmQ9ZnVuY3Rpb24oKXt2YXIgYSxiLGMsZCxlLGYsZz1hcmd1bWVudHNbMF18fHt9LGg9MSxpPWFyZ3VtZW50cy5sZW5ndGgsaj0hMTtmb3IoXCJib29sZWFuXCI9PXR5cGVvZiBnJiYoaj1nLGc9YXJndW1lbnRzW2hdfHx7fSxoKyspLFwib2JqZWN0XCI9PXR5cGVvZiBnfHxyLmlzRnVuY3Rpb24oZyl8fChnPXt9KSxoPT09aSYmKGc9dGhpcyxoLS0pO2g8aTtoKyspaWYobnVsbCE9KGE9YXJndW1lbnRzW2hdKSlmb3IoYiBpbiBhKWM9Z1tiXSxkPWFbYl0sZyE9PWQmJihqJiZkJiYoci5pc1BsYWluT2JqZWN0KGQpfHwoZT1yLmlzQXJyYXkoZCkpKT8oZT8oZT0hMSxmPWMmJnIuaXNBcnJheShjKT9jOltdKTpmPWMmJnIuaXNQbGFpbk9iamVjdChjKT9jOnt9LGdbYl09ci5leHRlbmQoaixmLGQpKTp2b2lkIDAhPT1kJiYoZ1tiXT1kKSk7cmV0dXJuIGd9LHIuZXh0ZW5kKHtleHBhbmRvOlwialF1ZXJ5XCIrKHErTWF0aC5yYW5kb20oKSkucmVwbGFjZSgvXFxEL2csXCJcIiksaXNSZWFkeTohMCxlcnJvcjpmdW5jdGlvbihhKXt0aHJvdyBuZXcgRXJyb3IoYSl9LG5vb3A6ZnVuY3Rpb24oKXt9LGlzRnVuY3Rpb246ZnVuY3Rpb24oYSl7cmV0dXJuXCJmdW5jdGlvblwiPT09ci50eXBlKGEpfSxpc0FycmF5OkFycmF5LmlzQXJyYXksaXNXaW5kb3c6ZnVuY3Rpb24oYSl7cmV0dXJuIG51bGwhPWEmJmE9PT1hLndpbmRvd30saXNOdW1lcmljOmZ1bmN0aW9uKGEpe3ZhciBiPXIudHlwZShhKTtyZXR1cm4oXCJudW1iZXJcIj09PWJ8fFwic3RyaW5nXCI9PT1iKSYmIWlzTmFOKGEtcGFyc2VGbG9hdChhKSl9LGlzUGxhaW5PYmplY3Q6ZnVuY3Rpb24oYSl7dmFyIGIsYztyZXR1cm4hKCFhfHxcIltvYmplY3QgT2JqZWN0XVwiIT09ay5jYWxsKGEpKSYmKCEoYj1lKGEpKXx8KGM9bC5jYWxsKGIsXCJjb25zdHJ1Y3RvclwiKSYmYi5jb25zdHJ1Y3RvcixcImZ1bmN0aW9uXCI9PXR5cGVvZiBjJiZtLmNhbGwoYyk9PT1uKSl9LGlzRW1wdHlPYmplY3Q6ZnVuY3Rpb24oYSl7dmFyIGI7Zm9yKGIgaW4gYSlyZXR1cm4hMTtyZXR1cm4hMH0sdHlwZTpmdW5jdGlvbihhKXtyZXR1cm4gbnVsbD09YT9hK1wiXCI6XCJvYmplY3RcIj09dHlwZW9mIGF8fFwiZnVuY3Rpb25cIj09dHlwZW9mIGE/altrLmNhbGwoYSldfHxcIm9iamVjdFwiOnR5cGVvZiBhfSxnbG9iYWxFdmFsOmZ1bmN0aW9uKGEpe3AoYSl9LGNhbWVsQ2FzZTpmdW5jdGlvbihhKXtyZXR1cm4gYS5yZXBsYWNlKHQsXCJtcy1cIikucmVwbGFjZSh1LHYpfSxub2RlTmFtZTpmdW5jdGlvbihhLGIpe3JldHVybiBhLm5vZGVOYW1lJiZhLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCk9PT1iLnRvTG93ZXJDYXNlKCl9LGVhY2g6ZnVuY3Rpb24oYSxiKXt2YXIgYyxkPTA7aWYodyhhKSl7Zm9yKGM9YS5sZW5ndGg7ZDxjO2QrKylpZihiLmNhbGwoYVtkXSxkLGFbZF0pPT09ITEpYnJlYWt9ZWxzZSBmb3IoZCBpbiBhKWlmKGIuY2FsbChhW2RdLGQsYVtkXSk9PT0hMSlicmVhaztyZXR1cm4gYX0sdHJpbTpmdW5jdGlvbihhKXtyZXR1cm4gbnVsbD09YT9cIlwiOihhK1wiXCIpLnJlcGxhY2UocyxcIlwiKX0sbWFrZUFycmF5OmZ1bmN0aW9uKGEsYil7dmFyIGM9Ynx8W107cmV0dXJuIG51bGwhPWEmJih3KE9iamVjdChhKSk/ci5tZXJnZShjLFwic3RyaW5nXCI9PXR5cGVvZiBhP1thXTphKTpoLmNhbGwoYyxhKSksY30saW5BcnJheTpmdW5jdGlvbihhLGIsYyl7cmV0dXJuIG51bGw9PWI/LTE6aS5jYWxsKGIsYSxjKX0sbWVyZ2U6ZnVuY3Rpb24oYSxiKXtmb3IodmFyIGM9K2IubGVuZ3RoLGQ9MCxlPWEubGVuZ3RoO2Q8YztkKyspYVtlKytdPWJbZF07cmV0dXJuIGEubGVuZ3RoPWUsYX0sZ3JlcDpmdW5jdGlvbihhLGIsYyl7Zm9yKHZhciBkLGU9W10sZj0wLGc9YS5sZW5ndGgsaD0hYztmPGc7ZisrKWQ9IWIoYVtmXSxmKSxkIT09aCYmZS5wdXNoKGFbZl0pO3JldHVybiBlfSxtYXA6ZnVuY3Rpb24oYSxiLGMpe3ZhciBkLGUsZj0wLGg9W107aWYodyhhKSlmb3IoZD1hLmxlbmd0aDtmPGQ7ZisrKWU9YihhW2ZdLGYsYyksbnVsbCE9ZSYmaC5wdXNoKGUpO2Vsc2UgZm9yKGYgaW4gYSllPWIoYVtmXSxmLGMpLG51bGwhPWUmJmgucHVzaChlKTtyZXR1cm4gZy5hcHBseShbXSxoKX0sZ3VpZDoxLHByb3h5OmZ1bmN0aW9uKGEsYil7dmFyIGMsZCxlO2lmKFwic3RyaW5nXCI9PXR5cGVvZiBiJiYoYz1hW2JdLGI9YSxhPWMpLHIuaXNGdW5jdGlvbihhKSlyZXR1cm4gZD1mLmNhbGwoYXJndW1lbnRzLDIpLGU9ZnVuY3Rpb24oKXtyZXR1cm4gYS5hcHBseShifHx0aGlzLGQuY29uY2F0KGYuY2FsbChhcmd1bWVudHMpKSl9LGUuZ3VpZD1hLmd1aWQ9YS5ndWlkfHxyLmd1aWQrKyxlfSxub3c6RGF0ZS5ub3csc3VwcG9ydDpvfSksXCJmdW5jdGlvblwiPT10eXBlb2YgU3ltYm9sJiYoci5mbltTeW1ib2wuaXRlcmF0b3JdPWNbU3ltYm9sLml0ZXJhdG9yXSksci5lYWNoKFwiQm9vbGVhbiBOdW1iZXIgU3RyaW5nIEZ1bmN0aW9uIEFycmF5IERhdGUgUmVnRXhwIE9iamVjdCBFcnJvciBTeW1ib2xcIi5zcGxpdChcIiBcIiksZnVuY3Rpb24oYSxiKXtqW1wiW29iamVjdCBcIitiK1wiXVwiXT1iLnRvTG93ZXJDYXNlKCl9KTtmdW5jdGlvbiB3KGEpe3ZhciBiPSEhYSYmXCJsZW5ndGhcImluIGEmJmEubGVuZ3RoLGM9ci50eXBlKGEpO3JldHVyblwiZnVuY3Rpb25cIiE9PWMmJiFyLmlzV2luZG93KGEpJiYoXCJhcnJheVwiPT09Y3x8MD09PWJ8fFwibnVtYmVyXCI9PXR5cGVvZiBiJiZiPjAmJmItMSBpbiBhKX12YXIgeD1mdW5jdGlvbihhKXt2YXIgYixjLGQsZSxmLGcsaCxpLGosayxsLG0sbixvLHAscSxyLHMsdCx1PVwic2l6emxlXCIrMSpuZXcgRGF0ZSx2PWEuZG9jdW1lbnQsdz0wLHg9MCx5PWhhKCksej1oYSgpLEE9aGEoKSxCPWZ1bmN0aW9uKGEsYil7cmV0dXJuIGE9PT1iJiYobD0hMCksMH0sQz17fS5oYXNPd25Qcm9wZXJ0eSxEPVtdLEU9RC5wb3AsRj1ELnB1c2gsRz1ELnB1c2gsSD1ELnNsaWNlLEk9ZnVuY3Rpb24oYSxiKXtmb3IodmFyIGM9MCxkPWEubGVuZ3RoO2M8ZDtjKyspaWYoYVtjXT09PWIpcmV0dXJuIGM7cmV0dXJuLTF9LEo9XCJjaGVja2VkfHNlbGVjdGVkfGFzeW5jfGF1dG9mb2N1c3xhdXRvcGxheXxjb250cm9sc3xkZWZlcnxkaXNhYmxlZHxoaWRkZW58aXNtYXB8bG9vcHxtdWx0aXBsZXxvcGVufHJlYWRvbmx5fHJlcXVpcmVkfHNjb3BlZFwiLEs9XCJbXFxcXHgyMFxcXFx0XFxcXHJcXFxcblxcXFxmXVwiLEw9XCIoPzpcXFxcXFxcXC58W1xcXFx3LV18W15cXDAtXFxcXHhhMF0pK1wiLE09XCJcXFxcW1wiK0srXCIqKFwiK0wrXCIpKD86XCIrSytcIiooWypeJHwhfl0/PSlcIitLK1wiKig/OicoKD86XFxcXFxcXFwufFteXFxcXFxcXFwnXSkqKSd8XFxcIigoPzpcXFxcXFxcXC58W15cXFxcXFxcXFxcXCJdKSopXFxcInwoXCIrTCtcIikpfClcIitLK1wiKlxcXFxdXCIsTj1cIjooXCIrTCtcIikoPzpcXFxcKCgoJygoPzpcXFxcXFxcXC58W15cXFxcXFxcXCddKSopJ3xcXFwiKCg/OlxcXFxcXFxcLnxbXlxcXFxcXFxcXFxcIl0pKilcXFwiKXwoKD86XFxcXFxcXFwufFteXFxcXFxcXFwoKVtcXFxcXV18XCIrTStcIikqKXwuKilcXFxcKXwpXCIsTz1uZXcgUmVnRXhwKEsrXCIrXCIsXCJnXCIpLFA9bmV3IFJlZ0V4cChcIl5cIitLK1wiK3woKD86XnxbXlxcXFxcXFxcXSkoPzpcXFxcXFxcXC4pKilcIitLK1wiKyRcIixcImdcIiksUT1uZXcgUmVnRXhwKFwiXlwiK0srXCIqLFwiK0srXCIqXCIpLFI9bmV3IFJlZ0V4cChcIl5cIitLK1wiKihbPit+XXxcIitLK1wiKVwiK0srXCIqXCIpLFM9bmV3IFJlZ0V4cChcIj1cIitLK1wiKihbXlxcXFxdJ1xcXCJdKj8pXCIrSytcIipcXFxcXVwiLFwiZ1wiKSxUPW5ldyBSZWdFeHAoTiksVT1uZXcgUmVnRXhwKFwiXlwiK0wrXCIkXCIpLFY9e0lEOm5ldyBSZWdFeHAoXCJeIyhcIitMK1wiKVwiKSxDTEFTUzpuZXcgUmVnRXhwKFwiXlxcXFwuKFwiK0wrXCIpXCIpLFRBRzpuZXcgUmVnRXhwKFwiXihcIitMK1wifFsqXSlcIiksQVRUUjpuZXcgUmVnRXhwKFwiXlwiK00pLFBTRVVETzpuZXcgUmVnRXhwKFwiXlwiK04pLENISUxEOm5ldyBSZWdFeHAoXCJeOihvbmx5fGZpcnN0fGxhc3R8bnRofG50aC1sYXN0KS0oY2hpbGR8b2YtdHlwZSkoPzpcXFxcKFwiK0srXCIqKGV2ZW58b2RkfCgoWystXXwpKFxcXFxkKilufClcIitLK1wiKig/OihbKy1dfClcIitLK1wiKihcXFxcZCspfCkpXCIrSytcIipcXFxcKXwpXCIsXCJpXCIpLGJvb2w6bmV3IFJlZ0V4cChcIl4oPzpcIitKK1wiKSRcIixcImlcIiksbmVlZHNDb250ZXh0Om5ldyBSZWdFeHAoXCJeXCIrSytcIipbPit+XXw6KGV2ZW58b2RkfGVxfGd0fGx0fG50aHxmaXJzdHxsYXN0KSg/OlxcXFwoXCIrSytcIiooKD86LVxcXFxkKT9cXFxcZCopXCIrSytcIipcXFxcKXwpKD89W14tXXwkKVwiLFwiaVwiKX0sVz0vXig/OmlucHV0fHNlbGVjdHx0ZXh0YXJlYXxidXR0b24pJC9pLFg9L15oXFxkJC9pLFk9L15bXntdK1xce1xccypcXFtuYXRpdmUgXFx3LyxaPS9eKD86IyhbXFx3LV0rKXwoXFx3Kyl8XFwuKFtcXHctXSspKSQvLCQ9L1srfl0vLF89bmV3IFJlZ0V4cChcIlxcXFxcXFxcKFtcXFxcZGEtZl17MSw2fVwiK0srXCI/fChcIitLK1wiKXwuKVwiLFwiaWdcIiksYWE9ZnVuY3Rpb24oYSxiLGMpe3ZhciBkPVwiMHhcIitiLTY1NTM2O3JldHVybiBkIT09ZHx8Yz9iOmQ8MD9TdHJpbmcuZnJvbUNoYXJDb2RlKGQrNjU1MzYpOlN0cmluZy5mcm9tQ2hhckNvZGUoZD4+MTB8NTUyOTYsMTAyMyZkfDU2MzIwKX0sYmE9LyhbXFwwLVxceDFmXFx4N2ZdfF4tP1xcZCl8Xi0kfFteXFx4ODAtXFx1RkZGRlxcdy1dL2csY2E9ZnVuY3Rpb24oYSxiKXtyZXR1cm4gYj9cIlxcMFwiPT09YT9cIlxcdWZmZmRcIjphLnNsaWNlKDAsLTEpK1wiXFxcXFwiK2EuY2hhckNvZGVBdChhLmxlbmd0aC0xKS50b1N0cmluZygxNikrXCIgXCI6XCJcXFxcXCIrYX0sZGE9ZnVuY3Rpb24oKXttKCl9LGVhPXRhKGZ1bmN0aW9uKGEpe3JldHVybiBhLmRpc2FibGVkPT09ITB9LHtkaXI6XCJwYXJlbnROb2RlXCIsbmV4dDpcImxlZ2VuZFwifSk7dHJ5e0cuYXBwbHkoRD1ILmNhbGwodi5jaGlsZE5vZGVzKSx2LmNoaWxkTm9kZXMpLERbdi5jaGlsZE5vZGVzLmxlbmd0aF0ubm9kZVR5cGV9Y2F0Y2goZmEpe0c9e2FwcGx5OkQubGVuZ3RoP2Z1bmN0aW9uKGEsYil7Ri5hcHBseShhLEguY2FsbChiKSl9OmZ1bmN0aW9uKGEsYil7dmFyIGM9YS5sZW5ndGgsZD0wO3doaWxlKGFbYysrXT1iW2QrK10pO2EubGVuZ3RoPWMtMX19fWZ1bmN0aW9uIGdhKGEsYixkLGUpe3ZhciBmLGgsaixrLGwsbyxyLHM9YiYmYi5vd25lckRvY3VtZW50LHc9Yj9iLm5vZGVUeXBlOjk7aWYoZD1kfHxbXSxcInN0cmluZ1wiIT10eXBlb2YgYXx8IWF8fDEhPT13JiY5IT09dyYmMTEhPT13KXJldHVybiBkO2lmKCFlJiYoKGI/Yi5vd25lckRvY3VtZW50fHxiOnYpIT09biYmbShiKSxiPWJ8fG4scCkpe2lmKDExIT09dyYmKGw9Wi5leGVjKGEpKSlpZihmPWxbMV0pe2lmKDk9PT13KXtpZighKGo9Yi5nZXRFbGVtZW50QnlJZChmKSkpcmV0dXJuIGQ7aWYoai5pZD09PWYpcmV0dXJuIGQucHVzaChqKSxkfWVsc2UgaWYocyYmKGo9cy5nZXRFbGVtZW50QnlJZChmKSkmJnQoYixqKSYmai5pZD09PWYpcmV0dXJuIGQucHVzaChqKSxkfWVsc2V7aWYobFsyXSlyZXR1cm4gRy5hcHBseShkLGIuZ2V0RWxlbWVudHNCeVRhZ05hbWUoYSkpLGQ7aWYoKGY9bFszXSkmJmMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSYmYi5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKXJldHVybiBHLmFwcGx5KGQsYi5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGYpKSxkfWlmKGMucXNhJiYhQVthK1wiIFwiXSYmKCFxfHwhcS50ZXN0KGEpKSl7aWYoMSE9PXcpcz1iLHI9YTtlbHNlIGlmKFwib2JqZWN0XCIhPT1iLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkpeyhrPWIuZ2V0QXR0cmlidXRlKFwiaWRcIikpP2s9ay5yZXBsYWNlKGJhLGNhKTpiLnNldEF0dHJpYnV0ZShcImlkXCIsaz11KSxvPWcoYSksaD1vLmxlbmd0aDt3aGlsZShoLS0pb1toXT1cIiNcIitrK1wiIFwiK3NhKG9baF0pO3I9by5qb2luKFwiLFwiKSxzPSQudGVzdChhKSYmcWEoYi5wYXJlbnROb2RlKXx8Yn1pZihyKXRyeXtyZXR1cm4gRy5hcHBseShkLHMucXVlcnlTZWxlY3RvckFsbChyKSksZH1jYXRjaCh4KXt9ZmluYWxseXtrPT09dSYmYi5yZW1vdmVBdHRyaWJ1dGUoXCJpZFwiKX19fXJldHVybiBpKGEucmVwbGFjZShQLFwiJDFcIiksYixkLGUpfWZ1bmN0aW9uIGhhKCl7dmFyIGE9W107ZnVuY3Rpb24gYihjLGUpe3JldHVybiBhLnB1c2goYytcIiBcIik+ZC5jYWNoZUxlbmd0aCYmZGVsZXRlIGJbYS5zaGlmdCgpXSxiW2MrXCIgXCJdPWV9cmV0dXJuIGJ9ZnVuY3Rpb24gaWEoYSl7cmV0dXJuIGFbdV09ITAsYX1mdW5jdGlvbiBqYShhKXt2YXIgYj1uLmNyZWF0ZUVsZW1lbnQoXCJmaWVsZHNldFwiKTt0cnl7cmV0dXJuISFhKGIpfWNhdGNoKGMpe3JldHVybiExfWZpbmFsbHl7Yi5wYXJlbnROb2RlJiZiLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoYiksYj1udWxsfX1mdW5jdGlvbiBrYShhLGIpe3ZhciBjPWEuc3BsaXQoXCJ8XCIpLGU9Yy5sZW5ndGg7d2hpbGUoZS0tKWQuYXR0ckhhbmRsZVtjW2VdXT1ifWZ1bmN0aW9uIGxhKGEsYil7dmFyIGM9YiYmYSxkPWMmJjE9PT1hLm5vZGVUeXBlJiYxPT09Yi5ub2RlVHlwZSYmYS5zb3VyY2VJbmRleC1iLnNvdXJjZUluZGV4O2lmKGQpcmV0dXJuIGQ7aWYoYyl3aGlsZShjPWMubmV4dFNpYmxpbmcpaWYoYz09PWIpcmV0dXJuLTE7cmV0dXJuIGE/MTotMX1mdW5jdGlvbiBtYShhKXtyZXR1cm4gZnVuY3Rpb24oYil7dmFyIGM9Yi5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpO3JldHVyblwiaW5wdXRcIj09PWMmJmIudHlwZT09PWF9fWZ1bmN0aW9uIG5hKGEpe3JldHVybiBmdW5jdGlvbihiKXt2YXIgYz1iLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCk7cmV0dXJuKFwiaW5wdXRcIj09PWN8fFwiYnV0dG9uXCI9PT1jKSYmYi50eXBlPT09YX19ZnVuY3Rpb24gb2EoYSl7cmV0dXJuIGZ1bmN0aW9uKGIpe3JldHVyblwibGFiZWxcImluIGImJmIuZGlzYWJsZWQ9PT1hfHxcImZvcm1cImluIGImJmIuZGlzYWJsZWQ9PT1hfHxcImZvcm1cImluIGImJmIuZGlzYWJsZWQ9PT0hMSYmKGIuaXNEaXNhYmxlZD09PWF8fGIuaXNEaXNhYmxlZCE9PSFhJiYoXCJsYWJlbFwiaW4gYnx8IWVhKGIpKSE9PWEpfX1mdW5jdGlvbiBwYShhKXtyZXR1cm4gaWEoZnVuY3Rpb24oYil7cmV0dXJuIGI9K2IsaWEoZnVuY3Rpb24oYyxkKXt2YXIgZSxmPWEoW10sYy5sZW5ndGgsYiksZz1mLmxlbmd0aDt3aGlsZShnLS0pY1tlPWZbZ11dJiYoY1tlXT0hKGRbZV09Y1tlXSkpfSl9KX1mdW5jdGlvbiBxYShhKXtyZXR1cm4gYSYmXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGEuZ2V0RWxlbWVudHNCeVRhZ05hbWUmJmF9Yz1nYS5zdXBwb3J0PXt9LGY9Z2EuaXNYTUw9ZnVuY3Rpb24oYSl7dmFyIGI9YSYmKGEub3duZXJEb2N1bWVudHx8YSkuZG9jdW1lbnRFbGVtZW50O3JldHVybiEhYiYmXCJIVE1MXCIhPT1iLm5vZGVOYW1lfSxtPWdhLnNldERvY3VtZW50PWZ1bmN0aW9uKGEpe3ZhciBiLGUsZz1hP2Eub3duZXJEb2N1bWVudHx8YTp2O3JldHVybiBnIT09biYmOT09PWcubm9kZVR5cGUmJmcuZG9jdW1lbnRFbGVtZW50PyhuPWcsbz1uLmRvY3VtZW50RWxlbWVudCxwPSFmKG4pLHYhPT1uJiYoZT1uLmRlZmF1bHRWaWV3KSYmZS50b3AhPT1lJiYoZS5hZGRFdmVudExpc3RlbmVyP2UuYWRkRXZlbnRMaXN0ZW5lcihcInVubG9hZFwiLGRhLCExKTplLmF0dGFjaEV2ZW50JiZlLmF0dGFjaEV2ZW50KFwib251bmxvYWRcIixkYSkpLGMuYXR0cmlidXRlcz1qYShmdW5jdGlvbihhKXtyZXR1cm4gYS5jbGFzc05hbWU9XCJpXCIsIWEuZ2V0QXR0cmlidXRlKFwiY2xhc3NOYW1lXCIpfSksYy5nZXRFbGVtZW50c0J5VGFnTmFtZT1qYShmdW5jdGlvbihhKXtyZXR1cm4gYS5hcHBlbmRDaGlsZChuLmNyZWF0ZUNvbW1lbnQoXCJcIikpLCFhLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiKlwiKS5sZW5ndGh9KSxjLmdldEVsZW1lbnRzQnlDbGFzc05hbWU9WS50ZXN0KG4uZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSksYy5nZXRCeUlkPWphKGZ1bmN0aW9uKGEpe3JldHVybiBvLmFwcGVuZENoaWxkKGEpLmlkPXUsIW4uZ2V0RWxlbWVudHNCeU5hbWV8fCFuLmdldEVsZW1lbnRzQnlOYW1lKHUpLmxlbmd0aH0pLGMuZ2V0QnlJZD8oZC5maW5kLklEPWZ1bmN0aW9uKGEsYil7aWYoXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGIuZ2V0RWxlbWVudEJ5SWQmJnApe3ZhciBjPWIuZ2V0RWxlbWVudEJ5SWQoYSk7cmV0dXJuIGM/W2NdOltdfX0sZC5maWx0ZXIuSUQ9ZnVuY3Rpb24oYSl7dmFyIGI9YS5yZXBsYWNlKF8sYWEpO3JldHVybiBmdW5jdGlvbihhKXtyZXR1cm4gYS5nZXRBdHRyaWJ1dGUoXCJpZFwiKT09PWJ9fSk6KGRlbGV0ZSBkLmZpbmQuSUQsZC5maWx0ZXIuSUQ9ZnVuY3Rpb24oYSl7dmFyIGI9YS5yZXBsYWNlKF8sYWEpO3JldHVybiBmdW5jdGlvbihhKXt2YXIgYz1cInVuZGVmaW5lZFwiIT10eXBlb2YgYS5nZXRBdHRyaWJ1dGVOb2RlJiZhLmdldEF0dHJpYnV0ZU5vZGUoXCJpZFwiKTtyZXR1cm4gYyYmYy52YWx1ZT09PWJ9fSksZC5maW5kLlRBRz1jLmdldEVsZW1lbnRzQnlUYWdOYW1lP2Z1bmN0aW9uKGEsYil7cmV0dXJuXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGIuZ2V0RWxlbWVudHNCeVRhZ05hbWU/Yi5nZXRFbGVtZW50c0J5VGFnTmFtZShhKTpjLnFzYT9iLnF1ZXJ5U2VsZWN0b3JBbGwoYSk6dm9pZCAwfTpmdW5jdGlvbihhLGIpe3ZhciBjLGQ9W10sZT0wLGY9Yi5nZXRFbGVtZW50c0J5VGFnTmFtZShhKTtpZihcIipcIj09PWEpe3doaWxlKGM9ZltlKytdKTE9PT1jLm5vZGVUeXBlJiZkLnB1c2goYyk7cmV0dXJuIGR9cmV0dXJuIGZ9LGQuZmluZC5DTEFTUz1jLmdldEVsZW1lbnRzQnlDbGFzc05hbWUmJmZ1bmN0aW9uKGEsYil7aWYoXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGIuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSYmcClyZXR1cm4gYi5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGEpfSxyPVtdLHE9W10sKGMucXNhPVkudGVzdChuLnF1ZXJ5U2VsZWN0b3JBbGwpKSYmKGphKGZ1bmN0aW9uKGEpe28uYXBwZW5kQ2hpbGQoYSkuaW5uZXJIVE1MPVwiPGEgaWQ9J1wiK3UrXCInPjwvYT48c2VsZWN0IGlkPSdcIit1K1wiLVxcclxcXFwnIG1zYWxsb3djYXB0dXJlPScnPjxvcHRpb24gc2VsZWN0ZWQ9Jyc+PC9vcHRpb24+PC9zZWxlY3Q+XCIsYS5xdWVyeVNlbGVjdG9yQWxsKFwiW21zYWxsb3djYXB0dXJlXj0nJ11cIikubGVuZ3RoJiZxLnB1c2goXCJbKl4kXT1cIitLK1wiKig/OicnfFxcXCJcXFwiKVwiKSxhLnF1ZXJ5U2VsZWN0b3JBbGwoXCJbc2VsZWN0ZWRdXCIpLmxlbmd0aHx8cS5wdXNoKFwiXFxcXFtcIitLK1wiKig/OnZhbHVlfFwiK0orXCIpXCIpLGEucXVlcnlTZWxlY3RvckFsbChcIltpZH49XCIrdStcIi1dXCIpLmxlbmd0aHx8cS5wdXNoKFwifj1cIiksYS5xdWVyeVNlbGVjdG9yQWxsKFwiOmNoZWNrZWRcIikubGVuZ3RofHxxLnB1c2goXCI6Y2hlY2tlZFwiKSxhLnF1ZXJ5U2VsZWN0b3JBbGwoXCJhI1wiK3UrXCIrKlwiKS5sZW5ndGh8fHEucHVzaChcIi4jLitbK35dXCIpfSksamEoZnVuY3Rpb24oYSl7YS5pbm5lckhUTUw9XCI8YSBocmVmPScnIGRpc2FibGVkPSdkaXNhYmxlZCc+PC9hPjxzZWxlY3QgZGlzYWJsZWQ9J2Rpc2FibGVkJz48b3B0aW9uLz48L3NlbGVjdD5cIjt2YXIgYj1uLmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtiLnNldEF0dHJpYnV0ZShcInR5cGVcIixcImhpZGRlblwiKSxhLmFwcGVuZENoaWxkKGIpLnNldEF0dHJpYnV0ZShcIm5hbWVcIixcIkRcIiksYS5xdWVyeVNlbGVjdG9yQWxsKFwiW25hbWU9ZF1cIikubGVuZ3RoJiZxLnB1c2goXCJuYW1lXCIrSytcIipbKl4kfCF+XT89XCIpLDIhPT1hLnF1ZXJ5U2VsZWN0b3JBbGwoXCI6ZW5hYmxlZFwiKS5sZW5ndGgmJnEucHVzaChcIjplbmFibGVkXCIsXCI6ZGlzYWJsZWRcIiksby5hcHBlbmRDaGlsZChhKS5kaXNhYmxlZD0hMCwyIT09YS5xdWVyeVNlbGVjdG9yQWxsKFwiOmRpc2FibGVkXCIpLmxlbmd0aCYmcS5wdXNoKFwiOmVuYWJsZWRcIixcIjpkaXNhYmxlZFwiKSxhLnF1ZXJ5U2VsZWN0b3JBbGwoXCIqLDp4XCIpLHEucHVzaChcIiwuKjpcIil9KSksKGMubWF0Y2hlc1NlbGVjdG9yPVkudGVzdChzPW8ubWF0Y2hlc3x8by53ZWJraXRNYXRjaGVzU2VsZWN0b3J8fG8ubW96TWF0Y2hlc1NlbGVjdG9yfHxvLm9NYXRjaGVzU2VsZWN0b3J8fG8ubXNNYXRjaGVzU2VsZWN0b3IpKSYmamEoZnVuY3Rpb24oYSl7Yy5kaXNjb25uZWN0ZWRNYXRjaD1zLmNhbGwoYSxcIipcIikscy5jYWxsKGEsXCJbcyE9JyddOnhcIiksci5wdXNoKFwiIT1cIixOKX0pLHE9cS5sZW5ndGgmJm5ldyBSZWdFeHAocS5qb2luKFwifFwiKSkscj1yLmxlbmd0aCYmbmV3IFJlZ0V4cChyLmpvaW4oXCJ8XCIpKSxiPVkudGVzdChvLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uKSx0PWJ8fFkudGVzdChvLmNvbnRhaW5zKT9mdW5jdGlvbihhLGIpe3ZhciBjPTk9PT1hLm5vZGVUeXBlP2EuZG9jdW1lbnRFbGVtZW50OmEsZD1iJiZiLnBhcmVudE5vZGU7cmV0dXJuIGE9PT1kfHwhKCFkfHwxIT09ZC5ub2RlVHlwZXx8IShjLmNvbnRhaW5zP2MuY29udGFpbnMoZCk6YS5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbiYmMTYmYS5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbihkKSkpfTpmdW5jdGlvbihhLGIpe2lmKGIpd2hpbGUoYj1iLnBhcmVudE5vZGUpaWYoYj09PWEpcmV0dXJuITA7cmV0dXJuITF9LEI9Yj9mdW5jdGlvbihhLGIpe2lmKGE9PT1iKXJldHVybiBsPSEwLDA7dmFyIGQ9IWEuY29tcGFyZURvY3VtZW50UG9zaXRpb24tIWIuY29tcGFyZURvY3VtZW50UG9zaXRpb247cmV0dXJuIGQ/ZDooZD0oYS5vd25lckRvY3VtZW50fHxhKT09PShiLm93bmVyRG9jdW1lbnR8fGIpP2EuY29tcGFyZURvY3VtZW50UG9zaXRpb24oYik6MSwxJmR8fCFjLnNvcnREZXRhY2hlZCYmYi5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbihhKT09PWQ/YT09PW58fGEub3duZXJEb2N1bWVudD09PXYmJnQodixhKT8tMTpiPT09bnx8Yi5vd25lckRvY3VtZW50PT09diYmdCh2LGIpPzE6az9JKGssYSktSShrLGIpOjA6NCZkPy0xOjEpfTpmdW5jdGlvbihhLGIpe2lmKGE9PT1iKXJldHVybiBsPSEwLDA7dmFyIGMsZD0wLGU9YS5wYXJlbnROb2RlLGY9Yi5wYXJlbnROb2RlLGc9W2FdLGg9W2JdO2lmKCFlfHwhZilyZXR1cm4gYT09PW4/LTE6Yj09PW4/MTplPy0xOmY/MTprP0koayxhKS1JKGssYik6MDtpZihlPT09ZilyZXR1cm4gbGEoYSxiKTtjPWE7d2hpbGUoYz1jLnBhcmVudE5vZGUpZy51bnNoaWZ0KGMpO2M9Yjt3aGlsZShjPWMucGFyZW50Tm9kZSloLnVuc2hpZnQoYyk7d2hpbGUoZ1tkXT09PWhbZF0pZCsrO3JldHVybiBkP2xhKGdbZF0saFtkXSk6Z1tkXT09PXY/LTE6aFtkXT09PXY/MTowfSxuKTpufSxnYS5tYXRjaGVzPWZ1bmN0aW9uKGEsYil7cmV0dXJuIGdhKGEsbnVsbCxudWxsLGIpfSxnYS5tYXRjaGVzU2VsZWN0b3I9ZnVuY3Rpb24oYSxiKXtpZigoYS5vd25lckRvY3VtZW50fHxhKSE9PW4mJm0oYSksYj1iLnJlcGxhY2UoUyxcIj0nJDEnXVwiKSxjLm1hdGNoZXNTZWxlY3RvciYmcCYmIUFbYitcIiBcIl0mJighcnx8IXIudGVzdChiKSkmJighcXx8IXEudGVzdChiKSkpdHJ5e3ZhciBkPXMuY2FsbChhLGIpO2lmKGR8fGMuZGlzY29ubmVjdGVkTWF0Y2h8fGEuZG9jdW1lbnQmJjExIT09YS5kb2N1bWVudC5ub2RlVHlwZSlyZXR1cm4gZH1jYXRjaChlKXt9cmV0dXJuIGdhKGIsbixudWxsLFthXSkubGVuZ3RoPjB9LGdhLmNvbnRhaW5zPWZ1bmN0aW9uKGEsYil7cmV0dXJuKGEub3duZXJEb2N1bWVudHx8YSkhPT1uJiZtKGEpLHQoYSxiKX0sZ2EuYXR0cj1mdW5jdGlvbihhLGIpeyhhLm93bmVyRG9jdW1lbnR8fGEpIT09biYmbShhKTt2YXIgZT1kLmF0dHJIYW5kbGVbYi50b0xvd2VyQ2FzZSgpXSxmPWUmJkMuY2FsbChkLmF0dHJIYW5kbGUsYi50b0xvd2VyQ2FzZSgpKT9lKGEsYiwhcCk6dm9pZCAwO3JldHVybiB2b2lkIDAhPT1mP2Y6Yy5hdHRyaWJ1dGVzfHwhcD9hLmdldEF0dHJpYnV0ZShiKTooZj1hLmdldEF0dHJpYnV0ZU5vZGUoYikpJiZmLnNwZWNpZmllZD9mLnZhbHVlOm51bGx9LGdhLmVzY2FwZT1mdW5jdGlvbihhKXtyZXR1cm4oYStcIlwiKS5yZXBsYWNlKGJhLGNhKX0sZ2EuZXJyb3I9ZnVuY3Rpb24oYSl7dGhyb3cgbmV3IEVycm9yKFwiU3ludGF4IGVycm9yLCB1bnJlY29nbml6ZWQgZXhwcmVzc2lvbjogXCIrYSl9LGdhLnVuaXF1ZVNvcnQ9ZnVuY3Rpb24oYSl7dmFyIGIsZD1bXSxlPTAsZj0wO2lmKGw9IWMuZGV0ZWN0RHVwbGljYXRlcyxrPSFjLnNvcnRTdGFibGUmJmEuc2xpY2UoMCksYS5zb3J0KEIpLGwpe3doaWxlKGI9YVtmKytdKWI9PT1hW2ZdJiYoZT1kLnB1c2goZikpO3doaWxlKGUtLSlhLnNwbGljZShkW2VdLDEpfXJldHVybiBrPW51bGwsYX0sZT1nYS5nZXRUZXh0PWZ1bmN0aW9uKGEpe3ZhciBiLGM9XCJcIixkPTAsZj1hLm5vZGVUeXBlO2lmKGYpe2lmKDE9PT1mfHw5PT09Znx8MTE9PT1mKXtpZihcInN0cmluZ1wiPT10eXBlb2YgYS50ZXh0Q29udGVudClyZXR1cm4gYS50ZXh0Q29udGVudDtmb3IoYT1hLmZpcnN0Q2hpbGQ7YTthPWEubmV4dFNpYmxpbmcpYys9ZShhKX1lbHNlIGlmKDM9PT1mfHw0PT09ZilyZXR1cm4gYS5ub2RlVmFsdWV9ZWxzZSB3aGlsZShiPWFbZCsrXSljKz1lKGIpO3JldHVybiBjfSxkPWdhLnNlbGVjdG9ycz17Y2FjaGVMZW5ndGg6NTAsY3JlYXRlUHNldWRvOmlhLG1hdGNoOlYsYXR0ckhhbmRsZTp7fSxmaW5kOnt9LHJlbGF0aXZlOntcIj5cIjp7ZGlyOlwicGFyZW50Tm9kZVwiLGZpcnN0OiEwfSxcIiBcIjp7ZGlyOlwicGFyZW50Tm9kZVwifSxcIitcIjp7ZGlyOlwicHJldmlvdXNTaWJsaW5nXCIsZmlyc3Q6ITB9LFwiflwiOntkaXI6XCJwcmV2aW91c1NpYmxpbmdcIn19LHByZUZpbHRlcjp7QVRUUjpmdW5jdGlvbihhKXtyZXR1cm4gYVsxXT1hWzFdLnJlcGxhY2UoXyxhYSksYVszXT0oYVszXXx8YVs0XXx8YVs1XXx8XCJcIikucmVwbGFjZShfLGFhKSxcIn49XCI9PT1hWzJdJiYoYVszXT1cIiBcIithWzNdK1wiIFwiKSxhLnNsaWNlKDAsNCl9LENISUxEOmZ1bmN0aW9uKGEpe3JldHVybiBhWzFdPWFbMV0udG9Mb3dlckNhc2UoKSxcIm50aFwiPT09YVsxXS5zbGljZSgwLDMpPyhhWzNdfHxnYS5lcnJvcihhWzBdKSxhWzRdPSsoYVs0XT9hWzVdKyhhWzZdfHwxKToyKihcImV2ZW5cIj09PWFbM118fFwib2RkXCI9PT1hWzNdKSksYVs1XT0rKGFbN10rYVs4XXx8XCJvZGRcIj09PWFbM10pKTphWzNdJiZnYS5lcnJvcihhWzBdKSxhfSxQU0VVRE86ZnVuY3Rpb24oYSl7dmFyIGIsYz0hYVs2XSYmYVsyXTtyZXR1cm4gVi5DSElMRC50ZXN0KGFbMF0pP251bGw6KGFbM10/YVsyXT1hWzRdfHxhWzVdfHxcIlwiOmMmJlQudGVzdChjKSYmKGI9ZyhjLCEwKSkmJihiPWMuaW5kZXhPZihcIilcIixjLmxlbmd0aC1iKS1jLmxlbmd0aCkmJihhWzBdPWFbMF0uc2xpY2UoMCxiKSxhWzJdPWMuc2xpY2UoMCxiKSksYS5zbGljZSgwLDMpKX19LGZpbHRlcjp7VEFHOmZ1bmN0aW9uKGEpe3ZhciBiPWEucmVwbGFjZShfLGFhKS50b0xvd2VyQ2FzZSgpO3JldHVyblwiKlwiPT09YT9mdW5jdGlvbigpe3JldHVybiEwfTpmdW5jdGlvbihhKXtyZXR1cm4gYS5ub2RlTmFtZSYmYS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpPT09Yn19LENMQVNTOmZ1bmN0aW9uKGEpe3ZhciBiPXlbYStcIiBcIl07cmV0dXJuIGJ8fChiPW5ldyBSZWdFeHAoXCIoXnxcIitLK1wiKVwiK2ErXCIoXCIrSytcInwkKVwiKSkmJnkoYSxmdW5jdGlvbihhKXtyZXR1cm4gYi50ZXN0KFwic3RyaW5nXCI9PXR5cGVvZiBhLmNsYXNzTmFtZSYmYS5jbGFzc05hbWV8fFwidW5kZWZpbmVkXCIhPXR5cGVvZiBhLmdldEF0dHJpYnV0ZSYmYS5nZXRBdHRyaWJ1dGUoXCJjbGFzc1wiKXx8XCJcIil9KX0sQVRUUjpmdW5jdGlvbihhLGIsYyl7cmV0dXJuIGZ1bmN0aW9uKGQpe3ZhciBlPWdhLmF0dHIoZCxhKTtyZXR1cm4gbnVsbD09ZT9cIiE9XCI9PT1iOiFifHwoZSs9XCJcIixcIj1cIj09PWI/ZT09PWM6XCIhPVwiPT09Yj9lIT09YzpcIl49XCI9PT1iP2MmJjA9PT1lLmluZGV4T2YoYyk6XCIqPVwiPT09Yj9jJiZlLmluZGV4T2YoYyk+LTE6XCIkPVwiPT09Yj9jJiZlLnNsaWNlKC1jLmxlbmd0aCk9PT1jOlwifj1cIj09PWI/KFwiIFwiK2UucmVwbGFjZShPLFwiIFwiKStcIiBcIikuaW5kZXhPZihjKT4tMTpcInw9XCI9PT1iJiYoZT09PWN8fGUuc2xpY2UoMCxjLmxlbmd0aCsxKT09PWMrXCItXCIpKX19LENISUxEOmZ1bmN0aW9uKGEsYixjLGQsZSl7dmFyIGY9XCJudGhcIiE9PWEuc2xpY2UoMCwzKSxnPVwibGFzdFwiIT09YS5zbGljZSgtNCksaD1cIm9mLXR5cGVcIj09PWI7cmV0dXJuIDE9PT1kJiYwPT09ZT9mdW5jdGlvbihhKXtyZXR1cm4hIWEucGFyZW50Tm9kZX06ZnVuY3Rpb24oYixjLGkpe3ZhciBqLGssbCxtLG4sbyxwPWYhPT1nP1wibmV4dFNpYmxpbmdcIjpcInByZXZpb3VzU2libGluZ1wiLHE9Yi5wYXJlbnROb2RlLHI9aCYmYi5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpLHM9IWkmJiFoLHQ9ITE7aWYocSl7aWYoZil7d2hpbGUocCl7bT1iO3doaWxlKG09bVtwXSlpZihoP20ubm9kZU5hbWUudG9Mb3dlckNhc2UoKT09PXI6MT09PW0ubm9kZVR5cGUpcmV0dXJuITE7bz1wPVwib25seVwiPT09YSYmIW8mJlwibmV4dFNpYmxpbmdcIn1yZXR1cm4hMH1pZihvPVtnP3EuZmlyc3RDaGlsZDpxLmxhc3RDaGlsZF0sZyYmcyl7bT1xLGw9bVt1XXx8KG1bdV09e30pLGs9bFttLnVuaXF1ZUlEXXx8KGxbbS51bmlxdWVJRF09e30pLGo9a1thXXx8W10sbj1qWzBdPT09dyYmalsxXSx0PW4mJmpbMl0sbT1uJiZxLmNoaWxkTm9kZXNbbl07d2hpbGUobT0rK24mJm0mJm1bcF18fCh0PW49MCl8fG8ucG9wKCkpaWYoMT09PW0ubm9kZVR5cGUmJisrdCYmbT09PWIpe2tbYV09W3csbix0XTticmVha319ZWxzZSBpZihzJiYobT1iLGw9bVt1XXx8KG1bdV09e30pLGs9bFttLnVuaXF1ZUlEXXx8KGxbbS51bmlxdWVJRF09e30pLGo9a1thXXx8W10sbj1qWzBdPT09dyYmalsxXSx0PW4pLHQ9PT0hMSl3aGlsZShtPSsrbiYmbSYmbVtwXXx8KHQ9bj0wKXx8by5wb3AoKSlpZigoaD9tLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCk9PT1yOjE9PT1tLm5vZGVUeXBlKSYmKyt0JiYocyYmKGw9bVt1XXx8KG1bdV09e30pLGs9bFttLnVuaXF1ZUlEXXx8KGxbbS51bmlxdWVJRF09e30pLGtbYV09W3csdF0pLG09PT1iKSlicmVhaztyZXR1cm4gdC09ZSx0PT09ZHx8dCVkPT09MCYmdC9kPj0wfX19LFBTRVVETzpmdW5jdGlvbihhLGIpe3ZhciBjLGU9ZC5wc2V1ZG9zW2FdfHxkLnNldEZpbHRlcnNbYS50b0xvd2VyQ2FzZSgpXXx8Z2EuZXJyb3IoXCJ1bnN1cHBvcnRlZCBwc2V1ZG86IFwiK2EpO3JldHVybiBlW3VdP2UoYik6ZS5sZW5ndGg+MT8oYz1bYSxhLFwiXCIsYl0sZC5zZXRGaWx0ZXJzLmhhc093blByb3BlcnR5KGEudG9Mb3dlckNhc2UoKSk/aWEoZnVuY3Rpb24oYSxjKXt2YXIgZCxmPWUoYSxiKSxnPWYubGVuZ3RoO3doaWxlKGctLSlkPUkoYSxmW2ddKSxhW2RdPSEoY1tkXT1mW2ddKX0pOmZ1bmN0aW9uKGEpe3JldHVybiBlKGEsMCxjKX0pOmV9fSxwc2V1ZG9zOntub3Q6aWEoZnVuY3Rpb24oYSl7dmFyIGI9W10sYz1bXSxkPWgoYS5yZXBsYWNlKFAsXCIkMVwiKSk7cmV0dXJuIGRbdV0/aWEoZnVuY3Rpb24oYSxiLGMsZSl7dmFyIGYsZz1kKGEsbnVsbCxlLFtdKSxoPWEubGVuZ3RoO3doaWxlKGgtLSkoZj1nW2hdKSYmKGFbaF09IShiW2hdPWYpKX0pOmZ1bmN0aW9uKGEsZSxmKXtyZXR1cm4gYlswXT1hLGQoYixudWxsLGYsYyksYlswXT1udWxsLCFjLnBvcCgpfX0pLGhhczppYShmdW5jdGlvbihhKXtyZXR1cm4gZnVuY3Rpb24oYil7cmV0dXJuIGdhKGEsYikubGVuZ3RoPjB9fSksY29udGFpbnM6aWEoZnVuY3Rpb24oYSl7cmV0dXJuIGE9YS5yZXBsYWNlKF8sYWEpLGZ1bmN0aW9uKGIpe3JldHVybihiLnRleHRDb250ZW50fHxiLmlubmVyVGV4dHx8ZShiKSkuaW5kZXhPZihhKT4tMX19KSxsYW5nOmlhKGZ1bmN0aW9uKGEpe3JldHVybiBVLnRlc3QoYXx8XCJcIil8fGdhLmVycm9yKFwidW5zdXBwb3J0ZWQgbGFuZzogXCIrYSksYT1hLnJlcGxhY2UoXyxhYSkudG9Mb3dlckNhc2UoKSxmdW5jdGlvbihiKXt2YXIgYztkbyBpZihjPXA/Yi5sYW5nOmIuZ2V0QXR0cmlidXRlKFwieG1sOmxhbmdcIil8fGIuZ2V0QXR0cmlidXRlKFwibGFuZ1wiKSlyZXR1cm4gYz1jLnRvTG93ZXJDYXNlKCksYz09PWF8fDA9PT1jLmluZGV4T2YoYStcIi1cIik7d2hpbGUoKGI9Yi5wYXJlbnROb2RlKSYmMT09PWIubm9kZVR5cGUpO3JldHVybiExfX0pLHRhcmdldDpmdW5jdGlvbihiKXt2YXIgYz1hLmxvY2F0aW9uJiZhLmxvY2F0aW9uLmhhc2g7cmV0dXJuIGMmJmMuc2xpY2UoMSk9PT1iLmlkfSxyb290OmZ1bmN0aW9uKGEpe3JldHVybiBhPT09b30sZm9jdXM6ZnVuY3Rpb24oYSl7cmV0dXJuIGE9PT1uLmFjdGl2ZUVsZW1lbnQmJighbi5oYXNGb2N1c3x8bi5oYXNGb2N1cygpKSYmISEoYS50eXBlfHxhLmhyZWZ8fH5hLnRhYkluZGV4KX0sZW5hYmxlZDpvYSghMSksZGlzYWJsZWQ6b2EoITApLGNoZWNrZWQ6ZnVuY3Rpb24oYSl7dmFyIGI9YS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpO3JldHVyblwiaW5wdXRcIj09PWImJiEhYS5jaGVja2VkfHxcIm9wdGlvblwiPT09YiYmISFhLnNlbGVjdGVkfSxzZWxlY3RlZDpmdW5jdGlvbihhKXtyZXR1cm4gYS5wYXJlbnROb2RlJiZhLnBhcmVudE5vZGUuc2VsZWN0ZWRJbmRleCxhLnNlbGVjdGVkPT09ITB9LGVtcHR5OmZ1bmN0aW9uKGEpe2ZvcihhPWEuZmlyc3RDaGlsZDthO2E9YS5uZXh0U2libGluZylpZihhLm5vZGVUeXBlPDYpcmV0dXJuITE7cmV0dXJuITB9LHBhcmVudDpmdW5jdGlvbihhKXtyZXR1cm4hZC5wc2V1ZG9zLmVtcHR5KGEpfSxoZWFkZXI6ZnVuY3Rpb24oYSl7cmV0dXJuIFgudGVzdChhLm5vZGVOYW1lKX0saW5wdXQ6ZnVuY3Rpb24oYSl7cmV0dXJuIFcudGVzdChhLm5vZGVOYW1lKX0sYnV0dG9uOmZ1bmN0aW9uKGEpe3ZhciBiPWEubm9kZU5hbWUudG9Mb3dlckNhc2UoKTtyZXR1cm5cImlucHV0XCI9PT1iJiZcImJ1dHRvblwiPT09YS50eXBlfHxcImJ1dHRvblwiPT09Yn0sdGV4dDpmdW5jdGlvbihhKXt2YXIgYjtyZXR1cm5cImlucHV0XCI9PT1hLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkmJlwidGV4dFwiPT09YS50eXBlJiYobnVsbD09KGI9YS5nZXRBdHRyaWJ1dGUoXCJ0eXBlXCIpKXx8XCJ0ZXh0XCI9PT1iLnRvTG93ZXJDYXNlKCkpfSxmaXJzdDpwYShmdW5jdGlvbigpe3JldHVyblswXX0pLGxhc3Q6cGEoZnVuY3Rpb24oYSxiKXtyZXR1cm5bYi0xXX0pLGVxOnBhKGZ1bmN0aW9uKGEsYixjKXtyZXR1cm5bYzwwP2MrYjpjXX0pLGV2ZW46cGEoZnVuY3Rpb24oYSxiKXtmb3IodmFyIGM9MDtjPGI7Yys9MilhLnB1c2goYyk7cmV0dXJuIGF9KSxvZGQ6cGEoZnVuY3Rpb24oYSxiKXtmb3IodmFyIGM9MTtjPGI7Yys9MilhLnB1c2goYyk7cmV0dXJuIGF9KSxsdDpwYShmdW5jdGlvbihhLGIsYyl7Zm9yKHZhciBkPWM8MD9jK2I6YzstLWQ+PTA7KWEucHVzaChkKTtyZXR1cm4gYX0pLGd0OnBhKGZ1bmN0aW9uKGEsYixjKXtmb3IodmFyIGQ9YzwwP2MrYjpjOysrZDxiOylhLnB1c2goZCk7cmV0dXJuIGF9KX19LGQucHNldWRvcy5udGg9ZC5wc2V1ZG9zLmVxO2ZvcihiIGlue3JhZGlvOiEwLGNoZWNrYm94OiEwLGZpbGU6ITAscGFzc3dvcmQ6ITAsaW1hZ2U6ITB9KWQucHNldWRvc1tiXT1tYShiKTtmb3IoYiBpbntzdWJtaXQ6ITAscmVzZXQ6ITB9KWQucHNldWRvc1tiXT1uYShiKTtmdW5jdGlvbiByYSgpe31yYS5wcm90b3R5cGU9ZC5maWx0ZXJzPWQucHNldWRvcyxkLnNldEZpbHRlcnM9bmV3IHJhLGc9Z2EudG9rZW5pemU9ZnVuY3Rpb24oYSxiKXt2YXIgYyxlLGYsZyxoLGksaixrPXpbYStcIiBcIl07aWYoaylyZXR1cm4gYj8wOmsuc2xpY2UoMCk7aD1hLGk9W10saj1kLnByZUZpbHRlcjt3aGlsZShoKXtjJiYhKGU9US5leGVjKGgpKXx8KGUmJihoPWguc2xpY2UoZVswXS5sZW5ndGgpfHxoKSxpLnB1c2goZj1bXSkpLGM9ITEsKGU9Ui5leGVjKGgpKSYmKGM9ZS5zaGlmdCgpLGYucHVzaCh7dmFsdWU6Yyx0eXBlOmVbMF0ucmVwbGFjZShQLFwiIFwiKX0pLGg9aC5zbGljZShjLmxlbmd0aCkpO2ZvcihnIGluIGQuZmlsdGVyKSEoZT1WW2ddLmV4ZWMoaCkpfHxqW2ddJiYhKGU9altnXShlKSl8fChjPWUuc2hpZnQoKSxmLnB1c2goe3ZhbHVlOmMsdHlwZTpnLG1hdGNoZXM6ZX0pLGg9aC5zbGljZShjLmxlbmd0aCkpO2lmKCFjKWJyZWFrfXJldHVybiBiP2gubGVuZ3RoOmg/Z2EuZXJyb3IoYSk6eihhLGkpLnNsaWNlKDApfTtmdW5jdGlvbiBzYShhKXtmb3IodmFyIGI9MCxjPWEubGVuZ3RoLGQ9XCJcIjtiPGM7YisrKWQrPWFbYl0udmFsdWU7cmV0dXJuIGR9ZnVuY3Rpb24gdGEoYSxiLGMpe3ZhciBkPWIuZGlyLGU9Yi5uZXh0LGY9ZXx8ZCxnPWMmJlwicGFyZW50Tm9kZVwiPT09ZixoPXgrKztyZXR1cm4gYi5maXJzdD9mdW5jdGlvbihiLGMsZSl7d2hpbGUoYj1iW2RdKWlmKDE9PT1iLm5vZGVUeXBlfHxnKXJldHVybiBhKGIsYyxlKX06ZnVuY3Rpb24oYixjLGkpe3ZhciBqLGssbCxtPVt3LGhdO2lmKGkpe3doaWxlKGI9YltkXSlpZigoMT09PWIubm9kZVR5cGV8fGcpJiZhKGIsYyxpKSlyZXR1cm4hMH1lbHNlIHdoaWxlKGI9YltkXSlpZigxPT09Yi5ub2RlVHlwZXx8ZylpZihsPWJbdV18fChiW3VdPXt9KSxrPWxbYi51bmlxdWVJRF18fChsW2IudW5pcXVlSURdPXt9KSxlJiZlPT09Yi5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpKWI9YltkXXx8YjtlbHNle2lmKChqPWtbZl0pJiZqWzBdPT09dyYmalsxXT09PWgpcmV0dXJuIG1bMl09alsyXTtpZihrW2ZdPW0sbVsyXT1hKGIsYyxpKSlyZXR1cm4hMH19fWZ1bmN0aW9uIHVhKGEpe3JldHVybiBhLmxlbmd0aD4xP2Z1bmN0aW9uKGIsYyxkKXt2YXIgZT1hLmxlbmd0aDt3aGlsZShlLS0paWYoIWFbZV0oYixjLGQpKXJldHVybiExO3JldHVybiEwfTphWzBdfWZ1bmN0aW9uIHZhKGEsYixjKXtmb3IodmFyIGQ9MCxlPWIubGVuZ3RoO2Q8ZTtkKyspZ2EoYSxiW2RdLGMpO3JldHVybiBjfWZ1bmN0aW9uIHdhKGEsYixjLGQsZSl7Zm9yKHZhciBmLGc9W10saD0wLGk9YS5sZW5ndGgsaj1udWxsIT1iO2g8aTtoKyspKGY9YVtoXSkmJihjJiYhYyhmLGQsZSl8fChnLnB1c2goZiksaiYmYi5wdXNoKGgpKSk7cmV0dXJuIGd9ZnVuY3Rpb24geGEoYSxiLGMsZCxlLGYpe3JldHVybiBkJiYhZFt1XSYmKGQ9eGEoZCkpLGUmJiFlW3VdJiYoZT14YShlLGYpKSxpYShmdW5jdGlvbihmLGcsaCxpKXt2YXIgaixrLGwsbT1bXSxuPVtdLG89Zy5sZW5ndGgscD1mfHx2YShifHxcIipcIixoLm5vZGVUeXBlP1toXTpoLFtdKSxxPSFhfHwhZiYmYj9wOndhKHAsbSxhLGgsaSkscj1jP2V8fChmP2E6b3x8ZCk/W106ZzpxO2lmKGMmJmMocSxyLGgsaSksZCl7aj13YShyLG4pLGQoaixbXSxoLGkpLGs9ai5sZW5ndGg7d2hpbGUoay0tKShsPWpba10pJiYocltuW2tdXT0hKHFbbltrXV09bCkpfWlmKGYpe2lmKGV8fGEpe2lmKGUpe2o9W10saz1yLmxlbmd0aDt3aGlsZShrLS0pKGw9cltrXSkmJmoucHVzaChxW2tdPWwpO2UobnVsbCxyPVtdLGosaSl9az1yLmxlbmd0aDt3aGlsZShrLS0pKGw9cltrXSkmJihqPWU/SShmLGwpOm1ba10pPi0xJiYoZltqXT0hKGdbal09bCkpfX1lbHNlIHI9d2Eocj09PWc/ci5zcGxpY2UobyxyLmxlbmd0aCk6ciksZT9lKG51bGwsZyxyLGkpOkcuYXBwbHkoZyxyKX0pfWZ1bmN0aW9uIHlhKGEpe2Zvcih2YXIgYixjLGUsZj1hLmxlbmd0aCxnPWQucmVsYXRpdmVbYVswXS50eXBlXSxoPWd8fGQucmVsYXRpdmVbXCIgXCJdLGk9Zz8xOjAsaz10YShmdW5jdGlvbihhKXtyZXR1cm4gYT09PWJ9LGgsITApLGw9dGEoZnVuY3Rpb24oYSl7cmV0dXJuIEkoYixhKT4tMX0saCwhMCksbT1bZnVuY3Rpb24oYSxjLGQpe3ZhciBlPSFnJiYoZHx8YyE9PWopfHwoKGI9Yykubm9kZVR5cGU/ayhhLGMsZCk6bChhLGMsZCkpO3JldHVybiBiPW51bGwsZX1dO2k8ZjtpKyspaWYoYz1kLnJlbGF0aXZlW2FbaV0udHlwZV0pbT1bdGEodWEobSksYyldO2Vsc2V7aWYoYz1kLmZpbHRlclthW2ldLnR5cGVdLmFwcGx5KG51bGwsYVtpXS5tYXRjaGVzKSxjW3VdKXtmb3IoZT0rK2k7ZTxmO2UrKylpZihkLnJlbGF0aXZlW2FbZV0udHlwZV0pYnJlYWs7cmV0dXJuIHhhKGk+MSYmdWEobSksaT4xJiZzYShhLnNsaWNlKDAsaS0xKS5jb25jYXQoe3ZhbHVlOlwiIFwiPT09YVtpLTJdLnR5cGU/XCIqXCI6XCJcIn0pKS5yZXBsYWNlKFAsXCIkMVwiKSxjLGk8ZSYmeWEoYS5zbGljZShpLGUpKSxlPGYmJnlhKGE9YS5zbGljZShlKSksZTxmJiZzYShhKSl9bS5wdXNoKGMpfXJldHVybiB1YShtKX1mdW5jdGlvbiB6YShhLGIpe3ZhciBjPWIubGVuZ3RoPjAsZT1hLmxlbmd0aD4wLGY9ZnVuY3Rpb24oZixnLGgsaSxrKXt2YXIgbCxvLHEscj0wLHM9XCIwXCIsdD1mJiZbXSx1PVtdLHY9aix4PWZ8fGUmJmQuZmluZC5UQUcoXCIqXCIsaykseT13Kz1udWxsPT12PzE6TWF0aC5yYW5kb20oKXx8LjEsej14Lmxlbmd0aDtmb3IoayYmKGo9Zz09PW58fGd8fGspO3MhPT16JiZudWxsIT0obD14W3NdKTtzKyspe2lmKGUmJmwpe289MCxnfHxsLm93bmVyRG9jdW1lbnQ9PT1ufHwobShsKSxoPSFwKTt3aGlsZShxPWFbbysrXSlpZihxKGwsZ3x8bixoKSl7aS5wdXNoKGwpO2JyZWFrfWsmJih3PXkpfWMmJigobD0hcSYmbCkmJnItLSxmJiZ0LnB1c2gobCkpfWlmKHIrPXMsYyYmcyE9PXIpe289MDt3aGlsZShxPWJbbysrXSlxKHQsdSxnLGgpO2lmKGYpe2lmKHI+MCl3aGlsZShzLS0pdFtzXXx8dVtzXXx8KHVbc109RS5jYWxsKGkpKTt1PXdhKHUpfUcuYXBwbHkoaSx1KSxrJiYhZiYmdS5sZW5ndGg+MCYmcitiLmxlbmd0aD4xJiZnYS51bmlxdWVTb3J0KGkpfXJldHVybiBrJiYodz15LGo9diksdH07cmV0dXJuIGM/aWEoZik6Zn1yZXR1cm4gaD1nYS5jb21waWxlPWZ1bmN0aW9uKGEsYil7dmFyIGMsZD1bXSxlPVtdLGY9QVthK1wiIFwiXTtpZighZil7Ynx8KGI9ZyhhKSksYz1iLmxlbmd0aDt3aGlsZShjLS0pZj15YShiW2NdKSxmW3VdP2QucHVzaChmKTplLnB1c2goZik7Zj1BKGEsemEoZSxkKSksZi5zZWxlY3Rvcj1hfXJldHVybiBmfSxpPWdhLnNlbGVjdD1mdW5jdGlvbihhLGIsZSxmKXt2YXIgaSxqLGssbCxtLG49XCJmdW5jdGlvblwiPT10eXBlb2YgYSYmYSxvPSFmJiZnKGE9bi5zZWxlY3Rvcnx8YSk7aWYoZT1lfHxbXSwxPT09by5sZW5ndGgpe2lmKGo9b1swXT1vWzBdLnNsaWNlKDApLGoubGVuZ3RoPjImJlwiSURcIj09PShrPWpbMF0pLnR5cGUmJmMuZ2V0QnlJZCYmOT09PWIubm9kZVR5cGUmJnAmJmQucmVsYXRpdmVbalsxXS50eXBlXSl7aWYoYj0oZC5maW5kLklEKGsubWF0Y2hlc1swXS5yZXBsYWNlKF8sYWEpLGIpfHxbXSlbMF0sIWIpcmV0dXJuIGU7biYmKGI9Yi5wYXJlbnROb2RlKSxhPWEuc2xpY2Uoai5zaGlmdCgpLnZhbHVlLmxlbmd0aCl9aT1WLm5lZWRzQ29udGV4dC50ZXN0KGEpPzA6ai5sZW5ndGg7d2hpbGUoaS0tKXtpZihrPWpbaV0sZC5yZWxhdGl2ZVtsPWsudHlwZV0pYnJlYWs7aWYoKG09ZC5maW5kW2xdKSYmKGY9bShrLm1hdGNoZXNbMF0ucmVwbGFjZShfLGFhKSwkLnRlc3QoalswXS50eXBlKSYmcWEoYi5wYXJlbnROb2RlKXx8YikpKXtpZihqLnNwbGljZShpLDEpLGE9Zi5sZW5ndGgmJnNhKGopLCFhKXJldHVybiBHLmFwcGx5KGUsZiksZTticmVha319fXJldHVybihufHxoKGEsbykpKGYsYiwhcCxlLCFifHwkLnRlc3QoYSkmJnFhKGIucGFyZW50Tm9kZSl8fGIpLGV9LGMuc29ydFN0YWJsZT11LnNwbGl0KFwiXCIpLnNvcnQoQikuam9pbihcIlwiKT09PXUsYy5kZXRlY3REdXBsaWNhdGVzPSEhbCxtKCksYy5zb3J0RGV0YWNoZWQ9amEoZnVuY3Rpb24oYSl7cmV0dXJuIDEmYS5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbihuLmNyZWF0ZUVsZW1lbnQoXCJmaWVsZHNldFwiKSl9KSxqYShmdW5jdGlvbihhKXtyZXR1cm4gYS5pbm5lckhUTUw9XCI8YSBocmVmPScjJz48L2E+XCIsXCIjXCI9PT1hLmZpcnN0Q2hpbGQuZ2V0QXR0cmlidXRlKFwiaHJlZlwiKX0pfHxrYShcInR5cGV8aHJlZnxoZWlnaHR8d2lkdGhcIixmdW5jdGlvbihhLGIsYyl7aWYoIWMpcmV0dXJuIGEuZ2V0QXR0cmlidXRlKGIsXCJ0eXBlXCI9PT1iLnRvTG93ZXJDYXNlKCk/MToyKX0pLGMuYXR0cmlidXRlcyYmamEoZnVuY3Rpb24oYSl7cmV0dXJuIGEuaW5uZXJIVE1MPVwiPGlucHV0Lz5cIixhLmZpcnN0Q2hpbGQuc2V0QXR0cmlidXRlKFwidmFsdWVcIixcIlwiKSxcIlwiPT09YS5maXJzdENoaWxkLmdldEF0dHJpYnV0ZShcInZhbHVlXCIpfSl8fGthKFwidmFsdWVcIixmdW5jdGlvbihhLGIsYyl7aWYoIWMmJlwiaW5wdXRcIj09PWEubm9kZU5hbWUudG9Mb3dlckNhc2UoKSlyZXR1cm4gYS5kZWZhdWx0VmFsdWV9KSxqYShmdW5jdGlvbihhKXtyZXR1cm4gbnVsbD09YS5nZXRBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiKX0pfHxrYShKLGZ1bmN0aW9uKGEsYixjKXt2YXIgZDtpZighYylyZXR1cm4gYVtiXT09PSEwP2IudG9Mb3dlckNhc2UoKTooZD1hLmdldEF0dHJpYnV0ZU5vZGUoYikpJiZkLnNwZWNpZmllZD9kLnZhbHVlOm51bGx9KSxnYX0oYSk7ci5maW5kPXgsci5leHByPXguc2VsZWN0b3JzLHIuZXhwcltcIjpcIl09ci5leHByLnBzZXVkb3Msci51bmlxdWVTb3J0PXIudW5pcXVlPXgudW5pcXVlU29ydCxyLnRleHQ9eC5nZXRUZXh0LHIuaXNYTUxEb2M9eC5pc1hNTCxyLmNvbnRhaW5zPXguY29udGFpbnMsci5lc2NhcGVTZWxlY3Rvcj14LmVzY2FwZTt2YXIgeT1mdW5jdGlvbihhLGIsYyl7dmFyIGQ9W10sZT12b2lkIDAhPT1jO3doaWxlKChhPWFbYl0pJiY5IT09YS5ub2RlVHlwZSlpZigxPT09YS5ub2RlVHlwZSl7aWYoZSYmcihhKS5pcyhjKSlicmVhaztkLnB1c2goYSl9cmV0dXJuIGR9LHo9ZnVuY3Rpb24oYSxiKXtmb3IodmFyIGM9W107YTthPWEubmV4dFNpYmxpbmcpMT09PWEubm9kZVR5cGUmJmEhPT1iJiZjLnB1c2goYSk7cmV0dXJuIGN9LEE9ci5leHByLm1hdGNoLm5lZWRzQ29udGV4dCxCPS9ePChbYS16XVteXFwvXFwwPjpcXHgyMFxcdFxcclxcblxcZl0qKVtcXHgyMFxcdFxcclxcblxcZl0qXFwvPz4oPzo8XFwvXFwxPnwpJC9pLEM9L14uW146I1xcW1xcLixdKiQvO2Z1bmN0aW9uIEQoYSxiLGMpe2lmKHIuaXNGdW5jdGlvbihiKSlyZXR1cm4gci5ncmVwKGEsZnVuY3Rpb24oYSxkKXtyZXR1cm4hIWIuY2FsbChhLGQsYSkhPT1jfSk7aWYoYi5ub2RlVHlwZSlyZXR1cm4gci5ncmVwKGEsZnVuY3Rpb24oYSl7cmV0dXJuIGE9PT1iIT09Y30pO2lmKFwic3RyaW5nXCI9PXR5cGVvZiBiKXtpZihDLnRlc3QoYikpcmV0dXJuIHIuZmlsdGVyKGIsYSxjKTtiPXIuZmlsdGVyKGIsYSl9cmV0dXJuIHIuZ3JlcChhLGZ1bmN0aW9uKGEpe3JldHVybiBpLmNhbGwoYixhKT4tMSE9PWMmJjE9PT1hLm5vZGVUeXBlfSl9ci5maWx0ZXI9ZnVuY3Rpb24oYSxiLGMpe3ZhciBkPWJbMF07cmV0dXJuIGMmJihhPVwiOm5vdChcIithK1wiKVwiKSwxPT09Yi5sZW5ndGgmJjE9PT1kLm5vZGVUeXBlP3IuZmluZC5tYXRjaGVzU2VsZWN0b3IoZCxhKT9bZF06W106ci5maW5kLm1hdGNoZXMoYSxyLmdyZXAoYixmdW5jdGlvbihhKXtyZXR1cm4gMT09PWEubm9kZVR5cGV9KSl9LHIuZm4uZXh0ZW5kKHtmaW5kOmZ1bmN0aW9uKGEpe3ZhciBiLGMsZD10aGlzLmxlbmd0aCxlPXRoaXM7aWYoXCJzdHJpbmdcIiE9dHlwZW9mIGEpcmV0dXJuIHRoaXMucHVzaFN0YWNrKHIoYSkuZmlsdGVyKGZ1bmN0aW9uKCl7Zm9yKGI9MDtiPGQ7YisrKWlmKHIuY29udGFpbnMoZVtiXSx0aGlzKSlyZXR1cm4hMH0pKTtmb3IoYz10aGlzLnB1c2hTdGFjayhbXSksYj0wO2I8ZDtiKyspci5maW5kKGEsZVtiXSxjKTtyZXR1cm4gZD4xP3IudW5pcXVlU29ydChjKTpjfSxmaWx0ZXI6ZnVuY3Rpb24oYSl7cmV0dXJuIHRoaXMucHVzaFN0YWNrKEQodGhpcyxhfHxbXSwhMSkpfSxub3Q6ZnVuY3Rpb24oYSl7cmV0dXJuIHRoaXMucHVzaFN0YWNrKEQodGhpcyxhfHxbXSwhMCkpfSxpczpmdW5jdGlvbihhKXtyZXR1cm4hIUQodGhpcyxcInN0cmluZ1wiPT10eXBlb2YgYSYmQS50ZXN0KGEpP3IoYSk6YXx8W10sITEpLmxlbmd0aH19KTt2YXIgRSxGPS9eKD86XFxzKig8W1xcd1xcV10rPilbXj5dKnwjKFtcXHctXSspKSQvLEc9ci5mbi5pbml0PWZ1bmN0aW9uKGEsYixjKXt2YXIgZSxmO2lmKCFhKXJldHVybiB0aGlzO2lmKGM9Y3x8RSxcInN0cmluZ1wiPT10eXBlb2YgYSl7aWYoZT1cIjxcIj09PWFbMF0mJlwiPlwiPT09YVthLmxlbmd0aC0xXSYmYS5sZW5ndGg+PTM/W251bGwsYSxudWxsXTpGLmV4ZWMoYSksIWV8fCFlWzFdJiZiKXJldHVybiFifHxiLmpxdWVyeT8oYnx8YykuZmluZChhKTp0aGlzLmNvbnN0cnVjdG9yKGIpLmZpbmQoYSk7aWYoZVsxXSl7aWYoYj1iIGluc3RhbmNlb2Ygcj9iWzBdOmIsci5tZXJnZSh0aGlzLHIucGFyc2VIVE1MKGVbMV0sYiYmYi5ub2RlVHlwZT9iLm93bmVyRG9jdW1lbnR8fGI6ZCwhMCkpLEIudGVzdChlWzFdKSYmci5pc1BsYWluT2JqZWN0KGIpKWZvcihlIGluIGIpci5pc0Z1bmN0aW9uKHRoaXNbZV0pP3RoaXNbZV0oYltlXSk6dGhpcy5hdHRyKGUsYltlXSk7cmV0dXJuIHRoaXN9cmV0dXJuIGY9ZC5nZXRFbGVtZW50QnlJZChlWzJdKSxmJiYodGhpc1swXT1mLHRoaXMubGVuZ3RoPTEpLHRoaXN9cmV0dXJuIGEubm9kZVR5cGU/KHRoaXNbMF09YSx0aGlzLmxlbmd0aD0xLHRoaXMpOnIuaXNGdW5jdGlvbihhKT92b2lkIDAhPT1jLnJlYWR5P2MucmVhZHkoYSk6YShyKTpyLm1ha2VBcnJheShhLHRoaXMpfTtHLnByb3RvdHlwZT1yLmZuLEU9cihkKTt2YXIgSD0vXig/OnBhcmVudHN8cHJldig/OlVudGlsfEFsbCkpLyxJPXtjaGlsZHJlbjohMCxjb250ZW50czohMCxuZXh0OiEwLHByZXY6ITB9O3IuZm4uZXh0ZW5kKHtoYXM6ZnVuY3Rpb24oYSl7dmFyIGI9cihhLHRoaXMpLGM9Yi5sZW5ndGg7cmV0dXJuIHRoaXMuZmlsdGVyKGZ1bmN0aW9uKCl7Zm9yKHZhciBhPTA7YTxjO2ErKylpZihyLmNvbnRhaW5zKHRoaXMsYlthXSkpcmV0dXJuITB9KX0sY2xvc2VzdDpmdW5jdGlvbihhLGIpe3ZhciBjLGQ9MCxlPXRoaXMubGVuZ3RoLGY9W10sZz1cInN0cmluZ1wiIT10eXBlb2YgYSYmcihhKTtpZighQS50ZXN0KGEpKWZvcig7ZDxlO2QrKylmb3IoYz10aGlzW2RdO2MmJmMhPT1iO2M9Yy5wYXJlbnROb2RlKWlmKGMubm9kZVR5cGU8MTEmJihnP2cuaW5kZXgoYyk+LTE6MT09PWMubm9kZVR5cGUmJnIuZmluZC5tYXRjaGVzU2VsZWN0b3IoYyxhKSkpe2YucHVzaChjKTticmVha31yZXR1cm4gdGhpcy5wdXNoU3RhY2soZi5sZW5ndGg+MT9yLnVuaXF1ZVNvcnQoZik6Zil9LGluZGV4OmZ1bmN0aW9uKGEpe3JldHVybiBhP1wic3RyaW5nXCI9PXR5cGVvZiBhP2kuY2FsbChyKGEpLHRoaXNbMF0pOmkuY2FsbCh0aGlzLGEuanF1ZXJ5P2FbMF06YSk6dGhpc1swXSYmdGhpc1swXS5wYXJlbnROb2RlP3RoaXMuZmlyc3QoKS5wcmV2QWxsKCkubGVuZ3RoOi0xfSxhZGQ6ZnVuY3Rpb24oYSxiKXtyZXR1cm4gdGhpcy5wdXNoU3RhY2soci51bmlxdWVTb3J0KHIubWVyZ2UodGhpcy5nZXQoKSxyKGEsYikpKSl9LGFkZEJhY2s6ZnVuY3Rpb24oYSl7cmV0dXJuIHRoaXMuYWRkKG51bGw9PWE/dGhpcy5wcmV2T2JqZWN0OnRoaXMucHJldk9iamVjdC5maWx0ZXIoYSkpfX0pO2Z1bmN0aW9uIEooYSxiKXt3aGlsZSgoYT1hW2JdKSYmMSE9PWEubm9kZVR5cGUpO3JldHVybiBhfXIuZWFjaCh7cGFyZW50OmZ1bmN0aW9uKGEpe3ZhciBiPWEucGFyZW50Tm9kZTtyZXR1cm4gYiYmMTEhPT1iLm5vZGVUeXBlP2I6bnVsbH0scGFyZW50czpmdW5jdGlvbihhKXtyZXR1cm4geShhLFwicGFyZW50Tm9kZVwiKX0scGFyZW50c1VudGlsOmZ1bmN0aW9uKGEsYixjKXtyZXR1cm4geShhLFwicGFyZW50Tm9kZVwiLGMpfSxuZXh0OmZ1bmN0aW9uKGEpe3JldHVybiBKKGEsXCJuZXh0U2libGluZ1wiKX0scHJldjpmdW5jdGlvbihhKXtyZXR1cm4gSihhLFwicHJldmlvdXNTaWJsaW5nXCIpfSxuZXh0QWxsOmZ1bmN0aW9uKGEpe3JldHVybiB5KGEsXCJuZXh0U2libGluZ1wiKX0scHJldkFsbDpmdW5jdGlvbihhKXtyZXR1cm4geShhLFwicHJldmlvdXNTaWJsaW5nXCIpfSxuZXh0VW50aWw6ZnVuY3Rpb24oYSxiLGMpe3JldHVybiB5KGEsXCJuZXh0U2libGluZ1wiLGMpfSxwcmV2VW50aWw6ZnVuY3Rpb24oYSxiLGMpe3JldHVybiB5KGEsXCJwcmV2aW91c1NpYmxpbmdcIixjKX0sc2libGluZ3M6ZnVuY3Rpb24oYSl7cmV0dXJuIHooKGEucGFyZW50Tm9kZXx8e30pLmZpcnN0Q2hpbGQsYSl9LGNoaWxkcmVuOmZ1bmN0aW9uKGEpe3JldHVybiB6KGEuZmlyc3RDaGlsZCl9LGNvbnRlbnRzOmZ1bmN0aW9uKGEpe3JldHVybiBhLmNvbnRlbnREb2N1bWVudHx8ci5tZXJnZShbXSxhLmNoaWxkTm9kZXMpfX0sZnVuY3Rpb24oYSxiKXtyLmZuW2FdPWZ1bmN0aW9uKGMsZCl7dmFyIGU9ci5tYXAodGhpcyxiLGMpO3JldHVyblwiVW50aWxcIiE9PWEuc2xpY2UoLTUpJiYoZD1jKSxkJiZcInN0cmluZ1wiPT10eXBlb2YgZCYmKGU9ci5maWx0ZXIoZCxlKSksdGhpcy5sZW5ndGg+MSYmKElbYV18fHIudW5pcXVlU29ydChlKSxILnRlc3QoYSkmJmUucmV2ZXJzZSgpKSx0aGlzLnB1c2hTdGFjayhlKX19KTt2YXIgSz0vXFxTKy9nO2Z1bmN0aW9uIEwoYSl7dmFyIGI9e307cmV0dXJuIHIuZWFjaChhLm1hdGNoKEspfHxbXSxmdW5jdGlvbihhLGMpe2JbY109ITB9KSxifXIuQ2FsbGJhY2tzPWZ1bmN0aW9uKGEpe2E9XCJzdHJpbmdcIj09dHlwZW9mIGE/TChhKTpyLmV4dGVuZCh7fSxhKTt2YXIgYixjLGQsZSxmPVtdLGc9W10saD0tMSxpPWZ1bmN0aW9uKCl7Zm9yKGU9YS5vbmNlLGQ9Yj0hMDtnLmxlbmd0aDtoPS0xKXtjPWcuc2hpZnQoKTt3aGlsZSgrK2g8Zi5sZW5ndGgpZltoXS5hcHBseShjWzBdLGNbMV0pPT09ITEmJmEuc3RvcE9uRmFsc2UmJihoPWYubGVuZ3RoLGM9ITEpfWEubWVtb3J5fHwoYz0hMSksYj0hMSxlJiYoZj1jP1tdOlwiXCIpfSxqPXthZGQ6ZnVuY3Rpb24oKXtyZXR1cm4gZiYmKGMmJiFiJiYoaD1mLmxlbmd0aC0xLGcucHVzaChjKSksZnVuY3Rpb24gZChiKXtyLmVhY2goYixmdW5jdGlvbihiLGMpe3IuaXNGdW5jdGlvbihjKT9hLnVuaXF1ZSYmai5oYXMoYyl8fGYucHVzaChjKTpjJiZjLmxlbmd0aCYmXCJzdHJpbmdcIiE9PXIudHlwZShjKSYmZChjKX0pfShhcmd1bWVudHMpLGMmJiFiJiZpKCkpLHRoaXN9LHJlbW92ZTpmdW5jdGlvbigpe3JldHVybiByLmVhY2goYXJndW1lbnRzLGZ1bmN0aW9uKGEsYil7dmFyIGM7d2hpbGUoKGM9ci5pbkFycmF5KGIsZixjKSk+LTEpZi5zcGxpY2UoYywxKSxjPD1oJiZoLS19KSx0aGlzfSxoYXM6ZnVuY3Rpb24oYSl7cmV0dXJuIGE/ci5pbkFycmF5KGEsZik+LTE6Zi5sZW5ndGg+MH0sZW1wdHk6ZnVuY3Rpb24oKXtyZXR1cm4gZiYmKGY9W10pLHRoaXN9LGRpc2FibGU6ZnVuY3Rpb24oKXtyZXR1cm4gZT1nPVtdLGY9Yz1cIlwiLHRoaXN9LGRpc2FibGVkOmZ1bmN0aW9uKCl7cmV0dXJuIWZ9LGxvY2s6ZnVuY3Rpb24oKXtyZXR1cm4gZT1nPVtdLGN8fGJ8fChmPWM9XCJcIiksdGhpc30sbG9ja2VkOmZ1bmN0aW9uKCl7cmV0dXJuISFlfSxmaXJlV2l0aDpmdW5jdGlvbihhLGMpe3JldHVybiBlfHwoYz1jfHxbXSxjPVthLGMuc2xpY2U/Yy5zbGljZSgpOmNdLGcucHVzaChjKSxifHxpKCkpLHRoaXN9LGZpcmU6ZnVuY3Rpb24oKXtyZXR1cm4gai5maXJlV2l0aCh0aGlzLGFyZ3VtZW50cyksdGhpc30sZmlyZWQ6ZnVuY3Rpb24oKXtyZXR1cm4hIWR9fTtyZXR1cm4gan07ZnVuY3Rpb24gTShhKXtyZXR1cm4gYX1mdW5jdGlvbiBOKGEpe3Rocm93IGF9ZnVuY3Rpb24gTyhhLGIsYyl7dmFyIGQ7dHJ5e2EmJnIuaXNGdW5jdGlvbihkPWEucHJvbWlzZSk/ZC5jYWxsKGEpLmRvbmUoYikuZmFpbChjKTphJiZyLmlzRnVuY3Rpb24oZD1hLnRoZW4pP2QuY2FsbChhLGIsYyk6Yi5jYWxsKHZvaWQgMCxhKX1jYXRjaChhKXtjLmNhbGwodm9pZCAwLGEpfX1yLmV4dGVuZCh7RGVmZXJyZWQ6ZnVuY3Rpb24oYil7dmFyIGM9W1tcIm5vdGlmeVwiLFwicHJvZ3Jlc3NcIixyLkNhbGxiYWNrcyhcIm1lbW9yeVwiKSxyLkNhbGxiYWNrcyhcIm1lbW9yeVwiKSwyXSxbXCJyZXNvbHZlXCIsXCJkb25lXCIsci5DYWxsYmFja3MoXCJvbmNlIG1lbW9yeVwiKSxyLkNhbGxiYWNrcyhcIm9uY2UgbWVtb3J5XCIpLDAsXCJyZXNvbHZlZFwiXSxbXCJyZWplY3RcIixcImZhaWxcIixyLkNhbGxiYWNrcyhcIm9uY2UgbWVtb3J5XCIpLHIuQ2FsbGJhY2tzKFwib25jZSBtZW1vcnlcIiksMSxcInJlamVjdGVkXCJdXSxkPVwicGVuZGluZ1wiLGU9e3N0YXRlOmZ1bmN0aW9uKCl7cmV0dXJuIGR9LGFsd2F5czpmdW5jdGlvbigpe3JldHVybiBmLmRvbmUoYXJndW1lbnRzKS5mYWlsKGFyZ3VtZW50cyksdGhpc30sXCJjYXRjaFwiOmZ1bmN0aW9uKGEpe3JldHVybiBlLnRoZW4obnVsbCxhKX0scGlwZTpmdW5jdGlvbigpe3ZhciBhPWFyZ3VtZW50cztyZXR1cm4gci5EZWZlcnJlZChmdW5jdGlvbihiKXtyLmVhY2goYyxmdW5jdGlvbihjLGQpe3ZhciBlPXIuaXNGdW5jdGlvbihhW2RbNF1dKSYmYVtkWzRdXTtmW2RbMV1dKGZ1bmN0aW9uKCl7dmFyIGE9ZSYmZS5hcHBseSh0aGlzLGFyZ3VtZW50cyk7YSYmci5pc0Z1bmN0aW9uKGEucHJvbWlzZSk/YS5wcm9taXNlKCkucHJvZ3Jlc3MoYi5ub3RpZnkpLmRvbmUoYi5yZXNvbHZlKS5mYWlsKGIucmVqZWN0KTpiW2RbMF0rXCJXaXRoXCJdKHRoaXMsZT9bYV06YXJndW1lbnRzKX0pfSksYT1udWxsfSkucHJvbWlzZSgpfSx0aGVuOmZ1bmN0aW9uKGIsZCxlKXt2YXIgZj0wO2Z1bmN0aW9uIGcoYixjLGQsZSl7cmV0dXJuIGZ1bmN0aW9uKCl7dmFyIGg9dGhpcyxpPWFyZ3VtZW50cyxqPWZ1bmN0aW9uKCl7dmFyIGEsajtpZighKGI8Zikpe2lmKGE9ZC5hcHBseShoLGkpLGE9PT1jLnByb21pc2UoKSl0aHJvdyBuZXcgVHlwZUVycm9yKFwiVGhlbmFibGUgc2VsZi1yZXNvbHV0aW9uXCIpO2o9YSYmKFwib2JqZWN0XCI9PXR5cGVvZiBhfHxcImZ1bmN0aW9uXCI9PXR5cGVvZiBhKSYmYS50aGVuLHIuaXNGdW5jdGlvbihqKT9lP2ouY2FsbChhLGcoZixjLE0sZSksZyhmLGMsTixlKSk6KGYrKyxqLmNhbGwoYSxnKGYsYyxNLGUpLGcoZixjLE4sZSksZyhmLGMsTSxjLm5vdGlmeVdpdGgpKSk6KGQhPT1NJiYoaD12b2lkIDAsaT1bYV0pLChlfHxjLnJlc29sdmVXaXRoKShoLGkpKX19LGs9ZT9qOmZ1bmN0aW9uKCl7dHJ5e2ooKX1jYXRjaChhKXtyLkRlZmVycmVkLmV4Y2VwdGlvbkhvb2smJnIuRGVmZXJyZWQuZXhjZXB0aW9uSG9vayhhLGsuc3RhY2tUcmFjZSksYisxPj1mJiYoZCE9PU4mJihoPXZvaWQgMCxpPVthXSksYy5yZWplY3RXaXRoKGgsaSkpfX07Yj9rKCk6KHIuRGVmZXJyZWQuZ2V0U3RhY2tIb29rJiYoay5zdGFja1RyYWNlPXIuRGVmZXJyZWQuZ2V0U3RhY2tIb29rKCkpLGEuc2V0VGltZW91dChrKSl9fXJldHVybiByLkRlZmVycmVkKGZ1bmN0aW9uKGEpe2NbMF1bM10uYWRkKGcoMCxhLHIuaXNGdW5jdGlvbihlKT9lOk0sYS5ub3RpZnlXaXRoKSksY1sxXVszXS5hZGQoZygwLGEsci5pc0Z1bmN0aW9uKGIpP2I6TSkpLGNbMl1bM10uYWRkKGcoMCxhLHIuaXNGdW5jdGlvbihkKT9kOk4pKX0pLnByb21pc2UoKX0scHJvbWlzZTpmdW5jdGlvbihhKXtyZXR1cm4gbnVsbCE9YT9yLmV4dGVuZChhLGUpOmV9fSxmPXt9O3JldHVybiByLmVhY2goYyxmdW5jdGlvbihhLGIpe3ZhciBnPWJbMl0saD1iWzVdO2VbYlsxXV09Zy5hZGQsaCYmZy5hZGQoZnVuY3Rpb24oKXtkPWh9LGNbMy1hXVsyXS5kaXNhYmxlLGNbMF1bMl0ubG9jayksZy5hZGQoYlszXS5maXJlKSxmW2JbMF1dPWZ1bmN0aW9uKCl7cmV0dXJuIGZbYlswXStcIldpdGhcIl0odGhpcz09PWY/dm9pZCAwOnRoaXMsYXJndW1lbnRzKSx0aGlzfSxmW2JbMF0rXCJXaXRoXCJdPWcuZmlyZVdpdGh9KSxlLnByb21pc2UoZiksYiYmYi5jYWxsKGYsZiksZn0sd2hlbjpmdW5jdGlvbihhKXt2YXIgYj1hcmd1bWVudHMubGVuZ3RoLGM9YixkPUFycmF5KGMpLGU9Zi5jYWxsKGFyZ3VtZW50cyksZz1yLkRlZmVycmVkKCksaD1mdW5jdGlvbihhKXtyZXR1cm4gZnVuY3Rpb24oYyl7ZFthXT10aGlzLGVbYV09YXJndW1lbnRzLmxlbmd0aD4xP2YuY2FsbChhcmd1bWVudHMpOmMsLS1ifHxnLnJlc29sdmVXaXRoKGQsZSl9fTtpZihiPD0xJiYoTyhhLGcuZG9uZShoKGMpKS5yZXNvbHZlLGcucmVqZWN0KSxcInBlbmRpbmdcIj09PWcuc3RhdGUoKXx8ci5pc0Z1bmN0aW9uKGVbY10mJmVbY10udGhlbikpKXJldHVybiBnLnRoZW4oKTt3aGlsZShjLS0pTyhlW2NdLGgoYyksZy5yZWplY3QpO3JldHVybiBnLnByb21pc2UoKX19KTt2YXIgUD0vXihFdmFsfEludGVybmFsfFJhbmdlfFJlZmVyZW5jZXxTeW50YXh8VHlwZXxVUkkpRXJyb3IkLztyLkRlZmVycmVkLmV4Y2VwdGlvbkhvb2s9ZnVuY3Rpb24oYixjKXthLmNvbnNvbGUmJmEuY29uc29sZS53YXJuJiZiJiZQLnRlc3QoYi5uYW1lKSYmYS5jb25zb2xlLndhcm4oXCJqUXVlcnkuRGVmZXJyZWQgZXhjZXB0aW9uOiBcIitiLm1lc3NhZ2UsYi5zdGFjayxjKX0sci5yZWFkeUV4Y2VwdGlvbj1mdW5jdGlvbihiKXthLnNldFRpbWVvdXQoZnVuY3Rpb24oKXt0aHJvdyBifSl9O3ZhciBRPXIuRGVmZXJyZWQoKTtyLmZuLnJlYWR5PWZ1bmN0aW9uKGEpe3JldHVybiBRLnRoZW4oYSlbXCJjYXRjaFwiXShmdW5jdGlvbihhKXtyLnJlYWR5RXhjZXB0aW9uKGEpfSksdGhpc30sci5leHRlbmQoe2lzUmVhZHk6ITEscmVhZHlXYWl0OjEsaG9sZFJlYWR5OmZ1bmN0aW9uKGEpe2E/ci5yZWFkeVdhaXQrKzpyLnJlYWR5KCEwKX0scmVhZHk6ZnVuY3Rpb24oYSl7KGE9PT0hMD8tLXIucmVhZHlXYWl0OnIuaXNSZWFkeSl8fChyLmlzUmVhZHk9ITAsYSE9PSEwJiYtLXIucmVhZHlXYWl0PjB8fFEucmVzb2x2ZVdpdGgoZCxbcl0pKX19KSxyLnJlYWR5LnRoZW49US50aGVuO2Z1bmN0aW9uIFIoKXtkLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsUiksYS5yZW1vdmVFdmVudExpc3RlbmVyKFwibG9hZFwiLFIpLHIucmVhZHkoKX1cImNvbXBsZXRlXCI9PT1kLnJlYWR5U3RhdGV8fFwibG9hZGluZ1wiIT09ZC5yZWFkeVN0YXRlJiYhZC5kb2N1bWVudEVsZW1lbnQuZG9TY3JvbGw/YS5zZXRUaW1lb3V0KHIucmVhZHkpOihkLmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsUiksYS5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLFIpKTt2YXIgUz1mdW5jdGlvbihhLGIsYyxkLGUsZixnKXt2YXIgaD0wLGk9YS5sZW5ndGgsaj1udWxsPT1jO2lmKFwib2JqZWN0XCI9PT1yLnR5cGUoYykpe2U9ITA7Zm9yKGggaW4gYylTKGEsYixoLGNbaF0sITAsZixnKX1lbHNlIGlmKHZvaWQgMCE9PWQmJihlPSEwLFxuci5pc0Z1bmN0aW9uKGQpfHwoZz0hMCksaiYmKGc/KGIuY2FsbChhLGQpLGI9bnVsbCk6KGo9YixiPWZ1bmN0aW9uKGEsYixjKXtyZXR1cm4gai5jYWxsKHIoYSksYyl9KSksYikpZm9yKDtoPGk7aCsrKWIoYVtoXSxjLGc/ZDpkLmNhbGwoYVtoXSxoLGIoYVtoXSxjKSkpO3JldHVybiBlP2E6aj9iLmNhbGwoYSk6aT9iKGFbMF0sYyk6Zn0sVD1mdW5jdGlvbihhKXtyZXR1cm4gMT09PWEubm9kZVR5cGV8fDk9PT1hLm5vZGVUeXBlfHwhK2Eubm9kZVR5cGV9O2Z1bmN0aW9uIFUoKXt0aGlzLmV4cGFuZG89ci5leHBhbmRvK1UudWlkKyt9VS51aWQ9MSxVLnByb3RvdHlwZT17Y2FjaGU6ZnVuY3Rpb24oYSl7dmFyIGI9YVt0aGlzLmV4cGFuZG9dO3JldHVybiBifHwoYj17fSxUKGEpJiYoYS5ub2RlVHlwZT9hW3RoaXMuZXhwYW5kb109YjpPYmplY3QuZGVmaW5lUHJvcGVydHkoYSx0aGlzLmV4cGFuZG8se3ZhbHVlOmIsY29uZmlndXJhYmxlOiEwfSkpKSxifSxzZXQ6ZnVuY3Rpb24oYSxiLGMpe3ZhciBkLGU9dGhpcy5jYWNoZShhKTtpZihcInN0cmluZ1wiPT10eXBlb2YgYillW3IuY2FtZWxDYXNlKGIpXT1jO2Vsc2UgZm9yKGQgaW4gYillW3IuY2FtZWxDYXNlKGQpXT1iW2RdO3JldHVybiBlfSxnZXQ6ZnVuY3Rpb24oYSxiKXtyZXR1cm4gdm9pZCAwPT09Yj90aGlzLmNhY2hlKGEpOmFbdGhpcy5leHBhbmRvXSYmYVt0aGlzLmV4cGFuZG9dW3IuY2FtZWxDYXNlKGIpXX0sYWNjZXNzOmZ1bmN0aW9uKGEsYixjKXtyZXR1cm4gdm9pZCAwPT09Ynx8YiYmXCJzdHJpbmdcIj09dHlwZW9mIGImJnZvaWQgMD09PWM/dGhpcy5nZXQoYSxiKToodGhpcy5zZXQoYSxiLGMpLHZvaWQgMCE9PWM/YzpiKX0scmVtb3ZlOmZ1bmN0aW9uKGEsYil7dmFyIGMsZD1hW3RoaXMuZXhwYW5kb107aWYodm9pZCAwIT09ZCl7aWYodm9pZCAwIT09Yil7ci5pc0FycmF5KGIpP2I9Yi5tYXAoci5jYW1lbENhc2UpOihiPXIuY2FtZWxDYXNlKGIpLGI9YiBpbiBkP1tiXTpiLm1hdGNoKEspfHxbXSksYz1iLmxlbmd0aDt3aGlsZShjLS0pZGVsZXRlIGRbYltjXV19KHZvaWQgMD09PWJ8fHIuaXNFbXB0eU9iamVjdChkKSkmJihhLm5vZGVUeXBlP2FbdGhpcy5leHBhbmRvXT12b2lkIDA6ZGVsZXRlIGFbdGhpcy5leHBhbmRvXSl9fSxoYXNEYXRhOmZ1bmN0aW9uKGEpe3ZhciBiPWFbdGhpcy5leHBhbmRvXTtyZXR1cm4gdm9pZCAwIT09YiYmIXIuaXNFbXB0eU9iamVjdChiKX19O3ZhciBWPW5ldyBVLFc9bmV3IFUsWD0vXig/Olxce1tcXHdcXFddKlxcfXxcXFtbXFx3XFxXXSpcXF0pJC8sWT0vW0EtWl0vZztmdW5jdGlvbiBaKGEsYixjKXt2YXIgZDtpZih2b2lkIDA9PT1jJiYxPT09YS5ub2RlVHlwZSlpZihkPVwiZGF0YS1cIitiLnJlcGxhY2UoWSxcIi0kJlwiKS50b0xvd2VyQ2FzZSgpLGM9YS5nZXRBdHRyaWJ1dGUoZCksXCJzdHJpbmdcIj09dHlwZW9mIGMpe3RyeXtjPVwidHJ1ZVwiPT09Y3x8XCJmYWxzZVwiIT09YyYmKFwibnVsbFwiPT09Yz9udWxsOitjK1wiXCI9PT1jPytjOlgudGVzdChjKT9KU09OLnBhcnNlKGMpOmMpfWNhdGNoKGUpe31XLnNldChhLGIsYyl9ZWxzZSBjPXZvaWQgMDtyZXR1cm4gY31yLmV4dGVuZCh7aGFzRGF0YTpmdW5jdGlvbihhKXtyZXR1cm4gVy5oYXNEYXRhKGEpfHxWLmhhc0RhdGEoYSl9LGRhdGE6ZnVuY3Rpb24oYSxiLGMpe3JldHVybiBXLmFjY2VzcyhhLGIsYyl9LHJlbW92ZURhdGE6ZnVuY3Rpb24oYSxiKXtXLnJlbW92ZShhLGIpfSxfZGF0YTpmdW5jdGlvbihhLGIsYyl7cmV0dXJuIFYuYWNjZXNzKGEsYixjKX0sX3JlbW92ZURhdGE6ZnVuY3Rpb24oYSxiKXtWLnJlbW92ZShhLGIpfX0pLHIuZm4uZXh0ZW5kKHtkYXRhOmZ1bmN0aW9uKGEsYil7dmFyIGMsZCxlLGY9dGhpc1swXSxnPWYmJmYuYXR0cmlidXRlcztpZih2b2lkIDA9PT1hKXtpZih0aGlzLmxlbmd0aCYmKGU9Vy5nZXQoZiksMT09PWYubm9kZVR5cGUmJiFWLmdldChmLFwiaGFzRGF0YUF0dHJzXCIpKSl7Yz1nLmxlbmd0aDt3aGlsZShjLS0pZ1tjXSYmKGQ9Z1tjXS5uYW1lLDA9PT1kLmluZGV4T2YoXCJkYXRhLVwiKSYmKGQ9ci5jYW1lbENhc2UoZC5zbGljZSg1KSksWihmLGQsZVtkXSkpKTtWLnNldChmLFwiaGFzRGF0YUF0dHJzXCIsITApfXJldHVybiBlfXJldHVyblwib2JqZWN0XCI9PXR5cGVvZiBhP3RoaXMuZWFjaChmdW5jdGlvbigpe1cuc2V0KHRoaXMsYSl9KTpTKHRoaXMsZnVuY3Rpb24oYil7dmFyIGM7aWYoZiYmdm9pZCAwPT09Yil7aWYoYz1XLmdldChmLGEpLHZvaWQgMCE9PWMpcmV0dXJuIGM7aWYoYz1aKGYsYSksdm9pZCAwIT09YylyZXR1cm4gY31lbHNlIHRoaXMuZWFjaChmdW5jdGlvbigpe1cuc2V0KHRoaXMsYSxiKX0pfSxudWxsLGIsYXJndW1lbnRzLmxlbmd0aD4xLG51bGwsITApfSxyZW1vdmVEYXRhOmZ1bmN0aW9uKGEpe3JldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKXtXLnJlbW92ZSh0aGlzLGEpfSl9fSksci5leHRlbmQoe3F1ZXVlOmZ1bmN0aW9uKGEsYixjKXt2YXIgZDtpZihhKXJldHVybiBiPShifHxcImZ4XCIpK1wicXVldWVcIixkPVYuZ2V0KGEsYiksYyYmKCFkfHxyLmlzQXJyYXkoYyk/ZD1WLmFjY2VzcyhhLGIsci5tYWtlQXJyYXkoYykpOmQucHVzaChjKSksZHx8W119LGRlcXVldWU6ZnVuY3Rpb24oYSxiKXtiPWJ8fFwiZnhcIjt2YXIgYz1yLnF1ZXVlKGEsYiksZD1jLmxlbmd0aCxlPWMuc2hpZnQoKSxmPXIuX3F1ZXVlSG9va3MoYSxiKSxnPWZ1bmN0aW9uKCl7ci5kZXF1ZXVlKGEsYil9O1wiaW5wcm9ncmVzc1wiPT09ZSYmKGU9Yy5zaGlmdCgpLGQtLSksZSYmKFwiZnhcIj09PWImJmMudW5zaGlmdChcImlucHJvZ3Jlc3NcIiksZGVsZXRlIGYuc3RvcCxlLmNhbGwoYSxnLGYpKSwhZCYmZiYmZi5lbXB0eS5maXJlKCl9LF9xdWV1ZUhvb2tzOmZ1bmN0aW9uKGEsYil7dmFyIGM9YitcInF1ZXVlSG9va3NcIjtyZXR1cm4gVi5nZXQoYSxjKXx8Vi5hY2Nlc3MoYSxjLHtlbXB0eTpyLkNhbGxiYWNrcyhcIm9uY2UgbWVtb3J5XCIpLmFkZChmdW5jdGlvbigpe1YucmVtb3ZlKGEsW2IrXCJxdWV1ZVwiLGNdKX0pfSl9fSksci5mbi5leHRlbmQoe3F1ZXVlOmZ1bmN0aW9uKGEsYil7dmFyIGM9MjtyZXR1cm5cInN0cmluZ1wiIT10eXBlb2YgYSYmKGI9YSxhPVwiZnhcIixjLS0pLGFyZ3VtZW50cy5sZW5ndGg8Yz9yLnF1ZXVlKHRoaXNbMF0sYSk6dm9pZCAwPT09Yj90aGlzOnRoaXMuZWFjaChmdW5jdGlvbigpe3ZhciBjPXIucXVldWUodGhpcyxhLGIpO3IuX3F1ZXVlSG9va3ModGhpcyxhKSxcImZ4XCI9PT1hJiZcImlucHJvZ3Jlc3NcIiE9PWNbMF0mJnIuZGVxdWV1ZSh0aGlzLGEpfSl9LGRlcXVldWU6ZnVuY3Rpb24oYSl7cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpe3IuZGVxdWV1ZSh0aGlzLGEpfSl9LGNsZWFyUXVldWU6ZnVuY3Rpb24oYSl7cmV0dXJuIHRoaXMucXVldWUoYXx8XCJmeFwiLFtdKX0scHJvbWlzZTpmdW5jdGlvbihhLGIpe3ZhciBjLGQ9MSxlPXIuRGVmZXJyZWQoKSxmPXRoaXMsZz10aGlzLmxlbmd0aCxoPWZ1bmN0aW9uKCl7LS1kfHxlLnJlc29sdmVXaXRoKGYsW2ZdKX07XCJzdHJpbmdcIiE9dHlwZW9mIGEmJihiPWEsYT12b2lkIDApLGE9YXx8XCJmeFwiO3doaWxlKGctLSljPVYuZ2V0KGZbZ10sYStcInF1ZXVlSG9va3NcIiksYyYmYy5lbXB0eSYmKGQrKyxjLmVtcHR5LmFkZChoKSk7cmV0dXJuIGgoKSxlLnByb21pc2UoYil9fSk7dmFyICQ9L1srLV0/KD86XFxkKlxcLnwpXFxkKyg/OltlRV1bKy1dP1xcZCt8KS8uc291cmNlLF89bmV3IFJlZ0V4cChcIl4oPzooWystXSk9fCkoXCIrJCtcIikoW2EteiVdKikkXCIsXCJpXCIpLGFhPVtcIlRvcFwiLFwiUmlnaHRcIixcIkJvdHRvbVwiLFwiTGVmdFwiXSxiYT1mdW5jdGlvbihhLGIpe3JldHVybiBhPWJ8fGEsXCJub25lXCI9PT1hLnN0eWxlLmRpc3BsYXl8fFwiXCI9PT1hLnN0eWxlLmRpc3BsYXkmJnIuY29udGFpbnMoYS5vd25lckRvY3VtZW50LGEpJiZcIm5vbmVcIj09PXIuY3NzKGEsXCJkaXNwbGF5XCIpfSxjYT1mdW5jdGlvbihhLGIsYyxkKXt2YXIgZSxmLGc9e307Zm9yKGYgaW4gYilnW2ZdPWEuc3R5bGVbZl0sYS5zdHlsZVtmXT1iW2ZdO2U9Yy5hcHBseShhLGR8fFtdKTtmb3IoZiBpbiBiKWEuc3R5bGVbZl09Z1tmXTtyZXR1cm4gZX07ZnVuY3Rpb24gZGEoYSxiLGMsZCl7dmFyIGUsZj0xLGc9MjAsaD1kP2Z1bmN0aW9uKCl7cmV0dXJuIGQuY3VyKCl9OmZ1bmN0aW9uKCl7cmV0dXJuIHIuY3NzKGEsYixcIlwiKX0saT1oKCksaj1jJiZjWzNdfHwoci5jc3NOdW1iZXJbYl0/XCJcIjpcInB4XCIpLGs9KHIuY3NzTnVtYmVyW2JdfHxcInB4XCIhPT1qJiYraSkmJl8uZXhlYyhyLmNzcyhhLGIpKTtpZihrJiZrWzNdIT09ail7aj1qfHxrWzNdLGM9Y3x8W10saz0raXx8MTtkbyBmPWZ8fFwiLjVcIixrLz1mLHIuc3R5bGUoYSxiLGsraik7d2hpbGUoZiE9PShmPWgoKS9pKSYmMSE9PWYmJi0tZyl9cmV0dXJuIGMmJihrPStrfHwraXx8MCxlPWNbMV0/aysoY1sxXSsxKSpjWzJdOitjWzJdLGQmJihkLnVuaXQ9aixkLnN0YXJ0PWssZC5lbmQ9ZSkpLGV9dmFyIGVhPXt9O2Z1bmN0aW9uIGZhKGEpe3ZhciBiLGM9YS5vd25lckRvY3VtZW50LGQ9YS5ub2RlTmFtZSxlPWVhW2RdO3JldHVybiBlP2U6KGI9Yy5ib2R5LmFwcGVuZENoaWxkKGMuY3JlYXRlRWxlbWVudChkKSksZT1yLmNzcyhiLFwiZGlzcGxheVwiKSxiLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoYiksXCJub25lXCI9PT1lJiYoZT1cImJsb2NrXCIpLGVhW2RdPWUsZSl9ZnVuY3Rpb24gZ2EoYSxiKXtmb3IodmFyIGMsZCxlPVtdLGY9MCxnPWEubGVuZ3RoO2Y8ZztmKyspZD1hW2ZdLGQuc3R5bGUmJihjPWQuc3R5bGUuZGlzcGxheSxiPyhcIm5vbmVcIj09PWMmJihlW2ZdPVYuZ2V0KGQsXCJkaXNwbGF5XCIpfHxudWxsLGVbZl18fChkLnN0eWxlLmRpc3BsYXk9XCJcIikpLFwiXCI9PT1kLnN0eWxlLmRpc3BsYXkmJmJhKGQpJiYoZVtmXT1mYShkKSkpOlwibm9uZVwiIT09YyYmKGVbZl09XCJub25lXCIsVi5zZXQoZCxcImRpc3BsYXlcIixjKSkpO2ZvcihmPTA7ZjxnO2YrKyludWxsIT1lW2ZdJiYoYVtmXS5zdHlsZS5kaXNwbGF5PWVbZl0pO3JldHVybiBhfXIuZm4uZXh0ZW5kKHtzaG93OmZ1bmN0aW9uKCl7cmV0dXJuIGdhKHRoaXMsITApfSxoaWRlOmZ1bmN0aW9uKCl7cmV0dXJuIGdhKHRoaXMpfSx0b2dnbGU6ZnVuY3Rpb24oYSl7cmV0dXJuXCJib29sZWFuXCI9PXR5cGVvZiBhP2E/dGhpcy5zaG93KCk6dGhpcy5oaWRlKCk6dGhpcy5lYWNoKGZ1bmN0aW9uKCl7YmEodGhpcyk/cih0aGlzKS5zaG93KCk6cih0aGlzKS5oaWRlKCl9KX19KTt2YXIgaGE9L14oPzpjaGVja2JveHxyYWRpbykkL2ksaWE9LzwoW2Etel1bXlxcL1xcMD5cXHgyMFxcdFxcclxcblxcZl0rKS9pLGphPS9eJHxcXC8oPzpqYXZhfGVjbWEpc2NyaXB0L2ksa2E9e29wdGlvbjpbMSxcIjxzZWxlY3QgbXVsdGlwbGU9J211bHRpcGxlJz5cIixcIjwvc2VsZWN0PlwiXSx0aGVhZDpbMSxcIjx0YWJsZT5cIixcIjwvdGFibGU+XCJdLGNvbDpbMixcIjx0YWJsZT48Y29sZ3JvdXA+XCIsXCI8L2NvbGdyb3VwPjwvdGFibGU+XCJdLHRyOlsyLFwiPHRhYmxlPjx0Ym9keT5cIixcIjwvdGJvZHk+PC90YWJsZT5cIl0sdGQ6WzMsXCI8dGFibGU+PHRib2R5Pjx0cj5cIixcIjwvdHI+PC90Ym9keT48L3RhYmxlPlwiXSxfZGVmYXVsdDpbMCxcIlwiLFwiXCJdfTtrYS5vcHRncm91cD1rYS5vcHRpb24sa2EudGJvZHk9a2EudGZvb3Q9a2EuY29sZ3JvdXA9a2EuY2FwdGlvbj1rYS50aGVhZCxrYS50aD1rYS50ZDtmdW5jdGlvbiBsYShhLGIpe3ZhciBjPVwidW5kZWZpbmVkXCIhPXR5cGVvZiBhLmdldEVsZW1lbnRzQnlUYWdOYW1lP2EuZ2V0RWxlbWVudHNCeVRhZ05hbWUoYnx8XCIqXCIpOlwidW5kZWZpbmVkXCIhPXR5cGVvZiBhLnF1ZXJ5U2VsZWN0b3JBbGw/YS5xdWVyeVNlbGVjdG9yQWxsKGJ8fFwiKlwiKTpbXTtyZXR1cm4gdm9pZCAwPT09Ynx8YiYmci5ub2RlTmFtZShhLGIpP3IubWVyZ2UoW2FdLGMpOmN9ZnVuY3Rpb24gbWEoYSxiKXtmb3IodmFyIGM9MCxkPWEubGVuZ3RoO2M8ZDtjKyspVi5zZXQoYVtjXSxcImdsb2JhbEV2YWxcIiwhYnx8Vi5nZXQoYltjXSxcImdsb2JhbEV2YWxcIikpfXZhciBuYT0vPHwmIz9cXHcrOy87ZnVuY3Rpb24gb2EoYSxiLGMsZCxlKXtmb3IodmFyIGYsZyxoLGksaixrLGw9Yi5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCksbT1bXSxuPTAsbz1hLmxlbmd0aDtuPG87bisrKWlmKGY9YVtuXSxmfHwwPT09ZilpZihcIm9iamVjdFwiPT09ci50eXBlKGYpKXIubWVyZ2UobSxmLm5vZGVUeXBlP1tmXTpmKTtlbHNlIGlmKG5hLnRlc3QoZikpe2c9Z3x8bC5hcHBlbmRDaGlsZChiLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpLGg9KGlhLmV4ZWMoZil8fFtcIlwiLFwiXCJdKVsxXS50b0xvd2VyQ2FzZSgpLGk9a2FbaF18fGthLl9kZWZhdWx0LGcuaW5uZXJIVE1MPWlbMV0rci5odG1sUHJlZmlsdGVyKGYpK2lbMl0saz1pWzBdO3doaWxlKGstLSlnPWcubGFzdENoaWxkO3IubWVyZ2UobSxnLmNoaWxkTm9kZXMpLGc9bC5maXJzdENoaWxkLGcudGV4dENvbnRlbnQ9XCJcIn1lbHNlIG0ucHVzaChiLmNyZWF0ZVRleHROb2RlKGYpKTtsLnRleHRDb250ZW50PVwiXCIsbj0wO3doaWxlKGY9bVtuKytdKWlmKGQmJnIuaW5BcnJheShmLGQpPi0xKWUmJmUucHVzaChmKTtlbHNlIGlmKGo9ci5jb250YWlucyhmLm93bmVyRG9jdW1lbnQsZiksZz1sYShsLmFwcGVuZENoaWxkKGYpLFwic2NyaXB0XCIpLGomJm1hKGcpLGMpe2s9MDt3aGlsZShmPWdbaysrXSlqYS50ZXN0KGYudHlwZXx8XCJcIikmJmMucHVzaChmKX1yZXR1cm4gbH0hZnVuY3Rpb24oKXt2YXIgYT1kLmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKSxiPWEuYXBwZW5kQ2hpbGQoZC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpKSxjPWQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO2Muc2V0QXR0cmlidXRlKFwidHlwZVwiLFwicmFkaW9cIiksYy5zZXRBdHRyaWJ1dGUoXCJjaGVja2VkXCIsXCJjaGVja2VkXCIpLGMuc2V0QXR0cmlidXRlKFwibmFtZVwiLFwidFwiKSxiLmFwcGVuZENoaWxkKGMpLG8uY2hlY2tDbG9uZT1iLmNsb25lTm9kZSghMCkuY2xvbmVOb2RlKCEwKS5sYXN0Q2hpbGQuY2hlY2tlZCxiLmlubmVySFRNTD1cIjx0ZXh0YXJlYT54PC90ZXh0YXJlYT5cIixvLm5vQ2xvbmVDaGVja2VkPSEhYi5jbG9uZU5vZGUoITApLmxhc3RDaGlsZC5kZWZhdWx0VmFsdWV9KCk7dmFyIHBhPWQuZG9jdW1lbnRFbGVtZW50LHFhPS9ea2V5LyxyYT0vXig/Om1vdXNlfHBvaW50ZXJ8Y29udGV4dG1lbnV8ZHJhZ3xkcm9wKXxjbGljay8sc2E9L14oW14uXSopKD86XFwuKC4rKXwpLztmdW5jdGlvbiB0YSgpe3JldHVybiEwfWZ1bmN0aW9uIHVhKCl7cmV0dXJuITF9ZnVuY3Rpb24gdmEoKXt0cnl7cmV0dXJuIGQuYWN0aXZlRWxlbWVudH1jYXRjaChhKXt9fWZ1bmN0aW9uIHdhKGEsYixjLGQsZSxmKXt2YXIgZyxoO2lmKFwib2JqZWN0XCI9PXR5cGVvZiBiKXtcInN0cmluZ1wiIT10eXBlb2YgYyYmKGQ9ZHx8YyxjPXZvaWQgMCk7Zm9yKGggaW4gYil3YShhLGgsYyxkLGJbaF0sZik7cmV0dXJuIGF9aWYobnVsbD09ZCYmbnVsbD09ZT8oZT1jLGQ9Yz12b2lkIDApOm51bGw9PWUmJihcInN0cmluZ1wiPT10eXBlb2YgYz8oZT1kLGQ9dm9pZCAwKTooZT1kLGQ9YyxjPXZvaWQgMCkpLGU9PT0hMSllPXVhO2Vsc2UgaWYoIWUpcmV0dXJuIGE7cmV0dXJuIDE9PT1mJiYoZz1lLGU9ZnVuY3Rpb24oYSl7cmV0dXJuIHIoKS5vZmYoYSksZy5hcHBseSh0aGlzLGFyZ3VtZW50cyl9LGUuZ3VpZD1nLmd1aWR8fChnLmd1aWQ9ci5ndWlkKyspKSxhLmVhY2goZnVuY3Rpb24oKXtyLmV2ZW50LmFkZCh0aGlzLGIsZSxkLGMpfSl9ci5ldmVudD17Z2xvYmFsOnt9LGFkZDpmdW5jdGlvbihhLGIsYyxkLGUpe3ZhciBmLGcsaCxpLGosayxsLG0sbixvLHAscT1WLmdldChhKTtpZihxKXtjLmhhbmRsZXImJihmPWMsYz1mLmhhbmRsZXIsZT1mLnNlbGVjdG9yKSxlJiZyLmZpbmQubWF0Y2hlc1NlbGVjdG9yKHBhLGUpLGMuZ3VpZHx8KGMuZ3VpZD1yLmd1aWQrKyksKGk9cS5ldmVudHMpfHwoaT1xLmV2ZW50cz17fSksKGc9cS5oYW5kbGUpfHwoZz1xLmhhbmRsZT1mdW5jdGlvbihiKXtyZXR1cm5cInVuZGVmaW5lZFwiIT10eXBlb2YgciYmci5ldmVudC50cmlnZ2VyZWQhPT1iLnR5cGU/ci5ldmVudC5kaXNwYXRjaC5hcHBseShhLGFyZ3VtZW50cyk6dm9pZCAwfSksYj0oYnx8XCJcIikubWF0Y2goSyl8fFtcIlwiXSxqPWIubGVuZ3RoO3doaWxlKGotLSloPXNhLmV4ZWMoYltqXSl8fFtdLG49cD1oWzFdLG89KGhbMl18fFwiXCIpLnNwbGl0KFwiLlwiKS5zb3J0KCksbiYmKGw9ci5ldmVudC5zcGVjaWFsW25dfHx7fSxuPShlP2wuZGVsZWdhdGVUeXBlOmwuYmluZFR5cGUpfHxuLGw9ci5ldmVudC5zcGVjaWFsW25dfHx7fSxrPXIuZXh0ZW5kKHt0eXBlOm4sb3JpZ1R5cGU6cCxkYXRhOmQsaGFuZGxlcjpjLGd1aWQ6Yy5ndWlkLHNlbGVjdG9yOmUsbmVlZHNDb250ZXh0OmUmJnIuZXhwci5tYXRjaC5uZWVkc0NvbnRleHQudGVzdChlKSxuYW1lc3BhY2U6by5qb2luKFwiLlwiKX0sZiksKG09aVtuXSl8fChtPWlbbl09W10sbS5kZWxlZ2F0ZUNvdW50PTAsbC5zZXR1cCYmbC5zZXR1cC5jYWxsKGEsZCxvLGcpIT09ITF8fGEuYWRkRXZlbnRMaXN0ZW5lciYmYS5hZGRFdmVudExpc3RlbmVyKG4sZykpLGwuYWRkJiYobC5hZGQuY2FsbChhLGspLGsuaGFuZGxlci5ndWlkfHwoay5oYW5kbGVyLmd1aWQ9Yy5ndWlkKSksZT9tLnNwbGljZShtLmRlbGVnYXRlQ291bnQrKywwLGspOm0ucHVzaChrKSxyLmV2ZW50Lmdsb2JhbFtuXT0hMCl9fSxyZW1vdmU6ZnVuY3Rpb24oYSxiLGMsZCxlKXt2YXIgZixnLGgsaSxqLGssbCxtLG4sbyxwLHE9Vi5oYXNEYXRhKGEpJiZWLmdldChhKTtpZihxJiYoaT1xLmV2ZW50cykpe2I9KGJ8fFwiXCIpLm1hdGNoKEspfHxbXCJcIl0saj1iLmxlbmd0aDt3aGlsZShqLS0paWYoaD1zYS5leGVjKGJbal0pfHxbXSxuPXA9aFsxXSxvPShoWzJdfHxcIlwiKS5zcGxpdChcIi5cIikuc29ydCgpLG4pe2w9ci5ldmVudC5zcGVjaWFsW25dfHx7fSxuPShkP2wuZGVsZWdhdGVUeXBlOmwuYmluZFR5cGUpfHxuLG09aVtuXXx8W10saD1oWzJdJiZuZXcgUmVnRXhwKFwiKF58XFxcXC4pXCIrby5qb2luKFwiXFxcXC4oPzouKlxcXFwufClcIikrXCIoXFxcXC58JClcIiksZz1mPW0ubGVuZ3RoO3doaWxlKGYtLSlrPW1bZl0sIWUmJnAhPT1rLm9yaWdUeXBlfHxjJiZjLmd1aWQhPT1rLmd1aWR8fGgmJiFoLnRlc3Qoay5uYW1lc3BhY2UpfHxkJiZkIT09ay5zZWxlY3RvciYmKFwiKipcIiE9PWR8fCFrLnNlbGVjdG9yKXx8KG0uc3BsaWNlKGYsMSksay5zZWxlY3RvciYmbS5kZWxlZ2F0ZUNvdW50LS0sbC5yZW1vdmUmJmwucmVtb3ZlLmNhbGwoYSxrKSk7ZyYmIW0ubGVuZ3RoJiYobC50ZWFyZG93biYmbC50ZWFyZG93bi5jYWxsKGEsbyxxLmhhbmRsZSkhPT0hMXx8ci5yZW1vdmVFdmVudChhLG4scS5oYW5kbGUpLGRlbGV0ZSBpW25dKX1lbHNlIGZvcihuIGluIGkpci5ldmVudC5yZW1vdmUoYSxuK2Jbal0sYyxkLCEwKTtyLmlzRW1wdHlPYmplY3QoaSkmJlYucmVtb3ZlKGEsXCJoYW5kbGUgZXZlbnRzXCIpfX0sZGlzcGF0Y2g6ZnVuY3Rpb24oYSl7dmFyIGI9ci5ldmVudC5maXgoYSksYyxkLGUsZixnLGgsaT1uZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCksaj0oVi5nZXQodGhpcyxcImV2ZW50c1wiKXx8e30pW2IudHlwZV18fFtdLGs9ci5ldmVudC5zcGVjaWFsW2IudHlwZV18fHt9O2ZvcihpWzBdPWIsYz0xO2M8YXJndW1lbnRzLmxlbmd0aDtjKyspaVtjXT1hcmd1bWVudHNbY107aWYoYi5kZWxlZ2F0ZVRhcmdldD10aGlzLCFrLnByZURpc3BhdGNofHxrLnByZURpc3BhdGNoLmNhbGwodGhpcyxiKSE9PSExKXtoPXIuZXZlbnQuaGFuZGxlcnMuY2FsbCh0aGlzLGIsaiksYz0wO3doaWxlKChmPWhbYysrXSkmJiFiLmlzUHJvcGFnYXRpb25TdG9wcGVkKCkpe2IuY3VycmVudFRhcmdldD1mLmVsZW0sZD0wO3doaWxlKChnPWYuaGFuZGxlcnNbZCsrXSkmJiFiLmlzSW1tZWRpYXRlUHJvcGFnYXRpb25TdG9wcGVkKCkpYi5ybmFtZXNwYWNlJiYhYi5ybmFtZXNwYWNlLnRlc3QoZy5uYW1lc3BhY2UpfHwoYi5oYW5kbGVPYmo9ZyxiLmRhdGE9Zy5kYXRhLGU9KChyLmV2ZW50LnNwZWNpYWxbZy5vcmlnVHlwZV18fHt9KS5oYW5kbGV8fGcuaGFuZGxlcikuYXBwbHkoZi5lbGVtLGkpLHZvaWQgMCE9PWUmJihiLnJlc3VsdD1lKT09PSExJiYoYi5wcmV2ZW50RGVmYXVsdCgpLGIuc3RvcFByb3BhZ2F0aW9uKCkpKX1yZXR1cm4gay5wb3N0RGlzcGF0Y2gmJmsucG9zdERpc3BhdGNoLmNhbGwodGhpcyxiKSxiLnJlc3VsdH19LGhhbmRsZXJzOmZ1bmN0aW9uKGEsYil7dmFyIGMsZCxlLGYsZz1bXSxoPWIuZGVsZWdhdGVDb3VudCxpPWEudGFyZ2V0O2lmKGgmJmkubm9kZVR5cGUmJihcImNsaWNrXCIhPT1hLnR5cGV8fGlzTmFOKGEuYnV0dG9uKXx8YS5idXR0b248MSkpZm9yKDtpIT09dGhpcztpPWkucGFyZW50Tm9kZXx8dGhpcylpZigxPT09aS5ub2RlVHlwZSYmKGkuZGlzYWJsZWQhPT0hMHx8XCJjbGlja1wiIT09YS50eXBlKSl7Zm9yKGQ9W10sYz0wO2M8aDtjKyspZj1iW2NdLGU9Zi5zZWxlY3RvcitcIiBcIix2b2lkIDA9PT1kW2VdJiYoZFtlXT1mLm5lZWRzQ29udGV4dD9yKGUsdGhpcykuaW5kZXgoaSk+LTE6ci5maW5kKGUsdGhpcyxudWxsLFtpXSkubGVuZ3RoKSxkW2VdJiZkLnB1c2goZik7ZC5sZW5ndGgmJmcucHVzaCh7ZWxlbTppLGhhbmRsZXJzOmR9KX1yZXR1cm4gaDxiLmxlbmd0aCYmZy5wdXNoKHtlbGVtOnRoaXMsaGFuZGxlcnM6Yi5zbGljZShoKX0pLGd9LGFkZFByb3A6ZnVuY3Rpb24oYSxiKXtPYmplY3QuZGVmaW5lUHJvcGVydHkoci5FdmVudC5wcm90b3R5cGUsYSx7ZW51bWVyYWJsZTohMCxjb25maWd1cmFibGU6ITAsZ2V0OnIuaXNGdW5jdGlvbihiKT9mdW5jdGlvbigpe2lmKHRoaXMub3JpZ2luYWxFdmVudClyZXR1cm4gYih0aGlzLm9yaWdpbmFsRXZlbnQpfTpmdW5jdGlvbigpe2lmKHRoaXMub3JpZ2luYWxFdmVudClyZXR1cm4gdGhpcy5vcmlnaW5hbEV2ZW50W2FdfSxzZXQ6ZnVuY3Rpb24oYil7T2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsYSx7ZW51bWVyYWJsZTohMCxjb25maWd1cmFibGU6ITAsd3JpdGFibGU6ITAsdmFsdWU6Yn0pfX0pfSxmaXg6ZnVuY3Rpb24oYSl7cmV0dXJuIGFbci5leHBhbmRvXT9hOm5ldyByLkV2ZW50KGEpfSxzcGVjaWFsOntsb2FkOntub0J1YmJsZTohMH0sZm9jdXM6e3RyaWdnZXI6ZnVuY3Rpb24oKXtpZih0aGlzIT09dmEoKSYmdGhpcy5mb2N1cylyZXR1cm4gdGhpcy5mb2N1cygpLCExfSxkZWxlZ2F0ZVR5cGU6XCJmb2N1c2luXCJ9LGJsdXI6e3RyaWdnZXI6ZnVuY3Rpb24oKXtpZih0aGlzPT09dmEoKSYmdGhpcy5ibHVyKXJldHVybiB0aGlzLmJsdXIoKSwhMX0sZGVsZWdhdGVUeXBlOlwiZm9jdXNvdXRcIn0sY2xpY2s6e3RyaWdnZXI6ZnVuY3Rpb24oKXtpZihcImNoZWNrYm94XCI9PT10aGlzLnR5cGUmJnRoaXMuY2xpY2smJnIubm9kZU5hbWUodGhpcyxcImlucHV0XCIpKXJldHVybiB0aGlzLmNsaWNrKCksITF9LF9kZWZhdWx0OmZ1bmN0aW9uKGEpe3JldHVybiByLm5vZGVOYW1lKGEudGFyZ2V0LFwiYVwiKX19LGJlZm9yZXVubG9hZDp7cG9zdERpc3BhdGNoOmZ1bmN0aW9uKGEpe3ZvaWQgMCE9PWEucmVzdWx0JiZhLm9yaWdpbmFsRXZlbnQmJihhLm9yaWdpbmFsRXZlbnQucmV0dXJuVmFsdWU9YS5yZXN1bHQpfX19fSxyLnJlbW92ZUV2ZW50PWZ1bmN0aW9uKGEsYixjKXthLnJlbW92ZUV2ZW50TGlzdGVuZXImJmEucmVtb3ZlRXZlbnRMaXN0ZW5lcihiLGMpfSxyLkV2ZW50PWZ1bmN0aW9uKGEsYil7cmV0dXJuIHRoaXMgaW5zdGFuY2VvZiByLkV2ZW50PyhhJiZhLnR5cGU/KHRoaXMub3JpZ2luYWxFdmVudD1hLHRoaXMudHlwZT1hLnR5cGUsdGhpcy5pc0RlZmF1bHRQcmV2ZW50ZWQ9YS5kZWZhdWx0UHJldmVudGVkfHx2b2lkIDA9PT1hLmRlZmF1bHRQcmV2ZW50ZWQmJmEucmV0dXJuVmFsdWU9PT0hMT90YTp1YSx0aGlzLnRhcmdldD1hLnRhcmdldCYmMz09PWEudGFyZ2V0Lm5vZGVUeXBlP2EudGFyZ2V0LnBhcmVudE5vZGU6YS50YXJnZXQsdGhpcy5jdXJyZW50VGFyZ2V0PWEuY3VycmVudFRhcmdldCx0aGlzLnJlbGF0ZWRUYXJnZXQ9YS5yZWxhdGVkVGFyZ2V0KTp0aGlzLnR5cGU9YSxiJiZyLmV4dGVuZCh0aGlzLGIpLHRoaXMudGltZVN0YW1wPWEmJmEudGltZVN0YW1wfHxyLm5vdygpLHZvaWQodGhpc1tyLmV4cGFuZG9dPSEwKSk6bmV3IHIuRXZlbnQoYSxiKX0sci5FdmVudC5wcm90b3R5cGU9e2NvbnN0cnVjdG9yOnIuRXZlbnQsaXNEZWZhdWx0UHJldmVudGVkOnVhLGlzUHJvcGFnYXRpb25TdG9wcGVkOnVhLGlzSW1tZWRpYXRlUHJvcGFnYXRpb25TdG9wcGVkOnVhLGlzU2ltdWxhdGVkOiExLHByZXZlbnREZWZhdWx0OmZ1bmN0aW9uKCl7dmFyIGE9dGhpcy5vcmlnaW5hbEV2ZW50O3RoaXMuaXNEZWZhdWx0UHJldmVudGVkPXRhLGEmJiF0aGlzLmlzU2ltdWxhdGVkJiZhLnByZXZlbnREZWZhdWx0KCl9LHN0b3BQcm9wYWdhdGlvbjpmdW5jdGlvbigpe3ZhciBhPXRoaXMub3JpZ2luYWxFdmVudDt0aGlzLmlzUHJvcGFnYXRpb25TdG9wcGVkPXRhLGEmJiF0aGlzLmlzU2ltdWxhdGVkJiZhLnN0b3BQcm9wYWdhdGlvbigpfSxzdG9wSW1tZWRpYXRlUHJvcGFnYXRpb246ZnVuY3Rpb24oKXt2YXIgYT10aGlzLm9yaWdpbmFsRXZlbnQ7dGhpcy5pc0ltbWVkaWF0ZVByb3BhZ2F0aW9uU3RvcHBlZD10YSxhJiYhdGhpcy5pc1NpbXVsYXRlZCYmYS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKSx0aGlzLnN0b3BQcm9wYWdhdGlvbigpfX0sci5lYWNoKHthbHRLZXk6ITAsYnViYmxlczohMCxjYW5jZWxhYmxlOiEwLGNoYW5nZWRUb3VjaGVzOiEwLGN0cmxLZXk6ITAsZGV0YWlsOiEwLGV2ZW50UGhhc2U6ITAsbWV0YUtleTohMCxwYWdlWDohMCxwYWdlWTohMCxzaGlmdEtleTohMCx2aWV3OiEwLFwiY2hhclwiOiEwLGNoYXJDb2RlOiEwLGtleTohMCxrZXlDb2RlOiEwLGJ1dHRvbjohMCxidXR0b25zOiEwLGNsaWVudFg6ITAsY2xpZW50WTohMCxvZmZzZXRYOiEwLG9mZnNldFk6ITAscG9pbnRlcklkOiEwLHBvaW50ZXJUeXBlOiEwLHNjcmVlblg6ITAsc2NyZWVuWTohMCx0YXJnZXRUb3VjaGVzOiEwLHRvRWxlbWVudDohMCx0b3VjaGVzOiEwLHdoaWNoOmZ1bmN0aW9uKGEpe3ZhciBiPWEuYnV0dG9uO3JldHVybiBudWxsPT1hLndoaWNoJiZxYS50ZXN0KGEudHlwZSk/bnVsbCE9YS5jaGFyQ29kZT9hLmNoYXJDb2RlOmEua2V5Q29kZTohYS53aGljaCYmdm9pZCAwIT09YiYmcmEudGVzdChhLnR5cGUpPzEmYj8xOjImYj8zOjQmYj8yOjA6YS53aGljaH19LHIuZXZlbnQuYWRkUHJvcCksci5lYWNoKHttb3VzZWVudGVyOlwibW91c2VvdmVyXCIsbW91c2VsZWF2ZTpcIm1vdXNlb3V0XCIscG9pbnRlcmVudGVyOlwicG9pbnRlcm92ZXJcIixwb2ludGVybGVhdmU6XCJwb2ludGVyb3V0XCJ9LGZ1bmN0aW9uKGEsYil7ci5ldmVudC5zcGVjaWFsW2FdPXtkZWxlZ2F0ZVR5cGU6YixiaW5kVHlwZTpiLGhhbmRsZTpmdW5jdGlvbihhKXt2YXIgYyxkPXRoaXMsZT1hLnJlbGF0ZWRUYXJnZXQsZj1hLmhhbmRsZU9iajtyZXR1cm4gZSYmKGU9PT1kfHxyLmNvbnRhaW5zKGQsZSkpfHwoYS50eXBlPWYub3JpZ1R5cGUsYz1mLmhhbmRsZXIuYXBwbHkodGhpcyxhcmd1bWVudHMpLGEudHlwZT1iKSxjfX19KSxyLmZuLmV4dGVuZCh7b246ZnVuY3Rpb24oYSxiLGMsZCl7cmV0dXJuIHdhKHRoaXMsYSxiLGMsZCl9LG9uZTpmdW5jdGlvbihhLGIsYyxkKXtyZXR1cm4gd2EodGhpcyxhLGIsYyxkLDEpfSxvZmY6ZnVuY3Rpb24oYSxiLGMpe3ZhciBkLGU7aWYoYSYmYS5wcmV2ZW50RGVmYXVsdCYmYS5oYW5kbGVPYmopcmV0dXJuIGQ9YS5oYW5kbGVPYmoscihhLmRlbGVnYXRlVGFyZ2V0KS5vZmYoZC5uYW1lc3BhY2U/ZC5vcmlnVHlwZStcIi5cIitkLm5hbWVzcGFjZTpkLm9yaWdUeXBlLGQuc2VsZWN0b3IsZC5oYW5kbGVyKSx0aGlzO2lmKFwib2JqZWN0XCI9PXR5cGVvZiBhKXtmb3IoZSBpbiBhKXRoaXMub2ZmKGUsYixhW2VdKTtyZXR1cm4gdGhpc31yZXR1cm4gYiE9PSExJiZcImZ1bmN0aW9uXCIhPXR5cGVvZiBifHwoYz1iLGI9dm9pZCAwKSxjPT09ITEmJihjPXVhKSx0aGlzLmVhY2goZnVuY3Rpb24oKXtyLmV2ZW50LnJlbW92ZSh0aGlzLGEsYyxiKX0pfX0pO3ZhciB4YT0vPCg/IWFyZWF8YnJ8Y29sfGVtYmVkfGhyfGltZ3xpbnB1dHxsaW5rfG1ldGF8cGFyYW0pKChbYS16XVteXFwvXFwwPlxceDIwXFx0XFxyXFxuXFxmXSopW14+XSopXFwvPi9naSx5YT0vPHNjcmlwdHw8c3R5bGV8PGxpbmsvaSx6YT0vY2hlY2tlZFxccyooPzpbXj1dfD1cXHMqLmNoZWNrZWQuKS9pLEFhPS9edHJ1ZVxcLyguKikvLEJhPS9eXFxzKjwhKD86XFxbQ0RBVEFcXFt8LS0pfCg/OlxcXVxcXXwtLSk+XFxzKiQvZztmdW5jdGlvbiBDYShhLGIpe3JldHVybiByLm5vZGVOYW1lKGEsXCJ0YWJsZVwiKSYmci5ub2RlTmFtZSgxMSE9PWIubm9kZVR5cGU/YjpiLmZpcnN0Q2hpbGQsXCJ0clwiKT9hLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwidGJvZHlcIilbMF18fGE6YX1mdW5jdGlvbiBEYShhKXtyZXR1cm4gYS50eXBlPShudWxsIT09YS5nZXRBdHRyaWJ1dGUoXCJ0eXBlXCIpKStcIi9cIithLnR5cGUsYX1mdW5jdGlvbiBFYShhKXt2YXIgYj1BYS5leGVjKGEudHlwZSk7cmV0dXJuIGI/YS50eXBlPWJbMV06YS5yZW1vdmVBdHRyaWJ1dGUoXCJ0eXBlXCIpLGF9ZnVuY3Rpb24gRmEoYSxiKXt2YXIgYyxkLGUsZixnLGgsaSxqO2lmKDE9PT1iLm5vZGVUeXBlKXtpZihWLmhhc0RhdGEoYSkmJihmPVYuYWNjZXNzKGEpLGc9Vi5zZXQoYixmKSxqPWYuZXZlbnRzKSl7ZGVsZXRlIGcuaGFuZGxlLGcuZXZlbnRzPXt9O2ZvcihlIGluIGopZm9yKGM9MCxkPWpbZV0ubGVuZ3RoO2M8ZDtjKyspci5ldmVudC5hZGQoYixlLGpbZV1bY10pfVcuaGFzRGF0YShhKSYmKGg9Vy5hY2Nlc3MoYSksaT1yLmV4dGVuZCh7fSxoKSxXLnNldChiLGkpKX19ZnVuY3Rpb24gR2EoYSxiKXt2YXIgYz1iLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCk7XCJpbnB1dFwiPT09YyYmaGEudGVzdChhLnR5cGUpP2IuY2hlY2tlZD1hLmNoZWNrZWQ6XCJpbnB1dFwiIT09YyYmXCJ0ZXh0YXJlYVwiIT09Y3x8KGIuZGVmYXVsdFZhbHVlPWEuZGVmYXVsdFZhbHVlKX1mdW5jdGlvbiBIYShhLGIsYyxkKXtiPWcuYXBwbHkoW10sYik7dmFyIGUsZixoLGksaixrLGw9MCxtPWEubGVuZ3RoLG49bS0xLHE9YlswXSxzPXIuaXNGdW5jdGlvbihxKTtpZihzfHxtPjEmJlwic3RyaW5nXCI9PXR5cGVvZiBxJiYhby5jaGVja0Nsb25lJiZ6YS50ZXN0KHEpKXJldHVybiBhLmVhY2goZnVuY3Rpb24oZSl7dmFyIGY9YS5lcShlKTtzJiYoYlswXT1xLmNhbGwodGhpcyxlLGYuaHRtbCgpKSksSGEoZixiLGMsZCl9KTtpZihtJiYoZT1vYShiLGFbMF0ub3duZXJEb2N1bWVudCwhMSxhLGQpLGY9ZS5maXJzdENoaWxkLDE9PT1lLmNoaWxkTm9kZXMubGVuZ3RoJiYoZT1mKSxmfHxkKSl7Zm9yKGg9ci5tYXAobGEoZSxcInNjcmlwdFwiKSxEYSksaT1oLmxlbmd0aDtsPG07bCsrKWo9ZSxsIT09biYmKGo9ci5jbG9uZShqLCEwLCEwKSxpJiZyLm1lcmdlKGgsbGEoaixcInNjcmlwdFwiKSkpLGMuY2FsbChhW2xdLGosbCk7aWYoaSlmb3Ioaz1oW2gubGVuZ3RoLTFdLm93bmVyRG9jdW1lbnQsci5tYXAoaCxFYSksbD0wO2w8aTtsKyspaj1oW2xdLGphLnRlc3Qoai50eXBlfHxcIlwiKSYmIVYuYWNjZXNzKGosXCJnbG9iYWxFdmFsXCIpJiZyLmNvbnRhaW5zKGssaikmJihqLnNyYz9yLl9ldmFsVXJsJiZyLl9ldmFsVXJsKGouc3JjKTpwKGoudGV4dENvbnRlbnQucmVwbGFjZShCYSxcIlwiKSxrKSl9cmV0dXJuIGF9ZnVuY3Rpb24gSWEoYSxiLGMpe2Zvcih2YXIgZCxlPWI/ci5maWx0ZXIoYixhKTphLGY9MDtudWxsIT0oZD1lW2ZdKTtmKyspY3x8MSE9PWQubm9kZVR5cGV8fHIuY2xlYW5EYXRhKGxhKGQpKSxkLnBhcmVudE5vZGUmJihjJiZyLmNvbnRhaW5zKGQub3duZXJEb2N1bWVudCxkKSYmbWEobGEoZCxcInNjcmlwdFwiKSksZC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGQpKTtyZXR1cm4gYX1yLmV4dGVuZCh7aHRtbFByZWZpbHRlcjpmdW5jdGlvbihhKXtyZXR1cm4gYS5yZXBsYWNlKHhhLFwiPCQxPjwvJDI+XCIpfSxjbG9uZTpmdW5jdGlvbihhLGIsYyl7dmFyIGQsZSxmLGcsaD1hLmNsb25lTm9kZSghMCksaT1yLmNvbnRhaW5zKGEub3duZXJEb2N1bWVudCxhKTtpZighKG8ubm9DbG9uZUNoZWNrZWR8fDEhPT1hLm5vZGVUeXBlJiYxMSE9PWEubm9kZVR5cGV8fHIuaXNYTUxEb2MoYSkpKWZvcihnPWxhKGgpLGY9bGEoYSksZD0wLGU9Zi5sZW5ndGg7ZDxlO2QrKylHYShmW2RdLGdbZF0pO2lmKGIpaWYoYylmb3IoZj1mfHxsYShhKSxnPWd8fGxhKGgpLGQ9MCxlPWYubGVuZ3RoO2Q8ZTtkKyspRmEoZltkXSxnW2RdKTtlbHNlIEZhKGEsaCk7cmV0dXJuIGc9bGEoaCxcInNjcmlwdFwiKSxnLmxlbmd0aD4wJiZtYShnLCFpJiZsYShhLFwic2NyaXB0XCIpKSxofSxjbGVhbkRhdGE6ZnVuY3Rpb24oYSl7Zm9yKHZhciBiLGMsZCxlPXIuZXZlbnQuc3BlY2lhbCxmPTA7dm9pZCAwIT09KGM9YVtmXSk7ZisrKWlmKFQoYykpe2lmKGI9Y1tWLmV4cGFuZG9dKXtpZihiLmV2ZW50cylmb3IoZCBpbiBiLmV2ZW50cyllW2RdP3IuZXZlbnQucmVtb3ZlKGMsZCk6ci5yZW1vdmVFdmVudChjLGQsYi5oYW5kbGUpO2NbVi5leHBhbmRvXT12b2lkIDB9Y1tXLmV4cGFuZG9dJiYoY1tXLmV4cGFuZG9dPXZvaWQgMCl9fX0pLHIuZm4uZXh0ZW5kKHtkZXRhY2g6ZnVuY3Rpb24oYSl7cmV0dXJuIElhKHRoaXMsYSwhMCl9LHJlbW92ZTpmdW5jdGlvbihhKXtyZXR1cm4gSWEodGhpcyxhKX0sdGV4dDpmdW5jdGlvbihhKXtyZXR1cm4gUyh0aGlzLGZ1bmN0aW9uKGEpe3JldHVybiB2b2lkIDA9PT1hP3IudGV4dCh0aGlzKTp0aGlzLmVtcHR5KCkuZWFjaChmdW5jdGlvbigpezEhPT10aGlzLm5vZGVUeXBlJiYxMSE9PXRoaXMubm9kZVR5cGUmJjkhPT10aGlzLm5vZGVUeXBlfHwodGhpcy50ZXh0Q29udGVudD1hKX0pfSxudWxsLGEsYXJndW1lbnRzLmxlbmd0aCl9LGFwcGVuZDpmdW5jdGlvbigpe3JldHVybiBIYSh0aGlzLGFyZ3VtZW50cyxmdW5jdGlvbihhKXtpZigxPT09dGhpcy5ub2RlVHlwZXx8MTE9PT10aGlzLm5vZGVUeXBlfHw5PT09dGhpcy5ub2RlVHlwZSl7dmFyIGI9Q2EodGhpcyxhKTtiLmFwcGVuZENoaWxkKGEpfX0pfSxwcmVwZW5kOmZ1bmN0aW9uKCl7cmV0dXJuIEhhKHRoaXMsYXJndW1lbnRzLGZ1bmN0aW9uKGEpe2lmKDE9PT10aGlzLm5vZGVUeXBlfHwxMT09PXRoaXMubm9kZVR5cGV8fDk9PT10aGlzLm5vZGVUeXBlKXt2YXIgYj1DYSh0aGlzLGEpO2IuaW5zZXJ0QmVmb3JlKGEsYi5maXJzdENoaWxkKX19KX0sYmVmb3JlOmZ1bmN0aW9uKCl7cmV0dXJuIEhhKHRoaXMsYXJndW1lbnRzLGZ1bmN0aW9uKGEpe3RoaXMucGFyZW50Tm9kZSYmdGhpcy5wYXJlbnROb2RlLmluc2VydEJlZm9yZShhLHRoaXMpfSl9LGFmdGVyOmZ1bmN0aW9uKCl7cmV0dXJuIEhhKHRoaXMsYXJndW1lbnRzLGZ1bmN0aW9uKGEpe3RoaXMucGFyZW50Tm9kZSYmdGhpcy5wYXJlbnROb2RlLmluc2VydEJlZm9yZShhLHRoaXMubmV4dFNpYmxpbmcpfSl9LGVtcHR5OmZ1bmN0aW9uKCl7Zm9yKHZhciBhLGI9MDtudWxsIT0oYT10aGlzW2JdKTtiKyspMT09PWEubm9kZVR5cGUmJihyLmNsZWFuRGF0YShsYShhLCExKSksYS50ZXh0Q29udGVudD1cIlwiKTtyZXR1cm4gdGhpc30sY2xvbmU6ZnVuY3Rpb24oYSxiKXtyZXR1cm4gYT1udWxsIT1hJiZhLGI9bnVsbD09Yj9hOmIsdGhpcy5tYXAoZnVuY3Rpb24oKXtyZXR1cm4gci5jbG9uZSh0aGlzLGEsYil9KX0saHRtbDpmdW5jdGlvbihhKXtyZXR1cm4gUyh0aGlzLGZ1bmN0aW9uKGEpe3ZhciBiPXRoaXNbMF18fHt9LGM9MCxkPXRoaXMubGVuZ3RoO2lmKHZvaWQgMD09PWEmJjE9PT1iLm5vZGVUeXBlKXJldHVybiBiLmlubmVySFRNTDtpZihcInN0cmluZ1wiPT10eXBlb2YgYSYmIXlhLnRlc3QoYSkmJiFrYVsoaWEuZXhlYyhhKXx8W1wiXCIsXCJcIl0pWzFdLnRvTG93ZXJDYXNlKCldKXthPXIuaHRtbFByZWZpbHRlcihhKTt0cnl7Zm9yKDtjPGQ7YysrKWI9dGhpc1tjXXx8e30sMT09PWIubm9kZVR5cGUmJihyLmNsZWFuRGF0YShsYShiLCExKSksYi5pbm5lckhUTUw9YSk7Yj0wfWNhdGNoKGUpe319YiYmdGhpcy5lbXB0eSgpLmFwcGVuZChhKX0sbnVsbCxhLGFyZ3VtZW50cy5sZW5ndGgpfSxyZXBsYWNlV2l0aDpmdW5jdGlvbigpe3ZhciBhPVtdO3JldHVybiBIYSh0aGlzLGFyZ3VtZW50cyxmdW5jdGlvbihiKXt2YXIgYz10aGlzLnBhcmVudE5vZGU7ci5pbkFycmF5KHRoaXMsYSk8MCYmKHIuY2xlYW5EYXRhKGxhKHRoaXMpKSxjJiZjLnJlcGxhY2VDaGlsZChiLHRoaXMpKX0sYSl9fSksci5lYWNoKHthcHBlbmRUbzpcImFwcGVuZFwiLHByZXBlbmRUbzpcInByZXBlbmRcIixpbnNlcnRCZWZvcmU6XCJiZWZvcmVcIixpbnNlcnRBZnRlcjpcImFmdGVyXCIscmVwbGFjZUFsbDpcInJlcGxhY2VXaXRoXCJ9LGZ1bmN0aW9uKGEsYil7ci5mblthXT1mdW5jdGlvbihhKXtmb3IodmFyIGMsZD1bXSxlPXIoYSksZj1lLmxlbmd0aC0xLGc9MDtnPD1mO2crKyljPWc9PT1mP3RoaXM6dGhpcy5jbG9uZSghMCkscihlW2ddKVtiXShjKSxoLmFwcGx5KGQsYy5nZXQoKSk7cmV0dXJuIHRoaXMucHVzaFN0YWNrKGQpfX0pO3ZhciBKYT0vXm1hcmdpbi8sS2E9bmV3IFJlZ0V4cChcIl4oXCIrJCtcIikoPyFweClbYS16JV0rJFwiLFwiaVwiKSxMYT1mdW5jdGlvbihiKXt2YXIgYz1iLm93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXc7cmV0dXJuIGMmJmMub3BlbmVyfHwoYz1hKSxjLmdldENvbXB1dGVkU3R5bGUoYil9OyFmdW5jdGlvbigpe2Z1bmN0aW9uIGIoKXtpZihpKXtpLnN0eWxlLmNzc1RleHQ9XCJib3gtc2l6aW5nOmJvcmRlci1ib3g7cG9zaXRpb246cmVsYXRpdmU7ZGlzcGxheTpibG9jazttYXJnaW46YXV0bztib3JkZXI6MXB4O3BhZGRpbmc6MXB4O3RvcDoxJTt3aWR0aDo1MCVcIixpLmlubmVySFRNTD1cIlwiLHBhLmFwcGVuZENoaWxkKGgpO3ZhciBiPWEuZ2V0Q29tcHV0ZWRTdHlsZShpKTtjPVwiMSVcIiE9PWIudG9wLGc9XCIycHhcIj09PWIubWFyZ2luTGVmdCxlPVwiNHB4XCI9PT1iLndpZHRoLGkuc3R5bGUubWFyZ2luUmlnaHQ9XCI1MCVcIixmPVwiNHB4XCI9PT1iLm1hcmdpblJpZ2h0LHBhLnJlbW92ZUNoaWxkKGgpLGk9bnVsbH19dmFyIGMsZSxmLGcsaD1kLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiksaT1kLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7aS5zdHlsZSYmKGkuc3R5bGUuYmFja2dyb3VuZENsaXA9XCJjb250ZW50LWJveFwiLGkuY2xvbmVOb2RlKCEwKS5zdHlsZS5iYWNrZ3JvdW5kQ2xpcD1cIlwiLG8uY2xlYXJDbG9uZVN0eWxlPVwiY29udGVudC1ib3hcIj09PWkuc3R5bGUuYmFja2dyb3VuZENsaXAsaC5zdHlsZS5jc3NUZXh0PVwiYm9yZGVyOjA7d2lkdGg6OHB4O2hlaWdodDowO3RvcDowO2xlZnQ6LTk5OTlweDtwYWRkaW5nOjA7bWFyZ2luLXRvcDoxcHg7cG9zaXRpb246YWJzb2x1dGVcIixoLmFwcGVuZENoaWxkKGkpLHIuZXh0ZW5kKG8se3BpeGVsUG9zaXRpb246ZnVuY3Rpb24oKXtyZXR1cm4gYigpLGN9LGJveFNpemluZ1JlbGlhYmxlOmZ1bmN0aW9uKCl7cmV0dXJuIGIoKSxlfSxwaXhlbE1hcmdpblJpZ2h0OmZ1bmN0aW9uKCl7cmV0dXJuIGIoKSxmfSxyZWxpYWJsZU1hcmdpbkxlZnQ6ZnVuY3Rpb24oKXtyZXR1cm4gYigpLGd9fSkpfSgpO2Z1bmN0aW9uIE1hKGEsYixjKXt2YXIgZCxlLGYsZyxoPWEuc3R5bGU7cmV0dXJuIGM9Y3x8TGEoYSksYyYmKGc9Yy5nZXRQcm9wZXJ0eVZhbHVlKGIpfHxjW2JdLFwiXCIhPT1nfHxyLmNvbnRhaW5zKGEub3duZXJEb2N1bWVudCxhKXx8KGc9ci5zdHlsZShhLGIpKSwhby5waXhlbE1hcmdpblJpZ2h0KCkmJkthLnRlc3QoZykmJkphLnRlc3QoYikmJihkPWgud2lkdGgsZT1oLm1pbldpZHRoLGY9aC5tYXhXaWR0aCxoLm1pbldpZHRoPWgubWF4V2lkdGg9aC53aWR0aD1nLGc9Yy53aWR0aCxoLndpZHRoPWQsaC5taW5XaWR0aD1lLGgubWF4V2lkdGg9ZikpLHZvaWQgMCE9PWc/ZytcIlwiOmd9ZnVuY3Rpb24gTmEoYSxiKXtyZXR1cm57Z2V0OmZ1bmN0aW9uKCl7cmV0dXJuIGEoKT92b2lkIGRlbGV0ZSB0aGlzLmdldDoodGhpcy5nZXQ9YikuYXBwbHkodGhpcyxhcmd1bWVudHMpfX19dmFyIE9hPS9eKG5vbmV8dGFibGUoPyEtY1tlYV0pLispLyxQYT17cG9zaXRpb246XCJhYnNvbHV0ZVwiLHZpc2liaWxpdHk6XCJoaWRkZW5cIixkaXNwbGF5OlwiYmxvY2tcIn0sUWE9e2xldHRlclNwYWNpbmc6XCIwXCIsZm9udFdlaWdodDpcIjQwMFwifSxSYT1bXCJXZWJraXRcIixcIk1velwiLFwibXNcIl0sU2E9ZC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpLnN0eWxlO2Z1bmN0aW9uIFRhKGEpe2lmKGEgaW4gU2EpcmV0dXJuIGE7dmFyIGI9YVswXS50b1VwcGVyQ2FzZSgpK2Euc2xpY2UoMSksYz1SYS5sZW5ndGg7d2hpbGUoYy0tKWlmKGE9UmFbY10rYixhIGluIFNhKXJldHVybiBhfWZ1bmN0aW9uIFVhKGEsYixjKXt2YXIgZD1fLmV4ZWMoYik7cmV0dXJuIGQ/TWF0aC5tYXgoMCxkWzJdLShjfHwwKSkrKGRbM118fFwicHhcIik6Yn1mdW5jdGlvbiBWYShhLGIsYyxkLGUpe2Zvcih2YXIgZj1jPT09KGQ/XCJib3JkZXJcIjpcImNvbnRlbnRcIik/NDpcIndpZHRoXCI9PT1iPzE6MCxnPTA7Zjw0O2YrPTIpXCJtYXJnaW5cIj09PWMmJihnKz1yLmNzcyhhLGMrYWFbZl0sITAsZSkpLGQ/KFwiY29udGVudFwiPT09YyYmKGctPXIuY3NzKGEsXCJwYWRkaW5nXCIrYWFbZl0sITAsZSkpLFwibWFyZ2luXCIhPT1jJiYoZy09ci5jc3MoYSxcImJvcmRlclwiK2FhW2ZdK1wiV2lkdGhcIiwhMCxlKSkpOihnKz1yLmNzcyhhLFwicGFkZGluZ1wiK2FhW2ZdLCEwLGUpLFwicGFkZGluZ1wiIT09YyYmKGcrPXIuY3NzKGEsXCJib3JkZXJcIithYVtmXStcIldpZHRoXCIsITAsZSkpKTtyZXR1cm4gZ31mdW5jdGlvbiBXYShhLGIsYyl7dmFyIGQsZT0hMCxmPUxhKGEpLGc9XCJib3JkZXItYm94XCI9PT1yLmNzcyhhLFwiYm94U2l6aW5nXCIsITEsZik7aWYoYS5nZXRDbGllbnRSZWN0cygpLmxlbmd0aCYmKGQ9YS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVtiXSksZDw9MHx8bnVsbD09ZCl7aWYoZD1NYShhLGIsZiksKGQ8MHx8bnVsbD09ZCkmJihkPWEuc3R5bGVbYl0pLEthLnRlc3QoZCkpcmV0dXJuIGQ7ZT1nJiYoby5ib3hTaXppbmdSZWxpYWJsZSgpfHxkPT09YS5zdHlsZVtiXSksZD1wYXJzZUZsb2F0KGQpfHwwfXJldHVybiBkK1ZhKGEsYixjfHwoZz9cImJvcmRlclwiOlwiY29udGVudFwiKSxlLGYpK1wicHhcIn1yLmV4dGVuZCh7Y3NzSG9va3M6e29wYWNpdHk6e2dldDpmdW5jdGlvbihhLGIpe2lmKGIpe3ZhciBjPU1hKGEsXCJvcGFjaXR5XCIpO3JldHVyblwiXCI9PT1jP1wiMVwiOmN9fX19LGNzc051bWJlcjp7YW5pbWF0aW9uSXRlcmF0aW9uQ291bnQ6ITAsY29sdW1uQ291bnQ6ITAsZmlsbE9wYWNpdHk6ITAsZmxleEdyb3c6ITAsZmxleFNocmluazohMCxmb250V2VpZ2h0OiEwLGxpbmVIZWlnaHQ6ITAsb3BhY2l0eTohMCxvcmRlcjohMCxvcnBoYW5zOiEwLHdpZG93czohMCx6SW5kZXg6ITAsem9vbTohMH0sY3NzUHJvcHM6e1wiZmxvYXRcIjpcImNzc0Zsb2F0XCJ9LHN0eWxlOmZ1bmN0aW9uKGEsYixjLGQpe2lmKGEmJjMhPT1hLm5vZGVUeXBlJiY4IT09YS5ub2RlVHlwZSYmYS5zdHlsZSl7dmFyIGUsZixnLGg9ci5jYW1lbENhc2UoYiksaT1hLnN0eWxlO3JldHVybiBiPXIuY3NzUHJvcHNbaF18fChyLmNzc1Byb3BzW2hdPVRhKGgpfHxoKSxnPXIuY3NzSG9va3NbYl18fHIuY3NzSG9va3NbaF0sdm9pZCAwPT09Yz9nJiZcImdldFwiaW4gZyYmdm9pZCAwIT09KGU9Zy5nZXQoYSwhMSxkKSk/ZTppW2JdOihmPXR5cGVvZiBjLFwic3RyaW5nXCI9PT1mJiYoZT1fLmV4ZWMoYykpJiZlWzFdJiYoYz1kYShhLGIsZSksZj1cIm51bWJlclwiKSxudWxsIT1jJiZjPT09YyYmKFwibnVtYmVyXCI9PT1mJiYoYys9ZSYmZVszXXx8KHIuY3NzTnVtYmVyW2hdP1wiXCI6XCJweFwiKSksby5jbGVhckNsb25lU3R5bGV8fFwiXCIhPT1jfHwwIT09Yi5pbmRleE9mKFwiYmFja2dyb3VuZFwiKXx8KGlbYl09XCJpbmhlcml0XCIpLGcmJlwic2V0XCJpbiBnJiZ2b2lkIDA9PT0oYz1nLnNldChhLGMsZCkpfHwoaVtiXT1jKSksdm9pZCAwKX19LGNzczpmdW5jdGlvbihhLGIsYyxkKXt2YXIgZSxmLGcsaD1yLmNhbWVsQ2FzZShiKTtyZXR1cm4gYj1yLmNzc1Byb3BzW2hdfHwoci5jc3NQcm9wc1toXT1UYShoKXx8aCksZz1yLmNzc0hvb2tzW2JdfHxyLmNzc0hvb2tzW2hdLGcmJlwiZ2V0XCJpbiBnJiYoZT1nLmdldChhLCEwLGMpKSx2b2lkIDA9PT1lJiYoZT1NYShhLGIsZCkpLFwibm9ybWFsXCI9PT1lJiZiIGluIFFhJiYoZT1RYVtiXSksXCJcIj09PWN8fGM/KGY9cGFyc2VGbG9hdChlKSxjPT09ITB8fGlzRmluaXRlKGYpP2Z8fDA6ZSk6ZX19KSxyLmVhY2goW1wiaGVpZ2h0XCIsXCJ3aWR0aFwiXSxmdW5jdGlvbihhLGIpe3IuY3NzSG9va3NbYl09e2dldDpmdW5jdGlvbihhLGMsZCl7aWYoYylyZXR1cm4hT2EudGVzdChyLmNzcyhhLFwiZGlzcGxheVwiKSl8fGEuZ2V0Q2xpZW50UmVjdHMoKS5sZW5ndGgmJmEuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg/V2EoYSxiLGQpOmNhKGEsUGEsZnVuY3Rpb24oKXtyZXR1cm4gV2EoYSxiLGQpfSl9LHNldDpmdW5jdGlvbihhLGMsZCl7dmFyIGUsZj1kJiZMYShhKSxnPWQmJlZhKGEsYixkLFwiYm9yZGVyLWJveFwiPT09ci5jc3MoYSxcImJveFNpemluZ1wiLCExLGYpLGYpO3JldHVybiBnJiYoZT1fLmV4ZWMoYykpJiZcInB4XCIhPT0oZVszXXx8XCJweFwiKSYmKGEuc3R5bGVbYl09YyxjPXIuY3NzKGEsYikpLFVhKGEsYyxnKX19fSksci5jc3NIb29rcy5tYXJnaW5MZWZ0PU5hKG8ucmVsaWFibGVNYXJnaW5MZWZ0LGZ1bmN0aW9uKGEsYil7aWYoYilyZXR1cm4ocGFyc2VGbG9hdChNYShhLFwibWFyZ2luTGVmdFwiKSl8fGEuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdC1jYShhLHttYXJnaW5MZWZ0OjB9LGZ1bmN0aW9uKCl7cmV0dXJuIGEuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdH0pKStcInB4XCJ9KSxyLmVhY2goe21hcmdpbjpcIlwiLHBhZGRpbmc6XCJcIixib3JkZXI6XCJXaWR0aFwifSxmdW5jdGlvbihhLGIpe3IuY3NzSG9va3NbYStiXT17ZXhwYW5kOmZ1bmN0aW9uKGMpe2Zvcih2YXIgZD0wLGU9e30sZj1cInN0cmluZ1wiPT10eXBlb2YgYz9jLnNwbGl0KFwiIFwiKTpbY107ZDw0O2QrKyllW2ErYWFbZF0rYl09ZltkXXx8ZltkLTJdfHxmWzBdO3JldHVybiBlfX0sSmEudGVzdChhKXx8KHIuY3NzSG9va3NbYStiXS5zZXQ9VWEpfSksci5mbi5leHRlbmQoe2NzczpmdW5jdGlvbihhLGIpe3JldHVybiBTKHRoaXMsZnVuY3Rpb24oYSxiLGMpe3ZhciBkLGUsZj17fSxnPTA7aWYoci5pc0FycmF5KGIpKXtmb3IoZD1MYShhKSxlPWIubGVuZ3RoO2c8ZTtnKyspZltiW2ddXT1yLmNzcyhhLGJbZ10sITEsZCk7cmV0dXJuIGZ9cmV0dXJuIHZvaWQgMCE9PWM/ci5zdHlsZShhLGIsYyk6ci5jc3MoYSxiKX0sYSxiLGFyZ3VtZW50cy5sZW5ndGg+MSl9fSk7ZnVuY3Rpb24gWGEoYSxiLGMsZCxlKXtyZXR1cm4gbmV3IFhhLnByb3RvdHlwZS5pbml0KGEsYixjLGQsZSl9ci5Ud2Vlbj1YYSxYYS5wcm90b3R5cGU9e2NvbnN0cnVjdG9yOlhhLGluaXQ6ZnVuY3Rpb24oYSxiLGMsZCxlLGYpe3RoaXMuZWxlbT1hLHRoaXMucHJvcD1jLHRoaXMuZWFzaW5nPWV8fHIuZWFzaW5nLl9kZWZhdWx0LHRoaXMub3B0aW9ucz1iLHRoaXMuc3RhcnQ9dGhpcy5ub3c9dGhpcy5jdXIoKSx0aGlzLmVuZD1kLHRoaXMudW5pdD1mfHwoci5jc3NOdW1iZXJbY10/XCJcIjpcInB4XCIpfSxjdXI6ZnVuY3Rpb24oKXt2YXIgYT1YYS5wcm9wSG9va3NbdGhpcy5wcm9wXTtyZXR1cm4gYSYmYS5nZXQ/YS5nZXQodGhpcyk6WGEucHJvcEhvb2tzLl9kZWZhdWx0LmdldCh0aGlzKX0scnVuOmZ1bmN0aW9uKGEpe3ZhciBiLGM9WGEucHJvcEhvb2tzW3RoaXMucHJvcF07cmV0dXJuIHRoaXMub3B0aW9ucy5kdXJhdGlvbj90aGlzLnBvcz1iPXIuZWFzaW5nW3RoaXMuZWFzaW5nXShhLHRoaXMub3B0aW9ucy5kdXJhdGlvbiphLDAsMSx0aGlzLm9wdGlvbnMuZHVyYXRpb24pOnRoaXMucG9zPWI9YSx0aGlzLm5vdz0odGhpcy5lbmQtdGhpcy5zdGFydCkqYit0aGlzLnN0YXJ0LHRoaXMub3B0aW9ucy5zdGVwJiZ0aGlzLm9wdGlvbnMuc3RlcC5jYWxsKHRoaXMuZWxlbSx0aGlzLm5vdyx0aGlzKSxjJiZjLnNldD9jLnNldCh0aGlzKTpYYS5wcm9wSG9va3MuX2RlZmF1bHQuc2V0KHRoaXMpLHRoaXN9fSxYYS5wcm90b3R5cGUuaW5pdC5wcm90b3R5cGU9WGEucHJvdG90eXBlLFhhLnByb3BIb29rcz17X2RlZmF1bHQ6e2dldDpmdW5jdGlvbihhKXt2YXIgYjtyZXR1cm4gMSE9PWEuZWxlbS5ub2RlVHlwZXx8bnVsbCE9YS5lbGVtW2EucHJvcF0mJm51bGw9PWEuZWxlbS5zdHlsZVthLnByb3BdP2EuZWxlbVthLnByb3BdOihiPXIuY3NzKGEuZWxlbSxhLnByb3AsXCJcIiksYiYmXCJhdXRvXCIhPT1iP2I6MCl9LHNldDpmdW5jdGlvbihhKXtyLmZ4LnN0ZXBbYS5wcm9wXT9yLmZ4LnN0ZXBbYS5wcm9wXShhKToxIT09YS5lbGVtLm5vZGVUeXBlfHxudWxsPT1hLmVsZW0uc3R5bGVbci5jc3NQcm9wc1thLnByb3BdXSYmIXIuY3NzSG9va3NbYS5wcm9wXT9hLmVsZW1bYS5wcm9wXT1hLm5vdzpyLnN0eWxlKGEuZWxlbSxhLnByb3AsYS5ub3crYS51bml0KX19fSxYYS5wcm9wSG9va3Muc2Nyb2xsVG9wPVhhLnByb3BIb29rcy5zY3JvbGxMZWZ0PXtzZXQ6ZnVuY3Rpb24oYSl7YS5lbGVtLm5vZGVUeXBlJiZhLmVsZW0ucGFyZW50Tm9kZSYmKGEuZWxlbVthLnByb3BdPWEubm93KX19LHIuZWFzaW5nPXtsaW5lYXI6ZnVuY3Rpb24oYSl7cmV0dXJuIGF9LHN3aW5nOmZ1bmN0aW9uKGEpe3JldHVybi41LU1hdGguY29zKGEqTWF0aC5QSSkvMn0sX2RlZmF1bHQ6XCJzd2luZ1wifSxyLmZ4PVhhLnByb3RvdHlwZS5pbml0LHIuZnguc3RlcD17fTt2YXIgWWEsWmEsJGE9L14oPzp0b2dnbGV8c2hvd3xoaWRlKSQvLF9hPS9xdWV1ZUhvb2tzJC87ZnVuY3Rpb24gYWIoKXtaYSYmKGEucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFiKSxyLmZ4LnRpY2soKSl9ZnVuY3Rpb24gYmIoKXtyZXR1cm4gYS5zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7WWE9dm9pZCAwfSksWWE9ci5ub3coKX1mdW5jdGlvbiBjYihhLGIpe3ZhciBjLGQ9MCxlPXtoZWlnaHQ6YX07Zm9yKGI9Yj8xOjA7ZDw0O2QrPTItYiljPWFhW2RdLGVbXCJtYXJnaW5cIitjXT1lW1wicGFkZGluZ1wiK2NdPWE7cmV0dXJuIGImJihlLm9wYWNpdHk9ZS53aWR0aD1hKSxlfWZ1bmN0aW9uIGRiKGEsYixjKXtmb3IodmFyIGQsZT0oZ2IudHdlZW5lcnNbYl18fFtdKS5jb25jYXQoZ2IudHdlZW5lcnNbXCIqXCJdKSxmPTAsZz1lLmxlbmd0aDtmPGc7ZisrKWlmKGQ9ZVtmXS5jYWxsKGMsYixhKSlyZXR1cm4gZH1mdW5jdGlvbiBlYihhLGIsYyl7dmFyIGQsZSxmLGcsaCxpLGosayxsPVwid2lkdGhcImluIGJ8fFwiaGVpZ2h0XCJpbiBiLG09dGhpcyxuPXt9LG89YS5zdHlsZSxwPWEubm9kZVR5cGUmJmJhKGEpLHE9Vi5nZXQoYSxcImZ4c2hvd1wiKTtjLnF1ZXVlfHwoZz1yLl9xdWV1ZUhvb2tzKGEsXCJmeFwiKSxudWxsPT1nLnVucXVldWVkJiYoZy51bnF1ZXVlZD0wLGg9Zy5lbXB0eS5maXJlLGcuZW1wdHkuZmlyZT1mdW5jdGlvbigpe2cudW5xdWV1ZWR8fGgoKX0pLGcudW5xdWV1ZWQrKyxtLmFsd2F5cyhmdW5jdGlvbigpe20uYWx3YXlzKGZ1bmN0aW9uKCl7Zy51bnF1ZXVlZC0tLHIucXVldWUoYSxcImZ4XCIpLmxlbmd0aHx8Zy5lbXB0eS5maXJlKCl9KX0pKTtmb3IoZCBpbiBiKWlmKGU9YltkXSwkYS50ZXN0KGUpKXtpZihkZWxldGUgYltkXSxmPWZ8fFwidG9nZ2xlXCI9PT1lLGU9PT0ocD9cImhpZGVcIjpcInNob3dcIikpe2lmKFwic2hvd1wiIT09ZXx8IXF8fHZvaWQgMD09PXFbZF0pY29udGludWU7cD0hMH1uW2RdPXEmJnFbZF18fHIuc3R5bGUoYSxkKX1pZihpPSFyLmlzRW1wdHlPYmplY3QoYiksaXx8IXIuaXNFbXB0eU9iamVjdChuKSl7bCYmMT09PWEubm9kZVR5cGUmJihjLm92ZXJmbG93PVtvLm92ZXJmbG93LG8ub3ZlcmZsb3dYLG8ub3ZlcmZsb3dZXSxqPXEmJnEuZGlzcGxheSxudWxsPT1qJiYoaj1WLmdldChhLFwiZGlzcGxheVwiKSksaz1yLmNzcyhhLFwiZGlzcGxheVwiKSxcIm5vbmVcIj09PWsmJihqP2s9ajooZ2EoW2FdLCEwKSxqPWEuc3R5bGUuZGlzcGxheXx8aixrPXIuY3NzKGEsXCJkaXNwbGF5XCIpLGdhKFthXSkpKSwoXCJpbmxpbmVcIj09PWt8fFwiaW5saW5lLWJsb2NrXCI9PT1rJiZudWxsIT1qKSYmXCJub25lXCI9PT1yLmNzcyhhLFwiZmxvYXRcIikmJihpfHwobS5kb25lKGZ1bmN0aW9uKCl7by5kaXNwbGF5PWp9KSxudWxsPT1qJiYoaz1vLmRpc3BsYXksaj1cIm5vbmVcIj09PWs/XCJcIjprKSksby5kaXNwbGF5PVwiaW5saW5lLWJsb2NrXCIpKSxjLm92ZXJmbG93JiYoby5vdmVyZmxvdz1cImhpZGRlblwiLG0uYWx3YXlzKGZ1bmN0aW9uKCl7by5vdmVyZmxvdz1jLm92ZXJmbG93WzBdLG8ub3ZlcmZsb3dYPWMub3ZlcmZsb3dbMV0sby5vdmVyZmxvd1k9Yy5vdmVyZmxvd1syXX0pKSxpPSExO2ZvcihkIGluIG4paXx8KHE/XCJoaWRkZW5cImluIHEmJihwPXEuaGlkZGVuKTpxPVYuYWNjZXNzKGEsXCJmeHNob3dcIix7ZGlzcGxheTpqfSksZiYmKHEuaGlkZGVuPSFwKSxwJiZnYShbYV0sITApLG0uZG9uZShmdW5jdGlvbigpe3B8fGdhKFthXSksVi5yZW1vdmUoYSxcImZ4c2hvd1wiKTtmb3IoZCBpbiBuKXIuc3R5bGUoYSxkLG5bZF0pfSkpLGk9ZGIocD9xW2RdOjAsZCxtKSxkIGluIHF8fChxW2RdPWkuc3RhcnQscCYmKGkuZW5kPWkuc3RhcnQsaS5zdGFydD0wKSl9fWZ1bmN0aW9uIGZiKGEsYil7dmFyIGMsZCxlLGYsZztmb3IoYyBpbiBhKWlmKGQ9ci5jYW1lbENhc2UoYyksZT1iW2RdLGY9YVtjXSxyLmlzQXJyYXkoZikmJihlPWZbMV0sZj1hW2NdPWZbMF0pLGMhPT1kJiYoYVtkXT1mLGRlbGV0ZSBhW2NdKSxnPXIuY3NzSG9va3NbZF0sZyYmXCJleHBhbmRcImluIGcpe2Y9Zy5leHBhbmQoZiksZGVsZXRlIGFbZF07Zm9yKGMgaW4gZiljIGluIGF8fChhW2NdPWZbY10sYltjXT1lKX1lbHNlIGJbZF09ZX1mdW5jdGlvbiBnYihhLGIsYyl7dmFyIGQsZSxmPTAsZz1nYi5wcmVmaWx0ZXJzLmxlbmd0aCxoPXIuRGVmZXJyZWQoKS5hbHdheXMoZnVuY3Rpb24oKXtkZWxldGUgaS5lbGVtfSksaT1mdW5jdGlvbigpe2lmKGUpcmV0dXJuITE7Zm9yKHZhciBiPVlhfHxiYigpLGM9TWF0aC5tYXgoMCxqLnN0YXJ0VGltZStqLmR1cmF0aW9uLWIpLGQ9Yy9qLmR1cmF0aW9ufHwwLGY9MS1kLGc9MCxpPWoudHdlZW5zLmxlbmd0aDtnPGk7ZysrKWoudHdlZW5zW2ddLnJ1bihmKTtyZXR1cm4gaC5ub3RpZnlXaXRoKGEsW2osZixjXSksZjwxJiZpP2M6KGgucmVzb2x2ZVdpdGgoYSxbal0pLCExKX0saj1oLnByb21pc2Uoe2VsZW06YSxwcm9wczpyLmV4dGVuZCh7fSxiKSxvcHRzOnIuZXh0ZW5kKCEwLHtzcGVjaWFsRWFzaW5nOnt9LGVhc2luZzpyLmVhc2luZy5fZGVmYXVsdH0sYyksb3JpZ2luYWxQcm9wZXJ0aWVzOmIsb3JpZ2luYWxPcHRpb25zOmMsc3RhcnRUaW1lOllhfHxiYigpLGR1cmF0aW9uOmMuZHVyYXRpb24sdHdlZW5zOltdLGNyZWF0ZVR3ZWVuOmZ1bmN0aW9uKGIsYyl7dmFyIGQ9ci5Ud2VlbihhLGoub3B0cyxiLGMsai5vcHRzLnNwZWNpYWxFYXNpbmdbYl18fGoub3B0cy5lYXNpbmcpO3JldHVybiBqLnR3ZWVucy5wdXNoKGQpLGR9LHN0b3A6ZnVuY3Rpb24oYil7dmFyIGM9MCxkPWI/ai50d2VlbnMubGVuZ3RoOjA7aWYoZSlyZXR1cm4gdGhpcztmb3IoZT0hMDtjPGQ7YysrKWoudHdlZW5zW2NdLnJ1bigxKTtyZXR1cm4gYj8oaC5ub3RpZnlXaXRoKGEsW2osMSwwXSksaC5yZXNvbHZlV2l0aChhLFtqLGJdKSk6aC5yZWplY3RXaXRoKGEsW2osYl0pLHRoaXN9fSksaz1qLnByb3BzO2ZvcihmYihrLGoub3B0cy5zcGVjaWFsRWFzaW5nKTtmPGc7ZisrKWlmKGQ9Z2IucHJlZmlsdGVyc1tmXS5jYWxsKGosYSxrLGoub3B0cykpcmV0dXJuIHIuaXNGdW5jdGlvbihkLnN0b3ApJiYoci5fcXVldWVIb29rcyhqLmVsZW0sai5vcHRzLnF1ZXVlKS5zdG9wPXIucHJveHkoZC5zdG9wLGQpKSxkO3JldHVybiByLm1hcChrLGRiLGopLHIuaXNGdW5jdGlvbihqLm9wdHMuc3RhcnQpJiZqLm9wdHMuc3RhcnQuY2FsbChhLGopLHIuZngudGltZXIoci5leHRlbmQoaSx7ZWxlbTphLGFuaW06aixxdWV1ZTpqLm9wdHMucXVldWV9KSksai5wcm9ncmVzcyhqLm9wdHMucHJvZ3Jlc3MpLmRvbmUoai5vcHRzLmRvbmUsai5vcHRzLmNvbXBsZXRlKS5mYWlsKGoub3B0cy5mYWlsKS5hbHdheXMoai5vcHRzLmFsd2F5cyl9ci5BbmltYXRpb249ci5leHRlbmQoZ2Ise3R3ZWVuZXJzOntcIipcIjpbZnVuY3Rpb24oYSxiKXt2YXIgYz10aGlzLmNyZWF0ZVR3ZWVuKGEsYik7cmV0dXJuIGRhKGMuZWxlbSxhLF8uZXhlYyhiKSxjKSxjfV19LHR3ZWVuZXI6ZnVuY3Rpb24oYSxiKXtyLmlzRnVuY3Rpb24oYSk/KGI9YSxhPVtcIipcIl0pOmE9YS5tYXRjaChLKTtmb3IodmFyIGMsZD0wLGU9YS5sZW5ndGg7ZDxlO2QrKyljPWFbZF0sZ2IudHdlZW5lcnNbY109Z2IudHdlZW5lcnNbY118fFtdLGdiLnR3ZWVuZXJzW2NdLnVuc2hpZnQoYil9LHByZWZpbHRlcnM6W2ViXSxwcmVmaWx0ZXI6ZnVuY3Rpb24oYSxiKXtiP2diLnByZWZpbHRlcnMudW5zaGlmdChhKTpnYi5wcmVmaWx0ZXJzLnB1c2goYSl9fSksci5zcGVlZD1mdW5jdGlvbihhLGIsYyl7dmFyIGU9YSYmXCJvYmplY3RcIj09dHlwZW9mIGE/ci5leHRlbmQoe30sYSk6e2NvbXBsZXRlOmN8fCFjJiZifHxyLmlzRnVuY3Rpb24oYSkmJmEsZHVyYXRpb246YSxlYXNpbmc6YyYmYnx8YiYmIXIuaXNGdW5jdGlvbihiKSYmYn07cmV0dXJuIHIuZngub2ZmfHxkLmhpZGRlbj9lLmR1cmF0aW9uPTA6ZS5kdXJhdGlvbj1cIm51bWJlclwiPT10eXBlb2YgZS5kdXJhdGlvbj9lLmR1cmF0aW9uOmUuZHVyYXRpb24gaW4gci5meC5zcGVlZHM/ci5meC5zcGVlZHNbZS5kdXJhdGlvbl06ci5meC5zcGVlZHMuX2RlZmF1bHQsbnVsbCE9ZS5xdWV1ZSYmZS5xdWV1ZSE9PSEwfHwoZS5xdWV1ZT1cImZ4XCIpLGUub2xkPWUuY29tcGxldGUsZS5jb21wbGV0ZT1mdW5jdGlvbigpe3IuaXNGdW5jdGlvbihlLm9sZCkmJmUub2xkLmNhbGwodGhpcyksZS5xdWV1ZSYmci5kZXF1ZXVlKHRoaXMsZS5xdWV1ZSl9LGV9LHIuZm4uZXh0ZW5kKHtmYWRlVG86ZnVuY3Rpb24oYSxiLGMsZCl7cmV0dXJuIHRoaXMuZmlsdGVyKGJhKS5jc3MoXCJvcGFjaXR5XCIsMCkuc2hvdygpLmVuZCgpLmFuaW1hdGUoe29wYWNpdHk6Yn0sYSxjLGQpfSxhbmltYXRlOmZ1bmN0aW9uKGEsYixjLGQpe3ZhciBlPXIuaXNFbXB0eU9iamVjdChhKSxmPXIuc3BlZWQoYixjLGQpLGc9ZnVuY3Rpb24oKXt2YXIgYj1nYih0aGlzLHIuZXh0ZW5kKHt9LGEpLGYpOyhlfHxWLmdldCh0aGlzLFwiZmluaXNoXCIpKSYmYi5zdG9wKCEwKX07cmV0dXJuIGcuZmluaXNoPWcsZXx8Zi5xdWV1ZT09PSExP3RoaXMuZWFjaChnKTp0aGlzLnF1ZXVlKGYucXVldWUsZyl9LHN0b3A6ZnVuY3Rpb24oYSxiLGMpe3ZhciBkPWZ1bmN0aW9uKGEpe3ZhciBiPWEuc3RvcDtkZWxldGUgYS5zdG9wLGIoYyl9O3JldHVyblwic3RyaW5nXCIhPXR5cGVvZiBhJiYoYz1iLGI9YSxhPXZvaWQgMCksYiYmYSE9PSExJiZ0aGlzLnF1ZXVlKGF8fFwiZnhcIixbXSksdGhpcy5lYWNoKGZ1bmN0aW9uKCl7dmFyIGI9ITAsZT1udWxsIT1hJiZhK1wicXVldWVIb29rc1wiLGY9ci50aW1lcnMsZz1WLmdldCh0aGlzKTtpZihlKWdbZV0mJmdbZV0uc3RvcCYmZChnW2VdKTtlbHNlIGZvcihlIGluIGcpZ1tlXSYmZ1tlXS5zdG9wJiZfYS50ZXN0KGUpJiZkKGdbZV0pO2ZvcihlPWYubGVuZ3RoO2UtLTspZltlXS5lbGVtIT09dGhpc3x8bnVsbCE9YSYmZltlXS5xdWV1ZSE9PWF8fChmW2VdLmFuaW0uc3RvcChjKSxiPSExLGYuc3BsaWNlKGUsMSkpOyFiJiZjfHxyLmRlcXVldWUodGhpcyxhKX0pfSxmaW5pc2g6ZnVuY3Rpb24oYSl7cmV0dXJuIGEhPT0hMSYmKGE9YXx8XCJmeFwiKSx0aGlzLmVhY2goZnVuY3Rpb24oKXt2YXIgYixjPVYuZ2V0KHRoaXMpLGQ9Y1thK1wicXVldWVcIl0sZT1jW2ErXCJxdWV1ZUhvb2tzXCJdLGY9ci50aW1lcnMsZz1kP2QubGVuZ3RoOjA7Zm9yKGMuZmluaXNoPSEwLHIucXVldWUodGhpcyxhLFtdKSxlJiZlLnN0b3AmJmUuc3RvcC5jYWxsKHRoaXMsITApLGI9Zi5sZW5ndGg7Yi0tOylmW2JdLmVsZW09PT10aGlzJiZmW2JdLnF1ZXVlPT09YSYmKGZbYl0uYW5pbS5zdG9wKCEwKSxmLnNwbGljZShiLDEpKTtmb3IoYj0wO2I8ZztiKyspZFtiXSYmZFtiXS5maW5pc2gmJmRbYl0uZmluaXNoLmNhbGwodGhpcyk7ZGVsZXRlIGMuZmluaXNofSl9fSksci5lYWNoKFtcInRvZ2dsZVwiLFwic2hvd1wiLFwiaGlkZVwiXSxmdW5jdGlvbihhLGIpe3ZhciBjPXIuZm5bYl07ci5mbltiXT1mdW5jdGlvbihhLGQsZSl7cmV0dXJuIG51bGw9PWF8fFwiYm9vbGVhblwiPT10eXBlb2YgYT9jLmFwcGx5KHRoaXMsYXJndW1lbnRzKTp0aGlzLmFuaW1hdGUoY2IoYiwhMCksYSxkLGUpfX0pLHIuZWFjaCh7c2xpZGVEb3duOmNiKFwic2hvd1wiKSxzbGlkZVVwOmNiKFwiaGlkZVwiKSxzbGlkZVRvZ2dsZTpjYihcInRvZ2dsZVwiKSxmYWRlSW46e29wYWNpdHk6XCJzaG93XCJ9LGZhZGVPdXQ6e29wYWNpdHk6XCJoaWRlXCJ9LGZhZGVUb2dnbGU6e29wYWNpdHk6XCJ0b2dnbGVcIn19LGZ1bmN0aW9uKGEsYil7ci5mblthXT1mdW5jdGlvbihhLGMsZCl7cmV0dXJuIHRoaXMuYW5pbWF0ZShiLGEsYyxkKX19KSxyLnRpbWVycz1bXSxyLmZ4LnRpY2s9ZnVuY3Rpb24oKXt2YXIgYSxiPTAsYz1yLnRpbWVycztmb3IoWWE9ci5ub3coKTtiPGMubGVuZ3RoO2IrKylhPWNbYl0sYSgpfHxjW2JdIT09YXx8Yy5zcGxpY2UoYi0tLDEpO2MubGVuZ3RofHxyLmZ4LnN0b3AoKSxZYT12b2lkIDB9LHIuZngudGltZXI9ZnVuY3Rpb24oYSl7ci50aW1lcnMucHVzaChhKSxhKCk/ci5meC5zdGFydCgpOnIudGltZXJzLnBvcCgpfSxyLmZ4LmludGVydmFsPTEzLHIuZnguc3RhcnQ9ZnVuY3Rpb24oKXtaYXx8KFphPWEucmVxdWVzdEFuaW1hdGlvbkZyYW1lP2EucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFiKTphLnNldEludGVydmFsKHIuZngudGljayxyLmZ4LmludGVydmFsKSl9LHIuZnguc3RvcD1mdW5jdGlvbigpe2EuY2FuY2VsQW5pbWF0aW9uRnJhbWU/YS5jYW5jZWxBbmltYXRpb25GcmFtZShaYSk6YS5jbGVhckludGVydmFsKFphKSxaYT1udWxsfSxyLmZ4LnNwZWVkcz17c2xvdzo2MDAsZmFzdDoyMDAsX2RlZmF1bHQ6NDAwfSxyLmZuLmRlbGF5PWZ1bmN0aW9uKGIsYyl7cmV0dXJuIGI9ci5meD9yLmZ4LnNwZWVkc1tiXXx8YjpiLGM9Y3x8XCJmeFwiLHRoaXMucXVldWUoYyxmdW5jdGlvbihjLGQpe3ZhciBlPWEuc2V0VGltZW91dChjLGIpO2Quc3RvcD1mdW5jdGlvbigpe2EuY2xlYXJUaW1lb3V0KGUpfX0pfSxmdW5jdGlvbigpe3ZhciBhPWQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpLGI9ZC5jcmVhdGVFbGVtZW50KFwic2VsZWN0XCIpLGM9Yi5hcHBlbmRDaGlsZChkLmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIikpO2EudHlwZT1cImNoZWNrYm94XCIsby5jaGVja09uPVwiXCIhPT1hLnZhbHVlLG8ub3B0U2VsZWN0ZWQ9Yy5zZWxlY3RlZCxhPWQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpLGEudmFsdWU9XCJ0XCIsYS50eXBlPVwicmFkaW9cIixvLnJhZGlvVmFsdWU9XCJ0XCI9PT1hLnZhbHVlfSgpO3ZhciBoYixpYj1yLmV4cHIuYXR0ckhhbmRsZTtyLmZuLmV4dGVuZCh7YXR0cjpmdW5jdGlvbihhLGIpe3JldHVybiBTKHRoaXMsci5hdHRyLGEsYixhcmd1bWVudHMubGVuZ3RoPjEpfSxyZW1vdmVBdHRyOmZ1bmN0aW9uKGEpe3JldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKXtyLnJlbW92ZUF0dHIodGhpcyxhKX0pfX0pLHIuZXh0ZW5kKHthdHRyOmZ1bmN0aW9uKGEsYixjKXt2YXIgZCxlLGY9YS5ub2RlVHlwZTtpZigzIT09ZiYmOCE9PWYmJjIhPT1mKXJldHVyblwidW5kZWZpbmVkXCI9PXR5cGVvZiBhLmdldEF0dHJpYnV0ZT9yLnByb3AoYSxiLGMpOigxPT09ZiYmci5pc1hNTERvYyhhKXx8KGU9ci5hdHRySG9va3NbYi50b0xvd2VyQ2FzZSgpXXx8KHIuZXhwci5tYXRjaC5ib29sLnRlc3QoYik/aGI6dm9pZCAwKSksdm9pZCAwIT09Yz9udWxsPT09Yz92b2lkIHIucmVtb3ZlQXR0cihhLGIpOmUmJlwic2V0XCJpbiBlJiZ2b2lkIDAhPT0oZD1lLnNldChhLGMsYikpP2Q6KGEuc2V0QXR0cmlidXRlKGIsYytcIlwiKSxjKTplJiZcImdldFwiaW4gZSYmbnVsbCE9PShkPWUuZ2V0KGEsYikpP2Q6KGQ9ci5maW5kLmF0dHIoYSxiKSxudWxsPT1kP3ZvaWQgMDpkKSl9LGF0dHJIb29rczp7dHlwZTp7c2V0OmZ1bmN0aW9uKGEsYil7aWYoIW8ucmFkaW9WYWx1ZSYmXCJyYWRpb1wiPT09YiYmci5ub2RlTmFtZShhLFwiaW5wdXRcIikpe3ZhciBjPWEudmFsdWU7cmV0dXJuIGEuc2V0QXR0cmlidXRlKFwidHlwZVwiLGIpLGMmJihhLnZhbHVlPWMpLGJ9fX19LHJlbW92ZUF0dHI6ZnVuY3Rpb24oYSxiKXt2YXIgYyxkPTAsZT1iJiZiLm1hdGNoKEspO1xuaWYoZSYmMT09PWEubm9kZVR5cGUpd2hpbGUoYz1lW2QrK10pYS5yZW1vdmVBdHRyaWJ1dGUoYyl9fSksaGI9e3NldDpmdW5jdGlvbihhLGIsYyl7cmV0dXJuIGI9PT0hMT9yLnJlbW92ZUF0dHIoYSxjKTphLnNldEF0dHJpYnV0ZShjLGMpLGN9fSxyLmVhY2goci5leHByLm1hdGNoLmJvb2wuc291cmNlLm1hdGNoKC9cXHcrL2cpLGZ1bmN0aW9uKGEsYil7dmFyIGM9aWJbYl18fHIuZmluZC5hdHRyO2liW2JdPWZ1bmN0aW9uKGEsYixkKXt2YXIgZSxmLGc9Yi50b0xvd2VyQ2FzZSgpO3JldHVybiBkfHwoZj1pYltnXSxpYltnXT1lLGU9bnVsbCE9YyhhLGIsZCk/ZzpudWxsLGliW2ddPWYpLGV9fSk7dmFyIGpiPS9eKD86aW5wdXR8c2VsZWN0fHRleHRhcmVhfGJ1dHRvbikkL2ksa2I9L14oPzphfGFyZWEpJC9pO3IuZm4uZXh0ZW5kKHtwcm9wOmZ1bmN0aW9uKGEsYil7cmV0dXJuIFModGhpcyxyLnByb3AsYSxiLGFyZ3VtZW50cy5sZW5ndGg+MSl9LHJlbW92ZVByb3A6ZnVuY3Rpb24oYSl7cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpe2RlbGV0ZSB0aGlzW3IucHJvcEZpeFthXXx8YV19KX19KSxyLmV4dGVuZCh7cHJvcDpmdW5jdGlvbihhLGIsYyl7dmFyIGQsZSxmPWEubm9kZVR5cGU7aWYoMyE9PWYmJjghPT1mJiYyIT09ZilyZXR1cm4gMT09PWYmJnIuaXNYTUxEb2MoYSl8fChiPXIucHJvcEZpeFtiXXx8YixlPXIucHJvcEhvb2tzW2JdKSx2b2lkIDAhPT1jP2UmJlwic2V0XCJpbiBlJiZ2b2lkIDAhPT0oZD1lLnNldChhLGMsYikpP2Q6YVtiXT1jOmUmJlwiZ2V0XCJpbiBlJiZudWxsIT09KGQ9ZS5nZXQoYSxiKSk/ZDphW2JdfSxwcm9wSG9va3M6e3RhYkluZGV4OntnZXQ6ZnVuY3Rpb24oYSl7dmFyIGI9ci5maW5kLmF0dHIoYSxcInRhYmluZGV4XCIpO3JldHVybiBiP3BhcnNlSW50KGIsMTApOmpiLnRlc3QoYS5ub2RlTmFtZSl8fGtiLnRlc3QoYS5ub2RlTmFtZSkmJmEuaHJlZj8wOi0xfX19LHByb3BGaXg6e1wiZm9yXCI6XCJodG1sRm9yXCIsXCJjbGFzc1wiOlwiY2xhc3NOYW1lXCJ9fSksby5vcHRTZWxlY3RlZHx8KHIucHJvcEhvb2tzLnNlbGVjdGVkPXtnZXQ6ZnVuY3Rpb24oYSl7dmFyIGI9YS5wYXJlbnROb2RlO3JldHVybiBiJiZiLnBhcmVudE5vZGUmJmIucGFyZW50Tm9kZS5zZWxlY3RlZEluZGV4LG51bGx9LHNldDpmdW5jdGlvbihhKXt2YXIgYj1hLnBhcmVudE5vZGU7YiYmKGIuc2VsZWN0ZWRJbmRleCxiLnBhcmVudE5vZGUmJmIucGFyZW50Tm9kZS5zZWxlY3RlZEluZGV4KX19KSxyLmVhY2goW1widGFiSW5kZXhcIixcInJlYWRPbmx5XCIsXCJtYXhMZW5ndGhcIixcImNlbGxTcGFjaW5nXCIsXCJjZWxsUGFkZGluZ1wiLFwicm93U3BhblwiLFwiY29sU3BhblwiLFwidXNlTWFwXCIsXCJmcmFtZUJvcmRlclwiLFwiY29udGVudEVkaXRhYmxlXCJdLGZ1bmN0aW9uKCl7ci5wcm9wRml4W3RoaXMudG9Mb3dlckNhc2UoKV09dGhpc30pO3ZhciBsYj0vW1xcdFxcclxcblxcZl0vZztmdW5jdGlvbiBtYihhKXtyZXR1cm4gYS5nZXRBdHRyaWJ1dGUmJmEuZ2V0QXR0cmlidXRlKFwiY2xhc3NcIil8fFwiXCJ9ci5mbi5leHRlbmQoe2FkZENsYXNzOmZ1bmN0aW9uKGEpe3ZhciBiLGMsZCxlLGYsZyxoLGk9MDtpZihyLmlzRnVuY3Rpb24oYSkpcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbihiKXtyKHRoaXMpLmFkZENsYXNzKGEuY2FsbCh0aGlzLGIsbWIodGhpcykpKX0pO2lmKFwic3RyaW5nXCI9PXR5cGVvZiBhJiZhKXtiPWEubWF0Y2goSyl8fFtdO3doaWxlKGM9dGhpc1tpKytdKWlmKGU9bWIoYyksZD0xPT09Yy5ub2RlVHlwZSYmKFwiIFwiK2UrXCIgXCIpLnJlcGxhY2UobGIsXCIgXCIpKXtnPTA7d2hpbGUoZj1iW2crK10pZC5pbmRleE9mKFwiIFwiK2YrXCIgXCIpPDAmJihkKz1mK1wiIFwiKTtoPXIudHJpbShkKSxlIT09aCYmYy5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLGgpfX1yZXR1cm4gdGhpc30scmVtb3ZlQ2xhc3M6ZnVuY3Rpb24oYSl7dmFyIGIsYyxkLGUsZixnLGgsaT0wO2lmKHIuaXNGdW5jdGlvbihhKSlyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKGIpe3IodGhpcykucmVtb3ZlQ2xhc3MoYS5jYWxsKHRoaXMsYixtYih0aGlzKSkpfSk7aWYoIWFyZ3VtZW50cy5sZW5ndGgpcmV0dXJuIHRoaXMuYXR0cihcImNsYXNzXCIsXCJcIik7aWYoXCJzdHJpbmdcIj09dHlwZW9mIGEmJmEpe2I9YS5tYXRjaChLKXx8W107d2hpbGUoYz10aGlzW2krK10paWYoZT1tYihjKSxkPTE9PT1jLm5vZGVUeXBlJiYoXCIgXCIrZStcIiBcIikucmVwbGFjZShsYixcIiBcIikpe2c9MDt3aGlsZShmPWJbZysrXSl3aGlsZShkLmluZGV4T2YoXCIgXCIrZitcIiBcIik+LTEpZD1kLnJlcGxhY2UoXCIgXCIrZitcIiBcIixcIiBcIik7aD1yLnRyaW0oZCksZSE9PWgmJmMuc2V0QXR0cmlidXRlKFwiY2xhc3NcIixoKX19cmV0dXJuIHRoaXN9LHRvZ2dsZUNsYXNzOmZ1bmN0aW9uKGEsYil7dmFyIGM9dHlwZW9mIGE7cmV0dXJuXCJib29sZWFuXCI9PXR5cGVvZiBiJiZcInN0cmluZ1wiPT09Yz9iP3RoaXMuYWRkQ2xhc3MoYSk6dGhpcy5yZW1vdmVDbGFzcyhhKTpyLmlzRnVuY3Rpb24oYSk/dGhpcy5lYWNoKGZ1bmN0aW9uKGMpe3IodGhpcykudG9nZ2xlQ2xhc3MoYS5jYWxsKHRoaXMsYyxtYih0aGlzKSxiKSxiKX0pOnRoaXMuZWFjaChmdW5jdGlvbigpe3ZhciBiLGQsZSxmO2lmKFwic3RyaW5nXCI9PT1jKXtkPTAsZT1yKHRoaXMpLGY9YS5tYXRjaChLKXx8W107d2hpbGUoYj1mW2QrK10pZS5oYXNDbGFzcyhiKT9lLnJlbW92ZUNsYXNzKGIpOmUuYWRkQ2xhc3MoYil9ZWxzZSB2b2lkIDAhPT1hJiZcImJvb2xlYW5cIiE9PWN8fChiPW1iKHRoaXMpLGImJlYuc2V0KHRoaXMsXCJfX2NsYXNzTmFtZV9fXCIsYiksdGhpcy5zZXRBdHRyaWJ1dGUmJnRoaXMuc2V0QXR0cmlidXRlKFwiY2xhc3NcIixifHxhPT09ITE/XCJcIjpWLmdldCh0aGlzLFwiX19jbGFzc05hbWVfX1wiKXx8XCJcIikpfSl9LGhhc0NsYXNzOmZ1bmN0aW9uKGEpe3ZhciBiLGMsZD0wO2I9XCIgXCIrYStcIiBcIjt3aGlsZShjPXRoaXNbZCsrXSlpZigxPT09Yy5ub2RlVHlwZSYmKFwiIFwiK21iKGMpK1wiIFwiKS5yZXBsYWNlKGxiLFwiIFwiKS5pbmRleE9mKGIpPi0xKXJldHVybiEwO3JldHVybiExfX0pO3ZhciBuYj0vXFxyL2csb2I9L1tcXHgyMFxcdFxcclxcblxcZl0rL2c7ci5mbi5leHRlbmQoe3ZhbDpmdW5jdGlvbihhKXt2YXIgYixjLGQsZT10aGlzWzBdO3tpZihhcmd1bWVudHMubGVuZ3RoKXJldHVybiBkPXIuaXNGdW5jdGlvbihhKSx0aGlzLmVhY2goZnVuY3Rpb24oYyl7dmFyIGU7MT09PXRoaXMubm9kZVR5cGUmJihlPWQ/YS5jYWxsKHRoaXMsYyxyKHRoaXMpLnZhbCgpKTphLG51bGw9PWU/ZT1cIlwiOlwibnVtYmVyXCI9PXR5cGVvZiBlP2UrPVwiXCI6ci5pc0FycmF5KGUpJiYoZT1yLm1hcChlLGZ1bmN0aW9uKGEpe3JldHVybiBudWxsPT1hP1wiXCI6YStcIlwifSkpLGI9ci52YWxIb29rc1t0aGlzLnR5cGVdfHxyLnZhbEhvb2tzW3RoaXMubm9kZU5hbWUudG9Mb3dlckNhc2UoKV0sYiYmXCJzZXRcImluIGImJnZvaWQgMCE9PWIuc2V0KHRoaXMsZSxcInZhbHVlXCIpfHwodGhpcy52YWx1ZT1lKSl9KTtpZihlKXJldHVybiBiPXIudmFsSG9va3NbZS50eXBlXXx8ci52YWxIb29rc1tlLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCldLGImJlwiZ2V0XCJpbiBiJiZ2b2lkIDAhPT0oYz1iLmdldChlLFwidmFsdWVcIikpP2M6KGM9ZS52YWx1ZSxcInN0cmluZ1wiPT10eXBlb2YgYz9jLnJlcGxhY2UobmIsXCJcIik6bnVsbD09Yz9cIlwiOmMpfX19KSxyLmV4dGVuZCh7dmFsSG9va3M6e29wdGlvbjp7Z2V0OmZ1bmN0aW9uKGEpe3ZhciBiPXIuZmluZC5hdHRyKGEsXCJ2YWx1ZVwiKTtyZXR1cm4gbnVsbCE9Yj9iOnIudHJpbShyLnRleHQoYSkpLnJlcGxhY2Uob2IsXCIgXCIpfX0sc2VsZWN0OntnZXQ6ZnVuY3Rpb24oYSl7Zm9yKHZhciBiLGMsZD1hLm9wdGlvbnMsZT1hLnNlbGVjdGVkSW5kZXgsZj1cInNlbGVjdC1vbmVcIj09PWEudHlwZSxnPWY/bnVsbDpbXSxoPWY/ZSsxOmQubGVuZ3RoLGk9ZTwwP2g6Zj9lOjA7aTxoO2krKylpZihjPWRbaV0sKGMuc2VsZWN0ZWR8fGk9PT1lKSYmIWMuZGlzYWJsZWQmJighYy5wYXJlbnROb2RlLmRpc2FibGVkfHwhci5ub2RlTmFtZShjLnBhcmVudE5vZGUsXCJvcHRncm91cFwiKSkpe2lmKGI9cihjKS52YWwoKSxmKXJldHVybiBiO2cucHVzaChiKX1yZXR1cm4gZ30sc2V0OmZ1bmN0aW9uKGEsYil7dmFyIGMsZCxlPWEub3B0aW9ucyxmPXIubWFrZUFycmF5KGIpLGc9ZS5sZW5ndGg7d2hpbGUoZy0tKWQ9ZVtnXSwoZC5zZWxlY3RlZD1yLmluQXJyYXkoci52YWxIb29rcy5vcHRpb24uZ2V0KGQpLGYpPi0xKSYmKGM9ITApO3JldHVybiBjfHwoYS5zZWxlY3RlZEluZGV4PS0xKSxmfX19fSksci5lYWNoKFtcInJhZGlvXCIsXCJjaGVja2JveFwiXSxmdW5jdGlvbigpe3IudmFsSG9va3NbdGhpc109e3NldDpmdW5jdGlvbihhLGIpe2lmKHIuaXNBcnJheShiKSlyZXR1cm4gYS5jaGVja2VkPXIuaW5BcnJheShyKGEpLnZhbCgpLGIpPi0xfX0sby5jaGVja09ufHwoci52YWxIb29rc1t0aGlzXS5nZXQ9ZnVuY3Rpb24oYSl7cmV0dXJuIG51bGw9PT1hLmdldEF0dHJpYnV0ZShcInZhbHVlXCIpP1wib25cIjphLnZhbHVlfSl9KTt2YXIgcGI9L14oPzpmb2N1c2luZm9jdXN8Zm9jdXNvdXRibHVyKSQvO3IuZXh0ZW5kKHIuZXZlbnQse3RyaWdnZXI6ZnVuY3Rpb24oYixjLGUsZil7dmFyIGcsaCxpLGosayxtLG4sbz1bZXx8ZF0scD1sLmNhbGwoYixcInR5cGVcIik/Yi50eXBlOmIscT1sLmNhbGwoYixcIm5hbWVzcGFjZVwiKT9iLm5hbWVzcGFjZS5zcGxpdChcIi5cIik6W107aWYoaD1pPWU9ZXx8ZCwzIT09ZS5ub2RlVHlwZSYmOCE9PWUubm9kZVR5cGUmJiFwYi50ZXN0KHArci5ldmVudC50cmlnZ2VyZWQpJiYocC5pbmRleE9mKFwiLlwiKT4tMSYmKHE9cC5zcGxpdChcIi5cIikscD1xLnNoaWZ0KCkscS5zb3J0KCkpLGs9cC5pbmRleE9mKFwiOlwiKTwwJiZcIm9uXCIrcCxiPWJbci5leHBhbmRvXT9iOm5ldyByLkV2ZW50KHAsXCJvYmplY3RcIj09dHlwZW9mIGImJmIpLGIuaXNUcmlnZ2VyPWY/MjozLGIubmFtZXNwYWNlPXEuam9pbihcIi5cIiksYi5ybmFtZXNwYWNlPWIubmFtZXNwYWNlP25ldyBSZWdFeHAoXCIoXnxcXFxcLilcIitxLmpvaW4oXCJcXFxcLig/Oi4qXFxcXC58KVwiKStcIihcXFxcLnwkKVwiKTpudWxsLGIucmVzdWx0PXZvaWQgMCxiLnRhcmdldHx8KGIudGFyZ2V0PWUpLGM9bnVsbD09Yz9bYl06ci5tYWtlQXJyYXkoYyxbYl0pLG49ci5ldmVudC5zcGVjaWFsW3BdfHx7fSxmfHwhbi50cmlnZ2VyfHxuLnRyaWdnZXIuYXBwbHkoZSxjKSE9PSExKSl7aWYoIWYmJiFuLm5vQnViYmxlJiYhci5pc1dpbmRvdyhlKSl7Zm9yKGo9bi5kZWxlZ2F0ZVR5cGV8fHAscGIudGVzdChqK3ApfHwoaD1oLnBhcmVudE5vZGUpO2g7aD1oLnBhcmVudE5vZGUpby5wdXNoKGgpLGk9aDtpPT09KGUub3duZXJEb2N1bWVudHx8ZCkmJm8ucHVzaChpLmRlZmF1bHRWaWV3fHxpLnBhcmVudFdpbmRvd3x8YSl9Zz0wO3doaWxlKChoPW9bZysrXSkmJiFiLmlzUHJvcGFnYXRpb25TdG9wcGVkKCkpYi50eXBlPWc+MT9qOm4uYmluZFR5cGV8fHAsbT0oVi5nZXQoaCxcImV2ZW50c1wiKXx8e30pW2IudHlwZV0mJlYuZ2V0KGgsXCJoYW5kbGVcIiksbSYmbS5hcHBseShoLGMpLG09ayYmaFtrXSxtJiZtLmFwcGx5JiZUKGgpJiYoYi5yZXN1bHQ9bS5hcHBseShoLGMpLGIucmVzdWx0PT09ITEmJmIucHJldmVudERlZmF1bHQoKSk7cmV0dXJuIGIudHlwZT1wLGZ8fGIuaXNEZWZhdWx0UHJldmVudGVkKCl8fG4uX2RlZmF1bHQmJm4uX2RlZmF1bHQuYXBwbHkoby5wb3AoKSxjKSE9PSExfHwhVChlKXx8ayYmci5pc0Z1bmN0aW9uKGVbcF0pJiYhci5pc1dpbmRvdyhlKSYmKGk9ZVtrXSxpJiYoZVtrXT1udWxsKSxyLmV2ZW50LnRyaWdnZXJlZD1wLGVbcF0oKSxyLmV2ZW50LnRyaWdnZXJlZD12b2lkIDAsaSYmKGVba109aSkpLGIucmVzdWx0fX0sc2ltdWxhdGU6ZnVuY3Rpb24oYSxiLGMpe3ZhciBkPXIuZXh0ZW5kKG5ldyByLkV2ZW50LGMse3R5cGU6YSxpc1NpbXVsYXRlZDohMH0pO3IuZXZlbnQudHJpZ2dlcihkLG51bGwsYil9fSksci5mbi5leHRlbmQoe3RyaWdnZXI6ZnVuY3Rpb24oYSxiKXtyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCl7ci5ldmVudC50cmlnZ2VyKGEsYix0aGlzKX0pfSx0cmlnZ2VySGFuZGxlcjpmdW5jdGlvbihhLGIpe3ZhciBjPXRoaXNbMF07aWYoYylyZXR1cm4gci5ldmVudC50cmlnZ2VyKGEsYixjLCEwKX19KSxyLmVhY2goXCJibHVyIGZvY3VzIGZvY3VzaW4gZm9jdXNvdXQgcmVzaXplIHNjcm9sbCBjbGljayBkYmxjbGljayBtb3VzZWRvd24gbW91c2V1cCBtb3VzZW1vdmUgbW91c2VvdmVyIG1vdXNlb3V0IG1vdXNlZW50ZXIgbW91c2VsZWF2ZSBjaGFuZ2Ugc2VsZWN0IHN1Ym1pdCBrZXlkb3duIGtleXByZXNzIGtleXVwIGNvbnRleHRtZW51XCIuc3BsaXQoXCIgXCIpLGZ1bmN0aW9uKGEsYil7ci5mbltiXT1mdW5jdGlvbihhLGMpe3JldHVybiBhcmd1bWVudHMubGVuZ3RoPjA/dGhpcy5vbihiLG51bGwsYSxjKTp0aGlzLnRyaWdnZXIoYil9fSksci5mbi5leHRlbmQoe2hvdmVyOmZ1bmN0aW9uKGEsYil7cmV0dXJuIHRoaXMubW91c2VlbnRlcihhKS5tb3VzZWxlYXZlKGJ8fGEpfX0pLG8uZm9jdXNpbj1cIm9uZm9jdXNpblwiaW4gYSxvLmZvY3VzaW58fHIuZWFjaCh7Zm9jdXM6XCJmb2N1c2luXCIsYmx1cjpcImZvY3Vzb3V0XCJ9LGZ1bmN0aW9uKGEsYil7dmFyIGM9ZnVuY3Rpb24oYSl7ci5ldmVudC5zaW11bGF0ZShiLGEudGFyZ2V0LHIuZXZlbnQuZml4KGEpKX07ci5ldmVudC5zcGVjaWFsW2JdPXtzZXR1cDpmdW5jdGlvbigpe3ZhciBkPXRoaXMub3duZXJEb2N1bWVudHx8dGhpcyxlPVYuYWNjZXNzKGQsYik7ZXx8ZC5hZGRFdmVudExpc3RlbmVyKGEsYywhMCksVi5hY2Nlc3MoZCxiLChlfHwwKSsxKX0sdGVhcmRvd246ZnVuY3Rpb24oKXt2YXIgZD10aGlzLm93bmVyRG9jdW1lbnR8fHRoaXMsZT1WLmFjY2VzcyhkLGIpLTE7ZT9WLmFjY2VzcyhkLGIsZSk6KGQucmVtb3ZlRXZlbnRMaXN0ZW5lcihhLGMsITApLFYucmVtb3ZlKGQsYikpfX19KTt2YXIgcWI9YS5sb2NhdGlvbixyYj1yLm5vdygpLHNiPS9cXD8vO3IucGFyc2VYTUw9ZnVuY3Rpb24oYil7dmFyIGM7aWYoIWJ8fFwic3RyaW5nXCIhPXR5cGVvZiBiKXJldHVybiBudWxsO3RyeXtjPShuZXcgYS5ET01QYXJzZXIpLnBhcnNlRnJvbVN0cmluZyhiLFwidGV4dC94bWxcIil9Y2F0Y2goZCl7Yz12b2lkIDB9cmV0dXJuIGMmJiFjLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwicGFyc2VyZXJyb3JcIikubGVuZ3RofHxyLmVycm9yKFwiSW52YWxpZCBYTUw6IFwiK2IpLGN9O3ZhciB0Yj0vXFxbXFxdJC8sdWI9L1xccj9cXG4vZyx2Yj0vXig/OnN1Ym1pdHxidXR0b258aW1hZ2V8cmVzZXR8ZmlsZSkkL2ksd2I9L14oPzppbnB1dHxzZWxlY3R8dGV4dGFyZWF8a2V5Z2VuKS9pO2Z1bmN0aW9uIHhiKGEsYixjLGQpe3ZhciBlO2lmKHIuaXNBcnJheShiKSlyLmVhY2goYixmdW5jdGlvbihiLGUpe2N8fHRiLnRlc3QoYSk/ZChhLGUpOnhiKGErXCJbXCIrKFwib2JqZWN0XCI9PXR5cGVvZiBlJiZudWxsIT1lP2I6XCJcIikrXCJdXCIsZSxjLGQpfSk7ZWxzZSBpZihjfHxcIm9iamVjdFwiIT09ci50eXBlKGIpKWQoYSxiKTtlbHNlIGZvcihlIGluIGIpeGIoYStcIltcIitlK1wiXVwiLGJbZV0sYyxkKX1yLnBhcmFtPWZ1bmN0aW9uKGEsYil7dmFyIGMsZD1bXSxlPWZ1bmN0aW9uKGEsYil7dmFyIGM9ci5pc0Z1bmN0aW9uKGIpP2IoKTpiO2RbZC5sZW5ndGhdPWVuY29kZVVSSUNvbXBvbmVudChhKStcIj1cIitlbmNvZGVVUklDb21wb25lbnQobnVsbD09Yz9cIlwiOmMpfTtpZihyLmlzQXJyYXkoYSl8fGEuanF1ZXJ5JiYhci5pc1BsYWluT2JqZWN0KGEpKXIuZWFjaChhLGZ1bmN0aW9uKCl7ZSh0aGlzLm5hbWUsdGhpcy52YWx1ZSl9KTtlbHNlIGZvcihjIGluIGEpeGIoYyxhW2NdLGIsZSk7cmV0dXJuIGQuam9pbihcIiZcIil9LHIuZm4uZXh0ZW5kKHtzZXJpYWxpemU6ZnVuY3Rpb24oKXtyZXR1cm4gci5wYXJhbSh0aGlzLnNlcmlhbGl6ZUFycmF5KCkpfSxzZXJpYWxpemVBcnJheTpmdW5jdGlvbigpe3JldHVybiB0aGlzLm1hcChmdW5jdGlvbigpe3ZhciBhPXIucHJvcCh0aGlzLFwiZWxlbWVudHNcIik7cmV0dXJuIGE/ci5tYWtlQXJyYXkoYSk6dGhpc30pLmZpbHRlcihmdW5jdGlvbigpe3ZhciBhPXRoaXMudHlwZTtyZXR1cm4gdGhpcy5uYW1lJiYhcih0aGlzKS5pcyhcIjpkaXNhYmxlZFwiKSYmd2IudGVzdCh0aGlzLm5vZGVOYW1lKSYmIXZiLnRlc3QoYSkmJih0aGlzLmNoZWNrZWR8fCFoYS50ZXN0KGEpKX0pLm1hcChmdW5jdGlvbihhLGIpe3ZhciBjPXIodGhpcykudmFsKCk7cmV0dXJuIG51bGw9PWM/bnVsbDpyLmlzQXJyYXkoYyk/ci5tYXAoYyxmdW5jdGlvbihhKXtyZXR1cm57bmFtZTpiLm5hbWUsdmFsdWU6YS5yZXBsYWNlKHViLFwiXFxyXFxuXCIpfX0pOntuYW1lOmIubmFtZSx2YWx1ZTpjLnJlcGxhY2UodWIsXCJcXHJcXG5cIil9fSkuZ2V0KCl9fSk7dmFyIHliPS8lMjAvZyx6Yj0vIy4qJC8sQWI9LyhbPyZdKV89W14mXSovLEJiPS9eKC4qPyk6WyBcXHRdKihbXlxcclxcbl0qKSQvZ20sQ2I9L14oPzphYm91dHxhcHB8YXBwLXN0b3JhZ2V8ListZXh0ZW5zaW9ufGZpbGV8cmVzfHdpZGdldCk6JC8sRGI9L14oPzpHRVR8SEVBRCkkLyxFYj0vXlxcL1xcLy8sRmI9e30sR2I9e30sSGI9XCIqL1wiLmNvbmNhdChcIipcIiksSWI9ZC5jcmVhdGVFbGVtZW50KFwiYVwiKTtJYi5ocmVmPXFiLmhyZWY7ZnVuY3Rpb24gSmIoYSl7cmV0dXJuIGZ1bmN0aW9uKGIsYyl7XCJzdHJpbmdcIiE9dHlwZW9mIGImJihjPWIsYj1cIipcIik7dmFyIGQsZT0wLGY9Yi50b0xvd2VyQ2FzZSgpLm1hdGNoKEspfHxbXTtpZihyLmlzRnVuY3Rpb24oYykpd2hpbGUoZD1mW2UrK10pXCIrXCI9PT1kWzBdPyhkPWQuc2xpY2UoMSl8fFwiKlwiLChhW2RdPWFbZF18fFtdKS51bnNoaWZ0KGMpKTooYVtkXT1hW2RdfHxbXSkucHVzaChjKX19ZnVuY3Rpb24gS2IoYSxiLGMsZCl7dmFyIGU9e30sZj1hPT09R2I7ZnVuY3Rpb24gZyhoKXt2YXIgaTtyZXR1cm4gZVtoXT0hMCxyLmVhY2goYVtoXXx8W10sZnVuY3Rpb24oYSxoKXt2YXIgaj1oKGIsYyxkKTtyZXR1cm5cInN0cmluZ1wiIT10eXBlb2Yganx8Znx8ZVtqXT9mPyEoaT1qKTp2b2lkIDA6KGIuZGF0YVR5cGVzLnVuc2hpZnQoaiksZyhqKSwhMSl9KSxpfXJldHVybiBnKGIuZGF0YVR5cGVzWzBdKXx8IWVbXCIqXCJdJiZnKFwiKlwiKX1mdW5jdGlvbiBMYihhLGIpe3ZhciBjLGQsZT1yLmFqYXhTZXR0aW5ncy5mbGF0T3B0aW9uc3x8e307Zm9yKGMgaW4gYil2b2lkIDAhPT1iW2NdJiYoKGVbY10/YTpkfHwoZD17fSkpW2NdPWJbY10pO3JldHVybiBkJiZyLmV4dGVuZCghMCxhLGQpLGF9ZnVuY3Rpb24gTWIoYSxiLGMpe3ZhciBkLGUsZixnLGg9YS5jb250ZW50cyxpPWEuZGF0YVR5cGVzO3doaWxlKFwiKlwiPT09aVswXSlpLnNoaWZ0KCksdm9pZCAwPT09ZCYmKGQ9YS5taW1lVHlwZXx8Yi5nZXRSZXNwb25zZUhlYWRlcihcIkNvbnRlbnQtVHlwZVwiKSk7aWYoZClmb3IoZSBpbiBoKWlmKGhbZV0mJmhbZV0udGVzdChkKSl7aS51bnNoaWZ0KGUpO2JyZWFrfWlmKGlbMF1pbiBjKWY9aVswXTtlbHNle2ZvcihlIGluIGMpe2lmKCFpWzBdfHxhLmNvbnZlcnRlcnNbZStcIiBcIitpWzBdXSl7Zj1lO2JyZWFrfWd8fChnPWUpfWY9Znx8Z31pZihmKXJldHVybiBmIT09aVswXSYmaS51bnNoaWZ0KGYpLGNbZl19ZnVuY3Rpb24gTmIoYSxiLGMsZCl7dmFyIGUsZixnLGgsaSxqPXt9LGs9YS5kYXRhVHlwZXMuc2xpY2UoKTtpZihrWzFdKWZvcihnIGluIGEuY29udmVydGVycylqW2cudG9Mb3dlckNhc2UoKV09YS5jb252ZXJ0ZXJzW2ddO2Y9ay5zaGlmdCgpO3doaWxlKGYpaWYoYS5yZXNwb25zZUZpZWxkc1tmXSYmKGNbYS5yZXNwb25zZUZpZWxkc1tmXV09YiksIWkmJmQmJmEuZGF0YUZpbHRlciYmKGI9YS5kYXRhRmlsdGVyKGIsYS5kYXRhVHlwZSkpLGk9ZixmPWsuc2hpZnQoKSlpZihcIipcIj09PWYpZj1pO2Vsc2UgaWYoXCIqXCIhPT1pJiZpIT09Zil7aWYoZz1qW2krXCIgXCIrZl18fGpbXCIqIFwiK2ZdLCFnKWZvcihlIGluIGopaWYoaD1lLnNwbGl0KFwiIFwiKSxoWzFdPT09ZiYmKGc9altpK1wiIFwiK2hbMF1dfHxqW1wiKiBcIitoWzBdXSkpe2c9PT0hMD9nPWpbZV06altlXSE9PSEwJiYoZj1oWzBdLGsudW5zaGlmdChoWzFdKSk7YnJlYWt9aWYoZyE9PSEwKWlmKGcmJmFbXCJ0aHJvd3NcIl0pYj1nKGIpO2Vsc2UgdHJ5e2I9ZyhiKX1jYXRjaChsKXtyZXR1cm57c3RhdGU6XCJwYXJzZXJlcnJvclwiLGVycm9yOmc/bDpcIk5vIGNvbnZlcnNpb24gZnJvbSBcIitpK1wiIHRvIFwiK2Z9fX1yZXR1cm57c3RhdGU6XCJzdWNjZXNzXCIsZGF0YTpifX1yLmV4dGVuZCh7YWN0aXZlOjAsbGFzdE1vZGlmaWVkOnt9LGV0YWc6e30sYWpheFNldHRpbmdzOnt1cmw6cWIuaHJlZix0eXBlOlwiR0VUXCIsaXNMb2NhbDpDYi50ZXN0KHFiLnByb3RvY29sKSxnbG9iYWw6ITAscHJvY2Vzc0RhdGE6ITAsYXN5bmM6ITAsY29udGVudFR5cGU6XCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7IGNoYXJzZXQ9VVRGLThcIixhY2NlcHRzOntcIipcIjpIYix0ZXh0OlwidGV4dC9wbGFpblwiLGh0bWw6XCJ0ZXh0L2h0bWxcIix4bWw6XCJhcHBsaWNhdGlvbi94bWwsIHRleHQveG1sXCIsanNvbjpcImFwcGxpY2F0aW9uL2pzb24sIHRleHQvamF2YXNjcmlwdFwifSxjb250ZW50czp7eG1sOi9cXGJ4bWxcXGIvLGh0bWw6L1xcYmh0bWwvLGpzb246L1xcYmpzb25cXGIvfSxyZXNwb25zZUZpZWxkczp7eG1sOlwicmVzcG9uc2VYTUxcIix0ZXh0OlwicmVzcG9uc2VUZXh0XCIsanNvbjpcInJlc3BvbnNlSlNPTlwifSxjb252ZXJ0ZXJzOntcIiogdGV4dFwiOlN0cmluZyxcInRleHQgaHRtbFwiOiEwLFwidGV4dCBqc29uXCI6SlNPTi5wYXJzZSxcInRleHQgeG1sXCI6ci5wYXJzZVhNTH0sZmxhdE9wdGlvbnM6e3VybDohMCxjb250ZXh0OiEwfX0sYWpheFNldHVwOmZ1bmN0aW9uKGEsYil7cmV0dXJuIGI/TGIoTGIoYSxyLmFqYXhTZXR0aW5ncyksYik6TGIoci5hamF4U2V0dGluZ3MsYSl9LGFqYXhQcmVmaWx0ZXI6SmIoRmIpLGFqYXhUcmFuc3BvcnQ6SmIoR2IpLGFqYXg6ZnVuY3Rpb24oYixjKXtcIm9iamVjdFwiPT10eXBlb2YgYiYmKGM9YixiPXZvaWQgMCksYz1jfHx7fTt2YXIgZSxmLGcsaCxpLGosayxsLG0sbixvPXIuYWpheFNldHVwKHt9LGMpLHA9by5jb250ZXh0fHxvLHE9by5jb250ZXh0JiYocC5ub2RlVHlwZXx8cC5qcXVlcnkpP3IocCk6ci5ldmVudCxzPXIuRGVmZXJyZWQoKSx0PXIuQ2FsbGJhY2tzKFwib25jZSBtZW1vcnlcIiksdT1vLnN0YXR1c0NvZGV8fHt9LHY9e30sdz17fSx4PVwiY2FuY2VsZWRcIix5PXtyZWFkeVN0YXRlOjAsZ2V0UmVzcG9uc2VIZWFkZXI6ZnVuY3Rpb24oYSl7dmFyIGI7aWYoayl7aWYoIWgpe2g9e307d2hpbGUoYj1CYi5leGVjKGcpKWhbYlsxXS50b0xvd2VyQ2FzZSgpXT1iWzJdfWI9aFthLnRvTG93ZXJDYXNlKCldfXJldHVybiBudWxsPT1iP251bGw6Yn0sZ2V0QWxsUmVzcG9uc2VIZWFkZXJzOmZ1bmN0aW9uKCl7cmV0dXJuIGs/ZzpudWxsfSxzZXRSZXF1ZXN0SGVhZGVyOmZ1bmN0aW9uKGEsYil7cmV0dXJuIG51bGw9PWsmJihhPXdbYS50b0xvd2VyQ2FzZSgpXT13W2EudG9Mb3dlckNhc2UoKV18fGEsdlthXT1iKSx0aGlzfSxvdmVycmlkZU1pbWVUeXBlOmZ1bmN0aW9uKGEpe3JldHVybiBudWxsPT1rJiYoby5taW1lVHlwZT1hKSx0aGlzfSxzdGF0dXNDb2RlOmZ1bmN0aW9uKGEpe3ZhciBiO2lmKGEpaWYoayl5LmFsd2F5cyhhW3kuc3RhdHVzXSk7ZWxzZSBmb3IoYiBpbiBhKXVbYl09W3VbYl0sYVtiXV07cmV0dXJuIHRoaXN9LGFib3J0OmZ1bmN0aW9uKGEpe3ZhciBiPWF8fHg7cmV0dXJuIGUmJmUuYWJvcnQoYiksQSgwLGIpLHRoaXN9fTtpZihzLnByb21pc2UoeSksby51cmw9KChifHxvLnVybHx8cWIuaHJlZikrXCJcIikucmVwbGFjZShFYixxYi5wcm90b2NvbCtcIi8vXCIpLG8udHlwZT1jLm1ldGhvZHx8Yy50eXBlfHxvLm1ldGhvZHx8by50eXBlLG8uZGF0YVR5cGVzPShvLmRhdGFUeXBlfHxcIipcIikudG9Mb3dlckNhc2UoKS5tYXRjaChLKXx8W1wiXCJdLG51bGw9PW8uY3Jvc3NEb21haW4pe2o9ZC5jcmVhdGVFbGVtZW50KFwiYVwiKTt0cnl7ai5ocmVmPW8udXJsLGouaHJlZj1qLmhyZWYsby5jcm9zc0RvbWFpbj1JYi5wcm90b2NvbCtcIi8vXCIrSWIuaG9zdCE9ai5wcm90b2NvbCtcIi8vXCIrai5ob3N0fWNhdGNoKHope28uY3Jvc3NEb21haW49ITB9fWlmKG8uZGF0YSYmby5wcm9jZXNzRGF0YSYmXCJzdHJpbmdcIiE9dHlwZW9mIG8uZGF0YSYmKG8uZGF0YT1yLnBhcmFtKG8uZGF0YSxvLnRyYWRpdGlvbmFsKSksS2IoRmIsbyxjLHkpLGspcmV0dXJuIHk7bD1yLmV2ZW50JiZvLmdsb2JhbCxsJiYwPT09ci5hY3RpdmUrKyYmci5ldmVudC50cmlnZ2VyKFwiYWpheFN0YXJ0XCIpLG8udHlwZT1vLnR5cGUudG9VcHBlckNhc2UoKSxvLmhhc0NvbnRlbnQ9IURiLnRlc3Qoby50eXBlKSxmPW8udXJsLnJlcGxhY2UoemIsXCJcIiksby5oYXNDb250ZW50P28uZGF0YSYmby5wcm9jZXNzRGF0YSYmMD09PShvLmNvbnRlbnRUeXBlfHxcIlwiKS5pbmRleE9mKFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXCIpJiYoby5kYXRhPW8uZGF0YS5yZXBsYWNlKHliLFwiK1wiKSk6KG49by51cmwuc2xpY2UoZi5sZW5ndGgpLG8uZGF0YSYmKGYrPShzYi50ZXN0KGYpP1wiJlwiOlwiP1wiKStvLmRhdGEsZGVsZXRlIG8uZGF0YSksby5jYWNoZT09PSExJiYoZj1mLnJlcGxhY2UoQWIsXCJcIiksbj0oc2IudGVzdChmKT9cIiZcIjpcIj9cIikrXCJfPVwiK3JiKysgK24pLG8udXJsPWYrbiksby5pZk1vZGlmaWVkJiYoci5sYXN0TW9kaWZpZWRbZl0mJnkuc2V0UmVxdWVzdEhlYWRlcihcIklmLU1vZGlmaWVkLVNpbmNlXCIsci5sYXN0TW9kaWZpZWRbZl0pLHIuZXRhZ1tmXSYmeS5zZXRSZXF1ZXN0SGVhZGVyKFwiSWYtTm9uZS1NYXRjaFwiLHIuZXRhZ1tmXSkpLChvLmRhdGEmJm8uaGFzQ29udGVudCYmby5jb250ZW50VHlwZSE9PSExfHxjLmNvbnRlbnRUeXBlKSYmeS5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudC1UeXBlXCIsby5jb250ZW50VHlwZSkseS5zZXRSZXF1ZXN0SGVhZGVyKFwiQWNjZXB0XCIsby5kYXRhVHlwZXNbMF0mJm8uYWNjZXB0c1tvLmRhdGFUeXBlc1swXV0/by5hY2NlcHRzW28uZGF0YVR5cGVzWzBdXSsoXCIqXCIhPT1vLmRhdGFUeXBlc1swXT9cIiwgXCIrSGIrXCI7IHE9MC4wMVwiOlwiXCIpOm8uYWNjZXB0c1tcIipcIl0pO2ZvcihtIGluIG8uaGVhZGVycyl5LnNldFJlcXVlc3RIZWFkZXIobSxvLmhlYWRlcnNbbV0pO2lmKG8uYmVmb3JlU2VuZCYmKG8uYmVmb3JlU2VuZC5jYWxsKHAseSxvKT09PSExfHxrKSlyZXR1cm4geS5hYm9ydCgpO2lmKHg9XCJhYm9ydFwiLHQuYWRkKG8uY29tcGxldGUpLHkuZG9uZShvLnN1Y2Nlc3MpLHkuZmFpbChvLmVycm9yKSxlPUtiKEdiLG8sYyx5KSl7aWYoeS5yZWFkeVN0YXRlPTEsbCYmcS50cmlnZ2VyKFwiYWpheFNlbmRcIixbeSxvXSksaylyZXR1cm4geTtvLmFzeW5jJiZvLnRpbWVvdXQ+MCYmKGk9YS5zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7eS5hYm9ydChcInRpbWVvdXRcIil9LG8udGltZW91dCkpO3RyeXtrPSExLGUuc2VuZCh2LEEpfWNhdGNoKHope2lmKGspdGhyb3cgejtBKC0xLHopfX1lbHNlIEEoLTEsXCJObyBUcmFuc3BvcnRcIik7ZnVuY3Rpb24gQShiLGMsZCxoKXt2YXIgaixtLG4sdix3LHg9YztrfHwoaz0hMCxpJiZhLmNsZWFyVGltZW91dChpKSxlPXZvaWQgMCxnPWh8fFwiXCIseS5yZWFkeVN0YXRlPWI+MD80OjAsaj1iPj0yMDAmJmI8MzAwfHwzMDQ9PT1iLGQmJih2PU1iKG8seSxkKSksdj1OYihvLHYseSxqKSxqPyhvLmlmTW9kaWZpZWQmJih3PXkuZ2V0UmVzcG9uc2VIZWFkZXIoXCJMYXN0LU1vZGlmaWVkXCIpLHcmJihyLmxhc3RNb2RpZmllZFtmXT13KSx3PXkuZ2V0UmVzcG9uc2VIZWFkZXIoXCJldGFnXCIpLHcmJihyLmV0YWdbZl09dykpLDIwND09PWJ8fFwiSEVBRFwiPT09by50eXBlP3g9XCJub2NvbnRlbnRcIjozMDQ9PT1iP3g9XCJub3Rtb2RpZmllZFwiOih4PXYuc3RhdGUsbT12LmRhdGEsbj12LmVycm9yLGo9IW4pKToobj14LCFiJiZ4fHwoeD1cImVycm9yXCIsYjwwJiYoYj0wKSkpLHkuc3RhdHVzPWIseS5zdGF0dXNUZXh0PShjfHx4KStcIlwiLGo/cy5yZXNvbHZlV2l0aChwLFttLHgseV0pOnMucmVqZWN0V2l0aChwLFt5LHgsbl0pLHkuc3RhdHVzQ29kZSh1KSx1PXZvaWQgMCxsJiZxLnRyaWdnZXIoaj9cImFqYXhTdWNjZXNzXCI6XCJhamF4RXJyb3JcIixbeSxvLGo/bTpuXSksdC5maXJlV2l0aChwLFt5LHhdKSxsJiYocS50cmlnZ2VyKFwiYWpheENvbXBsZXRlXCIsW3ksb10pLC0tci5hY3RpdmV8fHIuZXZlbnQudHJpZ2dlcihcImFqYXhTdG9wXCIpKSl9cmV0dXJuIHl9LGdldEpTT046ZnVuY3Rpb24oYSxiLGMpe3JldHVybiByLmdldChhLGIsYyxcImpzb25cIil9LGdldFNjcmlwdDpmdW5jdGlvbihhLGIpe3JldHVybiByLmdldChhLHZvaWQgMCxiLFwic2NyaXB0XCIpfX0pLHIuZWFjaChbXCJnZXRcIixcInBvc3RcIl0sZnVuY3Rpb24oYSxiKXtyW2JdPWZ1bmN0aW9uKGEsYyxkLGUpe3JldHVybiByLmlzRnVuY3Rpb24oYykmJihlPWV8fGQsZD1jLGM9dm9pZCAwKSxyLmFqYXgoci5leHRlbmQoe3VybDphLHR5cGU6YixkYXRhVHlwZTplLGRhdGE6YyxzdWNjZXNzOmR9LHIuaXNQbGFpbk9iamVjdChhKSYmYSkpfX0pLHIuX2V2YWxVcmw9ZnVuY3Rpb24oYSl7cmV0dXJuIHIuYWpheCh7dXJsOmEsdHlwZTpcIkdFVFwiLGRhdGFUeXBlOlwic2NyaXB0XCIsY2FjaGU6ITAsYXN5bmM6ITEsZ2xvYmFsOiExLFwidGhyb3dzXCI6ITB9KX0sci5mbi5leHRlbmQoe3dyYXBBbGw6ZnVuY3Rpb24oYSl7dmFyIGI7cmV0dXJuIHRoaXNbMF0mJihyLmlzRnVuY3Rpb24oYSkmJihhPWEuY2FsbCh0aGlzWzBdKSksYj1yKGEsdGhpc1swXS5vd25lckRvY3VtZW50KS5lcSgwKS5jbG9uZSghMCksdGhpc1swXS5wYXJlbnROb2RlJiZiLmluc2VydEJlZm9yZSh0aGlzWzBdKSxiLm1hcChmdW5jdGlvbigpe3ZhciBhPXRoaXM7d2hpbGUoYS5maXJzdEVsZW1lbnRDaGlsZClhPWEuZmlyc3RFbGVtZW50Q2hpbGQ7cmV0dXJuIGF9KS5hcHBlbmQodGhpcykpLHRoaXN9LHdyYXBJbm5lcjpmdW5jdGlvbihhKXtyZXR1cm4gci5pc0Z1bmN0aW9uKGEpP3RoaXMuZWFjaChmdW5jdGlvbihiKXtyKHRoaXMpLndyYXBJbm5lcihhLmNhbGwodGhpcyxiKSl9KTp0aGlzLmVhY2goZnVuY3Rpb24oKXt2YXIgYj1yKHRoaXMpLGM9Yi5jb250ZW50cygpO2MubGVuZ3RoP2Mud3JhcEFsbChhKTpiLmFwcGVuZChhKX0pfSx3cmFwOmZ1bmN0aW9uKGEpe3ZhciBiPXIuaXNGdW5jdGlvbihhKTtyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKGMpe3IodGhpcykud3JhcEFsbChiP2EuY2FsbCh0aGlzLGMpOmEpfSl9LHVud3JhcDpmdW5jdGlvbihhKXtyZXR1cm4gdGhpcy5wYXJlbnQoYSkubm90KFwiYm9keVwiKS5lYWNoKGZ1bmN0aW9uKCl7cih0aGlzKS5yZXBsYWNlV2l0aCh0aGlzLmNoaWxkTm9kZXMpfSksdGhpc319KSxyLmV4cHIucHNldWRvcy5oaWRkZW49ZnVuY3Rpb24oYSl7cmV0dXJuIXIuZXhwci5wc2V1ZG9zLnZpc2libGUoYSl9LHIuZXhwci5wc2V1ZG9zLnZpc2libGU9ZnVuY3Rpb24oYSl7cmV0dXJuISEoYS5vZmZzZXRXaWR0aHx8YS5vZmZzZXRIZWlnaHR8fGEuZ2V0Q2xpZW50UmVjdHMoKS5sZW5ndGgpfSxyLmFqYXhTZXR0aW5ncy54aHI9ZnVuY3Rpb24oKXt0cnl7cmV0dXJuIG5ldyBhLlhNTEh0dHBSZXF1ZXN0fWNhdGNoKGIpe319O3ZhciBPYj17MDoyMDAsMTIyMzoyMDR9LFBiPXIuYWpheFNldHRpbmdzLnhocigpO28uY29ycz0hIVBiJiZcIndpdGhDcmVkZW50aWFsc1wiaW4gUGIsby5hamF4PVBiPSEhUGIsci5hamF4VHJhbnNwb3J0KGZ1bmN0aW9uKGIpe3ZhciBjLGQ7aWYoby5jb3JzfHxQYiYmIWIuY3Jvc3NEb21haW4pcmV0dXJue3NlbmQ6ZnVuY3Rpb24oZSxmKXt2YXIgZyxoPWIueGhyKCk7aWYoaC5vcGVuKGIudHlwZSxiLnVybCxiLmFzeW5jLGIudXNlcm5hbWUsYi5wYXNzd29yZCksYi54aHJGaWVsZHMpZm9yKGcgaW4gYi54aHJGaWVsZHMpaFtnXT1iLnhockZpZWxkc1tnXTtiLm1pbWVUeXBlJiZoLm92ZXJyaWRlTWltZVR5cGUmJmgub3ZlcnJpZGVNaW1lVHlwZShiLm1pbWVUeXBlKSxiLmNyb3NzRG9tYWlufHxlW1wiWC1SZXF1ZXN0ZWQtV2l0aFwiXXx8KGVbXCJYLVJlcXVlc3RlZC1XaXRoXCJdPVwiWE1MSHR0cFJlcXVlc3RcIik7Zm9yKGcgaW4gZSloLnNldFJlcXVlc3RIZWFkZXIoZyxlW2ddKTtjPWZ1bmN0aW9uKGEpe3JldHVybiBmdW5jdGlvbigpe2MmJihjPWQ9aC5vbmxvYWQ9aC5vbmVycm9yPWgub25hYm9ydD1oLm9ucmVhZHlzdGF0ZWNoYW5nZT1udWxsLFwiYWJvcnRcIj09PWE/aC5hYm9ydCgpOlwiZXJyb3JcIj09PWE/XCJudW1iZXJcIiE9dHlwZW9mIGguc3RhdHVzP2YoMCxcImVycm9yXCIpOmYoaC5zdGF0dXMsaC5zdGF0dXNUZXh0KTpmKE9iW2guc3RhdHVzXXx8aC5zdGF0dXMsaC5zdGF0dXNUZXh0LFwidGV4dFwiIT09KGgucmVzcG9uc2VUeXBlfHxcInRleHRcIil8fFwic3RyaW5nXCIhPXR5cGVvZiBoLnJlc3BvbnNlVGV4dD97YmluYXJ5OmgucmVzcG9uc2V9Ont0ZXh0OmgucmVzcG9uc2VUZXh0fSxoLmdldEFsbFJlc3BvbnNlSGVhZGVycygpKSl9fSxoLm9ubG9hZD1jKCksZD1oLm9uZXJyb3I9YyhcImVycm9yXCIpLHZvaWQgMCE9PWgub25hYm9ydD9oLm9uYWJvcnQ9ZDpoLm9ucmVhZHlzdGF0ZWNoYW5nZT1mdW5jdGlvbigpezQ9PT1oLnJlYWR5U3RhdGUmJmEuc2V0VGltZW91dChmdW5jdGlvbigpe2MmJmQoKX0pfSxjPWMoXCJhYm9ydFwiKTt0cnl7aC5zZW5kKGIuaGFzQ29udGVudCYmYi5kYXRhfHxudWxsKX1jYXRjaChpKXtpZihjKXRocm93IGl9fSxhYm9ydDpmdW5jdGlvbigpe2MmJmMoKX19fSksci5hamF4UHJlZmlsdGVyKGZ1bmN0aW9uKGEpe2EuY3Jvc3NEb21haW4mJihhLmNvbnRlbnRzLnNjcmlwdD0hMSl9KSxyLmFqYXhTZXR1cCh7YWNjZXB0czp7c2NyaXB0OlwidGV4dC9qYXZhc2NyaXB0LCBhcHBsaWNhdGlvbi9qYXZhc2NyaXB0LCBhcHBsaWNhdGlvbi9lY21hc2NyaXB0LCBhcHBsaWNhdGlvbi94LWVjbWFzY3JpcHRcIn0sY29udGVudHM6e3NjcmlwdDovXFxiKD86amF2YXxlY21hKXNjcmlwdFxcYi99LGNvbnZlcnRlcnM6e1widGV4dCBzY3JpcHRcIjpmdW5jdGlvbihhKXtyZXR1cm4gci5nbG9iYWxFdmFsKGEpLGF9fX0pLHIuYWpheFByZWZpbHRlcihcInNjcmlwdFwiLGZ1bmN0aW9uKGEpe3ZvaWQgMD09PWEuY2FjaGUmJihhLmNhY2hlPSExKSxhLmNyb3NzRG9tYWluJiYoYS50eXBlPVwiR0VUXCIpfSksci5hamF4VHJhbnNwb3J0KFwic2NyaXB0XCIsZnVuY3Rpb24oYSl7aWYoYS5jcm9zc0RvbWFpbil7dmFyIGIsYztyZXR1cm57c2VuZDpmdW5jdGlvbihlLGYpe2I9cihcIjxzY3JpcHQ+XCIpLnByb3Aoe2NoYXJzZXQ6YS5zY3JpcHRDaGFyc2V0LHNyYzphLnVybH0pLm9uKFwibG9hZCBlcnJvclwiLGM9ZnVuY3Rpb24oYSl7Yi5yZW1vdmUoKSxjPW51bGwsYSYmZihcImVycm9yXCI9PT1hLnR5cGU/NDA0OjIwMCxhLnR5cGUpfSksZC5oZWFkLmFwcGVuZENoaWxkKGJbMF0pfSxhYm9ydDpmdW5jdGlvbigpe2MmJmMoKX19fX0pO3ZhciBRYj1bXSxSYj0vKD0pXFw/KD89JnwkKXxcXD9cXD8vO3IuYWpheFNldHVwKHtqc29ucDpcImNhbGxiYWNrXCIsanNvbnBDYWxsYmFjazpmdW5jdGlvbigpe3ZhciBhPVFiLnBvcCgpfHxyLmV4cGFuZG8rXCJfXCIrcmIrKztyZXR1cm4gdGhpc1thXT0hMCxhfX0pLHIuYWpheFByZWZpbHRlcihcImpzb24ganNvbnBcIixmdW5jdGlvbihiLGMsZCl7dmFyIGUsZixnLGg9Yi5qc29ucCE9PSExJiYoUmIudGVzdChiLnVybCk/XCJ1cmxcIjpcInN0cmluZ1wiPT10eXBlb2YgYi5kYXRhJiYwPT09KGIuY29udGVudFR5cGV8fFwiXCIpLmluZGV4T2YoXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIikmJlJiLnRlc3QoYi5kYXRhKSYmXCJkYXRhXCIpO2lmKGh8fFwianNvbnBcIj09PWIuZGF0YVR5cGVzWzBdKXJldHVybiBlPWIuanNvbnBDYWxsYmFjaz1yLmlzRnVuY3Rpb24oYi5qc29ucENhbGxiYWNrKT9iLmpzb25wQ2FsbGJhY2soKTpiLmpzb25wQ2FsbGJhY2ssaD9iW2hdPWJbaF0ucmVwbGFjZShSYixcIiQxXCIrZSk6Yi5qc29ucCE9PSExJiYoYi51cmwrPShzYi50ZXN0KGIudXJsKT9cIiZcIjpcIj9cIikrYi5qc29ucCtcIj1cIitlKSxiLmNvbnZlcnRlcnNbXCJzY3JpcHQganNvblwiXT1mdW5jdGlvbigpe3JldHVybiBnfHxyLmVycm9yKGUrXCIgd2FzIG5vdCBjYWxsZWRcIiksZ1swXX0sYi5kYXRhVHlwZXNbMF09XCJqc29uXCIsZj1hW2VdLGFbZV09ZnVuY3Rpb24oKXtnPWFyZ3VtZW50c30sZC5hbHdheXMoZnVuY3Rpb24oKXt2b2lkIDA9PT1mP3IoYSkucmVtb3ZlUHJvcChlKTphW2VdPWYsYltlXSYmKGIuanNvbnBDYWxsYmFjaz1jLmpzb25wQ2FsbGJhY2ssUWIucHVzaChlKSksZyYmci5pc0Z1bmN0aW9uKGYpJiZmKGdbMF0pLGc9Zj12b2lkIDB9KSxcInNjcmlwdFwifSksby5jcmVhdGVIVE1MRG9jdW1lbnQ9ZnVuY3Rpb24oKXt2YXIgYT1kLmltcGxlbWVudGF0aW9uLmNyZWF0ZUhUTUxEb2N1bWVudChcIlwiKS5ib2R5O3JldHVybiBhLmlubmVySFRNTD1cIjxmb3JtPjwvZm9ybT48Zm9ybT48L2Zvcm0+XCIsMj09PWEuY2hpbGROb2Rlcy5sZW5ndGh9KCksci5wYXJzZUhUTUw9ZnVuY3Rpb24oYSxiLGMpe2lmKFwic3RyaW5nXCIhPXR5cGVvZiBhKXJldHVybltdO1wiYm9vbGVhblwiPT10eXBlb2YgYiYmKGM9YixiPSExKTt2YXIgZSxmLGc7cmV0dXJuIGJ8fChvLmNyZWF0ZUhUTUxEb2N1bWVudD8oYj1kLmltcGxlbWVudGF0aW9uLmNyZWF0ZUhUTUxEb2N1bWVudChcIlwiKSxlPWIuY3JlYXRlRWxlbWVudChcImJhc2VcIiksZS5ocmVmPWQubG9jYXRpb24uaHJlZixiLmhlYWQuYXBwZW5kQ2hpbGQoZSkpOmI9ZCksZj1CLmV4ZWMoYSksZz0hYyYmW10sZj9bYi5jcmVhdGVFbGVtZW50KGZbMV0pXTooZj1vYShbYV0sYixnKSxnJiZnLmxlbmd0aCYmcihnKS5yZW1vdmUoKSxyLm1lcmdlKFtdLGYuY2hpbGROb2RlcykpfSxyLmZuLmxvYWQ9ZnVuY3Rpb24oYSxiLGMpe3ZhciBkLGUsZixnPXRoaXMsaD1hLmluZGV4T2YoXCIgXCIpO3JldHVybiBoPi0xJiYoZD1yLnRyaW0oYS5zbGljZShoKSksYT1hLnNsaWNlKDAsaCkpLHIuaXNGdW5jdGlvbihiKT8oYz1iLGI9dm9pZCAwKTpiJiZcIm9iamVjdFwiPT10eXBlb2YgYiYmKGU9XCJQT1NUXCIpLGcubGVuZ3RoPjAmJnIuYWpheCh7dXJsOmEsdHlwZTplfHxcIkdFVFwiLGRhdGFUeXBlOlwiaHRtbFwiLGRhdGE6Yn0pLmRvbmUoZnVuY3Rpb24oYSl7Zj1hcmd1bWVudHMsZy5odG1sKGQ/cihcIjxkaXY+XCIpLmFwcGVuZChyLnBhcnNlSFRNTChhKSkuZmluZChkKTphKX0pLmFsd2F5cyhjJiZmdW5jdGlvbihhLGIpe2cuZWFjaChmdW5jdGlvbigpe2MuYXBwbHkodGhpcyxmfHxbYS5yZXNwb25zZVRleHQsYixhXSl9KX0pLHRoaXN9LHIuZWFjaChbXCJhamF4U3RhcnRcIixcImFqYXhTdG9wXCIsXCJhamF4Q29tcGxldGVcIixcImFqYXhFcnJvclwiLFwiYWpheFN1Y2Nlc3NcIixcImFqYXhTZW5kXCJdLGZ1bmN0aW9uKGEsYil7ci5mbltiXT1mdW5jdGlvbihhKXtyZXR1cm4gdGhpcy5vbihiLGEpfX0pLHIuZXhwci5wc2V1ZG9zLmFuaW1hdGVkPWZ1bmN0aW9uKGEpe3JldHVybiByLmdyZXAoci50aW1lcnMsZnVuY3Rpb24oYil7cmV0dXJuIGE9PT1iLmVsZW19KS5sZW5ndGh9O2Z1bmN0aW9uIFNiKGEpe3JldHVybiByLmlzV2luZG93KGEpP2E6OT09PWEubm9kZVR5cGUmJmEuZGVmYXVsdFZpZXd9ci5vZmZzZXQ9e3NldE9mZnNldDpmdW5jdGlvbihhLGIsYyl7dmFyIGQsZSxmLGcsaCxpLGosaz1yLmNzcyhhLFwicG9zaXRpb25cIiksbD1yKGEpLG09e307XCJzdGF0aWNcIj09PWsmJihhLnN0eWxlLnBvc2l0aW9uPVwicmVsYXRpdmVcIiksaD1sLm9mZnNldCgpLGY9ci5jc3MoYSxcInRvcFwiKSxpPXIuY3NzKGEsXCJsZWZ0XCIpLGo9KFwiYWJzb2x1dGVcIj09PWt8fFwiZml4ZWRcIj09PWspJiYoZitpKS5pbmRleE9mKFwiYXV0b1wiKT4tMSxqPyhkPWwucG9zaXRpb24oKSxnPWQudG9wLGU9ZC5sZWZ0KTooZz1wYXJzZUZsb2F0KGYpfHwwLGU9cGFyc2VGbG9hdChpKXx8MCksci5pc0Z1bmN0aW9uKGIpJiYoYj1iLmNhbGwoYSxjLHIuZXh0ZW5kKHt9LGgpKSksbnVsbCE9Yi50b3AmJihtLnRvcD1iLnRvcC1oLnRvcCtnKSxudWxsIT1iLmxlZnQmJihtLmxlZnQ9Yi5sZWZ0LWgubGVmdCtlKSxcInVzaW5nXCJpbiBiP2IudXNpbmcuY2FsbChhLG0pOmwuY3NzKG0pfX0sci5mbi5leHRlbmQoe29mZnNldDpmdW5jdGlvbihhKXtpZihhcmd1bWVudHMubGVuZ3RoKXJldHVybiB2b2lkIDA9PT1hP3RoaXM6dGhpcy5lYWNoKGZ1bmN0aW9uKGIpe3Iub2Zmc2V0LnNldE9mZnNldCh0aGlzLGEsYil9KTt2YXIgYixjLGQsZSxmPXRoaXNbMF07aWYoZilyZXR1cm4gZi5nZXRDbGllbnRSZWN0cygpLmxlbmd0aD8oZD1mLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLGQud2lkdGh8fGQuaGVpZ2h0PyhlPWYub3duZXJEb2N1bWVudCxjPVNiKGUpLGI9ZS5kb2N1bWVudEVsZW1lbnQse3RvcDpkLnRvcCtjLnBhZ2VZT2Zmc2V0LWIuY2xpZW50VG9wLGxlZnQ6ZC5sZWZ0K2MucGFnZVhPZmZzZXQtYi5jbGllbnRMZWZ0fSk6ZCk6e3RvcDowLGxlZnQ6MH19LHBvc2l0aW9uOmZ1bmN0aW9uKCl7aWYodGhpc1swXSl7dmFyIGEsYixjPXRoaXNbMF0sZD17dG9wOjAsbGVmdDowfTtyZXR1cm5cImZpeGVkXCI9PT1yLmNzcyhjLFwicG9zaXRpb25cIik/Yj1jLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpOihhPXRoaXMub2Zmc2V0UGFyZW50KCksYj10aGlzLm9mZnNldCgpLHIubm9kZU5hbWUoYVswXSxcImh0bWxcIil8fChkPWEub2Zmc2V0KCkpLGQ9e3RvcDpkLnRvcCtyLmNzcyhhWzBdLFwiYm9yZGVyVG9wV2lkdGhcIiwhMCksbGVmdDpkLmxlZnQrci5jc3MoYVswXSxcImJvcmRlckxlZnRXaWR0aFwiLCEwKX0pLHt0b3A6Yi50b3AtZC50b3Atci5jc3MoYyxcIm1hcmdpblRvcFwiLCEwKSxsZWZ0OmIubGVmdC1kLmxlZnQtci5jc3MoYyxcIm1hcmdpbkxlZnRcIiwhMCl9fX0sb2Zmc2V0UGFyZW50OmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uKCl7dmFyIGE9dGhpcy5vZmZzZXRQYXJlbnQ7d2hpbGUoYSYmXCJzdGF0aWNcIj09PXIuY3NzKGEsXCJwb3NpdGlvblwiKSlhPWEub2Zmc2V0UGFyZW50O3JldHVybiBhfHxwYX0pfX0pLHIuZWFjaCh7c2Nyb2xsTGVmdDpcInBhZ2VYT2Zmc2V0XCIsc2Nyb2xsVG9wOlwicGFnZVlPZmZzZXRcIn0sZnVuY3Rpb24oYSxiKXt2YXIgYz1cInBhZ2VZT2Zmc2V0XCI9PT1iO3IuZm5bYV09ZnVuY3Rpb24oZCl7cmV0dXJuIFModGhpcyxmdW5jdGlvbihhLGQsZSl7dmFyIGY9U2IoYSk7cmV0dXJuIHZvaWQgMD09PWU/Zj9mW2JdOmFbZF06dm9pZChmP2Yuc2Nyb2xsVG8oYz9mLnBhZ2VYT2Zmc2V0OmUsYz9lOmYucGFnZVlPZmZzZXQpOmFbZF09ZSl9LGEsZCxhcmd1bWVudHMubGVuZ3RoKX19KSxyLmVhY2goW1widG9wXCIsXCJsZWZ0XCJdLGZ1bmN0aW9uKGEsYil7ci5jc3NIb29rc1tiXT1OYShvLnBpeGVsUG9zaXRpb24sZnVuY3Rpb24oYSxjKXtpZihjKXJldHVybiBjPU1hKGEsYiksS2EudGVzdChjKT9yKGEpLnBvc2l0aW9uKClbYl0rXCJweFwiOmN9KX0pLHIuZWFjaCh7SGVpZ2h0OlwiaGVpZ2h0XCIsV2lkdGg6XCJ3aWR0aFwifSxmdW5jdGlvbihhLGIpe3IuZWFjaCh7cGFkZGluZzpcImlubmVyXCIrYSxjb250ZW50OmIsXCJcIjpcIm91dGVyXCIrYX0sZnVuY3Rpb24oYyxkKXtyLmZuW2RdPWZ1bmN0aW9uKGUsZil7dmFyIGc9YXJndW1lbnRzLmxlbmd0aCYmKGN8fFwiYm9vbGVhblwiIT10eXBlb2YgZSksaD1jfHwoZT09PSEwfHxmPT09ITA/XCJtYXJnaW5cIjpcImJvcmRlclwiKTtyZXR1cm4gUyh0aGlzLGZ1bmN0aW9uKGIsYyxlKXt2YXIgZjtyZXR1cm4gci5pc1dpbmRvdyhiKT8wPT09ZC5pbmRleE9mKFwib3V0ZXJcIik/YltcImlubmVyXCIrYV06Yi5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnRbXCJjbGllbnRcIithXTo5PT09Yi5ub2RlVHlwZT8oZj1iLmRvY3VtZW50RWxlbWVudCxNYXRoLm1heChiLmJvZHlbXCJzY3JvbGxcIithXSxmW1wic2Nyb2xsXCIrYV0sYi5ib2R5W1wib2Zmc2V0XCIrYV0sZltcIm9mZnNldFwiK2FdLGZbXCJjbGllbnRcIithXSkpOnZvaWQgMD09PWU/ci5jc3MoYixjLGgpOnIuc3R5bGUoYixjLGUsaCl9LGIsZz9lOnZvaWQgMCxnKX19KX0pLHIuZm4uZXh0ZW5kKHtiaW5kOmZ1bmN0aW9uKGEsYixjKXtyZXR1cm4gdGhpcy5vbihhLG51bGwsYixjKX0sdW5iaW5kOmZ1bmN0aW9uKGEsYil7cmV0dXJuIHRoaXMub2ZmKGEsbnVsbCxiKX0sZGVsZWdhdGU6ZnVuY3Rpb24oYSxiLGMsZCl7cmV0dXJuIHRoaXMub24oYixhLGMsZCl9LHVuZGVsZWdhdGU6ZnVuY3Rpb24oYSxiLGMpe3JldHVybiAxPT09YXJndW1lbnRzLmxlbmd0aD90aGlzLm9mZihhLFwiKipcIik6dGhpcy5vZmYoYixhfHxcIioqXCIsYyl9fSksci5wYXJzZUpTT049SlNPTi5wYXJzZSxcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQmJmRlZmluZShcImpxdWVyeVwiLFtdLGZ1bmN0aW9uKCl7cmV0dXJuIHJ9KTt2YXIgVGI9YS5qUXVlcnksVWI9YS4kO3JldHVybiByLm5vQ29uZmxpY3Q9ZnVuY3Rpb24oYil7cmV0dXJuIGEuJD09PXImJihhLiQ9VWIpLGImJmEualF1ZXJ5PT09ciYmKGEualF1ZXJ5PVRiKSxyfSxifHwoYS5qUXVlcnk9YS4kPXIpLHJ9KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2pzL2pxdWVyeS0zLjEuMC5taW4uanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG1vZHVsZSkge1xyXG5cdGlmKCFtb2R1bGUud2VicGFja1BvbHlmaWxsKSB7XHJcblx0XHRtb2R1bGUuZGVwcmVjYXRlID0gZnVuY3Rpb24oKSB7fTtcclxuXHRcdG1vZHVsZS5wYXRocyA9IFtdO1xyXG5cdFx0Ly8gbW9kdWxlLnBhcmVudCA9IHVuZGVmaW5lZCBieSBkZWZhdWx0XHJcblx0XHRtb2R1bGUuY2hpbGRyZW4gPSBbXTtcclxuXHRcdG1vZHVsZS53ZWJwYWNrUG9seWZpbGwgPSAxO1xyXG5cdH1cclxuXHRyZXR1cm4gbW9kdWxlO1xyXG59XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogKHdlYnBhY2spL2J1aWxkaW4vbW9kdWxlLmpzXG4gKiogbW9kdWxlIGlkID0gNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfYW1kX29wdGlvbnNfXztcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAod2VicGFjaykvYnVpbGRpbi9hbWQtb3B0aW9ucy5qc1xuICoqIG1vZHVsZSBpZCA9IDdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=
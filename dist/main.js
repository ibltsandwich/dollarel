/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/dom_node_collection.js":
/*!************************************!*\
  !*** ./src/dom_node_collection.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class DomNodeCollection {\n  constructor(elements) {\n    this.elements = elements\n  }\n\n  html(string) {\n    if (string) {\n      this.elements.forEach(el => {\n        el.innerHTML = string\n      })\n    } else {\n      return this.elements[0].innerHTML\n    }\n  }\n\n  empty() {\n    this.html(\"\")\n  }\n\n  append(arg) {\n    if (arg instanceof DOMNodeCollection) {\n      arg.forEach(argEl => {\n        this.elements.forEach(thisEl => {\n          thisEl.innerHTML += argEl.outerHTML;\n        });\n      });\n    } else {\n      this.elements.forEach(el => {\n        el.innerHTML += arg\n      })\n    }\n  }\n\n  attr(string) {\n    for (let i = 0; i < this.elements[0].attributes.length; i++) {\n      if (string === this.elements[0].attributes[i].name) {\n        return this.elements[0].attributes[i].value\n      }\n    }\n  }\n\n  addClass() {\n    this.elements.forEach(el => {\n      el.classList.add(string);\n    });\n  }\n\n  removeClass() {\n    this.elements.forEach(el => {\n      el.classList.remove(string);\n    });\n  }\n\n\n  children() {\n    const result = [];\n    this.elements.forEach(el => {\n      for (let i = 0; i < el.children.length; i++) {\n        result.push(el.children[i]);\n      }\n    });\n    return new DOMNodeCollection(result);\n  }\n\n  parent() {\n    const result = [];\n    this.elements.forEach(el => {\n      result.push(el.parentNode);\n    });\n\n    return new DOMNodeCollection(result);\n  }\n\n  find(selector) {\n    let result = [];\n    this.array.forEach((el) => {\n      const descendants = Array.from(el.querySelectorAll(selector));\n      result = result.concat(descendants);\n    });\n\n    return new DOMNodeCollection(result);\n  }\n\n  remove() {\n    this.array.forEach((el) => {\n      el.remove(\"outerHTML\");\n    });\n\n    this.array = [];\n  }\n\n  on(event, callback) {\n    this.array.forEach((el) => {\n      el.addEventListener(event, callback);\n      el.callback = callback;\n    });\n  }\n\n  off(event) {\n    this.array.forEach((el) => {\n      el.removeEventListener(event, el.callback);\n    });\n  }\n}\n\n\nmodule.exports = DomNodeCollection;\n\n//# sourceURL=webpack:///./src/dom_node_collection.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const DomNodeCollection = __webpack_require__(/*! ./dom_node_collection */ \"./src/dom_node_collection.js\");\n\nlet funcs = [];\nlet ready = false;\n\nwindow.$l = (selector) => {\n  if (typeof selector === 'function') {\n    return documentReadyCallback(selector);\n  } else if (typeof selector === 'string') {\n    return cssHtmlCallback(selector);\n  } else if (selector instanceof HTMLElement) {\n    return cssHtmlCallback(selector);\n  }\n}\n\n$l.extend = (target, ...args) => {\n  args.forEach(obj => {\n    for (let prop in obj) {\n      target[prop] = obj[prop];\n    }\n  });\n  return target;\n}\n\n$l.ajax = (options) => {\n  let defaults = {\n    success: () => { }, error: () => { },\n    url: \"\", method: 'GET',\n    data: {}, contentType: 'HTML'\n  };\n\n  \n  options = window.$l.extend(defaults, options);\n  options.method = options.method.toUpperCase();\n  \n  \n  const p = new Promise((resolve, reject) => {\n    const xhr = new XMLHttpRequest();\n    xhr.open(options.method, options.url);\n    xhr.onload = () => {\n      if (xhr.status === 200) {\n        resolve(xhr.response);\n      } else {\n        reject(xhr.response);\n      }\n    };\n    xhr.send(JSON.stringify(options.data));\n  })\n  return p;\n}\n\ndocumentReadyCallback = (arg) => {\n  if (ready === false) {\n    funcs.push(arg); \n  }\n}\n\ncssHtmlCallback = (arg) => {\n  const nodes = document.querySelectorAll(arg);\n  const nodeArr = Array.from(nodes);\n  return new DOMNodeCollection(nodeArr);\n}\n\ndocument.addEventListener('DOMContentLoaded', () => {\n  ready = true;\n  funcs.forEach(func => func());\n  funcs = [];\n});\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });
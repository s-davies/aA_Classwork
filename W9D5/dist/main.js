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

eval("class DOMNodeCollection {\n    constructor (htmlElements) {\n        // debugger\n        this.htmlElements = htmlElements;\n    }\n\n    html(str) {\n        if (str) {\n            this.htmlElements.forEach( el => {\n                el.innerHTML = str;\n            });\n            return this;\n        } else {\n            // debugger\n            const innerStuff = this.htmlElements[0].innerHTML;\n            return innerStuff;\n        }\n        \n    }\n\n    empty() {\n        this.htmlElements.forEach(el => {\n            el.innerHTML = \"\";\n        });\n    }\n\n    append(arg) {\n        this.htmlElements.forEach(el => {\n            if (typeof arg === \"string\") {\n                el.innerHTML += arg;\n            } else if (arg instanceof HTMLElement) {\n                el.innerHTML += arg.outerHTML;\n            } else if (arg instanceof DOMNodeCollection) {\n                el.innerHTML += arg.htmlElements.map(el => el.outerHTML).join(\"\");\n            }\n            \n        });\n        return this;\n    }\n\n    attr(attribute, arg) {\n        if (!arg) {\n           return this.htmlElements[0].getAttribute(attribute);\n        } else if (typeof arg === \"string\") {\n            this.htmlElements.forEach(el => {\n                el.setAttribute(attribute, arg);\n            });\n        } else if (arg instanceof Function) {\n            this.htmlElements.forEach((el, idx) => {\n                let att = el.getAttribute(attribute);\n                el.setAttribute(attribute, arg(idx, att));\n            });\n        }\n    }\n\n    addClass(className) {\n        this.htmlElements.forEach( el => {\n            el.classList.add(className);\n        });\n    }\n\n    removeClass(className) {\n        this.htmlElements.forEach(el => {\n            el.classList.remove(className);\n        });\n    }\n\n    children() {\n        // debugger\n        let childs = [];\n        this.htmlElements.forEach( el => {\n            childs = childs.concat(Array.from(el.children));\n        });\n        return new DOMNodeCollection(childs);\n    }\n\n    parent() {\n        // debugger\n        let parents = [];\n        this.htmlElements.forEach(el => {\n            if (parents.indexOf(el.parentElement) === -1) {\n                // debugger\n                parents.push(el.parentElement);\n            }\n        });\n        return new DOMNodeCollection(parents);\n    }\n\n    find(selector) {\n        let selected = [];\n        this.htmlElements.forEach(el => {\n            selected = selected.concat(Array.from(el.querySelectorAll(selector)));\n        });\n        return selected;\n    }\n\n    remove() {\n        let store = this.htmlElements.slice();\n        this.htmlElements.forEach( el => {\n            el.parentNode.removeChild(el);\n        });\n        return store;\n    }\n\n    on(type, func) {\n        this.htmlElements.forEach(el => {\n            el.addEventListener(type, func);\n        });\n    }\n\n    off(type, func) {\n        this.htmlElements.forEach(el => {\n            el.removeEventListener(type, func);\n        });\n    }\n}\n\nmodule.exports = DOMNodeCollection;\n\n//# sourceURL=webpack:///./src/dom_node_collection.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const DOMNodeCollection = __webpack_require__(/*! ./dom_node_collection.js */ \"./src/dom_node_collection.js\");\n\nlet funcsArr = [];\n\nwindow.addEventListener('DOMContentLoaded', (event) => {\n    funcsArr.forEach(el => el());\n});\n\nconst $l = function (arg) {\n    if (typeof arg === \"string\") {\n       const nodeList = document.querySelectorAll(arg);\n       let eles = Array.from(nodeList);\n        return new DOMNodeCollection(eles);\n    } else if (arg instanceof HTMLElement) {\n        let htmlElements = [arg];\n        return new DOMNodeCollection(htmlElements);\n    } else if (arg instanceof Function) {\n        funcsArr.push(arg);\n    }\n    \n};\n\nconst sayHi = $l(() => {console.log('hi')});\n\nwindow.$l = $l;\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });
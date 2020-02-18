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

/***/ "./src/clock.js":
/*!**********************!*\
  !*** ./src/clock.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _warmup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./warmup */ \"./src/warmup.js\");\n\nclass Clock {\n    constructor() {\n        // 1. Create a Date object.\n        const currentTime = new Date();\n\n        // 2. Store the hour, minute, and second.\n        this.hours = currentTime.getHours();\n        this.minutes = currentTime.getMinutes();\n        this.seconds = currentTime.getSeconds();\n\n        // 3. Call printTime.\n        this.printTime();\n\n        // 4. Schedule the tick at 1 second intervals.\n        setInterval(this._tick.bind(this), 1000);\n    }\n\n    printTime() {\n        // Format the time in HH:MM:SS\n        const timeString = [this.hours, this.minutes, this.seconds].join(\":\");\n        const clockElement = document.getElementById('clock');\n        if (clockElement.children.length > 0) {\n            clockElement.removeChild(clockElement.children[0]);\n        }\n        // Use console.log to print it.\n        Object(_warmup__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(timeString, clockElement);\n        // console.log(timeString);\n    }\n\n    _tick() {\n        // 1. Increment the time by one second.\n        this._incrementSeconds();\n\n        // 2. Call printTime.\n        this.printTime();\n    }\n\n    _incrementSeconds() {\n        // 1. Increment the time by one second.\n        this.seconds += 1;\n        if (this.seconds === 60) {\n            this.seconds = 0;\n            this._incrementMinutes();\n        }\n    }\n\n    _incrementMinutes() {\n        this.minutes += 1;\n        if (this.minutes === 60) {\n            this.minutes = 0;\n            this._incrementHours();\n        }\n    }\n\n    _incrementHours() {\n        this.hours = (this.hours + 1) % 24;\n    }\n}\n\nconst clock = new Clock();\n\n\n//# sourceURL=webpack:///./src/clock.js?");

/***/ }),

/***/ "./src/drop_down.js":
/*!**************************!*\
  !*** ./src/drop_down.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\nconst dogs = {\n  \"Corgi\": \"https://www.akc.org/dog-breeds/cardigan-welsh-corgi/\",\n  \"Australian Shepherd\": \"https://www.akc.org/dog-breeds/australian-shepherd/\",\n  \"Affenpinscher\": \"https://www.akc.org/dog-breeds/affenpinscher/\",\n  \"American Staffordshire Terrier\": \"https://www.akc.org/dog-breeds/american-staffordshire-terrier/\",\n  \"Tosa\": \"https://www.akc.org/dog-breeds/tosa/\",\n  \"Labrador Retriever\": \"https://www.akc.org/dog-breeds/labrador-retriever/\",\n  \"French Bulldog\": \"https://www.akc.org/dog-breeds/french-bulldog/\" \n};\n\nfunction dogLinkCreator() {\n  let dogLis = [];\n  for (let i = 0; i < Object.keys(dogs).length; i++) {\n    // const dogLink = dogs[i];\n    let aTag = document.createElement('a');\n    aTag.innerHTML = Object.keys(dogs)[i];\n    aTag.href = Object.values(dogs)[i];\n    let liTag = document.createElement('li');\n    liTag.classList.add('dog-link');\n    liTag.classList.add('hidden');\n    liTag.append(aTag);\n    dogLis.push(liTag);\n  }\n  return dogLis;\n}\n\nfunction attachDogLinks() {\n  let dogLinks = dogLinkCreator();\n  let ul = document.getElementsByClassName('drop-down-dog-list')[0];\n  for (let i = 0; i < dogLinks.length; i++) {\n    const dogLink = dogLinks[i];\n    ul.append(dogLink);\n  }\n}\n\nfunction handleEnter() {\n  let lis = document.getElementsByClassName('dog-link');\n  for (let i = 0; i < lis.length; i++) {\n    const li = lis[i];\n    li.classList.remove('hidden');\n  }\n}\n\nfunction handleLeave() {\n  let lis = document.getElementsByClassName('dog-link');\n  for (let i = 0; i < lis.length; i++) {\n    const li = lis[i];\n    li.classList.add('hidden');\n  }\n}\n\nconst h3 = document.querySelector('h3');\nconst nav = document.getElementsByClassName('drop-down-dog-nav')[0];\nh3.addEventListener(\"mouseenter\", handleEnter);\nnav.addEventListener(\"mouseleave\", handleLeave);\nattachDogLinks();\n\n\n//# sourceURL=webpack:///./src/drop_down.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _warmup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./warmup */ \"./src/warmup.js\");\n/* harmony import */ var _clock__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./clock */ \"./src/clock.js\");\n/* harmony import */ var _drop_down__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./drop_down */ \"./src/drop_down.js\");\n/* harmony import */ var _drop_down__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_drop_down__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _todo_list__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./todo_list */ \"./src/todo_list.js\");\n/* harmony import */ var _todo_list__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_todo_list__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _slide_scroll__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./slide_scroll */ \"./src/slide_scroll.js\");\n/* harmony import */ var _slide_scroll__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_slide_scroll__WEBPACK_IMPORTED_MODULE_4__);\n\n\n\n\n\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/slide_scroll.js":
/*!*****************************!*\
  !*** ./src/slide_scroll.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("window.addEventListener(\"scroll\", debounce(() => {\n  let imgs = document.querySelectorAll('img');\n  let body = document.querySelector('body');\n  for (let i = 0; i < imgs.length; i++) {\n    const ig = imgs[i];\n    if (ig.y <= Math.floor(window.innerHeight) && ig.y > -(ig.height)) {\n      ig.classList.add('active');\n    }\n    if (ig.y <= -(ig.height)) {\n      ig.classList.remove('active');\n    }\n  }\n}));\n\nfunction debounce(func, wait = 20, immediate = true) {\n  let timeout;\n  \n  // This is the function that is actually executed when\n  // the DOM event is triggered.\n  return function executedFunction() {\n    // Store the context of this and any\n    // parameters passed to executedFunction\n    const context = this;\n    const args = arguments;\n\n    // The function to be called after debounce time has elapsed\n    const later = function () {\n      // null timeout to indicate the debounce ended\n      timeout = null;\n\n      // Call function now if you did not in the beginning\n      if (!immediate) func.apply(context, args);\n    };\n\n    // Determine if you should call the function\n    // on the leading or trail end\n    const callNow = immediate && !timeout;\n\n    // This will reset the waiting every function execution.\n    clearTimeout(timeout);\n\n    // Restart the debounce waiting period - returns true\n    timeout = setTimeout(later, wait);\n\n    // Call immediately if you're doing a leading end execution\n    if (callNow) func.apply(context, args);\n  };\n}\n\n//# sourceURL=webpack:///./src/slide_scroll.js?");

/***/ }),

/***/ "./src/todo_list.js":
/*!**************************!*\
  !*** ./src/todo_list.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\nconst todoForm = document.getElementsByClassName(\"add-todo-form\")[0];\nconst todosUl = document.getElementsByClassName(\"todos\")[0];\nlet todos;\nconst todosArr = localStorage.getItem(\"todosArr\");\n\nif (todosArr) {\n    todos = JSON.parse(todosArr);\n} else {\n    todos = [];\n}\n\ndocument.addEventListener(\"submit\", (event) => {\n    event.preventDefault();\n    let todoField = todoForm.children[0];\n\n    const todo = {\n        value: todoField.value,\n        done: false\n    };\n\n    todos.push(todo);\n\n    localStorage.setItem(\"todosArr\", JSON.stringify(todos));\n    todoField.value = \"\";\n    populateList();\n});\n\nfunction populateList() {\n    let childs = Array.from(todosUl.children)\n    for (let i = 0; i < childs.length; i++) {\n        const child = childs[i];\n        todosUl.removeChild(child);\n    }\n    for (let i = 0; i < todos.length; i++) {\n        const todo = todos[i];\n        const checkBox = document.createElement('input');\n        checkBox.type = 'checkbox';\n        checkBox.checked = todo.done;\n        const li = document.createElement('li');\n        const label = document.createElement('label');\n        label.innerHTML = todo.value;\n        label.append(checkBox);\n        li.append(label);\n        todosUl.append(li);\n        checkBox.addEventListener(\"change\", () => {\n            if (todo.done) {\n                // Checkbox is checked..\n                todo.done = false;\n                todos[i] = todo;\n            } else {\n                // Checkbox is not checked..\n                todo.done = true;\n                todos[i] = todo;\n            }\n            localStorage.setItem(\"todosArr\", JSON.stringify(todos));\n        });\n    }\n}\n\n\n\npopulateList();\n\n//# sourceURL=webpack:///./src/todo_list.js?");

/***/ }),

/***/ "./src/warmup.js":
/*!***********************!*\
  !*** ./src/warmup.js ***!
  \***********************/
/*! exports provided: htmlGenerator, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"htmlGenerator\", function() { return htmlGenerator; });\n\nconst partyHeader = document.getElementById('party');\n\nconst htmlGenerator = (string, htmlElement) => {\n    const pEl = document.createElement('p');\n    pEl.innerHTML = string;\n    htmlElement.append(pEl);\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (htmlGenerator);\n\nhtmlGenerator('Party Time.', partyHeader);\n\n//# sourceURL=webpack:///./src/warmup.js?");

/***/ })

/******/ });
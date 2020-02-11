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

/***/ "./src/bird.js":
/*!*********************!*\
  !*** ./src/bird.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Bird; });\nconst CONSTANTS = {\n  GRAVITY: 0.8,\n  FLAP_SPEED: -8,\n  TERMINAL_VEL: 12,\n  BIRD_WIDTH: 40,\n  BIRD_HEIGHT: 30\n};\n\nclass Bird {\n  constructor(dimensions) {\n    this.velocity = 0;\n    this.dimensions = dimensions;\n    this.x = (Math.floor((this.dimensions.width-CONSTANTS.BIRD_WIDTH) / 3));\n    this.y = ((this.dimensions.height-CONSTANTS.BIRD_HEIGHT) / 2);\n  }\n\n  drawBird(ctx) {\n    ctx.fillStyle = \"yellow\";\n    ctx.fillRect(this.x, this.y, CONSTANTS.BIRD_WIDTH, CONSTANTS.BIRD_HEIGHT);\n  }\n\n  move() {\n    this.y += this.velocity;\n    this.velocity += CONSTANTS.GRAVITY;\n    if (this.velocity > CONSTANTS.TERMINAL_VEL) {\n      this.velocity = CONSTANTS.TERMINAL_VEL;\n    }\n  }\n\n  flap() {\n    this.velocity = CONSTANTS.FLAP_SPEED;\n  }\n\n  getBounds() {\n    return [\n      [this.x, this.y], \n      [this.x + CONSTANTS.BIRD_WIDTH, this.y + CONSTANTS.BIRD_HEIGHT]\n    ];\n  }\n}\n\n//# sourceURL=webpack:///./src/bird.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return FlappyBird; });\n/* harmony import */ var _level__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./level */ \"./src/level.js\");\n/* harmony import */ var _bird__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bird */ \"./src/bird.js\");\n/* harmony import */ var _pipe__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pipe */ \"./src/pipe.js\");\n\n\n\n\nclass FlappyBird {\n  constructor(canvas){\n    this.ctx = canvas.getContext(\"2d\");\n    this.dimensions = { width: canvas.width, height: canvas.height };\n  }\n\n  animate() {\n    this.level.drawBackground(this.ctx);\n    this.bird.move();\n    this.bird.drawBird(this.ctx);\n    \n    for (let i = 0; i < this.pipes.length; i++) {\n      let pipe = this.pipes[i];\n      pipe.drawPipe(this.ctx);\n      pipe.movePipe();\n      if (pipe.x === pipe.starting - 220) {\n        let newPipe = new _pipe__WEBPACK_IMPORTED_MODULE_2__[\"default\"](this.dimensions);\n        this.pipes.push(newPipe);\n      }\n      //incrementing score\n      if (pipe.getBounds().right === this.bird.x) {\n        this.score += 1;\n      }\n      if (pipe.x < -150) {\n        this.pipes.shift();\n      }\n    }\n    this.collidesWith();\n    if (this.running) {\n      requestAnimationFrame(this.animate.bind(this));\n    }\n    this.drawScore(this.ctx);\n  }\n\n  restart() {\n    this.level = new _level__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.dimensions);\n    this.bird = new _bird__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this.dimensions);\n    this.score = 0;\n    let pipe = new _pipe__WEBPACK_IMPORTED_MODULE_2__[\"default\"](this.dimensions);\n    this.pipes = [];\n    this.pipes.push(pipe);\n\n    this.running = false;\n    this.animate();\n  }\n\n  play() {\n    this.running = true;\n    this.animate();\n  }\n\n  click() {\n    if (!this.running) {\n      this.play();\n    }\n\n    this.bird.flap();\n  }\n\n  collidesWith() {\n    let birdBounds = this.bird.getBounds();\n    let birdTopLeft = birdBounds[0];\n    let birdBottomRight = birdBounds[1];\n    let birdTop = birdTopLeft[1];\n    let birdBottom = birdBottomRight[1];\n    let birdLeft = birdTopLeft[0];\n    let birdRight = birdBottomRight[0];\n    for (let i = 0; i < this.pipes.length; i++) {\n      let pipe = this.pipes[i];\n      let pipeBounds = pipe.getBounds();\n      if ((birdTop <= pipeBounds.top || \n        birdBottom >= pipeBounds.bottom) && \n        (birdRight >= pipeBounds.left && \n          birdLeft <= pipeBounds.right)) {\n            alert(\"Flappy Bird Died\");\n            this.restart();\n      }\n    }\n  }\n  drawScore(ctx) {\n    ctx.fillStyle = \"white\";\n    // ctx.fillRect(0,0, 50, 50);\n    ctx.font = \"30px Arial\";\n    ctx.fillText(`${this.score}`, (this.dimensions.width / 2), 50);\n  }\n}\n\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\n\nconst canvas = document.getElementById('bird-game');\nconst game = new _game__WEBPACK_IMPORTED_MODULE_0__[\"default\"](canvas);\ngame.restart();\ncanvas.addEventListener('mousedown', game.click.bind(game));\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/level.js":
/*!**********************!*\
  !*** ./src/level.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Level; });\n/* harmony import */ var _pipe__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pipe */ \"./src/pipe.js\");\n\n\nclass Level {\n  constructor(dimensions) {\n    this.dimensions = dimensions;\n  }\n\n  drawBackground(ctx) {\n    ctx.fillStyle = \"skyblue\";\n    ctx.fillRect(0, 0, this.dimensions.width, this.dimensions.height);\n  }\n\n  \n}\n\n//# sourceURL=webpack:///./src/level.js?");

/***/ }),

/***/ "./src/pipe.js":
/*!*********************!*\
  !*** ./src/pipe.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Pipe; });\nconst CONSTANTS = {\n  PIPE_WIDTH: (480 / 6),\n  PIPE_SPEED: -2,\n  PIPE_SPACE: 220,\n  PIPE_GAP: 150\n};\n\nclass Pipe {\n  constructor(dimensions) {\n    this.dimensions = dimensions;\n    this.x = this.dimensions.width + 40;\n    this.starting = this.x;\n    this.height = (Math.floor((Math.random() * 10) + 1)) * 45;\n  }\n\n  movePipe() {\n    this.x += CONSTANTS.PIPE_SPEED;\n  }\n\n  drawPipe(ctx) {\n    ctx.fillStyle = \"green\";\n    ctx.fillRect(this.x, 0, CONSTANTS.PIPE_WIDTH, this.height);\n    ctx.fillRect(this.x, this.height + CONSTANTS.PIPE_GAP, CONSTANTS.PIPE_WIDTH, this.dimensions.height - this.height + CONSTANTS.PIPE_GAP)\n  }\n  \n  getBounds() {\n    return {\n      top: this.height,\n      right: this.x + CONSTANTS.PIPE_WIDTH,\n      left: this.x,\n      bottom: this.height + CONSTANTS.PIPE_GAP\n    };\n  }\n}\n\n//# sourceURL=webpack:///./src/pipe.js?");

/***/ })

/******/ });
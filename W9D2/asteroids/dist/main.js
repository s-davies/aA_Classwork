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

/***/ "./src/asteroid.js":
/*!*************************!*\
  !*** ./src/asteroid.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Util = __webpack_require__(/*! ./utils.js */ \"./src/utils.js\");\nconst MovingObject = __webpack_require__(/*! ./moving_object.js */ \"./src/moving_object.js\");\nconst Ship = __webpack_require__(/*! ./ship.js */ \"./src/ship.js\");\nconst Bullet = __webpack_require__(/*! ./bullet.js */ \"./src/bullet.js\");\n\nfunction Asteroid(properties) {\n  this.COLOR = \"gray\";\n  this.RADIUS = 40;\n  MovingObject.call(this, {\n    pos: properties.pos,\n    color: this.COLOR,\n    radius: this.RADIUS,\n    vel: Util.randomVec(10),\n    game: properties.game\n  });\n}\nUtil.inherits(Asteroid, MovingObject);\n\nAsteroid.prototype.collideWith = function(otherObject) {\n  // alert(\"collision\");\n  if (otherObject instanceof Ship) {\n    otherObject.relocate();\n  } \n  else if (otherObject instanceof Bullet) {\n    alert(\"hi\");\n    this.game.remove(otherObject);\n    this.game.remove(this);\n  }\n};\n\nAsteroid.prototype.move = function() {\n  this.pos[0] += this.vel[0];\n  this.pos[1] += this.vel[1];\n  let newPos = this.game.wrap(this.pos);\n  this.pos[0] = newPos[0];\n  this.pos[1] = newPos[1];\n};\nmodule.exports = Asteroid;\n\n//# sourceURL=webpack:///./src/asteroid.js?");

/***/ }),

/***/ "./src/bullet.js":
/*!***********************!*\
  !*** ./src/bullet.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Util = __webpack_require__(/*! ./utils.js */ \"./src/utils.js\");\nconst MovingObject = __webpack_require__(/*! ./moving_object.js */ \"./src/moving_object.js\");\nconst CONSTANTS = {\n  BULLET_SPEED: 40\n};\nfunction Bullet(properties) {\n  this.COLOR = \"red\";\n  this.RADIUS = 4;\n  // let shipV = properties.game.ship.vel;\n  // let shipXvel = shipV[0];\n  // let shipYvel = shipV[1];\n  // let shipVSum = Math.abs(shipXvel) + Math.abs(shipYvel);\n  // let shipXperc = shipXvel / shipVSum;\n  // let shipYperc = shipYvel / shipVSum;\n  // let bulletXvel = CONSTANTS.BULLET_SPEED * shipXperc;\n  // let bulletYvel = CONSTANTS.BULLET_SPEED * shipYperc;\n  // let bulletVel = [bulletXvel, bulletYvel];\n  MovingObject.call(this, {\n    pos: properties.pos,\n    color: this.COLOR,\n    radius: this.RADIUS,\n    vel: [5,5],\n    game: properties.game\n  });\n}\n\nUtil.inherits(Bullet, MovingObject);\n\nBullet.prototype.move = function() {\n  this.pos[0] += this.vel[0];\n  this.pos[1] += this.vel[1];\n};\n\nmodule.exports = Bullet;\n\n//# sourceURL=webpack:///./src/bullet.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Asteroid = __webpack_require__(/*! ./asteroid.js */ \"./src/asteroid.js\");\nconst Ship = __webpack_require__(/*! ./ship.js */ \"./src/ship.js\");\nconst Bullet = __webpack_require__(/*! ./bullet.js */ \"./src/bullet.js\");\n\nconst CONSTANTS = {\n  DIM_X: document.getElementById(\"game-canvas\").width,\n  DIM_Y: document.getElementById(\"game-canvas\").height,\n  NUM_ASTEROIDS: 2,\n  BUFFER_X: 50,\n  BUFFER_Y: 50\n};\n\nfunction Game() {\n  this.asteroids = [];\n  this.addAsteroids();\n  let randomShipPos = this.randomPosition();\n  this.ship = new Ship({pos: randomShipPos, game: this});\n  this.bullets = [];\n}\n\nGame.prototype.addAsteroids = function () {\n  for (let i = 0; i < CONSTANTS.NUM_ASTEROIDS; i++) {\n    let randPos = this.randomPosition();\n    let ast = new Asteroid({pos: randPos, game: this});\n    this.asteroids.push(ast);\n  }\n};\n\nGame.prototype.randomPosition = function() {\n  let xPos = Math.floor(Math.random() * CONSTANTS.DIM_X);\n  let yPos = Math.floor(Math.random() * CONSTANTS.DIM_Y);\n\n  return [xPos, yPos];\n};\n\nGame.prototype.draw = function(ctx) {\n  ctx.clearRect(0, 0, CONSTANTS.DIM_X, CONSTANTS.DIM_Y);\n  ctx.fillStyle = \"black\";\n  ctx.fillRect(0, 0, CONSTANTS.DIM_X, CONSTANTS.DIM_Y);\n  for (let i = 0; i < this.allObjects().length; i++) {\n    const ele = this.allObjects()[i];\n    ele.draw(ctx);\n  }\n};\n\nGame.prototype.moveObjects = function() {\n  for (let i = 0; i < this.asteroids.length; i++) {\n    const ob = this.asteroids[i];\n    ob.move();\n  }\n  this.ship.move();\n};\n\nGame.prototype.wrap = function (pos) {\n  let xPos = pos[0];\n  let yPos = pos[1];\n  if (xPos >= CONSTANTS.DIM_X + CONSTANTS.BUFFER_X) {\n    xPos = -CONSTANTS.BUFFER_X;\n  } else if (xPos <= -CONSTANTS.BUFFER_X) {\n    xPos = CONSTANTS.DIM_X + CONSTANTS.BUFFER_X;\n  } else if (yPos >= CONSTANTS.DIM_Y + CONSTANTS.BUFFER_Y) {\n    yPos = -CONSTANTS.BUFFER_Y;\n  } else if (yPos <= -CONSTANTS.BUFFER_Y) {\n    yPos = CONSTANTS.DIM_Y + CONSTANTS.BUFFER_Y;\n  }\n  return [xPos, yPos];\n};\n\nGame.prototype.checkCollisions = function () {\n  for (let i = 0; i < this.allObjects().length - 1; i++) {\n    for (let j = i + 1; j < this.allObjects().length; j++) {\n      if (this.allObjects()[i].isCollidedWith(this.allObjects()[j])) {\n        this.allObjects()[i].collideWith(this.allObjects()[j]);\n        return;\n      }\n    }\n  }\n};\n\nGame.prototype.step = function () {\n  this.moveObjects();\n  this.checkCollisions();\n};\n\nGame.prototype.remove = function (obj) {\n  // this.asteroids.splice(this.asteroids.indexOf(asteroid), 1);\n  if (obj instanceof Asteroid) {\n    this.asteroids = this.asteroids.filter(el => el !== obj); //this works too\n\n  } else if (obj instanceof Bullet) {\n      this.bullets = this.bullets.filter(el => el !== obj); //this works too\n  }\n};\n\n// Game.prototype.allObjects = function () {\n//   let all = [];\n//   all = all.concat(this.asteroids);\n//   all.push(this.ship);\n//   return all;\n// };\n\nGame.prototype.allObjects = function() {\n  let all = [];\n  all = all.concat(this.asteroids);\n  all = all.concat(this.bullets);\n  all.push(this.ship);\n  return all;\n};\n\n\n\nmodule.exports = Game;\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// const Game = require(\"./game.js\");\n\nfunction GameView(game, ctx) {\n  this.game = game;\n  this.ctx = ctx;\n}\n\nGameView.prototype.bindKeyHandlers = function() {\n  // key(\"a\", () => {alert(\"hi\");});\n  // key(\"a\", this.sayHi);\n  key(\"a\", this.game.ship.powerLeft.bind(this.game.ship));\n  key(\"d\", this.game.ship.powerRight.bind(this.game.ship));\n  key(\"s\", this.game.ship.powerDown.bind(this.game.ship));\n  key(\"w\", this.game.ship.powerUp.bind(this.game.ship));\n  key(\"space\", this.game.ship.fireBullet.bind(this.game.ship));\n  // key(\"d\", this.game.ship.power([1, 0]));\n  // key(\"s\", this.game.ship.power([0, 1]));\n  // key(\"w\", this.game.ship.power([0, -1]));\n};\n\nGameView.prototype.sayHi = function () {\n  alert(\"hi\");\n};\n\nGameView.prototype.start = function () {\n  let that = this;\n  that.bindKeyHandlers();\n  const func = function () {\n    that.game.step();\n    that.game.draw(that.ctx);\n  };\n  window.setInterval(func, 20);\n};\n\nmodule.exports = GameView;\n\n//# sourceURL=webpack:///./src/game_view.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const MovingObject = __webpack_require__(/*! ./moving_object.js */ \"./src/moving_object.js\");\nconst Asteroid = __webpack_require__(/*! ./asteroid.js */ \"./src/asteroid.js\");\nconst Game = __webpack_require__(/*! ./game.js */ \"./src/game.js\");\nconst GameView = __webpack_require__(/*! ./game_view.js */ \"./src/game_view.js\");\nwindow.MovingObject = MovingObject;\nwindow.Asteroid = Asteroid;\nwindow.Game = Game;\nwindow.addEventListener(\"DOMContentLoaded\", event => {\n  const game = new Game();\n  const canvas = document.getElementById(\"game-canvas\");\n  // window.canvas = canvas;\n  const ctx = canvas.getContext(\"2d\");\n  window.ctx = ctx;\n  const gameview = new GameView(game, ctx);\n  gameview.start();\n});\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/moving_object.js":
/*!******************************!*\
  !*** ./src/moving_object.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function MovingObject (properties) {\n  this.pos = properties.pos;\n  this.vel = properties.vel;\n  this.radius = properties.radius;\n  this.color = properties.color;\n  this.game = properties.game;\n}\n\nMovingObject.prototype.draw = function (ctx) {\n  ctx.beginPath();\n  ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, false);\n  ctx.fillStyle = this.color;\n  ctx.fill();\n};\n\nMovingObject.prototype.move = function() {\n  // this.pos[0] += this.vel[0];\n  // this.pos[1] += this.vel[1];\n  // let newPos = this.game.wrap(this.pos);\n  // this.pos[0] = newPos[0];\n  // this.pos[1] = newPos[1];\n};\n\nMovingObject.prototype.isCollidedWith = function (otherObject) {\n  let xPos = this.pos[0];\n  let yPos = this.pos[1];\n  let otherXPos = otherObject.pos[0];\n  let otherYPos = otherObject.pos[1];\n  let distanceBetween = Math.sqrt(((xPos - otherXPos) * (xPos - otherXPos)) + ((yPos - otherYPos) * (yPos - otherYPos)));\n  let sumRadius = this.radius + otherObject.radius;\n  if (distanceBetween < sumRadius) {\n    return true;\n  } else {\n    return false;\n  }\n};\n\nMovingObject.prototype.collideWith = function (otherObject) {\n  \n};\n\nmodule.exports = MovingObject;\n\n\n\n//# sourceURL=webpack:///./src/moving_object.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Util = __webpack_require__(/*! ./utils.js */ \"./src/utils.js\");\nconst MovingObject = __webpack_require__(/*! ./moving_object.js */ \"./src/moving_object.js\");\nconst Bullet = __webpack_require__(/*! ./bullet.js */ \"./src/bullet.js\");\n\nfunction Ship(properties) {\n  this.RADIUS = 20;\n  this.COLOR = \"green\";\n  MovingObject.call(this, {\n    pos: properties.pos,\n    color: this.COLOR,\n    radius: this.RADIUS,\n    vel: [0, 0],\n    game: properties.game\n  });\n}\nUtil.inherits(Ship, MovingObject);\n\nShip.prototype.relocate = function () {\n  this.pos = this.game.randomPosition();\n  this.vel = [0,0];\n};\n\nShip.prototype.powerRight = function () {\n  this.vel = [this.vel[0] + 1, this.vel[1] + 0];\n  // alert(\"hi\");\n};\nShip.prototype.powerLeft = function () {\n  this.vel = [this.vel[0] + -1, this.vel[1] + 0];\n};\nShip.prototype.powerDown = function () {\n  this.vel = [this.vel[0], this.vel[1] + 1];\n};\nShip.prototype.powerUp = function () {\n  this.vel = [this.vel[0] + 0, this.vel[1] - 1];\n};\n\nShip.prototype.fireBullet = function () {\n  let bullet = new Bullet({pos: this.pos, game: this.game});\n  // alert(`${this.game.bullets}`);\n  this.game.bullets.push(bullet);\n  // alert(`${bullet.vel} ${this.vel} ${bullet.pos} ${this.pos}`);\n};\n\nShip.prototype.move = function() {\n  this.pos[0] += this.vel[0];\n  this.pos[1] += this.vel[1];\n  let newPos = this.game.wrap(this.pos);\n  this.pos[0] = newPos[0];\n  this.pos[1] = newPos[1];\n};\n\nmodule.exports = Ship;\n\n//# sourceURL=webpack:///./src/ship.js?");

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\nconst Util = {\n  inherits(childClass, parentClass) {\n    function Surrogate() {}\n    Surrogate.prototype = parentClass.prototype;\n    childClass.prototype = new Surrogate();\n    childClass.prototype.constructor = childClass;\n  },\n\n  randomVec(length) {\n    const deg = 2 * Math.PI * Math.random();\n    return Util.scale([Math.sin(deg), Math.cos(deg)], length);\n  },\n  // Scale the length of a vector by the given amount.\n  scale(vec, m) {\n    return [vec[0] * m, vec[1] * m];\n  }\n\n};\n\nmodule.exports = Util;\n\n//# sourceURL=webpack:///./src/utils.js?");

/***/ })

/******/ });
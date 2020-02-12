const Asteroid = require("./asteroid.js");
const Ship = require("./ship.js");
const Bullet = require("./bullet.js");

const CONSTANTS = {
  DIM_X: document.getElementById("game-canvas").width,
  DIM_Y: document.getElementById("game-canvas").height,
  NUM_ASTEROIDS: 2,
  BUFFER_X: 50,
  BUFFER_Y: 50
};

function Game() {
  this.asteroids = [];
  this.addAsteroids();
  let randomShipPos = this.randomPosition();
  this.ship = new Ship({pos: randomShipPos, game: this});
  this.bullets = [];
}

Game.prototype.addAsteroids = function () {
  for (let i = 0; i < CONSTANTS.NUM_ASTEROIDS; i++) {
    let randPos = this.randomPosition();
    let ast = new Asteroid({pos: randPos, game: this});
    this.asteroids.push(ast);
  }
};

Game.prototype.randomPosition = function() {
  let xPos = Math.floor(Math.random() * CONSTANTS.DIM_X);
  let yPos = Math.floor(Math.random() * CONSTANTS.DIM_Y);

  return [xPos, yPos];
};

Game.prototype.draw = function(ctx) {
  ctx.clearRect(0, 0, CONSTANTS.DIM_X, CONSTANTS.DIM_Y);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, CONSTANTS.DIM_X, CONSTANTS.DIM_Y);
  for (let i = 0; i < this.allObjects().length; i++) {
    const ele = this.allObjects()[i];
    ele.draw(ctx);
  }
};

Game.prototype.moveObjects = function() {
  for (let i = 0; i < this.asteroids.length; i++) {
    const ob = this.asteroids[i];
    ob.move();
  }
  this.ship.move();
};

Game.prototype.wrap = function (pos) {
  let xPos = pos[0];
  let yPos = pos[1];
  if (xPos >= CONSTANTS.DIM_X + CONSTANTS.BUFFER_X) {
    xPos = -CONSTANTS.BUFFER_X;
  } else if (xPos <= -CONSTANTS.BUFFER_X) {
    xPos = CONSTANTS.DIM_X + CONSTANTS.BUFFER_X;
  } else if (yPos >= CONSTANTS.DIM_Y + CONSTANTS.BUFFER_Y) {
    yPos = -CONSTANTS.BUFFER_Y;
  } else if (yPos <= -CONSTANTS.BUFFER_Y) {
    yPos = CONSTANTS.DIM_Y + CONSTANTS.BUFFER_Y;
  }
  return [xPos, yPos];
};

Game.prototype.checkCollisions = function () {
  for (let i = 0; i < this.allObjects().length - 1; i++) {
    for (let j = i + 1; j < this.allObjects().length; j++) {
      if (this.allObjects()[i].isCollidedWith(this.allObjects()[j])) {
        this.allObjects()[i].collideWith(this.allObjects()[j]);
        return;
      }
    }
  }
};

Game.prototype.step = function () {
  this.moveObjects();
  this.checkCollisions();
};

Game.prototype.remove = function (obj) {
  // this.asteroids.splice(this.asteroids.indexOf(asteroid), 1);
  if (obj instanceof Asteroid) {
    this.asteroids = this.asteroids.filter(el => el !== obj); //this works too

  } else if (obj instanceof Bullet) {
      this.bullets = this.bullets.filter(el => el !== obj); //this works too
  }
};

// Game.prototype.allObjects = function () {
//   let all = [];
//   all = all.concat(this.asteroids);
//   all.push(this.ship);
//   return all;
// };

Game.prototype.allObjects = function() {
  let all = [];
  all = all.concat(this.asteroids);
  all = all.concat(this.bullets);
  all.push(this.ship);
  return all;
};



module.exports = Game;
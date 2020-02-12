const Util = require("./utils.js");
const MovingObject = require("./moving_object.js");
const Bullet = require("./bullet.js");

function Ship(properties) {
  this.RADIUS = 20;
  this.COLOR = "green";
  MovingObject.call(this, {
    pos: properties.pos,
    color: this.COLOR,
    radius: this.RADIUS,
    vel: [0, 0],
    game: properties.game
  });
}
Util.inherits(Ship, MovingObject);

Ship.prototype.relocate = function () {
  this.pos = this.game.randomPosition();
  this.vel = [0,0];
};

Ship.prototype.powerRight = function () {
  this.vel = [this.vel[0] + 1, this.vel[1] + 0];
  // alert("hi");
};
Ship.prototype.powerLeft = function () {
  this.vel = [this.vel[0] + -1, this.vel[1] + 0];
};
Ship.prototype.powerDown = function () {
  this.vel = [this.vel[0], this.vel[1] + 1];
};
Ship.prototype.powerUp = function () {
  this.vel = [this.vel[0] + 0, this.vel[1] - 1];
};

Ship.prototype.fireBullet = function () {
  let bullet = new Bullet({pos: this.pos, game: this.game});
  // alert(`${this.game.bullets}`);
  this.game.bullets.push(bullet);
  // alert(`${bullet.vel} ${this.vel} ${bullet.pos} ${this.pos}`);
};

Ship.prototype.move = function() {
  this.pos[0] += this.vel[0];
  this.pos[1] += this.vel[1];
  let newPos = this.game.wrap(this.pos);
  this.pos[0] = newPos[0];
  this.pos[1] = newPos[1];
};

module.exports = Ship;
const Util = require("./utils.js");
const MovingObject = require("./moving_object.js");
const Ship = require("./ship.js");
const Bullet = require("./bullet.js");

function Asteroid(properties) {
  this.COLOR = "gray";
  this.RADIUS = 40;
  MovingObject.call(this, {
    pos: properties.pos,
    color: this.COLOR,
    radius: this.RADIUS,
    vel: Util.randomVec(10),
    game: properties.game
  });
}
Util.inherits(Asteroid, MovingObject);

Asteroid.prototype.collideWith = function(otherObject) {
  // alert("collision");
  if (otherObject instanceof Ship) {
    otherObject.relocate();
  } 
  else if (otherObject instanceof Bullet) {
    alert("hi");
    this.game.remove(otherObject);
    this.game.remove(this);
  }
};

Asteroid.prototype.move = function() {
  this.pos[0] += this.vel[0];
  this.pos[1] += this.vel[1];
  let newPos = this.game.wrap(this.pos);
  this.pos[0] = newPos[0];
  this.pos[1] = newPos[1];
};
module.exports = Asteroid;
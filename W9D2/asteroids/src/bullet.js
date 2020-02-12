const Util = require("./utils.js");
const MovingObject = require("./moving_object.js");
const CONSTANTS = {
  BULLET_SPEED: 40
};
function Bullet(properties) {
  this.COLOR = "red";
  this.RADIUS = 4;
  // let shipV = properties.game.ship.vel;
  // let shipXvel = shipV[0];
  // let shipYvel = shipV[1];
  // let shipVSum = Math.abs(shipXvel) + Math.abs(shipYvel);
  // let shipXperc = shipXvel / shipVSum;
  // let shipYperc = shipYvel / shipVSum;
  // let bulletXvel = CONSTANTS.BULLET_SPEED * shipXperc;
  // let bulletYvel = CONSTANTS.BULLET_SPEED * shipYperc;
  // let bulletVel = [bulletXvel, bulletYvel];
  MovingObject.call(this, {
    pos: properties.pos,
    color: this.COLOR,
    radius: this.RADIUS,
    vel: [5,5],
    game: properties.game
  });
}

Util.inherits(Bullet, MovingObject);

Bullet.prototype.move = function() {
  this.pos[0] += this.vel[0];
  this.pos[1] += this.vel[1];
};

module.exports = Bullet;
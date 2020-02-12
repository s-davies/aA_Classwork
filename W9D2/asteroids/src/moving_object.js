function MovingObject (properties) {
  this.pos = properties.pos;
  this.vel = properties.vel;
  this.radius = properties.radius;
  this.color = properties.color;
  this.game = properties.game;
}

MovingObject.prototype.draw = function (ctx) {
  ctx.beginPath();
  ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, false);
  ctx.fillStyle = this.color;
  ctx.fill();
};

MovingObject.prototype.move = function() {
  // this.pos[0] += this.vel[0];
  // this.pos[1] += this.vel[1];
  // let newPos = this.game.wrap(this.pos);
  // this.pos[0] = newPos[0];
  // this.pos[1] = newPos[1];
};

MovingObject.prototype.isCollidedWith = function (otherObject) {
  let xPos = this.pos[0];
  let yPos = this.pos[1];
  let otherXPos = otherObject.pos[0];
  let otherYPos = otherObject.pos[1];
  let distanceBetween = Math.sqrt(((xPos - otherXPos) * (xPos - otherXPos)) + ((yPos - otherYPos) * (yPos - otherYPos)));
  let sumRadius = this.radius + otherObject.radius;
  if (distanceBetween < sumRadius) {
    return true;
  } else {
    return false;
  }
};

MovingObject.prototype.collideWith = function (otherObject) {
  
};

module.exports = MovingObject;


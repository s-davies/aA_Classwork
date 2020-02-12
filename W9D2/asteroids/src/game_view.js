// const Game = require("./game.js");

function GameView(game, ctx) {
  this.game = game;
  this.ctx = ctx;
}

GameView.prototype.bindKeyHandlers = function() {
  // key("a", () => {alert("hi");});
  // key("a", this.sayHi);
  key("a", this.game.ship.powerLeft.bind(this.game.ship));
  key("d", this.game.ship.powerRight.bind(this.game.ship));
  key("s", this.game.ship.powerDown.bind(this.game.ship));
  key("w", this.game.ship.powerUp.bind(this.game.ship));
  key("space", this.game.ship.fireBullet.bind(this.game.ship));
  // key("d", this.game.ship.power([1, 0]));
  // key("s", this.game.ship.power([0, 1]));
  // key("w", this.game.ship.power([0, -1]));
};

GameView.prototype.sayHi = function () {
  alert("hi");
};

GameView.prototype.start = function () {
  let that = this;
  that.bindKeyHandlers();
  const func = function () {
    that.game.step();
    that.game.draw(that.ctx);
  };
  window.setInterval(func, 20);
};

module.exports = GameView;
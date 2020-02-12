const MovingObject = require("./moving_object.js");
const Asteroid = require("./asteroid.js");
const Game = require("./game.js");
const GameView = require("./game_view.js");
window.MovingObject = MovingObject;
window.Asteroid = Asteroid;
window.Game = Game;
window.addEventListener("DOMContentLoaded", event => {
  const game = new Game();
  const canvas = document.getElementById("game-canvas");
  // window.canvas = canvas;
  const ctx = canvas.getContext("2d");
  window.ctx = ctx;
  const gameview = new GameView(game, ctx);
  gameview.start();
});

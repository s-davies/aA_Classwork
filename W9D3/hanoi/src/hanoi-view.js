const Game = require("./game.js");

class View {
  constructor(game, $rootEl) {
    this.game = game;
    this.$rootEl = $rootEl;
    this.firstClick = null;
    this.setupTowers();
    this.render();
    this.clickTower();
  }

  setupTowers() {
    for (let i = 0; i < 3; i++) {
      const $ul = $('<ul>').attr('id', `${i}`);
      this.$rootEl.append($ul);
    }
    $('ul').first().append($('<li>').addClass('disc-1'));
    $('ul').first().append($('<li>').addClass('disc-2'));
    $('ul').first().append($('<li>').addClass('disc-3'));
    
  }

  render() {
    let towers = this.game.towers;
    $('ul').empty();
    for (let i = 0; i < 3; i++) {
      let $stack = $(`#${i}`);
      let currentArr = towers[i];
      for (let j = currentArr.length - 1; j >= 0; j--) {
          $stack.append($('<li>').addClass(`disc-${currentArr[j]}`));
      }
    }
  }

  clickTower() {
    $('ul').on('click', () => {
      if (this.game.isWon()) return;
      // console.log(event.currentTarget);
      let curClick = $(event.currentTarget).attr('id');
      if (this.firstClick === null) {
        this.firstClick = $(event.currentTarget).attr('id');
        $(event.currentTarget).css('border-bottom', '10px solid red');
      } else {
        if (this.game.isValidMove(this.firstClick, curClick)) {
          this.game.move(this.firstClick, curClick);
          this.render();
        } else {
          alert('Invalid move!');
        }
        $(`#${this.firstClick}`).css('border-bottom', '10px solid black');
        this.firstClick = null;
        if (this.game.isWon()) {
          alert('Good job, you');
          $('ul li').css('background-color', 'green');
        }
      }
    });
  }
}


module.exports = View;
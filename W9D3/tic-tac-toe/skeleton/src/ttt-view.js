class View {
  constructor(game, $ttt) {
    this.game = game;
    this.$ttt = $ttt;
    this.setupBoard();
    this.bindEvents();
  }

  bindEvents() {
    const $ul = $('.ttt-grid');
    $ul.on('click', () => {
      const pos = $(event.target).data('pos');
      const emptyPos = this.game.board.isEmptyPos(pos);
      const gameOver = this.game.isOver();
      if (gameOver) return;
      if (!emptyPos) {
        alert('Invalid move! Try again.');
        return;
      } else {
        this.game.playMove(pos);
        this.makeMove($(event.target));
      }
    });
  }

  makeMove($square) {
    const pos = $square.data('pos');
    const gameOver = this.game.isOver();
    const mark = this.game.board.grid[pos[0]][pos[1]];
    if (gameOver) {
      $square.text(mark);
      $square.css('background-color', 'white');
      let winner = this.game.winner();
      let $squares = $('.ttt-square');
      for (let i = 0; i < 9; i ++) {
        let $sq = $($squares[i])
        if ($sq.text() === winner) {
          $sq.css('color', 'white').css('background-color', 'green');
        } else {
          $sq.css('color', 'red').css('background-color', 'white');
        }

      }
      let msg;
      if (winner === null) {
        msg = "It's a draw!";
      } else {
        msg = `You win, ${winner}!`
      }
      const $body = $('body');
      const $msg = $('<p>').text(msg).css('font-size', '32px');
      $body.append($msg);
    } else {
      $square.text(mark);
      $square.css('background-color', 'white');
    }

  }

  setupBoard() {
    let $ul = $('<ul></ul>').addClass('ttt-grid');
    this.$ttt.append($ul);
    for (let i = 0; i < 9; i++) {
      let $li = $('<li></li>').addClass('ttt-square').data('pos', [i % 3, Math.floor(i/3)]);
      $ul.append($li);
    }
  }
}

module.exports = View;

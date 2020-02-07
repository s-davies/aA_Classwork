let Piece = require("./piece");

/**
 * Returns a 2D array (8 by 8) with two black pieces at [3, 4] and [4, 3]
 * and two white pieces at [3, 3] and [4, 4]
 */
function _makeGrid () {
  let x = new Array(8);

  for (var i = 0; i < x.length; i++) {
    x[i] = new Array(8);
  }

  x[3][4] = new Piece("black");
  x[4][3] = new Piece("black");
  x[3][3] = new Piece("white");
  x[4][4] = new Piece("white");
  return x;
}

/**
 * Constructs a Board with a starting grid set up.
 */
function Board () {
  this.grid = _makeGrid();
}

Board.DIRS = [
  [ 0,  1], [ 1,  1], [ 1,  0],
  [ 1, -1], [ 0, -1], [-1, -1],
  [-1,  0], [-1,  1]
];

/**
 * Returns the piece at a given [x, y] position,
 * throwing an Error if the position is invalid.
 */
Board.prototype.getPiece = function (pos) {
  let x, y;
  [x, y] = pos;
  if (!this.isValidPos(pos)) {
    throw new Error('Invalid position');
  } else {
    return this.grid[x][y];
  }
};

/**
 * Checks if there are any valid moves for the given color.
 */
Board.prototype.hasMove = function (color) {
  if (this.validMoves(color).length === 0) {
    return false;
  } else {
    return true;
  }
};

/**
 * Checks if the piece at a given position
 * matches a given color.
 */
Board.prototype.isMine = function (pos, color) {
  if (!this.isValidPos(pos) || !this.isOccupied(pos)) {
    return false;
  }
  if(this.getPiece(pos).color === color) {
    return true; 
  } else {
    return false; 
  }
};

/**
 * Checks if a given position has a piece on it.
 */
Board.prototype.isOccupied = function (pos) {
  if (!this.isValidPos(pos)) {
    return false;
  } else if (this.getPiece(pos)) {
    return true; 
  } else {
    return false;
  }
};

/**
 * Checks if both the white player and
 * the black player are out of moves.
 */
Board.prototype.isOver = function () {
  return !(this.hasMove("black") || this.hasMove("white"));
};

/**
 * Checks if a given position is on the Board.
 */
Board.prototype.isValidPos = function (pos) {
  let x, y;
  [x, y] = pos;
  if (x < 0 || y < 0 || x >= this.grid.length || y >= this.grid.length ) {
    return false;
  } else {
    return true;
  }
};

/**
 * Recursively follows a direction away from a starting position, adding each
 * piece of the opposite color until hitting another piece of the current color.
 * It then returns an array of all pieces between the starting position and
 * ending position.
 *
 * Returns null if it reaches the end of the board before finding another piece
 * of the same color.
 *
 * Returns null if it hits an empty position.
 *
 * Returns null if no pieces of the opposite color are found.
 */
function _positionsToFlip (board, pos, color) {
  let posToFlip = [];
  
  // keepFinding = true;
  // while (keepFinding) {
  //   nextPos = [startPos[0] + dir[0], startPos[1] + dir[1]];
  //   if (this.isValidPos(startPos) && this.isOccupied(nextPos) && !this.isMine(nextPos, color)) {
  //     posToFlip.push(nextPos);
  //     startPos = nextPos;
  //   } else {
  //     keepFinding = false;
  //   }
  // }
  Board.DIRS.forEach(function (dir) {
    let keepFinding;
    let startPos = pos;
    let nextPos;
    keepFinding = true;
    while (keepFinding) {
      nextPos = [startPos[0] + dir[0], startPos[1] + dir[1]];
      if (board.isValidPos(startPos) && board.isOccupied(nextPos) && !board.isMine(nextPos, color)) {
        posToFlip.push(nextPos);
        startPos = nextPos;
      } else {
        keepFinding = false;
      }
    }
  });
  // Board.DIRS.forEach(function (dir) {
  //   let keepFinding;
  //   let startPos = pos;
  //   let nextPos;
  //   keepFinding = true;
  //   while (keepFinding) {
  //     nextPos = [startPos[0] + dir[0], startPos[1] + dir[1]];
  //     if (this.isValidPos(startPos) && this.isOccupied(nextPos) && !this.isMine(nextPos, color)) {
  //       posToFlip.push(nextPos);
  //       startPos = nextPos;
  //     } else {
  //       keepFinding = false;
  //     }
  //   }
  // });
  return posToFlip;
}

/**
 * Adds a new piece of the given color to the given position, flipping the
 * color of any pieces that are eligible for flipping.
 *
 * Throws an error if the position represents an invalid move.
 */
Board.prototype.placePiece = function (pos, color) {
  // debugger
  let vMoves = this.validMoves(color).map(move => move + "");
  if (vMoves.includes((pos + ""))) {
    this.grid[pos[0]][pos[1]] = new Piece(color);
    let pFlip = _positionsToFlip(this, pos, color);
    pFlip.forEach(piece_pos => this.getPiece(piece_pos).flip());
  } else {
    throw new Error('Invalid move');
  }
};

/**
 * Prints a string representation of the Board to the console.
 */
Board.prototype.print = function () {
  // debugger
  console.log(" 0 1 2 3 4 5 6 7 ")
  this.grid.forEach(function(row) {
    let currentRowStr = " ";
    row.forEach(function(piece) {
      if (piece) {
        currentRowStr += piece.toString() + " ";
      } else {
        currentRowStr += "  ";
      }
    });
    console.log(currentRowStr);
  });
};

/**
 * Checks that a position is not already occupied and that the color
 * taking the position will result in some pieces of the opposite
 * color being flipped.
 */
Board.prototype.validMove = function (pos, color) {
  // debugger
  let self = this;
  const find = function(dir) {
    let keepFinding;
    let startPos = pos;
    let nextPos;
    keepFinding = true;
    while (keepFinding) {
      nextPos = [startPos[0] + dir[0], startPos[1] + dir[1]];
      if (self.isValidPos(startPos) && self.isOccupied(nextPos) && !self.isMine(nextPos, color)) {
        startPos = nextPos;
      } else if (self.isValidPos(startPos) && self.isOccupied(nextPos) && self.isMine(nextPos, color) && (nextPos[0] - dir[0]) === pos[0] && (nextPos[1] - dir[1]) === pos[1] ) {
        return false;
      } else if (self.isValidPos(startPos) && self.isOccupied(nextPos) && self.isMine(nextPos, color) && ((nextPos[0] - dir[0]) !== pos[0] || (nextPos[1] - dir[1]) !== pos[1])) {
        return true;
      } else {
        keepFinding = false;
        return false;
      }
    }

  };
  if (self.isValidPos(pos) && !self.isOccupied(pos)) {
    for (let i = 0; i < Board.DIRS.length; i++) {
      if (find(Board.DIRS[i]) === true) {
        return true;
      }
    }
    
  }
  return false;
};

/**
 * Produces an array of all valid positions on
 * the Board for a given color.
 */
Board.prototype.validMoves = function (color) {
  // debugger
  let validPositions = [];
  for (let i = 0; i < this.grid.length; i++) {
    for (let j = 0; j < this.grid.length; j++) {
      if (!this.isOccupied([i,j]) && this.validMove([i,j], color)) {
        validPositions.push([i,j]);
      }
    }
    
  }
  return validPositions;
};
let b = new Board();
// b.print();

module.exports = Board;

// Array.forEach(function(el) {
//   if (el ===2) {
//     break;
//     return true;
//   } else {
//     console.log(el);
//   }
// });
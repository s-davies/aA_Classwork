import React from 'react';
import {Board} from '../minesweeper';
import BoardComp from './board';
import Header from './header';

export default class Game extends React.Component {
  constructor() {
    super();
    const b = new Board(9, 10)
    this.restartGame = this.restartGame.bind(this)
    this.state = {board: b}
  }

  updateGame () {
    this.setState({ board: this.state.board })
  }

  // componentDidMount() {
  //   this.restartGame();
  // }

  restartGame() {
    debugger
    console.log("restarting")
    console.log(this);
    const c = new Board(9, 10);
    this.setState({ board: c})
    console.log(this);
  }

  // updateGame(tile, flagging) {
  //   if (flagging) {
  //     tile.toggleFlag()
  //   } else if (!tile.flagged) {
  //     tile.explore();
  //   }
  //   this.setState({ board: this.state.board })
  // }

  

  render() {
    debugger
    return (
      <div>
        <Header restart={this.restartGame}/>
        <BoardComp gameBoard={this.state.board} updateGame={this.updateGame.bind(this)} />
      </div>
    )
  }
}

// import React from 'react';
// import Tile from '../minesweeper';

// export default class TileComp extends React.Component {
//   constructor(props) {
//     super(props);
//     // debugger
//     this.state = { classes: "tile" }
//     this.tile = this.props.tileObj;
//   }

//   fillText() {
//     let claSS;
//     let insideText = "";
//     if (this.tile.flagged) {

//       insideText = '\u{1F6A9}';
//     } else if (this.tile.explored && this.tile.bombed) {
//       claSS = "revealed"
//       insideText = '\u{1F4A3}';
//     } else if (this.tile.explored && this.tile.adjacentBombCount() > 0) {
//       insideText = this.tile.adjacentBombCount().toString();
//     } else {
//       insideText = "";
//     }
//   }

//   // handleClick(e) {
//   //   let flagging;
//   //   if (e.type === 'click') {
//   //     if (!this.tile.flagged) {
//   //       this.tile.explore();
//   //       this.setState({ classes: "tile revealed" });
//   //     }
//   //   } else if (e.type === 'contextmenu') {
//   //     e.preventDefault();
//   //     this.tile.toggleFlag();
//   //   }
//   //   this.props.updateGame();
//   // }

//   handleClick(e) {
//     this.setState({ classes: "tile revealed" });
//     this.props.updateGame(this.tile, e.altKey);
//   }

//   // handleClick(e) {
//   //   let flagging;
//   //   if (e.type === 'click') {
//   //     this.setState({ classes: "tile revealed" });
//   //     flagging = false;
//   //   } else if (e.type === 'contextmenu') {
//   //     e.preventDefault();
//   //     flagging = true;
//   //   }
//   //   this.props.updateGame(this.tile, flagging);
//   // }

//   render() {
//     let claSS = "tile";
//     let insideText = "";
//     if (this.tile.flagged) {

//       insideText = '\u{1F6A9}';
//     } else if (this.tile.explored && this.tile.bombed) {
//       claSS = "tile revealed"
//       insideText = '\u{1F4A3}';
//     } else if (this.tile.explored && this.tile.adjacentBombCount() > 0) {
//       claSS = "tile revealed"
//       insideText = this.tile.adjacentBombCount().toString();
//     } else {
//       claSS = "tile"
//       insideText = "";
//     }
//     return (
//       <div className={claSS} onClick={this.handleClick.bind(this)} onContextMenu={this.handleClick.bind(this)}>
//         {insideText}
//       </div>
//     )
//   }
// }
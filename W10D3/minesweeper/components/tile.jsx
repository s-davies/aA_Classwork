import React from 'react';

export default class TileComp extends React.Component {
  constructor(props) {
    super(props);
    // debugger
    this.state = { classes: "tile"}
    this.tile = this.props.tileObj;
  }

  fillText() {
    if (this.tile.flagged) {
      return '\u{1F6A9}';
    } else if (this.tile.explored && this.tile.bombed) {
      return '\u{1F4A3}';
    } else if (this.tile.explored && this.tile.adjacentBombCount() > 0) {
      return this.tile.adjacentBombCount().toString();
    } else {
      return "";
    }
  }

  handleClick(e) {
    if (e.type === 'click') {
      if (!this.tile.flagged) {
        this.tile.explore();
        this.setState({ classes: "tile revealed" });
      }
    } else if (e.type === 'contextmenu') {
      e.preventDefault();
      this.tile.toggleFlag();
    }
    this.props.updateGame();
  }

  // handleClick(e) {
  //   let flagging;
  //   if (e.type === 'click') {
  //     this.setState({ classes: "tile revealed" });
  //     flagging = false;
  //   } else if (e.type === 'contextmenu') {
  //     e.preventDefault();
  //     flagging = true;
  //   }
  //   this.props.updateGame(this.tile, flagging);
  // }

  render() {
    // debugger
    let clss = "tile";
    let fillT = this.fillText()
    if (this.tile.explored) {
      clss = "tile revealed";
      if (this.tile.bombed) {
        clss = "tile revealed losing-bomb";
        fillT = '\u{1F4A3}';
      }
    }
    if (this.props.board.lost()) {
      // debugger
      if (this.tile.bombed && clss !== "tile revealed losing-bomb") {
        clss = "tile revealed";
        fillT = '\u{1F4A3}';
      }
    }
    return (
      <div className={clss} onClick={this.handleClick.bind(this)} onContextMenu={this.handleClick.bind(this)}>
        {fillT}
      </div>
    )
  }
}
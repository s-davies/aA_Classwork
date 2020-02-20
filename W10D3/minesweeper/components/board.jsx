import React from 'react';
import TileComp from './tile'


export default class BoardComp extends React.Component {
  constructor(props) {
    super(props);
    // debugger
  }

  render() {
    // let grid = this.props.gameBoard.grid;
    // debugger
    return (
      <div className="grid">
        {this.props.gameBoard.grid.map((row, idx) => {
          return (<div className="row" key={idx}>
            {row.map( (tile, i) => {
              return <TileComp board={this.props.gameBoard} tileObj={tile} key={i + idx} updateGame={this.props.updateGame} />
            })}
          </div>)
          
        })}
      </div>
    )
  }
}
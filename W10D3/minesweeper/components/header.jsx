import React from 'react';
import { Board } from '../minesweeper';
import Restart from './restart';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    
  }

  render() {
    return (
      <div className="header-div">
        <Restart restart={this.props.restart}/>
      </div>
    )
  }
}
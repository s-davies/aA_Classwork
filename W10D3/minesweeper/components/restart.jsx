import React from 'react';

export default class Restart extends React.Component {
  constructor(props) {
    super(props);
    this.state = { status: "\u{1F600}", cls: "restart"}
  }
  handleMouseDown(event) {
    this.setState({ status: "\u{1F61C}", cls: "restart pressed"})
  }
  handleMouseUp(event) {
    this.setState({ status: "\u{1F600}", cls: "restart"})
    
    this.props.restart();
  }

  render() {
    return (
      <div className={this.state.cls} onMouseDown={this.handleMouseDown.bind(this)} onMouseUp={this.handleMouseUp.bind(this)}>
        {this.state.status}
      </div>
    )
  }
}
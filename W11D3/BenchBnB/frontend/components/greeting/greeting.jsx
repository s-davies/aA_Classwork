import React from 'react';
import { Link } from 'react-router-dom';

class Greeting extends React.Component {
  render() {
    let display = this.props.currentUser ?
      <div>
        <h2>Welcome {this.props.currentUser.username}!</h2>
        <button onClick={this.props.logout}>Log Out</button>
      </div>
      :
      <div>
        <p><Link to="/signup">Sign Up</Link></p>
        <p><Link to="/login">Log In</Link></p>
      </div>
    return(
      display
    )
  }
}

export default Greeting;
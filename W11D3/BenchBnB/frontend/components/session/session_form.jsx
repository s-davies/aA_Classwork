import React from 'react';
import { Link } from "react-router-dom";

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.processForm(user);
  }

  render(){
    return(<div>
      <h3>{this.props.formType === "signup" ? "Sign Up" : "Log In"}</h3>
      <Link to={this.props.formType === "signup" ? "/login" : "/signup"}>{this.props.formType === "signup" ? "Log In" : "Sign Up"}</Link>
      <p>{this.props.errors.join(", ")}</p>
      <form>
        <input type="text" onChange={(e) => this.setState({username: e.target.value})} value={this.state.username}/>
        <input type="password" onChange={(e) => this.setState({password: e.target.value})} value={this.state.password}/>
        <button onClick={this.handleSubmit.bind(this)}>{this.props.formType === "signup" ? "Sign Up" : "Log In"}</button>
      </form>
    </div>)
  }
}

export default SessionForm;
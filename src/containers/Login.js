import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import Home from "./Home";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uname: "",
      password: ""
    };
  }

  validateForm() {
    return this.state.uname.length > 0 && this.state.password.length > 2;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  // redirects to the chat page with Routes help
  handleSubmit = async event => {
    event.preventDefault();

    try {
      this.props.userHasAuthenticated(true);
      this.props.history.push("/chat");
      this.props.callForUname(this.state.uname);
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <div className="Login">
        <Home />
        
        <form onSubmit={this.handleSubmit} id="loginForm">
          <FormGroup controlId="uname" bsSize="large">
            <ControlLabel>Name</ControlLabel>
            <FormControl
              autoFocus
              type="string"
              value={this.state.uname}
              onChange={this.handleChange}
            />
          </FormGroup>

          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>

          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Login
          </Button>
        </form>
      </div>
    );
  }
}
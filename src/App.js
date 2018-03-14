import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Routes from "./Routes";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      uname: ''
    };
  }

  //authentication methods
  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  callForUname = uname => {
    this.setState({ uname: uname });
  }

  //front-end part of authentication
  handleLogout = event => {
    this.userHasAuthenticated(false);
    this.props.history.push("/login");
  }

  render() {
    //props to pass to other pages
    const loginProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated,
      uname: this.state.uname,
      callForUname: this.callForUname,
      other: "Mary Jane",
    };
    
    return (
      <div className="App container">
        <Routes loginProps={loginProps} />
      </div>
    );
  }
}

export default withRouter(App);

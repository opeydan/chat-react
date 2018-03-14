import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./containers/Login";
import Chat from "./containers/Chat";
import NotFound from "./containers/NotFound";

export default ({loginProps}) =>

	<Switch>
    	<Route path="/" exact render={props => <Login {...props} {...loginProps} />}/>
    	<Route path="/chat" exact render={props => <Chat {...props} {...loginProps} />}/>
    	<Route component={NotFound} />
  	</Switch>;

  
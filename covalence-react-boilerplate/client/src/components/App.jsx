import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "./Home";
import IndividualPost from "./IndividualPost";
import EditPost from './EditPost';
import UserPage from "./UserPage";

export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/:id" component={IndividualPost}/>
          <Route exact path="/edit/:id" component={EditPost}/>
          <Route exact path="/users/:id" component={UserPage}/>
        </Switch>
      </Router>
    );
  }
}

// component={UserPage}/>
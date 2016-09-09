import React from 'react';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';

import TodoApp from 'TodoApp';
import Login from 'Login';
import firebase from 'app/firebase/';

//react router middleware for require login route, so require user to login in order to visit the page
// if they are going to the todo route it will check if they are login, if so it will get in, if not then they are going to kick back to the login page
var requireLogin = (nextState, replace, next) => {
  if (!firebase.auth().currentUser){
    replace('/');
  } // if no body login it will be null ,if someone log in will be exist, then send them back to the root of the app

  next(); // to tell the react router we are done, then we can integrate it by putting it into the onEnter props on route
};

/* middleware redirect user to the todoapp right away if logged in */
var redirectIfLogin = (nextState, replace, next) => {
  if(firebase.auth().currentUser){
    replace('/todos');
  }
  next();
};


export default (
  <Router history={hashHistory}>
    <Route path="/">
      <Route path="todos" component={TodoApp} onEnter={requireLogin}/>
      <IndexRoute component={Login} onEnter={redirectIfLogin}/>
    </Route>
  </Router>
)

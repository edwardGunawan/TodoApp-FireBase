var React = require('react');
var ReactDOM = require('react-dom');
var {Provider} = require('react-redux');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');


var TodoApp = require('TodoApp');
var actions = require('actions');
var store = require('configureStore').configure();
var TodoAPI = require('TodoAPI');


store.dispatch(actions.startAddTodos()); //use async fetches data from firebase, and then it will call add todo which will updtae the redux store and rerender the app

// Load foundation
// after includePaths in webpack config for telling the sass loader to include the file, we don't need to have it
// require('style!css!foundation-sites/dist/foundation.min.css') // we load in the css version of foundation, from this we overrider the style that we want to change
$(document).foundation();

// App css
require('style!css!sass!applicationStyles')
/* store is to provide the store that you created */
/* todoapp component and its children can access the data on the store and dispatch action */
ReactDOM.render(
  <Provider store = {store}>
    <TodoApp />
  </Provider>,
  document.getElementById('app')
);

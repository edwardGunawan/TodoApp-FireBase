var React = require('react');
var ReactDOM = require('react-dom');
var {Provider} = require('react-redux');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');


var TodoApp = require('TodoApp');

var actions = require('actions');
var store = require('configureStore').configure();
var TodoAPI = require('TodoAPI');

/* listen to changes on my store */
store.subscribe(() => {
  var state = store.getState();
  console.log('New State', state);
  TodoAPI.setTodos(state.todos); // store everything that is in the state of store to the TodoAPI setTodos function
});

var initialTodos = TodoAPI.getTodos(); // might or might not have todo item
store.dispatch(actions.addTodos(initialTodos));


// Load foundation
// after includePaths in webpack config for telling the sass loader to include the file, we don't need to have it
// require('style!css!foundation-sites/dist/foundation.min.css') // we load in the css version of foundation, from this we overrider the style that we want to change
$(document).foundation();

// App css
require('style!css!sass!applicationStyles')
/* store is to provide the store that you created */
/* todoapp component and its children can access the data on the store and dispatch action, no matter how deep is the children */
ReactDOM.render(
  <Provider store = {store}>
    <TodoApp />
  </Provider>,
  document.getElementById('app')
);

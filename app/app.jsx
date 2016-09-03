var React = require('react');
var ReactDOM = require('react-dom');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');

var TodoApp = require('TodoApp');

var actions = require('actions');
var store = require('configureStore').configure();

/* listen to changes on my store */
store.subscribe(() => {
  console.log('New State', store.getState());
});

store.dispatch(actions.addTodo('Clean the yard'));
store.dispatch(actions.setSearchText('yard'));
store.dispatch(actions.toggleShowCompleted());

// Load foundation
// after includePaths in webpack config for telling the sass loader to include the file, we don't need to have it
// require('style!css!foundation-sites/dist/foundation.min.css') // we load in the css version of foundation, from this we overrider the style that we want to change
$(document).foundation();

// App css
require('style!css!sass!applicationStyles')

ReactDOM.render(
  <TodoApp />,
  document.getElementById('app')
);

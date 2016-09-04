var redux = require('redux');
var {searchTextReducer, showCompletedReducer, todoReducer} = require('reducers');

export var configure = (initialState = {}) => {
  var reducers = redux.combineReducers({
    searchText: searchTextReducer,
    showCompleted: showCompletedReducer,
    todos: todoReducer
  });

  var store = redux.createStore(reducers, initialState, redux.compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  return store; // to pass it back and set it inside of the store variable that we created in app.jsx
}

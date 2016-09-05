import * as redux from 'redux'; // * as syntax to grab all the props and put it on the redux obj, since redux doesn't have a default import
import thunk from 'redux-thunk';

import {searchTextReducer, showCompletedReducer, todoReducer} from 'reducers';

// the initialState is the todoList.test
export var configure = (initialState = {}) => {
  // reducers for the state, pretty much like the state
  var reducers = redux.combineReducers({
    searchText: searchTextReducer,
    showCompleted: showCompletedReducer,
    todos: todoReducer
  });

  var store = redux.createStore(reducers, initialState, redux.compose( // compose all our middleware
    redux.applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  return store; // to pass it back and set it inside of the store variable that we created in app.jsx
}

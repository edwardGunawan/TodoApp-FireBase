var uuid = require('node-uuid');
var moment = require('moment');
// handling set search text action, the state in reducers is like the real state in
// react, if and when you return it you return it to the state, in what value on what the action has
// cause you, so the reducers is like a handle stage thing
export var searchTextReducer = (state='',action) => {
  switch(action.type){
    case 'SET_SEARCH_TEXT':
      return action.searchText;
    default:
      return state;
  }
}

export var showCompletedReducer = (state= false, action) => {
  switch(action.type){
    case 'TOGGLE_SHOW_COMPLETED':
      return !state;
    default:
      return state;
  }
}

// todo item for empty array
export var todoReducer = (state=[], action) => {
  switch(action.type){
    case 'ADD_TODO':
      return [
        ...state,
        {
          id:uuid(),
          text: action.text,
          completed: false,
          createdAt: moment().unix(),
          completedAt: undefined
        }
      ];
    case 'TOGGLE_TODO':
      return state.map((todo) => {
        var nextCompleted = !todo.completed;
        if(todo.id === action.id){
          return {
            ...todo,
            completed: nextCompleted,
            completedAt: (nextCompleted)? moment().unix(): undefined
          }
        } else {
          return todo;
        }
      });
    case 'ADD_TODOS': // this is in app.jsx for redux
      return [
        ...state,
        ...action.todos
      ];
    default:
      return state;
  }

}

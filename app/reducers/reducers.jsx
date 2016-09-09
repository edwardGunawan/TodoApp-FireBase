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
  // so the action will add todo from the firebase in action.todo in ADD_TODO
  switch(action.type){
    case 'ADD_TODO':
      return [
        ...state,
        action.todo
      ];
    case 'UPDATE_TODO':// the updateTodo got send here, and it loops through updating the completedAt and completed
      return state.map((todo) => {
        if(todo.id === action.id){
          return{
            ...todo,
            ...action.updates // in action.updates everything on the second will override the first, and the old props will still be there but got renew, and if there is a new one then the new props will get push in
          };
        } else {
          return todo;
        }
      });
    case 'ADD_TODOS':
      return [
        ...state,
        ...action.todos
      ];
    case 'LOGOUT':
      return [];
    default:
      return state;
  }

};

export var authReducer = (state={}, action) => {
  switch(action.type){
    case 'LOGIN':
      return {
          uid: action.uid
        };
    case 'LOGOUT':
      return {};
    default:
      return state
  }

}

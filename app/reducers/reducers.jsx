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

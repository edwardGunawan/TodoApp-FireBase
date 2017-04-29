export var setSearchText = (searchText) => {
  return {
    type: 'SET_SEARCH_TEXT',
    searchText
  };

}

export var addTodo = (text) => {
    return {
      type: "ADD_TODO",
      text
    }
  }

/* this is for local storange in app.jsx */
export var addTodos = (todos) => {
  return {
    type: "ADD_TODOS",
    todos
  }
}

  export var toggleShowCompleted = () => {
    return {
      type: 'TOGGLE_SHOW_COMPLETED'
    };
  }

  export var toggleTodo = (id) => {
    return {
      type: 'TOGGLE_TODO',
      id
    };
  }

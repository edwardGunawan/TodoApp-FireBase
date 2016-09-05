import firebase, {firebaseRef} from 'app/firebase/';
import moment from 'moment';

export var setSearchText = (searchText) => {
  return {
    type: 'SET_SEARCH_TEXT',
    searchText
  };
}

export var addTodo = (todo) => {
    return {
      type: "ADD_TODO",
      todo
    }
  }
/* save data to firebase, and after it got save to the firebase, firebase promise to chain on the test, when
firebase got updated we dispatch to get our view */
export var startAddTodo = (text) => {
  return (dispatch ,getState)=> { // dispatch some action after our data get save in this case firebase, getState, to get the current state of our redux store
    var todo = { // it is an object instead of an array because of firebase
      text,
      completed: false,
      createdAt: moment().unix(),
      completedAt: null // to remove data from firebase need to do null
    };

    var todoRef = firebaseRef.child('todos').push(todo);

    return todoRef.then(() => { // promise, so when todoRef is done, it will dispatch which update the store, and it will rerender our component adding our new todo to the browser
      dispatch(addTodo({
        ...todo,
        id: todoRef.key
      }));
    });

  };
}


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
// it returns the updateTodo
  export var updateTodo = (id,updates) => {
    return {
      type: 'UPDATE_TODO',
      id,
      updates
    };
  }

/* when toogle need to save it in the firebase */
  export var startToggleTodo= (id, completed) => {
    return (dispatch, getState) => {
      var todoRef = firebaseRef.child(`todos/${id}`); // equal 'todos/' + id

      /* set completedAt, if completed is true, we want to set completedAt, but if it is false, we want to delete it */
      var updates = {
        completed,
        completedAt: completed ? moment().unix():null
      }
      // update firebase
      return todoRef.update(updates).then(() => {
        dispatch(updateTodo(id,updates)); // it returns an updates, in which it is completed and completedAt
      });
    };
  }

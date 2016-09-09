import firebase, {firebaseRef, githubProvider} from 'app/firebase/';
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
/* fetch the data from firebase */
export var startAddTodos = () => {
  return (dispatch, getState) => {
    var todosRef = firebaseRef.child('todos');

    return todosRef.once('value').then((snapshot) => {
      // console.log('snapshot.val()' , snapshot.val()); // val() return the whole object representation of that data reference to, the key will be the key of that whole data array since it is referencing to the todos, it will be todos
      var todos = snapshot.val() || {}; // get the value
      var parseTodos = [];

      Object.keys(todos).forEach((todoId) => { // it will return the key on that object array which is the id
        parseTodos.push({
          id: todoId,
          ...todos[todoId]
        });
      });
      dispatch(addTodos(parseTodos));
    });
  }
};

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

/* log in */
  export var startLogin = () => {
    return (dispatch, getState) => {
      // start the login async actions .auth() return authentication related function, to authenticate to the github, so that the app can be used as a login , it is like when you want ot login as facebook, and facebook authenticate it(signintWithPopup)
      return firebase.auth().signInWithPopup(githubProvider).then((result) => {
        console.log('Auth Worked!', result);
      }, (error)=> {
        console.log('Unable to Auth!', error);
      })
    };
  };

  /* log out */
  export var startLogout = () => {
    return (dispatch, getState) => {
      // when sign out, it will give something to return to the screen, like success log out or something
      return firebase.auth().signOut().then(() => {
        console.log('Logged out!');
      });

    };
  };

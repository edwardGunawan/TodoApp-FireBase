var React = require('react');
var {connect} = require('react-redux');
import Todo from 'Todo'; // access to the connected version, if ES destruction will access on the pure react version
var TodoAPI = require('TodoAPI');

// just like todo, and by default we want to export the default component
export var TodoList = React.createClass({

  render: function() {
    var {todos, showCompleted, searchText} = this.props; // for searchText we only get a single value of it to later on do TodoAPI.filter, but we get all the todos array from todos
    var renderTodos = () => {
      if(todos.length === 0){
        return <p className="container__message"> Nothing To Do </p>
      }
      /* generating multiple instances of the component need to create a key prop, use internally by react to keep
      track of the individual component, but it only get the todos array which there is none searchText and showCompleted */
      return TodoAPI.filterTodos(todos,showCompleted,searchText).map((todo) => {
        return (
          <Todo key={todo.id} {...todo}/>
        );
      });
    }
    return (
      <div>
        {renderTodos()}
      </div>
    );
  }

});

/* when we are connecting we are connecting our redux store to our component element, the function pass to connect tells which
pieces of redux component that react wants to access it to */
export default connect( // make a connection and to connect it to todoList
  (state) => { // which pieces of state that the connect wanst to conenct to about, showCompleted, and id and everything
    return state;
    // {
      // state.todo is an array of todo item, to connect redux store to individual component
      // todos: state.todos // todos is going to state the props in our component, and the todoList component will have an access to the whatever state todos property is
    // };
  }
)(TodoList); // do a connection and connect it ToDoList

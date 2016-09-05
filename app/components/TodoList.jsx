var React = require('react');
var {connect} = require('react-redux');
import Todo from 'Todo'; // access to the connected version, if ES destruction will access on the pure react version
var TodoAPI = require('TodoAPI');

// just like todo, and by default we want to export the default component
export var TodoList = React.createClass({

  render: function() {
    var {todos, showCompleted, searchText} = this.props; // no props in the TodoApp that is pass down, but through redux we can pass inside the data to here

    var renderTodos = () => {
      var filteredTodos = TodoAPI.filterTodos(todos,showCompleted,searchText);

      if(filteredTodos.length === 0){
        return  <p className="container__message"> Nothing To Do </p>
      }
      /* generating multiple instances of the component need to create a key prop, use internally by react to keep
      track of the individual component, but it only get the todos array which there is none searchText and showCompleted */
      return filteredTodos.map((todo) => {
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

export default connect( // connect it to the provider, and it is connect to the store
  (state) => { // which pieces of state that the connect wanst to conenct to about, showCompleted, and id and everything
    return state; // this will get added to the props for the component
    // {
      // state.todo is an array of todo item, to connect redux store to individual component
      // todos: state.todos // todos is going to state the props in our component, and the todoList component will have an access to the whatever state todos property is
    // };
  }
)(TodoList); // do a connection and connect it ToDoList

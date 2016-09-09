var React = require('react');
import * as Redux from 'react-redux';

import TodoList from 'TodoList'; // we don't import the connectedTodoList (for specifying connected), because the unconnected version is only going to use it in the todoList test file
import AddTodo from 'AddTodo';
import TodoSearch from 'TodoSearch';
import * as actions from 'actions'


export var TodoApp = React.createClass({
  onLogout (e){
    var {dispatch} = this.props;
    e.preventDefault();


    dispatch(actions.startLogout());
  },
  render() {
    return (
      <div>
        <div className="page-action">
          <a href="#" onClick = {this.onLogout}> Logout </a>
        </div>

        <h1 className="page-title"> Todo App </h1>

        <div className="row">
          <div className="column small-centered small-11 medium-6 large-5">
            <div className="container">
              <TodoSearch/>
              <TodoList/> {/* more reusable we can put it anywhere we like */}
              <AddTodo />
            </div>
          </div>
        </div>
      </div>
    );
  }

});

export default Redux.connect()(TodoApp)

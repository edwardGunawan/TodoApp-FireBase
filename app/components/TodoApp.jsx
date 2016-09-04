var React = require('react');
var uuid = require('node-uuid');
var moment = require('moment');

import TodoList from 'TodoList'; // we don't import the connectedTodoList (for specifying connected), because the unconnected version is only going to use it in the todoList test file
import AddTodo from 'AddTodo';
var TodoSearch = require('TodoSearch');
var TodoAPI = require('TodoAPI');

var TodoApp = React.createClass({
  getInitialState: function() {
    return {
      showCompleted: false,
      searchText: '',
      todos: TodoAPI.getTodos()
    };
  },
  /* any time when we get changes from the state we set the todos */
  componentDidUpdate: function(prevState) {
    TodoAPI.setTodos(this.state.todos);
  },

  handleSearch: function(showCompleted, searchText) {
    this.setState({
      showCompleted: showCompleted,
      searchText: searchText.toLowerCase()
    });
  },


  render: function() {
    var {todos, showCompleted, searchText} = this.state;
    var filteredTodos = TodoAPI.filterTodos(todos, showCompleted, searchText);
    return (
      <div>
        <h1 className="page-title"> Todo App </h1>
        <div className="row">
          <div className="column small-centered small-11 medium-6 large-5">
            <div className="container">
              <TodoSearch onSearch={this.handleSearch}/>
              <TodoList/> {/* more reusable we can put it anywhere we like */}
              <AddTodo />
            </div>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = TodoApp;

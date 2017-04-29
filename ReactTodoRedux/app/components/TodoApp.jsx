var React = require('react');
var uuid = require('node-uuid');
var moment = require('moment');

import TodoList from 'TodoList'; // we don't import the connectedTodoList (for specifying connected), because the unconnected version is only going to use it in the todoList test file
import AddTodo from 'AddTodo';
import TodoSearch from 'TodoSearch';


var TodoApp = React.createClass({
  render: function() {
    return (
      <div>
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

module.exports = TodoApp;

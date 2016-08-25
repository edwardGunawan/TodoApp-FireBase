var React = require('react');
var uuid = require('node-uuid');

var TodoList = require('TodoList');
var AddTodo = require('AddTodo');
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

  handleAddTodo: function(text) {
    this.setState({
      todos: [
        ...this.state.todos,
        {
          id:uuid(), // generate random id, so you don't really need to have to keep track on id
          text:text,
          completed: false
        }
      ]
    });
  },

  handleToggle: function(id){
    var updatedTodos= this.state.todos.map((todo) => {
      if(todo.id === id){
        todo.completed = !todo.completed;
      }

      return todo;
    });
    this.setState({
      todos: updatedTodos
    });
  },

  render: function() {
    var {todos, showCompleted, searchText} = this.state;
    var filteredTodos = TodoAPI.filterTodos(todos, showCompleted, searchText);
    return (
      <div>
        <TodoSearch onSearch={this.handleSearch}/>
        <TodoList todos={filteredTodos} onToggle={this.handleToggle}/>
        <AddTodo onAddTodo = {this.handleAddTodo} />
      </div>
    );
  }

});

module.exports = TodoApp;

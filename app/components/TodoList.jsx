var React = require('react');
var PropTypes = React.PropTypes;
var Todo = require('Todo');

var TodoList = React.createClass({

  render: function() {
    var {todos} = this.props;
    var renderTodos = () => {
      /* generating multiple instances of the component need to create a key prop, use internally by react to keep
      track of the individual component */
      return todos.map((todo) => {
        return (
          <Todo key={todo.id} onToggle={this.props.onToggle} {...todo}/>
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

module.exports = TodoList;

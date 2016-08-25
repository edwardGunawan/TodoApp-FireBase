var React = require('react');
var moment = require('moment');

var PropTypes = React.PropTypes;

var Todo = React.createClass({

  render: function() {
    var {text, id, completed, createdAt, completedAt} = this.props;
    var todoClassName = completed ? 'todo todo-completed' : 'todo'; // add the css class to the completed todo and not completed yet
    var renderDate = () => {
      var message = 'Created ';
      var timestamp = createdAt;

      if(completed) {
        message ="Completed";
        var timestamp = completedAt;
      }

      return message + moment.unix(timestamp).format('MMM Do YYYY @ h:mm a');
    }
    return (
      <div className={todoClassName} onClick={() => {
          this.props.onToggle(id);
        }}>
        <div>
          <input type="checkbox" checked={completed}/>
        </div>
        <div>
          <p>{text} </p>
          <p className="todo__subtext"> {renderDate()} </p>
        </div>

      </div>
    );
  }

});

module.exports = Todo;

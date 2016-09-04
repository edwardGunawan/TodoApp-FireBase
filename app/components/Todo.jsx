var React = require('react');
var {connect} = require('react-redux');
var moment = require('moment');
var actions = require('actions'); // to work with our store

var PropTypes = React.PropTypes;

/* reason why we need to test the regular component around, so we can test easily without worrying about creating a store and a provider, it is not the connected one */
export var Todo = React.createClass({ // this export is going to use it in the text file, raw react component

  render: function() {
    var {text, id, completed, createdAt, completedAt, dispatch} = this.props;
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
          dispatch(actions.toggleTodo(id)); // dispatch is like doing a eventhandler
          // this.props.onToggle(id);
        }}>
        <div>
          <input type="checkbox" checked={completed}/>
        </div>
        <div>
          <p>{text}</p>
          <p className="todo__subtext"> {renderDate()} </p>
        </div>

      </div>
    );
  }

});

// export the redux component
export default connect()(Todo); // when call require() the things tht comes back on the variable is the default, means var somVar = requrie(); somVar.todo will access into todo component, the default require, and it is the connected one

// todo doesn't need the data, since data is coming from todolist, need to access to dispatch, and by using connect it is already connect as long as you es6 destruction to get it from this.props
// module.exports = connect()(Todo); // need to do todo, if the props is not pass down, since it is pass down, you don't need to
// need to export connect component

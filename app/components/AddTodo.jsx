var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');

export var AddTodo = React.createClass({

  handleSubmit: function(e){
    e.preventDefault();
    var {dispatch} = this.props; // get the dispatch
    var todoText = this.refs.todoText.value;
    if(todoText.length > 0){
      this.refs.todoText.value = "";
      dispatch(actions.startAddTodo(todoText));
    } else {
      this.refs.todoText.focus(); // put curosr back to the input filled so they can try type it again
    }
  },
  render: function() {
    return (
      <div className="container__footer"> {/* it just a way to create different componet that have children */}
        <form onSubmit= {this.handleSubmit}>
          <input type='text' ref="todoText" placeholder="What do you need to do?" />
          <button className="button expanded"> Add Todo </button>
        </form>
      </div>
    );
  }

});


export default connect()(AddTodo);

var React = require('react');
var PropTypes = React.PropTypes;

var AddTodo = React.createClass({

  handleSubmit: function(e){
    e.preventDefault();
    var todoText = this.refs.todoText.value;
    if(todoText.length > 0){
      this.refs.todoText.value = "";
      this.props.onAddTodo(todoText);
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

module.exports = AddTodo;

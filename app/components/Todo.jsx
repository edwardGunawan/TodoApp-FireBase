var React = require('react');
var PropTypes = React.PropTypes;

var Todo = React.createClass({

  render: function() {
    var {text, id, completed} = this.props;
    return (
      <div onClick={() => {
          this.props.onToggle(id);
        }}>
        <input type="checkbox" checked={completed}/>
        {text}
      </div>
    );
  }

});

module.exports = Todo;

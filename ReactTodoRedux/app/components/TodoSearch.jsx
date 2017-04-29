var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');

export var TodoSearch = React.createClass({

  render: function() {
    var {dispatch, showCompleted, searchText} = this.props; // because you put showCompleted and searchText in the conenected

// value in input, will prepopulate the searchText, can be set when application even start
    return (
      <div className="container__header">
        <div>
          <input type="search" ref="searchText" placeholder="Search todos" value={searchText} onChange={() => {
              var searchText = this.refs.searchText.value;
              dispatch(actions.setSearchText(searchText));
            }}/> {/* so everytime when the user type something it will just trigger that event */}
        </div>
        <div>
          <label>
            <input type="checkbox" ref="showCompleted" checked={showCompleted} onChange={() => {
                dispatch(actions.toggleShowCompleted());
              }}/>
            Show completed todos
          </label>
        </div>
      </div>
    );
  }

});
// tell which value we want to grab from the state, but not just empty data that is pass to the component
  // if there is no props that is passed from the parent funciton we can set the connect argument to this, so that there is a data that is passed to the component when connect to redux
  /* it is a redux way to get the props to the component, so it doesn't have to come from the parent, because any component can dispatch and changed the value of the store */
export default connect(
  (state) => { // pass all the redux value from the store to the TodoList React Component
    return {
      showCompleted: state.showCompleted,
      searchText: state.searchText
    }
  }

)(TodoSearch);

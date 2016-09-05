var React = require('React');
var ReactDOM = require('react-dom');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');
var expect = require('expect');

// var {Todo} = require('Todo'); // because we are grabbing our raw react component, not the whole Todo.jsx, becaseu we are just exporting the raw react now, which is accesable via Todo property, so we are exporting the component inside the Todo.jsx
import * as actions from 'actions';
import {Todo} from 'Todo';

describe('Todo', () => {
  it('should exist', () => {
    expect(Todo).toExist();
  });

  it('should dispatch TOGGLE_TODO action on click', () => {
    /* create an object of todo data, and then let it pass to the component and assert it */
    var todoData={
      id: 199,
      text: 'Testing features',
      completed: true
    };

    var action = actions.startToggleTodo(todoData.id, !todoData.completed);

    var spy = expect.createSpy();
    var todo = TestUtils.renderIntoDocument(<Todo {...todoData} dispatch={spy}/>); // since dispatch is getting called in Todo
    var $el = $(ReactDOM.findDOMNode(todo));

    TestUtils.Simulate.click($el[0]); // means the first element in the render

    expect(spy).toHaveBeenCalledWith(action)// since we called dispatch in dispatch (the stuff that we called is an action object
  });
});

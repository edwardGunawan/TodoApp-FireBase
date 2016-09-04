var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');
var expect = require('expect');

var {AddTodo} = require('AddTodo');

describe('AddTodo', () => {
  it('should exist', () => {
    expect(AddTodo).toExist();
  });

  it('should dispatch ADD_TODO when valid todo text', () => {
    /* create a variable first, and then create a spy and pass it into the component and see whether the
    function really get called */
    var todoTextVariable = 'Clean the trash can';
    var action = {
      type: "ADD_TODO",
      text: todoTextVariable
    }
    var spy = expect.createSpy();
    var addTodo = TestUtils.renderIntoDocument(<AddTodo dispatch = {spy}/>);
    var $el = $(ReactDOM.findDOMNode(addTodo));

    addTodo.refs.todoText.value = todoTextVariable;
    TestUtils.Simulate.submit($el.find('form')[0]);

    expect(spy).toHaveBeenCalledWith(action);
  });

  it('should not dispatch ADD_TODO when invalid todo text', () => {
    var todoTextVariable = '';
    var spy = expect.createSpy();
    var addTodo = TestUtils.renderIntoDocument(<AddTodo dispatch={spy} />);
    var $el = $(ReactDOM.findDOMNode(addTodo));

    addTodo.refs.todoText.value = todoTextVariable;
    TestUtils.Simulate.submit($el.find('form')[0]); // if we just do $el.find('form') it will failed because we passed in the jQuery selector not the DOM element

    expect(spy).toNotHaveBeenCalled();

  });
});

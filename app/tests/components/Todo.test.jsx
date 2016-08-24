var React = require('React');
var ReactDOM = require('react-dom');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');
var expect = require('expect');

var Todo = require('Todo');

describe('Todo', () => {
  it('should exist', () => {
    expect(Todo).toExist();
  });

  it('should call onToggle props with id onClick', () => {
    /* create an object of todo data, and then let it pass to the component and assert it */
    var todoData={
      id: 199,
      text: 'Testing features',
      completed: true
    };

    var spy = expect.createSpy();
    var todo = TestUtils.renderIntoDocument(<Todo {...todoData} onToggle={spy}/>);
    var $el = $(ReactDOM.findDOMNode(todo));

    TestUtils.Simulate.click($el[0]); // means the first element in the render

    expect(spy).toHaveBeenCalledWith(199);
  });
});

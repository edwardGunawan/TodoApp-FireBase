var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jQuery');
var expect = require('expect');
var TestUtils = require('react-addons-test-utils');

var TodoList = require('TodoList');
var Todo = require('Todo');

describe('TodoList', () => {
  it('should exist', () => {
    expect(TodoList).toExist();
  });

  it('should render one todo component for each todo item', () => {
    var todos = [{
      id: 1,
      text: 'do something'
    },{
      id: 2,
      text: 'do something2'
    }];
    var todoList = TestUtils.renderIntoDocument(<TodoList todos={todos}/>);
    /* let us check how many of the given component are render under a separate component,
    in this case, we want to check, how many todo component are render under our todolist component
    1 para, item you want to check, 2 para class of the item that you want to look for. What we will get, the return
    value is the array of components.
    Check if the array length is the same as the array length of the todos array, if 7 todo item in our array, means there is
    7 todos item */
    var todosComponents = TestUtils.scryRenderedComponentsWithType(todoList,Todo);

    expect(todosComponents.length).toBe(todos.length)

  });
});

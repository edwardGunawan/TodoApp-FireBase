var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jQuery');
var {Provider} = require('react-redux');
var expect = require('expect');
var TestUtils = require('react-addons-test-utils');

// to make it for connected version, pulled configure out of the configure storenot just the whole configureStore
import {configure} from 'configureStore';
import ConnectedTodoList, {TodoList} from 'TodoList' // add the connectedTodoList and the unconnected one, which is the ES destructoring
import ConnectedTodo, {Todo} from 'Todo';

describe('TodoList', () => {
  it('should exist', () => {
    expect(TodoList).toExist();
  });

  it('should render one todo component for each todo item', () => {
    var todos = [{
      id: 1,
      text: 'do something',
      completed: false,
      completedAt: undefined,
      createdAt: 500
    },{
      id: 2,
      text: 'do something2',
      completed: false,
      completedAt: undefined,
      createdAt: 500
    }];
    // get the store from configure, and set the initial state to the todos
    var store = configure({
      todos,
    });

    /* pass down to the provider instance on the ConnectedTodoList component, so we have to connected the TodoList props and everything through the provider, so when getting the instance you have to connected to the provider first */
    var provider = TestUtils.renderIntoDocument(
      <Provider store={store}>
        <ConnectedTodoList/>
      </Provider>
    ); // we don't need to pass down any props to ConnectedTodoList because it get data in need from store

    var todoList = TestUtils.scryRenderedComponentsWithType(provider, ConnectedTodoList)[0]; // only created 1 from above so only 1 instance
    /* let us check how many of the given component are render under a separate component,
    in this case, we want to check, how many todo component are render under our todolist component
    1 para, item you want to check, 2 para class of the item that you want to look for. What we will get, the return
    value is the array of components.
    Check if the array length is the same as the array length of the todos array, if 7 todo item in our array, means there is
    7 todos item */
    var todosComponents = TestUtils.scryRenderedComponentsWithType(todoList,ConnectedTodo); // that is why we imported ConnectedTodo

    expect(todosComponents.length).toBe(todos.length)

  });

  it('should render empty message if no todo', () => {
    var todos =[];
    var todoList = TestUtils.renderIntoDocument(<TodoList todos={todos}/>)
    var $el = $(ReactDOM.findDOMNode(todoList));

    expect($el.find('.container__message').length).toBe(1);
  });
});

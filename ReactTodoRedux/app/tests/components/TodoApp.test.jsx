var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jQuery');
var {Provider} = require('react-redux');
var expect = require('expect');
var TestUtils = require('react-addons-test-utils');

var configureStore = require('configureStore');
import TodoList from 'TodoList';
var TodoApp = require('TodoApp');

describe('TodoApp', () => {
  it('should exist',() => {
      expect(TodoApp).toExist();
  });

  /* whether todoLIst component got completely render, by taking the todoApp from the provider passing down all the store,
  then from todoApp find the todoList, and see how many todo list component is render inside TodoApp */
  it('should render TodoList', () => {
    // make store
    var store = configureStore.configure();
    var provider = TestUtils.renderIntoDocument(
      <Provider store={store}>
        <TodoApp/>
      </Provider>
    );

    var todoApp = TestUtils.scryRenderedComponentsWithType(provider, TodoApp)[0];
    var todoList = TestUtils.scryRenderedComponentsWithType(todoApp, TodoList);

    expect(todoList.length).toEqual(1); // less than 1 todoList never render, more than 1 is a problem since we only specify 1

  });

});

var expect = require('expect');

var TodoAPI = require('TodoAPI');

describe('TodoAPI', () =>{

  beforeEach(() => {
    localStorage.removeItem('todos');
  }); // it gets called before every test

  it('should exist', () => {
    expect(TodoAPI).toExist();
  });

  describe('setTodo', () => {
    it('should set valid todos array', () => {
      var todos =[{
        id: 23,
        text: 'test all files',
        completed: false
      }];
      TodoAPI.setTodos(todos);

      var actualTodos = JSON.parse(localStorage.getItem('todos'));

      /* toBe: checks if they are the same object and array in the memory, and toEqual just compare the value on them */
      expect(actualTodos).toEqual(todos); // working with object and array, it is better to use toEqual, compare the value on them
    });

    it('should not pass invalid todos array', () => {
      var badTodos = {a:'a'};
      TodoAPI.setTodos(badTodos);

      /* should expect a null object from the todos array */
      expect(localStorage.getItem('todos')).toEqual(null);

    });

  });

  describe('getTodo', () => {
    it('should return an empty array for bad localStorage data', () => {
      var actualTodos = TodoAPI.getTodos();
      expect(actualTodos).toEqual([]);
    });

    it('should return todos if a valid array in localStorage', () => {
      var todos =[{
        id: 23,
        text: 'test all files',
        completed: false
      }];

      localStorage.setItem('todos', JSON.stringify(todos)); // its clearer to not add setTodos, so you don't have any relationship if one test failed and the other
      var actualTodos = TodoAPI.getTodos(); // prove that getTodos works when there is a valid data in the storage
      expect(actualTodos).toEqual(todos)
    });

  });
});

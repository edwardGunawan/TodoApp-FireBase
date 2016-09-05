var expect = require('expect');

var TodoAPI = require('TodoAPI');

describe('TodoAPI', () =>{

  beforeEach(() => {
    localStorage.removeItem('todos');
  }); // it gets called before every test

  it('should exist', () => {
    expect(TodoAPI).toExist();
  });

  

  describe('filterTodos', () => {
    var todos = [{
      id:1,
      text:'little bit text here',
      completed: true
    },
    {
      id:2,
      text:'no text here',
      completed: false
    },
    {
      id:3,
      text:'some text here',
      completed: true
    }];

    it('should return all items if showCompleted is true', () => {
      var filteredTodos = TodoAPI.filterTodos(todos, true, '');
      expect(filteredTodos.length).toBe(3);
    });

    it('should return non-completed todos when showCompleted is false', () => {
      var filteredTodos = TodoAPI.filterTodos(todos,false,'');
      expect(filteredTodos.length).toBe(1);
    });

    it('should sort by completed status', () => {
      var filteredTodos = TodoAPI.filterTodos(todos, true, '');
      expect(filteredTodos[0].completed).toBe(false);
    });

    it('should filter todos by search Text', () => {
      var searchText = 'some';
      var filteredTodos = TodoAPI.filterTodos(todos, true, searchText);
      expect(filteredTodos.length).toBe(1);

    });

    it('should return all todos if search text is empty', () => {
      var filteredTodos = TodoAPI.filterTodos(todos, true,'');
      expect(filteredTodos.length).toBe(3);
    });

  });
});

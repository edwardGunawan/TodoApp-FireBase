var expect = require('expect');
var df = require('deep-freeze-strict'); // to test pure function, so any modification to the action or state or any attribute it will throw an error

var reducers = require('reducers');

describe('Reducers', () => {
  describe('searchTextReducer', () => {
    it('should set searchText', () => {
      var action = {
        type: "SET_SEARCH_TEXT",
        searchText: 'dog'
      };

      var res = reducers.searchTextReducer(df(''), df(action)); // through passing any of the og state it will failed

      expect(res).toEqual(action.searchText);
    });
  });

  describe('showCompletedReducer', ()=> {
    it('should toggle showCompleted', () => {
      var action = {
        type: 'TOGGLE_SHOW_COMPLETED'
      };

      var res = reducers.showCompletedReducer(df(false),df(action));

      expect(res).toEqual(true);
    })
  });

  describe('todoReducer', () => {
    it('should add new todo', () => {
      var action = {
        type: "ADD_TODO",
        todo : {
          id: 'abc123',
          text: 'something to do',
          completed: false,
          createdAt: 92384256
        }
      };

      var res = reducers.todoReducer(df([]), df(action)); // because it returns an array so it is checking for the array

      expect(res.length).toEqual(1);
      expect(res[0]).toEqual(action.todo);
    });

    it('should toggle todo', () => {
      var state = [
        {
          id: 1,
          text: 'something',
          completed: true,
          createdAt: 2,
          completedAt: 234
        }
      ];
      var action = {
        type:'TOGGLE_TODO',
        id:1
      }
      var res = reducers.todoReducer(df(state), df(action));

      expect(res[0].completed).toBe(false);
      expect(res[0].completedAt).toNotExist();
      // or expect(res[0].completedAt).toEqual(undefined);

    })
  });

  it('should add existing todos', ()=> {
    var todos =[
      {
        id: 123,
        text: 'something',
        completedAt: false,
        createdAt: 123,
        completedAt: undefined
      }
    ];

    // create action
    var action = {
      type: "ADD_TODOS",
      todos
    }

    var res = reducers.todoReducer(df([]),df(action));

    expect(res.length).toEqual(1);
    expect(res[0]).toEqual(todos[0]);
  });
});

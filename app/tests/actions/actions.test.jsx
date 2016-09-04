var expect = require('expect');
var actions = require('actions');

describe('Actions', () => {

  /* creating an action first, and then after call the actions.serSearchText from the
  actions, and see whether it is the same or not */
  it('should generate search text function', () => {
    var action= {
      type: 'SET_SEARCH_TEXT',
      searchText: 'some search text'
    };

    var res = actions.setSearchText(action.searchText); // the one that got return is an action object so it needs to have the whole object

    expect(res).toEqual(action)
  });

  it('should generate add todo action', ()=> {
    var action ={
      type:'ADD_TODO',
      text:'texting'
    };

    var res = actions.addTodo(action.text);

    expect(res).toEqual(action);
  });

  it('should generate add todos action object', () => {
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

    // put the actions addTodos function in action and pass it into action.todos
    var res = actions.addTodos(action.todos);

    // it should return the same value as action object above
    expect(res).toEqual(action);

  });

  it('should generate toggle show completed action', () => {
    var action = {
      type: 'TOGGLE_SHOW_COMPLETED'
    };

    var res = actions.toggleShowCompleted();

    expect(res).toEqual(action);
  });

  it('should generate toggle show todo', ()=>{
    var action ={
      type: 'TOGGLE_TODO',
      id: 2
    };

    var res = actions.toggleTodo(action.id);

    expect(res).toEqual(action);
  });
});

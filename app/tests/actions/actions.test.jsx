import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
var expect = require('expect');

var actions = require('actions');

var createMockStore = configureMockStore([thunk]); // can be use inside of these test, it will be a generator to generate as many distinct store as you like


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
      todo : {
        id: 123,
        text: 'something',
        completedAt: false,
        createdAt: 123
      }
    };

    var res = actions.addTodo(action.todo);

    expect(res).toEqual(action);
  });

  it('should create todo and DISPATCH_ADDTODO', (done) => {
    const store = createMockStore({}); // empty store
    const todoText = 'my todo item';

    /* once the action is complete then the action will show up inside the mockStory,
    if it does than the property looks great and we call done () */
    store.dispatch(actions.startAddTodo(todoText)).then(() => {
      const actions = store.getActions(); // return an array of all actions that is on our mock store, in this case it is only 1 action
      expect(actions[0]).toInclude({
        type: 'ADD_TODO' // this is not going to fail if it doesn't match up perfectly as long as there is this type
      }); // same as toEqual
      expect(actions[0].todo).toInclude({ // in the property of actions[0] in todo props
        text: todoText
      });
      done();
    }).catch(done); // call it to the firebase
  });

  it('should generate add todos action object', () => {

    // create action
    var action = {
      type: 'ADD_TODOS',
      todos
    };

    var todos = [{
      id: '111',
      text: 'anything',
      completed: false,
      completedAt: undefined,
      createdAt: 33000
    }];

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

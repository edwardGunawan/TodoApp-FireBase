import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
var expect = require('expect');

import firebase, {firebaseRef} from 'app/firebase/';
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

 it('should generate udpate todo action', () => {
   var action = {
     type: 'UPDATE_TODO',
     id: '123',
     updates: {completed: false}
   };
   var res = actions.updateTodo(action.id,action.updates);

   expect(res).toEqual(action);
 });

 it('should generate login actions', () => {
   var action = {
     type: 'LOGIN',
     uid: 123
   };

   var res = actions.login(action.uid);

   expect(res).toEqual(action);
 });

 it('should generate logout actions', () => {
   var action = {
     type: 'LOGOUT'
   };

   var res = actions.logout();
   expect(res).toEqual(action);
 });

 describe('Tests with firebase todos', () => {
   var testTodoRef;

   /* beforeEach is available inside mocha, it lets us defined the code to run before every test, we can use this code to set up test suite, means we be adding some data to firebase, it can take done function when its done because async code */
   beforeEach((done)=>{
     var todosRef = firebaseRef.child('todos');
     todosRef.remove().then(()=>{
       testTodoRef = firebaseRef.child('todos').push();
       return testTodoRef.set({
         text:'Something to do',
         completed: false,
         createdAt: 2323232323
       });
     }).then(() => done())
     .catch(done); // means it calls on done so that the asyn is done
   });

   /* after the test, all item will ve removed */
   afterEach((done)=>{
     testTodoRef.remove().then(()=>done()); // to remove every item in database, so that it doesn't get overwhelm
   });

   it('should toggle todo and dispatch UPDATE_TODO action', (done) =>{
     const store = createMockStore({});
     const action = actions.startToggleTodo(testTodoRef.key, true); // get the value of startToggleTodo

     store.dispatch(action).then(()=>{
       const mockActions = store.getActions({});

       /* expect for the mockActions the action to be type UPDATE_TODO, and the id is the same as testTodoRef.key */
       expect(mockActions[0]).toInclude({
         type: 'UPDATE_TODO',
         id: testTodoRef.key
       });
       /* props inside mockActions to true */
       expect(mockActions[0].updates).toInclude({
         completed: true
       });
       expect(mockActions[0].updates.completedAt).toExist();

       done();
     },done);
   });

   it('should populate todos and dispatch ADD_TODOS' , (done) => {
     const store = createMockStore({});
     const action = actions.startAddTodos();

       store.dispatch(action).then(()=>{ // going to firebase and fetching todos
         const mockActions = store.getActions();

         /* of all the actions that is pass into the MockStore, the 1st one which is addTodos, and it has a type and a todos array */
         expect(mockActions[0].type).toEqual('ADD_TODOS');
         expect(mockActions[0].todos.length).toEqual(1);
         expect(mockActions[0].todos[0].text).toEqual('Something to do')
         done();
       },done);
   });
 });


});

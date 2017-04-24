var React = require('react');
var ReactDOM = require('react-dom');
var {Provider} = require('react-redux');
var {hashHistory} = require('react-router');



import TodoApp from 'TodoApp';
var actions = require('actions');
var store = require('configureStore').configure();
import Login from 'Login'; // if using export default, import, if require won't work
import firebase from 'app/firebase/';
import router from 'app/router/';




// redirect on login and logout, call to the firebase method, and get a call back if status changes
firebase.auth().onAuthStateChanged((user)=>{ // will get called everytime state changed, will get called with the user argument, if user argument present someone log in, else someone log out
  if(user){
    store.dispatch(actions.login(user.uid));
    // before startAddTodos is called outside, before the user login, the the redux dev tools are able to see the todos that is stored in the array, because it is get called over here if user login
    store.dispatch(actions.startAddTodos()); //use async fetches data from firebase, and then it will call add todo which will updtae the redux store and rerender the app, only grab the startAddTodos on the todo that is mentioned in uuid
    hashHistory.push('/todos'); // update the url if user exist, it is the history that we chosen in our router, redirected after user is login
  } else {
    store.dispatch(actions.logout()); // it calls here when it is logged out, so you don't have to call it inside the startLogout in action
    // push them back to the login, or the root directory, if someone log out
    hashHistory.push('/');
  }
});



// Load foundation
// after includePaths in webpack config for telling the sass loader to include the file, we don't need to have it
// require('style!css!foundation-sites/dist/css/foundation.min.css') // we load in the css version of foundation, from this we overrider the style that we want to change
$(document).foundation();

// App css
require('style!css!sass!applicationStyles')


/* store is to provide the store that you created */
// put router in app/router/ and put it inside here to make the code more clean
/* todoapp component and its children can access the data on the store and dispatch action */
ReactDOM.render(
  <Provider store = {store}>
    {router}
  </Provider>,
  document.getElementById('app')
);

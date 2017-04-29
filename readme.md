# TrackMe

---------------------

## TodoApp pass the array to TodoList, and TodoList will render multiple Todos.

...todo: pass down every attribute to an object, in this case is id and text, so you don't
have to explicitly create the props everything. (spread operator) it let us spread out all the attribute
in todos will get pass out as a props, so id will have its own props, and text will have its own props.


All presentation component for test: render the component through testUtils, and see whether the user interaction works
properly.


putting it in localStorange:
* addItem
* setItem
* removeItem
we put it into a separate file, so that later on when we change anything about fetching data,
we don't need to do any changes to any of the components


momment: library that very easy to add timestamps and dates to your application


Using Redux in react:
* TodoApp passing handler -> TodoList passing handler -> todo
* if we use redux we can get rid of all those dependencies and call back function,
instead todoLIst said that I need an array, then the todo can call dispatch without needing call handler getting pass down from parent
* provider: provide your store to your children, so the children component that is 2 deep, can still get the store

* dispatch, it is like a handler function:  is to pass the action to the store, and the store will use the reducer to change the state
  * it is a function that takes argument, it gets added when we pass the component through connect. If we are not using connect
  which we don't in the test, it can be simple pass as a prop.
* reducer: responsible for computing new version of the state, so inside the reducer there will always be a state and an action
* action is the value that is being passed on to the reducer to change the state, or can said the value that is needed to be changed in the state


export default, and just exporting a regular component.
* we use var export Todo component is the none connected version is a name-export like "Todo" or "TodoList", but the connected version of the
export will be the default export the overall export
* The reason we used export is that we need to export both the raw component and the reduxified version of the component
* export default is the default require that you will use, and for export default connected()(Todo) means it export the connected version of the Todo component
* if we are using export default we have to do import in order to work


## Using firebase:
* www.firebase.google.com
Database -> Rules -> read and write true, means other are able to access the database, database are able to edit by anyone even if they are not authenticated
orange on the data in database: root reference -> change
green on new data was added to our database



/* ------------- Putting firebase into React --------------- */
it is not a good way to put press on addTodo and then it will call the firebase set, because, react should just do purely rendering the component,
* putting call inside of our component is not a great way to do things. React component should only worry about rendering themselves, and responding user input in very generic way

what we want to do :
* have react component dispatch something that knows how to work with firebase.

* we can also put firebase into reducer, but reducer could only be pure function, but async js call is not pure
* so the place that firebase calls will be put is in the action.jsx,
  * create a new type of action generator, to do some work, like add data to firebase, then dispatch action update what the user see
thunk : middleware (can config), special way to config middleware in our store file, to use it as calling async function, because right now all action only return an object
* with think we can return some action of function instead of object so that we can call some async code


* putting firebase into api.jsx:
export var startAddTodo = (text) => {
    return (dispatch, getState) => {

        TodoAPI.addTodo(text).then((todo)=>{
            dispatch(addTodo(todo));
        });
    }
};



## Create our own environment variable:
Better to remove all credential to environment variable.
Set up env variable locally and for development and test.
Specify environment variable locally on module node-env-file@0.1.8

only doing test.env and development.env not adding any file on production since it got configure at heroku
what do we want to store on these files?
we want to store everything require to get this information. API key, off domain, URL, and a store bucket

test.env: store environment variable for our test environment // then = shouldn't have any space
development.env: store the environment variable for the development
----------------------------------
Steps on getting the separate database:
* Create 2 new project: 1 development and 1 for testing(the new credential got copied on test.env)
* Copy the credential specific to firebase, to "Add Firebase to your web app", and store all the API_KEY credentials to the test.env and development.env
* In index.js, we have to tweak our file to use the test.env and development.env credentials
* Note: process var is not exist in browser, it is a node specific thing,
  we have to think how to take the env var pass it to webpack --> pass it to the bundle file (Do it in webpack Where you install the module is for node-env-file)
* the reason is that so when we run the test and the development it will be in different database, and for credentials, it won't be shown in the productions(heroku)
* we have environment variable, that specify different databases depending on where we deploying our app
* we also need to ignore the config from git so that the public won't know it, and it will decrease all the credential making the app more secure

Heroku for environment variable, to hide the credential:
* heroku config : return all existing variable that your app has
* create the variable: heroku config:set name="Your first name" ( no space between config:set or config:unset =sign for creating the variable and between variable will also need to be no space)
* this is what we want to do to all the credential in firebase
* remove variable: heroku config:unset variableName
  Example: heroku config:set STORAGE_BUCKET=todo-app-912f5.appspot.com
* when it successfully deployed, we can add the authorized domain to our firebase app, to be used for appropriate database

* when want to deploy production app to any environment, you will need environment variable to manage various databases.


setUp github login, or social login with github/facebook/any provider and logout for the todoApp:
* Oauth applications: authorized app--> app that you authorized with github Developer app--> app that you created
* go to developer app --> set up all the links, and last Authorization Callback URL --> from firebase console: auth-> sign in method (this is all options user can sign in to the firebase) --> way bottom has authorization url and paste it to github authorization callback URL
* Register application (our app is up and running in github )
* Login using our app --> clientID, and client secret, same thing with Twitter and facebook
* tell firebase that we need to authenticate with github, under certain circumstances


firebase security:
* set up the rules on the firebase: rules, to false means anyone can't accept someone in the console to updating the data,
  we want to do is conditionally set up the read and write on what the object should be secure and what is accessed by everyone.
  ex:
    {
    "rules": {
      "users":{ // this is where all users are able to access
      ".read": "auth !== null",
      ".write": "auth !== null", // you have to be authenticated to manage any data
      	"$user_id":{ // this is based on their user_id variable
        	".read": "$user_id === auth.uid", // setting conditional if they are able to see it or modified it
            ".write": "$user_id === auth.uid"

      	}
      }
    }
  }
  auth.uid : unique for every user in firebase

adding authentication through firebase through our test:
  personal token: personal access token file to let us authenticate without doing anything but calling a new method
 * it will generate a string and this string is what we need to authenticate inside our test




* Require is equal to export default, if you export more than 1 thing it will be in the object of the require
 Let imagine we have the following library file:

// myLib.js
export default 'My default value';
export var otherProp = 'Some non-default value';
This library get imported by calling require inside of app.js:

// app.js
var myLib = require('./myLib.js');
console.log('myLib', myLib);
The question is, what's stored in the myLib variable defined in app.js? It would be the following:

{
  "default": "My default value",
  "otherProp": "Some non-default value"
}
Here we have access to named exports like otherProp , and our default export via the default  property. We're not limited in anyway.


import firebase from 'firebase';
  try{ // if we did not put try and catch firebase will want to initialized it a couple times, so we just want it to initialized it once
    var config = {
      apiKey: "AIzaSyCK0INNbs3aZdOrQmmRB-POdzn6bWZIdWw",
      authDomain: "edward-todo-app.firebaseapp.com",
      databaseURL: "https://edward-todo-app.firebaseio.com",
      storageBucket: "edward-todo-app.appspot.com",
    };
    firebase.initializeApp(config);
  } catch(e){

  }

  export var firebaseRef = firebase.database().ref();

  export default firebase; // clean up any file that import this file, so they only need to import the firebase config instead of importing the firebase module on top

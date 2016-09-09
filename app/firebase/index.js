import firebase from 'firebase';
  try{ // if we did not put try and catch firebase will want to initialized it a couple times, so we just want it to initialized it once
    var config = {
      apiKey: process.env.API_KEY, // to tweak it to the env file
      authDomain: process.env.AUTH_DOMAIN,
      databaseURL: process.env.DATABASE_URL,
      storageBucket: process.env.STORAGE_BUCKET,
    };
    firebase.initializeApp(config);
  } catch(e){

  }

  export var firebaseRef = firebase.database().ref();

  export default firebase; // clean up any file that import this file, so they only need to import the firebase config instead of importing the firebase module on top

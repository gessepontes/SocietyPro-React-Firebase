import firebase from 'firebase';
import 'firebase/auth';

const FirebaseConfig = {
    apiKey: "AIzaSyCkGfF0JWp7hfIhn5kWNbWcS7o6Gt2u-ms",
    authDomain: "societypro-1375.firebaseapp.com",
    databaseURL: "https://societypro-1375.firebaseio.com",
    projectId: "societypro-1375",
    storageBucket: "societypro-1375.appspot.com",
    messagingSenderId: "773475838516"
};

firebase.initializeApp(FirebaseConfig)
export const database = firebase.database();
export const auth  = firebase.auth();

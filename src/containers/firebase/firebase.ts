import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDl_JDj55Os4kz2a3iiISkWpC4Jcthc2RI',
  authDomain: 'auth.printandframeit.com',
  databaseURL: 'https://print-and-frame-it.firebaseio.com',
  projectId: 'print-and-frame-it',
  storageBucket: 'print-and-frame-it.appspot.com',
  messagingSenderId: '901827911626',
  appId: '1:901827911626:web:0cfb3a8aa8b7a003cab933',
  measurementId: 'G-JZV5D559SR',
};
// Initialize Firebase
export const initFirebase = firebase.initializeApp(firebaseConfig);
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();

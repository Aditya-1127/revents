import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA441QHa8qWLpD_noXQkig2yYGhG9avUzY",
  authDomain: "reventscourse-4c867.firebaseapp.com",
  projectId: "reventscourse-4c867",
  storageBucket: "reventscourse-4c867.appspot.com",
  messagingSenderId: "393099099231",
  appId: "1:393099099231:web:05a8dc10433b36c707afea",
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;

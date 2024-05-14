 import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from 'firebase/firestore';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCedMIBZoUCKvjHFdhALXlCFStjgwwMolU",
    authDomain: "jessatl-f636d.firebaseapp.com",
    projectId: "jessatl-f636d",
    storageBucket: "jessatl-f636d.appspot.com",
    messagingSenderId: "499817249307",
    appId: "1:499817249307:web:6596b9e9433faf481856be",
    measurementId: "G-02X13MXP90"
  };
  
  // Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP)

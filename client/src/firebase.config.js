// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAWMvJFLuvuHdh347G5JbLM7BEEWfuOZLY",
  authDomain: "musicrentsellstore.firebaseapp.com",
  projectId: "musicrentsellstore",
  storageBucket: "musicrentsellstore.appspot.com",
  messagingSenderId: "79208602118",
  appId: "1:79208602118:web:cb06a8ab3eef71a5efc187",
  measurementId: "G-8MSJFBCGF3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

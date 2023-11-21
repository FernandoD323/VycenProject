'use strict'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDEGjG1lVGagd_2QkPL4YUIk8ekjeiY6L0",
  authDomain: "v7c3n-cont.firebaseapp.com",
  projectId: "v7c3n-cont",
  storageBucket: "v7c3n-cont.appspot.com",
  messagingSenderId: "577179081114",
  appId: "1:577179081114:web:174df4ff70292f9e64c223",
  measurementId: "G-VBFGZCRKMJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
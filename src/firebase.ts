import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA2FGzVIaVK4vn4Y72rEXuOiUnOBnckplU",
  authDomain: "project-mvc-b6ea7.firebaseapp.com",
  projectId: "project-mvc-b6ea7",
  storageBucket: "project-mvc-b6ea7.appspot.com",
  messagingSenderId: "110399007167",
  appId: "1:110399007167:web:af9c7355a592506670590a",
  measurementId: "G-WVLF8CFTSF",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const Storage = firebase.storage();

import firebase from "firebase/compat/app";
import 'firebase/compat/database'

const firebaseConfig = {
  apiKey: "AIzaSyBmRARAZJwbEhhpEoc40_DX4pDeJcCgGOU",
  authDomain: "menu-9adb7.firebaseapp.com",
  databaseURL: "https://menu-9adb7-default-rtdb.firebaseio.com/",
  projectId: "menu-9adb7",
  storageBucket: "menu-9adb7.appspot.com",
  messagingSenderId: "533835739359",
  appId: "1:533835739359:web:11715a832bb6514654396a"
};


const fireDb = firebase.initializeApp(firebaseConfig);
export default fireDb.database().ref();
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCNrAmqJljdiyuu-_qq1kj5T15w1FoxPzM",
  authDomain: "crud-for-menu.firebaseapp.com",
  projectId: "crud-for-menu",
  storageBucket: "crud-for-menu.appspot.com",
  messagingSenderId: "529077570024",
  appId: "1:529077570024:web:30b88480bfa7470873bc5d",
  measurementId: "G-NLD56CT5EV"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getDatabase(app)
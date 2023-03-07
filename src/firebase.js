import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCcn1xuVVY_dddnnC9OlrFcrXsYF-eJAHs",
  authDomain: "todo-app-test1.firebaseapp.com",
  projectId: "todo-app-test1",
  storageBucket: "todo-app-test1.appspot.com",
  messagingSenderId: "627550253395",
  appId: "1:627550253395:web:d67f1c3c4478ea2bf5f1a6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
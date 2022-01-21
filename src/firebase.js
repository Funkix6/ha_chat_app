import firebase from "firebase/app";
import "firebase/auth";

export const auth = firebase.initializeApp({
    apiKey: "AIzaSyBK0NO5Ea9gkn-YI0sbPHuZetGE-7bW_h0",
    authDomain: "chat-application-f4e74.firebaseapp.com",
    projectId: "chat-application-f4e74",
    storageBucket: "chat-application-f4e74.appspot.com",
    messagingSenderId: "144630837221",
    appId: "1:144630837221:web:cad92f2c1819c89b82890c"
  }).auth();
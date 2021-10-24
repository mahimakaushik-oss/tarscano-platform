import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyA0S6BQc7WXCUn1TGedNkPD791TQeibUko",
  authDomain: "mytarscano.firebaseapp.com",
  projectId: "mytarscano",
  storageBucket: "mytarscano.appspot.com",
  messagingSenderId: "827860013540",
  appId: "1:827860013540:web:943b68fba9dcf75326b7f1"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const fs = firebase.firestore();
const storage = firebase.storage();

export {auth,fs,storage}
// FIREBASE SDK CONFIG
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDp9nPrjUjhVwrUYAUYg3d6B8UxFGy5TIk",
  authDomain: "spotter-8eaff.firebaseapp.com",
  projectId: "spotter-8eaff",
  storageBucket: "spotter-8eaff.appspot.com",
  messagingSenderId: "1085645488811",
  appId: "1:1085645488811:web:623f069be421c1b2b3adee"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const firestore = getFirestore(app);
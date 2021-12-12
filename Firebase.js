// FIREBASE SDK CONFIG
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC98flPHNxCKCi2Sq3oxKJ4kVdeApkwR3c",
  authDomain: "spotter-8eaff.firebaseapp.com",
  projectId: "spotter-8eaff",
  storageBucket: "spotter-8eaff.appspot.com",
  messagingSenderId: "1085645488811",
  appId: "1:1085645488811:web:8df48123b1031911b3adee"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const firestore = getFirestore(app);
export const auth = getAuth(app);
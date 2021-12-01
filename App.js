import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';



// FIREBASE SDK CONFIG
import { initializeApp } from "firebase/app";
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
const app = initializeApp(firebaseConfig);



export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

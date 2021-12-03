import 'react-native-gesture-handler';
import React from 'react';
// Navigation
import Navigator from './navigation/Navigator';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


// Screens
import CreateStepOne from './screens/CreateStepOne';
import CreateStepTwo from './screens/CreateStepTwo';

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


// Stack navigator
const Stack = createStackNavigator();


export default function App() {
  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName="Navigator" >
        <Stack.Screen name="Navigator" component={Navigator} options={{headerShown: false}} />
        <Stack.Screen name="Post" component={CreateStepOne} />
        <Stack.Screen name="Save" component={CreateStepTwo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


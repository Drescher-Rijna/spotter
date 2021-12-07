import 'react-native-gesture-handler';
import React from 'react';

// Navigation
import Navigator from './navigation/Navigator';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import CreateStepTwo from './screens/CreateStepTwo';
import CreateStepOne from './screens/CreateStepOne';


// Stack navigator
const Stack = createStackNavigator();


export default function App() {
  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName="Navigator" >
        <Stack.Screen name="Navigator" component={Navigator} options={{headerShown: false}} />
        <Stack.Screen name="Post" component={CreateStepOne} />
        <Stack.Screen name="Submit" component={CreateStepTwo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


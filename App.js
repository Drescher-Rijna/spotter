import 'react-native-gesture-handler';
import React from 'react';

// Navigation
import Navigator from './navigation/Navigator';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import CreateStepTwo from './screens/CreateStepTwo';
import CreateStepOne from './screens/CreateStepOne';
import SpotDetails from './components/SpotDetails';
import Authenticate from './screens/Authenticate';
import { auth } from './Firebase';
import { useState } from 'react/cjs/react.development';


// Stack navigator
const Stack = createStackNavigator();


export default function App() {

  const [initialRouteName, setInitialRouteName] = useState('Auth');

  if (auth.currentUser) {
    setInitialRouteName('Navigator')
  } else {
    setInitialRouteName('Auth')
  }

  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName={initialRouteName} >
        <Stack.Screen name="Navigator" component={Navigator} options={{headerShown: false}} />
        <Stack.Screen name="Post" component={CreateStepOne} />
        <Stack.Screen name="Submit" component={CreateStepTwo} />
        <Stack.Screen name="Details" component={SpotDetails} />
        <Stack.Screen name="Auth" component={Authenticate} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


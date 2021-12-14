import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { auth } from './Firebase';

// Navigation
import Navigator from './navigation/Navigator';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import CreateStepTwo from './screens/CreateStepTwo';
import CreateStepOne from './screens/CreateStepOne';
import SpotDetails from './components/SpotDetails';
import Authenticate from './screens/Authenticate';
import Home from './screens/Home';


// Redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './redux/reducers';
import thunk from 'redux-thunk';
import { Text, View } from 'react-native';
import SpotPreview from './components/SpotPreview';
const store = createStore(rootReducer, applyMiddleware(thunk));

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

// Stack navigator
const Stack = createStackNavigator();

export class App extends Component {
  constructor(props) {
    super()
    this.state = {
      loaded: false,
    }
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true,
        })
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        })
      }
    })
  }
  render() {
    const { loggedIn, loaded } = this.state;
    if (!loaded) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={{textAlign: 'center', fontSize: 28,}}>Loading...</Text>
        </View>
      )
    }

    if (!loggedIn) {
      return (
        <Authenticate />
      );
    }

    return (
      <Provider store={store}>
        <NavigationContainer >
          <Stack.Navigator initialRouteName="Navigator" >
            <Stack.Screen name="Navigator" component={Navigator} options={{headerShown: false}} />
            <Stack.Screen name="Post" component={CreateStepOne} />
            <Stack.Screen name="Submit" component={CreateStepTwo} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Details" component={SpotDetails} />
            <Stack.Screen name="Preview" component={SpotPreview} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    )
  }
}

export default App



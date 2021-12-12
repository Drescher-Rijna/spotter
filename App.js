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



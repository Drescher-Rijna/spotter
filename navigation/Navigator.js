import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons';
import React from 'react'
import Home from '../screens/Home';
import Profile from '../screens/Profile';

const Tab = createBottomTabNavigator();
const Empty = () => null;

export default function Navigator() {
    return (
        <Tab.Navigator initialRouteName="Home" >
            <Tab.Screen name="Home" component={Home}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" color={color} size={26} />
                    )
                }}
            />
            <Tab.Screen name="Create" component={Empty}
                listeners={({ navigation }) => ({
                    tabPress: event => {
                        event.preventDefault();
                        navigation.navigate("Post");
                    }
                })}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="add" color={color} size={26} />
                    )
                }}
            
            />
            <Tab.Screen name="Profile" component={Profile}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person" color={color} size={26} />
                    )
                }}
            />
        </Tab.Navigator>
    )
}


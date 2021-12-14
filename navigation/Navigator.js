import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons';
import React, { Component } from 'react'
import Home from '../screens/Home';
import Profile from '../screens/Profile';

//redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser, fetchPosts } from '../redux/actions/index'; 

const Tab = createBottomTabNavigator();
const Empty = () => {
    return (null);
}

export class Navigator extends Component {
    componentDidMount() {
        this.props.fetchUser();
        this.props.fetchPosts();
    }
    
    render() {
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
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    currentUserLike: store.userState.currentUserLike
})
const mapDispatchProps = (dispatch) => bindActionCreators({ fetchUser, fetchPosts }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Navigator);

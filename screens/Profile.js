import { signOut } from '@firebase/auth'
import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { auth } from '../Firebase'

export default function Profile() {
    return (
        <View style={{flex: 1}}>
            <Text>Profile</Text>
            <Button title="Log out" onPress={() => signOut(auth)} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})


import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

export default function Home() {
    return (
        <View style={styles.container}>
            <Text>Home</Text>
        <Image source={{uri: "https://firebasestorage.googleapis.com/v0/b/spotter-8eaff.appspot.com/o/524c1297-ff0d-472a-8d9a-37b9f225a226.jpg?alt=media&token=64af73d5-99f6-4f43-9648-aff50e33b730"}} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})

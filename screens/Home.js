import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

export default function Home() {
    return (
        <View style={styles.container}>
            <Text>Home</Text>
        <Image style={{width: "100%", height: 360}} source={{uri: 'https://firebasestorage.googleapis.com/v0/b/spotter-8eaff.appspot.com/o/def787b3-fedb-4e2b-a455-8dabcbe39b83.jpg?alt=media&token=3e5e0625-b967-408d-ab48-8bac4eeb3b70'}} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})

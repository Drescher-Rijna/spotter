import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { firestore } from '../Firebase'
import { collection } from '@firebase/firestore';

export default function Home() {

    const dbRef = collection(firestore, 'posts');
    // get snapshot of posts in order of timestamp descending

    return (
        <View style={styles.container}>
            {/* map data and render the template */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})

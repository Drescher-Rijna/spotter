import { collection, onSnapshot } from '@firebase/firestore';
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { useEffect, useState } from 'react/cjs/react.development';
import SpotPreview from '../components/SpotPreview';
import { firestore } from '../Firebase'

export default function Home({navigation}) {
    const [posts, setPosts] = useState([]);

    const dbRef = collection(firestore, 'posts');
    // get snapshot of posts in order of timestamp descending
    useEffect(() => {
        onSnapshot(dbRef, (snapshot) => 
            setPosts(snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()})))
        )
    }, [])

    return (
        <View style={styles.container}>
            {/* map data and render the template */}
            {posts.map((post) => (
                <SpotPreview key={post.id} title={post.title} category={post.category} location={post.location} image={post.image} id={post.id} navigation={navigation} />
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})

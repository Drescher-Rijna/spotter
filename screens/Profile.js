import { signOut } from '@firebase/auth'
import { collection, doc, getDoc, getDocs, query, where } from '@firebase/firestore'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native'
import SpotPreview from '../components/SpotPreview'
import { auth, firestore } from '../Firebase'
import { useAuth } from '../services/Auth'

export default function Profile({navigation}) {
    const currentUser = useAuth();
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [likes, setLikes] = useState([]);

    useEffect(async () => {
        console.log('come on')
        const dbRef = collection(firestore, 'posts');
        const querySnapshot = await getDocs(dbRef);
        const results = querySnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}))

        results.forEach(async (result) => {
            console.log(result.id)
           const qRef = collection(firestore, 'posts', result.id, 'likes');
           try {
                await getDocs(query(qRef, where('id', '==', auth.currentUser.uid))).then(async (snapshots) => {
                    await setPosts(snapshots.docs.map((doc) => ({id: doc.id, ...doc.data()})))
               })
           } catch(e) {
                console.log(e)
           }
           
           
           console.log('data ' + posts)
        })
       
    },[])


    return (
        <View style={{flex: 1}}>
            <View style={styles.profileInfo}>
                <View style={styles.info}>
                    <Text>Brugernavn:</Text>
                    <Text>{user ? user.username : 'waiting...'}</Text>

                    <Text>Email:</Text>
                    <Text>{user ? user.email : 'waiting...'}</Text>
                </View>

                <View style={styles.action}>
                    <Button title="Log out" onPress={() => signOut(auth)} />
                </View>
            </View>

            <View style={styles.feed}>
                {posts ?
                    <ScrollView>
                        {posts.map((post) => (
                            <SpotPreview key={post.id} title={post.title} category={post.category} location={post.location} image={post.image} id={post.id} navigation={navigation} />
                        ))}
                    </ScrollView> 
                    
                    : 
                    
                    <View style={{flex: 1, justifyContent: "center", alignItems: "center", alignContent: "center"}}>
                        <Text>No result could be found</Text>
                    </View>
                    
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    profileInfo: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginVertical: 25,
    },
    feed: {
        borderTopWidth: 1,
        borderColor: '#c3c3c3',
    }
})


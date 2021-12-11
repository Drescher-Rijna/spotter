import { signOut } from '@firebase/auth'
import { collection, doc, getDoc, getDocs, query, where } from '@firebase/firestore'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native'
import SpotPreview from '../components/SpotPreview'
import { auth, firestore } from '../Firebase'

export default function Profile({navigation}) {
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState(null);

    

    useEffect(async() => {
        setPosts(null);
        const unsubscribe = navigation.addListener('focus', async() => {
            
            const userDocRef = doc(firestore, 'users', auth.currentUser.uid)
            const userRef = await getDoc(userDocRef);
            setUser(userRef.data());

            const dbRef = collection(firestore, 'posts');
            const querySnapshot = await getDocs(dbRef);
            const results = querySnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}))

            const postsDataList = posts;

            results.forEach(async (result) => {
            const qRef = collection(firestore, 'posts', result.id, 'likes');
                
            try {
                    await getDocs(query(qRef, where('id', '==', auth.currentUser.uid))).then((snapshots) => {
                        const likedResult = snapshots.docs.map((doc) => ({id: doc.id, ...doc.data()}))

                        likedResult.forEach(async (item) => {
                            
                            const likedPostsRef = doc(firestore, 'posts', item.postID);
                            const likedPostData = await getDoc(likedPostsRef);
                            console.log(likedPostData.data())
                            
                            postsDataList.push({ id: likedPostData.id, ...likedPostData.data()});
                            
                        })
                        
                })

                setPosts(postsDataList);
                        console.log(posts)
                
            } catch(e) {
                    console.log(e)
            }

            })
        });
    
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
      }, [navigation]);


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
                        <Text>No liked spots</Text>
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


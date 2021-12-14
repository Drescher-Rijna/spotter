import { signOut } from '@firebase/auth'
import { collection, doc, getDoc, getDocs, orderBy, query, where } from '@firebase/firestore'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Button, ScrollView, FlatList } from 'react-native'
import { connect } from 'react-redux'
import SpotPreview from '../components/SpotPreview'
import { auth, firestore } from '../Firebase'

function Profile(props) {
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState(null);

    

    useEffect(async() => {
        const userDocRef = doc(firestore, 'users', auth.currentUser.uid)
            const userRef = await getDoc(userDocRef);
            setUser(userRef.data());

        const likesDocRef = collection(firestore, 'posts')
        try {

            const querySnapshot = await getDocs(query(likesDocRef, where('likes', 'array-contains', auth.currentUser.uid), orderBy('uploadTime', 'desc')));
            await setPosts(querySnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()})))
            console.log(posts)
        } catch (e) {
            console.log(e);
        }   

      }, []);

      const renderLoader = () => {
        return (
            <View>
                <ActivityIndicator size='large' color='#aaa' style={{marginVertical: 16, alignItems: 'center'}} />
            </View>
        )
    }
    const loadMoreItem = () => {
        console.log('loading more')
    }


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
                    <FlatList 
                        data={posts}
                        renderItem={({ item }) => (
                            <SpotPreview post={item} navigation={props.navigation} />
                        )}
                        
                        ListFooterComponent={posts.length > 3 ? renderLoader : null}
                        onEndReached={posts.length > 3 ? loadMoreItem : null}
                        onEndReachedThreshold={0}
                        
                    />
                    
                    : 
                    
                    <View style={{flex: 1, justifyContent: "center", alignItems: "center", alignContent: "center"}}>
                        <Text>No liked spots</Text>
                    </View>
                    
                }
            </View>
        </View>
    )
}

const mapStateToProps = (store) => ({
    feed: store.usersState.feed,
})

export default connect(mapStateToProps, null)(Profile);

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


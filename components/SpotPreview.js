import React, { useState, useEffect } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { likePost, unlikePost, useDB } from '../services/Database';
import { doc, getDoc } from '@firebase/firestore';
import { auth, firestore } from '../Firebase';

const SpotPreview = ({title, category, location, image, id, navigation}) => {
    // State for like button
    const [likeColor, setLikeColor] = useState('black');
    const [likeIcon, setLikeIcon] = useState('heart-outline');
    const [liked, setLiked] = useState(false);

    const goToDetails = (id) => {
        console.log(id);
        navigation.navigate('Details', {
            id: id,
        });   
    }

    const handleLike = () => {
        if (liked) {
            setLikeIcon('heart-outline')
            setLikeColor('black')
            setLiked(false);
            unlikePost(id, auth.currentUser.uid)
        } else {
            setLikeIcon('heart')
            setLikeColor('red')
            setLiked(true);
            likePost(id, auth.currentUser.uid);
        }
    }


    useEffect(async() => {
        console.log('come on')
        const docRef = doc(firestore, 'posts', id, 'likes', auth.currentUser.uid)
        const result = await getDoc(docRef).then((doc) => {
            console.log(doc.exists)
            if (doc.exists) {
                setLiked(doc.data().liked)
                setLikeColor('red')
                setLikeIcon('heart')
            } else {
                setLiked(false)
                setLikeColor('black')
                setLikeIcon('heart-outline')
            }

            console.log(liked)
        });
        
        return () => result();
    },[liked])

    return (
        <TouchableOpacity onPress={() => goToDetails(id)} >
            <View style={styles.container}>
                <Image style={styles.image} source={{uri: image}} />
                <View style={styles.infoCon}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.location}>{location}</Text>
                    <Text style={styles.category}>Passer til: {category}</Text>
                </View>
                <Ionicons style={{marginRight: 10, marginTop: 7}} name={likeIcon} color={likeColor} size={24} onPress={() => handleLike()} />
            </View>
        </TouchableOpacity>
    )
}

export default SpotPreview

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: 'white',
        marginHorizontal: 10,
        marginVertical: 20,
        borderRadius: 7,
    },
    infoCon: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
        justifyContent: 'center'
    },  
    title: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    category: {

    },
    location: {

    },
    image: {
        width: 150,
        height: 150,
        borderTopLeftRadius: 7,
        borderBottomLeftRadius: 7,
    }
})


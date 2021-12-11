import { doc, getDoc } from '@firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { likePost, unlikePost} from '../services/Database';
import { auth, firestore } from '../Firebase';
import { Ionicons } from '@expo/vector-icons';

const SpotDetails = ({ route, navigation }) => {
    // id
    const { id } = route.params;
    
    // State for like button
    const [likeColor, setLikeColor] = useState('black');
    const [likeIcon, setLikeIcon] = useState('heart-outline');
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState([]);

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

    const handleLikes = async () => {
        const db = doc(firestore, 'users', auth.currentUser.uid)
        const docRef = await getDoc(db);

        if (docRef.exists) {
            setLikes(docRef.data())
            if (likes.likes.length > 0) {
                for (let item of likes.likes) {
                    console.log(item)
                    console.log(id)
                    if (item === id) {
                        setLiked(true);
                        console.log(liked)
    

                        setLikeIcon('heart')
                        setLikeColor('red')

                        
                        console.log(likeColor)
                    }
    
                }
    
            }
        }
    }

    const [details, setDetails] = useState({});

    useEffect(async () => {
        const docRef = doc(firestore, 'posts', id);
        const docSnap = await getDoc(docRef);
        console.log(docSnap.data())

        setDetails(docSnap.data());

        await handleLikes();
    }, [id])

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={{uri: details.image}} />
            <View style={styles.infoCon}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Text style={styles.title}>{details.title}</Text>
                    <Ionicons name={likeIcon} color={likeColor} size={28} onPress={() => handleLike()} />
                </View>
                <Text style={styles.location}>{details.location}</Text>
                <Text style={styles.category}>Passer til: {details.category}</Text>
                <Text style={styles.descriptionTitle}>Beskrivelse:</Text>
                <Text style={styles.description}>{details.description}</Text>
            </View>
        </View>
    )
}

export default SpotDetails

const styles = StyleSheet.create({
    container: {
        
    },
    infoCon: {
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    image: {
        height: 360,
        width: '100%',
    },  
    title: {
        fontWeight: 'bold',
        fontSize: 26,
        paddingVertical: 5,
    },
    location: {
        fontSize: 16,
        paddingVertical: 5,
    },
    category: {
       paddingVertical: 5,
       color: 'black'
    },
    descriptionTitle: {
        fontSize: 18,
        fontWeight: '700',
        paddingTop: 5,
        color: 'black'
    },  
    description: {
        fontSize: 16,
        paddingBottom: 5,
    }

})


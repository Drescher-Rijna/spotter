import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const SpotPreview = ({title, category, location, image, id, navigation}) => {

    const goToDetails = (id) => {
        console.log(id);
        navigation.navigate('Details', {
            id: id,
        });   
    }

    return (
        <TouchableOpacity onPress={() => goToDetails(id)} >
            <View style={styles.container}>
                <Image style={styles.image} source={{uri: image}} />
                <View style={styles.infoCon}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.location}>{location}</Text>
                    <Text style={styles.category}>Passer til: {category}</Text>
                </View>
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


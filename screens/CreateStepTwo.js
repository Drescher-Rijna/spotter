import React, { useEffect, useState } from 'react'
import { Button, Dimensions, Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import * as Location from 'expo-location';
import { RadioButton } from 'react-native-paper';
// mapview and google maps
import MapView, { Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
// Firebase storage and firestore
import { firestore, storage } from '../Firebase';
import { getDownloadURL, ref, uploadBytesResumable } from '@firebase/storage';
import { addDoc, collection, Timestamp, updateDoc, doc, getDoc } from '@firebase/firestore';


export default function CreateStepTwo(props) {
    // Location states
    const [address, setAddress] = useState(null);
    const [coordinates, setCoordinates] = useState({latitude: 0, longitude: 0});

    //Form fields state
    const [titleInput, setTitleInput] = useState('');
    const [descriptionInput, setDescriptionInput] = useState('');
    const [locationInput, setLocationInput] = useState('');
    const [categoryInput, setCategoryInput] = useState('');
    const [progress, setProgress] = useState(null);

    // Modal state
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(async () => {
            // Tilladelse om brug af GPS
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Tilladelse til GPS lokation er ikke givet');
            return;
            }

            // Få fat i nuværende position hvis der er givet tilladelse
            let location = await Location.getCurrentPositionAsync({});
            
            // Brug af koordinaterne af lokationen til at få adressen
            let response = await Location.reverseGeocodeAsync({ latitude: location.coords.latitude, longitude: location.coords.longitude });
        
            // Loop gennem adressens data til at lave en string, hvor adressen er formatteret gade, nummer, postnummer, by
            for (let item of response) {
                let resultAddress = `${item.street} ${item.name}, ${item.postalCode} ${item.city}`;
                
                // Sæt adressen til en state
                setAddress(resultAddress);
                setLocationInput(resultAddress)
            }

            setCoordinates({latitude: location.coords.latitude, longitude: location.coords.longitude});
        
    }, []);
    

    // submittion function
    const handleSubmit = async () => {
        // File path and name for storage and firestore
        const uploadUri = props.route.params.image;
        console.log(uploadUri)
        let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

        // upload to storage
        const storageRef = ref(storage, `/${filename}`);
        
        // Using blob to make sure the image actually gets stored correcly through XML
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
              resolve(xhr.response);
            };
            xhr.onerror = function (e) {
              console.log(e);
              reject(new TypeError("Network request failed"));
            };
            xhr.responseType = "blob";
            xhr.open("GET", uploadUri, true);
            xhr.send(null);
        });

        // upload task
        const uploadTask = uploadBytesResumable(storageRef, blob);

        //UPLOADING TASK INITIATES + FIRESTORE
        try {
            uploadTask.on(
                "state_changed", 
                (snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes ) * 100);
                // progress state
                setProgress(progress);
                },
                (err) => console.log(err),
                async () => {
                    await getDownloadURL(uploadTask.snapshot.ref).
                    then(async (url) => {
                        console.log('url: ' + url)
                        // WRITE TO FIRESTORE
                        const dbRef = collection(firestore, 'posts');
                        const postData = {
                            title: titleInput,
                            description: descriptionInput,
                            category: categoryInput,
                            location: locationInput,
                            image: url,
                            uploadTime: Timestamp.now(),
                            
                        }

                        try {
                            console.log('image: ' + postData.image)
                            await addDoc(dbRef, postData).then(async (document) => {
                                console.log(document.id)
                                const docRef = doc(firestore, 'posts', document.id)
                                await updateDoc(docRef, { id: document.id});
                            }).then(() => {
                                setProgress(null);
                                props.navigation.navigate('Hjem');
                            });
                        } catch (e) {
                            console.log(e);
                        }
                    });
                    
                }
            );
        } catch (e) {
            console.log(e);
        }
        

    }
    

    return (
        <View style={styles.container}>
            {/* BILLED FRA FØRHENVÆRENDE STEP */}
            <Image style={styles.imagePrev} source={{ uri: props.route.params.image }} />
            
            {/* FORM MED LOKATION INFO */}
            
                    <ScrollView style={styles.formCon}>
                        {/* TITEL */}
                        <Text style={styles.label} >Spot name & description</Text>
                        <TextInput 
                            style={styles.inputFields}
                            placeholder='Spot name'
                            value={titleInput}
                            onChangeText={val => {setTitleInput(val); console.log(val);}}
                        />

                        {/* BESKRIVELSE */}
                        <TextInput
                            style={styles.textArea}
                            placeholder='Describe the spot...'
                            value={descriptionInput}
                            multiline={true}
                            onChangeText={val => {setDescriptionInput(val); console.log(val);}}
                        />

                        {/* LOKATION*/}
                        <View style={styles.locationInput}>
                            <Text style={styles.label}>Lokation</Text>
                            <View style={{flexDirection: 'row'}}>
                                <TextInput 
                                    style={{flex: 0.7}}
                                    placeholder='Lokation'
                                    value={locationInput}
                                    editable={false}
                                />
                                <TouchableOpacity style={{backgroundColor: 'red', flex: 0.3}} onPress={() => {setModalOpen(true)}}>
                                    <Text style={{textAlign: 'center', fontWeight: 'bold', color: 'white', textAlignVertical: 'center'}} >New location</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        

                        {/* KATEGORI */}
                        <Text style={styles.label} >Category</Text>
                        <View style={styles.categoryInput}>
                            <RadioButton.Group value={categoryInput} onValueChange={(val) => {setCategoryInput(val)}}>
                                <View style={{flexDirection: 'row', justifyContent: 'space-around' }}>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}} >
                                        <Text>Park</Text>
                                        <RadioButton value="Park" />
                                    </View>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}} >
                                        <Text>Street</Text>
                                        <RadioButton value="Street" />
                                    </View>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}} >
                                        <Text>Hybrid</Text>
                                        <RadioButton value="Hybrid" />
                                    </View>
                                </View>
                            </RadioButton.Group>
                        </View>
                        
                        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit} >
                            <Text style={styles.submitText}>
                                {progress ? progress + '%' : 'Post'}
                            </Text>
                        </TouchableOpacity>
                    </ScrollView>
                
            {/* Modal for typing in a new location other than the users current location */}
            <Modal visible={modalOpen} >
                <View style={{flex: 1}}>
                    <GooglePlacesAutocomplete
                        placeholder="Search"
                        fetchDetails={true}
                        GooglePlacesSearchQuery={{
                            rankby: "distance"
                        }}
                        query={{
                            key: "AIzaSyC98flPHNxCKCi2Sq3oxKJ4kVdeApkwR3c",
                            language: "da",
                            components: "country:dk",
                            location: address
                        }}
                        onFail={(error) => console.error(error)}
                        onPress={(data, details = null) => {
                            // 'details' er givet når fetchDetails er true
                            setCoordinates({
                                latitude: details.geometry.location.lat,
                                longitude: details.geometry.location.lng,
                            })
                        }}
                        styles={{
                            container: { flex: 0, position: "absolute", width: "100%", zIndex: 5, borderRadius: 0 },
                            listView: { backgroundColor: "white", zIndex: 5 }
                        }}
                    />

                    <View style={{zIndex: 3, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10, marginTop: 55, marginBottom: 10}}>
                        <Button title="Tilbage" onPress={() => setModalOpen(false)} />
                        {/* Når de trykker bekræft skal de nye koordinater give en ny adresse som skal sættes i useState */}
                        <Button title="Bekræft" onPress={async() => {
                                // få den nye adresse
                                let result = await Location.reverseGeocodeAsync({latitude: coordinates.latitude, longitude: coordinates.longitude});
                                // loop gennem adresse data og lav en string til adressen som sættes til useState
                                for (let item of result) {
                                    let resultLocation = `${item.street} ${item.name}, ${item.postalCode} ${item.city}`;
                                    
                                    setLocationInput(resultLocation);
                                }
                                // Luk modallen
                                setModalOpen(false);
                            }} 
                        />
                    </View>

                    <MapView
                        style={styles.map}
                        initialRegion={{
                            longitude: coordinates.longitude, 
                            latitude: coordinates.latitude, 
                            longitudeDelta: 0.0421, 
                            latitudeDelta: 0.0922
                        }}
                        region={{
                            longitude: coordinates.longitude, 
                            latitude: coordinates.latitude, 
                            longitudeDelta: 0.0121, 
                            latitudeDelta: 0.0122
                        }}
                        key="AIzaSyC98flPHNxCKCi2Sq3oxKJ4kVdeApkwR3c"
                    >
                        <Marker coordinate={coordinates} />
                    </MapView>
		        </View>
                
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    formCon: {
        flex: 1,
        marginVertical: 15,
        marginHorizontal: 10,
    },
    inputFields: {
        padding: 5,
    },
    textArea: {
        paddingBottom: 100,
        paddingTop: 5,
        paddingLeft: 5,
        paddingRight: 5,
        borderBottomColor: 'grey',
        borderTopColor: 'grey',
        borderBottomWidth: 1,
        borderTopWidth: 1,
    },
    locationInput: {
        padding: 5,
        paddingBottom: 10,
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        paddingTop: 0,
    },
    categoryInput: {
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        paddingBottom: 10,
        paddingHorizontal: 5,
    },
    label: {
        fontSize: 15,
        fontWeight: 'bold',
        paddingTop: 10,
    },
    submitBtn: {
        width: 200,
        marginTop: 10,
        alignSelf: 'center',
        backgroundColor: 'black',
        padding: 10,
    },
    submitText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 18
    },  
    imagePrev: {
        flex: 0.95
    },
    map: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
    }
})


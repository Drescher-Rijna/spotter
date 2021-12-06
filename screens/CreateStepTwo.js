import { Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Button, Dimensions, Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import * as Location from 'expo-location';
import { RadioButton } from 'react-native-paper';
import MapView, { Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default function CreateStepTwo(props) {
    const [location, setLocation] = useState(null);
    const [address, setAddress] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [coordinates, setCoordinates] = useState({latitude: 0, longitude: 0});

    // Modal state
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(async () => {
            //PERMISSION REQUEST
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
            return;
            }

            // GETTING LOCATION IF GRANTED
            let location = await Location.getCurrentPositionAsync({});
            console.log('coords');
            console.log(location.coords.longitudeDelta);
            
            
            // USING COORDINATES TO GET ADDRESS DATA
            let response = await Location.reverseGeocodeAsync({ latitude: location.coords.latitude, longitude: location.coords.longitude });
            setLocation(response);
            

            // LOOP THROUGH ADRESS DATA TO WRITE IT OUT IN SPECIFIC WAY
            for (let item of response) {
                let resultAddress = `${item.street} ${item.name}, ${item.postalCode} ${item.city}`;
                
                // SET THE ADDRESS TO A STATE
                setAddress(resultAddress);
            }

            setCoordinates({latitude: location.coords.latitude, longitude: location.coords.longitude});
            console.log('2');
            console.log(coordinates);
        
    }, []);

    let userLocation = 'Waiting..';
    if (errorMsg) {
        userLocation = errorMsg;
    } else if (address) {
        userLocation = address;
    }
    useEffect(() => {
        
        if (errorMsg) {
            userLocation = errorMsg;
        } else if (address) {
            userLocation = address;
            console.log(userLocation);
        }
    }, [address])

    // USING STATE ON VARIABLE WITH IF CHECK
    

    return (
        <View style={styles.container}>
            {/* IMAGE FROM PREVIOUS STEP */}
            <Image style={styles.imagePrev} source={{ uri: props.route.params.image }} />
            
            {/* FORM WITH LOCATION INFO */}
            <Formik
                enableReinitialize={true}
                initialValues={{ title: '', location: userLocation, category: '', body: '',  }}
                onSubmit={(values) => {
                    console.log(values.location);
                    console.log(props.route.params.image);
                    console.log(values.category);
                    console.log(values.title);
                    console.log(values.body);
                }}
            >
                {(props) => (
                    <ScrollView style={styles.formCon}>
                        {/* TITLE */}
                        <Text style={styles.label} >Spot name & description</Text>
                        <TextInput 
                            style={styles.inputFields}
                            placeholder='Spot name'
                            onChangeText={props.handleChange('title')}
                            value={props.values.title}
                        />

                        {/* DESCRIPTION */}
                        <TextInput 
                            style={styles.textArea}
                            placeholder='Describe the spot...'
                            onChangeText={props.handleChange('body')}
                            value={props.values.body}
                        />

                        {/* LOCATION */}
                        <View style={styles.locationInput}>
                            <Text style={styles.label}>Location</Text>
                            <View style={{flexDirection: 'row'}}>
                                <TextInput 
                                    style={{flex: 0.7}}
                                    placeholder='Location'
                                    onChangeText={props.handleChange('location')}
                                    value={props.values.location}
                                    
                                />
                                <TouchableOpacity style={{backgroundColor: 'red', flex: 0.3}} onPress={() => {setModalOpen(!modalOpen)}}>
                                    <Text style={{textAlign: 'center', fontWeight: 'bold', color: 'white', textAlignVertical: 'center'}} >New location</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        

                        {/* CATEGORY */}
                        <Text style={styles.label} >Category</Text>
                        <View style={styles.categoryInput}>
                            <RadioButton.Group value={props.values.category} onValueChange={props.handleChange('category')}>
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
                        
                        <TouchableOpacity style={styles.submitBtn} onPress={props.handleSubmit}>
                            <Text style={styles.submitText}>
                                Post
                            </Text>
                        </TouchableOpacity>
                    </ScrollView>
                )}
            </Formik>
                
            {/* Modal for typing in a new location other than the users current location */}
            <Modal visible={modalOpen} >
                <View style={{flex: 1}}>
                    <GooglePlacesAutocomplete
                        placeholder="Search"
                        fetchDetails={true}
                        GooglePlacesSearchQuery={{
                            rankby: "distance"
                        }}
                        onFail={(error) => console.error(error)}
                        onPress={(data, details = null) => {
                            // 'details' is provided when fetchDetails = true
                            setCoordinates({
                                latitude: details.geometry.location.lat,
                                longitude: details.geometry.location.lng,
                            })
                        }}
                        query={{
                            key: "AIzaSyC98flPHNxCKCi2Sq3oxKJ4kVdeApkwR3c",
                            language: "da",
                            components: "country:dk",
                            location: userLocation
                        }}
                        styles={{
                            container: { flex: 0, position: "absolute", width: "100%", zIndex: 5, borderRadius: 0 },
                            listView: { backgroundColor: "white", zIndex: 5 }
                        }}
                    />

                    <View style={{zIndex: 3, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10, marginTop: 55, marginBottom: 10}}>
                        <Button title="Back" onPress={() => setModalOpen(!modalOpen)} />
                        {/* Make it so when they press the new coords are made to a address and make choosenLocation into that */}
                        <Button title="Confirm location" onPress={async() => {
                                let result = await Location.reverseGeocodeAsync({latitude: coordinates.latitude, longitude: coordinates.longitude});
                                setAddress(result);
                                setModalOpen(!modalOpen);
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
                        provider="google"
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


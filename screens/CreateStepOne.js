import { Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import * as Location from 'expo-location';

export default function CreateStepOne() {
    const [location, setLocation] = useState(null);
    const [address, setAddress] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [maps, setMaps] = useState(null);

    useEffect(async () => {
            //PERMISSION REQUEST
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
            return;
            }

            // GETTING LOCATION IF GRANTED
            let location = await Location.getCurrentPositionAsync({});
            
            // USING COORDINATES TO GET ADDRESS DATA
            let response = await Location.reverseGeocodeAsync({ latitude: location.coords.latitude, longitude: location.coords.longitude });
            setLocation(response);

            // LOOP THROUGH ADRESS DATA TO WRITE IT OUT IN SPECIFIC WAY
            for (let item of response) {
                let resultAddress = `${item.street} ${item.name}, ${item.postalCode} ${item.city}`;
                
                // SET THE ADDRESS TO A STATE
                setAddress(resultAddress);
            }
        
    }, []);

    // USING STATE ON VARIABLE WITH IF CHECK
    let userLocation = 'Waiting..';
    if (errorMsg) {
        userLocation = errorMsg;
    } else if (address) {
        userLocation = address;
    }

    return (
        <View>
            <Formik
                initialValues={{ title: '', location: userLocation, category: '', body: '',  }}
                onSubmit={(values) => {

                }}
            >
                {(props) => (
                    <View>
                        {/* TITLE */}
                        <TextInput 
                            placeholder='Spot name'
                            onChangeText={props.handleChange('title')}
                            value={props.values.title}
                        />

                        {/* LOCATION */}
                        <TextInput 
                            placeholder='Location'
                            onChangeText={props.handleChange('location')}
                            value={props.values.location}
                        />

                        {/* CATEGORY */}
                        <TextInput 
                            placeholder='Category'
                            onChangeText={props.handleChange('category')}
                            value={props.values.category}
                        />

                        {/* DESCRIPTION */}
                        <TextInput 
                            placeholder='Description'
                            onChangeText={props.handleChange('body')}
                            value={props.values.body}
                        />
                    </View>
                )}
            </Formik>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})


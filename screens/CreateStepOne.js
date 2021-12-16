import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
// Camera packages
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import Slider from '@react-native-community/slider';

export default function CreateStepOne({ navigation }) {
    // Camera and gallery states
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [camera, setCamera] = useState(null);
    const [image, setImage] = useState(null);

    // camera focus and zoom states
    const [zoom, setZoom] = useState(0);


    // Tjekker status for tilladelse til kamera og galleri
    useEffect(() => {
        (async () => {
            // check for tilladelse til kamera
            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(cameraStatus.status === 'granted');
            // check for tilladelse til galleriet
            const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
            setHasGalleryPermission(galleryStatus.status === 'granted');
        })();
    }, []);



    // Tag et billede
    const takePicture = async () => {
        if(camera) {   
            const data = await camera.takePictureAsync({
                quality: 1,
            });
            console.log(data);
            setImage(data.uri);
        }
    }

    // Vælg et billede
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
        setImage(result.uri);
        }
    };


    // View hvis det er første gang man bruger appen
    if (hasCameraPermission === null || hasGalleryPermission === null) {
        return <View />;
    }

    // View hvis tilladelse til brug af kameraet og galleriet ikke er givet
    if (hasCameraPermission === false || hasGalleryPermission === false) {
        return <Text>Mulighed for at lave indlæg skal bruge tilladelse til brug af kamera eller galleri</Text>;
    }

    // View hvis tilladelse til kamera og galleri er givet
    return (
        <View style={styles.container}>
            <View style={styles.containerCamera}>
                {image ? 
                    <Image source={{uri: image}} style={{flex: 1, aspectRatio: 1}} /> :
                    <Camera style={styles.camera} autoFocus='on' zoom={zoom}  type={type} ratio={'1:1'} ref={ref => setCamera(ref)} />
                }
            </View>

            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                {image ? <TouchableOpacity style={{padding: 10, backgroundColor: 'dodgerblue'}} onPress={() => setImage(null)}><Text style={{color: 'black'}}>Tag et nyt billed</Text></TouchableOpacity> :
                    <View style={{width: '100%', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        {/*Mulighed for at zoom ind og ud*/}
                        <View style={{width: '100%', marginHorizontal: 10,}}>
                            <Text style={{textAlign: 'center'}}>Zoom</Text>
                            <Text style={{textAlign: 'center'}}>{Math.round(zoom * 100) / 100}</Text>
                            <Slider 
                                style={{width: '100%' , height: 40,}}
                                minimumValue={0}
                                maximumValue={1}
                                value={zoom}
                                minimumTrackTintColor="#FFFFFF"
                                maximumTrackTintColor="#000000"
                                onSlidingComplete={(val) => setZoom(val)}
                                
                            />
                        </View>
                        
                        {/* Mulighed for at tage et billede */}
                        <View style={styles.buttonTakeCon}>
                            <TouchableOpacity
                                style={styles.buttonTake}
                                onPress={()=> takePicture()}
                            />
                        </View>
                    </View>
                }
                
                
                
            </View>
            
            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    style={styles.buttonFlip}
                    onPress={() => {
                    setType(
                        type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back
                    );
                    }}
                >
                    <Text style={styles.buttonText}>Flip</Text>
                </TouchableOpacity>

                
                {/* Mulighed for at vælge et billed */}
                <TouchableOpacity 
                    style={styles.buttonPick}
                    onPress={()=> pickImage()}
                >
                    <Text style={styles.buttonText}>Pick</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.buttonSave}
                    onPress={() => {
                        if (image) {
                            navigation.navigate("Upload", {image})
                        }
                    }}
                >
                    <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerCamera: {
        flex: 1,
        flexDirection: 'row',
    },
    camera: {
        flex: 1,
        aspectRatio: 1,
    },
    buttonsContainer: {
        flexDirection: 'row',
    },
    buttonTake: {
        width: 90,
        height: 90,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 100,
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 1.5,
        
    },
    buttonTakeCon: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 100,
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 1.5,
        marginTop: 20
    },
    buttonFlip: {
        backgroundColor: 'blue',
        flex: 1,
        paddingBottom: 10,
        paddingTop: 10,
    },
    buttonPick: {
        backgroundColor: 'red',
        flex: 1,
        paddingBottom: 10,
        paddingTop: 10,
    },
    buttonSave: {
        backgroundColor: 'purple',
        flex: 1,
        paddingBottom: 10,
        paddingTop: 10,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    }
}); 


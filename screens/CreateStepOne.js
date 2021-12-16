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
    const [focus, setFocus] = useState(0);

    useEffect(() => {
        (async () => {
            // check for permission for camera
            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(cameraStatus.status === 'granted');
            // check for permission for gallery
            const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
            setHasGalleryPermission(galleryStatus.status === 'granted');
        })();
    }, []);

    // Take a picture
    const takePicture = async () => {
        if(camera) {   
            const data = await camera.takePictureAsync();
            console.log(data);
            setImage(data.uri);
        }
    }

    // Pick an image
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


    // View when it is the first time using the app
    if (hasCameraPermission === null || hasGalleryPermission === null) {
        return <View />;
    }

    // View when permission is not granted
    if (hasCameraPermission === false || hasGalleryPermission === false) {
        return <Text>No access to camera</Text>;
    }

    // View when permission is granted
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
                        <View style={{width: '100%', marginHorizontal: 10,}}>
                            <Text style={{textAlign: 'center'}}>Focus</Text>
                            <Text style={{textAlign: 'center'}}>{Math.round(focus * 100) / 100}</Text>
                            <Slider 
                                style={{width: '100%' , height: 40,}}
                                minimumValue={0}
                                maximumValue={1}
                                value={focus}
                                minimumTrackTintColor="#FFFFFF"
                                maximumTrackTintColor="#000000"
                                onSlidingComplete={(val) => setFocus(val)}
                                
                            />
                        </View>
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
                            navigation.navigate("Submit", {image})
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


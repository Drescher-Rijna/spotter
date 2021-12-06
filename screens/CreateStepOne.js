import React, { useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { useState } from 'react/cjs/react.development'
// Camera packages
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

export default function CreateStepOne({ navigation }) {
    // Camera and gallery states
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [camera, setCamera] = useState(null);
    const [image, setImage] = useState(null);

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
            console.log('taking');
            const data = await camera.takePictureAsync(null);
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
            <Camera style={styles.camera} type={type} ratio={'1:1'} ref={ref => setCamera(ref)} />
            </View>

            {image && <Image source={{uri: image}} style={{flex: 1,}} />}

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
                    style={styles.buttonTake}
                    onPress={()=> takePicture()}
                >
                    <Text style={styles.buttonText}>Take</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.buttonPick}
                    onPress={()=> pickImage()}
                >
                    <Text style={styles.buttonText}>Pick</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.buttonSave}
                    onPress={() => navigation.navigate("Submit", {image})}
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
        backgroundColor: 'green',
        flex: 1,
        paddingBottom: 10,
        paddingTop: 10,
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


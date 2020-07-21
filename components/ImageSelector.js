import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Button, Alert, Platform } from 'react-native';
import Colors from '../constants/Colors';
import  ImagePicker from 'react-native-image-picker';
import {PERMISSIONS, request} from 'react-native-permissions';

const ImageSelector = props => {
    const [image, setImage] = useState('')
    const veriPermissions = async () => {
        let response;
        if(Platform.OS === 'ios'){
            response = await request(PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.CAMERA_ROLL)
        } else {
            response = await request(PERMISSIONS.ANDROID.CAMERA, PERMISSIONS.ANDROID.CAMERA_ROLL)
        }
        if(response !== 'granted'){
            Alert.alert('Insufficient Permissions !', 'You need to grant camera permissions to use this app', [{text:'Okay'}])
            return false;
        }
        return true;
    }

    const  takeImageHandler = async () =>{
        const options = {
            title: 'Select Image',
            allowsEditing:true,
            aspect: [16,9],
            quality:0.5,
            customButtons: [{ name: 'fb', title: 'Take photo' }],
          };
        const perm = await veriPermissions()

        if(!perm){
            return;
        }
        ImagePicker.launchCamera(options, (response) => {
             // Same code as in above section!
             setImage(response.uri)
             props.onImageTaken(response.uri)
        });

    }

    return (
    <View style={styles.imagePicker}>
        <View style={styles.imagePreview}>
            {!image ? (<Text>No Image picked yet !</Text>) :
            (<Image source={{uri: image}} style={styles.image}/>)}
            <Button  title="Take Image" color={Colors.primary} onPress={takeImageHandler}/>
        </View>
    </View>
    );
};

const styles = StyleSheet.create({
    imagePicker:{
        alignItems:'center',
        marginBottom:15
    },
    imagePreview:{
        width: '100%',
        height: 200,
        marginBottom: 10,
        justifyContent:'center',
        alignItems:'center',
        borderColor:'#ccc', 
        borderWidth:1
    },
    image:{
        width:'100%',
        height:'100%',
    }
});

export default ImageSelector;

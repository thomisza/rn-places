import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { apiKey } from '../constants/api';

export const MapPreview = (props) => {
    let imagePreview;

    if(props.location){
        imagePreview = `https://maps.googleapis.com/maps/api/staticmap?center=${props.location.lat},${props.location.lng}&zoom=13&size=400x200&maptype=roadmap&markers=color:red%7Clabel:C%7C${props.location.lat},${props.location.lng}&key=${apiKey}`;
    }

    return(
        <TouchableOpacity style={{...styles.mapPreview, ...props.style}} onPress={props.onPress}>
            {props.location ? <Image  style={styles.mapImage} source={{uri : imagePreview}}/> : props.children}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    mapPreview:{
        alignItems:'center',
        justifyContent:'center'
    },
    mapImage:{
        width:'100%', 
        height: '100%'
    }
})

export default MapPreview;
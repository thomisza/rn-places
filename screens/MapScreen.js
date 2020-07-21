import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Colors from '../constants/Colors';

const MapScreen = (props) => {
    const initialLocation = props.navigation.getParam('initialLocation');
    const readOnly = props.navigation.getParam('readOnly');

    const [selectedLocation, setSelectedLocation] = useState(initialLocation);

    const mapRegion = {
        latitude: initialLocation ? initialLocation.lat : 48.85,
        longitude: initialLocation ? initialLocation.lng : 2.34,
        latitudeDelta: 0.00922,
        longitudeDelta: 0.0421
    };

    const selectLocationHandler = (event) => {
        if(readOnly){
            return;
        }
        setSelectedLocation({
            lat: event.nativeEvent.coordinate.latitude,
            lng: event.nativeEvent.coordinate.longitude
        })
    }

    const savePickedLocationHandler = useCallback(() => {
        if(!selectedLocation){
            return;
        }
        props.navigation.navigate('New',{pickedLocation: selectedLocation});

    },[selectedLocation]);

    useEffect(()=>{
        props.navigation.setParams({saveLocation: savePickedLocationHandler})
    },[savePickedLocationHandler]);

    let markerCoordinates;

    if(selectedLocation){
        markerCoordinates = {
            latitude:selectedLocation.lat,
            longitude:selectedLocation.lng
        }
    }

    return(
        <MapView initialRegion={mapRegion} style={styles.map} onPress={selectLocationHandler}>
            {markerCoordinates && <Marker title="Picked Location" coordinate={markerCoordinates}/>}
        </MapView>
    )
}

MapScreen.navigationOptions = (navData) => {
    const saveFn = navData.navigation.getParam('saveLocation');
    const readOnly = navData.navigation.getParam('readOnly');
    if(readOnly){
        return{};
    }
    return {
        headerRight: () =>  (
            <TouchableOpacity  style={styles.headerButton} onPress={saveFn}>
                <Text style={styles.headerButtonText}>Save</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    map:{
        flex:1
    },
    headerButton:{
        marginHorizontal:20
    },
    headerButtonText:{
        fontSize: 16,
        color: Platform.OS === 'android' ? 'white' : Colors.primary 
    }
})

export default MapScreen;

import React, {useState, useEffect} from 'react';
import { View, Button, Text, ActivityIndicator, Alert, StyleSheet} from 'react-native';
import Colors from '../constants/Colors';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
import MapPreview from '../components/MapPreview';

const LocationPicker =  (props) => {
    const [location, setLocation] = useState();
    const [loading, setLoading] = useState(false)

    const mapPickedLocation = props.navigation.getParam('pickedLocation');

    const {onLocationPicked} = props;

    useEffect(() => {
        if(mapPickedLocation){
            setLocation(mapPickedLocation);
            onLocationPicked(mapPickedLocation)
        }
    },[mapPickedLocation]);

    const veriPermissions = async () => {
        let response;
        if(Platform.OS === 'ios'){
            response = await request(PERMISSIONS.IOS.ACCESS_COARSE_LOCATION, PERMISSIONS.IOS.ACCESS_FINE_LOCATION)
        } else {
            response = await request(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION, PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
        }
        if(response !== 'granted'){
            Alert.alert('Insufficient Permissions !', 'You need to grant location permissions to use this app', [{text:'Okay'}])
            return false;
        }
        return true;
    }

    const getLocationHandler = async () => {
        const perm = await veriPermissions()

        if(!perm){
            return;
        }

        try{
            setLocation(true)
            Geolocation.getCurrentPosition(
                (info) => {
                    setLocation({
                        lat:info.coords.latitude,
                        lng:info.coords.longitude
                    })
                    props.onLocationPicked({
                        lat:info.coords.latitude,
                        lng:info.coords.longitude
                    })
                }, 
                err => console.log(err), {
                timeout:5000
            });
        }catch(err){
            Alert.alert(
                'Could not fetch location', 
                'Please try again or pick a location on the map', 
                [{text:'Okay'}])
        }
        setLoading(false)

    }

    const pickOnMapHandler = () => {
        props.navigation.navigate('Map');
    }

    return(
        <View style={styles.locationPicker}>
            <MapPreview style={styles.mapPreview} location={location} onPress={pickOnMapHandler}>
                <View style={styles.mapPreview}>
                    {loading ? <ActivityIndicator size='large'/> : <Text>No Location picked !</Text>}
                </View>
            </MapPreview>
            <View style={styles.actions}>
                <Button title="Get user location" color={Colors.primary} onPress={getLocationHandler}/>
                <Button title="Pick on map" color={Colors.primary} onPress={pickOnMapHandler}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    locationPicker:{
        marginBottom:15,

    },
    mapPreview:{
        marginBottom:10,
        width:'100%',
        height:150,
        borderColor:'#ccc',
        borderWidth:1,
        alignItems:'center',
        justifyContent:'center'
    },
    actions:{
        flexDirection:'row',
        justifyContent:'space-around',
        width:'100%'
    }
});

export default LocationPicker;
import React, { useState, useCallback } from 'react';
import { StyleSheet, View, Text, Button, TextInput, ScrollView } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../components/HeaderButton';
import Colors from '../constants/Colors';
import * as placesAction from '../store/actions/places';
import { useDispatch } from 'react-redux';
import ImageSelector from '../components/ImageSelector';
import LocationPicker from '../components/LocationPicker';

const NewPlacesScreen = (props) => {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState();
    const [selectedLocation, setSelectedLocation] = useState();
    const dispatch = useDispatch();

    const titleChangeHandler = (text) => {
        setTitle(text)
    }

    const savePlaceHandler = () => {
        dispatch(placesAction.addPlace(title, image, selectedLocation));
        props.navigation.goBack();
    }

    const imageTakenHandler = (imagePath) => {
        setImage(imagePath)
    }

    const locationPickedHandler = useCallback((location) => {
        setSelectedLocation(location)
    },[setSelectedLocation])

    return(
        <ScrollView style={{flex:1}}>
            <View style={styles.form}>
                <Text style={styles.label}>Title: </Text>
                <TextInput 
                    style={styles.textInput}
                    onChangeText={titleChangeHandler}
                    value={title}/>
                <ImageSelector onImageTaken={imageTakenHandler}/>
                <LocationPicker navigation={props.navigation} onLocationPicked={locationPickedHandler}/>
                <Button 
                    style={{marginTop:30}}
                    title="Save Place" 
                    color={Colors.primary} 
                    onPress={savePlaceHandler}/>
                
            </View>
        </ScrollView>
    )
}

NewPlacesScreen.navigationOptions = (navData) => {
    return {
        headerTitle:'New Place',
        
    }
}

const styles = StyleSheet.create({
    form:{
        flex:1,
        margin:30
    },
    label:{
        fontSize:18,
        marginBottom:15
    },
    textInput:{
        borderBottomColor:'#ccc',
        borderBottomWidth:1,
        marginBottom:15,
        paddingVertical:4,
        paddingHorizontal: 2
    }
})

export default NewPlacesScreen;

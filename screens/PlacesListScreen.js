import React, { useEffect } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../components/HeaderButton';
import { useSelector, useDispatch } from 'react-redux';
import PlaceItem from '../components/PlaceItem';
import * as placesActions from '../store/actions/places';

const PlacesListScreen = (props) => {
    const places = useSelector(state => state.places.places)
    const dispatch = useDispatch();


    useEffect(()=>{
        dispatch(placesActions.loadPlaces());
    },[dispatch])
    return(
        <FlatList 
            data={places}
            renderItem={(itemData)=>(
                <PlaceItem 
                    title={itemData.item.title}
                    address={itemData.item.address}
                    onSelect={()=>{
                        props.navigation.navigate('Detail',{
                            placeTitle:itemData.item.title,
                            placeId: itemData.item.id
                        })
                    }}
                    image={itemData.item.imageUri}
                />
            )}
        />
    )
}

PlacesListScreen.navigationOptions = (navData) => {
    return {
        headerTitle:'All Places',
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item  
                    title="Add Place" 
                    iconName={Platform.OS === 'android' ? 'md-add' :'ios-add'}
                    onPress={()=> {
                        navData.navigation.navigate('New');
                    }} 
                />
            </HeaderButtons>
        )
    }
}
const styles = StyleSheet.create({
    
})

export default PlacesListScreen;

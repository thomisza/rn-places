var RNFS = require('react-native-fs');
import { insertPlace, fetchPlaces } from '../../helper/db';
import { apiKey } from '../../constants/api';
export const ADD_PLACE = 'ADD_PLACE';
export const SET_PLACES = 'SET_PLACES';

export const addPlace = (title, image, location) => {
    return async dispatch => {

        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${apiKey}`);

        const fileName = image.split('/').pop();
        const newPath = RNFS.DocumentDirectoryPath + fileName;

        if(!response){
            throw new Error('Something went wrong');
        }

        const resData = await response.json();
        if(!resData.results){
            throw new Error('Something went wrong');
        }

        const address = resData.results[0].formatted_address;

        try {
            RNFS.moveFile(image, newPath)
            .then((success) => {
                console.log('file moved!');
            })
            .catch((err) => {
                console.log("Error: " + err.message);
            });
            const dbResult = await insertPlace(title, newPath, address, location.lat, location.lng);

            dispatch({
                type:ADD_PLACE,
                placeData:{
                    id:dbResult.insertId,
                    title:title,
                    image:newPath,
                    address:address,
                    coords:{
                        lat:location.lat,
                        lng:location.lng
                    }
                }
            })
        } catch (err){
            throw new Error(err.message)
        }

        
    }
}

export const loadPlaces = () => {
    return async dispatch => {
        try{
            const dbResult = await fetchPlaces();
            var temp = [];

            for (let i = 0; i < dbResult.rows.length; ++i) {
                temp.push(dbResult.rows.item(i));
            }

            dispatch({
                type:SET_PLACES,
                places:temp
            });
        } catch(err){
            throw err;
        }
        
    }
}
import IonIcons from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import Colors from '../constants/Colors';
import { Platform } from 'react-native';
import PlacesListScreen from '../screens/PlacesListScreen'
import PlaceDetailScreen from '../screens/PlaceDetailScreen';
import NewPlaceScreen from '../screens/NewPlaceScreen';
import MapScreen from '../screens/MapScreen';

const PlacesNavigator = createStackNavigator({
    Places: PlacesListScreen,
    Detail: PlaceDetailScreen,
    New: NewPlaceScreen,
    Map: MapScreen
},{
    defaultNavigationOptions:{
        headerStyle:{
            backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
        },
        headerTintColor: Platform.OS === 'android' ? 'white':  Colors.primary
    }
})

export default createAppContainer(PlacesNavigator);
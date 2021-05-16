import {createStackNavigator} from 'react-navigation-stack';
// import { createAppContainer } from 'react-navigation';
import Home from '../Screens/Apps/Home'
import Header from '../Screens/Shared/Header'
import React from 'react'

const screens = {
    HomeScreen: {
        screen: Home,
        navigationOptions: ({navigation}) =>{
            return {
                // title: 'Dashboard'
                headerTitle: () => <Header navigation={navigation}/>,
            }
        }
    }
}

const HomeStack = createStackNavigator(screens);

// export default createAppContainer(HomeStack);
export default HomeStack
import {createStackNavigator} from 'react-navigation-stack';
import Dashboard from '../screens/Dashboard'
import Header from '../shared/Header'
import React from 'react'

const screens = {
    HomeScreen: {
        screen: Dashboard,
        navigationOptions: ({navigation}) =>{
            return {
                headerTitle: () => <Header navigation={navigation}/>,
            }
        }
    }
}

const HomeStack = createStackNavigator(screens);

export default HomeStack
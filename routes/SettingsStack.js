import {createStackNavigator} from 'react-navigation-stack';
import Settings from '../screens/Settings'
import Header from '../shared/Header'
import React from 'react'

const screens = {
    SettingsScreen: {
        screen: Settings,
        navigationOptions: ({navigation}) =>{
            return {
                headerTitle: () => <Header navigation={navigation}/>,
            }
        }
    }
}

const SettingsStack = createStackNavigator(screens);

export default SettingsStack
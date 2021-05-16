  
import {createStackNavigator} from 'react-navigation-stack';
import About from '../screens/About'
import Header from '../shared/Header'
import React from 'react'

const screens = {
    AboutScreen: {
        screen: About,
        navigationOptions: ({navigation}) =>{
            return {
                headerTitle: () => <Header navigation={navigation}/>,
            }
        }
    }
}

const AboutStack = createStackNavigator(screens);

export default AboutStack
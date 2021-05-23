import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Dashboard from '../screens/Dashboard'

const screens = {
    HomeScreen: {
        screen: Dashboard,
        navigationOptions: {headerShown: false} 
    }
}

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack)
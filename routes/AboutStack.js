import {createStackNavigator} from 'react-navigation-stack';
// import { createAppContainer } from 'react-navigation';
import About from '../Screens/Apps/About'

const screens = {
    AboutScreen: {
        screen: About,
        title:'About'
    }
}

const AboutStack = createStackNavigator(screens);

// export default createAppContainer(HomeStack);
export default AboutStack
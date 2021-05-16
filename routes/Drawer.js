import {createDrawerNavigator} from 'react-navigation-drawer'
import {createAppContainer} from 'react-navigation'
import HomeStack from './HomeStack'
import AboutStack from './AboutStack'
import SettingsStack from './SettingsStack'
import DrawerMenu from '../shared/DrawerMenu'

const RootDrawerNavigator = createDrawerNavigator(
   {
    Home :  HomeStack,
    About : AboutStack,
    Settings : SettingsStack
   },

    {
        initialRouteName: "Home",
        drawerBackgroundColor: "lightblue",
        contentOptions: {
          activeTintColor: "red"
        },
            contentComponent: DrawerMenu
    }
      
)

export default createAppContainer(RootDrawerNavigator)
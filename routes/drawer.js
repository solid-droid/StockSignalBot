import {createDrawerNavigator} from 'react-navigation-drawer'
import {createAppContainer} from 'react-navigation'
import HomeStack from './homeStack'
import AboutStack from './AboutStack'
import DrawerMenu from '../Screens/Shared/DrawerMenu'

const RootDrawerNavigator = createDrawerNavigator(
   {
    Home :  HomeStack,
    About : AboutStack
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
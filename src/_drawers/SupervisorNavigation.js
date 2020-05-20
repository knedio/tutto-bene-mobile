import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import {
    Dimensions,
} from 'react-native';
import DrawerMenu from '_organisms/Menus/DrawerMenu';
import MainMenu from '_organisms/Menus/HeaderMenus/MainMenu';
import Home from '_screens/Home';
import UserProfile from '_screens/UserProfile';
import Users from '_screens/Users';

const options = (navigation, title) => ({
    header: () => MainMenu({
        navigation,
        title
    })
})

const stacks = {
    Home: {
        screen: Home,
        title: 'Home',
        navigationOptions: ({ navigation }) => options(navigation, 'Home')
    },
    Users: {
        screen: Users,
        title: 'Users',
        navigationOptions: ({ navigation }) => options(navigation, 'Users')
    },
    UserProfile: {
        screen: UserProfile,
        title: 'Profile',
        navigationOptions: ({ navigation }) => options(navigation, 'Profile')
    }
}

const StackNavigation = createStackNavigator(stacks);

const SupervisorNavigation = createDrawerNavigator(
    {
        StackNavigation
    },
    {
        contentComponent: () => DrawerMenu(stacks),
        drawerWidth: Dimensions.get('window').width * 0.8,
    }
)

export default SupervisorNavigation
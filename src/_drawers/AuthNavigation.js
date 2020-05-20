import { createStackNavigator } from 'react-navigation-stack';
import Login from '_screens/Login';
import Registration from '_screens/Registration';

const AuthNavigation = createStackNavigator(
    {
        Login: { 
            screen: Login 
        },
        Registration: { 
            screen: Registration
        },
    },
    {
        initialRouteName: 'Login',
        headerMode: 'none',
        defaultNavigationOptions: () => ({
            cardStyle: {
                backgroundColor: '#fff',
            },
        }),
    }
)

export default AuthNavigation
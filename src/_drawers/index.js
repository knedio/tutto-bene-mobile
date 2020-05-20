import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import AuthNavigation from './AuthNavigation';
import UserNavigation from './UserNavigation';
import SupervisorNavigation from './SupervisorNavigation';

const SwitchNavigator = createSwitchNavigator(
    {
        AuthNavigation,
        UserNavigation,
        SupervisorNavigation,
    },
    {
        initialRouteName: 'AuthNavigation',
    }
)

const AppContainer = createAppContainer(SwitchNavigator)

export default AppContainer
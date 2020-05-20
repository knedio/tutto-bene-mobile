import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { setNavigation } from '_services/navigation.service';
import AppContainer from '_drawers';
import { authActions } from '_actions';
import { setToken } from '_services/api.service';

const App = () => {

    const dispatch = useDispatch();
	const { screenLoading } = useSelector( state => state.alert );
	
	useEffect( () => {
		(async () => {
			await setToken();
			const token = await AsyncStorage.getItem('token');
            if ( token ) {
				const user = JSON.parse( await AsyncStorage.getItem('user') );
				dispatch( authActions.setLoggedUser(user) )
            } 
		})();
	}, [])

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Spinner
				visible={ screenLoading }
				textContent={''}
				textStyle={{ color: '#FFF' }}
			/>
			<AppContainer 
        		ref={ navigation => setNavigation( navigation )}
			/>
		</SafeAreaView>
	)
}

export default App;
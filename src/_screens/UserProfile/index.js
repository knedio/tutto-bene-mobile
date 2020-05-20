import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    View,
    Text,
} from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { userActions, alertActions } from '_actions';
import UserInfo from '_organisms/Modules/User/UserProfile/UserInfo';
import UserReportList from '_organisms/Modals/UserReportModal/UserReportList';
import { fs, ta, ffd, fjc } from '_assets/globalStyles';
import styles from './styles';

const UserProfile = ( { navigation } ) => {

    const dispatch = useDispatch();
    const [selectedTab, setSelectedTab] = useState(0);
    const { loggedUser } = useSelector( state => state.auth );
    
    useEffect( () => {
        (async () => {
            await dispatch(alertActions.setScreenLoading(true));
            await dispatch( userActions.setUser({}) );
            const { detail } = await dispatch( userActions.getUser(loggedUser.id) );
            await dispatch(alertActions.setScreenLoading(false));
        })();
    }, []);

    const onSetTab = selectedTab => {
        console.log('selectedTab', selectedTab)
        switch ( selectedTab ) {
            case 0:
                return <UserInfo />
            case 1:
                console.log('test')
                return <UserReportList />
        }
    }

    return (
        <SafeAreaView style={ styles.container }>
            <View style={ styles.headerContainer }>
                <Text style={[ fs(20), ta('center') ]}>
                    { loggedUser.detail && `${loggedUser.detail.firstName} ${ loggedUser.detail.middleName ? loggedUser.detail.middleName+', ' : ''}${loggedUser.detail.lastName}` }
                </Text>
            </View>
            <View style={ styles.contentContainer }>
                <ButtonGroup
                    buttons={ ['Info', 'Report'] }
                    selectedIndex={ selectedTab }
                    onPress={ value => setSelectedTab(value) }
                    containerStyle={ { borderWidth: 0, marginTop: 10 } }
                    innerBorderStyle={{ width: 0 }}
                    selectedButtonStyle={{ backgroundColor: 'transparent' }}
                    buttonStyle={{ backgroundColor: 'transparent' }}
                    selectedTextStyle={{ color: '#585F6E', fontWeight: 'bold' }}
                />
                {
                    onSetTab(selectedTab)
                }
            </View>
        </SafeAreaView>
    )
}

export default UserProfile;
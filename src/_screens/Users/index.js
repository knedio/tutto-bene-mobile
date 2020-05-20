import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { userActions, alertActions } from '_actions';
import SearchInputField from '_molecules/Form/SearchInputField';
import UserReportModal from '_organisms/Modals/UserReportModal';
import styles from './styles'; 

const Users = ( { navigation } ) => {

    const dispatch = useDispatch();
    const { users } = useSelector( state => state.user );
    const [showURModal, setShowURModal] = useState(false);
    const [tempUsers, setTempUsers] = useState([]);
    
    useEffect(() => {
        (async () => {
            await dispatch(alertActions.setScreenLoading(true));
            const users = await dispatch( userActions.getAllUser() ); 
            setTempUsers(users);
            await dispatch(alertActions.setScreenLoading(false));
        })();
        return () => console.log('unmount')
    }, [])

    const onShowURModal = async (user) => {
        await dispatch(alertActions.setScreenLoading(true));
        const { detail } = await dispatch( userActions.getUser(user.id) );
        setShowURModal(true);
        await dispatch(alertActions.setScreenLoading(false));
    }


    return (
        <SafeAreaView style={ styles.container }>
            <UserReportModal
                closeLabel={ 'Close' }
                showModal={ showURModal }
                onClose={ () => setShowURModal(false) }
            />
            <SearchInputField
                label={ 'Search user here ...' }
                data={ users }
                onChange={ (data) => setTempUsers(data) }
            />
            <ScrollView style={ styles.contentContainer }>
                {
                    tempUsers.length > 0
                    ?
                    tempUsers.map( (user, index) => (
                        <TouchableOpacity 
                            key={ `user-${index}` }
                            style={ styles.listItem }
                            onPress={ () => onShowURModal(user) }
                        >
                            <View style={ styles.listItemHeader }>
                                <Text style={ styles.listItemTitle }>
                                    {`${index+1}. ${user.detail.firstName} ${user.detail.lastName}`}
                                </Text>
                                <Text style={ styles.listItemSubTitle }>
                                    
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ))
                    :
                    <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold', marginTop: 20 }}>
                        No user available.
                    </Text>
                }
            </ScrollView>
        </SafeAreaView>
    )
}

export default Users;
import React, { useState } from 'react';
import {
    View,
    Text,
    Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-native-elements';
import { fs, fw, ta, ffd, m, mh } from '_assets/globalStyles';
import { userQuarantineActions, alertActions } from '_actions';
import InputField from '_molecules/Form/InputField';
import styles from './styles';

const UserReportQForm = ( { onCancel } ) => {

    const dispatch = useDispatch();
    const { user } = useSelector( state => state.user );
    const [days, setDays] = useState('14'); 

    const onSubmit = async () => {
        try {
            await dispatch(alertActions.setScreenLoading(true));
            const { quarantine } = await dispatch(userQuarantineActions.store({
                days,
                user_id: user.id,
            }));
            setDays('14');
            await dispatch(alertActions.setScreenLoading(false));
            onCancel();
        } catch (error) {
            await dispatch(alertActions.setScreenLoading(false));
            Alert.alert(
                '',
                'Something went wrong!',
            );
        }
    }

    return (
        <View style={ [m(20)], { flex: 1 } }>
            <Text style={ [fs(16), fw('bold'), ta('center'), { marginTop: 10 } ] }>
                You're about to put this person under Quarantine.
            </Text>
            <View style={ [ffd('column'), mh(10), { flex: 1 }] }>
                <InputField
                    label='Days of Quarantine :'
                    name='days'
                    keyboardType='numeric'
                    value={ days }
                    placeholder=''
                    onChangeText={ value => setDays(value) }
                />
            </View>
            <View style={[ styles.bottomContainer ]}>
                <Button
                    disabled={ days == '' }
                    disabledStyle={{ opacity: 0.5 }}
                    containerStyle={{ marginVertical: 10 }}
                    title='Submit'
                    onPress={ () => onSubmit() }
                />
                <Button
                    containerStyle={{ marginVertical: 10 }}
                    buttonStyle={{ backgroundColor: '#6c757d' }}
                    title='Cancel'
                    onPress={ () => onCancel() }
                />
            </View>
        </View>
    )
}

export default UserReportQForm

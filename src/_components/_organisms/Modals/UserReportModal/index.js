import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Modal,
    Alert,
} from 'react-native';
import { Button } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import UserReportList from './UserReportList';
import UserReportForm from './UserReportForm';
import UserReportQForm from './UserReportQForm';
import { userPositiveActions, alertActions } from '_actions';
import { fs, fw, ta, ffd, p, mh, fjc, bc } from '_assets/globalStyles';
import styles from './styles';

const UserReportModal = ( { closeLabel, showModal, onClose } ) => {

    const dispatch = useDispatch();
    const { user } = useSelector( state => state.user );
    const { loggedUser } = useSelector( state => state.auth );
    const [formType, setFormType] = useState('');

    useEffect( () => {
        setFormType('');
    }, [showModal])

    const onSetForm = () => {
        switch ( formType ) {
            case 'report':
                return <UserReportForm onCancel={ () => setFormType('') } />
            case 'quarantine':
                return <UserReportQForm onCancel={ () => setFormType('') } />
            default:
                return <UserReportList />
        }
    }

    const onAlertMarkPositive = () => {
        Alert.alert(
            'Warning!',
            'Are you sure you want to mark this user as Positive in Covid Virus?',
            [
                {text: 'No', onPress: () => console.log('No') },
                {text: 'Yes', onPress: () => onSubmitPositive() },
            ],
        );
    }

    const onSubmitPositive = async () => {
        try {
            await dispatch(alertActions.setScreenLoading(true));
            const { positive } = await dispatch(userPositiveActions.store({
                user_id: user.id,
            }));
            await dispatch(alertActions.setScreenLoading(false));
        } catch (error) {
            await dispatch(alertActions.setScreenLoading(false));
            Alert.alert(
                '',
                'Something went wrong!',
            );
        }
    }

    const getRemainingDays = (quarantine) => {
        let quarantineDate = moment(quarantine.created_at);
        quarantineDate.add(quarantine.days, 'days',);
        const days = quarantineDate.diff(moment(), 'days');
        return days > 0 ? days : 0;
    }

    return (
        <Modal
            style={ styles.container }
            animationType='slide'
            transparent={ false }
            visible={ showModal }
            onSwipeComplete={ () => onClose() }
            onBackdropPress={ () => onClose() }
            onBackButtonPress={ () => onClose() }
            onRequestClose={ () => onClose() }
        >
            <Text style={ styles.headerContainer }>
                User Report of 
                {
                    (user && user.detail) &&
                    <Text>
                        { ` ${user.detail.firstName} ${user.detail.lastName}` }
                    </Text>
                }
            </Text>
            {
                (formType == '' && (loggedUser.user_role && loggedUser.user_role.role_id != 3)) && 
                <View style={[ ffd('row'), mh(20), fjc('center') ]}>
                    <Button
                        raised
                        title={'Add Report'}
                        titleStyle={[ fs(10) ]}
                        containerStyle={ styles.btnContainer }
                        buttonStyle={ [styles.btnStyle, { backgroundColor: '#28a745' }] }
                        onPress={() => setFormType('report') }
                    />
                    <Button
                        raised
                        disabled={ user.quarantine ? true : false }
                        disabledStyle={{ opacity: 0.5 }}
                        title={'Add Quarantine'}
                        titleStyle={[ fs(10) ]}
                        containerStyle={ styles.btnContainer }
                        buttonStyle={ [styles.btnStyle, { backgroundColor: '#856404' }] }
                        onPress={() => setFormType('quarantine') }
                    />
                    <Button
                        raised
                        disabled={ user.positive ? true : false }
                        disabledStyle={{ opacity: 0.5 }}
                        title={'Mark Positive'}
                        titleStyle={[ fs(10) ]}
                        containerStyle={ styles.btnContainer }
                        buttonStyle={ [styles.btnStyle, { backgroundColor: '#bd2130' }] }
                        onPress={() => onAlertMarkPositive() }
                    />
                </View>
            }
            {
                user.quarantine &&
                <View style={ styles.quarantineContainer }>
                    <Text style={ styles.quarantineText }>
                        This person is under { user.quarantine.days} days QUARANTINE!
                    </Text>
                    <Text style={ styles.quarantineText }>
                        Remaining days { getRemainingDays(user.quarantine) }
                    </Text> 
                </View>
            }
            {
                user.positive &&
                <View style={ styles.quarantineContainer }>
                    <Text style={ styles.quarantineText }>
                        This person is positive in Covid Virus!
                    </Text>
                </View>
            }
            {
                onSetForm()
            }
            <View style={ styles.bottomContainer }>
                {
                    !formType &&
                    <Button
                        containerStyle={{ marginVertical: 10 }}
                        buttonStyle={{ backgroundColor: '#6c757d' }}
                        title={ closeLabel }
                        onPress={ () => onClose() }
                    />
                }
            </View>
        </Modal>
    )
}

export default UserReportModal;

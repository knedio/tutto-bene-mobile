import React, { useState } from 'react';
import {
    ScrollView,
    View,
    Text,
    Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button, CheckBox } from 'react-native-elements';
import { fs, fw, ta, ffd, m, mh } from '_assets/globalStyles';
import { userReportActions, alertActions } from '_actions';
import styles from './styles';

const UserReportForm = ( { onCancel } ) => {

    const dispatch = useDispatch();
    const { user } = useSelector( state => state.user );
    const [reportForm, setReportForm] = useState({
        user_id: null,
        findings: [],
        isWell: 1,
    });

    const finds = [
        'fever',
        'cough',
        'shortness of breath',
        'sore throat',
        'fatigue',
    ];

    const onSubmit = async () => {
        try {
            await dispatch(alertActions.setScreenLoading(true));
            const { report } = await dispatch(userReportActions.store({
                ...reportForm,
                user_id: user.id,
                isWell: reportForm.findings.length > 0 ? 0 : 1,
            }));
            setReportForm({
                user_id: null,
                findings: [],
                isWell: 1,
            });
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

    const onAddFindings = (value) => {
        setReportForm({
            ...reportForm,
            findings: (reportForm.findings.includes(value))
                ? reportForm.findings.filter( find => find != value )
                : [
                    ...reportForm.findings,
                    value
                ]
        });
    }

    const onCancelSickForm = () => {
        setReportForm({
            user_id: null,
            findings: [],
            isWell: 1,
        });
        onCancel();
    }

    return (
        <View style={ [m(20)], { flex: 1 } }>
            <Text style={ [fs(16), fw('bold'), ta('center'), { marginTop: 10 } ] }>
                Add Finding
            </Text>
            <ScrollView style={ [ffd('column'), mh(1)] }>
                {
                    finds.map( (find, index) => (
                        <CheckBox
                            key={ index }
                            textStyle={{ textTransform: 'capitalize' }}
                            title={ find }
                            checked={ reportForm.findings.includes(find) }
                            onPress={ () => onAddFindings(find) }
                        />
                    ))
                }
            </ScrollView>
            <View style={ styles.bottomContainer }>
                <Button
                    containerStyle={{ marginVertical: 10 }}
                    title='Submit'
                    onPress={ () => onSubmit() }
                />
                <Button
                    containerStyle={{ marginVertical: 10 }}
                    buttonStyle={{ backgroundColor: '#6c757d' }}
                    title='Cancel'
                    onPress={ () => onCancelSickForm() }
                />
            </View>
        </View>
    )
}

export default UserReportForm

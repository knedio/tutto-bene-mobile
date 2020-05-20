import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { Button } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { fs, ta, ffd, fjc } from '_assets/globalStyles';
import InputField from '_molecules/Form/InputField';
import UserReportModal from '_organisms/Modals/UserReportModal';
import { userActions, alertActions } from '_actions';
import styles from './styles';

const Home = ( { navigation } ) => {
 
    const dispatch = useDispatch();
	const { loggedUser } = useSelector( state => state.auth );
    const [scanType, setScanType] = useState('qr-code');
    const [scanner, setScanner] = useState({});
    const [serialNo, setSerialNo] = useState('');
    const [qrCode, seetQRCode] = useState(false);
    const [showURModal, setShowURModal] = useState(false);

    useEffect( () => {
        seetQRCode(true)
        navigation.addListener('willFocus', () => seetQRCode(true) );
        navigation.addListener('willBlur', () => seetQRCode(false) );
        setScanType('qr-code');
        setScanner({});
        return (data) => {
            setScanType('qr-code');
            setScanner({});
        }
    }, [])

    const onRead = async ( { data } ) => {
        await dispatch(alertActions.setScreenLoading(true));
        try {
            if ( scanType == 'qr-code' ) {
                let userId = data.split('-').pop();
                const { detail } = await dispatch( userActions.getUser(userId) );
            } else {
                const { detail } = await dispatch( userActions.getBySerialNo(serialNo) );
            }
            await dispatch(alertActions.setScreenLoading(false));
            setShowURModal(true); 
        } catch (err) {
            await dispatch(alertActions.setScreenLoading(false));
            if (err.response && err.response.status == 404) {
                Alert.alert(
                    '',
                    err.response.data.message,
                );
            } else {
                Alert.alert(
                    '',
                    'Something went wrong!',
                );
            }
            if ( scanType == 'qr-code' ) {
                scanner.reactivate()
            }
        }
    }

    const onCloseURModal = () => {
        setShowURModal(false);
        if ( scanType == 'qr-code' ) {
            scanner.reactivate();
        }
    }

    const onSetScanType = () => {
        const type = (scanType == 'qr-code') ? 'serial-no' : 'qr-code';
        setScanType(type)
    } 

    return (
        <SafeAreaView style={ styles.container }>
            <UserReportModal
                closeLabel={ 'Scan Again' }
                showModal={ showURModal }
                onClose={ () => onCloseURModal() }
            />
            <View style={ styles.headerContainer }>
                <Text style={[ fs(20), ta('center') ]}>
                    Welcome { loggedUser.detail && `${loggedUser.detail.firstName}` }!
                </Text>
                <View style={[ ffd('row'), fjc('center') ]}>
                    <Text style={[ fs(16), ta('center') ]}>
                        Scan via { (scanType == 'qr-code') ? 'Serial No.' : 'QR Code'}?
                    </Text>
                    <TouchableOpacity
                        onPress={ () => onSetScanType() }
                    >
                        <Text style={[ fs(16), ta('center'), { color: '#3b99fc' } ]}>
                            {' '}Click here
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            {
                (scanType == 'qr-code' && qrCode) && 
                <View 
                    style={{ flex: 1 }}
                >
                    <QRCodeScanner
                        ref={ node => setScanner(node) }
                        onRead={ data => onRead(data) }
                        showMarker={ true }
                        containerStyle={{ flex: 1, }}
                        cameraStyle={{height:'100%', width:'100%',overflow: 'hidden'}}
                    />
                    <View style={ styles.bottomContainer }>
                        <Button
                            containerStyle={ styles.btnContainer }
                            title='Scan Again'
                            onPress={ () => scanner.reactivate() }
                        />
                    </View>
                </View>
            }
            {
                (scanType == 'serial-no') &&
                <View style={{ flex: 1 }}>
                    <View style={{ marginHorizontal: 25, flex: 1 }}>
                        <InputField
                            label='Serial No. :'
                            name=''
                            value={ serialNo }
                            onChangeText={ value => setSerialNo(value) }
                        />
                        <Button
                            disabled={ false }
                            disabledStyle={{ opacity: 0.5 }}
                            containerStyle={{ margin: 10 }}
                            title='Scan'
                            onPress={ () => onRead('') }
                        />
                    </View>
                </View>
            }
        </SafeAreaView>
    )
}

export default Home;
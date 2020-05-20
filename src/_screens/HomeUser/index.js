import React from 'react';
import {
    SafeAreaView,
    View,
    Text,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';

const HomeUser = ({ navigation }) => {
 
    const onRead = (data) => {
        console.log('data', data)
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text style={{ fontSize: 30, textAlign: 'center' }}>
                    Welcome!
                </Text>
                <Text style={{ fontSize: 30, textAlign: 'center' }}>
                    HomeUser Screen.
                </Text>
                <QRCodeScanner
                    onRead={ (data) => onRead(data) }
                />
            </View>
        </SafeAreaView>
    )
}

export default HomeUser;
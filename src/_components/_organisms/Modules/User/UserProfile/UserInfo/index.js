import React from 'react';
import { ScrollView, View, Text, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { API_STORAGE_URL } from '_services/global-variables';
import styles from './styles';

const UserInfo = () => {

    const { user } = useSelector( state => state.user );

    return (
        <ScrollView style={ styles.container }>
            <View style={ styles.infoContainer }>
                <View style={ styles.infoLabelContainer }>
                    <Text style={ styles.infoLabel }> Serial No.  </Text>
                    <Text style={ styles.infoSymbol }>:</Text>
                </View>
                <Text style={ styles.infoContent }> { user && user.serialNo } </Text>
            </View>
            <View style={ styles.infoContainer }>
                <View style={ styles.infoLabelContainer }>
                    <Text style={ styles.infoLabel }> Address  </Text>
                    <Text style={ styles.infoSymbol }>:</Text>
                </View>
                <Text style={ styles.infoContent }> { user.detail && user.detail.address } </Text>
            </View>
            <View style={ styles.infoContainer }>
                <View style={ styles.infoLabelContainer }>
                    <Text style={ styles.infoLabel }> Phone No.  </Text>
                    <Text style={ styles.infoSymbol }>:</Text>
                </View>
                <Text style={ styles.infoContent }> { user.detail && user.detail.phoneNo } </Text>
            </View>
            <View style={ styles.infoContainer }>
                <View style={ styles.infoLabelContainer }>
                    <Text style={ styles.infoLabel }> Gender  </Text>
                    <Text style={ styles.infoSymbol }>:</Text>
                </View>
                <Text style={ styles.infoContent }> { user.detail && user.detail.gender } </Text>
            </View>
            {
                user.id &&
                <View style={styles.qrContainer}>
                    <Image
                        style={{ width: 300, height: 300 }}
                        source={{
                            uri: `${API_STORAGE_URL}users/user-${user.id}/qrcode-user-${user.id}.png`
                        }}
                        resizeMode={'cover'}
                    />
                </View>

            }
        </ScrollView>
    )
}

export default UserInfo

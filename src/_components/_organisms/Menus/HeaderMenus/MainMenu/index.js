import React from 'react';
import { 
    TouchableHighlight, 
} from 'react-native';
import { Icon, Header, } from 'react-native-elements';
import styles from './styles';

const MainMenu = ( {navigation, title} ) => {
    return (
        <Header
            leftComponent={
                <TouchableHighlight
                    underlayColor={'#fff'}
                    onPress={() => navigation.openDrawer()}
                >
                    <Icon
                        name='menu'
                        size={20}
                        color='black'
                        containerStyle={styles.leftContainer}
                    />
                </TouchableHighlight>
            }
            centerComponent={{ 
                text: title, 
                style: styles.titleStyle
            }}
            containerStyle={ styles.contianer }
        />
    )
}

export default MainMenu;

import {
    Platform, 
} from 'react-native';

export default {
    contianer: {
        marginTop: Platform.OS === 'ios' ? 0 : -26,
        paddingLeft: 0,
        marginBottom: 0,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    titleStyle: {
        color: 'black', 
        fontSize: 14
    },
    leftContainer: {
        width: 48,
        height: 48,
        borderRadius: 48/2,
        justifyContent: 'center', 
        alignItems: 'center', 
    }
}
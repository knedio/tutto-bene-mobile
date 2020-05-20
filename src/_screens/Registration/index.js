import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { 
    SafeAreaView, 
    ScrollView, 
    View, 
    Text, 
    TouchableOpacity,
    Alert,
} from 'react-native';
import { Button } from 'react-native-elements';
import InputField from '_molecules/Form/InputField';
import { authActions, alertActions } from '_actions';
import { onDownloadFile } from '_services/custom-function.service';
import { API_STORAGE_URL } from '_services/global-variables';
import styles from './styles';

const LoginScreen = ({navigation}) => {

    const dispatch = useDispatch();
    const [registerForm, setRegisterForm] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        address: '',
        gender: '',
        password: '',
        confirmPassword: ''
    }); 
    const [ errorMessages, setErrorMessages ] = useState([]);

    const onChangeInput = (name, value) => {
        setRegisterForm( data => ({
            ...data,
            [name]: value
        }));
    }

    const onSubmit = async () => {
        try {
            await dispatch(alertActions.setScreenLoading(true));
            const { user } = await dispatch(authActions.register(registerForm));
            setRegisterForm({
                firstName: '',
                middleName: '',
                lastName: '',
                email: '',
                address: '',
                gender: '',
                password: '',
                confirmPassword: ''
            });
            Alert.alert(
                'Do you want to download the QR Code?',
                "Please click 'Yes' to download the QR Code so that you will have a copy of it. Also here's your serial no. '" + user.detail.serialNo + "'.",
                [
                    { text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel' },
                    { text: 'Yes', onPress: () => onDownloadFile(API_STORAGE_URL + user.detail.qrCode) },
                ],
                { cancelable: false }
            );
            await dispatch(alertActions.setScreenLoading(false));
            navigation.navigate('Login');
        } catch ( err ) {
            if(err.response && err.response.status === 422) {
                setErrorMessages(err.response.data.errors);
            }
            await dispatch(alertActions.setScreenLoading(false));
        }
        
    }

    return (
        <SafeAreaView style={ styles.container }>
            <ScrollView contentContainerStyle={ styles.scrollContainer }>
                <View style={{ marginHorizontal: 10 }}>
                    <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>
                        Registration Page
                    </Text>
                </View>
                <View>
                    <InputField
                        label='First Name :'
                        name='firstName'
                        value={ registerForm.firstName }
                        placeholder=''
                        errorMessage={ errorMessages.firstName }
                        onChangeText={ value => onChangeInput('firstName', value) }
                    />
                    <InputField
                        label='Middle Name :'
                        name='middleName'
                        value={ registerForm.middleName }
                        errorMessage={ errorMessages.middleName }
                        onChangeText={ value => onChangeInput('middleName', value) }
                    />
                    <InputField
                        label='Last Name :'
                        name='lastName'
                        value={ registerForm.lastName }
                        errorMessage={ errorMessages.lastName }
                        onChangeText={ value => onChangeInput('lastName', value) }
                    />
                    <InputField
                        label='Email Address :'
                        name='email'
                        value={ registerForm.email }
                        autoCapitalize='none'
                        errorMessage={ errorMessages.email }
                        onChangeText={ value => onChangeInput('email', value) }
                    />
                    <InputField
                        label='Address :'
                        name='address'
                        value={ registerForm.address }
                        errorMessage={ errorMessages.address }
                        onChangeText={ value => onChangeInput('address', value) }
                    />
                    <InputField
                        label='Gender :'
                        name='gender'
                        value={ registerForm.gender }
                        errorMessage={ errorMessages.gender }
                        onChangeText={ value => onChangeInput('gender', value) }
                    />
                    <InputField
                        label='Password :'
                        secureTextEntry={true}
                        name='password'
                        value={ registerForm.password }
                        autoCapitalize='none'
                        errorMessage={ errorMessages.password }
                        onChangeText={ value => onChangeInput('password', value) }
                    />
                    <InputField
                        label='Confirm Password :'
                        secureTextEntry={true}
                        name='confirmPassword'
                        value={ registerForm.confirmPassword }
                        autoCapitalize='none'
                        errorMessage={ errorMessages.confirmPassword }
                        onChangeText={ value => onChangeInput('confirmPassword', value) }
                    />
                </View>
                <Button 
                    containerStyle={ styles.loginBtnContaniner }
                    title='Create an Account' 
                    onPress={ () => onSubmit() } 
                />
                <View>
                    <TouchableOpacity
                        onPress={  () => navigation.navigate('Login') }
                    >
                        <Text style={[ styles.navigateTextStyle, { color: '#3b99fc' } ]}>
                            Back to Login
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
   )
}

export default LoginScreen;
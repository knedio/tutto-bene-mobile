import React, { Component } from 'react';
import { Input } from 'react-native-elements';
import styles from './styles';

export default class InputField extends Component {
    
    render() {
        const { value, label, errorMessage, ...otherProps } = this.props;

        return (
            <Input
                { ...otherProps }
                label={ label || '' }
                value={ value }
                inputContainerStyle={ styles.inputContainerStyle }
                labelStyle={[ styles.inputLabelStyle, { marginTop: label ? 5 : 0 } ]}
                inputStyle={ styles.inputStyle }
                errorMessage={ errorMessage }
                errorStyle={ styles.errorStyle }
                onChangeText={ value => this.props.onChangeText(value) }
            />
        )
    }
}

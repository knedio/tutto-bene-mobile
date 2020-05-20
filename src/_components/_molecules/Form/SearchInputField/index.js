import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Input, } from 'react-native-elements';
import styles from './styles';

const SearchInputField = ( { data, label, onChange } ) => {

    const [search, setSearch] = useState('');
    
    const onFilterData = (value) => {
        let tempData = (value == '') ? data : data.filter((item) => onSearchObject(item, value));
        setSearch(value);
        onChange(tempData);
    }

    const onSearchObject = ( object, search, except = [] ) => {
		except = [
            ...except,
            'id',
            'created_at',
            'updated_at',
        ];
		if(typeof object == 'object' && object){
			return Object.keys(object).some( key => {
				let keySplit = key.split('_');
				if( !except.includes(key) && keySplit[keySplit.length-1] != 'id' ) {
					if(typeof object[key] == 'object') {
						return onSearchObject(object[key],search);
					}else{
	                    return String(object[key]).toLowerCase().indexOf(search.toLowerCase()) > -1;
					}
				}
            })
		}
		return false;
    }

    return (
        <Input
            value={ search }
            onChangeText={ value => onFilterData( value ) }
            placeholder={ label }
            inputContainerStyle={ styles.inputContainerStyle }
            inputStyle={ styles.inputStyle }
            labelStyle={ styles.inputLabelStyle }
        />
    )
}

export default SearchInputField;
import RNFetchBlob from 'rn-fetch-blob';
import {
    PermissionsAndroid,
    Alert,
} from 'react-native';

export {
    toFormData, // this function will convert the data passed into form data format
    onDownloadFile, // this function will download the file
};

const toFormData = (data) => {
    let form_data = new FormData();
    Object.keys(data).map( (key,index) => {
        if (Array.isArray(data[key]) && data[key].length > 0) {
            for( let i = 0; i < data[key].length; i++ ){
                if(!(data[key][i] instanceof File) && typeof data[key][i] === 'object' && key != 'attachments') {
                    Object.keys(data[key][i]).map( (key2) => {
                        form_data.append(`${key}[${i}][${key2}]`,  data[key][i][key2]);
                    });
                } else {
                    form_data.append(`${key}[${i}]`,  data[key][i]);
                }
            }
        }else{
            if(!(data[key] instanceof File) && typeof data[key] === 'object' && key != 'attachment') {
                Object.keys(data[key]).map( (key2) => {
                    form_data.append(`${key}[${key2}]`, data[key][key2]);
                });
            } else {
                form_data.append(key, data[key]);
            }
        }
    });

    return form_data;
}

const onDownloadFile = async (data) =>  {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
                title: 'Storage Permission!',
                message: 'We need to access your storage to download the file.'
            }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            downloadFile(data);
        } else {
            Alert.alert(
                'Permission Denied!',
                'You need to give us the access to downlaod the file.'
            );
        }
        return true;
    } catch (err) {
        throw err;
    }
}

const extention = (filename) => {
    return filename.split('.').pop();
}

const downloadFile = (path) => {
    let date = new Date();
    let dirs = RNFetchBlob.fs.dirs;
    const { config } = RNFetchBlob
    config({
        fileCache: true,
        addAndroidDownloads: {
            useDownloadManager: true,
            notification: true,
            path: dirs.DownloadDir + '/tutto_bene_' + Math.floor(date.getTime() + date.getSeconds() / 2) + '.' + extention(path),
        }
    }).fetch('GET', path).then( (res) => {
        Alert.alert('','Successful! File downloaded.');
    }).catch(err => {
        Alert.alert('','Unsuccessful! File not downloaded.');
    });
}
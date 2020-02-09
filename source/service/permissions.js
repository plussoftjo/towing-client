import {Alert,Linking} from 'react-native';

/** Return when Permissions Denet */


const permissions = {
    _onPermissionDeney:function() {
        Alert.alert('Location Off','Please Turn The Location Service On',[
            {text:'Setting',onPress: () => Linking.openURL('app-settings:')},
            {text:'OK',onPress: () => console.log('OK'),style: 'cancel'}
        ],{cancelable:false});
    }
}

export default permissions;
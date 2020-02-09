import React from 'react';
import {View,Text }from 'react-native';
import {Spinner} from 'native-base';

export default class Loader extends React.Component {
    render() {
        return(
            <View style={{position:'absolute',left:0,top:0,width:'100%',height:'100%'}}>
                <View style={{flex:1,justifyContent:'center',alignItems:'center',alignContent:'center'}}>
                    <Spinner color="blue" />
                </View>
            </View>
        )
    }
}
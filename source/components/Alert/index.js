import React from 'react';
import {View,Text} from 'react-native';
import * as Animatable from 'react-native-animatable';
export default class Alert extends React.Component {
    render() {
        return (
            <Animatable.View animation="flipInX" duration={300} style={{backgroundColor:'#e74c3c',paddingVertical:9,paddingHorizontal:16,borderTopColor:'#c0392b',borderTopWidth:5,marginTop:10}}>
                <Text style={{fontWeight:'600',fontFamily:'Roboto_medium',fontSize:16,color:'white'}}>
                    {this.props.children}
                </Text>
            </Animatable.View>
        )
    }
}
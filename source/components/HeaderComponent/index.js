import React from 'react';
import {View,SafeAreaView} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import {Icon,Text} from 'native-base';
export default class HeaderComponent extends React.Component {
    render() {
        return (
            <LinearGradient
            colors={['#93C6F9', '#97B4FA', '#A768FE']}
            start={[0, 0]}
            end={[1, 1]}
            location={[0.25, 0.4, 1]}
            style={{height:'auto'}}
            >
                {this.props.leftIcon &&
                <Icon onPress={this.props.leftIcon.onPress} type={this.props.leftIcon.type} name={this.props.leftIcon.name} style={{color:'white',fontSize:50,marginTop:30,marginLeft:5}}></Icon>
                }
                <View style={{flexDirection:'column',padding:20,paddingTop:10}}>
                    <Text style={{fontSize:32,color:'white',fontWeight:'700'}}>{this.props.topTitle}</Text>
                    <View style={{height:10}}></View>
                    <Text style={{color:'white',fontSize:16}}>{this.props.bottomTitle}</Text>
                </View>
            </LinearGradient>
        )
    }
}
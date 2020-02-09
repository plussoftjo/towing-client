import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {Icon} from 'native-base';
import * as Animatable from 'react-native-animatable';
export default class MiniInfoCard extends React.Component {
    render() {
        return (
            <TouchableOpacity onPress={() =>{this.props.pressed();}} style={{width:'100%'}}>
                <Animatable.View animation="zoomInUp" style={styles.cardStyle}>
                    <Icon type={this.props.iconType} name={this.props.icon} style={{fontSize:18}}></Icon>
                    <View style={{width:10}}></View>
                    <Text style={{fontWeight:'700',fontSize:16}}>{this.props.text}</Text>
                </Animatable.View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    cardStyle: {
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 5,
      elevation: 3,
      backgroundColor:'white',marginLeft:20,marginRight:20,padding:18,borderRadius:5,borderWidth:1.5,borderColor:'rgba(0,0,0,0.6)',flexDirection:'row',alignItems:'center'
    }
  });
  
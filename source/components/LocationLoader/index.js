import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { LottieFiles } from '../../commons';
import LottieView from "lottie-react-native";
import * as Animatable from 'react-native-animatable';

export default class LocationLoader extends React.Component {
    componentDidMount() {
        this.animation.play(); // Start Lottie Animation
    }
    render() {
        return (
            <View style={{position:'absolute',width:'100%',height:'100%',zIndex:101,justifyContent:'center',alignItems:'center',alignContent:'center',backgroundColor:'rgba(0,0,0,0.2)'}}>
                <LottieView
                ref={animation => {
                    this.animation = animation;
                }}
                style={{
                    width: 300,
                    height: 300,
                }}
                source={LottieFiles.FindLocation}
                />
                <Animatable.Text iterationCount="infinite" duration={5000} animation="flash" style={{color:'white',fontSize:22,fontWeight:'600',color:'white'}}>Fetching Your Location</Animatable.Text>
            </View>
        )
    }
}
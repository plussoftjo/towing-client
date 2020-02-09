import React from 'react';
import {View,Text} from 'react-native';
import LottieView from "lottie-react-native";
import { LottieFiles } from '../../commons';
export default class DoneAnimation extends React.Component {
    render() {
        return (
            <View style={{position:'absolute',left:0,top:0,height:'100%',width:'100%',justifyContent:'center',alignContent:'center',alignItems:'center',backgroundColor:'rgba(0,0,0,0.3)',zIndex:150}}>
                <View style={{paddingVertical:0,paddingHorizontal:0,backgroundColor:'#ecf0f1',borderRadius:10,justifyContent:'center',alignItems:'center',alignContent:'center'}}>
                    <LottieView
                        ref={animation => {
                            this.animation = animation;
                        }}
                        style={{
                            width: 200,
                            height: 200,
                        }}
                        loop={false}
                        autoPlay
                        source={LottieFiles.progress}
                    />
                    {this.props.done_title &&
                    <Text style={{textAlign:'center',color:'#2ecc71',fontWeight:'700'}}>{this.props.done_title}</Text>
                    }
                </View>
            </View>
        )
    }
}
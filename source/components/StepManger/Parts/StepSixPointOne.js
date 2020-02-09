import React from 'react';

/** Components */
import {View,Text,Image,TouchableOpacity,Alert} from 'react-native';

import * as Animatable from 'react-native-animatable';
import call from 'react-native-phone-call'
import { GiftedChat } from 'react-native-gifted-chat'
import Modal from "react-native-modal";
import {Icon} from 'native-base';
import axios from 'axios';
import Images from '../../../commons/Images';

import {inject,observer} from 'mobx-react';

@inject('socketmanger')
@inject('processor')
@inject('settings')
@observer
export default class StepSixPointOne extends React.Component {
    componentDidMount() {
        let self = this;

        let start_direction_route = function() {
            /** turn on layout polyline */
            self.props.manger.mapLayout.target_directions = true;
            self.props.manger._change_step(7);
        }
        self.props.socketmanger.when_start_the_route(start_direction_route);


        let end_route = function() {
            // Reinstall map layout
            self.props.manger._reMapLayoutValue();
            // Animate to user location 
            self.props.map.animateToRegion({
                latitude:self.props.locations.user_coords.latitude,
                longitude:self.props.locations.user_coords.longitude,
                latitudeDelta:0.015,
                longitudeDelta:0.0121
            });
            /** Change manger to step 0 */
            self.props.manger._change_step(8);
        }

        self.props.socketmanger.end_route(end_route);

    }
    render() {
        return [
            <View key="TopText" style={{position:'absolute',top:0,left:0,width:'100%'}}>
                <View style={{padding:20,paddingTop:'20%'}}>
                    <Animatable.Text iterationCount="infinite" duration={5000} animation="flash" style={{fontWeight:'700',fontSize:16,textAlign:'center',color:'rgba(0,0,0,0.6)'}}>On Service</Animatable.Text>
                    <View style={{justifyContent:'center',alignItems:'center'}}>
                        <View style={{height:2,width:'60%',backgroundColor:'rgba(0,0,0,0.4)',borderRadius:2 /2,marginTop:5}}>

                        </View>
                    </View>
                </View>
            </View>,
            <Animatable.View animation="slideInUp"  key="stander" style={{position:'absolute',bottom:0,left:0.5,right:0.5}}>
                <View style={{borderTopRightRadius:50,borderTopLeftRadius:50,backgroundColor:'white',width:'100%',shadowColor: "#000",shadowOffset: {width: 0,height: 2,},shadowOpacity: 0.25,shadowRadius: 3.84,elevation: 5,borderColor:'#0D0D0D',borderWidth:2}}>
                    <TouchableOpacity onPress={() => {}} style={{justifyContent:'center',alignContent:'center',alignItems:'center',width:'100%',paddingLeft:'30%',paddingRight:'30%',paddingTop:10,paddingBottom:15}}>
                        <View style={{height:2,width:'100%',backgroundColor:'rgba(0,0,0,0.4)',borderRadius:2 /2}}></View>
                    </TouchableOpacity>
                    <View style={{flexDirection:'row',paddingLeft:30,paddingRight:30,paddingTop:10,paddingBottom:10,alignItems:'center'}}>
                        <View style={{width:'30%',justifyContent:'center',alignItems:'center'}}>
                            <Image source={Images.avatar} style={{width:60,height:60,borderRadius:60 / 2}} resizeMode="cover" />
                        </View>
                        <View style={{flexDirection:'column',width:'80%',justifyContent:'center'}}>
                            <TouchableOpacity onPress={() => {this._start_route();}}>
                                <Text style={{fontWeight:'700',fontSize:18,color:'rgba(0,0,0,0.4)'}}>{this.props.processor.driver.name}</Text>
                            </TouchableOpacity>
                            <View style={{height:3}}></View>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <Icon name="star" style={{fontSize:24,color:'#82B1FF'}} />
                                <View style={{width:5}}></View>
                                <Text style={{fontWeight:'600',fontSize:16}}>4.3</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-around',paddingRight:0,paddingLeft:0,paddingTop:5,paddingBottom:20}}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                                <Text style={{fontWeight:'700',color:'rgba(0,0,0,0.4)',fontSize:14}}>{this.props.processor.driver.driver_car.car_type}</Text>
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Text style={{fontWeight:'700',color:'rgba(0,0,0,0.4)',fontSize:14}}>{this.props.processor.service.main_service}</Text>
                        </View>
                    </View>
                </View>
            </Animatable.View>
        ]
    }
}
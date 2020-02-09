import React from 'react';

/** Components */
import {View,Text,StyleSheet,ScrollView,Image,TouchableOpacity} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Icon,Button} from 'native-base';
import {LottieFiles} from '../../../commons';
import LottieView from "lottie-react-native";
import {inject,observer} from 'mobx-react';
import Alert from '../../Alert'
@inject('auth')
@inject('processor')
@inject('drivers')
@inject('manger')
@inject('pricing')
@inject('socketmanger')
@observer

export default class StepSeven extends React.Component {
    constructor(props) {
        super(props);

        this.state ={error:false};
    }
    render() {
        let manger = this.props.manger;
        let map = this.props.map;
        let locations = this.props.locations;
        return [
            <View key={'top'} style={{position:'absolute',top:0,left:0}}>
            <View style={{paddingTop:30,paddingLeft:15,paddingBottom:20}}>
                <Icon onPress={() => {
                    /** When back */

                    // Reset driver
                    this.props.drivers._reSet();
                    // Back in manger
                    this.props.manger._change_step(6)}
                    } type="EvilIcons" name="arrow-left" style={{fontSize:48}} ></Icon>
            </View>
            </View>,
            <Animatable.View key={'bottom'} animation="slideInUp" style={{position:'absolute',bottom:0,left:0,width:'100%'}}>
                <View style={{borderTopRightRadius:50,borderTopLeftRadius:50,backgroundColor:'white',width:'100%',shadowColor: "#000",shadowOffset: {width: 0,height: 2,},shadowOpacity: 0.25,shadowRadius: 3.84,elevation: 5,borderColor:'#0D0D0D',borderWidth:2}}>
                    <TouchableOpacity onPress={() => {}} style={{justifyContent:'center',alignContent:'center',alignItems:'center',width:'100%',paddingLeft:'30%',paddingRight:'30%',paddingTop:10,paddingBottom:0}}>
                        <View style={{height:2,width:'100%',backgroundColor:'rgba(0,0,0,0.4)',borderRadius:2 /2}}></View>
                    </TouchableOpacity>
                     <View style={{paddingTop:0,width:'100%',paddingRight:15,paddingLeft:15}}>
                        <View style={{borderWidth:1,padding:5,paddingRight:15,paddingLeft:30,borderColor:'rgba(0,0,0,0.5)',flexDirection:'row',alignItems:'center',justifyContent:'space-between',borderTopLeftRadius:10,borderTopRightRadius:10,marginTop:20}}>
                                <View style={{justifyContent:'center'}}>
                                    <LottieView
                                    ref={animation => {
                                        this.animation = animation;
                                    }}
                                    style={{
                                        width: 30,
                                        height: 30,
                                    }}
                                    loop={true}
                                    source={LottieFiles.vehicle}
                                    autoPlay
                                    />
                                </View>
                                <View style={{width:5}}></View>
                                <View >
                                    <Text style={{fontWeight:'600',fontFamily:'Roboto_medium',textAlign:'center'}}>{this.props.auth.active_car.car_make}</Text>
                                    <Text style={{fontWeight:'600',fontFamily:'Roboto_medium',textAlign:'center'}}>{this.props.auth.active_car.car_model}</Text>
                                </View>
                        </View>
                    </View>
                    
                    <View style={{paddingTop:0,width:'100%',paddingRight:15,paddingLeft:15}}>
                        <View style={{borderWidth:1,borderColor:'rgba(0,0,0,0.5)',flexDirection:'row'}}>
                                <View style={{padding:5,paddingRight:10,paddingLeft:30,flexDirection:'row',alignItems:'center',width:'100%',justifyContent:'space-between'}}>
                                <View style={{justifyContent:'center'}}>
                                    <LottieView
                                    ref={animation => {
                                        this.animation = animation;
                                    }}
                                    style={{
                                        width: 30,
                                        height: 30,
                                    }}
                                    loop={true}
                                    source={LottieFiles.invoice}
                                    autoPlay
                                    />
                                </View>
                                    <View style={{width:10}}></View>
                                    <Text style={{fontWeight:'700',fontSize:18,color:'green',fontFamily:'Roboto_medium',textAlign:'center'}}>{this.props.pricing.currency.simple}{this.props.pricing.price.toFixed(1)}</Text>
                                </View>
                        </View>
                    <View style={{borderWidth:1,borderColor:'rgba(0,0,0,0.5)',flexDirection:'row'}}>
                            <View style={{padding:5,paddingLeft:35,flexDirection:'row',alignItems:'center',width:'100%',justifyContent:'space-between'}}>
                                <Icon type="AntDesign" style={{color:'#169BD7',fontSize:16}} name="earth"></Icon>
                                <View style={{width:5}}></View>
                                <Text style={{fontWeight:'600',fontSize:16,fontFamily:'Roboto_medium',textAlign:'center'}}>{this.props.processor.service.main_service}</Text>
                            </View>
                    </View>
                    {this.props.processor.service.sub_service != '' &&
                    <View style={{borderWidth:1,borderColor:'rgba(0,0,0,0.5)',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                            <View style={{padding:5,paddingLeft:35,flexDirection:'row',alignItems:'center',width:'100%',justifyContent:'space-between'}}>
                                <Icon type="MaterialIcons" name="sync-problem" style={{color:'#169BD7',fontSize:16}} ></Icon>
                                <View style={{width:5}}></View>
                                <Text style={{fontWeight:'600',fontSize:16,fontFamily:'Roboto_medium',textAlign:'center'}}>{this.props.processor.service.sub_service}</Text>
                            </View>
                    </View>
                    }
                    {this.props.processor.service.dropoff_location != '' &&
                    <View style={{borderWidth:1,borderColor:'rgba(0,0,0,0.5)',flexDirection:'row'}}>
                            <View style={{padding:5,paddingLeft:35,flexDirection:'row',alignItems:'center',width:'100%'}}>
                            <Icon type="AntDesign" name={'pushpino'} style={{color:'#bfc6ea',fontSize:16}}></Icon>
                                <View style={{width:5}}></View>
                                <Text style={{fontWeight:'800',fontSize:10,fontFamily:'Roboto_medium',textAlign:'center'}}>{this.props.processor.service.dropoff_location}</Text>
                            </View>
                    </View>
                    }
                    <View style={{borderWidth:1,borderColor:'rgba(0,0,0,0.5)',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                            <View style={{padding:5,paddingLeft:30,flexDirection:'row',alignItems:'center',width:'100%',justifyContent:'space-between'}}>
                                <View style={{justifyContent:'center'}}>
                                    <LottieView
                                    ref={animation => {
                                        this.animation = animation;
                                    }}
                                    style={{
                                        width: 20,
                                        height: 20,
                                    }}
                                    loop={true}
                                    source={LottieFiles.credit}
                                    autoPlay
                                    />
                                </View>
                                <View style={{width:10}}></View>
                                <Text style={{fontWeight:'600',fontSize:16,fontFamily:'Roboto_medium',textAlign:'center'}}>{this.props.processor.service.payment_options == 'card' ? "Credit Card":"PayPal"}</Text>
                            </View>
                    </View> 
                        {this.state.error &&
                        <Alert>There are no truck available</Alert>
                        }
                    </View>
                    <View style={{width:'100%',marginTop:20 ,backgroundColor:'black',flexDirection:'row'}}>
                        <View style={{width:'50%'}}>
                        <Button onPress={async() => {
                                let self = this;
                                if(this.props.drivers.selected_driver.have_driver) {
                                    map.animateToRegion({
                                        latitude:locations.map_coords.latitude,
                                        longitude:locations.map_coords.longitude,
                                        latitudeDelta:0.015,
                                        longitudeDelta:0.0121
                                    });
                                    manger._reMapLayoutValue();
                                    manger._change_step(8);
                                }else {
                                    this.setState({error:true});
                                }
                              
                            }} success block><Text style={{color:'white',borderRadius:0,fontWeight:'700',fontSize:18}}>{this.props.drivers.selected_driver.have_driver?'Approve':'Approve'}</Text></Button>
                        </View>
                            <View style={{width:'50%'}}>
                                <Button onPress={async() => {
                                    let self = this;
                                    manger._reMapLayoutValue();
                                    manger._change_step(0);
                                }}  dark block><Text style={{color:'white',borderRadius:0,fontWeight:'700',fontSize:18}}>Cancel</Text></Button>
                            </View>
                    </View>
                    </View>
            </Animatable.View>
        ]
    }
}
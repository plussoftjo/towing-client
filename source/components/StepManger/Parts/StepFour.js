import React from 'react';

/** Components */
import {View,Text,StyleSheet,ScrollView,Image,TouchableOpacity,Alert} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Icon,Button} from 'native-base';

import {inject,observer} from 'mobx-react';

@inject('auth')
@inject('processor')
@inject('drivers')
@inject('pricing')
@inject('socketmanger')
@observer

export default class StepFour extends React.Component {
    render() {
        let manger = this.props.manger;
        let map = this.props.map;
        let locations = this.props.locations;
        return (
            <View style={{position:'relative',height:'100%'}}>
            <View style={{paddingTop:30,paddingLeft:15,paddingBottom:20}}>
                <Icon onPress={() => {
                    /** When back */

                    // Reset driver
                    this.props.drivers._reSet();
                    // Back in manger
                    this.props.manger._change_step(3)}
                    } type="EvilIcons" name="arrow-left" style={{fontSize:48}} ></Icon>
            </View>
            <Animatable.View animation="slideInUp" style={{position:'absolute',bottom:0,left:0,width:'100%'}}>
                <View style={{borderTopRightRadius:50,borderTopLeftRadius:50,backgroundColor:'white',width:'100%',shadowColor: "#000",shadowOffset: {width: 0,height: 2,},shadowOpacity: 0.25,shadowRadius: 3.84,elevation: 5,borderColor:'#0D0D0D',borderWidth:2}}>
                    <TouchableOpacity onPress={() => {}} style={{justifyContent:'center',alignContent:'center',alignItems:'center',width:'100%',paddingLeft:'30%',paddingRight:'30%',paddingTop:10,paddingBottom:0}}>
                        <View style={{height:2,width:'100%',backgroundColor:'rgba(0,0,0,0.4)',borderRadius:2 /2}}></View>
                    </TouchableOpacity>
                    <View style={{paddingTop:0,width:'100%',paddingRight:15,paddingLeft:15}}>
                        <View style={{borderWidth:1,padding:5,paddingRight:15,paddingLeft:30,borderColor:'rgba(0,0,0,0.5)',flexDirection:'row',alignItems:'center',borderTopLeftRadius:10,borderTopRightRadius:10,marginTop:20}}>
                                <View>
                                    <Icon name="car" type="MaterialCommunityIcons"></Icon>
                                </View>
                                <View style={{width:5}}></View>
                                <View >
                                    <Text style={{fontWeight:'600'}}>{this.props.auth.active_car.car_make}</Text>
                                    <Text style={{fontWeight:'600'}}>{this.props.auth.active_car.car_model}</Text>
                                </View>
                        </View>
                    </View>
                    <View style={{paddingTop:0,width:'100%',paddingRight:15,paddingLeft:15}}>
                        <View style={{borderWidth:1,borderColor:'rgba(0,0,0,0.5)',flexDirection:'row'}}>
                                <View style={{padding:5,paddingLeft:35,flexDirection:'row',alignItems:'center',width:'100%'}}>
                                    <Icon name="file-invoice-dollar" type="FontAwesome5"></Icon>
                                    <View style={{width:10}}></View>
                    <Text style={{fontWeight:'700',fontSize:18,color:'green'}}>{this.props.pricing.price.toFixed(1)}{this.props.pricing.currency.simple}</Text>
                                </View>
                        </View>
                        <View style={{borderWidth:1,borderColor:'rgba(0,0,0,0.5)',flexDirection:'row'}}>
                                <View style={{padding:5,paddingLeft:35,flexDirection:'row',alignItems:'center',width:'100%'}}>
                                    <Icon type="AntDesign" style={{color:'#169BD7',fontSize:24}} name="earth"></Icon>
                                    <View style={{width:5}}></View>
                                    <Text style={{fontWeight:'600',fontSize:16}}>{this.props.processor.service.main_service}</Text>
                                </View>
                        </View>
                        {this.props.processor.service.sub_service != '' &&
                        <View style={{borderWidth:1,borderColor:'rgba(0,0,0,0.5)',flexDirection:'row'}}>
                                <View style={{padding:5,paddingLeft:35,flexDirection:'row',alignItems:'center',width:'100%'}}>
                                    <Icon type="MaterialIcons" name="sync-problem"></Icon>
                                    <View style={{width:5}}></View>
                                    <Text style={{fontWeight:'600',fontSize:16}}>{this.props.processor.service.sub_service}</Text>
                                </View>
                        </View>
                        }
                        {this.props.processor.service.direction_name != '' &&
                        <View style={{borderWidth:1,borderColor:'rgba(0,0,0,0.5)',flexDirection:'row'}}>
                                <View style={{padding:5,paddingLeft:35,flexDirection:'row',alignItems:'center',width:'100%'}}>
                                <Icon type="AntDesign" name={'pushpino'} style={{color:'#bfc6ea'}}></Icon>
                                    <View style={{width:5}}></View>
                                    <Text style={{fontWeight:'800',fontSize:12}}>{this.props.processor.service.direction_name}</Text>
                                </View>
                        </View>
                        }
                        <View style={{borderWidth:1,borderColor:'rgba(0,0,0,0.5)',flexDirection:'row'}}>
                                <View style={{padding:5,paddingLeft:35,flexDirection:'row',alignItems:'center',width:'100%'}}>
                                    <Icon  name="card"></Icon>
                                    <View style={{width:10}}></View>
                                    <Text style={{fontWeight:'600',fontSize:16}}>Credit Card</Text>
                                </View>
                        </View>
                        {this.props.processor.service.note != ''&&
                        <View style={{borderWidth:1,borderColor:'rgba(0,0,0,0.5)',flexDirection:'row',borderBottomLeftRadius:10,borderBottomRightRadius:30}}>
                            <View style={{padding:5,paddingLeft:35,flexDirection:'row',alignItems:'center',width:'100%'}}>
                                <Icon type="SimpleLineIcons" style={{color:'#FFBF65'}} name="note"></Icon>
                                <View style={{width:10}}></View>
                                <Text style={{fontWeight:'600',fontSize:16}}>{this.props.processor.service.note}</Text>
                            </View>
                        </View>
                        }
                    </View>
                    <View style={{width:'100%',marginTop:20 ,backgroundColor:'black'}}>
                            <Button onPress={async() => {
                                let self = this;
                                map.animateToRegion({
                                    latitude:locations.map_coords.latitude,
                                    longitude:locations.map_coords.longitude,
                                    latitudeDelta:0.015,
                                    longitudeDelta:0.0121
                                });
                                manger._reMapLayoutValue();
                                // let order_data = {
                                //     user:self.props.auth.user,
                                //     user_coords:self.props.locations,
                                //     room:self.props.drivers.selected_driver.driver.id,
                                //     service:{
                                //         main_service:self.props.processor.service.main_service,
                                //         sub_service:self.props.processor.service.sub_service,
                                //         note:self.props.processor.service.note,
                                //         order_id:self.props.processor.service.order_id,
                                //         direction_name:self.props.processor.service.direction_name,
                                //         direction_polyline:self.props.processor.service.direction_polyline,
                                //         have_towing:self.props.processor.service.have_towing,
                                //     }
                                // };
                                // this.props.socketmanger.request_driver(order_data);
                                manger._change_step(5);
                    }} disabled={!this.props.drivers.selected_driver.have_driver?true:false} dark block><Text style={{color:'white',borderRadius:0,fontWeight:'700',fontSize:18}}>{this.props.drivers.selected_driver.have_driver?'Find Track':'No truck found!'}</Text></Button>
                    </View>
                </View>
            </Animatable.View>
        </View>
        )
    }
}
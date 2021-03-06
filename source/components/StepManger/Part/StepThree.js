import React from 'react';
import {View,Text,TouchableOpacity,StyleSheet,ScrollView} from 'react-native';
import { Item,Input,Icon,Button,Content,Picker } from 'native-base';
import * as Animatable from 'react-native-animatable';
import {inject,observer} from 'mobx-react';
import Modal from "react-native-modal";
import Alert from '../../Alert';
import {CarModel,ServiceModel,DropOff,Pickup} from './StepThreePart';
@inject('auth')
@inject('processor')
@inject('cartype')
@inject('pricing')
@inject('drivers')
@inject('locations')
@observer

export default class StepThree extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            show_cars_model:false,
            show_service_model:false,
            state:1,
            base_height:'auto',
            payment_method:undefined,
            error:false
        };
    }
    render() {
        let manger = this.props.manger;
        if(this.state.state == 1) {
            return [
                <View key="Top" style={{position:'absolute',left:0,top:0}}>
                    <View style={{paddingTop:30,paddingLeft:15,paddingBottom:0,flexDirection:'row'}}>
                        <Icon onPress={() => {
                            this.props.processor.service.main_service = '';
                            this.props.processor.service.sub_service = '';
                            this.props.processor.service.dropoff_location = '';
                            this.props.processor.service.have_towing = false;
                            this.props.manger._change_step(2);
                            }} type="EvilIcons" name="arrow-left" style={{fontSize:48}} ></Icon>
                    </View>
                </View>,
                <Animatable.View key="Half" duration={500} animation="slideInUp" style={{position:'absolute',bottom:0,left:0,width:'100%'}}>
                    <View style={{height:'100%',borderTopRightRadius:50,borderTopLeftRadius:50,backgroundColor:'white',width:'100%',shadowColor: "#000",shadowOffset: {width: 0,height: 2,},shadowOpacity: 0.25,shadowRadius: 3.84,elevation: 5,borderColor:'#0D0D0D',borderWidth:2}}>
                        <TouchableOpacity onPress={() => {}} style={{justifyContent:'center',alignContent:'center',alignItems:'center',width:'100%',paddingLeft:'30%',paddingRight:'30%',paddingTop:10,paddingBottom:0}}>
                            <View style={{height:2,width:'100%',backgroundColor:'rgba(0,0,0,0.4)',borderRadius:2 /2}}></View>
                        </TouchableOpacity>
                        <Content padder style={{padding:10,paddingTop:0}}>
                                <Text style={{fontWeight:'700',fontSize:18,fontFamily:'Roboto_medium'}}>Service Type</Text>
                                <View style={{height:15}}></View>
                                <TouchableOpacity onPress={() => {
                                    this.setState({show_service_model:true});
                                }} style={{flexDirection:'row',alignItems:'center',paddingHorizontal:10,paddingVertical:12,borderRadius:10,backgroundColor:'rgba(0,150,0,0.03)',borderWidth:1,borderColor:'rgba(0,255,0,0.1)'}}>
                                    <Icon type="AntDesign" style={{color:'#169BD7',fontSize:16}} name="earth"></Icon>
                                    <View style={{width:10}}></View>
                                    <Text style={{fontSize:16,fontWeight:'600'}}>{this.props.processor.service.main_service == ''?'Select Service':this.props.processor.service.main_service}</Text>
                                </TouchableOpacity>
                            {this.props.processor.service.sub_service !== '' &&
                            <View>
                                 <Text style={{fontWeight:'600',fontSize:12,fontFamily:'Roboto_medium'}}>Type</Text>
                                <TouchableOpacity onPress={() => {
                                    
                                }} style={{flexDirection:'row',alignItems:'center',paddingHorizontal:10,paddingVertical:12,borderRadius:10,backgroundColor:'rgba(0,150,0,0.03)',borderWidth:1,borderColor:'rgba(0,255,0,0.1)'}}>
                                    <Icon type="MaterialCommunityIcons"style={{color:'#169BD7',fontSize:16}} name="towing"></Icon>
                                    <View style={{width:10}}></View>
                                    <Text style={{fontSize:16,fontWeight:'600',fontFamily:'Roboto_medium'}}>{this.props.processor.service.sub_service}</Text>
                                </TouchableOpacity>
                            </View>
                            }
                            {this.props.processor.service.dropoff_location !== '' &&
                            <View>
                            <Text style={{fontWeight:'600',fontSize:12,fontFamily:'Roboto_medium'}}>Distance</Text>
                                <TouchableOpacity onPress={() => {
                                    
                                }} style={{flexDirection:'row',alignItems:'center',paddingHorizontal:10,paddingVertical:12,borderRadius:10,backgroundColor:'rgba(0,150,0,0.03)',borderWidth:1,borderColor:'rgba(0,255,0,0.1)'}}>
                                    <Icon type="AntDesign" name={'pushpino'} style={{color:'#bfc6ea',fontSize:16}}></Icon>
                                    <View style={{width:10}}></View>
                                    <Text style={{fontSize:16,fontWeight:'600',fontFamily:'Roboto_medium'}}>{this.props.processor.service.dropoff_location}</Text>
                                </TouchableOpacity>
                            </View>
                            }
                            {this.state.error &&
                            <Alert>Please Select Service .</Alert>
                            }
                        </Content>
                        <Button block dark large style={{borderRadius:0}} onPress={async() => {
                            let self = this;
                            this.setState({error:false});
                            if(this.props.processor.service.main_service == '') {
                                this.setState({error:true});
                            }else {
                                // Sign if have towing
                                this.props.processor.service.have_towing = this.props.processor.service.dropoff_location == ''? false:true
                                /** Priceng System */
                                /** Delete all the price */
                                self.props.pricing._install();
                                /** CarType Price */
                                let price = 0;
                                let car_price = this.props.cartype.car_type[this.props.processor.car_type].price *1;
                                price  = car_price + price;
                                /** Service */
                                let service_price = 0;
                                let get_price = async() => {
                                let price = 0;
                                await this.props.cartype.service.forEach(async(trg) => {
                                    if(trg.title == this.props.processor.service.main_service) {
                                        let price = trg.price;
                                        service_price = price * 1;

                                    }
                                });
                                }
                                await get_price();
                                price = price + service_price;
                                /** Sub Service */
                                let sub_service_price = 0;
                                let get_sub_price = async() => {
                                let price = 0;
                                await this.props.cartype.sub_service.forEach(async(trg) => {
                                    if(trg.title == self.props.processor.service.sub_service) {
                                        let price = trg.price;
                                        sub_service_price = price * 1;

                                    }
                                });
                                }
                                await get_sub_price();
                                price = price + sub_service_price;

                                /** Distance matrix price */
                                if(self.props.processor.service.have_towing) {
                                let fare = 0;
                                let get_fare_price = async() => {
                                    let f =  await self.props.pricing._fare_caluclate(self.props.locations.directions_distance_matrix);
                                    fare = f;
                                }
                                await get_fare_price();
                                price = price + fare.kmfare * 1;
                                price = price + fare.timefare * 1;

                                }
                                await self.props.drivers._reSet();
                                await self.props.drivers._selected_driver(self.props.processor.car_type);
                                
                                /** Incress price in pricing system */
                                
                                this.props.pricing._inc(price);

                                this.props.processor.service.price = this.props.pricing.price;
                                manger._change_step(4);
                            }
                            
                        }}><Text style={{color:'white',fontWeight:'700',fontSize:16}}>Next</Text></Button>
                    </View>
                </Animatable.View>,
                <Modal key="CarModel" isVisible={this.state.show_cars_model}>
                        <CarModel onPressSave={() => {this.setState({show_cars_model:false});}} />
                </Modal>,
                <Modal key="ServiceModel" isVisible={this.state.show_service_model}>
                        <ServiceModel onPressSave={() => {
                            this.setState({show_service_model:false,error:false});
                            this.props.manger.service_model = 1;
                    }} onPressClose={() => {
                        this.setState({show_service_model:false,error:false});
                        this.props.manger.service_model = 1;
                        this.props.processor.service.main_service = '';
                        this.props.processor.service.sub_service = '';
                        this.props.processor.service.dropoff_location = '';
                        this.props.processor.service.have_towing = false;
                        this.props.manger._reMapLayoutValue();
                    }} onPressDestination={() => {this.setState({state:2});}} onPressPickup={() => {this.setState({state:4})}} />
                </Modal>
            ]
        }
        if(this.state.state == 2) {
            return (
                <DropOff  map={this.props.map} PressPlace={() => {this.setState({state:3});}} PressBack={() => {this.setState({state:1})}}/>
            )
        }
        if(this.state.state == 3) {
            return [
            <View key={'top'} style={{position:'absolute',top:0,left:0,width:'100%'}}>
                <View style={{paddingTop:30,paddingLeft:15,paddingBottom:0,flexDirection:'row'}}>
                    <Icon onPress={() => {this.setState({state:2});}} type="EvilIcons" name="arrow-left" style={{fontSize:48}} ></Icon>
                </View>
            </View>,
                <View key={'botom'} style={{position:'absolute',left:0,bottom:15,width:'100%',paddingLeft:20,paddingRight:20}}>
                    <View style={{width:'100%',backgroundColor:'white',marginBottom:3,borderColor:'black',borderWidth:1,borderRadius:5,paddingVertical:3}}>
                        <View style={{flexDirection:'row',justifyContent:'center'}}>
                            <View style={{width:'50%',justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                                <Icon type="MaterialCommunityIcons" name="map-marker-distance" style={{fontSize:22,color:'#27ae60'}} />
                                <Text style={{fontWeight:'700'}}>{this.props.locations.directions_distance_matrix.distance.text}</Text>
                            </View>
                            <View style={{width:'50%',justifyContent:'center',alignItems:'center',alignContent:'center'}}>
                                <Icon type="AntDesign" name="clockcircleo" style={{fontSize:22,color:'#27ae60'}} />
                                <Text style={{fontWeight:'700'}}>{this.props.locations.directions_distance_matrix.duration.text}</Text>
                            </View>
                        </View>
                    </View>
                    <Button dark block onPress={() => {
                        this.props.processor.service.have_towing = true;
                        this.setState({state:1});
                        }}><Text style={{color:'white'}}>Confirm</Text></Button>
                </View>
            ]
        }
        if(this.state.state == 4) {
            return (
                <Pickup  map={this.props.map} onUseCurrentLocation={() => {this.setState({state:1})}} PressPlace={() => {this.setState({state:5});}} PressBack={() => {this.setState({state:1})}}/>
            )
        }
        if(this.state.state == 5) {
            return [
            <View key={'top'} style={{position:'absolute',top:0,left:0,width:'100%'}}>
                <View style={{paddingTop:30,paddingLeft:15,paddingBottom:0,flexDirection:'row'}}>
                    <Icon onPress={() => {
                        this.props.processor.service.pickup = '';
                        this.setState({state:4});
                        }} type="EvilIcons" name="arrow-left" style={{fontSize:48}} ></Icon>
                </View>
            </View>,
                <View key={'bottom'} style={{position:'absolute',left:0,bottom:15,width:'100%',paddingLeft:20,paddingRight:20}}>
                    <View style={{width:'100%',backgroundColor:'white',marginBottom:3,borderColor:'black',borderWidth:1,borderRadius:5,padding:15}}>
                    <Text style={{fontFamily:'Roboto_medium'}}>{this.props.processor.service.pickup}</Text>
                    </View>
                    <Button success block onPress={() => {
                        
                        this.setState({state:1});
                        }}><Text style={{color:'white'}}>Confirm</Text></Button>
                        <View style={{height:15}}></View>
                        <Button block dark onPress={() => {
                        this.props.processor.service.pickup = '';
                        this.props.locations.pickup_coords = this.props.locations.user_coords;
                        this.setState({state:1});
                        }}><Text style={{color:'white'}}>Cancel</Text></Button>
                </View>
            ]
        }
    }
}
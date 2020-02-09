import React from 'react';
import {View,Text,TouchableOpacity,StyleSheet} from 'react-native';
import { Item,Input,Icon,Button,Content,Picker } from 'native-base';
import * as Animatable from 'react-native-animatable';
import {inject,observer} from 'mobx-react';
import Modal from "react-native-modal";
import StepOne from './StepOne'
import {CarModel} from './StepThreePart';
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
            service:'',
            sub_service:'',
            carType:'',
            note:'',
            base_height:'auto',
            services:[
                {title:'Towing',value:'towing',cash:0,sub_service:[
                    {title:'Lost Tir',value:'lost_tir',cash:0},
                    {title:'Prohin Evl',value:'prohin_evl',cash:0}
                ]},
                {title:'Flat Tire',value:'flat_tire',cash:0},
                {title:'Jump Start',value:'jump_start',cash:0},
                {title:'Gas Delivery',value:'gas_delivery',cash:0},
                {title:'Winch out',value:'winch_out',cash:0}
            ],
            payment_method:undefined,
            show_cars_model:false,
            have_towing:false,
            state:1,
            modal_show:'Select'
        };
    }
    render() {
        let locations = this.props.locations;
        let manger = this.props.manger;
        let map = this.props.map
        return (
            <View style={{position:'relative',height:'100%'}}>
                {this.state.state == 1&&
                     <View style={{position:'relative',height:'100%'}}>
                     <View style={{paddingTop:30,paddingLeft:15,paddingBottom:0,flexDirection:'row'}}>
                         <Icon onPress={() => {this.props.manger._change_step(0.1)}} type="EvilIcons" name="arrow-left" style={{fontSize:48}} ></Icon>
                     </View>
                     <Animatable.View animation="slideInUp" style={{position:'absolute',bottom:0,left:0,width:'100%',height:'auto'}}>
                         <View style={{borderTopRightRadius:50,borderTopLeftRadius:50,backgroundColor:'white',width:'100%',shadowColor: "#000",shadowOffset: {width: 0,height: 2,},shadowOpacity: 0.25,shadowRadius: 3.84,elevation: 5,borderColor:'#0D0D0D',borderWidth:2}}>
                         <TouchableOpacity onPress={() => {}} style={{justifyContent:'center',alignContent:'center',alignItems:'center',width:'100%',paddingLeft:'30%',paddingRight:'30%',paddingTop:10,paddingBottom:0}}>
                             <View style={{height:2,width:'100%',backgroundColor:'rgba(0,0,0,0.4)',borderRadius:2 /2}}></View>
                         </TouchableOpacity>
                         <Content>
                             <View style={{padding:30,paddingTop:15,paddingBottom:0,height:'100%'}}>
                                 <Content >
                                     <Text style={{fontWeight:'700',fontSize:14}}>Vehicle Type</Text>
                                        <View style={{paddingTop:2}}>
                                            <TouchableOpacity onPress={() => {
                                                this.setState({show_cars_model:true});
                                            }} style={{flexDirection:'row',alignItems:'center',padding:10,paddingTop:5,paddingBottom:5,borderRadius:10,backgroundColor:'rgba(0,150,0,0.03)',borderWidth:1,borderColor:'rgba(0,255,0,0.1)'}}>
                                                <View>
                                                    <Icon name="car" type="MaterialCommunityIcons" />
                                                </View>
                                                <View style={{width:10}}></View>
                                                <View style={{flexDirection:'column'}}>
                                                    <Text style={{fontWeight:'600',fontSize:14}}>{this.props.auth.active_car.car_make}</Text>
                                                    <Text style={{fontWeight:'600',fontSize:14}}>{this.props.auth.active_car.car_model}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                     <View style={{height:10}}></View>
                                     <Text style={{fontWeight:'700',fontSize:14}}>Service</Text>
                                 {/**
                                  * Pickers Step One
                                  */}
                                  <Item picker icon>
                                      <Icon type="AntDesign" style={{color:'#169BD7'}} name="earth"></Icon>
                                     <Picker
                                         mode="dropdown"
                                         iosIcon={<Icon name="arrow-down" style={{textAlign:'left',}} />}
                                         style={{ width: undefined }}
                                         placeholder="Select Service "
                                         placeholderStyle={{ color: "#bfc6ea" }}
                                         placeholderIconColor="#007aff"
                                         selectedValue={this.state.service}
                                         onValueChange={async(value) => {
                                             this.setState({service:value});
                                             this.props.cartype._fetch_sub_service(value);
     
                                             /** Fetch data from this service */
                                             let service = await this.props.cartype._return_service(value);
                                             this.setState({have_towing:service.towing == 1?true:false});
                                         }}
                                     >
                                         {this.props.cartype.service.map((trg,index) => 
                                         <Picker.Item label={trg.title} value={trg.title} key={index} />
                                         )}
                                     </Picker>
                                 </Item>
                                 {this.props.cartype.sub_service.length > 0 &&
                                 <Item picker icon>
                                         <Icon type="MaterialCommunityIcons" style={{color:'#169BD7'}}  name="towing"></Icon>
                                     <Picker
                                         mode="dropdown"
                                         iosIcon={<Icon name="arrow-down" style={{textAlign:'left'}} />}
                                         style={{ width: undefined }}
                                         placeholder="Please select one of service"
                                         placeholderStyle={{ color: "#bfc6ea" }}
                                         placeholderIconColor="#007aff"
                                         selectedValue={this.state.sub_service}
                                         onValueChange={(value) => {this.setState({sub_service:value})}}
                                     >
                                         {this.props.cartype.sub_service.map((trg,index) => 
                                         <Picker.Item label={trg.title} value={trg.title} key={index} />
                                         )}
                                     </Picker>
                                 </Item>
                                 }
                                 <View style={{height:10}}></View>
                                 {this.state.have_towing&&
                                 <View>
                                    <Text style={{fontWeight:'700',fontSize:14,marginBottom:3}}>Destination</Text>
                                    <TouchableOpacity onPress={() => {this.setState({state:2});}}>
                                     <View animation="zoomInUp" style={styles.cardStyle}>
                                             <Icon type="AntDesign" name={'pushpino'} style={{fontSize:18,color:'#bfc6ea'}}></Icon>
                                             <View style={{width:10}}></View>
                                        <Text style={{fontWeight:'600',fontSize:14,color:'#bfc6ea'}}>{this.props.processor.service.direction_name == ''?'Select Destination':this.props.processor.service.direction_name}</Text>
                                         </View>
                                    </TouchableOpacity>
                                 </View>
                                 }
                                 <View style={{height:10}}></View>
                                 <Text style={{fontWeight:'700',fontSize:14}}>Note</Text>
                                 <Item>
                                     <Icon type="SimpleLineIcons" style={{color:'#FFBF65'}} name="note" />
                                     <Input onFocus={() => {this.setState({base_height:'70%'})}} onBlur={() => {this.setState({base_height:'auto'})}} rowSpan={3} placeholderStyle={{color:'#bfc6ea'}} placeholderTextColor="#bfc6ea" placeholderIconColor="#007aff" style={{width:'100%'}} value={this.state.note} onChangeText={(value) => {this.setState({note:value})}} bordered placeholder="Type note to your drive" />
                                 </Item>
                                 <View style={{height:10}}></View>
                                 <Text style={{fontWeight:'700',fontSize:14}}>Payment</Text>
                                 <View style={{flexDirection:'row',paddingTop:0}}>
                                     <TouchableOpacity onPress={() => {this.setState({payment_method:'card'})}} style={{flexDirection:'column',width:'45%',justifyContent:'flex-start',alignItems:'center',backgroundColor:this.state.payment_method == 'card' ? 'rgba(30,30,255,0.07)':'transparent',padding:5,borderRadius:10,paddingTop:10,paddingBottom:10}}>
                                         <Icon name="card" style={{color:'#ECA11F'}}></Icon>
                                         <Text style={{fontWeight:'700',marginTop:5,fontSize:12}}> Credit Card</Text>
                                     </TouchableOpacity>
                                     <View style={{width:'10%'}}></View>
                                     <TouchableOpacity onPress={() => {this.setState({payment_method:'paypal'})}} style={{flexDirection:'column',width:'45%',justifyContent:'flex-start',alignItems:'center',backgroundColor:this.state.payment_method == 'paypal' ? 'rgba(30,30,255,0.07)':'transparent',padding:5,borderRadius:10,paddingTop:10,paddingBottom:10}}>
                                         <Icon name="paypal" style={{color:'#169BD7'}} type="Entypo"></Icon>
                                         <Text style={{fontWeight:'700',marginTop:5,fontSize:12}}> PayPal</Text>
                                     </TouchableOpacity>
                                 </View>
                                 </Content>
                             </View>
                             </Content>
                             <View style={{width:'100%',marginTop:2 ,backgroundColor:'black'}}>
                             <Button onPress={async() => {
                                 let self = this;
                                 self.props.processor.service = {
                                     main_service:self.state.service,
                                     sub_service:self.state.sub_service,
                                     note:self.state.note,
                                     direction_name:self.props.processor.service.direction_name,
                                     have_towing:self.props.processor.service.direction_name == ''?false:true
                                 };
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
                                        if(trg.title == this.state.service) {
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
                                        if(trg.title == this.state.sub_service) {
                                         let price = trg.price;
                                         sub_service_price = price * 1;

                                     }
                                 });
                                 }
                                 await get_sub_price();
                                 price = price + sub_service_price;

                                 /** Distance matrix price */
                                 if(self.state.have_towing) {
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
                                 manger._change_step(4);
                                 }} dark block style={{backgroundColor:'black'}}><Text style={{color:'white',borderRadius:0,fontWeight:'700',fontSize:18}}>Next</Text></Button>
                         </View>
                         </View>
                     </Animatable.View>
                     <Modal isVisible={this.state.show_cars_model}>
                            <CarModel onPressSave={() => {this.setState({show_cars_model:false});}} />
                     </Modal>
                     </View>
                }
                {this.state.state == 2 &&
                    <StepOne  map={map} PressPlace={() => {this.setState({state:3});}} PressBack={() => {this.setState({state:1})}}/>
                }
                {this.state.state == 3 &&
                    <View style={{position:'absolute',top:0,left:0,height:'100%',width:'100%'}}>
                        
                        <View style={{paddingTop:30,paddingLeft:15,paddingBottom:0,flexDirection:'row'}}>
                            <Icon onPress={() => {this.setState({state:2});}} type="EvilIcons" name="arrow-left" style={{fontSize:48}} ></Icon>
                        </View>
                        <View style={{position:'absolute',left:0,bottom:15,width:'100%',paddingLeft:20,paddingRight:20}}>
                            <View style={{width:'100%',backgroundColor:'white',marginBottom:3,borderColor:'black',borderWidth:1,borderRadius:5,paddingVertical:1}}>
                                <View style={{flexDirection:'row',justifyContent:'center'}}>
                                    <View style={{width:'50%',justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                                        <Icon type="MaterialCommunityIcons" name="map-marker-distance" style={{fontSize:22}} />
                                        <Text style={{fontWeight:'700'}}>{this.props.locations.directions_distance_matrix.distance.text}</Text>
                                    </View>
                                    <View style={{width:'50%',justifyContent:'center',alignItems:'center',alignContent:'center'}}>
                                        <Icon type="AntDesign" name="clockcircleo" style={{fontSize:22}} />
                                        <Text style={{fontWeight:'700'}}>{this.props.locations.directions_distance_matrix.duration.text}</Text>
                                    </View>
                                </View>
                            </View>
                            <Button dark block onPress={() => {this.setState({state:1});}}><Text style={{color:'white'}}>Confirm</Text></Button>
                        </View>
                    </View>
                }
            </View>
        )
    }
}


const styles = StyleSheet.create({
    cardStyle: {
      backgroundColor:'white',paddingVertical:10,paddingHorizontal:18,borderRadius:5,borderBottomWidth:1,borderBottomColor:'rgba(0,0,0,0.1)',flexDirection:'row',alignItems:'center'
    }
  });
  
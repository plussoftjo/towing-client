import React from 'react';

/** Components */
import {View,Text,Image,TouchableOpacity,Alert,AsyncStorage} from 'react-native';

import * as Animatable from 'react-native-animatable';
import call from 'react-native-phone-call'
import { GiftedChat } from 'react-native-gifted-chat'
import Modal from "react-native-modal";
import {Icon} from 'native-base';
import axios from 'axios';
import Images from '../../../commons/Images';
import {googleapi} from '../../../service'
import {inject,observer} from 'mobx-react';

@inject('socketmanger')
@inject('processor')
@inject('settings')
@inject('locations')
@inject('manger')
@observer
export default class StepTen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            chat:false,
            top_title:'On Service'
        };
    }

    _call() {
        const args = {
            number: this.props.processor.driver.phone, // String value with the number to call
            prompt: true // Optional boolean property. Determines if the user should be prompt prior to the call 
        }
        
        call(args).catch(console.error)
    }

    _chat() {
        /** Open Chat dialog */
        this.setState({chat:!this.state.chat});
    }

    _cancel() {
        /**
         * Cancel
         * @methods -> 01: create alert with check if ok go 02 if no exit
         *              02: Make like the first make all to default 
         */
        let self = this;
        let map = this.props.map;
        let manger = this.props.manger;
        let locations = this.props.locations;
        Alert.alert(
            'Cancel Trip',
            'Are you sure you want to cancel trip ?',
            [
                {text: 'No',onPress: () => console.log('Cancel Pressed'),style: 'cancel',},
                {text: 'Yes', onPress: () => _onCancel()},
            ],
            {cancelable: false},
        );

        /**
         * 02 When the Approve cancelation
         */
        let _onCancel = function() {
            /** Change map directions to the map */
            map.animateToRegion({
                latitude:locations.map_coords.latitude,
                longitude:locations.map_coords.longitude,
                latitudeDelta:0.015,
                longitudeDelta:0.0121
            });
            /** Change manger to step 0 */
            manger._change_step(0);
            Alert.alert('The trip has been canceled');
        }
        
    }
    componentWillMount() {
        let self = this;
        let start_towing = async function (googleapi) {
            self.setState({top_title:'Towing'});
            self.props.manger._reMapLayoutValue();
            let result = await googleapi.directions(self.props.processor.service.dropoff_location,self.props.locations.pickup_coords);
            let distance = await googleapi.distance_matrix(self.props.processor.service.dropoff_location,self.props.locations.pickup_coords);
            /** Register points to state */
            self.props.locations.register_polyine_points(result);
            self.props.locations.register_direction_matrix(distance);
            self.props.manger.mapLayout.target_directions = true;
            self.props.manger.mapLayout.direction_marker = true;

            // axios.post(self.props.settings.serverUri + 'api/order/change',{order_id:self.props.processor.service.order_id,state:3}).then(response => {
            // }).catch(err => {
            //     console.log(err);
            // });

            try {
                const value = await AsyncStorage.getItem('order');
                if (value !== null) {
                  // We have data!!
                    let data = JSON.parse(value);
                    data.polyline_points = self.props.locations.polyline_points;
                    data.mapLayout = self.props.manger.mapLayout;
                    let cache_data = JSON.stringify(data);
                    await AsyncStorage.setItem('order',cache_data);
                }
              } catch (error) {
                console.warn(error);
              }

        }

        self.props.socketmanger.when_start_the_route(start_towing);


        let end_service = async function() {
            self.props.manger._reMapLayoutValue();
            self.props.map.animateToRegion({
                latitude:self.props.locations.user_coords.latitude,
                longitude:self.props.locations.user_coords.longitude,
                latitudeDelta:0.015,
                longitudeDelta:0.0121
            });
            self.props.manger._change_step(11);
            // axios.post(self.props.settings.serverUri + 'api/order/change',{order_id:self.props.processor.service.order_id,state:4}).then(response => {
            // }).catch(err => {
            //     console.log(err);
            // });
            try {
                const value = await AsyncStorage.getItem('order');
                if (value !== null) {
                  // We have data!!
                    let data = JSON.parse(value);
                    data.polyline_points = self.props.locations.polyline_points;
                    data.mapLayout = self.props.manger.mapLayout;
                    data.step = 11;
                    let cache_data = JSON.stringify(data);
                    await AsyncStorage.setItem('order',cache_data);
                }
              } catch (error) {
                console.warn(error);
              }
        }

        self.props.socketmanger.end_route(end_service);
    }
    
    render() {
        let manger = this.props.manger;
        return [
            <View key="TopText" style={{position:'absolute',top:0,left:0,width:'100%'}}>
                <View style={{padding:20,paddingTop:'20%'}}>
                    <Animatable.Text iterationCount="infinite" duration={5000} animation="flash" style={{fontWeight:'700',fontSize:16,textAlign:'center',color:'rgba(0,0,0,0.6)'}}>{this.state.top_title}</Animatable.Text>
                    <View style={{justifyContent:'center',alignItems:'center'}}>
                        <View style={{height:2,width:'60%',backgroundColor:'rgba(0,0,0,0.4)',borderRadius:2 /2,marginTop:5}}>

                        </View>
                    </View>
                </View>
            </View>,
            <Modal isVisible={this.state.chat} key={'chatScreen'} style={{backgroundColor:'transparent'}}>
                <View style={{ flex: 1,backgroundColor:'white',borderRadius:10}}>
                    <View style={{padding:5,paddingLeft:15}}>
                        <View >
                            <Icon onPress={() => {this._chat();}} name="close" style={{fontSize:42}} />
                        </View>
                    </View>
                    <View style={{height:1,width:'100%',backgroundColor:'rgba(0,0,0,0.3)'}}></View>
                    <ChatScreen />
                </View>
            </Modal>,
            <Animatable.View animation="slideInUp"  key="stander" style={{position:'absolute',bottom:0,left:0.5,right:0.5}}>
            <View style={{borderTopRightRadius:50,borderTopLeftRadius:50,backgroundColor:'white',width:'100%',shadowColor: "#000",shadowOffset: {width: 0,height: 2,},shadowOpacity: 0.25,shadowRadius: 3.84,elevation: 5,borderColor:'#0D0D0D',borderWidth:2}}>
                <TouchableOpacity onPress={() => {}} style={{justifyContent:'center',alignContent:'center',alignItems:'center',width:'100%',paddingLeft:'30%',paddingRight:'30%',paddingTop:10,paddingBottom:15}}>
                    <View style={{height:2,width:'100%',backgroundColor:'rgba(0,0,0,0.4)',borderRadius:2 /2}}></View>
                </TouchableOpacity>
                <View style={{flexDirection:'row',paddingLeft:30,paddingRight:30,paddingTop:10,paddingBottom:10,alignItems:'center'}}>
                    <View style={{width:'30%',justifyContent:'center',alignItems:'center'}}>
                        <Image source={{uri:this.props.settings.serverUri + this.props.processor.driver.avatar}} style={{width:60,height:60,borderRadius:60 / 2}} resizeMode="cover" />
                    </View>
                    <View style={{flexDirection:'column',width:'80%',justifyContent:'center'}}>
                        <TouchableOpacity >
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
                <View style={{flexDirection:'column',paddingRight:50,paddingLeft:50,paddingTop:5}}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Text style={{fontWeight:'700',color:'rgba(0,0,0,0.4)',fontSize:14}}>{this.props.processor.driver.driver_car.car_type}</Text>
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Text style={{fontWeight:'700',color:'rgba(0,0,0,0.4)',fontSize:14}}>No.</Text>
                        <Text style={{fontWeight:'700',color:'rgba(0,0,0,0.8)',fontSize:16}}> {this.props.processor.driver.driver_car.car_no}</Text>
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Text style={{fontWeight:'700',color:'rgba(0,0,0,0.4)',fontSize:14}}>{this.props.processor.service.main_service}</Text>
                    </View>
                </View>
                <View style={{paddingLeft:20,paddingRight:20,paddingBottom:20,paddingTop:0}}>
                    <View style={{marginTop:10,paddingRight:30,paddingRight:30,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                        <TouchableOpacity onPress={() => {this._call();}} style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                            <Icon name="call" style={{fontSize:30,color:'#82B1FF'}} />
                            <View style={{width:5}}></View>
                            <Text style={{fontWeight:'700',fontSize:16}}>Call</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {this._chat();}} style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                            <Icon name="chatboxes" style={{fontSize:30,color:'#82B1FF'}} />
                            <View style={{width:5}}></View>
                            <Text style={{fontWeight:'700',fontSize:16}}>Chat</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {this._cancel();}} style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                            <Icon name="close" type="MaterialIcons" style={{fontSize:30,color:'#F44336'}} />
                            <View style={{width:1}}></View>
                            <Text style={{fontWeight:'700',fontSize:16}}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{height:5,backgroundColor:'#0D0D0D'}}></View>
            </View>
            </Animatable.View>
        ]
    }
}

class ChatScreen extends React.Component {
    state = {
        messages: [],
      }
    
      componentDidMount() {
        this.setState({
          messages: [
            {
              _id: 1,
              text: 'Hello, How I can help you ?',
              createdAt: new Date(),
              user: {
                _id: 2,
                name: 'React Native',
                avatar: 'https://placeimg.com/140/140/any',
              },
            },
          ],
        })
      }
    
      onSend(messages = []) {
        this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, messages),
        }))
      }
    render() {
        return (
          <GiftedChat
            messages={this.state.messages}
            onSend={messages => this.onSend(messages)}
            user={{
              _id: 1,
            }}
          />
        )
    }
}
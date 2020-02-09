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

import {inject,observer} from 'mobx-react';

@inject('socketmanger')
@inject('processor')
@inject('settings')
@observer
export default class StepNine extends React.Component {
    constructor(props) {
        super(props);

        this.state = {chat:false};
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

    componentDidMount() {
        let self = this;
        let start_service = async function() {
            let map = self.props.map;
            let locations = self.props.locations;
            /** Re maplayout */
            self.props.manger._reMapLayoutValue();
            map.animateToRegion({
                latitude:locations.pickup_coords.latitude,
                longitude:locations.pickup_coords.longitude,
                latitudeDelta:0.015,
                longitudeDelta:0.0121
            });
            /** Manger to other step */
            self.props.manger._change_step(10);
            // axios.post(self.props.settings.serverUri + 'api/order/change',{order_id:self.props.processor.service.order_id,state:2}).then(response => {
            // }).catch(err => {
            //     console.log(err);
            // });


            /** Get Data */
            try {
                const value = await AsyncStorage.getItem('order');
                if (value !== null) {
                  // We have data!!
                    let data = JSON.parse(value);
                    data.step = 10;
                    data.mapLayout = self.props.manger.mapLayout;
                    let cache_data = JSON.stringify(data);
                    await AsyncStorage.setItem('order',cache_data);
                }
              } catch (error) {
                console.warn(error);
              }


        }
        self.props.socketmanger.when_start_the_service(start_service);

        let get_real_coords = function(data) {
            let coords = data.coords;
            this.props.processor.coords = coords;
        }
        self.props.socketmanger.recive_real_coords(get_real_coords);

    }
    
    render() {
        let manger = this.props.manger;
        return [
            <View key="TopText" style={{position:'absolute',top:0,left:0,width:'100%'}}>
                <View style={{padding:20,paddingTop:'20%'}}>
                    <Animatable.Text iterationCount="infinite" duration={5000} animation="flash" style={{fontWeight:'700',fontSize:16,textAlign:'center',color:'rgba(0,0,0,0.6)'}}>Meet truck, The truck is on the way</Animatable.Text>
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
                <View style={{flexDirection:'row',justifyContent:'center',alignContent:'center',alignItems:'center',marginTop:10,borderTopColor:'rgba(0,0,0,0.2)',borderTopWidth:0.3,paddingTop:15}}>
                    <View style={{flexDirection:'row',width:'50%',justifyContent:'center',alignItems:'center',alignContent:'center'}}>
                        <Icon type="MaterialCommunityIcons" name="map-marker-distance" style={{fontSize:22,color:'rgba(100,255,100,0.8)'}} />
                        <Text style={{fontWeight:'700',color:'rgba(0,0,0,0.8)'}}> {this.props.processor.distance.distance.text}</Text>
                    </View>
                    <View style={{flexDirection:'row',width:'50%',justifyContent:'center',alignItems:'center',alignContent:'center'}}>
                        <Icon type="AntDesign" name="clockcircleo" style={{fontSize:22,color:'rgba(100,255,100,0.8)'}} />
                        <Text style={{fontWeight:'700',color:'rgba(0,0,0,0.8)'}}> {this.props.processor.distance.duration.text}</Text>
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
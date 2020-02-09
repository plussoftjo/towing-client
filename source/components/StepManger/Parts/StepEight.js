import React from 'react';

/** Components */
import {View,Text,Image,TouchableOpacity} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {  AirbnbRating } from 'react-native-ratings';
import {Icon,Button,Content,Textarea } from 'native-base';

import Images from '../../../commons/Images';

import {inject,observer} from 'mobx-react';

@inject('socketmanger')
@inject('processor')
@inject('pricing')
@inject('drivers')
@inject('settings')
@observer
export default class StepEight extends React.Component {
    render() {
        let manger = this.props.manger;
        return [
            <Animatable.View animation="slideInUp"   key="submitBox" style={{position:'absolute',left:0,top:0,width:'100%',height:'100%'}}>
                <View style={{flex:1,justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                    <View style={{backgroundColor:'white',padding:0,borderTopRightRadius:50,borderTopLeftRadius:50,width:'90%'}}>
                        <TouchableOpacity onPress={() => {}} style={{justifyContent:'center',alignContent:'center',alignItems:'center',width:'100%',paddingLeft:'30%',paddingRight:'30%',paddingTop:10,paddingBottom:15}}>
                            <View style={{height:2,width:'100%',backgroundColor:'rgba(0,0,0,0.4)',borderRadius:2 /2}}></View>
                        </TouchableOpacity>
                        <View style={{padding:10}}>
                            <Text style={{fontWeight:'700',fontSize:20,textAlign:'center'}}>The Trip End</Text>
                        </View>
                        <View>
                            <Text style={{fontWeight:'700',textAlign:'center',fontSize:12,color:'rgba(0,0,0,0.4)'}}>Thank you for use our service</Text>
                        </View>
                        <View style={{padding:10,paddingBottom:0}}>
                            <Text style={{color:'green',fontWeight:'900',fontSize:32,textAlign:'center'}}>{this.props.pricing.price.toFixed(1)}{this.props.pricing.currency.simple}</Text>
                        </View>
                        <View style={{flexDirection:'row',paddingLeft:30,paddingRight:30,paddingTop:10,paddingBottom:10,alignItems:'center'}}>
                            <View style={{width:'30%',justifyContent:'center',alignItems:'center'}}>
                                <Image source={Images.avatar} style={{width:60,height:60,borderRadius:60 / 2}} resizeMode="cover" />
                            </View>
                            <View style={{flexDirection:'column',width:'80%',justifyContent:'center'}}>
                                <TouchableOpacity>
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
                        <AirbnbRating
                        count={5}
                        reviews={["Bad", "OK", "Good", "Amazing", "Unbelievable"]}
                        defaultRating={4}
                        size={20}
                        selectedColor={'#82B1FF'}
                        reviewColor={'#82B1FF'}
                        />
                        <View style={{height:175}}>
                            <Content padder>
                                <View style={{padding:10,paddingLeft:30,paddingRight:30}}>
                                    <Textarea rowSpan={5} bordered placeholder="Leave a comment to the driver" />
                                </View>
                            </Content>
                        </View>
                        <View style={{paddingLeft:30,paddingRight:30,paddingBottom:30}}>
                            <Button onPress={() => {
                                manger._reMapLayoutValue();
                                manger._change_step(0);
                            }} block dark><Text style={{fontWeight:'700',fontSize:18,color:'white'}}>Done</Text></Button>
                        </View>
                    </View>
                </View>
            </Animatable.View>
        ]
    }
}


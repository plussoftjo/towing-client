import React from 'react';
import {View,Text,TouchableOpacity} from 'react-native';
import { Container,Content,Item,Icon,Input,Button, Form,Picker,CheckBox } from 'native-base';
import {inject,observer} from 'mobx-react';
import {  LiteCreditCardInput } from "react-native-credit-card-input";
import axios from 'axios';
@inject('auth')
@inject('processor')
@inject('cartype')
@inject('pricing')
@inject('locations')
@observer

export default class CarModel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modal_show:'Select',
            vaild:true,
        };
    }

    render() {
        if(this.state.modal_show == 'Select') {
            return (
                <View style={{ flex: 1,justifyContent:'center',alignItems:'center',alignContent:'center' }}>
                    <View style={{backgroundColor:'white',borderRadius:10,width:'98%'}}>
                        <View style={{padding:10,paddingLeft:10,borderBottomColor:'rgba(0,0,0,0.03)',borderBottomWidth:1,flexDirection:'row',alignItems:'center'}}>
                            <Icon name="close-circle" onPress={() => {this.props.onPressSave()}} />
                            <View style={{width:10}}></View>
                            <Text style={{fontWeight:'500',fontSize:18}}>Select Credit Card</Text>
                        </View>
                        {this.props.auth.user.user_card.map((trg,index) => 
                            <View key={index} style={{padding:20,paddingLeft:5,paddingRight:5,paddingTop:5}}>
                            <TouchableOpacity onPress={() => {
                                this.props.processor.service.credit_id = trg.id;
                            }} style={{flexDirection:'row',alignItems:'center',padding:10,borderRadius:10,backgroundColor:trg.id == this.props.processor.service.credit_id?'rgba(0,150,0,0.03)':'rgba(0,0,0,0.00)',borderWidth:1,borderColor:'rgba(0,255,0,0.1)'}}>
                                <View>
                                    <Icon name="credit-card" type="Feather" />
                                </View>
                                <View style={{width:10}}></View>
                                <View style={{flexDirection:'column'}}>
                                    <Text style={{fontWeight:'600',fontSize:14}}>XXXXXXXXXXXX{trg.number.substring(12,16)}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        )}
                        {this.props.auth.user.user_card.length == 0 &&
                            <View style={{paddingVertical:30}}>
                                <Icon type="Feather" name="alert-circle" style={{color:'#bdc3c7',textAlign:'center'}} />
                                <Text style={{fontFamily:'Roboto_medium',fontSize:14,textAlign:'center',color:'#bdc3c7'}}>There are no credit card.</Text>
                            </View>
                        }
                        <View style={{padding:5,marginTop:20,flexDirection:'row',justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                            <View style={{width:'48%'}}>
                                <Button block dark onPress={() => {this.setState({modal_show:'NewCredit'})}}><Text style={{fontWeight:'700',color:'white'}}>Add Card</Text></Button>
                            </View>
                            <View style={{width:'4%'}}></View>
                            <View style={{width:'48%'}}>
                                <Button block success onPress={() => {
                                    /** When click save methods */
                                    this.props.onPressSave();
                                }}><Text style={{fontWeight:'700',color:'white'}}>Save</Text></Button>
                            </View>
                        </View>
                    </View>
                </View>
            )
        }else if(this.state.modal_show == 'NewCredit') {
            return (
                <View style={{ flex: 1,justifyContent:'center',alignItems:'center',alignContent:'center' }}>
                    <View style={{backgroundColor:'white',borderRadius:10,width:'98%'}}>
                        <View style={{padding:20,paddingLeft:10,borderBottomColor:'rgba(0,0,0,0.03)',borderBottomWidth:1}}>
                            <Text style={{fontWeight:'500',fontSize:18}}>Add New Credit Card</Text>
                        </View>
                        <View style={{padding:20,paddingLeft:5,paddingRight:5,paddingTop:5}}>
                            <LiteCreditCardInput onChange={(value) => {}} />
                        </View>
                        <View style={{padding:5,marginTop:20,flexDirection:'row',justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                            <View style={{width:'48%'}}>
                                <Button block dark onPress={() => {this.setState({modal_show:'Select'})}}><Text style={{fontWeight:'700',color:'white'}}>Back</Text></Button>
                            </View>
                            <View style={{width:'4%'}}></View>
                            <View style={{width:'48%'}}>
                                <Button block success onPress={() => {
                                    this.props.auth.user.user_card.push({number:'424242424242424242'});
                                    this.setState({modal_show:'Select'})
                                }}><Text style={{fontWeight:'700',color:'white'}}>Save</Text></Button>
                            </View>
                        </View>
                    </View>
                </View>
            )
        }else {
            return null;
        }
    }
}
import React from 'react';
import {View,Text,TouchableOpacity,StyleSheet,ScrollView} from 'react-native';
import { Icon,Button,Content } from 'native-base';
import * as Animatable from 'react-native-animatable';
import {inject,observer} from 'mobx-react';
import Modal from "react-native-modal";
import {CarModel} from './StepThreePart';
@inject('auth')
@inject('processor')
@inject('cartype')
@inject('pricing')
@inject('drivers')
@inject('locations')
@observer

export default class StepFour extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            show_cars_model:false,
            
        };
    }
    render() {
        let manger = this.props.manger;
            return [
                <View key="Top" style={{position:'absolute',left:0,top:0}}>
                    <View style={{paddingTop:30,paddingLeft:15,paddingBottom:0,flexDirection:'row'}}>
                        <Icon onPress={() => {
                            this.props.manger._change_step(3);
                            }} type="EvilIcons" name="arrow-left" style={{fontSize:48}} ></Icon>
                    </View>
                </View>,
                <Animatable.View key="Half" duration={500} animation="slideInUp" style={{position:'absolute',bottom:0,left:0,width:'100%'}}>
                    <View style={{height:'100%',borderTopRightRadius:50,borderTopLeftRadius:50,backgroundColor:'white',width:'100%',shadowColor: "#000",shadowOffset: {width: 0,height: 2,},shadowOpacity: 0.25,shadowRadius: 3.84,elevation: 5,borderColor:'#0D0D0D',borderWidth:2}}>
                        <TouchableOpacity onPress={() => {}} style={{justifyContent:'center',alignContent:'center',alignItems:'center',width:'100%',paddingLeft:'30%',paddingRight:'30%',paddingTop:10,paddingBottom:0}}>
                            <View style={{height:2,width:'100%',backgroundColor:'rgba(0,0,0,0.4)',borderRadius:2 /2}}></View>
                        </TouchableOpacity>
                        <Content padder style={{padding:10,paddingTop:0}}>
                                <Text style={{fontWeight:'700',fontSize:18,fontFamily:'Roboto_medium'}}>Price Information</Text>
                                <View style={{paddingTop:20}}></View>
                                <View style={{paddingTop:2}}>
                                <Text style={{textAlign:'center',fontSize:32,color:'#2ecc71',fontWeight:'700'}}>{this.props.pricing.currency.simple}{this.props.pricing.price.toFixed(2)}</Text>
                                <Text style={{textAlign:'center',fontFamily:'Roboto_medium'}}>Net Price.</Text>
                                </View>
                        </Content>
                        <Button block dark large style={{borderRadius:0}} onPress={async() => {
                            manger._change_step(5);
                        }}><Text style={{color:'white',fontWeight:'700',fontSize:16}}>Next</Text></Button>
                    </View>
                </Animatable.View>,
                <Modal key="CarModel" isVisible={this.state.show_cars_model}>
                        <CarModel onPressSave={() => {this.setState({show_cars_model:false});}} />
                </Modal>,
            ]
    }
}
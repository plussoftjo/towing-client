import React from 'react';
import {View,Text,TouchableOpacity,Image} from 'react-native';
import { Icon,Button,Content, } from 'native-base';
import * as Animatable from 'react-native-animatable';
import LottieView from "lottie-react-native";
import {inject,observer} from 'mobx-react';
import Modal from "react-native-modal";
import {LottieFiles} from '../../../commons';
import {CreditCard} from './StepThreePart'
import Alert from '../../Alert'
@inject('auth')
@inject('processor')
@inject('manger')
@observer

export default class StepFive extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            payment_method:undefined,
            credit_modal:false,
            not_support_error:false
        };
    }
    componentDidMount() {
        this.animation.play();
    }
    render() {
        let manger = this.props.manger;
        return [
            <View key="Top" style={{position:'absolute',left:0,top:0}}>
                <View style={{paddingTop:30,paddingLeft:15,paddingBottom:0,flexDirection:'row'}}>
                    <Icon onPress={() => {
                        this.props.manger._change_step(4);
                        }} type="EvilIcons" name="arrow-left" style={{fontSize:48}} ></Icon>
                </View>
            </View>,
            <Animatable.View key="Half" duration={500} animation="slideInUp" style={{position:'absolute',bottom:0,left:0,width:'100%'}}>
                <View style={{height:'100%',borderTopRightRadius:50,borderTopLeftRadius:50,backgroundColor:'white',width:'100%',shadowColor: "#000",shadowOffset: {width: 0,height: 2,},shadowOpacity: 0.25,shadowRadius: 3.84,elevation: 5,borderColor:'#0D0D0D',borderWidth:2}}>
                    <TouchableOpacity onPress={() => {}} style={{justifyContent:'center',alignContent:'center',alignItems:'center',width:'100%',paddingLeft:'30%',paddingRight:'30%',paddingTop:10,paddingBottom:0}}>
                        <View style={{height:2,width:'100%',backgroundColor:'rgba(0,0,0,0.4)',borderRadius:2 /2}}></View>
                    </TouchableOpacity>
                    <Content padder style={{padding:10,paddingTop:0,paddingBottom:0}}>
                            <Text style={{fontWeight:'700',fontSize:18,fontFamily:'Roboto_medium'}}>Payment options</Text>
                            <View style={{height:15}}></View>
                             <View style={{flexDirection:'row',paddingTop:0,alignContent:'center',alignItems:'center'}}>
                             <TouchableOpacity onPress={() => {this.setState({payment_method:'card',not_support_error:false})}} style={{flexDirection:'column',width:'45%',justifyContent:'flex-start',alignItems:'center',backgroundColor:this.state.payment_method == 'card' ? 'rgba(30,30,255,0.07)':'transparent',padding:5,borderRadius:10,paddingTop:10,paddingBottom:10}}>
                             <LottieView
                                ref={animation => {
                                    this.animation = animation;
                                }}
                                style={{
                                    width: 50,
                                    height: 50,
                                }}
                                loop={false}
                                source={LottieFiles.credit}
                                />
                                 <Text style={{fontWeight:'700',marginTop:5,fontSize:14,fontFamily:'Roboto_medium'}}>Credit Card</Text>
                             </TouchableOpacity>
                             <View style={{width:'10%'}}></View>
                             <TouchableOpacity onPress={() => {this.setState({payment_method:'paypal'})}} style={{flexDirection:'column',width:'45%',justifyContent:'flex-start',alignItems:'center',backgroundColor:this.state.payment_method == 'paypal' ? 'rgba(30,30,255,0.07)':'transparent',padding:5,borderRadius:10,paddingTop:10,paddingBottom:10}}>
                                 <Image source={require('../../../images/paypal.png')} style={{width:50,height:50}} resizeMode="cover" />
                                 <Text style={{fontWeight:'700',marginTop:5,fontSize:14,fontFamily:'Roboto_medium'}}>PayPal</Text>
                             </TouchableOpacity>
                         </View>
                         {this.state.not_support_error &&
                            <Alert >This payment option not supported for now </Alert>
                         }
                    </Content>
                    <Button block dark large style={{borderRadius:0}} onPress={() => {
                        if(this.state.payment_method == '') {
                            this.props.processor.service.payment_options = 'card'
                            manger._change_step(6);
                        }else {
                            if(this.state.payment_method == 'paypal') {
                                this.setState({not_support_error:true});
                            }else {
                                this.props.processor.service.payment_options = this.state.payment_method;
                                manger._change_step(6);

                            }
                        }
                    }}><Text style={{color:'white',fontWeight:'700',fontSize:22,fontFamily:'Roboto_medium'}}>Next</Text></Button>
                </View>
            </Animatable.View>,
            <Modal key="creditModal" isVisible={this.state.credit_modal}>
                <CreditCard onPressSave={() => {this.setState({credit_modal:false})}} />
            </Modal>
        ]
    }
}
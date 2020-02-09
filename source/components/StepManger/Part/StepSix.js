import React from 'react';
import {View,Text,TouchableOpacity} from 'react-native';
import { Icon,Button,Content, } from 'native-base';
import * as Animatable from 'react-native-animatable';
import {inject,observer} from 'mobx-react';
import Modal from "react-native-modal";
import {CreditCard} from './StepThreePart'
import axios from 'axios';
import {  LiteCreditCardInput } from "react-native-credit-card-input";
import Alert from '../../Alert';
@inject('auth')
@inject('processor')
@inject('manger')
@observer

export default class StepSix extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            payment_method:undefined,
            credit_modal:false,
            vaild:false,
            error:false,
            base_height:0,
            card_vaild:true,
            end_card_type:false,
            card_form:{}
        };
        this._onChange = this._onChange.bind(this);
    }
    _onChange(form) {
        let self = this;
        if(form.valid) {
            self.setState({end_card_type:true,card_form:form.values,vaild:true,error:false});
            let expiry = form.values.expiry.split('/');
            let month = expiry[0];
            let year = '20' + expiry[1];
            axios.post('http://3.16.160.3:3000/stripe_get_token',{number:form.values.number,cvc:form.values.cvc,month:month,year:year}).then(response => {
                let data = response.data;
                
                if(data.id) {
                    let token = data.id
                    this.props.processor.service.credit_card_token = token;
                    self.setState({card_vaild:true});
                }else {
                    self.setState({card_vaild:false});
                }
            }).catch(err => {
                self.setState({card_vaild:false});
            });
        }
    }
    componentWillMount() {
        
    }
    render() {
        let manger = this.props.manger;
        return [
            <View key="Top" style={{position:'absolute',left:0,top:0}}>
                <View style={{paddingTop:30,paddingLeft:15,paddingBottom:0,flexDirection:'row'}}>
                    <Icon onPress={() => {
                        this.props.manger._change_step(5);
                        }} type="EvilIcons" name="arrow-left" style={{fontSize:48}} ></Icon>
                </View>
            </View>,
            <Animatable.View key="Half" duration={500} animation="slideInUp" style={{position:'absolute',bottom:this.state.base_height,left:0,width:'100%',height:'auto'}}>
                <View style={{height:'100%',borderTopRightRadius:50,borderTopLeftRadius:50,backgroundColor:'white',width:'100%',shadowColor: "#000",shadowOffset: {width: 0,height: 2,},shadowOpacity: 0.25,shadowRadius: 3.84,elevation: 5,borderColor:'#0D0D0D',borderWidth:2}}>
                    <TouchableOpacity onPress={() => {}} style={{justifyContent:'center',alignContent:'center',alignItems:'center',width:'100%',paddingLeft:'30%',paddingRight:'30%',paddingTop:10,paddingBottom:0}}>
                        <View style={{height:2,width:'100%',backgroundColor:'rgba(0,0,0,0.4)',borderRadius:2 /2}}></View>
                    </TouchableOpacity>
                    <View style={{paddingVertical:30,paddingHorizontal:15}}>
                            <Text style={{fontWeight:'700',fontSize:18,fontFamily:'Roboto_medium'}}>Card informations</Text>
                            <View style={{height:10}}></View>
                                <LiteCreditCardInput onFocus={() => {this.setState({base_height:'37%'})}}  onChange={this._onChange} />
                                {this.state.error &&
                                <Alert>Please add card informations</Alert>
                                }
                                {!this.state.card_vaild &&
                                <Alert>Credit card not vertived please try other method .</Alert>
                                }
                    </View>
                    <Button block dark large style={{borderRadius:0}} onPress={() => {
                        if(this.state.vaild) {
                            manger._change_step(7);
                        }else {
                            this.setState({error:true})
                        }
                        
                    }}><Text style={{color:'white',fontWeight:'700',fontSize:16}}>Next</Text></Button>
                </View>
            </Animatable.View>,
            <Modal key="creditModal" isVisible={this.state.credit_modal}>
                <CreditCard onPressSave={() => {this.setState({credit_modal:false})}} />
            </Modal>
        ]
    }
}
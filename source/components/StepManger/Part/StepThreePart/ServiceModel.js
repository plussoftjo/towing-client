import React from 'react';
import {View,TouchableOpacity,ScrollView} from 'react-native';
import {inject,observer} from 'mobx-react'
import { Container, Header, Content, Button, ListItem, Text, Icon, Left, Body, Right, Switch } from 'native-base';
import Alert from '../../../Alert';


@inject('processor')
@inject('cartype')
@inject('manger')
@observer
export default class ServiceModel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            part:1,
            sub_service:[],
            service_have_towing:false
        };

        this._select_service = this._select_service.bind(this);
        this._select_sub_service = this._select_sub_service.bind(this);
    }
    


    _select_service(index) {
        let service = this.props.cartype.service[index];
        if(service.sub_service.length >= 1) {
            //Have sub service that mean complete other 
            //make the list 
            this.setState({sub_service:service.sub_service,service_have_towing:service.towing ?true:false});
            this.props.manger.service_model = 2;
            this.props.processor.service.main_service = service.title;
        }else {
            //not have check if have destination
            this.props.processor.service.main_service = service.title;
            this.props.onPressSave();
        }
    }

    _select_sub_service(index) {
        let sub_service = this.state.sub_service[index];
        this.props.processor.service.sub_service = sub_service.title;

        if(this.state.service_have_towing) {
            this.props.manger.service_model = 3;
        }else {
            this.props.onPressSave();
        }
    }

    render() {
        return (
            <View style={{ flex: 1,justifyContent:'center',alignItems:'center',alignContent:'center' }}>
                {this.props.manger.service_model == 1 &&
                    <PartOne cartype={this.props.cartype} onPress={this._select_service} onPressClose={this.props.onPressClose} />
                }
                {this.props.manger.service_model == 2 &&
                    <PartTow sub_service={this.state.sub_service} onPress={this._select_sub_service} />
                }
                {this.props.manger.service_model == 3 &&
                    <PartThree onPressSave={this.props.onPressSave} onPressDestination={this.props.onPressDestination} onPressPickup={this.props.onPressPickup} />
                }
            </View>
        )
    }
}

@inject('processor')
@observer
class PartOne extends React.Component {
    render() {
        return (
            <View style={{backgroundColor:'white',borderRadius:10,width:'100%',borderColor:'#27ae60',borderWidth:2}}>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',padding:20,paddingLeft:10,borderBottomColor:'rgba(0,0,0,0.03)',borderBottomWidth:1,backgroundColor:'#27ae60',borderRadius:8}}>
                    <Text style={{fontWeight:'700',fontSize:16,fontFamily:'Roboto_medium',color:'white'}}>Select Service Type</Text>
                    <Icon type="AntDesign" onPress={() => {
                        this.props.onPressClose();
                    }} name="closecircleo" style={{color:'white',fontSize:20}} />
                </View>
                <ScrollView>
                {this.props.cartype.service.map((trg,index) => 
                    <View key={index} style={{paddingHorizontal:8,paddingVertical:4}}>
                        <TouchableOpacity onPress={() => {
                            this.props.processor.service.main_service = '';
                            this.props.processor.service.sub_service = '';
                            this.props.processor.service.dropoff_location = '';

                            this.props.onPress(index);
                        }} style={{flexDirection:'row',alignItems:'center',alignContent:'center',padding:15,borderRadius:4,backgroundColor:"rgba(0,100,0,0.03)",borderWidth:1,borderColor:'rgba(0,255,0,0.1)'}}>
                            <Icon type="Entypo" name="circle" style={{fontSize:14,color:'#27ae60'}} />
                            <View style={{width:5}}></View>
                        <Text style={{fontSize:16,fontWeight:'700',fontFamily:'Roboto_medium',color:'#27ae60'}}>{trg.title}</Text>
                        </TouchableOpacity>
                    </View>
                )}
                </ScrollView>
            </View>
        )
    }
}

@inject('manger')
@observer
class PartTow extends React.Component {
    render() {
        return (
            <View style={{backgroundColor:'white',borderRadius:10,width:'100%',borderColor:'#27ae60',borderWidth:1}}>
                <View style={{paddingVertical:5,paddingHorizontal:10,borderBottomColor:'rgba(0,0,0,0.2)',borderBottomWidth:1,flexDirection:'row',alignContent:'center',alignItems:'center'}}>
                    <Icon type="Feather" name="arrow-left-circle" onPress={() => {this.props.manger.service_model = 1;}} />
                    <View style={{width:10}}></View>
                    <Text style={{fontWeight:'700',fontSize:18,fontFamily:'Roboto_medium'}}>Select Type</Text>
                </View>
                <ScrollView>
                {this.props.sub_service.map((trg,index) => 
                    <View key={index} style={{paddingHorizontal:8,paddingVertical:4}}>
                        <TouchableOpacity onPress={() => {
                            this.props.onPress(index);
                        }} style={{flexDirection:'row',alignItems:'center',alignContent:'center',padding:15,borderRadius:4,backgroundColor:"rgba(0,100,0,0.03)",borderWidth:1,borderColor:'rgba(0,255,0,0.1)'}}>
                            <Icon type="Entypo" name="circle" style={{fontSize:14,color:'#27ae60'}} />
                            <View style={{width:5}}></View>
                        <Text style={{fontSize:16,fontWeight:'700',fontFamily:'Roboto_medium',color:'#27ae60'}}>{trg.title}</Text>
                        </TouchableOpacity>
                    </View>
                )}
                </ScrollView>
            </View>
        )
    }
}

@inject('processor')
@inject('manger')
@observer
class PartThree extends React.Component {
    state = {
        need_towing:false,
        error:false
    };
    render() {
        return (
            <View style={{backgroundColor:'white',borderRadius:10,width:'100%',borderColor:'#27ae60',borderWidth:1}}>
                <View style={{paddingVertical:5,paddingHorizontal:10,borderBottomColor:'rgba(0,0,0,0.2)',borderBottomWidth:1,flexDirection:'row',alignContent:'center',alignItems:'center'}}>
                    <Icon type="Feather" name="arrow-left-circle" onPress={() => {this.props.manger.service_model = 2;}} />
                    <View style={{width:10}}></View>
                    <Text style={{fontWeight:'700',fontSize:18,fontFamily:'Roboto_medium'}}>Towing</Text>
                </View>
                <View style={{paddingVertical:10,paddingHorizontal:0}}>
                {/* <ListItem icon>
                    <Left>
                        <Button style={{ backgroundColor: "#27ae60" }}>
                            <Icon active type="MaterialCommunityIcons" name="towing" />
                        </Button>
                    </Left>
                    <Body>
                        <Text>Do you need towing ?</Text>
                    </Body>
                    <Right>
                        <Switch value={this.state.need_towing} onValueChange={(value) => {
                            this.setState({need_towing:value});
                            }} />
                    </Right>
                </ListItem> */}
                </View>
                <View style={{paddingVertical:10}}>
                <TouchableOpacity onPress={() => {
                       this.props.onPressPickup();
                    }} style={{padding:15,borderRadius:4,backgroundColor:"rgba(0,100,0,0.03)",borderWidth:1,borderColor:'rgba(0,255,0,0.1)'}}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Icon type="Entypo" name="pin" style={{fontSize:14,color:'#27ae60'}} />
                            <View style={{width:5}}></View>
                            <Text style={{fontSize:16,fontWeight:'700',fontFamily:'Roboto_medium',color:'#27ae60'}}>Pickup location</Text>
                        </View>
                        <View style={{paddingLeft:15}}>
                        <Text style={{fontSize:12,fontWeight:'500',fontFamily:'Roboto_medium',color:'#27ae60'}}>{this.props.processor.service.pickup}</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{height:10}}></View>
                    <TouchableOpacity onPress={() => {
                       this.props.onPressDestination();
                    }} style={{padding:15,borderRadius:4,backgroundColor:"rgba(0,100,0,0.03)",borderWidth:1,borderColor:'rgba(0,255,0,0.1)'}}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Icon type="Entypo" name="pin" style={{fontSize:14,color:'#27ae60'}} />
                            <View style={{width:5}}></View>
                            <Text style={{fontSize:16,fontWeight:'700',fontFamily:'Roboto_medium',color:'#27ae60'}}>Drop-off location</Text>
                        </View>
                        <View style={{paddingLeft:15}}>
                        <Text style={{fontSize:12,fontWeight:'500',fontFamily:'Roboto_medium',color:'#27ae60'}}>{this.props.processor.service.dropoff_location}</Text>
                        </View>
                    </TouchableOpacity>
                    {this.state.error &&
                    <Alert>Please select Drop-off location</Alert>
                    }
                </View>
                <View style={{paddingTop:20}}>
                    <Button block style={{backgroundColor:'#27ae60'}} onPress={() => {
                        if(this.props.processor.service.dropoff_location == '') {
                            this.setState({error:true});
                        }else {
                            this.props.onPressSave();
                        }
                        }}><Text style={{color:'white',fontWeight:'700',fontSize:16}}>Done</Text></Button>
                </View>
            </View>
        )
    }
}
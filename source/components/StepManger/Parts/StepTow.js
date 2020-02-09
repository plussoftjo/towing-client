import React from 'react';
import {View,Text,ScrollView,Image,TouchableOpacity} from 'react-native';
import { Icon,Button} from 'native-base';
import {Typs} from '../../../commons'
import MiniInfoCard from '../../MiniInfoCard';
import * as Animatable from 'react-native-animatable';
export default class StepTow extends React.Component {
    render() {
        let manger = this.props.manger;
        return (
            <View style={{position:'relative',height:'100%'}}>
                <View style={{paddingTop:30,paddingLeft:15,paddingBottom:20}}>
                    <Icon onPress={() => {this.props.manger._change_step(0.1)}} type="EvilIcons" name="arrow-left" style={{fontSize:48}} ></Icon>
                </View>
                <MiniInfoCard pressed={() => {manger._change_step(1);}} icon="pin" text={this.props.locations.directions_name}/>
                <Animatable.View animation="slideInUp" style={{position:'absolute',bottom:0,left:0,width:'100%'}}>
                    <View  style={{borderTopRightRadius:50,borderTopLeftRadius:50,backgroundColor:'white',width:'100%',shadowColor: "#000",shadowOffset: {width: 0,height: 2,},shadowOpacity: 0.25,shadowRadius: 3.84,elevation: 5,borderColor:'#0D0D0D',borderWidth:2}}>
                    <TouchableOpacity onPress={() => {}} style={{justifyContent:'center',alignContent:'center',alignItems:'center',width:'100%',paddingLeft:'30%',paddingRight:'30%',paddingTop:10,paddingBottom:15}}>
                        <View style={{height:2,width:'100%',backgroundColor:'rgba(0,0,0,0.4)',borderRadius:2 /2}}></View>
                    </TouchableOpacity>
                        <View style={{paddingTop:20,width:'100%',paddingRight:15,paddingLeft:15}}>
                            <ScrollView horizontal={true}>
                                {Typs.carsType.map((trg,index) =>
                                    <View key={index} style={{marginLeft:10,backgroundColor:trg.active ?'rgba(0,0,0,0.06)':null,borderRadius:15,padding:10,justifyContent:'center',alignItems:'center',alignContent:'center'}}>
                                        <Image style={{width:50,height:50}} source={{uri:trg.image}} resizeMode="cover"></Image>
                                        <Text style={{textAlign:'center',paddingTop:10,fontWeight:'700'}}>{trg.text}</Text>
                                    </View>
                                )}
                            </ScrollView>
                            <View style={{borderWidth:1,borderColor:'rgba(0,0,0,0.5)',flexDirection:'row',borderRadius:5,marginTop:20}}>
                                    <View style={{padding:5,width:'50%',flexDirection:'row',justifyContent:'center',alignItems:'center',borderRightColor:'rgba(0,0,0,0.5)',borderRightWidth:1}}>
                                        <Icon name="time"></Icon>
                                        <View style={{width:10}}></View>
                                        <Text style={{fontWeight:'700'}}>15Minute</Text>
                                    </View>
                                    <View style={{padding:5,width:'50%',flexDirection:'row',justifyContent:'center',alignItems:'center',borderLeftColor:'rgba(0,0,0,0.5)',borderLeftWidth:1}}>
                                        <Icon name="directions" type="FontAwesome5"></Icon>
                                        <View style={{width:10}}></View>
                                        <Text style={{fontWeight:'700'}}> 10KM</Text>
                                    </View>
                            </View>
                        </View>
                        <View style={{width:'100%',marginTop:20 ,backgroundColor:'black'}}>
                                <Button onPress={() => {manger._change_step(3);}} dark block ><Text style={{color:'white',borderRadius:0,fontWeight:'700',fontSize:18}}>Next</Text></Button>
                        </View>
                    </View>
                </Animatable.View>
            </View>
        )
    }
}

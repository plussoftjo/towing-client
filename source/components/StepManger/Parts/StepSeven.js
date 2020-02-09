import React from 'react';

/** Components */
import {View,Text,Image,TouchableOpacity} from 'react-native';
import MiniInfoCard from '../../MiniInfoCard';
import * as Animatable from 'react-native-animatable';
import {Icon,} from 'native-base';
/** Service */
import Images from '../../../commons/Images';

import {inject,observer} from 'mobx-react';

@inject('socketmanger')
@inject('processor')
@inject('settings')
@observer
export default class StepSeven extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let self = this;
        let end_route = function() {
            // Reinstall map layout
            self.props.manger._reMapLayoutValue();
            // Animate to user location 
            self.props.map.animateToRegion({
                latitude:self.props.locations.user_coords.latitude,
                longitude:self.props.locations.user_coords.longitude,
                latitudeDelta:0.015,
                longitudeDelta:0.0121
            });
            /** Change manger to step 0 */
            self.props.manger._change_step(8);
        }

        self.props.socketmanger.end_route(end_route);
    }

    render() {
        let map = this.props.map;
        return[
            <View key="topField" style={{position:'absolute',top:0,left:0,width:'100%'}}>
                <View style={{marginTop:50,width:'100%'}}>
                    <MiniInfoCard pressed={() => {}} icon="pin" text={this.props.processor.service.direction_name}/>
                </View>
            </View>,
            <Animatable.View animation="slideInUp"  key="bottomfield" style={{position:'absolute',left:0.5,right:0.5,bottom:0}}>
                <View style={{borderTopRightRadius:50,borderTopLeftRadius:50,backgroundColor:'white',width:'100%',shadowColor: "#000",shadowOffset: {width: 0,height: 2,},shadowOpacity: 0.25,shadowRadius: 3.84,elevation: 5,borderColor:'#0D0D0D',borderWidth:2}}>
                    <TouchableOpacity onPress={() => {}} style={{justifyContent:'center',alignContent:'center',alignItems:'center',width:'100%',paddingLeft:'30%',paddingRight:'30%',paddingTop:10,paddingBottom:15}}>
                        <View style={{height:2,width:'100%',backgroundColor:'rgba(0,0,0,0.4)',borderRadius:2 /2}}></View>
                    </TouchableOpacity>
                    <View style={{flexDirection:'row',paddingLeft:30,paddingRight:30,paddingTop:10,paddingBottom:10,alignItems:'center'}}>
                        <View style={{width:'30%',justifyContent:'center',alignItems:'center'}}>
                            <Image source={Images.avatar} style={{width:60,height:60,borderRadius:60 / 2}} resizeMode="cover" />
                        </View>
                        <View style={{flexDirection:'column',width:'80%',justifyContent:'center'}}>
                            <TouchableOpacity onPress={() => {
                            }}>
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
                    <View style={{flexDirection:'column',paddingRight:50,paddingLeft:50,paddingTop:5,paddingBottom:5}}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Text style={{fontWeight:'700',color:'rgba(0,0,0,0.4)',fontSize:14}}>{this.props.processor.driver.driver_car.car_type}</Text>
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Text style={{fontWeight:'700',color:'rgba(0,0,0,0.4)',fontSize:14}}>No.</Text>
                            <Text style={{fontWeight:'700',color:'rgba(0,0,0,0.8)',fontSize:16}}> {this.props.processor.driver.driver_car.car_no}</Text>
                        </View>
                    </View>
                    <View style={{paddingLeft:50,paddingBottom:10}}>
                        <Animatable.Text iterationCount="infinite" duration={4000} animation="flash" style={{fontSize:20,fontWeight:'600',color:'black'}}>In Trip</Animatable.Text>
                    </View>
                    <View style={{height:10,backgroundColor:'black',width:'100%',borderTopRightRadius:2,borderTopLeftRadius:2}}></View>
                </View>
            </Animatable.View>
        ]
    }
}
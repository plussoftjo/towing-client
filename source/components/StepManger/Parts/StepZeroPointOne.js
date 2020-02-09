import React from 'react';
import {View,TouchableOpacity,ScrollView,Image} from 'react-native';
import {Text,Icon, Button} from 'native-base';
import * as Animatable from 'react-native-animatable';
import {Typs} from '../../../commons'
import {inject,observer} from 'mobx-react';
@inject('processor')
@inject('cartype')
@inject('settings')
@observer
export default class StepZeroPointOne extends React.Component {
    constructor(props) {
        super(props);

        this.state = {car_type:0};
    }
    _change_car_type(index) {
        this.setState({car_type:index});
    }
    render() {
        let manger = this.props.manger;
        return [
            <View key="top" style={{position:'absolute',left:0,top:0,width:'100%',flexDirection:'row'}}>
                <Icon type="EvilIcons" name="arrow-left" onPress={() => {manger._change_step(0);}} style={{fontSize:48,color:'black',paddingTop:30,paddingLeft:15,paddingBottom:20}} />
            </View>,
            <Animatable.View duration={500} animation="slideInUp" key="bottom" style={{position:'absolute',left:0,right:0,bottom:0,width:'100%'}}>
                <View  style={{borderTopRightRadius:50,borderTopLeftRadius:50,backgroundColor:'white',width:'100%',shadowColor: "#000",shadowOffset: {width: 0,height: 2,},shadowOpacity: 0.25,shadowRadius: 3.84,elevation: 5,borderColor:'#0D0D0D',borderWidth:2}}>
                    <TouchableOpacity onPress={() => {}} style={{justifyContent:'center',alignContent:'center',alignItems:'center',width:'100%',paddingLeft:'30%',paddingRight:'30%',paddingTop:10,paddingBottom:15}}>
                        <View style={{height:2,width:'100%',backgroundColor:'rgba(0,0,0,0.4)',borderRadius:2 /2}}></View>
                    </TouchableOpacity>
                    <View style={{padding:10,justifyContent:'center',alignContent:'center'}}>
                        <Text style={{fontSize:18,fontWeight:'500',marginLeft:15,marginBottom:10,marginTop:5}}>Please Select Truck</Text>
                        <ScrollView horizontal={true}>
                            {this.props.cartype.car_type.map((trg,index) =>
                                <TouchableOpacity onPress={() => {
                                    this._change_car_type(index);
                                }} key={index} style={{marginLeft:5,borderRadius:15,padding:10,justifyContent:'center',alignItems:'center',alignContent:'center'}}>
                                    <View style={{width:90,height:90,padding:3,borderRadius:90/2,borderWidth:1,borderColor:this.state.car_type == index ?'black':'transparent',backgroundColor:this.state.car_type == index ?'rgba(0,0,0,0.06)':'transparent',justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                                        <Image style={{width:65,height:65}} source={{uri:this.props.settings.serverUri + 'storage/' + trg.image}} resizeMode="contain"></Image>
                                    </View>
                                    <Text style={{textAlign:'center',paddingTop:10,fontWeight:'600',fontSize:16}}>{trg.title}</Text>
                                </TouchableOpacity>
                            )}
                        </ScrollView>
                    </View>
                    <Button onPress={() => {
                        this.props.processor.car_type = this.state.car_type;
                        this.props.cartype._fetch_service(this.state.car_type);
                        manger._change_step(3);
                        }} dark block large style={{borderRadius:0}}><Text style={{color:'white',fontWeight:'700',fontSize:20}}>Next</Text></Button>
                </View>
            </Animatable.View>
        ]
    }
}
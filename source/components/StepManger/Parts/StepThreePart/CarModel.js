import React from 'react';
import {View,Text,TouchableOpacity} from 'react-native';
import { Container,Content,Item,Icon,Input,Button, Form,Picker,CheckBox } from 'native-base';
import {inject,observer} from 'mobx-react';
import {Cars,CarColors} from '../../../../commons';
import {helper} from '../../../../service'
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
            make_selected:'',
            model_selected:'',
            car_models_list:[],
            car_model:'',
            car_color:'',
            vaild:true
        };
    }
    carMakeChange(value) {
        let list = [];
        value.models.forEach((trg,index) => {
            list.push(<Picker.Item label={trg.title}  key={index} value={trg.value}  />);
        });
        this.setState({car_models_list:list});
        this.setState({
            make_selected: value
        });
      }

      modalChange(value) {
        this.setState({
            model_selected: value
        });
      }

      carModelChange(value) {
        this.setState({
            car_model: value
        });
      }

      carColorChange(value) {
        this.setState({
            car_color: value
        });
      }
    render() {
        const modelItems = [];
        const started_modal = 2020;
        for (let index = 0; index < 50; index++) {
            modelItems.push(<Picker.Item label={started_modal -index}  key={index} value={started_modal -index} />);
        }
        if(this.state.modal_show == 'Select') {
            return (
                <View style={{ flex: 1,justifyContent:'center',alignItems:'center',alignContent:'center' }}>
                    <View style={{backgroundColor:'white',borderRadius:10,width:'98%'}}>
                        <View style={{padding:20,paddingLeft:10,borderBottomColor:'rgba(0,0,0,0.03)',borderBottomWidth:1}}>
                            <Text style={{fontWeight:'500',fontSize:18}}>Select Vehicle Type</Text>
                        </View>
                        {this.props.auth.user.user_car.map((trg,index) => 
                            <View key={index} style={{padding:20,paddingLeft:5,paddingRight:5,paddingTop:5}}>
                            <TouchableOpacity onPress={() => {
                                this.props.auth._make_car_active(trg.id);
                            }} style={{flexDirection:'row',alignItems:'center',padding:10,borderRadius:10,backgroundColor:trg.active?'rgba(0,150,0,0.03)':'rgba(0,0,0,0.00)',borderWidth:1,borderColor:'rgba(0,255,0,0.1)'}}>
                                <View>
                                    <Icon name="car" type="MaterialCommunityIcons" />
                                </View>
                                <View style={{width:10}}></View>
                                <View style={{flexDirection:'column'}}>
                                    <Text style={{fontWeight:'600',fontSize:14}}>{trg.car_make}</Text>
                                    <Text style={{fontWeight:'600',fontSize:14}}>{trg.car_model}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        )}
                        
                        <View style={{padding:5,marginTop:20,flexDirection:'row',justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                            <View style={{width:'48%'}}>
                                <Button block dark onPress={() => {this.setState({modal_show:'NewCar'})}}><Text style={{fontWeight:'700',color:'white'}}>New Car</Text></Button>
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
        }else if(this.state.modal_show == 'NewCar') {
            return (
                <View style={{ flex: 1,justifyContent:'center',alignItems:'center',alignContent:'center' }}>
                    <View style={{backgroundColor:'white',borderRadius:10,width:'98%',height:'75%'}}>
                        <View style={{padding:20,paddingLeft:10,borderBottomColor:'rgba(0,0,0,0.03)',borderBottomWidth:1}}>
                            <Text style={{fontWeight:'500',fontSize:18}}>Add New Vehicle</Text>
                        </View>
                        <View style={{padding:20,paddingLeft:5,paddingRight:5,paddingTop:5,flex:1}}>
                            <Container>
                                <Content>
                                <View key="bottom" style={{padding:30}}>
                                    <Item regular picker style={{width:'100%',backgroundColor:'white',borderRadius:10}}>
                                    <Picker
                                        mode="dropdown"
                                        iosIcon={<Icon name="arrow-down" />}
                                        style={{ width: '100%' }}
                                        placeholder="Modal"
                                        placeholderStyle={{ color: "#bfc6ea" }}
                                        placeholderIconColor="#bfc6ea"
                                        selectedValue={this.state.model_selected}
                                        onValueChange={this.modalChange.bind(this)}
                                    >
                                        {modelItems}
                                    </Picker>
                                    </Item>
                                    <Item regular picker style={{width:'100%',backgroundColor:'white',borderRadius:10,marginTop:20}}>
                                    <Picker
                                        mode="dropdown"
                                        iosIcon={<Icon name="arrow-down" />}
                                        style={{ width: '100%' }}
                                        placeholder="Vehicle Make"
                                        placeholderStyle={{ color: "#bfc6ea" }}
                                        placeholderIconColor="#bfc6ea"
                                        selectedValue={this.state.make_selected}
                                        onValueChange={this.carMakeChange.bind(this)}
                                    >
                                        {Cars.map((trg,index) => 
                                            <Picker.Item label={trg.title} key={index} value={trg} />
                                        )}
                                    </Picker>
                                    </Item>
                                    <Item regular picker style={{width:'100%',backgroundColor:'white',borderRadius:10,marginTop:20}}>
                                    <Picker
                                        mode="dropdown"
                                        iosIcon={<Icon name="arrow-down" />}
                                        style={{ width: '100%' }}
                                        placeholder="Vehicle Model"
                                        placeholderStyle={{ color: "#bfc6ea" }}
                                        placeholderIconColor="#bfc6ea"
                                        selectedValue={this.state.car_model}
                                        onValueChange={this.carModelChange.bind(this)}
                                    >
                                        {this.state.car_models_list}
                                    </Picker>
                                    </Item>
                                    <Item regular picker style={{width:'100%',backgroundColor:'white',borderRadius:10,marginTop:20}}>
                                    <Picker
                                        mode="dropdown"
                                        iosIcon={<Icon name="arrow-down" />}
                                        style={{ width: '100%' }}
                                        placeholder="Vehicle Color"
                                        placeholderStyle={{ color: "#bfc6ea" }}
                                        placeholderIconColor="#bfc6ea"
                                        selectedValue={this.state.car_color}
                                        onValueChange={this.carColorChange.bind(this)}
                                    >
                                        {CarColors.map((trg,index) => 
                                            <Picker.Item label={trg} key={index} value={trg} />
                                        )}
                                    </Picker>
                                    </Item>
                                </View>
                                </Content>
                            </Container>
                        </View>
                        <View style={{padding:5,marginTop:20,flexDirection:'row',justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                            <View style={{width:'48%'}}>
                                <Button block dark onPress={() => {this.setState({modal_show:'Select'})}}><Text style={{fontWeight:'700',color:'white'}}>Back</Text></Button>
                            </View>
                            <View style={{width:'4%'}}></View>
                            <View style={{width:'48%'}}>
                                <Button block success onPress={() => {
                                    /**
                                     *  When click save methods 
                                     *  Save car to the collication
                                     * */
                                    axios.post(this.props.auth.settings.serverUri + 'api/user/cars/add',{
                                        user_id:this.props.auth.user.id,
                                        model:this.state.model_selected,
                                        car_make:this.state.make_selected.title,
                                        car_model:this.state.car_model,
                                        car_color:this.state.car_color
                                    }).then(response => {
                                        this.props.auth.user.user_car.push(response.data);
                                        this.setState({modal_show:'Select'});
                                    }).catch(err => {
                                        console.log(err.response);
                                    });
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
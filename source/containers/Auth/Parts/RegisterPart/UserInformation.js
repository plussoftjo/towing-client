import React, { useState, useEffect } from 'react';
import {View,Text,TouchableOpacity,Image,ActionSheetIOS, Alert} from 'react-native';
import {Container,Content,Header,Left, Body, Right, Button, Icon, Title,Form,H3,Item, Input,Label,Picker} from 'native-base';
import {Colors,Countrys} from '../../../../commons'
import {inject,observer} from 'mobx-react'
import axios from 'axios';
import Camera from './Camera';
import {helper} from '../../../../service'
import {Alertx} from '../../../../components'
@inject('auth')
@inject('settings')
@observer
export default class UserInformation extends React.Component {
    constructor(props) {
        super(props);


        this.state = {
            states:[],
            country:'',
            error:false,
            error_text:'',
            selected_state:'',
            vaild:true,
            open_camera:false,
            user_image:this.props.auth.user_profile.user_image.base64 == ''?require('../../../../images/avatar.png'):this.props.auth.user_profile.user_image,
            type:'',
            driver_licanse:this.props.auth.user_profile.driver_licanse.base64 == ''?'':this.props.auth.user_profile.driver_licanse
        };

        this.CountryChange = this.CountryChange.bind(this);
        this.stateChange = this.stateChange.bind(this);
    }
    CountryChange(value) {
        let list = [];
        value.states.forEach((trg,index) => {
            list.push(<Picker.Item label={trg}  key={index} value={trg}  />);
        });
        this.setState({states:list});
        this.setState({
            country: value
        });
      }
      stateChange(value) {
        this.setState({selected_state:value});
      }
      componentWillMount() {
        this.setState({country:this.props.auth.user_profile.country,error:false,error_text:''});
        let list = [];
        if(this.props.auth.user_profile.country.states.length > 0){
            this.props.auth.user_profile.country.states.forEach((trg,index) => {
                list.push(<Picker.Item label={trg}  key={index} value={trg}  />);
            });
            this.setState({states:list});
            this.setState({selected_state:this.props.auth.user_profile.state})
        }
      }
      upload_image(image,type,cam_type) {
        /** TODO:
         *  Make function for upload image and return the url
         */
        let img = 'data:image/jpg;base64,' + image.base64;
        axios.post(this.props.settings.serverUri + 'api/helper/image/store',{image:img,cam_type:cam_type}).then(response => {
            let image_url = response.data.image;
            if(type == 'user_profile') {
                this.props.auth.user_profile.user_image = {
                    base64:this.props.auth.user_profile.user_image.base64,
                    url:image_url
                };
            }
            if(type == 'driver_licanse') {
                this.props.auth.user_profile.driver_licanse = {
                    base64:this.props.auth.user_profile.driver_licanse.base64,
                    url:image_url
                };
            }
        }).catch(err => {console.log(err.response);});

        
      }
    render() {
        let auth = this.props.auth;
        if(this.state.open_camera){
            return(
                <Camera close={() => {this.setState({open_camera:false})}} onSelectImage={(image,cam_type) => {
                    if(this.state.type == 'user_image') {
                        this.setState({user_image:image});
                        auth.user_profile.user_image = image;
                        this.upload_image(image,'user_profile',cam_type);
                    }
                    if(this.state.type == 'driver_licanse') {
                        this.setState({driver_licanse:image});
                        auth.user_profile.driver_licanse = image;
                        this.upload_image(image,'driver_licanse',cam_type);
                    }
                    
                }}></Camera>
            )
        }else {
            return (
                <Container>
                    <Header>
                        <Left>
                        <Button danger transparent onPress={() => {this.props.navigation.goBack()}}>
                            <Icon name='arrow-back' />
                            </Button>
                        </Left>
                        <Body>
                            <Title></Title>
                        </Body>
                        <Right/>
                    </Header>
                    <Content>
                        <H3 style={{marginVertical:30,marginHorizontal:10,marginBottom:0}}>User Information</H3>
                        <TouchableOpacity onPress={() => {
                            this.setState({type:'user_image',open_camera:true});
                        }} style={{justifyContent:'center',alignContent:'center',alignItems:'center',position:'relative'}}>
                            <Image source={this.state.user_image} style={{width:90,height:90,borderRadius:90 /2}} />
                            <View style={{position:'absolute',left:0,top:0,justifyContent:'center',alignContent:'center',alignItems:'center',width:'100%'}}>
                            <View style={{width:90,height:90,borderRadius:90/2,backgroundColor:'rgba(0,0,0,0.3)',flexDirection:'column',justifyContent:'flex-end',paddingBottom:3}}>
                                <Text style={{color:'white',textAlign:'center',fontSize:12}}>Change</Text>
                            </View>
                            </View>
                        </TouchableOpacity>
                        <View style={{height:10}}></View>
                        <Form>
                            <View style={{flexDirection:'row'}}>
                                <Item stackedLabel style={{flexGrow:1}}>
                                    <Label>First Name</Label>
                                    <Input value={auth.user_profile.first_name} onChangeText={(value) => {auth.user_profile.first_name = value;}} />
                                </Item>
                                <Item stackedLabel style={{flexGrow:1}}>
                                    <Label>Last Name</Label>
                                    <Input value={auth.user_profile.last_name} onChangeText={(value) => {auth.user_profile.last_name = value;}} />
                                </Item>
                            </View>
                            <Item picker  style={{height:70,marginLeft:15}}>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" />}
                                style={{ width: '100%' }}
                                placeholder="Country"
                                selectedValue={this.state.country}
                                onValueChange={this.CountryChange.bind(this)}
                            >
                                {Countrys.map((trg,index) => 
                                    <Picker.Item label={trg.value} value={trg} key={index} />
                                )}
                            </Picker>
                            </Item>
                            <Item picker style={{height:70,marginLeft:15}}>
                                <Picker
                                    mode="dropdown"
                                    iosIcon={<Icon name="arrow-down" />}
                                    placeholder="State"
                                    style={{ width: '100%' }}
                                    selectedValue={this.state.selected_state}
                                    onValueChange={this.stateChange.bind(this)}
                                >
                                    {this.state.states}
                                </Picker>
                            </Item>
                            <Item stackedLabel>
                                <Label>City</Label>
                                <Input value={auth.user_profile.city} onChangeText={(value) => {auth.user_profile.city = value;}} />
                            </Item>
                            <Item stackedLabel>
                                <Label>Address</Label>
                                <Input value={auth.user_profile.address} onChangeText={(value) => {auth.user_profile.address = value;}} />
                            </Item>
                            <Item stackedLabel>
                                <Label>Zip Code</Label>
                                <Input value={auth.user_profile.zip} onChangeText={(value) => {auth.user_profile.zip = value;}} />
                            </Item>
                        </Form>
                        <View style={{flexDirection:'row',marginTop:10}}>
                            <Button success style={{flexGrow:1,justifyContent:'center'}} onPress={() => {
                                this.setState({type:'driver_licanse',open_camera:true});
                            }}><Text style={{color:'white',fontFamily:'Roboto',textAlign:'center'}}>Add Driver Licance</Text></Button>
                        </View>
                        <View style={{flexDirection:'row',marginVertical:5,marginHorizontal:15}}>
                            {this.state.driver_licanse !== '' &&
                                <Image source={this.state.driver_licanse} style={{width:'100%',height:250}} resizeMode='contain' />
                            } 
                        </View>
                        {this.state.error &&
                            <Alertx>
                                {this.state.error_text}
                            </Alertx>
                        }
                        <View style={{height:30}}></View>
                            <Button dark block onPress={() => {
                                auth.user_profile.country = this.state.country;
                                auth.user_profile.state = this.state.selected_state;
                                if(helper.check_values([
                                    auth.user_profile.country,
                                    auth.user_profile.first_name,
                                    auth.user_profile.city,
                                    auth.user_profile.address,
                                    auth.user_profile.zip
                                ])) {
                                    this.props.navigation.navigate('CarInformation');
                                    this.setState({error:false,error_text:''});
                                }else {
                                    this.setState({error:true,error_text:'please fill all required fields'});
                                }
                            }}><Text style={{color:'white',fontFamily:'Roboto_medium'}}>Next Step</Text></Button>
                    </Content>
                </Container>
            )
        }
        }
}
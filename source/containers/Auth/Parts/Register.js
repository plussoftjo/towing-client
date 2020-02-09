import React from 'react';
import {View,TouchableOpacity} from 'react-native';
import {Images, Colors,Cars,CarColors,Countrys,FullCountrys} from '../../../commons';
import {Container,Content,Text,Item,Icon,Input,Button, Form,Picker,CheckBox} from 'native-base';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";
import {helper} from '../../../service'
import {inject,observer} from 'mobx-react';
import {Loader,DoneAnimation} from '../../../components';
import axios from 'axios';


export default class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {step:0,loader:false};
    }
    render() {
        return (
            <Container style={{backgroundColor:'transparent'}}>
                    {this.state.step == 0 &&
                        <StepZero translate={this.props.translate} pressed={() => {this.setState({step:this.state.step + 2});}} />
                    }
                    {this.state.step == 1 &&
                        <StepOne translate={this.props.translate} onBack={() =>{this.setState({step:this.state.step-1})}} navigation={this.props.navigation} onNext={() => {
                            this.setState({step:this.state.step + 1});
                        }} pressed={() => {this.setState({step:this.state.step + 1});}} />
                    }
                    {this.state.step == 2 &&
                        <StepTow onBack={() =>{this.setState({step:this.state.step-2})}}  translate={this.props.translate} navigation={this.props.navigation} pressed={() => {this.setState({step:this.state.step + 1});}}  />
                    }
                    {this.state.step == 3 &&
                        <StepThree onBack={() =>{this.setState({step:this.state.step-1})}} translate={this.props.translate} navigation={this.props.navigation} pressed={() => {this.setState({step:this.state.step + 1});}} />
                    }
                    {this.state.step == 4 &&
                        <StepFour onBack={() =>{this.setState({step:this.state.step-1})}} settings={this.props.settings} translate={this.props.translate} navigation={this.props.navigation} pressed={() => {this.setState({step:this.state.step + 1});}} />
                    }
                    {this.state.step == 5 && 
                        <StepFive translate={this.props.translate} navigation={this.props.navigation} pressed={() => {this.props.navigation.navigate('Main');}} />
                    }
                    <View style={{position:'absolute',bottom:5,left:0,width:'100%',flexDirection:'row',justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                        <Text style={{color:'grey',fontWeight:'700'}}>Have account ?</Text>
                        <View style={{width:5}}></View>
                        <TouchableOpacity onPress={() => {
                            this.props.onBack();
                        }}><Text style={{color:'white',fontWeight:'600'}}>Sign in</Text></TouchableOpacity>
                    </View>
            </Container>
        )
    }
}
@inject('auth')
@observer
class StepZero extends React.Component {
    constructor(props) {
        super(props);


        this.state = {
            states:[],
            code:'',
            vaild:true,
        };
        this.CountryChange = this.CountryChange.bind(this);
    }
    CountryChange(value) {
        this.setState({
            code: value
        });
        this.props.auth.country_list_value = value;
    }
    
    render() {
        return (
            <Content contentContainerStyle={{ justifyContent: 'center', flex: 1 }}>
                <Text key="top" style={{color:Colors.StylesColor.labels,textAlign:'left',paddingLeft:30,fontSize:16,fontWeight:'500'}}>User information</Text>
                <View key="bottom" style={{padding:30}}>
                    <Item regular style={{backgroundColor:'white',flexDirection:'row'}} rounded>
                        <Picker
                            mode="dropdown"
                            style={{ width: '100%' }}
                            placeholder="Code"
                            selectedValue={this.state.code}
                            onValueChange={(value) => {this.CountryChange(value)}}
                        >
                            {FullCountrys.map((trg,index) => 
                                <Picker.Item render label={this.state.code == ''?trg.name + ' ' +trg.dial_code:trg.code + ' ' +trg.dial_code} value={trg} key={index} ></Picker.Item>
                            )}
                        </Picker>
                        <Input placeholder={this.props.translate('form.phone')} keyboardType="numeric" value={this.props.auth.user_input.phone} onChangeText={(value) => {this.props.auth.user_input.phone = value;}}/>
                    </Item>
                    <View style={{height:20}}></View>
                    <Item regular style={{backgroundColor:'white'}} rounded>
                        <Icon active type="AntDesign" name='key' />
                        <Input placeholder={this.props.translate('form.password')} secureTextEntry={true} value={this.props.auth.user_input.password} onChangeText={(value) => {this.props.auth.user_input.password = value;}} />
                    </Item>
                    <View style={{height:20}}></View>
                    <Item regular style={{backgroundColor:'white'}} rounded>
                        <Icon active type="AntDesign" name='key' />
                        <Input placeholder={this.props.translate('form.confirm_password')} secureTextEntry={true}/>
                    </Item>
                </View>
                {!this.state.vaild &&
                <Text style={{color:'red',fontWeight:'500',marginBottom:10}}>please complete all the required fields</Text>
                }
                <View key="button" style={{flexDirection:'row',justifyContent:'flex-end',marginRight:30,marginTop:0}}>
                    <Button success onPress={() => {
                        if(helper.check_values([this.props.auth.user_input.phone,this.props.auth.user_input.password])) {
                            this.props.auth.country_code = this.state.country_code;
                            // this.props.auth.make_sms_vertify();
                            this.props.pressed();
                        }else {
                            this.setState({vaild:false});
                        }
                        }} style={{borderRadius:30,justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                        <Text style={{color:'white',fontWeight:'700'}}>Next Step</Text>
                        <Icon name='arrow-forward' style={{textAlign:'center',color:'white',fontSize:32}} />
                    </Button>
                </View>
            </Content>
        )
    }
}

@inject('auth')
@inject('languages')
@observer
class StepOne extends React.Component {
    state = {
        code: '',
        password: '',
        timer:59,
        send_again_button:false
      };
      pinInput = React.createRef();
    
      _checkCode = (code) => {
        if (code != this.props.auth.sms_code) {
          this.pinInput.current.shake()
            .then(() => this.setState({ code: '' }));
        }else {
            this.props.pressed();
        }
      }
      componentDidMount() {
          setInterval(() => {
            if(this.state.timer !== 0) {
                this.setState({timer:this.state.timer - 1});
            }else {
              this.setState({send_again_button:true});
            }
          },1000)
      }
    render() {
        const translate = this.props.languages.translate;
        const { code, password } = this.state;
        return (
            <Content contentContainerStyle={{ justifyContent: 'center', flex: 1 }}>
                <View style={{position:'absolute',left:0,top:50,paddingHorizontal:10}}>
                    <Icon onPress={() => {
                        this.props.onBack();
                    }} type="AntDesign" name="leftcircleo" style={{color:'white',fontSize:38}}></Icon>
                </View>
                <Text key="top" style={{color:Colors.StylesColor.labels,textAlign:'left',paddingLeft:30,fontSize:16,fontWeight:'500'}}>Confirm register</Text>
                <View key="bottom" style={{padding:30,justifyContent:'center',alignItems:'center',alignContent:'center'}}>
                            <Text style={{fontWeight:'700',fontSize:12,color:'white'}}>{translate('register_steps.activation.code_send')}</Text>
                    <Text style={{fontSize:16,fontWeight:'700',color:'green',paddingBottom:20}}>{this.props.auth.country_list_value.dial_code + this.props.auth.user_input.phone}</Text>
                    <SmoothPinCodeInput
                    ref={this.pinInput}
                    value={code}
                    onTextChange={code => this.setState({ code })}
                    onFulfill={this._checkCode}
                    onBackspace={() => console.log('No more back.')}
                    />
                </View>
                <View style={{paddingTop:20,paddingLeft:50}}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Text style={{color:'white',fontWeight:'700',fontSize:12}}>Send code again: </Text>
                        {this.state.send_again_button &&
                            <TouchableOpacity onPress={() => {
                                // this.props.auth.make_sms_vertify();
                            }}>
                                <Text style={{color:'white',fontSize:14}}>Send.</Text>
                            </TouchableOpacity>
                        }
                       {!this.state.send_again_button &&
                        <Text style={{color:'white',fontSize:14}}>{this.state.timer} secound</Text>
                       }
                    </View>
                </View>
                {/* <View key="button" style={{flexDirection:'row',justifyContent:'flex-end',marginRight:30,marginTop:0}}>
                    <Button success onPress={() => {this.props.pressed();}} style={{borderRadius:30,justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                        <Text style={{color:'white',fontWeight:'700'}}>Next Step</Text>
                        <Icon name='arrow-forward' style={{textAlign:'center',color:'white',fontSize:32}} />
                    </Button>
                </View> */}
            </Content>
        )
    }
}

@inject('auth')
@observer
class StepTow extends React.Component {

    constructor(props) {
        super(props);


        this.state = {
            states:[],
            country:'',
            selected_state:'',
            vaild:true
        };
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
    render() {
        let user_profile = this.props.auth.user_profile;
        return (
                <Content contentContainerStyle={{ justifyContent: 'center', flex: 1 }}>
                <View style={{position:'absolute',left:0,top:50,paddingHorizontal:10}}>
                    <Icon onPress={() => {
                        this.props.onBack();
                    }} type="AntDesign" name="leftcircleo" style={{color:'white',fontSize:38}}></Icon>
                </View>
                <Text key="top" style={{color:Colors.StylesColor.labels,textAlign:'left',paddingLeft:30,fontSize:16,fontWeight:'500'}}>Customer information</Text>
                <View key="bottom" style={{padding:30}}>
                    <View style={{flexDirection:'row',width:'100%'}}>
                        <View style={{width:'50%'}}>
                            <Item regular style={{backgroundColor:'white',borderRadius:5,marginBottom:15}} >
                                <Input placeholder={this.props.translate('form.first_name')} value={user_profile.first_name} onChangeText={(value) => {user_profile.first_name = value;}}/>
                            </Item>
                        </View>
                        <View style={{width:'50%'}}>
                            <Item regular style={{backgroundColor:'white',borderRadius:5,marginBottom:15}} >
                                <Input value={user_profile.last_name} onChangeText={(value) => {user_profile.last_name= value;}} placeholder={this.props.translate('form.last_name')}/>
                            </Item>
                        </View>
                    </View>
                    <Item regular picker style={{backgroundColor:'white',borderRadius:5,marginBottom:15}}>
                        <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="arrow-down" />}
                            style={{ width: '100%' }}
                            placeholder="Country"
                            placeholderStyle={{ color: "#bfc6ea" }}
                            placeholderIconColor="#007aff"
                            selectedValue={this.state.country}
                            onValueChange={this.CountryChange.bind(this)}
                        >
                            {Countrys.map((trg,index) => 
                                <Picker.Item label={trg.value} value={trg} key={index} />
                            )}
                        </Picker>
                    </Item>
                    <Item regular picker style={{backgroundColor:'white',borderRadius:5,marginBottom:15}}>
                        <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="arrow-down" />}
                            style={{ width: '100%' }}
                            placeholder="State"
                            placeholderStyle={{ color: "#bfc6ea" }}
                            placeholderIconColor="#007aff"
                            selectedValue={this.state.selected_state}
                            onValueChange={this.stateChange.bind(this)}
                        >
                            {this.state.states}
                        </Picker>
                    </Item>
                    <View style={{flexDirection:'row',width:'100%'}}>
                        <View style={{width:'100%'}}>
                            <Item regular style={{backgroundColor:'white',borderRadius:5,marginBottom:15}} >
                                <Input value={user_profile.address} onChangeText={(value) => {user_profile.address = value;}} placeholder={this.props.translate('form.address')}/>
                            </Item>
                        </View>
                    </View>
                    <View style={{flexDirection:'row',width:'100%'}}>
                        <View style={{width:'100%'}}>
                            <Item regular style={{backgroundColor:'white',borderRadius:5,marginBottom:0}} >
                                <Input value={user_profile.zip} onChangeText={(value) => {user_profile.zip = value;}} placeholder={this.props.translate('form.zipcode')}/>
                            </Item>
                        </View>
                    </View>
                 </View>
                 {!this.state.vaild &&
                    <Text style={{color:'red',fontWeight:'500',marginBottom:10}}>please complete all the required fields</Text>
                    }
                 <View key="button" style={{flexDirection:'row',justifyContent:'flex-end',marginRight:30,marginTop:0}}>
                    <Button success onPress={() => {
                        if(helper.check_values([user_profile.first_name,user_profile.last_name,this.state.country,user_profile.address,user_profile.zip])) {
                            user_profile.country = this.state.country.value;
                            console.log(user_profile);
                            user_profile.state = this.state.selected_state;
                            this.props.pressed();
                        }else {
                            this.setState({vaild:false})
                        }
                       
                        }} style={{borderRadius:30,justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                        <Text style={{color:'white',fontWeight:'700'}}>Next Step</Text>
                        <Icon name='arrow-forward' style={{textAlign:'center',color:'white',fontSize:32}} />
                    </Button>
                </View>
                </Content>
        )
    }
}

@inject('auth')
@observer
class StepThree extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
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
        return (
            <Content contentContainerStyle={{ justifyContent: 'center', flex: 1 }}>
                <View style={{position:'absolute',left:0,top:50,paddingHorizontal:10}}>
                    <Icon onPress={() => {
                        this.props.onBack();
                    }} type="AntDesign" name="leftcircleo" style={{color:'white',fontSize:38}}></Icon>
                </View>
            <Text key="top" style={{color:Colors.StylesColor.labels,textAlign:'left',paddingLeft:30,fontSize:16,fontWeight:'500'}}>Vehicle information</Text>
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
            {!this.state.vaild &&
            <Text style={{color:'red',fontWeight:'500',marginBottom:10}}>please complete all the required fields</Text>
            }
            <View key="button" style={{flexDirection:'row',justifyContent:'flex-end',marginRight:30,marginTop:0}}>
                <Button success onPress={() => {
                    if(helper.check_values([this.state.model_selected,this.state.make_selected,this.state.car_color])) {
                        this.props.auth.user_car = {model:this.state.model_selected,car_make:this.state.make_selected.title,car_model:this.state.car_model,car_color:this.state.car_color};
                        this.props.pressed();
                    }else {
                        this.setState({vaild:false});
                    }
                    
                    }} style={{borderRadius:30,justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                    <Text style={{color:'white',fontWeight:'700'}}>Next Step</Text>
                    <Icon name='arrow-forward' style={{textAlign:'center',color:'white',fontSize:32}} />
                </Button>
            </View>
            </Content>
        )
    }
}

@inject('auth')
@observer
class StepFour extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            paypal:false,
            credit:false,
            loader:false,
            vaild:true,
            card_vaild:true,
            end_card_type:false,
            card_form:{},
            done_added:false,
            card_form_vaild:false
        }
        this._onChange = this._onChange.bind(this);
        this._add_card = this._add_card.bind(this);
    }
    _change_to_paypal() {
        this.setState({
            paypal:true,
            credit:false
        });
    }

    _change_to_credit() {
        this.setState({
            paypal:false,
            credit:true,
            card_form_vaild:true
        });
    }

    _onChange(form) {
        let self = this;
        if(form.valid) {
            self.setState({end_card_type:true,card_form:form.values});
            let expiry = form.values.expiry.split('/');
            let month = expiry[0];
            let year = '20' + expiry[1];
            axios.post('http://3.16.160.3:3000/stripe_get_token',{number:form.values.number,cvc:form.values.cvc,month:month,year:year}).then(response => {
                let data = response.data;
                console.log(data);
                if(data.id) {
                    self.setState({card_vaild:true});
                }else {
                    self.setState({card_vaild:false});
                }
            }).catch(err => {
                self.setState({card_vaild:false});
            });
        }
    }

    _add_card() {
        let self = this;
        self.props.auth.user_card = self.state.card_form;
        self.props.auth.have_card = true;
        self.setState({done_added:true});
        setTimeout(() => {
            self.setState({done_added:false,card_form_vaild:false,end_card_type:false});
        },2000);
    }
    
    render() {
        return (
            <Content contentContainerStyle={{ justifyContent: 'center', flex: 1 }}>
                <View style={{position:'absolute',left:0,top:50,paddingHorizontal:10}}>
                    <Icon onPress={() => {
                        this.props.onBack();
                    }} type="AntDesign" name="leftcircleo" style={{color:'white',fontSize:38}}></Icon>
                </View>
            <Text key="top" style={{color:Colors.StylesColor.labels,textAlign:'left',paddingLeft:30,fontSize:16,fontWeight:'500'}}>Payment information</Text>
            <View key="bottom" style={{padding:30,marginTop:10}}>
                <TouchableOpacity onPress={() => {this._change_to_paypal();}} style={{padding:15,borderRadius:5,backgroundColor:this.state.paypal?'rgba(0,0,0,0.3)':'rgba(0,0,0,0.1)',flexDirection:'row',alignItems:'center'}}>
                    <CheckBox checked={this.state.paypal} color="green" />
                    <View style={{width:20}}></View>
                    <Icon type="Entypo" name="paypal" style={{color:'white',fontSize:22}}  />
                    <Text style={{color:'white',fontWeight:'800',color:'white'}}> PayPal</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {this._change_to_credit();}} style={{padding:15,borderRadius:5,backgroundColor:this.state.credit?'rgba(0,0,0,0.3)':'rgba(0,0,0,0.1)',flexDirection:'row',alignItems:'center',marginTop:5}}>
                    <CheckBox checked={this.state.credit} color="green" />
                    <View style={{width:20}}></View>
                    <Icon type="Entypo" name="credit-card" style={{color:'white',fontSize:22}} />
                    <Text style={{color:'white',fontWeight:'800'}}> Credit Card</Text>
                </TouchableOpacity>
                {this.state.card_form_vaild && 
                <View style={{backgroundColor:'white'}}>
                    <Text style={{padding:20,color:'black',fontWeight:'700',fontSize:12,marginBottom:10}}>Please complete card details</Text>
                    <LiteCreditCardInput onChange={this._onChange} />
                </View>
                }
                {this.state.end_card_type && 
                    <View style={{flexDirection:'row',justifyContent:'flex-end'}}>
                        <Button success onPress={() => {this._add_card();}}><Text style={{fontWeight:'700'}}>Add</Text></Button>
                    </View>
                }
                {!this.state.card_vaild && 
                    <Text style={{color:'red',fontSize:14,fontWeight:'600'}}>There are problem in card , please try with other method.</Text>
                }
            </View>
            {this.state.done_added && 
                <DoneAnimation done_title={'Card Added Success.'} />
            }
            {this.state.loader &&
            <Loader />
            }
            {!this.state.vaild &&
            <Text style={{color:'red',fontWeight:'500',marginBottom:10}}>There are some error please try again</Text>
            }
            <View key="button" style={{flexDirection:'row',justifyContent:'flex-end',marginRight:30,marginTop:0}}>
                <Button success onPress={async() => {
                    this.setState({loader:true});
                    if(this.state.paypal) {
                        this.props.auth.user_input.method = 'paypal';
                    }
                    if(this.state.credit) {
                        this.props.auth.user_input.method = 'credit';
                    }
                    let register = await this.props.auth._register(this.props.navigation);
                    if(register) {
                        this.setState({loader:false});
                        this.props.pressed();
                    }else {
                        this.setState({loader:false});
                        this.setState({vaild:false});
                    }
                    }} style={{borderRadius:30,justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                    <Text style={{color:'white',fontWeight:'700'}}>Next Step</Text>
                    <Icon name='arrow-forward' style={{textAlign:'center',color:'white',fontSize:32}} />
                </Button>
            </View>
            </Content>
        )
    }
}

class StepFive extends React.Component {
    render() {
        return (
            <View key="bottom" style={{padding:30,marginTop:10,paddingTop:15,paddingBottom:0,width:'100%',height:'100%',justifyContent:'center',alignItems:'center',alignContent:'center'}}>
                <Text style={{fontWeight:'700',color:'white',fontSize:28,textAlign:'center'}}>Register complete</Text>
                <Text style={{marginTop:20,fontWeight:'600',color:'white',textAlign:'center'}}>Thank you for register with us we happy to help you .</Text>
                <Button success onPress={() => {
                    this.props.pressed();
                    }} style={{borderRadius:30,justifyContent:'flex-end',marginTop:30}}>
                    <Text style={{color:'white',fontWeight:'700'}}>Lets go</Text>
                    <Icon name='arrow-forward' style={{textAlign:'center',color:'white',fontSize:32}} />
                </Button>
            </View>
        )
    }
}



import React from 'react';
import {View,ImageBackground,TouchableOpacity} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {Container,Content,Text,Item,Icon,Input,Button} from 'native-base';
import {inject,observer} from 'mobx-react';
import {Images, Colors} from '../../commons';
import {Login,Register} from './Parts';



/** Enums */
let AuthMethods = {
    LOGIN:'login',
    REGISTER:'register',
    MAIN:'main'
};
@inject('languages')
@inject('auth')
@observer
export default class Auth extends React.Component {
    render() {
        const translate = this.props.languages.translate;
        return (
            <ImageBackground source={{uri:Images.appLoaderImage}} style={{flex:1,flexDirection:'column'}}>
                <View style={{flex:1}}>
                    <ButtonsManger translate={translate} />
                </View>
                <View style={{flex:3}}>
                    {this.props.auth.method == AuthMethods.MAIN && 
                        <Animatable.View style={{width:'100%',height:'100%'}} animation="bounceInRight">
                            <MainScreen translate={translate}/>
                        </Animatable.View>
                    }
                    {this.props.auth.method == AuthMethods.REGISTER && 
                        <Animatable.View  duration={700} animation="bounceInLeft" style={{width:'100%',height:'100%',}}>
                            <Register translate={translate} navigation={this.props.navigation}/>
                        </Animatable.View>
                    }
                    {this.props.auth.method == AuthMethods.LOGIN && 
                        <Animatable.View duration={700} animation="bounceInRight" style={{width:'100%',height:'100%'}}>
                         <Login navigation={this.props.navigation} translate={translate}/>
                        </Animatable.View>
                    }
                </View>
            </ImageBackground>
        )
    }
}

@inject('auth')
@observer
class ButtonsManger extends React.Component {
    render() {
        const translate = this.props.translate;
        return (
            <View style={{padding:20,paddingTop:50}}>
                <View style={{flexDirection:'row',position:'relative'}}>
                    <TouchableOpacity onPress={() => {this.props.auth.change_method('register')}}>
                        <StyledButton text={translate("register")} active={this.props.auth.method == AuthMethods.REGISTER ? true :false}></StyledButton>
                    </TouchableOpacity>
                    <View style={{position:'absolute',left:'25%',top:'20%',backgroundColor:'black',zIndex:100,padding:5,borderRadius:50,borderWidth:1,borderColor:Colors.StylesColor.Borders}}><Text style={{color:Colors.StylesColor.labels}}>Or</Text></View>
                    <TouchableOpacity onPress={() => {this.props.auth.change_method('login')}}>
                        <StyledButton  text={translate("login")} active={this.props.auth.method == AuthMethods.LOGIN ? true :false}></StyledButton>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}


class StyledButton extends React.Component {
    render() {
        return (
            <View style={{padding:15,paddingLeft:20,paddingRight:20,borderWidth:1,borderColor:Colors.StylesColor.Borders,borderRadius:3,backgroundColor:this.props.active ? 'rgba(0,0,0,0.9)':'rgba(0,0,0,0.2)'}}>
                <Text style={{fontWeight:'600',color:Colors.StylesColor.labels}}>
                    {this.props.text}
                </Text>
            </View>
        )
    }
}

class MainScreen extends React.Component {
    render() {
        return (
            <View style={{position:"absolute",bottom:'30%',right:'10%'}}>
            <Text style={{color:Colors.StylesColor.labels,fontSize:24,fontWeight:'600',textAlign:'right'}}>{this.props.translate("auth.main.top")}</Text>
                <Text style={{color:Colors.StylesColor.labels,fontSize:16,fontWeight:'500',textAlign:'center',paddingTop:5}}>{this.props.translate("auth.main.bottom")}</Text>
            </View>
        )
    }
}

class RegisterScreen extends React.Component {
    render() {
        return (
            <View style={{width:'100%',height:'100%'}}>
                <Text style={{color:Colors.StylesColor.labels,textAlign:'center',fontSize:28,fontWeight:'500'}}>{this.props.translate("register")}</Text>
                <View style={{width:'100%',height:1,backgroundColor:'rgba(0,0,0,0.3)',marginTop:10}}></View>
                <View style={{flexDirection:'row',height:'100%'}}>
                    <View style={{flex:2}}>
                        <Container style={{backgroundColor:'transparent'}}>
                            <Content padder style={{paddingTop:'20%'}}>
                                <Item regular style={{backgroundColor:'white'}} rounded>
                                    <Icon active type="AntDesign" name='user' />
                                    <Input placeholder={this.props.translate('form.name')}/>
                                </Item>
                                <View style={{height:20}}></View>
                                <Item regular style={{backgroundColor:'white'}} rounded>
                                    <Icon active type="AntDesign" name='phone' />
                                    <Input placeholder={this.props.translate('form.phone')}/>
                                </Item>
                                <View style={{height:20}}></View>
                                <Item regular style={{backgroundColor:'white'}} rounded>
                                    <Icon active type="AntDesign" name='key' />
                                    <Input placeholder={this.props.translate('form.password')}/>
                                </Item>
                            </Content>
                        </Container>
                    </View>
                    <View style={{flex:1,alignItems:'center',marginTop:'35%'}}>
                    <Button success onPress={() => {
                        this.props.navigation.navigate('Main');
                    }} style={{width:60,height:60,borderRadius:30,justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                        <Icon name='arrow-forward' style={{textAlign:'center',color:'white',fontSize:32}} />
                    </Button>
                    </View>
                </View>
            </View>
        )
    }
}

class LoginScreen extends React.Component {
    render() {
        return (
            <View style={{width:'100%',height:'100%'}}>
                <Text style={{color:Colors.StylesColor.labels,textAlign:'center',fontSize:28,fontWeight:'500'}}>{this.props.translate("login")}</Text>
                <View style={{width:'100%',height:1,backgroundColor:'rgba(0,0,0,0.3)',marginTop:10}}></View>
                <View style={{flexDirection:'row',height:'100%'}}>
                    <View style={{flex:2}}>
                        <Container style={{backgroundColor:'transparent'}}>
                            <Content padder style={{paddingTop:'20%'}}>
                                <View style={{height:20}}></View>
                                <Item regular style={{backgroundColor:'white'}} rounded>
                                    <Icon active type="AntDesign" name='phone' />
                                    <Input placeholder={this.props.translate('form.phone')}/>
                                </Item>
                                <View style={{height:20}}></View>
                                <Item regular style={{backgroundColor:'white'}} rounded>
                                    <Icon active type="AntDesign" name='key' />
                                    <Input placeholder={this.props.translate('form.password')}/>
                                </Item>
                            </Content>
                        </Container>
                    </View>
                    <View style={{flex:1,alignItems:'center',marginTop:'30%'}}>
                    <Button success style={{width:60,height:60,borderRadius:30,justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                        <Icon name='arrow-forward' style={{textAlign:'center',color:'white',fontSize:32}} />
                    </Button>
                    </View>
                </View>
            </View>
        )
    }
}
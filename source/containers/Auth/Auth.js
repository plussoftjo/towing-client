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
@inject('settings')
@observer
export default class Auth extends React.Component {
    componentDidMount() {
        this.props.auth.fetch_info();
    }
    render() {
        const translate = this.props.languages.translate;
        return (
            <ImageBackground source={Images.new_background} style={{flex:1,flexDirection:'column'}}>
                <View style={{flex:1}}>
                    <Animatable.View animation="bounceInDown" style={{flex:1,justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                        <Text style={{color:Colors.StylesColor.labels,fontSize:24,fontWeight:'600',textAlign:'right'}}>UBR-TOWING</Text>
                        <View style={{marginHorizontal:50}}>
                            <Text style={{color:Colors.StylesColor.labels,fontSize:16,fontWeight:'500',textAlign:'center',paddingTop:5}}>{translate("auth.main.bottom")}</Text>
                        </View>
                    </Animatable.View>
                </View>
                <View style={{flex:2}}>
                    <View style={{flex:1,flexDirection:'column-reverse',marginHorizontal:25,marginBottom:50}}>
                        <TouchableOpacity onPress={() => {
                            this.props.navigation.navigate('SignUp');
                        }}>
                            <StyledButton text={'Register'} active={true}></StyledButton>
                        </TouchableOpacity>
                        <View style={{height:5}}></View>
                        <TouchableOpacity onPress={() => {
                            this.props.navigation.navigate('Login');
                        }}>
                            <StyledButton text={'Login'} active={this.props.auth.method == AuthMethods.REGISTER ? true :false}></StyledButton>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        )
    }
}


class StyledButton extends React.Component {
    render() {
        return (
            <View style={{padding:15,paddingLeft:20,paddingRight:20,borderWidth:1,borderColor:Colors.StylesColor.Borders,borderRadius:5,backgroundColor:this.props.active ? 'rgba(0,0,0,0.9)':'rgba(0,0,0,0.2)'}}>
                <Text style={{fontWeight:'600',color:Colors.StylesColor.labels,textAlign:'center'}}>
                    {this.props.text}
                </Text>
            </View>
        )
    }
}
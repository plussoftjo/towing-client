import React from 'react';
import {View,TouchableOpacity,Image} from 'react-native';
import {Container,Content,Button, Icon,Item,Text,Input,Header,Left,Body,Right,Title} from 'native-base';
import {inject,observer} from 'mobx-react';
import {Alertx,Loader} from '../../../components'
@inject('auth')
@observer
export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {error:false,loader:false};
    }
    render() {
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
                <Content  contentContainerStyle={{ justifyContent: 'center', flex: 1,padding:20 }}>
                <TouchableOpacity onPress={() => {
                    this.setState({type:'user_image',open_camera:true});
                }} style={{justifyContent:'center',alignContent:'center',alignItems:'center',position:'relative'}}>
                    <Image source={require('../../../images/avatar.png')} style={{width:90,height:90,borderRadius:90 /2}} />
                    <View style={{position:'absolute',left:0,top:0,justifyContent:'center',alignContent:'center',alignItems:'center',width:'100%'}}>
                    </View>
                </TouchableOpacity>
                    <View style={{height:20}}></View>
                    <Item regular style={{backgroundColor:'white'}} rounded>
                        <Icon active type="AntDesign" name='phone' />
                        <Input placeholder={'Phone'} keyboardType='numeric' value={this.props.auth.login_input.phone} onChangeText={(value) =>{this.props.auth.login_input.phone = value;}}/>
                    </Item>
                    <View style={{height:20}}></View>
                    <Item regular style={{backgroundColor:'white'}} rounded>
                        <Icon active type="AntDesign" name='key' />
                        <Input placeholder={'Password'} secureTextEntry={true} value={this.props.auth.login_input.password} onChangeText={(value) => {this.props.auth.login_input.password = value;}}/>
                    </Item>

                    {this.state.error &&
                        <Alertx>Error phone or password</Alertx>
                    }
                    <View style={{height:20}}></View>

                    <View key="button" style={{width:'100%'}}>
                    <Button success block onPress={() => {
                        this.setState({loader:true});
                        this.props.auth._login(this.props.navigation,() => {
                            this.setState({error:true,loader:false});
                        });
                        }} style={{borderRadius:30,justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                        <Text style={{color:'white',fontWeight:'700'}}>Login</Text>
                        <Icon name='arrow-forward' style={{textAlign:'center',color:'white',fontSize:32}} />
                    </Button>
                </View>
                </Content>
                {this.state.loader &&
                    <Loader />
                }
            </Container>
        )
    }
}
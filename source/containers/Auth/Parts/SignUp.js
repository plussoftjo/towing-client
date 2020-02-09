import React from 'react';
import {View,TouchableOpacity,Text} from 'react-native';
import {Container,Content,Header,Left, Body, Right, Button, Icon, Title,Form,H3,Item, Input,Label,Picker} from 'native-base';
import {Alertx} from '../../../components';
import {helper} from '../../../service';
import {inject,observer} from 'mobx-react';
@inject('auth')
@observer
export default class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error:false,
            error_text:''
        };
    }
    componentDidMount() {
        this.setState({error:false,error_text:''});
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
                <Content padder>
                    <H3 style={{marginVertical:30,marginHorizontal:10}}>User Information</H3>
                   <View style={{height:30}}></View>
                   <Form>
                        <Item stackedLabel>
                            <Label>Phone Number</Label>
                            <Input keyboardType={'phone-pad'} value={this.props.auth.user_input.phone} onChangeText={(value) => {this.props.auth.user_input.phone = value;}} />
                        </Item>
                        <Item stackedLabel>
                            <Label>Password</Label>
                            <Input secureTextEntry={true} value={this.props.auth.user_input.password} onChangeText={(value) => {this.props.auth.user_input.password = value;}} />
                        </Item>
                        <Item stackedLabel>
                            <Label>Confirm Password</Label>
                            <Input secureTextEntry={true} value={this.props.auth.user_input.confirm_password} onChangeText={(value) => {this.props.auth.user_input.confirm_password = value;}} />
                        </Item>
                   </Form>
                   {this.state.error &&
                    <Alertx>
                        {this.state.error_text}
                    </Alertx>
                   }
                   <View style={{height:30}}></View>
                   <Button dark block onPress={() => {
                       if(helper.check_values([this.props.auth.user_input.phone,this.props.auth.user_input.password,this.props.auth.user_input.confirm_password])) {
                        if(this.props.auth.user_input.password == this.props.auth.user_input.confirm_password) {
                            this.props.navigation.navigate('UserInformation');
                            this.setState({error:false,error_text:''});
                        }else {
                            this.setState({error:true,error_text:'the password is different'});
                        }
                       }else {
                           this.setState({error:true,error_text:'please fill all required fields'});
                       }
                   }}><Text style={{color:'white',fontFamily:'Roboto_medium'}}>Next Step</Text></Button>
                </Content>
            </Container>
        )
    }
}
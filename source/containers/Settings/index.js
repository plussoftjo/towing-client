import React from 'react';
import {View,Text,ScrollView} from 'react-native';
import {Container,Content, Header, Body,Left,Right,Icon,ListItem,Button,Switch} from 'native-base';
import {HeaderComponent,TripCard} from '../../components';
export default class AboutUs extends React.Component {
    state = {
        notifaction:false
    };
    render() {
        return (
            <Container>
                <HeaderComponent topTitle="Settings" leftIcon={{type:'EvilIcons',name:'arrow-left',onPress:()=>{this.props.navigation.goBack()}}}/>
                <Content contentContainerStyle={{paddingTop:10}}>
                <ListItem icon>
                    <Left>
                    <Button style={{ backgroundColor: "#97B4FA" }}>
                        <Icon active type="AntDesign" name="notification" />
                    </Button>
                    </Left>
                    <Body>
                    <Text>Notification</Text>
                    </Body>
                    <Right>
                    <Switch value={this.state.notifaction} onValueChange={(value) => {this.setState({notifaction:value})}} />
                    </Right>
                </ListItem>
                </Content>
            </Container>
        )
    }
}
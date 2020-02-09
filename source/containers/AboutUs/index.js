import React from 'react';
import {View,Text,ScrollView} from 'react-native';
import {Container,Content, Header, Body,Left,Right,Icon} from 'native-base';
import {HeaderComponent,TripCard} from '../../components';
export default class AboutUs extends React.Component {
    render() {
        return (
            <Container>
                <HeaderComponent topTitle="About Us"leftIcon={{type:'EvilIcons',name:'arrow-left',onPress:()=>{this.props.navigation.goBack()}}}/>
                <Content contentContainerStyle={{paddingHorizontal:40,paddingTop:40,paddingBottom:20}}>
                    <Text style={{fontSize:24,fontFamily:'Roboto_medium'}}>Our App</Text>
                    <View style={{height:7}}></View>
                    <Text style={{fontSize:16,fontFamily:'Roboto'}}>
                        More than just an app, our app is made for help you any where and any time .
                    </Text>
                    <Text style={{fontSize:15,fontFamily:'Roboto'}}>
                        We lead in TOWING business in Global, and we have Alot of experince driver waiting for help you.
                    </Text>
                    <View style={{height:20}}></View>
                    <Text style={{fontSize:24,fontFamily:'Roboto_medium'}}>
                        Our Mission
                    </Text>
                    <View style={{height:7}}></View>
                    <Text style={{fontSize:16,fontFamily:'Roboto'}}>
                        UBR-Towing started as an help with phone but now we make easy for the client to get help any where, with fast
                        help method, we can access you any time and every where with our smart mobile application.
                    </Text>
                    <View style={{height:20}}></View>
                    <Text style={{fontSize:24,fontFamily:'Roboto_medium'}}>
                        Our Team
                    </Text>
                    <View style={{height:7}}></View>
                    <Text style={{fontSize:16,fontFamily:'Roboto'}}>
                        UBR Towing team is one of the most experince in the world , To make the app more flexible for you .
                    </Text>
                    <View style={{height:20}}></View>
                    <Text style={{fontSize:24,fontFamily:'Roboto_medium'}}>
                        Our Driver
                    </Text>
                    <View style={{height:7}}></View>
                    <Text style={{fontSize:16,fontFamily:'Roboto'}}>
                        UBR Towing driver is experince Driver you know how to help you  .
                    </Text>
                </Content>
            </Container>
        )
    }
}
import React from 'react';
import {View} from 'react-native';
import {Container,Content,Text,Item,Icon,Input,Button, Form,Picker,ListItem, CheckBox,Body,List, Header} from 'native-base';

export default class RegisterComplate extends React.Component{
    render() {
        return (
            <Container>
                <Header />
                <View style={{flex:1,justifyContent:'center',alignItems:'center',alignContent:'center'}}>
                    <Text style={{fontWeight:'700',color:'black',fontSize:24}}>Register complete</Text>
                    <Text style={{fontWeight:'600',color:'black',fontSize:16,textAlign:'center',marginTop:20}}>Thank you for register with us we happy to help you . </Text>
                    <Button success onPress={() => {
                        this.props.navigation.navigate('Main');
                        }} style={{borderRadius:30,justifyContent:'flex-end',marginTop:30}}>
                        <Text style={{color:'white',fontWeight:'700'}}>Lets go</Text>
                        <Icon name='arrow-forward' style={{textAlign:'center',color:'white',fontSize:32}} />
                    </Button>
                </View>
            </Container>
        )
    }
}
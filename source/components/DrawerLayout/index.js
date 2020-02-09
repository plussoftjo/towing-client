import React from 'react';
import {View,Text,Image,AsyncStorage} from 'react-native';
import { Icon, Container, Content,Left,Right,List,ListItem } from 'native-base';
import {observer,inject} from 'mobx-react'
import Images from '../../commons/Images';
@inject('auth')
@observer
export default class DrawerLayout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {sections:[
            {title:'Main',title_ar:'الرئيسية',icon:'map',at:'Main'},
            {title:'My Trip',title_ar:'دوراتي',icon:'monitor',at:'Trips'},
            {title:'About Us',title_ar:'حول التطبيق',icon:'file-text',at:'AboutUs'},
            {title:'Settings',title_ar:'الاعدادات',icon:'settings',at:'Settings'},
        ]};
    }
    render() {
        return (
            <View style={{backgroundColor:'black',height:'100%',paddingTop:25}}>
                <View id="ProfileSection" style={{padding:15,backgroundColor:'black',paddingBottom:0}}>
                    <Image source={Images.avatar} style={{width:60,height:60,borderRadius:30}} resizeMode="contain" />
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style={{paddingTop:10,color:'white',fontSize:20}}>{this.props.auth.user.name}</Text>
                    <Icon type="Feather" name="chevron-down" style={{color:'white',paddingTop:10}} />
                    </View>
                </View>
                <View style={{backgroundColor:'black'}}>
                    <View id="hr" style={{height:1,backgroundColor:'white',width:'100%',marginTop:15}}></View>
                </View>
                <Container>
                    <Content>
                        <List>
                        {this.state.sections.map((trg,index) => 
                                <ListItem key={index} onPress={() => {
                                    if(index == 0){
                                        this.props.closeDrawer();
                                    }
                                        this.props.navigation.navigate(trg.at)
                                    }}>
                                    <Left>
                                        <View style={{flexDirection:'row'}}>
                                            <Icon type="Feather" name={trg.icon} style={{color:'black'}} />
                                            <Text style={{marginLeft:10,color:'black'}}>{trg.title}</Text>
                                        </View>
                                    </Left>
                                    <Right>
                                        <Icon type="Feather" name={'chevron-right'} style={{color:'black'}} />
                                    </Right>
                                </ListItem>  
                            )}
                            <ListItem onPress={async() => {
                                await AsyncStorage.removeItem('token');
                                this.props.navigation.navigate('Auth');
                                }}>
                                <Left>
                                    <View style={{flexDirection:'row'}}>
                                        <Icon type="Feather" name={'log-out'} style={{color:'black'}} />
                                        <Text style={{marginLeft:10,color:'black'}}>log out</Text>
                                    </View>
                                </Left>
                                <Right>

                                </Right>
                            </ListItem> 
                        </List>
                    </Content>
                </Container>
            </View>
        )
    }
}
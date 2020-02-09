import React from 'react';
import {View,Text,Image,ImageBackground} from 'react-native';
import {Spinner} from 'native-base';
import {Images} from '../../commons';
import {inject,observer} from 'mobx-react';
@inject('languages')
@inject('auth')
@observer
export default class AppLoader extends React.Component {
    componentDidMount() {
        this.props.auth._auth(this.props.navigation);
    }
    render() {
        return (
            <ImageBackground source={Images.new_background} resizeMode="cover" style={{flex:1,justifyContent:'center',alignItems:'center',alignContents:'center'}}>
                <Image source={require('../../images/icon.png')} style={{width:100,height:100}} resizeMode="cover"></Image>
                {/* <Text style={{fontSize:16,fontWeight:'600',marginTop:20,color:'white'}}>{translate('loading')}</Text> */}
                <Spinner color='white' />
            </ImageBackground>
        )
    }
}
import React from 'react';
import {Marker} from 'react-native-maps';
import {Icon} from 'native-base';
import {Image} from 'react-native';
import {Images} from '../../commons'
export default class MapsMarker extends React.Component {
    render() {
        let has = this.props.has;
        return (
            <Marker coordinate={{latitude:this.props.coords.latitude,longitude:this.props.coords.longitude}} anchor={{x: 0.5, y: 0.5}} style={{justifyContent:'center',alignItems:'center',alignContent:'center'}}>
                {/* <Image source={Images.car_marker} style={{width:40,height:40}} resizeMode="cover" /> */}
                {has == 'icon' && 
                    <Icon type={this.props.data.type} name={this.props.data.name} style={{color:this.props.data.color,fontSize:this.props.data.size}} />
                }
                {has == 'image' && 
                    <Image source={Images.car_marker} style={{width:50,height:50}} resizeMode="contain" />
                }
            </Marker>
        )
    }
}
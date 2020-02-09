import React from 'react';
import {View} from 'react-native';
import {Container,Content,Icon,Text} from 'native-base';

export default class TripCard extends React.Component {
    render() {
        return (
            <View style={{padding:10}}>
                <View style={{flexDirection:'row',justifyContent:'space-between',padding:3}}>
                    <Text style={{fontWeight:'600',fontSize:14}}>{this.props.date}</Text>
                    <Text style={{fontWeight:'800',fontSize:14}}>{this.props.net}</Text>
                </View>
                <View style={{padding:10,borderTopRightRadius:10,borderTopLeftRadius:10,borderBottomLeftRadius:10,borderBottomRightRadius:30,borderWidth:0.5,borderColor:'rgba(0,0,0,0.5)'}}>
                    <View style={{flexDirection:'row',alignContent:'center',alignItems:'center'}}>
                        <Icon name="car" />
                        <Text> {this.props.car}</Text>
                    </View>
                    <View style={{flexDirection:'row',alignContent:'center',alignItems:'center',marginTop:10}}>
                        <Icon type="MaterialIcons" name="sync-problem" style={{fontSize:25}} />
                        <Text> {this.props.service}</Text>
                    </View>
                    {this.props.method == 'paypal'?
                    <View style={{flexDirection:'row',alignContent:'center',alignItems:'center',marginTop:10}}>
                        <Icon name="paypal" type="Entypo" style={{fontSize:25}} />
                        <Text> PayPal</Text>
                    </View>
                    :
                    <View style={{flexDirection:'row',alignContent:'center',alignItems:'center',marginTop:10}}>
                        <Icon name="card"  style={{fontSize:25}} />
                        <Text> Credit Card</Text>
                    </View>
                    }
                    <View style={{flexDirection:'row',alignContent:'center',alignItems:'center',marginTop:10}}>
                        <Icon type="SimpleLineIcons" name="note" style={{fontSize:25}} />
                        <Text> {this.props.note}</Text>
                    </View>
                </View>
            </View>
        )
    }
}
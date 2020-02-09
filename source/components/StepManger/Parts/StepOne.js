import React from 'react';
import {View,StyleSheet} from 'react-native';
import { Item,Input,Icon,List,Content } from 'native-base';
import ListCard from '../../ListCard';
import * as Animatable from 'react-native-animatable';
import {googleapi} from '../../../service';
import {inject,observer} from 'mobx-react';
@inject('locations')
@inject('manger')
@inject('processor')
@observer
export default class StepOne extends React.Component {
    constructor(props) {
        super(props);

        this.state = {text:'',PlacesList:[]};
    }

    _change_value(value) {
        /** register the value to state */
        this.setState({text:value});
        /** Search the value */
        this._search(value);
    }

    async _search(value) {
        /** Get the result  */
        let text = this.state.text;// Search text
        let coords = this.props.locations.user_coords;

        /** Search from the googleapi service function */
        let result = await googleapi.place(value,coords);
        
        /** Set state from the result */
        this.setState({PlacesList:result});
    }

    async _click_result(place) {
        let result = await googleapi.directions(place,this.props.locations.user_coords);
        let distance = await googleapi.distance_matrix(place,this.props.locations.user_coords);
        /** Register points to state */
        this.props.locations.register_polyine_points(result);
        this.props.locations.register_directions_name(place);
        this.props.locations.register_direction_matrix(distance);
        this.props.processor.service.direction_name = place;
        this.props.manger.mapLayout.target_directions = true;
        this.props.PressPlace();
    }

    render() {
        let locations = this.props.locations;
        let map = this.props.map;
        return (
            <Animatable.View duration={500} animation="slideInUp" style={{backgroundColor:'white',height:'100%',width:'100%',position:'absolute',left:0,top:0,zIndex:102}}>
                <View style={{paddingTop:30,paddingLeft:15}}>
                    <Icon onPress={() => {
                        map.animateToRegion({
                            latitude:locations.map_coords.latitude,
                            longitude:locations.map_coords.longitude,
                            latitudeDelta:0.015,
                            longitudeDelta:0.0121
                        });
                        this.props.manger._reMapLayoutValue();
                        this.props.PressBack();
                        }} type="EvilIcons" name="arrow-left" style={{fontSize:48}} ></Icon>
                </View>
                <View style={{padding:20,paddingTop:5}}>
                    <Item regular style={styles.input_card}>
                        <Icon active name='navigation' type="Feather" />
                        <Input value={this.state.text} autoFocus onChangeText={(value) => {this._change_value(value);}} placeholder={'Select Place'} placeholderTextColor="black" style={{fontWeight:'700'}} />
                    </Item>
                </View>
                <View style={{marginTop:10,marginBottom:10,height:1,backgroundColor:'rgba(0,0,0,0.5)'}}></View>
                <Content>
                    <List>
                        {this.state.PlacesList.map((trg,index) =>
                            <ListCard key={index} icon="pin" text={trg.description} press={() => {
                                // this._click_result(trg.description);
                                this._click_result(trg.description);
                            }}></ListCard>
                        )}
                        {/* {this.state.PlacesList.length == 0 && 
                            <ListCard icon="pin" text={translate('main.stepOne.location_in_map_text')} press={() => {console.log('hh')}}></ListCard>
                        } */}
                    </List>
                </Content>
            </Animatable.View>
        )
    }
}

const styles = StyleSheet.create({
    input_card:{
        borderWidth:1,
        borderRadius:5,
        borderColor:'black',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 3,
    }
});
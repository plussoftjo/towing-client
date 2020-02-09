import React from 'react';

/** Components */
import {View} from 'react-native';
import {googleapi} from '../../../service';
import LottieView from "lottie-react-native";
import * as Animatable from 'react-native-animatable';
import {Button,Text} from 'native-base';
import {LottieFiles} from '../../../commons'
import axios from 'axios';
import {inject,observer} from 'mobx-react';

@inject('socketmanger')
@inject('locations')
@inject('drivers')
@inject('processor')
@inject('auth')
@inject('settings')
@observer
export default class StepFive extends React.Component {
    constructor(props) {
        super(props);

        this.state = {have_driver:true,timer_count:10,clear:false,unsubscripes:[]};
    }
    componentDidMount() {
        if(this.state.have_driver) {this.animation.play();}
        let self = this; // register
        let map = self.props.map;

        /** Driver Found function
         * #Call function when response from driver
         */

        let approve_function = async function(data) {
                /** The Driver Accept the trip */
                // -- //
                /** Register data */
                self.props.processor.register_driver(data.user,data.coords);
                // Set latlng to the drivers locations
                self.props.locations.latlng =  {latitude:data.coords.latitude,longitude:data.coords.longitude};
                // Set Driver Marker to the true for show the driver marker in MapPartMAnger
                self.props.manger.mapLayout.driver_marker = true;
                /** Get polyLine to display  */
                let polylinepoints  = await googleapi.direction_with_coords(self.props.locations.user_coords,data.coords);
                self.props.locations.driver_polyline_points = polylinepoints;
                // Turn on driver polyline
                self.props.manger.mapLayout.driver_directions = true;
                /** get KM and time */
                let distance = await googleapi.distance_matrix_with_coords(self.props.locations.user_coords,data.coords);
                self.props.processor.distance = distance;
                // Change Steps 
                self.props.manger._change_step(6);

                /** Save order to the database */
                axios.post(self.props.settings.serverUri + 'api/order/store',{user_id:self.props.auth.user.id,driver_id:data.user.id,state:1,service:self.props.processor.service.main_service,sub_service:self.props.processor.service.sub_service,note:self.props.processor.service.note,latlng_user:self.props.locations.user_coords.latitude+','+self.props.locations.user_coords.longitude,car_type:self.props.processor.car_type,amount:self.props.pricing.price.toFixed(1),distantion:self.props.processor.service.direction_name}).then(response => {
                    self.props.processor.service.order_id = response.data.order_id;
                }).catch(err => {
                    console.log(err.response);
                });

                //--//
                /** End the driver accept function */
        }

        let reject_function = async function(data) {
                /** The driver not accept the trip or is not responsed */
                // -- //
                // 1# Unsbscripe from socket
                if(self.state.unsubscripes.includes(data.room)) {
                    return;
                }

                /** Push to unsbscriper room */
                let unsubscripes_list = self.state.unsubscripes;
                unsubscripes_list.push(data.room);
                self.setState({unsubscripes:unsubscripes_list});
                self.props.socketmanger.unsubscripe(data.room);
                // 2# Get the other Driver 
                await self.props.drivers._selected_driver(self.props.processor.car_type);
                // 3# Check if have other drivers 
                if(self.props.drivers.selected_driver.have_driver) {
                    // 3.1&3.2 Changed to function request_driver
                    // 3.3# Incress timer_count
                    let t = 10 - self.state.timer_count;
                    self.setState({timer_count:self.state.timer_count + t,room:self.props.drivers.selected_driver.driver.id});
                    // 4# Call the request_driver function again 
                    request_driver();
                }else {
                    // 404# Call not found driver function 
                    self.setState({have_driver:false,clear:true,room:self.props.drivers.selected_driver.driver.id});
                    /** &&& */ // Make Not found driver function 
                }
        }

        let driver_response = async function(data) {
            /** Check the state */
            if(data.state == 'approve') {
                approve_function(data);
            }else {
                reject_function(data);
            }
        } /** End driver response function */


        /**
         * Timer:
         *  {this is timer for the curent session}
         *  connected with number in state
         *  
         */
        let timer = function () {
            let t = setInterval(() => {
                if(self.state.timer_count == 0) {
                    if(self.props.drivers.selected_driver.driver !== null) {
                        driver_response({state:'reject',room:self.props.drivers.selected_driver.driver.id});
                        if(self.state.clear) {
                            clearInterval(t);
                        }
                    }else {
                        self.setState({have_driver:false,clear:true});
                        clearInterval(t);
                    }
                }else {
                    self.setState({timer_count:self.state.timer_count - 1});
                }
            }, 1000);
        }
        timer();
        
        // Make the request_driver function 
        let request_driver = async function () {
            // 3.1# Create order_data object
            let order_data = {
                user:self.props.auth.user,
                user_coords:self.props.locations,
                room:self.props.drivers.selected_driver.driver.id,
                service:{
                    main_service:self.props.processor.service.main_service,
                    sub_service:self.props.processor.service.sub_service,
                    note:self.props.processor.service.note,
                    order_id:self.props.processor.service.order_id,
                    direction_name:self.props.processor.service.direction_name,
                    direction_polyline:self.props.processor.service.direction_polyline,
                    have_towing:self.props.processor.service.have_towing,
                }
            };
            // 3.2# Subscripe to the driver with the data and other driver
            await self.props.socketmanger.request_driver(order_data);
            /** Subscripe  */
            self.setState({clear:false});
            self.props.socketmanger.get_approve_from_client(driver_response); //Call driver_founded when response
        }
        // Call the request_driver function in default 
        request_driver();


    }
    render() {
        let map = this.props.map;
        return (
            <View style={{justifyContent:'center',alignContent:'center',alignItems:'center',height:'100%',width:'100%'}}>
                <Text style={{fontSize:36}}>{this.state.timer_count}</Text>
                {this.state.have_driver &&
                <LottieView
                ref={animation => {
                    this.animation = animation;
                }}
                style={{
                    width: 300,
                    height: 300,
                }}
                source={LottieFiles.FindDriver}
                />
                }

                {this.state.have_driver &&
                <Animatable.Text iterationCount="infinite" duration={2000} animation="flash" style={{color:'white',fontSize:22,fontWeight:'800',color:'black'}}>Find Your Driver</Animatable.Text>
                }

                {!this.state.have_driver &&
                <Animatable.View animation="slideInUp" style={{position:'absolute',bottom:0,left:0,backgroundColor:'white',width:'100%'}}>
                    <View style={{padding:20}}>
                        <Text style={{color:'black',fontSize:14,fontWeight:'600'}}>We cannot find any truck right now .</Text>
                    </View>
                    <Button dark block style={{borderRadius:0}} onPress={() => {
                        // Reset driver
                        this.props.drivers._reSet();
                        this.setState({have_driver:true,timer_count:15,clear:false});
                        // back to the first step 
                        this.props.manger._change_step(0);
                    }}><Text style={{color:'white',fontWeight:'700',fontSize:16}}>Try again</Text></Button>
                </Animatable.View>
                }
            </View>
        )
    }
}
import React from 'react';

/** Components */
import {View} from 'react-native';
import {googleapi} from '../../../service';
import LottieView from "lottie-react-native";
import * as Animatable from 'react-native-animatable';
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
    componentDidMount() {
        this.animation.play(); // Start Lottie Animation
        let self = this;
        let map = self.props.map;
        
        function driver_timer_function() {
            if(driver_time == 0) {
                stop_driver_timer_function();
            }else {
                driver_time = driver_time - 1;
            }
        }
        async function stop_driver_timer_function() {
            /** unsubscripe */
            /** get nerist driver from the duty options */
            let nerist_driver = null;

            let getNeristDriver = function () {
                if(self.props.processor.car_type == 0) {
                    nerist_driver = self.props.drivers.nerist_drivers.light_duty;
                }
                if(self.props.processor.car_type == 1) {
                    nerist_driver = self.props.drivers.nerist_drivers.medium_duty;
                }
                if(self.props.processor.car_type == 2) {
                    nerist_driver = self.props.drivers.nerist_drivers.heavy_duty;
                }
            }
            await getNeristDriver();

            self.props.socketmanger.unsubscripe(nerist_driver.id);

            await self.props.drivers._check_other_driver(self.props.locations.user_coords,nerist_driver.id,self.props.processor.car_type);


            // When Approve Make driver_founded();
            if(nerist_driver == null) {
                // display not found message
                console.log('not found driver');
            }else {
                self.props.socketmanger.get_approve_from_client(driver_founded);
            }
            clearInterval(driver_timer);
        }
        

        let driver_founded = async function(data) {
            if(data.state == 'approve') {
                driver_approve(data);
            }else {
                driver_reject(data);
            }
        }


        let driver_approve = async function(data) {
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
            self.props.manger._change_step(6);


            /** Save order to the database */
            axios.post(self.props.settings.serverUri + 'api/order/store',{user_id:self.props.auth.user.id,driver_id:data.user.id,state:1,service:self.props.processor.service.main_service,sub_service:self.props.processor.service.sub_service,note:self.props.processor.service.note,latlng_user:self.props.locations.user_coords.latitude+','+self.props.locations.user_coords.longitude,car_type:self.props.processor.car_type}).then(response => {
                self.props.processor.service.order_id = response.data.order_id;
            }).catch(err => {
                console.log(err.response);
            });
        }

        let driver_reject = async function(data) {
            // When Driver reject
        }

        
        // When Approve Make driver_founded();
       self.props.socketmanger.get_approve_from_client(driver_founded);
    }
    render() {
        let map = this.props.map;
        return (
            <View style={{justifyContent:'center',alignContent:'center',alignItems:'center',height:'100%',width:'100%'}}>
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
                <Animatable.Text iterationCount="infinite" duration={2000} animation="flash" style={{color:'white',fontSize:22,fontWeight:'800',color:'black'}}>Find Your Driver</Animatable.Text>
            </View>
        )
    }
}
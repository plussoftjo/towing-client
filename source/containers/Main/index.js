import React from 'react';

/** Components */
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions,TouchableOpacity,AsyncStorage } from 'react-native';
import {Icon,Drawer} from 'native-base';
import {StepManger,LocationLoader,DirectionsPoly,DriverDirectionsPoly,MapPartManger,DrawerLayout} from '../../components'

/** Expo Librarys */
import { Notifications } from 'expo';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

/** Service */
import {permissions} from '../../service'
import {inject,observer} from 'mobx-react';
import axios from 'axios';
/** Styles */
import {styles} from './styles';

/** injection stores  */
@inject('languages')
@inject('settings')
@inject('locations')
@inject('drivers')
@inject('manger')
@inject('socketmanger')
@inject('processor')
@inject('auth')
@observer
export default class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isReady:false
        };
    }

    componentWillMount() {
        this._install_notification();
        this._install_coords();
    }

    async _install_notification() {
     
        //** Check if have token */
        let notification_token = await AsyncStorage.getItem('notification_token');
        if(notification_token !== null) {
            // Has
            if(this.props.auth.user.notifaction_token == null) {
                axios.post(this.props.settings.serverUri + 'api/helper/notification/update',{id:this.props.auth.user.id,token:notification_token}).then(response => {

                }).catch(err => {
                    console.log(err.response);
                });
            }
        }else {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            // only asks if permissions have not already been determined, because
            // iOS won't necessarily prompt the user a second time.
            // On Android, permissions are granted on app installation, so
            // `askAsync` will never prompt the user
    
            // Stop here if the user did not grant permissions
            if (status !== 'granted') {
                alert('No notification permissions!');
                return;
            }
    
            // Get the token that identifies this device
            let token = await Notifications.getExpoPushTokenAsync();
            await AsyncStorage.setItem('notification_token',token);
            axios.post(this.props.settings.serverUri + 'api/helper/notification/update',{id:this.props.auth.user.id,token:notification_token}).then(response => {

            }).catch(err => {
                console.log(err.response);
            });
        }
        this._notificationSubscription = Notifications.addListener(this._handleNotification);

    }
    _handleNotification = (notification) => {
        let self = this;
        // do whatever you want to do with the notification
        this.has_approve(notification.data.data);
      };
      has_approve = (data) => {
          let self = this;
          let approve_function = async function(data) {
                /** The Driver Accept the trip */
                // -- //
                /** Register data */
                self.props.processor.register_driver(data.user,data.coords);
                // Set latlng to the drivers locations
                self.props.locations.latlng =  {latitude:data.coords.latitude,longitude:data.coords.longitude};
                // Set Driver Marker to the true for show the driver marker in MapPartMAnger
                /** Get polyLine to display  */
                let polylinepoints  = await googleapi.direction_with_coords(self.props.locations.pickup_coords,data.coords);
                self.props.processor.driver_polyline = polylinepoints;
                // Turn on driver polyline
                self.props.manger.mapLayout.driver_directions = true;
                self.props.manger.mapLayout.driver_marker = true;
                self.props.manger.mapLayout.pickup_icon = true;

                /** get KM and time */
                let distance = await googleapi.distance_matrix_with_coords(self.props.locations.pickup_coords,data.coords);
                self.props.processor.distance = distance;
                // Change Steps 
                self.props.manger._change_step(9);

                // /** Save order to the database */
                await axios.post(self.props.settings.serverUri + 'api/order/store',{
                    user_id:self.props.auth.user.id,
                    driver_id:self.props.processor.driver.id,
                    state:1,
                    car_type:self.props.processor.car_type,
                    service:self.props.processor.service.main_service,
                    sub_service:self.props.processor.service.sub_service,
                    amount:self.props.processor.service.price,
                    dropoff_location:'null',
                    pickup_coords:self.props.locations.pickup_coords.latitude + ',' + self.props.locations.pickup_coords.longitude
                }).then(response => {
                    self.props.processor.service.order_id = response.data.order_id;
                }).catch(err => {
                    console.log(err.response);
                });
                // Make Data for cache
                let cache_data = {
                    // ->> processor 
                        // --> Driver & Driver Coords
                            driver:data.user,
                            driver_coords:data.coords,
                        // --> Service & Car Type
                            service:self.props.processor.service,
                            car_type:self.props.processor.car_type,
                        // --> Driver PolyLine & Distance
                            driver_polyline:self.props.processor.driver_polyline,
                            distance:self.props.processor.distance,
                    // ->> Manger
                        // --> Step
                            step:self.props.manger.step,
                        // --> MapLayout
                        mapLayout:self.props.manger.mapLayout,
                    // ->> location
                        // pickup_location
                        pickup_coords:self.props.locations.pickup_coords,
                        polyline_points:self.props.locations.polyline_points
                };
                // To String 
                let cache_date_string = JSON.stringify(cache_data);
                try {
                await AsyncStorage.setItem('order', cache_date_string);
                } catch (error) {
                // Error saving data
                console.warn(error)
                }

                //--//
                /** End the driver accept function */
        }
        approve_function(data)
      }

    _install_coords = async() => {
        /** Install Coords */
        let {status} = await Permissions.askAsync(Permissions.LOCATION);// Check Permissions
        if(status !== 'granted') {permissions._onPermissionDeney();} // If Permissions Deney
        let location = await Location.getCurrentPositionAsync(); // Get Coords
        this.setState({isReady:true});

        /** Register to the stores */
        this.props.locations.register_user_coords(location.coords); //For this user coords
        this.props.locations.register_map_coords(location.coords);  // Map location the current location
        this.props.locations.register_pickup_coords(location.coords); // Drop off location used my current location

        /** Install check driver to the closeits drivers */
        this.props.drivers._get_nerist_drivers(location.coords);
        /** Check orders */

        // await AsyncStorage.removeItem('order');
        try {
            const value = await AsyncStorage.getItem('order');
            if (value !== null) {
              // We have data!!
                let data = JSON.parse(value);
                //  Get Data one be one 
                // Processor
                await axios.post(this.props.settings.serverUri + 'api/order/get_order_with_id',{order_id:data.service.order_id}).then(response => {
                    if(response.data.state == 2) {
                        data.step = 10;
                    }
                    if(response.data.state == 3) {
                        data.step = 11;
                    }
                }).catch(err =>{console.log(err);});
                // -> service
                this.props.socketmanger.subscripe(data.driver.id);

                this.props.processor.service = data.service;
                // -> driver
                this.props.processor.driver = data.driver;
                // -> driver coords
                this.props.processor.coords = data.driver_coords;
                // -> car type
                this.props.processor.car_type = data.car_type;
                // -> driver_polyline
                this.props.processor.driver_polyline = data.driver_polyline;
                // -> distance
                this.props.processor.distance = data.distance;

                // pick up coords
                this.props.locations.pickup_coords = data.pickup_coords;
                // polyline_points
                this.props.locations.polyline_points = data.polyline_points;

                // Manger
                this.props.manger.step = data.step;
                this.props.manger.mapLayout = data.mapLayout;

                // re subscripe

            }
          } catch (error) {
            console.warn(error);
          }
    }

    navigate_to_user_coords() {
        this.map.animateToRegion({
            latitude:this.props.locations.map_coords.latitude,
            longitude:this.props.locations.map_coords.longitude,
            latitudeDelta:0.015,
            longitudeDelta:0.0121
        });
    }

    closeDrawer = () =>  {
        this.drawer._root.close();
    };

    
    /** render() */
    render() {
        /** Consents */
        let translate = this.props.languages.translate;
        let locations = this.props.locations;
        /** Return Methods */
        return (
            <Drawer  openDrawerOffset={0.30} panCloseMask={0.35} onClose={() => this.closeDrawer()} ref={(ref) => { this.drawer = ref; }} content={<DrawerLayout closeDrawer={this.closeDrawer} navigation={this.props.navigation}/>}style={styles.container} >
                {/** Map View
                 * @action Show Current Postition when Loaded
                 * @disable_now any live location to finish load 
                 */}
                <MapView 
                style={styles.mapStyle} 
                provider={'google'}
                ref={map => {this.map = map;}}
                customMapStyle={require('../../commons/MapStyle.json')}
                region={{
                    latitude:locations.map_coords.latitude,
                    longitude:locations.map_coords.longitude,
                    latitudeDelta:this.state.isReady?0.015:0.99,
                    longitudeDelta:this.state.isReady?0.0121:0.99
                }}
                showsUserLocation={true}
                >
                    {/** Maps Collictions
                     * @Step 2
                     * @show directions between tow points
                     */}
                    {/* <DirectionsPoly map={this.map} /> */}
                    {this.state.isReady &&
                    <MapPartManger coords={locations.map_coords} map={this.map} />
                    }
                </MapView>


                {/**
                 * Pin Icon
                 */}
                <TouchableOpacity onPress={() => {this.navigate_to_user_coords();}} style={{position:'absolute',bottom:'5%',right:'5%',width:45,height:45,backgroundColor:'black',justifyContent:'center',alignContent:'center',alignItems:'center',borderRadius:45 / 2}}>
                    <Icon name="navigation" type="Feather" style={{color:'white',fontSize:22}} />
                </TouchableOpacity>
                

                {/** Loader 
                 * @action Destroy When Comblete
                 * @disaply LottieView -> animation Loader
                 */}
                 {!this.state.isReady &&
                    <LocationLoader/>
                 }


                 {/** Step Manger
                  * @action Show When Ready with animation
                  * @medthod Show All the Manger Steps in containers
                  */}
                  {this.state.isReady && 
                    <StepManger map={this.map} drawer={this.drawer._root}/>
                  }

                  
            </Drawer>
            );
        
    }
}
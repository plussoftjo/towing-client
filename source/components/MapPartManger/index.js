import React from 'react';
import {View,Text} from 'react-native';
import {inject,observer} from 'mobx-react';
import MapsMarker from '../MapsMarker';
import DirectionsPoly from '../DirectionsPoly'
import Images from '../../commons/Images';

@inject('manger')
@inject('processor')
@inject('locations')
@inject('drivers')
@observer
export default class MapPartManger extends React.Component {
    render() {
        let manger = this.props.manger;
        let locations = this.props.locations;
        let map = this.props.map;
        return [
            manger.mapLayout.route_marker?<MapsMarker has="icon" data={{type:'FontAwesome',name:'map-pin',color:'#82B1FF',size:46}} key="mapMarkerRoute" coords={locations.driver_polyline_points[0]} />:null,
            manger.mapLayout.pickup_icon?<MapsMarker has="icon" data={{type:'FontAwesome',name:'map-pin',color:'#82B1FF',size:46}} key="mapMarkerRoute" coords={locations.pickup_coords} />:null,
            manger.mapLayout.driver_marker?<MapsMarker has="image" data={{type:'MaterialCommunityIcons',name:'towing',color:'#82B1FF',size:46}} key="mapMarker" coords={{latitude:this.props.processor.coords.latitude,longitude:this.props.processor.coords.longitude}} />:null,
            manger.mapLayout.direction_marker?<MapsMarker has="icon" data={{type:'FontAwesome',name:'map-pin',color:'black',size:32}} key="mapMarker" coords={locations.polyline_points[locations.polyline_points.length -1]} />:null,
            manger.mapLayout.target_directions?<DirectionsPoly key="directionPoly" map={map} points={locations.polyline_points} />:null,
            manger.mapLayout.driver_directions?<DirectionsPoly key="driverPoly" map={map} points={this.props.processor.driver_polyline} />:null,
            manger.mapLayout.route_directions?<DirectionsPoly key="routePoly" map={map} points={locations.polyline_points} />:null,
            // this.props.drivers.full_drivers_list.map((trg,index) => {
            //     let latlng = trg.driver_state.latlng.split(',');
            //     return <MapsMarker key={index} has="icon" data={{type:'MaterialCommunityIcons',name:'towing',color:'#82B1FF',size:46}} coords={{latitude:latlng[0] * 1,longitude:latlng[1] * 1}} />
            // })
        ]
    }
}
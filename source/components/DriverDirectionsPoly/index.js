import React from 'react';
import {View,Text} from 'react-native';
import MapView from 'react-native-maps';
import {inject,observer} from 'mobx-react';
import AnimatedPolyline from "react-native-maps-animated-polyline";

@inject('locations')
@observer
export default class DriverDirectionsPoly extends React.Component {
    render() {
        if(this.props.locations.driver_polyline_points.length != 0) {
            let coordinates = [];
            let self = this;
            this.props.locations.driver_polyline_points.forEach(trg => {
                coordinates.push({longitude:trg.longitude,latitude:trg.latitude});
            });
            setTimeout(() => {
                self.props.map.fitToCoordinates(coordinates,{edgePadding:{left:60,right:60,top:50,bottom:250},animated:true});
            });
            return (
                <AnimatedPolyline 
                coordinates={coordinates}
                strokeWidth={4}
                strokeColor={'black'}
                ></AnimatedPolyline >
            )
        }
        return null;
    }
}
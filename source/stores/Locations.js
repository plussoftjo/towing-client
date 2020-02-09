import {observable,computed,action} from 'mobx';

export default class Locations {
    /** Observable */

    /** User Coords -> Current Location coords  */
    @observable user_coords = {
        longitude:0,
        latitude:0
    };
    /** Map Coords -> the coords disable in the map @changeable */
    @observable map_coords = {
        longitude:-0.127758,
        latitude:51.507351
    };
    
    // drop off used when send the posiition of need towing to the driver
    // that can be changed ... 
    @observable pickup_coords = {
        longitude:0,
        latitude:0
    };


    @observable latlng = [];

    /** Polyline Points */
    @observable polyline_points = [];

    @observable polyline_points_backup = [];

    /** Distance Matrix from origin to distance */
    @observable directions_distance_matrix = {};

    /** driver Polyline points */
    @observable driver_polyline_points = [];
    
    /** Places Named */
    @observable directions_name = '';


    /** Actions  */
    @action register_user_coords(coords) {
        this.user_coords = coords;
    }

    @action register_map_coords(coords) {
        this.map_coords = coords;
    }

    @action register_pickup_coords(coords) {
        this.pickup_coords = coords;
    }

    @action register_polyine_points(points) {
        this.polyline_points = points;
        this.polyline_points_backup = points;
    }

    @action reset_polyine_points() {
        this.polyline_points = [];
    }

    @action register_driver_polyine_points(points) {
        this.driver_polyline_points = points;
    }


    @action register_directions_name (text) {
        this.directions_name = text;
    }

    @action register_direction_matrix(data) {
        this.directions_distance_matrix = data;
    }


} 
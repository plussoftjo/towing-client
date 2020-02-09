import axios from 'axios';
import {Keys} from '../commons';
import faker from './faker';
import PolyLine from '@mapbox/polyline';
const googleapi = {
    place:async function(text,coords) {
        let result = null;
        await axios.get('https://maps.googleapis.com/maps/api/place/autocomplete/json?key='+ Keys.google_place_api + '&input=' + text + '&location=' + coords.latitude + ',' + coords.longitude + '&radius=2000').then(response => {
            result = response.data.predictions
        }).catch(err => {
            console.log(err);
        });
        return result;
    },
    directions:async function(text,coords) {
        let result = null;
        //fetch directions from diretctions.google maps 
        /**
         * Directions url : 
         * @input_one {lat&lng} from the starting place
         * @input_tow description
         * @input_three api key
         */
        let fetch = await axios.get(Keys.google_directions_url + 
            coords.latitude + ',' + coords.longitude + 
            '&destination=' + text + 
            '&key=' + Keys.google_place_api).then(response => {
            const points = PolyLine.decode(response.data.routes[0].overview_polyline.points);
            const pointCoords = points.map(point => {
                return {latitude:point[0],longitude:point[1]}
            });
            result =  pointCoords;
        }).catch(err => {
            console.log(err);
        });
        
        /** Just Example */
        return result;
    },
    driver_directions:function(coords) {
        let result = null;
        //fetch directions from diretctions.google maps 
        /**
         * Directions url : 
         * @input_one {lat&lng} from the starting place
         * @input_tow description
         * @input_three api key
         */
        // let fetch = axios.get(Keys.google_directions_url + 
        //     coords.latitude + ',' + coords.longitude + 
        //     '&destination=' + text + 
        //     '&key=' + Keys.google_place_api).then(response => {
        //     const points = PolyLine.decode(response.data.routes[0].overview_polyline.points);
        //     const pointCoords = points.map(point => {
        //         return {latitude:point[0],longitude:point[1]}
        //     });
        //     return pointCoords;
        // }).catch(err => {
        //     console.log(err);
        // });
        
        /** Just Example */
        // let points = PolyLine.decode(faker.car_directions);
        // const pointCoords =  points.map(point => {
        //     return {latitude:point[0],longitude:point[1]}
        // });
        let points = PolyLine.decode(faker.directions);
        let end = points.length / 6;
        let newPoints = points.slice(0,end);
        const pointCoords =  newPoints.map(point => {
            return {latitude:point[0],longitude:point[1]}
        });
        return pointCoords;
    },
    direction_with_coords:async function(origin_coords,destination_coords) {
        let result = null;
        //fetch directions from diretctions.google maps 
        /**
         * Directions url : 
         * @input_one {lat&lng} from the starting place
         * @input_tow {lat&lng} from driver_coords
         * @input_three api key
         */
        let fetch = await axios.get(Keys.google_directions_url + 
            origin_coords.latitude + ',' + origin_coords.longitude + 
            '&destination=' + destination_coords.latitude + ',' + destination_coords.longitude + 
            '&key=' + Keys.google_place_api).then(response => {
            const points = PolyLine.decode(response.data.routes[0].overview_polyline.points);
            const pointCoords = points.map(point => {
                return {latitude:point[0],longitude:point[1]}
            });
            result =  pointCoords;
        }).catch(err => {
            console.log(err);
        });
        
        /** Just Example */
        return result;
        
    },
    distance_matrix:async function(description,coords) {
        let distance =null;
        await axios.get(Keys.google_distance_url + coords.latitude + ',' + coords.longitude + '&destinations=' + description + '&key=' + Keys.google_place_api).then(async(response) => {
            distance = response.data.rows[0].elements[0];
        }).catch(err => {
            console.log(err)
        });
        return distance;
    },
    distance_matrix_with_coords:async function(origin_coords,destination_coords) {
        let distance = null;
        await axios.get(Keys.google_distance_url + origin_coords.latitude + ',' + origin_coords.longitude + '&destinations=' + destination_coords.latitude + ',' + destination_coords.longitude  + '&key=' + Keys.google_place_api).then(async(response) => {
            distance = response.data.rows[0].elements[0];
        }).catch(err => {
            console.log(err)
        });
        return distance;
    },
    geocode:async function (description) {
        let location = null;
        await axios.get(Keys.google_geocode_url + description + '&key=' + Keys.google_place_api).then(response => {
            location = response.data.results[0].geometry.location;
        }).catch(err => {
            console.log(err);
        });
        return location;
    }
}

export default googleapi;
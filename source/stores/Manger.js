import {observable,computed,action} from 'mobx';


export default class Manger {
    /*--Global Value--*/
    @observable serverUri = 'http://moonworld.cf/';
    /*--Static Value--*/
    /**
     * Steps
     * @screens : 
     * 0 -> show Button To went screen 1 
     * 1 -> Pickup location
     */
    @observable step = 0;

    /** Map layout manger */
    @observable mapLayout = {
        target_directions:false,/** Directions between the client place and where he want  */
        driver_directions:false,/** Directions between the client and the car */
        driver_marker:false, /** Driver Car marker */
        route_directions:false, /** Final route directions */
        route_marker:false,
        navigate_to_user_icon:false,
        pickup_icon:false
    };

    /** Manger for Service Taken or selection */
    @observable _selector = {
        car_type:0,
        service:0
    };

    /** Service model  */
    @observable service_model = 1;


    /** Change Step */
    @action _change_step(step) {
        this.step = step;
    }


    @action _reMapLayoutValue() {
        this.mapLayout = {
            target_directions:false,/** Directions between the client place and where he want  */
            driver_directions:false,/** Directions between the client and the car */
            driver_marker:false, /** Driver Car marker */
            route_directions:false, /** Final route directions */
            route_marker:false,
            navigate_to_user_icon:false,
            pickup_icon:false
        };
    }

    @action _change_car_type(type_index) {
        this._selector.car_type = type_index;
    }

   constructor() {
    /*--When-Fire--*/
    
   }
}
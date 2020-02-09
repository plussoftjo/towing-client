import {observable,computed,action} from 'mobx';

export default class Processor {
    /** This is car type
     * Car type 0 = Light duty
     * Car type 1 = Medium duty
     * Car type 2 = Large Duty
     */
    @observable car_type = 0;

    /** Service
     * Main Service type * What the main service the client need it 
     * Sub Service type * if have sub service 
     * note -> if type note in it 
     */
    @observable service = {
        main_service:'',
        sub_service:'',
        dropoff_location:'',
        direction_polyline:{},
        have_towing:false,
        car:'',
        pickup:'',
        payment_options:'',
        credit_card_token:'',
        car_type:0,
        order_id:0
    };


    /*** Driver Details coming from the socket */
    @observable driver = {};
    @observable driver_polyline = {};
    @observable coords = {};
    @observable distance = {};




    @action register_driver(driver,coords) {
        this.driver = driver;
        this.coords = coords;

    }

    @action reset() {
        this.service = {
            main_service:'',
            sub_service:'',
            dropoff_location:'',
            direction_polyline:{},
            have_towing:false,
            car:'',
            pickup:'',
            payment_options:'',
            credit_card_token:'',
            car_type:0
        };

        this.driver = {};
        this.driver_polyline = {};
        this.coords = {};
        this.distance = {};

    }

}
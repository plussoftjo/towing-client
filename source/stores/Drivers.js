import {observable,computed,action} from 'mobx';
import axios from 'axios';
import {helper} from '../service';
export default class Drivers {
    @observable settings = {};
    @observable full_drivers_list = {
        light_duty:[],//light_duty
        medium_duty:[],//medium_duty
        heavy_duty:[],//heavy_duty
        motorcycle:[],//heavy_duty
    };
    @observable nerist_drivers = {
        light_duty:null,
        medium_duty:null,
        heavy_duty:null,
        motorcycle:null
    };

    @observable nerists_drivers = {
        light_duty:[],
        medium_duty:[],
        heavy_duty:[],
        motorcycle:[]
    };

    @observable selected_driver = {
        driver:null,
        inx:0,
        type:null,
        have_driver:false,
        first_time:true
    };

    @observable unsbscripe_list = [];

    @observable max_driver_list = 10;
    @observable circle_radius = 50; //km 


    /** Install Action */
    @action _install () {
        let self = this;
        axios.get(self.settings.serverUri + 'api/driver/location/get_drivers').then(response => {
            response.data.drivers.forEach((trg,index) => {
                if(trg.driver_car.car_type == 'Light Duty') {
                    self.full_drivers_list.light_duty.push(trg);
                }
                if(trg.driver_car.car_type == 'Medium duty') {
                    self.full_drivers_list.medium_duty.push(trg);
                }
                if(trg.driver_car.car_type == 'Heavy duty') {
                    self.full_drivers_list.heavy_duty.push(trg);
                }
                if(trg.driver_car.car_type == 'Motorcycle') {
                    self.full_drivers_list.motorcycle.push(trg);
                }
            });
        }).catch(err => {
            console.log(err);
        });
    }


    @action 
    _get_nerist_drivers(coords) {
        /** Get the list of drivers */
        let self = this;

        // Get light duty
        self.full_drivers_list.light_duty.forEach((trg,index) => {
            // Get latLng for drivers 
            let latlng = trg.driver_state.latlng.split(',');
            // Distance between
            let distance =  helper.point_distance([coords.latitude,coords.longitude],[latlng[0],latlng[1]]);
            // Check distance if < raduis
            if(distance < self.circle_radius) {
                // Register distance to trg 
                trg.distance = distance;
                self.nerists_drivers.light_duty.push(trg);
            }
        });

        // Get Medum duty
        self.full_drivers_list.medium_duty.forEach((trg,index) => {
            // Get latLng for drivers 
            let latlng = trg.driver_state.latlng.split(',');
            // Distance between
            let distance =  helper.point_distance([coords.latitude,coords.longitude],[latlng[0],latlng[1]]);
            // Check distance if < raduis
            if(distance < self.circle_radius) {
                trg.distance = distance;
                self.nerists_drivers.medium_duty.push(trg);
            }
        });

        // Get heavy duty
        self.full_drivers_list.heavy_duty.forEach((trg,index) => {
            // Get latLng for drivers 
            let latlng = trg.driver_state.latlng.split(',');
            // Distance between
            let distance =  helper.point_distance([coords.latitude,coords.longitude],[latlng[0],latlng[1]]);
            // Check distance if < raduis
            if(distance < self.circle_radius) {
                trg.distance = distance;
                self.nerists_drivers.heavy_duty.push(trg);
            }
        });

        // Get notocycle
        self.full_drivers_list.motorcycle.forEach((trg,index) => {
            // Get latLng for drivers 
            let latlng = trg.driver_state.latlng.split(',');
            // Distance between
            let distance =  helper.point_distance([coords.latitude,coords.longitude],[latlng[0],latlng[1]]);
            // Check distance if < raduis
            if(distance < self.circle_radius) {
                trg.distance = distance;
                self.nerists_drivers.motorcycle.push(trg);
            }
        });

        self.nerists_drivers.light_duty = helper.sortByKey(self.nerists_drivers.light_duty,'distance');
        self.nerists_drivers.medium_duty = helper.sortByKey(self.nerists_drivers.medium_duty,'distance');
        self.nerists_drivers.heavy_duty = helper.sortByKey(self.nerists_drivers.heavy_duty,'distance');
        self.nerists_drivers.motorcycle = helper.sortByKey(self.nerists_drivers.motorcycle,'distance');
    }

    @action 
    _selected_driver(type) {
        // Let result ready 
        let result = null;
        /**
         * Type : #1 check have type if not have register type if have check the type is like the type registerd or not
         *        #2 if like the type is registerd incress inx by one else return type to zero 
         */

         // Check have type 
         if(!this.selected_driver.first_time) { //Check if not the first time to incress inx
            if(this.selected_driver.type == null) { // if type not signed register type
                this.selected_driver.type = type; // register type 
                this.selected_driver.inx = 0; // make the inx 0 for sure 
            }else { // if have type 
                if(this.selected_driver.type == type) { // check if the type is the same and not changed
                    this.selected_driver.inx = this.selected_driver.inx + 1; // make the inx incressed by one 
                }else { // if type is diffrent make the inx 0
                    this.selected_driver.inx = 0;
                    this.selected_driver.type = type; // not the same register the type 
                }
            }
         }else { // if it the first time 
            this.selected_driver.type = type; // register type to difualt by the type
            this.selected_driver.inx = 0; // make the selected inx is 0 
            this.selected_driver.first_time = false; // make the first time is false for the next loop
         }
         

         /** 
          * Selected driver (by the type of car)
          * #1 Check if have driver (with neristes driver array length >= inx now)
          * #2 if have make the selected driver is the neristes_driver[this.selectecd_driver.inx] and have_driver true
          * #3 if not have make the selected driver null and make have driver false 
          */
          if(type == 0) {
              if(this.nerists_drivers.light_duty[this.selected_driver.inx] !== void 0) { // #1
                this.selected_driver.driver = this.nerists_drivers.light_duty[this.selected_driver.inx];
                this.selected_driver.have_driver = true;
              }else {
                  this.selected_driver.driver = null;
                  this.selected_driver.have_driver = false;
              }
          }

          if(type == 1) {
            if(this.nerists_drivers.medium_duty[this.selected_driver.inx] !== void 0) { // #1
              this.selected_driver.driver = this.nerists_drivers.medium_duty[this.selected_driver.inx]; // #register driver
              this.selected_driver.have_driver = true; //#register have driver
            }else {
                this.selected_driver.driver = null;
                this.selected_driver.have_driver = false;
            }
        }
        if(type == 2) {
            if(this.nerists_drivers.heavy_duty[this.selected_driver.inx] !== void 0) { // #1
              this.selected_driver.driver = this.nerists_drivers.heavy_duty[this.selected_driver.inx];
              this.selected_driver.have_driver = true;
            }else {
                this.selected_driver.driver = null;
                this.selected_driver.have_driver = false;
            }
        }

        if(type == 3) {
            if(this.nerists_drivers.motorcycle[this.selected_driver.inx] !== void 0) { // #1
              this.selected_driver.driver = this.nerists_drivers.motorcycle[this.selected_driver.inx];
              this.selected_driver.have_driver = true;
            }else {
                this.selected_driver.driver = null;
                this.selected_driver.have_driver = false;
            }
        }

        result = this.selected_driver;
        return result;
    }

    @action // Reset the seletced_driver and other 
    _reSet() {
        this.selected_driver = {
            driver:null,
            inx:0,
            type:null,
            have_driver:false,
            first_time:true
        };
    }

    constructor(Settings) {
        this.settings = Settings;

        this._install();
    }
}
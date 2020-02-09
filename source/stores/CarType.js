import {observable,computed,action} from 'mobx';
import axios from 'axios';

export default class CarType {
    @observable settings = {};
    /** Data */
    @observable car_type = [];
    @observable service = [];
    @observable sub_service = [];


    @action install() {
        axios.get(this.settings.serverUri + 'api/helper/cartype/index').then(response => {
            this.car_type = response.data;
        }).catch(err => {
            console.log(response.data)
        });
    }

    @action _fetch_service(type) {
        this.service = [];
        this.car_type[type].service.forEach(trg => {
            this.service.push(trg);
        });
    }

    @action _fetch_sub_service(service) {
        this.sub_service = [];
        this.service.forEach((trg,index) => {
            if(trg.title == service) {
                this.sub_service = trg.sub_service;
            }
        });
    }

    @action _return_service = async(service) => {
        let s = null;
        await this.service.forEach((trg,index) => {
            if(trg.title == service) {
                s = trg;
            }
        });
        return s;
    }

    constructor(settings) {
        this.settings = settings;

        /** Install */
        this.install();
    }
}
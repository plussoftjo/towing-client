import {observable,computed,action} from 'mobx';
import axios from 'axios';

export default class Pricing {
    @observable price = 0;
    @observable currency = {title:'USD',simple:'$'}

    /** Standalong price */
    @observable prices = {
        open_price:30,
        km_price:0.008,
        time_price:0.01
    };

    @action _install() {
        this.price = 0;
        this.price = this.prices.open_price;
    };

    @action _inc(price) {
        this.price = this.price + price;
    }
    
    @action _fare_caluclate(data) {
        let fare = {kmfare:0,timefare:0};
        let kmprice = data.distance.value * this.prices.km_price;
        let timeprice = data.duration.value * this.prices.time_price;
        fare = {kmfare:kmprice.toFixed(1),timefare:timeprice.toFixed(1)}
        console.log(fare);
        return fare;
    }

    constructor() {
        this._install();
    }
}
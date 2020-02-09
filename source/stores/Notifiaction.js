import {observable,computed,action} from 'mobx';
import axios from 'axios';

export default class Notifiaction {

    @observable settings = null;


    /** Send Request to the driver  */
    @action _send_driver_request(data) {
        // Fix Data and send it ;
        axios.post(this.settings.socketUri + 'send_notification_request_to_driver',{values:data}).then(response => {
            console.log(response);
        }).catch(err => {
            console.log(err.response);
        });
    }

    constructor(Settings){
        this.settings = Settings;
    }
}
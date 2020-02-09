import {observable,computed,action} from 'mobx';

export default class Settings {
    /*--Global Value--*/
    @observable serverUri = 'http://ubrtowing.com/';
    @observable socketUri = 'http://172.20.10.3:3000/';
    /*--Static Value--*/


    @action _install = async() => {
        
    }

   constructor() {
    /*--When-Fire--*/
    this._install(); // install if needed
   }
}
import {observable,computed,action} from 'mobx';

/** This of save the order state  */
export default class Settings {
    /*--Global Value--*/
    
    /*--Static Value--*/


    @action _install = async() => {
        
    }

    @action _save_cache(data) {
        
    }

   constructor() {
    /*--When-Fire--*/
    this._install(); // install if needed
   }
}
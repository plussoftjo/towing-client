import {observable,computed,action} from 'mobx';
import axios from 'axios';
import { AsyncStorage } from 'react-native';
import publicIP from 'react-native-public-ip';
import {helper} from '../service';
export default class Auth {
    /*--Static Value--*/
    @observable method = 'main'; // Auth Methods 

    /** Device & info */
    @observable ip = '';
    @observable country_code = '';
    @observable country_list_value = '';

    /** Sms activate */
    @observable sms_code = '';

    /** User Stores */
    @observable user_input = {phone:'',password:'',method:'none',confirm_password:''};
    @observable user_profile = {
        first_name:'',last_name:'',country:{states:[],value:''},state:'',city:'',address:'',zip:'',
        user_image:{base64:'',url:''},
        driver_licanse:{base64:'',url:''}
        };
    @observable user_car = {model:'',car_make:'',car_model:'',truck_type:'',truck_color:'',towing_type:'',plate_number:''};
    @observable user_card = {};
    @observable have_card = false;
    @observable settings = null;
    @observable login_input = {phone:'',password:''};

    /** Login */
    @observable user_login ={phone:'',password:''};
    /** Auth Users */
    @observable user = {};
    @observable token = '';
    @observable active_car = {};
    /** Actions  */
    

    @action relayout() {
        this.user_input = {phone:'',password:'',confirm_password:''};
        this.user_profile = {
            first_name:'',last_name:'',country:{states:[],value:''},state:'',city:'',address:'',zip:'',
            user_image:{base64:'',url:''},
            driver_licanse:{base64:'',url:''}
        };
        this.user_car = {model:'',car_make:'',car_model:'',truck_type:'',truck_color:'',towing_type:'',plate_number:''};
    }
    //@change auth methods 
    @action change_method (type) {
        this.method = type;
    }

    @action install(navigation) {
        navigation.navigate('Auth');
    }

    @action _register = async(navigation) => {
        let vaild = false;
        let user_profile = {
            address:this.user_profile.address,
            city:this.user_profile.city,
            country:this.user_profile.country.value,
            driver_licanse:this.user_profile.driver_licanse.url,
            name:this.user_profile.first_name + ' ' +this.user_profile.last_name,
            state:this.user_profile.state,
            user_image:this.user_profile.user_image.url?this.user_profile.user_image.url:'images/avatar.png',
            zip:this.user_profile.zip
        };
        await axios.post(this.settings.serverUri + 'api/client/auth/register', {user_input:this.user_input,user_car:this.user_car,user_profile:user_profile,user_card:this.user_card,have_card:this.have_card}).then(async(response) => {
            console.log(response.data.user);
            this.user = await response.data.user;
            this._user_confirm();
            this.token = response.data.token;
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token;
            await AsyncStorage.setItem('token',response.data.token);
            vaild = true;
        }).catch(err => {
            console.log(err.response);
            vaild = false;
        });
        return vaild;
    }

    @action _login = async(navigation,onError) => {
        let vaild = true;
        await axios.post(this.settings.serverUri + 'api/client/auth/login',this.login_input).then(async(response) => {
            console.log(response.data.user);
            this.user = await response.data.user;
            this._user_confirm();
            this.token = response.data.token;
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token;
            await AsyncStorage.setItem('token',response.data.token);
            setTimeout(() => {
                navigation.navigate('Main');
            });
        }).catch(err => {
            console.log(err.response);
            onError();
            vaild = false;
        });
        return vaild;
    }

    @action _auth = async(navigation) => {
        let self = this;
        // var distance = helper.point_distance([32.351212,36.208356],[32.343327,36.204195]);
        // Last function to get the closest driver 
        try {
            let token = await AsyncStorage.getItem('token');
            if(token !== null) {
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
                axios.get(self.settings.serverUri + 'api/client/auth/index').then(response => {
                    self.user = response.data;
                    self._user_confirm();
                    navigation.navigate('Main');
                }).catch(err => {
                    console.log(err)
                    navigation.navigate('Auth');
                });
            }else {
                navigation.navigate('Auth');
            }
        } catch (error) {
            navigation.navigate('Auth');
        }
    }

    @action _user_confirm() {
        this.user.user_car.forEach((trg,index) => {
            if(index == 0) {
                this.user.user_car[index].active = true;
                this.active_car = this.user.user_car[index];
            }else {
                this.user.user_car[index].active = false;
            }
        });
    }

    @action _make_car_active(car_index) {
        this.user.user_car.forEach((trg,index) => {
            if(trg.id == car_index) {
                this.user.user_car[index].active = true;
                this.active_car = this.user.user_car[index];
            }else {
                this.user.user_car[index].active = false;
            }
        });
    }

    @action fetch_info = async() => {
        let ip = await publicIP().then(ip => {
            this.ip = ip;
            return ip;
        }).catch(err => {
            console.log(err);
        });
        axios.get('https://api.ipgeolocationapi.com/geolocate/' + ip).then(response => {
            // this.country_code = '+' + response.data.country_code;
        }).catch(err => {
            console.log(err)
        });
    }

    @action make_sms_vertify() {
        var val = Math.floor(1000 + Math.random() * 9000);
        this.sms_code = val;

        axios.post(this.settings.socketUri + 'send_sms', {code:this.sms_code,number:this.country_list_value.dial_code + this.user_input.phone}).then(response => {
        }).catch(err => {
            console.log(err.response);
        });
    }

    @action _check_orders() {
        let result = null;
        this.user.order.forEach((trg,index) =>{
            if(trg.state != 4){
                result = trg;
            }
        });
        return result;
    }

   constructor(Settings) {
    /*--When-Fire--*/
    this.settings = Settings;
   }
}
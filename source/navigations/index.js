import { fromLeft,zoomIn,zoomOut,fadeIn,fadeOut,flipX,flipY,fromBottom } from 'react-navigation-transitions';
import {createStackNavigator} from 'react-navigation-stack';
import * as containers from '../containers';
import SignUp from '../containers/Auth/Parts/SignUp.js'
import UserInformation from '../containers/Auth/Parts/RegisterPart/UserInformation'
import CarInformation from '../containers/Auth/Parts/RegisterPart/CarInformation';
import RegisterComplete from '../containers/Auth/Parts/RegisterPart/RegisterComplete'
import Login from '../containers/Auth/Parts/Login'
const AuthStack = createStackNavigator({
    AuthMain:containers.Auth,
    SignUp:SignUp,
    UserInformation:UserInformation,
    CarInformation:CarInformation,
    RegisterComplete:RegisterComplete,
    Login:Login
},{headerMode:'none'});

const MainStack = createStackNavigator({
    Home:{
        screen:containers.Main
    },
    Trips:{
        screen:containers.Trips
    },
    AboutUs:{
        screen:containers.AboutUs
    },
    Settings:{
        screen:containers.Settings
    }
},{headerMode:'none',transitionConfig: () => zoomIn()});
/*--Static-Routes--*/
export const Routes = {
    AppLoader:{
        screen:containers.AppLoader
    },
    Auth:{
        screen:AuthStack
    },
    Main:{
        screen:MainStack
    },
};
import React from 'react';

/** Components */
import {View} from 'react-native';
import {Icon} from 'native-base';
import * as Parts from './Parts';



/** Service */
import {inject,observer} from 'mobx-react';

/** injection Stores */
@inject('manger')
@inject('languages')
@inject('locations')
@observer
export default class StepMagner extends React.Component {
    render() {
        let manger = this.props.manger;
        let translate = this.props.languages.translate;
        let map = this.props.map;
        /**
         * Step 0
         * @disaple components-> Get Help Button 
         * @method onClick ->  Button: Step 1 disaple
         */
        if(manger.step == 0) {
            return (
                <View style={{position:'absolute',left:0,top:5,width:'100%'}}>
                    <Icon name="menu" onPress={() => {this.props.drawer.open()}} style={{fontSize:48,color:'black',paddingTop:30,paddingLeft:20}} />
                    <Parts.StepZero manger={manger} translate={translate} />
                </View>
            )
        }else if(manger.step == 0.1) {
            return (
                <Parts.StepZeroPointOne manger={manger} translate={translate} locations={this.props.locations} />
            )
        }else if (manger.step == 1) {
            /**
             * Step 1
             * @disaple components-> Show the pickup location
             * @methods :
             * onclick field search location to go to it 
             * search_locations : from google places search the place
             * onClick: place card -> go to step 2
             */
            return (
                <View style={{position:'absolute',left:0,top:0,width:'100%',height:'100%'}}>
                    <Parts.StepOne manger={manger} translate={translate} locations={this.props.locations} map={map} />
                </View>
            )
        } else if(manger.step == 2) {
             /**
             * Step 2
             * @disaple show-> Card with directions name
             * @methods :
             */
            return (
                <View style={{position:'absolute',left:0,top:0,width:'100%',height:'100%'}}>
                    <Parts.StepTow manger={manger} translate={translate} locations={this.props.locations} />
                </View>
            )
        }else if (manger.step == 3) {
            return (
                <View style={{position:'absolute',left:0,top:0,width:'100%',height:'100%'}}>
                    <Parts.StepThree locations={this.props.locations} manger={manger} translate={translate} map={map} />
                </View>
            )
        } else if(manger.step == 4) {
            return (
                <View style={{position:'absolute',left:0,top:0,width:'100%',height:'100%'}}>
                    <Parts.StepFour manger={manger} locations={this.props.locations} translate={translate} map={map} />
                </View>
            )
        }else if(manger.step == 5) {
            return (
                <View style={{position:'absolute',left:0,top:0,width:'100%',height:'100%'}}>
                    <Parts.StepFive manger={manger} locations={this.props.locations} translate={translate} map={map} />
                </View>
            )
        }else if(manger.step == 6) {
            return (
                <Parts.StepSix locations={this.props.locations} manger={manger} translate={translate} map={map} />
            )
        }else if(manger.step == 6.1) {
            return (
                <Parts.StepSixPointOne manger={manger} translate={translate} map={map} locations={this.props.locations} />
            )
        }else if(manger.step == 7) {
            return (
                <Parts.StepSeven manger={manger} translate={translate} map={map} locations={this.props.locations} />
            )
        }else if(manger.step == 8) {
            return (
                <Parts.StepEight manger={manger} translate={translate} map={map} locations={this.props.locations} />
            )
        }else {
            return null;
        }
    }
}
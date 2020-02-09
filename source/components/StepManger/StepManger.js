import React from 'react';

/** Components */
import {View} from 'react-native';
import {Icon} from 'native-base';
import * as Part from './Part';



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
                    <Part.StepZero manger={manger} translate={translate} />
                </View>
            )
        }else if(manger.step == 1) {
            return (
                <Part.StepOne map={this.props.map} manger={manger} translate={translate} locations={this.props.locations} />
            )
        }else if(manger.step == 2) {
            return (
                <Part.StepTow map={this.props.map} manger={manger} translate={translate} locations={this.props.locations} />
            )
        } else if(manger.step == 3) {
            return (
                <Part.StepThree map={map} manger={manger} translate={translate} locations={this.props.locations} />
            )
        }else if(manger.step == 4) {
            return (
                <Part.StepFour map={this.props.map} manger={manger} translate={translate} locations={this.props.locations} />
            )

        }else if(manger.step == 5) {
            return (
                <Part.StepFive map={this.props.map} manger={manger} translate={translate} locations={this.props.locations} />
            )
        }else if(manger.step == 6) {
            return (
                <Part.StepSix map={this.props.map} manger={manger} translate={translate} locations={this.props.locations} />
            )
        }else if(manger.step == 7) {
            return (
                    <Part.StepSeven map={this.props.map} manger={manger} translate={translate} locations={this.props.locations} />
            )
        }else if(manger.step == 8) {
            return (
                <View style={{position:'absolute',left:0,top:0,width:'100%',height:'100%'}}>
                    <Part.StepEight map={this.props.map} manger={manger} translate={translate} locations={this.props.locations} />
                </View>
            )
        }else if(manger.step == 9) {
            return (
                    <Part.StepNine map={this.props.map} manger={manger} translate={translate} locations={this.props.locations} />
            )
        }else if(manger.step == 10) {
            return (
                    <Part.StepTen map={this.props.map} manger={manger} translate={translate} locations={this.props.locations} />
            )
        }else if(manger.step == 11) {
            return (
                <View style={{position:'absolute',left:0,top:0,width:'100%',height:'100%'}}>
                    <Part.StepEleven map={this.props.map} manger={manger} translate={translate} locations={this.props.locations} />
                </View>
            )
        }else {
            return null;
        }
    }
}
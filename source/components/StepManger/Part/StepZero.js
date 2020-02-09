import React from 'react';

/** Components */
import {View} from 'react-native';
import MiniInfoCard from '../../MiniInfoCard';

export default class StepZero extends React.Component {
    render() {
        let manger = this.props.manger;
        let translate = this.props.translate;
        return (
            <View style={{marginTop:10}}>
                <MiniInfoCard pressed={() => {manger._change_step(1);}} icon="earth" iconType="AntDesign" text={translate("main.card.text")}/>
            </View>
        )
    }
}
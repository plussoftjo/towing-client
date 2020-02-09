/*--Static-Librare--*/
import React from 'react';
import {createAppContainer,createSwitchNavigator} from 'react-navigation';

/*--Routes--*/
import {Routes} from './navigations';
class Router extends React.Component {
    render() {
        return (
            <AppNavigator navigation={this.props.navigation} />
        )
    }
}

const AppNavigator = createSwitchNavigator(Routes);
export default createAppContainer(AppNavigator);
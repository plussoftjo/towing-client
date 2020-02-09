/* Static Librare */
import React from 'react';

/* Component */
import Router from './Router';

/* Mobx */
import mobx from 'mobx';
import {Provider} from 'mobx-react';
import stores from './stores'
export default class Root extends React.Component {
    render() {
        return (
            <Provider {...stores}>
                <Router/>
            </Provider>
        )
    }
}
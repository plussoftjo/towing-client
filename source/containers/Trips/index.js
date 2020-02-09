import React from 'react';
import {Container,Content,Header,Left,Icon, Button,Text} from 'native-base';
import {HeaderComponent,TripCard} from '../../components';
import {inject,observer} from 'mobx-react';

@inject('auth')
@observer
export default class Trips extends React.Component {

    car_name(car_type) {
        if(car_type == 0) {
            return 'Light Duty';
        }
        if(car_type == 1) {
            return 'Medium Duty';
        }
        if(car_type == 2) {
            return 'Heavy Duty';
        }
    }
    render() {
        return (
            <Container>
                <HeaderComponent topTitle="Last Trip" bottomTitle="You can see last trips" leftIcon={{type:'EvilIcons',name:'arrow-left',onPress:()=>{this.props.navigation.goBack()}}}/>
                <Content>
                    {this.props.auth.user.order.map((trg,index) => 
                    <TripCard
                    key={index}
                    date={trg.created_at}
                    net={trg.order_info.amount + '$'}
                    car={this.car_name(trg.order_info.car_type)}
                    service={trg.order_info.service}
                    note={trg.order_info.note}
                    method="paypal"
                    />
                    )}
                </Content>
            </Container>
        )
    }
}
import React from 'react';

/** Components */
import {View,Text,StyleSheet} from 'react-native';
import { Container,Item,Input,Icon,List,ListItem,Button,Content,Left,Body,Right,Switch } from 'native-base';

export default class ListCard extends React.Component {
    render() {
        return (
            <ListItem icon onPress={() => {this.props.press();}}>
                <Left>
                    <Button icon transparent >
                        <Icon active name={this.props.icon} style={{color:'black'}} />
                    </Button>
                </Left>
                <Body>
                    <Text style={{fontWeight:'bold'}}>{this.props.text}</Text>
                </Body>
            </ListItem>
        )
    }
}
import React from 'react';
import {View,Text,TouchableOpacity,Image, Alert} from 'react-native';
import {Container,Content,Header,Left, Body, Right, Button, Icon, Title,Form,H3,Item, Input,Label,Picker} from 'native-base';
import { Colors,Cars,CarColors} from '../../../../commons';
import {inject,observer} from 'mobx-react';
import {helper} from '../../../../service'
import {Alertx,Loader} from '../../../../components';
@inject('auth')
@inject('cartype')
@observer
export default class CarInformation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            model_selected:this.props.auth.user_car.model == ''?'':this.props.auth.user_car.model,
            truck_type:this.props.auth.user_car.truck_type == ''?'':this.props.auth.user_car.truck_type,
            truck_color:this.props.auth.user_car.truck_color == ''?'':this.props.auth.user_car.truck_color,
            towing_type:this.props.auth.user_car.towing_type == ''?'':this.props.auth.user_car.towing_type,
            error:false,
            error_text:'',
            loader:false,
            make_selected:this.props.auth.user_car.car_make !== ''?this.props.auth.user_car.car_make:'',
            car_models_list:[],
            car_model:this.props.auth.user_car.car_model !== ''?this.props.auth.user_car.car_model:'',
        };
    }
    componentDidMount() {
        this.setState({error:false,error_text:''});
    }
    carMakeChange(value) {
        let list = [];
        value.models.forEach((trg,index) => {
            list.push(<Picker.Item label={trg.title}  key={index} value={trg.value}  />);
        });
        this.setState({car_models_list:list});
        this.setState({
            make_selected: value
        });
        this.props.auth.user_car.car_make = value.title;
    }
    carModelChange(value) {
        this.setState({
            car_model: value
        });
        this.props.auth.user_car.car_model = value;
    }
    modalChange(value) {
        this.setState({
            model_selected: value
        });
        this.props.auth.user_car.model = value;
      }

      truckColorChange(value) {
        this.setState({
            truck_color: value
        });
        this.props.auth.user_car.truck_color = value;
      }
    render() {
        const modelItems = [];
        const started_modal = 2020;
        for (let index = 0; index < 50; index++) {
            modelItems.push(<Picker.Item label={started_modal -index}  key={index} value={started_modal -index} />);
        }
        return (
            <Container>
                <Header>
                    <Left>
                        <Button danger transparent onPress={() => {this.props.navigation.goBack()}}>
                        <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title></Title>
                    </Body>
                    <Right/>
                </Header>
                <Content padder>
                    <H3 style={{marginVertical:30,marginHorizontal:10}}>Vehicle Information</H3>
                    <Form>
                        <Item picker style={{height:70,marginLeft:15}}>
                        <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="arrow-down" />}
                            style={{ width: '100%' }}
                            placeholder="Modal"
                            placeholderStyle={{ color: "#bfc6ea" }}
                            placeholderIconColor="#bfc6ea"
                            selectedValue={this.state.model_selected}
                            onValueChange={this.modalChange.bind(this)}
                        >
                            {modelItems}
                        </Picker>
                        </Item>
                        <Item picker style={{height:70,marginLeft:15}}>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" />}
                                style={{ width: '100%' }}
                                placeholder="Vehicle Make"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#bfc6ea"
                                selectedValue={this.state.make_selected}
                                onValueChange={this.carMakeChange.bind(this)}
                            >
                                {Cars.map((trg,index) => 
                                    <Picker.Item label={trg.title} key={index} value={trg} />
                                )}
                            </Picker>
                        </Item>
                        {/* <Item stackedLabel style={{flexGrow:1}}>
                            <Label>Vehicle Make</Label>
                            <Input value={this.props.auth.user_car.car_make} onChangeText={(value) => {this.props.auth.user_car.car_make = value;}} />
                        </Item> */}
                        <Item picker style={{height:70,marginLeft:15}}>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" />}
                                style={{ width: '100%' }}
                                placeholder="Vehicle Model"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#bfc6ea"
                                selectedValue={this.state.car_model}
                                onValueChange={this.carModelChange.bind(this)}
                            >
                                {this.state.car_models_list}
                            </Picker>
                        </Item>
                        {/* <Item stackedLabel style={{flexGrow:1}}>
                            <Label>Vehicle Model</Label>
                            <Input value={this.props.auth.user_car.car_model} onChangeText={(value) => {this.props.auth.user_car.car_model = value;}} />
                        </Item> */}
                        <Item picker style={{height:70,marginLeft:15}}>
                        <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="arrow-down" />}
                            style={{ width: '100%' }}
                            placeholder="Vehicle Color"
                            placeholderStyle={{ color: "#bfc6ea" }}
                            placeholderIconColor="#bfc6ea"
                            selectedValue={this.state.truck_color}
                            onValueChange={this.truckColorChange.bind(this)}
                        >
                            {CarColors.map((trg,index) => 
                                <Picker.Item label={trg} key={index} value={trg} />
                            )}
                        </Picker>
                        </Item>
                    </Form>
                    {this.state.error &&
                        <Alertx>
                            {this.state.error_text}
                        </Alertx>
                    }
                    <View style={{height:30}}></View>
                        <Button dark block onPress={async() => {
                            if(helper.check_values([
                                this.state.model_selected,
                                this.props.auth.user_car.car_make,
                                this.props.auth.user_car.car_model,
                                this.state.truck_color,
                            ])) {
                                this.setState({loader:true});
                                let register = await this.props.auth._register(this.props.navigation);
                                if(register) {
                                    this.setState({loader:false});
                                    this.props.navigation.navigate('RegisterComplete');
                                    this.props.auth.relayout();
                                }else {
                                    this.setState({error:true,loader:false,error_text:'There are problem with register, please try again later.'});
                                }
                                this.setState({error:false,error_text:''});
                            }else {
                                this.setState({error:true,error_text:'please fill all required fields'});
                            }
                        }}><Text style={{color:'white',fontFamily:'Roboto_medium'}}>Register</Text></Button>
                </Content>
                {this.state.loader &&
                    <Loader />
                }
            </Container>
        )
    }
}
import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity,Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import {Icon,Button} from 'native-base';
import * as ImagePicker from 'expo-image-picker';

export default class Cam extends React.Component {
    state = {
        hasPermission: null,
        type: Camera.Constants.Type.back,
        cam:true,
        image:'',
        cam_type:''
      }
    
    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasPermission: status === 'granted' });
        this.getPermissionAsync()
    }
    getPermissionAsync = async () => {
        // Camera roll Permission 
        if (Platform.OS === 'ios') {
          const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }
        // Camera Permission
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasPermission: status === 'granted' });
      }
      pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            base64:true,
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
        });
        this.setState({cam:false,image:result,cam_type:'library'});
      }
    handleCameraType=()=>{
        const { cameraType } = this.state
    
        this.setState({cameraType:
          cameraType === Camera.Constants.Type.back
          ? Camera.Constants.Type.front
          : Camera.Constants.Type.back
        })
      }
      takePicture = async () => {
        if (this.camera) {
          let photo = await this.camera.takePictureAsync({base64:true});
          this.setState({cam:false,image:photo,cam_type:'camera'});
        }
      }
    render(){
    const { hasPermission } = this.state
    if (hasPermission === null) {
        return <View />;
    } else if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    } else {
        if(this.state.cam) {
            return (
                <View style={{ flex: 1 }}>
                    <Camera style={{ flex: 1 }} type={this.state.cameraType} ref={ref => {this.camera = ref;}}>
                    <View style={{position:'absolute',top:0,left:0,marginVertical:30,marginHorizontal:10,flexDirection:'row'}}>
                        <Button transparent large onPress={() => {
                                this.props.close();
                            }}>
                            <Icon  type="AntDesign" name="closecircleo" style={{fontSize:38,color:'white'}}></Icon>
                        </Button>
                    </View>
                    <View style={{flex:1, flexDirection:"row",justifyContent:"space-between",margin:20}}>
                        <TouchableOpacity
                        onPress={() =>{
                            this.pickImage();
                        }}
                            style={{
                            alignSelf: 'flex-end',
                            alignItems: 'center',
                            backgroundColor: 'transparent',                  
                            }}>
                            <Icon
                                name="ios-photos"
                                style={{ color: "#fff", fontSize: 40}}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                        onPress={() => {
                            this.takePicture();
                        }}
                            style={{
                            alignSelf: 'flex-end',
                            alignItems: 'center',
                            backgroundColor: 'transparent',
                            }}>
                            <Icon type="FontAwesome"
                                name="camera"
                                style={{ color: "#fff", fontSize: 40}}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                this.handleCameraType();
                            }}
                            style={{
                            alignSelf: 'flex-end',
                            alignItems: 'center',
                            backgroundColor: 'transparent',
                            }}>
                            <Icon type="MaterialCommunityIcons"
                                name="camera-switch"
                                style={{ color: "#fff", fontSize: 40}}
                            />
                        </TouchableOpacity>
                        </View>
                    </Camera>
                </View>
            );
        }else {
            return (
                <View style={{flex:1,justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                    <Image source={this.state.image} style={{width:'100%',height:'100%'}} />
                    <View style={{position:'absolute',top:0,left:0,marginVertical:30,marginHorizontal:10,flexDirection:'row'}}>
                            <Icon onPress={() => {
                                this.setState({cam:true,image:''});
                            }} type="AntDesign" name="closecircleo" style={{fontSize:38,color:'white'}}></Icon>
                    </View>
                    <View style={{position:'absolute',bottom:0,right:0,margin:30,width:'50%'}}>
                        <View style={{width:'100%'}}>
                            <Button success block iconRight onPress={() => {
                                let image = 'data:image/png;base64,' + this.state.image.base64;
                                this.props.onSelectImage(this.state.image,this.state.cam_type);
                                this.props.close();
                            }}>
                                <Text style={{color:'white',fontWeight:'700'}}>Confirm </Text>
                                <Icon type="Octicons" name="chevron-right" style={{color:'white'}}></Icon>
                            </Button>
                        </View>
                    </View>
                </View>
            )
        }
        
    }
    }
}
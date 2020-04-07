import React from "react";
import {
  Text,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity
} from "react-native";
import styled from "styled-components";
import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";
import { Ionicons, MaterialIcons, Entypo, AntDesign } from "@expo/vector-icons";

const CenterView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #ffbc22;
`;

const { width, height } = Dimensions.get("window");

const IconBar = styled.View``;

const BackBtn = styled.TouchableOpacity`
  position: absolute;
  top: 70px;
  left: 30px;
`;

export default class Shot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasPermisson: null,
      cameraType: Camera.Constants.Type.back
    };
    this.cameraRef = React.createRef();
  }

  componentDidMount = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    console.log(status);
    if (status == "granted") {
      this.setState({ hasPermission: true });
    } else {
      this.setState({ hasPermission: false });
    }
  };

  render() {
    const { hasPermission, cameraType } = this.state;
    if (hasPermission === true) {
      return (
        <CenterView>
          <BackBtn onPress={() => this.props.navigation.goBack()}>
            <Ionicons
              size={30}
              name={"md-arrow-round-back"}
              color={"white"}
            ></Ionicons>
          </BackBtn>
          <Camera
            ref={this.cameraRef}
            style={{
              width: width - 40,
              height: height / 1.4,
              borderRadius: 10,
              marginBottom: 20,
              marginTop: 50,
              overflow: "hidden"
            }}
            type={cameraType}
          >
            <IconBar
              style={{
                alignItems: "flex-end",
                marginTop: 10,
                marginRight: 10
              }}
            >
              <TouchableOpacity onPress={this.switchCameraType}>
                <AntDesign name={"sync"} color="white" size={30} />
              </TouchableOpacity>
            </IconBar>
          </Camera>

          <TouchableOpacity onPress={this.takePhoto}>
            <MaterialIcons name={"camera"} color="white" size={70} />
          </TouchableOpacity>
        </CenterView>
      );
    } else if (hasPermission === false) {
      return (
        <CenterView>
          <Text>no permmison</Text>
        </CenterView>
      );
    } else {
      return (
        <CenterView>
          <ActivityIndicator />
        </CenterView>
      );
    }
  }
  switchCameraType = () => {
    const { cameraType } = this.state;
    if (cameraType === Camera.Constants.Type.front) {
      this.setState({
        cameraType: Camera.Constants.Type.back
      });
    } else {
      this.setState({
        cameraType: Camera.Constants.Type.front
      });
    }
  };

  takePhoto = async () => {
    // await는 항상 try/catch문을 사용해 에러를 잡아줘야함
    try {
      // console.log(this.cameraRef.current);
      if (this.cameraRef.current) {
        //   let Photo = await this.cameraRef.current.takePictureAsync({
        // photo에서 uri만 저장한다
        let { uri } = await this.cameraRef.current.takePictureAsync({
          // 저장 옵션들
          quality: 1,
          exif: true
        });
        console.log(uri); // uri는 임시 캐쉬 , 어디론가 이동시켜 저장해야한다
        if (uri) {
          this.savePhoto(uri);
        }
      }
    } catch (error) {
      alert(error);
      this.setState({
        smileDetected: false
      });
    }
  };
  savePhoto = async uri => {};
}

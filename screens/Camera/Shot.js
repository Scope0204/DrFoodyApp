import React from "react";
import {
  Text,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  View,
  Image,
  Alert,
} from "react-native";
import styled from "styled-components";
import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";
import { Ionicons, MaterialIcons, Entypo, AntDesign } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";
import * as ImageManipulator from "expo-image-manipulator";

// 저장할 앨범
const ALBUM_NAME = "Dr.Foody";

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

const SwitchBtn = styled.TouchableOpacity`
  position: absolute;
  top: 70px;
  right: 30px;
`;

const PhotoArea = styled.View`
  position: absolute;
  align-items: center;
  width: 280px;
  height: 400px;
  border: 5px solid blue;
  border-radius: 10px;
`;

export default class Shot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasPermisson: null,
      cameraType: Camera.Constants.Type.back,
      shotPhoto: false,
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
    Alert.alert("", "해당영역에 맞게 촬영해 주세요");
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
          <SwitchBtn onPress={this.switchCameraType}>
            <AntDesign name={"sync"} color="white" size={30} />
          </SwitchBtn>

          <Camera
            ref={this.cameraRef}
            style={{
              width: width - 40,
              height: height / 1.4,
              borderRadius: 10,
              marginBottom: 20,
              marginTop: 50,
              overflow: "hidden",
              alignItems: "center",
              justifyContent: "center",
            }}
            type={cameraType}
          >
            <PhotoArea />

            <IconBar
              style={{
                alignItems: "flex-end",
                marginTop: 10,
                marginRight: 10,
              }}
            ></IconBar>
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
        cameraType: Camera.Constants.Type.back,
      });
    } else {
      this.setState({
        cameraType: Camera.Constants.Type.front,
      });
    }
  };

  takePhoto = async () => {
    const { shotPhoto } = this.state;
    this.setState({ shotPhoto: true });
    // await는 항상 try/catch문을 사용해 에러를 잡아줘야함
    if (shotPhoto) {
      try {
        // console.log(this.cameraRef.current);
        if (this.cameraRef.current) {
          let { uri } = await this.cameraRef.current.takePictureAsync({
            // 저장 옵션들
            quality: 1,
          });

          let size = await this.cameraRef.current.getAvailablePictureSizesAsync();
          console.log(size);

          // console.log(uri); // uri는 임시 캐쉬 , 어디론가 이동시켜 저장해야한다
          if (uri) {
            console.log(uri);
            this.setState({
              shotPhoto: false,
            });

            // 사진 저장
            // this.savePhoto(uri);

            // 사진 수정
            this.fixPhoto(uri);

            // 사진 보내기
            // this.postPhoto(uri);
          }
        }
      } catch (error) {
        alert(error);
      }
    }
  };

  //사진 수정
  fixPhoto = async (uri) => {
    try {
      if (uri) {
        const fixPhoto = await ImageManipulator.manipulateAsync(
          uri,
          [{ resize: { width: 300 } }],
          { format: "jpeg" }
        );
        console.log(fixPhoto);
        this.postPhoto(fixPhoto);
        this.savePhoto(fixPhoto.uri);
      }
    } catch (error) {
      alert(error);
    }
  };

  //   사진 저장(갤러리)
  savePhoto = async (fixPhoto) => {
    try {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status === "granted") {
        const asset = await MediaLibrary.createAssetAsync(fixPhoto);
        let album = await MediaLibrary.getAlbumAsync(ALBUM_NAME);
        if (album === null) {
          album = await MediaLibrary.createAlbumAsync(ALBUM_NAME, asset);
        } else {
          await MediaLibrary.addAssetsToAlbumAsync([asset], album.id);
        }
        setTimeout(
          () =>
            this.setState({
              shotPhoto: false,
            }),
          2000
        );
        console.log(asset);
        // this.postPhoto(asset);
      } else {
        this.setState({ hasPermission: false });
      }
    } catch (error) {
      console.log(error);
    }
  };

  postPhoto = (fixPhoto) => {
    // console.log(asset.uri);
    this.props.navigation.navigate("PhotoPost", {
      photoUri: fixPhoto.uri,
      width: fixPhoto.width,
      height: fixPhoto.height,
    });
  };
}

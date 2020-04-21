import React from "react";
import {
  Text,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import styled from "styled-components";
import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";
import { Ionicons, MaterialIcons, Entypo, AntDesign } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";
import * as ImageManipulator from "expo-image-manipulator";

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

export default class Shot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasPermisson: null,
      cameraType: Camera.Constants.Type.back,
      shotPhoto: false,

      //imagemanipulator
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
              overflow: "hidden",
            }}
            type={cameraType}
            // pictureSize={"640x480"}
          >
            <IconBar
              style={{
                alignItems: "flex-end",
                marginTop: 10,
                marginRight: 10,
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

          // let size = await this.cameraRef.current.getAvailablePictureSizesAsync();
          // console.log(size);

          // console.log(uri); // uri는 임시 캐쉬 , 어디론가 이동시켜 저장해야한다
          if (uri) {
            console.log(uri);
            this.setState({
              shotPhoto: false,
            });

            // 사진 저장
            // this.savePhoto(uri);

            // 사진 수정
            this.pixPhoto(uri);

            //사진 보내기
            // this.postPhoto(uri);
          }
        }
      } catch (error) {
        alert(error);
      }
    }
  };

  //사진 수정
  pixPhoto = async (uri) => {
    try {
      if (uri) {
        const pixPhoto = await ImageManipulator.manipulateAsync(
          uri,
          [{ resize: { width: 640, height: 480 } }],
          { format: "jpeg" }
        );
        console.log(pixPhoto);
        this.postPhoto(uri);
      }
    } catch (error) {
      alert(error);
    }
  };

  //   // 사진 저장(갤러리)
  //   savePhoto = async (uri) => {
  //     try {
  //       const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  //       if (status === "granted") {
  //         const asset = await MediaLibrary.createAssetAsync(uri);
  //         let album = await MediaLibrary.getAlbumAsync(ALBUM_NAME);
  //         if (album === null) {
  //           album = await MediaLibrary.createAlbumAsync(ALBUM_NAME, asset);
  //         } else {
  //           await MediaLibrary.addAssetsToAlbumAsync([asset], album.id);
  //         }
  //         setTimeout(
  //           () =>
  //             this.setState({
  //               shotPhoto: false,
  //             }),
  //           2000
  //         );
  //         console.log(asset);
  //         this.postPhoto(asset);
  //       } else {
  //         this.setState({ hasPermission: false });
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  postPhoto = (uri) => {
    // console.log(asset.uri);
    this.props.navigation.navigate("PhotoPost", { photoUri: uri });
  };
}

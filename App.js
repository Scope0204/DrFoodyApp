import React from "react";
import { AppLoading } from "expo";
import * as Font from "expo-font"; // font 는 더이상 expo 라이브러리가아님
import { Ionicons } from "@expo/vector-icons"; // 다양한 아이콘 즐비
import {
  View,
  Text,
  TouchableOpacity,
  TouchableOpacityComponent,
} from "react-native";
import MainNavigation from "./navigation/MainNavigation";
import LoginScreen from "./screens/Start/Login";
import { StatusBar } from "react-native";
import Login from "./screens/Start/Login";

export default class App extends React.Component {
  state = {
    loaded: true,
    login: true,
  };

  //로딩 에러시 발생
  handleError = (error) => console.log(error);

  //로딩이 끝난 뒤 발생
  handleLoaded = () => this.setState({ loaded: true });

  // 어느것이 로드하는지 말해주는 함수(async 함수임) , 폰트와 아이콘을 preload시켜줌
  loadAssets = async () => {
    await Font.loadAsync({
      ...Ionicons.font, // Ionicons는 폰트랑 같이 옴. 폰트 로딩
    });
    // 로딩 이미지 preload방법
    // await Asset.loadAsync([
    //     require("이미지경로")
    // ]);
  };

  onlogin = () => {
    this.setState({ login: true });
  };

  render() {
    const { loaded, login } = this.state;
    if (loaded) {
      return (
        <>
          <StatusBar barStyle="dark-content" />
          <MainNavigation />
        </>
      );
    } else {
      return (
        <AppLoading
          startAsync={this.loadAssets}
          onFinish={this.handleLoaded}
          onError={this.handleError}
        />
      );
    }
  }
}

import React from "react";
import {
  Text,
  View,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons, MaterialIcons, Entypo, AntDesign } from "@expo/vector-icons";
import styled from "styled-components";
import Layout from "../../constants/Layout";
import { StatusBar } from "react-native";
import PageOne from "../../screens/Start/PageOne";
import PageTwo from "../../screens/Start/PageTwo";
import PageThree from "../../screens/Start/PageThree";
import PageFour from "../../screens/Start/PageFour";

const { width, height } = Dimensions.get("window");

const TITLE_HEIGHT = Layout.height * 0.15;
const Container = styled.View`
  height: ${height};
`;
const Header = styled.View`
  height: ${TITLE_HEIGHT};
  align-items: center;
  justify-content: center;
`;

const BackBtn = styled.TouchableOpacity`
  position: absolute;
  top: 60px;
  left: 20px;
`;

export default class Signip extends React.Component {
  state = {
    page: 1,
    // 회원가입(1)
    user_id: "",
    pw: "",
    nickname: "",
    selectedImage: null,
    //회원가입(2)
    sex: "",
    email: "",
    age: 2020,
    language: "한국어",
    country: "KOREA",
  };

  // 버튼을 누를시 해당 state 값을 저장한다.
  information = (e) => {
    this.setState(e);
    console.log(e);
  };

  render() {
    const { page } = this.state;

    return (
      <Container style={{ marginTop: 5 }}>
        <StatusBar barStyle="dark-content" />
        <Header>
          <BackBtn onPress={() => this.props.navigation.goBack()}>
            <MaterialIcons
              size={27}
              name={"arrow-back"}
              color={"black"}
            ></MaterialIcons>
          </BackBtn>
          <Text style={{ fontSize: 30, fontWeight: "bold", marginTop: 30 }}>
            SIGN UP
          </Text>
          <Text>Get Started for free</Text>
        </Header>

        {page == 1 ? <PageOne information={this.information} /> : null}
        {page == 2 ? <PageTwo information={this.information} /> : null}
        {page == 3 ? <PageThree information={this.information} /> : null}
        {page == 4 ? <PageFour information={this.information} /> : null}
      </Container>
    );
  }
}

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
import SignupSlider from "../../components/SignupSlider";
import Layout from "../../constants/Layout";
import { StatusBar } from "react-native";

const TITLE_HEIGHT = Layout.height * 0.15;
const Container = styled.ScrollView``;
const Header = styled.View`
  height: ${TITLE_HEIGHT};
  align-items: center;
  justify-content: center;
`;

const BackBtn = styled.TouchableOpacity`
  position: absolute;
  top: 55px;
  left: 20px;
`;

export default class Signip extends React.Component {
  render() {
    return (
      <Container>
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
        <SignupSlider />
      </Container>
    );
  }
}

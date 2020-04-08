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
import PageOne from "../../screens/Start/PageOne";
import PageTwo from "../../screens/Start/PageTwo";
import PageThree from "../../screens/Start/PageThree";
import PageFour from "../../screens/Start/PageFour";

const TITLE_HEIGHT = Layout.height * 0.15;
const Container = styled.ScrollView``;
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

const PageControl = styled.View``;

const PageUp = styled.TouchableOpacity``;

const PageDown = styled.TouchableOpacity``;

export default class Signip extends React.Component {
  state = {
    page: 1,
  };

  information = () => {
    console.log("ㅎㅇ");
  };

  pageUp = () => {
    const { page } = this.state;
    if (page == 1) {
      this.setState({ page: 2 });
    } else if (page == 2) {
      this.setState({ page: 3 });
    } else if (page == 3) {
      this.setState({ page: 4 });
    }
    console.log(page);
  };

  pageDown = () => {
    const { page } = this.state;
    if (page == 4) {
      this.setState({ page: 3 });
    } else if (page == 3) {
      this.setState({ page: 2 });
    } else if (page == 2) {
      this.setState({ page: 1 });
    }
    console.log(page);
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
        {page == 1 ? <PageOne /> : null}
        {page == 2 ? <PageTwo /> : null}
        {page == 3 ? <PageThree /> : null}
        {page == 4 ? <PageFour /> : null}

        <PageControl>
          {page == 4 ? null : (
            <PageUp onPress={this.pageUp}>
              <MaterialIcons size={32} name={"forward"} />
              <Text>up</Text>
            </PageUp>
          )}
          {page == 1 ? null : (
            <PageDown onPress={this.pageDown}>
              <Text>down</Text>
            </PageDown>
          )}
        </PageControl>
      </Container>
    );
  }
}

import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import styled from "styled-components";
import AdSlider from "../../components/AdSlider";

const CameraBtn = styled.TouchableOpacity``;

const Container = styled.ScrollView``;

export default class Main extends React.Component {
  render() {
    const { navigation } = this.props;
    const User = navigation.getParam("User", "NO-ID");

    return (
      <Container>
        <Text>{User}님 안녕하세요</Text>
        <AdSlider />
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Detail")}
        >
          <Text>GO to Detail</Text>
        </TouchableOpacity>
        <CameraBtn onPress={() => this.props.navigation.navigate("Camera")}>
          <Text>GO to Photo</Text>
        </CameraBtn>
      </Container>
    );
  }
}

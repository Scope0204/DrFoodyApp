import React from "react";

import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Image,
} from "react-native";
import styled from "styled-components";

const Header = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-end;
`;
const Body = styled.View`
  flex: 3;
  align-items: center;
  justify-content: center;
`;
const BtnCon = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-start;
`;

export default class LinkFail extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header>
          <Text style={{ fontSize: 26, fontWeight: "bold" }}>인식 실패!</Text>
        </Header>
        <Body>
          <Image
            source={require("../../images/fail.png")}
            style={{ width: 200, height: 200, marginBottom: 80 }}
          />
          <Text style={{ fontSize: 18, marginBottom: 5 }}>
            일치하는 제품이 없습니다
          </Text>
          <Text style={{ fontSize: 18 }}>
            가이드라인에 맞게 다시한번 제품을 촬영해 주세요
          </Text>
        </Body>
        <BtnCon>
          <TouchableOpacity
            style={{
              width: 300,
              height: 50,
              backgroundColor: "#ff5122",
              marginTop: 10,
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
            //   onPress={() => this.postPhoto(photoUri)}
            onPress={() => this.props.navigation.navigate("Camera")}
          >
            <Text style={{ fontSize: 20, color: "white" }}>되돌아가기</Text>
          </TouchableOpacity>
        </BtnCon>
      </View>
    );
  }
}

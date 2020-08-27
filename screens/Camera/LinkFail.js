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
          <Text style={{ fontSize: 26, fontWeight: "bold", color: "#ff5122" }}>
            認識失敗！
          </Text>
        </Header>
        <Body>
          <Image
            source={require("../../images/fail.png")}
            style={{ width: 200, height: 200, marginBottom: 80 }}
          />
          <Text style={{ fontSize: 18, marginBottom: 5 }}>
            現在、一致する商品はありません。
          </Text>
          <Text style={{ fontSize: 18 }}>
            もう一度商、商品を撮影してください。
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
            <Text style={{ fontSize: 20, color: "white", fontWeight: "bold" }}>
              商品照会
            </Text>
          </TouchableOpacity>
        </BtnCon>
      </View>
    );
  }
}

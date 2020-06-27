// import hot from "../../images/taste/chili.png";
// import sweet from "../../images/taste/honey.png";
// import sour from "../../images/taste/lemon.png";
// import bitter from "../../images/taste/tea.png";
import React from "react";
import {
  Text,
  View,
  AsyncStorage,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";
import styled from "styled-components";
const { width, height } = Dimensions.get("screen");

const Bar = styled.View`
  width: 193px;
  height: 50px;
  border-radius: 10px;
  border: 5px solid #4f4e4e;
  align-items: center;
  justify-content: center;
`;
export default class TasteImg extends React.Component {
  render() {
    let tasteLv = []; // 제품 맛 레벨
    for (var a = 0; a < 5; a++) {
      tasteLv.push(
        <View
          key={a}
          style={{ alignItems: "center", justifyContent: "center" }}
        >
          {a < this.props.level ? (
            <View
              style={{
                width: 36,
                height: 40,
                backgroundColor: "orange",
                borderRadius: 3,
                marginLeft: 1,
              }}
            />
          ) : (
            <View
              style={{
                width: 36,
                height: 40,
                backgroundColor: "#C6C6C6",
                borderRadius: 3,
                marginLeft: 1,
              }}
            />
          )}
        </View>
      );
    }

    let topTaste = [];
    topTaste.push(
      <View>
        <Image
          source={require("../images/taste/honey.png")}
          style={{
            width: 40,
            height: 40,
          }}
        />
      </View>
    );

    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginRight: 10,
          }}
        >
          {topTaste}
        </View>

        <Bar>
          <View style={{ flexDirection: "row" }}>{tasteLv}</View>
        </Bar>
        <View
          style={{
            backgroundColor: "#4F4E4E",
            width: 5,
            height: 30,
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
          }}
        />
      </View>
    );
  }
}

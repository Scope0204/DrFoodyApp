// import hot from "../../images/taste/chili.png";
// import sweet from "../../images/taste/honey.png";
// import sour from "../../images/taste/lemon.png";
// import bitter from "../../images/taste/tea.png";
import React from "react";
import { Text, View, Image } from "react-native";
import styled from "styled-components";

const Bar = styled.View`
  width: 25px;
  height: 25px;
  border-radius: 3px;
  border: 1px solid #ecf0f1;
  box-shadow: 2px 2px 2px #f1f1f1;
`;

export default class TasteImg extends React.Component {
  render() {
    let noSelect = []; // 제품 맛 레벨
    for (var b = 0; b < 5; b++) {
      noSelect.push(
        //게이지 바 . 레벨 반올림해서 나타냄
        <View
          key={b}
          style={{ alignItems: "center", justifyContent: "center" }}
        >
          <Bar style={{ backgroundColor: "#C6C6C6" }} />
        </View>
      );
    }

    let tasteLv = []; // 제품 맛 레벨
    for (var a = 0; a < 5; a++) {
      tasteLv.push(
        //게이지 바 . 레벨 반올림해서 나타냄
        <View
          key={a}
          style={{ alignItems: "center", justifyContent: "center" }}
        >
          {a < this.props.level ? (
            <Bar
              style={
                this.props.taste_name == "매운맛"
                  ? { backgroundColor: "red" }
                  : this.props.taste_name == "단맛"
                  ? { backgroundColor: "orange" }
                  : this.props.taste_name == "신맛"
                  ? { backgroundColor: "yellow" }
                  : this.props.taste_name == "쓴맛"
                  ? { backgroundColor: "green" }
                  : this.props.taste_name == "짠맛"
                  ? { backgroundColor: "blue" }
                  : null
              }
            />
          ) : (
            <Bar style={{ backgroundColor: "#C6C6C6" }} />
          )}
        </View>
      );
    }

    let topTaste = [];
    topTaste.push(
      //제품 맛에 따라 이미지 변화줌
      <View style={{ flexDirection: "column" }}>
        {this.props.taste_name == "매운맛" ? (
          <Image
            source={require("../images/taste/chili.png")}
            style={{
              width: 40,
              height: 40,
              marginRight: 20,
            }}
          />
        ) : null}
        {this.props.taste_name == "단맛" ? (
          <Image
            source={require("../images/taste/honey.png")}
            style={{
              width: 40,
              height: 40,
              marginRight: 20,
            }}
          />
        ) : null}
        {this.props.taste_name == "신맛" ? (
          <Image
            source={require("../images/taste/lemon.png")}
            style={{
              width: 40,
              height: 40,
              marginRight: 20,
            }}
          />
        ) : null}
        {this.props.taste_name == "쓴맛" ? (
          <Image
            source={require("../images/taste/tea.png")}
            style={{
              width: 40,
              height: 40,
              marginRight: 20,
            }}
          />
        ) : null}
        {this.props.taste_name == "짠맛" ? (
          <Image
            source={require("../images/taste/salt.png")}
            style={{
              width: 40,
              height: 40,
              marginRight: 20,
            }}
          />
        ) : null}
      </View>
    );

    return (
      <View
        style={{
          paddingBottom: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          width: 200,
        }}
      >
        <View style={{ flexDirection: "column-reverse" }}>
          <Image
            source={require("../images/taste/chili.png")}
            style={{
              width: 35,
              height: 35,
              marginTop: 5,
            }}
          />
          {this.props.taste_name == "매운맛" ? tasteLv : noSelect}
        </View>

        <View style={{ flexDirection: "column-reverse" }}>
          <Image
            source={require("../images/taste/honey.png")}
            style={{
              width: 35,
              height: 35,
              marginTop: 5,
            }}
          />
          {this.props.taste_name == "단맛" ? tasteLv : noSelect}
        </View>

        <View style={{ flexDirection: "column-reverse" }}>
          <Image
            source={require("../images/taste/lemon.png")}
            style={{
              width: 35,
              height: 35,
              marginTop: 5,
            }}
          />
          {this.props.taste_name == "신맛" ? tasteLv : noSelect}
        </View>

        <View style={{ flexDirection: "column-reverse" }}>
          <Image
            source={require("../images/taste/tea.png")}
            style={{
              width: 35,
              height: 35,
              marginTop: 5,
            }}
          />
          {this.props.taste_name == "쓴맛" ? tasteLv : noSelect}
        </View>

        <View style={{ flexDirection: "column-reverse" }}>
          <Image
            source={require("../images/taste/salt.png")}
            style={{
              width: 35,
              height: 35,
              marginTop: 5,
            }}
          />
          {this.props.taste_name == "짠맛" ? tasteLv : noSelect}
        </View>
      </View>
    );
  }
}

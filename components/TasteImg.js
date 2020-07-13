import React from "react";
import { Text, View, Image } from "react-native";
import styled from "styled-components";

const Bar = styled.View`
  width: 36px;
  height: 40px;
  border-radius: 3px;
  margin-left: 1px;
  border: 1px solid #ecf0f1;
  box-shadow: 2px 2px 2px #f1f1f1;
`;

const TasteTxt = styled.Text`
  font-weight: 700;
  font-size: 26px;
  padding-left: 10px;
  padding-bottom: 2px;
`;
export default class TasteImg extends React.Component {
  render() {
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
      <View style={{ flexDirection: "row" }} key={0}>
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
      <View style={{ paddingBottom: 30 }}>
        <View
          style={{
            paddingBottom: 5,
          }}
        >
          {/* <TasteTxt
            style={
              this.props.taste_name == "매운맛"
                ? { color: "red" }
                : this.props.taste_name == "단맛"
                ? { color: "orange" }
                : this.props.taste_name == "신맛"
                ? { color: "yellow" }
                : this.props.taste_name == "쓴맛"
                ? { color: "green" }
                : this.props.taste_name == "짠맛"
                ? { color: "blue" }
                : null
            }
          >
            {this.props.taste_name}
          </TasteTxt> */}
        </View>
        <View style={{ flexDirection: "row" }}>
          {topTaste}
          {tasteLv}
        </View>
      </View>
    );
  }
}

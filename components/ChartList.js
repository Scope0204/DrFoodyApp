import React from "react";

import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Image,
} from "react-native";

import { FontAwesome, AntDesign } from "@expo/vector-icons";
import styled from "styled-components";

const { width, height } = Dimensions.get("window");

const ChartBox = styled.View`
  width: ${width - 20}px;
  background-color: white;
  height: 100px;
  border-radius: 10px;
  border: 1px solid #ecf0f1;
  box-shadow: 2px 2px 2px #f1f1f1;
  margin-bottom: 7px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export default class ChartList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: this.props.list,
    };
  }

  render() {
    const { list } = this.state;
    return (
      <View>
        <View style={{ marginBottom: 10, marginLeft: 5 }}>
          <Text style={{ fontWeight: "bold" }}>리스트</Text>
          <Text style={{ fontSize: 12 }}>
            카테고리에 따른 상위 10개의 제품들을 나타냅니다
          </Text>
        </View>

        {list.map((list, key) => {
          if (key < 10) {
            // 상위 10개만 추출
            return (
              <ChartBox key={key}>
                <View style={{ flex: 0.2, alignItems: "center" }}>
                  <Text
                    style={{
                      fontSize: 36,
                      fontWeight: "bold",
                      color: "orange",
                    }}
                  >
                    {key + 1}
                  </Text>
                </View>
                <View style={{ flex: 0.2, alignItems: "center" }}>
                  {list.food_photo ? (
                    <Image
                      source={{ uri: list.food_photo }}
                      style={{ width: 60, height: 60 }}
                    />
                  ) : (
                    <Image
                      source={require("../images/Logo.jpg")}
                      style={{ width: 60, height: 60 }}
                    ></Image>
                  )}
                </View>
                <View style={{ flex: 0.6 }}>
                  <Text style={{ marginLeft: 30, fontSize: 16 }}>
                    {list.food_name}
                  </Text>
                </View>
              </ChartBox>
            );
          }
        })}
      </View>
    );
  }
}

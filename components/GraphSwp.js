import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
} from "react-native";
import styled from "styled-components";
import Swiper from "react-native-swiper";

const { width, height } = Dimensions.get("window");

const ChartBox = styled.View`
  width: ${width - 20}px;
  height: 30px;
  background-color: white;
  height: 100px;
  border-radius: 10px;
  border: 1px solid #ecf0f1;
  box-shadow: 2px 2px 2px #f1f1f1;
  margin-bottom: 7px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const styles = StyleSheet.create({
  wrapper: { height: 100, marginLeft: 10 },
  slide1: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9DD6EB",
    height: 100,
  },
  slide2: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#97CAE5",
    height: 100,
  },
  slide3: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#92BBD9",
    height: 100,
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
});

export default class GraphSWp extends Component {
  state = {
    list: this.props.list,
    color: this.props.color,
  };

  graphList = (e) => {
    const { list, color } = this.state;
    return (
      <ChartBox>
        <View style={{ flex: 0.2, alignItems: "center" }}>
          <Text
            style={{
              fontSize: 36,
              fontWeight: "bold",
              color: color[e],
            }}
          >
            {e + 1}
          </Text>
        </View>
        <View style={{ flex: 0.2, alignItems: "center" }}>
          {list[e].food_photo ? (
            <Image
              source={{ uri: list[e].food_photo }}
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
            {list[e].food_name}
          </Text>
        </View>
      </ChartBox>
    );
  };
  render() {
    return (
      <Swiper style={styles.wrapper} autoplay={true} autoplayTimeout={2}>
        <View>{this.graphList(0)}</View>
        <View>{this.graphList(1)}</View>
        <View>{this.graphList(2)}</View>
        <View>{this.graphList(3)}</View>
        <View>{this.graphList(4)}</View>
      </Swiper>
    );
  }
}

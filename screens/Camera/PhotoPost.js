import React from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import styled from "styled-components";
import axios from "axios";

export default class Main extends React.Component {
  render() {
    const { navigation } = this.props;
    const photoUri = navigation.getParam("photoUri", "no");
    const width = navigation.getParam("width", 0);
    const height = navigation.getParam("height", 0);

    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: 30,
        }}
      >
        <Image
          source={{ uri: photoUri }}
          style={{
            width: width,
            height: height,
            borderRadius: 10,
            marginTop: 50,
          }}
        />

        <TouchableOpacity
          style={{
            width: 300,
            height: 50,
            backgroundColor: "#fdcc1f",
            marginTop: 50,
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={{}}
        >
          <Text style={{ fontSize: 20, color: "white" }}>전송하기</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

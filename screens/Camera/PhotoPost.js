import React from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import styled from "styled-components";
// import * as ImageManipulator from "expo-image-manipulator";
import * as FileSystem from "expo-file-system";
// import * as ImagePicker from "expo-image-picker";

export default class Main extends React.Component {
  render() {
    const { navigation } = this.props;
    const photoUri = navigation.getParam("photoUri", "no");
    return (
      <View>
        <Image source={{ uri: photoUri }} style={{ width: 300, height: 300 }} />
        <Text>{photoUri}</Text>
      </View>
    );
  }
}

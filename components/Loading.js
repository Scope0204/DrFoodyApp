import React from "react";
import { View, ActivityIndicator } from "react-native";

export default class Loading extends React.Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size="large" color="#ff5122" />
      </View>
    );
  }
}

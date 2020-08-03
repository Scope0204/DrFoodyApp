import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default class Logo extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{ width: 180, height: 180, resizeMode: "contain" }}
          source={require("../images/Logo.png")}
          //   source={require("../images/logo.png")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
});

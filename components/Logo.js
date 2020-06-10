import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default class Logo extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{ width: 190, height: 180 }}
          source={require("../images/Logo.jpg")}
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

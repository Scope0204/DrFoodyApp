import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default class Logo extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{ width: 40, height: 70 }}
          source={require("../images/Logo.jpg")}
        />
        <Text style={styles.logoText}>welcome to my app</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  logoText: {
    marginVertical: 15,
    fontSize: 20,
    color: "white"
  }
});

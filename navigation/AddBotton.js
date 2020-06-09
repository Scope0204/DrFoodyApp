import React, { Component } from "react";
import {
  Animated,
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
} from "react-native";
import Icon from "@expo/vector-icons/FontAwesome";

export default class AddBottom extends React.Component {
  render() {
    return (
      <View style={{ position: "absolute", alignItems: "center" }}>
        <View style={styles.button}>
          <TouchableHighlight underlayColor="#7f58ff">
            <View>
              <Icon name="camera" size={24} color="#fff" />
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#ff5122",
    alignItems: "center",
    justifyContent: "center",
    width: 72,
    height: 72,
    borderRadius: 36,
    position: "absolute",
    top: -60,
    shadowColor: "#7f58ff",
    shadowRadius: 5,
    shadowOffset: { height: 10 },
    shadowOpacity: 0.1,
    borderWidth: 3,
    borderColor: "#fff",
  },
});

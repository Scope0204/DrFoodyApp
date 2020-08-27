import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

export default class SearchBar extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <FontAwesome
          size={16}
          name={"search"}
          style={{ marginLeft: 20 }}
        ></FontAwesome>
        <Text
          style={{
            textAlign: "center",
            fontWeight: "bold",
            marginLeft: 20,
            color: "#3A3A3A",
          }}
        >
          製品名で検索
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: width - 40,
    height: 40,
    borderStyle: "solid",
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "orange",
    flexDirection: "row",
    alignItems: "center",
  },
});

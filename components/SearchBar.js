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
          제품 이름으로 검색
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: width - 10,
    height: 45,
    borderStyle: "solid",
    borderRadius: 10,
    borderWidth: 1.5,
    flexDirection: "row",
    alignItems: "center",
  },
});

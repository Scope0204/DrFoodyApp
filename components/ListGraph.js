import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const { width, height } = Dimensions.get("window");

export default class ListGraph extends React.Component {
  state = {
    click: 1,
  };
  render() {
    const { click } = this.state;
    return (
      <View
        style={{
          width: width - 25,
          height: 38,
          backgroundColor: "#fafafa",
          borderRadius: 5,
          borderColor: "#D5D8DC",
          borderWidth: 1,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={() => this.setState({ click: 1 })}>
          <View style={click == 1 ? styles.select : styles.noSelect}>
            <Text style={click == 1 ? styles.selectTxt : styles.noSelectTxt}>
              리스트
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.setState({ click: 2 })}>
          <View style={click == 2 ? styles.select : styles.noSelect}>
            <Text style={click == 2 ? styles.selectTxt : styles.noSelectTxt}>
              그래프
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  //선택 바 스타일
  select: {
    backgroundColor: "#ff5122",
    width: (width - 20) / 2 - 5,
    height: 30,
    borderWidth: 0.1,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  noSelect: {
    backgroundColor: "white",
    width: (width - 20) / 2 - 5,
    height: 30,
    borderWidth: 0.1,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  selectTxt: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
  noSelectTxt: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

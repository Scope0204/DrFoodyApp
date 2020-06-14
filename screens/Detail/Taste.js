import React from "react";
import { View, Text, Image } from "react-native";
import hot from "../../images/taste/chili.png";
import sweet from "../../images/taste/honey.png";
import sour from "../../images/taste/lemon.png";
import bitter from "../../images/taste/tea.png";
import salty from "../../images/taste/salt.png";

export default class Taste extends React.Component {
  state = {
    taste: ["spicy", "sweet"],
    level: [2, 1],
  };
  tasteLevel = (e) => {
    //  e : 레벨의 길이 = 맛 길이
    let icon = [];
    for (var x = 0; x < e; x++) {
      icon.push(
        <View key={x}>
          <Image
            source={hot}
            style={{ width: 60, height: 60, marginLeft: 5 }}
          />
          <Image
            source={sweet}
            style={{ width: 60, height: 60, marginLeft: 5 }}
          />
          <Image
            source={sour}
            style={{ width: 60, height: 60, marginLeft: 5 }}
          />
          <Image
            source={bitter}
            style={{ width: 60, height: 60, marginLeft: 5 }}
          />
          <Image
            source={salty}
            style={{ width: 60, height: 60, marginLeft: 5 }}
          />
        </View>
      );
    }
    return <View style={{ flexDirection: "row" }}>{icon}</View>;
  };

  render() {
    const { level } = this.state;

    return <View>{this.tasteLevel(level.length)}</View>;
  }
}

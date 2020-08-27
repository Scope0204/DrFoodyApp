import React from "react";
import { View, Text } from "react-native";

import { FontAwesome } from "@expo/vector-icons";

export default class Star extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      star: this.props.star,
    };
  }
  star = (e) => {
    let stars = [];
    for (let x = 1; x <= 5; x++) {
      if (x <= e) {
        stars.push(
          <View key={x}>
            <FontAwesome
              key={x}
              name={"star"}
              color={"orange"}
              size={16}
              style={{ marginHorizontal: 1 }}
            />
          </View>
        );
      } else {
        stars.push(
          <View key={x}>
            <FontAwesome
              key={x}
              name={"star"}
              color={"#b1b1b1"}
              size={16}
              style={{ marginHorizontal: 1 }}
            />
          </View>
        );
      }
    }

    return <View style={{ flexDirection: "row", paddingTop: 6 }}>{stars}</View>;
  };

  render() {
    const { star } = this.state;
    return (
      <View style={{ marginTop: 5 }}>
        <View>{this.star(star)}</View>
      </View>
    );
  }
}

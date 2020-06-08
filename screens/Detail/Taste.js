import React from "react";
import { View, Text } from "react-native";
import Svg, { Polygon } from "react-native-svg";

export default class Taste extends React.Component {
  render() {
    return (
      <View>
        <Svg height="400" width="400">
          <Polygon
            points="200,10 400,170 320,400 80,400 10,170"
            fill="lime"
            stroke="red"
            strokeWidth="1"
          />
          {/* <Polygon
            points="200,50 300,180 320,400  80,380 10,180"
            fill="blue"
            stroke="red"
            strokeWidth="1"
          /> */}
        </Svg>
      </View>
    );
  }
}

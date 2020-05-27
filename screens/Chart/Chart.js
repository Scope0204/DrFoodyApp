import React from "react";
import { Text } from "react-native";

export default class Chart extends React.Component {
  componentWillMount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }
  render() {}
}

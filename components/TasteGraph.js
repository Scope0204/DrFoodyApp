import React from "react";

import { View, Dimensions } from "react-native";

import { PieChart } from "react-native-chart-kit";

const { width, height } = Dimensions.get("window");

const chartConfig = {
  color: (opacity = 0) => `rgb(0, 0, 0, ${opacity})`,
};

export default class TasteGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
    };
  }

  render() {
    const { user } = this.state;

    const data = [
      {
        name: "매운맛",
        population: parseInt(user[0].user_hot),
        color: "red",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      },
      {
        name: "단맛",
        population: parseInt(user[0].user_sweet),
        color: "orange",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      },
      {
        name: "신맛",
        population: parseInt(user[0].user_salty),
        color: "yellow",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      },
      {
        name: "쓴맛",
        population: parseInt(user[0].user_bitter),
        color: "green",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      },
      {
        name: "짠맛",
        population: parseInt(user[0].user_salty),
        color: "blue",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      },
    ];

    return (
      <View>
        <PieChart
          data={data}
          width={width}
          height={300}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="40"
          absolute
        />
      </View>
    );
  }
}

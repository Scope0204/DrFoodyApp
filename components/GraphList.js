import React from "react";

import { Text, View, Dimensions, FlatList } from "react-native";

import { PieChart } from "react-native-chart-kit";

import { FontAwesome, AntDesign } from "@expo/vector-icons";
import styled from "styled-components";
import GraphSwp from "./GraphSwp";

const { width, height } = Dimensions.get("window");

const chartConfig = {
  color: (opacity = 0) => `rgb(0, 0, 0, ${opacity})`,
};

const Circle = styled.View`
  width: 15px;
  height: 15px;
  border-radius: 5px;
  margin-right: 5px;
`;

const ListName = styled.Text`
  font-size: 16px;
`;

const GraphCon = styled.View`
  margin-bottom: 20px;
  background-color: white;
  width: ${width - 20}px;
  margin-left: 10px;
  border-radius: 10px;
  padding-top: 10px;
  box-shadow: 1px 1px 2px gray;
`;

export default class GraphList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: this.props.list,
      color: [null, "#581845", "#900C3F", "#c70039", "#ff5733", "#ffc30f"],
      category: this.props.category,
      type: ["조회수", "리뷰수", "별점수"],
    };
  }

  list = (e) => {
    const { list } = this.state;
    let backgroundColor = null;

    if (e == 0) {
      backgroundColor = "#581845";
    } else if (e == 1) {
      backgroundColor = "#900C3F";
    } else if (e == 2) {
      backgroundColor = "#c70039";
    } else if (e == 3) {
      backgroundColor = "#ff5733";
    } else if (e == 4) {
      backgroundColor = "#ffc30f";
    }
    return (
      <View
        style={{
          flexDirection: "row",
          marginBottom: 10,
          alignItems: "center",
        }}
      >
        <Circle style={{ backgroundColor: backgroundColor }} />
        <ListName>{parseInt(list[e].order_point)}건</ListName>
      </View>
    );
  };

  render() {
    const { list, color, category, type } = this.state;

    const data = [
      {
        name: "",
        population: parseInt(list[0].order_point),
        color: "#581845",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      },
      {
        name: "",
        population: parseInt(list[1].order_point),
        color: "#900C3F",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      },
      {
        name: "",
        population: parseInt(list[2].order_point),
        color: "#c70039",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      },
      {
        name: "",
        population: parseInt(list[3].order_point),
        color: "#ff5733",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      },
      {
        name: "",
        population: parseInt(list[4].order_point),
        color: "#ffc30f",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      },
    ];

    return (
      <View>
        <View
          style={{
            marginBottom: 10,
            // backgroundColor: "white",
            width: width,
            paddingBottom: 10,
          }}
        >
          <Text style={{ fontWeight: "bold", marginLeft: 15 }}>그래프</Text>
          <Text style={{ fontSize: 12, marginLeft: 15 }}>
            카테고리에 따른 상위 5개의 제품들을 나타냅니다
          </Text>
        </View>
        <View>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 22,
              marginBottom: 12,
              marginLeft: 15,
              marginTop: 5,
            }}
          >
            {type[category]}
          </Text>
        </View>
        <GraphCon>
          <PieChart
            data={data}
            width={width}
            height={260}
            chartConfig={chartConfig}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft={95}
            absolute={false}
            hasLegend={false} // 옆에 나오는거
          />
          <View style={{ alignItems: "center" }}>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                width: width - 50,
                marginTop: 10,
                marginBottom: 20,
              }}
            >
              {this.list(0)}
              {this.list(1)}
              {this.list(2)}
              {this.list(3)}
              {this.list(4)}
            </View>
          </View>
        </GraphCon>

        <View style={{ marginTop: 10 }}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 20,
              marginBottom: 10,
              marginLeft: 20,
            }}
          >
            제품 정보
          </Text>
        </View>
        <View>
          <GraphSwp list={list} color={color} />
        </View>
      </View>
    );
  }
}

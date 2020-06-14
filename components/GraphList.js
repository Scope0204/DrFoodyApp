import React from "react";

import {
  Text,
  View,
  Dimensions,
  FlatList,
  TouchableHighlightBase,
} from "react-native";

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
  margin-bottom: 10px;
  margin-top: 10px;
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
      //   color: ["#7DB8E3", "#7DE3DC", "#7DE3B6", "#91E37D", "#C0E37D"],
      //   color: ["#E7CA71", "#9465DA", "#BA66E0", "#E77186", "#E79C71"],
      color: ["#218380", "#519D9E", "#9DC8C8", "#BAD8D8", "#D8E6E7"],

      category: this.props.category,
      type: ["조회수", "리뷰수", "별점수"],
    };
  }

  list = (e) => {
    const { list, color, category } = this.state;
    let backgroundColor = null;

    if (e == 0) {
      backgroundColor = color[0];
    } else if (e == 1) {
      backgroundColor = color[1];
    } else if (e == 2) {
      backgroundColor = color[2];
    } else if (e == 3) {
      backgroundColor = color[3];
    } else if (e == 4) {
      backgroundColor = color[4];
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
        {category == 2 ? (
          <ListName>{parseInt(list[e].order_point)}점</ListName>
        ) : (
          <ListName>{parseInt(list[e].order_point)}건</ListName>
        )}
      </View>
    );
  };

  check = (e) => {
    alert(e);
  };

  render() {
    const { list, color, category, type } = this.state;

    const data = [
      {
        name: "",
        population: parseInt(list[0].order_point),
        color: color[0],
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      },
      {
        name: "",
        population: parseInt(list[1].order_point),
        color: color[1],
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      },
      {
        name: "",
        population: parseInt(list[2].order_point),
        color: color[2],
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      },
      {
        name: "",
        population: parseInt(list[3].order_point),
        color: color[3],
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      },
      {
        name: "",
        population: parseInt(list[4].order_point),
        color: color[4],
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      },
    ];

    return (
      <View>
        <View>
          <Text style={{ fontWeight: "bold", marginLeft: 15 }}>그래프</Text>
          <Text style={{ fontSize: 12, marginLeft: 15 }}>
            카테고리에 따른 상위 5개의 제품들을 나타냅니다
          </Text>
        </View>

        <View style={{ height: 100, marginTop: 10 }}>
          <GraphSwp list={list} color={color} check={this.check} />
        </View>

        <GraphCon>
          <View
            style={{
              justifyContent: "center",
              marginLeft: 20,
              marginTop: 10,
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 22,
              }}
            >
              {type[category]}
            </Text>
          </View>

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

        {/* <View style={{ marginTop: 10 }}>
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
        </View> */}
      </View>
    );
  }
}

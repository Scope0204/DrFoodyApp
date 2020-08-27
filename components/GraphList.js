import React from "react";

import {
  Text,
  View,
  Dimensions,
  FlatList,
  TouchableHighlightBase,
  Alert,
} from "react-native";
import { PieChart } from "react-native-chart-kit";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import styled from "styled-components";
import GraphSwp from "./GraphSwp";
import axios from "axios"; // npm i axios@0.18.0

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
  height: 400px;
  margin-left: 10px;
  border-radius: 10px;
  padding-top: 10px;

  box-shadow: 2px 2px 2px #f1f1f1;
`;

export default class GraphList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //   color: ["#7DB8E3", "#7DE3DC", "#7DE3B6", "#91E37D", "#C0E37D"],
      //   color: ["#E7CA71", "#9465DA", "#BA66E0", "#E77186", "#E79C71"],
      color: ["#218380", "#519D9E", "#9DC8C8", "#BAD8D8", "#D8E6E7"],
      list: this.props.list,
      category: this.props.category,
      type: ["조회수", "리뷰수", "별점수"],
      review: [],
      show: false,
      food_name: false,
    };
  }

  componentDidMount = () => {};

  check = async (e) => {
    const { list, color, category, keyword, show } = this.state;
    this.setState({ show: false, food_name: e });

    try {
      await axios({
        method: "post",
        // url: "http://35.230.114.182:5000/foodDict",
        url: "http://34.82.46.49:5000/foodDict",

        headers: {
          //응답에 대한 정보
          Accept: "application/json", // 서버가 json 타입으로 변환해서 사용
          "Content-Type": "application/json",
        },
        data: {
          productName: e,
        },
      })
        .then((response) => {
          this.setState({ review: [] });
          console.log(response.data.keyword_dict[0].keyword);
          console.log(e);

          for (var key = 0; key < 5; key++) {
            var list = response.data.keyword_dict[key];
            this.setState({
              review: this.state.review.concat({
                id: key,
                keyword: list.keyword,
                number: list.number,
              }),
            });
          }
          this.setState({ show: true });
        })
        .catch((err) => {
          console.log(err);
          Alert.alert("データセット不足", "グラフを表すことができません。");
        });
    } catch (err) {
      alert("bb");

      console.log(err);
    }
  };

  list = (e) => {
    const { color, review } = this.state;
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

        <ListName>{review[e].keyword}</ListName>
      </View>
    );
  };

  render() {
    const { list, color, food_name, type, show, review } = this.state;

    // console.log(review);
    return (
      <View>
        <View>
          <Text style={{ fontWeight: "bold", marginLeft: 15 }}>グラフ</Text>
          <Text style={{ fontSize: 12, marginLeft: 15 }}>
            カテゴリーによって上位5つの商品を示します
          </Text>
        </View>

        <View style={{ height: 100, marginTop: 10 }}>
          <GraphSwp list={list} color={color} check={this.check} />
        </View>

        <GraphCon>
          {show ? (
            <View>
              <View
                style={{
                  justifyContent: "center",
                  margin: 24,
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 22,
                  }}
                >
                  {food_name}
                </Text>
              </View>

              <PieChart
                data={[
                  {
                    name: "    " + review[0].keyword,
                    population: parseInt(review[0].number),
                    color: color[0],
                  },
                  {
                    name: "    " + review[1].keyword,
                    population: parseInt(review[1].number),
                    color: color[1],
                  },
                  {
                    name: "    " + review[2].keyword,
                    population: parseInt(review[2].number),
                    color: color[2],
                  },
                  {
                    name: "    " + review[3].keyword,
                    population: parseInt(review[3].number),
                    color: color[3],
                  },
                  {
                    name: "    " + review[4].keyword,
                    population: parseInt(review[4].number),
                    color: color[4],
                  },
                ]}
                width={width}
                height={280}
                chartConfig={chartConfig}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft={30}
                absolute={true}
                hasLegend={true} // 옆에 나오는거
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
                ></View>
              </View>
            </View>
          ) : (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: 380,
              }}
            >
              <Text style={{ fontSize: 15, fontWeight: "700" }}>
                グラフを表示するには上の商品をクリックしてください
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 15,
                }}
              >
                <Text
                  style={{
                    fontSize: 13,
                    color: "orange",
                    fontWeight: "bold",
                  }}
                >
                  sns ・ ソーシャルコマース
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: "300",
                  }}
                >
                  で收集した製品の口コミ分析サービスです
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "300",
                }}
              ></Text>
            </View>
          )}
        </GraphCon>
      </View>
    );
  }
}

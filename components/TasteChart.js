import React from "react";
import { View, Text, Image, ScrollView, Dimensions } from "react-native";
import axios from "axios"; // npm i axios@0.18.0

const { width, height } = Dimensions.get("window");
import Svg, { Polygon } from "react-native-svg";

export default class TasteChart extends React.Component {
  state = {
    taste: [],
    show: false,
  };

  componentDidMount = async () => {
    //
    this.setState({ taste: [] });
    const food_name = this.props.food_name;
    try {
      await axios({
        method: "post",
        url: "http://35.230.114.182:5000/tasteNumber",
        headers: {
          Accept: "application/json", // 서버가 json 타입으로 변환해서 사용
          "Content-Type": "application/json",
        },
        data: {
          productName: food_name,
        },
      })
        .then((response) => {
          //   console.log(Object.keys(response.data.taste)); //키 값 가져오기
          console.log(response.data.taste);

          if (response.data.taste) {
            for (var a = 0; a < 5; a++) {
              if (a == 0) {
                this.setState({
                  taste: this.state.taste.concat({
                    kind: "hot",
                    value: Math.round(response.data.taste.hot),
                  }),
                });
              }

              if (a == 1) {
                this.setState({
                  taste: this.state.taste.concat({
                    kind: "sweet",
                    value: Math.round(response.data.taste.sweet),
                  }),
                });
              }

              if (a == 2) {
                this.setState({
                  taste: this.state.taste.concat({
                    kind: "sour",
                    value: Math.round(response.data.taste.sour),
                  }),
                });
              }

              if (a == 3) {
                this.setState({
                  taste: this.state.taste.concat({
                    kind: "bitter",
                    value: Math.round(response.data.taste.bitter),
                  }),
                });
              }

              if (a == 4) {
                this.setState({
                  taste: this.state.taste.concat({
                    kind: "salty",
                    value: Math.round(response.data.taste.salty),
                  }),
                });
              }
            }

            this.setState({ show: true });
          } else {
            this.setState({ show: false });
          }
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { taste, show } = this.state;

    return show ? (
      <View>
        {/* <View style={{ alignItems: "center", height: 60 }}>
          <Text>{taste[0].value}</Text>
        </View> */}

        <View style={{ alignItems: "center" }}>
          <View>
            <Text
              style={{
                color: "red",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              매운맛
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: -55,
            }}
          >
            <Text
              style={{
                marginRight: -65,
                marginTop: -70,
                color: "blue",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              짠맛
            </Text>
            <View style={{ marginLeft: 20 }}>
              <Svg height="400" width="400">
                <Polygon
                  points="190,70 318,166 262,302 118,302 62,166"
                  fill="white"
                  stroke="#EEEBEB"
                  strokeWidth="1"
                />
                <Polygon
                  points="190,94 292.4,170.8 247.6,279.6 132.4,279.6 87.6,170.8"
                  fill="white"
                  stroke="#EEEBEB"
                  strokeWidth="1"
                />
                <Polygon
                  points="190,118 266.8,175.6 233.2,257.2 146.8,257.2 113.2,175.6"
                  fill="white"
                  stroke="#EEEBEB"
                  strokeWidth="1"
                />
                <Polygon
                  points="190,142 241.2,180.4 218.8,234.8 161.2,234.8 161.2,234.8 138.8,180.4"
                  fill="white"
                  stroke="#EEEBEB"
                  strokeWidth="1"
                />
                <Polygon
                  points="190,166 215.6,185.2 204.4,212.4 175.6,212.4 164.4,185.2"
                  fill="white"
                  stroke="#EEEBEB"
                  strokeWidth="1"
                />
                <Polygon
                  points={`190,${190 - taste[0].value * 24} ${
                    190 + taste[1].value * 25.6
                  },${190 - taste[1].value * 4.8} ${
                    190 + taste[2].value * 14.4
                  },${190 + taste[2].value * 22.4} ${
                    190 - taste[3].value * 14.4
                  },${190 + taste[3].value * 22.4} ${
                    190 - taste[4].value * 25.6
                  },${190 - taste[4].value * 4.8}`}
                  fill="rgba(255, 81, 34, 0.8)"
                />
              </Svg>
            </View>
            <Text
              style={{
                marginLeft: -65,
                marginTop: -70,
                color: "orange",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              단맛
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: 190,
            }}
          >
            <Text
              style={{
                marginTop: -80,
                color: "green",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              쓴맛
            </Text>
            <Text
              style={{
                marginTop: -80,
                color: "#F9E415",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              신맛
            </Text>
          </View>
        </View>
      </View>
    ) : (
      <View style={{ marginLeft: 30 }}>
        <Text>맛 리뷰가 부족합니다 </Text>
      </View>
    );
  }
}

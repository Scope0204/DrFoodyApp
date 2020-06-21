import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
} from "react-native";
import styled from "styled-components";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios"; // npm i axios@0.18.0

const { width, height } = Dimensions.get("window");

const Bar = styled.View`
  background-color: #f5f5f5;
  height: 10px;
  width: ${width}px;
  border-top-width: 0.5px;
  border-top-color: #b5b5b5;
`;

const OrangeBar = styled.View`
  height: 5px;
  background-color: orange;
`;
const GrayBar = styled.View`
  height: 5px;
  background-color: gray;
`;

export default class ReviewGrp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      point: this.props.point,
      food_id: this.props.food_id,
      review: [],
      one: 0,
      two: 0,
      three: 0,
      four: 0,
      five: 0,
      allReview: 0,
      show: false,
    };
  }

  componentDidMount = async () => {
    const { food_id, one, two, three, four, five, allReview } = this.state;
    try {
      // 리뷰 리스트 출력
      await axios({
        method: "post",
        url: "http://3.34.97.97/api/app/reviewList",
        data: {
          food_id: food_id,
          page: 1,
        },
      })
        .then((response) => {
          console.log(response.data.point);
          if (response) {
            let count = 0;
            for (var a = 0; a < 5; a++) {
              // 전체리뷰갯수 조회
              count = count + response.data.point[a];
            }
            this.setState({ allReview: count });

            for (var a = 0; a < 5; a++) {
              var list = response.data.point[a];
              if (list != 0) {
                //리뷰 평점이 0 이 아닐때 -> why? div 길이 값이 0 이면 오류반환
                if (a == 0) {
                  this.setState({
                    one: list,
                    show: true, // 0인 리뷰만 나올경우 show를 true 로 바꿀수 없다
                  });
                } else if (a == 1) {
                  this.setState({
                    two: list,
                    show: true,
                  });
                } else if (a == 2) {
                  this.setState({
                    three: list,
                    show: true,
                  });
                } else if (a == 3) {
                  this.setState({
                    four: list,
                    show: true,
                  });
                } else if (a == 4) {
                  this.setState({
                    five: list,
                    show: true,
                  });
                }
              }
            }
          } else {
            console.log("no");
          }
        })
        .catch((error) => console.log(error));
    } catch (err) {
      console.log(err);
    }
  };

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
    const {
      point,
      review,
      one,
      two,
      three,
      four,
      five,
      allReview,
      show,
    } = this.state;

    return show ? (
      <>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 15,
            marginBottom: 15,
          }}
        >
          <View style={{ alignItems: "center", flex: 1 }}>
            <Text style={{ fontSize: 35 }}>{point}</Text>
            {point ? this.star(parseInt(point)) : null}
          </View>

          <View style={{ flex: 2, marginRight: 10 }}>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
                marginBottom: 4,
              }}
            >
              <Text style={{ fontWeight: "bold", width: 30, fontSize: 12 }}>
                5점
              </Text>
              <View style={{ width: 3 }} />
              <OrangeBar
                style={{
                  width: (180 / allReview) * five,
                }}
              />
              <GrayBar
                style={{
                  width: 180 - (180 / allReview) * five,
                }}
              />
              <Text style={{ color: "gray", marginLeft: 10 }}>
                {five ? five : null}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
                marginBottom: 4,
              }}
            >
              <Text style={{ fontWeight: "bold", width: 30, fontSize: 12 }}>
                4점
              </Text>
              <View style={{ width: 3 }} />
              <OrangeBar
                style={{
                  width: (180 / allReview) * four,
                }}
              />
              <GrayBar
                style={{
                  width: 180 - (180 / allReview) * four,
                }}
              />
              <Text style={{ color: "gray", marginLeft: 10 }}>
                {four ? four : null}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
                marginBottom: 4,
              }}
            >
              <Text style={{ fontWeight: "bold", width: 30, fontSize: 12 }}>
                3점
              </Text>
              <View style={{ width: 3 }} />
              <OrangeBar
                style={{
                  width: (180 / allReview) * three,
                }}
              />
              <GrayBar
                style={{
                  width: 180 - (180 / allReview) * three,
                }}
              />
              <Text style={{ color: "gray", marginLeft: 10 }}>
                {three ? three : null}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
                marginBottom: 4,
              }}
            >
              <Text style={{ fontWeight: "bold", width: 30, fontSize: 12 }}>
                2점
              </Text>
              <View style={{ width: 3 }} />
              <OrangeBar
                style={{
                  width: (180 / allReview) * two,
                }}
              />
              <GrayBar
                style={{
                  width: 180 - (180 / allReview) * two,
                }}
              />
              <Text style={{ color: "gray", marginLeft: 10 }}>
                {two ? two : null}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
                marginBottom: 4,
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  width: 30,
                  fontSize: 12,
                  paddingLeft: 1.5,
                }}
              >
                1점
              </Text>
              <View style={{ width: 3 }} />
              <OrangeBar
                style={{
                  width: (180 / allReview) * one,
                }}
              />
              <GrayBar
                style={{
                  width: 180 - (180 / allReview) * one,
                }}
              />
              <Text style={{ color: "gray", marginLeft: 10 }}>
                {one ? one : null}
              </Text>
            </View>
          </View>
        </View>
        <Bar />
      </>
    ) : null;
  }
}

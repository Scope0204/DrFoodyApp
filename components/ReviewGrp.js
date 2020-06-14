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
      one: 1,
      two: 1,
      three: 1,
      four: 1,
      five: 1,
      allReview: 1,
      show: false,
    };
  }

  componentDidMount = async () => {
    const { food_id } = this.state;
    try {
      // 리뷰 리스트 출력
      await axios({
        url: "http://3.34.97.97/api/app/reviewList",
      })
        .then((response) => {
          if (response) {
            // console.log(response.data[0].food_id);
            for (var key in response.data) {
              var list = response.data[key];
              if (food_id == list.food_id) {
                this.setState({
                  review: this.state.review.concat({
                    id: key,
                    point: list.review_point,
                  }),
                  show: true,
                });
              }
            }
          } else {
            console.log("no");
          }
        })
        .catch((error) => console.log(error));
      this.rate();
    } catch (err) {
      console.log(err);
    }
  };

  rate = () => {
    let { review } = this.state;

    let one2 = 0.1;
    let two2 = 0.1;
    let three2 = 0.1;
    let four2 = 0.1;
    let five2 = 0.1;
    let allReview2 = 0.1;

    for (let x = 0; x < review.length; x++) {
      allReview2++;
      if (review[x].point == "1") {
        one2++;
      } else if (review[x].point == "2") {
        two2++;
      } else if (review[x].point == "3") {
        three2++;
      } else if (review[x].point == "4") {
        four2++;
      } else if (review[x].point == "5") {
        five2++;
      }
    }
    this.setState({
      allReview: allReview2,
      one: one2,
      two: two2,
      three: three2,
      four: four2,
      five: five2,
    });
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
                  width: (200 / parseInt(allReview)) * parseInt(five),
                }}
              />
              <GrayBar
                style={{
                  width: 200 - (200 / parseInt(allReview)) * parseInt(five),
                }}
              />
              <Text style={{ color: "gray", marginLeft: 8 }}>
                {parseInt(five) ? parseInt(five) : null}
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
                  width: (200 / parseInt(allReview)) * parseInt(four),
                }}
              />
              <GrayBar
                style={{
                  width: 200 - (200 / parseInt(allReview)) * parseInt(four),
                }}
              />
              <Text style={{ color: "gray", marginLeft: 10 }}>
                {parseInt(four) ? parseInt(four) : null}
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
                  width: (200 / allReview) * parseInt(three),
                }}
              />
              <GrayBar
                style={{
                  width: 200 - (200 / parseInt(allReview)) * parseInt(three),
                }}
              />
              <Text style={{ color: "gray", marginLeft: 10 }}>
                {parseInt(three) ? parseInt(three) : null}
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
                  width: (200 / allReview) * parseInt(two),
                }}
              />
              <GrayBar
                style={{
                  width: 200 - (200 / parseInt(allReview)) * parseInt(two),
                }}
              />
              <Text style={{ color: "gray", marginLeft: 10 }}>
                {parseInt(two) ? parseInt(two) : null}
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
                  width: (200 / allReview) * parseInt(one),
                }}
              />
              <GrayBar
                style={{
                  width: 200 - (200 / parseInt(allReview)) * parseInt(one),
                }}
              />
              <Text style={{ color: "gray", marginLeft: 10 }}>
                {parseInt(one) ? parseInt(one) : null}
              </Text>
            </View>
          </View>
        </View>
        <Bar />
      </>
    ) : null;
  }
}

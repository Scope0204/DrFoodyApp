import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  AsyncStorage,
} from "react-native";
import axios from "axios"; // npm i axios@0.18.0
import styled from "styled-components";
import { FontAwesome } from "@expo/vector-icons";
import Translate from "../../components/Translate";

const { width, height } = Dimensions.get("window");

const Container = styled.ScrollView`
  width: ${width - 20}px;
  background-color: white;
  height: 150px;
  border-radius: 10px;
  border: 1px solid #ecf0f1;
  margin-bottom: 20px;
`;

export default class Review extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      review: [],
      reviewUser: [],
      mode: 0, //mode : 0(전체리뷰) , 1(맛 리뷰)
      user_id: null, // 자기 리뷰인지 확인할꺼임
      food_id: this.props.food_id, // 자기 음식리뷰만 나오게하기위해 props로 받음
      taste_review: 0, // 맛 리뷰 갯수 저장
      setting: false,
      review_length: 0,
      isModalVisible: false, // 현재 모달 상태
    };
  }

  callTranslate = () => {
    const { isModalVisible } = this.state;
    this.setState({ isModalVisible: isModalVisible });
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
              size={12}
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
              size={12}
              style={{ marginHorizontal: 1 }}
            />
          </View>
        );
      }
    }

    return <View style={{ flexDirection: "row", paddingTop: 6 }}>{stars}</View>;
  };

  componentDidMount = async () => {
    const food_id = this.props.food_id;
    const post_id = await AsyncStorage.getItem("User");
    this.setState({
      user_id: post_id,
      taste_review: 0,
      food_id: food_id,
      setting: false,
    });

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
          //   console.log(response.data.review);
          let count = 0;
          if (response) {
            let taste_view = 0;
            for (var key in response.data.review) {
              var list = response.data.review[key];
              if (food_id == list.food_id) {
                this.setState({
                  review: this.state.review.concat({
                    id: key,
                    review_id: list.review_id,
                    food_id: list.food_id,
                    user_id: list.user_id,
                    content: list.review_content,
                    language_code: list.language_code,
                    country_code: list.country_code,
                    nickname: list.user_nickname,
                    photo: list.user_photo,
                    taste: list.review_type,
                    point: list.review_point,
                    review_date: list.review_date,
                  }),
                });
                if (list.review_type == 1) {
                  taste_view++;
                  this.setState({ taste_review: taste_view });
                }
              }
            }
            for (var a = 0; a < 5; a++) {
              // 전체리뷰갯수 조회
              count = count + response.data.point[a];
            }
            this.setState({ review_length: count });
          } else {
            console.log("no");
          }
        })
        .catch((error) => console.log(error));
    } catch (err) {
      console.log(err);
    }
    this.setState({ setting: true });
  };

  update = (e) => {
    this.props.update(e);
  };

  render() {
    const {
      review,
      mode,
      user_id,
      food_id,
      taste_review,
      setting,
      review_length,
      isModalVisible,
    } = this.state;

    return setting ? (
      <View>
        <View style={{ marginLeft: 15, marginBottom: 15, marginTop: 15 }}>
          {mode == 0 ? (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 20,
                  marginBottom: 5,
                  color: "#F39C12",
                }}
              >
                {review_length + " "}
              </Text>
              <Text
                style={{ fontWeight: "bold", fontSize: 20, marginBottom: 5 }}
              >
                の
              </Text>
            </View>
          ) : (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 20,
                  marginBottom: 5,
                  color: "#F39C12",
                }}
              >
                {taste_review + " "}
              </Text>
              <Text
                style={{ fontWeight: "bold", fontSize: 20, marginBottom: 5 }}
              >
                の
              </Text>
            </View>
          )}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={{ justifyContent: "center" }}>
              <Text style={{ fontSize: 20 }}>レビューがあります</Text>
            </View>

            {mode == 0 ? ( //전체
              <View
                style={{
                  borderRadius: 10,
                  borderWidth: 1,
                  width: 70,
                  height: 30,
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 10,
                  backgroundColor: "#F5F5F5",
                }}
              >
                <TouchableOpacity onPress={() => this.setState({ mode: 1 })}>
                  <Text style={{ fontWeight: "bold" }}>全体</Text>
                </TouchableOpacity>
              </View>
            ) : (
              //맛 페이지
              <View
                style={{
                  borderRadius: 10,
                  borderWidth: 1,
                  width: 70,
                  height: 30,
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 10,
                  backgroundColor: "#F39C12",
                }}
              >
                <TouchableOpacity onPress={() => this.setState({ mode: 0 })}>
                  <Text style={{ color: "white", fontWeight: "bold" }}>味</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

        <View
          style={{
            height: 1,
            borderColor: "white",
            borderBottomColor: "#f5f5f5",
            borderWidth: 1,
            marginBottom: 20,
          }}
        ></View>
        {mode == 0
          ? review.map((list, key) => {
              return (
                <View style={{ alignItems: "center" }} key={key}>
                  <Container>
                    <View style={{ flexDirection: "row", paddingLeft: 10 }}>
                      {list.country_code == 410 ? (
                        <Image
                          source={require("../../images/country/korea.png")}
                          style={{ width: 60, height: 60 }}
                        />
                      ) : (
                        <Image
                          source={require("../../images/country/korea.png")}
                          style={{ width: 60, height: 60 }}
                        />
                      )}
                      <View
                        style={{
                          width: width / 1.35,
                          flexDirection: "row",
                          justifyContent: "space-between",
                          paddingTop: 12,
                          paddingLeft: 10,
                        }}
                      >
                        <View style={{ flexDirection: "column" }}>
                          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                            {list.nickname}
                          </Text>

                          {list.point ? this.star(list.point) : null}
                        </View>

                        <View>
                          <Text
                            style={{
                              marginBottom: 5,
                              fontSize: 12,
                              color: "gray",
                            }}
                          >
                            {list.review_date}
                          </Text>
                          {user_id == list.user_id ? (
                            <TouchableOpacity
                              onPress={() => this.update(list)}
                              style={{ alignItems: "flex-end" }}
                            >
                              <Text
                                style={{
                                  fontSize: 14,
                                  fontWeight: "bold",
                                  color: "blue",
                                }}
                              >
                                修整
                              </Text>
                            </TouchableOpacity>
                          ) : null}
                        </View>
                      </View>
                    </View>
                    <View
                      style={{
                        paddingTop: 10,
                        paddingLeft: 20,
                        paddingRight: 20,
                        paddingBottom: 20,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 16,
                        }}
                      >
                        {list.content}
                      </Text>
                      <View style={{ paddingRight: 20, marginTop: 10 }}>
                        <Translate
                          country={list.country_code}
                          content={list.content}
                        />
                      </View>
                    </View>
                  </Container>
                </View>
              );
            })
          : // mode = 1 인경우 ( 맛 리뷰 )
            review.map((list, key) => {
              return (
                <View style={{ alignItems: "center" }} key={key}>
                  {list.taste == 1 ? (
                    <Container>
                      <View style={{ flexDirection: "row", paddingLeft: 10 }}>
                        {list.country_code == 410 ? (
                          <Image
                            source={require("../../images/country/korea.png")}
                            style={{ width: 60, height: 60 }}
                          />
                        ) : (
                          <Image
                            source={require("../../images/country/korea.png")}
                            style={{ width: 60, height: 60 }}
                          />
                        )}
                        <View
                          style={{
                            width: width / 1.35,
                            flexDirection: "row",
                            justifyContent: "space-between",
                            paddingTop: 12,
                            paddingLeft: 10,
                          }}
                        >
                          <View style={{ flexDirection: "column" }}>
                            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                              {list.nickname}
                            </Text>

                            {list.point ? this.star(list.point) : null}
                          </View>

                          <View>
                            <Text
                              style={{
                                marginBottom: 5,
                                fontSize: 12,
                                color: "gray",
                              }}
                            >
                              {list.review_date}
                            </Text>
                            {user_id == list.user_id ? (
                              <TouchableOpacity
                                onPress={() => this.update(list)}
                                style={{ alignItems: "flex-end" }}
                              >
                                <Text
                                  style={{
                                    fontSize: 14,
                                    fontWeight: "bold",
                                    color: "blue",
                                  }}
                                >
                                  修整
                                </Text>
                              </TouchableOpacity>
                            ) : null}
                          </View>
                        </View>
                      </View>
                      <View
                        style={{
                          paddingTop: 10,
                          paddingLeft: 20,
                          paddingRight: 20,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 16,
                          }}
                        >
                          {list.content}
                        </Text>
                      </View>
                    </Container>
                  ) : null}
                </View>
              );
            })}
      </View>
    ) : null;
  }
}

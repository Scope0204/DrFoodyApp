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

const { width, height } = Dimensions.get("window");

const Container = styled.View`
  width: ${width - 20}px;
  background-color: white;
  height: 120px;
  border-radius: 10px;
  border: 1px solid #ecf0f1;
  box-shadow: 1px 1px 1px gray;
  margin-bottom: 20px;
  flex-direction: row;
  align-items: center;
`;
const ReviewCon = styled.View`
  flex: 1;
`;

//이름을 둔다
const NameCon = styled.View`
  flex: 0.2;
  margin-top: 15px;
  flex-direction: row;
  justify-content: space-between;
`;

//별점을 둔다
const StarCon = styled.View`
  flex: 0.2;
  margin-top: 5px;
  flex-direction: row;
`;

//content를 둔다
const ContentCon = styled.View`
  flex: 0.7;
  margin-top: 5px;
  margin-right: 10px;
`;
export default class Review extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      review: [],
      reviewUser: [],
      mode: 0, //mode : 0(전체리뷰) , 1(맛 리뷰)
      user_id: null, // 자기 리뷰인지 확인할꺼임
      food_id: null, // 자기 음식리뷰만 나오게하기위해 props로 받음
      taste_review: 0, // 맛 리뷰 갯수 저장
    };
  }

  componentDidMount = async () => {
    const food_id = this.props.food_id;
    this.setState({ food_id: food_id });

    const post_id = await AsyncStorage.getItem("User");
    this.setState({ user_id: post_id });

    this.setState({ taste_review: 0 });

    try {
      // 리뷰 리스트 출력
      await axios({
        url: "http://15.164.224.142/api/app/reviewList",
      })
        .then((response) => {
          if (response) {
            console.log("aa");
            console.log(response.data);
            let count = 0;
            for (var key in response.data) {
              var list = response.data[key];
              if (food_id == list.food_id) {
                this.setState({
                  review: this.state.review.concat({
                    id: key,
                    review_id: list.review_id,
                    food_id: list.food_id,
                    user_id: list.user_id,
                    content: list.review_content,
                    language_code: list.language_code,
                    nickname: list.user_nickname,
                    photo: list.user_photo,
                    taste: list.review_type,
                  }),
                });

                if (list.review_type == 1) {
                  count++;
                  this.setState({ taste_review: count });
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

  update = (e) => {
    this.props.update(e);
  };

  render() {
    const { review, mode, user_id, food_id, taste_review } = this.state;

    return (
      <View>
        <View style={{ marginLeft: 15, marginBottom: 15, marginTop: 15 }}>
          {mode == 0 ? (
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 20,
                  marginBottom: 5,
                  color: "#F39C12",
                }}
              >
                {review.length + " "}
              </Text>
              <Text
                style={{ fontWeight: "bold", fontSize: 20, marginBottom: 5 }}
              >
                개의
              </Text>
            </View>
          ) : (
            <View style={{ flexDirection: "row" }}>
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
                개의
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
              <Text style={{ fontSize: 20 }}>리뷰가 있어요</Text>
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
                  <Text style={{ fontWeight: "bold" }}>전체 리뷰</Text>
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
                  <Text style={{ color: "white", fontWeight: "bold" }}>
                    맛 리뷰
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

        {mode == 0
          ? review.map((list, key) => {
              return (
                <View style={{ alignItems: "center" }} key={key}>
                  <Container>
                    {list.photo ? (
                      <View
                        style={{
                          borderWidth: 5,
                          borderRadius: 200,
                          width: 90,
                          height: 90,
                          marginLeft: 20,
                          marginRight: 20,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          source={{ uri: list.photo }}
                          style={{ width: 80, height: 80, borderRadius: 100 }}
                        />
                      </View>
                    ) : null}
                    <ReviewCon>
                      <NameCon>
                        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                          {list.nickname}
                        </Text>
                        {user_id == list.user_id ? (
                          <TouchableOpacity onPress={() => this.update(list)}>
                            <Text
                              style={{
                                fontSize: 16,
                                fontWeight: "bold",
                                marginRight: 12,
                                color: "#F39C12",
                              }}
                            >
                              수정
                            </Text>
                          </TouchableOpacity>
                        ) : null}
                      </NameCon>
                      <StarCon>
                        <Text>★</Text>
                      </StarCon>
                      <ContentCon>
                        <Text>"{list.content}"</Text>
                      </ContentCon>
                    </ReviewCon>
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
                      {list.photo ? (
                        <View
                          style={{
                            borderWidth: 5,
                            borderRadius: 200,
                            width: 90,
                            height: 90,
                            marginLeft: 20,
                            marginRight: 20,
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Image
                            source={{ uri: list.photo }}
                            style={{ width: 80, height: 80, borderRadius: 100 }}
                          />
                        </View>
                      ) : null}
                      <ReviewCon>
                        <NameCon>
                          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                            {list.nickname}
                          </Text>
                          {user_id == list.user_id ? (
                            <TouchableOpacity onPress={() => this.update(list)}>
                              <Text
                                style={{
                                  fontSize: 16,
                                  fontWeight: "bold",
                                  marginRight: 12,
                                  color: "#F39C12",
                                }}
                              >
                                수정
                              </Text>
                            </TouchableOpacity>
                          ) : null}
                        </NameCon>
                        <StarCon>
                          <Text>★</Text>
                        </StarCon>
                        <ContentCon>
                          <Text>"{list.content}"</Text>
                        </ContentCon>
                      </ReviewCon>
                    </Container>
                  ) : null}
                </View>
              );
            })}
      </View>
    );
  }
}

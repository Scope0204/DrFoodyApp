import React from "react";
import {
  Text,
  View,
  AsyncStorage,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import axios from "axios"; // npm i axios@0.18.0
import styled from "styled-components";
import { FontAwesome } from "@expo/vector-icons";

const { width, height } = Dimensions.get("screen");

const Container = styled.View`
  background-color: white;
  width: ${width - 20}px;
  height: ${height / 5}px;
  border: 0px solid;
  border-radius: 5px;
  margin-top: 10px;
  box-shadow: 2px 2px 2px gray;
  flex-direction: row;
  align-items: center;
`;

const ImageContainer = styled.View`
  margin-left: 20px;
  margin-right: 30px;
  align-items: center;
  flex: 0.45;
`;

const FoodInfo = styled.View`
  flex-direction: column;
  flex: 0.55;
`;

export default class Attention extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: null,
      call: null,
      dibs_list: [],
    };
  }

  componentDidMount = () => {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", () => {
      this.dibs_list();
    });
  };

  componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
  }

  dibs_list = async () => {
    await this.setState({ dibs_list: [] });

    const user_id = await AsyncStorage.getItem("User");
    try {
      //찜목록 가져오기
      await axios({
        method: "post",
        url: "http://3.34.97.97/api/app/dibsList",
        headers: {
          //응답에 대한 정보
          Accept: "application/json", // 서버가 json 타입으로 변환해서 사용
          "Content-Type": "application/json; charset=utf-8",
        },
        data: {
          user_id: user_id, //로컬로 해서 5로함 원래는 user_id
        },
      })
        .then((response) => {
          for (var key in response.data) {
            var List = response.data[key];
            this.setState({
              dibs_list: this.state.dibs_list.concat({
                id: key,
                food_id: List.food_id,
                point: List.point, // 리뷰 소숫점 값 처리안되잇음
                food_name: List.food.food_name,
                food_photo: List.food.food_photo,
              }),
            });
            // console.log(this.state);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (err) {
      console.log(err);
    }
  };

  // 음식 클릭시
  info = async (food_id) => {
    const user_id = await AsyncStorage.getItem("User");
    // console.log(food_id);
    try {
      await axios({
        method: "post",
        url: "http://3.34.97.97/api/app/searchHistory",

        headers: {
          //응답에 대한 정보
          Accept: "application/json", // 서버가 json 타입으로 변환해서 사용
          "Content-Type": "application/json;charset=utf-8",
        },
        // 검색어를 보낸다 -> 포함된 food 데이터 다 가져옴
        data: {
          user_id: user_id,
          food_id: food_id,
        },
      })
        .then((response) => {
          console.log(response);
        })
        .catch(function (err) {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
    this.props.navigation.navigate("Detail", { Id: food_id, User: user_id });
  };

  render() {
    const { dibs_list } = this.state;
    return (
      <ScrollView style={{ backgroundColor: "#f5f5f5" }}>
        <View style={{ alignItems: "center" }}>
          <Text></Text>
          {dibs_list
            ? dibs_list.map((list, key) => {
                return (
                  <Container key={key}>
                    <ImageContainer>
                      <Image
                        source={{ uri: list.food_photo }}
                        style={{
                          width: 150,
                          height: 150,
                        }}
                      />
                    </ImageContainer>
                    <FoodInfo>
                      <View style={{ paddingBottom: 10, paddingTop: 10 }}>
                        {list.food_name < 8 ? (
                          <Text
                            style={{
                              fontSize: 20,
                              fontWeight: "bold",
                              marginBottom: 10,
                            }}
                          >
                            {list.food_name}
                          </Text>
                        ) : (
                          <Text
                            style={{
                              fontSize: 13,
                              fontWeight: "bold",
                              marginBottom: 10,
                            }}
                          >
                            {list.food_name}
                          </Text>
                        )}

                        <View style={{ marginBottom: 20 }}>
                          {list.point ? (
                            <View style={{ flexDirection: "row" }}>
                              <FontAwesome
                                size={16}
                                name={"star"}
                                color={"#F5B041"}
                                style={{ marginRight: 10 }}
                              />
                              <Text>{list.point}</Text>
                              <Text> / 5 점</Text>
                            </View>
                          ) : (
                            <View style={{ flexDirection: "row" }}>
                              <FontAwesome
                                size={16}
                                name={"star-o"}
                                color={"#F5B041"}
                                style={{ marginRight: 10 }}
                              />
                              <Text>0</Text>
                              <Text> / 5 점</Text>
                            </View>
                          )}
                        </View>
                      </View>
                      <View
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: "#FF2257",
                          width: 90,
                          height: 30,
                          marginBottom: 5,
                          borderRadius: 10,
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => this.info(list.food_id)}
                        >
                          <Text style={{ color: "white", fontWeight: "bold" }}>
                            Check this
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </FoodInfo>
                  </Container>
                );
              })
            : null}
        </View>
      </ScrollView>
    );
  }
}

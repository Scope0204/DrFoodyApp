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
  flex: 0.5;
`;

const FoodInfo = styled.View`
  flex-direction: column;
  padding-left: 20px;
  flex: 0.5;
`;

export default class Attention extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search_list: [],
      user_id: null,
    };
  }

  componentDidMount = async () => {
    // 유저 id
    const post_id = await AsyncStorage.getItem("User"); // 문자열로 읽힘
    this.setState({ user_id: post_id });

    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", () => {
      this.search_list();
    });
  };

  componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
  }

  search_list = async () => {
    await this.setState({ search_list: [] });
    const user_id = await AsyncStorage.getItem("User");
    try {
      await axios({
        method: "post",
        url: "http://3.34.97.97/api/app/searchList",
        headers: {
          Accept: "application/json", // 서버가 json 타입으로 변환해서 사용
          "Content-Type": "application/json;charset=utf-8",
        },
        data: {
          user_id: user_id,
        },
      })
        .then((response) => {
          for (var key in response.data) {
            var List = response.data[key];
            this.setState({
              search_list: this.state.search_list.concat({
                id: key,
                food_id: List.food_id,
                point: List.point, // 리뷰 소숫점 값 처리안되잇음
                food_name: List.food.food_name,
                food_photo: List.food.food_photo,
              }),
            });
          }
          console.log(this.state);
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (err) {
      console.log(err);
    }
  };

  //상세 페이지로 이동
  info = (food_id) => {
    const { user_id } = this.state;
    this.props.navigation.navigate("Detail", { Id: food_id, User: user_id });
  };

  render() {
    const { search_list } = this.state;
    return (
      <ScrollView style={{ backgroundColor: "#f5f5f5" }}>
        <View style={{ alignItems: "center" }}>
          <Text></Text>
          {search_list ? (
            search_list.map((list, key) => {
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
                      {list.food_name.length < 8 ? (
                        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                          {list.food_name}
                        </Text>
                      ) : (
                        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                          {list.food_name}
                        </Text>
                      )}
                    </View>
                    <View style={{ marginBottom: 30 }}>
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
                      <TouchableOpacity onPress={() => this.info(list.food_id)}>
                        <Text style={{ color: "white", fontWeight: "bold" }}>
                          Check this
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </FoodInfo>
                </Container>
              );
            })
          ) : (
            <Text>asdasdasd</Text>
          )}
        </View>
      </ScrollView>
    );
  }
}

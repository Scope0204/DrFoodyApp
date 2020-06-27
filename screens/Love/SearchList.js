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
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import Loading from "../../components/Loading";

const { width, height } = Dimensions.get("screen");

const Container = styled.TouchableOpacity`
  width: ${width - 20}px;
  background-color: white;
  height: 100px;
  border-radius: 10px;
  border: 1px solid #ecf0f1;
  box-shadow: 2px 2px 2px #f1f1f1;
  margin-bottom: 7px;
  flex-direction: row;
  align-items: center;
`;

const ImageContainer = styled.View`
  margin-left: 20px;
  align-items: center;
  flex: 2;
`;

const FoodInfo = styled.View`
  justify-content: center;
  padding-left: 30px;
  flex: 6;
`;

export default class Attention extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search_list: [],
      user_id: null,
      show: false,
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
    await this.setState({ search_list: [], show: false });
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
    this.setState({ show: true });
  };

  //상세 페이지로 이동
  info = (food_id) => {
    const { user_id } = this.state;
    this.props.navigation.navigate("Detail", { Id: food_id, User: user_id });
  };

  render() {
    const { search_list, show } = this.state;
    return show ? (
      <ScrollView style={{ backgroundColor: "#f5f5f5" }}>
        <View style={{ alignItems: "center" }}>
          <Text></Text>
          {search_list
            ? search_list.map((list, key) => {
                return (
                  <Container key={key} onPress={() => this.info(list.food_id)}>
                    <ImageContainer>
                      <Image
                        source={{ uri: list.food_photo }}
                        style={{
                          width: 60,
                          height: 60,
                        }}
                      />
                    </ImageContainer>

                    <FoodInfo>
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: "bold",
                        }}
                      >
                        {list.food_name}
                      </Text>

                      <View style={{ paddingTop: 8 }}>
                        {list.point ? (
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <FontAwesome
                              size={16}
                              name={"star"}
                              color={"#F5B041"}
                              style={{ marginRight: 10 }}
                            />
                            <Text>{list.point}</Text>
                            <Text>점</Text>
                          </View>
                        ) : (
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <FontAwesome
                              size={16}
                              name={"star-o"}
                              color={"#F5B041"}
                              style={{ marginRight: 10 }}
                            />
                            <Text>0</Text>
                            <Text>점</Text>
                          </View>
                        )}
                      </View>
                    </FoodInfo>

                    <View style={{ alignItems: "center", flex: 1 }}>
                      <MaterialIcons
                        name="navigate-next"
                        size={24}
                        color="#DFDFDF"
                      />
                    </View>
                  </Container>
                );
              })
            : null}
        </View>
      </ScrollView>
    ) : (
      <Loading />
    );
  }
}

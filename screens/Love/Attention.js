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
      list: null,
      call: null,
      dibs_list: [],
      show: false,
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
    await this.setState({ dibs_list: [], show: false });

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
    this.setState({ show: true });
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
    const { dibs_list, show } = this.state;
    return show ? (
      <ScrollView style={{ backgroundColor: "#f5f5f5" }}>
        <View style={{ alignItems: "center" }}>
          <Text></Text>
          {dibs_list
            ? dibs_list.map((list, key) => {
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

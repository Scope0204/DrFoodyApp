import React from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Alert,
  AsyncStorage,
} from "react-native";
import {
  FontAwesome,
  Ionicons,
  Feather,
  MaterialIcons,
} from "@expo/vector-icons";
import styled from "styled-components";
import axios from "axios"; // npm i axios@0.18.0
import Layout from "../../constants/Layout";

const { width, height } = Dimensions.get("screen");

const LIST_HEIGHT = Layout.height / 5;
const LIST_WIDTH = Layout.width - 20;

const Container = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  height: 50px;
  border-bottom-width: 1px;
  border-bottom-color: #eaecee;
`;

const ListContainer = styled.ScrollView`
  height: ${height}px;
  background-color: #f5f5f5;
`;

const ListBox = styled.TouchableOpacity`
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

const StarCon = styled.View`
  flex-direction: row;
  padding-top: 8px;
`;

export default class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: "",

      foodList: [],
      searchResult: false,
    };
  }

  info = async (food_id) => {
    const user_id = await AsyncStorage.getItem("User");
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

  searchFood = async () => {
    let { searchText } = this.state;
    console.log("검색물품 : " + searchText);

    //검색버튼 클릭시 기존 state값 초기화
    this.setState({ foodList: [] });

    //만일 검색어가 없는 경우
    if (searchText == "") {
      Alert.alert("검색어를 입력하세요");
    }
    // 검색어가 있는 경우
    else {
      try {
        await axios({
          method: "post",
          url: "http://3.34.97.97/api/app/searchFood",

          headers: {
            //응답에 대한 정보
            Accept: "application/json", // 서버가 json 타입으로 변환해서 사용
            "Content-Type": "application/json;charset=utf-8",
          },
          // 검색어를 보낸다 -> 포함된 food 데이터 다 가져옴
          data: {
            searchText: searchText,
          },
        }).then((response) => {
          console.log(response.data.indexOf("No Results Found")); // 아니면 -1 반환
          // -1이 아닌경우 , 즉 NO가 아닌경우
          if (response.data != "") {
            for (var key in response.data) {
              var List = response.data[key];
              var photo_path = "../../images/noImage.png"; // null 일때 쓸 사진 경로 넣으면 될듯
              if (List.photo !== null) {
                photo_path = List.food_photo;
              }
              this.setState({
                foodList: this.state.foodList.concat({
                  id: key,
                  food_id: List.food_id,
                  name: List.food_name,
                  photo: photo_path,
                  point: List.point,
                }),
              });
            }
            console.log(response.data);
          }
          // NO인경우
          else {
            Alert.alert("검색결과가 없습니다.");
          }
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  render() {
    let { foodList } = this.state;
    return (
      <View>
        <Container>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Ionicons
              size={30}
              name={"md-arrow-back"}
              style={{ marginRight: 30 }}
            ></Ionicons>
          </TouchableOpacity>
          <TextInput
            onChangeText={(searchText) => this.setState({ searchText })}
            placeholder="제품명 검색"
            style={{ width: width - 120, fontSize: 20 }}
          ></TextInput>
          <TouchableOpacity onPress={this.searchFood}>
            <Feather size={25} name={"search"}></Feather>
          </TouchableOpacity>
        </Container>

        <ListContainer>
          <View style={{ alignItems: "center" }}>
            <View
              style={{
                width: width,
                height: 20,
                backgroundColor: "#f5f5f5",
              }}
            />
            {foodList
              ? foodList.map((list, key) => {
                  return (
                    <ListBox key={key} onPress={() => this.info(list.food_id)}>
                      <ImageContainer>
                        <Image
                          source={{ uri: list.photo }}
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
                          {list.name}
                        </Text>

                        <StarCon>
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
                        </StarCon>
                      </FoodInfo>
                      <View style={{ alignItems: "center", flex: 1 }}>
                        <MaterialIcons
                          name="navigate-next"
                          size={24}
                          color="#DFDFDF"
                        />
                      </View>
                    </ListBox>
                  );
                })
              : null}
          </View>
        </ListContainer>
      </View>
    );
  }
}

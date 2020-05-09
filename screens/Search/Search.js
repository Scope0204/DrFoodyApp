import React from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import { FontAwesome, Ionicons, Feather } from "@expo/vector-icons";
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

const ListContainer = styled.ScrollView``;

const ListBox = styled.View`
  background-color: white;
  width: ${LIST_WIDTH}px;
  height: ${LIST_HEIGHT}px;
  border: 0px solid;
  border-radius: 5px;
  margin-bottom: 5px;
  margin-top: 10px;
  box-shadow: 2px 2px 2px gray;
  flex-direction: row;
  align-items: center;
`;

const ImageContainer = styled.View`
  margin-left: 20px;
  margin-right: 30px;
`;

const FoodInfo = styled.View`
  flex-direction: column;
`;

const StarCon = styled.View`
  flex-direction: row;
  margin-top: 10;
  margin-bottom: 10;
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
  info = (food_id) => {
    this.props.navigation.navigate("Detail", { Id: food_id });
  };

  searchFood = async () => {
    let { searchText, foodList } = this.state;
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
          //   url: "http://192.168.0.21/User_Site/SearchFood.php",
          url: "http://192.168.0.3/User_Site/SearchFood.php",
          // url: "http://15.164.224.142/app/SearchFood.php",

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
          // console.log(response);
          // -1 : 아닌경우 , 즉 NO가 아닌경우
          if (response.data.indexOf("No Results Found") == -1) {
            for (var key in response.data) {
              var List = response.data[key];
              var photo_path = "../../images/noImage.png"; // null 일때 쓸 사진 경로 넣으면 될듯
              if (List.photo !== null) {
                photo_path = List.photo;
              }
              this.setState({
                foodList: this.state.foodList.concat({
                  id: key,
                  food_id: List.food_id,
                  name: List.name,
                  photo: photo_path,
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
            {foodList
              ? foodList.map((list, key) => {
                  return (
                    <ListBox key={key}>
                      <ImageContainer>
                        <Image
                          source={{ uri: list.photo }}
                          style={{
                            width: 150,
                            height: 150,
                          }}
                        />
                      </ImageContainer>
                      <FoodInfo>
                        <Text style={{ fontSize: 24, fontWeight: "bold" }}>
                          {list.name}
                        </Text>
                        <StarCon>
                          <FontAwesome
                            size={16}
                            name={"star"}
                            color={"#F5B041"}
                            style={{ marginRight: 10 }}
                          />
                          <Text>1</Text>
                          <Text>/5</Text>
                        </StarCon>
                        <Text>sdsadasd</Text>
                        <View
                          style={{
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "#FF2257",
                            width: 100,
                            height: 30,
                            marginBottom: 5,
                            borderRadius: 10,
                          }}
                        >
                          <TouchableOpacity
                            onPress={() => this.info(list.food_id)}
                          >
                            <Text
                              style={{ color: "white", fontWeight: "bold" }}
                            >
                              Check this
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </FoodInfo>
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

import React from "react";
import {
  Text,
  View,
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

const ListBox = styled.TouchableOpacity`
  background-color: white;
  width: ${LIST_WIDTH}px;
  height: ${LIST_HEIGHT}px;
  border: 0px solid;
  border-radius: 5px;
  margin-bottom: 5px;
  margin-top: 10px;
  box-shadow: 2px 2px 2px gray;
`;

export default class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: "",
      foodName: [],
      foodPhoto: [],
      searchResult: false,
    };
  }

  searchFood = () => {
    let { searchText, foodName, foodPhoto } = this.state;
    console.log("검색물품 : " + searchText);

    //검색버튼 클릭시 기존 state값 초기화
    this.setState({ foodName: [], foodPhoto: [] });

    //만일 검색어가 없는 경우
    if (searchText == "") {
      Alert.alert("검색어를 입력하세요");
    }
    // 검색어가 있는 경우
    else {
      axios({
        method: "post",
        url: "http://192.168.200.175/User_Site/SearchFood.php",
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
        console.log(response);
        // -1 : 아닌경우 , 즉 NO가 아닌경우
        if (response.data.indexOf("No Results Found") == -1) {
          for (var key in response.data) {
            var List = response.data[key];
            // console.log(List.name);
            this.setState({ foodName: this.state.foodName.concat(List.name) });
            this.setState({
              foodPhoto: this.state.foodPhoto.concat(List.photo),
            });
          }
        }

        // NO인경우
        else {
          //   alert("ㄴㄴ ㅋㅋ");
        }
      });
    }
  };

  call = () => {
    const { foodName } = this.state;
    alert(foodName);
  };
  render() {
    let { searchText, foodName, foodPhoto } = this.state;
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
            {foodName != []
              ? foodName.map((kind) => {
                  return (
                    <ListBox>
                      <Text>{kind}</Text>
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

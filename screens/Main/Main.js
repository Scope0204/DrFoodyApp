import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  AsyncStorage,
  FlatList,
} from "react-native";
import styled from "styled-components";
import List from "../../components/List";
import SearchBar from "../../components/SearchBar";
import axios from "axios"; // npm i axios@0.18.0
import { EvilIcons, Octicons, Entypo, AntDesign } from "@expo/vector-icons";
import Address from "../../components/Address";

const { width, height } = Dimensions.get("window");

const Container = styled.ScrollView`
  background-color: #f5f5f5;
  height: ${height}px;
`;

const UserState = styled.View`
  width: ${width - 10}px;
  height: ${height / 8}px;
  border: 1px solid #F5F5F5 ;
  border-radius: 10px
  flex-direction: row;
  align-items: center;
  background-color: white;
  box-shadow : 2px 2px 2px #ECF0F1;

`;

const SelectContainer = styled.View`
  width: ${width}px;
  height: ${height / 3.7 + 5}px;
  flex-direction: row;
  margin-top: 5px;
  background-color: white;
`;

const CameraContainer = styled.View`
  width: ${width}px;
  align-items: center;
  margin-top: 5px;
`;

const CameraBtn = styled.TouchableOpacity`
  width: ${width - 10}px;
  height: ${height / 3.8}px;
  background-color: #ff5122;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  box-shadow: 1px 1px 1px gray;
`;

const CameraText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: white;
`;

export default class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user_name: "",
      user_photo: "",
      user_id: "",
      language_code: "",
      food_list: [],
      //위도 , 경도
      latitude: null,
      longitude: null,
    };
  }

  componentDidMount = async () => {
    const { navigation } = this.props;
    const User = navigation.getParam("User");
    AsyncStorage.setItem("UserName", User); // 유저 이름

    try {
      // 유저 정보 가져오기(이름과 사진)
      await axios({
        method: "post",
        url: "http://3.34.97.97/api/app/userList",

        headers: {
          Accept: "application/json", // 서버가 json 타입으로 변환해서 사용
          "Content-Type": "application/json; charset=utf-8",
        },
        data: {
          id: User,
        },
      }).then((response) => {
        console.log(response.data);
        if (response.data) {
          //   console.log(response.data.user_id);
          const user_photo = ""; // user_photo가 없으면 null을 반환해서 "" 으로 바꿔줌
          if (response.data.user_photo) {
            user_photo == response.data.user_photo;
          }
          this.setState({
            user_name: response.data.user_nickname,
            user_photo: user_photo,
            user_id: response.data.user_id,
            language_code: response.data.language_code,
          });
          //asyncstorage는 string형식으로만 저장가능
          // User의 user_id, language_code 가 이곳저곳 사용되니 asyncstorage에 저장

          AsyncStorage.setItem("User", JSON.stringify(response.data.user_id));
        } else {
          alert("no");
        }
      });
    } catch (err) {
      console.log(err);
    }

    //음식 리스트 가져오기
    try {
      await axios({
        url: "http://3.34.97.97/api/app/foodList",
      }).then((response) => {
        // console.log(response.data);
        if (response) {
          for (var key in response.data) {
            var List = response.data[key];
            this.setState({
              food_list: this.state.food_list.concat({
                id: key,
                food_id: List.food_id,
                name: List.food_name,
                photo: List.food_photo,
                point: List.point,
              }),
            });
          }
        } else {
          console.log("no");
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  // 제품 정보 페이지
  info = (name, food_id) => {
    this.props.navigation.navigate("Detail", { Name: name, Id: food_id });
  };

  render() {
    const { user_name, user_photo, food_list } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <View //커스텀 헤더
          style={{
            flex: 0.12,
            borderBottomColor: "black",
            borderBottomWidth: 0.5,
            alignItems: "center",
            justifyContent: "flex-end",
            paddingBottom: 10,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Address />
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Map")}
            >
              <AntDesign
                name={"downcircle"}
                size={18}
                color={"orange"}
                style={{ paddingLeft: 10 }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Container style={{ flex: 0.88 }}>
          <CameraContainer>
            <CameraBtn onPress={() => this.props.navigation.navigate("Camera")}>
              <Entypo size={120} name={"camera"} color={"white"} />
              <CameraText>제품 조회</CameraText>
            </CameraBtn>
          </CameraContainer>
          <View
            style={{
              alignItems: "center",
              marginTop: 10,
              marginBottom: 10,
              alignItems: "center",
            }}
          >
            <UserState>
              {user_photo == "" ? (
                <EvilIcons size={120} name={"user"} color={"black"} />
              ) : (
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
                    source={{
                      uri: user_photo,
                    }}
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: 100,
                    }}
                  />
                </View>
              )}
              <View style={{ flexDirection: "column" }}>
                <Text style={{ fontSize: 23 }}>{user_name}</Text>
                <Text>한국에 있습니다</Text>
              </View>
            </UserState>
          </View>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Search")}
              style={{ marginBottom: 5 }}
            >
              <SearchBar />
            </TouchableOpacity>
          </View>
          <SelectContainer>
            {/* <FoodSlider info={this.info} /> */}
            <View
              style={{
                marginTop: 5,
                height: height / 3.2,
                backgroundColor: "white",
                borderBottomWidth: 1,
                borderBottomColor: "#ECF0F1",
                flex: 1,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 20,
                    marginLeft: 20,
                    marginTop: 20,
                    // backgroundColor: "red",
                  }}
                >
                  제품 리스트
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    marginRight: 20,
                    marginTop: 25,
                    color: "#808B96",
                  }}
                >
                  더보기
                </Text>
              </View>

              <FlatList
                data={food_list}
                keyExtractor={(item) => item.name}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => <List list={item} />}
                info={this.info}
                style={{ paddingLeft: 0 }}
              />
            </View>
          </SelectContainer>
        </Container>
      </View>
    );
  }
}

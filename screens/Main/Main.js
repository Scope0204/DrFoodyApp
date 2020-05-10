import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  AsyncStorage,
} from "react-native";
import styled from "styled-components";
import AdSlider from "../../components/AdSlider";
import FoodSlider from "../../components/FoodSlider";
import SearchBar from "../../components/SearchBar";
import axios from "axios"; // npm i axios@0.18.0
import { EvilIcons, Octicons, Entypo } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const Container = styled.ScrollView`
  background-color: white;
`;

const UserState = styled.View`
  width: ${width - 10}px;
  height: ${height / 8}px;
  border: 1px solid black;
  border-radius: 10px
  flex-direction: row;
  align-items: center;
`;

const SelectContainer = styled.View`
  width: ${width}px;
  height: ${height / 3.7 + 5}px;
  flex-direction: row;
  margin-top: 15px;
`;

const CameraContainer = styled.View`
  width: ${width / 2}px;
  align-items: center;
`;

const CameraBtn = styled.TouchableOpacity`
  width: ${width / 2 - 10}px;
  height: ${height / 3.7}px;
  background-color: #ff5122;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
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
      food_name: [],
      call: [],
    };
  }

  componentDidMount = async () => {
    const { navigation } = this.props;
    const User = navigation.getParam("User");

    try {
      // 유저 정보 가져오기(이름과 사진)
      await axios({
        method: "post",
        //   url: "http://15.164.224.142/app/UserList.php",
        // url: "http://192.168.0.3/User_Site/UserList.php",
        url: "http://192.168.0.119/User_Site/UserList.php",

        headers: {
          Accept: "application/json", // 서버가 json 타입으로 변환해서 사용
          "Content-Type": "application/json; charset=utf-8",
        },
        data: {
          id: User,
        },
      }).then((response) => {
        if (response.data) {
          // console.log(response.data[0].user_id);
          // User의 user_id, language_code 가 이곳저곳 사용되니 asyncstorage에 저장
          AsyncStorage.setItem("User", response.data[0].user_id);
          AsyncStorage.setItem("Language", response.data[0].language_code);

          this.setState({ user_name: response.data[0].nickname });
          this.setState({ user_photo: response.data[0].photo });
        } else {
          alert("no");
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
    const { user_name, user_photo } = this.state;

    return (
      <Container>
        <AdSlider />
        <View
          style={{
            alignItems: "center",
            marginTop: 20,
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
        <View style={{ alignItems: "center", marginTop: 7 }}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Search")}
          >
            <SearchBar />
          </TouchableOpacity>
        </View>
        <SelectContainer>
          <CameraContainer>
            <CameraBtn onPress={() => this.props.navigation.navigate("Camera")}>
              <Entypo size={120} name={"camera"} color={"white"} />
              <CameraText>제품 조회</CameraText>
            </CameraBtn>
          </CameraContainer>
          <FoodSlider info={this.info} />
        </SelectContainer>
      </Container>
    );
  }
}

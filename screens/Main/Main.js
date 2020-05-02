import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  TouchableOpacityBase,
} from "react-native";
import styled from "styled-components";
import AdSlider from "../../components/AdSlider";
import FoodSlider from "../../components/FoodSlider";
import SearchBar from "../../components/SearchBar";
import axios from "axios"; // npm i axios@0.18.0
import { EvilIcons, Octicons, Entypo } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const Container = styled.ScrollView`
  background-color: #f9f9f9;
`;

const UserState = styled.View`
  width: ${width - 30}px;
  height: 60px;
  flex-direction: row;
  justify-content: center;
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

const FoodContainer = styled.View``;

export default class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user_name: "",
      user_photo: "",
      food_name: [],
    };
  }

  //   info = () => {
  //     const { food_name } = this.state;
  //     this.props.info();
  //     alert(food_name);
  //   };

  componentDidMount = () => {
    const { navigation } = this.props;
    const User = navigation.getParam("User");

    // 유저 정보 가져오기(이름과 사진)
    axios({
      method: "post",
      url: "http://192.168.200.175/User_Site/UserList.php",
      headers: {
        Accept: "application/json", // 서버가 json 타입으로 변환해서 사용
        "Content-Type": "application/json;charset=utf-8",
      },
      data: {
        id: User,
      },
    }).then((response) => {
      if (response.data) {
        this.setState({ user_name: response.data[0].nickname });
        this.setState({ user_photo: response.data[0].photo });
      } else {
        alert("no");
      }
    });
  };

  info = (e) => {
    this.props.navigation.navigate("Detail", { Name: e });
  };

  render() {
    const { user_name, user_photo } = this.state;

    return (
      <Container>
        <View
          style={{
            alignItems: "center",
            marginTop: 10,
            marginBottom: 10,
            backgroundColor: "#d5d8dc",
          }}
        >
          <UserState>
            {user_photo == "" ? (
              <EvilIcons size={30} name={"user"} color={"#565656"} />
            ) : (
              <Image
                source={{ uri: user_photo }}
                style={{ width: 30, height: 30 }}
              />
            )}

            <Text>{user_name}님 안녕하세요</Text>
          </UserState>
        </View>

        <AdSlider />

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

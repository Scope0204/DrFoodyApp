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
import { EvilIcons, Octicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const CameraBtn = styled.TouchableOpacity``;

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

export default class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user_name: "",
      user_photo: "",
      food_list: [],
    };
  }

  componentDidMount = () => {
    const { navigation } = this.props;
    const User = navigation.getParam("User");
    const { food_list } = this.state;

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

  info = () => {
    this.props.foodName();
  };

  render() {
    const { user_name, user_photo, food_list } = this.state;
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

        <View style={{ alignItems: "center", marginTop: 5 }}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Search")}
          >
            <SearchBar />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Detail")}
        >
          <Text>GO to Detail</Text>
        </TouchableOpacity>
        <CameraBtn onPress={() => this.props.navigation.navigate("Camera")}>
          <Text>GO to Photo</Text>
        </CameraBtn>
        <View>
          <FoodSlider />
        </View>
      </Container>
    );
  }
}

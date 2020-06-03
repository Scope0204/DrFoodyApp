import React from "react";
import { View, Text, Dimensions, AsyncStorage, Image } from "react-native";
import styled, { keyframes } from "styled-components";
import axios from "axios"; // npm i axios@0.18.0
import {
  FontAwesome,
  EvilIcons,
  Octicons,
  Entypo,
  AntDesign,
} from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const UserOptions = styled.View``;

const Container = styled.ScrollView`
  background-color: #f5f5f5;
  height: ${height}px;
`;

export default class User extends React.Component {
  state = {
    user: [],
  };
  componentDidMount = async () => {
    const User = await AsyncStorage.getItem("UserName"); // 유저이름

    try {
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
      })
        .then((response) => {
          console.log(response.data);
          const list = response.data;
          this.setState({
            user: this.state.user.concat({
              id: list.id,
              language_code: list.language_code,
              country_code: list.country_code,
              user_birth: list.user_birth,
              user_hot: list.user_hot,
              user_sweet: list.user_sweet,
              user_salty: list.user_salty,
              user_sour: list.user_sour,
              user_bitter: list.user_bitter,
              user_photo: list.user_photo,
              user_nickname: list.user_nickname,
              user_sex: list.user_sex,
            }),
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { user } = this.state;
    return (
      <Container>
        <UserOptions>
          {user
            ? user.map((list, key) => {
                return (
                  <View key={key}>
                    <View style={{ flexDirection: "row" }}>
                      {/* <Image
                        source={{ uri: list.user_photo }}
                        style={{ width: 120, height: 120 }}
                      /> */}
                      <Image
                        source={require("../../images/user.png")}
                        style={{ width: 120, height: 120 }}
                      />
                      <Text>{list.user_nickname}</Text>
                    </View>
                    <Text>{list.user_birth}</Text>
                    <Text>{list.country_code}</Text>
                    <Text>{list.user_hot}</Text>
                    <Text>{list.user_bitter}</Text>
                    <Text>{list.user_salty}</Text>
                    <Text>{list.user_sour}</Text>
                    <Text>{list.user_salty}</Text>
                    <Text>{list.user_sex}</Text>
                  </View>
                );
              })
            : null}
        </UserOptions>
      </Container>
    );
  }
}

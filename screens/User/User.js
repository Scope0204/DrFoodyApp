import React from "react";
import {
  View,
  Text,
  Dimensions,
  AsyncStorage,
  Image,
  TouchableHighlightBase,
} from "react-native";
import styled, { keyframes } from "styled-components";
import axios from "axios"; // npm i axios@0.18.0
import {
  FontAwesome,
  EvilIcons,
  Octicons,
  Entypo,
  AntDesign,
} from "@expo/vector-icons";
import { PieChart, ProgressChart } from "react-native-chart-kit";
import TasteGraph from "../../components/TasteGraph";

const { width, height } = Dimensions.get("window");

const chartConfig = {
  color: (opacity = 0) => `rgb(0, 0, 0, ${opacity})`,
};

const Bar = styled.View`
  background-color: #f5f5f5;
  height: 5px;
  width: ${width}px;
`;

const UserOptions = styled.View``;

const Container = styled.View``;

const ImgAge = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: white;
  padding-left: 20px;
  margin-top: 15px;
  padding-bottom: 15px;
`;

const AvoidCon = styled.View`
  margin-top: 15px;
  padding-bottom: 15px;
`;

const TasteCon = styled.View`
  margin-top: 15px;
  padding-bottom: 15px;
`;

const Title = styled.Text`
  font-weight: bold;
  font-size: 20px;
  margin-left: 20px;
  margin-bottom: 15px;
`;

const DivBox = styled.View`
  flex-direction: row;
  flex-wrap : wrap
  border-radius: 10px;
  width: ${width - 30}px;
  height: ${height / 7.5}px;
  border-width: 2px;
  border-color: #b8b8b8;
  background-color: #fcfcfc;
  padding: 15px;
`;
const GraphBox = styled.View`
  background-color: white;
  width: ${width - 30}px;
  height: ${height / 2.7}px;
  border: 0px solid;
  border-radius: 10px;
  margin-top: 5px;
  box-shadow: 1px 1px 2px gray;
  flex-direction: row;
  align-items: center;
`;
// 맛 바
const TasteBar = styled.View`
  border-radius: 10px;
  height: 5px;
  background-color: gray;
  width: ${width - 100}px;
  margin-top: 30px;
  margin-bottom: 20px;
`;

export default class User extends React.Component {
  state = {
    user: [],
    show: false,
    avoid: [],
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
          this.setState({
            avoid: list.keyword,
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
    const { user, avoid } = this.state;
    return (
      <Container>
        <UserOptions>
          {user
            ? user.map((list, key) => {
                return (
                  <View key={key}>
                    <Bar />
                    <ImgAge>
                      {/* <Image
                        source={{ uri: list.user_photo }}
                        style={{ width: 120, height: 120 }}
                      /> */}
                      <FontAwesome
                        name="user-circle-o"
                        size={80}
                        color="black"
                      />
                      {list.country_code == 410 ? (
                        <Image
                          source={require("../../images/country/korea.png")}
                          style={{
                            width: 40,
                            height: 40,
                            marginLeft: 20,
                            marginRight: 10,
                          }}
                        />
                      ) : null}
                      <Text style={{ fontSize: 20 }}>
                        {list.user_nickname}
                        {" ("}
                        {2020 - parseInt(list.user_birth.substring(0, 4))}
                        {")"}
                      </Text>
                    </ImgAge>
                    <Bar />
                    <AvoidCon>
                      <Title>기피 원재료</Title>
                      <View style={{ alignItems: "center" }}>
                        <DivBox>
                          <Text style={{ fontSize: 18 }}>{avoid}</Text>
                        </DivBox>
                      </View>
                    </AvoidCon>
                    <Bar />
                    <TasteCon>
                      <Title>맛 선호도</Title>
                      <View style={{ alignItems: "center" }}>
                        <GraphBox>
                          <TasteGraph user={user} />
                        </GraphBox>
                      </View>
                    </TasteCon>
                  </View>
                );
              })
            : null}
        </UserOptions>
        <View></View>
      </Container>
    );
  }
}

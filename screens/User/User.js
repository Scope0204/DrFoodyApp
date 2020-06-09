import React from "react";
import { View, Text, Dimensions, AsyncStorage, Image } from "react-native";
import styled from "styled-components";
import axios from "axios"; // npm i axios@0.18.0
import { FontAwesome } from "@expo/vector-icons";
import TasteGraph from "../../components/TasteGraph";
import Svg, { Polygon } from "react-native-svg";

const { width, height } = Dimensions.get("window");

const chartConfig = {
  color: (opacity = 0) => `rgb(0, 0, 0, ${opacity})`,
};

const Bar = styled.View`
  background-color: #f5f5f5;
  height: 5px;
  width: ${width}px;
`;

const UserOptions = styled.View`
  background-color: white;
`;

const Container = styled.ScrollView`
  background-color: #f5f5f5;
`;

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
  height: ${height / 8.5}px;
  border-width: 2px;
  border-color: #b8b8b8;
  background-color: #fcfcfc;
  padding: 15px;
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
                    <TasteCon>
                      <Title>맛 선호도</Title>
                      <View style={{ alignItems: "center" }}>
                        {/* <TasteGraph user={user} /> */}
                        <View>
                          <Text
                            style={{
                              color: "red",
                              fontSize: 16,
                            }}
                          >
                            매운
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: 0,
                            marginTop: -30,
                          }}
                        >
                          <Text
                            style={{
                              marginRight: -40,
                              marginTop: -85,
                              color: "blue",
                              fontSize: 16,
                            }}
                          >
                            짠
                          </Text>
                          <View style={{ marginLeft: 20 }}>
                            <Svg height="400" width="400">
                              <Polygon
                                points="190,40 350,160 280,330 100,330 30,160"
                                fill="#F9F9F9"
                                stroke="#DCDCDC"
                                strokeWidth="1"
                              />
                              <Polygon
                                points="190,70 318,166 262,302 118,302 62,166"
                                fill="#F9F9F9"
                                stroke="#DCDCDC"
                                strokeWidth="1"
                              />
                              <Polygon
                                points="190,100 286,172 244,274 136,274 94,172"
                                fill="#F9F9F9"
                                stroke="#DCDCDC"
                                strokeWidth="1"
                              />
                              <Polygon
                                points="190,130 254,178 226,246 154,246 126,178"
                                fill="#F9F9F9"
                                stroke="#DCDCDC"
                                strokeWidth="1"
                              />
                              <Polygon
                                points="190,160 222,184 208,218 172,218 158,184"
                                fill="white"
                                stroke="#DCDCDC"
                                strokeWidth="1"
                              />

                              <Polygon
                                points={`190,${190 - list.user_hot * 30} ${
                                  190 + list.user_sweet * 32
                                },${190 - list.user_sweet * 6} ${
                                  190 + list.user_sour * 18
                                },${190 + list.user_sour * 28} ${
                                  190 - list.user_bitter * 18
                                },${190 + list.user_bitter * 28} ${
                                  190 - list.user_salty * 32
                                },${190 - list.user_salty * 6}`}
                                fill="rgba(255, 81, 34, 0.8)"
                              />
                            </Svg>
                          </View>

                          <Text
                            style={{
                              marginLeft: -40,
                              marginTop: -85,
                              color: "orange",
                              fontSize: 16,
                            }}
                          >
                            단
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            width: 215,
                          }}
                        >
                          <Text
                            style={{
                              marginTop: -60,
                              color: "green",
                              fontSize: 16,
                            }}
                          >
                            쓴
                          </Text>
                          <Text
                            style={{
                              marginTop: -60,
                              color: "#F9E415",
                              fontSize: 16,
                            }}
                          >
                            신
                          </Text>
                        </View>
                      </View>
                    </TasteCon>

                    <Bar />
                    <AvoidCon>
                      <Title>기피 원재료</Title>
                      <View style={{ alignItems: "center" }}>
                        <DivBox>
                          <Text style={{ fontSize: 16 }}>{avoid}</Text>
                        </DivBox>
                      </View>
                    </AvoidCon>
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

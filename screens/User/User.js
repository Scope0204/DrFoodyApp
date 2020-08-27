import React from "react";
import {
  View,
  Text,
  Dimensions,
  AsyncStorage,
  Image,
  TouchableOpacity,
} from "react-native";
import styled from "styled-components";
import axios from "axios"; // npm i axios@0.18.0
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import TasteGraph from "../../components/TasteGraph";
import Svg, { Polygon } from "react-native-svg";

const { width, height } = Dimensions.get("window");

const chartConfig = {
  color: (opacity = 0) => `rgb(0, 0, 0, ${opacity})`,
};

const Bar = styled.View`
  background-color: #f5f5f5;
  height: 10px;
  width: ${width}px;
`;

const UserOptions = styled.View`
  background-color: white;
`;

const Container = styled.ScrollView`
  background-color: #f5f5f5;
`;

const ImgAge = styled.TouchableOpacity`
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

const TasteTitle = styled.View`
  margin-top: 15px;
  padding-bottom: 10px;
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
  border-width: 1px;
  border-color: #b8b8b8;
  background-color: #FAFAFA;
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
                    <ImgAge
                      activeOpacity={0.8}
                      onPress={() =>
                        this.props.navigation.navigate("UserDetail")
                      }
                    >
                      <Image
                        style={{
                          width: 80,
                          height: 80,
                          resizeMode: "contain",
                        }}
                        source={require("../../images/user.png")}
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
                      ) : list.country_code == 392 ? (
                        <Image
                          source={require("../../images/country/japan.png")}
                          style={{
                            width: 40,
                            height: 40,
                            marginLeft: 20,
                            marginRight: 10,
                          }}
                        />
                      ) : list.country_code == 840 ? (
                        <Image
                          source={require("../../images/country/america.png")}
                          style={{
                            width: 40,
                            height: 40,
                            marginLeft: 20,
                            marginRight: 10,
                          }}
                        />
                      ) : null}

                      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                        {list.user_nickname}
                        {" ("}
                        {2020 - parseInt(list.user_birth.substring(0, 4))}
                        {")"}
                      </Text>

                      <View
                        style={{
                          alignItems: "flex-end",
                          flex: 1,
                          paddingRight: 10,
                        }}
                      >
                        <MaterialIcons
                          name="navigate-next"
                          size={40}
                          color="#DFDFDF"
                        />
                      </View>
                    </ImgAge>

                    <View
                      style={{
                        backgroundColor: "#f5f5f5",
                        height: 1.5,
                        width: width,
                      }}
                    />

                    <AvoidCon>
                      <Title>注意すべき原材料</Title>
                      <View style={{ alignItems: "center" }}>
                        <DivBox>
                          <Text style={{ fontSize: 16 }}>{avoid}</Text>
                        </DivBox>
                      </View>
                    </AvoidCon>

                    <View
                      style={{
                        backgroundColor: "#f5f5f5",
                        height: 1.5,
                        width: width,
                      }}
                    />

                    <TasteTitle>
                      <Title>味選好度</Title>
                    </TasteTitle>

                    <View style={{ alignItems: "center" }}>
                      <View>
                        <Text
                          style={{
                            color: "red",
                            fontSize: 16,
                            fontWeight: "bold",
                          }}
                        >
                          辛口
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginTop: -55,
                        }}
                      >
                        <Text
                          style={{
                            marginRight: -65,
                            marginTop: -70,
                            color: "blue",
                            fontSize: 16,
                            fontWeight: "bold",
                          }}
                        >
                          塩味
                        </Text>
                        <View style={{ marginLeft: 20 }}>
                          <Svg height="400" width="400">
                            <Polygon
                              points="190,70 318,166 262,302 118,302 62,166"
                              fill="white"
                              stroke="#EEEBEB"
                              strokeWidth="1"
                            />
                            <Polygon
                              points="190,94 292.4,170.8 247.6,279.6 132.4,279.6 87.6,170.8"
                              fill="white"
                              stroke="#EEEBEB"
                              strokeWidth="1"
                            />
                            <Polygon
                              points="190,118 266.8,175.6 233.2,257.2 146.8,257.2 113.2,175.6"
                              fill="white"
                              stroke="#EEEBEB"
                              strokeWidth="1"
                            />
                            <Polygon
                              points="190,142 241.2,180.4 218.8,234.8 161.2,234.8 161.2,234.8 138.8,180.4"
                              fill="white"
                              stroke="#EEEBEB"
                              strokeWidth="1"
                            />
                            <Polygon
                              points="190,166 215.6,185.2 204.4,212.4 175.6,212.4 164.4,185.2"
                              fill="white"
                              stroke="#EEEBEB"
                              strokeWidth="1"
                            />

                            <Polygon
                              points={`190,${190 - list.user_hot * 24} ${
                                190 + list.user_sweet * 25.6
                              },${190 - list.user_sweet * 4.8} ${
                                190 + list.user_sour * 14.4
                              },${190 + list.user_sour * 22.4} ${
                                190 - list.user_bitter * 14.4
                              },${190 + list.user_bitter * 22.4} ${
                                190 - list.user_salty * 25.6
                              },${190 - list.user_salty * 4.8}`}
                              fill="rgba(255, 81, 34, 0.8)"
                            />
                          </Svg>
                        </View>
                        <Text
                          style={{
                            marginLeft: -65,
                            marginTop: -70,
                            color: "orange",
                            fontSize: 16,
                            fontWeight: "bold",
                          }}
                        >
                          甘口
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          width: 190,
                        }}
                      >
                        <Text
                          style={{
                            marginTop: -80,
                            color: "green",
                            fontSize: 16,
                            fontWeight: "bold",
                          }}
                        >
                          苦味
                        </Text>
                        <Text
                          style={{
                            marginTop: -80,
                            color: "#F9E415",
                            fontSize: 16,
                            fontWeight: "bold",
                          }}
                        >
                          酸味
                        </Text>
                      </View>
                    </View>

                    <View
                      style={{
                        backgroundColor: "#f5f5f5",
                        height: 1.5,
                        width: width,
                      }}
                    />

                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        height: 120,
                      }}
                    >
                      <TouchableOpacity
                        style={{
                          width: width - 70,
                          height: 50,
                          backgroundColor: "#F6F6F6",
                          borderWidth: 2,
                          borderColor: "#D5D0D0",
                          borderRadius: 10,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        onPress={() => this.props.navigation.navigate("Login")}
                      >
                        <Text
                          style={{
                            fontSize: 18,
                            color: "#E43E3E",
                            fontWeight: "bold",
                          }}
                        >
                          로그아웃
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })
            : null}
        </UserOptions>
        <Bar />
      </Container>
    );
  }
}

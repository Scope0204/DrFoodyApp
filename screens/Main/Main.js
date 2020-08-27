import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  AsyncStorage,
  FlatList,
  ActivityIndicator,
} from "react-native";
import styled from "styled-components";
import List from "../../components/List";
import SearchBar from "../../components/SearchBar";
import axios from "axios"; // npm i axios@0.18.0
import { FontAwesome, Entypo, AntDesign } from "@expo/vector-icons";
import Address from "../../components/Address";
import { LinearGradient } from "expo-linear-gradient";
import StartModal from "../../components/StartModal";
import Loading from "../../components/Loading";

const { width, height } = Dimensions.get("window");

const Bar = styled.View`
  background-color: #f5f5f5;
  height: 1px;

  width: ${width - 30}px;
`;

const Container = styled.View`
  background-color: #ff5122;
  flex: 1;
`;

const ContainerOne = styled.View`
  flex: 1;
`;

const ContainerTwo = styled.View`
  flex: 2.7;
  background-color: #fff;
  border-top-right-radius: 30px;
  border-top-left-radius: 30px;
`;

const LoveCon = styled.TouchableOpacity`
  flex: 1;
  background-color: white;
  margin: 8px;
  border-radius: 10px;
  border: #ecf0f1 2px;
  justify-content: center;
  align-items: center;
`;
const LoveTxt = styled.Text`
  padding-top: 10px;
  font-weight: bold;
  color: #5a5858;
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
      show: false,
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
        // console.log(response.data);
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

    // 랭킹 리스트
    try {
      await axios({
        method: "post",
        url: "http://3.34.97.97/api/app/rankList",
        headers: {
          Accept: "application/json", // 서버가 json 타입으로 변환해서 사용
          "Content-Type": "application/json; charset=utf-8",
        },
        data: {
          category: 0,
          sex: 2, //성별
          age: 0, //나이
          country: 0, //국가
          date: 4, // 기간
        },
      })
        .then((response) => {
          if (response) {
            console.log(response.data);
            for (var key = 0; key < 10; key++) {
              var list = response.data[key];
              this.setState({
                food_list: this.state.food_list.concat({
                  id: key,
                  ranking: parseInt(key) + 1,
                  name: list.food_name,
                  photo: list.food_photo,
                  point: list.rPoint, // 좋아요
                  view: list.order_point, // 조회수
                  review: list.rCount, // 리뷰
                }),
              });
            }
          }
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
    this.setState({ show: true });
  };

  render() {
    const { user_name, user_photo, food_list, show } = this.state;

    return show ? (
      <Container>
        <StartModal />
        <View style={{ position: "absolute", zIndex: 1, top: -40 }}>
          <Image
            style={{
              width: 500,
              height: 300,
              resizeMode: "contain",
            }}
            source={require("../../images/dot.png")}
          />
        </View>
        <LinearGradient
          colors={["#FDBC7B", "#FD9E3F"]}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            height: 400,
          }}
        />

        <ContainerOne>
          <View
            style={{
              flex: 1,
            }}
          ></View>

          <View
            style={{
              flex: 1.5,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginLeft: 5,
              marginBottom: 10,
            }}
          >
            <View style={{ flex: 1 }}>
              <Image
                style={{
                  width: 70,
                  height: 70,
                  resizeMode: "contain",
                  marginLeft: 10,
                }}
                source={require("../../images/user.png")}
              />
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "bold",
                  color: "white",
                  paddingLeft: 20,
                }}
              >
                Hi,{" " + user_name}
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "500",
                  color: "white",
                  paddingLeft: 20,
                  paddingTop: 5,
                }}
              >
                製品を検索してみてください
              </Text>
            </View>
          </View>
        </ContainerOne>
        <View style={{ position: "absolute", top: 48, right: 0, zIndex: 1 }}>
          <Image
            style={{
              width: 200,
              height: 200,
              resizeMode: "contain",
            }}
            source={require("../../images/iller.png")}
          />
        </View>

        <ContainerTwo>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Search")}
            style={{ alignItems: "center", marginTop: 40, marginBottom: 20 }}
            activeOpacity={0.6}
          >
            <SearchBar />
          </TouchableOpacity>

          <View style={{ flex: 0.8, marginBottom: 10 }}>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 18,
                }}
              >
                My page
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                flex: 1,
                marginTop: 0,
                marginBottom: 10,
              }}
            >
              <LoveCon
                style={{ marginLeft: 20 }}
                onPress={() => this.props.navigation.navigate("Atention")}
              >
                <Entypo name="heart-outlined" size={46} color="#E43E3E" />
                <LoveTxt>お気に入り商品</LoveTxt>
              </LoveCon>
              <LoveCon
                onPress={() => this.props.navigation.navigate("SearchList")}
              >
                <AntDesign name="search1" size={46} color="gray" />

                <LoveTxt>照会リスト</LoveTxt>
              </LoveCon>
              <LoveCon
                style={{ marginRight: 20 }}
                onPress={() => this.props.navigation.navigate("CurationScreen")}
              >
                <AntDesign name="like2" size={46} color="#1E6EF1" />

                <LoveTxt>キュレーション</LoveTxt>
              </LoveCon>
            </View>
          </View>

          <View style={{ flex: 1.5 }}>
            <View style={{ alignItems: "center" }}></View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                paddingBottom: 10,
                paddingTop: 10,
                // backgroundColor: "red",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 18,
                }}
              >
                Ranking List
              </Text>
            </View>
            <FlatList
              data={food_list}
              keyExtractor={(item) => item.name}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => <List list={item} />}
              info={this.info}
            />
          </View>
        </ContainerTwo>
      </Container>
    ) : (
      <Loading />
    );
  }
}

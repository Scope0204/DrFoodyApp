import React from "react";
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";
import { AntDesign, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import styled from "styled-components";

import Material from ".././Detail/Material";
import Review from ".././Detail/Review";
import Taste from ".././Detail/Taste";
import axios from "axios"; // npm i axios@0.18.0

const { width, height } = Dimensions.get("window");

//뒤로가기 , 제품 , 별점 , 좋아요가 담기는 뷰
const FoodScreen = styled.View`
  flex: 0.8;
  align-items: center;
  justify-content: center;
  margin-top: 25px;
`;

const BackBtn = styled.TouchableOpacity`
  position: absolute;
  top: 40px;
  left: 20px;
`;

//
const Page = styled.ScrollView`
  flex: 1;
  background-color: white;
`;

const ButtonView = styled.View`
  background-color: white;
  flex-direction: row;
  height: 50px;
`;

const Button1 = styled.TouchableOpacity`
  width: ${width / 3};
  border: 0.5px #abb2b9;
  align-items: center;
  justify-content: center;
`;

const Button2 = styled.TouchableOpacity`
  width: ${width / 3};
  border: 0.5px #abb2b9;
  align-items: center;
  justify-content: center;
`;

const Button3 = styled.TouchableOpacity`
  width: ${width / 3};
  border: 0.5px #abb2b9;
  align-items: center;
  justify-content: center;
`;

const ReviewBtn = styled.TouchableOpacity`
  background-color: #ff5122;
  align-items: center;
  justify-content: center;
  position: relative;
  top: -50px;
  left: ${width - 80}px;
  width: 65px;
  height: 65px;
  border-radius: 100px;
  box-shadow: 1px 1px 1px gray;
`;

export default class Detail extends React.Component {
  state = {
    one: true,
    two: false,
    three: false,
    food_name: null,
    food_photo: null,
    heart: false,
    user_id: null,
  };

  componentDidMount = async () => {
    //푸드 정보 초기화 (올때마다 바뀌니깐) <-- 이거 필요할까? 서버 연결되면 지워보자
    // this.setState({ food: [] });

    // 음식 id
    const { navigation } = this.props;
    const food_id = navigation.getParam("Id");

    // 유저 id
    const post_id = await AsyncStorage.getItem("User"); // 문자열로 읽힘
    this.setState({ user_id: post_id });

    //음식정보 가져오기
    try {
      await axios({
        method: "post",
        url: "http://15.164.224.142/api/app/detailFood",

        headers: {
          //응답에 대한 정보
          Accept: "application/json", // 서버가 json 타입으로 변환해서 사용
          "Content-Type": "application/json",
        },
        data: {
          food_id: food_id,
        },
      })
        .then((response) => {
          if (response) {
            this.setState({
              food_name: response.data.food_name,
              food_photo: response.data.food_photo,
            });
          } else {
            console.log("no");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (err) {
      console.log(err);
    }

    try {
      //찜목록 가져오기
      await axios({
        method: "post",
        url: "http://15.164.224.142/api/app/heartList",

        headers: {
          //응답에 대한 정보
          Accept: "application/json", // 서버가 json 타입으로 변환해서 사용
          "Content-Type": "application/json",
        },
        data: {
          //   page: "Detail",
          user_id: post_id,
          food_id: food_id,
        },
      })
        .then((response) => {
          //   console.log("찜목록");
          if (response.data == "OK") {
            console.log("찜 되어있음");
            // console.log(response.data);
            this.setState({ heart: true });
          } else {
            console.log("안대있음");
            // console.log(response.data);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (err) {
      console.log(err);
    }
  };

  heart = () => {
    const { heart } = this.state;
    if (heart == false) {
      // 찜목록이 아닌경우
      this.setState({ heart: true });
    } else {
      this.setState({ heart: false });
    }
    this.heartSave();
  };

  // 하트 저장
  heartSave = async () => {
    const { heart } = this.state;
    let post_heart;
    if (heart == true) {
      post_heart = false;
    } else {
      post_heart = true;
    }
    //찜목록 => 유저아이디와 food_id가 필요하다
    //유저 아이디
    const { user_id } = this.state;
    //음식 아이디
    const { navigation } = this.props;
    const food_id = navigation.getParam("Id");

    try {
      // 외래키와 찜유무를 보낸다
      await axios({
        method: "post",
        url: "http://15.164.224.142/api/app/dibsFood",
        // url: "http://192.168.0.3/User_Site/DibsFood.php",

        headers: {
          //응답에 대한 정보
          Accept: "application/json", // 서버가 json 타입으로 변환해서 사용
          "Content-Type": "application/json",
        },
        data: {
          user_id: user_id,
          food_id: food_id,
          heart: post_heart, // true 또는 false
        },
      })
        .then((response) => {
          if (response) {
            console.log(response);
          } else {
            console.log("no");
          }
        })
        .catch((error) => console.log(error));
    } catch (err) {
      console.log(err);
    }
  };

  // 리뷰 페이지로 이동
  move = () => {
    const { navigation } = this.props;
    const food_id = navigation.getParam("Id");
    const { food_photo, food_name } = this.state;
    this.setState({ three: false, one: true });
    this.props.navigation.navigate("Review", {
      Food_id: food_id,
      Food_photo: food_photo,
      Food_name: food_name,
    });
  };

  // 수정페이지로 이동 (댓글 전체 정보를 전달)
  update = (e) => {
    this.setState({ three: false, one: true });
    this.props.navigation.navigate("Update", { Info: e });
  };

  render() {
    const { one, two, three, heart, food_name, food_photo } = this.state;
    // console.log(this.state);
    const { navigation } = this.props;
    const food_id = navigation.getParam("Id");

    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <FoodScreen>
          <BackBtn onPress={() => this.props.navigation.navigate("Main")}>
            <MaterialIcons
              size={27}
              name={"arrow-back"}
              color={"black"}
            ></MaterialIcons>
          </BackBtn>
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                fontSize: 27,
                fontWeight: "600",
                marginBottom: 20,
                marginTop: 20,
              }}
            >
              {food_name}
            </Text>
            {food_photo ? (
              <Image
                source={{ uri: food_photo }}
                style={{
                  width: 200,
                  height: 200,
                }}
              />
            ) : null}
          </View>
        </FoodScreen>
        <View
          style={{ alignItems: "flex-end", marginBottom: 20, marginRight: 20 }}
        >
          <TouchableOpacity onPress={this.heart}>
            {heart ? (
              <AntDesign size={26} name={"heart"} color={"red"} />
            ) : (
              <AntDesign size={26} name={"hearto"} />
            )}
          </TouchableOpacity>
        </View>

        <ButtonView>
          <Button1
            onPress={() =>
              this.setState({ one: true, two: false, three: false })
            }
            activeOpacity={1}
            style={[one ? styles.border : null]}
          >
            <Text style={[one ? styles.click : styles.noClick]}>원재료</Text>
          </Button1>
          <Button2
            onPress={() =>
              this.setState({ one: false, two: true, three: false })
            }
            activeOpacity={1}
            style={[two ? styles.border : null]}
          >
            <Text style={[two ? styles.click : styles.noClick]}>맛</Text>
          </Button2>
          <Button3
            onPress={() =>
              this.setState({ one: false, two: false, three: true })
            }
            activeOpacity={1}
            style={[three ? styles.border : null]}
          >
            <Text style={[three ? styles.click : styles.noClick]}>리뷰</Text>
          </Button3>
        </ButtonView>
        <Page alwaysBounceHorizontal={false}>
          {one ? <Material food_id={food_id} /> : null}
          {two ? <Taste food_id={food_id} /> : null}
          {three ? <Review food_id={food_id} update={this.update} /> : null}
        </Page>
        <ReviewBtn onPress={() => this.move()}>
          <FontAwesome size={30} name={"pencil"} color={"white"} />
        </ReviewBtn>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  click: {
    fontSize: 20,
    fontWeight: "bold",
  },
  noClick: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#808B96",
  },
  border: {
    borderBottomColor: "white",
  },
});

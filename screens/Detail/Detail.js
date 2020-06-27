import React from "react";
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
  AsyncStorage,
  Alert,
} from "react-native";
import { AntDesign, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import styled from "styled-components";
import Material from ".././Detail/Material";
import Review from ".././Detail/Review";
import Taste from ".././Detail/Taste";
import axios from "axios"; // npm i axios@0.18.0
import Rating from "../../components/Rating";
import ReviewGrp from "../../components/ReviewGrp";
import Loading from "../../components/Loading";

const { width, height } = Dimensions.get("window");

//뒤로가기 , 제품 , 별점 , 좋아요가 담기는 뷰
const FoodScreen = styled.View`
  flex: 0.8;
  align-items: center;
  justify-content: center;
  margin-top: 25px;
`;

const BackBtn = styled.TouchableOpacity`
  margin-left: 20px;
`;

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
  width: ${width / 3}px;
  border: 0.5px #abb2b9;
  align-items: center;
  justify-content: center;
`;

const Button2 = styled.TouchableOpacity`
  width: ${width / 3}px;
  border: 0.5px #abb2b9;
  align-items: center;
  justify-content: center;
`;

const Button3 = styled.TouchableOpacity`
  width: ${width / 3}px;
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
    point: null,
    heart: false,
    // user_id: null,
    rating: 5,
    setting: false,
    post_point: null, //별점 점수 문자열
  };

  componentWillMount = async () => {
    // 유저 id

    const { navigation } = this.props;
    this.focusListener = await navigation.addListener("didFocus", () => {
      this.setting();
    });
  };

  componentWillUnmount() {
    this.focusListener.remove();
  }

  setting = async () => {
    // 음식 id
    const { navigation } = this.props;
    const food_id = navigation.getParam("Id");
    // alert(food_id);
    const user_id = navigation.getParam("User");
    let reviewState = navigation.getParam("ReviewState");
    if (reviewState == 1) {
      //0 취소 1 작성 2 삭제 3 수정
      reviewState == 0;
      Alert.alert("작성되었습니다");
    } else if (reviewState == 2) {
      reviewState == 0;
      Alert.alert("삭제되었습니다");
    } else if (reviewState == 3) {
      reviewState == 0;
      Alert.alert("수정되었습니다");
    }
    //음식정보 가져오기
    try {
      await axios({
        method: "post",
        url: "http://3.34.97.97/api/app/detailFood",

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
              food_name: response.data[0].food_name,
              food_photo: response.data[0].food_photo,
              point: parseInt(response.data[0].point),
              post_point: response.data[0].point,
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
        url: "http://3.34.97.97/api/app/heartList",

        headers: {
          //응답에 대한 정보
          Accept: "application/json", // 서버가 json 타입으로 변환해서 사용
          "Content-Type": "application/json",
        },
        data: {
          //   page: "Detail",
          user_id: user_id,
          food_id: food_id,
        },
      })
        .then((response) => {
          if (response.data == "OK") {
            console.log("찜 되어있음");

            this.setState({ heart: true });
          } else {
            console.log("안대있음");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (err) {
      console.log(err);
    }

    this.setState({ setting: true });
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

    //유저 아이디 , 음식 아이디
    const { navigation } = this.props;
    const food_id = navigation.getParam("Id");
    const user_id = navigation.getParam("User");

    try {
      // 외래키와 찜유무를 보낸다
      await axios({
        method: "post",
        url: "http://3.34.97.97/api/app/dibsFood",

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
            // console.log(response);
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
    const { food_photo, food_name } = this.state;
    this.setState({ three: false, one: true });
    this.props.navigation.navigate("Update", {
      Info: e,
      Food_photo: food_photo,
      Food_name: food_name,
    });
  };

  render() {
    const {
      one,
      two,
      three,
      heart,
      food_name,
      food_photo,
      point,
      setting,
      post_point,
    } = this.state;
    const { navigation } = this.props;
    const food_id = navigation.getParam("Id");
    const user_id = navigation.getParam("User");

    let stars = [];

    for (let x = 1; x <= 5; x++) {
      if (x <= point) {
        stars.push(
          <View key={x}>
            <FontAwesome
              name={"star"}
              color={"orange"}
              size={16}
              style={{ marginHorizontal: 6 }}
            />
          </View>
        );
      } else {
        stars.push(
          <View key={x}>
            <FontAwesome
              name={"star"}
              color={"#b2b2b2"}
              size={16}
              style={{ marginHorizontal: 6 }}
            />
          </View>
        );
      }
    }

    return setting ? (
      <View
        style={{
          flex: 1,
        }}
      >
        <FoodScreen>
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                fontSize: 25,
                fontWeight: "600",
                marginBottom: 20,
                marginTop: 40,
              }}
            >
              {food_name}
            </Text>

            <View style={{ flexDirection: "row" }}>{stars}</View>

            {food_photo ? (
              <Image
                source={{ uri: food_photo }}
                style={{
                  width: 180,
                  height: 180,
                  marginTop: 20,
                }}
              />
            ) : null}
          </View>
        </FoodScreen>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 20,
            marginRight: 20,
          }}
        >
          <BackBtn onPress={() => this.props.navigation.navigate("Main")}>
            <MaterialIcons
              size={27}
              name={"arrow-back"}
              color={"black"}
            ></MaterialIcons>
          </BackBtn>

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
          {one ? <Material food_id={food_id} user_id={user_id} /> : null}
          {two ? <Taste food_id={food_id} food_name={food_name} /> : null}
          {three ? (
            <>
              <ReviewGrp food_id={food_id} point={post_point} />
              <Review food_id={food_id} update={this.update} />
            </>
          ) : null}
        </Page>
        <ReviewBtn onPress={() => this.move()}>
          <FontAwesome size={30} name={"pencil"} color={"white"} />
        </ReviewBtn>
      </View>
    ) : (
      <Loading />
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

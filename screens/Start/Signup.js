import React from "react";
import { Text, Dimensions } from "react-native";
import { Ionicons, MaterialIcons, Entypo, AntDesign } from "@expo/vector-icons";
import styled from "styled-components";
import Layout from "../../constants/Layout";
import { StatusBar } from "react-native";
import PageOne from "../../screens/Start/PageOne";
import PageTwo from "../../screens/Start/PageTwo";
import PageThree from "../../screens/Start/PageThree";
import PageFour from "../../screens/Start/PageFour";
import axios from "axios"; // npm i axios@0.18.0

const { width, height } = Dimensions.get("window");

const TITLE_HEIGHT = Layout.height * 0.15;
const Container = styled.View`
  height: ${height};
`;
const Header = styled.View`
  height: ${TITLE_HEIGHT};
  align-items: center;
  justify-content: center;
`;

const BackBtn = styled.TouchableOpacity`
  position: absolute;
  top: 60px;
  left: 20px;
`;

export default class Signip extends React.Component {
  state = {
    page: 1,
    // 회원가입(1)
    user_id: "", // 주의 : 디비에는 id로 되잇음
    password: "",
    nickname: "",
    photo: null,
    //회원가입(2)
    sex: "",
    email: "",
    age: 2020,
    //회원가입(3)
    material: [],
    //회원가입(4)
    hot: 1,
    sweet: 1,
    salty: 1,
    sour: 1,
    bitter: 1,

    //외래키
    language: 1,
    country: 410,
  };

  // 버튼을 누를시 해당 state 값을 저장한다.
  information = (e) => {
    this.setState(e);
    console.log(e);
  };

  //이제까지 저장된 state 값을 호출
  signupState = () => {
    console.log(this.state);
  };

  goLogin = async () => {
    //뒤로 가게 함
    this.props.navigation.goBack();

    // const {
    //   user_id,
    //   password,
    //   nickname,
    //   photo,
    //   sex,
    //   hot,
    //   sweet,
    //   sour,
    //   bitter,
    //   salty,
    //   age,
    //   language,
    //   country,
    //   //   email,
    // } = this.state;

    // try {
    //   await axios({
    //     method: "post",
    //     //   url: "http://192.168.200.175/User_Site/registration_api.php",
    //     //   url: "http://192.168.0.3/User_Site/registration_api.php",
    //     url: "http://192.168.0.21/User_Site/registration_api.php",

    //     headers: {
    //       //응답에 대한 정보
    //       Accept: "application/json", // 서버가 json 타입으로 변환해서 사용
    //       "Content-Type": "application/json",
    //     },
    //     data: {
    //       id: user_id,
    //       password: password,
    //       nickname: nickname,
    //       photo: photo,
    //       sex: sex, // zender
    //       // email: email,
    //       age: age, // birth => 생년월일 다되게함 ? 2019-02-1  문자열
    //       hot: hot,
    //       sweet: sweet,
    //       sour: sour,
    //       bitter: bitter,
    //       salty: salty,
    //       language: language,
    //       country: country,
    //     },
    //   })
    //     .then((response) => {
    //       if (response.data == "User Registered Successfully") {
    //         this.props.navigation.goBack();
    //       } else {
    //         alert("올바르지 않습니다");
    //       }
    //       console.log(response);
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     });
    // } catch (err) {
    //   console.log(err);
    // }
  };

  render() {
    const { user_id, password, page } = this.state;

    return (
      <Container style={{ marginTop: 5 }}>
        <StatusBar barStyle="dark-content" />
        <Header>
          <BackBtn onPress={() => this.props.navigation.goBack()}>
            <MaterialIcons
              size={27}
              name={"arrow-back"}
              color={"black"}
            ></MaterialIcons>
          </BackBtn>
          <Text style={{ fontSize: 30, fontWeight: "bold", marginTop: 30 }}>
            SIGN UP
          </Text>
          <Text>Get Started for free</Text>
        </Header>

        {page == 1 ? (
          <PageOne information={this.information} save={this.state} />
        ) : null}
        {page == 2 ? (
          <PageTwo information={this.information} save={this.state} />
        ) : null}
        {page == 3 ? (
          <PageThree information={this.information} save={this.state} />
        ) : null}
        {page == 4 ? (
          <PageFour
            information={this.information}
            signupState={this.signupState}
            goLogin={this.goLogin}
          />
        ) : null}
      </Container>
    );
  }
}

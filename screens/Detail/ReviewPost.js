import React from "react";
import { View, Text, Dimensions, AsyncStorage, Alert } from "react-native";
import styled from "styled-components";
import axios from "axios"; // npm i axios@0.18.0

const { width, height } = Dimensions.get("window");

const Container = styled.View`
  flex: 1;
`;

//현 상태 및 뒤로가기 버튼이잇음
const ImgCon = styled.View`
  flex: 0.4;
  background-color: yellow;
`;
//별점 고르는 상자
const StarCon = styled.View`
  flex: 0.1;
  background-color: blue;
`;
//리뷰 폼
const ReviewCon = styled.View`
  flex: 0.35;
  background-color: white;
  align-items: center;
`;
//버튼
const BtnCon = styled.View`
  flex: 0.1;
  flex-direction: row-reverse;
  align-items: center;
`;

const ReviewInput = styled.TextInput`
  background-color: #f5f5f5;
  justify-content: flex-start;
  width: ${width - 40}px;
  height: ${height / 3 - 5}px;
  border: 1px solid #f5f5f5;
  font-size: 20px;
  border-radius: 5px;
  border-width: 20px;
`;

const Btn = styled.TouchableOpacity`
  background-color: #f9f9f9;
  width: ${width / 3 - 20}px;
  height: 30px;
  border: 1px solid #d5d8dc;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
`;

export default class ReviewPost extends React.Component {
  state = {
    review: "",

    //외래키
    user_id: null,
    language_code: null,
    food_id: null,
  };

  save = () => {
    const { review, user_id, language_code, food_id } = this.state;
    console.log(review, user_id, language_code, food_id);

    if (review == "") {
      return Alert.alert("리뷰 내용이 없습니다");
    }
    axios({
      method: "post",
      url: "http://192.168.0.3/User_Site/Review.php",
      headers: {
        //응답에 대한 정보
        Accept: "application/json", // 서버가 json 타입으로 변환해서 사용
        "Content-Type": "application/json",
      },
      data: {
        user_id: user_id,
        food_id: food_id,
        language_code: language_code,
        content: review,
      },
    })
      .then((response) => {
        if (response) {
          Alert.alert("완료");
          this.props.navigation.navigate("Detail");
        } else {
          console.log("no");
        }
      })
      .catch((error) => console.log(error));
  };

  componentDidMount = async () => {
    const { navigation } = this.props;
    const food_id = navigation.getParam("Food_id");
    const user_id = await AsyncStorage.getItem("User");
    const language_code = await AsyncStorage.getItem("Language");
    this.setState({
      food_id: food_id,
      user_id: user_id,
      language_code: language_code,
    });
  };
  render() {
    return (
      <Container>
        <ImgCon>
          <Text>리뷰</Text>
        </ImgCon>
        <StarCon></StarCon>
        <ReviewCon>
          <ReviewInput
            placeholder="리뷰는 솔직하게 적어주세요."
            multiline={true}
            blurOnSubmit={true}
            onChangeText={(review) => this.setState({ review })}
          />
        </ReviewCon>
        <BtnCon>
          <Btn
            style={{ marginRight: 20 }}
            onPress={this.props.navigation.navigate("Detail")}
          >
            <Text>취소</Text>
          </Btn>
          <Btn style={{ marginRight: 10 }} onPress={this.save}>
            <Text style={{ fontWeight: "bold" }}>작성하기</Text>
          </Btn>
        </BtnCon>
      </Container>
    );
  }
}

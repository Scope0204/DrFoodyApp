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

export default class Update extends React.Component {
  constructor(props) {
    super(props);

    const { navigation } = this.props;
    const Info = navigation.getParam("Info");
    this.state = {
      content: Info.content,
      //외래키
      user_id: Info.user_id,
      language_code: Info.language_code,
      food_id: Info.food_id,
      //기본키
      review_id: Info.review_id,
    };
    console.log(this.state);
  }

  delete = async () => {
    const { review_id } = this.state;
    //나중에 경고 모달창이나 만들어주자
    try {
      await axios({
        method: "post",
        url: "http://192.168.0.3/New/Delete.php",
        headers: {
          //응답에 대한 정보
          Accept: "application/json", // 서버가 json 타입으로 변환해서 사용
          "Content-Type": "application/json",
        },
        data: {
          review_id: review_id,
        },
      })
        .then((response) => {
          console.log(response);
          if (response.data == "Successfully") {
            Alert.alert("삭제되었습니다");
            this.props.navigation.navigate("Detail");
          } else {
            console.log("실패");
          }
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };

  update = async () => {
    const { content, review_id } = this.state;
    //나중에 수정 모달창이나 만들어주자
    if (content == "") {
      return Alert.alert("리뷰 내용이 없습니다");
    }
    try {
      await axios({
        method: "post",
        url: "http://192.168.0.3/New/Update.php",
        headers: {
          //응답에 대한 정보
          Accept: "application/json", // 서버가 json 타입으로 변환해서 사용
          "Content-Type": "application/json",
        },
        data: {
          content: content,
          review_id: review_id,
        },
      })
        .then((response) => {
          console.log(response);
          if (response.data == "Successfully") {
            Alert.alert("수정되었습니다");
            this.props.navigation.navigate("Detail");
          } else {
            console.log("실패");
          }
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { content } = this.state;

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
            onChangeText={(content) => this.setState({ content })}
            value={content}
          />
        </ReviewCon>
        <BtnCon>
          <Btn
            style={{ marginRight: 20 }}
            onPress={() => this.props.navigation.navigate("Detail")}
          >
            <Text>취소</Text>
          </Btn>
          <Btn style={{ marginRight: 10 }} onPress={this.delete}>
            <Text style={{ fontWeight: "bold", color: "red" }}>삭제하기</Text>
          </Btn>
          <Btn style={{ marginRight: 10 }} onPress={this.update}>
            <Text style={{ fontWeight: "bold", color: "blue" }}>수정하기</Text>
          </Btn>
        </BtnCon>
      </Container>
    );
  }
}

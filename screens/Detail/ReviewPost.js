import React from "react";
import {
  View,
  Text,
  Dimensions,
  AsyncStorage,
  Alert,
  Image,
} from "react-native";
import styled from "styled-components";
import axios from "axios"; // npm i axios@0.18.0
import Modal from "react-native-modal";
import Rating from "../../components/Rating";
import { registerRootComponent } from "expo";

const { width, height } = Dimensions.get("window");

const Container = styled.View`
  flex: 1;
  margin-top: ${height / 14}px;
`;

//현 상태 및 뒤로가기 버튼이잇음
const ImgCon = styled.View`
  flex: 0.4;
  background-color: white;
  align-items: center;
  border-bottom-width: 5px;
  border: 0 solid #f5f5f5;
`;
//별점 고르는 상자
const StarCon = styled.View`
  flex: 0.1;
  justify-content: center;
  align-items: flex-start;
  padding-left: 20px;
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
  height: ${height / 3 - 20}px;
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

// 모달
const ModalContainer = styled.View`
  flex: 0.2;
  width: 250px;
  border: 0px solid;
  background-color: white;
`;
const ModalTxtCon = styled.View`
  flex: 0.7;
  align-items: center;
  justify-content: center;
`;

const ModalBtnCon = styled.View`
  flex: 0.3;
  flex-direction: row;
`;

const ModalBtn = styled.TouchableOpacity`
  flex: 0.5;
  align-items: center;
  justify-content: center;
`;

export default class ReviewPost extends React.Component {
  state = {
    review: "",
    //외래키
    user_id: null,
    language_code: null,
    //navigation getParam
    food_id: null,
    food_photo: null,
    food_name: null,
    //맛 정보 저장
    taste: null,
    //별점 기본값
    rating: 5,
    //맛
    hot: 5,
    sweet: 1,
    sour: 1,
    bitter: 1,
    salty: 1,
  };

  componentDidMount = async () => {
    const { navigation } = this.props;
    const food_id = navigation.getParam("Food_id");
    const food_photo = navigation.getParam("Food_photo");
    const food_name = navigation.getParam("Food_name");

    const user_id = await AsyncStorage.getItem("User");
    // const language_code = await AsyncStorage.getItem("language_code");

    this.setState({
      food_id: food_id,
      food_photo: food_photo,
      food_name: food_name,
      user_id: user_id,
      language_code: 1,
      click: 0,
    });
  };

  // 모달
  toggleModal = async (id) => {
    const { review } = this.state;

    if (review == "") {
      return Alert.alert("レビューの内容がありません");
    }
    //예 : 1
    if (id == 1) {
      // 맛정보 전달
      try {
        await axios({
          method: "post",
          url: "http://35.230.114.182:5000/predictReview",

          headers: {
            //응답에 대한 정보
            Accept: "application/json", // 서버가 json 타입으로 변환해서 사용
            "Content-Type": "application/json",
          },
          data: {
            review: review,
          },
        })
          .then((response) => {
            // console.log(response);
            if (response.data.taste) {
              this.setState({ taste: response.data.taste });
              console.log("맛 등록 ", this.state.taste);
            } else {
              this.setState({ taste: response.data.taste });
              console.log("no", this.state.taste);
            }
          })
          .catch((error) => console.log(error));
      } catch (error) {
        console.log(error);
      }
      // 모달창 닫기
      this.setState({ isModalVisible: !this.state.isModalVisible });
      this.save();
    }
    //아니오 : 2
    else if (id == 2) {
      // 취소버튼 클릭시 원래대로 돌아감
      this.setState({ isModalVisible: !this.state.isModalVisible });
    }
  };

  save = async () => {
    const {
      review,
      user_id,
      language_code,
      food_id,
      taste,
      rating,
      hot,
      sweet,
      sour,
      bitter,
      salty,
    } = this.state;
    // console.log(review, user_id, language_code, food_id, taste);

    try {
      await axios({
        method: "post",
        url: "http://3.34.97.97/api/app/reviewWrite",

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
          taste: taste,
          point: rating,
          hot: hot,
          sweet: sweet,
          sour: sour,
          bitter: bitter,
          salty: salty,
        },
      })
        .then((response) => {
          if (response) {
            // Alert.alert("완료");
            this.props.navigation.navigate("Detail", { ReviewState: 1 });
          } else {
            console.log("no");
          }
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };

  review_rating = (e) => {
    this.setState({ rating: e });
  };

  render() {
    const { food_name, food_photo } = this.state;
    return (
      <Container>
        <Modal
          isVisible={this.state.isModalVisible}
          style={{ alignItems: "center", justifyContent: "center" }}
        >
          <ModalContainer>
            <ModalTxtCon>
              <Text>このまま作成しますか？</Text>
            </ModalTxtCon>
            <ModalBtnCon>
              <ModalBtn
                onPress={() => this.toggleModal(2)}
                style={{ backgroundColor: "#EAECEE" }}
              >
                <Text>いいえ</Text>
              </ModalBtn>
              <ModalBtn
                onPress={() => this.toggleModal(1)}
                style={{ backgroundColor: "#fdcc1f" }}
              >
                <Text>はい</Text>
              </ModalBtn>
            </ModalBtnCon>
          </ModalContainer>
        </Modal>

        <ImgCon>
          <Text
            style={{
              fontSize: 27,
              fontWeight: "bold",
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
        </ImgCon>
        <StarCon>
          <Rating rating={5} review_rating={this.review_rating} />
        </StarCon>
        <ReviewCon>
          <ReviewInput
            placeholder="レビューは正直に書いてください。"
            multiline={true}
            blurOnSubmit={true}
            onChangeText={(review) => this.setState({ review })}
          />
        </ReviewCon>
        <BtnCon>
          <Btn
            style={{ marginRight: 20 }}
            onPress={() =>
              this.props.navigation.navigate("Detail", { ReviewState: 0 })
            }
          >
            <Text>キャンセル</Text>
          </Btn>
          <Btn style={{ marginRight: 10 }} onPress={() => this.toggleModal(2)}>
            <Text style={{ fontWeight: "bold" }}>作成</Text>
          </Btn>
        </BtnCon>
      </Container>
    );
  }
}

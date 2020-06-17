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
      // 없앨지 업뎃할지를 정함
      mode: null,
      taste: null, // 나중에 Info.taste로 바꿀것
      //별점
      rating: Info.point,
      //음식 정보
      food_photo: null,
      food_name: null,
    };
  }

  delete = async () => {
    const { review_id } = this.state;
    //나중에 경고 모달창이나 만들어주자
    try {
      await axios({
        method: "post",
        url: "http://3.34.97.97/api/app/reviewDelete",
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
          if (response) {
            this.props.navigation.navigate("Detail", { ReviewState: 2 });
            // Alert.alert("삭제되었습니다");
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
    const { content } = this.state;
    if (content == "") {
      return Alert.alert("리뷰 내용이 없습니다");
    }
    // 맛리뷰인지 아닌지 지정
    try {
      await axios({
        method: "post",
        //   url: "http://192.168.0.22:5000/predictReview",
        url: "http://35.185.221.213:5000/predictReview",

        headers: {
          //응답에 대한 정보
          Accept: "application/json", // 서버가 json 타입으로 변환해서 사용
          "Content-Type": "application/json",
        },
        data: {
          review: content,
        },
      })
        .then((response) => {
          if (response.data.taste) {
            this.setState({ taste: response.data.taste });
            console.log("맛 등록 ", this.state.taste);
          } else {
            console.log("no");
          }
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
    this.update2();
  };

  update2 = async () => {
    const { content, review_id, rating, taste } = this.state;
    // 내용 저장
    try {
      await axios({
        method: "post",
        url: "http://3.34.97.97/api/app/reviewUpdate",

        headers: {
          //응답에 대한 정보
          Accept: "application/json", // 서버가 json 타입으로 변환해서 사용
          "Content-Type": "application/json",
        },
        data: {
          content: content,
          point: rating,
          review_id: review_id,
          taste: taste,
        },
      })
        .then((response) => {
          //   console.log(response);
          if (response) {
            // Alert.alert("수정되었습니다");
            this.props.navigation.navigate("Detail", { ReviewState: 3 });
          } else {
            console.log("실패");
          }
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };

  // 모달
  toggleModal = (id) => {
    const { review, mode } = this.state;

    if (review == "") {
      return Alert.alert("리뷰 내용이 없습니다");
    }
    //예 : 1
    if (id == 1) {
      console.log(mode);
      if (mode == 0) {
        this.delete();
      } else if (mode == 1) {
        this.update();
      }
      // 모달창 닫기
      this.setState({ isModalVisible: !this.state.isModalVisible });
    }
    //아니오 누를 때 : 2
    else if (id == 2) {
      // 취소버튼 클릭시 원래대로 돌아감
      this.setState({ isModalVisible: !this.state.isModalVisible });
    }
    //삭제하기 누를 때 : 3
    else if (id == 3) {
      this.setState({ isModalVisible: !this.state.isModalVisible, mode: 0 });
    }
    //수정하기 누를 때 : 4
    else if (id == 4) {
      this.setState({ isModalVisible: !this.state.isModalVisible, mode: 1 });
    }
  };

  review_rating = (e) => {
    this.setState({ rating: e });
  };

  componentDidMount = () => {
    const { navigation } = this.props;

    const food_photo = navigation.getParam("Food_photo");
    const food_name = navigation.getParam("Food_name");

    this.setState({
      food_photo: food_photo,
      food_name: food_name,
    });
  };

  render() {
    const { content, rating, food_name, food_photo } = this.state;
    // mode 0이면 삭제 , 1이면 수정
    return (
      <Container>
        <Modal
          isVisible={this.state.isModalVisible}
          style={{ alignItems: "center", justifyContent: "center" }}
        >
          <ModalContainer>
            <ModalTxtCon>
              <Text>이대로 적용시키겠습니까?</Text>
            </ModalTxtCon>
            <ModalBtnCon>
              <ModalBtn
                onPress={() => this.toggleModal(2)}
                style={{ backgroundColor: "#EAECEE" }}
              >
                <Text>아니오</Text>
              </ModalBtn>
              <ModalBtn
                onPress={() => this.toggleModal(1)}
                style={{ backgroundColor: "#fdcc1f" }}
              >
                <Text>예</Text>
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
          <Rating rating={rating} review_rating={this.review_rating} />
        </StarCon>
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
          <Btn style={{ marginRight: 10 }} onPress={() => this.toggleModal(3)}>
            <Text style={{ fontWeight: "bold", color: "red" }}>삭제하기</Text>
          </Btn>
          <Btn style={{ marginRight: 10 }} onPress={() => this.toggleModal(4)}>
            <Text style={{ fontWeight: "bold", color: "blue" }}>수정하기</Text>
          </Btn>
        </BtnCon>
      </Container>
    );
  }
}

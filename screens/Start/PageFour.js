import React from "react";
import { Text, TouchableOpacity, View, Dimensions } from "react-native";
import styled from "styled-components";
import { EvilIcons, Octicons, AntDesign } from "@expo/vector-icons";
import Modal from "react-native-modal";

const { width, height } = Dimensions.get("window");

//공통 부분 : 이동 페이지 , 원
// 하단 뷰
const BottomContainer = styled.View`
  flex: 0.2;
`;
// 페이지 컨트롤러
const PageControl = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-top: 50px;
`;
const PageDown = styled.TouchableOpacity`
  position: absolute;
  left: 30px;
`;

// 페이지 표시 원

const CircleView = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-top: 15px;
`;
const Circle = styled.View`
  background-color: #abb2b9;
  width: 5px;
  height: 5px;
  border-radius: 75px;
  margin-right: 5px;
  margin-left: 5px;
`;
const CircleNow = styled.View`
  background-color: #ff5122;
  width: 5px;
  height: 5px;
  border-radius: 75px;
  margin-right: 5px;
  margin-left: 5px;
`;

// 전체
const Container = styled.View`
  flex: 1;
`;

//전체 리스트 담을부분
const MainContianer = styled.View`
  flex: 0.7;
  align-items: center;
`;

//제목
const Title = styled.Text`
  font-size: 20px;
  color: #565656;
  font-weight: 600;
  margin-top: 10px;
  margin-bottom: 5px;
`;
//소제목
const SmallTitle = styled.Text`
  font-size: 12px;
  color: #565656;
`;
//맛 조절 박스
const TasteContainer = styled.View`
  flex: 9;
`;

// 맛 이름 , 조절 버튼 컨테이너
const TasteCtn = styled.View`
  flex: 1;
  align-items: flex-start;
`;

const TasteTitleCon = styled.View`
  flex: 1;
  flex-direction: row;
  width: ${width - 57}px;
  justify-content: space-between;
  margin-top: 10px;
  margin-bottom: 5px;
  align-items: center;
`;
const TasteTitle = styled.Text`
  font-weight: bold;
  font-size: 18px;
`;

// 게이지

const GaegeCon = styled.View`
  flex: 1.5;
  width: ${width - 57}px;
  margin-bottom: 10px;
  border-radius: 5px;
  flex-direction: row;
  border: 3px solid #7e7e7e;
`;
const Gaege = styled.TouchableOpacity`
  width: ${(width - 70) / 5}px;
  margin-top: 5px;
  margin-bottom: 5px;
  align-items: center;
  justify-content: center;
  z-index: 2;
  border: 1px solid #c5cacd;
`;
const GaegeTxt = styled.Text`
  color: white;
`;

const ShowGaege = styled.View`
  z-index: 1;
  position: absolute;
  padding-top: 5px;
  padding-left: 3px;
`;

// 회원가입 버튼
const SignInBtn = styled.TouchableOpacity`
  border-width: 0;
  border-radius: 10px;
  width: ${width - 50}px;
  height: 40px;
  background-color: #ff5122;
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

export default class PageFour extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hot: 1,
      sweet: 1,
      salty: 1,
      sour: 1,
      bitter: 1,
      page: 4,
      isModalVisible: false,
    };
  }

  // 회원가입 버튼 클릭 -> 맛 선호도 저장 및 모달버튼 이동(이곳에서 선택)

  // 모달
  toggleModal = (id) => {
    //id = 1 = 예 ( 1. 맛정보 전달 / 2. 회원가입 실행 )
    if (id == 1) {
      // 맛정보 전달
      const { hot, sweet, sour, bitter, salty } = this.state;
      this.props.information({
        hot: hot,
        sweet: sweet,
        sour: sour,
        bitter: bitter,
        salty: salty,
      });
      // 회원가입 실행
      this.props.goLogin();
      // 모달창 닫기
      this.setState({ isModalVisible: !this.state.isModalVisible });
    }
    //id = 2 = 첫 클릭 & 취소버튼 클릭
    else if (id == 2) {
      // 취소버튼 클릭시 원래대로 돌아감
      this.setState({ isModalVisible: !this.state.isModalVisible });
    }
  };

  // 화면 이동 및 state 값 전달
  backInfo = () => {
    const { hot, sweet, sour, bitter, salty } = this.state;
    this.props.information({
      page: 3,
      hot: hot,
      sweet: sweet,
      sour: sour,
      bitter: bitter,
      salty: salty,
    });
  };

  stateChange = (lv, taste) => {
    if (taste == "hot") {
      this.setState({ hot: lv });
    } else if (taste == "sweet") {
      this.setState({ sweet: lv });
    } else if (taste == "sour") {
      this.setState({ sour: lv });
    } else if (taste == "bitter") {
      this.setState({ bitter: lv });
    } else if (taste == "salty") {
      this.setState({ salty: lv });
    }
  };

  now = () => {
    alert(this.state.sour);
  };
  render() {
    const { hot, sweet, sour, bitter, salty } = this.state;
    return (
      <Container>
        <Modal
          isVisible={this.state.isModalVisible}
          style={{ alignItems: "center", justifyContent: "center" }}
        >
          <ModalContainer>
            <ModalTxtCon>
              <Text>회원가입을 진행하시겠습니까?</Text>
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
                style={{ backgroundColor: "#ff5122" }}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>예</Text>
              </ModalBtn>
            </ModalBtnCon>
          </ModalContainer>
        </Modal>

        <View
          style={{
            flex: 0.1,
            marginLeft: 20,
            backgroundColor: "#F6F6F6",
            width: width - 40,
            paddingLeft: 20,
            borderRadius: 20,
          }}
        >
          <Title>맛 선호도</Title>
          <SmallTitle>해당 수치에 따른 맛 제품들을 추천해드립니다</SmallTitle>
          <SmallTitle style={{ paddingBottom: 20 }}>
            수치가 클수록 선호도가 올라갑니다
          </SmallTitle>
        </View>

        <MainContianer>
          <TasteContainer>
            <TasteCtn style={{ marginTop: 20 }}>
              <TasteTitleCon>
                <TasteTitle>매운맛</TasteTitle>
                <Text style={{ fontWeight: "bold" }}></Text>
              </TasteTitleCon>
              <GaegeCon>
                <ShowGaege>
                  <View
                    style={{
                      height: 26,
                      width: ((width - 70) / 5) * hot,
                      backgroundColor: "red",
                    }}
                  />
                </ShowGaege>

                <Gaege
                  style={{ marginLeft: 3 }}
                  onPress={() => this.stateChange(1, "hot")}
                >
                  <GaegeTxt>1</GaegeTxt>
                </Gaege>
                <Gaege onPress={() => this.stateChange(2, "hot")}>
                  <GaegeTxt>2</GaegeTxt>
                </Gaege>
                <Gaege onPress={() => this.stateChange(3, "hot")}>
                  <GaegeTxt>3</GaegeTxt>
                </Gaege>
                <Gaege onPress={() => this.stateChange(4, "hot")}>
                  <GaegeTxt>4</GaegeTxt>
                </Gaege>
                <Gaege onPress={() => this.stateChange(5, "hot")}>
                  <GaegeTxt>5</GaegeTxt>
                </Gaege>
              </GaegeCon>
            </TasteCtn>

            <TasteCtn>
              <TasteTitleCon>
                <TasteTitle>단맛</TasteTitle>
              </TasteTitleCon>
              <GaegeCon>
                <ShowGaege>
                  <View
                    style={{
                      height: 25,
                      width: ((width - 70) / 5) * sweet,
                      backgroundColor: "orange",
                    }}
                  />
                </ShowGaege>
                <Gaege
                  style={{ marginLeft: 3 }}
                  onPress={() => this.stateChange(1, "sweet")}
                >
                  <GaegeTxt>1</GaegeTxt>
                </Gaege>
                <Gaege onPress={() => this.stateChange(2, "sweet")}>
                  <GaegeTxt>2</GaegeTxt>
                </Gaege>
                <Gaege onPress={() => this.stateChange(3, "sweet")}>
                  <GaegeTxt>3</GaegeTxt>
                </Gaege>
                <Gaege onPress={() => this.stateChange(4, "sweet")}>
                  <GaegeTxt>4</GaegeTxt>
                </Gaege>
                <Gaege onPress={() => this.stateChange(5, "sweet")}>
                  <GaegeTxt>5</GaegeTxt>
                </Gaege>
              </GaegeCon>
            </TasteCtn>

            <TasteCtn>
              <TasteTitleCon>
                <TasteTitle>신맛</TasteTitle>
              </TasteTitleCon>
              <GaegeCon>
                <ShowGaege>
                  <View
                    style={{
                      height: 25,
                      width: ((width - 70) / 5) * sour,
                      backgroundColor: "yellow",
                    }}
                  />
                </ShowGaege>
                <Gaege
                  style={{ marginLeft: 3 }}
                  onPress={() => this.stateChange(1, "sour")}
                >
                  <GaegeTxt>1</GaegeTxt>
                </Gaege>
                <Gaege onPress={() => this.stateChange(2, "sour")}>
                  <GaegeTxt>2</GaegeTxt>
                </Gaege>
                <Gaege onPress={() => this.stateChange(3, "sour")}>
                  <GaegeTxt>3</GaegeTxt>
                </Gaege>
                <Gaege onPress={() => this.stateChange(4, "sour")}>
                  <GaegeTxt>4</GaegeTxt>
                </Gaege>
                <Gaege onPress={() => this.stateChange(5, "sour")}>
                  <GaegeTxt>5</GaegeTxt>
                </Gaege>
              </GaegeCon>
            </TasteCtn>

            <TasteCtn>
              <TasteTitleCon>
                <TasteTitle>쓴맛</TasteTitle>
              </TasteTitleCon>
              <GaegeCon>
                <ShowGaege>
                  <View
                    style={{
                      height: 25,
                      width: ((width - 70) / 5) * bitter,
                      backgroundColor: "green",
                    }}
                  />
                </ShowGaege>
                <Gaege
                  style={{ marginLeft: 3 }}
                  onPress={() => this.stateChange(1, "bitter")}
                >
                  <GaegeTxt>1</GaegeTxt>
                </Gaege>
                <Gaege onPress={() => this.stateChange(2, "bitter")}>
                  <GaegeTxt>2</GaegeTxt>
                </Gaege>
                <Gaege onPress={() => this.stateChange(3, "bitter")}>
                  <GaegeTxt>3</GaegeTxt>
                </Gaege>
                <Gaege onPress={() => this.stateChange(4, "bitter")}>
                  <GaegeTxt>4</GaegeTxt>
                </Gaege>
                <Gaege onPress={() => this.stateChange(5, "bitter")}>
                  <GaegeTxt>5</GaegeTxt>
                </Gaege>
              </GaegeCon>
            </TasteCtn>

            <TasteCtn>
              <TasteTitleCon>
                <TasteTitle>짠맛</TasteTitle>
              </TasteTitleCon>
              <GaegeCon>
                <ShowGaege>
                  <View
                    style={{
                      height: 25,
                      width: ((width - 70) / 5) * salty,
                      backgroundColor: "blue",
                    }}
                  />
                </ShowGaege>
                <Gaege
                  style={{ marginLeft: 3 }}
                  onPress={() => this.stateChange(1, "salty")}
                >
                  <GaegeTxt>1</GaegeTxt>
                </Gaege>
                <Gaege onPress={() => this.stateChange(2, "salty")}>
                  <GaegeTxt>2</GaegeTxt>
                </Gaege>
                <Gaege onPress={() => this.stateChange(3, "salty")}>
                  <GaegeTxt>3</GaegeTxt>
                </Gaege>
                <Gaege onPress={() => this.stateChange(4, "salty")}>
                  <GaegeTxt>4</GaegeTxt>
                </Gaege>
                <Gaege onPress={() => this.stateChange(5, "salty")}>
                  <GaegeTxt>5</GaegeTxt>
                </Gaege>
              </GaegeCon>
            </TasteCtn>
          </TasteContainer>

          <View style={{ flex: 0.5, justifyContent: "center", paddingTop: 30 }}>
            <SignInBtn onPress={() => this.toggleModal(2)}>
              <Text
                style={{
                  textAlign: "center",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                CREATE ACCOUNT
              </Text>
            </SignInBtn>
          </View>
        </MainContianer>
        <BottomContainer>
          <PageControl>
            <PageDown onPress={this.backInfo}>
              <Octicons size={32} name={"chevron-left"} color={"#565656"} />
            </PageDown>
          </PageControl>
          <CircleView>
            <Circle />
            <Circle />
            <Circle />
            <CircleNow />
          </CircleView>
        </BottomContainer>
      </Container>
    );
  }
}

import React from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import styled from "styled-components";
import { EvilIcons, Octicons, AntDesign } from "@expo/vector-icons";
import Modal from "react-native-modal";

//공통 부분 : 이동 페이지 , 원
// 하단 뷰
const BottomContainer = styled.View`
  flex: 0.2;
`;
// 페이지 컨트롤러
const PageControl = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-top: 50;
`;
const PageDown = styled.TouchableOpacity`
  position: absolute;
  left: 30px;
`;

// 페이지 표시 원

const CircleView = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-top: 15;
`;
const Circle = styled.View`
  background-color: #f5f5f5;
  width: 5px;
  height: 5px;
  border-radius: 75px;
  margin-right: 5;
  margin-left: 5;
`;
const CircleNow = styled.View`
  background-color: #86efef;
  width: 5px;
  height: 5px;
  border-radius: 75px;
  margin-right: 5;
  margin-left: 5;
`;

// 전체
const Container = styled.View`
  flex: 1;
`;

//전체 리스트 담을부분
const MainContianer = styled.View`
  flex: 0.8;
  margin-left: 40;
`;

//제목
const Title = styled.Text`
  font-size: 20;
  color: #565656;
  font-weight: bold;
  margin-top: 10;
  margin-bottom: 5;
`;
//소제목
const SmallTitle = styled.Text`
  font-size: 13;
  color: #565656;
  margin-bottom: 20;
`;
//맛 조절 박스
const TasteContainer = styled.View`
  border-width: 0;
  border-radius: 10;
  width: 330;
  height: 470;
  margin-bottom: 20;
  background-color: white;
  box-shadow: 2px 2px 2px gray;
  justify-content: center;
`;

// 맛 이름 , 조절 버튼 컨테이너

const TasteTitleCtn = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const TasteTitle = styled.Text`
  text-align: center;
  font-weight: bold;
  font-size: 16;
`;

const TasteBar = styled.View`
  border-radius: 1;
  height:5
  margin-left:20
  margin-top: 20
  margin-bottom:35
  
`;

// 회원가입 버튼
const SignInBtn = styled.TouchableOpacity`
  border-width: 0;
  border-radius: 10;
  width: 330;
  height: 50;
  background-color: #fdcc1f;
  justify-content: center;
`;

// 모달
const ModalContainer = styled.View`
  flex: 0.2;
  width: 250;
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

  up = (id) => {
    const { hot, sweet, salty, sour, bitter } = this.state;
    if (id == 1) {
      if (hot < 5) {
        this.setState({ hot: hot + 1 });
      }
    } else if (id == 2) {
      if (sweet < 5) {
        this.setState({ sweet: sweet + 1 });
      }
    } else if (id == 3) {
      if (sour < 5) {
        this.setState({ sour: sour + 1 });
      }
    } else if (id == 4) {
      if (bitter < 5) {
        this.setState({ bitter: bitter + 1 });
      }
    } else if (id == 5) {
      if (salty < 5) {
        this.setState({ salty: salty + 1 });
      }
    }
  };

  down = (id) => {
    const { hot, sweet, salty, sour, bitter } = this.state;

    if (id == 1) {
      if (hot > 1) {
        this.setState({ hot: hot - 1 });
      }
    } else if (id == 2) {
      if (sweet > 1) {
        this.setState({ sweet: sweet - 1 });
      }
    } else if (id == 3) {
      if (sour > 1) {
        this.setState({ sour: sour - 1 });
      }
    } else if (id == 4) {
      if (bitter > 1) {
        this.setState({ bitter: bitter - 1 });
      }
    } else if (id == 5) {
      if (salty > 1) {
        this.setState({ salty: salty - 1 });
      }
    }
  };

  render() {
    const { hot } = this.state;
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
                style={{ backgroundColor: "#fdcc1f" }}
              >
                <Text>예</Text>
              </ModalBtn>
            </ModalBtnCon>
          </ModalContainer>
        </Modal>
        <MainContianer>
          <Title>맛 선호도</Title>
          <SmallTitle>해당 수치에 따른 맛 제품들을 추천해드립니다</SmallTitle>
          <TasteContainer>
            <TasteTitleCtn>
              <TouchableOpacity onPress={() => this.down(1)}>
                <AntDesign
                  size={20}
                  name={"caretleft"}
                  color={"black"}
                ></AntDesign>
              </TouchableOpacity>
              <TasteTitle>매운맛</TasteTitle>
              <TouchableOpacity onPress={() => this.up(1)}>
                <AntDesign
                  size={20}
                  name={"caretright"}
                  color={"black"}
                ></AntDesign>
              </TouchableOpacity>
            </TasteTitleCtn>
            <TasteBar style={styles.hot} />

            <TasteTitleCtn>
              <TouchableOpacity onPress={() => this.down(2)}>
                <AntDesign
                  size={20}
                  name={"caretleft"}
                  color={"black"}
                ></AntDesign>
              </TouchableOpacity>
              <TasteTitle>단맛</TasteTitle>
              <TouchableOpacity onPress={() => this.up(2)}>
                <AntDesign
                  size={20}
                  name={"caretright"}
                  color={"black"}
                ></AntDesign>
              </TouchableOpacity>
            </TasteTitleCtn>
            <TasteBar style={styles.sweet} />

            <TasteTitleCtn>
              <TouchableOpacity onPress={() => this.down(3)}>
                <AntDesign
                  size={20}
                  name={"caretleft"}
                  color={"black"}
                ></AntDesign>
              </TouchableOpacity>
              <TasteTitle>신맛</TasteTitle>
              <TouchableOpacity onPress={() => this.up(3)}>
                <AntDesign
                  size={20}
                  name={"caretright"}
                  color={"black"}
                ></AntDesign>
              </TouchableOpacity>
            </TasteTitleCtn>
            <TasteBar style={styles.sour} />

            <TasteTitleCtn>
              <TouchableOpacity onPress={() => this.down(4)}>
                <AntDesign
                  size={20}
                  name={"caretleft"}
                  color={"black"}
                ></AntDesign>
              </TouchableOpacity>
              <TasteTitle>쓴맛</TasteTitle>
              <TouchableOpacity onPress={() => this.up(4)}>
                <AntDesign
                  size={20}
                  name={"caretright"}
                  color={"black"}
                ></AntDesign>
              </TouchableOpacity>
            </TasteTitleCtn>
            <TasteBar style={styles.bitter} />

            <TasteTitleCtn>
              <TouchableOpacity onPress={() => this.down(5)}>
                <AntDesign
                  size={20}
                  name={"caretleft"}
                  color={"black"}
                ></AntDesign>
              </TouchableOpacity>
              <TasteTitle>짠맛</TasteTitle>
              <TouchableOpacity onPress={() => this.up(5)}>
                <AntDesign
                  size={20}
                  name={"caretright"}
                  color={"black"}
                ></AntDesign>
              </TouchableOpacity>
            </TasteTitleCtn>
            <TasteBar style={styles.salty} />
          </TasteContainer>
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

const styles = StyleSheet.create({
  hot: {
    backgroundColor: "red",
    width: 280,
  },
  sweet: {
    backgroundColor: "orange",
    width: 280,
  },
  sour: {
    backgroundColor: "yellow",
    width: 280,
  },
  bitter: {
    backgroundColor: "green",
    width: 280,
  },
  salty: {
    backgroundColor: "blue",
    width: 280,
  },
});

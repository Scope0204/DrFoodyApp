import React from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import styled from "styled-components";
import { EvilIcons, Octicons } from "@expo/vector-icons";

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

const TasteTitle = styled.Text`
  margin-left: 20;
  font-weight: bold;
  font-size: 20;
`;

const TasteBar = styled.View`
  border-radius: 1;
  height:5
  width : 280
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

export default class PageFour extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 4,
    };
  }
  // 화면 이동 및 state 값 전달

  backInfo = () => {
    const {} = this.state;
    this.props.information({
      page: 3,
    });
  };
  render() {
    const {} = this.state;
    return (
      <Container>
        <MainContianer>
          <Title>맛 선호도</Title>
          <SmallTitle>해당 수치에 따른 맛 제품들을 추천해드립니다</SmallTitle>
          <TasteContainer>
            <TasteTitle>매운 맛</TasteTitle>
            <TasteBar style={styles.hot} />
            <TasteTitle>단 맛</TasteTitle>
            <TasteBar style={styles.sweet} />
            <TasteTitle>신 맛</TasteTitle>
            <TasteBar style={styles.salty} />
            <TasteTitle>쓴 맛</TasteTitle>
            <TasteBar style={styles.sour} />
            <TasteTitle>짠 맛</TasteTitle>
            <TasteBar style={styles.bitter} />
          </TasteContainer>
          <SignInBtn>
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
  },
  sweet: {
    backgroundColor: "orange",
  },
  salty: {
    backgroundColor: "yellow",
  },
  sour: {
    backgroundColor: "green",
  },
  bitter: {
    backgroundColor: "blue",
    marginBottom: 10,
  },
});

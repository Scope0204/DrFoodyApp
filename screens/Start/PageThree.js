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

const PageUp = styled.TouchableOpacity`
  position: absolute;
  right: 30px;
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
  font-size: 16;
  color: #565656;
  font-weight: bold;
  margin-top: 10;
  margin-bottom: 5;
`;

// 셀렉 바 담을 뷰
const SelectContainer = styled.View`
  background-color: white;
  border-width: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 330;
  height: 30;
  border-radius: 5;
  border-color: #565656
  margin-bottom: 5;
`;
//리스트 출력 뷰
const ListContainer = styled.ScrollView`
  background-color: white;
  border-width: 1;
  border-radius: 5;
  width: 330;
  margin-bottom: 5;
`;
//Chips 출력 뷰
const ChipsContainer = styled.View`
  background-color: white;
  border-width: 1;
  border-radius: 5;
  width: 330;
  height: 130;
  border-color: #d5d8dc;
`;
export default class PageThree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 3,
      select: 1,
    };
  }

  // 화면 이동 및 state 값 전달
  info = () => {
    const {} = this.state;
    this.props.information({
      page: 4,
    });
  };

  backInfo = () => {
    const {} = this.state;
    this.props.information({
      page: 2,
    });
  };

  render() {
    const { page, select } = this.state;
    return (
      <Container>
        <MainContianer>
          <Title>기피 원재료</Title>
          <SelectContainer>
            <TouchableOpacity
              onPress={() => this.setState({ select: 1 })}
              style={select == 1 ? styles.select : styles.noSelect}
            >
              <Text style={select == 1 ? styles.selectTitle : styles.title}>
                빠른 선택
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.setState({ select: 2 })}
              style={select == 2 ? styles.select : styles.noSelect}
            >
              <Text style={select == 2 ? styles.selectTitle : styles.title}>
                리스트
              </Text>
            </TouchableOpacity>
          </SelectContainer>
          <ListContainer>
            <Text>sdad</Text>
            <Text>sdad</Text>
            <Text>sdad</Text>
            <Text>sdad</Text>
            <Text>sdad</Text>
            <Text>sdad</Text>
            <Text>sdad</Text>
            <Text>sdad</Text>
            <Text>sdad</Text>
            <Text>sdad</Text>
            <Text>sdad</Text>
            <Text>sdad</Text>
            <Text>sdad</Text>
            <Text>sdad</Text>
            <Text>sdad</Text>
            <Text>sdad</Text>
            <Text>sdad</Text>
            <Text>sdad</Text>
            <Text>sdad</Text>
            <Text>sdad</Text>
            <Text>sdad</Text>
            <Text>sdad</Text>
            <Text>sdad</Text>
            <Text>sdad</Text>
            <Text>sdad</Text>
            <Text>sdad</Text>
            <Text>sdad</Text>
            <Text>sdad</Text>
            <Text>sdad</Text>
            <Text>sdad</Text>
          </ListContainer>
          <ChipsContainer>
            <Text>sadasda</Text>
          </ChipsContainer>
        </MainContianer>
        <BottomContainer>
          <PageControl>
            <PageDown onPress={this.backInfo}>
              <Octicons size={32} name={"chevron-left"} color={"#565656"} />
            </PageDown>
            <PageUp onPress={this.info}>
              <Octicons size={32} name={"chevron-right"} color={"#565656"} />
            </PageUp>
          </PageControl>
          <CircleView>
            <Circle />
            <Circle />
            <CircleNow />
            <Circle />
          </CircleView>
        </BottomContainer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  select: {
    backgroundColor: "#FDCC1F",
    width: 160,
    height: 25,
    borderWidth: 0.1,
    borderRadius: 5,
  },
  noSelect: {
    backgroundColor: "white",
    width: 160,
    height: 25,
  },
  title: {
    lineHeight: 25,
    textAlign: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: 16,
  },

  selectTitle: {
    lineHeight: 25,
    textAlign: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: 16,
    color: "white",
  },
});

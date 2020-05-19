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
import Religion from "./Religion";
import List from "./List";
import { RNChipView } from "react-native-chip-view";

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

const Container = styled.View`
  flex: 1;
`;

//전체 리스트 담을부분
const MainContianer = styled.View`
  flex: 0.8;
  margin-left: 40px;
`;

//제목
const Title = styled.Text`
  font-size: 20px;
  color: #565656;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 5px;
`;

//소제목
const SmallTitle = styled.Text`
  font-size: 13px;
  color: #565656;
  margin-bottom: 20px;
`;

// 셀렉 바 담을 뷰
const SelectContainer = styled.View`
  background-color: white;
  border: 1px solid gray;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 330px;
  height: 30px;
  border-radius: 5px;
  border-color: #565656
  margin-bottom: 5px;

`;
//리스트 출력 뷰
const ListContainer = styled.ScrollView`
  background-color: #eaecee;
  border: 1px solid gray;
  border-radius: 5px;
  width: 330px;
  height: 250px;
  margin-bottom: 5px;
`;
//Chips 출력 뷰
const ChipsContainer = styled.ScrollView`
  background-color: white;
  border-width: 1px;
  border-radius: 5px;
  width: 330px;
  height: 80px;
  border-color: #d5d8dc;
`;

export default class PageThree extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 3,
      select: 1,
      material: [],
    };
    // this.material = this.material.bind(this);
  }

  // 화면 이동 및 state 값 전달
  info = () => {
    const { material } = this.state;
    this.props.information({
      page: 4,
      material: material,
    });
  };

  backInfo = () => {
    const { material } = this.state;
    this.props.information({
      page: 2,
      material: material,
    });
  };

  //props로 넘길 값 (metarial의 수정)
  //e는 넘길 state, h는 값
  material = (e) => {
    this.setState({
      material: this.state.material.concat(e),
    });
  };

  // material 값에서 제외
  deleteMetarial = (e) => {
    this.setState({ material: this.state.material.filter((x) => x != e) });
    console.log(e);
  };

  render() {
    const { select, material } = this.state;
    return (
      <Container>
        <MainContianer>
          <Title>기피 원재료</Title>
          <SmallTitle>제품 검색 시 기피 원재료를 체크해드립니다</SmallTitle>
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
            {select == 1 ? (
              <Religion material={this.material} />
            ) : (
              <List material={this.material} />
            )}
          </ListContainer>
          <ChipsContainer contentContainerStyle={styles.contentContainer}>
            {material
              ? material.map((material) => {
                  return (
                    <View style={{ marginLeft: 5, marginTop: 5 }}>
                      <RNChipView
                        title={material}
                        avatar={false}
                        height={25}
                        borderRadius={5}
                        cancelable={true}
                        onPress={() => this.deleteMetarial(material)}
                      />
                    </View>
                  );
                })
              : null}
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
    backgroundColor: "#ff5122",
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

  contentContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
  },
});

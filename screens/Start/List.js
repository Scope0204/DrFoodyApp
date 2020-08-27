import React from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import styled from "styled-components";
import Modal from "react-native-modal";
import style from "react-native-chip-view/src/RNChipView.style";

const SelectView = styled.TouchableOpacity`
  background-color: white;
  height: 60px;
  align-items: center;
  justify-content: center;
  border-bottom-width: 1px;
  border: 0 solid gray;
`;

const TextList = styled.Text`
  font-size: 20px;
`;

const ModalContainer = styled.View`
  flex: 0.7;
  width: 330px;
  border: 0px solid;
  border-radius: 5px;
  box-shadow: 2px 2px 2px;
  background-color: white;
  margin-left: 20px;
`;

const ModalList = styled.ScrollView`
  flex: 0.8;
  background-color: #eaecee;
`;

const Search = styled.View`
  flex: 0.1;
  border: 0 solid gray;
  border-bottom-width: 6px;
`;

const ModalBtnCon = styled.TouchableOpacity`
  flex: 0.1;
  background-color: #ff5122;
  justify-content: center;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
`;

const ModalBtn = styled.Text`
  text-align: center;
  color: white;
  font-weight: bold;
  font-size: 16px;
`;

const ModalListView = styled.TouchableOpacity`
  height: 60px;
  align-items: center;
  justify-content: center;
  border-bottom-width: 1px;
  border: 0 solid gray;
  background-color: white;
`;

export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      kinds: [],
      selected: [],
      material: [],
    };
  }

  toggleModal = (id) => {
    const { material } = this.state;
    // 모달 상태변화
    this.setState({ isModalVisible: !this.state.isModalVisible });

    //현재 선택된 원재료(meterial)를 추가시킴(있는경우만)
    if (material) {
      this.props.material(material);
    }

    //버튼 클릭시 초기화한다.
    this.setState({ selected: [], material: [] });
    // 모달에 따라 리스트 변화
    if (id == 1) {
      this.setState({
        kinds: [
          "ハラペーニョ",
          "トマト",
          "キュウリ",
          "コールラビ",
          "レタス",
          "ブロッコリー",
        ],
      });
    } else if (id == 2) {
      this.setState({
        kinds: ["豚肉", "牛肉", "羊肉", "鶏肉", "鴨肉"],
      });
    }
  };

  // 모달의 선택유무를 알리는 함수
  selected = (kind, key) => {
    const { selected, material } = this.state;
    //만약 selected 배열에 kinds의 값이 없으면
    if (selected.indexOf(key) == -1) {
      //배열에 해당 id값 추가
      this.setState({ selected: this.state.selected.concat(key) });
      //원재료에 해당 kind를 추가시킨다
      this.setState({ material: this.state.material.concat(kind) });
    } else {
      //배열에 해당 key값이 있으면 삭제시킨다.
      this.setState({ selected: this.state.selected.filter((x) => x != key) });
      //원재료에 해당 kind를 삭제시킨다
      this.setState({ material: this.state.material.filter((x) => x != kind) });
    }
    console.log(key);
  };

  render() {
    const { kinds, selected } = this.state;
    return (
      <View>
        <Modal isVisible={this.state.isModalVisible}>
          <ModalContainer>
            <Search />
            <ModalList>
              {kinds
                ? kinds.map((kind, key) => {
                    return (
                      <ModalListView
                        onPress={() => this.selected(kind, key)}
                        style={
                          selected.indexOf(key) == -1 ? null : styles.selected
                        }
                        key={key}
                      >
                        <Text style={{ fontSize: 16 }}>{kind}</Text>
                      </ModalListView>
                    );
                  })
                : null}
            </ModalList>
            <ModalBtnCon onPress={this.toggleModal}>
              <ModalBtn>選択</ModalBtn>
            </ModalBtnCon>
          </ModalContainer>
        </Modal>
        <SelectView onPress={() => this.toggleModal(1)}>
          <TextList>野菜</TextList>
        </SelectView>
        <SelectView onPress={() => this.toggleModal(2)}>
          <TextList>肉</TextList>
        </SelectView>
        <SelectView>
          <TextList>魚</TextList>
        </SelectView>
        <SelectView>
          <TextList>種実類</TextList>
        </SelectView>
        <SelectView>
          <TextList>果物</TextList>
        </SelectView>
        <SelectView>
          <TextList>貝類</TextList>
        </SelectView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  selected: {
    backgroundColor: "#ffe1d4",
    color: "white",
  },
});

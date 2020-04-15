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
  height: 60;
  align-items: center;
  justify-content: center;
  border-bottom-width: 1px;
  border: 0 solid gray;
`;

const TextList = styled.Text`
  font-size: 20;
`;

const ModalContainer = styled.View`
  flex: 0.7;
  width: 330;
  border: 0px solid;
  border-radius: 5px;
  box-shadow: 2px 2px 2px;
  background-color: white;
  margin-left: 20;
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
  background-color: #fdcc1f;
  justify-content: center;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
`;

const ModalBtn = styled.Text`
  text-align: center;
  color: white;
  font-weight: bold;
  font-size: 16;
`;

const ModalListView = styled.TouchableOpacity`
  height: 60;
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
        kinds: ["할라피뇨", "토마토", "오이", "콜라비", "양상추", "브로콜리"],
      });
    } else if (id == 2) {
      this.setState({
        kinds: ["돼지고기", "소고기", "양고기", "닭고기", "오리고기"],
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
                      >
                        <Text style={{ fontSize: 16 }}>{kind}</Text>
                      </ModalListView>
                    );
                  })
                : null}
            </ModalList>
            <ModalBtnCon onPress={this.toggleModal}>
              <ModalBtn>추가</ModalBtn>
            </ModalBtnCon>
          </ModalContainer>
        </Modal>
        <SelectView onPress={() => this.toggleModal(1)}>
          <TextList>야채</TextList>
        </SelectView>
        <SelectView onPress={() => this.toggleModal(2)}>
          <TextList>고기</TextList>
        </SelectView>
        <SelectView>
          <TextList>생선</TextList>
        </SelectView>
        <SelectView>
          <TextList>견과류</TextList>
        </SelectView>
        <SelectView>
          <TextList>과일</TextList>
        </SelectView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  selected: {
    backgroundColor: "#FEEA9F",
    color: "white",
  },
});

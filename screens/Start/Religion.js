import React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import styled from "styled-components";

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

export default class Religion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
    };
  }
  // 배열에 없으면 추가 잇으면 삭제
  // 색은 배열에 있으면 나타나고 없으면 안나타남

  selected = (id) => {
    const { selected } = this.state;
    // 배열에 id값이 없으면
    if (selected.indexOf(id) == -1) {
      // 배열에 해당 id값 추가
      this.setState({ selected: this.state.selected.concat(id) });
      //보낼때 배열에 담아서 보내야 함
      let list = [];
      if (id == 1) {
        list = ["ザリガニ", "カニ", "エビ", "貝", "豚肉"];
      } else if (id == 2) {
        list = ["牛", "犬", "卵"];
      } else if (id == 3) {
        list = ["牛", "卵"];
      }
      this.props.material(list);
    } else {
      // 배열에 id값 있으면 삭제시킴
      this.setState({ selected: this.state.selected.filter((x) => x != id) });
    }
  };

  render() {
    const { selected } = this.state;
    return (
      <View>
        <SelectView
          onPress={() => this.selected(1)}
          style={selected.indexOf(1) == -1 ? null : styles.selected}
        >
          <TextList>イスラム教</TextList>
        </SelectView>
        <SelectView
          onPress={() => this.selected(2)}
          style={selected.indexOf(2) == -1 ? null : styles.selected}
        >
          <TextList>ヒンドゥー教</TextList>
        </SelectView>
        <SelectView
          onPress={() => this.selected(3)}
          style={selected.indexOf(3) == -1 ? null : styles.selected}
        >
          <TextList>シク教</TextList>
        </SelectView>
        <SelectView onPress={() => this.selected(4)}>
          <TextList>仏教</TextList>
        </SelectView>
        <SelectView>
          <TextList>ユダヤ教</TextList>
        </SelectView>
        <SelectView>
          <TextList>キリスト教</TextList>
        </SelectView>
        <SelectView>
          <TextList>ベジタリアン</TextList>
        </SelectView>
        <SelectView>
          <TextList>セミベジタリアン</TextList>
        </SelectView>
        <SelectView>
          <TextList>プルテリアン</TextList>
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

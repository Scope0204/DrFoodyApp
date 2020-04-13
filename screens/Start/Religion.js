import React from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import styled from "styled-components";

const SelectView = styled.TouchableOpacity`
  height: 60;
  align-items: center;
  justify-content: center;
  border-bottom-width: 1px;
  border: 0 solid gray;
`;

const TextList = styled.Text`
  font-size: 20;
`;

export default class Religion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0,
      metarial: [],
    };
  }
  selected = () => {
    const { selected, metarial } = this.state;
    if (selected == 0) {
      this.setState({ selected: 1 });
      //보낼때 배열에 담아서 보내야 함
      const a = ["아", "이", "슬", "란", "드"];
      this.props.metarial(a);

      console.log(metarial);
    } else {
      this.setState({ selected: 0 });
    }
  };

  render() {
    const { selected } = this.state;
    return (
      <View>
        <SelectView
          onPress={this.selected}
          style={selected == 1 ? styles.selected : null}
        >
          <TextList>이슬람교</TextList>
        </SelectView>
        <SelectView>
          <TextList>힌두교</TextList>
        </SelectView>
        <SelectView>
          <TextList>시크교</TextList>
        </SelectView>
        <SelectView>
          <TextList>불교</TextList>
        </SelectView>
        <SelectView>
          <TextList>유대교</TextList>
        </SelectView>
        <SelectView>
          <TextList>기독교</TextList>
        </SelectView>
        <SelectView>
          <TextList>베지테리언</TextList>
        </SelectView>
        <SelectView>
          <TextList>세미베지테리언</TextList>
        </SelectView>
        <SelectView>
          <TextList>프루테리언</TextList>
        </SelectView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  selected: {
    backgroundColor: "#FDCC1F",
  },
});

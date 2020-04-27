import React from "react";
import {
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { FontAwesome, Ionicons, Feather } from "@expo/vector-icons";
import styled from "styled-components";
const { width, height } = Dimensions.get("window");

const Container = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  height: 50px;
  border-bottom-width: 1px;
  border-bottom-color: #eaecee;
`;

export default class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: "",
    };
  }
  render() {
    return (
      <Container>
        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
          <Ionicons
            size={30}
            name={"md-arrow-back"}
            style={{ marginRight: 30 }}
          ></Ionicons>
        </TouchableOpacity>
        <TextInput
          onChangeText={(searchText) => this.setState({ searchText })}
          placeholder="제품명 검색"
          style={{ width: width - 120, fontSize: 20 }}
        ></TextInput>
        <TouchableOpacity>
          <Feather size={25} name={"search"}></Feather>
        </TouchableOpacity>
      </Container>
    );
  }
}

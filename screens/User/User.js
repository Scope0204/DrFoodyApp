import React from "react";
import { Text } from "react-native";
import styled from "styled-components";
import { Ionicons, MaterialIcons, Entypo, AntDesign } from "@expo/vector-icons";

const UserOptions = styled.View``;

export default class User extends React.Component {
  render() {
    return (
      <UserOptions>
        <Text>User</Text>
      </UserOptions>
    );
  }
}

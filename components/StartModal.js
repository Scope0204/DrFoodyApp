import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  TouchableHighlight,
} from "react-native";
import styled from "styled-components";
import Modal from "react-native-modal";
import Icon from "@expo/vector-icons/FontAwesome";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default class StartModal extends React.Component {
  state = {
    isModalVisible: true,
  };
  render() {
    return (
      <Modal
        isVisible={this.state.isModalVisible}
        children={false}
        onBackdropPress={() => this.setState({ isModalVisible: false })}
      >
        <Text
          style={{
            position: "absolute",
            bottom: 130,
            left: 10,
            color: "white",
            fontSize: 18,
            fontWeight: "600",
          }}
        >
          ボタンをクリックして製品を照会してください！
        </Text>

        <View
          style={{
            backgroundColor: "#ff5122",
            alignItems: "center",
            justifyContent: "center",
            width: 72,
            height: 72,
            borderRadius: 36,
            position: "absolute",
            bottom: 26,
            left: 150,
            shadowColor: "#7f58ff",
            shadowRadius: 5,
            shadowOffset: { height: 10 },
            shadowOpacity: 0.1,
            borderWidth: 3,
            borderColor: "#fff",
          }}
        >
          <TouchableHighlight underlayColor="#7f58ff">
            <View>
              <Icon name="camera" size={24} color="#fff" />
            </View>
          </TouchableHighlight>
        </View>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <MaterialCommunityIcons
            name="cursor-default-click-outline"
            size={55}
            color="white"
          />
        </View>
      </Modal>
    );
  }
}

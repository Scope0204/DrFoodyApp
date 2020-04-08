import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import styled from "styled-components";
import {
  Ionicons,
  MaterialIcons,
  Entypo,
  AntDesign,
  EvilIcons,
} from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

const Container = styled.View`
  flex: 1;
`;
const UserImg = styled.TouchableOpacity`
  flex: 0.4;
  align-items: center;
`;

const InputContainer = styled.View`
  flex: 0.4;
  justify-content: center;
  margin-left: 40;
`;

const CheckBtn = styled.TouchableOpacity`
  position: absolute;
  right: 55;
  background-color: black;
  border-radius: 5;
  width: 50;
  height: 20;
  align-items: center;
  justify-content: center;
  z-index: 2;
`;

const BtnText = styled.Text`
  font-size: 16;
  font-weight: bold;
  color: white;
`;

// 중복안될경우
const Ok = styled.Text`
  color: blue;
  font-size: 16;
  margin-left: 70;
`;

const SelectImg = styled.Image`
  width: 200;
  height: 200;
  position: absolute;
  top: 10;
  border-radius: 100;
  z-index: 1;
`;

export default class PageOne extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user_id: "",
      pw: "",
      pwcheck: "",
      nickname: "",
      idcheck: false,
      namecheck: false,
      selectedImage: null,
      setSelectedImage: false,
    };
  }

  idCheck = () => {
    this.setState({ ischeck: true });
    const { user_id } = this.state;
    console.log(user_id);
  };

  nameCheck = () => {
    this.setState({ namecheck: true });
    const { nickname } = this.state;
    console.log(nickname);
  };

  render() {
    const { selectedImage, setSelectedImage } = this.state;

    let openImagePickerAsync = async () => {
      let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

      if (permissionResult.granted === false) {
        alert("Permission to access camera roll is required!");
        return;
      }

      let pickerResult = await ImagePicker.launchImageLibraryAsync();
      if (pickerResult.cancelled === true) {
        return;
      }
      this.setState({ selectedImage: pickerResult.uri });
      this.setState({ setSelectedImage: true });
    };

    const { ischeck } = this.state;
    const { namecheck } = this.state;

    return (
      <Container>
        <UserImg onPress={openImagePickerAsync}>
          <EvilIcons size={280} name={"user"} color={"#565656"} />
          {setSelectedImage ? (
            <SelectImg source={{ uri: selectedImage }} />
          ) : null}
        </UserImg>
        <InputContainer>
          <CheckBtn style={{ top: 38 }} onPress={this.idCheck}>
            <BtnText>중복</BtnText>
          </CheckBtn>
          <Text style={styles.TextStyle}>
            ID {"  "}
            {ischeck ? <Ok>OK</Ok> : null}
          </Text>
          <TextInput
            style={styles.inputBox}
            placeholder="사용하실 ID를 입력하세요"
            onChangeText={(user_id) => this.setState({ user_id })}
          />

          <Text style={styles.TextStyle}>PW</Text>
          <TextInput
            style={styles.inputBox}
            placeholder="사용하실 PW를 입력하세요"
            secureTextEntry={true}
          />

          <Text style={styles.TextStyle}>PW(CHECK)</Text>
          <TextInput
            style={styles.inputBox}
            placeholder="PW를 재입력하세요"
            secureTextEntry={true}
          />

          <Text style={styles.TextStyle}>
            NICKNAME {"  "}
            {namecheck ? <Ok>OK</Ok> : null}
          </Text>
          <CheckBtn style={{ top: 350 }} onPress={this.nameCheck}>
            <BtnText>중복</BtnText>
          </CheckBtn>
          <TextInput
            style={styles.inputBox}
            placeholder="사용하실 이름을 입력하세요"
          />
        </InputContainer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  TextStyle: {
    fontSize: 16,
    color: "#565656",
    fontWeight: "bold",
  },
  inputBox: {
    width: 330,
    paddingVertical: 16,
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    marginVertical: 3,
    marginBottom: 30,
    zIndex: 1,
  },
});

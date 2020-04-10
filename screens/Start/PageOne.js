import React from "react";
import { Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import styled from "styled-components";
import { EvilIcons, Octicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

const Container = styled.View`
  flex: 1;
`;
const UserImg = styled.TouchableOpacity`
  flex: 0.35;
  align-items: center;
`;

const InputContainer = styled.View`
  flex: 0.45;
  justify-content: center;
  margin-left: 40;
`;

const SelectImg = styled.Image`
  width: 200;
  height: 200;
  position: absolute;
  top: 10;
  border-radius: 100;
  z-index: 1;
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

// 하단 뷰
const BottomContainer = styled.View`
  flex: 0.2;
`;
export default class PageOne extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
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

  info = () => {
    const { user_id, pw, nickname, selectedImage } = this.state;
    this.props.information({
      page: 2,
      user_id: user_id,
      pw: pw,
      nickname: nickname,
      selectedImage: selectedImage,
    });
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

    const { page, user_id, pw, pwcheck, nickname } = this.state;

    return (
      <Container>
        <UserImg onPress={openImagePickerAsync}>
          <EvilIcons size={280} name={"user"} color={"#565656"} />
          {setSelectedImage ? (
            <SelectImg source={{ uri: selectedImage }} />
          ) : null}
        </UserImg>
        <InputContainer>
          <Text style={styles.TextStyle}>ID </Text>
          <TextInput
            style={styles.inputBox}
            placeholder={user_id ? user_id : "사용하실 ID를 입력하세요"}
            onChangeText={(user_id) => this.setState({ user_id })}
          />

          <Text style={styles.TextStyle}>PW</Text>
          <TextInput
            style={styles.inputBox}
            placeholder="사용하실 PW를 입력하세요"
            secureTextEntry={true}
            onChangeText={(pw) => this.setState({ pw })}
          />

          <Text style={styles.TextStyle}>PW(CHECK)</Text>
          <TextInput
            style={styles.inputBox}
            placeholder="PW를 재입력하세요"
            secureTextEntry={true}
            onChangeText={(pwcheck) => this.setState({ pwcheck })}
          />

          <Text style={styles.TextStyle}>NICKNAME</Text>
          <TextInput
            style={styles.inputBox}
            placeholder="사용하실 이름을 입력하세요"
            onChangeText={(nickname) => this.setState({ nickname })}
          />
        </InputContainer>
        <BottomContainer>
          <PageControl>
            {page == 4 ? null : (
              <PageUp onPress={this.info}>
                <Octicons size={32} name={"chevron-right"} />
              </PageUp>
            )}
          </PageControl>
          <CircleView>
            <CircleNow />
            <Circle />
            <Circle />
            <Circle />
          </CircleView>
        </BottomContainer>
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
    fontSize: 14,
    marginVertical: 3,
    marginBottom: 30,
    zIndex: 1,
  },
});

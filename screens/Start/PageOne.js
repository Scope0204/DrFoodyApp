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
  margin-left: 40px;
`;

const SelectImg = styled.Image`
  width: 200px;
  height: 200px;
  position: absolute;
  top: 10px;
  border-radius: 100px;
  z-index: 1;
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
      password: "",
      pwcheck: "",
      nickname: "",
      idcheck: false,
      namecheck: false,
      selectedImage: null,
      setSelectedImage: false,
    };
  }

  componentDidMount = () => {
    const photo = this.props.save.photo;
    let setphoto = false;
    if (photo) {
      setphoto = true;
    }
    this.setState({
      user_id: this.props.save.user_id,
      password: this.props.save.password,
      nickname: this.props.save.nickname,
      selectedImage: photo,
      setSelectedImage: setphoto,
    });
  };

  info = () => {
    const { user_id, password, nickname, selectedImage } = this.state;
    this.props.information({
      page: 2,
      user_id: user_id,
      password: password,
      nickname: nickname,
      photo: selectedImage,
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
      console.log(pickerResult.uri);
    };

    const { page, user_id, password, pwcheck, nickname } = this.state;

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
            placeholder={"使用するIDを入力してください"}
            onChangeText={(user_id) => this.setState({ user_id })}
            value={user_id}
          />

          <Text style={styles.TextStyle}>PW</Text>
          <TextInput
            style={styles.inputBox}
            placeholder="使用するPWを入力してください"
            secureTextEntry={true}
            onChangeText={(password) => this.setState({ password })}
            value={password}
          />

          <Text style={styles.TextStyle}>PW(CHECK)</Text>
          <TextInput
            style={styles.inputBox}
            placeholder="PWを再入力してください"
            secureTextEntry={true}
            onChangeText={(pwcheck) => this.setState({ pwcheck })}
            value={pwcheck}
          />

          <Text style={styles.TextStyle}>NICKNAME</Text>
          <TextInput
            style={styles.inputBox}
            placeholder="使用する名前を入力してください"
            onChangeText={(nickname) => this.setState({ nickname })}
            value={nickname}
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

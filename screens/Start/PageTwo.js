import React from "react";
import { StyleSheet, TextInput, TouchableOpacity, Text } from "react-native";
import styled from "styled-components";
import { FontAwesome, AntDesign, Octicons } from "@expo/vector-icons";
import SelectInput from "react-native-select-input-ios";

const Container = styled.View`
  flex: 1;
`;
const MainContainer = styled.View`
  flex: 0.8;
`;
// 하단 뷰
const BottomContainer = styled.View`
  flex: 0.2;
`;
const Title = styled.Text`
  font-size: 16;
  color: #565656;
  font-weight: bold;
  margin-top: 30;
  margin-left: 40;
`;

const BtnContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 5;
`;

const MaleButton = styled.TouchableOpacity`
  border-radius: 5;
  width: 160;
  height: 160;
  background-color: rgba(0, 0, 255, 0.3);
  align-items: center;
  justify-content: center;
  margin-right: 10;
  box-shadow: 2px 2px 2px gray;
`;

const FemaleButton = styled.TouchableOpacity`
  border-radius: 5;
  width: 160;
  height: 160;
  background-color: rgba(255, 0, 0, 0.3);
  align-items: center;
  justify-content: center;
  box-shadow: 2px 2px 2px gray;
`;

const BtnText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 20;
`;

const InputContainer = styled.View`
  flex: 0.4;
  margin-bottom: 20;
`;
// 버튼컨트롤러
const PageControl = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-top: 50;
`;

const PageUp = styled.TouchableOpacity`
  position: absolute;
  right: 30px;
`;

const PageDown = styled.TouchableOpacity`
  position: absolute;
  left: 30px;
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

export default class PageTwo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 2,
      sex: "male", // default 남자
      email: "",
      age: 2020,
      language: "한국어",
      country: "KOREA",
    };
  }

  SelectAge = (value) => {
    this.setState({
      age: value,
    });
  };

  SelectLanguage = (value) => {
    this.setState({
      language: value,
    });
  };

  SelectCountry = (value) => {
    this.setState({
      country: value,
    });
  };

  SelectMale = () => {
    this.setState({ sex: "male" });
  };

  SelectFemale = () => {
    this.setState({ sex: "female" });
  };

  // 화면 이동 및 state 값 전달
  info = () => {
    const { sex, email, age, language, country } = this.state;
    this.props.information({
      page: 3,
      sex: sex,
      email: email,
      age: age,
      language: language,
      country: country,
    });
  };

  backInfo = () => {
    const { sex, email, age, language, country } = this.state;
    this.props.information({
      page: 1,
      sex: sex,
      email: email,
      age: age,
      language: language,
      country: country,
    });
  };
  render() {
    const { sex, age, language, country, page } = this.state;

    const years = [];
    for (let a = 1950; a <= 2020; a++) {
      years.push({ value: a, label: a + "년" });
      //   years.push({ value: a, label: a + "년" + "(" + (2020 - a) + "세)" });
    }

    const languages = [
      {
        value: "한국어",
        label: "한국어",
      },
      {
        value: "日本語",
        label: "日本語",
      },
      {
        value: "English",
        label: "English",
      },
    ];

    const countries = [
      {
        value: "KOREA",
        label: "KOREA",
      },
      {
        value: "JAPAN",
        label: "JAPAN",
      },
      {
        value: "USA",
        label: "USA",
      },
    ];

    return (
      <Container>
        <MainContainer>
          <Title style={{ marginTop: 20 }}>ZENDER</Title>
          <BtnContainer>
            <MaleButton
              activeOpacity={1}
              style={sex == "male" ? styles.boxStyle1 : null}
              onPress={this.SelectMale}
            >
              <FontAwesome
                size={80}
                name={"male"}
                color={"white"}
                style={{ marginBottom: 15 }}
              />
              <BtnText>Male</BtnText>
            </MaleButton>
            <FemaleButton
              activeOpacity={1}
              style={sex == "female" ? styles.boxStyle2 : null}
              onPress={this.SelectFemale}
            >
              <FontAwesome
                size={80}
                name={"female"}
                color={"white"}
                style={{ marginBottom: 15 }}
              />
              <BtnText>Female</BtnText>
            </FemaleButton>
          </BtnContainer>
          <InputContainer>
            <Title>E-MAIL</Title>
            <TextInput
              style={styles.inputBox}
              placeholder="e-mail을 입력하세요"
              secureTextEntry={false}
              onChangeText={(email) => this.setState({ email })}
            />
            <Title>AGE</Title>
            <SelectInput
              style={styles.inputBox}
              value={age}
              options={years}
              onSubmitEditing={this.SelectAge.bind(this)}
            />
            <Title>LANGUAGE</Title>
            <SelectInput
              style={styles.inputBox}
              value={language}
              options={languages}
              onSubmitEditing={this.SelectLanguage.bind(this)}
            />
            <Title>COUNTRY</Title>
            <SelectInput
              id={1}
              style={styles.inputBox}
              value={country}
              options={countries}
              onSubmitEditing={this.SelectCountry.bind(this)}
            />
          </InputContainer>
        </MainContainer>
        <BottomContainer>
          <PageControl>
            <PageDown onPress={this.backInfo}>
              <Octicons size={32} name={"chevron-left"} color={"#565656"} />
            </PageDown>
            <PageUp onPress={this.info}>
              <Octicons size={32} name={"chevron-right"} color={"#565656"} />
            </PageUp>
          </PageControl>
          <CircleView>
            <Circle />
            <CircleNow />
            <Circle />
            <Circle />
          </CircleView>
        </BottomContainer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  boxStyle1: {
    backgroundColor: "blue",
  },
  boxStyle2: {
    backgroundColor: "red",
  },

  inputBox: {
    width: 330,
    paddingVertical: 16,
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    paddingHorizontal: 16,
    marginVertical: 3,
    marginLeft: 40,
    alignItems: "flex-start",
  },
});

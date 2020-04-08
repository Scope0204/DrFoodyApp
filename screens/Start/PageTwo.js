import React from "react";
import { StyleSheet, TextInput, TouchableOpacity, Text } from "react-native";
import styled from "styled-components";
import { FontAwesome } from "@expo/vector-icons";
import SelectInput from "react-native-select-input-ios";

const Container = styled.View`
  flex: 1;
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
`;

const FemaleButton = styled.TouchableOpacity`
  border-radius: 5;
  width: 160;
  height: 160;
  background-color: rgba(255, 0, 0, 0.3);
  align-items: center;
  justify-content: center;
`;

const BtnText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 20;
`;

export default class PageTwo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sex: true, // true 남자 false 여자
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
    this.setState({ sex: true });
  };

  SelectFemale = () => {
    this.setState({ sex: false });
  };

  render() {
    const { sex } = this.state;
    const { age } = this.state;
    const { language } = this.state;
    const { country } = this.state;

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
        <Title>ZENDER</Title>
        <BtnContainer>
          <MaleButton
            activeOpacity={1}
            style={sex ? styles.boxStyle1 : null}
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
            style={sex ? null : styles.boxStyle2}
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
        <Title>E-MAIL</Title>
        <TextInput
          style={styles.inputBox}
          placeholder="e-mail을 입력하세요"
          secureTextEntry={false}
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
          style={styles.inputBox}
          value={country}
          options={countries}
          onSubmitEditing={this.SelectCountry.bind(this)}
        />
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
    zIndex: 1,
    marginLeft: 40,
    marginTop: 5,
    alignItems: "flex-start",
    fontSize: 16,
  },
});

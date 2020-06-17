import React from "react";
import { View, Text, Image, ScrollView, Dimensions } from "react-native";
import hot from "../../images/taste/chili.png";
import sweet from "../../images/taste/honey.png";
import sour from "../../images/taste/lemon.png";
import bitter from "../../images/taste/tea.png";
import salty from "../../images/taste/salt.png";
import styled from "styled-components";
import axios from "axios"; // npm i axios@0.18.0
import TasteChart from "../../components/TasteChart";

const { width, height } = Dimensions.get("window");

const Container = styled.View`
  flex: 1;
`;
const Title = styled.Text`
  font-weight: bold;
  font-size: 18px;
`;
const TasteCon = styled.View`
  justify-content: center;
`;

const TasteTitle = styled.Text`
  font-size: 40px;
  font-weight: bold;
  margin-top: 15px;
`;
export default class Taste extends React.Component {
  render() {
    return (
      <ScrollView>
        <Container>
          <View style={{ padding: 22 }}>
            <Title>맛 레벨</Title>
          </View>
          <TasteChart food_name={this.props.food_name} />

          <View style={{ padding: 22, marginTop: 10 }}>
            <Title>키워드</Title>
          </View>
        </Container>
      </ScrollView>
    );
  }
}

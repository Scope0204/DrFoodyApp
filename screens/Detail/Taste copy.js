import React from "react";
import { View, Text, Image, ScrollView, Dimensions } from "react-native";
import hot from "../../images/taste/chili.png";
import sweet from "../../images/taste/honey.png";
import sour from "../../images/taste/lemon.png";
import bitter from "../../images/taste/tea.png";
import salty from "../../images/taste/salt.png";
import styled from "styled-components";
import axios from "axios"; // npm i axios@0.18.0

const { width, height } = Dimensions.get("window");

const Container = styled.View`
  flex: 1;
`;
const Title = styled.Text`
  font-weight: bold;
  font-size: 16px;
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
  state = {
    taste: ["sweet", "hot"],
    level: [5, 1],
  };

  //   componentDidMount = async () => {
  //     //
  //     const food_name = this.props.food_name;
  //     try {
  //       await axios({
  //         method: "post",
  //         url: "http://35.185.221.213:5000/tasteNumber",
  //         headers: {
  //           Accept: "application/json", // 서버가 json 타입으로 변환해서 사용
  //           "Content-Type": "application/json",
  //         },
  //         data: {
  //           productName: food_name,
  //         },
  //       })
  //         .then((response) => {
  //           //   console.log(response.data.taste[0]);
  //           console.log(response.data);
  //         })
  //         .catch((err) => console.log(err));
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  tasteLevel = (level, kind) => {
    //  level -> 레벨만큼 반복함수로 , kind -> 종류(맛)에 따른 이미지 선택
    let icon = [];
    for (var x = 0; x < level; x++) {
      if (kind == "hot")
        icon.push(
          <View key={x}>
            <Image
              source={hot}
              style={{ width: 70, height: 70, marginLeft: 5 }}
            />
          </View>
        );
      else if (kind == "sweet")
        icon.push(
          <View key={x}>
            <Image
              source={sweet}
              style={{ width: 70, height: 70, marginLeft: 5 }}
            />
          </View>
        );
      else if (kind == "sour")
        icon.push(
          <View key={x}>
            <Image
              source={sour}
              style={{ width: 70, height: 70, marginLeft: 5 }}
            />
          </View>
        );
      else if (kind == "bitter")
        icon.push(
          <View key={x}>
            <Image
              source={bitter}
              style={{ width: 70, height: 70, marginLeft: 5 }}
            />
          </View>
        );
      else if (kind == "salty")
        icon.push(
          <View key={x}>
            <Image
              source={salty}
              style={{ width: 65, height: 65, marginLeft: 15 }}
            />
          </View>
        );
    }
    return <View style={{ flexDirection: "row" }}>{icon}</View>;
  };

  render() {
    const { taste, level, food_name } = this.state;
    // <View>{this.tasteLevel(level.length)}</View>;
    return (
      <ScrollView>
        <Container>
          <View style={{ padding: 22 }}>
            <Title>맛 레벨</Title>
          </View>
          <View // 맵함수로 이거 꾸미자
            style={{
              width: width - 30,
              marginLeft: 15,
              alignItems: "center",
            }}
          >
            <TasteCon>{this.tasteLevel(level[0], taste[0])}</TasteCon>
            <TasteTitle>
              {taste[0]} {"  Lv." + level[0]}
            </TasteTitle>
          </View>
          <View style={{ padding: 22, marginTop: 10 }}>
            <Title>키워드</Title>
          </View>
        </Container>
      </ScrollView>
    );
  }
}

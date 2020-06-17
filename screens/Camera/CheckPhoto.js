import React from "react";

import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Image,
} from "react-native";
import styled from "styled-components";
import axios from "axios"; // npm i axios@0.18.0

const Header = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-end;
`;
const Body = styled.View`
  flex: 3;
  align-items: center;
  justify-content: center;
`;
const BtnCon = styled.View`
  flex: 1.2;
  align-items: center;
  justify-content: flex-start;
`;

export default class LinkFail extends React.Component {
  state = {
    food_name: null,
    food_photo: null,
    show: false,
  };

  componentDidMount = async () => {
    const { navigation } = this.props;
    const food_id = navigation.getParam("Id");
    const user_id = navigation.getParam("User");

    //음식정보 가져오기
    try {
      await axios({
        method: "post",
        url: "http://3.34.97.97/api/app/detailFood",

        headers: {
          //응답에 대한 정보
          Accept: "application/json", // 서버가 json 타입으로 변환해서 사용
          "Content-Type": "application/json",
        },
        data: {
          food_id: food_id,
        },
      })
        .then((response) => {
          if (response) {
            this.setState({
              food_name: response.data[0].food_name,
              food_photo: response.data[0].food_photo,
            });
          } else {
            console.log("no");
          }

          this.setState({ show: true });
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    const { food_name, food_photo, show } = this.state;
    const { navigation } = this.props;
    const food_id = navigation.getParam("Id");
    const user_id = navigation.getParam("User");
    return show ? (
      <View style={{ flex: 1 }}>
        <Header>
          <Text style={{ fontSize: 26, fontWeight: "bold", color: "#5DADE2" }}>
            인식 성공!
          </Text>
        </Header>
        <Body>
          <Text style={{ fontSize: 26, fontWeight: "bold" }}>{food_name}</Text>
          <Image
            source={{ uri: food_photo }}
            style={{ width: 200, height: 200, marginBottom: 80 }}
          />
          <Text style={{ fontSize: 18, marginBottom: 5 }}>
            해당 제품이 맞습니까?
          </Text>
        </Body>
        <BtnCon>
          <TouchableOpacity
            style={{
              width: 300,
              height: 50,
              backgroundColor: "#ff5122",
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
            //   onPress={() => this.postPhoto(photoUri)}
            onPress={() =>
              this.props.navigation.navigate("Detail", {
                Id: food_id,
                User: user_id,
              })
            }
          >
            <Text style={{ fontSize: 20, color: "white" }}>네, 맞습니다!</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 300,
              height: 50,
              backgroundColor: "#C7C7C7",
              marginTop: 10,
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
            //   onPress={() => this.postPhoto(photoUri)}
            onPress={() => this.props.navigation.navigate("Camera")}
          >
            <Text style={{ fontSize: 20, color: "white" }}>
              아니오, 잘못된것같습니다
            </Text>
          </TouchableOpacity>
        </BtnCon>
      </View>
    ) : null;
  }
}

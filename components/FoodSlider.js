import React from "react";
import styled from "styled-components";
import Swiper from "react-native-swiper"; // 폰의 슬라이더 작업을 커스텀해준다
import Layout from "../constants/Layout";

import {
  Image,
  View,
  Text,
  TouchableOpacity,
  TouchableOpacityBase,
} from "react-native";
import axios from "axios"; // npm i axios@0.18.0

const SWIPER_HEIGHT = Layout.height / 3.7;
const SWIPER_WIDTH = Layout.width / 2;

const Container = styled.View`
  background-color: white;
  height: ${SWIPER_HEIGHT}px;
  width: ${SWIPER_WIDTH - 10}px;
  align-items: center;
  border-radius: 10px;
  flex: 1;
  border: black;
`;
export default class FoodSlider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      food_list: [],
      food_name: "",
    };
  }

  // 제품 정보페이지로 이동
  info = (e) => {
    this.props.info(e);
  };

  componentDidMount() {
    const { food_list } = this.state;
    axios({
      //   url: "http://192.168.200.175/User_Site/FoodList.php",
      url: "http://192.168.0.3/User_Site/FoodList.php",
    }).then((response) => {
      //   console.log(response);
      if (response) {
        for (var key in response.data) {
          var List = response.data[key];
          console.log(List);
          console.log(key);
          this.setState({
            food_list: this.state.food_list.concat({
              id: key,
              name: List.name,
              photo: List.photo,
            }),
          });

          console.log(food_list);
        }
        // console.log(food_list);
      } else {
        console.log("no");
      }
    });
  }
  render() {
    const { food_list } = this.state;
    return (
      <Swiper
        autoplay={true}
        autoplayTimeout={3}
        style={{
          height: SWIPER_HEIGHT,
          //   width: SWIPER_WIDTH,
        }}
        showsPagination={false}
      >
        {food_list
          ? food_list.map((list, key) => {
              return (
                <View
                  style={{
                    // backgroundColor: "red",
                    height: SWIPER_HEIGHT,
                    width: SWIPER_WIDTH,
                    alignItems: "center",
                  }}
                  key={key}
                >
                  <Container>
                    <View
                      style={{
                        flex: 0.1,
                        justifyContent: "center",
                        marginTop: 15,
                      }}
                    >
                      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                        {list.name}
                      </Text>
                    </View>
                    <View style={{ flex: 0.7, justifyContent: "center" }}>
                      {list.photo ? (
                        <Image
                          source={{
                            uri: list.photo,
                          }}
                          style={{ width: 150, height: 150 }}
                        ></Image>
                      ) : (
                        <Text>이미지 없음</Text>
                      )}
                    </View>
                    <View
                      style={{
                        flex: 0.15,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#FF2257",
                        width: 100,
                        marginBottom: 5,
                        borderRadius: 10,
                      }}
                    >
                      <TouchableOpacity onPress={() => this.info(list.name)}>
                        <Text style={{ color: "white", fontWeight: "bold" }}>
                          Check this
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </Container>
                </View>
              );
            })
          : null}
      </Swiper>
    );
  }
}
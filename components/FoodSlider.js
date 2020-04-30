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

export default class FoodSlider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      food_list: [],
    };
  }

  componentDidMount() {
    const { food_list } = this.state;
    axios({
      url: "http://192.168.200.175/User_Site/FoodList.php",
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
      <Swiper>
        {food_list
          ? food_list.map((list, key) => {
              return (
                <View style={{ backgroundColor: "red" }} key={key}>
                  <Text>{list.name}</Text>
                  <Text>{list.photo}</Text>
                </View>
              );
            })
          : null}
      </Swiper>
    );
  }
}

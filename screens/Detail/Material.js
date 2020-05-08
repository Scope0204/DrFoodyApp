import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styled, { keyframes } from "styled-components";
import axios from "axios";

export default class Material extends React.Component {
  state = {
    material: [],
  };
  componentDidMount = async () => {
    const { food_id } = this.props;

    await axios({
      method: "post",
      url: "http://15.164.224.142/app/Material.php",

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
          //   console.log(response.data);

          for (var key in response.data) {
            var List = response.data[key];
            this.setState({
              material: this.state.material.concat({
                id: key,
                material: List.material,
              }),
            });
          }
        } else {
          console.log("no");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  aa = () => {
    const { material } = this.state;
    alert(material);
  };

  render() {
    const { material } = this.state;
    return (
      <View>
        {material
          ? material.map((list, key) => {
              return (
                <View key={key}>
                  <Text>{list.material}</Text>
                </View>
              );
            })
          : null}
      </View>
    );
  }
}

import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Swiper from "react-native-swiper"; // 폰의 슬라이더 작업을 커스텀해준다
import Layout from "../constants/Layout";
import { Image } from "react-native";
import source from "../assets/icon.png";

const SWIPER_WIDTH = Layout.width;
const SWIPER_HEIGHT = Layout.height / 3.5;

const View = styled.View`
  background-color: white;
  height: ${SWIPER_HEIGHT}px;
  border: 0.5px solid #d5d8dc;
  align-items: center;
  justify-content: center;
`;

const Text = styled.Text``;

const AdSlider = ({ ad }) => (
  <Swiper
    // 페이지 슬롯
    showsPagination={false}
    autoplay={true}
    style={{
      //   backgroundColor: "blue",
      height: SWIPER_HEIGHT,
      alignItems: "center",
    }}
    autoplayTimeout={5}
  >
    <View>
      <Image
        source={require("../images/ad/새우깡.jpg")}
        style={{ width: SWIPER_WIDTH, height: SWIPER_HEIGHT }}
      ></Image>
    </View>
    <View>
      <Image
        source={require("../images/ad/신라면.png")}
        style={{ width: SWIPER_WIDTH, height: SWIPER_HEIGHT }}
      ></Image>
    </View>
    <View>
      <Image
        source={require("../images/ad/불닭.jpg")}
        style={{ width: SWIPER_WIDTH, height: SWIPER_HEIGHT }}
      ></Image>
    </View>
  </Swiper>
);

AdSlider.propTypes = {
  ad: PropTypes.array,
};

export default AdSlider;

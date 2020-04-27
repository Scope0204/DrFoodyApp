import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Swiper from "react-native-swiper"; // 폰의 슬라이더 작업을 커스텀해준다
import Layout from "../constants/Layout";
import { Image } from "react-native";
import source from "../assets/icon.png";

const SWIPER_HEIGHT = Layout.height / 3;
const SWIPER_WIDTH = Layout.width - 40;

const View = styled.View`
  background-color: white;
  height: ${SWIPER_HEIGHT}px;
  border: 1px solid #d5d8dc;
  align-items: center;
  justify-content: center;
`;

const Text = styled.Text``;

const AdSlider = ({ ad }) => (
  <Swiper
    // 페이지 슬롯
    // showsPagination={false}
    autoplay={true}
    style={{
      //   backgroundColor: "blue",
      height: SWIPER_HEIGHT + 12,
      alignItems: "center",
    }}
    autoplayTimeout={3}
  >
    <View>
      <Image
        source={{
          uri: "https://facebook.github.io/react-native/img/tiny_logo.png",
        }}
        style={{ width: 50, height: 50 }}
      ></Image>
    </View>
    <View>
      <Text>2</Text>
    </View>
    <View>
      <Text>3</Text>
    </View>
  </Swiper>
);

AdSlider.propTypes = {
  ad: PropTypes.array,
};

export default AdSlider;

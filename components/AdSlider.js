import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Swiper from "react-native-swiper"; // 폰의 슬라이더 작업을 커스텀해준다
import Layout from "../constants/Layout";

const SWIPER_HEIGHT = Layout.height / 4;

const View = styled.View`
  background-color: red;
  height: ${SWIPER_HEIGHT};
`;

const Text = styled.Text``;

const AdSlider = ({ ad }) => (
  <Swiper
    // showsPagination={false}
    autoplay={true}
    style={{
      backgroundColor: "blue",
      height: SWIPER_HEIGHT,
      dotStyle: {
        backgroundColor: "red",
      },
    }}
    autoplayTimeout={3}
  >
    <View>
      <Text>1</Text>
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

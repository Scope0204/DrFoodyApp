import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Swiper from "react-native-swiper"; // 폰의 슬라이더 작업을 커스텀해준다
import Layout from "../constants/Layout";
import PageOne from "../screens/Start/PageOne";
import PageTwo from "../screens/Start/PageTwo";
import PageThree from "../screens/Start/PageThree";
import PageFour from "../screens/Start/PageFour";

const SWIPER_HEIGHT = Layout.height * 0.82;

const View = styled.View`
  height: ${SWIPER_HEIGHT};
`;

const Text = styled.Text``;

const SignupSlider = ({ page }) => (
  <Swiper
    // showsPagination={false}
    autoplay={false}
    style={{
      height: SWIPER_HEIGHT,
    }}
  >
    <View>
      <PageOne />
    </View>
    <View>
      <PageTwo />
    </View>
    <View>
      <PageThree />
    </View>
    <View>
      <PageFour />
    </View>
  </Swiper>
);

SignupSlider.propTypes = {
  page: PropTypes.array,
};

export default SignupSlider;

import React from "react";
import propTypes from "prop-types";
import { AntDesign } from "@expo/vector-icons";
import { ACTIVE_COLOR, INACTIVE_COLOR } from "../constants/Colors";

//focused = true / false  --> 현재 선택한 네비 . 그에 따라 색상 변경
const TabBarIcon = ({ name, focused }) => (
  // expo의 icon 참조
  <AntDesign
    size={30}
    name={name}
    color={focused ? "#ff5122" : INACTIVE_COLOR}
  />
);

TabBarIcon.propTypes = {
  name: propTypes.string.isRequired,
  focused: propTypes.bool.isRequired,
};

export default TabBarIcon;

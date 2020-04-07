import React from "react";
import propTypes from "prop-types";
import { Ionicons } from "@expo/vector-icons";
import { ACTIVE_COLOR, INACTIVE_COLOR } from "../constants/Colors";

//focused = true / false  --> 현재 선택한 네비 . 그에 따라 색상 변경
const TabBarIcon = ({ name, focused }) => (
  // expo의 icon 참조
  <Ionicons
    size={32}
    name={name}
    color={focused ? "#FF8000" : INACTIVE_COLOR}
  />
);

TabBarIcon.propTypes = {
  name: propTypes.string.isRequired,
  focused: propTypes.bool.isRequired
};

export default TabBarIcon;

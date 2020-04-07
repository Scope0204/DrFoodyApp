import React from "react";
import propTypes from "prop-types";
import { Ionicons } from "@expo/vector-icons";
import { ACTIVE_COLOR, INACTIVE_COLOR } from "../constants/Colors";

const SettingIcon = ({ name, focused }) => (
  // expo의 icon 참조
  <Ionicons size={32} name={name} color={focused ? "black" : INACTIVE_COLOR} />
);

SettingIcon.propTypes = {
  name: propTypes.string.isRequired,
  focused: propTypes.bool.isRequired
};

export default SettingIcon;

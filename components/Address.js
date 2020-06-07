import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import * as Location from "expo-location";
import Geocoder from "react-native-geocoding";

Geocoder.init("AIzaSyBSXrsss-zl7rv2ldcksyKCVjP0MmDOjUc", { language: "ko" });

export default class Address extends React.Component {
  state = {
    latitude: 0,
    longitude: 0,
    show: null,
    address: null,
  };

  componentDidMount = () => {
    this.nowlocation();
  };

  nowlocation = async () => {
    try {
      await Location.requestPermissionsAsync();
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();
      this.setState({ show: true, latitude: latitude, longitude: longitude });
      this._attemptReverseGeocodeAsync();
    } catch (error) {
      Alert.alert("can't find you.", " so sad");
    }
  };

  _attemptReverseGeocodeAsync = async () => {
    const { latitude, longitude } = this.state;
    Geocoder.from(latitude, longitude)
      .then((json) => {
        this.setState({ address: json.results[2].formatted_address });
      })
      .catch((error) => console.log(error));
  };

  render() {
    const { address } = this.state;
    // console.log(address);
    return (
      <View>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>{address}</Text>
      </View>
    );
  }
}

import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import MapView from "react-native-maps";
import * as Location from "expo-location";

export default class Map extends React.Component {
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
    } catch (error) {
      Alert.alert("can't find you.", "so sad");
    }
  };

  render() {
    const { latitude, longitude, show } = this.state;

    return show ? (
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <MapView.Marker
          coordinate={{ latitude: latitude, longitude: longitude }}
        />
      </MapView>
    ) : null;
  }
}

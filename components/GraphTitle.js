import React from "react";
import {
  Text,
  View,
  Dimensions,
  FlatList,
  TouchableHighlightBase,
} from "react-native";
import styled from "styled-components";

const { width, height } = Dimensions.get("window");

const Circle = styled.View`
  width: 15px;
  height: 15px;
  border-radius: 5px;
  margin-right: 5px;
`;

const ListName = styled.Text`
  font-size: 16px;
`;

export default class GraphTitle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //   color: ["#7DB8E3", "#7DE3DC", "#7DE3B6", "#91E37D", "#C0E37D"],
      //   color: ["#E7CA71", "#9465DA", "#BA66E0", "#E77186", "#E79C71"],
      color: ["#218380", "#519D9E", "#9DC8C8", "#BAD8D8", "#D8E6E7"],
      review: this.props.review,
    };
  }

  list = (e) => {
    const { color, review } = this.state;
    let backgroundColor = null;

    if (e == 0) {
      backgroundColor = color[0];
    } else if (e == 1) {
      backgroundColor = color[1];
    } else if (e == 2) {
      backgroundColor = color[2];
    } else if (e == 3) {
      backgroundColor = color[3];
    } else if (e == 4) {
      backgroundColor = color[4];
    }
    return (
      <View
        style={{
          flexDirection: "row",
          marginBottom: 10,
          alignItems: "center",
        }}
      >
        <Circle style={{ backgroundColor: backgroundColor }} />

        <ListName>{review[e].value + 16}</ListName>
      </View>
    );
  };

  render() {
    return (
      <View style={{ alignItems: "center" }}>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            width: width - 50,
            marginTop: 10,
            marginBottom: 20,
          }}
        >
          {this.list(0)}
          {this.list(1)}
          {this.list(2)}
          {this.list(3)}
          {this.list(4)}
        </View>
      </View>
    );
  }
}

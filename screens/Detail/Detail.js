import React from "react";
import {
  Text,
  View,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { Ionicons, MaterialIcons, Entypo, AntDesign } from "@expo/vector-icons";
import styled from "styled-components";

import Material from ".././Detail/Material";
import Review from ".././Detail/Review";
import Taste from ".././Detail/Taste";

const { width, height } = Dimensions.get("window");

//뒤로가기 , 제품 , 별점 , 좋아요가 담기는 뷰
const FoodScreen = styled.View`
  flex: 0.8;
  align-items: center;
  justify-content: center;
`;

const BackBtn = styled.TouchableOpacity`
  position: absolute;
  top: 55px;
  left: 20px;
`;

//
const Page = styled.ScrollView`
  flex: 1;
  background-color: white;
`;

const ButtonView = styled.View`
  background-color: white;
  flex-direction: row;
  height: 50;
`;

const Button1 = styled.TouchableOpacity`
  width: ${width / 3};
  border: 0.5px #abb2b9;
  align-items: center;
  justify-content: center;
`;

const Button2 = styled.TouchableOpacity`
  width: ${width / 3};
  border: 0.5px #abb2b9;
  align-items: center;
  justify-content: center;
`;

const Button3 = styled.TouchableOpacity`
  width: ${width / 3};
  border: 0.5px #abb2b9;
  align-items: center;
  justify-content: center;
`;

export default class Detail extends React.Component {
  state = {
    one: true,
    two: false,
    three: false,
  };
  render() {
    const { one, two, three } = this.state;
    const { navigation } = this.props;
    const Name = navigation.getParam("Name");
    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <FoodScreen>
          <BackBtn onPress={() => this.props.navigation.goBack()}>
            <MaterialIcons
              size={27}
              name={"arrow-back"}
              color={"black"}
            ></MaterialIcons>
          </BackBtn>
          <Text style={{ fontSize: 30 }}>{Name}</Text>
        </FoodScreen>

        <ButtonView>
          <Button1
            onPress={() =>
              this.setState({ one: true, two: false, three: false })
            }
            activeOpacity={1}
            style={[one ? styles.border : null]}
          >
            <Text style={[one ? styles.click : styles.noClick]}>원재료</Text>
          </Button1>
          <Button2
            onPress={() =>
              this.setState({ one: false, two: true, three: false })
            }
            activeOpacity={1}
            style={[two ? styles.border : null]}
          >
            <Text style={[two ? styles.click : styles.noClick]}>맛</Text>
          </Button2>
          <Button3
            onPress={() =>
              this.setState({ one: false, two: false, three: true })
            }
            activeOpacity={1}
            style={[three ? styles.border : null]}
          >
            <Text style={[three ? styles.click : styles.noClick]}>리뷰</Text>
          </Button3>
        </ButtonView>
        <Page alwaysBounceHorizontal={false}>
          {one ? <Material /> : null}
          {two ? <Taste /> : null}
          {three ? <Review /> : null}
        </Page>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  click: {
    fontSize: 20,
    fontWeight: "bold",
  },
  noClick: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#808B96",
  },
  border: {
    borderBottomColor: "white",
  },
});

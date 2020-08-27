import React from "react";
import {
  Text,
  View,
  AsyncStorage,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";
import axios from "axios"; // npm i axios@0.18.0
import styled from "styled-components";
import { FontAwesome, MaterialIcons, AntDesign } from "@expo/vector-icons";
import Carousel from "react-native-snap-carousel";
import { LinearGradient } from "expo-linear-gradient";
import Loading from "../../components/Loading";
import TasteImg from "../../components/TasteImg";

const { width, height } = Dimensions.get("screen");

const CardCon = styled.View`
  width: 315px;
  height: 495px;
  background-color: white;
  align-items: center;
  border-radius: 15px;
  border: 1px #f5f5f5;
  box-shadow: 2px 2px 2px gray;
`;
export default class Curation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      on: false,
      activeIndex: 0,
      carouselItems: [],
      user_id: null,
    };
  }

  componentDidMount = async () => {
    const { navigation } = this.props;
    const user_id = await AsyncStorage.getItem("User");
    this.setState({ user_id: user_id });
    this.focusListener = navigation.addListener("didFocus", () => {
      this.curation_list();
    });
  };

  componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
  }

  curation_list = async () => {
    this.setState({ carouselItems: [], on: false });
    const { user_id } = this.state;

    try {
      await axios({
        // method: "post",
        url: "http://3.34.97.97/api/app/qration/" + user_id,
      })
        .then((response) => {
          console.log(response.data);
          for (var key in response.data) {
            var List = response.data[key];
            this.setState({
              carouselItems: this.state.carouselItems.concat({
                id: key,
                food_id: List.food_id,
                point: List.point, // 리뷰 소숫점 값 처리안되잇음
                food_name: List.food_name,
                food_photo: List.food_photo,
                taste_lv: List.taste_lv,
                taste_name: List.taste_name,
              }),
            });
          }
          this.setState({ on: true });
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (err) {
      console.log(err);
    }
  };

  _renderItem = ({ item, index }) => {
    const { user_id } = this.state;
    let stars = []; // 제품 별점
    let tasteLv = []; // 제품 맛 레벨

    for (var x = 1; x <= 5; x++) {
      if (x <= item.point) {
        stars.push(
          <View key={x}>
            <FontAwesome
              name={"star"}
              color={"orange"}
              size={22}
              style={{ marginHorizontal: 2 }}
            />
          </View>
        );
      } else {
        stars.push(
          <View key={x}>
            <FontAwesome
              name={"star"}
              color={"#b2b2b2"}
              size={22}
              style={{ marginHorizontal: 2 }}
            />
          </View>
        );
      }
    }
    return (
      <CardCon>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            paddingTop: 30,
          }}
        >
          {item.food_name.length > 10
            ? item.food_name.substring(0, 10) + "...."
            : item.food_name}
        </Text>

        <View style={{ flexDirection: "row", paddingTop: 10, marginBottom: 0 }}>
          {stars}
        </View>

        <Image
          source={{ uri: item.food_photo }}
          style={{
            width: 180,
            height: 180,
            marginBottom: -10,
          }}
          //   imageStyle={{ borderRadius: 15 }}
          resizeMode="cover"
        />

        <View style={{ flex: 1 }}>
          <View
            style={{
              flex: 4,
              height: 80,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TasteImg
              level={Math.round(item.taste_lv)}
              taste_name={item.taste_name}
            />
          </View>

          <View
            style={{
              flex: 1,
              justifyContent: "flex-start",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("Detail", {
                  Id: item.food_id,
                  User: user_id,
                });
              }}
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: 150,
                height: 40,
                borderRadius: 10,
                backgroundColor: "#ff5122",
              }}
            >
              <Text
                style={{ fontSize: 16, color: "white", fontWeight: "bold" }}
              >
                Check This
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </CardCon>
    );
  };

  render() {
    const state = this.state;
    // console.log(state.carouselItems);

    return state.on ? (
      <View style={{ backgroundColor: "f5f5f5" }}>
        <View
          style={{
            backgroundColor: "white",
            padding: 10,
            marginTop: 10,
            height: 60,
            paddingLeft: 20,
            borderColor: "#f5f5f5",
            justifyContent: "flex-start",
            borderBottomWidth: 5,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 14,
                paddingBottom: 5,
              }}
            >
              商品レコメンド
            </Text>
            <AntDesign
              name="questioncircle"
              size={14}
              color="#ff5122"
              style={{ paddingLeft: 3, paddingBottom: 5 }}
            />
          </View>

          <Text
            style={{
              fontSize: 12,
            }}
          >
            ユーザーの好みに合う商品をおすすめするサービスです。
          </Text>
        </View>

        <View
          style={{
            backgroundColor: "white",
            height: height,
            marginTop: 30,
          }}
        >
          <View
            style={{
              alignItems: "center",
              marginTop: 15,
              height: 500,
            }}
          >
            <Carousel
              ref={(ref) => (this.carousel = ref)}
              data={this.state.carouselItems}
              sliderWidth={width}
              itemWidth={315}
              layout={"stack"}
              layoutCardOffset={18}
              renderItem={this._renderItem}
              onSnapToItem={(index) => this.setState({ activeIndex: index })}
            />
          </View>
        </View>
      </View>
    ) : (
      <Loading />
    );
  }
}

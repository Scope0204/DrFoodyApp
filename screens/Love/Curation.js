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
  height: 465px;
  background-color: white;
  align-items: center;
  border-radius: 15px;
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
              size={16}
              style={{ marginHorizontal: 6 }}
            />
          </View>
        );
      } else {
        stars.push(
          <View key={x}>
            <FontAwesome
              name={"star"}
              color={"#b2b2b2"}
              size={16}
              style={{ marginHorizontal: 6 }}
            />
          </View>
        );
      }
    }
    return (
      <CardCon>
        <Text style={{ fontSize: 20, fontWeight: "bold", paddingTop: 20 }}>
          {item.food_name}
        </Text>

        <View style={{ flexDirection: "row", padding: 20 }}>{stars}</View>

        <Image
          source={{ uri: item.food_photo }}
          style={{
            width: 180,
            height: 180,
            borderRadius: 15,
            marginBottom: 10,
          }}
          imageStyle={{ borderRadius: 15 }}
          resizeMode="cover"
        />

        <View>
          <View
            style={{
              height: 90,
              alignItems: "center",
              justifyContent: "center",
              //   backgroundColor: "red",
            }}
          >
            <TasteImg
              level={Math.round(item.taste_lv)}
              taste_name={item.taste_name}
            />
          </View>
        </View>

        <TouchableOpacity
          onPress={() => {
            // this.goDetail(item.food_id,user_id);

            this.props.navigation.navigate("Detail", {
              Id: item.food_id,
              User: user_id,
            });
          }}
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: 250,
            height: 50,
            borderRadius: 10,
            backgroundColor: "black",
          }}
        >
          <Text style={{ fontSize: 16, color: "white", fontWeight: "bold" }}>
            Check This
          </Text>
        </TouchableOpacity>
      </CardCon>
    );
  };

  render() {
    const state = this.state;
    // console.log(state.carouselItems);

    return state.on ? (
      <View style={{ backgroundColor: "#f5f5f5" }}>
        <View
          style={{
            backgroundColor: "white",
            padding: 10,
            marginTop: 10,
            height: 55,
            paddingLeft: 20,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 14,
                paddingBottom: 5,
              }}
            >
              큐레이션
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
            User분의 맛기호도에 따른 음식을 추천해드리는 서비스 입니다.
          </Text>
        </View>

        <View
          style={{
            backgroundColor: "#f5f5f5",
            height: height,
            marginTop: 30,
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                fontSize: 16,
                color: "orange",
                fontWeight: "400",
                fontWeight: "bold",
              }}
            >
              Drag and drop to view the list
            </Text>
          </View>

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

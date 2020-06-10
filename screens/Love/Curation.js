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

const { width, height } = Dimensions.get("screen");

const CardCon = styled.View`
  width: 315px;
  height: 425px;
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
    };
  }

  componentDidMount = () => {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", () => {
      this.curation_list();
    });
  };

  componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
  }

  //일단 임시로 찜목록만 해봄
  curation_list = async () => {
    this.setState({ carouselItems: [] });
    const user_id = await AsyncStorage.getItem("User");
    try {
      //찜목록 가져오기
      await axios({
        method: "post",
        url: "http://3.34.97.97/api/app/dibsList",
        headers: {
          //응답에 대한 정보
          Accept: "application/json", // 서버가 json 타입으로 변환해서 사용
          "Content-Type": "application/json; charset=utf-8",
        },
        data: {
          user_id: user_id,
        },
      })
        .then((response) => {
          for (var key in response.data) {
            var List = response.data[key];
            this.setState({
              carouselItems: this.state.carouselItems.concat({
                id: key,
                food_id: List.food_id,
                point: List.point, // 리뷰 소숫점 값 처리안되잇음
                food_name: List.food.food_name,
                food_photo: List.food.food_photo,
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

  _renderItem({ item, index }) {
    let stars = [];

    for (let x = 1; x <= 5; x++) {
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
            width: 150,
            height: 150,
            borderRadius: 15,
          }}
          imageStyle={{ borderRadius: 15 }}
          resizeMode="cover"
        ></Image>
        <View>
          <View style={{ height: 100, backgroundColor: "white" }}>
            <Text>맛 정보</Text>
          </View>
          <TouchableOpacity>
            <LinearGradient
              colors={["orange", "#ffc30f"]}
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: 250,
                height: 50,
                borderRadius: 10,
              }}
            >
              <Text
                style={{ fontSize: 16, color: "white", fontWeight: "bold" }}
              >
                Check This
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </CardCon>
    );
  }

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
            User분의 맛정보에 따른 음식을 추천해드리는 서비스 입니다.
          </Text>
        </View>
        <View
          style={{
            height: 65,
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: "#ff5122",
              fontWeight: "400",
            }}
          >
            Drag and drop to view the list
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "#f5f5f5",
            height: height,
          }}
        >
          <View
            style={{
              alignItems: "center",
              //   backgroundColor: "blue",
              marginTop: 20,
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
    ) : null;
  }
}

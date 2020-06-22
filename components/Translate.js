import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import axios from "axios";
import styled from "styled-components";
import Modal from "react-native-modal";
import { AntDesign } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const BackBtn = styled.TouchableOpacity`
  position: absolute;
  top: 45px;
  left: 5px;
`;

export default class Translate extends React.Component {
  state = {
    selectedCountry: "kr", // 선택된 국가
    nowCountry: "kr", // 현재 국가
    isModalVisible: this.props.modal,
    korea: true,
    japan: false,
    usa: false,
    newContent: null, // 번역된 리스트를담음
  };

  componentDidMount = () => {
    if (this.props.country == 410) {
      this.setState({ nowCountry: "kr" });
    }
  };

  translation = async () => {
    const { avoid, selectedCountry, nowCountry, newContent } = this.state;
    const srcLang = nowCountry; // 현재 언어
    const targetLang = selectedCountry; // 바꿀언어
    const src = this.props.content; // 번역할 리뷰

    if (srcLang == targetLang) {
      // 현재 언어 == 바꿀언어가 같은경우
      this.setState({ isModalVisible: false });
    } else if (srcLang != targetLang) {
      // 현재언어 != 바꿀언어

      const kakao = await fetch(
        `https://kapi.kakao.com/v1/translation/translate?query=${src}`,
        {
          body: `src_lang=${srcLang}&target_lang=${targetLang}`,
          headers: {
            Authorization: "KakaoAK 0a6f68004a171f990b99c5762485143f",
            "Content-Type": "application/x-www-form-urlencoded",
          },
          method: "POST",
        }
      );
      const kakaoJson = await kakao.json();
      const JsonResult = kakaoJson.translated_text[0][0];
      // console.log(kakaoJson);
      //   if (kakaoJson.msg === undefined) translated_kakao = array2str;

      //   console.log(JsonResult);
      this.setState({ newContent: JsonResult, isModalVisible: false });
    }
  };

  render() {
    const { korea, japan, usa, newContent } = this.state;

    return (
      <View>
        {newContent ? (
          <Text
            style={{ color: "#5DADE2", fontWeight: "bold", marginBottom: 2 }}
          >
            {newContent}
          </Text>
        ) : null}
        <TouchableOpacity
          onPress={() => this.setState({ isModalVisible: true })}
        >
          {newContent == null ? (
            <Text
              style={{
                fontWeight: "bold",
                color: "orange",
              }}
            >
              번역
            </Text>
          ) : (
            <Text style={{ fontWeight: "bold", color: "orange" }}>
              다른 언어로 번역
            </Text>
          )}
        </TouchableOpacity>

        <Modal
          isVisible={this.state.isModalVisible}
          children={false}
          backdropOpacity={0.9}
        >
          <BackBtn onPress={() => this.setState({ isModalVisible: false })}>
            <AntDesign size={30} name={"close"} color={"#B1B1AF"}></AntDesign>
          </BackBtn>
          <View style={{ alignItems: "center", marginBottom: 40 }}>
            <Text style={{ fontSize: 26, color: "white", fontWeight: "bold" }}>
              국가를 선택하세요
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              width: width - 50,
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              onPress={() =>
                this.setState({
                  korea: true,
                  japan: false,
                  usa: false,
                  selectedCountry: "kr",
                })
              }
            >
              <Image
                source={require(".././images/country/korea2.png")}
                style={korea ? styles.selectCountry : styles.noSelectCountry}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                this.setState({
                  korea: false,
                  japan: true,
                  usa: false,
                  selectedCountry: "jp",
                })
              }
            >
              <Image
                source={require(".././images/country/japan2.png")}
                style={japan ? styles.selectCountry : styles.noSelectCountry}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                this.setState({
                  korea: false,
                  japan: false,
                  usa: true,
                  selectedCountry: "en",
                })
              }
            >
              <Image
                source={require(".././images/country/usa2.png")}
                style={usa ? styles.selectCountry : styles.noSelectCountry}
              />
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: "center", marginTop: 50 }}>
            <TouchableOpacity style={styles.selectBtn}>
              <Text
                style={{ fontSize: 26, color: "white", fontWeight: "300" }}
                onPress={() => this.translation()}
              >
                Translation
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textCon: {
    paddingTop: 20,
    paddingBottom: 10,
    alignItems: "flex-start",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingLeft: 20,
  },
  avoidCon: {
    width: width - 20,
    height: 80,
    backgroundColor: "#FFF5EE",
    borderWidth: 2,
    borderColor: "#FFF5EE",
    borderRadius: 10,
    flexDirection: "row",
    flexWrap: "wrap",
  },

  avoidNoCon: {
    width: width - 20,
    height: 80,
    backgroundColor: "#E9F2F9",
    borderWidth: 2,
    borderColor: "#E9F2F9",
    borderRadius: 10,
    padding: 5,
  },

  avoidTxt: {
    paddingLeft: 15,
    paddingTop: 10,
    color: "red",
    fontSize: 16,
    fontWeight: "bold",
  },

  avoidNo: {
    paddingLeft: 10,
    paddingTop: 10,
    color: "blue",
    fontSize: 16,
  },
  transBtn: {
    backgroundColor: "#F5F5F5",
    borderRadius: 20,
    borderWidth: 1,
    padding: 2,
    width: 100,
    alignItems: "center",
  },

  selectCountry: {
    borderRadius: 100,
    borderWidth: 5,
    borderColor: "orange",
    width: 100,
    height: 100,
  },
  noSelectCountry: {
    width: 100,
    height: 100,
  },
  selectBtn: {
    backgroundColor: "black",
    borderRadius: 20,
    borderWidth: 1,
    padding: 2,
    width: width / 2,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
  },
});

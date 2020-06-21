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

export default class Material extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      material: [],
      avoid: [],
      call: false,
      show: false,
      transAvoid: [],
      isModalVisible: false,
      korea: true,
      japan: false,
      usa: false,
      selectedCountry: "kr",
      nowCountry: "kr",
    };
  }

  toggleModal = (id) => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  componentDidMount = async () => {
    const { food_id, user_id } = this.props;

    // 기피 원재료 리스트
    await axios({
      method: "post",
      url: "http://3.34.97.97/api/app/avoidMaterial",

      headers: {
        //응답에 대한 정보
        Accept: "application/json", // 서버가 json 타입으로 변환해서 사용
        "Content-Type": "application/json",
      },
      data: {
        user_id: user_id,
        food_id: food_id,
      },
    })
      .then((response) => {
        // console.log(response.data);
        for (var key in response.data) {
          var List = response.data[key].keyword_name;
          this.setState({
            avoid: this.state.avoid.concat({
              id: key,
              avoid: List,
            }),
            call: true,
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });

    //원재료 리스트
    try {
      await axios({
        method: "post",
        url: "http://3.34.97.97/api/app/material",

        headers: {
          //응답에 대한 정보
          Accept: "application/json", // 서버가 json 타입으로 변환해서 사용
          "Content-Type": "application/json",
        },
        data: {
          user_id: user_id,
          food_id: food_id,
        },
      })
        .then((response) => {
          //   console.log(response.data);
          if (response) {
            for (var key in response.data) {
              var List = response.data[key];
              this.setState({
                material: this.state.material.concat({
                  id: key,
                  material: List.material_name,
                  type: List.type,
                }),
              });
            }
          } else {
            console.log("no");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }

    this.setState({ show: true });
  };

  translation = async () => {
    const { avoid, selectedCountry, nowCountry } = this.state;
    const srcLang = nowCountry;
    const targetLang = selectedCountry;

    if (srcLang == targetLang) {
      this.setState({ call: true, isModalVisible: false });
    } else {
      this.setState({
        avoid: [],
        call: false,
        isModalVisible: false,
      }); // 기존 기피 원재료 초기화. 기존 호출 취소

      for (var a = 0; a < avoid.length; a++) {
        let src = avoid[a].avoid;
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

        this.setState({
          transAvoid: this.state.transAvoid.concat({
            id: a,
            material: JsonResult,
          }),
        });

        // 새롭게 avoid 리스트
        this.setState({
          avoid: this.state.avoid.concat({
            id: a,
            avoid: JsonResult,
          }),
          call: true,
          nowCountry: selectedCountry,
        });
      }
    }

    this.showList();
  };

  showList = () => {
    const { transAvoid } = this.state;
    console.log(transAvoid);
  };

  render() {
    const {
      material,
      avoid,
      call,
      show,
      korea,
      japan,
      usa,
      selectedCountry,
      nowCountry,
    } = this.state;
    // const message = "데이터가 없습니다";
    return show ? (
      <View>
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
                source={require("../../images/country/korea2.png")}
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
                source={require("../../images/country/japan2.png")}
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
                source={require("../../images/country/usa2.png")}
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
        <View
          style={{
            paddingTop: 30,
            marginLeft: 5,
            alignItems: "flex-start",
            justifyContent: "space-between",
            flexDirection: "row",
            padding: 10,
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            기피 원재료
          </Text>

          <TouchableOpacity
            style={styles.transBtn}
            onPress={() => this.setState({ isModalVisible: true })}
          >
            <Text style={{ fontWeight: "bold" }}>Translation</Text>
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: "center" }}>
          {call == false ? (
            <ScrollView style={styles.avoidNoCon}>
              <Text style={styles.avoidNo}>해당되는 원재료가 없습니다</Text>
            </ScrollView>
          ) : (
            <View style={styles.avoidCon}>
              {avoid
                ? avoid.map((list, key) => {
                    return (
                      <View key={key}>
                        <Text style={styles.avoidTxt}>{list.avoid}</Text>
                      </View>
                    );
                  })
                : null}
            </View>
          )}
        </View>
        <View style={styles.textCon}>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>원재료</Text>
        </View>

        {material == "" ? (
          <View style={{ alignItems: "center" }}>
            <View
              style={{
                width: width - 20,
                height: 80,
                padding: 15,
                backgroundColor: "#f7f7f7",
                borderColor: "#f7f7f7",
                borderRadius: 10,
              }}
            >
              <Text style={{ fontSize: 16 }}>데이터가 없습니다</Text>
            </View>
          </View>
        ) : (
          <View style={{ alignItems: "center" }}>
            <View
              style={{
                width: width - 20,
                paddingTop: 15,
                paddingBottom: 5,
                paddingLeft: 15,
                backgroundColor: "#f7f7f7",
                borderWidth: 2,
                borderColor: "#f7f7f7",
                borderRadius: 10,
              }}
            >
              {material.map((list, key) => {
                return (
                  <View key={key}>
                    {list.type == 0 ? (
                      <Text style={{ fontSize: 16, paddingBottom: 10 }}>
                        {list.material}
                      </Text>
                    ) : (
                      <Text
                        style={{
                          fontSize: 16,
                          paddingBottom: 10,
                          color: "red",
                          fontWeight: "bold",
                        }}
                      >
                        {list.material}
                      </Text>
                    )}
                  </View>
                );
              })}
            </View>
          </View>
        )}
      </View>
    ) : (
      <View></View>
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

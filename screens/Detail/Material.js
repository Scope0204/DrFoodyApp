import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import styled from "styled-components";
import Loading from ".././../components/Loading";

const { width, height } = Dimensions.get("window");

export default class Material extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      material: [],
      avoid: [],
      call: false, // 원재료 리스트 부르는거
      show: false, // 화면 부르는거
    };
  }

  componentDidMount = async () => {
    const { food_id, user_id } = this.props;

    try {
      // 기피 원재료 리스트
      await axios({
        method: "post",
        url: "http://3.34.97.97/api/app/avoidMaterial",
        data: {
          user_id: user_id,
          food_id: food_id,
        },
      })
        .then((response) => {
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
          //   console.log(response.data.material_name);
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

              console.log(List.material_name);
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

  render() {
    const { material, avoid, call, show } = this.state;
    // const message = "데이터가 없습니다";
    return show ? (
      <View>
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
            注意すべき原材料
          </Text>
        </View>
        <View style={{ alignItems: "center" }}>
          {call == false ? (
            <ScrollView style={styles.avoidNoCon}>
              <Text style={styles.avoidNo}>該当する原材料がありません</Text>
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
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>原材料</Text>
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
              <Text style={{ fontSize: 16 }}>データがありません</Text>
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
      <View style={{ height: 390 }}>
        <Loading />
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
});

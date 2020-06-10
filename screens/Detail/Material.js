import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  ScrollView,
} from "react-native";
import axios from "axios";

const { width, height } = Dimensions.get("window");

export default class Material extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      material: [],
      avoid: [],
      call: false,
    };
  }

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
          console.log(response.data);
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
  };

  render() {
    const { material, avoid, call } = this.state;
    const message = "데이터가 없습니다";
    return (
      <View>
        <View style={styles.textCon}>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>기피 원재료</Text>
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
            {material
              ? material.map((list, key) => {
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
                })
              : null}

            {material ? (
              <View>
                <Text style={{ fontSize: 16, paddingBottom: 10 }}>
                  데이터가 없습니다
                </Text>
              </View>
            ) : null}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textCon: {
    paddingTop: 20,
    paddingBottom: 10,
    alignItems: "flex-start",
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

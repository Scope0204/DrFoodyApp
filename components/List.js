import React, { useCallback } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import styled from "styled-components";
import Layout from "../constants/Layout";
import {
  FontAwesome,
  EvilIcons,
  Entypo,
  MaterialIcons,
} from "@expo/vector-icons";

const SWIPER_HEIGHT = Layout.height;
const SWIPER_WIDTH = Layout.width;

const Container = styled.View`
  background-color: white;
  height: 180px;
  width: ${SWIPER_WIDTH - 130}px;
  margin-left: 20px;
  border-radius: 10px;
  border: #ecf0f1;
  box-shadow: 2px 1px 1px #b4b4b4;
  justify-content: center;
`;
export default List = ({ list }) => {
  // 제품 정보페이지로 이동
  return (
    <View style={list.id == 0 ? { marginLeft: 45 } : null}>
      {list.id < 10 ? (
        <Container>
          <View style={styles.listCon}>
            <View style={{ flex: 0.45 }}>
              <Image
                source={{
                  uri: list.photo,
                }}
                style={{ width: 110, height: 110 }}
              ></Image>
            </View>
            <View
              style={{
                flexDirection: "column",
                flex: 0.5,
                paddingLeft: 30,
              }}
            >
              {list.name.length < 7 ? (
                <Text style={styles.listTitle}>{list.name}</Text>
              ) : (
                <Text style={styles.listTitle2}>
                  {list.name.substring(0, 8) + "..."}
                </Text>
              )}

              <View style={{ flexDirection: "row" }}>
                <Entypo
                  name="eye"
                  size={16}
                  color="gray"
                  style={{ marginRight: 9 }}
                />
                <Text>{list.view}</Text>
              </View>

              <View style={{ flexDirection: "row" }}>
                <MaterialIcons
                  name="rate-review"
                  size={16}
                  color="#1E6EF1"
                  style={{ marginRight: 9 }}
                />

                <Text>{list.review}건</Text>
              </View>

              {list.point ? (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <FontAwesome
                    size={16}
                    name={"star"}
                    color={"#F5B041"}
                    style={{ marginRight: 10 }}
                  />
                  <Text>{list.point}</Text>
                  <Text>점</Text>
                </View>
              ) : (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <FontAwesome
                    size={16}
                    name={"star-o"}
                    color={"#F5B041"}
                    style={{ marginRight: 10 }}
                  />
                  <Text>0</Text>
                  <Text>점</Text>
                </View>
              )}
            </View>
          </View>
        </Container>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  listCon: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 15,
    // backgroundColor: "red",
  },
  listTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  listTitle2: {
    fontWeight: "bold",
    marginBottom: 10,
  },
});

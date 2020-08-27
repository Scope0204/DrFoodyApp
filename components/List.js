import React, { useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableOpacityBase,
} from "react-native";
import styled from "styled-components";
import Layout from "../constants/Layout";
import { FontAwesome, Entypo, MaterialIcons } from "@expo/vector-icons";
import Star from "./Star";

const SWIPER_HEIGHT = Layout.height;
const SWIPER_WIDTH = Layout.width;

const Container = styled.View`
  background-color: white;
  height: ${SWIPER_HEIGHT / 4}px;
  width: ${SWIPER_WIDTH / 2.4}px;
  margin-left: 20px;
  border-radius: 10px;
  border: #ecf0f1 2px;
  justify-content: center;
`;

const RankingCircle = styled.View`
  margin-top: 15px;
  margin-bottom: 5px;
  border-radius: 200px;
  width: 24px;
  height: 24px;
  background-color: orange;
  align-items: center;
  justify-content: center;
`;
export default List = ({ list }) => {
  // 제품 정보페이지로 이동
  return (
    <View key={list.id}>
      {list.id <= 10 ? (
        <Container>
          <View style={styles.listCon}>
            <RankingCircle>
              <Text
                style={{ color: "white", fontWeight: "bold", fontSize: 18 }}
              >
                {list.ranking}
              </Text>
            </RankingCircle>

            <View
              style={{
                flex: 5,
              }}
            >
              <Image
                source={{
                  uri: list.photo,
                }}
                style={{ width: 90, height: 90 }}
              />
            </View>

            <View
              style={{
                marginTop: 5,
                flex: 4,
                alignItems: "center",
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Image
                  style={{
                    width: 17,
                    height: 17,
                    resizeMode: "contain",
                    marginRight: 9,
                    marginBottom: 4,
                  }}
                  source={require("../images/view.png")}
                />
                <Text>{list.view}</Text>
              </View>

              <View style={{ flexDirection: "row" }}>
                <Image
                  style={{
                    width: 15,
                    height: 15,
                    resizeMode: "contain",
                    marginRight: 9,
                  }}
                  source={require("../images/review.png")}
                />
                <Text>{list.review + "件"}</Text>
              </View>

              {list.point ? <Star star={list.point} /> : <Star star={0} />}
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
  },
  listTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  listTitle2: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

import React from "react";

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
} from "react-native-chart-kit";

import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";

import { FontAwesome, AntDesign } from "@expo/vector-icons";
import styled from "styled-components";
import ListGraph from "../../components/ListGraph";
import DropDownPicker from "react-native-dropdown-picker";
// import DateTimePicker from "@react-native-community/datetimepicker"; // 안쓰기로함
import axios from "axios"; // npm i axios@0.18.0

const { width, height } = Dimensions.get("window");

const Container = styled.ScrollView`
  background-color: #f5f5f5;
  width: ${width}px;
  height: ${height}px;
`;

const SelectBtn = styled.View`
  background-color: #fafafa;
  width: ${width / 4}px;
  height: 40px;
  border-radius: 5px;
  border: 1px solid;
`;

const ChartBox = styled.View`
  width: ${width - 20}px;
  background-color: white;
  height: 100px;
  border-radius: 10px;
  border: 1px solid #ecf0f1;
  box-shadow: 2px 2px 2px #f1f1f1;
  margin-bottom: 7px;
`;
export default class Chart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      country: 0, //국가
      date: 4, // 기간
      sex: 2, //성별
      age: 0, //나이
      category: 0, // 조회수 0, 찜목록 1, 별점 2

      setting: false,
    };
  }

  componentDidMount = () => {
    this.search();
  };

  search = async () => {
    const state = this.state;
    try {
      await axios({
        method: "post",
        url: "http://3.34.97.97/api/app/rankList",
        headers: {
          Accept: "application/json", // 서버가 json 타입으로 변환해서 사용
          "Content-Type": "application/json; charset=utf-8",
        },
        data: {
          category: state.category, // 조회수 0 , 찜목록 1, 별점2
          sex: state.sex, //성별
          age: state.age, //나이
          country: state.country, //국가
          date: state.date, // 기간
        },
      })
        .then((response) => {
          console.log(response);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };

  setDate = (e) => {
    this.setState({ date: e });
    console.log(e);
  };

  setAge = (e) => {
    this.setState({ age: e });
    console.log(e);
  };

  setCountry = (e) => {
    this.setState({ country: e });
    console.log(e);
  };

  setSex = (e) => {
    this.setState({ sex: e });
    console.log(e);
  };

  render() {
    const state = this.state;
    const { setting, category } = this.state;

    return (
      <View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingBottom: 10,
            paddingTop: 10,
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              paddingLeft: 15,
              paddingRight: 5,
              fontSize: 16,
            }}
          >
            카테고리 지정
          </Text>
          <TouchableOpacity
            onPress={() => {
              setting
                ? this.setState({ setting: false })
                : this.setState({ setting: true });
            }}
          >
            {setting ? (
              <AntDesign name="upcircle" size={18} color="black" />
            ) : (
              <AntDesign name="downcircle" size={18} color="black" />
            )}
          </TouchableOpacity>
        </View>

        {setting ? (
          <View
            style={{ marginLeft: 3, marginBottom: 15, flexDirection: "row" }}
          >
            <TouchableOpacity
              style={category == 1 ? styles.search : styles.selectBtn}
              onPress={() => this.setState({ category: 1 })}
            >
              <Text style={category == 1 ? styles.selectTxt : null}>
                조회수
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={category == 2 ? styles.review : styles.selectBtn}
              onPress={() => this.setState({ category: 2 })}
            >
              <Text style={category == 2 ? styles.selectTxt : null}>
                리뷰수
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={category == 3 ? styles.star : styles.selectBtn}
              onPress={() => this.setState({ category: 3 })}
            >
              <Text style={category == 3 ? styles.selectTxt : null}>
                별점수
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}

        {setting ? (
          <Text style={{ marginLeft: 15, marginBottom: 7, fontSize: 14 }}>
            기간
          </Text>
        ) : null}
        {setting ? (
          <DropDownPicker
            items={[
              { label: "오늘", value: "1" },
              { label: "일주일", value: "2" },
              { label: "1달", value: "3" },
              { label: "1년", value: "4" },
            ]}
            defaultValue="4"
            containerStyle={{
              width: 120,
              height: 40,
              marginLeft: 13,
              marginBottom: 15,
            }}
            style={{
              backgroundColor: "#fafafa",
            }}
            dropDownStyle={{
              backgroundColor: "#fafafa",
            }}
            onChangeItem={(item) => this.setDate(item.value)}
          />
        ) : null}

        {setting ? (
          <Text
            style={{
              marginLeft: 15,
              marginBottom: 7,
              fontSize: 14,
            }}
          >
            나이대 / 국가 / 성별
          </Text>
        ) : null}
        <View>
          {setting ? (
            <View
              style={{
                position: "relative",
                zIndex: 2,
                flexDirection: "row",
                paddingBottom: 15,
                marginLeft: 15,
              }}
            >
              <DropDownPicker
                items={[
                  { label: "모든 나이", value: "0" },
                  { label: "10대", value: "1" },
                  { label: "20대", value: "2" },
                  { label: "30대", value: "3" },
                  { label: "40대", value: "4" },
                  { label: "50대이상", value: "5" },
                ]}
                defaultValue="0"
                containerStyle={{
                  width: 120,
                  height: 40,
                  marginRight: 10,
                }}
                style={{
                  backgroundColor: "#fafafa",
                }}
                dropDownStyle={{
                  backgroundColor: "#fafafa",
                }}
                onChangeItem={(item) => this.setAge(item.value)}
              />

              <DropDownPicker
                items={[
                  { label: "모든 국가", value: "0" },
                  { label: "KOREA", value: "1" },
                  { label: "USA", value: "2" },
                  { label: "JAPAN", value: "3" },
                ]}
                defaultValue="0"
                containerStyle={{ width: 120, height: 40, marginRight: 10 }}
                style={{
                  backgroundColor: "#fafafa",
                }}
                dropDownStyle={{
                  backgroundColor: "#fafafa",
                }}
                onChangeItem={(item) => this.setCountry(item.value)}
              />

              <DropDownPicker
                items={[
                  { label: "여", value: "0" },
                  { label: "남", value: "1" },
                  { label: "전체", value: "2" },
                ]}
                defaultValue="2"
                containerStyle={{ width: 120, height: 40, marginRight: 10 }}
                style={{
                  backgroundColor: "#fafafa",
                }}
                dropDownStyle={{
                  backgroundColor: "#fafafa",
                }}
                onChangeItem={(item) => this.setSex(item.value)}
              />
            </View>
          ) : null}

          {setting ? (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 10,
                marginTop: 10,
              }}
            >
              <TouchableOpacity
                style={{
                  paddingLeft: 15,
                  paddingRight: 15,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "black",
                  borderRadius: 5,
                  width: width - 30,
                  height: 40,
                }}
              >
                {/* <FontAwesome size={24} name={"search"} color={"white"} /> */}
                <Text style={{ color: "white", fontSize: 18 }}>조회하기</Text>
              </TouchableOpacity>
            </View>
          ) : null}

          <View
            style={{
              backgroundColor: "#808B96",
              height: 0.5,
              width: width,
              marginBottom: 10,
            }}
          ></View>
          <View>
            <ListGraph />
          </View>

          <View
            style={{
              backgroundColor: "#f5f5f5",
              height: 5,
              width: width,
              marginTop: 10,
            }}
          ></View>

          <Container>
            <View style={{ alignItems: "center" }}>
              <ChartBox />
              <ChartBox />
            </View>
          </Container>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  //선택 바 스타일
  select: {
    backgroundColor: "#ff5122",
    width: (width - 20) / 2 - 5,
    height: 30,
    borderWidth: 0.1,
    borderRadius: 5,
  },
  noSelect: {
    backgroundColor: "white",
    width: (width - 20) / 2 - 5,
    height: 30,
    borderWidth: 0.1,
    borderRadius: 5,
  },
  selectTxt: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
  noSelectTxt: {
    fontSize: 16,
    fontWeight: "bold",
  },

  //조회수 , 별점, 리뷰순 선택 버튼
  selectBtn: {
    backgroundColor: "#fafafa",
    width: 120,
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#D5D8DC",
  },

  //조회수
  search: {
    backgroundColor: "red",
    width: 120,
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#D5D8DC",
  },

  //리뷰
  review: {
    backgroundColor: "blue",
    width: 120,
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#D5D8DC",
  },

  //별점
  star: {
    backgroundColor: "orange",
    width: 120,
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#D5D8DC",
  },
});

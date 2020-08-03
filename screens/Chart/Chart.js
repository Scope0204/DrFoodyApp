import React from "react";
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
import ChartList from "../../components/ChartList";
import GraphList from "../../components/GraphList";
import Loading from "../../components/Loading";

const { width, height } = Dimensions.get("window");

const Container = styled.ScrollView`
  background-color: #f5f5f5;
  width: ${width}px;
  height: 606px;
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
      list: [],
      show: false,
      click: 1,
    };
  }

  componentDidMount() {
    this.search();
  }

  reset() {
    this.setState({ show: false, list: [], click: 1 });
    this.search();
  }
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
          if (response) {
            for (var key in response.data) {
              var list = response.data[key];
              this.setState({
                list: this.state.list.concat({
                  id: key,
                  food_name: list.food_name,
                  food_photo: list.food_photo,
                  order_point: list.order_point,
                }),
              });
            }
            this.setState({ show: true });
          }
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

  click = (e) => {
    if (e == 1) {
      this.setState({ click: e });
    } else if (e == 2) {
      this.setState({ click: e });
    }
  };

  //리스트와 그래프를 나눠줌

  render() {
    const state = this.state;
    const { setting, category, show } = this.state;
    return show ? (
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
            カテゴリー指定
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
              style={category == 0 ? styles.search : styles.selectBtn}
              onPress={() => this.setState({ category: 0 })}
            >
              <Text style={category == 0 ? styles.selectTxt : null}>
                照会数
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={category == 1 ? styles.review : styles.selectBtn}
              onPress={() => this.setState({ category: 1 })}
            >
              <Text style={category == 1 ? styles.selectTxt : null}>
                レビュー数
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={category == 2 ? styles.star : styles.selectBtn}
              onPress={() => this.setState({ category: 2 })}
            >
              <Text style={category == 2 ? styles.selectTxt : null}>
                評点数
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}

        {setting ? (
          <Text
            style={{
              marginLeft: 15,
              marginBottom: 7,
              fontSize: 14,
              fontWeight: "bold",
            }}
          >
            期間
          </Text>
        ) : null}
        {setting ? (
          <DropDownPicker
            items={[
              { label: "今日", value: 1 },
              { label: "一週間", value: 2 },
              { label: "1月", value: 3 },
              { label: "1年", value: 4 },
            ]}
            defaultValue={state.date}
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
              fontWeight: "bold",
            }}
          >
            年齢 ・ 国 ・ 性別
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
                  { label: "全て", value: 0 },
                  { label: "10代", value: 1 },
                  { label: "20代", value: 2 },
                  { label: "30代", value: 3 },
                  { label: "40代", value: 4 },
                  { label: "50代以上", value: 5 },
                ]}
                defaultValue={state.age}
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
                  { label: "全て", value: 0 },
                  { label: "KOREA", value: 1 },
                  { label: "USA", value: 2 },
                  { label: "JAPAN", value: 3 },
                ]}
                defaultValue={state.country}
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
                  { label: "女", value: 0 },
                  { label: "男", value: 1 },
                  { label: "全て", value: 2 },
                ]}
                defaultValue={state.sex}
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
                onPress={() => this.reset()}
              >
                <Text
                  style={{ color: "white", fontSize: 18, fontWeight: "bold" }}
                >
                  照会
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}

          <View
            style={{
              backgroundColor: "#f5f5f5",
              height: 5,
              width: width,
              paddingBottom: 15,

              borderTopWidth: 0.5,
              borderTopColor: "#B5B5B5",
            }}
          />
          <View style={{ backgroundColor: "#f5f5f5" }}>
            <ListGraph click={this.click} />
          </View>

          <View
            style={{
              backgroundColor: "#f5f5f5",
              height: 5,
              width: width,
              paddingTop: 15,
            }}
          ></View>
          <Container>
            {state.click == 1 ? (
              <View style={{ alignItems: "center", marginTop: 10 }}>
                <ChartList list={state.list} />
              </View>
            ) : (
              <View style={{ alignItems: "center", marginTop: 10 }}>
                <GraphList list={state.list} category={state.category} />
              </View>
            )}
          </Container>
        </View>
      </View>
    ) : (
      <Loading />
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

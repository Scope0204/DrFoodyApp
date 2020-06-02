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

import { FontAwesome } from "@expo/vector-icons";
import styled from "styled-components";
import ListGraph from "../../components/ListGraph";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import Modal from "react-native-modal";

const { width, height } = Dimensions.get("window");

const Container = styled.ScrollView`
  background-color: green;
  width: ${width}px;
  height: ${height}px;
`;

// 모달

const ModalContainer = styled.View`
  width: ${width}px;
  height: ${height / 2 - 50}px;
  justify-content: center;
  align-items: center;
  background-color: white;
`;
const DateContainer = styled.View`
  align-items: center;
  padding-left: 15px;
  flex-direction: row;
  padding-bottom: 5px;
  padding-top: 5px;
`;
const DateSelectBox = styled.View`
  width: ${width / 3}px;
  height: 40px;
  background-color: white;
  border-radius: 5px;
  border-width: 1px;
  border-color: #d5d8dc;
  justify-content: center;
  align-items: center;
`;

export default class Chart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      click: 1,
      country: 0, //국가
      birthH: 0, //나이
      birthL: 0, //나이
      sex: null, //성별

      views: null, //조회수
      dibs: null, //찜목록
      stars: null, //별점

      date: null,
      dateOn: false,
    };
  }

  SelectAge = (value, lv) => {
    if (lv == 1) {
      // 낮은 레벨
      this.setState({
        birthL: value,
      });
    } else if (lv == 2) {
      this.setState({
        // 높은 레벨
        birthH: value,
      });
    }
  };

  SelectCon = (value) => {
    this.setState({
      // 높은 레벨
      country: value,
    });
  };

  SelectDate = (event, selectedDate) => {
    // console.log(event);
    console.log(selectedDate);
  };

  render() {
    const state = this.state;
    const { click, dateOn, date } = this.state;

    return (
      <View>
        <Modal //날짜가 나타남
          isVisible={this.state.dateOn}
          style={{ alignItems: "center", justifyContent: "center" }}
        >
          <ModalContainer>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                paddingBottom: 6,
              }}
            >
              시작 날짜를 선택하세요
            </Text>
            <DateTimePicker
              testID="dateTimePicker"
              timeZoneOffsetInMinutes={0}
              value={new Date()}
              mode={"date"}
              is24Hour={true}
              display="default"
              onChange={this.SelectDate}
              style={{
                width: width - 30,
                justifyContent: "center",
              }}
            />

            <View style={{ paddingTop: 10 }}>
              <TouchableOpacity
                onPress={() => this.setState({ dateOn: false })}
                style={{
                  width: width / 4,
                  height: 40,
                  backgroundColor: "#ff5122",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 10,
                }}
              >
                <Text
                  style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
                >
                  완료
                </Text>
              </TouchableOpacity>
            </View>
          </ModalContainer>
        </Modal>
        <View>
          <DateContainer>
            <DateSelectBox>
              <TouchableOpacity onPress={() => this.setState({ dateOn: true })}>
                <Text>{date ? date : "시작 기간"}</Text>
              </TouchableOpacity>
            </DateSelectBox>

            <Text
              style={{
                fontSize: 20,

                paddingRight: 15,
                paddingLeft: 15,
              }}
            >
              ~
            </Text>

            <DateSelectBox>
              <TouchableOpacity onPress={() => this.setState({ dateOn: true })}>
                <Text>{date ? date : "종료 기간"}</Text>
              </TouchableOpacity>
            </DateSelectBox>
          </DateContainer>
        </View>
        <View style={{ alignItems: "center" }}>
          <View
            style={{
              position: "relative",
              zIndex: 2,
              flexDirection: "row",
              paddingBottom: 5,
            }}
          >
            <DropDownPicker
              items={[
                { label: "10대", value: "item1" },
                { label: "20대", value: "item2" },
                { label: "30대", value: "item3" },
                { label: "40대", value: "item1" },
                { label: "50대", value: "item2" },
              ]}
              defaultValue="item1"
              containerStyle={{
                width: 120,
                height: 40,
                paddingRight: 5,
              }}
              style={{
                backgroundColor: "#fafafa",
              }}
              dropDownStyle={{
                backgroundColor: "#fafafa",
              }}
              onChangeItem={(item) => console.log(item.label, item.value)}
            />

            <DropDownPicker
              items={[
                { label: "KOREA", value: "item1" },
                { label: "USA", value: "item2" },
                { label: "JAPAN", value: "item3" },
              ]}
              defaultValue="item1"
              containerStyle={{ width: 120, height: 40, paddingRight: 5 }}
              style={{
                backgroundColor: "#fafafa",
              }}
              dropDownStyle={{
                backgroundColor: "#fafafa",
              }}
              onChangeItem={(item) => console.log(item.label, item.value)}
            />

            <DropDownPicker
              items={[
                { label: "남", value: "item1" },
                { label: "여", value: "item2" },
              ]}
              defaultValue="item1"
              containerStyle={{ width: 80, height: 40 }}
              style={{
                backgroundColor: "#fafafa",
              }}
              dropDownStyle={{
                backgroundColor: "#fafafa",
              }}
              onChangeItem={(item) => console.log(item.label, item.value)}
            />
            <TouchableOpacity
              style={{
                paddingLeft: 30,
                paddingRight: 10,
                justifyContent: "center",
              }}
            >
              <FontAwesome size={28} name={"search"} />
            </TouchableOpacity>
          </View>
          <View>
            <ListGraph />
          </View>
          <Container></Container>
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
});

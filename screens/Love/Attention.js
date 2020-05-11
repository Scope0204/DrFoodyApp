import React from "react";
import { Text, View, AsyncStorage } from "react-native";
import axios from "axios"; // npm i axios@0.18.0

export default class Attention extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: null,
      list: null,
    };
  }
  componentDidMount = async () => {
    const user_id = await AsyncStorage.getItem("User");
    this.setState({ user_id: user_id });
    try {
      //찜목록 가져오기
      await axios({
        method: "post",
        url: "http://192.168.0.3/User_Site/HeartList.php",

        headers: {
          //응답에 대한 정보
          Accept: "application/json", // 서버가 json 타입으로 변환해서 사용
          "Content-Type": "application/json",
        },
        data: {
          page: "Attention",
          user_id: user_id,
        },
      })
        .then((response) => {
          console.log(response);
          if (response.data == "Ok") {
            console.log(response.data);
            this.setState({ list: true });
          } else {
            console.log("no");
            this.setState({ list: false });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { list, user_id } = this.state;
    return <View>{list ? <Text>dsadsa</Text> : null}</View>;
  }
}

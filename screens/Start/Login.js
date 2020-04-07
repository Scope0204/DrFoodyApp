import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Logo from "../../components/Logo";
// import Form from "../../components/Form";
import axios from "axios"; // npm i axios@0.18.0

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user_name: "",
      user_password: "",
    };
  }

  callLogin = () => {
    const { user_name } = this.state;
    const { user_password } = this.state;

    axios({
      method: "post",
      url: "http://192.168.200.175/User_Site/User_Login.php",
      headers: {
        //응답에 대한 정보
        Accept: "application/json", // 서버가 json 타입으로 변환해서 사용
        "Content-Type": "application/json;charset=utf-8",
      },
      data: {
        name: user_name,
        password: user_password,
      },
    })
      .then((response) => {
        // console.log(response);
        if (response.data == "Data Matched") {
          console.log("match");
          this.props.navigation.navigate("Main", { User: user_name });
        } else {
          alert("올바르지 않습니다");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log("name : ", user_name);
    console.log("pass : ", user_password);
  };

  render() {
    return (
      <View style={styles.container}>
        <Logo />
        <View style={styles.formContainer}>
          <TextInput
            style={styles.inputBox}
            placeholder="ID"
            placeholderTextColor="#ffffff"
            onChangeText={(user_name) => this.setState({ user_name })}
          />
          <TextInput
            style={styles.inputBox}
            placeholder="Password"
            secureTextEntry={true}
            placeholderTextColor="#ffffff"
            onChangeText={(user_password) => this.setState({ user_password })}
          />

          <TouchableOpacity style={styles.button} onPress={this.callLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.signupTextCont}>
          <Text style={styles.signupText}>Don't have an account yet? </Text>
          <Text
            style={styles.signupBotton}
            onPress={() => this.props.navigation.navigate("Signup")}
          >
            Signup
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "blue",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  signupTextCont: {
    flexGrow: 1,
    alignItems: "flex-end",
    justifyContent: "center",
    marginVertical: 16,
    flexDirection: "row",
    marginBottom: 50,
  },
  signupText: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 16,
  },
  signupBotton: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "500",
  },

  //form

  formContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputBox: {
    width: 330,
    paddingVertical: 16,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#ffffff",
    marginVertical: 10,
  },
  button: {
    width: 330,
    backgroundColor: "black",
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 12,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#ffffff",
    textAlign: "center",
  },
});

import { createStackNavigator, createAppContainer } from "react-navigation";
import TabNavigation from "./TabNavigation";
import LoginScreen from "../screens/Start/Login";

const LoginNavigaion = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: { header: null }
  }
});

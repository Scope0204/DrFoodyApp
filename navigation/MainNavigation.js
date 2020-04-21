import { createStackNavigator, createAppContainer } from "react-navigation";
import TabNavigation from "./TabNavigation";
import DetailScreen from "../screens/Detail/Detail";
import CameraScreen from "../screens/Camera/Shot";
import PostScreen from "../screens/Camera/PhotoPost";
import UserDetailScreen from "../screens/User/UserDetail";
import LoginScreen from "../screens/Start/Login";
import SingupScreen from "../screens/Start/Signup";

const MainNavigation = createStackNavigator(
  {
    Tabs: {
      screen: TabNavigation,
      navigationOptions: { header: null },
    },

    Login: {
      screen: LoginScreen,
      navigationOptions: { header: null },
    },

    Signup: {
      screen: SingupScreen,
      navigationOptions: { header: null },
    },

    Detail: {
      screen: DetailScreen,
      navigationOptions: {
        header: null,
      },
    },
    Camera: {
      screen: CameraScreen,
      navigationOptions: {
        header: null,
      },
    },
    UserDetail: {
      screen: UserDetailScreen,
      navigationOptions: {
        title: "유저 정보",
      },
    },
    PhotoPost: {
      screen: PostScreen,
      navigationOptions: {
        title: "전송할 사진",
      },
    },
  },
  {
    headerMode: "screen",
    headerBackTitleVisible: false, // back을 없앰
    headerTitleStyle: {
      color: "red",
      fontWeight: "bold",
    },
  }
);

export default createAppContainer(MainNavigation);

import { createStackNavigator, createAppContainer } from "react-navigation";
import TabNavigation from "./TabNavigation";
import DetailScreen from "../screens/Detail/Detail";
import CameraScreen from "../screens/Camera/Shot";
import PostScreen from "../screens/Camera/PhotoPost";
import UserDetailScreen from "../screens/User/UserDetail";
import LoginScreen from "../screens/Start/Login";
import SingupScreen from "../screens/Start/Signup";
import SearchScreen from "../screens/Search/Search";
import ReviewScreen from "../screens/Detail/ReviewPost";
import UpdateScreen from "../screens/Detail/Update";
import MapScreen from "../screens/Main/Map";
import FailScreen from "../screens/Camera/LinkFail";

const MainNavigation = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
      navigationOptions: { header: null },
    },
    Tabs: {
      screen: TabNavigation,
      navigationOptions: { header: null, gesturesEnabled: false },
    },
    Signup: {
      screen: SingupScreen,
      navigationOptions: { header: null },
    },

    Search: {
      screen: SearchScreen,
      navigationOptions: {
        header: null,
      },
    },

    Detail: {
      screen: DetailScreen,
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
    Review: {
      screen: ReviewScreen,
      navigationOptions: {
        header: null,
        gesturesEnabled: false,
      },
    },

    Update: {
      screen: UpdateScreen,
      navigationOptions: {
        header: null,
        gesturesEnabled: false,
      },
    },
    // Map: {
    //   screen: MapScreen,
    //   navigationOptions: {
    //     title: "지도",
    //   },
    // },
    Fail: {
      screen: FailScreen,
      navigationOptions: {
        header: null,
        gesturesEnabled: false,
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

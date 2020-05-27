import React from "react";
import { Platform, StyleSheet } from "react-native";
import {
  createBottomTabNavigator,
  createAppContainer,
  createStackNavigator,
} from "react-navigation";
import MainScreen from "../screens/Main/Main";
import MaterialTop from "../navigation/MaterialTop";
import ChartScreen from "../screens/Chart/Chart";
import UserScreen from "../screens/User/User";
import TabBarIcon from "../components/TabBarIcon";
import { Ionicons } from "@expo/vector-icons";

const styles = StyleSheet.create({
  setting: {
    marginRight: 18,
  },
});

const headerStyles = {
  // 네비게이션 헤더에 제공해주는 기본 옵션
  headerStyle: {
    marginTop: 10,
    // borderBottomColor: "red"
  },
  headerTitleStyle: {
    fontWeight: "bold",
    fontSize: 20,
  },
};

// 관심제품 페이지는 밑라인이 없게하기위함
const LoveStyle = {
  headerStyle: {
    marginTop: 10,
    borderBottomWidth: 0,
  },
  headerTitleStyle: {
    fontWeight: "bold",
    fontSize: 20,
  },
};

const TabNavigation = createBottomTabNavigator(
  {
    Main: {
      screen: createStackNavigator({
        Main: {
          screen: MainScreen,
          navigationOptions: {
            header: null,
          },
        },
      }),
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <TabBarIcon
            focused={focused}
            name={Platform.OS === "ios" ? "ios-home" : "md-home"}
          />
        ),
      },
    },

    Love: {
      screen: createStackNavigator({
        Love: {
          screen: MaterialTop,
          navigationOptions: {
            title: "관심제품",
            ...LoveStyle,
          },
        },
      }),
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <TabBarIcon
            focused={focused}
            name={Platform.OS === "ios" ? "ios-heart" : "md-heart-empty"}
          />
        ),
      },
    },

    Chart: {
      screen: createStackNavigator({
        Chart: {
          screen: ChartScreen,
          navigationOptions: {
            title: "랭킹",
            ...headerStyles,
          },
        },
      }),
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <TabBarIcon
            focused={focused}
            name={Platform.OS === "ios" ? "ios-stats" : "md-stats"}
          />
        ),
      },
    },

    User: {
      screen: createStackNavigator({
        User: {
          screen: UserScreen,
          navigationOptions: ({ navigation }) => ({
            title: "User",
            ...headerStyles,
            headerRight: (
              <Ionicons
                size={32}
                name={"ios-settings"}
                style={styles.setting}
                onPress={() => navigation.navigate("UserDetail")}
              />
            ),
          }),
        },
      }),
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <TabBarIcon
            focused={focused}
            name={Platform.OS === "ios" ? "ios-contact" : "md-contact"}
          />
        ),
      },
    },
  },
  {
    initialRouteName: "Main",
    tabBarOptions: {
      showLabel: false,
      style: {
        // backgroundColor: BG_COLOR
      },
    },
  }
);

export default createAppContainer(TabNavigation);

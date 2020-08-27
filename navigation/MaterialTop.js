import {
  createMaterialTopTabNavigator,
  createAppContainer,
} from "react-navigation";
import AttentionScreen from "../screens/Love/Attention";
import SearchListScreen from "../screens/Love/SearchList";
import CurationScreen from "../screens/Love/Curation";

const MaterialTop = createMaterialTopTabNavigator(
  {
    Atention: {
      screen: AttentionScreen,
      navigationOptions: {
        title: "お気に入り商品",
      },
    },
    SearchList: {
      screen: SearchListScreen,
      navigationOptions: { title: "照会リスト" },
    },

    CurationScreen: {
      screen: CurationScreen,
      navigationOptions: { title: "商品レコメンド" },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: "black",
      inactiveTintColor: "#6E6E6E",
      labelStyle: {
        fontSize: 16,
        fontWeight: "bold",
      },
      //탭 하단 선
      indicatorStyle: {
        width: 50,
        height: 4,
        backgroundColor: "black",
        marginLeft: 44,
      },
      style: {
        backgroundColor: "white",
      },
    },
  }
);

export default createAppContainer(MaterialTop);

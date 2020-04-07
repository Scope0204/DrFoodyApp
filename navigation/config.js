import { createStackNavigator } from "react-navigation";

export const headerStyles = {
  // 네비게이션 헤더에 제공해주는 기본 옵션
  headerStyle: {
    marginTop: 10
  },
  headerTitleStyle: {
    fontWeight: "bold",
    fontSize: 18
  }
};
// 메인빼고 모두 적용시킬 스택
export const createStack = (screen, title) =>
  createStackNavigator({
    Screen: {
      screen,
      navigationOptions: {
        // 해당 타이틀
        title,
        ...headerStyles
      }
    }
  });

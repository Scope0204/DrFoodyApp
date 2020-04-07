//화면 레이아웃의 constants를 정의
import { Dimensions } from "react-native";

//현재 스크린의 가로, 세로치수를 줌
const { width, height } = Dimensions.get("screen");

export default {
  width,
  height
  // 고정적으로 원하는 사이즈가 있는 경우
  // HeaderSize : 50 뭐이런식으로 지정한다
};

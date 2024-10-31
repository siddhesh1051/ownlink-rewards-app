import { AntDesign, FontAwesome, FontAwesome6 } from "@expo/vector-icons";

export const icons = {
  index: (props) => <AntDesign name="home" size={22} {...props} />,
  explore: (props) => <AntDesign name="search1" size={22} {...props} />,
  rewards: (props) => <FontAwesome6 name="coins" size={22} {...props} />,
  account: (props) => <FontAwesome name="user" size={22} {...props} />,
};

import { AntDesign, FontAwesome6 } from "@expo/vector-icons";

export const icons = {
  index: (props) => <AntDesign name="home" size={26} {...props} />,
  explore: (props) => <AntDesign name="search1" size={26} {...props} />,
  rewards: (props) => <FontAwesome6 name="coins" size={26} {...props} />,
  account: (props) => <AntDesign name="user" size={26} {...props} />,
};

import { View, StyleSheet, useColorScheme } from "react-native";
import React, { useContext } from "react";
import TabBarButton from "./TabBarButton";
import { ThemeContext } from "@/context/ThemeContext";

const TabBar = ({ state, descriptors, navigation }) => {
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === "dark";
  const primaryColor = isDarkMode ? "#cecece" : "#030712";
  const greyColor = isDarkMode ? "#7f7f7f" : "#9ca3af";
  return (
    <View style={styles(isDarkMode).tabbar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        if (["_sitemap", "+not-found"].includes(route.name)) return null;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TabBarButton
            key={route.name}
            style={styles(isDarkMode).tabbarItem}
            onPress={onPress}
            onLongPress={onLongPress}
            isFocused={isFocused}
            routeName={route.name}
            color={isFocused ? primaryColor : greyColor}
            label={label}
          />
        );
      })}
    </View>
  );
};

const styles = (isDarkMode) =>
  StyleSheet.create({
    tabbar: {
      position: "absolute",
      bottom: 0,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: isDarkMode ? "#2f2f2f" : "white",
      marginHorizontal: 0,
      // paddingVertical: 15,
      height: 70,
      width: "100%",
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      borderCurve: "continuous",
      shadowOffset: { width: 0, height: -20 }, // Negative height for top shadow
      shadowRadius: 40,
      shadowOpacity: 0.8,
      elevation: 10, // For Android
    },
  });

export default TabBar;

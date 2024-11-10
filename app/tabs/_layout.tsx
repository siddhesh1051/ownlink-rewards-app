import { Tabs } from "expo-router";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import Toast from "react-native-toast-message";
import TabBar from "@/components/TabBar";
import LoginSignup from "@/components/LoginSignup";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import { RootState } from "@/context/store";
import { View } from "lucide-react-native";
import { Text, useColorScheme } from "react-native";

export default function RootLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const theme = useSelector((state: RootState) => state.theme.theme) as
    | "light"
    | "dark"
    | "system"
    | undefined;

  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  console.log(theme);
  return (
    <GluestackUIProvider mode={theme}>
      <Tabs tabBar={(props) => <TabBar {...props} />}>
        <Tabs.Screen
          name="index"
          options={{
            title: "Dashboard",
            headerTitleStyle: {
              fontSize: 24,
              color: isDarkMode ? "#fff" : "#000",
            },
            headerStyle: {
              backgroundColor: isDarkMode ? "#1c1c1c" : "#fff",
            },
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: "Explore",
            headerTitleStyle: {
              fontSize: 24,
              color: isDarkMode ? "#fff" : "#000",
            },
            headerStyle: {
              backgroundColor: isDarkMode ? "#1c1c1c" : "#fff",
            },
          }}
        />
        <Tabs.Screen
          name="rewards"
          options={{
            title: "Rewards",
            headerTitleStyle: {
              fontSize: 24,
              color: isDarkMode ? "#fff" : "#000",
            },
            headerStyle: {
              backgroundColor: isDarkMode ? "#1c1c1c" : "#fff",
            },
          }}
        />
        <Tabs.Screen
          name="account"
          options={{
            title: "Account",
            headerTitleStyle: {
              fontSize: 24,
              color: isDarkMode ? "#fff" : "#000",
            },
            headerStyle: {
              backgroundColor: isDarkMode ? "#1c1c1c" : "#fff",
            },
          }}
        />
      </Tabs>
      <Toast />
    </GluestackUIProvider>
  );
}

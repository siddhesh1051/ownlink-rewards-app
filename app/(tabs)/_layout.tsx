import { Tabs } from "expo-router";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import Toast from "react-native-toast-message";
import TabBar from "@/components/TabBar";
import LoginSignup from "@/components/LoginSignup";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RootLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        setIsLoggedIn(!!token); // Set to true if token exists, false otherwise
      } catch (error) {
        console.error("Error checking login:", error);
      }
    };

    checkAuthStatus();
  }, []);

  if (isLoggedIn === null) {
    // Show a loading indicator while checking auth status
    return null;
  }

  const handleLogout = async () => {
    try {
      // Clear storage
      await AsyncStorage.clear();
      // Navigate to login screen
      setIsLoggedIn(false);
    } catch (error) {
      console.log("Error clearing storage", error);
    }
  };

  return (
    <GluestackUIProvider>
      {isLoggedIn ? (
        <Tabs tabBar={(props) => <TabBar {...props} />}>
          <Tabs.Screen
            name="index"
            options={{
              title: "Dashboard",
              headerTitleStyle: { fontSize: 24 },
            }}
          />
          <Tabs.Screen
            name="explore"
            options={{
              title: "Explore",
              headerTitleStyle: { fontSize: 24 },
            }}
          />
          <Tabs.Screen
            name="rewards"
            options={{
              title: "Rewards",
              headerTitleStyle: { fontSize: 24 },
            }}
          />
          <Tabs.Screen
            name="account"
            options={{
              title: "Account",
              headerTitleStyle: { fontSize: 24 },
            }}
          />
        </Tabs>
      ) : (
        <LoginSignup onLogin={() => setIsLoggedIn(true)} />
      )}
      <Toast />
    </GluestackUIProvider>
  );
}

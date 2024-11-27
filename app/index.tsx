import LoginSignup from "@/components/LoginSignup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";

const AuthScreen = () => {
  const [isAppFirstLaunched, setIsAppFirstLaunched] = useState<boolean | null>(
    null
  );

  useEffect(() => {
    const checkAppFirstLaunched = async () => {
      try {
        const appData = await AsyncStorage.getItem("isAppFirstLaunched");
        console.log("appData", appData);
        if (appData == null) {
          setIsAppFirstLaunched(true);
          await AsyncStorage.setItem("isAppFirstLaunched", "false");
        } else {
          setIsAppFirstLaunched(appData === "true");
        }
      } catch (error) {
        console.error("Error checking first launch:", error);
        setIsAppFirstLaunched(false);
      }
      // await AsyncStorage.removeItem("isAppFirstLaunched");
    };

    checkAppFirstLaunched();
  }, []);

  // Render a loading state while checking first launch
  if (isAppFirstLaunched === null) {
    return null; // or a loading component
  }

  // Redirect to onboarding if it's the first launch
  if (isAppFirstLaunched === true) {
    return <Redirect href="/onboarding" />;
  }
  return <LoginSignup />;
};

export default AuthScreen;

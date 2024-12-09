import React, { useEffect, useRef, useState } from "react";
import { Provider } from "react-redux";
import store from "@/context/store";
import { Redirect, Stack } from "expo-router";
import * as Notifications from "expo-notifications";
import { registerForPushNotificationsAsync } from "@/utils/registerForPushNotifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BACKEND_URL } from "@/utils/constants";
import axios from "axios";
import { ThemeProvider } from "@/context/ThemeContext";
import Toast from "react-native-toast-message";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    priority: Notifications.AndroidNotificationPriority.HIGH,
  }),
});

const _layout = () => {
  const saveTokenToUserDocument = async (token: string | undefined) => {
    console.log("Saving token to user document...");
    try {
      const userId = await AsyncStorage.getItem("userId");
      console.log("User ID:", userId);
      if (userId) {
        const res = await axios.post(`${BACKEND_URL}/savedevicetoken`, {
          promoterId: userId,
          deviceToken: token,
        });
        console.log("Save token response:", res.data);
      }
    } catch (error) {
      console.log("Error saving token to user document:", error);
    }
  };

  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();
  useEffect(() => {
    // Register for push notifications
    registerForPushNotificationsAsync().then(async (token) => {
      console.log("saved Push notification token:", token);
      await saveTokenToUserDocument(token).catch((error) =>
        console.log("Error saving token to user document:", error)
      );
    });

    // Notification listeners
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log("Notification received:", notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("Notification tapped:", response);
      });

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  return (
    <ThemeProvider>
      <Provider store={store}>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="index"
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="onboarding"
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="tabs"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
        <Toast />
      </Provider>
    </ThemeProvider>
  );
};

export default _layout;

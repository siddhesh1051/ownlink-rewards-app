import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import store from "@/context/store";
import { Redirect, Stack } from "expo-router";
import * as Notifications from "expo-notifications";
import { registerForPushNotificationsAsync } from "@/utils/registerForPushNotifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BACKEND_URL } from "@/utils/constants";
import axios from "axios";

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
  useEffect(() => {
    // Register for push notifications
    registerForPushNotificationsAsync().then((token) => {
      console.log("Push Token:", token);

      saveTokenToUserDocument(token);
    });

    // Notification listeners
    const notificationListener = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("Notification received:", notification);
      }
    );

    const responseListener =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("Notification tapped:", response);
      });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);
  return (
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
    </Provider>
  );
};

export default _layout;

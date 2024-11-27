import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import store from "@/context/store";
import { Redirect, Stack } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const _layout = () => {
  // Regular app layout
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

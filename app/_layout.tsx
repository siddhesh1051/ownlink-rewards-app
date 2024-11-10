import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import store from "@/context/store";
import { Stack } from "expo-router";

const _layout = () => {
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

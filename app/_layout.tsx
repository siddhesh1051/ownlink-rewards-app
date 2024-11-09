import { View, Text } from "react-native";
import React from "react";
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
      />
    </Provider>
  );
};

export default _layout;

import React from "react";
import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="rewards"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="allscratchcards"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default Layout;

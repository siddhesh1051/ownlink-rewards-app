// app/(tabs)/index/_layout.tsx
import { Stack } from "expo-router";

export default function DashboardLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Dashboard",
          headerTitleStyle: { fontSize: 24 },
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="[username]"
        options={({ route }: { route: any }) => ({
          title: `${route?.params?.username}`,
          headerShown: false,
          headerTitleStyle: { fontSize: 20 },
          presentation: "modal",
          animation: "slide_from_right",
        })}
      />
    </Stack>
  );
}

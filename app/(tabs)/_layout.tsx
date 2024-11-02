import { Tabs } from "expo-router";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import Toast from "react-native-toast-message";
import TabBar from "@/components/TabBar";

// import TabBar from "@/components/TabBar";

export default function RootLayout() {
  return (
    <GluestackUIProvider>
      <Tabs tabBar={(props) => <TabBar {...props} />}>
        {" "}
        <Tabs.Screen
          name="index"
          options={{
            title: "Dashboard",
            headerTitleStyle: {
              fontSize: 24,
            },
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
      <Toast />
    </GluestackUIProvider>
  );
}

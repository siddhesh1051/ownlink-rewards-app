import { Stack, Tabs } from "expo-router";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
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
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: "Explore",
          }}
        />
        <Tabs.Screen
          name="rewards"
          options={{
            title: "Rewards",
          }}
        />
        <Tabs.Screen
          name="account"
          options={{
            title: "Account",
          }}
        />
      </Tabs>
    </GluestackUIProvider>
  );
}

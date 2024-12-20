import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function registerForPushNotificationsAsync() {
  let token;

  // if (Device.isDevice) {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    alert("Failed to get push token for push notifications!");
    return;
  }

  token = (
    await Notifications.getExpoPushTokenAsync({
      projectId: "1534287b-8160-413b-9958-d4a4fde83115",
    })
  ).data;

  // Save the token to AsyncStorage (optional)
  await AsyncStorage.setItem("expoPushToken", token);
  console.log("Push notification token:", token);
  // }
  // else {
  //   "Must use physical device for Push Notifications");
  // }

  return token;
}

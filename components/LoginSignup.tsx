import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BACKEND_URL } from "@/utils/constants";
import { router } from "expo-router";
import { registerForPushNotificationsAsync } from "@/utils/registerForPushNotifications";

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (token) {
        router.push("/tabs");
      }
    } catch (error) {
      console.error("Error checking login:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      const url = isLogin
        ? `${BACKEND_URL}/promoterlogin`
        : `${BACKEND_URL}/promoterregister`;

      const deviceToken = await registerForPushNotificationsAsync();
      const response = await axios.post(url, { email, password, deviceToken });
      alert(response.data);

      if (response.data && response.data.token) {
        await AsyncStorage.setItem("authToken", response.data.token);
        console.log("data", response.data.promoter._id);
        await AsyncStorage.setItem("userId", response.data.promoter._id);
        router.push("/tabs");
      } else {
        alert(response.data.message);
        alert(deviceToken);

        console.log("Authentication failed:", response.data.message);
      }
    } catch (error) {
      alert("Error during login/signup");
      console.error("Error during login/signup:", error);
    }
  };

  return (
    <View style={styles(isDarkMode).container}>
      <View style={styles(isDarkMode).card}>
        <View style={styles(isDarkMode).header}>
          <Text style={styles(isDarkMode).title}>
            {isLogin ? "Login" : "Sign Up"}
          </Text>
        </View>
        <View style={styles(isDarkMode).content}>
          <View style={styles(isDarkMode).inputContainer}>
            <TextInput
              style={styles(isDarkMode).input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor={isDarkMode ? "#aaaaaa" : "#000000"}
            />
            <TextInput
              style={styles(isDarkMode).input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholderTextColor={isDarkMode ? "#aaaaaa" : "#000000"}
            />
          </View>
          <TouchableOpacity
            style={styles(isDarkMode).button}
            onPress={handleSubmit}
          >
            <Text style={styles(isDarkMode).buttonText}>
              {isLogin ? "Login" : "Sign Up"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setIsLogin((prev) => !prev)}
            style={styles(isDarkMode).toggleContainer}
          >
            <Text style={styles(isDarkMode).toggleText}>
              {isLogin
                ? "Don't have an account? Sign Up"
                : "Already have an account? Login"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = (isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: isDarkMode ? "#121212" : "#f0f0f0",
    },
    card: {
      width: "90%",
      backgroundColor: isDarkMode ? "#1E1E1E" : "white",
      borderRadius: 16,
      shadowColor: isDarkMode ? "#000" : "#888",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.3,
      shadowRadius: 3.84,
      elevation: 5,
    },
    header: {
      backgroundColor: isDarkMode ? "#e3e3e3" : "#1c1c1c",
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
    title: {
      color: isDarkMode ? "black" : "white",
      fontSize: 18,
      fontWeight: "bold",
    },
    content: {
      padding: 16,
    },
    inputContainer: {
      width: "100%",
      marginBottom: 16,
    },
    input: {
      backgroundColor: isDarkMode ? "#333333" : "#f0f0f0",
      color: isDarkMode ? "#FFFFFF" : "#000000",
      borderRadius: 8,
      paddingVertical: 12,
      paddingHorizontal: 16,
      marginVertical: 8,
    },

    button: {
      backgroundColor: isDarkMode ? "#f0f0f0" : "#1c1c1c",
      paddingVertical: 12,
      borderRadius: 8,
    },
    buttonText: {
      color: isDarkMode ? "black" : "white",
      textAlign: "center",
      fontSize: 16,
      fontWeight: "600",
    },
    toggleContainer: {
      marginTop: 16,
    },
    toggleText: {
      color: isDarkMode ? "#f0f0f0" : "#1c1c1c",
      textAlign: "center",
    },
  });

export default LoginSignup;

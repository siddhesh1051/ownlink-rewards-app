import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import axios from "axios";

const LoginSignup = ({ onLogin }: { onLogin: any }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (token) {
        router.replace("/");
      }
    } catch (error) {
      console.error("Error checking login:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      const url = isLogin
        ? "https://e9a6-2409-40c2-11d-84f8-d0f9-655e-ffbd-cfad.ngrok-free.app/api/promoterlogin"
        : "https://e9a6-2409-40c2-11d-84f8-d0f9-655e-ffbd-cfad.ngrok-free.app/api/promoterregister";

      const response = await axios.post(url, { email, password });

      if (response.data && response.data.token) {
        await AsyncStorage.setItem("authToken", response.data.token);
        console.log("data", response.data.promoter._id);
        await AsyncStorage.setItem("userId", response.data.promoter._id);
        onLogin(); // Notify parent component that login was successful
        router.replace("/");
      } else {
        console.log("Authentication failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error during login/signup:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.title}>{isLogin ? "Login" : "Sign Up"}</Text>
        </View>
        <View style={styles.content}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>
              {isLogin ? "Login" : "Sign Up"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setIsLogin((prev) => !prev)}
            style={styles.toggleContainer}
          >
            <Text style={styles.toggleText}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  card: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    backgroundColor: "#007AFF",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  title: {
    color: "white",
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
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginVertical: 8,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
  toggleContainer: {
    marginTop: 16,
  },
  toggleText: {
    color: "#007AFF",
  },
});

export default LoginSignup;

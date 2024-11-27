import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, Text, TextInput, View } from "react-native";
import axios from "axios";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "../ui/modal";
import { BACKEND_URL } from "@/utils/constants";

const OTPModal = ({
  isModalOpen,
  setIsModalOpen,
  isDarkMode,
  requiredPoints,
  currentOtpId,
  toggleRefresh,
}: {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  isDarkMode: boolean;
  requiredPoints: number;
  currentOtpId: string;
  toggleRefresh: () => void;
}) => {
  const inputRefs = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
  ];
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState(false);
  const shakeAnimation = useRef(new Animated.Value(0)).current;

  const handleTextChange = (text: string, index: number) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = text;
    setOtp(updatedOtp);

    const nextIndex = index + 1;
    const prevIndex = index - 1;

    if (text) {
      // Move to the next input
      if (nextIndex < inputRefs.length) {
        inputRefs[nextIndex].current?.focus();
      }
    } else {
      // Handle backspace: move to the previous input
      if (prevIndex >= 0) {
        inputRefs[prevIndex].current?.focus();
      }
    }

    // Reset error styles when input changes
    setError(false);

    // Trigger verification when all inputs are filled
    if (updatedOtp.join("").length === 4) {
      verifyOTP(updatedOtp.join(""));
    }
  };

  const verifyOTP = async (enteredOtp: string) => {
    console.log("Verifying OTP...", enteredOtp, currentOtpId, requiredPoints);
    try {
      const response = await axios.post(`${BACKEND_URL}/verifyredeemotp`, {
        inputOtp: enteredOtp,
        otpId: currentOtpId,
        userId: await AsyncStorage.getItem("userId"),
        points: requiredPoints,
      });
      if (response.status === 200) {
        setIsModalOpen(false);
        setOtp(["", "", "", ""]);
        toggleRefresh();
        Toast.show({
          type: "success",
          text1: "Success",
          text2: response.data.message,
        });
      } else if (response.status === 400) {
        setError(true);
        triggerShake();
        Toast.show({
          type: "error",
          text1: "Error",
          text2: response.data.message,
        });
      } else {
        setIsModalOpen(false);
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      setError(true);
      triggerShake();
      console.error("Error verifying OTP:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Something went wrong. Please try again.",
      });
    }
  };

  const triggerShake = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation, {
        toValue: -10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={() => {
        setIsModalOpen(false);
        setOtp(["", "", "", ""]);
        setError(false);
      }}
      size="lg"
    >
      <ModalBackdrop
        animate={{
          opacity: 0.8,
        }}
      />
      <Animated.View
        style={{
          transform: [{ translateX: shakeAnimation }],
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ModalContent
          style={{
            backgroundColor: isDarkMode ? "#000" : "#fff",
            borderWidth: 0,
            borderRadius: 16,
            padding: 16,
          }}
        >
          <ModalHeader
            style={{
              display: "flex",
              justifyContent: "flex-end",
              paddingRight: 16,
            }}
          ></ModalHeader>

          <ModalBody>
            <View style={styles.descriptionText}>
              <Text
                style={[
                  styles.headerText,
                  { color: isDarkMode ? "#fff" : "#000" },
                ]}
              >
                OTP sent to your email.
              </Text>
              <Text
                style={[
                  styles.headerText,
                  { color: isDarkMode ? "#fff" : "#000" },
                ]}
              >
                Also check your spam folder.
              </Text>
            </View>

            <View style={styles.container}>
              {Array.from({ length: 4 }).map((_, index) => (
                <TextInput
                  key={index}
                  ref={inputRefs[index]}
                  style={[
                    styles.input,
                    {
                      backgroundColor: isDarkMode ? "#222" : "#f9f9f9",
                      color: isDarkMode ? "#fff" : "#000",
                      borderColor: error ? "red" : "#ccc",
                    },
                  ]}
                  maxLength={1}
                  onChangeText={(text) => handleTextChange(text, index)}
                  selectTextOnFocus={false}
                  onKeyPress={({ nativeEvent }) => {
                    console.log("key", nativeEvent);
                    if (nativeEvent.key === "Backspace") {
                      const prevIndex = index - 1;
                      if (prevIndex >= 0) {
                        inputRefs[prevIndex].current?.focus();
                      }
                    }
                  }}
                />
              ))}
            </View>

            <View style={styles.resendParent}>
              <Text style={{ color: isDarkMode ? "#fff" : "#000" }}>
                Didn't receive the OTP?
              </Text>
              <Text
                style={[
                  styles.resendBtn,
                  { color: isDarkMode ? "#fff" : "#000" },
                ]}
              >
                Resend
              </Text>
            </View>
            <View style={styles.errorDescription}>
              <Text
                style={{
                  color: "red",
                }}
              >
                {error && "Invalid OTP. Please try again."}
              </Text>
            </View>
          </ModalBody>
        </ModalContent>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginTop: 16,
  },
  input: {
    width: 48,
    height: 48,
    textAlign: "center",
    fontSize: 18,
    borderWidth: 1,
    borderRadius: 8,
  },
  descriptionText: {
    marginBottom: 8,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 16,
    textAlign: "center",
  },
  errorDescription: {
    color: "red",
    fontSize: 14,
    textAlign: "center",
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  resendBtn: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: "bold",
  },
  resendParent: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 14,
    textAlign: "center",
    marginTop: 16,
    gap: 2,
  },
});

export default OTPModal;

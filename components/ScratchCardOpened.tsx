import { View, Text, StyleSheet, Image, useColorScheme } from "react-native";
import React from "react";
import { HStack } from "./ui/hstack";
import { FontAwesome6 } from "@expo/vector-icons";

interface ScratchCardOpenedProps {
  points: number;
}

const ScratchCardOpened = ({ points }: ScratchCardOpenedProps) => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  return (
    <View style={styles(isDarkMode).card}>
      <Image
        source={require("../assets/confetti.jpg")}
        style={styles(isDarkMode).imageCard}
      />
      <HStack space="sm" className="items-center">
        <Text style={styles(isDarkMode).subTitleText}>{points}</Text>

        <FontAwesome6
          name="coins"
          size={32}
          color={isDarkMode ? "#f0f0f0" : "black"}
        />
      </HStack>
    </View>
  );
};

export default ScratchCardOpened;

const styles = (isDarkMode: boolean) =>
  StyleSheet.create({
    card: {
      backgroundColor: isDarkMode ? "#3c3c3c" : "#f6f6f6",
      width: "100%",
      height: 150,
      borderRadius: 16,
      alignItems: "center",
      justifyContent: "center",
      display: "flex",
      padding: 4,
      gap: 4,
    },
    imageCard: {
      height: 80,
      width: 80,
      resizeMode: "contain",
    },
    subTitleText: {
      fontSize: 32,
      color: isDarkMode ? "#f0f0f0" : "black",
      fontWeight: "500",
    },
    titleText: {
      fontSize: 40,
      color: "black",
      fontWeight: "700",
    },
  });

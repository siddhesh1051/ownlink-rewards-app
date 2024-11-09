import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { HStack } from "./ui/hstack";
import { FontAwesome6 } from "@expo/vector-icons";

interface ScratchCardOpenedProps {
  points: number;
}

const ScratchCardOpened = ({ points }: ScratchCardOpenedProps) => {
  return (
    <View style={styles.card}>
      <Image
        source={require("../assets/confetti.png")}
        style={styles.imageCard}
      />
      <HStack space="sm" className="items-center">
        <Text style={styles.subTitleText}>{points}</Text>

        <FontAwesome6 name="coins" size={32} />
      </HStack>
    </View>
  );
};

export default ScratchCardOpened;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f6f6f6",
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
    color: "black",
    fontWeight: "500",
  },
  titleText: {
    fontSize: 40,
    color: "black",
    fontWeight: "700",
  },
});

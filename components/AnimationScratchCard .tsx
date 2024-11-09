import { Image, StyleSheet, View, Text } from "react-native";
import React, { useState } from "react";
import { ScratchCard } from "@/components/ScratchCard";
import { useImage } from "@shopify/react-native-skia";
import { HStack } from "./ui/hstack";
import { FontAwesome6 } from "@expo/vector-icons";
import { ScratchCard as ScratchCardModel } from "@/models";
import { Spinner } from "./ui/spinner";

const AnimationScratchCard = ({
  setIsModalOpen,
  selectedScratchCard,
  toggleRefresh,
}: {
  setIsModalOpen: (value: boolean) => void;
  selectedScratchCard: ScratchCardModel | undefined;
  toggleRefresh: () => void;
}) => {
  const [revealedPoints, setRevealedPoints] = useState();

  const image = useImage(require("../assets/scratch_foreground.png"));

  if (!image) {
    return <Text style={styles.loading}>Loading...</Text>;
  }

  return (
    <View style={styles.cardContainer}>
      <ScratchCard
        style={styles.scratchCard}
        image={image}
        setIsModalOpen={setIsModalOpen}
        scratchThreshold={75}
        selectedScratchCard={selectedScratchCard}
        toggleRefresh={toggleRefresh}
        setRevealedPoints={setRevealedPoints}
      >
        <View style={styles.card}>
          <Image
            source={require("../assets/confetti.png")}
            style={styles.imageCard}
          />
          <Text style={styles.titleText}>You Won!</Text>
          {revealedPoints ? (
            <HStack space="sm" className="items-center">
              <Text style={styles.subTitleText}>{revealedPoints}</Text>
              <FontAwesome6 name="coins" size={32} />
            </HStack>
          ) : (
            <Spinner size="large" />
          )}
        </View>
      </ScratchCard>
    </View>
  );
};

export default AnimationScratchCard;

const styles = StyleSheet.create({
  cardContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  scratchCard: {
    borderRadius: 16,
  },
  loading: {
    fontSize: 16,
  },
  card: {
    backgroundColor: "#f6f6f6",
    width: "100%",
    height: "100%",
    borderRadius: 16,
    // borderColor: "#f3f3f3",
    // borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    padding: 10,
  },
  imageCard: {
    height: 120,
    width: 120,
    resizeMode: "contain",
    // marginBottom: 20,
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

import { Image, StyleSheet, View, Text } from "react-native";
import React, { useState } from "react";
import { ScratchCard } from "@/components/ScratchCard";
import { useImage } from "@shopify/react-native-skia";
import { HStack } from "./ui/hstack";
import { FontAwesome6 } from "@expo/vector-icons";
import { ScratchCard as ScratchCardModel } from "@/models";
import { Spinner } from "./ui/spinner";
import { SkeletonText } from "./ui/skeleton";

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
  const [isScratched, setScratched] = useState(false);
  const [isFetchingPoints, setIsFetchingPoints] = useState(false);

  const image = useImage(require("../assets/scratch_foreground.jpg"));

  if (!image) {
    return <Spinner size="large" color="white" />;
  }

  return (
    <View style={styles.cardContainer}>
      <ScratchCard
        style={styles.scratchCard}
        image={image}
        setIsModalOpen={setIsModalOpen}
        scratchThreshold={40}
        selectedScratchCard={selectedScratchCard}
        toggleRefresh={toggleRefresh}
        setRevealedPoints={setRevealedPoints}
        isScratched={isScratched}
        setScratched={setScratched}
        isFetchingPoints={isFetchingPoints}
        setIsFetchingPoints={setIsFetchingPoints}
      >
        <View style={styles.card}>
          <Image
            source={require("../assets/confetti.jpg")}
            style={styles.imageCard}
          />
          <Text style={styles.titleText}>You Won!</Text>
          {revealedPoints ? (
            <HStack space="sm" className="items-center">
              <Text style={styles.subTitleText}>{revealedPoints}</Text>
              <FontAwesome6 name="coins" size={32} />
            </HStack>
          ) : isFetchingPoints ? (
            <View className="flex flex-row justify-center items-center align-middle w-full px-4 mt-2">
              <SkeletonText _lines={1} className="h-10 w-full" />
            </View>
          ) : (
            <Text style={styles.descriptionText}>Scratch to reveal</Text>
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
  descriptionText: {
    fontSize: 16,
    color: "black",
    fontWeight: "400",
    marginTop: 8,
  },
});

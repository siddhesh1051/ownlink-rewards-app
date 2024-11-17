import { StyleSheet, Image } from "react-native";
import React from "react";
import { Card } from "./ui/card";
import { VStack } from "./ui/vstack";
import { Heading } from "./ui/heading";
import { Box } from "./ui/box";
import { Button, ButtonText } from "./ui/button";
import { Text } from "./ui/text";
import { HStack } from "./ui/hstack";
import { FontAwesome6 } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

interface RewardProps {
  isDarkMode: boolean;
  rewardTitle: string;
  rewardCategory: string;
  rewardPoints: number;
  rewardImage: string;
}

const RewardCard = ({
  isDarkMode,
  rewardTitle,
  rewardCategory,
  rewardPoints,
  rewardImage,
}: RewardProps) => {
  const handleRedeem = () => {
    Toast.show({
      type: "success",
      text1: "Coming Soon",
      text2: "This feature is under development",
    });
  };
  return (
    <Card className="rounded-lg max-w-[360px]">
      <Image
        source={{
          uri: rewardImage,
        }}
        style={styles.image}
        resizeMode="cover"
      />
      <Text className="text-sm font-normal mb-2 text-typography-700">
        {rewardCategory}
      </Text>
      <VStack space="sm" className="mb-6">
        <Heading size="lg" className="mb-4">
          {rewardTitle}
        </Heading>
        <HStack space="sm" className="items-center">
          <Text size="2xl">{rewardPoints}</Text>
          <FontAwesome6
            name="coins"
            size={22}
            color={isDarkMode ? "white" : "black"}
          />
        </HStack>
      </VStack>
      <Box className="flex-col sm:flex-row">
        <Button
          size="md"
          className="px-4 py-2 mr-0 mb-3 sm:mr-3 sm:mb-0 sm:flex-1"
        >
          <ButtonText onPress={() => handleRedeem()} size="md">
            Redeem
          </ButtonText>
        </Button>
      </Box>
    </Card>
  );
};

export default RewardCard;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 250,
    borderRadius: 8,
    marginBottom: 4,
  },
});

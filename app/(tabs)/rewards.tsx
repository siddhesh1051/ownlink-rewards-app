import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { ChevronRightIcon } from "lucide-react-native";
import { Divider } from "@/components/ui/divider";
import { Button, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Grid, GridItem } from "@/components/ui/grid";
import { Center } from "@/components/ui/center";
import { Icon } from "@/components/ui/icon";
import RewardCard from "@/components/RewardCard";
import { FontAwesome6 } from "@expo/vector-icons";
import { useRef, useState } from "react";
import ModalComponent from "@/components/ui/ModalComponent";

export default function Rewards() {
  const scrollViewRef = useRef<ScrollView>(null);
  const [rewardsLayout, setRewardsLayout] = useState({ y: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRedeemClick = () => {
    scrollViewRef.current?.scrollTo({
      y: rewardsLayout.y,
      animated: true,
    });
  };

  return (
    <View>
      <ScrollView ref={scrollViewRef}>
        <View style={styles.parentContainer}>
          <View style={styles.cardParent}>
            <View className="rounded-xl bg-neutral-800 border w-full px-12 py-10 flex gap-6 justify-center items-center">
              <Text className="text-gray-300 text-lg">Reward Points</Text>
              <HStack space="md" className="items-start justify-center">
                <Text className="text-white font-bold text-5xl">720</Text>
                <FontAwesome6 name="coins" size={32} color="white" />
              </HStack>
              <Divider className="my-0.5 bg-gray-700" />
              <VStack space="md">
                <Button
                  onPress={handleRedeemClick}
                  variant="outline"
                  className="border border-gray-100"
                >
                  <ButtonText className="text-white font-bold">
                    Redeem
                  </ButtonText>
                </Button>
                <Text className="text-gray-300 text-sm">See Transactions</Text>
              </VStack>
            </View>
          </View>

          <View style={styles.sectionParent}>
            <View className="flex gap-4">
              <Center>
                <Text className="text-gray-900 text-center text-xl font-bold">
                  Scratch & Win
                </Text>
              </Center>

              <Grid
                className="gap-5"
                _extra={{
                  className: "grid-cols-2",
                }}
              >
                {Array.from({ length: 4 }).map((_, index) => (
                  <GridItem
                    key={index}
                    className="rounded-xl border"
                    _extra={{
                      className: "",
                    }}
                  >
                    <TouchableOpacity onPress={() => setIsModalOpen(true)}>
                      <Image
                        source={require("../../assets/scratch_foreground.png")}
                        style={{ width: "100%", height: 150, borderRadius: 10 }}
                      />
                    </TouchableOpacity>
                  </GridItem>
                ))}
              </Grid>
              <Center>
                <TouchableOpacity className="flex flex-row justify-center items-center gap-1">
                  <Text>View more</Text>
                  <Icon as={ChevronRightIcon} />
                </TouchableOpacity>
              </Center>
            </View>
          </View>

          <View
            style={styles.sectionParent}
            onLayout={(event) => {
              setRewardsLayout(event.nativeEvent.layout);
            }}
          >
            <View className="flex gap-4">
              <Center>
                <Text className="text-gray-900 text-center text-xl font-bold">
                  Rewards Shop
                </Text>
              </Center>

              <Grid
                className="gap-5"
                _extra={{
                  className: "grid-cols-1",
                }}
              >
                {Array.from({ length: 4 }).map((_, index) => (
                  <GridItem
                    key={index}
                    _extra={{
                      className: "col-span-1",
                    }}
                  >
                    <RewardCard />
                  </GridItem>
                ))}
              </Grid>
              <Center>
                <TouchableOpacity className="flex flex-row justify-center items-center gap-1">
                  <Text>View more</Text>
                  <Icon as={ChevronRightIcon} />
                </TouchableOpacity>
              </Center>
            </View>
          </View>
        </View>
      </ScrollView>
      <ModalComponent
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  parentContainer: {
    marginBottom: 70,
    paddingTop: 8,
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  sectionParent: {
    padding: 16,
  },
  cardParent: {
    paddingHorizontal: 16,
  },
});

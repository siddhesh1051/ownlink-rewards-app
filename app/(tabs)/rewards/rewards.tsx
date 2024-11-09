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
import { useEffect, useRef, useState } from "react";
import ModalComponent from "@/components/ui/ModalComponent";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BACKEND_URL } from "@/utils/constants";
import { ScratchCard } from "@/models";
import ScratchCardOpened from "@/components/ScratchCardOpened";
import { useRouter } from "expo-router";
import { Spinner } from "@/components/ui/spinner";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInfo } from "@/context/actions/userActions";

export default function Rewards() {
  const scrollViewRef = useRef<ScrollView>(null);
  const [rewardsLayout, setRewardsLayout] = useState({ y: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScratchCardsLoading, setIsScratchCardsLoading] = useState(false);
  const [userScratchCards, setUserScratchCards] = useState<ScratchCard[]>([]);
  const [selectedScratchCard, setSelectedScratchCard] = useState<ScratchCard>();
  const [refresh, setRefresh] = useState(false);

  const [reveleadScratchCards, setReveleadScratchCards] = useState<
    ScratchCard[]
  >([]);
  const [notreveleadScratchCards, setNotReveleadScratchCards] = useState<
    ScratchCard[]
  >([]);

  const router = useRouter();

  const handleRedeemClick = () => {
    scrollViewRef.current?.scrollTo({
      y: rewardsLayout.y,
      animated: true,
    });
  };

  useEffect(() => {
    const getUsersScratchCards = async () => {
      setIsScratchCardsLoading(true);
      try {
        const userId = await AsyncStorage.getItem("userId");
        console.log("User ID:", typeof userId, userId);
        const response = await axios.get(
          `${BACKEND_URL}/getscratchcardsbyuser/${userId}`
        );

        if (response && response.data) {
          setUserScratchCards(response.data);

          setReveleadScratchCards(
            response.data
              .filter((item: ScratchCard) => item.isRevealed)
              .reverse()
          );

          setNotReveleadScratchCards(
            response.data
              .filter((item: ScratchCard) => !item.isRevealed)
              .reverse()
          );
        } else {
          console.log("Failed to get scratchcards:", response.data.message);
        }
      } catch (error) {
        console.error("Error getting scratchcards:", error);
      } finally {
        setIsScratchCardsLoading(false);
      }
    };
    getUsersScratchCards();
  }, [refresh]);

  const handleScratchCardClick = (scratchCardId: string) => {
    setIsModalOpen(true);
    setSelectedScratchCard(
      userScratchCards.find((item) => item._id === scratchCardId)
    );
  };

  const toggleRefresh = () => {
    setRefresh(!refresh);
  };
  const dispatch = useDispatch();
  const { loading, userInfo, error } = useSelector(
    (state: { user: { loading: boolean; userInfo: any; error: any } }) =>
      state.user
  );

  useEffect(() => {
    dispatch(fetchUserInfo("672d1484a4404c5ef2b27f38"));
  }, [dispatch]);

  console.log("userInfo", userInfo);

  return (
    <View>
      <ScrollView ref={scrollViewRef}>
        <View style={styles.parentContainer}>
          <View style={styles.cardParent}>
            <View className="rounded-xl bg-neutral-800 border w-full px-12 py-10 flex gap-6 justify-center items-center">
              <Text className="text-gray-300 text-lg">Reward Points</Text>
              <HStack space="md" className="items-start justify-center">
                <Text className="text-white font-bold text-5xl">{}</Text>
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
            {isScratchCardsLoading ? (
              <Spinner size="large" color="black" />
            ) : (
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
                  {notreveleadScratchCards.slice(0, 4).map((item, index) => (
                    <GridItem
                      key={item._id}
                      className="rounded-xl border"
                      _extra={{
                        className: "",
                      }}
                    >
                      {item.isRevealed ? (
                        <ScratchCardOpened points={item.points} />
                      ) : (
                        <TouchableOpacity
                          onPress={() => handleScratchCardClick(item._id)}
                        >
                          <Image
                            source={require("../../../assets/scratch_foreground.png")}
                            style={{
                              width: "100%",
                              height: 150,
                              borderRadius: 10,
                            }}
                          />
                        </TouchableOpacity>
                      )}
                    </GridItem>
                  ))}
                  {reveleadScratchCards
                    .slice(0, 3 - notreveleadScratchCards.length)
                    .map((item, index) => (
                      <GridItem
                        key={item._id}
                        className="rounded-xl border"
                        _extra={{
                          className: "",
                        }}
                      >
                        {item.isRevealed ? (
                          <ScratchCardOpened points={item.points} />
                        ) : (
                          <TouchableOpacity
                            onPress={() => handleScratchCardClick(item._id)}
                          >
                            <Image
                              source={require("../../../assets/scratch_foreground.png")}
                              style={{
                                width: "100%",
                                height: 150,
                                borderRadius: 10,
                              }}
                            />
                          </TouchableOpacity>
                        )}
                      </GridItem>
                    ))}
                </Grid>
                <Center>
                  <TouchableOpacity
                    onPress={() => router.push("/rewards/allscratchcards")}
                    className="flex flex-row justify-center items-center gap-1"
                  >
                    <Text>View more</Text>
                    <Icon as={ChevronRightIcon} />
                  </TouchableOpacity>
                </Center>
              </View>
            )}
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
        selectedScratchCard={selectedScratchCard}
        toggleRefresh={toggleRefresh}
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

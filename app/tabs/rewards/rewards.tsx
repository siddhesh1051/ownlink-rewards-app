import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  useColorScheme,
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
import { AppDispatch, RootState } from "@/context/store";
import { fetchUserInfo, getUserInfo } from "@/context/slices/userSlice";

export default function Rewards() {
  const scrollViewRef = useRef<ScrollView>(null);
  const [rewardsLayout, setRewardsLayout] = useState({ y: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScratchCardsLoading, setIsScratchCardsLoading] = useState(false);
  const [userScratchCards, setUserScratchCards] = useState<ScratchCard[]>([]);
  const [selectedScratchCard, setSelectedScratchCard] = useState<ScratchCard>();
  const [refresh, setRefresh] = useState(false);
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  const [reveleadScratchCards, setReveleadScratchCards] = useState<
    ScratchCard[]
  >([]);
  const [notreveleadScratchCards, setNotReveleadScratchCards] = useState<
    ScratchCard[]
  >([]);

  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();
  const userInfo = useSelector(getUserInfo);
  const status = useSelector((state: RootState) => state.user.status);

  const rewardsData = [
    {
      rewardTitle: "Boat Airdopes 131",
      rewardCategory: "Electronics",
      rewardPoints: 1000,
      rewardImage:
        "https://www.boat-lifestyle.com/cdn/shop/products/R55050mmdrivers_2ecbed0b-a731-41db-b532-daed838c5b5d_700x.jpg?v=1659339546",
    },
    {
      rewardTitle: "Amazon Gift Card - ₹100",
      rewardCategory: "Gift Cards",
      rewardPoints: 500,
      rewardImage:
        "https://m.media-amazon.com/images/G/01/gc/designs/livepreview/amzsquid_clr_noto_email_anim_v2016_us-main._CB543718275_.png",
    },
    {
      rewardTitle: "Noise Pulse 2 Max Smart Watch",
      rewardCategory: "Fitness",
      rewardPoints: 1500,
      rewardImage:
        "https://m.media-amazon.com/images/I/41gBhLWS0EL._SX300_SY300_QL70_FMwebp_.jpg",
    },
    {
      rewardTitle: "JBL GO3 Bluetooth Speaker",
      rewardCategory: "Electronics",
      rewardPoints: 3000,
      rewardImage:
        "https://m.media-amazon.com/images/I/31L2TB4sMRL._SX300_SY300_QL70_FMwebp_.jpg",
    },
    {
      rewardTitle: "Logitech M185 Wireless Mouse",
      rewardCategory: "Accessories",
      rewardPoints: 2500,
      rewardImage:
        "https://m.media-amazon.com/images/I/61N+CzcA8vL._SX679_.jpg",
    },
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem("userId");
        if (storedUserId) {
          dispatch(fetchUserInfo(storedUserId)); // Pass userId to the fetch action
        }
      } catch (error) {
        console.error("Error retrieving user ID from AsyncStorage:", error);
      }
    };

    fetchUserData();
  }, [refresh]); // Empty dependency array ensures it's called once after the component mounts

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
        console.log("User ID:", userId);
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

  return (
    <View>
      <ScrollView ref={scrollViewRef}>
        <View style={styles(isDarkMode).parentContainer}>
          <View style={styles(isDarkMode).cardParent}>
            <View className="rounded-xl bg-neutral-800 border w-full px-12 py-10 flex gap-6 justify-center items-center">
              <Text className="text-gray-300 text-lg">Reward Points</Text>
              <HStack space="md" className="items-start justify-center">
                <Text className="text-white font-bold text-5xl">
                  {userInfo?.promoter?.rewardPoints}
                </Text>
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

          <View style={styles(isDarkMode).sectionParent}>
            {isScratchCardsLoading ? (
              <Spinner size="large" color={isDarkMode ? "white" : "black"} />
            ) : (
              <View className="flex gap-4">
                <Center>
                  <Text className="text-gray-900  dark:text-gray-100 text-center text-xl font-bold">
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
                            source={require("../../../assets/scratch_foreground.jpg")}
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
                  {notreveleadScratchCards.length < 4 &&
                    reveleadScratchCards
                      .slice(0, 4 - notreveleadScratchCards.length)
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
                                source={require("../../../assets/scratch_foreground.jpg")}
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
                    onPress={() => router.push("/tabs/rewards/allscratchcards")}
                    className="flex flex-row justify-center items-center gap-1"
                  >
                    <Text className="text-gray-900 dark:text-gray-100">
                      View more
                    </Text>
                    <Icon as={ChevronRightIcon} />
                  </TouchableOpacity>
                </Center>
              </View>
            )}
          </View>

          <View
            style={styles(isDarkMode).sectionParent}
            onLayout={(event) => {
              setRewardsLayout(event.nativeEvent.layout);
            }}
          >
            <View className="flex gap-4">
              <Center>
                <Text className="text-gray-900 dark:text-gray-100 text-center text-xl font-bold">
                  Rewards Shop
                </Text>
              </Center>

              <Grid
                className="gap-5"
                _extra={{
                  className: "grid-cols-1",
                }}
              >
                {rewardsData.length > 0 &&
                  rewardsData.map((item, index) => (
                    <GridItem
                      key={index}
                      _extra={{
                        className: "col-span-1",
                      }}
                    >
                      <RewardCard
                        isDarkMode={isDarkMode}
                        rewardTitle={item.rewardTitle}
                        rewardCategory={item.rewardCategory}
                        rewardPoints={item.rewardPoints}
                        rewardImage={item.rewardImage}
                      />
                    </GridItem>
                  ))}
              </Grid>
              <Center>
                <TouchableOpacity className="flex flex-row justify-center items-center gap-1">
                  <Text className="text-gray-900 dark:text-gray-100">
                    View more
                  </Text>
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
        isDarkMode={isDarkMode}
      />
    </View>
  );
}

const styles = (isDarkMode: boolean) =>
  StyleSheet.create({
    parentContainer: {
      paddingBottom: 70,
      paddingTop: 8,
      display: "flex",
      flexDirection: "column",
      gap: 8,
      backgroundColor: isDarkMode ? "#1c1c1c" : "#f0f0f0",
    },
    sectionParent: {
      padding: 16,
    },
    cardParent: {
      paddingHorizontal: 16,
    },
  });

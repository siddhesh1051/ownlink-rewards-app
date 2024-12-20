import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  useColorScheme,
  RefreshControl,
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
import { useContext, useEffect, useRef, useState } from "react";
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
import OTPModal from "@/components/custom/OTPModal";
import Toast from "react-native-toast-message";
import ScratchCardSkeleton from "@/components/skeletons/ScratchCardSkeleton";
import { ThemeContext } from "@/context/ThemeContext";

export default function Rewards() {
  const scrollViewRef = useRef<ScrollView>(null);
  const [rewardsLayout, setRewardsLayout] = useState({ y: 0 });
  const [isRefreshing, setIsRefreshing] = useState(false); // State for pull-to-refresh
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRewardModalOpen, setIsRewardModalOpen] = useState(false);
  const [isScratchCardsLoading, setIsScratchCardsLoading] = useState(false);
  const [userScratchCards, setUserScratchCards] = useState<ScratchCard[]>([]);
  const [selectedScratchCard, setSelectedScratchCard] = useState<ScratchCard>();
  const [refresh, setRefresh] = useState(false);
  const [requiredPoints, setRequiredPoints] = useState(0);
  const [currentOtpId, setCurrentOtpId] = useState("");

  const [reveleadScratchCards, setReveleadScratchCards] = useState<
    ScratchCard[]
  >([]);
  const [notreveleadScratchCards, setNotReveleadScratchCards] = useState<
    ScratchCard[]
  >([]);

  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === "dark";

  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();
  const userInfo = useSelector(getUserInfo);

  const rewardsData = [
    {
      rewardTitle: "Boat Rockerz 550",
      rewardCategory: "Electronics",
      rewardPoints: 200,
      rewardImage:
        "https://m.media-amazon.com/images/I/61ljxTBpTCL._SX679_.jpg",
    },
    {
      rewardTitle: "Amazon Gift Card - ₹100",
      rewardCategory: "Gift Cards",
      rewardPoints: 50,
      rewardImage:
        "https://m.media-amazon.com/images/G/01/gc/designs/livepreview/amzsquid_clr_noto_email_anim_v2016_us-main._CB543718275_.png",
    },
    {
      rewardTitle: "Noise ColorFit 3 Smart Watch",
      rewardCategory: "Fitness",
      rewardPoints: 150,
      rewardImage:
        "https://m.media-amazon.com/images/I/41O7YJM+9+L._SY300_SX300_.jpg",
    },
    {
      rewardTitle: "JBL GO3 Bluetooth Speaker",
      rewardCategory: "Electronics",
      rewardPoints: 300,
      rewardImage:
        "https://m.media-amazon.com/images/I/31L2TB4sMRL._SX300_SY300_QL70_FMwebp_.jpg",
    },
    {
      rewardTitle: "Logitech G102 Gaming Mouse",
      rewardCategory: "Accessories",
      rewardPoints: 250,
      rewardImage:
        "https://m.media-amazon.com/images/I/61RYwHoeHjL._SX679_.jpg",
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
      setIsRefreshing(false); // Stop refresh indicator
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

  const handleRefresh = () => {
    setIsRefreshing(true);
    toggleRefresh();
  };

  return (
    <View>
      <ScrollView
        ref={scrollViewRef}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            tintColor={isDarkMode ? "white" : "black"}
          />
        }
      >
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
                <TouchableOpacity
                  onPress={() =>
                    router.push("/tabs/rewards/transactionhistory")
                  }
                  className="flex flex-row justify-center items-center gap-1"
                >
                  <Text className="text-gray-300 text-sm">
                    See Transactions
                  </Text>
                  <Icon
                    as={ChevronRightIcon}
                    className="text-gray-300 text-sm"
                  />
                </TouchableOpacity>
              </VStack>
            </View>
          </View>

          <View style={styles(isDarkMode).sectionParent}>
            <View className="flex gap-4">
              <Center>
                <Text className="text-gray-900  dark:text-gray-100 text-center text-xl font-bold">
                  Scratch & Win
                </Text>
              </Center>

              {reveleadScratchCards.length === 0 &&
              notreveleadScratchCards.length === 0 &&
              !isScratchCardsLoading ? (
                <Center>
                  <Text className="text-gray-900 dark:text-gray-100 text-center text-sm font-light">
                    No scratch cards available
                  </Text>
                </Center>
              ) : (
                !isScratchCardsLoading && (
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
                )
              )}
              {!isScratchCardsLoading ? (
                reveleadScratchCards.length == 0 &&
                notreveleadScratchCards.length === 0 ? null : (
                  <Center>
                    <TouchableOpacity
                      onPress={() =>
                        router.push("/tabs/rewards/allscratchcards")
                      }
                      className="flex flex-row justify-center items-center gap-1"
                    >
                      <Text className="text-gray-900 dark:text-gray-100">
                        View more
                      </Text>
                      <Icon as={ChevronRightIcon} />
                    </TouchableOpacity>
                  </Center>
                )
              ) : null}
              {isScratchCardsLoading && (
                <Grid
                  className="gap-5"
                  _extra={{
                    className: "grid-cols-2",
                  }}
                >
                  {Array.from({ length: 2 }).map((_, index) => (
                    <GridItem
                      key={index}
                      className="rounded-xl"
                      _extra={{
                        className: "",
                      }}
                    >
                      <ScratchCardSkeleton />
                    </GridItem>
                  ))}
                </Grid>
              )}
            </View>
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
                        setIsRewardModalOpen={setIsRewardModalOpen}
                        setRequiredPoints={setRequiredPoints}
                        setCurrentOtpId={setCurrentOtpId}
                      />
                    </GridItem>
                  ))}
              </Grid>
              <Center>
                <TouchableOpacity
                  onPress={() => {
                    Toast.show({
                      type: "info",
                      text1: "Coming soon!",
                    });
                  }}
                  className="flex flex-row justify-center items-center gap-1"
                >
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
      <OTPModal
        isModalOpen={isRewardModalOpen}
        setIsModalOpen={setIsRewardModalOpen}
        isDarkMode={isDarkMode}
        requiredPoints={requiredPoints}
        currentOtpId={currentOtpId}
        toggleRefresh={toggleRefresh}
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

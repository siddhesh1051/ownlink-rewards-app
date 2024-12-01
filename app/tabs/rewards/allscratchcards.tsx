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
import { ArrowLeft } from "lucide-react-native";

import { Grid, GridItem } from "@/components/ui/grid";
import { Center } from "@/components/ui/center";
import { Icon } from "@/components/ui/icon";

import { useEffect, useRef, useState } from "react";
import ModalComponent from "@/components/ui/ModalComponent";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BACKEND_URL } from "@/utils/constants";
import { ScratchCard } from "@/models";
import ScratchCardOpened from "@/components/ScratchCardOpened";
import { useRouter } from "expo-router";
import { HStack } from "@/components/ui/hstack";
import { Spinner } from "@/components/ui/spinner";

export default function Rewards() {
  const scrollViewRef = useRef<ScrollView>(null);
  const [isRefreshing, setIsRefreshing] = useState(false); // State for pull-to-refresh
  const [rewardsLayout, setRewardsLayout] = useState({ y: 0 });
  const [isScratchCardsLoading, setIsScratchCardsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  const getUsersScratchCards = async () => {
    setIsScratchCardsLoading(true);
    try {
      const userId = await AsyncStorage.getItem("userId");
      const response = await axios.get(
        `${BACKEND_URL}/getscratchcardsbyuser/${userId}`
      );

      console.log("response", response.data);
      if (response && Array.isArray(response.data)) {
        setUserScratchCards(response.data);

        if (response.data.length === 0) {
          // No scratch cards available
          setReveleadScratchCards([]);
          setNotReveleadScratchCards([]);
        } else {
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
        }
      } else {
        console.log("Unexpected response:", response);
      }
    } catch (error) {
      console.error("Error getting scratchcards:", error);
    } finally {
      setIsScratchCardsLoading(false);
      setIsRefreshing(false); // Stop refresh indicator
    }
  };

  useEffect(() => {
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
    getUsersScratchCards();
  };

  return (
    <View style={styles(isDarkMode).view}>
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
          <View style={styles(isDarkMode).sectionParent}>
            {isScratchCardsLoading ? (
              <Spinner size="large" color={isDarkMode ? "white" : "black"} />
            ) : (
              <View className="flex gap-8">
                <View className="flex justify-center items-center relative w-full">
                  <TouchableOpacity
                    onPress={() => router.back()}
                    className="absolute left-0 p-2 active::bg-white rounded-full"
                  >
                    <Icon as={ArrowLeft} size="xl" />
                  </TouchableOpacity>
                  <Text className="text-gray-900 dark:text-gray-100 text-center text-xl font-bold">
                    Scratch & Win
                  </Text>
                </View>

                {reveleadScratchCards.length === 0 &&
                notreveleadScratchCards.length === 0 ? (
                  <Center>
                    <Text className="text-gray-900 dark:text-gray-100 text-center text-sm font-normal">
                      No scratch cards available
                    </Text>
                  </Center>
                ) : (
                  <Grid
                    className="gap-5"
                    _extra={{
                      className: "grid-cols-2",
                    }}
                  >
                    {notreveleadScratchCards.map((item, index) => (
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
                    {reveleadScratchCards.map((item, index) => (
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
                )}
              </View>
            )}
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
    view: {
      flex: 1,
      backgroundColor: isDarkMode ? "#1c1c1c" : "#f0f0f0",
    },
    parentContainer: {
      minHeight: "100%",
      paddingBottom: 70,
      paddingTop: 8,
      display: "flex",
      flexDirection: "column",
      gap: 12,
      flex: 1,
      backgroundColor: isDarkMode ? "#1c1c1c" : "#f0f0f0",
    },
    sectionParent: {
      padding: 16,
      paddingTop: 8,
    },
    cardParent: {
      paddingHorizontal: 16,
    },
  });

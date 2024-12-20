import { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  useColorScheme,
} from "react-native";
import Creatorcard from "@/components/CreatorCard";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Search } from "lucide-react-native";
import axios from "axios";
import { Spinner } from "@/components/ui/spinner";
import { BACKEND_URL } from "@/utils/constants";
import CreatorCardSkeleton from "@/components/skeletons/CreatorCardSkeleton";
import { ThemeContext } from "@/context/ThemeContext";

interface Creator {
  name: string;
  profilePic: string;
  username: string;
}

export default function Dashboard() {
  // const [searchResults, setSearchResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [isAllCreatorsLoading, setIsAllCreatorsLoading] = useState(false);
  const [allCreators, setAllCreators] = useState([]);
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === "dark";

  useEffect(() => {
    const getAllCreators = async () => {
      try {
        setIsAllCreatorsLoading(true);
        const creators = await axios.get(`${BACKEND_URL}/getvalidcreators`);

        setAllCreators(creators.data.users);
      } catch (er: any) {
        console.log("Error fetching creators", er);
      } finally {
        setIsAllCreatorsLoading(false);
      }
    };
    getAllCreators();
  }, []);

  return (
    <View style={styles(isDarkMode).parent} className="flex-1  pt-3 flex gap-2">
      <View
        style={styles(isDarkMode).rowWrapper}
        className="flex gap-2 relative justify-center items-center px-4"
      >
        <Input
          variant="outline"
          size="lg"
          isDisabled={false}
          isInvalid={false}
          isReadOnly={false}
          className="pl-4 w-full"
        >
          <InputSlot>
            <InputIcon as={Search}></InputIcon>
          </InputSlot>
          <InputField
            value={searchInput}
            onChangeText={(text) => setSearchInput(text)}
            type="text"
            placeholder="Search your favourite creator"
            className="pl-2"
          />
        </Input>
      </View>

      <ScrollView>
        <View style={styles(isDarkMode).section}>
          <Text style={styles(isDarkMode).sectionTitle}>Featured Creators</Text>
          <View style={styles(isDarkMode).rowWrapper}>
            {isAllCreatorsLoading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <CreatorCardSkeleton key={index} />
              ))
            ) : allCreators?.length !== 0 ? (
              allCreators
                .slice(0, 3)
                .map((creator: Creator, index) => (
                  <Creatorcard
                    key={index}
                    name={creator.name}
                    avatar={creator.profilePic}
                    username={creator.username}
                  />
                ))
            ) : (
              <View>
                <Text>No results found</Text>
              </View>
            )}
          </View>
        </View>
        <View style={styles(isDarkMode).section}>
          <Text style={styles(isDarkMode).sectionTitle}>Popular Creators</Text>
          <View style={styles(isDarkMode).rowWrapper}>
            {isAllCreatorsLoading ? (
              Array.from({ length: 8 }).map((_, index) => (
                <CreatorCardSkeleton key={index} />
              ))
            ) : allCreators?.length !== 0 ? (
              allCreators
                .slice(4, 13)
                .map((creator: Creator, index) => (
                  <Creatorcard
                    key={index}
                    name={creator.name}
                    avatar={creator.profilePic}
                    username={creator.username}
                  />
                ))
            ) : (
              <View>
                <Text>No results found</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = (isDarkMode: boolean) =>
  StyleSheet.create({
    parent: {
      flex: 1,
      backgroundColor: isDarkMode ? "#1e1e1e" : "#f6f6f6",
      paddingBottom: 70,
    },
    section: {
      paddingTop: 8,
      backgroundColor: isDarkMode ? "#1c1c1c" : "#fff",
    },
    sectionTitle: {
      marginVertical: 8,
      marginHorizontal: 24,
      fontSize: 14,
      fontWeight: "600",
      color: "#a7a7a7",
      textTransform: "uppercase",
      letterSpacing: 1.2,
    },

    rowWrapper: {
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: isDarkMode ? "#2f2f2f" : "#e3e3e3",
      backgroundColor: isDarkMode ? "#1c1c1c" : "#fff",
      paddingHorizontal: 16,
      padding: 8,
    },
    parentContainer: {
      display: "flex",
      flexDirection: "column",
      gap: 2,
    },
  });

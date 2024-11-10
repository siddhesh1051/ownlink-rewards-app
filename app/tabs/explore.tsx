import { useEffect, useState } from "react";
import {
  View,
  Text,
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
import { useSelector } from "react-redux";

interface Creator {
  name: string;
  profilePic: string;
  username: string;
}

export default function Home() {
  const [searchResults, setSearchResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [isAllCreatorsLoading, setIsAllCreatorsLoading] = useState(false);
  const [allCreators, setAllCreators] = useState([]);
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";
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
    <View
      style={{
        marginBottom: 70,
        backgroundColor: isDarkMode ? "#1c1c1c" : "#fff",
      }}
      className="flex-1  pt-3 flex gap-2"
    >
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
          <Text style={styles(isDarkMode).sectionTitle}>
            {searchInput === "" ? "All Creators" : "Results"}
          </Text>
          <View style={styles(isDarkMode).rowWrapper}>
            {isAllCreatorsLoading ? (
              <Spinner size="large" color={isDarkMode ? "white" : "black"} />
            ) : searchInput === "" ? (
              allCreators.map((creator: Creator, index) => (
                <Creatorcard
                  key={index}
                  name={creator.name}
                  avatar={creator.profilePic}
                  username={creator.username}
                />
              ))
            ) : allCreators.filter((creator: Creator) =>
                creator.name.toLowerCase().includes(searchInput.toLowerCase())
              ).length === 0 ? (
              <Text>No results found</Text>
            ) : (
              allCreators
                .filter((creator: Creator) =>
                  creator.name.toLowerCase().includes(searchInput.toLowerCase())
                )
                .map((creator: Creator, index) => (
                  <Creatorcard
                    key={index}
                    name={creator.name}
                    avatar={creator.profilePic}
                    username={creator.username}
                  />
                ))
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = (isDarkMode: boolean) =>
  StyleSheet.create({
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

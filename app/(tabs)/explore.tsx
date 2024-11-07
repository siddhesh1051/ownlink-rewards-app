import { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import Creatorcard from "@/components/CreatorCard";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Search } from "lucide-react-native";
import axios from "axios";
import { Spinner } from "@/components/ui/spinner";

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

  useEffect(() => {
    const getAllCreators = async () => {
      try {
        setIsAllCreatorsLoading(true);
        const creators = await axios.get(
          `https://2431-2409-40c2-25-2d6e-889d-62a2-ee57-c6c6.ngrok-free.app/api/getvalidcreators`
        );

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
      }}
      className="flex-1  pt-3 flex gap-2"
    >
      <View
        style={styles.rowWrapper}
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
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {searchInput === "" ? "All Creators" : "Results"}
          </Text>
          <View style={styles.rowWrapper}>
            {isAllCreatorsLoading ? (
              <Spinner size="large" color={"black"} />
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

const styles = StyleSheet.create({
  section: {
    paddingTop: 8,
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
    borderColor: "#e3e3e3",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    padding: 8,
  },
  parentContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
});

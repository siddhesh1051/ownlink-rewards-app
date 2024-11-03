import { useEffect, useState } from "react";
import { View, Text, TextInput, ScrollView, StyleSheet } from "react-native";
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

export default function Dashboard() {
  // const [searchResults, setSearchResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [isAllCreatorsLoading, setIsAllCreatorsLoading] = useState(false);
  const [allCreators, setAllCreators] = useState([]);

  useEffect(() => {
    const getAllCreators = async () => {
      try {
        setIsAllCreatorsLoading(true);
        const creators = await axios.get(
          "https://eaa0-2409-40c2-600b-c9a9-5dba-f215-4047-1704.ngrok-free.app/api/getvalidcreators"
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
          <Text style={styles.sectionTitle}>Featured Creators</Text>
          <View style={styles.rowWrapper}>
            {isAllCreatorsLoading ? (
              <Spinner size="large" color={"black"} />
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
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Creators</Text>
          <View style={styles.rowWrapper}>
            {isAllCreatorsLoading ? (
              <Spinner size="large" color={"black"} />
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

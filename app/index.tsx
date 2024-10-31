import { useEffect, useState } from "react";
import { View, Text, TextInput, ScrollView, StyleSheet } from "react-native";
import Creatorcard from "@/components/CreatorCard";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Search } from "lucide-react-native";

interface Creator {
  name: string;
  avatar: string;
  username: string;
}

export default function Dashboard() {
  const [searchResults, setSearchResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const feauturedCreators = [
    {
      name: "Featured 1",
      avatar: "https://link.to/avatar1",
      username: "creator1",
    },
    {
      name: "Feautured 2",
      avatar: "https://link.to/avatar2",
      username: "creator2",
    },
    {
      name: "Feautured 2",
      avatar: "https://link.to/avatar2",
      username: "creator3",
    },
    // More dummy data
  ];
  const popularCreators = [
    {
      name: "Popular 1",
      avatar: "https://link.to/avatar1",
      username: "pcreator1",
    },
    {
      name: "Popular 2",
      avatar: "https://link.to/avatar2",
      username: "pcreator2",
    },
    {
      name: "Popular 2",
      avatar: "https://link.to/avatar2",
      username: "pcreator3",
    },
    {
      name: "Popular 4",
      avatar: "https://link.to/avatar2",
      username: "pcreator4",
    },
    {
      name: "Popular 5",
      avatar: "https://link.to/avatar2",
      username: "pcreator5",
    },
    {
      name: "Popular 2",
      avatar: "https://link.to/avatar2",
      username: "pcreator3",
    },
    {
      name: "Popular 4",
      avatar: "https://link.to/avatar2",
      username: "pcreator4",
    },
    {
      name: "Popular 5",
      avatar: "https://link.to/avatar2",
      username: "pcreator5",
    },
    // More dummy data
  ];

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
            {feauturedCreators?.length !== 0 ? (
              feauturedCreators.map((creator: Creator, index) => (
                <Creatorcard
                  key={index}
                  name={creator.name}
                  avatar={creator.avatar}
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
            {popularCreators?.length !== 0 ? (
              popularCreators.map((creator: Creator, index) => (
                <Creatorcard
                  key={index}
                  name={creator.name}
                  avatar={creator.avatar}
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

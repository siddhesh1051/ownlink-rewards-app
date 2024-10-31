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

export default function Home() {
  const [searchResults, setSearchResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const creatorsData = [
    {
      name: "Siddhesh",
      avatar: "https://link.to/avatar1",
      username: "creator1",
    },
    {
      name: "Pranav",
      avatar: "https://link.to/avatar2",
      username: "creator2",
    },
    {
      name: "Siddhesh",
      avatar: "https://link.to/avatar1",
      username: "creator1",
    },
    {
      name: "Pranav",
      avatar: "https://link.to/avatar2",
      username: "creator2",
    },
    {
      name: "Siddhesh",
      avatar: "https://link.to/avatar1",
      username: "creator1",
    },
    {
      name: "Pranav",
      avatar: "https://link.to/avatar2",
      username: "creator2",
    },
    {
      name: "Siddhesh",
      avatar: "https://link.to/avatar1",
      username: "creator1",
    },
    {
      name: "Pranav",
      avatar: "https://link.to/avatar2",
      username: "creator2",
    },
    {
      name: "Siddhesh",
      avatar: "https://link.to/avatar1",
      username: "creator1",
    },
    {
      name: "Pranav",
      avatar: "https://link.to/avatar2",
      username: "creator2",
    },
    {
      name: "Siddhesh",
      avatar: "https://link.to/avatar1",
      username: "creator1",
    },
    {
      name: "Pranav",
      avatar: "https://link.to/avatar2",
      username: "creator2",
    },
    {
      name: "Siddhesh",
      avatar: "https://link.to/avatar1",
      username: "creator1",
    },
    {
      name: "Pranav",
      avatar: "https://link.to/avatar2",
      username: "creator2",
    },
    {
      name: "Siddhesh",
      avatar: "https://link.to/avatar1",
      username: "creator1",
    },
    {
      name: "Pranav",
      avatar: "https://link.to/avatar2",
      username: "creator2",
    },
    {
      name: "Siddhesh",
      avatar: "https://link.to/avatar1",
      username: "creator1",
    },
    {
      name: "Pranav",
      avatar: "https://link.to/avatar2",
      username: "creator2",
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
          <Text style={styles.sectionTitle}>
            {searchInput === "" ? "All Creators" : "Results"}
          </Text>
          <View style={styles.rowWrapper}>
            {searchInput === "" ? (
              creatorsData.map((creator: Creator, index) => (
                <Creatorcard
                  key={index}
                  name={creator.name}
                  avatar={creator.avatar}
                  username={creator.username}
                />
              ))
            ) : creatorsData.filter((creator: Creator) =>
                creator.name.toLowerCase().includes(searchInput.toLowerCase())
              ).length === 0 ? (
              <Text>No results found</Text>
            ) : (
              creatorsData
                .filter((creator: Creator) =>
                  creator.name.toLowerCase().includes(searchInput.toLowerCase())
                )
                .map((creator: Creator, index) => (
                  <Creatorcard
                    key={index}
                    name={creator.name}
                    avatar={creator.avatar}
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

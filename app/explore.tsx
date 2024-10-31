import { useEffect, useState } from "react";
import { View, Text, TextInput, ScrollView } from "react-native";
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

  const creatorsData = {
    data: {
      creators: [
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
      ],
    },
  };

  useEffect(() => {
    const results: Creator[] | any = creatorsData?.data?.creators?.filter(
      (creator) =>
        creator.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    setSearchResults(results);
  }, [searchInput]);

  return (
    <View style={{ flex: 1, paddingHorizontal: 16, paddingTop: 12 }}>
      <View className="flex gap-2 relative justify-center items-center ">
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
          />
        </Input>
      </View>

      {searchResults?.length ? (
        <ScrollView style={{ marginTop: 16 }}>
          {searchResults.map((creator: Creator, index) => (
            <Creatorcard
              key={index}
              name={creator.name}
              avatar={creator.avatar}
              username={creator.username}
            />
          ))}
        </ScrollView>
      ) : (
        <View style={{ alignItems: "center", marginTop: 40 }}>
          <Text style={{ fontSize: 18, fontWeight: "600", color: "#7a7a7a" }}>
            No results found
          </Text>
        </View>
      )}
    </View>
  );
}

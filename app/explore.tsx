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
        marginBottom: 75,
      }}
      className="flex-1 px-4 pt-3 flex gap-4"
    >
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
            className="pl-2"
          />
        </Input>
      </View>

      <ScrollView>
        {creatorsData.map((creator: Creator, index) => (
          <Creatorcard
            key={index}
            name={creator.name}
            avatar={creator.avatar}
            username={creator.username}
          />
        ))}
      </ScrollView>
    </View>
  );
}

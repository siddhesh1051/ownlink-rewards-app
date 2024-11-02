// components/CreatorCard.tsx
import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { CheckIcon, CopyIcon, ChevronRight } from "lucide-react-native";
import Toast from "react-native-toast-message";
import { Avatar, AvatarFallbackText, AvatarImage } from "./ui/avatar";
import { Tooltip, TooltipContent, TooltipText } from "./ui/tooltip";
import { Icon } from "./ui/icon";
import { useRouter } from "expo-router";
import * as Clipboard from "expo-clipboard";

interface CreatorCardProps {
  name: string;
  avatar: string;
  username: string;
}

export default function CreatorCard({
  name,
  avatar,
  username,
}: CreatorCardProps) {
  const [isCopying, setIsCopying] = useState(false);
  const router = useRouter();

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(`https://ownlink.vercel.app/${username}`);
  };

  const copyOwnlink = async () => {
    setIsCopying(true);
    await copyToClipboard();
    Toast.show({ type: "success", text1: "Ownlink copied to clipboard" });
    setTimeout(() => setIsCopying(false), 1500);
  };

  const handleNavigateToProfile = () => {
    router.push({
      pathname: `${username}`,
      params: { name, avatar },
    });
  };

  return (
    <View className="flex flex-row justify-between items-center p-2 rounded-lg">
      <TouchableOpacity
        onPress={handleNavigateToProfile}
        className="flex flex-row justify-center items-center gap-4"
      >
        <Avatar size="md">
          <AvatarFallbackText>{name}</AvatarFallbackText>
          <AvatarImage
            source={{
              uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
            }}
          />
        </Avatar>
        <Text className="font-medium text-lg">{name}</Text>
      </TouchableOpacity>

      <View className="flex flex-row items-center">
        <Tooltip
          placement="top"
          trigger={(triggerProps) => (
            <TouchableOpacity onPress={copyOwnlink} style={{ padding: 8 }}>
              {isCopying ? (
                <Icon as={CheckIcon} size="md" color="green" />
              ) : (
                <Icon as={CopyIcon} size="md" />
              )}
            </TouchableOpacity>
          )}
        >
          <TooltipContent>
            <TooltipText>Copy Ownlink</TooltipText>
          </TooltipContent>
        </Tooltip>
        <Tooltip
          placement="top"
          trigger={(triggerProps) => (
            <TouchableOpacity
              onPress={handleNavigateToProfile}
              style={{ padding: 8 }}
            >
              <Icon as={ChevronRight} size="md" />
            </TouchableOpacity>
          )}
        >
          <TooltipContent>
            <TooltipText>View Details</TooltipText>
          </TooltipContent>
        </Tooltip>
      </View>
    </View>
  );
}

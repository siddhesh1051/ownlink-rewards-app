import { useState } from "react";
import { View, Text, Image, TouchableOpacity, Linking } from "react-native";
import { CheckIcon, CopyIcon, ChevronRight } from "lucide-react-native";
import Toast from "react-native-toast-message";
import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage,
} from "./ui/avatar";
import { Tooltip, TooltipContent, TooltipText } from "./ui/tooltip";
import { Button, ButtonText } from "./ui/button";
import { Icon } from "./ui/icon";

export default function Creatorcard({
  name,
  avatar,
  username,
}: {
  name: string;
  avatar: string;
  username: string;
}) {
  const [isCopying, setIsCopying] = useState(false);

  const copyOwnlink = () => {
    setIsCopying(true);
    // Copy URL logic
    Toast.show({ type: "success", text1: "Ownlink copied to clipboard" });
    setTimeout(() => setIsCopying(false), 1500);
  };

  return (
    <View className="flex flex-row justify-between items-center p-2 rounded-lg">
      <View className="flex flex-row justify-center items-center gap-4 ">
        <Avatar size="md">
          <AvatarFallbackText>Jane Doe</AvatarFallbackText>
          <AvatarImage
            source={{
              uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
            }}
          />
        </Avatar>
        <Text className="font-medium text-lg">{name}</Text>
      </View>

      <View className="flex flex-row items-center">
        <Tooltip
          placement="top"
          trigger={(triggerProps) => {
            return (
              <TouchableOpacity onPress={copyOwnlink} style={{ padding: 8 }}>
                {isCopying ? (
                  <Icon as={CheckIcon} size="md" color="green" />
                ) : (
                  <Icon as={CopyIcon} size="md" />
                )}
              </TouchableOpacity>
            );
          }}
        >
          <TooltipContent>
            <TooltipText>Copy Ownlink</TooltipText>
          </TooltipContent>
        </Tooltip>
        <Tooltip
          placement="top"
          trigger={(triggerProps) => {
            return (
              <TouchableOpacity onPress={() => {}} style={{ padding: 8 }}>
                <Icon as={ChevronRight} size="md" />
              </TouchableOpacity>
            );
          }}
        >
          <TooltipContent>
            <TooltipText>View Details</TooltipText>
          </TooltipContent>
        </Tooltip>
      </View>
    </View>
  );
}

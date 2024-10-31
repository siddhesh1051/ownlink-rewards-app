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

export default function Creatorcard({ name, avatar, username }) {
  const [isCopying, setIsCopying] = useState(false);

  const copyOwnlink = () => {
    setIsCopying(true);
    // Copy URL logic
    Toast.show({ type: "success", text1: "Ownlink copied to clipboard" });
    setTimeout(() => setIsCopying(false), 1500);
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 8,
        borderRadius: 8,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Avatar size="md">
          <AvatarFallbackText>Jane Doe</AvatarFallbackText>
          <AvatarImage
            source={{
              uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
            }}
          />
          <AvatarBadge />
        </Avatar>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Tooltip
          placement="top"
          trigger={(triggerProps) => {
            return (
              <TouchableOpacity onPress={copyOwnlink} style={{ padding: 8 }}>
                {isCopying ? (
                  <CheckIcon size={22} color="green" />
                ) : (
                  <CopyIcon size={22} />
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
              <TouchableOpacity onPress={copyOwnlink} style={{ padding: 8 }}>
                {isCopying ? (
                  <CheckIcon size={22} color="green" />
                ) : (
                  <CopyIcon size={22} />
                )}
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

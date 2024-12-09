import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useColorScheme,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import WebView from "react-native-webview";
import React, { useContext, useState } from "react";
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
} from "@/components/ui/modal";
import { CloseIcon, Icon } from "@/components/ui/icon";
import { Button, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import Toast from "react-native-toast-message";
import * as Clipboard from "expo-clipboard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeContext } from "@/context/ThemeContext";

export default function CreatorProfile() {
  const { username, name, avatar } = useLocalSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [webViewHeight, setWebViewHeight] = useState(900); // Initial min height
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === "dark";

  const handleWebViewMessage = (event: any) => {
    const { data } = event.nativeEvent;
    setWebViewHeight(Number(data)); // Update WebView height based on content
  };

  const copyToClipboard = async () => {
    const reffererId = await AsyncStorage.getItem("userId");
    await Clipboard.setStringAsync(
      `https://ownlink.live/${username}?ref_id=${reffererId}`
    );
  };

  const handleCopyOwnlink = async () => {
    await copyToClipboard();
    Toast.show({
      type: "success",
      text1: "Link Copied!",
      text2: "Your Ownlink has been copied to clipboard.",
    });
  };

  const WebViewModal = () => {
    return (
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        size="full"
      >
        <ModalBackdrop
          animate={{
            opacity: 0.8,
          }}
        />
        <ModalContent
          style={{
            backgroundColor: "transparent",
            borderWidth: 0,
            flex: 0.9, // Make the modal content take the full height
          }}
        >
          <ModalHeader
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <ModalCloseButton
              onPress={() => {
                setIsModalOpen(false);
              }}
            >
              <Icon
                as={CloseIcon}
                size="xl"
                className={`${
                  !isDarkMode
                    ? "stroke-background-50 group-hover:stroke-background-700 group-active:stroke-background-900 group-focus-visible:stroke-background-900"
                    : ""
                }`}
              />
            </ModalCloseButton>
          </ModalHeader>

          <ModalBody style={styles(isDarkMode).modalBody}>
            <View style={{ flex: 1 }}>
              <WebView
                source={{ uri: `https://ownlink.live/${username}` }}
                style={[styles(isDarkMode).webview, { height: webViewHeight }]}
                injectedJavaScript="
                  setTimeout(() => {
                    window.ReactNativeWebView.postMessage(
                      document.documentElement.scrollHeight
                    );
                  }, 1000);
                "
                onMessage={handleWebViewMessage}
              />
            </View>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  };

  return (
    <ScrollView style={styles(isDarkMode).container}>
      <View style={styles(isDarkMode).header}>
        <Avatar size="xl">
          <AvatarFallbackText>{name as string}</AvatarFallbackText>
          <AvatarImage source={{ uri: avatar as string }} />
        </Avatar>
        <Text style={styles(isDarkMode).name}>{name}</Text>
        <Text style={styles(isDarkMode).username}>@{username}</Text>
      </View>

      <View style={styles(isDarkMode).statsContainer}>
        <HStack space="md">
          <Button
            size="lg"
            variant="outline"
            action="primary"
            className="mt-4"
            onPress={() => handleCopyOwnlink()}
          >
            <ButtonText>Copy Ownlink</ButtonText>
          </Button>
          <Button
            size="lg"
            variant="solid"
            action="primary"
            className="mt-4"
            onPress={() => setIsModalOpen(true)}
          >
            <ButtonText>View Ownlink</ButtonText>
          </Button>
        </HStack>
        <WebViewModal />
      </View>
    </ScrollView>
  );
}

const styles = (isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? "#1c1c1c" : "#fff",
    },
    header: {
      alignItems: "center",
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: isDarkMode ? "#333" : "#e3e3e3",
    },
    name: {
      fontSize: 24,
      fontWeight: "bold",
      color: isDarkMode ? "#fff" : "#000",
      marginTop: 12,
    },
    username: {
      fontSize: 16,
      color: isDarkMode ? "#ccc" : "#666",
      marginTop: 4,
    },
    statsContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      paddingVertical: 20,
    },
    statItem: {
      alignItems: "center",
    },
    statNumber: {
      fontSize: 20,
      fontWeight: "bold",
      color: isDarkMode ? "#fff" : "#000",
    },
    statLabel: {
      fontSize: 14,
      color: isDarkMode ? "#ccc" : "#666",
      marginTop: 4,
    },
    contentSection: {
      padding: 20,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: isDarkMode ? "#fff" : "#000",
      marginBottom: 12,
    },
    bio: {
      fontSize: 16,
      color: isDarkMode ? "#bbb" : "#444",
      lineHeight: 24,
    },
    modalBody: {
      flex: 1,
      paddingVertical: 0,
    },
    webview: {
      width: "100%",
      backgroundColor: isDarkMode ? "#1c1c1c" : "#4c4c4c",
    },
  });

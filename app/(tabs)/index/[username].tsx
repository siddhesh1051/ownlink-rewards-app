import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import WebView from "react-native-webview";
import React, { useState } from "react";
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

export default function CreatorProfile() {
  const { username, name, avatar } = useLocalSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [webViewHeight, setWebViewHeight] = useState(900); // Initial min height

  const handleWebViewMessage = (event: any) => {
    const { data } = event.nativeEvent;
    setWebViewHeight(Number(data)); // Update WebView height based on content
  };

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(`https://ownlink.vercel.app/sid`);
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
            flex: 1, // Make the modal content take the full height
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
                size="md"
                className="stroke-background-50 group-hover:stroke-background-700 group-active:stroke-background-900 group-focus-visible:stroke-background-900"
              />
            </ModalCloseButton>
          </ModalHeader>

          <ModalBody style={styles.modalBody}>
            <View style={{ flex: 1 }}>
              <WebView
                source={{ uri: "https://ownlink.vercel.app/sid" }}
                style={[styles.webview, { height: webViewHeight }]}
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
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Avatar size="xl">
          <AvatarFallbackText>{name as string}</AvatarFallbackText>
          <AvatarImage source={{ uri: avatar as string }} />
        </Avatar>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.username}>@{username}</Text>
      </View>

      <View style={styles.statsContainer}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e3e3e3",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 12,
  },
  username: {
    fontSize: 16,
    color: "#666",
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
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  contentSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  bio: {
    fontSize: 16,
    color: "#444",
    lineHeight: 24,
  },

  modalBody: {
    flex: 1,
    paddingVertical: 0,
  },
  webview: {
    width: "100%",
    backgroundColor: "#4c4c4c",
  },
});

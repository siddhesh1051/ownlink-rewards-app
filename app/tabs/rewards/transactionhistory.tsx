import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Icon } from "@/components/ui/icon";
import { ArrowLeft } from "lucide-react-native";
import { useRouter } from "expo-router";

interface Transaction {
  id: string;
  points: number;
  transactionType: "credit" | "debit";
  date: string;
}

const TransactionHistory = () => {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  // Dummy transaction data
  const transactions: Transaction[] = [
    { id: "1", points: 50, transactionType: "credit", date: "2024-11-29" },
    { id: "2", points: 30, transactionType: "debit", date: "2024-11-28" },
    { id: "3", points: 100, transactionType: "credit", date: "2024-11-27" },
    { id: "4", points: 20, transactionType: "debit", date: "2024-11-26" },
  ];

  const renderTransaction = ({ item }: { item: Transaction }) => (
    <View style={styles(isDarkMode).transactionItem}>
      {/* Left Side: Icon */}
      <View
        style={[
          styles(isDarkMode).iconContainer,
          item.transactionType === "credit"
            ? styles(isDarkMode).greenBackground
            : styles(isDarkMode).redBackground,
        ]}
      >
        <Feather
          name={
            item.transactionType === "credit"
              ? "arrow-up-right"
              : "arrow-down-left"
          }
          size={24}
          color="#fff"
        />
      </View>

      {/* Middle: Transaction Details */}
      <View style={styles(isDarkMode).transactionDetails}>
        <Text style={styles(isDarkMode).pointsText}>
          {item.transactionType === "credit" ? "+ " : "- "}
          {item.points} Points
        </Text>
        <Text style={styles(isDarkMode).typeText}>
          {item.transactionType === "credit" ? "Credited" : "Debited"}
        </Text>
      </View>

      {/* Right Side: Date */}
      <View style={styles(isDarkMode).dateContainer}>
        <Text style={styles(isDarkMode).dateText}>{item.date}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles(isDarkMode).container}>
      <View className="flex justify-center items-center relative w-full mb-4">
        <TouchableOpacity
          onPress={() => router.back()}
          className="absolute left-0 p-2 active::bg-white rounded-full"
        >
          <Icon as={ArrowLeft} size="xl" />
        </TouchableOpacity>
        <Text className="text-gray-900 dark:text-gray-100 text-center text-xl font-bold">
          Transaction History
        </Text>
      </View>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={renderTransaction}
      />
    </View>
  );
};

const styles = (isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? "#1c1c1c" : "#f0f0f0", // Dark background for dark mode
      padding: 16,
    },
    header: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 16,
      textAlign: "center",
      color: isDarkMode ? "#fff" : "#000", // Text color adjustment
    },
    transactionItem: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: isDarkMode ? "#2a2a2a" : "#fff", // Dark background for items in dark mode
      padding: 12,
      borderRadius: 8,
      marginBottom: 10,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    iconContainer: {
      width: 40,
      height: 40,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 8,
    },
    greenBackground: {
      backgroundColor: "green",
    },
    redBackground: {
      backgroundColor: "red",
    },
    transactionDetails: {
      marginLeft: 12,
      flex: 1,
    },
    dateContainer: {
      justifyContent: "center",
      alignItems: "flex-end",
    },
    pointsText: {
      fontSize: 18,
      fontWeight: "600",
      color: isDarkMode ? "#fff" : "#000", // Points text color adjustment
    },
    typeText: {
      fontSize: 14,
      color: isDarkMode ? "#ccc" : "#666", // Text color for type
    },
    dateText: {
      fontSize: 14,
      color: isDarkMode ? "#888" : "#aaa", // Date text color adjustment
    },
  });

export default TransactionHistory;

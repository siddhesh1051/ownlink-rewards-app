import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  useColorScheme,
  ActivityIndicator,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Icon } from "@/components/ui/icon";
import { ArrowLeft } from "lucide-react-native";
import { useRouter } from "expo-router";
import axios from "axios"; // Import axios for making the API request
import { Spinner } from "@/components/ui/spinner";
import { BACKEND_URL } from "@/utils/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeContext } from "@/context/ThemeContext";

interface Transaction {
  _id: string;
  points: number;
  transactionType: "credit" | "debit";
  date: string;
}

const TransactionHistory = () => {
  const router = useRouter();
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === "dark";

  // State to hold transactions data, loading state, and any errors
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  console.log(
    "TransactionHistory.tsx: Fetching transactions...",
    transactions[0]
  );

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        if (!userId) {
          console.log("No userId found in AsyncStorage.");
          return;
        }

        // Send userId as a URL parameter
        const response = await axios.get(
          `${BACKEND_URL}/gettransactionsforuser?userId=${userId}`
        );

        setTransactions(response.data.transactions); // Set the transactions data
        setLoading(false); // Set loading to false after data is fetched
      } catch (err) {
        setError("Failed to fetch transactions. Please try again later.");
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

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

  // Loading and error handling UI
  if (loading) {
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
        <ActivityIndicator size="large" color={isDarkMode ? "#fff" : "#000"} />
      </View>
    );
  }

  if (error) {
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
        <Text style={{ color: isDarkMode ? "#fff" : "#000", marginTop: 20 }}>
          {error}
        </Text>
      </View>
    );
  }

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
        keyExtractor={(item) => item._id}
        renderItem={renderTransaction}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
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
      paddingBottom: 70,
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

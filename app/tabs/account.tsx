import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  useColorScheme,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Switch } from "@/components/ui/switch";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Edit } from "lucide-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "@/context/slices/themeSlice";
import { RootState } from "@/context/store";
import Toast from "react-native-toast-message";
import { router } from "expo-router";

export default function Account() {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.theme);

  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  const switchProps = {
    trackColor: { false: "#9ca3af", true: "#374151" },
    thumbColor: "#f9fafb",
  };
  const [form, setForm] = useState({
    darkMode: false,
    emailNotifications: true,
    pushNotifications: false,
  });

  const handleLogout = async () => {
    try {
      // Clear storage
      await AsyncStorage.clear();
      // Navigate to login screen
      router.push("/");
    } catch (error) {
      console.log("Error clearing storage", error);
    }
  };

  const toggleThemeFunction = () => {
    dispatch(toggleTheme());

    Toast.show({
      type: "success",
      text1: "Theme Changed",
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#f6f6f6", marginBottom: 70 }}>
      <View style={styles(isDarkMode).container}>
        <ScrollView>
          <View style={styles(isDarkMode).profile}>
            <Image
              alt=""
              source={{
                uri: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80",
              }}
              style={styles(isDarkMode).profileAvatar}
            />

            <Text style={styles(isDarkMode).profileName}>John Doe</Text>

            <Text style={styles(isDarkMode).profileEmail}>
              john.doe@mail.com
            </Text>

            <Button className="mt-4">
              <ButtonText>Edit Profile</ButtonText>
              <ButtonIcon as={Edit} />
            </Button>
          </View>

          <View style={styles(isDarkMode).section}>
            <Text style={styles(isDarkMode).sectionTitle}>Preferences</Text>

            <View style={styles(isDarkMode).sectionBody}>
              <View
                style={[
                  styles(isDarkMode).rowWrapper,
                  styles(isDarkMode).rowFirst,
                ]}
              >
                <TouchableOpacity
                  onPress={() => {
                    // handle onPress
                  }}
                  style={styles(isDarkMode).row}
                >
                  <View
                    style={[
                      styles(isDarkMode).rowIcon,
                      { backgroundColor: "#fe9400" },
                    ]}
                  >
                    <Feather color="#fff" name="globe" size={20} />
                  </View>

                  <Text style={styles(isDarkMode).rowLabel}>Language</Text>

                  <View style={styles(isDarkMode).rowSpacer} />

                  <Text style={styles(isDarkMode).rowValue}>English</Text>

                  <Feather color="#C6C6C6" name="chevron-right" size={20} />
                </TouchableOpacity>
              </View>

              <View style={styles(isDarkMode).rowWrapper}>
                <View style={styles(isDarkMode).row}>
                  <View
                    style={[
                      styles(isDarkMode).rowIcon,
                      { backgroundColor: "#007AFF" },
                    ]}
                  >
                    <Feather color="#fff" name="moon" size={20} />
                  </View>

                  <Text style={styles(isDarkMode).rowLabel}>Dark Mode</Text>

                  <View style={styles(isDarkMode).rowSpacer} />

                  <Switch
                    {...switchProps}
                    onValueChange={toggleThemeFunction}
                    value={theme === "dark" ? true : false}
                  />
                </View>
              </View>

              <View style={styles(isDarkMode).rowWrapper}>
                <TouchableOpacity
                  onPress={() => {
                    // handle onPress
                  }}
                  style={styles(isDarkMode).row}
                >
                  <View
                    style={[
                      styles(isDarkMode).rowIcon,
                      { backgroundColor: "#32c759" },
                    ]}
                  >
                    <Feather color="#fff" name="navigation" size={20} />
                  </View>

                  <Text style={styles(isDarkMode).rowLabel}>Location</Text>

                  <View style={styles(isDarkMode).rowSpacer} />

                  <Text style={styles(isDarkMode).rowValue}>
                    Los Angeles, CA
                  </Text>

                  <Feather color="#C6C6C6" name="chevron-right" size={20} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles(isDarkMode).section}>
              <Text style={styles(isDarkMode).sectionTitle}>Notifications</Text>

              <View style={styles(isDarkMode).sectionBody}>
                <View
                  style={[
                    styles(isDarkMode).rowWrapper,
                    styles(isDarkMode).rowFirst,
                  ]}
                >
                  <View style={styles(isDarkMode).row}>
                    <View
                      style={[
                        styles(isDarkMode).rowIcon,
                        { backgroundColor: "#38C959" },
                      ]}
                    >
                      <Feather color="#fff" name="at-sign" size={20} />
                    </View>

                    <Text style={styles(isDarkMode).rowLabel}>
                      Email Notifications
                    </Text>

                    <View style={styles(isDarkMode).rowSpacer} />

                    <Switch
                      {...switchProps}
                      onValueChange={(emailNotifications) =>
                        setForm({ ...form, emailNotifications })
                      }
                      value={form.emailNotifications}
                    />
                  </View>
                </View>

                <View style={styles(isDarkMode).rowWrapper}>
                  <View style={styles(isDarkMode).row}>
                    <View
                      style={[
                        styles(isDarkMode).rowIcon,
                        { backgroundColor: "#38C959" },
                      ]}
                    >
                      <Feather color="#fff" name="bell" size={20} />
                    </View>

                    <Text style={styles(isDarkMode).rowLabel}>
                      Push Notifications
                    </Text>

                    <View style={styles(isDarkMode).rowSpacer} />

                    <Switch
                      {...switchProps}
                      onValueChange={(pushNotifications) =>
                        setForm({ ...form, pushNotifications })
                      }
                      value={form.pushNotifications}
                    />
                  </View>
                </View>

                <View style={styles(isDarkMode).rowWrapper}>
                  <TouchableOpacity
                    onPress={() => {
                      // handle onPress
                    }}
                    style={styles(isDarkMode).row}
                  >
                    <View
                      style={[
                        styles(isDarkMode).rowIcon,
                        { backgroundColor: "#FE3C30" },
                      ]}
                    >
                      <Feather color="#fff" name="music" size={20} />
                    </View>

                    <Text style={styles(isDarkMode).rowLabel}>Sound</Text>

                    <View style={styles(isDarkMode).rowSpacer} />

                    <Text style={styles(isDarkMode).rowValue}>Default</Text>

                    <Feather color="#C6C6C6" name="chevron-right" size={20} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          {/* Logout Button */}
          <TouchableOpacity
            onPress={handleLogout}
            style={styles(isDarkMode).logoutButton}
          >
            <Text style={styles(isDarkMode).logoutButtonText}>Logout</Text>
          </TouchableOpacity>

          <Text style={styles(isDarkMode).contentFooter}>
            {"\u00A9"} Ownlink
          </Text>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = (isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      paddingTop: 24,
      paddingBottom: 8,
      paddingHorizontal: 0,
      flexGrow: 1,
      flexShrink: 1,
      flexBasis: 0,
      backgroundColor: isDarkMode ? "#1e1e1e" : "#f6f6f6",
    },
    contentFooter: {
      marginTop: 24,
      fontSize: 13,
      fontWeight: "500",
      color: isDarkMode ? "#c5c5c5" : "#929292",
      textAlign: "center",
    },
    header: {
      paddingHorizontal: 24,
      marginBottom: 12,
    },
    headerTitle: {
      fontSize: 32,
      fontWeight: "700",
      color: isDarkMode ? "#ffffff" : "#1d1d1d",
    },
    headerSubtitle: {
      fontSize: 15,
      fontWeight: "500",
      color: isDarkMode ? "#b0b0b0" : "#929292",
      marginTop: 6,
    },
    profile: {
      padding: 16,
      flexDirection: "column",
      alignItems: "center",
      backgroundColor: isDarkMode ? "#2a2a2a" : "#fff",
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: isDarkMode ? "#3c3c3c" : "#e3e3e3",
    },
    profileAvatar: {
      width: 60,
      height: 60,
      borderRadius: 9999,
    },
    profileName: {
      marginTop: 12,
      fontSize: 20,
      fontWeight: "600",
      color: isDarkMode ? "#f5f5f5" : "#090909",
    },
    profileEmail: {
      marginTop: 6,
      fontSize: 16,
      fontWeight: "400",
      color: isDarkMode ? "#c0c0c0" : "#848484",
    },
    profileAction: {
      marginTop: 12,
      paddingVertical: 10,
      paddingHorizontal: 16,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: isDarkMode ? "#007bff" : "#007bff",
      borderRadius: 12,
    },
    profileActionText: {
      marginRight: 8,
      fontSize: 15,
      fontWeight: "600",
      color: isDarkMode ? "#fff" : "#fff",
    },
    section: {
      paddingTop: 12,
    },
    sectionTitle: {
      marginVertical: 8,
      marginHorizontal: 24,
      fontSize: 14,
      fontWeight: "600",
      color: isDarkMode ? "#a7a7a7" : "#a7a7a7",
      textTransform: "uppercase",
      letterSpacing: 1.2,
    },
    sectionBody: {
      paddingLeft: 24,
      backgroundColor: isDarkMode ? "#2a2a2a" : "#fff",
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: isDarkMode ? "#3c3c3c" : "#e3e3e3",
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      paddingRight: 16,
      height: 50,
    },
    rowWrapper: {
      borderTopWidth: 1,
      borderColor: isDarkMode ? "#3c3c3c" : "#e3e3e3",
    },
    rowFirst: {
      borderTopWidth: 0,
    },
    rowIcon: {
      width: 30,
      height: 30,
      borderRadius: 4,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 12,
    },
    rowLabel: {
      fontSize: 17,
      fontWeight: "500",
      color: isDarkMode ? "#f0f0f0" : "#000",
    },
    rowSpacer: {
      flexGrow: 1,
      flexShrink: 1,
      flexBasis: 0,
    },
    rowValue: {
      fontSize: 17,
      fontWeight: "500",
      color: isDarkMode ? "#b3b3b3" : "#8B8B8B",
      marginRight: 4,
    },
    logoutButton: {
      marginHorizontal: 24,
      marginVertical: 20,
      paddingVertical: 12,
      backgroundColor: isDarkMode ? "#fff" : "#000",
      borderRadius: 8,
      alignItems: "center",
    },
    logoutButtonText: {
      color: isDarkMode ? "black" : "#fff",
      fontSize: 16,
      fontWeight: "600",
    },
  });

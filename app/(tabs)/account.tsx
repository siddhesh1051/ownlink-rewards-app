import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Switch } from "@/components/ui/switch";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Edit } from "lucide-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "@/context/slices/themeSlice";
import { RootState } from "@/context/store";
import Toast from "react-native-toast-message";

export default function Account() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.theme);

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
      navigation.reset({
        index: 0,
        routes: [{ name: "index" as never }],
      });
    } catch (error) {
      console.log("Error clearing storage", error);
    }
  };

  const toggleThemeFunction = () => {
    dispatch(toggleTheme());
    setTimeout(() => {
      Toast.show({
        type: "success",
        text1: "Theme Changed",
      });
    }, 5000);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#f6f6f6", marginBottom: 70 }}>
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.profile}>
            <Image
              alt=""
              source={{
                uri: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80",
              }}
              style={styles.profileAvatar}
            />

            <Text style={styles.profileName}>John Doe</Text>

            <Text style={styles.profileEmail}>john.doe@mail.com</Text>

            <Button className="mt-4">
              <ButtonText>Edit Profile</ButtonText>
              <ButtonIcon as={Edit} />
            </Button>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Preferences</Text>

            <View style={styles.sectionBody}>
              <View style={[styles.rowWrapper, styles.rowFirst]}>
                <TouchableOpacity
                  onPress={() => {
                    // handle onPress
                  }}
                  style={styles.row}
                >
                  <View
                    style={[styles.rowIcon, { backgroundColor: "#fe9400" }]}
                  >
                    <Feather color="#fff" name="globe" size={20} />
                  </View>

                  <Text style={styles.rowLabel}>Language</Text>

                  <View style={styles.rowSpacer} />

                  <Text style={styles.rowValue}>English</Text>

                  <Feather color="#C6C6C6" name="chevron-right" size={20} />
                </TouchableOpacity>
              </View>

              <View style={styles.rowWrapper}>
                <View style={styles.row}>
                  <View
                    style={[styles.rowIcon, { backgroundColor: "#007AFF" }]}
                  >
                    <Feather color="#fff" name="moon" size={20} />
                  </View>

                  <Text style={styles.rowLabel}>Dark Mode</Text>

                  <View style={styles.rowSpacer} />

                  <Switch
                    {...switchProps}
                    onValueChange={toggleThemeFunction}
                    value={theme === "dark" ? true : false}
                  />
                </View>
              </View>

              <View style={styles.rowWrapper}>
                <TouchableOpacity
                  onPress={() => {
                    // handle onPress
                  }}
                  style={styles.row}
                >
                  <View
                    style={[styles.rowIcon, { backgroundColor: "#32c759" }]}
                  >
                    <Feather color="#fff" name="navigation" size={20} />
                  </View>

                  <Text style={styles.rowLabel}>Location</Text>

                  <View style={styles.rowSpacer} />

                  <Text style={styles.rowValue}>Los Angeles, CA</Text>

                  <Feather color="#C6C6C6" name="chevron-right" size={20} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Notifications</Text>

              <View style={styles.sectionBody}>
                <View style={[styles.rowWrapper, styles.rowFirst]}>
                  <View style={styles.row}>
                    <View
                      style={[styles.rowIcon, { backgroundColor: "#38C959" }]}
                    >
                      <Feather color="#fff" name="at-sign" size={20} />
                    </View>

                    <Text style={styles.rowLabel}>Email Notifications</Text>

                    <View style={styles.rowSpacer} />

                    <Switch
                      {...switchProps}
                      onValueChange={(emailNotifications) =>
                        setForm({ ...form, emailNotifications })
                      }
                      value={form.emailNotifications}
                    />
                  </View>
                </View>

                <View style={styles.rowWrapper}>
                  <View style={styles.row}>
                    <View
                      style={[styles.rowIcon, { backgroundColor: "#38C959" }]}
                    >
                      <Feather color="#fff" name="bell" size={20} />
                    </View>

                    <Text style={styles.rowLabel}>Push Notifications</Text>

                    <View style={styles.rowSpacer} />

                    <Switch
                      {...switchProps}
                      onValueChange={(pushNotifications) =>
                        setForm({ ...form, pushNotifications })
                      }
                      value={form.pushNotifications}
                    />
                  </View>
                </View>

                <View style={styles.rowWrapper}>
                  <TouchableOpacity
                    onPress={() => {
                      // handle onPress
                    }}
                    style={styles.row}
                  >
                    <View
                      style={[styles.rowIcon, { backgroundColor: "#FE3C30" }]}
                    >
                      <Feather color="#fff" name="music" size={20} />
                    </View>

                    <Text style={styles.rowLabel}>Sound</Text>

                    <View style={styles.rowSpacer} />

                    <Text style={styles.rowValue}>Default</Text>

                    <Feather color="#C6C6C6" name="chevron-right" size={20} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          {/* Logout Button */}
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>

          <Text style={styles.contentFooter}>{"\u00A9"} Ownlink</Text>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
    paddingBottom: 8,
    paddingHorizontal: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  contentFooter: {
    marginTop: 24,
    fontSize: 13,
    fontWeight: "500",
    color: "#929292",
    textAlign: "center",
  },
  /** Header */
  header: {
    paddingHorizontal: 24,
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1d1d1d",
  },
  headerSubtitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#929292",
    marginTop: 6,
  },
  /** Profile */
  profile: {
    padding: 16,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#e3e3e3",
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
    color: "#090909",
  },
  profileEmail: {
    marginTop: 6,
    fontSize: 16,
    fontWeight: "400",
    color: "#848484",
  },
  profileAction: {
    marginTop: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007bff",
    borderRadius: 12,
  },
  profileActionText: {
    marginRight: 8,
    fontSize: 15,
    fontWeight: "600",
    color: "#fff",
  },
  /** Section */
  section: {
    paddingTop: 12,
  },
  sectionTitle: {
    marginVertical: 8,
    marginHorizontal: 24,
    fontSize: 14,
    fontWeight: "600",
    color: "#a7a7a7",
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },
  sectionBody: {
    paddingLeft: 24,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#e3e3e3",
  },
  /** Row */
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingRight: 16,
    height: 50,
  },
  rowWrapper: {
    borderTopWidth: 1,
    borderColor: "#e3e3e3",
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
    color: "#000",
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  rowValue: {
    fontSize: 17,
    fontWeight: "500",
    color: "#8B8B8B",
    marginRight: 4,
  },
  logoutButton: {
    marginHorizontal: 24,
    marginVertical: 20,
    paddingVertical: 12,
    backgroundColor: "#000",
    borderRadius: 8,
    alignItems: "center",
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

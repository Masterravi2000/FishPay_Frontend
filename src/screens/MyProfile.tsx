import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  PixelRatio,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../app/store";
import { fetchInvoiceHistory } from "../features/invoice/invoiceThunk";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const scaleFactor = Math.min(SCREEN_WIDTH / 390, 1.15);
const scale = (size: number): number =>
  PixelRatio.roundToNearestPixel(size * scaleFactor);

type RootStackParamList = {
  MyProfile: undefined;
  EditProfile: undefined;
  Settings: undefined;
  YourRefunds: undefined;
  InvoiceHistory: undefined;
  PaymentManagements: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface MenuItem {
  id: string;
  icon: React.ComponentProps<typeof Feather>["name"];
  label: string;
  danger?: boolean;
}

const menuItems: MenuItem[] = [
  { id: "yourRefunds", icon: "rotate-ccw", label: "Your Refunds" },
  { id: "yourWishlist", icon: "heart", label: "Your Wishlist" },
  { id: "eGiftCards", icon: "gift", label: "E-Gift Cards" },
  { id: "orders", icon: "shopping-bag", label: "Orders" },
  { id: "invoice", icon: "file-text", label: "Invoice" },
  { id: "rewards", icon: "award", label: "Rewards" },
  { id: "savedAddresses", icon: "map-pin", label: "Saved Addresses" },
  {
    id: "paymentManagements",
    icon: "credit-card",
    label: "Payment Managements",
  },
];

const MyProfile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<NavigationProp>();

  //Call the thunk for getting invoice History in this page
  useEffect(() => {
    dispatch(fetchInvoiceHistory({ page: 0, size: 20}));
  },[]);

  const handleMenuItemPress = (id: string) => {
    switch (id) {
      case "yourRefunds":
        navigation.navigate("YourRefunds");
        break;
      case "invoice":
        navigation.navigate("InvoiceHistory");
        break;
      case "paymentManagements":
        navigation.navigate("PaymentManagements");
        break;
      default:
        // Wishlist, E-Gift Cards, Orders, Rewards, Saved Addresses
        // intentionally do nothing for now
        break;
    }
  };

  const name = "Anita Kaur";
  const username = "@anitakaur2234";

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={10}>
            <Feather name="arrow-left" size={scale(24)} color="#111827" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>My Profile</Text>

          <TouchableOpacity
            onPress={() => navigation.navigate("Settings")}
            hitSlop={10}
          >
            <Feather name="settings" size={scale(22)} color="#111827" />
          </TouchableOpacity>
        </View>

        <View style={styles.profileRow}>
          <View style={styles.avatarWrapper}>
            <View style={styles.avatarPlaceholder}>
              <Feather name="user" size={scale(34)} color="#9ca3af" />
            </View>
            <View style={styles.cameraBadge}>
              <Feather name="camera" size={scale(12)} color="#111827" />
            </View>
          </View>

          <View style={styles.profileTextWrapper}>
            <Text style={styles.profileName}>{name}</Text>
            <Text style={styles.profileUsername}>{username}</Text>

            <TouchableOpacity
              style={styles.editButton}
              activeOpacity={0.85}
              onPress={() => navigation.navigate("EditProfile")}
            >
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.menuList}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.menuItem,
                index !== menuItems.length - 1 && styles.menuItemBorder,
              ]}
              activeOpacity={0.7}
              onPress={() => handleMenuItemPress(item.id)}
            >
              <View style={styles.menuLeft}>
                <Feather
                  name={item.icon}
                  size={scale(20)}
                  color={item.danger ? "#ef4444" : "#374151"}
                />
                <Text
                  style={[
                    styles.menuLabel,
                    item.danger && styles.menuLabelDanger,
                  ]}
                >
                  {item.label}
                </Text>
              </View>

              <Feather name="chevron-right" size={scale(18)} color="#9ca3af" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#ffffff" },
  scrollContent: {
    paddingHorizontal: scale(20),
    paddingTop: scale(8),
    paddingBottom: scale(24),
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: scale(20),
  },
  headerTitle: { fontSize: scale(18), fontWeight: "700", color: "#111827" },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: scale(24),
  },
  avatarWrapper: { position: "relative" },
  avatarPlaceholder: {
    width: scale(76),
    height: scale(76),
    borderRadius: scale(38),
    backgroundColor: "#e5e7eb",
    alignItems: "center",
    justifyContent: "center",
  },
  cameraBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: scale(24),
    height: scale(24),
    borderRadius: scale(12),
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  profileTextWrapper: { marginLeft: scale(16), flexShrink: 1 },
  profileName: { fontSize: scale(17), fontWeight: "700", color: "#111827" },
  profileUsername: {
    fontSize: scale(13),
    color: "#9ca3af",
    marginTop: scale(2),
    marginBottom: scale(10),
  },
  editButton: {
    backgroundColor: "#ef4444",
    borderRadius: scale(20),
    paddingVertical: scale(8),
    paddingHorizontal: scale(20),
    alignSelf: "flex-start",
  },
  editButtonText: { color: "#ffffff", fontSize: scale(13), fontWeight: "600" },
  menuList: { marginTop: scale(4) },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: scale(16),
    paddingHorizontal: scale(5),
  },
  menuItemBorder: { borderBottomWidth: 1, borderBottomColor: "#f3f4f6" },
  menuLeft: { flexDirection: "row", alignItems: "center" },
  menuLabel: {
    fontSize: scale(15.5),
    color: "#1f2937",
    marginLeft: scale(14),
    fontWeight: "500",
  },
  menuLabelDanger: { color: "#ef4444" },
});

export default MyProfile;

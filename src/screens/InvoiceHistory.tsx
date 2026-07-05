import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  PixelRatio,
  Linking,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const scaleFactor = Math.min(SCREEN_WIDTH / 390, 1.15);
const scale = (size: number): number =>
  PixelRatio.roundToNearestPixel(size * scaleFactor);

type RootStackParamList = {
  InvoiceHistory: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// ---- Types matching expected backend shape ----
interface Invoice {
  id: string;
  orderNumber: string;
  date: string; // e.g. "3 Jul"
  amount: string; // e.g. "₹2,450"
  status: string; // e.g. "delivered"
  downloadUrl: string;
}

interface InvoiceGroup {
  month: string; // e.g. "July 2026"
  isCurrent: boolean;
  invoices: Invoice[];
}

// ---- Dummy data — replace with API response ----
const invoiceGroups: InvoiceGroup[] = [
  {
    month: "July 2026",
    isCurrent: true,
    invoices: [
      {
        id: "1",
        orderNumber: "FP10234",
        date: "3 Jul",
        amount: "₹2,450",
        status: "delivered",
        downloadUrl: "https://example.com/invoices/FP10234.pdf",
      },
      {
        id: "2",
        orderNumber: "FP10198",
        date: "1 Jul",
        amount: "₹980",
        status: "delivered",
        downloadUrl: "https://example.com/invoices/FP10198.pdf",
      },
    ],
  },
  {
    month: "June 2026",
    isCurrent: false,
    invoices: [
      {
        id: "3",
        orderNumber: "FP09871",
        date: "22 Jun",
        amount: "₹1,720",
        status: "delivered",
        downloadUrl: "https://example.com/invoices/FP09871.pdf",
      },
      {
        id: "4",
        orderNumber: "FP09750",
        date: "14 Jun",
        amount: "₹3,105",
        status: "delivered",
        downloadUrl: "https://example.com/invoices/FP09750.pdf",
      },
      {
        id: "5",
        orderNumber: "FP09612",
        date: "5 Jun",
        amount: "₹640",
        status: "delivered",
        downloadUrl: "https://example.com/invoices/FP09612.pdf",
      },
    ],
  },
  {
    month: "May 2026",
    isCurrent: false,
    invoices: [
      {
        id: "6",
        orderNumber: "FP09340",
        date: "30 May",
        amount: "₹1,150",
        status: "delivered",
        downloadUrl: "https://example.com/invoices/FP09340.pdf",
      },
    ],
  },
];

// ---- Dummy stats — replace with API response ----
const stats = {
  totalInvoices: 18,
  amountSpent: "₹24,860",
};

const filters = ["All", "This year", "Downloaded"];

const InvoiceHistory = () => {
  const navigation = useNavigation<NavigationProp>();
  const [activeFilter, setActiveFilter] = React.useState("All");

  const handleDownload = async (invoice: Invoice) => {
    try {
      const supported = await Linking.canOpenURL(invoice.downloadUrl);
      if (supported) {
        await Linking.openURL(invoice.downloadUrl);
      } else {
        Alert.alert("Unable to open", "This invoice link couldn't be opened.");
      }
    } catch (error) {
      Alert.alert("Download failed", "Something went wrong. Please try again.");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={10}>
            <Feather name="arrow-left" size={scale(20)} color="#111827" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Invoices</Text>
          <TouchableOpacity hitSlop={10}>
            <Feather name="more-horizontal" size={scale(18)} color="#111827" />
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Total invoices</Text>
            <Text style={styles.statValue}>{stats.totalInvoices}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Amount spent</Text>
            <Text style={styles.statValue}>{stats.amountSpent}</Text>
          </View>
        </View>

        {/* Filter chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterRow}
        >
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterChip,
                activeFilter === filter && styles.filterChipActive,
              ]}
              activeOpacity={0.7}
              onPress={() => setActiveFilter(filter)}
            >
              <Text
                style={[
                  styles.filterChipText,
                  activeFilter === filter && styles.filterChipTextActive,
                ]}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Timeline */}
        <View style={styles.timelineWrapper}>
          <View style={styles.timelineLine} />

          {invoiceGroups.map((group, groupIndex) => (
            <View
              key={group.month}
              style={[
                styles.groupBlock,
                groupIndex !== invoiceGroups.length - 1 && {
                  marginBottom: scale(20),
                },
              ]}
            >
              <View style={styles.monthRow}>
                <View
                  style={[
                    styles.monthDot,
                    group.isCurrent && styles.monthDotActive,
                  ]}
                />
                <Text style={styles.monthLabel}>{group.month}</Text>
              </View>

              <View style={styles.invoiceCard}>
                {group.invoices.map((invoice, index) => (
                  <View
                    key={invoice.id}
                    style={[
                      styles.invoiceRow,
                      index !== group.invoices.length - 1 &&
                        styles.invoiceRowBorder,
                    ]}
                  >
                    <View style={styles.invoiceTextWrapper}>
                      <Text style={styles.invoiceOrder}>
                        Order #{invoice.orderNumber}
                      </Text>
                      <Text style={styles.invoiceMeta}>
                        {invoice.date} · {invoice.amount}
                      </Text>
                    </View>

                    <TouchableOpacity
                      onPress={() => handleDownload(invoice)}
                      hitSlop={10}
                    >
                      <Feather
                        name="download"
                        size={scale(18)}
                        color="#378ADD"
                      />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scrollContent: {
    paddingBottom: scale(24),
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: scale(20),
    paddingTop: scale(8),
    paddingBottom: scale(16),
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  headerTitle: {
    fontSize: scale(16),
    fontWeight: "600",
    color: "#111827",
  },
  statsRow: {
    flexDirection: "row",
    gap: scale(12),
    paddingHorizontal: scale(20),
    paddingTop: scale(16),
  },
  statCard: {
    flex: 1,
    backgroundColor: "#f9fafb",
    borderRadius: scale(10),
    padding: scale(12),
  },
  statLabel: {
    fontSize: scale(12),
    color: "#9ca3af",
    marginBottom: scale(4),
  },
  statValue: {
    fontSize: scale(20),
    fontWeight: "600",
    color: "#111827",
  },
  filterRow: {
    paddingHorizontal: scale(20),
    paddingTop: scale(16),
    gap: scale(8),
  },
  filterChip: {
    height: scale(30),
    paddingHorizontal: scale(14),
    borderRadius: scale(20),
    borderWidth: 1,
    borderColor: "#e5e7eb",
    justifyContent: "center",
    alignItems: "center",
    marginRight: scale(8),
  },
  filterChipActive: {
    backgroundColor: "#111827",
    borderColor: "#111827",
  },
  filterChipText: {
    fontSize: scale(12),
    color: "#374151",
    fontWeight: "500",
  },
  filterChipTextActive: {
    color: "#ffffff",
  },
  timelineWrapper: {
    paddingHorizontal: scale(20),
    paddingLeft: scale(20) + scale(20),
    paddingTop: scale(18),
    position: "relative",
  },
  timelineLine: {
    position: "absolute",
    left: scale(20) + scale(5),
    top: scale(24),
    bottom: scale(24),
    width: 1,
    backgroundColor: "#e5e7eb",
  },
  groupBlock: {},
  monthRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: scale(10),
  },
  monthDot: {
    position: "absolute",
    left: -scale(20),
    width: scale(11),
    height: scale(11),
    borderRadius: scale(6),
    backgroundColor: "#9ca3af",
    borderWidth: 2,
    borderColor: "#ffffff",
  },
  monthDotActive: {
    backgroundColor: "#378ADD",
  },
  monthLabel: {
    fontSize: scale(12),
    fontWeight: "600",
    color: "#9ca3af",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  invoiceCard: {
    backgroundColor: "#f9fafb",
    borderRadius: scale(12),
    padding: scale(4),
  },
  invoiceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: scale(12),
  },
  invoiceRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  invoiceTextWrapper: {
    flex: 1,
    marginRight: scale(10),
  },
  invoiceOrder: {
    fontSize: scale(14),
    fontWeight: "500",
    color: "#111827",
  },
  invoiceMeta: {
    fontSize: scale(12),
    color: "#9ca3af",
    marginTop: scale(2),
  },
});

export default InvoiceHistory;
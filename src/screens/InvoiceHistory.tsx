import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Dimensions,
  PixelRatio,
  Linking,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import {
  fetchInvoiceHistory,
  invoiceViewed,
} from "../features/invoice/invoiceThunk";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const scaleFactor = Math.min(SCREEN_WIDTH / 390, 1.15);
const scale = (size: number): number =>
  PixelRatio.roundToNearestPixel(size * scaleFactor);

type RootStackParamList = {
  InvoiceHistory: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// ---- Types matching real backend shape ----
interface RawInvoice {
  invoiceNumber: string;
  invoiceUrl: string;
  orderId: string;
  orderTime: string; // ISO string
  totalAmount: number;
  viewed: boolean;
}

interface Invoice {
  id: string;
  invoiceNumber: string;
  orderNumber: string;
  date: string; // e.g. "9 Jul"
  amount: string; // e.g. "₹1,826"
  downloadUrl: string;
  viewed: boolean;
}

interface InvoiceGroup {
  month: string; // e.g. "July 2026"
  isCurrent: boolean;
  invoices: Invoice[];
}

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// ---- Group raw invoices by month, formatted for UI ----
const buildInvoiceGroups = (data: RawInvoice[]): InvoiceGroup[] => {
  const now = new Date();
  const currentMonthKey = `${now.getFullYear()}-${now.getMonth()}`;

  const groupMap = new Map<string, InvoiceGroup>();

  data.forEach((raw) => {
    const d = new Date(raw.orderTime);
    const monthKey = `${d.getFullYear()}-${d.getMonth()}`;
    const monthLabel = `${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}`;

    const invoice: Invoice = {
      id: raw.invoiceNumber,
      invoiceNumber: raw.invoiceNumber,
      orderNumber: raw.orderId.replace("order_", "").slice(0, 14),
      date: `${d.getDate()} ${MONTH_NAMES[d.getMonth()].slice(0, 3)}`,
      amount: `₹${raw.totalAmount.toLocaleString("en-IN")}`,
      downloadUrl: raw.invoiceUrl,
      viewed: raw.viewed,
    };

    if (!groupMap.has(monthKey)) {
      groupMap.set(monthKey, {
        month: monthLabel,
        isCurrent: monthKey === currentMonthKey,
        invoices: [],
      });
    }
    groupMap.get(monthKey)!.invoices.push(invoice);
  });

  return Array.from(groupMap.values());
};

const filters = ["All", "This year", "Downloaded"];

const PAGE_SIZE = 20;

const InvoiceHistory = () => {
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useDispatch<AppDispatch>();
  const [activeFilter, setActiveFilter] = React.useState("All");
  const [page, setPage] = useState(0);

  const { invoices, totalAmountSpent, totalInvoice, loadingMore } = useSelector(
    (state: RootState) => state.invoices,
  );

  const hasMore = invoices.length < totalInvoice;

  const invoiceGroups = React.useMemo(
    () => buildInvoiceGroups(invoices ?? []),
    [invoices],
  );

  const handleLoadMore = () => {
    if (loadingMore || !hasMore) return;
    const nextPage = page + 1;
    dispatch(fetchInvoiceHistory({ page: nextPage, size: PAGE_SIZE }));
    setPage(nextPage);
  };

  const handleDownload = async (invoice: Invoice) => {
    try {
      await dispatch(invoiceViewed({ invoiceNumber: invoice.invoiceNumber }));
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

  const renderGroup = ({ item: group }: { item: InvoiceGroup }) => (
    <View style={styles.groupBlock}>
      <View style={styles.timelineLine} />

      <View style={styles.monthRow}>
        <View
          style={[styles.monthDot, group.isCurrent && styles.monthDotActive]}
        />
        <Text style={styles.monthLabel}>{group.month}</Text>
      </View>

      {group.invoices.map((invoice, index) => (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => handleDownload(invoice)}
          key={index}
          style={[
            styles.invoiceCard,
            {
              backgroundColor: invoice.viewed ? "#fcfcfc" : "#f1fff6",
            },
          ]}
        >
          <View style={styles.invoiceRow}>
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
              <Feather name="download" size={scale(18)} color="#93ca82" />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  const ListHeader = () => (
    <>
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
          <Text style={styles.statValue}>{totalInvoice ?? 0}</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Amount spent</Text>
          <Text style={styles.statValue}>
            ₹{(totalAmountSpent ?? 0).toLocaleString("en-IN")}
          </Text>
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
    </>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={invoiceGroups}
        keyExtractor={(group) => group.month}
        renderItem={renderGroup}
        ListHeaderComponent={ListHeader}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loadingMore ? (
            <ActivityIndicator
              size="small"
              color="#378ADD"
              style={{ marginVertical: scale(16) }}
            />
          ) : null
        }
        ListEmptyComponent={
          <Text style={styles.emptyText}>No invoices found.</Text>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  listContent: {
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
    backgroundColor: "#a9e098",
    borderRadius: scale(10),
    padding: scale(12),
  },
  statLabel: {
    fontSize: scale(12),
    color: "#328119",
    marginBottom: scale(4),
  },
  statValue: {
    fontSize: scale(20),
    fontWeight: "700",
    color: "#464646",
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
    backgroundColor: "#93ca82",
    borderColor: "#93ca82",
  },
  filterChipText: {
    fontSize: scale(12),
    color: "#374151",
    fontWeight: "500",
  },
  filterChipTextActive: {
    color: "#ffffff",
  },
  groupBlock: {
    paddingHorizontal: scale(20),
    paddingLeft: scale(20) + scale(20),
    marginTop: scale(20),
    position: "relative",
  },
  timelineLine: {
    position: "absolute",
    left: scale(20) + scale(5),
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: "#caf8bc",
  },
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
    backgroundColor: "#398d1f",
  },
  monthLabel: {
    fontSize: scale(12),
    fontWeight: "600",
    color: "#9ca3af",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  invoiceCard: {
    borderRadius: scale(12),
    padding: scale(4),
    marginBottom: 5,
  },
  invoiceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: scale(12),
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
    color: "#93ca82",
    marginTop: scale(2),
  },
  emptyText: {
    textAlign: "center",
    color: "#9ca3af",
    fontSize: scale(13),
    marginTop: scale(40),
  },
});

export default InvoiceHistory;

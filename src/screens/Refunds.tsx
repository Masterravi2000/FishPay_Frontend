import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  PixelRatio,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../app/store";
import { fetchRefundHistory } from "../features/refund/refundThunk";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const scaleFactor = Math.min(SCREEN_WIDTH / 390, 1.15);
const scale = (size: number): number =>
  PixelRatio.roundToNearestPixel(size * scaleFactor);

type RootStackParamList = {
  Refunds: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// ---- Types ----
type RefundStage = "requested" | "approved" | "credited";

interface RawRefund {
  amount: number;
  completedAt: string;
  orderId: string;
  refundId: string;
  requestedAt: string;
  status: "PENDING" | "PROCESSED";
}

interface OngoingRefund {
  id: string;
  orderNumber: string;
  requestedDate: string;
  amount: string;
  stage: RefundStage;
  statusLabel: string;
}

interface CompletedRefund {
  id: string;
  orderNumber: string;
  creditedDate: string;
  amount: string;
}

type ListItem =
  | { type: "ongoingHeader" }
  | { type: "ongoing"; data: OngoingRefund }
  | { type: "completedHeader" }
  | { type: "completed"; data: CompletedRefund };

const STAGE_ORDER: RefundStage[] = ["requested", "approved", "credited"];
const PAGE_SIZE = 20;

const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const formatShortDate = (isoString: string): string => {
  const d = new Date(isoString);
  return `${d.getDate()} ${MONTH_NAMES[d.getMonth()]}`;
};

const formatOrderNumber = (orderId: string): string =>
  orderId.replace("order_", "").slice(0, 10);

const Refunds = () => {
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useDispatch<AppDispatch>();
  const [page, setPage] = React.useState(0);
  const [refreshing, setRefreshing] = React.useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    setPage(0);
    await dispatch(fetchRefundHistory({ page: 0, size: 20 }));
    setRefreshing(false);
  }

  const {
    refunds,
    totalRefundAmount,
    totalRefunds,
    totalRefundsInProgress,
    loadingMore,
  } = useSelector((state: RootState) => state.refunds);

  const getStageIndex = (stage: RefundStage) => STAGE_ORDER.indexOf(stage);

  const ongoingRefunds: OngoingRefund[] = React.useMemo(
    () =>
      (refunds as RawRefund[] | undefined)
        ?.filter((r) => r.status === "PENDING")
        .map((r) => ({
          id: r.refundId,
          orderNumber: formatOrderNumber(r.orderId),
          requestedDate: formatShortDate(r.requestedAt),
          amount: `₹${r.amount.toLocaleString("en-IN")}`,
          stage: "requested" as RefundStage,
          statusLabel:
            r.status.charAt(0) + r.status.slice(1).toLowerCase(),
        })) ?? [],
    [refunds]
  );

  const completedRefunds: CompletedRefund[] = React.useMemo(
    () =>
      (refunds as RawRefund[] | undefined)
        ?.filter((r) => r.status === "PROCESSED")
        .map((r) => ({
          id: r.refundId,
          orderNumber: formatOrderNumber(r.orderId),
          creditedDate: formatShortDate(r.completedAt),
          amount: `₹${r.amount.toLocaleString("en-IN")}`,
        })) ?? [],
    [refunds]
  );

  const hasMore = (refunds?.length ?? 0) < (totalRefunds ?? 0);

  const handleLoadMore = () => {
    if (loadingMore || !hasMore) return;
    const nextPage = page + 1;
    dispatch(fetchRefundHistory({ page: nextPage, size: PAGE_SIZE }));
    setPage(nextPage);
  };

  // Flatten both sections into a single list for FlatList
  const listData: ListItem[] = React.useMemo(() => {
    const items: ListItem[] = [];
    if (ongoingRefunds.length > 0) {
      items.push({ type: "ongoingHeader" });
      ongoingRefunds.forEach((r) => items.push({ type: "ongoing", data: r }));
    }
    if (completedRefunds.length > 0) {
      items.push({ type: "completedHeader" });
      completedRefunds.forEach((r) =>
        items.push({ type: "completed", data: r })
      );
    }
    return items;
  }, [ongoingRefunds, completedRefunds]);

  const renderItem = ({ item }: { item: ListItem }) => {
    if (item.type === "ongoingHeader") {
      return <Text style={styles.sectionLabel}>Ongoing</Text>;
    }

    if (item.type === "completedHeader") {
      return <Text style={styles.sectionLabel}>Completed</Text>;
    }

    if (item.type === "ongoing") {
      const refund = item.data;
      const activeIndex = getStageIndex(refund.stage);
      const isWarning = refund.stage === "approved";

      return (
        <View style={styles.sectionContent}>
          <View style={styles.ongoingCard}>
            <View style={styles.ongoingHeaderRow}>
              <Text style={styles.orderNumberText}>
                Order #{refund.orderNumber}
              </Text>
              <Text
                style={[
                  styles.statusBadgeText,
                  isWarning
                    ? styles.statusBadgeTextWarning
                    : styles.statusBadgeTextAccent,
                ]}
              >
                {refund.statusLabel}
              </Text>
            </View>

            <Text style={styles.ongoingMeta}>
              Requested {refund.requestedDate} · {refund.amount}
            </Text>

            <View style={styles.progressBarRow}>
              {STAGE_ORDER.map((stage, index) => (
                <View
                  key={stage}
                  style={[
                    styles.progressSegment,
                    index <= activeIndex
                      ? isWarning
                        ? styles.progressSegmentWarning
                        : styles.progressSegmentAccent
                      : styles.progressSegmentInactive,
                  ]}
                />
              ))}
            </View>

            <View style={styles.progressLabelRow}>
              <Text
                style={[
                  styles.progressLabelText,
                  activeIndex === 0 &&
                    (isWarning
                      ? styles.progressLabelWarning
                      : styles.progressLabelAccent),
                ]}
              >
                Requested
              </Text>
              <Text
                style={[
                  styles.progressLabelText,
                  activeIndex === 1 &&
                    (isWarning
                      ? styles.progressLabelWarning
                      : styles.progressLabelAccent),
                ]}
              >
                Approved
              </Text>
              <Text
                style={[
                  styles.progressLabelText,
                  activeIndex === 2 &&
                    (isWarning
                      ? styles.progressLabelWarning
                      : styles.progressLabelAccent),
                ]}
              >
                Credited
              </Text>
            </View>
          </View>
        </View>
      );
    }

    // completed
    const refund = item.data;
    return (
      <View style={styles.completedSection}>
        <View style={styles.completedRow}>
          <View style={styles.completedIconWrapper}>
            <Feather name="check" size={scale(16)} color="#16a34a" />
          </View>

          <View style={styles.completedTextWrapper}>
            <Text style={styles.orderNumberText}>
              Order #{refund.orderNumber}
            </Text>
            <Text style={styles.completedMeta}>
              Credited {refund.creditedDate}
            </Text>
          </View>

          <Text style={styles.completedAmount}>{refund.amount}</Text>
        </View>
      </View>
    );
  };

  const ListHeader = () => (
    <>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={10}>
          <Feather name="arrow-left" size={scale(20)} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Your Refunds</Text>
        <View style={{ width: scale(20) }} />
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>In progress</Text>
          <Text style={styles.statValue}>{totalRefundsInProgress ?? 0}</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Total refunded</Text>
          <Text style={styles.statValue}>
            ₹{(totalRefundAmount ?? 0).toLocaleString("en-IN")}
          </Text>
        </View>
      </View>
    </>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={listData}
        keyExtractor={(item, index) =>
          item.type === "ongoing" || item.type === "completed"
            ? item.data.id
            : `${item.type}-${index}`
        }
        renderItem={renderItem}
        ListHeaderComponent={ListHeader}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        onEndReached={handleLoadMore}
        refreshing={refreshing}
        onRefresh={handleRefresh}
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
          <Text style={styles.emptyText}>No refunds found.</Text>
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
    backgroundColor: "#a9e098",
    borderRadius: scale(10),
    padding: scale(15),
  },
  statLabel: {
    fontSize: scale(12),
    color: "#328119",
    marginBottom: scale(4),
  },
  statValue: {
    fontSize: scale(20),
    fontWeight: "600",
    color: "#464646",
  },
  sectionLabel: {
    fontSize: scale(12),
    fontWeight: "600",
    color: "#9ca3af",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    paddingHorizontal: scale(20),
    paddingTop: scale(20),
    paddingBottom: scale(8),
  },
  sectionContent: {
    paddingHorizontal: scale(20),
  },
  ongoingCard: {
    backgroundColor: "#f1fff6",
    borderRadius: scale(12),
    padding: scale(14),
    marginBottom: scale(10),
  },
  ongoingHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: scale(10),
  },
  orderNumberText: {
    fontSize: scale(14),
    fontWeight: "500",
    color: "#111827",
  },
  statusBadge: {
    paddingHorizontal: scale(9),
    paddingVertical: scale(3),
    borderRadius: scale(20),
  },
  statusBadgeWarning: {
    backgroundColor: "#c3f0b5",
  },
  statusBadgeAccent: {
    backgroundColor: "#c3f0b5",
  },
  statusBadgeText: {
    fontSize: scale(11),
    fontWeight: "500",
  },
  statusBadgeTextWarning: {
    color: "#85ca6f",
  },
  statusBadgeTextAccent: {
    color: "#98db83",
  },
  ongoingMeta: {
    fontSize: scale(12),
    color: "#9ca3af",
    marginBottom: scale(12),
  },
  progressBarRow: {
    flexDirection: "row",
    gap: scale(6),
  },
  progressSegment: {
    flex: 1,
    height: scale(4),
    borderRadius: scale(2),
  },
  progressSegmentAccent: {
    backgroundColor: "#a9e098",
  },
  progressSegmentWarning: {
    backgroundColor: "#a9e098",
  },
  progressSegmentInactive: {
    backgroundColor: "#e5e7eb",
  },
  progressLabelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: scale(6),
  },
  progressLabelText: {
    fontSize: scale(11),
    color: "#9ca3af",
  },
  progressLabelAccent: {
    color: "#9ca3af",
  },
  progressLabelWarning: {
    color: "#9ca3af",
  },
  completedSection: {
    paddingHorizontal: scale(20),
  },
  completedRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: scale(12),
    paddingHorizontal: scale(3),
  },
  completedRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  completedIconWrapper: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(9),
    backgroundColor: "#dcfce7",
    alignItems: "center",
    justifyContent: "center",
    marginRight: scale(12),
  },
  completedTextWrapper: {
    flex: 1,
  },
  completedMeta: {
    fontSize: scale(12),
    color: "#9cd38b",
    marginTop: scale(2),
  },
  completedAmount: {
    fontSize: scale(14),
    fontWeight: "500",
    color: "#111827",
  },
  emptyText: {
    textAlign: "center",
    color: "#9ca3af",
    fontSize: scale(13),
    marginTop: scale(40),
  },
});

export default Refunds;
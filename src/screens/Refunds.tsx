import React from "react";
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

// ---- Dummy data — replace with API response ----
const stats = {
  inProgress: 2,
  totalRefunded: "₹3,240",
};

const ongoingRefunds: OngoingRefund[] = [
  {
    id: "1",
    orderNumber: "FP10198",
    requestedDate: "5 Jul",
    amount: "₹980",
    stage: "approved",
    statusLabel: "Processing",
  },
  {
    id: "2",
    orderNumber: "FP10102",
    requestedDate: "8 Jul",
    amount: "₹1,150",
    stage: "requested",
    statusLabel: "Requested",
  },
];

const completedRefunds: CompletedRefund[] = [
  {
    id: "3",
    orderNumber: "FP09871",
    creditedDate: "22 Jun",
    amount: "₹1,720",
  },
  {
    id: "4",
    orderNumber: "FP09612",
    creditedDate: "5 Jun",
    amount: "₹640",
  },
];

const STAGE_ORDER: RefundStage[] = ["requested", "approved", "credited"];

const Refunds = () => {
  const navigation = useNavigation<NavigationProp>();

  const getStageIndex = (stage: RefundStage) => STAGE_ORDER.indexOf(stage);

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
          <Text style={styles.headerTitle}>Your Refunds</Text>
          <View style={{ width: scale(20) }} />
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>In progress</Text>
            <Text style={styles.statValue}>{stats.inProgress}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Total refunded</Text>
            <Text style={styles.statValue}>{stats.totalRefunded}</Text>
          </View>
        </View>

        {/* Ongoing section */}
        <Text style={styles.sectionLabel}>Ongoing</Text>

        <View style={styles.sectionContent}>
          {ongoingRefunds.map((refund) => {
            const activeIndex = getStageIndex(refund.stage);
            const isWarning = refund.stage === "approved";

            return (
              <View key={refund.id} style={styles.ongoingCard}>
                <View style={styles.ongoingHeaderRow}>
                  <Text style={styles.orderNumberText}>
                    Order #{refund.orderNumber}
                  </Text>
                  <View
                    style={[
                      styles.statusBadge,
                      isWarning
                        ? styles.statusBadgeWarning
                        : styles.statusBadgeAccent,
                    ]}
                  >
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
            );
          })}
        </View>

        {/* Completed section */}
        <Text style={styles.sectionLabel}>Completed</Text>

        <View style={styles.completedSection}>
          {completedRefunds.map((refund, index) => (
            <View
              key={refund.id}
              style={[
                styles.completedRow,
                index !== completedRefunds.length - 1 &&
                  styles.completedRowBorder,
              ]}
            >
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
    backgroundColor: "#f9fafb",
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
    backgroundColor: "#fef9c3",
  },
  statusBadgeAccent: {
    backgroundColor: "#e0edff",
  },
  statusBadgeText: {
    fontSize: scale(11),
    fontWeight: "500",
  },
  statusBadgeTextWarning: {
    color: "#b45309",
  },
  statusBadgeTextAccent: {
    color: "#378ADD",
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
    backgroundColor: "#378ADD",
  },
  progressSegmentWarning: {
    backgroundColor: "#eab308",
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
    color: "#378ADD",
  },
  progressLabelWarning: {
    color: "#b45309",
  },
  completedSection: {
    paddingHorizontal: scale(20),
  },
  completedRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: scale(12),
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
    color: "#9ca3af",
    marginTop: scale(2),
  },
  completedAmount: {
    fontSize: scale(14),
    fontWeight: "500",
    color: "#111827",
  },
});

export default Refunds;
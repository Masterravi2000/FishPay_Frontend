import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  PixelRatio,
} from "react-native";
import { Feather } from "@expo/vector-icons";

// ---- Responsive scaling helpers ----
const BASE_WIDTH = 350;
const BASE_HEIGHT = 400;
const { width: SCREEN_WIDTH } = Dimensions.get("window");

const scaleFactor = Math.min(SCREEN_WIDTH / 400, 1);

const scale = (size: number): number =>
  PixelRatio.roundToNearestPixel(size * scaleFactor);

const CARD_WIDTH = Math.min(BASE_WIDTH * scaleFactor, BASE_WIDTH);
const CARD_HEIGHT = Math.min(BASE_HEIGHT * scaleFactor, BASE_HEIGHT);

// ---- Types ----
type FeatherIconName = React.ComponentProps<typeof Feather>["name"];

interface TimelineItem {
  id: number;
  icon: FeatherIconName;
  title: string;
  subtitle: string;
  time: string;
}

interface DeliveryTimelineProps {
  onRatePress?: () => void;
  orderTime: string;
}

const DeliveryTimeline: React.FC<DeliveryTimelineProps> = ({
  onRatePress,
  orderTime,
}) => {
  const timelineData: TimelineItem[] = [
    {
      id: 1,
      icon: "shopping-bag",
      title: "Order Confirmed",
      subtitle: "Order placed and confirmed",
      time: orderTime,
    },
    {
      id: 2,
      icon: "package",
      title: "Packaging",
      subtitle: "Packing started",
      time: "",
    },
    {
      id: 3,
      icon: "truck",
      title: "Shipping",
      subtitle: "Waiting for package",
      time: "",
    },
    {
      id: 4,
      icon: "map-pin",
      title: "Sent to Customer",
      subtitle: "Waiting for delivery",
      time: "",
    },
  ];
  return (
    <View style={[styles.card, { width: CARD_WIDTH, height: CARD_HEIGHT }]}>
      {/* Header */}
      <View style={styles.headerRow}>
        <View style={styles.timelinePill}>
          <Text style={styles.timelinePillText}>Timeline</Text>
        </View>

        <View style={styles.dashedLine} />

        <View style={styles.progressPill}>
          <View style={styles.progressCheckCircle}>
            <Feather name="check" size={scale(11)} color="#fff" />
          </View>
          <Text style={styles.progressPillText}>In Progress</Text>
        </View>
      </View>

      {/* Timeline items */}
      <View style={styles.timelineContainer}>
        {timelineData.map((item, index) => (
          <View key={item.id} style={styles.itemWrapper}>
            <View style={styles.iconColumn}>
              <View style={[styles.iconCircle,{backgroundColor: index === 0 ? "#59b647" : "#ffffff"}]}>
                <Feather name={item.icon} size={scale(18)} color={index===0?"#ffffff":"#374151"} />
              </View>
              {index !== timelineData.length - 1 && (
                <View style={styles.connectorLine} />
              )}
            </View>

            <View style={styles.textColumn}>
              <View style={styles.titleRow}>
                <Text style={styles.itemTitle} numberOfLines={1}>
                  {item.title}
                </Text>
                <Text style={styles.itemTime}>{item.time}</Text>
              </View>
              <Text style={styles.itemSubtitle} numberOfLines={1}>
                {item.subtitle}
              </Text>
            </View>
          </View>
        ))}
      </View>

      {/* Rate delivery button */}
      <TouchableOpacity
        style={styles.rateButton}
        activeOpacity={0.8}
        onPress={onRatePress}
      >
        <Text style={styles.rateEmoji}>🙌</Text>
        <Text style={styles.rateButtonText}>Rate this delivery</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: scale(24),
    paddingHorizontal: scale(18),
    paddingTop: scale(18),
    paddingBottom: scale(16),
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 6,
    alignSelf: "center",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  timelinePill: {
    backgroundColor: "#f3f4f6",
    borderRadius: scale(20),
    paddingVertical: scale(8),
    paddingHorizontal: scale(16),
  },
  timelinePillText: {
    fontSize: scale(13),
    fontWeight: "600",
    color: "#374151",
  },
  dashedLine: {
    flex: 1,
    height: 0,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderStyle: "dashed",
    marginHorizontal: scale(8),
  },
  progressPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#dbeafe",
    borderRadius: scale(20),
    paddingVertical: scale(6),
    paddingHorizontal: scale(12),
  },
  progressCheckCircle: {
    width: scale(18),
    height: scale(18),
    borderRadius: scale(9),
    backgroundColor: "#3b82f6",
    alignItems: "center",
    justifyContent: "center",
    marginRight: scale(6),
  },
  progressPillText: {
    fontSize: scale(12.5),
    fontWeight: "600",
    color: "#1e3a8a",
  },
  timelineContainer: {
    flex: 1,
    marginTop: scale(20),
  },
  itemWrapper: {
    flexDirection: "row",
  },
  iconColumn: {
    alignItems: "center",
    width: scale(44),
  },
  iconCircle: {
    width: scale(44),
    height: scale(44),
    borderRadius: scale(22),
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  connectorLine: {
    width: 1,
    flex: 1,
    minHeight: scale(24),
    backgroundColor: "#e5e7eb",
    marginVertical: scale(2),
  },
  textColumn: {
    flex: 1,
    marginLeft: scale(14),
    paddingBottom: scale(18),
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  itemTitle: {
    fontSize: scale(15.5),
    fontWeight: "700",
    color: "#111827",
    flexShrink: 1,
  },
  itemTime: {
    fontSize: scale(11.5),
    color: "#9ca3af",
    marginLeft: scale(6),
  },
  itemSubtitle: {
    fontSize: scale(12.5),
    color: "#9ca3af",
    marginTop: scale(3),
  },
  rateButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#dcfce7",
    borderRadius: scale(30),
    paddingVertical: scale(14),
  },
  rateEmoji: {
    fontSize: scale(16),
    marginRight: scale(8),
  },
  rateButtonText: {
    fontSize: scale(15),
    fontWeight: "600",
    color: "#15803d",
  },
});

export default DeliveryTimeline;

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  PixelRatio,
  Image,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { refundPayment } from "../features/refund/refundThunk";
import productImg1 from "../../assets/Products_Images/GreenPropolis.jpg";
import productImg2 from "../../assets/Products_Images/PropolisLight.png";
import productImg3 from "../../assets/Products_Images/RealFlawless.jpg";

import productImg4 from "../../assets/Products_Images/lipstick.jpg";
import productImg5 from "../../assets/Products_Images/highlighter Duo.jpg";
import productImg6 from "../../assets/Products_Images/CompactPowder.jpg";
import productImg7 from "../../assets/Products_Images/waterProoofMascara.jpg";
import productImg8 from "../../assets/Products_Images/eyeBrowPencil.jpeg";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const scaleFactor = Math.min(SCREEN_WIDTH / 390, 1.15);
const scale = (size: number): number =>
  PixelRatio.roundToNearestPixel(size * scaleFactor);

type RootStackParamList = {
  MyOrders: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// ---- Types ----
type OngoingStatus = "transit" | "packed";

interface OngoingOrder {
  id: string;
  orderNumber: string;
  productName: string;
  variant: string;
  price: string;
  status: OngoingStatus;
  statusLabel: string;
  arrivingDate: string;
  imageUrl: string;
}

interface DeliveredOrder {
  id: string;
  orderNumber: string;
  productName: string;
  variant: string;
  price: string;
  deliveredDate: string;
  imageUrl: string;
}

type FilterType = "All" | "Ongoing" | "Delivered";

// ---- Dummy data — replace with API response ----
const ongoingOrders: OngoingOrder[] = [
  {
    id: "1",
    orderNumber: "FP10245",
    productName: "Green Propolis Ampule Mask",
    variant: "Mask 220P",
    price: "₹505.0",
    status: "transit",
    statusLabel: "Confirmed",
    arrivingDate: "18 Jul",
    imageUrl: productImg1,
  },
  {
    id: "2",
    orderNumber: "FP10231",
    productName: "Propolis Light Cream",
    variant: "Cream 3TE4",
    price: "₹332.0",
    status: "packed",
    statusLabel: "Confirmed",
    arrivingDate: "21 Jul",
    imageUrl: productImg2,
  },
  {
    id: "3",
    orderNumber: "FP10231",
    productName: "Real Flawless Luminous Perfecting Pressed",
    variant: "Powder N404",
    price: "₹484.0",
    status: "packed",
    statusLabel: "Confirmed",
    arrivingDate: "21 Jul",
    imageUrl: productImg3,
  },
];

const deliveredOrders: DeliveredOrder[] = [
  {
    id: "1",
    orderNumber: "FP10198",
    productName: "Matte Lipstick Set",
    variant: "3 Shades",
    price: "₹980",
    deliveredDate: "1 Jul",
    imageUrl: productImg4,
  },
  {
    id: "2",
    orderNumber: "FP09871",
    productName: "Highlighter Duo",
    variant: "Rose Gold",
    price: "₹1,720",
    deliveredDate: "22 Jun",
    imageUrl: productImg5,
  },
  {
    id: "3",
    orderNumber: "FP09750",
    productName: "Compact Powder",
    variant: "Shade Ivory",
    price: "₹650",
    deliveredDate: "14 Jun",
    imageUrl: productImg6,
  },
  {
    id: "4",
    orderNumber: "FP09612",
    productName: "Waterproof Mascara",
    variant: "Jet Black",
    price: "₹499",
    deliveredDate: "5 Jun",
    imageUrl: productImg7,
  },
  {
    id: "5",
    orderNumber: "FP09340",
    productName: "Eyebrow Pencil",
    variant: "Ash Brown",
    price: "₹350",
    deliveredDate: "30 May",
    imageUrl: productImg8,
  },
  {
    id: "6",
    orderNumber: "FP09201",
    productName: "Setting Spray",
    variant: "100ml",
    price: "₹899",
    deliveredDate: "24 May",
    imageUrl: "",
  },
  {
    id: "7",
    orderNumber: "FP09088",
    productName: "Concealer Stick",
    variant: "Shade 3",
    price: "₹549",
    deliveredDate: "18 May",
    imageUrl: "",
  },
  {
    id: "8",
    orderNumber: "FP08955",
    productName: "Blush Palette",
    variant: "Peach Edit",
    price: "₹1,150",
    deliveredDate: "10 May",
    imageUrl: "",
  },
  {
    id: "9",
    orderNumber: "FP08820",
    productName: "Lip Gloss Trio",
    variant: "Clear Shine",
    price: "₹720",
    deliveredDate: "3 May",
    imageUrl: "",
  },
  {
    id: "10",
    orderNumber: "FP08711",
    productName: "Makeup Brush Set",
    variant: "12 Piece",
    price: "₹1,999",
    deliveredDate: "27 Apr",
    imageUrl: "",
  },
  {
    id: "11",
    orderNumber: "FP08602",
    productName: "BB Cream",
    variant: "Medium",
    price: "₹599",
    deliveredDate: "20 Apr",
    imageUrl: "",
  },
  {
    id: "12",
    orderNumber: "FP08477",
    productName: "Eyeliner Pen",
    variant: "Black",
    price: "₹299",
    deliveredDate: "14 Apr",
    imageUrl: "",
  },
  {
    id: "13",
    orderNumber: "FP08350",
    productName: "Nail Polish Set",
    variant: "6 Colors",
    price: "₹850",
    deliveredDate: "6 Apr",
    imageUrl: "",
  },
  {
    id: "14",
    orderNumber: "FP08211",
    productName: "Facial Primer",
    variant: "50ml",
    price: "₹749",
    deliveredDate: "30 Mar",
    imageUrl: "",
  },
  {
    id: "15",
    orderNumber: "FP08098",
    productName: "Contour Kit",
    variant: "Medium-Dark",
    price: "₹1,299",
    deliveredDate: "22 Mar",
    imageUrl: "",
  },
  {
    id: "16",
    orderNumber: "FP07965",
    productName: "Makeup Remover Wipes",
    variant: "Pack of 30",
    price: "₹249",
    deliveredDate: "15 Mar",
    imageUrl: "",
  },
  {
    id: "17",
    orderNumber: "FP07840",
    productName: "Sheet Mask Set",
    variant: "5 Pack",
    price: "₹399",
    deliveredDate: "8 Mar",
    imageUrl: "",
  },
  {
    id: "18",
    orderNumber: "FP07712",
    productName: "Setting Powder",
    variant: "Translucent",
    price: "₹679",
    deliveredDate: "1 Mar",
    imageUrl: "",
  },
  {
    id: "19",
    orderNumber: "FP07598",
    productName: "Lip Liner Duo",
    variant: "Nude & Rose",
    price: "₹450",
    deliveredDate: "22 Feb",
    imageUrl: "",
  },
  {
    id: "20",
    orderNumber: "FP07460",
    productName: "Perfume Rollerball",
    variant: "10ml",
    price: "₹1,499",
    deliveredDate: "14 Feb",
    imageUrl: "",
  },
];

const filters: FilterType[] = ["All", "Ongoing", "Delivered"];

const MyOrders = () => {
  const navigation = useNavigation<NavigationProp>();
  const [activeFilter, setActiveFilter] = React.useState<FilterType>("All");
  const { payments } = useSelector((state: RootState) => state.payment);
  const [confirmModalVisible, setConfirmModalVisible] = React.useState(false);
  const [selectedOrderIndex, setSelectedOrderIndex] = React.useState<
    number | null
  >(null);

  const showOngoing = activeFilter === "All" || activeFilter === "Ongoing";
  const showDelivered = activeFilter === "All" || activeFilter === "Delivered";
  const dispatch = useDispatch<AppDispatch>();

  const REFUND_REASONS = [
    "Customer requested refund",
    "Duplicate payment",
    "Order cancelled",
  ];

  const getLatestRefundablePayments = (payments: any[]) => {
    return payments
      .filter((payment) => payment.refunded === false)
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
      .slice(0, 3)
      .map(({ paymentId, amount }, index) => ({
        paymentId,
        amount,
        reason: REFUND_REASONS[index],
      }));
  };

  const refundablePayments = getLatestRefundablePayments(payments);

  const handleRefund = (item: any) => {
    dispatch(refundPayment(item));
  };

  const handleConfirmCancel = () => {
    if (selectedOrderIndex !== null) {
      handleRefund(refundablePayments[selectedOrderIndex]);
    }
    setConfirmModalVisible(false);
    setSelectedOrderIndex(null);
  };

  const handleDismissModal = () => {
    setConfirmModalVisible(false);
    setSelectedOrderIndex(null);
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
            <Feather name="arrow-left" size={scale(19)} color="#111827" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Orders</Text>
          <TouchableOpacity hitSlop={10}>
            <Feather name="search" size={scale(17)} color="#111827" />
          </TouchableOpacity>
        </View>

        {/* Filter chips */}
        <View style={styles.filterRow}>
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
        </View>

        {/* Ongoing section */}
        {showOngoing && ongoingOrders.length > 0 && (
          <>
            <Text style={styles.sectionLabel}>Ongoing</Text>
            <View style={styles.sectionContent}>
              {ongoingOrders.map((order, index) => (
                <View
                  key={order.id}
                  style={[
                    styles.orderRow,
                    index !== ongoingOrders.length - 1 && styles.orderRowBorder,
                  ]}
                >
                  <View style={styles.thumbnail}>
                    <Image
                      source={
                        typeof order.imageUrl === "string"
                          ? { uri: order.imageUrl }
                          : order.imageUrl
                      }
                      style={styles.thumbnailImage}
                      resizeMode="cover"
                    />
                  </View>

                  <View style={styles.orderTextWrapper}>
                    <View style={styles.titleRow}>
                      <Text style={styles.productName} numberOfLines={1}>
                        {order.productName}
                      </Text>
                      <View
                        style={[
                          styles.statusBadge,
                          order.status === "packed"
                            ? styles.statusBadgeWarning
                            : styles.statusBadgeAccent,
                        ]}
                      >
                        <Text
                          style={[
                            styles.statusBadgeText,
                            order.status === "packed"
                              ? styles.statusBadgeTextWarning
                              : styles.statusBadgeTextAccent,
                          ]}
                        >
                          {order.statusLabel}
                        </Text>
                      </View>
                    </View>

                    <Text style={styles.metaText} numberOfLines={1}>
                      {order.variant} · {order.price} · Arriving{" "}
                      {order.arrivingDate}
                    </Text>

                    <View style={styles.actionsRow}>
                      <TouchableOpacity hitSlop={6}>
                        <Text style={styles.actionTextAccent}>Track</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                      activeOpacity={0.7}
                        onPress={() => {
                          setSelectedOrderIndex(index);
                          setConfirmModalVisible(true);
                        }}
                        hitSlop={6}
                      >
                        <Text style={styles.actionTextDanger}>
                          Cancel & Refund
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </>
        )}

        {/* Delivered section */}
        {showDelivered && deliveredOrders.length > 0 && (
          <>
            <Text style={styles.sectionLabel}>Delivered</Text>
            <View style={styles.sectionContent}>
              {deliveredOrders.map((order, index) => (
                <View
                  key={order.id}
                  style={[
                    styles.orderRow,
                    index !== deliveredOrders.length - 1 &&
                      styles.orderRowBorder,
                  ]}
                >
                  <View style={styles.thumbnail}>
                    <Image
                      source={
                        typeof order.imageUrl === "string"
                          ? { uri: order.imageUrl }
                          : order.imageUrl
                      }
                      style={styles.thumbnailImage}
                      resizeMode="cover"
                    />
                  </View>

                  <View style={styles.orderTextWrapper}>
                    <View style={styles.titleRow}>
                      <Text style={styles.productName} numberOfLines={1}>
                        {order.productName}
                      </Text>
                      <Text style={styles.priceText}>{order.price}</Text>
                    </View>

                    <Text style={styles.metaText} numberOfLines={1}>
                      {order.variant} · Delivered {order.deliveredDate}
                    </Text>

                    <View style={styles.actionsRow}>
                      <TouchableOpacity hitSlop={6}>
                        <Text style={styles.actionTextPrimary}>Buy again</Text>
                      </TouchableOpacity>
                      <TouchableOpacity activeOpacity={0.5} hitSlop={6}>
                        <Text style={styles.actionTextSecondary}>Details</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </>
        )}

        {/* Empty state */}
        {((showOngoing && ongoingOrders.length === 0) || !showOngoing) &&
          ((showDelivered && deliveredOrders.length === 0) || !showDelivered) &&
          ongoingOrders.length === 0 &&
          deliveredOrders.length === 0 && (
            <Text style={styles.emptyText}>No orders found.</Text>
          )}
      </ScrollView>
      <Modal
        visible={confirmModalVisible}
        transparent
        animationType="fade"
        onRequestClose={handleDismissModal}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={handleDismissModal}
        >
          <TouchableOpacity activeOpacity={1} style={styles.iosModalCard}>
            <Text style={styles.iosModalTitle}>Cancel Order?</Text>
            <Text style={styles.iosModalDescription}>
             Are you sure you want to cancel your order? If yes, your refund will be credited within 24 hours.
            </Text>

            <View style={styles.iosDivider} />

            <View style={styles.iosButtonsRow}>
              <TouchableOpacity
                style={styles.iosButton}
                activeOpacity={0.6}
                onPress={handleDismissModal}
              >
                <Text style={styles.iosButtonTextCancel}>Keep Order</Text>
              </TouchableOpacity>

              <View style={styles.iosButtonDivider} />

              <TouchableOpacity
                style={styles.iosButton}
                activeOpacity={0.6}
                onPress={handleConfirmCancel}
              >
                <Text style={styles.iosButtonTextDanger}>Yes Confirm</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
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
    paddingTop: scale(15),
    paddingBottom: scale(22),
  },
  headerTitle: {
    fontSize: scale(15),
    fontWeight: "600",
    color: "#111827",
  },
  filterRow: {
    flexDirection: "row",
    gap: scale(6),
    paddingHorizontal: scale(20),
    paddingBottom: scale(6),
  },
  filterChip: {
    height: scale(28),
    paddingHorizontal: scale(14),
    borderRadius: scale(20),
    borderWidth: 1,
    borderColor: "#e5e7eb",
    justifyContent: "center",
    alignItems: "center",
    marginRight: scale(6),
  },
  filterChipActive: {
    backgroundColor: "#93ca82",
    borderColor: "#93ca82",
  },
  filterChipText: {
    fontSize: scale(11.5),
    color: "#374151",
    fontWeight: "500",
  },
  filterChipTextActive: {
    fontWeight: "700",
    color: "#ffffff",
  },
  sectionLabel: {
    fontSize: scale(11),
    fontWeight: "600",
    color: "#9ca3af",
    textTransform: "uppercase",
    letterSpacing: 0.6,
    paddingHorizontal: scale(20),
    paddingTop: scale(14),
    paddingBottom: scale(6),
  },
  sectionContent: {
    paddingHorizontal: scale(20),
  },
  orderRow: {
    flexDirection: "row",
    gap: scale(17),
    paddingVertical: scale(12),
  },
  orderRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  thumbnail: {
    width: scale(48),
    height: scale(48),
    borderRadius: scale(9),
    backgroundColor: "#f9fafb",
    overflow: "hidden",
  },
  thumbnailImage: {
    width: "100%",
    height: "100%",
  },
  orderTextWrapper: {
    flex: 1,
    minWidth: 0,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  productName: {
    fontSize: scale(13.5),
    fontWeight: "500",
    color: "#111827",
    flexShrink: 1,
    marginRight: scale(8),
  },
  priceText: {
    fontSize: scale(13),
    fontWeight: "500",
    color: "#111827",
    flexShrink: 0,
  },
  statusBadge: {
    paddingHorizontal: scale(7),
    paddingVertical: scale(2),
    borderRadius: scale(20),
    flexShrink: 0,
  },
  statusBadgeAccent: {
    backgroundColor: "#fef9c3",
  },
  statusBadgeWarning: {
    backgroundColor: "#fef9c3",
  },
  statusBadgeText: {
    fontSize: scale(10),
    fontWeight: "500",
  },
  statusBadgeTextAccent: {
    color: "#b45309",
  },
  statusBadgeTextWarning: {
    color: "#b45309",
  },
  metaText: {
    fontSize: scale(11.5),
    color: "#93ca82",
    marginTop: scale(3),
  },
  actionsRow: {
    flexDirection: "row",
    gap: scale(14),
    marginTop: scale(8),
  },
  actionTextAccent: {
    fontSize: scale(12),
    fontWeight: "500",
    color: "#378ADD",
  },
  actionTextDanger: {
    fontSize: scale(12),
    fontWeight: "500",
    color: "#ef4444",
  },
  actionTextPrimary: {
    fontSize: scale(12),
    fontWeight: "700",
    color: "#7fcf8c",
  },
  actionTextSecondary: {
    fontSize: scale(12),
    fontWeight: "500",
    color: "#6b7280",
  },
  emptyText: {
    textAlign: "center",
    color: "#9ca3af",
    fontSize: scale(13),
    marginTop: scale(40),
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: scale(40),
  },
  iosModalCard: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: scale(14),
    overflow: "hidden",
    paddingTop: scale(18),
    paddingHorizontal: scale(16),
  },
  iosModalTitle: {
    fontSize: scale(15),
    fontWeight: "600",
    color: "#111827",
    textAlign: "center",
    marginBottom: scale(4),
  },
  iosModalDescription: {
    fontSize: scale(12.5),
    color: "#6b7280",
    textAlign: "center",
    lineHeight: scale(17),
    paddingBottom: scale(16),
  },
  iosDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#d1d5db",
    marginHorizontal: -scale(16),
  },
  iosButtonsRow: {
    flexDirection: "row",
    marginHorizontal: -scale(16),
  },
  iosButton: {
    flex: 1,
    height: scale(44),
    alignItems: "center",
    justifyContent: "center",
  },
  iosButtonDivider: {
    width: StyleSheet.hairlineWidth,
    backgroundColor: "#d1d5db",
  },
  iosButtonTextCancel: {
    fontSize: scale(14.5),
    color: "#378ADD",
    fontWeight: "500",
  },
  iosButtonTextDanger: {
    fontSize: scale(14.5),
    color: "#ef4444",
    fontWeight: "600",
  },
});

export default MyOrders;

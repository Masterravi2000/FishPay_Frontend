import {
  StyleSheet,
  View,
  TouchableOpacity,
  Vibration,
  Image,
} from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import TextScallingFalse from "../components/CentralText/TextScalingFalse";
import LogoIcon from "../components/svgIcons/LogoIcon";
import CommonHeader from "../components/Header/CommonHeader";
import GooglePayIcon from "../components/svgIcons/PaymentOptionsIcons/GooglePayIcon";
import PaypalIcon from "../components/svgIcons/PaymentOptionsIcons/PaypalIcon";
import MasterCardIcon from "../components/svgIcons/PaymentOptionsIcons/MasterCardIcon";
import TickMarkBlackCircleIcon from "../components/svgIcons/TickMarkIcons/TickMarkBlackCircleIcon";
import UnTickBlackCircleIcon from "../components/svgIcons/TickMarkIcons/UnTickBlackCircleItem";
import SecureTickIcon from "../components/svgIcons/TickMarkIcons/SecureTickIcon";
import AddPaymentButton from "../components/BottomButtons/AddPaymentButton";
import MasterCard from "../components/CreditCards/MasterCard";
import AddCardSection from "../components/CreditCards/AddCardSection";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import RazorpayCheckout from "react-native-razorpay";
import MapImg from "../../assets/Extra_Images/MapImg.jpeg";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useDispatch } from "react-redux";
import { verifySignature } from "../features/checkout/thunk/verifySignaturePayload";

type RootStackParamList = {
  Product: undefined;
  Home: undefined;
  Payment: undefined;
  PaymentStatus: { paymentData: any };
};

const PaymentScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [selectedId, setSelectedId] = useState<number | null>(1);
  const { orderId, amount } = useSelector((state: RootState) => state.payment);
  const checkoutData = useSelector((state: RootState) => state.checkout);
  const dispatch = useDispatch();

  const paymentOptionsDetails = [
    {
      id: 1,
      name: "Master Card",
      number: "********8463",
      logo: <MasterCardIcon />,
    },
    {
      id: 2,
      name: "Paypal",
      number: "orb*****@gmail.com",
      logo: <PaypalIcon />,
    },
    {
      id: 3,
      name: "Google Pay",
      number: "oks*****vi@gmail.com",
      logo: <GooglePayIcon />,
    },
  ];

  const select = (id: number) => {
    Vibration.vibrate([0, 50]);
    setSelectedId(id);
  };

  const paymentOption = paymentOptionsDetails.map((option, i) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => select(option.id)}
        key={i}
        style={styles.paymentOptionButtons}
      >
        <View style={styles.paymentOptionView}>
          <View style={styles.paymentOptionLogo}>{option.logo}</View>
          <View style={styles.paymentOptionNameDetail}>
            <TextScallingFalse style={styles.paymentOptionNameText}>
              {option.name}
            </TextScallingFalse>
            <TextScallingFalse style={styles.paymentOptionDetailText}>
              {option.number}
            </TextScallingFalse>
          </View>
        </View>
        <View style={styles.paymentOptionTickMarkContainer}>
          {selectedId === option.id ? (
            <TickMarkBlackCircleIcon />
          ) : (
            <UnTickBlackCircleIcon />
          )}
        </View>
      </TouchableOpacity>
    );
  });

  const EXPO_RAZORPAY_KEY_ID = process.env.EXPO_PUBLIC_RAZORPAY_KEY_ID;

  const handlePayNow = async () => {
    const options = {
      key: EXPO_RAZORPAY_KEY_ID,
      amount: (amount ?? 0) * 100,
      currency: "INR",
      name: "FishPay",
      description: "Test Transaction",
      order_id: orderId,
      method: "upi",
    };
    try {
      const data = await RazorpayCheckout.open(options);
      //now prepare payload for verify-signature endpoint
      const verifySignaturePayload = {
        razorpayPaymentId: data.razorpay_payment_id,
        razorpayOrderId: data.razorpay_order_id,
        razorpaySignature: data.razorpay_signature,
        userId: checkoutData.userId ?? 1,
        amount: checkoutData.amount,
        paymentMethod: "",
        products: checkoutData.products,
        deliveryCharges: checkoutData.deliveryCharges,
        totalAmount: checkoutData.totalAmount
      }
      dispatch(verifySignature(verifySignaturePayload) as any);
      navigation.navigate("PaymentStatus", {
        paymentData: data,
      });
    } catch (error) {
      console.log("Payment Failed:", error);
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.paymentPageView}>
        {/* Header */}
        <CommonHeader
          title="Payment"
          rightComponent={
            <View style={styles.LogoContainer}>
              <View style={styles.LogoView}>
                <LogoIcon />
              </View>
            </View>
          }
        />
        {/* Payment Options */}
        {/* <View style={styles.paymentOptionContainer}>
          <View style={styles.paymentOptionWhiteBackground}>
            {paymentOption}
            <View />
            <AddPaymentButton />
          </View>
        </View> */}

        {/* Card section */}
        {/* <View style={styles.cardContainer}>
          {selectedId === 1 ? <MasterCard /> : <AddCardSection />}
        </View> */}

        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
          }}
        >
          <LottieView
            source={require("../../assets/animations/Wallet.json")}
            autoPlay
            loop
            style={{ width: 200, height: 200 }}
          />
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <TextScallingFalse
              style={{ color: "#303030", fontSize: 25, fontWeight: "500" }}
            >
              Order Status
            </TextScallingFalse>
            <TextScallingFalse
              style={{ color: "#707070", fontSize: 15, fontWeight: "500" }}
            >
              Waiting for your payment
            </TextScallingFalse>
          </View>
        </View>

        <View
          style={{
            width: "100%",
            paddingHorizontal: 15,
            paddingVertical: 15,
            position: "absolute",
            bottom: "37%",
            zIndex: 100,
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 20,
              padding: 10,
              flexDirection: "row",
              gap: 15,
              alignItems: "center",
            }}
          >
            <Image
              style={{ width: 65, height: 65, borderRadius: 15 }}
              source={MapImg}
            />
            <View style={{ gap: 2 }}>
              <TextScallingFalse
                style={{ color: "#303030", fontSize: 18, fontWeight: "500" }}
              >
                Home
              </TextScallingFalse>
              <TextScallingFalse
                style={{
                  color: "#bbbbbb",
                  fontSize: 10,
                  fontWeight: "500",
                  width: 200,
                }}
              >
                47/1 Dr. C.P Aunukami Road North Costal Region Vizak 700023
              </TextScallingFalse>
            </View>
          </View>
        </View>

        {/* Bottom Dashboard */}
        <View style={styles.bottomDashboardView}>
          <View style={styles.bottomDashboardContainer}>
            <TextScallingFalse style={styles.bottomDashboardHeaderText}>
              Order Details
            </TextScallingFalse>
            <View style={styles.bottomDashboardDetailContainer}>
              <View style={styles.bottomDashboardDetailsView}>
                <TextScallingFalse style={styles.bottomDashboardDetailsText}>
                  Merchant
                </TextScallingFalse>
                <TextScallingFalse style={styles.bottomDashboardDetailsText}>
                  Merchant Store
                </TextScallingFalse>
              </View>
              <View style={styles.bottomDashboardDetailsView}>
                <TextScallingFalse style={styles.bottomDashboardDetailsText}>
                  Order ID
                </TextScallingFalse>
                <TextScallingFalse style={styles.bottomDashboardDetailsText}>
                  {`${orderId?.slice(0, 3)}##...${orderId?.slice(-10)}`}
                </TextScallingFalse>
              </View>
              <View style={styles.bottomDashboardDetailsView}>
                <TextScallingFalse style={styles.bottomDashboardDetailsText}>
                  Amount
                </TextScallingFalse>
                <TextScallingFalse style={styles.priceText}>
                  ₹{amount}.00
                </TextScallingFalse>
              </View>
            </View>
            {/* Paynow Button */}
            <View style={{ paddingVertical: 20 }}>
              <View style={styles.extraView} />
              <TouchableOpacity
                onPress={handlePayNow}
                activeOpacity={0.9}
                style={styles.payNowButton}
              >
                <TextScallingFalse style={styles.payNowButtonText}>
                  Pay Now
                </TextScallingFalse>
              </TouchableOpacity>
              {/* Bottom mark */}
              <View style={styles.bottomMarkContainer}>
                <SecureTickIcon color={"#f7805c"} />
                <TextScallingFalse style={styles.bottomMarkText}>
                  Powered by FishPay
                </TextScallingFalse>
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  LogoView: {
    borderWidth: 1.5,
    borderRadius: 200,
    borderColor: "#f7805c",
    padding: 7,
  },
  LogoContainer: {
    paddingLeft: 15,
  },
  paymentOptionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  paymentOptionView: {
    flexDirection: "row",
    gap: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  paymentOptionLogo: {
    width: 45,
    height: 45,
    backgroundColor: "#f3f3f3",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  paymentOptionNameDetail: {
    flexDirection: "row",
    gap: 20,
  },
  paymentOptionNameText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#505050",
  },
  paymentOptionDetailText: {
    fontSize: 12,
    fontWeight: "400",
    color: "#bebebe",
  },
  paymentOptionTickMarkContainer: {
    padding: 5,
  },
  paymentPageView: {
    width: "100%",
    height: "100%",
    backgroundColor: "#f3f3f3",
  },
  paymentOptionContainer: {
    width: "100%",
    paddingVertical: 5,
    paddingHorizontal: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  paymentOptionWhiteBackground: {
    borderRadius: 20,
    backgroundColor: "white",
    width: "100%",
    padding: 15,
    gap: 10,
  },
  bottomDashboardView: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    paddingHorizontal: 15,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomDashboardContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    width: "100%",
    padding: 17,
  },
  bottomDashboardHeaderText: {
    color: "#303030",
    fontSize: 20,
    fontWeight: "400",
  },
  bottomDashboardDetailContainer: {
    paddingVertical: 15,
    gap: 10,
  },
  bottomDashboardDetailsView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bottomDashboardDetailsText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#777777",
  },
  priceText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#404040",
  },
  extraView: {
    paddingTop: 5,
  },
  payNowButton: {
    backgroundColor: "#252525",
    paddingVertical: 13,
    borderRadius: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  payNowButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },
  bottomMarkContainer: {
    flexDirection: "row",
    paddingTop: 14,
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  bottomMarkText: {
    color: "#f7805c",
    fontSize: 10,
    fontWeight: "500",
  },
  cardContainer: {
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
});

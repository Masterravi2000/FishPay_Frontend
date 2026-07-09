import {
  StyleSheet,
  ActivityIndicator,
  View,
  Animated,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import TextScallingFalse from "../components/CentralText/TextScalingFalse";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import LottieView from "lottie-react-native";
import { Audio } from "expo-av";
import SecureTickIcon from "../components/svgIcons/TickMarkIcons/SecureTickIcon";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { getInvoiceStatusApi } from "../features/payment/paymentApi";
import * as FileSystem from "expo-file-system/legacy";
import * as Sharing from "expo-sharing";

type RootStackParamList = {
  PaymentStatus: undefined;
  OrderTrack: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const PaymentStatusScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { loading, verifyResponse } = useSelector(
    (state: RootState) => state.payment,
  );
  const [invoiceUrl, setInvoiceUrl] = useState<string | null>(null);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const translateYAnim = useRef(new Animated.Value(20)).current;
  const textTranslateY = useRef(new Animated.Value(20)).current;
  const invoiceOpacity = useRef(new Animated.Value(0)).current;
  const invoiceTranslateY = useRef(new Animated.Value(20)).current;
  const successSound = useRef<Audio.Sound | null>(null);
  const invoiceSound = useRef<Audio.Sound | null>(null);
  const isSucess = verifyResponse?.paymentStatus === "SUCCESS";

  useEffect(() => {
    const loadSounds = async () => {
      const { sound: success } = await Audio.Sound.createAsync(
        require("../../assets/sounds/sucess.wav"),
      );

      const { sound: invoice } = await Audio.Sound.createAsync(
        require("../../assets/sounds/invoice.wav"),
      );

      successSound.current = success;
      invoiceSound.current = invoice;
    };

    loadSounds();

    return () => {
      successSound.current?.unloadAsync();
      invoiceSound.current?.unloadAsync();
    };
  }, []);

  useEffect(() => {
    if (!verifyResponse?.paymentId) return;

    const interval = setInterval(async () => {
      const response = await getInvoiceStatusApi(verifyResponse?.paymentId);

      if (response?.invoiceUrl) {
        setInvoiceUrl(response?.invoiceUrl);
        clearInterval(interval);
      }
    }, 750);

    return () => clearInterval(interval);
  }, [verifyResponse?.paymentId]);

  useEffect(() => {
    if (!isSucess) return;

    scaleAnim.setValue(1);
    translateYAnim.setValue(100);
    textTranslateY.setValue(100);
    invoiceOpacity.setValue(0);
    invoiceTranslateY.setValue(20);

    const timer = setTimeout(async () => {
      await successSound.current?.replayAsync();
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 0.7,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(translateYAnim, {
          toValue: -70,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(textTranslateY, {
          toValue: -80,
          duration: 600,
          useNativeDriver: true,
        }),
      ]).start(async () => {
        await invoiceSound.current?.replayAsync();
        Animated.parallel([
          Animated.timing(invoiceOpacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(invoiceTranslateY, {
            toValue: -50,
            duration: 500,
            useNativeDriver: true,
          }),
        ]).start();
      });
    }, 1200);

    return () => clearTimeout(timer);
  }, [isSucess]);

  const products = () => {
    return verifyResponse?.products.map((product: any) => {
      return (
        <View key={product.productId} style={{ flexDirection: "row" }}>
          <TextScallingFalse style={styles.invoiceDetailsText}>
            {product?.productName} {product?.quantity}
          </TextScallingFalse>
          <TextScallingFalse style={styles.invoiceDetailsTextAnswers}>
            : ₹{product.price * product.quantity}.00
          </TextScallingFalse>
        </View>
      );
    });
  };

  const lowerCount = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
  ];
  const show = () => {
    return lowerCount.map((items, key) => {
      return <View key={key} style={styles.invoiceBottomDots} />;
    });
  };

  const downloadInvoice = async () => {
    if (!invoiceUrl) return;

    const fileUri = FileSystem.documentDirectory + "invoice.pdf";

    const result = await FileSystem.downloadAsync(invoiceUrl, fileUri);

    await Sharing.shareAsync(result.uri);
  };

  return (
    <View
      style={[
        styles.paymentStatusPageView,
        { backgroundColor: isSucess ? "#4ec92f" : "orange" },
      ]}
    >
      <View style={styles.bodyComponentsView}>
        {/* tickmark component */}
        <Animated.View
          style={{
            transform: [{ scale: scaleAnim }, { translateY: translateYAnim }],
          }}
        >
          {isSucess ? (
            <LottieView
              source={require("../../assets/animations/success.json")}
              autoPlay
              loop={false}
              style={{ width: 150, height: 150 }}
            />
          ) : (
            <View style={{ paddingVertical: 50, transform: [{ scale: 2.5 }] }}>
              <ActivityIndicator size="large" color="white" />
            </View>
          )}
        </Animated.View>

        {/* Payment Successfull text component */}
        <Animated.View
          style={{
            transform: [{ translateY: textTranslateY }],
          }}
        >
          <TextScallingFalse style={styles.paymentSucessfullText}>
            {isSucess ? "Payment Successful" : "Loading..."}
          </TextScallingFalse>
        </Animated.View>

        {/* Invoice */}
        <Animated.View
          style={{
            width: "100%",
            opacity: invoiceOpacity,
            transform: [{ translateY: invoiceTranslateY }],
          }}
        >
          <View style={styles.invoiceComponentView}>
            <View style={styles.invoiceComponentBackground}>
              <View style={styles.invoicePaymentDetailsView}>
                <TextScallingFalse style={styles.invoiceDetailsHeader}>
                  Payment Details
                </TextScallingFalse>
                <View style={styles.invoicePaymentDetailsComponent}>
                  <View style={styles.invoiceDetailsQuesAnsView}>
                    <TextScallingFalse style={styles.invoiceDetailsText}>
                      Invoice Number
                    </TextScallingFalse>
                    <TextScallingFalse style={styles.invoiceDetailsTextAnswers}>
                      : {verifyResponse?.invoiceNumber}
                    </TextScallingFalse>
                  </View>
                  <View style={styles.invoiceDetailsQuesAnsView}>
                    <TextScallingFalse style={styles.invoiceDetailsText}>
                      Order Time
                    </TextScallingFalse>
                    <TextScallingFalse style={styles.invoiceDetailsTextAnswers}>
                      : {verifyResponse?.orderTime}
                    </TextScallingFalse>
                  </View>
                  <View style={styles.invoiceDetailsQuesAnsView}>
                    <TextScallingFalse style={styles.invoiceDetailsText}>
                      Payment Method
                    </TextScallingFalse>
                    <TextScallingFalse style={styles.invoiceDetailsTextAnswers}>
                      : {verifyResponse?.paymentMethod}
                    </TextScallingFalse>
                  </View>
                  <View style={styles.invoiceDetailsQuesAnsView}>
                    <TextScallingFalse style={styles.invoiceDetailsText}>
                      Payment Status
                    </TextScallingFalse>
                    <TextScallingFalse style={styles.invoiceDetailsTextAnswers}>
                      : {verifyResponse?.paymentStatus}
                    </TextScallingFalse>
                  </View>
                </View>
              </View>

              <View style={styles.invoiceCutView}>
                <View
                  style={[
                    styles.invoiceCutsMiddle,
                    { borderTopRightRadius: 10, borderBottomRightRadius: 10 },
                  ]}
                />
                <View style={styles.invoiceCutsLine} />
                <View
                  style={[
                    styles.invoiceCutsMiddle,
                    { borderTopLeftRadius: 10, borderBottomLeftRadius: 10 },
                  ]}
                />
              </View>

              <View style={styles.invoiceProductDetails}>
                <View style={styles.invoiceProductDetailsTextView}>
                  <TextScallingFalse style={styles.invoiceDetailsHeader}>
                    Product Details
                  </TextScallingFalse>
                  {products()}
                  <View style={styles.invoiceDetailsQuesAnsView}>
                    <TextScallingFalse style={styles.invoiceDetailsText}>
                      Delivery Charges
                    </TextScallingFalse>
                    <TextScallingFalse style={styles.invoiceDetailsTextAnswers}>
                      : {verifyResponse?.deliveryCharges}
                    </TextScallingFalse>
                  </View>
                  <View style={styles.invoiceDetailsQuesAnsView}>
                    <TextScallingFalse style={styles.invoiceDetailsText}>
                      Total Amount
                    </TextScallingFalse>
                    <TextScallingFalse style={styles.invoiceDetailsTextAnswers}>
                      : ₹{verifyResponse?.totalAmount}.00
                    </TextScallingFalse>
                  </View>
                </View>
                <View style={styles.downloadButtonGap} />
                <TouchableOpacity
                  onPress={downloadInvoice}
                  style={styles.invoiceDownloadButton}
                >
                  <TextScallingFalse style={styles.invoiceDownloadButtonText}>
                    Download PDF Receipt
                  </TextScallingFalse>
                </TouchableOpacity>
              </View>
              <View style={styles.invoiceBottomView}>{show()}</View>
            </View>
          </View>
        </Animated.View>
      </View>

      <Animated.View
        style={[styles.bottomBarView, { opacity: invoiceOpacity }]}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("OrderTrack")}
          activeOpacity={0.7}
          style={styles.skipForNowButton}
        >
          <TextScallingFalse style={styles.skipForNowText}>
            Skip for now
          </TextScallingFalse>
        </TouchableOpacity>
        <View style={styles.bottomMarkContainer}>
          <SecureTickIcon color={"#ececec"} />
          <TextScallingFalse style={styles.bottomMarkText}>
            Powered by FishPay
          </TextScallingFalse>
        </View>
      </Animated.View>
    </View>
  );
};

export default PaymentStatusScreen;

const styles = StyleSheet.create({
  invoiceDetailsText: {
    color: "#a0a0a0",
    fontSize: 10,
    fontWeight: "600",
    width: "48%",
  },
  invoiceDetailsTextAnswers: {
    color: "#505050",
    fontSize: 10,
    fontWeight: "500",
  },
  paymentStatusPageView: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  bodyComponentsView: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  paymentSucessfullText: {
    color: "white",
    fontSize: 23,
    fontWeight: "700",
  },
  invoiceComponentView: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  invoicePaymentDetailsView: {
    backgroundColor: "white",
    padding: 20,
    paddingTop: 20,
    width: "100%",
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  invoiceDetailsHeader: {
    fontSize: 13,
    fontWeight: "500",
    color: "#414141",
  },
  invoicePaymentDetailsComponent: {
    gap: 12,
    paddingTop: 10,
  },
  invoiceDetailsQuesAnsView: {
    flexDirection: "row",
  },
  invoiceCutView: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    alignItems: "center",
  },
  invoiceCutsMiddle: {
    width: 10,
    height: 17,
    backgroundColor: "#4ec92f",
  },
  invoiceCutsLine: {
    width: "88%",
    borderStyle: "dashed",
    borderTopWidth: 1.5,
    borderTopColor: "#dddddd",
  },
  invoiceProductDetails: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: "100%",
  },
  invoiceProductDetailsTextView: {
    gap: 12,
  },
  downloadButtonGap: {
    paddingVertical: 12,
  },
  invoiceDownloadButton: {
    padding: 10,
    borderRadius: 8,
    width: "100%",
    backgroundColor: "#c5c5c5",
    justifyContent: "center",
    alignItems: "center",
  },
  invoiceDownloadButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#383838",
  },
  invoiceBottomDots: {
    backgroundColor: "#4ec92f",
    width: 15,
    height: 7,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  invoiceBottomView: {
    width: "100%",
    flexDirection: "row",
    gap: 2.8,
    paddingHorizontal: 3,
    paddingTop: 8,
    justifyContent: "center",
    marginBottom: -1,
  },
  invoiceComponentBackground: {
    width: "100%",
    backgroundColor: "white",
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  bottomMarkContainer: {
    flexDirection: "row",
    paddingTop: 14,
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  bottomMarkText: {
    color: "#ececec",
    fontSize: 10,
    fontWeight: "500",
  },
  bottomBarView: {
    position: "absolute",
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 30,
    width: "100%",
  },
  skipForNowButton: {
    paddingHorizontal: 40,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 50,
  },
  skipForNowText: {
    fontSize: 13,
    fontWeight: "500",
    color: "white",
  },
});

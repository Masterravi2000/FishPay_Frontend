import { StyleSheet, ActivityIndicator, View, Animated } from "react-native";
import React, { useEffect, useRef } from "react";
import TextScallingFalse from "../components/CentralText/TextScalingFalse";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import LottieView from "lottie-react-native";

const PaymentStatusScreen = () => {
  const { loading, verifyResponse } = useSelector(
    (state: RootState) => state.payment,
  );
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const translateYAnim = useRef(new Animated.Value(0)).current;
  const textTranslateY = useRef(new Animated.Value(0)).current;
  const invoiceTranslateY = useRef(new Animated.Value(-300)).current;
  const isSucess = verifyResponse?.paymentStatus === "SUCCESS";

  useEffect(() => {
    if (!isSucess) return;
    console.log(verifyResponse)
    scaleAnim.setValue(1);
    translateYAnim.setValue(0);
    textTranslateY.setValue(0);
    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 0.6,
          duration: 600,
          useNativeDriver: true,
        }),

        Animated.timing(translateYAnim, {
          toValue: -330,
          duration: 600,
          useNativeDriver: true,
        }),

        Animated.timing(textTranslateY, {
          toValue: -230,
          duration: 600,
          useNativeDriver: true,
        }),
      ]).start();
    }, 1200); // Wait for the Lottie animation to finish
    return () => clearTimeout(timer);
  }, [isSucess]);

  useEffect(() => {
    if (!isSucess) return;
    const timer = setTimeout(() => {
      Animated.sequence([
        Animated.timing(invoiceTranslateY, {
          toValue: -200,
          duration: 250,
          useNativeDriver: true,
        }),

        Animated.delay(150),

        Animated.timing(invoiceTranslateY, {
          toValue: -100,
          duration: 250,
          useNativeDriver: true,
        }),

        Animated.delay(150),

        Animated.timing(invoiceTranslateY, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start();
    }, 2000);
    return () => clearTimeout(timer);
  }, [isSucess]);

  const products = () => {
    return verifyResponse?.products.map((product: any) => {
      return (
        <TextScallingFalse
          key={product.productId}
          style={styles.invoiceDetailsText}
        >
          {product?.productName} {product?.quantity}
        </TextScallingFalse>
      );
    });
  };
  const productPrice = () => {
    return verifyResponse?.products.map((product: any) => {
      return (
        <TextScallingFalse
          key={product.productId}
          style={styles.invoiceDetailsTextAnswers}
        >
          : {product.price * product.quantity}
        </TextScallingFalse>
      );
    });
  };

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: isSucess ? "#4ec92f" : "orange",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* tickmark component */}
      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
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
            <ActivityIndicator size="large" color="white" />
          )}
        </Animated.View>
        <Animated.View
          style={{
            transform: [{ translateY: textTranslateY }],
          }}
        >
          <TextScallingFalse
            style={{ color: "white", fontSize: 23, fontWeight: "700" }}
          >
            {isSucess ? "Payment Successful" : "Loading..."}
          </TextScallingFalse>
        </Animated.View>

        <Animated.View
          style={{
            position: "absolute",
            top: -20, // adjust as needed
            left: 0,
            right: 0,
            transform: [{ translateY: invoiceTranslateY }],
          }}
        >
          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 40,
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                padding: 15,
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
                width: "100%",
              }}
            >
              <View style={{ gap: 12, paddingTop: 7 }}>
                <TextScallingFalse
                  style={{ fontSize: 13, fontWeight: "500", color: "#414141" }}
                >
                  Payment Details
                </TextScallingFalse>
                <View style={{ flexDirection: "row" }}>
                  <View
                    style={{
                      gap: 10,
                      width: "48%",
                    }}
                  >
                    <TextScallingFalse style={styles.invoiceDetailsText}>
                      Invoice Number
                    </TextScallingFalse>
                    <TextScallingFalse style={styles.invoiceDetailsText}>
                      Order Time
                    </TextScallingFalse>
                    <TextScallingFalse style={styles.invoiceDetailsText}>
                      Payment Method
                    </TextScallingFalse>
                    <TextScallingFalse style={styles.invoiceDetailsText}>
                      Payment Status
                    </TextScallingFalse>
                  </View>

                  <View
                    style={{
                      gap: 10,
                      width: "50%",
                    }}
                  >
                    <TextScallingFalse style={styles.invoiceDetailsTextAnswers}>
                      : {verifyResponse?.invoiceNumber}
                    </TextScallingFalse>
                    <TextScallingFalse style={styles.invoiceDetailsTextAnswers}>
                      : {verifyResponse?.orderTime}
                    </TextScallingFalse>
                    <TextScallingFalse style={styles.invoiceDetailsTextAnswers}>
                      : {verifyResponse?.paymentMethod}
                    </TextScallingFalse>
                    <TextScallingFalse style={styles.invoiceDetailsTextAnswers}>
                      : {verifyResponse?.paymentStatus}
                    </TextScallingFalse>
                  </View>
                </View>

                <View style={{ gap: 12, paddingTop: 7 }}>
                  <TextScallingFalse
                    style={{
                      fontSize: 13,
                      fontWeight: "500",
                      color: "#414141",
                    }}
                  >
                    Product Details
                  </TextScallingFalse>
                  <View style={{ flexDirection: "row" }}>
                    <View
                      style={{
                        gap: 10,
                        width: "48%",
                      }}
                    >
                      {products()}
                      <TextScallingFalse style={styles.invoiceDetailsText}>
                        Order Time
                      </TextScallingFalse>
                      <TextScallingFalse style={styles.invoiceDetailsText}>
                        Payment Method
                      </TextScallingFalse>
                      <TextScallingFalse style={styles.invoiceDetailsText}>
                        Payment Status
                      </TextScallingFalse>
                    </View>

                    <View
                      style={{
                        gap: 10,
                        width: "50%",
                      }}
                    >
                      {productPrice()}
                      <TextScallingFalse
                        style={styles.invoiceDetailsTextAnswers}
                      >
                        : {verifyResponse?.deliveryCharges}
                      </TextScallingFalse>
                      <TextScallingFalse
                        style={styles.invoiceDetailsTextAnswers}
                      >
                        : {verifyResponse?.paymentMethod}
                      </TextScallingFalse>
                      <TextScallingFalse
                        style={styles.invoiceDetailsTextAnswers}
                      >
                        : {verifyResponse?.paymentStatus}
                      </TextScallingFalse>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Animated.View>
      </View>
    </View>
  );
};

export default PaymentStatusScreen;

const styles = StyleSheet.create({
  invoiceDetailsText: {
    color: "#a0a0a0",
    fontSize: 10,
    fontWeight: "600",
  },
  invoiceDetailsTextAnswers: {
    color: "#505050",
    fontSize: 10,
    fontWeight: "500",
  },
});

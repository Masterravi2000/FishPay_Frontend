import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import TextScallingFalse from "../components/CentralText/TextScalingFalse";
import LogoIcon from "../components/svgIcons/LogoIcon";
import CommonHeader from "../components/Header/CommonHeader";
import LottieView from "lottie-react-native";

const OrderTrackScreen = () => {
  return (
    <SafeAreaView>
      <View style={styles.paymentPageView}>
        {/* Header */}
        <CommonHeader
          title="Order Track"
          rightComponent={
            <View style={styles.LogoContainer}>
              <View style={styles.LogoView}>
                <LogoIcon />
              </View>
            </View>
          }
        />
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
            loop={false}
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
              Payment confirmed
            </TextScallingFalse>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OrderTrackScreen;

const styles = StyleSheet.create({
  paymentPageView: {
    width: "100%",
    height: "100%",
    backgroundColor: "#f3f3f3",
  },
  LogoContainer: {
    paddingLeft: 15,
  },
  LogoView: {
    borderWidth: 1.5,
    borderRadius: 200,
    borderColor: "#f7805c",
    padding: 7,
  },
});

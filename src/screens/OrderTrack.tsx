import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import TextScallingFalse from "../components/CentralText/TextScalingFalse";
import LogoIcon from "../components/svgIcons/LogoIcon";
import CommonHeader from "../components/Header/CommonHeader";
import LottieView from "lottie-react-native";
import DeliveryTimeline from "../components/cards/DeliveryTimeline";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import UserIcon from "../components/svgIcons/CreditCards/UserIcon";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  PaymentStatus: undefined;
  OrderTrack: undefined;
  MyProfile: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const OrderTrack = () => {
  const { loading, verifyResponse } = useSelector(
    (state: RootState) => state.payment,
  );
  const navigation = useNavigation<NavigationProp>();
  return (
    <SafeAreaView>
      <View style={styles.paymentPageView}>
        {/* Header */}
        <CommonHeader
          title="Order Track"
          rightComponent={
            <View style={styles.LogoContainer}>
              <TouchableOpacity activeOpacity={0.6} onPress={()=>navigation.navigate('MyProfile')}>
                <View style={styles.LogoView}>
                  <UserIcon />
                </View>
              </TouchableOpacity>
            </View>
          }
        />
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LottieView
            source={require("../../assets/animations/packing.json")}
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
              Packing Started
            </TextScallingFalse>
          </View>
        </View>
        <View style={{ paddingTop: 50 }} />
        <DeliveryTimeline
          orderTime={verifyResponse?.orderTime?.split(" ")[0]}
        />
      </View>
    </SafeAreaView>
  );
};

export default OrderTrack;

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
    borderColor: "#3b3b3b",
    padding: 7,
  },
});

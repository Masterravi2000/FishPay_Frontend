import { StyleSheet, ActivityIndicator, View } from "react-native";
import React from "react";
import TextScallingFalse from "../components/CentralText/TextScalingFalse";

const PaymentStatusScreen = () => {
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "orange",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={{ transform: [{ scale: 2 }], paddingVertical: 30}}>
        <ActivityIndicator size="large" color="white" />
      </View>
      <TextScallingFalse
        style={{ color: "white", fontSize: 25, fontWeight: "500" }}
      >
        Loading..
      </TextScallingFalse>
    </View>
  );
};

export default PaymentStatusScreen;

const styles = StyleSheet.create({});

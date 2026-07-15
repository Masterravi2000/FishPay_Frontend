import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import TextScallingFalse from "../CentralText/TextScalingFalse";

const CheckoutButton = ({handlePayment}:{handlePayment: () => void}) => {
  return (
    <TouchableOpacity
    activeOpacity={0.95}
    onPress={handlePayment}
      style={{
        width: "100%",
        borderRadius: 200,
        paddingVertical: 14,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#252525",
      }}
    >
      <TextScallingFalse
        style={{ color: "white", fontSize: 16, fontWeight: "500" }}
      >
        Proceed to Checkout
      </TextScallingFalse>
    </TouchableOpacity>
  );
};

export default CheckoutButton;

const styles = StyleSheet.create({});

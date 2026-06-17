import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import TextScallingFalse from "../CentralText/TextScalingFalse";

const AddPaymentButton = () => {
  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.addPaymentMethodButton}>
      <TextScallingFalse style={styles.addPaymentMethodText}>
        + Add Payment Method
      </TextScallingFalse>
    </TouchableOpacity>
  );
};

export default AddPaymentButton;

const styles = StyleSheet.create({
  addPaymentMethodButton: {
    borderRadius: 200,
    width: "100%",
    backgroundColor: "#f3f3f3",
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  addPaymentMethodText: {
    color: "#777777",
    fontSize: 13,
    fontWeight: "500",
  },
});

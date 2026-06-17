import { StyleSheet, View } from "react-native";
import React from "react";
import TextScallingFalse from "../CentralText/TextScalingFalse";

const MainTotalSection = () => {
  return (
    <View style={{ width: "100%", paddingVertical: 15, paddingHorizontal: 5 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TextScallingFalse
          style={{ fontSize: 20, fontWeight: "500", color: "#252525" }}
        >
          Total:
        </TextScallingFalse>
        <TextScallingFalse
          style={{ fontSize: 19, fontWeight: "500", color: "#252525" }}
        >
          ₹1321 INR
        </TextScallingFalse>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TextScallingFalse
          style={{ fontSize: 12, fontWeight: "500", color: "#cecece" }}
        >
          Order and get 34 points
        </TextScallingFalse>
        <TextScallingFalse
          style={{ fontSize: 12, fontWeight: "500", color: "#cecece" }}
        >
          Free shipping
        </TextScallingFalse>
      </View>
    </View>
  );
};

export default MainTotalSection;

const styles = StyleSheet.create({});

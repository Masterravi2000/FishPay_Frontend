import { StyleSheet, TextInput, View } from "react-native";
import React from "react";
import CouponIcon from "../svgIcons/CouponIcon";

const CouponCodeEnter = () => {
  return (
    <View style={{ width: "100%", paddingHorizontal: 3 }}>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#f3f3f3",
          borderRadius: 200,
          alignItems: "center",
        }}
      >
        <View style={{ paddingVertical: 10, paddingHorizontal: 18 }}>
          <CouponIcon />
        </View>
        <TextInput
          placeholder="Add coupon code"
          placeholderTextColor={"#c7c7c7"}
          style={{ color: "gray", fontWeight: "500" }}
        />
      </View>
    </View>
  );
};

export default CouponCodeEnter;

const styles = StyleSheet.create({});

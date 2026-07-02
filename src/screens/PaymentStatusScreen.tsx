import { StyleSheet, ActivityIndicator, View } from "react-native";
import React from "react";
import TextScallingFalse from "../components/CentralText/TextScalingFalse";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import LogoIcon from "../components/svgIcons/LogoIcon";

const PaymentStatusScreen = () => {
  const { loading, verifyResponse } = useSelector(
    (state: RootState) => state.payment,
  );
  const isSucess = verifyResponse?.paymentStatus === "SUCCESS";
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: isSucess ? "#4cd12b" : "orange",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={{ transform: [{ scale: 2 }], paddingVertical: 30 }}>
        {isSucess ? (
          <LogoIcon />
        ) : (
          <ActivityIndicator size="large" color="white" />
        )}
      </View>
      <TextScallingFalse
        style={{ color: "white", fontSize: 25, fontWeight: "500" }}
      >
        {isSucess ? "Sucess" : "Loading..."}
      </TextScallingFalse>
    </View>
  );
};

export default PaymentStatusScreen;

const styles = StyleSheet.create({});

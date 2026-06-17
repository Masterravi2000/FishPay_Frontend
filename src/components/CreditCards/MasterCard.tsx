import { StyleSheet, Text, View } from "react-native";
import React from "react";
import TextScallingFalse from "../CentralText/TextScalingFalse";
import { LinearGradient } from "expo-linear-gradient";

const MasterCard = () => {
  return (
    <View
      style={{
        width: "98%",
        height: 191,
        alignSelf: "center",
        borderRadius: 20,
        padding: 24,
        justifyContent: "space-between",
        overflow: "hidden",
        backgroundColor: "#0F172A",
      }}
    >
      {/* Gradient Background */}
      <LinearGradient
        colors={["#000000", "#111827", "#374151"]}
        style={StyleSheet.absoluteFillObject}
      />

      <TextScallingFalse
        style={{
          color: "white",
          fontSize: 13,
          fontWeight: "600",
        }}
      >
        Mastercard
      </TextScallingFalse>

      <TextScallingFalse
        style={{
          color: "white",
          fontSize: 22,
          letterSpacing: 3,
          fontWeight: "500",
          width: "80%",
        }}
      >
        5412 7512 3412 3456
      </TextScallingFalse>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <View>
          <TextScallingFalse style={{ color: "#A1A1AA", fontSize: 8 }}>
            CARD HOLDER
          </TextScallingFalse>
          <TextScallingFalse style={{ color: "white", fontSize: 13 }}>
            Ravi Sharma
          </TextScallingFalse>
        </View>

        <View style={{ alignItems: "flex-end" }}>
          <TextScallingFalse style={{ color: "#A1A1AA", fontSize: 8 }}>
            EXPIRES
          </TextScallingFalse>
          <TextScallingFalse style={{ color: "white", fontSize: 13 }}>
            12/29
          </TextScallingFalse>
        </View>
      </View>

      {/* Mastercard Logo */}
      <View
        style={{
          position: "absolute",
          right: 20,
          top: 20,
          flexDirection: "row",
        }}
      >
        <View
          style={{
            width: 30,
            height: 30,
            borderRadius: 15,
            backgroundColor: "#EB001B",
          }}
        />
        <View
          style={{
            width: 30,
            height: 30,
            borderRadius: 15,
            backgroundColor: "#F79E1B",
            marginLeft: -10,
          }}
        />
      </View>
    </View>
  );
};

export default MasterCard;

const styles = StyleSheet.create({});

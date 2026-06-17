import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import BackButtonSvg from "../svgIcons/BackButton";
import TextScallingFalse from "../CentralText/TextScalingFalse";

interface CommonHeaderProps {
  title: string;
  rightComponent?: React.ReactNode;
}

const CommonHeader = ({ title, rightComponent }: CommonHeaderProps) => {
  const navigation = useNavigation();
  return (
    <View style={styles.HeaderView}>
      <TouchableOpacity onPress={navigation.goBack} style={styles.BackButton}>
        <BackButtonSvg />
      </TouchableOpacity>
      <TextScallingFalse style={styles.HeaderText}>{title}</TextScallingFalse>
      {rightComponent ?? <View style={styles.extraView} />}
    </View>
  );
};

export default CommonHeader;

const styles = StyleSheet.create({
  HeaderView: {
    width: "100%",
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  BackButton: {
    width: "15%",
    height: 40,
    justifyContent: "center",
  },
  HeaderText: {
    color: "#252525",
    fontSize: 16,
    fontWeight: "600",
  },
  extraView: {
    width: "15%",
  },
});

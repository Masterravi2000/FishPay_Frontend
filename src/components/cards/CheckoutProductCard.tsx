import { StyleSheet, Image, View, TouchableOpacity, ImageSourcePropType } from "react-native";
import React from "react";
import TextScallingFalse from "../CentralText/TextScalingFalse";
import CrossIcon from "../svgIcons/CrossIcon";

interface CheckoutProductCardProps {
  image: ImageSourcePropType;
  title: string;
  price: number;
  pcs: string;
  quantity: number;
}

const CheckoutProductCard = ({
  image,
  title,
  price,
  pcs,
  quantity,
}: CheckoutProductCardProps) => {
  return (
    <View style={styles.mainView}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={image} />
      </View>
      <View style={styles.productDetailsContainer}>
        <View style={styles.titleContainer}>
          <View>
            <TextScallingFalse style={styles.titleText}>
              {title}
            </TextScallingFalse>
            <TextScallingFalse style={styles.pcsText}>{pcs}</TextScallingFalse>
          </View>
          <TouchableOpacity style={styles.crossIcon}>
            <CrossIcon />
          </TouchableOpacity>
        </View>
        <View style={styles.priceQuantContainer}>
          <TextScallingFalse style={styles.priceText}>
            ₹{price} INR
          </TextScallingFalse>
          <View style={styles.quantButton}>
            <TouchableOpacity style={styles.removeButton}>
              <TextScallingFalse style={styles.removeText}>-</TextScallingFalse>
            </TouchableOpacity>
            <TextScallingFalse style={styles.quantityText}>
              {quantity}
            </TextScallingFalse>
            <TouchableOpacity style={styles.addButton}>
              <TextScallingFalse style={styles.addText}>+</TextScallingFalse>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CheckoutProductCard;

const styles = StyleSheet.create({
  mainView: {
    flexDirection: "row",
    gap: 23,
    width: "100%",
    paddingVertical: 18,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#dddddd",
    borderStyle: "dashed",
  },
  imageContainer: {
    width: 93,
    height: 93,
    backgroundColor: "orange",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  productDetailsContainer: {
    justifyContent: "space-between",
  },
  titleContainer: {
    flexDirection: "row",
  },
  titleText: {
    color: "#252525",
    fontSize: 14,
    fontWeight: "500",
    width: 170,
  },
  pcsText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#bbbbbb",
    paddingVertical: 2,
  },
  crossIcon: {
    padding: 5,
    alignItems: "center",
  },
  priceQuantContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceText: {
    color: "#353535",
    fontSize: 16,
    fontWeight: "500",
  },
  quantButton: {
    borderWidth: 1,
    borderColor: "#bbbbbb",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 100,
    paddingHorizontal: 5,
  },
  removeButton: {
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  removeText: {
    color: "#252525",
    fontSize: 17,
    fontWeight: "500",
  },
  quantityText: {
    color: "#252525",
    fontSize: 15,
    fontWeight: "500",
    padding: 5,
  },
  addButton: {
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  addText: {
    color: "#252525",
    fontSize: 15,
    fontWeight: "500",
  },
});

import {
  StyleSheet,
  Image,
  View,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButtonSvg from "../components/svgIcons/BackButton";
import TextScallingFalse from "../components/CentralText/TextScalingFalse";
import StarIcon from "../components/svgIcons/StarIcon";
import StockIcon from "../components/svgIcons/EcomIcons/StockIcon";
import ShippingIcon from "../components/svgIcons/EcomIcons/ShippingIcon";
import ShopIcon from "../components/svgIcons/EcomIcons/ShopIcon";
import ShoppingBagIcon from "../components/svgIcons/EcomIcons/ShoppingBag";
import HeartIcon from "../components/svgIcons/HeartIcon";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");
const images = [
  require("../../assets/Products_Images/PropolisLight.png"),
  require("../../assets/Products_Images/CreamImg2.jpg"),
  require("../../assets/Products_Images/CreamImg3.png")
];

const ProductScreen = () => {
  const navigation = useNavigation()
  const [addItem, setAddItem] = useState(2);
  const [selected, setSelected]= useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const onScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const additem = () => {
    setAddItem(addItem + 1);
  };

  const reset = () => {
    setAddItem(2);
    setSelected(false)
  }

  const ml = () => {
    setSelected(true)
  }

  return (
    <SafeAreaView
      style={{ width: "100%", height: "100%", backgroundColor: "white" }}
    >
      {/* Header */}
      <View
        style={{
          width: "100%",
          paddingVertical: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 25,
        }}
      >
        <BackButtonSvg />
        <View style={{ position: "relative", paddingLeft: 20 }}>
          <TouchableOpacity activeOpacity={0.6} onPress={()=>navigation.navigate("Home" as never)}>
            <ShoppingBagIcon />
          </TouchableOpacity>

          <View
            style={{
              position: "absolute",
              top: -5,
              right: -5,
              width: 18,
              height: 18,
              borderRadius: 9,
              backgroundColor: "#e72424",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextScallingFalse
              style={{ color: "#fff", fontSize: 10, fontWeight: "bold" }}
            >
              {addItem}
            </TextScallingFalse>
          </View>
        </View>
      </View>
      {/* Product Image showcase */}
      <View>
        <FlatList
          data={images}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          onMomentumScrollEnd={onScrollEnd}
          renderItem={({ item }) => (
            <Image
              source={item}
              style={{
                width: width,
                height: 315,
                resizeMode: "cover",
              }}
            />
          )}
        />

        {/* Pagination Dots */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 10,
          }}
        >
          {images.map((_, index) => (
            <View
              key={index}
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                marginHorizontal: 4,
                backgroundColor: currentIndex === index ? "#9b9b9b" : "#dddddd",
              }}
            />
          ))}
        </View>
      </View>
      {/* Product details */}
      <View
        style={{ width: "100%", paddingHorizontal: 20, paddingVertical: 20 }}
      >
        <TextScallingFalse
          style={{ color: "#d4d4d4", fontSize: 15, fontWeight: "500" }}
        >
          COSRX
        </TextScallingFalse>
        <TextScallingFalse
          style={{ color: "#303030", fontSize: 20, fontWeight: "500" }}
        >
          Propolis Light Cream
        </TextScallingFalse>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 2 }}>
          <StarIcon />
          <TextScallingFalse
            style={{ color: "#707070", fontSize: 14, fontWeight: "500" }}
          >
            4.8 (217 Reviews)
          </TextScallingFalse>
        </View>
        <View style={{ flexDirection: "row", gap: 10, paddingVertical: 14 }}>
          <TextScallingFalse
            style={{ color: "#707070", fontSize: 18, fontWeight: "500" }}
          >
            ₹332.00 INR
          </TextScallingFalse>
          <View
            style={{
              width: 45,
              paddingVertical: 3,
              borderRadius: 7,
              backgroundColor: "#cefdb3",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextScallingFalse
              style={{ fontSize: 13, fontWeight: "500", color: "#61c035" }}
            >
              -20%
            </TextScallingFalse>
          </View>
        </View>
        <View style={{ flexDirection: "row", gap: 7 }}>
          <TouchableOpacity
          activeOpacity={0.8}
          onPress={ml}
            style={{
              paddingHorizontal: 15,
              paddingVertical: 5,
              borderWidth: 1,
              borderRadius: 100,
              borderColor: selected? '#303030': "#dddddd",
            }}
          >
            <TextScallingFalse
              style={{
                color: "#707070",
                fontSize: 13,
                fontWeight: "600",
                alignSelf: "center",
              }}
            >
              30ml
            </TextScallingFalse>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              paddingHorizontal: 15,
              paddingVertical: 5,
              borderWidth: 1,
              borderRadius: 100,
              borderColor: "#dddddd",
            }}
          >
            <TextScallingFalse
              style={{
                color: "#707070",
                fontSize: 13,
                fontWeight: "600",
                alignSelf: "center",
              }}
            >
              100ml
            </TextScallingFalse>
          </TouchableOpacity>
        </View>
        <View style={{ gap: 10, paddingTop: 20 }}>
          <View style={{ flexDirection: "row", gap: 6, alignItems: "center" }}>
            <StockIcon />
            <TextScallingFalse
              style={{ color: "#85e658", fontSize: 13, fontWeight: "500" }}
            >
              In stock
            </TextScallingFalse>
          </View>
          <View style={{ flexDirection: "row", gap: 6, alignItems: "center" }}>
            <ShippingIcon />
            <TextScallingFalse
              style={{ color: "#bbbbbb", fontSize: 13, fontWeight: "500" }}
            >
              Free delivery
            </TextScallingFalse>
          </View>
          <View style={{ flexDirection: "row", gap: 6, alignItems: "center" }}>
            <ShopIcon />
            <TextScallingFalse
              style={{ color: "#bbbbbb", fontSize: 13, fontWeight: "500" }}
            >
              Available in the nearest store
            </TextScallingFalse>
          </View>
          <TextScallingFalse
            style={{ color: "#999999", fontSize: 14, fontWeight: 500 }}
          >
            An exfoliating toner targeting dullness, texture and sign of aging.
            Suited to all skin types.
          </TextScallingFalse>
        </View>
      </View>
      {/* Bottom Add to Cart Section */}
      <View
        style={{
          position: "absolute",
          bottom: 0,
          paddingHorizontal: 25,
          paddingVertical: 20,
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <TouchableOpacity
        onPress={reset}
          style={{
            borderWidth: 1,
            borderColor: "#dddddd",
            padding: 17,
            borderRadius: 15,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <HeartIcon />
        </TouchableOpacity>
        {addItem === 2 ? (
          <TouchableOpacity
            onPress={additem}
            activeOpacity={0.8}
            style={{
              borderRadius: 15,
              backgroundColor: "#93ca82",
              paddingHorizontal: 88,
              paddingVertical: 15,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextScallingFalse
              style={{ color: "#398d1f", fontSize: 17, fontWeight: "600" }}
            >
              Add to Cart
            </TextScallingFalse>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={additem}
            activeOpacity={0.8}
            style={{
              borderRadius: 15,
              borderColor: "#93ca82",
              borderWidth: 1,
              paddingHorizontal: 78,
              paddingVertical: 15,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextScallingFalse
              style={{ color: "#398d1f", fontSize: 17, fontWeight: "600" }}
            >
              Added to Cart
            </TextScallingFalse>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({});

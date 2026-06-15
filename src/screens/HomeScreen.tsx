import { View, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { createOrder } from "../features/payment/paymentThunk";
import { SafeAreaView } from "react-native-safe-area-context";
import CheckoutProductCard from "../components/cards/CheckoutProductCard";
import productImg1 from "../../assets/Products_Images/GreenPropolis.jpg";
import productImg2 from "../../assets/Products_Images/PropolisLight.png";
import productImg3 from "../../assets/Products_Images/RealFlawless.jpg";
import CouponCodeEnter from "../components/Coupons/CouponCodeEnter";
import MainTotalSection from "../components/SubTotals/MainTotalSection";
import CheckoutButton from "../components/BottomButtons/CheckoutButton";
import CommonHeader from "../components/Header/CommonHeader";

export default function HomeScreen() {
  const dispatch = useDispatch();

  const handlePayment = () => {
    dispatch(
      createOrder({
        amount: 500,
        currency: "INR",
      }) as any,
    );
  };

  const CartProductListDetails = [
    {
      id: 1,
      image: productImg1,
      title: "Green Propolis Ampule Mask",
      pcs: "50pcs",
      price: 505.0,
      quantity: 1,
    },
    {
      id: 2,
      image: productImg2,
      title: "Propolis Light Cream",
      pcs: "100ml",
      price: 332.0,
      quantity: 1,
    },
    {
      id: 3,
      image: productImg3,
      title: "Real Flawless Luminous Perfecting Pressed",
      pcs: "Transluctent",
      price: 484.0,
      quantity: 1,
    },
  ];

  const CartProductList = CartProductListDetails.map((item, i) => {
    return (
      <CheckoutProductCard
        key={i}
        image={item.image}
        title={item.title}
        price={item.price}
        pcs={item.pcs}
        quantity={item.quantity}
      />
    );
  });

  return (
    <SafeAreaView>
      <View style={styles.MainPageView}>
        {/* header */}
        <CommonHeader
        title="Shopping cart"/>

        {/* Checkout Products Lists */}
        <View style={styles.checkoutProductListView}>{CartProductList}</View>

        {/* Buttom DashBoard */}
        <View style={styles.BottomDashboardView}>
          <CouponCodeEnter />
          <MainTotalSection />
          <CheckoutButton />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  MainPageView: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    alignContent: "center",
  },
  checkoutProductListView: {
    paddingHorizontal: 22,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  BottomDashboardView: {
    padding: 20,
    position: "absolute",
    width: "100%",
    bottom: 0,
    borderWidth: 1,
    borderColor: "#e9e9e9",
  },
});

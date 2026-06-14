import { Button, Touchable, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { createOrder } from "../features/payment/paymentThunk";
import BackButtonSvg from "../components/svgIcons/BackButton";
import TextScallingFalse from "../components/CentralText/TextScalingFalse";
import { SafeAreaView } from "react-native-safe-area-context";
import CheckoutProductCards from "../components/cards/checkoutProductCards";

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

  return (
    <SafeAreaView>
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        alignContent: "center"
      }}
    >
      {/* header */}
      <View
        style={{
          width: "100%",
          paddingVertical: 10,
          paddingHorizontal: 15,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems:'center'
        }}
      >
        <TouchableOpacity style={{width: '15%', height: 40, justifyContent:'center'}}>
          <BackButtonSvg />
        </TouchableOpacity>
        <TextScallingFalse
          style={{ color: "#252525", fontSize: 18, fontWeight: "500" }}
        >
          Shopping Cart
        </TextScallingFalse>
        <View style={{width:'15%'}}/>
      </View>

      {/* Checkout Products Lists */}
      <View style={{padding: 10, width:'100%', backgroundColor:'purple', alignItems:'center', justifyContent:'center'}}>
        <CheckoutProductCards />
      </View>

    </View>
    </SafeAreaView>
  );
}

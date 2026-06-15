import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import TextScallingFalse from "../components/CentralText/TextScalingFalse";
import LogoIcon from "../components/svgIcons/LogoIcon";
import CommonHeader from "../components/Header/CommonHeader";
import GooglePayIcon from "../components/svgIcons/PaymentOptionsIcons/GooglePayIcon";
import PaypalIcon from "../components/svgIcons/PaymentOptionsIcons/PaypalIcon";
import MasterCardIcon from "../components/svgIcons/PaymentOptionsIcons/MasterCardIcon";
import TickMarkBlackCircleIcon from "../components/svgIcons/TickMarkIcons/TickMarkBlackCircleIcon";
import UnTickBlackCircleIcon from "../components/svgIcons/TickMarkIcons/UnTickBlackCircleItem";
import SecureTickIcon from "../components/svgIcons/TickMarkIcons/SecureTickIcon";

const PaymentScreen = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const paymentOptionsDetails = [
    {
      id: 1,
      name: "Master Card",
      number: "********8463",
      logo: <MasterCardIcon />,
    },
    {
      id: 2,
      name: "Paypal",
      number: "orb*****@gmail.com",
      logo: <PaypalIcon />,
    },
    {
      id: 3,
      name: "Google Pay",
      number: "oks*****vi@gmail.com",
      logo: <GooglePayIcon />,
    },
  ];

  const select = (id: number) => {
    setSelectedId(id);
  };

  const paymentOption = paymentOptionsDetails.map((option, i) => {
    return (
      <TouchableOpacity
      activeOpacity={1}
      onPress={() => select(option.id)}
        key={i}
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 15,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 45,
              height: 45,
              backgroundColor: "#f3f3f3",
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {option.logo}
          </View>
          <View style={{ flexDirection: "row", gap: 20 }}>
            <TextScallingFalse
              style={{ fontSize: 13, fontWeight: "600", color: "#505050" }}
            >
              {option.name}
            </TextScallingFalse>
            <TextScallingFalse
              style={{ fontSize: 12, fontWeight: "400", color: "#bebebe" }}
            >
              {option.number}
            </TextScallingFalse>
          </View>
        </View>
        <View
          style={{ padding: 5 }}
        >
          {selectedId === option.id ? (
            <TickMarkBlackCircleIcon />
          ) : (
            <UnTickBlackCircleIcon />
          )}
        </View>
      </TouchableOpacity>
    );
  });

  return (
    <SafeAreaView>
      <View
        style={{ width: "100%", height: "100%", backgroundColor: "#f3f3f3" }}
      >
        {/* Header */}
        <CommonHeader
          title="Payment Methods"
          rightComponent={
            <View style={styles.LogoView}>
              <LogoIcon />
            </View>
          }
        />
        {/* Payment Options */}
        <View
          style={{
            width: "100%",
            padding: 15,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              borderRadius: 20,
              backgroundColor: "white",
              width: "100%",
              padding: 15,
              gap: 10,
            }}
          >
            {paymentOption}
            <View/>
            <TouchableOpacity activeOpacity={0.7} style={{borderRadius: 200, width:'100%', backgroundColor:'#f3f3f3', paddingVertical: 12, justifyContent:'center', alignItems:'center'}}>
                <TextScallingFalse style={{color:'#777777', fontSize: 13, fontWeight:'500'}}>+  Add Payment Method</TextScallingFalse>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom Dashboard */}
        <View style={{width:'100%', position:'absolute', bottom: 0, backgroundColor:'#f3f3f3', padding: 15, justifyContent:'center', alignItems:'center'}}>
            <View style={{backgroundColor:'white', borderRadius: 20, width:'100%',  padding: 17}}>
                <TextScallingFalse style={{color:'#303030', fontSize: 20, fontWeight:'400'}}>Order Details</TextScallingFalse>
                <View style={{paddingVertical: 15, gap: 10}}>
                                        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                        <TextScallingFalse style={{fontSize: 12, fontWeight: '500', color:'#777777'}}>Merchant</TextScallingFalse>
                        <TextScallingFalse style={{fontSize: 12, fontWeight: '500', color:'#777777'}}>Demo Store</TextScallingFalse>
                    </View>
                                        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                        <TextScallingFalse style={{fontSize: 12, fontWeight: '500', color:'#777777'}}>Order ID</TextScallingFalse>
                        <TextScallingFalse style={{fontSize: 12, fontWeight: '500', color:'#777777'}}>FP1234567890</TextScallingFalse>
                    </View>
                                        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                        <TextScallingFalse style={{fontSize: 12, fontWeight: '500', color:'#777777'}}>Amount</TextScallingFalse>
                        <TextScallingFalse style={{fontSize: 16, fontWeight: '600', color:'#404040'}}>₹1321.00</TextScallingFalse>
                    </View>
                </View>
                {/* Paynow Button */}
                <View>
                    <View style={{paddingTop: 5}}/>
                <TouchableOpacity style={{backgroundColor:'green', paddingVertical: 12, borderRadius: 200, justifyContent:'center', alignItems:'center'}}>
                    <TextScallingFalse style={{color:'white', fontSize: 14, fontWeight:'500'}}>Pay Now</TextScallingFalse>
                </TouchableOpacity>
                                {/* Bottom mark */}
                <View style={{flexDirection:'row', paddingTop: 14, alignItems:'center', justifyContent:'center', gap: 5}}>
                    <SecureTickIcon />
                    <TextScallingFalse style={{color:"#cccccc", fontSize: 10, fontWeight: '500'}}>Powered by FishPay</TextScallingFalse>
                </View>
                </View>
            </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  LogoView: {
    paddingLeft: 30,
  },
});

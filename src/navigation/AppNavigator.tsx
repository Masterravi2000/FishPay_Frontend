import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import PaymentScreen from "../screens/PaymentScreen";
import ProductScreen from "../screens/ProductScreen";
import PaymentStatusScreen from "../screens/PaymentStatusScreen";
import OrderTrack from "../screens/OrderTrack";
import MyProfile from "../screens/MyProfile";
import InvoiceHistory from "../screens/InvoiceHistory";


const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Product"
        screenOptions={{ headerShown: false, animation: "none" }}
      >
        <Stack.Screen name="Product" component={ProductScreen} />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "FishPay" }}
        />
        <Stack.Screen name="Payment" component={PaymentScreen} />
        <Stack.Screen name="PaymentStatus" component={PaymentStatusScreen} />
        <Stack.Screen name="OrderTrack" component={OrderTrack} />
        <Stack.Screen name="MyProfile" component={MyProfile} />
        <Stack.Screen name="InvoiceHistory" component={InvoiceHistory} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

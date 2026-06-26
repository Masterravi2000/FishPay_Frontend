import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import PaymentScreen from "../screens/PaymentScreen";
import ProductScreen from "../screens/ProductScreen";

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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

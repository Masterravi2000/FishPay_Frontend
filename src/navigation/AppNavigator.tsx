import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import PaymentScreen from "../screens/PaymentScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, animation: "none"}}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "FishPay" }}
        />
        <Stack.Screen name="Payment" component={PaymentScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

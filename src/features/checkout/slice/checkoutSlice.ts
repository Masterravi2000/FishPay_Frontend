import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
}

interface CheckoutState {
    userId: number | null;
    amount: number;
    deliveryCharges: number;
    totalAmount: number;
    products: Product[];
}

const initialState: CheckoutState = {
    userId: null,
    amount: 0,
    deliveryCharges: 0,
    totalAmount: 0,
    products: [],
}

const checkoutSlice = createSlice({
    name: "checkout",
    initialState,
    reducers: {
        saveCheckoutData: (state, action: PayloadAction<CheckoutState>) => {
            state.userId = action.payload.userId;
            state.amount = action.payload.amount;
            state.deliveryCharges = action.payload.deliveryCharges;
            state.totalAmount = action.payload.totalAmount;
            state.products = action.payload.products;
        },
        clearCheckoutData: () => initialState,
    }
});

export const { saveCheckoutData, clearCheckoutData } = checkoutSlice.actions;
export default checkoutSlice.reducer;
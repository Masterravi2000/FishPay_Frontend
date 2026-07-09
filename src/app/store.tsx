import { configureStore } from "@reduxjs/toolkit";
import paymentReducer from "../features/payment/paymentSlice";
import checkoutReducer from "../features/checkout/slice/checkoutSlice";
import invoiceReducer from "../features/invoice/invoiceSlice";

export const store = configureStore({
  reducer: {
    payment: paymentReducer,
    checkout : checkoutReducer,
    invoices: invoiceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
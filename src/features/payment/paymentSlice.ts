import { createSlice } from "@reduxjs/toolkit";
import { createOrder } from "./paymentThunk";

interface PaymentState {
  loading: boolean;
  orderId: string | null;
  amount: number | null;
  currency: string | null;
  status: string | null;
  error: string | null;
}

const initialState: PaymentState = {
  loading: false,
  orderId: null,
  amount: null,
  currency: null,
  status: null,
  error: null,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })

      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orderId = action.payload.id;
        state.amount = action.payload.amount;
        state.currency = action.payload.currency;
        state.status = action.payload.status;
      })

      .addCase(createOrder.rejected, (state) => {
        state.loading = false;
        state.error = "Order creation failed";
      });
  },
});

export default paymentSlice.reducer;
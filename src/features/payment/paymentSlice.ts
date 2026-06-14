import { createSlice } from "@reduxjs/toolkit";
import { createOrder } from "./paymentThunk";

interface PaymentState {
  loading: boolean;
  orderId: string | null;
  error: string | null;
}

const initialState: PaymentState = {
  loading: false,
  orderId: null,
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
        state.orderId = action.payload.orderId;
      })

      .addCase(createOrder.rejected, (state) => {
        state.loading = false;
        state.error = "Order creation failed";
      });
  },
});

export default paymentSlice.reducer;
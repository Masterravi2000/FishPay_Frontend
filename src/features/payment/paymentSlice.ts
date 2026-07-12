import { createSlice } from "@reduxjs/toolkit";
import { createOrder, fetchPaymentHistory } from "./paymentThunk";
import { verifySignature } from "../checkout/thunk/verifySignaturePayload";

interface PaymentState {
  loading: boolean;
  loadingMore: boolean;
  orderId: string | null;
  amount: number | null;
  currency: string | null;
  status: string | null;
  error: string | null;
  verifyResponse: any | null;
  payments: any[];
}

const initialState: PaymentState = {
  loading: false,
  loadingMore: false,
  orderId: null,
  amount: null,
  currency: null,
  status: null,
  error: null,
  verifyResponse: null,
  payments: [],
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

    //for create order
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
      })

      //for verify signature
      .addCase(verifySignature.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifySignature.fulfilled, (state, action) => {
        state.loading = false;
        state.verifyResponse = action.payload;
      })
      .addCase(verifySignature.rejected, (state) => {
        state.loading = false;
        state.error = "Signature verification failed";
      })

      // for payment history
      .addCase(fetchPaymentHistory.pending, (state, action) => {
        if (action.meta.arg.page && action.meta.arg.page > 0) {
          state.loadingMore = true;
        } else {
          state.loading = true;
        }
        state.error = null;
      })
      .addCase(fetchPaymentHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.loadingMore = false;
        if (action.payload.page === 0) {
          state.payments = action.payload.payments;
        } else {
          state.payments = [...state.payments, ...action.payload.payments];
        }
      })
      .addCase(fetchPaymentHistory.rejected, (state, action) => {
        state.loading = false;
        state.loadingMore = false;
        state.error = action.payload as string;
      });
  },
});

export default paymentSlice.reducer;

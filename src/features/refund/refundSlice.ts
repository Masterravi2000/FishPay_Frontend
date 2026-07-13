import { createSlice } from "@reduxjs/toolkit";
import { fetchRefundHistory, refundPayment } from "./refundThunk";

interface RefundState {
  loading: boolean;
  loadingMore: boolean;
  success: boolean;
  refund: any;
  error: string | null;
  refunds: any[];
  totalRefunds: number;
  totalRefundAmount: number;
  totalRefundsInProgress: number;
}

const initialState: RefundState = {
  loading: false,
  loadingMore: false,
  success: false,
  refund: null,
  error: null,
  refunds: [],
  totalRefunds: 0,
  totalRefundAmount: 0,
  totalRefundsInProgress: 0,
};

const refundSlice = createSlice({
  name: "refund",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      //for create refund
      .addCase(refundPayment.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(refundPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.refund = action.payload;
      })
      .addCase(refundPayment.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      })

      //for fetch refund history
      .addCase(fetchRefundHistory.pending, (state, action) => {
        if (action.meta.arg.page && action.meta.arg.page > 0) {
          state.loadingMore = true;
        } else {
          state.loading = true;
        }
        state.error = null;
      })
      .addCase(fetchRefundHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.loadingMore = false;
        if (action.payload.page === 0) {
          state.refunds = action.payload.refunds;
        } else {
          state.refunds = [...state.refunds, ...action.payload.refunds];
        }
        state.totalRefunds = action.payload.totalRefunds;
        state.totalRefundAmount = action.payload.totalRefundAmount;
        state.totalRefundsInProgress = action.payload.totalRefundsInProgress;
      })
      .addCase(fetchRefundHistory.rejected, (state, action) => {
        state.loading = false;
        state.loadingMore = false;
        state.error = action.payload as string;
      });
  },
});

export default refundSlice.reducer;

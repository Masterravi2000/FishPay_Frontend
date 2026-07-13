import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createRefund,
  CreateRefundRequest,
  getRefundHistory,
} from "./refundApi";

export const refundPayment = createAsyncThunk(
  "refund/createRefund",
  async (data: CreateRefundRequest, thunkAPI) => {
    try {
      const response = await createRefund(data);
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || "Refund Failed");
    }
  },
);

export const fetchRefundHistory = createAsyncThunk<
  {
    totalRefunds: number;
    totalRefundAmount: number;
    totalRefundsInProgress: number;
    refunds: any[];
    page: number;
    totalPage: number;
  },
  { page?: number; size?: number }
>("refund/refundHistory", async ({ page = 0, size = 10 }, thunkAPI) => {
  try {
    const data = await getRefundHistory(page, size);
    return { ...data, page };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response?.data | error.message);
  }
});

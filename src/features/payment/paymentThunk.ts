import { createAsyncThunk } from "@reduxjs/toolkit";
import { createOrderApi, getPaymentHistory } from "./paymentApi";
import { CreateOrderRequest } from "./paymentTypes";

export const createOrder = createAsyncThunk(
  "payment/createOrder",
  async (data: CreateOrderRequest) => {
    return await createOrderApi(data);
  }
);

export const fetchPaymentHistory = createAsyncThunk<
{
  payments: any[];
  totalPayments: number;
  totalSuccessfulPayments: number;
  totalAmountPaid: number;
  page: number;
}, { page?: number; size?: number }
>("payment/fetchPaymentHistory", async ({page = 0, size = 20}, thunkAPI) => {
  try {
    const data = await getPaymentHistory(page, size);
    return {...data, page};
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});
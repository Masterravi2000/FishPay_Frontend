import { createAsyncThunk } from "@reduxjs/toolkit";
import { getInvoiceHistory } from "./invoiceApi";

export const fetchInvoiceHistory = createAsyncThunk<
  {
    invoices: any[];
    totalInvoice: number;
    totalAmountSpent: number;
    page: number;
  },
  { page?: number; size?: number }
>("invoice/fetchInvoiceHistory", 
    async ({ page = 0, size = 10 }, thunkAPI) => {
  try {
    const data = await getInvoiceHistory(page, size);
    return {...data, page};
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

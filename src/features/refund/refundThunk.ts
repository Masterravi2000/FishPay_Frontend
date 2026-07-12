import { createAsyncThunk } from "@reduxjs/toolkit";
import { createRefund, CreateRefundRequest } from "./refundApi";

export const refundPayment = createAsyncThunk(
    "refund/createRefund",
    async (data: CreateRefundRequest, thunkAPI) => {
        try {
            const response = await createRefund(data);
            return response;
        } catch (error: any) {
            return thunkAPI.rejectWithValue (
                error.response?.data || "Refund Failed"
            )
        }
    }
)
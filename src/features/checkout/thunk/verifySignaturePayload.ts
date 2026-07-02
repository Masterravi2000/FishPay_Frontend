import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

interface Product {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
}

export interface VerifySignatureRequest {
    razorpayPaymentId: string;
    razorpayOrderId: string;
    razorpaySignature: string;
    userId: number;
    amount: number;
    paymentMethod: string;
    products: Product[];
    deliveryCharges: number;
    totalAmount: number;
}

export const verifySignature = createAsyncThunk(
    "payment/verifySignature",
    async (payload: VerifySignatureRequest, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${BASE_URL}/api/v1/payments/verify-signature`,
                payload
            );
            return response.data;
        }
        catch (error: any) {
            return rejectWithValue(
                error.response?.data || "Signature verification failed"
            );
        }
    }
)
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createOrderApi } from "./paymentApi";
import { CreateOrderRequest } from "./paymentTypes";

export const createOrder = createAsyncThunk(
  "payment/createOrder",
  async (data: CreateOrderRequest) => {
    return await createOrderApi(data);
  }
);
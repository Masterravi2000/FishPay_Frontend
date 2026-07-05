import axios from "axios";
import {
  CreateOrderRequest,
  CreateOrderResponse,
} from "./paymentTypes";

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

export const createOrderApi = async (
  data: CreateOrderRequest
): Promise<CreateOrderResponse> => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/payments/create-order`,
      data
    );
    return response.data;
  } catch (error) {
    // You could log or handle the error here, or throw it for the thunk to handle.
    throw error;
  }
};

export const getInvoiceStatusApi = async (paymentId: string) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/invoices/invoice-status/${paymentId}`
    );

    return response.data;
  } catch (error) {
    throw error;
  }
}
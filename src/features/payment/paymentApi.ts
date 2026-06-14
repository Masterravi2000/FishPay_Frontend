import axios from "axios";
import {
  CreateOrderRequest,
  CreateOrderResponse,
} from "./paymentTypes";

const BASE_URL = "http://YOUR_IP:8080";

export const createOrderApi = async (
  data: CreateOrderRequest
): Promise<CreateOrderResponse> => {
  const response = await axios.post(
    `${BASE_URL}/api/v1/payments/create-order`,
    data
  );

  return response.data;
};
export interface CreateOrderRequest {
  amount: number;
  currency: string;
}

export interface CreateOrderResponse {
  orderId: string;
  amount: number;
  currency: string;
}
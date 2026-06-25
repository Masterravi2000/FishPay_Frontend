export interface CreateOrderRequest {
  amount: number;
  currency: string;
}

export interface CreateOrderResponse {
  id: string;
  amount: number;
  currency: string;
  status: string;
}
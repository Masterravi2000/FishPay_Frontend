import axiosInstance from "../../utils/api/axiosInstance";

export interface CreateRefundRequest {
    paymentId: string;
    amount: number;
    reason: string;
}

export const createRefund = async (data: CreateRefundRequest) => {
    const response = await axiosInstance.post(
        "/api/v1/refunds/refund",
        data
    );
    return response.data;
}
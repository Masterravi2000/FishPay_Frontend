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

export const getRefundHistory = async (
    page: number = 0,
    size: number = 10
) => {
    const response = await axiosInstance.get(
        `api/v1/refunds/history?page=${page}&size=${size}`
    );
    return response.data;
}
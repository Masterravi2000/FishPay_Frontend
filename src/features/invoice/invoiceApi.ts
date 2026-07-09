import axios from "axios";

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

export const getInvoiceHistory = async (
    page: number = 0,
    size: number = 10
) => {
    const response = await axios.get(
        `${BASE_URL}/api/v1/invoices/history?page=${page}&size=${size}`
    );
    return response.data;
}
import { createSlice } from "@reduxjs/toolkit";
import { fetchInvoiceHistory } from "./invoiceThunk"

interface InvoiceState {
    invoices: any[];
    loading: boolean;
    loadingMore: boolean;
    error: string | null;
    totalInvoice: number;
    totalAmountSpent: number;
}

const initialState: InvoiceState = {
    invoices: [],
    loading: false,
    loadingMore: false,
    error: null,
    totalInvoice: 0,
    totalAmountSpent: 0
}

const invoiceSlice = createSlice({
    name: "invoices",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder

        .addCase(fetchInvoiceHistory.pending, (state, action) => {
            if (action.meta.arg.page && action.meta.arg.page > 0) {
                state.loadingMore = true;
            } else {
                state.loading = true;
            }
            state.error = null;
        })

        .addCase(fetchInvoiceHistory.fulfilled, (state, action) => {
            state.loading = false;
            state.loadingMore = false;

            if (action.payload.page === 0) {
                state.invoices = action.payload.invoices;
            } else {
                state.invoices = [...state.invoices, ...action.payload.invoices];
            }

            state.totalInvoice = action.payload.totalInvoice;
            state.totalAmountSpent = action.payload.totalAmountSpent;
        })

        .addCase(fetchInvoiceHistory.rejected, (state, action) => {
            state.loading = false;
            state.loadingMore = false;
            state.error = action.payload as string;
        });
    },
});

export default invoiceSlice.reducer;
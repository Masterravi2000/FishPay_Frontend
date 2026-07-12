import { createSlice } from "@reduxjs/toolkit";
import { refundPayment } from "./refundThunk";


interface RefundState {
    loading: boolean;
    success: boolean;
    refund: any;
    error: string | null;
}

const initialState: RefundState = {
    loading: false,
    success: false,
    refund: null,
    error: null
};

const refundSlice = createSlice({
    name: "refund",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder

        .addCase(refundPayment.pending, (state) => {
            state.loading = true;
            state.success = false;
            state.error = null;
        })

        .addCase(refundPayment.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.refund  = action.payload;
        })

        .addCase(refundPayment.rejected, (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = action.payload as string;
        });
    },
})

export default refundSlice.reducer;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../api/axios'

interface PaymentState {
    clientSecret: string | null
    loading: boolean
    error: string | null
}

const initialState: PaymentState = {
    clientSecret: null,
    loading: false,
    error: null,
}

export const createDepositIntent = createAsyncThunk(
    'payment/deposit',
    async (amount: number, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.post('/payment/v1/deposit', {
                amount,
            })

            return res.data
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data?.message || 'Payment initiation failed'
            )
        }
    }
)

const paymentSlice = createSlice({
    name: 'payment',
    initialState,
    reducers: {
        clearPaymentState: (state) => {
            state.clientSecret = null
            state.error = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createDepositIntent.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(createDepositIntent.fulfilled, (state, action) => {
                state.loading = false
                state.clientSecret =
                    action.payload?.data?.client_secret || null
            })
            .addCase(createDepositIntent.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
    },
})

export const { clearPaymentState } = paymentSlice.actions
export default paymentSlice.reducer

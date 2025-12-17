import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../api/axios'

interface WalletState {
    withdrawals: any[]
    transactions: any[]
    wallet: null | any
    loading: boolean
    error: string | null
    successMessage: string | null
}

const initialState: WalletState = {
    withdrawals: [],
    transactions: [],
    wallet: null,
    loading: false,
    error: null,
    successMessage: null
}

// CREATE WITHDRAWAL
export const createWithdrawal = createAsyncThunk(
    'wallet/createWithdrawal',
    async (amount: number, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.post('/wallet/v1/withdraw', { amount })
            return res.data
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data?.message || 'Withdrawal failed'
            )
        }
    }
)

// GET ALL WITHDRAWALS
export const getWithdrawals = createAsyncThunk(
    'wallet/getWithdrawals',
    async (_, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.get('/wallet/v1/withdraw')
            return res.data
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data?.message || 'Failed to load withdrawals'
            )
        }
    }
)

// GET ALL transactions
export const getTransactions = createAsyncThunk(
    'wallet/getTransactions',
    async (_, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.get('/wallet/v1/getTransaction')
            return res.data
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data?.message || 'Failed to load withdrawals'
            )
        }
    }
)
// GET  wallet
export const getWallet = createAsyncThunk(
    'wallet/getWallet',
    async (_, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.get('/wallet/v1/getWallet')
            return res.data
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data?.message || 'Failed to load wallet'
            )
        }
    }
)
const walletSlice = createSlice({
    name: 'wallet',
    initialState,
    reducers: {
        clearWalletMessages: (state) => {
            state.error = null
            state.successMessage = null
        }
    },
    extraReducers: (builder) => {
        builder

            // CREATE WITHDRAWAL
            .addCase(createWithdrawal.pending, (state) => {
                state.loading = true
                state.error = null
                state.successMessage = null
            })
            .addCase(createWithdrawal.fulfilled, (state, action) => {
                state.loading = false
                state.successMessage = action.payload?.data || 'Withdrawal success'
            })
            .addCase(createWithdrawal.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })

            // GET WITHDRAWALS
            .addCase(getWithdrawals.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getWithdrawals.fulfilled, (state, action) => {
                state.loading = false
                state.withdrawals = action.payload?.data || []
            })
            .addCase(getWithdrawals.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
            // GET TRANSACTIONS
            .addCase(getTransactions.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getTransactions.fulfilled, (state, action) => {
                state.loading = false
                state.transactions = action.payload?.data || []
            })
            .addCase(getTransactions.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
            // GET wallet
            .addCase(getWallet.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getWallet.fulfilled, (state, action) => {
                state.loading = false
                state.wallet = action.payload?.data || {}
            })
            .addCase(getWallet.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })


    }
})

export const { clearWalletMessages } = walletSlice.actions
export default walletSlice.reducer

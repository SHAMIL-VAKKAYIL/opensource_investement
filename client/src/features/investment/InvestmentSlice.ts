import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../api/axios'

interface InvestmentState {
    activeInvestments: any[]
    loading: boolean
    error: string | null
    successMessage: string | null
}

const initialState: InvestmentState = {
    activeInvestments: [],
    loading: false,
    error: null,
    successMessage: null
}
// CREATE NEW INVESTMENT
export const createInvestment = createAsyncThunk(
    'investment/createInvestment',
    async (data: {
        amount: number
        planType: string
        expectedReturn: number
        durationDays: number
    }, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.post('/investment/v1/newInvestment', data)
            return res.data
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data?.message || 'Failed to create investment'
            )
        }
    }
)
// GET ACTIVE INVESTMENT
export const getActiveInvestments = createAsyncThunk(
    'investment/getActiveInvestments',
    async (_, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.get('/investment/v1/active')
            return res.data
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data?.message || 'Failed to load investments'
            )
        }
    }
)

const investmentSlice = createSlice({
    name: 'investment',
    initialState,
    reducers: {
        clearInvestmentState: (state) => {
            state.error = null
            state.successMessage = null
        }
    },
    extraReducers: (builder) => {
        builder

            // CREATE INVESTMENT
            .addCase(createInvestment.pending, (state) => {
                state.loading = true
                state.error = null
                state.successMessage = null
            })
            .addCase(createInvestment.fulfilled, (state, action) => {
                state.loading = false
                state.successMessage = action.payload?.data || 'Investment created'
            })
            .addCase(createInvestment.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })

            // GET ACTIVE INVESTMENTS
            .addCase(getActiveInvestments.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getActiveInvestments.fulfilled, (state, action) => {
                state.loading = false
                state.activeInvestments = action.payload?.data || []
            })
            .addCase(getActiveInvestments.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
    }
})

export const { clearInvestmentState } = investmentSlice.actions
export default investmentSlice.reducer

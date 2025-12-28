import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../api/axios'
import type { Investment } from '../../types/investment'

interface InvestmentState {
    activeInvestments: any[]
    investments: any[]
    loading: boolean
    error: string | null
    successMessage: string | null
}

const initialState: InvestmentState = {
    activeInvestments: [],
    investments: [],
    loading: false,
    error: null,
    successMessage: null
}
// CREATE NEW INVESTMENT
export const createInvestment = createAsyncThunk(
    'investment/createInvestment',
    async (data: Investment, { rejectWithValue }) => {
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

// GET  INVESTMENTS
export const getInvestments = createAsyncThunk(
    'investment/getInvestments',
    async (_, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.get('/investment/v1/investment')
            return res.data
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data?.message || 'Failed to load investments'
            )
        }
    }
)

export const updateInvestmentStatus = createAsyncThunk(
    'investment/updateStatus',
    async (
        { id, status }: { id: string; status: any },
        { rejectWithValue }
    ) => {
        try {
            const res = await axiosInstance.put(
                `/investment/v1/investment/${id}`,
                status
            )
            return res.data
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data?.message || 'Failed to update investment status'
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
                state.activeInvestments = action.payload?.message || []
            })
            .addCase(getActiveInvestments.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })

            // GET  INVESTMENTS
            .addCase(getInvestments.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getInvestments.fulfilled, (state, action) => {
                state.loading = false
                state.investments = action.payload?.message || []
            })
            .addCase(getInvestments.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })


            // UPDATE INVESTMENT STATUS
            .addCase(updateInvestmentStatus.pending, (state) => {
                state.loading = true
                state.error = null
                state.successMessage = null
            })
            .addCase(updateInvestmentStatus.fulfilled, (state, action) => {
                state.loading = false
                state.successMessage = 'Investment status updated'

                const updated = action.payload?.data
                if (!updated) return

                // update in investments list
                state.investments = state.investments.map((inv) =>
                    inv._id === updated._id ? updated : inv
                )

                // update in active investments if exists
                state.activeInvestments = state.activeInvestments.map((inv) =>
                    inv._id === updated._id ? updated : inv
                )
            })
            .addCase(updateInvestmentStatus.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })

    }
})

export const { clearInvestmentState } = investmentSlice.actions
export default investmentSlice.reducer

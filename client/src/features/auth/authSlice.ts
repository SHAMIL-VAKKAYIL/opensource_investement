import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../api/axios'

interface RegisterPayload {
    email: string
    password: string
}

interface AuthState {
    user: any | null
    token: string | null
    initialized: boolean
    loading: boolean
    error: string | null
}

export const register = createAsyncThunk(
    'auth/register',
    async (data: RegisterPayload, { rejectWithValue }) => {
        console.log(data);
        
        try {
            const res = await axiosInstance.post('/auth/v1/register', data)
            return res.data       // you MUST return the data
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data?.message || 'Registration failed'
            )
        }
    }
)

export const login = createAsyncThunk(
    'auth/login',
    async (data: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.post('/auth/v1/login', data)
            return res.data
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data?.message || 'Login failed'
            )
        }
    }
)

export const logout = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.post('/auth/v1/logout')
            return res.data
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data?.message || 'Logout failed'
            )
        }
    }
)

const initialState: AuthState = {
    user: null,
    token: null,
    initialized: false,
    loading: false,
    error: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            // REGISTER
            .addCase(register.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(register.fulfilled, (state) => {
                state.loading = false
                window.location.href='/login'
                // state.initialized = true
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })

            // LOGIN
            .addCase(login.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false
                state.initialized = true
                console.log(action.payload.message);
                
                state.user = action.payload?.message?.user || null
                state.token = action.payload?.message?.token || null
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })

            // LOGOUT
            .addCase(logout.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(logout.fulfilled, (state) => {
                state.loading = false
                state.user = null
                state.token = null
                state.initialized = false
            })
            .addCase(logout.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
    },
})

export default authSlice.reducer

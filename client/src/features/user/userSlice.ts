import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../api/axios'
import type { UserProfile } from '../../types/user'

interface UserState {
    users: any[]
    selectedUser: any | null
    loading: boolean
    error: string | null
}

const initialState: UserState = {
    users: [],
    selectedUser: null,
    loading: false,
    error: null
}

// GET ALL USERS
export const fetchUsers = createAsyncThunk(
    'user/fetchUsers',
    async (_, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.get('/user/v1/getusers')
            return res.data
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Failed to fetch users')
        }
    }
)

// GET SINGLE USER
export const fetchUser = createAsyncThunk(
    'user/fetchUser',
    async (id: string, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.get(`/user/v1/user/${id}`)
            console.log(res.data);
            
            return res.data
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Failed to fetch user')
        }
    }
)

// ADD USER EXTRA DATA
export const addUserData = createAsyncThunk(
    'user/addUserData',
    async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.put(`/user/v1/addData/${id}`, data)
            return res.data
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Failed to add user data')
        }
    }
)

// UPDATE USER
export const updateUser = createAsyncThunk(
    'user/updateUser',
    async ({ id, data }: { id: any; data: UserProfile }, { rejectWithValue }) => {
        console.log(data,id);
        
        try {
            const res = await axiosInstance.put(`/user/v1/update/${id}`, data)
            return res.data
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Failed to update user')
        }
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            // FETCH ALL USERS
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false
                state.users = action.payload?.data || []
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })

            // FETCH SINGLE USER
            .addCase(fetchUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.loading = false
                state.selectedUser = action.payload?.message || null
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })

            // ADD USER DATA
            .addCase(addUserData.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(addUserData.fulfilled, (state) => {
                state.loading = false
            })
            .addCase(addUserData.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })

            // UPDATE USER
            .addCase(updateUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(updateUser.fulfilled, (state) => {
                state.loading = false
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
    }
})

export default userSlice.reducer

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../api/axios'




export const register = createAsyncThunk(
    'auth/register',
    async (data) => {
        const res = await axiosInstance.post('/auth/v1/register',data)
        
    })


interface IinitialState {
    user: Object | null,
    initailized: boolean
}

const initialState: IinitialState = {
    user: null,
    initailized: false,


}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

    }
})

export default authSlice.reducer
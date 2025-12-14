import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../api/axios'

interface Notification {
    _id: string
    userId: string
    title?: string
    message?: string
    viewed: boolean
    createdAt?: string
}

interface NotificationState {
    notifications: Notification[]
    loading: boolean
    error: string | null
}

const initialState: NotificationState = {
    notifications: [],
    loading: false,
    error: null,
}

/**
 * Get notifications by user
 */
export const fetchNotificationsByUser = createAsyncThunk(
    'notification/fetchByUser',
    async (userId: string, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.get(
                `/notification/v1/user/${userId}`
            )
            return res.data
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data?.message || 'Failed to fetch notifications'
            )
        }
    }
)

/**
 * Mark notification as viewed
 */
export const markNotificationViewed = createAsyncThunk(
    'notification/markViewed',
    async (notificationId: string, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.put(
                `/notification/v1/viewed/${notificationId}`
            )
            return res.data
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data?.message || 'Failed to update notification'
            )
        }
    }
)

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        clearNotifications: (state) => {
            state.notifications = []
        },
    },
    extraReducers: (builder) => {
        builder

            // FETCH
            .addCase(fetchNotificationsByUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchNotificationsByUser.fulfilled, (state, action) => {
                state.loading = false
                state.notifications = action.payload?.data || []
            })
            .addCase(fetchNotificationsByUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })

            // MARK VIEWED
            .addCase(markNotificationViewed.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(markNotificationViewed.fulfilled, (state, action) => {
                state.loading = false

                const updated = action.payload?.data
                if (!updated?._id) return

                const index = state.notifications.findIndex(
                    (n) => n._id === updated._id
                )

                if (index !== -1) {
                    state.notifications[index] = updated
                }
            })
            .addCase(markNotificationViewed.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
    },
})

export const { clearNotifications } = notificationSlice.actions
export default notificationSlice.reducer

import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import walletReducer from '../features/wallet/walletSlice'
import investmentReducer from '../features/investment/InvestmentSlice'
import userReducer from '../features/user/userSlice'
export const store = configureStore({
  reducer: {
   authReducer,
   walletReducer,
   investmentReducer,
   userReducer
   
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import authReducer from '../features/auth/authSlice'
import walletReducer from '../features/wallet/walletSlice'
import investmentReducer from '../features/investment/InvestmentSlice'
import userReducer from '../features/user/userSlice'
import notificationReducer from '../features/notification/notificationSlice'
import paymentReducer from '../features/payment/paymentSlice'

const rootReducer = combineReducers({
    auth: authReducer,
    wallet: walletReducer,
    investment: investmentReducer,
    user: userReducer,
    notification: notificationReducer,
    payment:paymentReducer
})

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth'], // only auth survives refresh
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // redux-persist needs this
        }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

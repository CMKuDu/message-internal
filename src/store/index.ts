import { configureStore } from "@reduxjs/toolkit";
import authReducer from './feature/authSlice';
import authModalSliceReducer from './feature/authModalSlice'
export const store = configureStore({
    reducer: {
        auth: authReducer,
        authModal: authModalSliceReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
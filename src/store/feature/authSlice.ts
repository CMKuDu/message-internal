import CookieTokenService from '@/utils/CookieTokenService';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthSate {
    accessToken: string | null;
}

const initialState: AuthSate = {
    accessToken: CookieTokenService.getAccessToken() || null,
}

const authModalSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAccessToken: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload;
            CookieTokenService.setAccessToken(action.payload);
        },
        clearAccessToken: (state) => {
            state.accessToken = null;
            CookieTokenService.clearAll();
        }
    }
});

export const { setAccessToken, clearAccessToken } = authModalSlice.actions;
export default authModalSlice.reducer
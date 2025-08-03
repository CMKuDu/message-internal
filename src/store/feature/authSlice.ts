import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthSate {
    accessToken: string | null;
}

const initialState: AuthSate = {
    accessToken: null,
}

const authModalSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAccessToken: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload;
        },
        clearAccessToken: (state) => {
            state.accessToken = null;
        }
    }
});

export const { setAccessToken, clearAccessToken } = authModalSlice.actions;
export default authModalSlice.reducer
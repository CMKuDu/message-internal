import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthModal {
    isTurnOn: boolean,
    mode: 'login' | 'register';
}

const initialState: AuthModal = {
    isTurnOn: false,
    mode: 'login'
}

const authModalSlice = createSlice({
    name: "authModal",
    initialState,
    reducers: {
        openModal: (state, action: PayloadAction<'login' | 'register'>) => {
            state.isTurnOn = true
            state.mode = action.payload
        },
        closeModal: (state) => {
            state.isTurnOn = false;
        }
    }
})

export const { openModal, closeModal } = authModalSlice.actions
export default authModalSlice.reducer
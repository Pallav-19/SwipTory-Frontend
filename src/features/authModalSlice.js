/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const authModalSlice = createSlice({
    name: 'authModal',
    initialState: { open: false, context: 'login' },
    reducers: {
        open: (state, action) => {
            state.open = true
            state.context = action.payload.context

        },
        close: (state, action) => {
            state.open = false
            state.context = 'login'
        }
    }
})

export const { open, close } = authModalSlice.actions
export default authModalSlice.reducer;
export const currentOpenStatus = (state) => state.authModal.open
export const currentContext = (state) => state.authModal.context


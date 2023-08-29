import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/authSlice"
import { apiSlice } from "./api/apiSlice";
import storySlice from "../features/storySlice";
import authModalSlice from "../features/authModalSlice";
import notificationSlice from "../features/notificationSlice";
export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authSlice,
        story: storySlice,
        authModal: authModalSlice,
        notification: notificationSlice,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware)
})
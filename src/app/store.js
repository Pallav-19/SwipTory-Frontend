import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/authSlice"
import { apiSlice } from "./api/apiSlice";
import storySlice from "../features/storySlice";
export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authSlice,
        story: storySlice,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware)
})
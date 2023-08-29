import { apiSlice } from "../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/auth/login',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        register: builder.mutation({
            query: credentials => ({
                url: '/auth/register',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        refresh: builder.mutation({
            query: credentials => ({
                url: "/auth/refresh",
                method: "GET"
            })

        }),
        logout: builder.mutation({
            query: () => ({
                url: "/auth/logout",
                method: "GET"
            })
        })
    })
})
export const {
    useLoginMutation, useRegisterMutation, useRefreshMutation, useLogoutMutation
} = authApiSlice
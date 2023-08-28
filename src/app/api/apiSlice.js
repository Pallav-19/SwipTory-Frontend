/* eslint-disable no-unused-vars */
import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react'
import { logout, setCredentials } from "../../features/authSlice";
const baseURL = 'http://localhost:8000'
const baseQuery = fetchBaseQuery({
    baseUrl: baseURL,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token
        if (token) {
            headers.set('authorization', `Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
    if (result?.error?.originalStatus === 403) {
        console.log('sending refresh');
        const refreshResult = await baseQuery('/auth/refresh', api, extraOptions)
        console.log(refreshResult);
        if (refreshResult?.data) {
            const user = api.getState().auth.user
            api.dispatch(setCredentials({ ...refreshResult.data, user }))
            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(logout())
        }
    }
    return result
}
export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})

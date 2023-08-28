import { apiSlice } from "../../app/api/apiSlice";
const STORY_BASE_URL = '/api/story'
export const storyApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getStories: builder.query({
            query: ({ category }) => STORY_BASE_URL + `/fetchStories?category=${category}`
        }),
        getStoryById: builder.mutation({
            query: ({ id }) => ({
                url: STORY_BASE_URL + "/fetchStoryById/" + id,
                method: 'GET'
            })
        }),
        fetchMyStories: builder.query({
            query: () => "/api/user/getMyStories"
        }),
        react: builder.mutation({
            query: (id) => ({
                url: STORY_BASE_URL + "/react?id=" + id,
                method: "POST"
            })
        }),
        fetchBookmarks: builder.query({
            query: () => "/api/user/getBookmarks"
        })
    })
})
export const {
    useGetStoriesQuery,
    useGetStoryByIdMutation,
    useFetchMyStoriesQuery,
    useReactMutation,
    useFetchBookmarksQuery,
} = storyApiSlice
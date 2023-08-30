import { apiSlice } from "../../app/api/apiSlice";
const STORY_BASE_URL = '/api/story'
export const storyApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({

        getStoryById: builder.mutation({
            query: ({ id }) => ({
                url: STORY_BASE_URL + "/fetchStoryById/" + id,
                method: 'GET'
            })
        }),

        react: builder.mutation({
            query: ({ id }) => ({
                url: STORY_BASE_URL + "/react?id=" + id,
                method: "PATCH"
            })
        }),
        fetchBookmarks: builder.mutation({
            query: () => ({
                url: "/api/user/getBookmarks",
                method: "GET",
            })
        }),
        addBookmarks: builder.mutation({
            query: ({ id }) => ({
                url: "/api/user/addBookmark?id=" + id,
                method: "PATCH"
            })
        }),
        getStories: builder.mutation({
            query: ({ category }) => ({
                url: STORY_BASE_URL + `/fetchStories?category=${category}`,
                method: "GET"
            })
        }),
        fetchMyStories: builder.mutation({
            query: () => ({
                url: "/api/user/getMyStories",
                method: "GET"
            })
        }),
        addStory: builder.mutation({
            query: ({ stories }) => {
                const body = {
                    stories
                }
                return {
                    url: STORY_BASE_URL + "/createStory",
                    method: "POST",
                    body: JSON.stringify(body)
                }
            }
        })

    })
})
export const {
    useGetStoryByIdMutation,
    useReactMutation,
    useAddBookmarksMutation,
    useFetchBookmarksMutation,
    useGetStoriesMutation,
    useFetchMyStoriesMutation,
    useAddStoryMutation
} = storyApiSlice
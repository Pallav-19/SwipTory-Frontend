/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const storySlice = createSlice({
    name: 'story',
    initialState: { category: 'ALL', story: null },
    reducers: {
        setCategory: (state, action) => {
            const { category } = action.payload
            state.category = category
        },
        setStory: (state, action) => {
            const { story } = action.payload
            state.story = story
        }, unsetStory: (state, action) => {
            state.story = null
        },


    }
})

export const { setCategory, setStory, unsetStory } = storySlice.actions
export default storySlice.reducer;
export const currentCategory = (state) => state.story.category
export const currentStory = (state) => state.story.story


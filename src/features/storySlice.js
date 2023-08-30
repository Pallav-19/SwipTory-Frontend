/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const storySlice = createSlice({
    name: 'story',
    initialState: { category: 'ALL', story: null, stories: [], total: 0, myStories: [], myTotalStories: 0, viewContext: null, viewContextTotal: null, editing: null },
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
        setStories: (state, action) => {
            const { stories, total } = action.payload
            state.stories = stories
            state.total = total
        },
        updateStories: (state, action) => {
            const { id, result } = action.payload;
            const index = state.stories.findIndex(obj => obj['_id'] === id)
            state.stories[index] = result
        },
        setMyStories: (state, action) => {
            const { myStories, total } = action.payload
            state.myStories = myStories
            state.myTotalStories = total
        }
        ,
        updateMyStories: (state, action) => {
            const { id, result } = action.payload;
            const index = state.myStories.findIndex(obj => obj['_id'] === id)
            state.myStories[index] = result
        },
        addStory: (state, action) => {
            const { story } = action.payload
            state.stories = [...story, ...state.stories]
            state.myStories = [...story, ...state.myStories]
            state.total += story.length
            state.myTotalStories += story.length
        }
        , setViewContext: (state, action) => {
            const { context, total } = action.payload
            state.viewContext = context;
            state.viewContextTotal = total;
        },
        unsetViewContext: (state, action) => {
            state.viewContext = null
            state.viewContextTotal = null
        },
        setEditing: (state, action) => {
            state.editing = action.payload.editing
        }
        , updateCurrentStory: (state, action) => {
            state.story = action.payload.story
        }



    }
})

export const { setCategory, setStory, unsetStory, setStories, updateStories, setMyStories, updateMyStories, addStory, setViewContext, unsetViewContext, setEditing, updateCurrentStory } = storySlice.actions
export default storySlice.reducer;
export const currentCategory = (state) => state.story.category
export const currentStory = (state) => state.story.story
export const currentStories = (state) => state.story.stories
export const currentTotal = (state) => state.story.total
export const currentMyStoriesTotal = (state) => state.story.myTotalStories
export const currentMyStories = (state) => state.story.myStories
export const currentViewContext = (state) => state.story.viewContext;
export const currentViewContextTotal = (state) => state.story.viewContextTotal
export const currentEditing = (state) => state.story.editing




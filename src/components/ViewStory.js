/* eslint-disable no-unused-vars */
import { Box } from '@mui/material'
import React from 'react'
import SingleViewStory from './miscellaneous/Stories/SingleViewStory'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useGetStoriesQuery } from '../features/api/storyApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { currentCategory, currentStory, setStory } from '../features/storySlice';
const ViewStory = () => {
    const category = useSelector(currentCategory)
    const { data: stories, isLoading } = useGetStoriesQuery({ category })
    const currStory = useSelector(currentStory)
    const index = (stories.stories?.indexOf(stories?.stories?.find(x => x._id === currStory._id)));
    const dispatch = useDispatch()
    return (
        <Box sx={{
            position: 'fixed', height: '100vh', width: '100vw', top: 0, left: 0, transform: 'translate(0,0)', background: 'rgba(0,0,0,0.7)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10
        }}>
            <ArrowBackIosNewIcon onClick={() => { dispatch(setStory({ story: stories?.stories[index - 1] })) }} sx={{ color: 'white', fontSize: '2rem', cursor: 'pointer', visibility: 0 === index ? "hidden" : "", display: { md: 'block', xs: 'none' } }} />
            <SingleViewStory />
            < ArrowForwardIosIcon onClick={() => { dispatch(setStory({ story: stories?.stories[index + 1] })) }} sx={{ color: 'white', fontSize: '2rem', cursor: 'pointer', visibility: stories.total - 1 === index ? "hidden" : "", display: { md: 'block', xs: 'none' } }} />
        </Box>
    )
}

export default ViewStory 
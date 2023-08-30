/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Box } from '@mui/material'
import React, { useEffect } from 'react'
import SingleViewStory from './miscellaneous/Stories/SingleViewStory'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useDispatch, useSelector } from 'react-redux';
import { currentStories, currentStory, currentTotal, currentViewContext, setStory } from '../features/storySlice';
import { useSearchParams } from 'react-router-dom';
const ViewStory = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const stories = useSelector(currentViewContext)
    const currStory = useSelector(currentStory)
    const index = (stories?.indexOf(stories?.find(x => x?._id === currStory?._id))) || 0
    const dispatch = useDispatch()
    return (
        <Box
            sx={{
                position: 'fixed',
                height: '100vh',
                width: '100vw',
                top: 0,
                left: 0,
                transform: 'translate(0,0)',
                background: 'rgba(0,0,0,0.7)',
                zIndex: 100,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10

            }}
        >
            {!searchParams.get('story') && < ArrowBackIosNewIcon
                onClick={() => { dispatch(setStory({ story: stories[index - 1] })) }}
                sx={{
                    color: 'white',
                    fontSize: '2rem',
                    cursor: 'pointer',
                    visibility: 0 === index ? "hidden" : "",
                    display: { md: 'block', xs: 'none' }
                }} />}
            <SingleViewStory />
            {!searchParams.get('story') && < ArrowForwardIosIcon
                onClick={() => { dispatch(setStory({ story: stories[index + 1] })) }}
                sx={{
                    color: 'white',
                    fontSize: '2rem',
                    cursor: 'pointer',
                    visibility: stories?.length - 1 === index ? "hidden" : "",
                    display: { md: 'block', xs: 'none' }
                }}
            />}
        </Box>
    )
}

export default ViewStory 
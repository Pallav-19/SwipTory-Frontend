/* eslint-disable no-unused-vars */
import { Box, Typography } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux';
import { setStory } from '../../../features/storySlice';
export const singleStoryStyle = {
    height: "28rem",
    flexBasis: '16rem',
    borderRadius: "1rem",
    flexGrow: 0,
    flexShrink: 0,
    display: 'flex',
    border: '1px solid rgba(0,0,0,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.35)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        borderRadius: '1rem'
    },
    cursor: 'pointer'
}
const SingleStory = ({ viewMode, story }) => {

    const dispatch = useDispatch()
    const handleClick = () => {
        dispatch(setStory({ story }))
    }
    return (
        <Box

            sx={{
                ...singleStoryStyle, backgroundImage: `url(${story?.image})`,
            }}
            onClick={() => {
                handleClick()
            }}
        >

            <Box sx={{ position: 'absolute', bottom: 0, left: 10, display: 'flex', flexDirection: 'column', padding: 2, gap: 1, textAlign: 'left' }} >
                <Typography sx={{ color: 'white' }} variant='h6'>{story?.heading}</Typography>
                <Typography sx={{ color: 'white' }}>
                    {story?.description.slice(0, 40)}...
                </Typography>

            </Box>
        </Box >
    )
}

export default SingleStory
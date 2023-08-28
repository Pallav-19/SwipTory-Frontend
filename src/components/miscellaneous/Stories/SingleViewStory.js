/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Box, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { singleStoryStyle } from './SingleStory'
import { useDispatch, useSelector } from 'react-redux'
import { currentStory, setStory, unsetStory } from '../../../features/storySlice'
import BookmarkIcon from '@mui/icons-material/Bookmark';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import { Favorite } from '@mui/icons-material';
import CopyToClipboard from 'react-copy-to-clipboard'
import { useSearchParams } from 'react-router-dom'
import { useGetStoryByIdMutation } from '../../../features/api/storyApiSlice'
import Loader from '../Loader'
const SingleViewStory = () => {
    const story = useSelector(currentStory)
    const dispatch = useDispatch()
    const currentURL = window.location.href;
    const [searchParams, setSearchParams] = useSearchParams()
    const [getStoryById, { isLoading }] = useGetStoryByIdMutation()
    useEffect(() => {
        const fetch = async () => {
            const { data } = await getStoryById({ id: searchParams.get('story') })
            dispatch(setStory({ story: data.story }))
        }
        if (searchParams.get('story')) fetch();
    }, [searchParams])
    const handleClose = () => {
        dispatch(unsetStory());
        setSearchParams((params) => { params.delete('story'); return params; })
    }
    if (isLoading) return (<Loader />)
    return (
        <Box sx={{ ...singleStoryStyle, backgroundImage: `url(${story?.image})`, height: { md: '32rem', xs: '100vh' }, flexBasis: { md: '20rem', xs: '100vw' } }}>
            <Box sx={{ position: 'absolute', top: 0, left: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 2, width: '100%' }}>
                <CloseIcon onClick={() => { handleClose() }} sx={{ color: 'white', fontSize: '2rem' }} />
                <CopyToClipboard text={`${"http://localhost:3000/"}?story=${story?._id}`} >

                    <SendIcon sx={{ color: 'white', fontSize: '2rem', transform: 'rotate(-30deg)' }} />
                </CopyToClipboard>
            </Box>

            <Box sx={{ position: 'absolute', bottom: 0, left: 10, display: 'flex', flexDirection: 'column', padding: 2, gap: 1, textAlign: 'left', width: '100%' }} >
                <Typography sx={{ color: 'white' }} variant='h6'>{story?.heading}</Typography>
                <Typography sx={{ color: 'white' }}>
                    {story?.description}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                    <BookmarkIcon sx={{ color: 'white', fontSize: '2rem' }} />
                    <Favorite sx={{ color: 'white', fontSize: '2rem' }} />

                </Box>
            </Box>
        </Box>
    )
}

export default SingleViewStory
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Box, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { singleStoryStyle } from './SingleStory'
import { useDispatch, useSelector } from 'react-redux'
import { currentCategory, currentStory, setStory, unsetStory } from '../../../features/storySlice'
import BookmarkIcon from '@mui/icons-material/Bookmark';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import { Favorite } from '@mui/icons-material';
import CopyToClipboard from 'react-copy-to-clipboard'
import { useSearchParams } from 'react-router-dom'
import { useGetStoriesQuery, useGetStoryByIdMutation } from '../../../features/api/storyApiSlice'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Loader from '../Loader'
import { currentUser } from '../../../features/authSlice'
const SingleViewStory = () => {
    const story = useSelector(currentStory)
    const user = useSelector(currentUser)
    const dispatch = useDispatch()
    const category = useSelector(currentCategory)
    const { data: stories, } = useGetStoriesQuery({ category })
    const currStory = useSelector(currentStory)
    const index = (stories.stories?.indexOf(stories?.stories?.find(x => x._id === currStory._id)));
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
            <Box sx={{ position: 'absolute', top: 0, left: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 2, width: '100%' }}>
                <CloseIcon onClick={() => { handleClose() }} sx={{ color: 'white', fontSize: '2rem' }} />
                <CopyToClipboard text={`${"https://swiptory-frontend-black.vercel.app/"}?story=${story?._id}`} >

                    <SendIcon sx={{ color: 'white', fontSize: '2rem', transform: 'rotate(-30deg)' }} />
                </CopyToClipboard>
            </Box>
            <Box sx={{ position: 'absolute', top: '50%', left: 0, width: '100%', display: { md: 'none', xs: 'flex' }, alignItems: 'center', justifyContent: 'space-between', }} >
                <ArrowBackIosNewIcon onClick={() => { dispatch(setStory({ story: stories?.stories[index - 1] })) }} sx={{ color: 'white', fontSize: '2rem', cursor: 'pointer', visibility: 0 === index ? "hidden" : "" }} />

                < ArrowForwardIosIcon onClick={() => { dispatch(setStory({ story: stories?.stories[index + 1] })) }} sx={{ color: 'white', fontSize: '2rem', cursor: 'pointer', visibility: stories.total - 1 === index ? "hidden" : "" }} />
            </Box>
            <Box sx={{ position: 'absolute', bottom: 0, left: 0, display: 'flex', flexDirection: 'column', padding: 2, gap: 1, textAlign: 'left', width: '100%' }} >
                <Typography sx={{ color: 'white' }} variant='h6'>{story?.heading}</Typography>
                <Typography sx={{ color: 'white' }}>
                    {story?.description}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                    <BookmarkIcon sx={{ color: (user && story?.likedBy?.includes(user._id)) ? '#f50057' : 'white', fontSize: '2rem' }} />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>

                        <Favorite sx={{ color: 'white', fontSize: '2rem' }} />
                        <Typography sx={{
                            color: (user && story?.likedBy?.includes(user._id)) ? '#f50057' : 'white', fontSize: "1.2rem"
                        }}>{story?.likes}</Typography>
                    </Box>

                </Box>
            </Box>
        </Box>
    )
}

export default SingleViewStory
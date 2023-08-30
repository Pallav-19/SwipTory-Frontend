/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { singleStoryStyle } from './SingleStory'
import { useDispatch, useSelector } from 'react-redux'
import { currentCategory, currentStories, currentStory, currentTotal, currentViewContext, setStory, unsetStory, unsetViewContext, updateStories } from '../../../features/storySlice'
import BookmarkIcon from '@mui/icons-material/Bookmark';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import { Favorite } from '@mui/icons-material';
import CopyToClipboard from 'react-copy-to-clipboard'
import { useSearchParams } from 'react-router-dom'
import { useAddBookmarksMutation, useGetStoryByIdMutation, useReactMutation } from '../../../features/api/storyApiSlice'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Loader from '../Loader'
import { currentToken, currentUser, setCredentials } from '../../../features/authSlice'
import { addNotification } from '../../../features/notificationSlice'
import { open } from '../../../features/authModalSlice'
const SingleViewStory = () => {
    const story = useSelector(currentStory)
    const user = useSelector(currentUser)
    const token = useSelector(currentToken)
    const stories = useSelector(currentViewContext)
    const dispatch = useDispatch()
    const [added, setAdded] = useState()
    const [liked, setLiked] = useState()
    const [likeCount, setLikeCount] = useState()
    const [addBookmarks] = useAddBookmarksMutation()
    const [react] = useReactMutation()
    const currStory = useSelector(currentStory)
    const index = (stories?.indexOf(stories?.find(x => x?._id === currStory?._id)));
    const [searchParams, setSearchParams] = useSearchParams()
    const [getStoryById, { isLoading }] = useGetStoryByIdMutation()
    useEffect(() => {
        if (currStory) {
            setAdded(user?.bookmarks?.includes(currStory?._id))
            setLiked(user?.likedPosts?.includes(currStory?._id))
            setLikeCount(currStory?.likes)
            setExpand(false)
        }

    }, [currStory])
    const bookmark = async (id) => {
        try {
            const response = await addBookmarks({ id })
            if (response?.data) {
                dispatch(addNotification({ id: Date.now(), message: response?.data?.message }))

                dispatch(setCredentials({ token: token, user: response?.data?.update }))
                setAdded(response?.data?.added)
            }


        } catch (error) {
            dispatch(addNotification({ id: Date.now(), message: "Error Occured! Try Again!" }))
        }
    }

    const like = async (id) => {
        try {
            const { data } = await react({ id })
            if (data) {
                dispatch(setCredentials({ token: token, user: data?.update }));
                setLiked(data?.liked);
                setLikeCount(data?.liked ? likeCount + 1 : likeCount - 1)
                dispatch(updateStories({ id, result: data?.result }))
            }

        } catch (error) {
            dispatch(addNotification({ id: Date.now(), message: "Error Occured! Try Again!" }))

        }
    }
    useEffect(() => {
        const fetch = async () => {
            const { data } = await getStoryById({ id: searchParams.get('story') })
            dispatch(setStory({ story: data.story }))
        }
        if (searchParams.get('story')) fetch();
    }, [searchParams])
    const handleClose = () => {
        dispatch(unsetStory());
        dispatch(unsetViewContext())
        setSearchParams((params) => { params.delete('story'); return params; })
    }
    const [expand, setExpand] = useState(false)
    if (isLoading) return (<Loader />)
    return (
        <Box
            sx={{
                ...singleStoryStyle,
                backgroundImage: `url(${story?.image})`,
                height: { md: '32rem', xs: '100vh' },
                flexBasis: { md: '20rem', xs: '100vw' },
                '&::before': {},
                cursor: 'default'
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 2,
                    width: '100%',
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.3),rgba(0,0,0,0.2), rgba(0,0,0,0.1),rgba(0,0,0,0.05))',
                    borderTopRightRadius: '1rem',
                    borderTopLeftRadius: '1rem'
                }}
            >
                <CloseIcon onClick={() => { handleClose() }} sx={{ color: 'white', fontSize: '2rem', cursor: 'pointer' }} />

                <CopyToClipboard
                    text={`${"https://swiptory-frontend-black.vercel.app/"}?story=${story?._id}`}
                    onCopy={() => dispatch(addNotification({
                        id: Date.now(),
                        message: "Story link copied to clipboard"
                    }))}
                >
                    <SendIcon sx={{ color: 'white', fontSize: '2rem', transform: 'rotate(-30deg)', cursor: 'pointer' }} />
                </CopyToClipboard>
            </Box>
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: 0,
                width: '100%',
                display: { md: 'none', xs: 'flex' },
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
            >
                <ArrowBackIosNewIcon
                    onClick={() => { dispatch(setStory({ story: stories[index - 1] })) }}
                    sx={{
                        color: 'white',
                        fontSize: '2rem',
                        cursor: 'pointer',
                        visibility: 0 === index ? "hidden" : ""
                    }}
                />

                < ArrowForwardIosIcon
                    onClick={() => { dispatch(setStory({ story: stories[index + 1] })); }}
                    sx={{
                        color: 'white',
                        fontSize: '2rem',
                        cursor: 'pointer',
                        visibility: stories?.length - 1 === index ? "hidden" : ""
                    }}
                />
            </Box>
            <Box
                sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    padding: 2,
                    gap: 1,
                    textAlign: 'left',
                    width: '100%',
                    borderRadius: '1rem',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.5),rgba(0,0,0,0.3), rgba(0,0,0,0.2),rgba(0,0,0,0.05))'
                }}
            >
                <Typography sx={{ color: 'white' }} variant='h6'>
                    {story?.heading}
                </Typography>
                <Typography
                    onClick={() => setExpand(!expand)}
                    sx={{
                        color: 'white',
                        maxHeight: '4rem',
                        overflowY: 'scroll',
                        "&::-webkit-scrollbar": {
                            width: 0,
                        },
                        cursor: 'pointer'
                    }}
                >
                    {expand ? story?.description : `${story?.description?.slice(0, 30)}...`}
                </Typography>

                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                    }}>
                    <BookmarkIcon
                        onClick={() => {
                            if (!token) {
                                dispatch(unsetStory());
                                dispatch(unsetViewContext())
                                return dispatch(open({ context: "login" }))
                            }
                            bookmark(story?._id)
                        }}
                        sx={{ color: (user && added) ? '#73ABFF' : 'white', fontSize: '2rem', cursor: 'pointer' }}
                    />
                    <Box
                        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>

                        <Favorite
                            onClick={() => {
                                if (!token) {
                                    dispatch(unsetStory());
                                    dispatch(unsetViewContext())
                                    return dispatch(open({ context: "login" }))
                                }
                                like(story?._id)
                            }}
                            sx={{ color: (user && liked) ? '#f50057' : 'white', fontSize: '2rem', cursor: 'pointer' }}
                        />
                        <Typography
                            sx={{
                                color: (user && liked) ? '#f50057' : 'white', fontSize: "1.2rem"
                            }}>
                            {likeCount}
                        </Typography>
                    </Box>

                </Box>
            </Box>
        </Box >
    )
}

export default SingleViewStory
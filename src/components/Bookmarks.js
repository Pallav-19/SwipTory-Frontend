/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import SingleStory from './miscellaneous/Stories/SingleStory'
import { useFetchBookmarksMutation } from '../features/api/storyApiSlice'
import { useDispatch, useSelector } from 'react-redux'
import { currentStories, currentTotal, setStories } from '../features/storySlice'
import Loader from './miscellaneous/Loader'
import { currentToken } from '../features/authSlice'
import { useNavigate } from 'react-router-dom'


const Bookmarks = () => {
    const bookmarks = useSelector(currentStories)
    const totalCount = useSelector(currentTotal)
    const [fetchBookmarks, { isLoading }] = useFetchBookmarksMutation()
    const dispatch = useDispatch()
    const token = useSelector(currentToken)
    const navigate = useNavigate("")
    useEffect(() => {
        if (!token) return navigate("/");
        const fetch = async () => {
            try {
                const { data } = await fetchBookmarks()
                dispatch(setStories({ stories: data?.bookmarks, total: data?.total }))
            } catch (error) {

            }
        }
        fetch()

    }, [])
    if (isLoading) return (<Loader />)
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, textAlign: 'center', padding: 5 }}>
            <Typography variant='h4' sx={{ color: 'black', fontWeight: 800 }}>Your Bookmarks</Typography>
            <Box
                sx={{
                    display: 'flex',
                    gap: 8,
                    maxWidth: '100vw',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: { md: 'flex-start', xs: 'center' }
                }}>
                {bookmarks?.length > 0 ? bookmarks?.map(x => <SingleStory viewContext={bookmarks} viewContextTotal={totalCount} key={x?._id} story={x} />) : <Typography variant='h5' sx={{ textAlign: 'center', width: '100%' }}>No Bookmarks!</Typography>}
            </Box>

        </Box>
    )
}

export default Bookmarks
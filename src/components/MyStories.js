/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SingleStory from './miscellaneous/Stories/SingleStory'
import { useFetchMyStoriesMutation } from '../features/api/storyApiSlice'
import Loader from './miscellaneous/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { currentMyStories, currentMyStoriesTotal, setMyStories } from '../features/storySlice'

const MyStories = () => {
    const [fetchMyStories, { isLoading }] = useFetchMyStoriesMutation()
    const myStories = useSelector(currentMyStories)
    const dispatch = useDispatch()
    const myStoriesCount = useSelector(currentMyStoriesTotal)
    const [limit, setLimit] = useState(4)
    useEffect(() => {
        const fetch = async () => {
            const { data } = await fetchMyStories({})
            dispatch(setMyStories({ myStories: data?.stories, total: data?.total }))
        }
        fetch()
    }, [])


    return (
        <Box sx={{ display: myStories?.length > 0 ? 'flex' : 'none', flexDirection: 'column', gap: 4, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ color: 'black', fontWeight: 800 }}>Your Stories</Typography>
            <Box
                sx={{
                    display: 'flex',
                    gap: 10,
                    maxWidth: '100vw',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: { md: 'flex-start', xs: 'center' }
                }}>
                {myStories?.length > 0 ? myStories?.slice(0, limit)?.map(x => <SingleStory viewContext={myStories} viewContextTotal={myStoriesCount} key={x?._id} story={x} />) : <Typography sx={{ textAlign: 'center' }}>No Stories</Typography>}
            </Box>
            {(isLoading ? <Loader /> : myStories?.slice(0, limit)?.length !== myStoriesCount && myStoriesCount !== 0) &&
                <Box>
                    <Button onClick={() => { setLimit(limit + 4) }} variant='contained' sx={{ borderRadius: '1.2rem', '&:hover': { bgcolor: '#FF7373', }, bgcolor: '#FF7373', }}>See More</Button>
                </Box>}
        </Box>
    )
}

export default MyStories
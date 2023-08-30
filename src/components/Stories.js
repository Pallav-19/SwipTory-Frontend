/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Box, Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SingleStory from './miscellaneous/Stories/SingleStory'
import { useGetStoriesMutation } from '../features/api/storyApiSlice'
import { useDispatch, useSelector } from 'react-redux'
import { currentCategory, currentStories, currentTotal, setStories } from '../features/storySlice'
import { addNotification } from '../features/notificationSlice'
import Loader from './miscellaneous/Loader'

const Stories = () => {
    const category = useSelector(currentCategory)
    const [getStories, { isLoading }] = useGetStoriesMutation()
    const stories = useSelector(currentStories)
    const total = useSelector(currentTotal)
    const dispatch = useDispatch()
    const [limit, setLimit] = useState(4)
    useEffect(() => {
        const fetch = async () => {
            try {
                const { data } = await getStories({ category })
                if (data) {
                    dispatch(setStories({ stories: data?.stories, total: data?.total }))
                }
            } catch (error) {
                dispatch(addNotification({ id: Date.now(), message: "An error occured!" }))
            }
        }
        fetch()
    }, [category])



    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ color: 'black', fontWeight: 800 }}>{total ? "Top" : "No"} Stories {category !== "ALL" && `on ${category.toLowerCase()}`}</Typography>
            <Box
                sx={{
                    display: 'flex',
                    gap: 10,
                    maxWidth: '100vw',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: { md: 'flex-start', xs: 'center' }
                }}>
                {stories ? stories?.slice(0, limit)?.map(x => <SingleStory viewContext={stories} viewContextTotal={total} key={x?._id} story={x} />) : <Typography sx={{ textAlign: 'center' }}>No Stories</Typography>}
            </Box>
            {isLoading ? <Loader /> : (stories?.slice(0, limit)?.length !== total && total !== 0) && < Box >
                <Button onClick={() => { setLimit(limit + 4) }} variant='contained' sx={{ borderRadius: '1.2rem', '&:hover': { bgcolor: '#FF7373', }, bgcolor: '#FF7373', }}>See More</Button>
            </Box>}

        </Box >
    )
}

export default Stories
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Box, Button, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import SingleStory from './miscellaneous/Stories/SingleStory'
import { useGetStoriesQuery } from '../features/api/storyApiSlice'
import { useSelector } from 'react-redux'
import { currentCategory } from '../features/storySlice'

const Stories = () => {
    const category = useSelector(currentCategory)
    const {
        data: stories,
        isLoading,
        isSuccess,
        isError,
        error,

    } = useGetStoriesQuery({ category })
 

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ color: 'black', fontWeight: 800 }}>{isLoading ? "Fetching" : stories?.total ? "Top" : "No"} Stories {category !== "ALL" && `on ${category.toLowerCase()}`}</Typography>
            <Box
                sx={{
                    display: 'flex',
                    gap: 10,
                    maxWidth: '100vw',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: { md: 'flex-start', xs: 'center' }
                }}>
                {stories?.stories ? stories?.stories?.map(x => <SingleStory key={x._id} story={x} />) : <Typography sx={{ textAlign: 'center' }}>No Stories</Typography>}
            </Box>
            {(stories?.stories?.length !== stories?.total && stories?.total !== 0) && < Box >
                <Button variant='contained' sx={{ borderRadius: '1.2rem', '&:hover': { bgcolor: '#FF7373', }, bgcolor: '#FF7373', }}>See More</Button>
            </Box>}

        </Box >
    )
}

export default Stories
import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import SingleStory from './miscellaneous/Stories/SingleStory'
import { useFetchMyStoriesQuery } from '../features/api/storyApiSlice'

const MyStories = () => {
    const { data: myStories, isLoading } = useFetchMyStoriesQuery()
    if (isLoading) return (<p>loading...</p>)

    return (
        <Box sx={{ display: myStories?.stories?.length > 0 ? 'flex' : 'none', flexDirection: 'column', gap: 4, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ color: 'black', fontWeight: 800 }}>Your Stories</Typography>
            <Box
                sx={{
                    display: 'flex',
                    gap: 5,
                    maxWidth: '100vw',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: { md: 'space-between', xs: 'center' }
                }}>
                {myStories?.stories?.length > 0 ? myStories?.stories?.map(x => <SingleStory key={x._id} story={x} />) : <Typography sx={{ textAlign: 'center' }}>No Stories</Typography>}
            </Box>
            {(myStories?.stories?.length !== myStories?.total && myStories.total !== 0) &&
                <Box>
                    <Button variant='contained' sx={{ borderRadius: '1.2rem', '&:hover': { bgcolor: '#FF7373', }, bgcolor: '#FF7373', }}>See More</Button>
                </Box>}
        </Box>
    )
}

export default MyStories
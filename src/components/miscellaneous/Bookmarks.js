import { Box, Typography } from '@mui/material'
import React from 'react'
import SingleStory from '../miscellaneous/Stories/SingleStory'
import { useFetchBookmarksQuery, } from '../../features/api/storyApiSlice'


const Bookmarks = () => {
    const { data: bookmarks, isLoading } = useFetchBookmarksQuery()
    if (isLoading) return (<p>Loading...</p>)
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, textAlign: 'center', mt: 5 }}>
            <Typography variant='h4' sx={{ color: 'black', fontWeight: 800 }}>Your Bookmarks</Typography>
            <Box
                sx={{
                    display: 'flex',
                    gap: 5,
                    maxWidth: '100vw',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: { md: 'space-between', xs: 'center' }
                }}>
                {bookmarks?.bookmarks?.length > 0 ? bookmarks?.bookmarks?.map(x => <SingleStory key={x._id} story={x} />) : <Typography variant='h5' sx={{ textAlign: 'center', width: '100%' }}>No Bookmarks!</Typography>}
            </Box>

        </Box>
    )
}

export default Bookmarks
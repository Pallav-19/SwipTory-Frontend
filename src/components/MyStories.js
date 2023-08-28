import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { categories } from '../constants/categories'
import SingleStory from './miscellaneous/Stories/SingleStory'

const MyStories = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, textAlign: 'center' }}>
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
                {categories.slice(4).map(x => <SingleStory />)}
            </Box>
            <Box>
                <Button variant='contained' sx={{ borderRadius: '1.2rem', '&:hover': { bgcolor: '#FF7373', }, bgcolor: '#FF7373', }}>See More</Button>
            </Box>
        </Box>
    )
}

export default MyStories
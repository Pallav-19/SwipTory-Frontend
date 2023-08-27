import { Box } from '@mui/material'
import React from 'react'
import { categories } from '../constants/categories'
import SingleStory from './miscellaneous/Stories/SingleStory'

const Stories = () => {
    return (
        <Box sx={{ display: 'flex', gap: 5, maxWidth: '100vw', flexWrap: 'wrap', alignItems: 'center', justifyContent: { md: 'space-between', xs: 'center' } }}>
            {categories.slice(4).map(x => <SingleStory />)}
        </Box>
    )
}

export default Stories
import { Box } from '@mui/material'
import React from 'react'
import Categories from './Categories'
import MyStories from './MyStories'
import Stories from './Stories'

const Home = () => {
    return (
        <Box sx={{ padding: 3, display: 'flex', flexDirection: 'column', }}>
            <Categories />
            <MyStories />
            <Stories />

        </Box>
    )
}

export default Home
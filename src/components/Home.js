import { Box } from '@mui/material'
import React from 'react'
import Categories from './Categories'
import MyStories from './MyStories'
import Stories from './Stories'
import { useSelector } from 'react-redux'
import { currentUser } from '../features/authSlice'

const Home = () => {
    const user = useSelector(currentUser)
    
    return (
        <Box sx={{ padding: 3, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <Categories />
            {user && <MyStories />}
            <Stories />

        </Box>
    )
}

export default Home
import { Box } from '@mui/material'
import React from 'react'
import SingleViewStory from './miscellaneous/Stories/SingleViewStory'

const ViewStory = () => {
    return (
        <Box sx={{
            position: 'fixed', height: '100vh', width: '100vw', top: 0, left: 0, transform: 'translate(0,0)', background: 'rgba(0,0,0,0.7)', zIndex: 100,
        }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
                <SingleViewStory />

            </Box>
        </Box>
    )
}

export default ViewStory
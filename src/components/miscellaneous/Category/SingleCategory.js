import { Box, Typography } from '@mui/material'
import React from 'react'

const SingleCategory = ({ category, background }) => {
    return (
        <Box sx={{
            height: "10rem",
            flexBasis: '10rem',
            borderRadius: "1.2rem",
            flexGrow: 0,
            flexShrink: 0,
            display: 'flex',
            border: '1px solid rgba(0,0,0,0.1)',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.35)',
            boxShadow: '1px 6px 8px rgba(0,0,0,0.2)',
            backgroundImage: `url(${background})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
            '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                borderRadius: '1.2rem'
            },
            cursor: 'pointer'
        }}>
            <Typography variant='h6' color={'white'} sx={{ zIndex: 1, fontWeight: 700, letterSpacing: 1 }}>
                {category}
            </Typography>
        </Box>
    )
}

export default SingleCategory
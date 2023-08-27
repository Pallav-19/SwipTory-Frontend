import { Box, Typography } from '@mui/material'
import React from 'react'
import pic from "../../../assets/images/pic.jpg"
const SingleStory = ({ background = pic, title, description }) => {
    return (
        <Box sx={{
            height: "28rem",
            flexBasis: '16rem',
            borderRadius: "1rem",
            flexGrow: 0,
            flexShrink: 0,
            display: 'flex',
            border: '1px solid rgba(0,0,0,0.1)',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.35)',
            // boxShadow: '1px 6px 8px rgba(0,0,0,0.2)',
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
                borderRadius: '1rem'
            },
            cursor: 'pointer'
        }}>
            <Box sx={{ position: 'absolute', bottom: 10, left: 10, display: 'flex', flexDirection: 'column', padding: 2, gap: 2 }} >
                <Typography sx={{ color: 'white' }} variant='h6'>Heading comes here</Typography>
                <Typography sx={{ color: 'white' }}>
                    Inspirational designs, illustrations, and graphic elements from the world’s best designers.
                </Typography>
            </Box>
        </Box>
    )
}

export default SingleStory
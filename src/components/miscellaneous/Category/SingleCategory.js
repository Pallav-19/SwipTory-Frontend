import { Box, Typography } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { currentCategory, setCategory } from '../../../features/storySlice'

const SingleCategory = ({ category, background }) => {
    const selectedCategory = useSelector(currentCategory)
    const dispatch = useDispatch()
    return (
        <Box sx={{
            height: "10rem",
            flexBasis: '10rem',
            borderRadius: "1.2rem",
            flexGrow: 0,
            flexShrink: 0,
            display: 'flex',
            border: selectedCategory === category?.id ? '4px solid #73ABFF' : '1px solid rgba(0,0,0,0)',
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
            cursor: 'pointer',

        }}
            onClick={() => {
                dispatch(setCategory({ category: category.id }))
            }}
        >
            <Typography variant='h6' color={'white'} sx={{ zIndex: 1, fontWeight: 700, letterSpacing: 1 }}>
                {category?.name}
            </Typography>
        </Box>
    )
}

export default SingleCategory
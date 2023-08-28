import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import MobileMenu from './miscellaneous/MobileMenu'

const Navbar = () => {
    return (
        <Box
            sx={{
                bgcolor: 'white',
                height: "10vh",
                width: "100vw",
                border: '1px solid rgba(0,0,0,0.2)',
                boxShadow: "1px 5px 10px rgba(0,0,0,0.1)",
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                p: 3,
                position: 'sticky',
                top: 0,
                zIndex: 10
            }}>
            <Typography variant='h4' sx={{ flexGrow: 1, fontWeight: 'bold' }} >
                SwipTory
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>

                <Button sx={{ borderRadius: '1.25rem', bgcolor: '#FF7373', display: { md: 'block', xs: 'none' }, '&:hover': { bgcolor: '#FF7373', } }} variant='contained'>
                    Register Now
                </Button>

                <Button sx={{ borderRadius: '1.25rem', bgcolor: '#73ABFF', display: { md: 'block', xs: 'none' }, '&:hover': { bgcolor: '#73ABFF', } }} variant='contained'>
                    Sign In
                </Button>
                <MobileMenu />
            </Box >
        </Box>
    )
}

export default Navbar
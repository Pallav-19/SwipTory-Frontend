import { Avatar, Box, Button, Typography } from '@mui/material'
import React, { } from 'react'
import MobileMenu from './miscellaneous/MobileMenu'
import AuthModal from './miscellaneous/auth/AuthModal'
import { useDispatch, useSelector } from 'react-redux'
import { currentUser } from '../features/authSlice'
import { deepPurple } from '@mui/material/colors'
import { Bookmark } from '@mui/icons-material'
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom'
import AddModal from './miscellaneous/Stories/AddModal'
import { open } from '../features/authModalSlice'
const Navbar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(currentUser)
    const [isopen, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
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
            {!user ? <Box sx={{ display: 'flex', gap: 2 }}>

                <Button onClick={() => { dispatch(open({ context: "register" })) }} sx={{ borderRadius: '1.25rem', bgcolor: '#FF7373', display: { md: 'block', xs: 'none' }, '&:hover': { bgcolor: '#FF7373', } }} variant='contained'>
                    Register Now
                </Button>

                <Button onClick={() => { dispatch(open({ context: "login" })) }} sx={{ borderRadius: '1.25rem', bgcolor: '#73ABFF', display: { md: 'block', xs: 'none' }, '&:hover': { bgcolor: '#73ABFF', } }} variant='contained'>
                    Sign In
                </Button>
                <MobileMenu />
            </Box > :
                <>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button onClick={() => { navigate("/bookmarks") }} sx={{ borderRadius: '1.25rem', bgcolor: '#73ABFF', display: { md: 'flex', xs: 'none' }, '&:hover': { bgcolor: '#73ABFF', }, alignItems: 'center', gap: 1 }} variant='contained'>
                            <Bookmark /> Bookmarks
                        </Button>
                        <Button onClick={() => { handleOpen() }} sx={{ borderRadius: '1.25rem', bgcolor: '#FF7373', display: { md: 'flex', xs: 'none' }, '&:hover': { bgcolor: '#FF7373', }, alignItems: 'center', gap: 1 }} variant='contained'>
                            <AddIcon /> Add Story
                        </Button>
                        <Avatar sx={{ bgcolor: deepPurple[500], cursor: 'pointer' }}>{user?.username?.split('')[0].toUpperCase()}</Avatar>
                        <AddModal open={isopen} handleClose={handleClose} />
                    </Box>
                </>}
            <AuthModal />
        </Box>
    )
}

export default Navbar
import { Box, Button, Typography } from '@mui/material'
import React, { } from 'react'
import MobileMenu from './miscellaneous/MobileMenu'
import AuthModal from './miscellaneous/auth/AuthModal'
import { useDispatch, useSelector } from 'react-redux'
import { currentToken } from '../features/authSlice'
import { Bookmark } from '@mui/icons-material'
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom'
import AddModal from './miscellaneous/Stories/AddModal'
import { open } from '../features/authModalSlice'
import LogoutMenu from './miscellaneous/LogoutMenu'
const Navbar = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const token = useSelector(currentToken)
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
            <Typography variant='h4' onClick={() => navigate("/")} sx={{ flexGrow: 1, fontWeight: 'bold', cursor: 'pointer' }} >
                SwipTory
            </Typography>
            {!token ? <Box sx={{ display: 'flex', gap: 2 }}>

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
                        <LogoutMenu />
                        <AddModal open={isopen} handleClose={handleClose} />
                        <MobileMenu />
                    </Box>
                </>}
            <AuthModal />
        </Box>
    )
}

export default Navbar
import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import { Avatar, Box, Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { open as openModal } from '../../features/authModalSlice';
import { Bookmark, Logout } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import AddModal from './Stories/AddModal';
import { currentToken, currentUser, logout as logoutAction } from '../../features/authSlice';
import { deepPurple } from '@mui/material/colors';
import { addNotification } from '../../features/notificationSlice';
import { useLogoutMutation } from '../../features/api/authApiSlice';


const ITEM_HEIGHT = 48;

function MobileMenu({ handleOpen, setContext }) {
    const dispatch = useDispatch()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [isopen, setIsopen] = React.useState(false)
    const hndlClose = () => setIsopen(false)
    const hndlOpen = () => setIsopen(true)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const [logout] = useLogoutMutation()
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = async () => {
        try {
            const res = await logout()
            dispatch(logoutAction())
            if (res) {
                dispatch(addNotification({ id: Date.now(), message: "You have been logged out!" }))
            }
        } catch (error) {
            dispatch(addNotification({ id: Date.now(), message: "Internal Error!" }))
        }
    }
    const token = useSelector(currentToken)
    const user = useSelector(currentUser)
    const navigate = useNavigate()
    return (
        <Box sx={{ display: { md: 'none', sm: 'block' } }}>

            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MenuIcon />
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '20ch',
                    },
                }}
            >

                <>
                    {
                        !token ? <>
                            <MenuItem sx={{ textAlign: 'center' }} >
                                <Button fullWidth onClick={() => { dispatch(openModal({ context: "register" })) }} sx={{ borderRadius: '1.25rem', bgcolor: '#FF7373', '&:hover': { bgcolor: '#FF7373', } }} variant='contained'>
                                    Register Now
                                </Button>
                            </MenuItem>
                            <MenuItem >
                                <Button fullWidth onClick={() => { dispatch(openModal({ context: "login" })) }} sx={{ borderRadius: '1.25rem', bgcolor: '#73ABFF', '&:hover': { bgcolor: '#73ABFF', } }} variant='contained'>
                                    Sign In
                                </Button>
                            </MenuItem></> :
                            <>
                                <MenuItem sx={{ textAlign: 'center !important' }}>
                                    <Avatar sx={{ bgcolor: deepPurple[500], cursor: 'pointer', display: { md: 'none', xs: 'flex' } }}>{user?.username?.split('')[0].toUpperCase()}
                                    </Avatar>
                                    <Typography textAlign={'center'} width={"100%"} variant='h5'>
                                        {user?.username}
                                    </Typography>
                                </MenuItem>
                                <MenuItem>
                                    <Button fullWidth onClick={() => { hndlOpen() }} sx={{ borderRadius: '1.25rem', bgcolor: '#FF7373', display: { md: 'none', xs: 'flex' }, '&:hover': { bgcolor: '#FF7373', }, alignItems: 'center', gap: 1 }} variant='contained'>
                                        <AddIcon /> Add Story
                                    </Button>

                                </MenuItem>
                                <MenuItem >
                                    <Button fullWidth onClick={() => { navigate("/bookmarks") }} sx={{ borderRadius: '1.25rem', bgcolor: '#73ABFF', display: { md: 'none', xs: 'flex' }, '&:hover': { bgcolor: '#73ABFF', }, alignItems: 'center', gap: 1 }} variant='contained'>
                                        <Bookmark /> Bookmarks
                                    </Button>
                                </MenuItem>

                                <MenuItem onClick={
                                    () => {
                                        handleLogout()

                                    }
                                }>
                                    <Button fullWidth sx={{ borderRadius: '1.25rem', display: { md: 'none', xs: 'flex' }, alignItems: 'center', gap: 1 }} variant='contained' color='error'>
                                        <Logout /> logout
                                    </Button>
                                </MenuItem>
                            </>
                    }
                </>


            </Menu>
            <AddModal open={isopen} handleClose={hndlClose} />
        </Box>
    );
}
export default MobileMenu
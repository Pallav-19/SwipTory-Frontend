import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import { deepPurple } from '@mui/material/colors';
import { useDispatch, useSelector } from 'react-redux';
import { currentUser, logout as logoutAction } from '../../features/authSlice';
import { useLogoutMutation } from '../../features/api/authApiSlice';
import { addNotification } from '../../features/notificationSlice';

export default function LogoutMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const dispatch = useDispatch()
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const [logout] = useLogoutMutation()
    const user = useSelector(currentUser)
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
    return (
        <React.Fragment>
            <Box sx={{ display: { md: 'flex', xs: 'none' }, alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="View Menu">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar sx={{ bgcolor: deepPurple[500] }}>{user?.username?.split('')[0].toUpperCase()}</Avatar>
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem >
                    <Avatar /> {user?.username}
                </MenuItem>
                <Divider />

                <MenuItem onClick={
                    () => {
                        handleLogout()

                    }
                } >
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
}

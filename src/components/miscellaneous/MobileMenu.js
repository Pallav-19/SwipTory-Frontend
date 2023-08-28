import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, Button } from '@mui/material';

const options = [
    'None',
    'Atria',
];

const ITEM_HEIGHT = 48;

function MobileMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

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

                <MenuItem sx={{ textAlign: 'center' }} onClick={handleClose}>
                    <Button sx={{ borderRadius: '1.25rem', bgcolor: '#FF7373' }} variant='contained'>
                        Register Now
                    </Button>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <Button sx={{ borderRadius: '1.25rem', bgcolor: '#73ABFF' }} variant='contained'>
                        Sign In
                    </Button>
                </MenuItem>

            </Menu>
        </Box>
    );
}
export default MobileMenu